// src/components/youtube.js
window.YouTube = {
  loadVideo: function(element) {
    if (element.dataset.loaded === 'true') return;
    element.dataset.loaded = 'true';
    
    const videoId = element.dataset.videoId;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('title', 'О моем подходе к психологической работе');
    iframe.setAttribute('loading', 'lazy');
    iframe.className = 'w-full h-full';
    
    element.style.opacity = '0.5';
    setTimeout(() => {
      element.innerHTML = '';
      element.appendChild(iframe);
      element.style.opacity = '1';
    }, 200);
  }
};