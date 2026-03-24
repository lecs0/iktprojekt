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
    
    },
    {
        id: 2,
        title: "Anakonda",
        img: "https://m.media-amazon.com/images/M/MV5BMTNlMTk1YTItOWYxNi00ZWIzLTkyOWEtNTJmMzk4NmIyN2NmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "A csodás komikuscsapat (Jack Black, Paul Rudd, Steve Zahn) egy óriási óriáskígyóval küzdve, a dzsungel mélyén is rettentően vicces tud lenni: ez a film a legendás Trópusi vihar méltó társa! Doug (Jack Black) és Griff (Paul Rudd) kiskölyök koruk óta a legjobb haverok, és világ életükben arról álmodoztak, hogy egyszer filmet csinálnak. Méghozzá gyerekkori kedvencük, az óriáskígyós-dzsungeles-horrorkaland, az Anakonda remake-jét. Kezdik úgy érezni, hogy öregszenek, ezért nem várnak tovább, és minden pénzüket arra költik, hogy az eredeti helyszínen, az Amazonas őserdejében forgathassák újra a régi filmet. Vagyis: nincs pénzük, nem értenek a filmezéshez, és fogalmuk sincs a környék veszélyeiről – minden a legjobban alakul! Kivéve, hogy az őserdőben valóban találkoznak egy elképesztő méretű kígyóval. A vicces káosz halálosan veszélyes káosszá válik. Végül is, sokszor mondták, hogy az életüket adnák a filmért…",
        genre: "Akció, Kaland, Vígjáték",
        release: "2025",
        duration: "98",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229926412&id=456247233&hash=ad380fba507a4735"
    },
    {
        id: 3,
        title: "Zootropolis 2",
        img: "https://m.media-amazon.com/images/M/MV5BYjg1Mjc3MjQtMTZjNy00YWVlLWFhMWEtMWI3ZTgxYjJmNmRlXkEyXkFqcGc@._V1_.jpg",
        description: "Judy Hoppsz nyomozó és ravasz partnere, Nick Wilde egy rejtélyes hüllő tekergőző nyomába szegődik, miután az fenekestül felforgatja Zootropolist. Az ügy felgöngyölítése érdekében Judy és Nick az állati város olyan szegleteibe merül alá, amik alaposan próbára teszik még formálódó munkakapcsolatukat.",
        genre: "Akció, Kaland, Animáció, Vígjáték, Krimi",
        release: "2025",
        duration: "107",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229926412&id=456247222&hash=7ca51e9b1d87344a"
    },
    {
        id: 4,
        title: "SpongyaBob: Kalózkaland",
        img: "https://m.media-amazon.com/images/M/MV5BYzdlYmM2YmEtMmQ3Zi00ZjAxLTg2ZjctNzU3NDVkY2RiOTBjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "SpongyaBob és cimborái Bikinifenékről vitorlát bontanak, és nekivágnak az eddigi legnagyobb, vadonatúj, kihagyhatatlan mozis kalandjuknak… ami nem más, mint a SpongyaBob: Kalózkaland. SpongyaBob kétségbeesetten szeretne már nagy srác lenni, ezért, hogy bátorságát bizonyítsa Rák uramnak, nyomába ered a Bolygó Hollandinak – a titokzatos, kalandor szellemkalóznak – egy tengerjáró kalandvígjáték keretében, ami a mély tenger legmélyebb fenekére vezet, ahová Spongya eddig még nem merészkedett…",
        genre: "Kaland, Animáció, Vígjáték, Családi, Fantasy",
        release: "2025",
        duration: "88",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229926412&id=456247155&hash=52222965f90c72a9"
    },
    {
        id: 5,
        title: "Öt éjjel Freddy Pizzázójában 2",
        img: "https://m.media-amazon.com/images/M/MV5BZmQ3NmIxNTgtYjFiNS00NzliLWI0YzAtZDkxY2E0YWIxZDEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "Már nem csak Freddynél vannak. 2023-ban a Scott Cawthon nagysikerű videójátéka alapján készült adaptáció az év legnagyobb bevételt hozó horrorfilmje lett. Most itt a robotbábok terrorjának új, sokkoló fejezete. Egy év telt el a Freddy Fazbear Pizzázójában történt természetfeletti rémálom óta. Az ottani események kifacsart változata helyi legendaként él tovább, és ez inspirálta a város első Faz Fesztiválját. A volt biztonsági őr, Mike (Josh Hutcherson) és Vanessa rendőrtiszt (Elizabeth Lail) elhallgatták Mike 11 éves húga, Abby (Piper Rubio) elől az igazságot a robotbábu barátok sorsát illetően. Ám amikor Abby kiszökik, hogy újra találkozzon Freddyvel, Bonnie-val, Chicával és Foxyval, az félelmetes események láncolatát indítja el, sötét titkok",
        genre: "Horror, Misztikus, Thriller",
        release: "2025",
        duration: "104",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229926412&id=456247085&hash=ea795b6a8633e633"
    },
    {
        id: 6,
        title: "Chappie",
        img: "https://image.tmdb.org/t/p/original/73lhEwNGy03mEmaARgxmqwAyP4g.jpg",
        description: "Chappie-t születésekor elrabolják. Idegen emberek közé kerül, és egy különleges, össze-vissza, teljesen működésképtelen családban nevelkedik. Lassacskán kiderül róla, hogy különleges tehetség, természetfeletti érzékek birtokosa. Egyedi és megismételhetetlen, ám egyben megnevelhetetlen is. És nem mellesleg, ő egy robot...",
        genre: "Akció, Sci-Fi",
        release: "2015",
        duration: "120",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229384052&id=456242327&hash=9ed8ab8e270c2052"
    },
    {
        id: 7,
        title: "Démonok között: Utolsó rítusok",
        img: "https://image.tmdb.org/t/p/original/oG6Xs5gVOCSFHBnkFuy9LdnWg7x.jpg",
        description: "A Warren-sorozat, amelyet a neves paranormális nyomozók, Ed és Lorraine Warren által végzett, jól dokumentált ördögűzések ihlettek, elérkezett a hátborzongató végkifejlethez. Az évek során a házaspár számtalan ártatlan léleknek segített megszabadulni a rosszindulatú kísértésektől, több mint ezerszer. Ezúttal azonban minden másképp történt. A rutin nem jelent semmit. A bátorság nem nyújt védelmet. És a túlvilági erők talán nem is azt a családot veszik célba, amelynek védelméért a Warrenék küzdenek, hanem egyenesen Warrenéket. A Démonok között univerzumában játszódó film, James Wan producer vezetésével, Vera Farmiga és Patrick Wilson főszereplésével érkezik. Ismét egy félelmetes, túlvilági történetet visznek a vászonra, amely valós esetekből merít.",
        genre: "Horror, Thriller",
        release: "2025",
        duration: "135",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229384052&id=456241988&hash=2327aab6b85ac1aa"
    },
    {
        id: 8,
        title: "F1 – A film",
        img: "https://image.tmdb.org/t/p/original/vqBmyAj0Xm9LnS1xe1MSlMAJyHq.jpg",
        description: "Brad Pitt egy korábbi autóversenyzőt alakít, aki meglepetésszerűen visszatér a Forma–1-be Damson Idris fiatal, tehetséges csapattársa mellett az APXGP istállójába. A történet a pályán és azon kívül is követi dinamikus együttműködésüket, ahogy személyes és szakmai kihívásokkal küzdenek, hogy megőrizzék helyüket a motorsport csúcsán.",
        genre: "Akció, Dráma",
        release: "2025",
        duration: "155",
        country: "US",
        movie: "https://vk.com/video_ext.php?oid=-229926412&id=456242688&hash=78a7e8e34b02d820"
    },
    {
        id: 9,
        title: "SpongyaBob – A mozifilm",
        img: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/eex7xss44GKRATpujaOtGB8X5G1.jpg",
        description: "Kellemes, nyugodt az élet Bikinifenéken, ahol ananász a lakás és a herkentyűburger mindig friss és meleg a sarki Rák-csálóban. Valóságos Paradicsom, amit SpongyaBob Kockanadrág az otthonának nevez. Ám minden megváltozik, amikor lába kél Neptunusz király koronájának, és kiderül, hogy a gaz Plankton diktátori terveket dédelget. SpongyaBob és legjobb barátja, a kelekótya Patrick elindul, hogy felkutassák a koronát, és keresztülhúzzák Plankton számítását. A kalandokkal teli úton új világokat fedeznek fel, veszedelmes szörnyetegekkel találkoznak.",
        genre: "Rajzfilm",
        release: "2004",
        duration: "90",
        country: "US",
        movie: "https://vk.com/video_ext.php?oid=-229945191&id=456239179&hd=2&hash=c74298e726ef88a4"
    }
];

