// Carrossel de serviços: scroll-snap nativo, indicador que acompanha o card e
// funciona por toque. Cada troca de card dispara swipe_servicos.

import { track } from './tracking.js';

export function initCarousel({ reduced }) {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;

  const list = root.querySelector('[data-carousel-track]');
  const cards = [...list.children];
  const dots = [...root.querySelectorAll('.carousel__dot')];
  let current = 0;
  let ticking = false;

  const indexFromScroll = () => {
    const max = list.scrollWidth - list.clientWidth;
    if (list.scrollLeft >= max - 2) return cards.length - 1;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    return Math.round(list.scrollLeft / step);
  };

  const setCurrent = (index) => {
    if (index === current) return;
    current = index;
    dots.forEach((dot, i) => dot.setAttribute('aria-current', i === index ? 'true' : 'false'));
    track('swipe_servicos', { card: index + 1, servico: cards[index].id });
  };

  list.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setCurrent(indexFromScroll());
      ticking = false;
    });
  }, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      list.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  // Setas do teclado quando o carrossel está em foco
  list.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = Math.min(cards.length - 1, Math.max(0, current + (event.key === 'ArrowRight' ? 1 : -1)));
    dots[next].click();
  });
}
