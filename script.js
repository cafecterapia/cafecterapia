// PARTE 2.3: Micro-interações e Experiência do Usuário (UX)
// -----------------------------------------------------------------
// Revela elementos suavemente conforme o usuário rola a página.
// Usa a API IntersectionObserver para performance ótima.

document.addEventListener("DOMContentLoaded", function() {

    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    // Configurações do Observer: o elemento se torna 'visível'
    // quando 15% dele entra na viewport.
    const observerOptions = {
        root: null, // usa a viewport como área de observação
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está intersectando (visível)
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                // Para de observar o elemento uma vez que ele já foi revelado
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Começa a observar cada elemento marcado
    revealElements.forEach(el => {
        observer.observe(el);
    });

});
