// Универсальная функция для загрузки скриптов
window.loadScript = async function(src) {
  return new Promise((resolve, reject) => {
    // Проверяем, не загружен ли уже скрипт
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};