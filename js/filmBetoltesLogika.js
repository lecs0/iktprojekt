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
        country: "USA",
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
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229945191&id=456239179&hd=2&hash=c74298e726ef88a4"
    },
        {
        id: 10,
        title: "Gran Turismo",
        img: "https://www.themoviedb.org/t/p/original/1Hm5N4ucLa3LYWguBhQtiJ2MGHn.jpg",
        description: "A legőrültebb álmok is valóra válhatnak. Annak, aki elég vakmerő, elég gyors – és elég szerencsés. Jann az autóversenyek mámorában él. Csak a pálya létezik a számára. A reflexei, a bátorsága, az ereje mind alkalmassá teszi rá, hogy ő legyen a bajnok – otthon. Ugyanis ő a Gran Turismo játékban szorítja a kormányt. De padlóig nyomja a gázt, és átverekszi magát egy másik pályára: egy valódira. Megnyer egy sor versenyt, és kiválasztják: egy igazi csapat igazi menedzsere igazi autóba ülteti, igazi pályára küldi, és Jann-nak attól kezdve az igazi életét kell kockáztatni azért, hogy nyerjen. Valóra válhat élete legnagyobb álma: és ő bármit feláldoz azért, hogy profi autóversenyző legyen belőle. A film a legendás Gran Turismo játékon alapul, de az alkotók csavartak egyet a megfilmesítések szokásain: ezúttal egy bajnok játékos áll a benzingőzös, őrült száguldás középpontjában.",
        genre: "Akció, Kaland, Dráma",
        release: "2023",
        duration: "132",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=749867145&id=456239383&hash=fde84ff8445edca3"
    },
        {
        id: 11,
        title: "SpongyaBob Kockanadrág - Spongya-kedvencek karácsonyra",
        img: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/aHWtEYxIDHdermxCXGZ7jewLk8B.jpg",
        description: "A Csendes-óceán mélyén, Bikini-fenék városában él a világ leghíresebb és legvagányabb tengeri szivacsa, SpongyaBob Kockanadrág. Itt a karácsony, és Spongya kedvenc epizódjainak válogatásával kezeskedik azért, hogy mindenkit elöntsön a karácsonyi hangulat. Patrikkal hógolyócsatába keverednek, még Tunyacsápot is sikerül megbolondítaniuk. Szandi hibernálja magát a téli időszakra, és egészen furcsán viselkedik, amikor SpongyaBob meglátogatja téli álma közben. Csokiárulás, házi dolgozat írása, és megannyi izgalmas esemény történik hőn szeretett rajzfilmhősünk életében.",
        genre: "Animációs, Kaland, Vígjáték, Rajzfilm",
        release: "2003",
        duration: "112",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229945191&id=456239180&hd=2&hash=f40ea7b12ddb00ea"
    },
        {
        id: 12,
        title: "Egy MINECRAFT film",
        img: "https://image.tmdb.org/t/p/original/rOawabcW2HAhWgSJiiPaVGTYZyx.jpg",
        description: "Négy kívülálló – Garrett Garrison, Henry, Natalie és Dawn – kiszakad a mindennapi életéből, amikor egy titokzatos portálon keresztül egy különös világba kerülnek: A Felsővilágba, egy furcsa, kocka alakú földre, ahol a fantázia uralkodik. Ahhoz, hogy visszataláljanak a valóságba, el kell sajátítaniuk ezt a szokatlan világot, és meg kell védeniük magukat az olyan fenyegetésekkel szemben, mint a zombik és a megvadult disznók. Segítségükre van Steve, egy tapasztalt mesterember, aki elkíséri őket az útjukon. Miközben együtt győzik le a kihívásokat, rájönnek, hogy éppen a kreatív képességek, amelyek jellemzik őket, a siker kulcsa – mind a túlvilágon, mind a saját világukban.", 
        genre: "Családi, Vígjáték, Kaland, Fantasy",
        release: "2025",
        duration: "101",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229384052&id=456240428&hash=c9fd0bd599b90adf&"
    },
        {
        id: 13,
        title: "Öt éjjel Freddy pizzázójában",
        img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2XDduGVrAndKPCuZ01JncNP4xeD.jpg",
        description: "Túl tudsz élni öt éjszakát? A félelmetes horrorjáték-jelenségből vérfagyasztó moziesemény lesz, mert a Blumhouse – a M3GAN, a Fekete telefon és a Láthatatlan ember mögött álló stúdió – felvarázsolja a FIVE NIGHTS AT FREDDY’S filmet a vászonra. A film egy zaklatott éjjeliőrt követ, aki dolgozni kezd a Freddy Fazbear’s Pizzánál. Miközben az első éjszakáját tölti az új munkahelyén, ráébred, hogy az éjszakai műszakot Freddy’snél nem lesz olyan könnyű túlélni.", 
        genre: "Horror, Rejtély",
        release: "2023",
        duration: "109",
        country: "USA",
        movie: "https://ok.ru/videoembed/7808138939061"
    },
        {
        id: 14,
        title: "Az útvesztő",
        img: "https://www.themoviedb.org/t/p/original/tsBc2UPm4vnDU4FwXWUxLhjdjdb.jpg",
        description: "Thomas egy liftben ébred, és a nevén kívül nem emlékszik semmire. Az ajtón túl különös világ várja. 60 srác, akik elzártan, szigetszerű univerzumukban élnek, és egyetlen dolgot tanulnak: a túlélés trükkjeit. Ők nem lepődnek meg az újonnan érkezőn: havonta egyszer mindig jön valaki. Világukat útvesztő veszi körül. Aki szökni próbál - és sokan vannak ilyenek - mind ottvesznek. Ezek a szabályok, melyek nem változnak és nem változtathatók. Valami mégis átalakul. Egy titokzatos üzenet hatására néhány srác azt hiszi, van remény a lázadásra. Még akkor is, ha fogalmuk sincs, ki ellen kell lázadniuk, és mekkora veszéllyel próbálnak szembenézni.", 
        genre: "Sci-fi, Akció",
        release: "2014",
        duration: "113",
        country: "USA",
        movie: "https://videa.hu/player?v=ZGyMujMQDggghnm7"
    },
        {
        id: 15,
        title: "Venom 2. - Vérontó",
        img: "https://www.themoviedb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
        description: "„Ha egyszer kiszabadulok innen, lesz egy kis vérontás” – mondta egy titokzatos fegyenc a Venom végén Eddie Brock-nak (Tom Hardy). Annak a vakmerő, nagyszájú tényfeltáró újságírónak, aki egy laboratóriumi felderítése során súlyosan megfertőződött: és azóta szimbiótaként, a testében élősködő gonosz Venommal együtt kénytelen élni. És kezdi megszeretni, hogy egy szupererős szörny lapul benne. Rá is szorul: mert mostantól nemcsak magával kell szembenéznie, hanem egy nála is erősebb, gonoszabb lénnyel, akit nem akar senki rövid pórázon tartani. Jön Vérontó (Woody Harrelson), hogy ígérete szerint pusztítson a világon. Meg kell állítani. Bármi áron. A Venom első része őrült siker volt, több mint 850 millió dollár bevételt termelt világszerte: az első rész sztárjai most mind visszatérnek, sőt, egy pompás főgonosszal egészülnek ki, hogy elbeszéljék a félig jó, félig gonosz Marvel-hős még",
        genre: "Kaland, Horror, Akció, Thriller, Sci-fi",
        release: "2021",
        duration: "97",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229945191&id=456240261&hash=880f6cf5dadde10f&hd=3"
    },
        {
        id: 16,
        title: "Venom - Az utolsó menet",
        img: "https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "Eddie Brock (Tom Hardy) nagyjából boldogan élt. Volt barátnője, munkája… aztán úgy alakult, hogy egy űrből érkezett, pusztító étvágyú szörny érkezett a földre, és pont őt választotta gazdatestnek. Azóta Eddie magányos, meggyötört… és legyőzhetetlen. Ha bajba kerül, a benne rejtőző szörny előbújik belőle, és kérlelhetetlenül felzabálja a támadókat. Meg egy kis rendetlenséget csinál közben. De lehet, hogy van olyan ellenség, ami a szupererős Venomnak is sok – a saját bolygójáról, a saját fajtársai rátalálnak, megérkeznek a földre, és persze nincs bennük kímélet. Az egész bolygót könnyedén elpusztíthatják. Venom azonban már inkább a földiek pártján van. Harcba száll a fajtársai ellen – de ahova ő megy, oda Eddie-nek is mennie kell. És ha ő halálos veszélybe kerül, akkor Eddie-nek is bőven van félnivalója.", 
        genre: "Akció, Kaland, Sci-fi, Thriller",
        release: "2024",
        duration: "110",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=886525422&id=456239715&hash=dd855db6d29384bc"
    },
        {
        id: 17,
        title: "Borat - Kazah nép nagy fehér gyermeke menni művelődni Amerika",
        img: "https://www.themoviedb.org/t/p/original/uoWTjC8S4iuT2Z7daowN6785nnl.jpg",
        description: "Borat Sagdiyev újságíró a kazah televízió sztárja. Az öntelt, tudatlan, tolakodó férfi a kazah Tájékoztatási Minisztérium megbízásából az Amerikai Egyesült Államokba utazik, hogy dokumentumfilmet forgasson, amiből minden kazah tanulhat és az ország javát szolgálhatja. Miközben bejárja az Államokat, rengeteg féle emberrel hozza össze a sors. Furcsa szokásaival, kérdéseivel botrányt botrányra halmoz, de észre sem veszi, mekkora felfordulást kavar maga körül. Meg van róla győződve, hogy a lehető legjobban végzi munkáját, tudásvágyát pedig csak a nők utáni vágya múlja felül. Kényesebbnél kényesebb témákat feszeget, miközben, bár nem szándékosan, de leleplezi az amerikai társadalom előítéletes és képmutató mivoltát.",
        genre: "Vígjáték",
        release: "2006",
        duration: "84",
        country: "USA",
        movie: "https://videa.hu/player?v=NV1mcDp2JEMCKN32"
    },
        {
        id: 18,
        title: "Borat utólagos mozifilm",
        img: "https://www.themoviedb.org/t/p/original/8ueJgvbEZgdtKvB8QbjkFs0fcbj.jpg",
        description: "Borat elmeséli, hogy tizennégy évvel ezelőtti filmjével óriási szégyent hozott országára, igaz, csak elindul egy újabb amerikai küldetésre, méghozzá most azért, hogy lányát ajándékul adja valaki olyannak, aki közel áll az USA 'trónjához'. Ám Boratnak gondja akad ottani népszerűségével, így muszáj álruhát hordania, nehogy felismerjék, miközben közelebbről is megismeri a karanténba vonult országot, no meg serpenyővel csapkodja a koronavírust, hogy végül Donald Trumpnak öltözve szolgálja fel lányát a jelenlegi alelnöknek, Mike Pence-nek.",  
        genre: "Vígjáték",
        release: "2020",
        duration: "95",
        country: "USA",
        movie: "https://ebd.cda.pl/1920x1080/1725906235"
    },
        {
        id: 19,
        title: "Kézipoggyász",
        img: "https://m.media-amazon.com/images/M/MV5BNTNkMjQzNmQtNzE4ZC00NDlmLTkyYjAtZDZkYTQ5NjBmYThlXkEyXkFqcGc@._V1_.jpg",
        description: "Egy titokzatos utazó megzsarolta Ethan Kopeket, a fiatal TSA-ügynököt, hogy engedjen át egy veszélyes csomagot a biztonsági ellenőrzésen, és juttasson fel egy karácsonyi járatra.",   
        genre: "Akció, Krimi, Misztikus, Thriller",
        release: "2024",
        duration: "119",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=886525422&id=456239847&hash=9a290d39fa8bef32"
    },
        {
        id: 20,
        title: "Plankton: A film",
        img: "https://image.tmdb.org/t/p/original/ayOOf4A4liNHVZ00Si970qkXR4w.jpg",
        description: "Plankton szövevényes szerelmi élete öntudatra ébredt gépi intelligencia feleségével még jobban félresiklik, amikor Karen úgy dönt, nélküle pusztítja el a világot.",
        genre: "Animációs, Kaland, Vígjáték, Családi, Fantasy",
        release: "2025",
        duration: "87",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=749867145&id=456246386&hash=bc5ffd2f7cdebb6f&"
    },
        {
        id: 21,
        title: "Madagaszkár",
        img: "https://m.media-amazon.com/images/M/MV5BYjk4OGFmZmYtYWE4NC00MzM4LTkwZTItODdhMjk3NTZjMmI5XkEyXkFqcGc@._V1_.jpg",
        description: "Az állatkerti állatok, Alex, az oroszlán, Marty, a zebra, Melman, a zsiráf és Gloria a víziló jól megvannak a maguk kis környezetében. Marty azonban szeretné megízlelni a szabadság ízét, ezért néhány pingvinnel együtt megszökik. Barátai azonnal a zebra nyomába erednek, de olyan kalandokban lesz részük, melyekről álmodni sem mertek volna.",
        genre: "Paródia, Kaland",
        release: "2005",
        duration: "86",
        country: "USA",
        movie: "https://vk.com/video_ext.php?oid=-229926412&id=456242933&hash=916f9d560bd8886c"
    },
        {
        id: 22,
        title: "Gru",
        img: "https://www.mafab.hu/static/profiles/2014/293/06/28683_25.jpg",
        description: "A fekete ház a kiszáradt kertjével nem illik az idilli kertvárosi képbe. Hátha még a környéken lakók sejtenék, hogy titkos búvóhely lapul alatta! Itt él és dolgozik ugyanis a velejéig gonosz Gru, aki zsugor- és fagyasztósugara, valamint különféle légi és szárazföldi harceszközei segítségével mindenkit elsöpör, aki keresztezi az útját. Gru legújabb terve pedig az, hogy ellopja a Holdat. Úgy tűnik, nincs senki, aki képes lenne megakadályozni ebben. Senki, hacsak a három árva kislány nem. Margo, Edith és Agnes ugyanis talán még Gru szívét is meglágyítják.",
        genre: "Vígjáték, Animáció, Kaland",
        release: "2010",
        duration: "95",
        country: "USA",
        movie: "https://ok.ru/videoembed/8291837414069"
    },
        {
        id: 23,
        title: "Minyonok",
        img: "https://media.port.hu/images/000/683/350x510/099.jpg",
        description: "A minyonok története az idők kezdetétől ered. Egysejtű sárga organizmusként kezdték, korokon át fejlődtek, és mindig a „leggrúsabb” gazdákat szolgálták. Mivel ezeket a gazdákat – a T-Rextől Napóleonig – folyton elveszítik, a minyonoknak most nincs kit szolgálniuk, és mély depresszióba zuhannak. Ám a Kevin nevű minyonnak van egy terve, és Stuarttal, a lázadó tinédzserrel és az imádnivaló kis Bobbal karöltve nekivágnak a világnak, hogy megkeressék azt az új gonosz főnököt, akit a fajtájuk követhet. A trió izgalmas utazásra indul, ami végül elvezet a következő lehetséges gazdájukhoz, a Bíbor Túlölőhöz, a világ első női szupergonoszához. A jeges Antarktiszról a hatvanas évek New Yorkjába utaznak, majd Londonban kötnek ki, ahol az eddigi legnagyobb kihívással kell szembenézniük: meg kell",     
        genre: "Animáció, Vígjáték, Kaland",
        release: "2015",
        duration: "91",
        country: "USA",
        movie: "https://videa.hu/player?v=JCT3lFoL9DZLpsOZ"
    },
];

