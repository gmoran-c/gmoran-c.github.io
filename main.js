// ==========================================
// TERMINAL & UI JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Boot Sequence Logic
    const bootContainer = document.getElementById('boot-container');
    const bootScreen = document.getElementById('boot-screen');
    const mainContent = document.getElementById('main-content');
    
    const bootMessages = [
        "INIT: version 2.88 booting...",
        "Loading cryptographic modules... [ OK ]",
        "Mounting virtual file systems... [ OK ]",
        "Starting network interface... [ OK ]",
        "Establishing secure connection to mainframe...",
        "Bypassing firewall protocols... [ SUCCESS ]",
        "Authenticating user 'gmoran-c'...",
        "SECURITY CLEARANCE: LEVEL 5 VERIFIED.",
        "ACCESS GRANTED.",
        "Initializing interface..."
    ];

    let msgIndex = 0;
    
    function printBootMessage() {
        if (msgIndex < bootMessages.length) {
            bootContainer.innerHTML += `> ${bootMessages[msgIndex]}<br>`;
            msgIndex++;
            // Random delay between 100ms and 400ms to simulate varied loading speeds
            const delay = Math.random() * 300 + 100;
            setTimeout(printBootMessage, delay);
        } else {
            // Once finished, wait a moment then swap screens
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                bootScreen.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    // Trigger fade in
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                        mainContent.style.transition = 'opacity 1s ease-in';
                        startTypewriter(); // Start hero typing after boot
                    }, 50);
                }, 500);
                
            }, 800);
        }
    }
    
    // Start boot sequence
    setTimeout(printBootMessage, 500);

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // 3. Typewriter Effect for Hero Section
    function startTypewriter() {
        const typeWriterElement = document.getElementById('typewriter');
        if (!typeWriterElement) return;
        
        const words = [
            "SYSTEM_ARCHITECT",
            "SECURITY_RESEARCHER",
            "PENETRATION_TESTER"
        ];
        
        let wait = 2000;
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

            let typeSpeed = 80;

            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && txt === fullTxt) {
                typeSpeed = wait;
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                wordIndex++;
                typeSpeed = 300;
            }

            setTimeout(type, typeSpeed);
        }
        
        type();
    }
    
    // 4. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
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
});
