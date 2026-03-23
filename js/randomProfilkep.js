const imgs = [
    {image: "imgs/jimmy-zambo.jpg"},
    {image: "imgs/leclerc.jpg"},
];

function loadPfp(attempts = 0) {
    if (attempts >= imgs.length * 2) return;

    const randomPfpEls = document.getElementsByClassName("stream-profile");
    if (randomPfpEls.length > 0) {
        const selectedImg = imgs[Math.floor(Math.random() * imgs.length)].image;
        
        const tempImg = new Image();
        tempImg.onload = () => {
            randomPfpEls[0].style.backgroundImage = `url(${selectedImg})`;
        };
        tempImg.onerror = () => {
            loadPfp(attempts + 1);
        };
        tempImg.src = selectedImg;
    }
}
document.addEventListener("DOMContentLoaded", () => loadPfp());
