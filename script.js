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

    // --- 2. Mobile Viewport Height Fix ---
    function handleMobileViewportFix() {
        const heroElement = document.querySelector('.hero-home');
        if (!heroElement) return;

        // Check if browser supports dynamic viewport units
        const supportsDvh = CSS.supports('height', '100dvh');
        const supportsSvh = CSS.supports('height', '100svh');
        
        if (!supportsDvh && !supportsSvh) {
            // Fallback for browsers without new viewport unit support
            function setHeroHeight() {
                const vh = window.innerHeight * 0.01;
                heroElement.style.setProperty('--vh', `${vh}px`);
                
                // Use custom property for height calculation
                const isMobile = window.innerWidth <= 820;
                const heightPercentage = isMobile ? 90 : 95;
                heroElement.style.height = `calc(var(--vh, 1vh) * ${heightPercentage})`;
            }
            
            // Set height on load
            setHeroHeight();
            
            // Update on resize and orientation change
            window.addEventListener('resize', setHeroHeight);
            window.addEventListener('orientationchange', () => {
                setTimeout(setHeroHeight, 100); // Small delay for orientation change
            });
            
            // Handle the specific case from the problem statement:
            // When user returns from address bar interaction
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    setTimeout(setHeroHeight, 150);
                }
            });
            
            // Handle page focus (when returning from browser UI)
            window.addEventListener('focus', () => {
                setTimeout(setHeroHeight, 100);
            });
        }
        
        // Additional fix for the address bar interaction issue
        // Force a layout recalculation when the page becomes visible again
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (heroElement && window.innerWidth <= 820) {
                    // Trigger a reflow to fix any layout issues
                    heroElement.style.height = 'auto';
                    heroElement.offsetHeight; // Force reflow
                    heroElement.style.height = ''; // Reset to CSS value
                }
            }, 250);
        });
    }

    // Initialize mobile viewport fix
    handleMobileViewportFix();

    // --- 3. Reveal on Scroll ---
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
    
    // --- 4. Scrolled Header Style Change ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- 5. Active Navigation Highlighting on Scroll ---
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
    
    // --- 6. Live Typewriter Effect for "Sobre" Page ---
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
