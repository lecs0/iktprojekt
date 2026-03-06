const imgs = [
    {image: "imgs/nvcasino-2-6814b768bc19b7.60142442.webp"},
    {image: "imgs/ad1.png"},
    {image: "imgs/ad2.png"},
    {image: "imgs/ad3.png"}
];

function loadPfp() {
    const randomPfpEls = document.getElementsByClassName("stream-profile");
    if (randomPfpEls.length > 0) {
        randomPfpEls[0].style.backgroundImage = `url(${imgs[Math.floor(Math.random() * imgs.length)].image})`;
    }
}
window.onload = loadPfp;