function displayHero(){
    const heroCont = document.getElementsByClassName("hero")[0];

    if (!heroCont) return;

    const randomIndex = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIndex];

    heroCont.innerHTML = `
        <img id="kepecske" src="${movie.img}" alt="${movie.title} poster">
        <div class="hero-backdrop position-absolute"></div>
        <div class="hero-content container pb-5">
            <p class="hero-tag mb-1 position-relative">Ajánlott</p>
            <h1 class="mb-4">${movie.title}</h1>
            <div class="hero-actions gap-3 d-flex">
                <a class="hero-play text-decoration-none" href="/movie.html?id=${movie.id}" title="Movies">Lejátszás</a>
                <a class="hero-more text-decoration-none" href="/movies.html">Többi film</a>
            </div>
        </div>
    `;
}

function createMovieCard(movie) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3 col-xl-2";
    col.innerHTML = `
        <article class="poster-card h-100" role="button" tabindex="0" data-movie-id="${movie.id}">
            <img src="${movie.img}" alt="${movie.title} poster" class="w-100">
            <span>${movie.title}</span>
        </article>
    `;

    const card = col.querySelector('.poster-card');
    card.onclick = () => (window.location.href = `movie.html?id=${movie.id}`);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.location.href = `movie.html?id=${movie.id}`;
        }
    });

    return col;
}

