// Dark Mode JavaScript
// Handles switching between light and dark themes

(function() {
    'use strict';
    
    const html = document.documentElement;
    const darkModeToggleButtons = document.querySelectorAll('.dark-mode-toggle');
    const STORAGE_KEY = 'mktba-dark-mode';
    
    // Get user preference or system preference
    function getInitialTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
            return stored === 'true';
        }
        
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply theme
    function applyTheme(isDark) {
        if (isDark) {
            html.classList.add('dark-mode');
        } else {
            html.classList.remove('dark-mode');
        }
        localStorage.setItem(STORAGE_KEY, isDark);
    }
    
    // Toggle theme
    function toggleTheme() {
        const isDark = html.classList.toggle('dark-mode');
        localStorage.setItem(STORAGE_KEY, isDark);
    }
    
    // Initialize theme
    if (getInitialTheme()) {
        html.classList.add('dark-mode');
    }
    
    // Add event listeners to all toggle buttons
    darkModeToggleButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem(STORAGE_KEY) === null) {
            applyTheme(e.matches);
        }
    });
})();
