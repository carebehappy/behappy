// Карусель - универсальный компонент
window.Carousel = {
  // Инициализация обычной карусели
  init(carouselSelector = ".carousel", itemSelector = "img") {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;

    // Удаляем существующие кнопки
    carousel.closest(".carousel-container")?.querySelectorAll(".carousel-nav-button").forEach(btn => btn.remove());

    carousel.style.scrollBehavior = "smooth";
    carousel.style.scrollSnapType = "x mandatory";
    carousel.style.cursor = "grab";

    // Snap функция
    function snapToNearestItem() {
      const items = carousel.querySelectorAll(itemSelector);
      if (items.length === 0) return;
      const item = items[0];
      const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).marginRight || "0");
      const scrollPosition = carousel.scrollLeft;
      const itemIndex = Math.round(scrollPosition / itemWidth);
      carousel.scrollTo({ left: itemIndex * itemWidth, behavior: 'smooth' });
    }

    // Desktop события
    let isDragging = false, startX, scrollLeft;
    carousel.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = "grabbing";
      e.preventDefault();
    });
    
    carousel.addEventListener("mouseleave", () => {
      isDragging = false;
      carousel.style.cursor = "grab";
    });
    
    carousel.addEventListener("mouseup", () => {
      isDragging = false;
      carousel.style.cursor = "grab";
      snapToNearestItem();
    });
    
    carousel.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch события
    let touchStartX;
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener("touchmove", (e) => {
      if (!touchStartX) return;
      const touchX = e.touches[0].clientX;
      const walk = (touchX - touchStartX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
      e.preventDefault();
    });
    
    carousel.addEventListener("touchend", () => {
      touchStartX = null;
      snapToNearestItem();
    });

    // Навигационные кнопки
    const carouselContainer = carousel.closest(".carousel-container");
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&#10094;";
    prevButton.className = "carousel-nav-button bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 focus:outline-none";
    
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&#10095;";
    nextButton.className = "carousel-nav-button bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 focus:outline-none";

    const itemWidth = () => {
      const items = carousel.querySelectorAll(itemSelector);
      if (items.length === 0) return 0;
      const item = items[0];
      return item.offsetWidth + parseInt(getComputedStyle(item).marginRight || "0");
    };

    prevButton.addEventListener("click", () => {
      carousel.scrollBy({ left: -itemWidth(), behavior: "smooth" });
    });
    
    nextButton.addEventListener("click", () => {
      carousel.scrollBy({ left: itemWidth(), behavior: "smooth" });
    });

    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
    
    setTimeout(snapToNearestItem, 100);
  },

  // Инициализация карусели отзывов
  initReviews() {
    this.init(".reviews-carousel", ".review-item");
  }
};