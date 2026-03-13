#!/usr/bin/env python3
"""
RatZ Movie Uploader
-------------------
Pass a movie title, get all metadata from IMDb,
confirm the details, enter a video link, and the movie
is uploaded straight to your RatZ server.

Requirements:
    pip install cinemagoer requests

Usage:
    python add_movie.py
    python add_movie.py "The Dark Knight"
"""

import sys
import os
import re
import json
import requests
import tempfile
import getpass
from urllib.parse import quote
from imdb import Cinemagoer  # pip install cinemagoer

# ── CONFIG ──────────────────────────────────────────────────────────────────
SERVER_URL = os.environ.get("RATZ_SERVER", "http://localhost:3000")
# Credentials can also be set via env vars so you don't have to type them
DEFAULT_ADMIN_USER = os.environ.get("RATZ_ADMIN_USER", "")
DEFAULT_ADMIN_PASS = os.environ.get("RATZ_ADMIN_PASS", "")
IMDB_HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}
# ─────────────────────────────────────────────────────────────────────────────


def login(session: requests.Session, username: str, password: str) -> bool:
    """Log in to the admin API and keep the session cookie."""
    try:
        r = session.post(
            f"{SERVER_URL}/api/auth/login",
            json={"username": username, "password": password},
            timeout=10,
        )
        if r.status_code == 200:
            return True
        print(f"  [!] Login failed: {r.json().get('error', r.text)}")
        return False
    except requests.RequestException as e:
        print(f"  [!] Could not reach server: {e}")
        return False


def _first_number(value: str) -> str:
    if not value:
        return ""
    m = re.search(r"\d+", str(value))
    return m.group(0) if m else ""


def _iso_duration_to_minutes(duration_value: str) -> str:
    if not duration_value:
        return ""
    match = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?", duration_value)
    if not match:
        return ""
    hours = int(match.group(1) or 0)
    mins = int(match.group(2) or 0)
    return str(hours * 60 + mins)


def search_movies_web(query: str) -> list:
    """IMDb web search fallback when Cinemagoer returns no results."""
    first_char = (query.strip()[:1] or "x").lower()
    url = f"https://v3.sg.media-imdb.com/suggestion/{first_char}/{quote(query)}.json"
    try:
        r = requests.get(url, headers=IMDB_HEADERS, timeout=12)
        r.raise_for_status()
        payload = r.json()
    except Exception:
        return []

    movies = []
    for item in payload.get("d", []):
        imdb_id = item.get("id", "")
        title = item.get("l", "")
        year = item.get("y", "")
        kind = (item.get("q") or "").lower()
        if not imdb_id.startswith("tt") or not title:
            continue
        if any(x in kind for x in ["video game", "podcast", "tv episode"]):
            continue
        image_block = item.get("i") or {}
        image_url = image_block.get("imageUrl") if isinstance(image_block, dict) else ""
        movies.append(
            {
                "source": "web",
                "imdb_id": imdb_id,
                "title": title,
                "year": year,
                "poster_url": image_url or "",
            }
        )
    return movies[:8]


def fetch_movie_details_web(imdb_id: str) -> dict:
    """Fetch title page JSON-LD and map it into metadata fields."""
    url = f"https://www.imdb.com/title/{imdb_id}/"
    r = requests.get(url, headers=IMDB_HEADERS, timeout=15)
    r.raise_for_status()

    html = r.text
    match = re.search(
        r'<script type="application/ld\+json">(.*?)</script>',
        html,
        re.DOTALL,
    )
    if not match:
        raise ValueError("IMDb page structure changed (JSON-LD not found)")

    ld = json.loads(match.group(1).strip())

    genres = ld.get("genre", [])
    if isinstance(genres, str):
        genres = [genres]

    directors = ld.get("director", [])
    if isinstance(directors, dict):
        directors = [directors]

    actors = ld.get("actor", [])
    if isinstance(actors, dict):
        actors = [actors]

    description = ld.get("description", "")
    release_year = ""
    date_published = ld.get("datePublished", "")
    if date_published:
        release_year = str(date_published).split("-")[0]

    rating_obj = ld.get("aggregateRating", {}) or {}
    rating_value = rating_obj.get("ratingValue", "")

    countries = ld.get("countryOfOrigin", [])
    if isinstance(countries, dict):
        countries = [countries]
    country = ""
    if countries:
        country = countries[0].get("name", "")

    return {
        "source": "web",
        "imdb_id": imdb_id,
        "title": ld.get("name", ""),
        "description": description,
        "genre": ", ".join([g for g in genres[:3] if g]),
        "release_year": release_year,
        "duration": _iso_duration_to_minutes(ld.get("duration", "")),
        "country": country,
        "director": ", ".join([d.get("name", "") for d in directors if d.get("name")][:3]),
        "cast": ", ".join([a.get("name", "") for a in actors if a.get("name")][:6]),
        "rating": str(rating_value) if rating_value else "",
        "poster_url": ld.get("image", ""),
    }


