document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-open');
            const isOpened = navMenu.classList.contains('is-open');
            navToggle.setAttribute('aria-expanded', isOpened);
        });
    }

    // --- 2. Reveal on Scroll ---
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));
    
    // --- 3. Scrolled Header Style Change ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- 4. Active Navigation Highlighting on Scroll ---
    // This highlights the nav link corresponding to the section in view
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href*="#"]'); // More robust selector
    
    if (sections.length > 0 && navLinks.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    // Remove active from all
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add to the specific one, checking if it exists
                    const activeLink = document.querySelector(`.nav-menu a[href*="#${id}"]`);
                    if(activeLink) {
                       activeLink.classList.add('active');
                    }
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' }); // Activates when section is more central
        
        sections.forEach(section => sectionObserver.observe(section));
    }
    
    // --- 5. Live Typewriter Effect for "Sobre" Page ---
    const typewriterSection = document.getElementById('minha-historia');
    let hasTyped = false; 

    if (typewriterSection) {
        const typewriterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasTyped) {
                    hasTyped = true;
                    initTypewriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        typewriterObserver.observe(typewriterSection);
    }

    function initTypewriter() {
        const sourceEl = document.getElementById('typewriter-source');
        const targetEl = document.getElementById('typewriter-target');
        const signatureEl = document.getElementById('typewriter-signature');

        if (!sourceEl || !targetEl || !signatureEl) return;

        const textToType = sourceEl.innerHTML;
        let charIndex = 0;
        const typingSpeed = 30;

        function typeChar() {
            if (charIndex < textToType.length) {
                if (textToType.substring(charIndex, charIndex + 4) === '<br>') {
                    targetEl.innerHTML += '<br>';
                    charIndex += 4;
                } else {
                    targetEl.innerHTML += textToType.charAt(charIndex);
                    charIndex++;
                }
                setTimeout(typeChar, typingSpeed);
            } else {
                targetEl.classList.add('finished-typing');
                setTimeout(() => signatureEl.style.opacity = 1, 500);
            }
        }
        typeChar();
    }
});
