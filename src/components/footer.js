// components/footer.js
window.Footer = {
  init: function() {
    const footerHTML = `
    <footer class="bg-gray-800 text-white py-8">
        <div class="footer-container">
            <!-- Сначала широкий блок про психологическую помощь -->
            <div class="footer-column w-full mb-6">
                <h3>Про нас</h3>
                <p class="text-neutral mb-4">Пансионат для літніх людей</p>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between gap-8 md:col-span-2">
                <!-- Первая колонка футера -->
                <div class="footer-column w-full md:w-1/3">
                    
                    <!-- Блок Медиаканалы -->
                    <div class="footer-column">
                        <h3>Медиаканалы</h3>
                        <div class="flex flex-col">
                            <a href="#" class="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                                YouTube канал
                            </a>
                            <a href="https://t.me/shans-residence" class="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                Telegram канал
                            </a>
                            <a href="#" class="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                Instagram канал
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Остальные колонки без изменений -->
                <div class="footer-column w-full md:w-1/3">
                    <h3>Навигация</h3>
                    <a href="#">Главная</a>
                    <a href="#">Услуги</a>
                    <a href="#">Контакты</a>
                    <a href="#">Блог</a>
                    <a href="#">О нас</a>
                </div>
                
                <div class="footer-column w-full md:w-1/3">
                    <h3>Контакты</h3>
                    <a href="tel:380963892020" class="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        096 389-20-20
                    </a>
                    <a href="https://t.me/karinavarganova" class="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                        Telegram
                    </a>
                    <a href="mailto:info@example.com" class="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        info@example.com
                    </a>
                    <div class="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>г. Днепр, Украина</span>
                        <span class="ml-2">🇺🇦</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>`;
    
    const placeholder = document.getElementById('footer-placeholder');
    placeholder.outerHTML = footerHTML;
  }
};