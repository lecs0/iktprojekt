const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const popup = document.getElementById('popup');
const overlay = document.getElementById('gif-overlay');
const img = document.getElementById('gif-image');
const gifUrl = 'imgs/foxy-jumpscare.gif';
let timeoutId = null;





function getRandomPercentage(perc) {
    const ranum = Math.floor(Math.random() * 10);
    if (ranum < perc) {
        return true;
    } else {
        return false;
    }
}



function showPopup() {
    if (getRandomPercentage(2)) { // 20% esély a popup megjelenésére) {
        popup.style.display = 'flex';
    } else {
        console.log("No popup this time!");
    }

};

popup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});






function showGif(){
        img.src = gifUrl;
        overlay.style.display = 'flex';
        img.style.height = '100vh';
        img.style.width = '100vw';
        clearTimeout(timeoutId);
        timeoutId = setTimeout(hideGif, 5000);
}
function hideGif(){
        overlay.style.display = 'none';
        img.src = '';
        clearTimeout(timeoutId);
}


function showShit(){
    if (getRandomPercentage(5)) {
        console.log("helo motherfucker");
        showGif();
    };
    if (getRandomPercentage(2)) {
        showPopup();
    };
};


document.addEventListener("DOMContentLoaded", showShit);