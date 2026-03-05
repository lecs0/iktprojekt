(function(){
    const text = document.getElementById('gif-text');
    const overlay = document.getElementById('gif-overlay');
    const img = document.getElementById('gif-image');
    const gifUrl = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExanNsODUyOGFuYmJiMWVxbTVjbHdnaHdsbmxjdTdvN3N6cTU0YWx6cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q/lBRdMWIFYAan9Hi5pV/giphy.gif';
    let timeoutId = null;
    function showGif(){
        img.src = gifUrl;
        overlay.style.display = 'flex';
        clearTimeout(timeoutId);
        timeoutId = setTimeout(hideGif, 6000);
    }
    function hideGif(){
        overlay.style.display = 'none';
        img.src = '';
        clearTimeout(timeoutId);
    }
    text.addEventListener('click', showGif);
    overlay.addEventListener('click', hideGif);
})();
