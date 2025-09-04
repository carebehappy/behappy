// Интерактивный блок резиденции
window.ResidenceBlock = {
  init() {
    const featureItems = document.querySelectorAll('.feature-item');
    const mobileButtons = document.querySelectorAll('.feature-btn');
    const mainImage = document.getElementById('residence-main-image');
    
    if (!mainImage) return;
    
    let currentIndex = 0;
    let autoSlideInterval;

    // Смена изображения
    function changeImage(element) {
      const newSrc = `images/${element.dataset.image}`;
      const newAlt = element.dataset.alt;
      
      mainImage.classList.add('fade-out');
      setTimeout(() => {
        mainImage.src = newSrc;
        mainImage.alt = newAlt;
        mainImage.classList.remove('fade-out');
      }, 250);
    }

    // Обновление активных элементов
    function updateActiveItem(index) {
      // Десктоп
      featureItems.forEach(item => item.classList.remove('active'));
      if (featureItems[index]) {
        featureItems[index].classList.add('active');
        changeImage(featureItems[index]);
      }
      
      // Мобильная версия
      mobileButtons.forEach(btn => btn.classList.remove('active'));
      if (mobileButtons[index]) {
        mobileButtons[index].classList.add('active');
      }
      
      currentIndex = index;
    }

    // Автопрокрутка
    function startAutoSlide() {
      const totalItems = Math.max(featureItems.length, mobileButtons.length);
      if (totalItems === 0) return;
      
      autoSlideInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalItems;
        updateActiveItem(nextIndex);
      }, 4000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Обработчики десктоп
    featureItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        stopAutoSlide();
        updateActiveItem(index);
        setTimeout(startAutoSlide, 6000);
      });
    });

    // Обработчики мобильные
    mobileButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        stopAutoSlide();
        updateActiveItem(index);
        setTimeout(startAutoSlide, 6000);
      });
    });

    // Пауза при наведении
    const residenceBlock = document.querySelector('.elite-residence-block');
    if (residenceBlock) {
      residenceBlock.addEventListener('mouseenter', stopAutoSlide);
      residenceBlock.addEventListener('mouseleave', startAutoSlide);
    }

    // Запуск
    startAutoSlide();
  }
};