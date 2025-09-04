document.addEventListener("DOMContentLoaded", function () {
    initAnimations();
    initMobileMenu();
    initHeaderScroll();
    // loadScript('src/components/back-to-top.js').then(() => { window.BackToTop.init(); });
    
    loadScript('src/components/advantages-block.js').then(() => {
        window.AdvantagesBlock.init();
    });
    
    // ===== КАРУСЕЛЬ - ВЫБОР ВЕРСИИ =====
    // Загружаем GSAP только если нужна 3D карусель
    // ВАРИАНТ 1: Стандартная scroll-карусель (раскомментировать для использования)

    // loadScript('src/components/scroll-carousel.js').then(() => {
    //     if (window.ScrollCarousel) {
    //         window.ScrollCarousel.init();
    //     }
    // });
    

   // ВАРИАНТ 2: 3D карусель с панорамными эффектами (раскомментировать для использования)
    loadScript('src/utils/gsap-loader.js')
        .then(() => loadScript('src/components/carousel-3d.js'))
        .then(() => {
            if (window.Carousel3D) {
                window.Carousel3D.init();
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки 3D карусели:', error);
        });
    
    loadScript('src/components/modals.js').then(() => { 
        window.Modals.init(); 
    });
    
    loadScript('src/components/carousel.js').then(() => {
        window.Carousel.initReviews();
    });
    
    loadScript('src/components/residence-block.js').then(() => {
        window.ResidenceBlock.init();
    });
    
    loadScript('src/components/stepper.js').then(() => {
        window.Stepper.init();
    });
    
    // CTA компонент - загружаем GSAP отдельно если еще не загружен
    loadScript('src/utils/gsap-loader.js')
        .then(() => loadScript('src/components/cta-scaling.js'))
        .then(() => {
            if (window.CTAScaling) {
                window.CTAScaling.init();
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки CTA компонента:', error);
        });
    
    loadScript('src/components/footer.js').then(() => {
        window.Footer.init();
    });
    
    initFaq();
});


// 1️⃣ Анимация главного экрана и секций
function initAnimations() {
    // 🚀 Анимация главного экрана (hero)
    document.querySelectorAll(".hero-item").forEach((item, index) => {
        // Настройка стилей перед анимацией
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
        
        // Применение анимации с меньшей задержкой
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 100 + (index * 100)); // Уменьшил задержку между элементами до 100мс
    });
    
    // 🚀 Анимация секций, блоков и элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Анимация всех блоков внутри секции
                const blocks = entry.target.querySelectorAll(".block");
                blocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.classList.add("visible");
                    }, index * 150); // Уменьшил задержку с 200мс до 150мс
                });
                
                // Анимация всех элементов внутри блоков
                entry.target.querySelectorAll(".item").forEach((item, itemIndex) => {
                    setTimeout(() => {
                        item.classList.add("visible");
                    }, itemIndex * 75); // Уменьшил задержку со 100мс до 75мс
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "-50px 0px" });
    
    document.querySelectorAll(".section-block").forEach(section => observer.observe(section));
}

// 2️⃣ Мобильное меню (плавное открытие/закрытие)
function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("open");
        menuToggle.textContent = mobileMenu.classList.contains("open") ? "✕" : "☰";
    });
    
    // Закрытие при клике вне меню
    document.addEventListener("click", function (event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove("open");
            menuToggle.textContent = "☰";
        }
    });
}

// 4️⃣ Плавное скрытие шапки при скролле
function initHeaderScroll() {
    const header = document.querySelector('.fixed-header');
    
    if (!header) return;
    
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', function () {
        const currentScrollPos = window.scrollY;
        if (prevScrollPos < currentScrollPos && currentScrollPos > 50) {
            header.classList.add("-translate-y-full");
        } else {
            header.classList.remove("-translate-y-full");
        }
        prevScrollPos = currentScrollPos;
    });
}

function loadYouTubeVideo(element) {
  loadScript('src/components/youtube.js').then(() => {
    window.YouTube.loadVideo(element);
  });
}

// 5️⃣ Инициализация секции FAQ
function initFaq() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем элемент ответа
            const answer = this.nextElementSibling;
            
            // Переключаем видимость ответа напрямую
            if (answer.classList.contains('hidden')) {
                // Показываем ответ
                answer.classList.remove('hidden');
                // Вращаем иконку
                this.querySelector('.faq-icon').classList.add('rotate-180');
                // Округляем только верхние углы кнопки
                this.classList.add('rounded-b-none');
            } else {
                // Скрываем ответ
                answer.classList.add('hidden');
                // Возвращаем иконку в исходное положение
                this.querySelector('.faq-icon').classList.remove('rotate-180');
                // Восстанавливаем полное округление кнопки
                this.classList.remove('rounded-b-none');
            }
        });
    });
}