def search_movies(ia, query: str) -> list:
    """Search IMDb and return up to 8 results, with fallback if needed."""
    try:
        cg_results = ia.search_movie(query)
    except Exception:
        cg_results = []

    if cg_results:
        return [{"source": "cinemagoer", "movie": m} for m in cg_results[:8]]

    return search_movies_web(query)


def pick_movie(results: list, ia):
    """Let the user pick from search results and return the full IMDb movie object."""
    print("\nSearch results:")
    for i, m in enumerate(results):
        if m.get("source") == "cinemagoer":
            movie_ref = m.get("movie")
            year = movie_ref.get("year", "?")
            print(f"  [{i+1}] {movie_ref.get('title', 'Unknown')} ({year})")
        else:
            year = m.get("year", "?")
            print(f"  [{i+1}] {m.get('title', 'Unknown')} ({year})")
    print("  [0] None of these / cancel")

    while True:
        choice = input("\nPick a number: ").strip()
        if choice == "0":
            return None
        if choice.isdigit() and 1 <= int(choice) <= len(results):
            selected = results[int(choice) - 1]
            if selected.get("source") == "cinemagoer":
                movie = selected.get("movie")
                print(f"\n  Fetching full data for \"{movie.get('title', 'movie')}\" …")
                ia.update(movie)  # loads all keys (description, cast, etc.)
                return {"source": "cinemagoer", "movie": movie}

            print(f"\n  Fetching full data for \"{selected.get('title', 'movie')}\" …")
            meta = fetch_movie_details_web(selected.get("imdb_id", ""))
            if not meta.get("poster_url"):
                meta["poster_url"] = selected.get("poster_url", "")
            return {"source": "web", "meta": meta}
        print("  Invalid choice, try again.")


def extract_metadata(movie_wrapper) -> dict:
    """Pull fields from either Cinemagoer or fallback IMDb web metadata."""
    if movie_wrapper.get("source") == "web":
        return movie_wrapper.get("meta", {})

    movie = movie_wrapper.get("movie")
    if not movie:
        return {}

    """Pull the fields our API needs out of the IMDb movie object."""
    # Title
    title = movie.get("title", "")

    # Description / plot
    plots = movie.get("plot", [])
    if plots:
        # IMDb returns "plot. Author::Name" style strings
        description = plots[0].split("::")[0].strip()
    else:
        description = movie.get("plot outline", "")

    # Genre — IMDb returns a list
    genres_list = movie.get("genres", [])
    genre = ", ".join(genres_list[:3])  # keep max 3

    # Year
    release_year = movie.get("year", "")

    # Runtime in minutes
    runtimes = movie.get("runtimes", [])
    duration = int(runtimes[0]) if runtimes else ""

    # Country
    countries = movie.get("countries", [])
    country = countries[0] if countries else ""

    # Director
    directors = movie.get("directors", [])
    director = directors[0]["name"] if directors else ""

    # Cast — first 6 names
    cast_list = movie.get("cast", [])
    cast = ", ".join(p["name"] for p in cast_list[:6])

    # IMDb rating
    rating = movie.get("rating", "")

    # Poster URL (full-size if available, else thumbnail)
    poster_url = movie.get("full-size cover url") or movie.get("cover url", "")

    return {
        "title": title,
        "description": description,
        "genre": genre,
        "release_year": str(release_year),
        "duration": str(duration),
        "country": country,
        "director": director,
        "cast": cast,
        "rating": str(rating),
        "poster_url": poster_url,
    }


def display_metadata(meta: dict):
    """Pretty-print the fetched metadata for review."""
    print("\n" + "─" * 56)
    print(f"  Title      : {meta['title']}")
    print(f"  Year       : {meta['release_year']}")
    print(f"  Genre      : {meta['genre']}")
    print(f"  Duration   : {meta['duration']} min")
    print(f"  Country    : {meta['country']}")
    print(f"  Director   : {meta['director']}")
    print(f"  Cast       : {meta['cast']}")
    print(f"  Rating     : {meta['rating']}")
    desc_preview = (meta["description"] or "")[:120]
    if len(meta["description"] or "") > 120:
        desc_preview += "…"
    print(f"  Description: {desc_preview}")
    print(f"  Poster URL : {meta['poster_url'] or '(none)'}")
    print("─" * 56)


def edit_field(meta: dict, field: str, label: str):
    """Prompt the user to optionally override a single field."""
    current = meta[field]
    new_val = input(f"  {label} [{current}]: ").strip()
    if new_val:
        meta[field] = new_val


def review_and_edit(meta: dict) -> dict:
    """Show metadata and let the user edit any field."""
    display_metadata(meta)
    answer = input("\nLooks good? [Y/n/e=edit fields]: ").strip().lower()

    if answer == "n":
        print("Cancelled.")
        sys.exit(0)

    if answer == "e":
        print("\nPress Enter to keep the current value, or type a new one.\n")
        edit_field(meta, "title",        "Title        ")
        edit_field(meta, "release_year", "Year         ")
        edit_field(meta, "genre",        "Genre        ")
        edit_field(meta, "duration",     "Duration(min)")
        edit_field(meta, "country",      "Country      ")
        edit_field(meta, "director",     "Director     ")
        edit_field(meta, "cast",         "Cast         ")
        edit_field(meta, "rating",       "Rating       ")
        edit_field(meta, "description",  "Description  ")
        edit_field(meta, "poster_url",   "Poster URL   ")
        display_metadata(meta)

    return meta


