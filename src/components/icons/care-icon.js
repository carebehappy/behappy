// src/components/icons/care-icon.js
window.CareIcon = {
    svg: `<svg class="security-icon w-32 h-32 opacity-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <mask id="outerMask">
                <rect width="100" height="100" fill="white"/>
                <path d="M58,68.7,63.3,74,74,63.3" stroke="black" stroke-width="8" stroke-linecap="round"/>
            </mask>
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="white" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="white" stop-opacity="0"/>
            </linearGradient>
        </defs>
        <path class="shield-outer" d="M50,22a3.7,3.7,0,0,1,2.6,1,27.8,27.8,0,0,0,18.6,7h1.7a4,4,0,0,1,3.6,2.9h0A35.9,35.9,0,0,1,52.1,77.6l-1.1.3H49A36.1,36.1,0,0,1,23.2,34l.3-1.1A4.1,4.1,0,0,1,27.3,30h1.6A27.8,27.8,0,0,0,47.3,23,3.9,3.9,0,0,1,50,22m0-1a4.6,4.6,0,0,0-3.3,1.3A27.3,27.3,0,0,1,28.9,29H27.3a5,5,0,0,0-4.8,3.6l-.3,1.1A37,37,0,0,0,48.7,78.8L50,79l1.3-.2,1.1-.3a36.5,36.5,0,0,0,22-17.8,36.4,36.4,0,0,0,3.1-28h0A5.1,5.1,0,0,0,72.9,29H71.2A27.2,27.2,0,0,1,53.3,22.3,4.6,4.6,0,0,0,50,21Z" fill="#e21414" mask="url(#outerMask)"/>
        <path class="shield-inner" d="M48.6,73.6A32.1,32.1,0,0,1,27.3,34,32,32,0,0,0,50,26a32,32,0,0,0,22.7,8,31.7,31.7,0,0,1-.3,18.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
        <path class="checkmark" d="M58,68.7,63.3,74,74,63.3" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
        <path class="shine" d="M38,38 L43,33 L48,38" fill="none" stroke="url(#shineGradient)" stroke-width="2" stroke-linecap="round"/>
        <circle class="spark spark1" cx="15" cy="15" r="2" fill="#FFD700"/>
        <circle class="spark spark2" cx="13" cy="20" r="2" fill="#FFD700"/>
        <circle class="spark spark3" cx="20" cy="13" r="2" fill="#FFD700"/>
        <circle class="spark spark4" cx="10" cy="17" r="2" fill="#FFD700"/>
    </svg>`,

    animate: function(container) {
        // Проверяем, загружена ли GSAP
        if (typeof gsap === 'undefined') {
            // Если GSAP не загружена, загружаем ее
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
            script.onload = () => {
                this.runAnimation(container);
            };
            document.head.appendChild(script);
        } else {
            this.runAnimation(container);
        }
    },

    runAnimation: function(container) {
        const icon = container.querySelector('.security-icon');
        if (!icon) return;

        // Инициализация состояний
        gsap.set(icon, { 
            opacity: 1, 
            transformOrigin: "center", 
            rotation: 0, 
            scale: 1 
        });
        
        gsap.set('.shield-outer', { opacity: 1 });
        
        gsap.set('.shield-inner', { 
            strokeDasharray: 180, 
            strokeDashoffset: 180 
        });
        
        gsap.set('.checkmark', { 
            strokeDasharray: 40, 
            strokeDashoffset: 40, 
            stroke: "#000" 
        });
        
        gsap.set('.spark', { 
            opacity: 0, 
            scale: 0 
        });
        
        gsap.set('.shine', { opacity: 0 });

        // Основная анимация
        const tl = gsap.timeline();

        // Float анимация родительского контейнера
        gsap.to(container, { 
            y: -10, 
            duration: 2.5, 
            ease: "power2.inOut", 
            repeat: -1, 
            yoyo: true 
        });

        // Тряска иконки в начале
        tl.to(icon, { 
            rotation: -10, 
            duration: 0.15, 
            ease: "power1.inOut" 
        })
        .to(icon, { 
            rotation: 10, 
            duration: 0.15, 
            ease: "power1.inOut" 
        })
        .to(icon, { 
            rotation: 0, 
            duration: 0.1, 
            ease: "power1.out" 
        });

        // Появление внешнего щита
        tl.to('.shield-outer', { 
            opacity: 1, 
            duration: 0.3, 
            ease: "power2.out" 
        }, 0.3);

        // Рисование внутреннего щита
        tl.to('.shield-inner', { 
            strokeDashoffset: 0, 
            duration: 1.7, 
            ease: "sine.out" 
        }, 0.3);

        // Пульсация иконки
        tl.to(icon, { 
            scale: 1.2, 
            duration: 0.2, 
            ease: "power2.out" 
        }, 1.15)
        .to(icon, { 
            scale: 0.9, 
            duration: 0.2, 
            ease: "power2.inOut" 
        }, 1.35)
        .to(icon, { 
            scale: 1.1, 
            duration: 0.2, 
            ease: "power2.out" 
        }, 1.55)
        .to(icon, { 
            scale: 1, 
            duration: 0.2, 
            ease: "elastic.out(1.5, 0.3)" 
        }, 1.75);

        // Рисование галочки
        tl.to('.checkmark', { 
            strokeDashoffset: 0, 
            duration: 0.8, 
            ease: "power2.out" 
        }, 1.8);

        // Анимация искр
        tl.to('.spark1', { 
            opacity: 1, 
            scale: 1.5, 
            duration: 0.15, 
            ease: "power2.out" 
        }, 1.55)
        .to('.spark1', { 
            opacity: 0, 
            scale: 0, 
            duration: 0.3, 
            ease: "power2.in" 
        }, 1.75)
        .to('.spark2', { 
            opacity: 1, 
            scale: 1.5, 
            duration: 0.15, 
            ease: "power2.out" 
        }, 1.6)
        .to('.spark2', { 
            opacity: 0, 
            scale: 0, 
            duration: 0.3, 
            ease: "power2.in" 
        }, 1.8)
        .to('.spark3', { 
            opacity: 1, 
            scale: 1.5, 
            duration: 0.15, 
            ease: "power2.out" 
        }, 1.65)
        .to('.spark3', { 
            opacity: 0, 
            scale: 0, 
            duration: 0.3, 
            ease: "power2.in" 
        }, 1.85)
        .to('.spark4', { 
            opacity: 1, 
            scale: 1.5, 
            duration: 0.15, 
            ease: "power2.out" 
        }, 1.7)
        .to('.spark4', { 
            opacity: 0, 
            scale: 0, 
            duration: 0.3, 
            ease: "power2.in" 
        }, 1.9);

        // Изменение цвета галочки
        tl.to('.checkmark', { 
            stroke: "#e21414", 
            duration: 0.3, 
            ease: "power2.out" 
        }, 2.0);

        // Эффект блеска
        tl.to('.shine', { 
            opacity: 1, 
            duration: 0.2, 
            ease: "power2.out" 
        }, 2.0)
        .to('.shine', { 
            opacity: 0, 
            duration: 0.5, 
            ease: "power2.in" 
        }, 2.2);

        // Непрерывная анимация дыхания в конце
        tl.add(() => {
            gsap.to('.shield-outer', { 
                scale: 1.13, 
                duration: 2, 
                ease: "sine.inOut", 
                transformOrigin: "center", 
                repeat: -1, 
                yoyo: true 
            });
            
            gsap.to(['.shield-inner', '.checkmark'], { 
                scale: 1.06, 
                duration: 2, 
                ease: "sine.inOut", 
                transformOrigin: "center", 
                repeat: -1, 
                yoyo: true, 
                stagger: { 
                    amount: 0.2, 
                    from: "start" 
                }
            });
        }, 2.1);
    }
};