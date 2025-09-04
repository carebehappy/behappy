window.AdvantagesBlock = {
   loaded: false,
   
   init: function() {
       const advantagesSection = document.getElementById('advantages-section');
       if (!advantagesSection) return;
       
       const self = this;
       const observer = new IntersectionObserver(async (entries) => {
           for (const entry of entries) {
               if (entry.isIntersecting && !self.loaded) {
                   self.loaded = true;
                   await self.loadIcons();
                   observer.unobserve(entry.target);
                   break;
               }
           }
       }, {
           rootMargin: '50px',
           threshold: 0.1
       });
       observer.observe(advantagesSection);
   },
   
   loadIcons: async function() {
       const scripts = ['security-icon.js', 'care-icon.js', 'communication-icon.js', 'individual-icon.js'];
       for (const script of scripts) {
           await loadScript(`src/components/icons/${script}`);
       }
       
       if (!window.gsap) {
           const script = document.createElement('script');
           script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
           script.async = true;
           document.head.appendChild(script);
       }
       
       const containers = document.querySelectorAll('.advantage-item .icon-container');
       const self = this;
       containers.forEach((container, index) => {
           const iconObserver = new IntersectionObserver((entries) => {
               entries.forEach((entry) => {
                   if (entry.isIntersecting) {
                       setTimeout(() => {
                           self.loadIcon(container);
                       }, index * 150);
                       iconObserver.unobserve(entry.target);
                   }
               });
           }, { threshold: 0.3 });
           iconObserver.observe(container);
       });
   },
   
   loadIcon: function(container) {
       const iconType = container.closest('.advantage-item').getAttribute('data-icon');
       const placeholder = container.querySelector('.icon-placeholder');
       
       const spinner = container.querySelector('.loading-spinner');
       if (spinner) spinner.remove();
       
       switch(iconType) {
           case 'security':
               if (window.SecurityIcon) {
                   placeholder.innerHTML = window.SecurityIcon.svg;
                   setTimeout(() => {
                       if (window.gsap && window.SecurityIcon.animate) {
                           window.SecurityIcon.animate(container);
                       }
                   }, 100);
               }
               break;
           case 'care':
               if (window.CareIcon) {
                   placeholder.innerHTML = window.CareIcon.svg;
                   setTimeout(() => {
                       if (window.gsap && window.CareIcon.animate) {
                           window.CareIcon.animate(container);
                       }
                   }, 100);
               }
               break;
           case 'communication':
               if (window.CommunicationIcon) {
                   placeholder.innerHTML = window.CommunicationIcon.svg;
                   setTimeout(() => {
                       if (window.gsap && window.CommunicationIcon.animate) {
                           window.CommunicationIcon.animate(container);
                       }
                   }, 100);
               }
               break;
           case 'individual':
               if (window.IndividualIcon) {
                   placeholder.innerHTML = window.IndividualIcon.svg;
                   setTimeout(() => {
                       if (window.gsap && window.IndividualIcon.animate) {
                           window.IndividualIcon.animate(container);
                       }
                   }, 100);
               }
               break;
       }
   }
};