def download_poster(poster_url: str) -> str | None:
    """Download the poster to a temp file. Returns the file path or None."""
    if not poster_url:
        return None
    try:
        print(f"\n  Downloading poster …", end=" ", flush=True)
        r = requests.get(poster_url, timeout=15)
        r.raise_for_status()

        content_type = r.headers.get("Content-Type", "image/jpeg")
        ext_map = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}
        ext = ext_map.get(content_type.split(";")[0].strip(), ".jpg")

        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
        tmp.write(r.content)
        tmp.close()
        print("done ✓")
        return tmp.name
    except Exception as e:
        print(f"failed ({e})")
        return None


def upload_movie(session: requests.Session, meta: dict, video_link: str, poster_path: str | None) -> bool:
    """POST the movie to /api/admin/movies. Returns True on success."""
    data = {
        "title":        meta["title"],
        "description":  meta["description"],
        "genre":        meta["genre"],
        "release_year": meta["release_year"],
        "duration":     meta["duration"],
        "country":      meta["country"],
        "director":     meta["director"],
        "cast":         meta["cast"],
        "rating":       meta["rating"],
        "video_link":   video_link,
    }

    files = {}
    poster_file = None
    if poster_path and os.path.exists(poster_path):
        poster_file = open(poster_path, "rb")
        mime = "image/jpeg"
        if poster_path.endswith(".png"):
            mime = "image/png"
        elif poster_path.endswith(".webp"):
            mime = "image/webp"
        files["poster"] = (os.path.basename(poster_path), poster_file, mime)

    try:
        print("\n  Uploading to server …", end=" ", flush=True)
        r = session.post(
            f"{SERVER_URL}/api/admin/movies",
            data=data,
            files=files if files else None,
            timeout=30,
        )
        if r.status_code == 200:
            movie_id = r.json().get("id", "?")
            print(f"done ✓  (id={movie_id})")
            return True
        else:
            print(f"failed!")
            print(f"  [!] Server responded {r.status_code}: {r.text}")
            return False
    except requests.RequestException as e:
        print(f"failed!")
        print(f"  [!] Request error: {e}")
        return False
    finally:
        if poster_file:
            poster_file.close()


def cleanup(poster_path: str | None):
    """Remove the temporary poster file."""
    if poster_path and os.path.exists(poster_path):
        try:
            os.remove(poster_path)
        except OSError:
            pass


def main():
    print("╔══════════════════════════════════════╗")
    print("║       RatZ Movie Uploader            ║")
    print("╚══════════════════════════════════════╝")

    # ── 1. Get search query ──────────────────────────────────────────────────
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
    else:
        query = input("\nMovie title to search: ").strip()

    if not query:
        print("No title entered. Exiting.")
        sys.exit(1)

    # ── 2. Search IMDb ───────────────────────────────────────────────────────
    ia = Cinemagoer()
    print(f"\n  Searching IMDb for \"{query}\" …")
    results = search_movies(ia, query)

    if not results:
        print("  No results found on IMDb.")
        print("  Tip: try the exact English title, e.g. 'The Dark Knight'.")
        sys.exit(1)

    movie_obj = pick_movie(results, ia)
    if movie_obj is None:
        print("Cancelled.")
        sys.exit(0)

    # ── 3. Extract & review metadata ────────────────────────────────────────
    meta = extract_metadata(movie_obj)
    if not meta or not meta.get("title"):
        print("  Could not read metadata for that title. Try another result.")
        sys.exit(1)
    meta = review_and_edit(meta)

    # ── 4. Get video link ────────────────────────────────────────────────────
    print()
    video_link = input("Video link (embed URL / stream URL): ").strip()
    if not video_link:
        print("  [!] No video link provided — movie will be saved without one.")

    # ── 5. Download poster ───────────────────────────────────────────────────
    poster_path = download_poster(meta["poster_url"])

    # ── 6. Log in to the server ──────────────────────────────────────────────
    print()
    username = DEFAULT_ADMIN_USER or input("Admin username: ").strip()
    password = DEFAULT_ADMIN_PASS or getpass.getpass("Admin password: ")

    session = requests.Session()
    print(f"\n  Logging in to {SERVER_URL} …", end=" ", flush=True)
    if not login(session, username, password):
        cleanup(poster_path)
        sys.exit(1)
    print("done ✓")

    # ── 7. Upload ────────────────────────────────────────────────────────────
    success = upload_movie(session, meta, video_link, poster_path)

    # ── 8. Cleanup ───────────────────────────────────────────────────────────
    cleanup(poster_path)

    if success:
        print(f"\n✅  \"{meta['title']}\" added successfully!")
    else:
        print("\n❌  Upload failed. Check the error above.")
        sys.exit(1)


if __name__ == "__main__":
    main()
