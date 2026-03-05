const ads = [
    { text: "FREE DOWNLOAD NOW!", link: "https://youtu.be/psha3ecS5K8", image: "imgs/ad1.png" },
    { text: "Click here to WIN BIG!", link: "https://youtu.be/psha3ecS5K8", image: "imgs/ad2.png" },
    { text: "Hurry! BUDAPEST NYUGATI PÁLYAUDVAR GAMEPLAY 2026!", link: "https://youtu.be/mZoHGuK_Psg", image: "imgs/ad3.png" },
    { text: "Jeffrey meghivott a szigetére! Klikk az elfogadáshoz", link: "https://youtu.be/yw_LlM6s5aI", image: "imgs/ad4.jpg"},
    { text: "NVCasino 400.000,000Ft bónusz és 400 ingyen pörgetés. Játsz most!", link: "https://www.youtube.com/watch?v=yUqFpPj7jOs", image: "imgs/nvcasino-2-6814b768bc19b7.60142442.webp"}
];

function getRandomAd() {
    const randomIndex = Math.floor(Math.random() * ads.length);
    return ads[randomIndex];
}

function loadAd() {
    const ad = getRandomAd();
    const adContainer = document.getElementById("ad-container");
    if (adContainer) {
        adContainer.innerHTML = `
            <a href="${ad.link}" target="_blank">
                <img src="imgs/small_x_icon_212667.png" alt="x" class="close-btn">
                <img src="${ad.image}" alt="Ad">
                <p>${ad.text}</p>
            </a>
        `;
    }
}
window.onload = loadAd;
