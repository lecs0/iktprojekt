const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const gifUrl = 'imgs/foxy-jumpscare.gif';
const jumpscareSoundUrl = 'imgs/foxy-jumpscare.mp3';
const GIF_DURATION_MS = 850;
const START_DELAY_MS = 4000;
let timeoutId = null;
let audioUnlocked = false;
let pendingAudioGesture = false;
let jumpscareShown = false;
let jumpscareActive = false;

const jumpscareAudio = new Audio(jumpscareSoundUrl);
jumpscareAudio.preload = 'auto';
jumpscareAudio.volume = 1;

function unlockJumpscareAudio() {
    if (audioUnlocked) return;
    jumpscareAudio.play()
        .then(() => {
            jumpscareAudio.pause();
            jumpscareAudio.currentTime = 0;
            audioUnlocked = true;
        })
        .catch(() => {
            audioUnlocked = false;
        });
}

window.addEventListener('pointerdown', unlockJumpscareAudio, { once: true });

function playJumpscareAudio() {
    jumpscareAudio.currentTime = 0;
    jumpscareAudio.play().catch(() => {
        pendingAudioGesture = true;
    });
}

window.addEventListener('pointerdown', () => {
    if (!pendingAudioGesture) return;
    const { overlay } = getGifElements();
    if (!overlay || overlay.style.display === 'none') return;

    pendingAudioGesture = false;
    jumpscareAudio.currentTime = 0;
    jumpscareAudio.play().catch(() => {
        pendingAudioGesture = true;
    });
});

function getPopupElement() {
    return document.getElementById('popup');
}

function getGifElements() {
    return {
        overlay: document.getElementById('gif-overlay'),
        img: document.getElementById('gif-image')
    };
}





function getRandomPercentage(perc) {
    const ranum = Math.floor(Math.random() * 10);
    if (ranum < perc) {
        return true;
    } else {
        return false;
    }
}



function showPopup() {
    const popup = getPopupElement();
    if (!popup) return;
    popup.style.display = 'flex';

};

const popup = getPopupElement();
if (popup) {
    popup.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    const popup = getPopupElement();
    if (popup && event.target === popup) {
        popup.style.display = 'none';
    }
});






function showGif(){
    if (jumpscareShown || jumpscareActive) return;
    const { overlay, img } = getGifElements();
        if (!img || !overlay) {
            setTimeout(() => {
                const retry = getGifElements();
                if (retry.img && retry.overlay) {
                    showGif();
                }
            }, 120);
            return;
        }
        jumpscareShown = true;
        jumpscareActive = true;
        overlay.style.display = 'flex';
        img.src = gifUrl;
        img.style.height = '100vh';
        img.style.width = '100vw';
        playJumpscareAudio();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(hideGif, GIF_DURATION_MS);
}
function hideGif(){
    const { overlay, img } = getGifElements();
    if (!img || !overlay) return;
        overlay.style.display = 'none';
        img.src = '';
    pendingAudioGesture = false;
        jumpscareAudio.pause();
        jumpscareAudio.currentTime = 0;
    jumpscareActive = false;
        clearTimeout(timeoutId);
}


function runLoadTriggers() {
    const willShowPopup = getRandomPercentage(3);

    if (willShowPopup) {
        showPopup();
        return;
    }

    setTimeout(() => {
        const willShowJumpscare = getRandomPercentage(1);
        if (willShowJumpscare) {
            showGif();
        }
    }, START_DELAY_MS);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLoadTriggers);
} else {
    runLoadTriggers();
}