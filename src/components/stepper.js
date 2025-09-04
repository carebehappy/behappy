// components/stepper.js
window.Stepper = {
  init: function() {
    const stepperItems = document.querySelectorAll('.stepper-item');
    const progressLine = document.getElementById('progress-line');
    
    if (stepperItems.length === 0) {
        console.error('Stepper items not found!');
        return;
    }
    
    function updateProgress(activeStep) {
        // Обновляем прогресс-бар
        if (progressLine && activeStep >= 0) {
            const totalHeight = stepperItems[stepperItems.length - 1].offsetTop + 24;
            const currentHeight = stepperItems[activeStep].offsetTop + 24;
            const progressPercent = (currentHeight / totalHeight) * 100;
            progressLine.style.height = `${progressPercent}%`;
        } else if (progressLine) {
            progressLine.style.height = '0%';
        }
    }
    
    // Добавляем обработчики кликов
    stepperItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Закрываем все активные шаги
            stepperItems.forEach(step => {
                step.classList.remove('active', 'completed');
            });
            
            // Если кликнули на активный элемент, просто закрываем все
            if (wasActive) {
                updateProgress(-1);
                return;
            }
            
            // Иначе активируем новый шаг
            item.classList.add('active');
            
            // Помечаем предыдущие шаги как completed
            for (let i = 0; i < index; i++) {
                stepperItems[i].classList.add('completed');
            }
            
            updateProgress(index);
        });
    });
    
    // Инициализация - все шаги неактивны
    updateProgress(-1);
  }
};