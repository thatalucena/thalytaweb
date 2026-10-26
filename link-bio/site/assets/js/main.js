// Ponto de entrada do link da bio.

import { initTags, initClickTracking } from './tracking.js';
import { initLinks } from './links.js';
import { initCarousel } from './carousel.js';
import { initScroll, initMotion } from './motion.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

initTags();
initLinks();
initClickTracking();
initCarousel({ reduced });

if (hasGsap) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  initScroll({ reduced });
  initMotion({ reduced });
  window.__motionReady = true;
} else {
  document.documentElement.classList.remove('motion');
}

// Fontes carregadas mudam a altura dos blocos: recalcula os gatilhos.
if (hasGsap && document.fonts) {
  document.fonts.ready.then(() => window.ScrollTrigger.refresh());
}
