// ==========================================
// PREMIUM PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll)
    // Using subtle, smooth easing for a premium feel
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // 3. Navbar Glassmorphism Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.background = 'rgba(10, 10, 12, 0.85)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.padding = '1.2rem 0';
            navbar.style.background = 'rgba(10, 10, 12, 0.7)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        }
    });

    // 4. Clean Typewriter Effect for Hero Section
    function startTypewriter() {
        const typeWriterElement = document.getElementById('typewriter');
        if (!typeWriterElement) return;
        
        const words = [
            "System Architecture.",
            "Cybersecurity.",
            "Software Engineering."
        ];
        
        let wait = 2500;
        let wordIndex = 0;
        let isDeleting = false;
        let txt = '';

        function type() {
            const current = wordIndex % words.length;
            const fullTxt = words[current];

            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }

            typeWriterElement.innerHTML = txt;

            let typeSpeed = 60; // Snappy typing

            if (isDeleting) {
                typeSpeed /= 2; // Fast deletion
            }

            if (!isDeleting && txt === fullTxt) {
                typeSpeed = wait; // Wait at end of word
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                wordIndex++;
                typeSpeed = 400; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }
        
        // Start typing after initial load
        setTimeout(type, 1500); 
    }
    
    startTypewriter();

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Language Translation Engine
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        // Load preference from localStorage or default to English
        let currentLang = localStorage.getItem('portfolio_lang') || 'en';
        
        // Function to apply language to all translatable elements
        const applyLanguage = (lang, useTransition = true) => {
            const translatableElements = document.querySelectorAll('[data-en][data-es]');
            
            // Set button text
            langToggleBtn.innerText = lang === 'en' ? 'EN / ES' : 'ES / EN';

            if (useTransition) {
                // Add fade-out class to all elements
                translatableElements.forEach(el => el.classList.add('lang-fading'));
                
                // Wait for the CSS transition (0.3s) to finish before swapping text
                setTimeout(() => {
                    translatableElements.forEach(el => {
                        el.innerHTML = el.getAttribute(`data-${lang}`);
                        el.classList.remove('lang-fading');
                    });
                }, 300);
            } else {
                // Initial load, no transition needed
                translatableElements.forEach(el => {
                    el.classList.add('lang-text');
                    el.innerHTML = el.getAttribute(`data-${lang}`);
                });
            }
        };

        // Apply initially
        applyLanguage(currentLang, false);

        // Toggle on click
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'es' : 'en';
            localStorage.setItem('portfolio_lang', currentLang);
            applyLanguage(currentLang, true);
        });
    }

});
