// Movie detail page script

async function loadMovieDetail() {
    const movieId = getMovieIdFromURL();
    
    console.log('Loading movie detail for ID:', movieId);
    
    if (!movieId) {
        document.getElementById('movie-detail').innerHTML = '<p>Movie not found</p>';
        return;
    }

    try {
        const url = `/api/movies/${movieId}`;
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movie = await response.json();
        console.log('Movie data received:', movie);
        displayMovieDetail(movie);
        // Start tracking time spent watching
        startProgressTracking(movie.id, movie.duration);
    } catch (error) {
        console.error('Error loading movie:', error);
        document.getElementById('movie-detail').innerHTML = `<p>Error loading movie: ${error.message}</p>`;
    }
}

function getMovieIdFromURL() {
    const path = window.location.pathname;
    console.log('Current path:', path);
    const id = path.split('/').pop();
    console.log('Extracted ID:', id);
    return id && !isNaN(id) ? id : null;
}

function displayMovieDetail(movie) {
    const container = document.getElementById('movie-detail');
    
    const videoHTML = movie.video_link ? `
        <div class="video-container">
            <iframe src="${movie.video_link}" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
        </div>
    ` : '';

    const ratingStars = movie.rating ? (() => {
        const r = parseFloat(movie.rating);
        const filled = Math.round(r / 2);
        return '★'.repeat(filled) + '☆'.repeat(5 - filled);
    })() : '';

    container.innerHTML = `
        <div class="movie-detail-container">
            <div class="movie-poster">
                <img src="${movie.poster_img || 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <h1>${movie.title}</h1>

                <div class="movie-badges">
                    ${movie.genre ? `<span class="badge badge-genre">${movie.genre}</span>` : ''}
                    ${movie.release_year ? `<span class="badge badge-year">${movie.release_year}</span>` : ''}
                    ${movie.duration ? `<span class="badge badge-duration">⏱ ${movie.duration} min</span>` : ''}
                    ${movie.country ? `<span class="badge badge-country">🌍 ${movie.country}</span>` : ''}
                    ${movie.rating ? `<span class="badge badge-rating">⭐ ${movie.rating}<span class="badge-rating-stars">/10</span></span>` : ''}
                </div>

                <div class="movie-meta-rows">
                    ${movie.director ? `
                    <div class="meta-row">
                        <span class="meta-label">Director</span>
                        <span class="meta-value">${movie.director}</span>
                    </div>` : ''}
                    ${movie.cast ? `
                    <div class="meta-row">
                        <span class="meta-label">Cast</span>
                        <span class="meta-value">${movie.cast}</span>
                    </div>` : ''}
                </div>

                ${movie.description ? `<p class="movie-description">${movie.description}</p>` : ''}
            </div>
        </div>
        ${videoHTML}
    `;
}

// Load on page load and when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMovieDetail);
} else {
    loadMovieDetail();
}

// ── Watch progress tracking ───────────────────────────────────────────────────
let _progressMovieId = null;
let _progressSeconds = 0;
let _durationSeconds = 0;
let _progressTimer = null;

function startProgressTracking(movieId, durationMinutes) {
    _progressMovieId = movieId;
    _durationSeconds = (durationMinutes || 0) * 60;

    // Load existing progress from server
    fetch('/api/users/history')
        .then(r => r.json())
        .then(history => {
            const existing = history.find(h => h.movie_id == movieId);
            if (existing) _progressSeconds = existing.progress_seconds || 0;
        })
        .catch(() => {});

    // Tick every second
    _progressTimer = setInterval(() => {
        _progressSeconds++;
        saveProgress();
    }, 1000);
}

function saveProgress() {
    if (!_progressMovieId) return;
    // Save every 10s to avoid hammering the server
    if (_progressSeconds % 10 !== 0) return;
    fetch('/api/users/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            movie_id: _progressMovieId,
            progress_seconds: _progressSeconds,
            duration_seconds: _durationSeconds
        })
    }).catch(() => {});
}

// Save on page leave
window.addEventListener('beforeunload', () => {
    if (!_progressMovieId || _progressSeconds === 0) return;
    navigator.sendBeacon('/api/users/progress',
        new Blob([JSON.stringify({
            movie_id: _progressMovieId,
            progress_seconds: _progressSeconds,
            duration_seconds: _durationSeconds
        })], { type: 'application/json' })
    );
});
