// Main app.js for public movie listing

async function loadMovies() {
    try {
        const response = await fetch('/api/movies');
        const movies = await response.json();
        
        const moviesGrid = document.getElementById('movies-grid');
        moviesGrid.innerHTML = '';
        
        if (movies.length === 0) {
            moviesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No movies found</p>';
            return;
        }

        // Set first movie as hero
        const firstMovie = movies[0];
        document.getElementById('hero-title').textContent = firstMovie.title;
        document.getElementById('hero-description').textContent = firstMovie.description || 'Watch now';

        // Load all movies
        movies.forEach(movie => {
            const card = document.createElement('article');
            card.className = 'poster-card';
            card.innerHTML = `
                <img src="${movie.poster_img || 'https://via.placeholder.com/180x240?text=No+Image'}" alt="${movie.title}">
                <span>${movie.title}</span>
            `;
            card.style.cursor = 'pointer';
            card.onclick = () => {
                window.location.href = `/movie/${movie.id}`;
            };
            moviesGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

// Search functionality
async function handleSearch() {
    const query = document.getElementById('search-input').value.trim();
    // Redirect to dedicated search page
    window.location.href = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
}

async function handleSearchOLD_UNUSED() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        loadMovies();
        return;
    }

    try {
        const response = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`);
        const movies = await response.json();
        
        const moviesGrid = document.getElementById('movies-grid');
        moviesGrid.innerHTML = '';
        
        if (movies.length === 0) {
            moviesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No movies found</p>';
            return;
        }

        movies.forEach(movie => {
            const card = document.createElement('article');
            card.className = 'poster-card';
            card.innerHTML = `
                <img src="${movie.poster_img || 'https://via.placeholder.com/180x240?text=No+Image'}" alt="${movie.title}">
                <span>${movie.title}</span>
            `;
            card.style.cursor = 'pointer';
            card.onclick = () => {
                window.location.href = `/movie/${movie.id}`;
            };
            moviesGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error searching movies:', error);
    }
}

// Setup event listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
});

// Load movies on page load
window.addEventListener('load', loadMovies);
