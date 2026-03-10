//vegre sikerult nagynehezen foznom valamit es hat mondjuk azt hogy repetazni is fogunk
//meg csak a logika van kesz a tobbi szar



// Filmek lista
const movies = [
    { 
        id: 0, 
        title: "Marty Supreme", 
        img: "https://media.themoviedb.org/t/p/w440_and_h660_face/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg", 
        description: "A szélhámosból lett pingpongbajnok Marty Reisman útja a manhattani fogadásoktól a 22 bajnoki cím megnyeréséig. Marty rekordot állított be azzal, hogy 67 évesen ő lett a legidősebb, aki országos versenyt nyert a sportágban.", 
        genre: "Dráma", 
        release: "2025", 
        duration: "149", 
        country: "USA", 
        movie: "https://vk.com/video_ext.php?oid=-229945191&id=456240262&hash=539fe1ecb61968e0&hd=3"
    },
    {
        id: 1, 
        title: "Sharknado 2. - A második harapás ", 
        img: "https://m.media-amazon.com/images/M/MV5BMjA0MTIxMDEwNF5BMl5BanBnXkFtZTgwMDk3ODIxMjE@._V1_FMjpg_UX1000_.jpg",
        description: "Amikor a szeszélyes szél halálos ragadozókat repít hord New York város felé, veszélybe kerülnek a lakók; csak April és Fin mentheti meg a helyzetet.", 
        genre: "Akció, Kaland, Vígjáték, Horror", 
        release: "2014", 
        duration: "95", 
        country: "USA", 
        movie: "https://vk.com/video_ext.php?oid=-229926412&id=456247507&hash=3181bb72c7321e98"
    
    }
];

// hat ez nemtudom hogy jo lesz de majd megnezzuk mert ez letrehoz annyi postert amennyi film van de ezt lehet at kene alakitani a tamplateesre
function displayMovieList() {
    const posterRow = document.getElementById('poster-row');
    if (!posterRow) return; // -> igy talalom meg melyik oldalon vagyunk
    
    movies.forEach(movie => {
        const card = document.createElement('article');
        card.className = 'poster-card';
        card.onclick = () => window.location.href = `test2.html?id=${movie.id}`;
        card.innerHTML = `
            <img src="${movie.img}" alt="${movie.title} poster">
            <span>${movie.title}</span>
        `;
        posterRow.appendChild(card);
    });
}

// id megkereses az urlbol
function getMovieId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// rendes film oldala erre is kell majd egy kis atalakitas
function displayMovieDetails() {
    const movieId = getMovieId();
    const movieCont = document.getElementById("movieCont");
    
    if (!movieCont || movieId === null) return; // itt is azt nezem hogy nem e szar oldalon vagyunk
    
    const movieData = movies[movieId];
    if (!movieData) return; // ha valaki megprobalna random szamot beirni a film idhoz
    
    // displaygeci
    movieCont.innerHTML = `
        <div class="movie-detail">
            <div class="movie-poster">
                <img src="${movieData.img}" alt="${movieData.title} poster">
            </div>
            <div class="movie-info">
                <h1>${movieData.title}</h1>
                <p class="movie-meta">Mufaj: ${movieData.genre} <br>Megjelenes: ${movieData.release} <br>Hossz ${movieData.duration} perc<br>Orszag: ${movieData.country}</p>
                <p class="movie-description">${movieData.description}</p>
            </div>
        </div>
        <div class="video-container">
            <iframe src="${movieData.movie}" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
        </div>
        `;
    
}



// ez a varazslat ami eldonti hogy melyik oldalon is vagyink
window.onload = function() {
    if (document.getElementById('poster-row')) {
        displayMovieList(); // ha a main oldalon vagyunk
    } else if (document.getElementById('movieCont')) {
        displayMovieDetails(); // ez meg a film
    }
};