// halo mukodj szex 8

function displayHero(){
    const heroCont = document.getElementsByClassName("hero")[0];

    if (!heroCont) return;

    const randomIndex = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIndex];

    heroCont.innerHTML = `
        <img id="kepecske" src="${movie.img}" alt="${movie.title} poster">
        <div class="hero-backdrop"></div>
        <div class="hero-content container">
            <p class="hero-tag">Ajánlott</p>
            <h1>${movie.title}</h1>
            <div class="hero-actions">
                <a class="hero-play" href="/movie.html?id=${movie.id}" title="Movies">Lejátszás</a>
                <a class="hero-more" href="/movies.html">Többi film</a>
            </div>
        </div>
    `;
}

//<p class="hero-description">${movie.description}</p>

// hat ez nemtudom hogy jo lesz de majd megnezzuk mert ez letrehoz annyi postert amennyi film van de ezt lehet at kene alakitani a tamplateesre
function displayMovieList() {
  const posterRow = document.getElementById("poster-row");
  const areWeOnMain = document.getElementsByClassName("hero")[0];

  if (!posterRow) return;

  const createMovieCard = (movie) => {
    const card = document.createElement("article");
    card.className = "poster-card";
    card.onclick = () => (window.location.href = `movie.html?id=${movie.id}`);
    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title} poster">
      <span>${movie.title}</span>
    `;
    return card;
  };

  if (!areWeOnMain) {
    movies.forEach((movie) => {
      posterRow.appendChild(createMovieCard(movie));
    });
    return;
  }

  const count = Math.min(6, movies.length);
  const alreadyAdded = new Set();

  while (alreadyAdded.size < count) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    alreadyAdded.add(randomIndex);
  }

  for (const index of alreadyAdded) {
    const movie = movies[index];
    posterRow.appendChild(createMovieCard(movie));
  }
}


// id megkereses az urlbol
function getMovieId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// rendes film oldala erre is kell majd egy kis atalakitas
function displayMovieDetails() {
    const movieId = getMovieId() || 0;
    const movieCont = document.getElementById("movieCont");
    document.title = movies[movieId] ? movies[movieId].title : "Film Részletek"; // beallitom a titlet a film nevre

    if (!movieCont) return; // itt is azt nezem hogy nem e szar oldalon vagyunk

    if (movieId >= movies.length || movieId < 0) {
        title = "Error - Film nem található";
        movieCont.innerHTML = '<h1 style="margin-top: 50vh; text-align: center;">NE is próbáld megváltoztatni az URL-t, mert nem fog működni!<br><span style="color: red;">Buta cigany!</span></h1>';
        return;
    }

    const movieData = movies[movieId];
    if (!movieData) return;
    
    // displaygeci
    movieCont.innerHTML = `
<div class="movie-detail">
    <div class="row"><h2 class="movie-title">${movieData.title}</h2>
    </div>
    <div class="movie-poster">
        <img src="${movieData.img}" alt="${movieData.title} poster">
    </div>
    <div class="row">
        <div class="movie-info">
            <p class="movie-meta">Műfaj: ${movieData.genre} <br>Megjelenés: ${movieData.release} <br>Hossz: ${movieData.duration} perc<br>Ország: ${movieData.country}</p>
            <p class="movie-description">${movieData.description}</p>
        </div>
    </div>

    
</div>

<div class="like-button">
<input class="on" id="heart" type="checkbox" />
<label class="like" for="heart">
    <svg class="like-icon" fill-rule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
    </svg>
    <span class="like-text">Likes</span>
</label>
<span class="like-count one">66</span>
<span class="like-count two">67</span>
</div>
</div>



<div class="video-container">
    <iframe src="${movieData.movie}" width="880vw" height="500vh" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
</div>
        `;
    
}




// ez a varazslat ami eldonti hogy melyik oldalon is vagyink
window.onload = function() {
    if (document.getElementById('poster-row')) {
        displayHero();
        displayMovieList(); // ha a main oldalon vagyunk
    } else if (document.getElementById('movieCont')) {
        displayMovieDetails(); // ez meg a film
    }
};


//utalom a ciganyokat
