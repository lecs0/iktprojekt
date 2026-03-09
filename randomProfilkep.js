const imgs = [
    {image: "imgs/jimmy-zambo.jpg"},
];

function loadPfp() {
    const randomPfpEls = document.getElementsByClassName("stream-profile");
    if (randomPfpEls.length > 0) {
        randomPfpEls[0].style.backgroundImage = `url(${imgs[Math.floor(Math.random() * imgs.length)].image})`;
    }
}
window.onload = loadPfp;
