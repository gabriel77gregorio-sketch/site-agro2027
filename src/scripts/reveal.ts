/**
 * Animações de entrada ao rolar a página.
 * Elementos com [data-reveal] aparecem suavemente quando entram na tela.
 * Sem JS ou com "reduzir movimento" ativado, tudo fica visível normalmente.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (reduce || !('IntersectionObserver' in window)) {
  items.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
}

/** Cabeçalho ganha sombra mais forte e fica mais compacto depois de rolar. */
const header = document.querySelector<HTMLElement>('.header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
