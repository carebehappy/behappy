window.CTAScaling = {
   init: async function() {
       console.log('🚀 CTAScaling init started');
       const gsap = await window.GSAPLoader.load();
       if (!gsap) {
           console.error('❌ GSAP не удалось загрузить');
           return;
       }
       console.log('✅ GSAP загружен для CTA:', gsap);
       gsap.registerPlugin(ScrollTrigger);
       const ctaSection = document.getElementById('cta-section');
       if (!ctaSection) {
           console.error('❌ CTA секция не найдена (#cta-section)');
           return;
       }
       console.log('✅ CTA секция найдена:', ctaSection);
       const ctaContent = ctaSection.querySelector('.cta-content');
       if (!ctaContent) {
           console.error('❌ CTA контент не найден (.cta-content)');
           return;
       }
       this.setupAnimations(gsap, ctaSection, ctaContent);
   },

   setupAnimations: function(gsap, ctaSection, ctaContent) {
       console.log('Настройка анимаций CTA');

       // Анимация появления контента при загрузке
       const contentTimeline = gsap.timeline({ delay: 0.5 });
       contentTimeline
           .to('.cta-title', {
               opacity: 1,
               y: 0,
               duration: 0.8,
               ease: "power2.out"
           })
           .to('.cta-subtitle', {
               opacity: 1,
               y: 0,
               duration: 0.8,
               ease: "power2.out"
           }, "-=0.4")
           .to('.cta-button', {
               opacity: 1,
               y: 0,
               duration: 0.8,
               ease: "back.out(1.7)"
           }, "-=0.4");


       // ОДНА анимация вместо двух фаз
//        gsap.to(ctaSection, {
//            scale: 0.7,
//            borderRadius: "12px", 
//            opacity: 0.3,
//            ease: "none",
// scrollTrigger: {
// trigger: ctaSection,
// start: "top 20%", // Раньше пинить
// end: "+=600px",
// scrub: 2,
// pin: true,
// pinSpacing: true,
// pinType: "transform"
// }
//        });

// Этап 1: Скейлинг + закругление до центра (БЕЗ pin)
// Этап 1: Скейлинг до центра
gsap.to(ctaSection, {
    scale: 0.7, // СРАЗУ до финального значения
    borderRadius: "12px",
    ease: "none",
    scrollTrigger: {
        trigger: ctaSection,
        start: "top 80%",
        end: "center center",
        scrub: 1
    }
});

// Этап 2: Только opacity + pin (БЕЗ scale)
gsap.to(ctaSection, {
    opacity: 0.3, // Только фейд
    ease: "none",
    scrollTrigger: {
        trigger: ctaSection,
        start: "top 20%",
        end: "+=400px",
        scrub: 2,
        pin: true,
        pinSpacing: true,
        pinType: "transform"
    }
});

       // Паралакс для фонового паттерна
       gsap.to('.cta-bg-pattern', {
           y: -100,
           ease: "none",
           scrollTrigger: {
               trigger: ctaSection,
               start: "top bottom",
               end: "bottom top",
               scrub: 2
           }
       });

       this.setupTelegramButton(gsap);
       console.log('Все анимации CTA настроены');
   },

   setupTelegramButton: function(gsap) {
       const telegramBtn = document.getElementById('telegram-bot-btn');
       if (!telegramBtn) {
           console.warn('⚠️ Кнопка Telegram не найдена (#telegram-bot-btn)');
           return;
       }
       telegramBtn.addEventListener('click', (e) => this.handleTelegramClick(e, gsap));
       console.log('✅ Обработчик кнопки Telegram настроен');
   },

   handleTelegramClick: function(e, gsap) {
       console.log('📱 Нажата кнопка Telegram');
       gsap.to(e.target, {
           scale: 0.95,
           duration: 0.1,
           yoyo: true,
           repeat: 1,
           ease: "power2.inOut",
           onComplete: () => {
               console.log('✅ Анимация клика завершена');
               console.log('🔗 Переход в Telegram бот...');
           }
       });
   }
};