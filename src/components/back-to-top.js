// src/components/back-to-top.js 3️⃣ Кнопка "Наверх" с индикатором прокрутки
window.BackToTop = {
  init: function() {
    const backToTopButton = document.getElementById("back-to-top");
    const circleFg = document.querySelector(".circle-fg");
    
    if (!backToTopButton || !circleFg) return;
    
    const radius = 29;
    const circumference = 2 * Math.PI * radius;
    circleFg.style.strokeDasharray = `${circumference}`;
    circleFg.style.strokeDashoffset = `${circumference}`;
    
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
      
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(scrollTop / scrollHeight, 1);
      const dashoffset = circumference - (scrollPercentage * circumference);
      circleFg.style.strokeDashoffset = dashoffset;
    });
    
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};