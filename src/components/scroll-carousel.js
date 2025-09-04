// src/components/scroll-carousel.js
window.ScrollCarousel = {
    init: function() {
        const carousel = document.getElementById('scroll-carousel');
        if (!carousel) return;

        const track = carousel.querySelector('.scroll-carousel-track');
        let position = 0;
        let animationId;
        let baseSpeed = 0.5; // базовая скорость автопрокрутки
        let baseDirection = -1; // -1 = справа-налево, 1 = слева-направо
        let currentSpeed = baseSpeed;
        let scrollAcceleration = 0;
        let lastScrollTime = Date.now();
        let isScrolling = false;
        
        // Автопрокрутка
        function animate() {
            position += currentSpeed * baseDirection;
            
            // Бесконечный цикл - возврат к началу
            const itemWidth = 320; // ширина одного элемента + gap
            const totalWidth = itemWidth * 12; // 12 оригинальных элементов
            
            if (Math.abs(position) >= totalWidth) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
            
            // Плавное замедление после скролла
            if (isScrolling) {
                const timeSinceScroll = Date.now() - lastScrollTime;
                if (timeSinceScroll > 100) {
                    isScrolling = false;
                    currentSpeed *= 0.95; // плавное замедление
                    if (Math.abs(currentSpeed - baseSpeed) < 0.1) {
                        currentSpeed = baseSpeed;
                    }
                }
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Обработчик скролла для ускорения
        let scrollTimeout;
        function handleScroll(event) {
            const scrollDelta = event.deltaY || (event.detail * -40) || 0;
            
            // Определяем направление скролла
            if (scrollDelta > 0) {
                // Скролл вниз - базовое направление справа-налево
                baseDirection = -1;
                scrollAcceleration = Math.min(scrollDelta * 0.02, 4);
                currentSpeed = baseSpeed + scrollAcceleration;
            } else if (scrollDelta < 0) {
                // Скролл вверх - базовое направление слева-направо  
                baseDirection = 1;
                scrollAcceleration = Math.min(Math.abs(scrollDelta) * 0.02, 4);
                currentSpeed = baseSpeed + scrollAcceleration;
            }
            lastScrollTime = Date.now();
            isScrolling = true;
            
            // Сброс через время
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollAcceleration = 0;
                currentSpeed = baseSpeed;
                isScrolling = false;
            }, 150);
        }
        
        // Запуск анимации
        animate();
        
        // Добавляем обработчики скролла
        window.addEventListener('wheel', handleScroll, { passive: true });
        window.addEventListener('DOMMouseScroll', handleScroll, { passive: true });
        
        // Очистка при уничтожении
        return {
            destroy: function() {
                cancelAnimationFrame(animationId);
                window.removeEventListener('wheel', handleScroll);
                window.removeEventListener('DOMMouseScroll', handleScroll);
            }
        };
    }
};