// Search Functionality
// Implements client-side search across book titles, authors, and descriptions

(function() {
    'use strict';
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchClearBtn = document.getElementById('search-clear');
    
    if (!searchInput || !searchResults) {
        return; // Search not available on this page
    }
    
    let searchIndex = null;
    
    // Fetch and parse books data from Jekyll
    function initializeSearchIndex() {
        const booksDataElement = document.querySelector('script[type="application/json"][data-books]');
        
        if (window.booksData) {
            searchIndex = window.booksData.books || [];
        } else {
            // Fallback: parse from visible elements
            searchIndex = Array.from(document.querySelectorAll('.book-card')).map(card => {
                return {
                    title: card.querySelector('.book-title').textContent,
                    author: card.querySelector('.book-author').textContent,
                    description: card.querySelector('.book-description').textContent,
                    url: card.querySelector('.btn-primary').href,
                    section: 'عام'
                };
            });
        }
    }
    
    // Fuzzy search function
    function fuzzySearch(query, items, fields) {
        if (!query) return [];
        
        const queryLower = query.toLowerCase();
        
        return items.filter(item => {
            return fields.some(field => {
                const value = String(item[field] || '').toLowerCase();
                return value.includes(queryLower);
            });
        }).slice(0, 10); // Limit to 10 results
    }
    
    // Display search results
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">لم يتم العثور على نتائج</div>';
            searchResults.classList.add('active');
            return;
        }
        
        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-meta">
                    ${result.author} • ${result.section}
                </div>
            `;
            div.addEventListener('click', () => {
                window.location.href = result.url;
            });
            searchResults.appendChild(div);
        });
        
        searchResults.classList.add('active');
    }
    
    // Handle input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (!query) {
            searchResults.classList.remove('active');
            return;
        }
        
        const results = fuzzySearch(query, searchIndex, ['title', 'author', 'description']);
        displayResults(results);
    });
    
    // Clear button
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchResults.classList.remove('active');
            searchInput.focus();
        });
    }
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
    
    // Initialize
    initializeSearchIndex();
})();
