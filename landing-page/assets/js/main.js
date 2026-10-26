// Ponto de entrada da landing page.

import { initTags, initSectionViews, initClickTracking } from './tracking.js?v=20261026';
import { initLinks } from './links.js?v=20261026';
import { initMenu, initTabs, initActiveNav, initToTop } from './ui.js?v=20261026';
import { initScroll, initHeaderTheme, initMotion } from './motion.js?v=20261026';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

initTags();
initLinks();
initClickTracking();
initSectionViews();
initTabs();
initActiveNav();

let lenis = null;

if (hasGsap) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  lenis = initScroll({ reduced });
  initHeaderTheme();
  initMotion({ reduced, lenis });
  window.__motionReady = true;
} else {
  document.documentElement.classList.remove('motion');
}

initToTop(lenis);

initMenu({
  onOpen: (overlay) => {
    lenis?.stop();
    // Links entram em cascata pela esquerda (padrão Loudly)
    if (hasGsap && !reduced) {
      window.gsap.fromTo(overlay.querySelectorAll('.menu-overlay__links a, .menu-overlay__foot'),
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06, delay: 0.1 });
    }
  },
  onClose: () => lenis?.start(),
});

// Fontes carregadas mudam a altura dos blocos: recalcula os gatilhos.
if (hasGsap && document.fonts) {
  document.fonts.ready.then(() => window.ScrollTrigger.refresh());
}
