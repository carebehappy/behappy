// src/components/carousel-3d.js
// 3D Карусель с панорамными изображениями для проекта BEHAPPY
window.Carousel3D = {
    carousel: null,
    isInitialized: false,
    
    init: async function() {
        if (this.isInitialized) return;

        const carouselSection = document.getElementById('carousel-3d-section');
        if (!carouselSection) {
            console.warn('Секция carousel-3d-section не найдена');
            return;
        }

        // Ждём загрузку GSAP
        const gsap = await window.GSAPLoader.load();
        if (!gsap) {
            console.error('❌ Не удалось загрузить GSAP для 3D карусели');
            return;
        }

        // Проверяем наличие контейнера в HTML
        const carousel3DContainer = carouselSection.querySelector('.carousel-3d-container');
        if (!carousel3DContainer) {
            console.error('Контейнер .carousel-3d-container не найден в HTML');
            return;
        }

        this.initCarousel(carouselSection);
        this.isInitialized = true;

        console.log('🚀 3D Карусель BEHAPPY инициализирована');
    },
    
    initCarousel: function(section) {
        // Изображения из папки panoram - панорамные фото пансионата
        const basePath = "./images/panoram/";
        const imageFiles = [
            "dining68.png",    // Столовая
            "gym68.png",       // Спортзал
            "house68.png",     // Общий вид дома
            "room68.png",      // Комната
            "swinpool68.png",  // Бассейн
            "ter68.png",       // Терраса 1
            "ter68-2.png"      // Терраса 2
        ];

        // Настройки анимации и скорости
        const BASE_SPEED = 0.11;          // Базовая скорость вращения
        const DECAY = 0.008;              // Скорость возвращения к базовой скорости
        const WHEEL_K = 0.004;            // Коэффициент влияния колеса мыши
        const SCROLL_K = 0.0002;          // Коэффициент влияния скролла страницы
        const SPEED_CLAMP = 0.6;          // Максимальная скорость
        
        // Панорамные эффекты
        const PANO_BOOST = 0.05;          // Сила панорамного смещения
        const PANO_SIZE = 0.05;           // Увеличение размера при повороте

        const ringEl = document.getElementById('carousel-3d-ring');
        if (!ringEl) {
            console.error('Элемент carousel-3d-ring не найден');
            return;
        }

        let panels = [];
        let curRot = 0;
        let speed = BASE_SPEED;
        let targetSpeed = BASE_SPEED;
        let baseDirection = -1;           // Направление вращения по умолчанию
        let lastScrollY = window.scrollY;
        let isScrolling = false;
        let lastScrollTime = Date.now();

        const buildPanels = () => {
            ringEl.innerHTML = '';
            panels = imageFiles.map((file) => {
                const panel = document.createElement('div');
                panel.className = 'carousel-3d-panel';
                panel.style.backgroundImage = `url("${basePath}${file}")`;
                
                // Добавляем alt-текст для доступности через data-атрибут
                const altTexts = {
                    "dining68.png": "Столовая пансионату",
                    "gym68.png": "Спортивний зал",
                    "house68.png": "Загальний вигляд будинку",
                    "room68.png": "Комфортна кімната",
                    "swinpool68.png": "Басейн для реабілітації",
                    "ter68.png": "Тераса для відпочинку",
                    "ter68-2.png": "Тераса з видом на сад"
                };
                
                panel.setAttribute('data-alt', altTexts[file] || 'Фото пансионату');
                ringEl.appendChild(panel);
                return panel;
            });
            layoutRing();
        };

        const layoutRing = () => {
            const n = panels.length;
            if (!n) return;
            
            const step = 360 / n;
            const isMobile = window.innerWidth <= 720;
            const screenWidth = window.innerWidth;
            
            // Оптимальный радиус для заполнения экрана
            // const radius = isMobile ? 300 : Math.round(screenWidth * 0.25);
            const radius = isMobile ? 400 : Math.round(screenWidth * 0.45);
            
            panels.forEach((el, idx) => {
                const angle = idx * step;
                el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) rotateY(180deg)`;
            });
            
            ringEl.dataset.step = step;
        };

        // Обработка скролла колесом мыши
        const handleWheel = (event) => {
            event.preventDefault(); // Предотвращаем стандартный скролл
            
            const scrollDelta = event.deltaY || (event.detail * -40) || 0;
            
            if (scrollDelta > 0) {
                baseDirection = -1;
                const impulse = Math.min(Math.abs(scrollDelta) * WHEEL_K, 0.1);
                targetSpeed = clamp(targetSpeed + impulse, -SPEED_CLAMP, SPEED_CLAMP);
            } else if (scrollDelta < 0) {
                baseDirection = 1;
                const impulse = Math.min(Math.abs(scrollDelta) * WHEEL_K, 0.1);
                targetSpeed = clamp(targetSpeed + impulse, -SPEED_CLAMP, SPEED_CLAMP);
            }
            
            lastScrollTime = Date.now();
            isScrolling = true;
        };

        // Обработка скролла страницы
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDiff = currentScrollY - lastScrollY;
            
            if (Math.abs(scrollDiff) > 3) {
                if (scrollDiff > 0) {
                    baseDirection = -1;
                    const impulse = Math.min(Math.abs(scrollDiff) * SCROLL_K, 0.05);
                    targetSpeed = clamp(targetSpeed + impulse, -SPEED_CLAMP, SPEED_CLAMP);
                } else {
                    baseDirection = 1;
                    const impulse = Math.min(Math.abs(scrollDiff) * SCROLL_K, 0.05);
                    targetSpeed = clamp(targetSpeed + impulse, -SPEED_CLAMP, SPEED_CLAMP);
                }
                
                lastScrollTime = Date.now();
                isScrolling = true;
            }
            
            lastScrollY = currentScrollY;
        };

        // Панорамный эффект - имитация поворота головы
        const applyPanorama = () => {
            const n = panels.length;
            if (!n) return;
            
            const step = parseFloat(ringEl.dataset.step) || (360 / n);
            
            for (let i = 0; i < n; i++) {
                const el = panels[i];
                const panelAngle = i * step;
                let a = normalizeAngle(panelAngle + curRot + 180);
                if (a > 180) a -= 360;
                
                const t = Math.min(1, Math.abs(a) / 90);
                const shift = (a / 180) * PANO_BOOST * 100;
                const sizeBoost = 100 + (t * PANO_SIZE * 100);
                
                el.style.backgroundPosition = `${50 + shift}% 50%`;
                el.style.backgroundSize = `${sizeBoost}% auto`;
            }
        };

        // Нормализация угла
        const normalizeAngle = (deg) => {
            let x = deg % 360;
            if (x < 0) x += 360;
            return x;
        };

        // Ограничение значения
        const clamp = (v, a, b) => {
            return Math.max(a, Math.min(b, v));
        };

        // Главный цикл анимации с GSAP
        window.gsap.ticker.add(() => {
            // Плавное сглаживание скорости
            speed += (targetSpeed - speed) * 0.12;
            
            // Обновление ротации
            curRot += speed * baseDirection;
            
            // Применение трансформации к кольцу
            ringEl.style.transform = `rotateY(${curRot}deg)`;
            
            // Панорамный эффект
            applyPanorama();
            
            // Логика затухания после скролла
            if (isScrolling) {
                const timeSinceScroll = Date.now() - lastScrollTime;
                if (timeSinceScroll > 150) {
                    isScrolling = false;
                }
            }
            
            // Возвращение к базовой скорости
            if (!isScrolling) {
                const target = BASE_SPEED * Math.sign(targetSpeed || 1);
                targetSpeed += (target - targetSpeed) * DECAY;
                
                // Обеспечиваем постоянное движение
                if (Math.abs(targetSpeed) < BASE_SPEED * 0.8) {
                    targetSpeed = BASE_SPEED * Math.sign(targetSpeed || 1);
                }
            }
        });

        // Инициализация панелей
        buildPanels();
        
        // Добавление обработчиков событий
        const carouselStage = section.querySelector('.carousel-3d-stage');
        if (carouselStage) {
            // carouselStage.addEventListener('wheel', handleWheel, { passive: false });
            carouselStage.addEventListener('wheel', handleWheel, { passive: true });
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Обработка изменения размера окна
        let resizeTimer = null;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                layoutRing();
                applyPanorama();
            }, 120);
        };
        
        window.addEventListener('resize', handleResize, { passive: true });

        // Сохраняем ссылки для cleanup
        this.carousel = {
            destroy: () => {
                if (carouselStage) {
                    carouselStage.removeEventListener('wheel', handleWheel);
                }
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            }
        };
    },
    
    // Метод для очистки
    destroy: function() {
        if (this.carousel && this.carousel.destroy) {
            this.carousel.destroy();
        }
        
        this.isInitialized = false;
        console.log('3D Карусель деактивирована');
    }
};