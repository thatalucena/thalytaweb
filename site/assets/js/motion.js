// Movimento: Lenis (scroll suave) + GSAP/ScrollTrigger.
// Com prefers-reduced-motion: sem scroll suave, sem entradas e sem letreiros.

const HEADER_OFFSET = 96;

export function initScroll({ reduced }) {
  const { gsap, ScrollTrigger, Lenis } = window;
  let lenis = null;

  if (!reduced && Lenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Âncoras internas respeitam o header fixo.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.getAttribute('href') === '#') return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: link.getAttribute('href') === '#topo' ? 0 : -HEADER_OFFSET + 24 });
    } else {
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }
    history.replaceState(null, '', link.getAttribute('href'));
    // Leva o foco junto, para quem navega por teclado.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  return lenis;
}

// O header troca o CTA (bordô no claro, oliva no escuro) conforme a seção embaixo dele.
export function initHeaderTheme() {
  const { ScrollTrigger } = window;
  const header = document.querySelector('.site-header');
  if (!header) return;

  document.querySelectorAll('[data-theme]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 56px',
      end: 'bottom 56px',
      onToggle: (self) => {
        if (self.isActive) header.dataset.on = section.dataset.theme;
      },
    });
  });
}

function drawPaths(paths) {
  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });
}

function heroIntro(gsap) {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  const scribble = gsap.utils.toArray('.hero__scribble .draw');
  drawPaths(scribble);

  // Título, chip, texto e botões entram via CSS (base.css) para não atrasar o LCP.
  tl.fromTo('.hero__arch-wrap', { opacity: 0, scale: 0.9, rotation: -4, y: 40 }, { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 1.2 }, 0)
    .fromTo('.hero__seal', { opacity: 0, scale: 0.3, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.6)' }, 0.7)
    .fromTo('.hero__sticker', { opacity: 0, scale: 0.5, rotation: -14 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2)' }, 0.9)
    .fromTo('.hero__card', { opacity: 0, y: 50, rotation: (i) => (i ? -10 : 10) }, { opacity: 1, y: 0, rotation: 0, duration: 0.9, stagger: 0.15, ease: 'back.out(1.7)' }, 1)
    .to(scribble, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.4 }, 1.3);

  tl.add(() => {
    gsap.utils.toArray('.hero__card').forEach((card, i) => {
      gsap.to(card, { y: i ? 8 : -8, duration: 2.6 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  });
}

function marquee(gsap, track, { duration, lenis }) {
  const tween = gsap.to(track, { xPercent: -50, duration, ease: 'none', repeat: -1 });
  // Acelera um pouco conforme a velocidade do scroll (Lenis).
  if (lenis) {
    lenis.on('scroll', ({ velocity }) => {
      gsap.to(tween, { timeScale: 1 + Math.min(Math.abs(velocity) / 8, 4), duration: 0.3, overwrite: true });
      gsap.to(tween, { timeScale: 1, duration: 1, delay: 0.3, overwrite: false });
    });
  }
  return tween;
}

function initBrandsMarquee(gsap, lenis) {
  const wrap = document.querySelector('.brands__marquee');
  const list = wrap?.querySelector('.brands__track');
  if (!list) return;

  [...list.children].forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    list.appendChild(clone);
  });
  wrap.classList.add('is-running');
  list.querySelectorAll('li').forEach((li) => { li.style.marginRight = '12px'; });
  list.style.gap = '0px';
  marquee(gsap, list, { duration: 40, lenis });
}

function settle(el) {
  el.style.transition = 'none';
}

function release(gsap, el) {
  gsap.set(el, { clearProps: 'transform,transition' });
}

function revealOnScroll(gsap) {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      onStart: () => settle(el),
      onComplete: () => release(gsap, el),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  gsap.utils.toArray('[data-reveal-stagger]').forEach((group) => {
    const items = [...group.children];
    gsap.fromTo(items, { opacity: 0, y: 56, rotation: (i) => (i % 2 ? 3 : -3) }, {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      onStart: () => items.forEach(settle),
      onComplete: () => items.forEach((item) => release(gsap, item)),
      scrollTrigger: { trigger: group, start: 'top 88%', once: true },
    });
  });
}

function sectionDetails(gsap) {
  // Rabiscos entre os passos do plano
  gsap.utils.toArray('.plan__connector .draw').forEach((path) => {
    drawPaths([path]);
    gsap.to(path, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: path, start: 'top 85%', once: true } });
  });

  // Barras do mini relatório crescem
  if (has('.mini-report')) {
    gsap.fromTo('.mini-report__bars i', { scaleY: 0 }, {
      scaleY: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.mini-report', start: 'top 85%', once: true },
    });
  }

  // Números dos cases entram com um pequeno "pulo"
  gsap.utils.toArray('.case__number, .stat__number').forEach((el) => {
    gsap.fromTo(el, { scale: 0.85, transformOrigin: 'left bottom' }, {
      scale: 1, duration: 0.9, ease: 'back.out(2)',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Parallax leve no hero
  if (has('.hero__arch-wrap')) {
    gsap.to('.hero__arch-wrap', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
  if (has('.hero__floor')) {
    const heroBlock = document.querySelector('.hero__floor').closest('.block');
    gsap.to('.hero__floor', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: heroBlock, start: 'top top', end: 'bottom top', scrub: true } });
  }

  // Assinatura gigante do rodapé sobe por bloco
  if (has('.footer__wordmark')) {
    gsap.fromTo('.footer__wordmark > *', { yPercent: 60, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.12,
      scrollTrigger: { trigger: '.footer__wordmark', start: 'top 95%', once: true },
    });
  }
}

const has = (selector) => Boolean(document.querySelector(selector));

export function initMotion({ reduced, lenis }) {
  const { gsap } = window;

  if (reduced) return;

  if (has('.hero__visual')) heroIntro(gsap);

  if (has('.seal__ring')) {
    gsap.to('.seal__ring', { rotation: 360, duration: 24, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
  }

  const ribbonTrack = document.querySelector('.ribbon__track');
  if (ribbonTrack) marquee(gsap, ribbonTrack, { duration: 36, lenis });

  initBrandsMarquee(gsap, lenis);
  revealOnScroll(gsap);
  sectionDetails(gsap);
}
