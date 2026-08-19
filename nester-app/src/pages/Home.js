import { html, Icon, Reveal } from '../lib.js';
import {
  Button, Eyebrow, SectionHead, DealCard, ArticleCard,
  ReviewCard, PressMarquee, Trustpilot,
} from '../components.js';

const STATS = [
  ['£100M+', 'Financed'],
  ['Up to 9%', 'Target returns'],
  ['FCA', 'Regulated'],
  ['Sharia-Compliant', 'Certified'],
];

const DEALS = [
  { grade: 'A1', title: 'EMA GojiMurabaha ff8wuo', location: 'Teignmouth, GBR', image: 'public/images/deal-1.png',
    stats: [{ value: '4 Months', label: 'Term remaining' }, { value: '25/09/2026', label: 'Rollover date' }, { value: '£10,000', label: 'Financed' }] },
  { grade: 'A3', title: 'Northgate Development qr2tla', location: 'Manchester, GBR', image: 'public/images/deal-2.png',
    stats: [{ value: '9 Months', label: 'Term remaining' }, { value: '12/03/2027', label: 'Rollover date' }, { value: '£250,000', label: 'Financed' }] },
  { grade: 'C3', title: 'Oakfield Bridge Finance kp7zmd', location: 'Bristol, GBR', image: 'public/images/deal-3.png',
    stats: [{ value: '6 Months', label: 'Term remaining' }, { value: '08/12/2026', label: 'Rollover date' }, { value: '£85,000', label: 'Financed' }] },
];

const ARTICLES = [
  { title: 'How to Create an Account With Nester', image: 'public/images/article-1.png',
    excerpt: 'Welcome to Nester! Here you can learn how to create a new account and start investing in property-backed opportunities.' },
  { title: 'Nester Reaches Major Milestone with Over £100 Million in Total Financings', image: 'public/images/article-2.png',
    excerpt: 'Nester, a leading non-bank financial institution regulated by the Financial Conduct Authority (FCA), marks a major moment.' },
  { title: "Nester's New Head of Asset Management, Dawood Ahmedji, To Expand Sharia-Compliant Offerings", image: 'public/images/article-3.png',
    excerpt: 'At Nester, every decision is guided by our vision of creating a more inclusive, transparent, and empowering platform.' },
];

const REVIEWS = [
  { name: 'Nusrat Said', headline: 'Revolutionary and customer centred.',
    body: 'Smooth onboarding process, regular updates, founders and management team on hand to listen and take on suggestions from investors. Overall, a company that has the interests of their investors at heart. Key players in mobilising and campaigning for the ISA integration for Sharia compliant investments.' },
  { name: 'Muhammad', headline: 'Perfect',
    body: 'Been a member since November 2024 with my first investment in the same month. Received and receiving profits on time. Once an investment comes to an end, capital is paid back into wallet immediately. Withdrawal of funds into bank account is simple and happens immediately. Only wish more properties/investments available.' },
];

const JOURNEY = [
  { title: 'Investors.', accent: 'purple', icon: Icon.trend(),
    q: 'Are you seeking an investment secured on property?',
    bullets: ['Invest anything from £1,000 and earn up to 9% p.a. target return', 'Take back control of your finances', 'Capital is at risk, please review our Risk Statement'],
    foot: 'Register as an Investor and review the deals available.', cta: 'Become an Investor' },
  { title: 'Buyers.', accent: 'blue', icon: Icon.home(),
    q: 'Are you seeking Buy to Let, Development, or Bridge Finance?',
    bullets: ['Finance of £200,000 to £5,000,000', 'Maximum finance to value of 75%', "You're an experienced property professional"],
    foot: 'Register as a Buyer and send us your project details.', cta: 'Become a Buyer' },
];

