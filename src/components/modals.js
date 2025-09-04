// src/components/modals.js
window.Modals = {
  init: function() {
    this.setupModal("#certificatesBtn", "#certificatesModal", ".close");
    this.setupModal("#groupTopicsLink", "#groupTopicsModal", ".close-groupTopics");
  },
  
  setupModal: function(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelector(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const closeBtn = modal?.querySelector(closeSelector);
    
    if (!trigger || !modal) return;
    
    trigger.addEventListener("click", function(e) {
      e.preventDefault();
      modal.classList.remove("hidden");
      if (modalSelector === "#certificatesModal") {
        loadScript('src/components/carousel.js').then(() => {
          window.Carousel.init();
        });
      }
    });
    
    closeBtn?.addEventListener("click", function() {
      modal.classList.add("hidden");
    });
    
    modal.addEventListener("click", function(e) {
      if (e.target === this) {
        modal.classList.add("hidden");
      }
    });
  }
};