function makeMovieRow(movieList) {
    const posterRow = document.getElementById("poster-row");
    if (!posterRow) return;

    posterRow.innerHTML = "";
    movieList.forEach((movie) => {
        posterRow.appendChild(createMovieCard(movie));
    });
}

function displayMovieList() {
  const posterRow = document.getElementById("poster-row");
  const areWeOnMain = document.getElementsByClassName("hero")[0];

  if (!posterRow) return;

  if (!areWeOnMain) {
        makeMovieRow(movies);
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

function normalizeSearchText(value) {
    return String(value || '').toLowerCase().trim();
}

function matchesSearch(movie, query) {
    if (!query) return true;

    return normalizeSearchText(movie.title).includes(query);
}

function initMoviesSearch() {
    const posterRow = document.getElementById('poster-row');
    const searchInput = document.getElementById('movies-search-input');
    const resultText = document.getElementById('movies-search-result');
    const areWeOnMain = document.getElementsByClassName('hero')[0];

    if (!posterRow || !searchInput || !resultText || areWeOnMain) return;

    const applySearch = () => {
        const query = normalizeSearchText(searchInput.value);
        const filteredMovies = movies.filter((movie) => matchesSearch(movie, query));
        makeMovieRow(filteredMovies);
        resultText.classList.remove('movies-search-result-empty');

        if (!query) {
            resultText.textContent = `${movies.length} film`;
            return;
        }


        if (filteredMovies.length === 0) {
            resultText.textContent = 'Nincs találat';
            resultText.classList.add('movies-search-result-empty');
            return;
        }

        resultText.textContent = `${filteredMovies.length} találat`;


    };

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            applySearch();
        }
        if (event.key === 'Escape') {
            searchInput.value = '';
            applySearch();
        }
    });
    searchInput.addEventListener('input', applySearch);

    applySearch();
}

