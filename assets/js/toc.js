// Table of Contents Generation
// Automatically generates TOC from headings and handles scrolling

(function() {
    'use strict';
    
    const tocContainer = document.querySelector('.toc-container');
    const bookText = document.querySelector('.book-text');
    
    if (!tocContainer || !bookText) {
        return; // TOC not needed on this page
    }
    
    // Generate TOC from headings
    function generateTOC() {
        const headings = bookText.querySelectorAll('h1, h2, h3, h4');
        
        if (headings.length === 0) {
            return;
        }
        
        const ul = document.createElement('ul');
        ul.className = 'toc-list';
        
        let lastLevel = 0;
        let currentUl = ul;
        const stack = [ul];
        
        headings.forEach((heading, index) => {
            // Set ID if not present
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const level = parseInt(heading.tagName[1]);
            
            // Create list item
            const li = document.createElement('li');
            li.className = 'toc-item';
            
            const link = document.createElement('a');
            link.className = 'toc-link';
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            
            li.appendChild(link);
            
            // Handle nesting
            if (level > lastLevel) {
                for (let i = lastLevel; i < level; i++) {
                    const newUl = document.createElement('ul');
                    newUl.className = 'toc-list';
                    if (currentUl.lastElementChild) {
                        currentUl.lastElementChild.appendChild(newUl);
                    } else {
                        currentUl.appendChild(newUl);
                    }
                    stack.push(newUl);
                    currentUl = newUl;
                }
            } else if (level < lastLevel) {
                for (let i = lastLevel; i > level; i--) {
                    stack.pop();
                    currentUl = stack[stack.length - 1];
                }
            }
            
            currentUl.appendChild(li);
            lastLevel = level;
        });
        
        tocContainer.innerHTML = '';
        tocContainer.appendChild(ul);
        
        // Add smooth scroll behavior
        const links = tocContainer.querySelectorAll('.toc-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    updateActiveTOCLink();
                }
            });
        });
    }
    
    // Update active TOC link on scroll
    function updateActiveTOCLink() {
        const headings = bookText.querySelectorAll('h1, h2, h3, h4');
        const links = tocContainer.querySelectorAll('.toc-link');
        
        let activeHeading = null;
        let minDistance = Infinity;
        
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            const distance = Math.abs(rect.top - 100); // Offset for sticky header
            
            if (distance < minDistance) {
                minDistance = distance;
                activeHeading = heading;
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (activeHeading && link.getAttribute('href') === `#${activeHeading.id}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize
    generateTOC();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveTOCLink, { passive: true });
})();
