(function(){
    const text = document.getElementById('gif-text');
    const overlay = document.getElementById('gif-overlay');
    const img = document.getElementById('gif-image');
    const gifUrl = 'imgs/flashbang.gif';
    let timeoutId = null;
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
    text.addEventListener('click', showGif);
})();
