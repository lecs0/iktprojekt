movies = [
    { id: 0, title: "Marty Supreme", img: "https://media.themoviedb.org/t/p/w440_and_h660_face/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg", description: "A szélhámosból lett pingpongbajnok Marty Reisman útja a manhattani fogadásoktól a 22 bajnoki cím megnyeréséig. Marty rekordot állított be azzal, hogy 67 évesen ő lett a legidősebb, aki országos versenyt nyert a sportágban.", genre: "Dráma", relase: "2025", duration: "149", country: "USA"},
];







function getMovie() {
    const params = new URLSearchParams(window.location.search);
    const movieID = params.get('id');
    return movieID;
};

const movie = getMovie();

function displayMovie() {
    const movieData = movies[movie]
    const movieCont = document.getElementById("movie-cont");
    if (movieCont) {
        movieCont.innerHTML = `
        <div class="movie-poster">
            <img src="${movieData.img}" alt="${movieData.title} poster">
        </div>

        `;
    };
};

window.onload = displayMovie;