export function Home() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(3rem, 5vw, 5.5rem)' }}>
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <h1 class="h-display">
              Invest in, or finance, UK property — the smarter ${' '}
              <span class="accent">ethical</span> way.
            </h1>
            <p class="lede measure">
              Property-backed opportunities with target returns up to 9% p.a.
              FCA regulated platform with over £100M financed.
            </p>
            <div class="hero__actions">
              <${Button} variant="soft" href="#deals">I want to invest<//>
              <${Button} variant="primary" href="#/how-it-works">I need finance<//>
            </div>
          <//>
          <${Reveal} className="hero__visual" delay=${80}>
            <img src="public/images/property-facade.png" alt="UK residential property financed through Nester" />
            <span class="glow glow--brand" style=${{ width: '260px', height: '300px', top: '-70px', right: '-40px' }}></span>
          <//>
        </div>
      </section>

      <!-- ============ Trust stats ============ -->
      <section style=${{ paddingBottom: 'var(--section-y)' }}>
        <div class="shell">
          <${Reveal} className="stats">
            ${STATS.map(([v, l], i) => html`
              <div key=${l} class="stat">
                <div class="stat__value">${v}</div>
                <div class="stat__label">${l}</div>
              </div>`)}
          <//>
        </div>
      </section>

      <!-- ============ Video ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '48px' }}>
          <${SectionHead} eyebrow="Watch the video" title="What does Nester do?" />
          <${Reveal} className="panel panel--brand videopanel" style=${{ width: '100%' }}>
            <span class="glow glow--info" style=${{ width: '340px', height: '380px', top: '-120px', right: '-60px' }}></span>
            <button class="playbtn" aria-label="Play the Nester introduction video">
              <span style=${{ color: 'var(--primary)', display: 'grid', placeItems: 'center' }}>${Icon.play(30)}</span>
            </button>
          <//>
        </div>
      </section>

      <!-- ============ Get started: investors / buyers ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '48px' }}>
          <${SectionHead} eyebrow="Get started" title="Start your Nester journey." />
          <div class="grid-2" style=${{ width: '100%' }}>
            ${JOURNEY.map((j, i) => html`
              <${Reveal} key=${j.title} className="tile" delay=${i * 60} style=${{ gap: '22px', padding: 'clamp(1.75rem,3vw,2.5rem)', boxShadow: 'var(--shadow-md)' }}>
                <span class="tile__icon" style=${j.accent === 'blue' ? { background: 'var(--info-subtle)', color: 'var(--blue-600)' } : null}>
                  ${j.icon}
                </span>
                <h3 class="h2" style=${{ fontSize: 'clamp(1.5rem,2.4vw,2rem)' }}>${j.title}</h3>
                <p class="lede" style=${{ fontSize: 'var(--t-base)' }}>${j.q}</p>
                <div class="bullets">
                  ${j.bullets.map((b) => html`
                    <div key=${b} class="bullet">${Icon.check()}<span>${b}</span></div>`)}
                </div>
                <p class="body">${j.foot}</p>
                <${Button} variant=${j.accent === 'blue' ? 'blue' : 'primary'} href="#/how-it-works" style=${{ marginTop: 'auto', alignSelf: 'flex-start' }}>${j.cta}<//>
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ IF-ISA ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(2.5rem,4vw,4.5rem)' }}>
        <div class="shell">
          <${Reveal} className="ctapanel" style=${{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', flexWrap: 'wrap', padding: 'clamp(2rem,3.5vw,2.75rem) clamp(2rem,4vw,3.5rem)' }}>
            <span class="glow glow--info" style=${{ width: '300px', height: '340px', top: '-140px', right: '-40px' }}></span>
            <h2 class="h3" style=${{ color: 'var(--on-dark)', position: 'relative' }}>
              The UK's First Sharia-Compliant IF-ISA
            </h2>
            <${Button} variant="white" href="#/ifisa" style=${{ position: 'relative' }}>Learn about IF-ISA<//>
          <//>
        </div>
      </section>

      <!-- ============ Mobile app ============ -->
      <section class="section">
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <${Eyebrow}>Mobile app<//>
            <h2 class="h2">Get the Nester Invest App.</h2>
            <p class="lede measure">
              Invest on the go — explore new opportunities, review project details, and manage
              your entire Nester portfolio seamlessly from your phone.
            </p>
            <p class="lede measure">
              Stay fully in control — track live deal progress, receive instant notifications,
              and monitor returns with real-time clarity wherever you are.
            </p>
            <div class="hero__actions">
              <a class="btn btn--dark" href="#" style=${{ paddingLeft: '20px' }}>
                ${Icon.google()}
                <span style=${{ display: 'grid', lineHeight: 1.25, textAlign: 'left' }}>
                  <span style=${{ fontSize: '10.5px', fontWeight: 400, opacity: 0.78 }}>Get it on</span>
                  <span style=${{ fontSize: '15px' }}>Google Play</span>
                </span>
              </a>
              <a class="btn btn--dark" href="#" style=${{ paddingLeft: '20px' }}>
                ${Icon.apple()}
                <span style=${{ display: 'grid', lineHeight: 1.25, textAlign: 'left' }}>
                  <span style=${{ fontSize: '10.5px', fontWeight: 400, opacity: 0.78 }}>Download on the</span>
                  <span style=${{ fontSize: '15px' }}>App Store</span>
                </span>
              </a>
            </div>
          <//>
          <${Reveal} className="panel panel--tint" delay=${80} style=${{ aspectRatio: '1 / 1', display: 'grid', placeItems: 'center', padding: '6%' }}>
            <span class="glow glow--brand" style=${{ width: '260px', height: '300px', top: '-90px', right: '-60px', opacity: 0.28 }}></span>
            <img src="public/images/app-phone.png" alt="The Nester Invest app shown on a phone"
                 style=${{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain' }} loading="lazy" />
          <//>
        </div>
      </section>

      <!-- ============ Mission ============ -->
      <section class="section section--subtle">
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <${Eyebrow}>Our mission<//>
            <h2 class="h2">Fixed income investments secured on UK property for all.</h2>
            <p class="lede measure">
              Investment products shouldn't be restricted to the elite. We create a transparent
              environment for you to learn and invest. We focus on property because it's what we
              know best. Technology now allows us to put the power back in the hands of people.
            </p>
            <${Button} variant="primary" href="#/how-it-works">Find out more<//>
          <//>
          <${Reveal} className="hero__visual" delay=${80}>
            <img src="public/images/nester-office.jpg" alt="The Nester team at work" loading="lazy" />
            <span class="glow glow--info" style=${{ width: '240px', height: '280px', bottom: '-90px', left: '-60px' }}></span>
          <//>
        </div>
      </section>

      <!-- ============ Live deals ============ -->
      <section class="section" id="deals">
        <div class="shell stack center" style=${{ gap: '44px' }}>
          <${SectionHead} eyebrow="Live deals" title="Investment Opportunities." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${DEALS.map((d, i) => html`
              <${Reveal} key=${d.title} delay=${i * 60} style=${{ display: 'flex' }}>
                <${DealCard} ...${d} />
              <//>`)}
          </div>
          <${Button} variant="outline" href="#/opportunities">View all opportunities<//>
        </div>
      </section>

      <!-- ============ Articles ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '44px' }}>
          <${SectionHead} eyebrow="Insights" title="Articles." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${ARTICLES.map((a, i) => html`
              <${Reveal} key=${a.title} delay=${i * 60} style=${{ display: 'flex' }}>
                <${ArticleCard} ...${a} />
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ Testimonials ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '44px' }}>
          <${SectionHead} eyebrow="Trusted by investors" title="What our customers say." />
          <div class="grid-2" style=${{ width: '100%' }}>
            ${REVIEWS.map((r, i) => html`
              <${Reveal} key=${r.name} delay=${i * 60} style=${{ display: 'flex' }}>
                <${ReviewCard} ...${r} />
              <//>`)}
          </div>
        </div>
      </section>

      <${PressMarquee} />
      <${Trustpilot} />

      <!-- ============ Newsletter ============ -->
      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell">
          <${Reveal} className="ctapanel stack center" style=${{ gap: '22px' }}>
            <span class="glow glow--info" style=${{ width: '340px', height: '380px', top: '-150px', right: '-60px' }}></span>
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Our Newsletter.</h2>
            <p class="lede measure" style=${{ position: 'relative', color: 'rgba(255,255,255,0.82)' }}>
              Stay ahead with the Nester newsletter — your source for new investment opportunities,
              market insights, and key platform updates. Sign up today and never miss an opportunity.
            </p>
            <${Button} variant="white" href="#" style=${{ position: 'relative' }}>Get the newsletter<//>
          <//>
        </div>
      </section>
    </main>`;
}
