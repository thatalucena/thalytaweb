// Interações: menu mobile, abas do processo e barra inferior fixa.

export function initMenu({ onOpen, onClose } = {}) {
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.getElementById('menu-mobile');
  if (!toggle || !overlay) return { close() {} };

  const label = toggle.querySelector('.menu-toggle__label');
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
    label.textContent = 'Fechar';
    document.body.classList.add('menu-open');
    onOpen?.(overlay);
    overlay.querySelector('a')?.focus({ preventScroll: true });
  };

  const close = ({ restoreFocus = true } = {}) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    label.textContent = 'Menu';
    document.body.classList.remove('menu-open');
    onClose?.();
    setTimeout(() => { overlay.hidden = true; }, 300);
    if (restoreFocus) lastFocus?.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  overlay.addEventListener('click', (event) => {
    if (event.target.closest('a')) close({ restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    // Mantém o foco dentro do menu aberto
    if (event.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
      const focusables = [toggle, ...overlay.querySelectorAll('a')];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.matchMedia('(min-width: 900px)').addEventListener('change', (mq) => {
    if (mq.matches) close({ restoreFocus: false });
  });

  return { close };
}

export function initTabs() {
  const tabs = [...document.querySelectorAll('.process__tab')];
  if (!tabs.length) return;

  const select = (tab) => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', active);
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(next);
      next.focus();
    });
  });
}

// A barra inferior aparece depois do hero e some quando o rodapé está na tela.
export function initMobileBar() {
  const bar = document.querySelector('.mobile-bar');
  const hero = document.querySelector('.hero, .page-hero');
  const footer = document.querySelector('.footer');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;

  let heroVisible = true;
  let footerVisible = false;
  const update = () => bar.classList.toggle('is-visible', !heroVisible && !footerVisible);

  new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; update(); }, { threshold: 0.1 }).observe(hero);
  if (footer) {
    new IntersectionObserver(([entry]) => { footerVisible = entry.isIntersecting; update(); }).observe(footer);
  }
}

// Marca no menu a página atual (Serviços, Portfólio, Processo, Dúvidas).
export function initActiveNav() {
  const path = window.location.pathname.replace(/\/(index\.html)?$/, '') || '/';
  document.querySelectorAll('.site-header__nav a, .menu-overlay__links a').forEach((link) => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (href !== '/' && href === path) link.setAttribute('aria-current', 'page');
  });
}

// Botão de voltar ao topo aparece depois da primeira dobra.
export function initToTop(lenis) {
  const button = document.querySelector('.to-top');
  if (!button) return;

  const update = () => button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
  window.addEventListener('scroll', update, { passive: true });
  update();

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.querySelector('.site-header__brand')?.focus({ preventScroll: true });
  });
}
