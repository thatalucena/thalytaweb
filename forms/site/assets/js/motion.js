// Movimento: Lenis (scroll suave) + GSAP.
// Com prefers-reduced-motion ou sem GSAP: sem scroll suave e sem animações; tudo troca no lugar.

let gsap = null;
let lenis = null;

export function initMotion({ reduced }) {
  if (reduced || !window.gsap) return false;
  gsap = window.gsap;

  // No toque o scroll continua nativo (melhor no navegador interno do Instagram);
  // o suave entra na roda do mouse e no trackpad.
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return true;
}

// Entrada da página: coluna de apoio (desktop), barra do topo e primeira etapa.
export function intro(step) {
  if (!gsap) return;
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo('.topbar', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
    .fromTo('[data-intro]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.05)
    .fromTo('.intro__star', { rotation: -120, scale: 0.4, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.6)' }, 0.2)
    .fromTo('.form__nav', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3);

  if (step) tl.add(stepIn(step, 1, { delay: 0 }), 0.1);

  // A estrela do desktop respira devagar sem parar.
  tl.add(() => {
    gsap.to('.intro__star', { rotation: 12, y: -14, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });
}

const parts = (step) => step.querySelectorAll('.step__title, .step__sub, .field, .consent');

// Saída da etapa atual. dir 1 = avançando, -1 = voltando.
export function stepOut(step, dir) {
  if (!gsap || !step) return Promise.resolve();
  return new Promise((resolve) => {
    gsap.to(step, { opacity: 0, x: -28 * dir, duration: 0.22, ease: 'power2.in', onComplete: resolve });
  });
}

// Entrada da nova etapa: título, texto e campos em cascata curta.
export function stepIn(step, dir, { delay = 0 } = {}) {
  if (!gsap || !step) return null;
  const tl = gsap.timeline({ delay, onComplete: () => gsap.set([step, ...parts(step)], { clearProps: 'all' }) });
  tl.set(step, { opacity: 1, x: 0 })
    .fromTo(parts(step), { opacity: 0, x: 36 * dir }, { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out', stagger: 0.05 });
  return tl;
}

// Toque numa opção: o cartão dá um pulinho.
export function pop(el) {
  if (!gsap || !el) return;
  gsap.fromTo(el, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', clearProps: 'scale' });
}

// Erro: a mensagem chega com um tremor curto.
export function shake(el) {
  if (!gsap || !el) return;
  gsap.fromTo(el, { x: -6 }, { x: 0, duration: 0.45, ease: 'elastic.out(1, 0.3)', clearProps: 'x' });
}

// Barra de progresso: o segmento novo preenche da esquerda.
export function fill(el) {
  if (!gsap || !el) return;
  gsap.fromTo(el, { '--fill': '0%' }, { '--fill': '100%', duration: 0.6, ease: 'power3.out' });
}

export function scrollTop() {
  if (window.scrollY < 4) return;
  if (lenis) lenis.scrollTo(0, { duration: 0.6 });
  else window.scrollTo({ top: 0, behavior: gsap ? 'smooth' : 'auto' });
}
