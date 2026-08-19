import { html, Icon, Reveal, useState, useEffect, useRef } from './lib.js';

/* ================= Button ================= */
export function Button({ variant = 'primary', children, icon = true, href = '#', onClick, as = 'a', className = '', ...rest }) {
  const cls = `btn btn--${variant}${className ? ` ${className}` : ''}`;
  const tail = icon ? Icon.arrowRight() : null;
  if (as === 'button') return html`<button class=${cls} onClick=${onClick} ...${rest}>${children}${tail}</button>`;
  return html`<a class=${cls} href=${href} onClick=${onClick} ...${rest}>${children}${tail}</a>`;
}

/* ================= Eyebrow / SectionHead ================= */
export const Eyebrow = ({ children, dark }) =>
  html`<span class=${`eyebrow${dark ? ' eyebrow--dark' : ''}`}>${children}</span>`;

export function SectionHead({ eyebrow, title, sub, dark, align = 'center' }) {
  const centred = align === 'center';
  return html`
    <${Reveal} className="stack" style=${{
      gap: '18px',
      alignItems: centred ? 'center' : 'flex-start',
      textAlign: centred ? 'center' : 'left',
    }}>
      ${eyebrow ? html`<${Eyebrow} dark=${dark}>${eyebrow}<//>` : null}
      <h2 class="h2" style=${dark ? { color: 'var(--on-dark)' } : null}>${title}</h2>
      ${sub ? html`<p class="lede measure" style=${dark ? { color: 'var(--on-dark-muted)' } : null}>${sub}</p>` : null}
    <//>`;
}

/* ================= Risk banner ================= */
export const RiskBanner = () => html`
  <div class="riskbar">
    <div class="shell">
      <p class="riskbar__inner">
        Don't invest unless you're prepared to lose money. This is a high-risk investment.
        You may not be able to access your money easily and are unlikely to be protected if
        something goes wrong. ${' '}<a href="#risk">Take 2 minutes to learn more.</a>
      </p>
    </div>
  </div>`;

/* ================= Header + nav dropdowns ================= */
const MENUS = [
  { label: 'Invest', items: [
    { label: 'How It Works', to: '#/how-it-works' },
    { label: 'IF-ISA', to: '#/ifisa' },
    { label: 'Browse Opportunities', to: '#/opportunities' },
  ]},
  { label: 'Finance', items: [
    { label: 'Request Finance', to: '#/request-finance' },
    { label: 'Broker Portal', to: '#/broker' },
    { label: 'BridgeFlex™', to: '#/bridgeflex' },
  ]},
  { label: 'About', items: [
    { label: 'About Us', to: '#/about' },
    { label: 'Blog', to: '#/blog' },
    { label: 'Glossary', to: '#' },
    { label: 'FAQs', to: '#' },
  ]},
];

/* Hover open/close is handled purely by CSS (:hover / :focus-within on
   .nav__item, see styles.css). The menu is a DOM descendant of .nav__item,
   so the ancestor stays hovered for as long as the pointer is anywhere over
   the menu, no matter the visual gap or diagonal travel — this makes the
   trigger→menu dead-zone bug structurally impossible instead of something
   to chase with mouseenter/mouseleave timers. JS state below only handles
   click-to-toggle (touch, and clicking the trigger while already open via
   keyboard) plus Escape / click-away for that click-opened state. */
function NavItem({ menu, open, setOpen }) {
  const ref = useRef(null);
  const isOpen = open === menu.label;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    const onClickAway = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClickAway);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClickAway);
    };
  }, [isOpen, setOpen]);

  return html`
    <div class="nav__item" ref=${ref} data-open=${isOpen ? 'true' : 'false'}>
      <button class="nav__link" aria-expanded=${isOpen} aria-haspopup="true"
              onClick=${() => setOpen(isOpen ? null : menu.label)}>
        ${menu.label}${Icon.chevronDown()}
      </button>
      <div class="menu" role="menu">
        ${menu.items.map((it) => html`
          <a key=${it.label} class="menu__item" role="menuitem" href=${it.to}
             onClick=${() => setOpen(null)}>${it.label}</a>`)}
      </div>
    </div>`;
}

