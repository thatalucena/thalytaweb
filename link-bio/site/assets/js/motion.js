// Movimento: Lenis (scroll suave) + GSAP/ScrollTrigger.
// Com prefers-reduced-motion: sem scroll suave e sem animações; tudo já aparece no lugar.

export function initScroll({ reduced }) {
  const { gsap, ScrollTrigger, Lenis } = window;
  if (reduced || !Lenis) return null;

  // No toque o scroll continua nativo (melhor no navegador interno do Instagram);
  // o suave entra na roda do mouse e no trackpad.
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

// Entrada da apresentação: nome, foto, selo e chips em sequência curta (menos de 1,2s).
function intro(gsap) {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo('[data-intro]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0)
    .fromTo('.intro__star', { rotation: -180, scale: 0 }, { rotation: 0, scale: 1, duration: 0.9, ease: 'back.out(2)' }, 0.15)
    // A foto é o LCP: entra só com transform, sem esconder com opacidade.
    .fromTo('[data-intro-photo]', { y: 24, rotation: 6, scale: 0.94 }, { y: 0, rotation: 0, scale: 1, duration: 0.9 }, 0.1)
    .fromTo('[data-intro-seal]', { opacity: 0, scale: 0.3, rotation: -120 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.8)' }, 0.45)
    .fromTo('.intro__lead', { y: 14 }, { y: 0, duration: 0.8 }, 0.2)
    .fromTo('[data-intro-chip]', { opacity: 0, y: 12, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06, ease: 'back.out(2)' }, 0.5);

  // Depois da entrada, o selo gira devagar sem parar.
  tl.add(() => {
    gsap.to('.intro__seal .seal__ring', { rotation: 360, duration: 18, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
  });
}

const settle = (els) => els.forEach((el) => { el.style.transition = 'none'; });
const release = (gsap, els) => gsap.set(els, { clearProps: 'transform,transition' });

function reveals(gsap) {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      onStart: () => settle([el]),
      onComplete: () => release(gsap, [el]),
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });

  // Cards dos dois carrosséis chegam da direita, em cascata.
  ['.carousel__track', '.showcase__track'].forEach((selector) => {
    const list = document.querySelector(selector);
    if (!list) return;
    const items = [...list.children];
    gsap.fromTo(items, { opacity: 0, x: 60, rotation: 2 }, {
      opacity: 1,
      x: 0,
      rotation: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      onStart: () => settle(items),
      onComplete: () => release(gsap, items),
      scrollTrigger: { trigger: list, start: 'top 88%', once: true },
    });
  });
}

function details(gsap) {
  // Estrela do bloco de diagnóstico gira com o scroll.
  gsap.fromTo('.cta__star', { rotation: 0 }, {
    rotation: 90,
    ease: 'none',
    scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  // Ícones dos serviços dão um pulo quando o card aparece.
  gsap.fromTo('.service__icon', { scale: 0.4 }, {
    scale: 1,
    duration: 0.7,
    ease: 'back.out(2.4)',
    stagger: 0.1,
    scrollTrigger: { trigger: '.carousel', start: 'top 85%', once: true },
  });

  // Estrelas de fundo do desktop flutuam devagar.
  gsap.utils.toArray('.backdrop__star').forEach((star, i) => {
    gsap.to(star, { y: i % 2 ? 18 : -18, rotation: i % 2 ? -8 : 8, duration: 5 + i, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });
}

export function initMotion({ reduced }) {
  if (reduced) return;
  const { gsap } = window;
  intro(gsap);
  reveals(gsap);
  details(gsap);
}