function getMovieId() {
    const params = new URLSearchParams(window.location.search);

    return params.get('id');
}

function displayMovieDetails() {    
    const movieId = getMovieId() || 0;
    const movieCont = document.getElementById("movieCont");
    document.title = movies[movieId] ? movies[movieId].title : "Filmek";

    if (!movieCont) return;

    if (movieId >= movies.length || movieId < 0) {
        title = "Error - Film nem található";
        if (movieId == 13) {
            movieCont.innerHTML = '<h1 style="margin-top: 50vh; text-align: center;">Hallod te cigany!<br>ez nem...<br><span style="color: red;">vicces</span></h1>';
        }
        if (movieId == 67) {
            movieCont.innerHTML = '<h1 style="margin-top: 50vh; text-align: center;">Hallod te cigany!<br>ez nem...<br><span style="color: red;">vicces</span></h1>';
        }
        if (movieId == 69) {
            movieCont.innerHTML = '<h1 style="margin-top: 50vh; text-align: center;">Hallod te cigany!<br>ez nem vicces...<br><span style="color: red;">TE perverz</span></h1>';
        }
        else {
            movieCont.innerHTML = '<h1 style="margin-top: 50vh; text-align: center;">NE is próbáld megváltoztatni az URL-t, mert nem fog működni!<br><span style="color: red;">TE cigány!</span></h1>';
        }
        return;
    }

    const movieData = movies[movieId];
    if (!movieData) return;
    movieCont.innerHTML = `
<section class="movie-detail py-4 py-lg-5 mt-2">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-auto col-lg-auto d-flex flex-column align-items-center mb-0">
                <div class="movie-poster d-block mb-1 mt-2">
                    <img src="${movieData.img}" alt="${movieData.title} poster" class="img-fluid rounded-3">
                </div>
            </div>
            <div class="col-12 col-sm col-lg d-flex flex-column mb-1">
                <h2 class="movie-title mb-3 mt-auto">${movieData.title}</h2>
                <p class="movie-meta mb-3">Műfaj: ${movieData.genre} <br>Megjelenés: ${movieData.release} <br>Hossz: ${movieData.duration} perc<br>Ország: ${movieData.country}</p>
                <p class="movie-description mb-auto" style="max-width: 1000px;">${movieData.description}</p>
                <div class="like-button d-flex position-relative mt-auto mb-0">
                    <input class="on" id="heart" type="checkbox" />
                    <label class="like" for="heart">
                        <svg class="like-icon" fill-rule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
                        </svg>
                        <span class="like-text">Likes</span>
                    </label>
                    <span class="like-count position-absolute d-flex one">66</span>
                    <span class="like-count position-absolute d-flex two">67</span>
                </div>
            </div>
        </div>

        <div class="video-container mb-5 mt-5">
            <div class="ratio ratio-16x9">
                <iframe src="${movieData.movie}" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
            </div>
        </div>
    </div>
</section>
        `;
    
}

window.onload = function() {
    if (document.getElementById('poster-row')) {
        displayHero();
        displayMovieList();
        initMoviesSearch();
    } else if (document.getElementById('movieCont')) {
        displayMovieDetails();
    }
};