export function Header() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // lock scroll behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return html`
    <header class="header">
      <div class="shell header__inner">
        <a class="brand" href="#/" aria-label="Nester home">
          <img src="public/images/nester-logo.svg" alt="Nester" />
        </a>
        <nav class="nav" aria-label="Primary">
          ${MENUS.map((m) => html`<${NavItem} key=${m.label} menu=${m} open=${open} setOpen=${setOpen} />`)}
          <a class="nav__link" href="#">Login</a>
        </nav>
        <div class="header__actions">
          <${Button} variant="outline" icon=${false} href="#/investor-opportunities" className="header__opportunities">Opportunities<//>
          <${Button} variant="primary" href="#/how-it-works">Get Started<//>
          <button class="burger" aria-label=${mobileOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded=${mobileOpen} onClick=${() => setMobileOpen((v) => !v)}>
            ${mobileOpen ? Icon.close() : Icon.menu()}
          </button>
        </div>
      </div>

      ${mobileOpen ? html`
        <div class="sheet" role="dialog" aria-label="Menu">
          <div class="shell stack" style=${{ gap: '26px', paddingBlock: '26px 40px' }}>
            ${MENUS.map((m) => html`
              <div key=${m.label} class="stack" style=${{ gap: '10px' }}>
                <span class="sheet__group">${m.label}</span>
                ${m.items.map((it) => html`
                  <a key=${it.label} class="sheet__link" href=${it.to}
                     onClick=${() => setMobileOpen(false)}>${it.label}</a>`)}
              </div>`)}
            <a class="sheet__link" href="#/investor-opportunities" onClick=${() => setMobileOpen(false)}>Opportunities</a>
            <a class="sheet__link" href="#" onClick=${() => setMobileOpen(false)}>Login</a>
          </div>
        </div>` : null}
    </header>`;
}

/* ================= Cards ================= */
export function DealCard({ grade, title, location, stats, image }) {
  return html`
    <article class="card card--interactive">
      <div class="card__media">
        <img src=${image} alt=${title} loading="lazy" />
        <span class="badge badge--grade">${Icon.shield()}${grade}</span>
      </div>
      <div class="card__body">
        <div class="stack" style=${{ gap: '6px' }}>
          <h3 class="h4">${title}</h3>
          <p class="body" style=${{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--t-sm)' }}>
            ${Icon.pin()}${location}
          </p>
        </div>
        <div class="dealstats" style=${{ marginTop: 'auto' }}>
          ${stats.map((s) => html`
            <div key=${s.label}>
              <div class="dealstat__v">${s.value}</div>
              <div class="dealstat__l">${s.label}</div>
            </div>`)}
        </div>
      </div>
    </article>`;
}

export function ArticleCard({ title, excerpt, image }) {
  return html`
    <article class="card card--interactive">
      <div class="card__media"><img src=${image} alt=${title} loading="lazy" /></div>
      <div class="card__body">
        <h3 class="h4">${title}</h3>
        <p class="body">${excerpt}</p>
        <a class="btn btn--ghost" href="#" style=${{ marginTop: 'auto', fontSize: 'var(--t-sm)' }}>
          Read article${Icon.arrowRight()}
        </a>
      </div>
    </article>`;
}

/* ================= Reviews ================= */
export const Stars = ({ count = 5 }) => html`
  <div class="stars" aria-label=${`${count} out of 5 stars`}>
    ${Array.from({ length: count }).map((_, i) => html`<span key=${i} class="star">${Icon.star()}</span>`)}
  </div>`;

export function ReviewCard({ name, headline, body }) {
  return html`
    <article class="card" style=${{ background: 'var(--surface-subtle)', padding: '36px', gap: '18px' }}>
      <${Stars} />
      <h3 class="h3">${headline}</h3>
      <p class="body">${body}</p>
      <div style=${{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', paddingTop: '8px' }}>
        <span class="avatar">${name.charAt(0)}</span>
        <div>
          <div style=${{ fontWeight: 600, fontSize: 'var(--t-sm)' }}>${name}</div>
          <div class="badge badge--verified" style=${{ gap: '5px', fontSize: 'var(--t-2xs)' }}>
            ${Icon.checkSolid()}Verified Review
          </div>
        </div>
      </div>
    </article>`;
}

/* ================= Press marquee ================= */
export function PressMarquee() {
  const names = ['NISBA', 'IFG', 'BRIDGING & COMMERCIAL'];
  const loop = [...names, ...names, ...names, ...names];
  return html`
    <section class="section" style=${{ paddingBlock: 'clamp(2.5rem, 4vw, 4.5rem)' }}>
      <div class="shell stack center" style=${{ gap: '28px' }}>
        <p style=${{ fontSize: 'var(--t-2xs)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
          Featured in
        </p>
        <div class="marquee" style=${{ width: '100%' }}>
          <div class="marquee__track">
            ${loop.map((n, i) => html`<span key=${i} class="marquee__item">${n}</span>`)}
          </div>
        </div>
      </div>
    </section>`;
}

/* ================= Trustpilot ================= */
export const Trustpilot = () => html`
  <section class="section">
    <div class="shell">
      <${Reveal} className="card stack center" style=${{ background: 'var(--surface-subtle)', padding: 'clamp(2.5rem,5vw,3.5rem)', gap: '20px' }}>
        <${Stars} />
        <h2 class="h2">Trusted Investments.</h2>
        <p class="lede measure">
          Proudly rated Excellent on Trustpilot, Nester continues to earn the confidence of
          investors, brokers and buyers through clarity, speed, and integrity.
        </p>
      <//>
    </div>
  </section>`;

/* ================= Footer ================= */
const FOOT_COLS = [
  ['Our Offer', 'FAQs', 'Privacy', 'P2P Risk Summary'],
  ['Outcomes Statement', 'Consumer Duty Statement', 'Who we are', 'Service Terms'],
  ['Risk Statement', 'Statistics', 'Blog', 'Become a Nester'],
];

export const Footer = () => html`
  <footer class="footer" id="risk">
    <div class="shell">
      <div class="footer__top">
        <div class="stack" style=${{ gap: '20px' }}>
          <div class="footer__brand"><img src="public/images/nester-logo-white.svg" alt="Nester" /></div>
          <p style=${{ fontSize: 'var(--t-xs)', lineHeight: 1.75 }}>
            Nester Platform Ltd is authorised and regulated by the Financial Conduct Authority,
            registration number 915346, and is a limited company registered in England and Wales
            (No. 12097430) with its registered office at Unit 4, Block B, 87 Stepney Way, London E1 2EN.
            Nester® is a registered trademark of Nester Holdings Ltd, a limited company registered in
            England and Wales (No. 11475486) with its registered office at Unit 4, Block B, 87 Stepney Way,
            London E1 2EN. Nester Holdings Ltd. Copyright 2019. All rights reserved.
          </p>
        </div>
        <div class="stack" style=${{ gap: '22px' }}>
          <h4 class="h4">Learn more.</h4>
          <div class="footer__cols">
            ${FOOT_COLS.map((col, i) => html`
              <div key=${i} class="stack" style=${{ gap: '13px' }}>
                ${col.map((l) => html`<a key=${l} href="#">${l}</a>`)}
              </div>`)}
          </div>
        </div>
      </div>

      <div class="footer__legal">
        Don't invest unless you're prepared to lose money. This is a high-risk investment.
        You may not be able to access your money easily and are unlikely to be protected if something
        goes wrong. Profit returns shown and past performance are not a guide to future performance.
        Tax treatment depends on individual circumstances and may change. We recommend you seek
        financial advice before investing.
      </div>

      <div class="footer__bottom">
        <span>© Nester. All rights reserved.</span>
        <span style=${{ display: 'flex', gap: '26px', flexWrap: 'wrap' }}>
          <a href="#">Consumer Duty Statement</a>
          <a href="#">P2P Risk Summary</a>
          <a href="#">Service Terms</a>
        </span>
      </div>
    </div>
  </footer>`;
