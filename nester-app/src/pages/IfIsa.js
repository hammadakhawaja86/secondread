import { html, Icon, Reveal } from '../lib.js';
import { Button, Eyebrow, SectionHead, Trustpilot } from '../components.js';

const STATS = [
  ['0%', 'Tax on returns'],
  ['+9%', 'Target returns'],
  ['£100M+', 'Invested by our investors'],
];

const SUMMARY = [
  'Invest up to £20,000 per annum',
  'Profit received is tax free',
  'Re-invest to compound returns',
  'Transfer from existing provider',
  'Withdraw funds instantly or reinvest',
];

const WHY = [
  ['First Islamic IF-ISA in the UK', Icon.shieldCheck()],
  ['Up to 9% p.a. tax free', Icon.trend()],
  ['Invest from as little as £1,000', Icon.home()],
  ['All secured on UK real estate', Icon.lock()],
];

const STEPS = [
  ['1', 'Complete Registration'],
  ['2', 'Add IF-ISA Account'],
  ['3', 'We Check your Eligibility'],
  ['4', 'Top up your e-wallet'],
  ['5', 'Start Investing'],
];

export function IfIsa() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(3rem, 5vw, 5.5rem)' }}>
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <${Eyebrow}>IF-ISA<//>
            <h1 class="h-display">Tax efficient investing with Innovative Finance ISA.</h1>
            <p class="lede measure">
              Earn tax-free returns through the UK's first Sharia-compliant Innovative Finance
              ISA, backed by real property assets.
            </p>
            <div class="hero__actions">
              <${Button} variant="primary" href="#">Get Started<//>
              <span class="body" style=${{ fontSize: 'var(--t-sm)' }}>
                Existing Investor? ${' '}
                <a href="#" style=${{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>Log in</a>
              </span>
            </div>
          <//>
          <${Reveal} className="hero__visual" delay=${80}>
            <img src="public/images/investor-hero.png" alt="UK residential property backing Nester's IF-ISA" />
            <span class="glow glow--brand" style=${{ width: '270px', height: '310px', top: '-80px', right: '-50px' }}></span>
          <//>
        </div>
      </section>

      <!-- ============ Key metrics ============ -->
      <section style=${{ paddingBottom: 'var(--section-y)' }}>
        <div class="shell">
          <${Reveal} className="stats" style=${{ '--stats-cols': 3 }}>
            ${STATS.map(([v, l]) => html`
              <div key=${l} class="stat">
                <div class="stat__value">${v}</div>
                <div class="stat__label">${l}</div>
              </div>`)}
          <//>
        </div>
      </section>

      <!-- ============ What is an IF-ISA ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '30px' }}>
          <${Reveal}><h2 class="h2" style=${{ textAlign: 'center' }}>What is an IF-ISA?</h2><//>
          <${Reveal} delay=${60} style=${{ maxWidth: '78ch' }}>
            <p class="body" style=${{ textAlign: 'center', fontSize: 'var(--t-base)' }}>
              An Innovative Finance ISA (IF-ISA) is a type of tax-free individual savings account
              (ISA) that allows Investors to earn tax-free returns on peer-to-peer (P2P) financing.
              Introduced by the UK government to give savers access to alternative finance
              investments, the IF-ISA offers the flexibility to invest up to your full annual ISA
              allowance while potentially earning a higher return than traditional cash or
              stocks-and-shares ISAs — with capital secured against real UK property.
            </p>
          <//>
        </div>
      </section>

      <!-- ============ Summary + Why Nester ============ -->
      <section class="section section--subtle">
        <div class="shell">
          <div class="grid-2" style=${{ gap: '28px' }}>
            <${Reveal} className="tile" style=${{ boxShadow: 'var(--shadow-md)', gap: '18px' }}>
              <${Eyebrow}>IF-ISA summary<//>
              <div class="stack" style=${{ gap: '14px' }}>
                ${SUMMARY.map((s) => html`
                  <div key=${s} style=${{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    ${Icon.check()}<span class="body">${s}</span>
                  </div>`)}
              </div>
            <//>
            <${Reveal} delay=${60} className="tile" style=${{ boxShadow: 'var(--shadow-md)', gap: '18px' }}>
              <${Eyebrow}>Why Nester's IF-ISA<//>
              <div class="stack" style=${{ gap: '14px' }}>
                ${WHY.map(([s, icon]) => html`
                  <div key=${s} style=${{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style=${{ color: 'var(--primary)', display: 'flex' }}>${icon}</span>
                    <span class="body">${s}</span>
                  </div>`)}
              </div>
            <//>
          </div>
        </div>
      </section>

      <!-- ============ Sign-up process ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead} eyebrow="Get started" title="Open your IF-ISA in 5 steps." />
          <div class="grid-auto" style=${{ width: '100%' }}>
            ${STEPS.map(([n, title], i) => html`
              <${Reveal} key=${n} delay=${(i % 3) * 60} className="tile">
                <span class="stepnum">${n}</span>
                <h3 class="h4">${title}</h3>
              <//>`)}
          </div>
          <${Button} variant="primary" href="#">Get Started<//>
        </div>
      </section>

      <${Trustpilot} />

      <!-- ============ CTA ============ -->
      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell">
          <${Reveal} className="ctapanel stack center" style=${{ gap: '22px' }}>
            <span class="glow glow--info" style=${{ width: '360px', height: '400px', top: '-160px', right: '-70px' }}></span>
            <${Eyebrow} dark>IF-ISA<//>
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Start your tax-free portfolio today.</h2>
            <p class="lede measure" style=${{ position: 'relative', color: 'rgba(255,255,255,0.82)' }}>
              Register in minutes and start earning tax-free returns backed by real UK property.
            </p>
            <div class="hero__actions" style=${{ position: 'relative', justifyContent: 'center' }}>
              <${Button} variant="white" href="#">Get Started<//>
              <${Button} variant="soft" href="#">Existing users<//>
            </div>
          <//>
        </div>
      </section>
    </main>`;
}
