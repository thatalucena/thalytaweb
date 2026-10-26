// Ponto de entrada do formulário.

import { initTags } from './tracking.js';
import { initMotion } from './motion.js';
import { initForm } from './form.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initTags();
if (initMotion({ reduced })) window.__motionReady = true;
else document.documentElement.classList.remove('motion');
initForm();
