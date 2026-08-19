/* Shared runtime helpers: htm binding, icons, and motion hooks. */

const { createElement, useState, useEffect, useRef, useCallback, useMemo } = React;
export const html = htm.bind(createElement);
export { useState, useEffect, useRef, useCallback, useMemo };

/* ------------------------------------------------------------------
   useInView — one-shot scroll reveal.
   Once: true, so elements never re-animate on scroll-back (re-animating
   on every pass is decoration the user sees dozens of times a session).
------------------------------------------------------------------ */
export function useInView({ margin = '-80px', once = true } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { rootMargin: margin, threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, once]);

  return [ref, shown];
}

/* Reveal wrapper. `delay` staggers siblings — keep it 30–80ms apart. */
export function Reveal({ children, delay = 0, as = 'div', className = '', ...rest }) {
  const [ref, shown] = useInView();
  return createElement(
    as,
    {
      ref,
      className: `reveal ${className}`.trim(),
      'data-shown': shown ? 'true' : 'false',
      style: { '--reveal-delay': `${delay}ms` },
      ...rest,
    },
    children
  );
}

/* ------------------------------------------------------------------
   Icons — inline SVG, currentColor, no icon font, no emoji.
------------------------------------------------------------------ */
export const Icon = {
  arrowRight: () => html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUpRight: () => html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronDown: () => html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  play: (s = 28) => html`<svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor"/></svg>`,
  playCircle: () => html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M10 8.5v7l5.5-3.5-5.5-3.5Z" fill="currentColor"/></svg>`,
  pin: () => html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.8"/></svg>`,
  shield: () => html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3 5 6v5c0 4.5 3 7.7 7 10 4-2.3 7-5.5 7-10V6l-7-3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  check: () => html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="var(--secondary)"/>
    <path d="m8 12.5 2.5 2.5L16 9.5" stroke="var(--primary)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  checkSolid: () => html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="var(--success)"/>
    <path d="m8 12.5 2.5 2.5L16 9.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  star: () => html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m12 4.5 2.2 4.9 5.3.5-4 3.6 1.15 5.2L12 16.1l-4.65 2.6L8.5 13.5l-4-3.6 5.3-.5L12 4.5Z" fill="#fff"/></svg>`,
  menu: () => html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  close: () => html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  info: () => html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="1.8"/>
    <path d="M12 11v6M12 7.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  home: () => html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 11.5 12 4l9 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  lock: () => html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" stroke-width="2"/>
    <path d="M8 10V7.5a4 4 0 1 1 8 0V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  shieldCheck: () => html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3 5 6v5c0 4.5 3 7.7 7 10 4-2.3 7-5.5 7-10V6l-7-3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  eye: () => html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="2.8" stroke="currentColor" stroke-width="2"/></svg>`,
  bars: () => html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  trend: () => html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 17.5 9 11l4 4 8-8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 6.5h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  google: () => html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 2.5v19l11-9.5-11-9.5Z" fill="var(--brand-secondary)"/>
    <path d="m15 12 4-3.4L4 2.5 15 12Z" fill="var(--purple-300)"/>
    <path d="m15 12 4 3.4-15 6.1L15 12Z" fill="#fff"/></svg>`,
  apple: () => html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85-.7 0-1.85-.83-3.05-.8-1.55.02-3 .9-3.8 2.3-1.6 2.8-.4 7 1.15 9.3.77 1.13 1.68 2.4 2.88 2.35 1.16-.05 1.6-.75 3-.75s1.8.75 3.03.73c1.25-.02 2.04-1.14 2.8-2.28.88-1.3 1.24-2.57 1.26-2.64-.03-.01-2.4-.92-2.42-3.66Z" fill="#fff"/>
    <path d="M14.2 5.9c.63-.77 1.06-1.83.94-2.9-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.95 2.78 1.01.08 2.04-.51 2.67-1.25Z" fill="#fff"/></svg>`,
  search: () => html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
    <path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  sliders: () => html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h10M18 6h2M4 18h2M10 18h10M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="6" r="2.3" fill="var(--card)" stroke="currentColor" stroke-width="2"/>
    <circle cx="8" cy="12" r="2.3" fill="var(--card)" stroke="currentColor" stroke-width="2"/>
    <circle cx="6" cy="18" r="2.3" fill="var(--card)" stroke="currentColor" stroke-width="2"/></svg>`,
};
