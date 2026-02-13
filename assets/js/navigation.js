// Navigation Functionality
// Handles menu toggles, keyboard shortcuts, and navigation interactions

(function() {
    'use strict';
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close menus
        if (e.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
            const searchResults = document.getElementById('search-results');
            if (searchResults && searchResults.classList.contains('active')) {
                searchResults.classList.remove('active');
            }
        }
        
        // Arrow keys for book navigation
        if (document.querySelector('.book-pagination')) {
            const prevBtn = document.querySelector('.btn-nav-prev');
            const nextBtn = document.querySelector('.btn-nav-next');
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (prevBtn) prevBtn.click();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (nextBtn) nextBtn.click();
            }
        }
    });
})();
