window.GSAPLoader = {
    loaded: false,
    loading: false,
    
    load: async function() {
        // Если уже загружен
        if (this.loaded && window.gsap && window.ScrollTrigger) {
            return window.gsap;
        }
        
        // Если уже загружается - ждем
        if (this.loading) {
            return new Promise((resolve) => {
                const checkLoaded = () => {
                    if (this.loaded && window.gsap) {
                        resolve(window.gsap);
                    } else {
                        setTimeout(checkLoaded, 50);
                    }
                };
                checkLoaded();
            });
        }
        
        this.loading = true;
        
        try {
            console.log('📦 Загружаем GSAP...');
            
            // Загружаем основной GSAP
            if (!window.gsap) {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
                console.log('✅ GSAP core загружен');
            }
            
            // Загружаем ScrollTrigger
            if (!window.ScrollTrigger) {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
                console.log('✅ ScrollTrigger загружен');
            }
            
            this.loaded = true;
            this.loading = false;
            
            console.log('🚀 GSAP система готова:', window.gsap);
            return window.gsap;
            
        } catch (error) {
            this.loading = false;
            console.error('❌ Ошибка загрузки GSAP:', error);
            return null;
        }
    },
    
    loadScript: function(src) {
        return new Promise((resolve, reject) => {
            // Проверяем не загружен ли уже скрипт
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            
            script.onload = () => {
                console.log('📄 Скрипт загружен:', src);
                resolve();
            };
            
            script.onerror = (error) => {
                console.error('❌ Ошибка загрузки скрипта:', src, error);
                reject(error);
            };
            
            document.head.appendChild(script);
        });
    }
};