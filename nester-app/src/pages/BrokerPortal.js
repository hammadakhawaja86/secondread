import { html, Icon, Reveal } from '../lib.js';
import { Button, Eyebrow, SectionHead, Trustpilot } from '../components.js';

const STATS = [
  ['150+', 'Years of experience'],
  ['5,000+', 'Hours of technological development'],
  ['100%', 'FCA approved'],
];

const TERMS = [
  ['Up to 75%', 'Finance to value'],
  ['Up to 85%', 'Finance to cost'],
  ['From 9% p.a.', 'Profit rates'],
  ['None', 'Early redemption fees'],
  ['Up to 36 months', 'Term'],
  ['From 2%', 'Fees'],
];

export function BrokerPortal() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(3rem, 5vw, 5.5rem)' }}>
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <${Eyebrow}>Broker portal<//>
            <h1 class="h-display">Do you have clients seeking specialist financing solutions?</h1>
            <p class="lede measure">
              Register and join our brokers portal and you'll be able to submit financing requests
              on behalf of your clients directly.
            </p>
            <div class="hero__actions">
              <${Button} variant="primary" href="#">Request finance<//>
              <span class="body" style=${{ fontSize: 'var(--t-sm)' }}>
                Existing broker? ${' '}
                <a href="#" style=${{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>Log in</a>
              </span>
            </div>
          <//>
          <${Reveal} className="hero__visual" delay=${80}>
            <img src="public/images/bridge-property.png" alt="UK property bridge finance arranged through Nester" />
            <span class="glow glow--brand" style=${{ width: '270px', height: '310px', top: '-80px', right: '-50px' }}></span>
          <//>
        </div>
      </section>

      <!-- ============ Trust stats ============ -->
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

      <!-- ============ Value proposition ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '30px' }}>
          <${Reveal}><h2 class="h2" style=${{ textAlign: 'center' }}>Partner with Nester.</h2><//>
          <${Reveal} delay=${60} style=${{ maxWidth: '78ch' }}>
            <p class="body" style=${{ textAlign: 'center', fontSize: 'var(--t-base)' }}>
              Partner with Nester to access fast, fully funded property finance solutions for your
              clients, with clear criteria and responsive decision-making.
            </p>
          <//>
        </div>
      </section>

      <!-- ============ Finance criteria ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead}
            eyebrow="Finance criteria"
            title="Our finance, at a glance."
            sub="This table outlines the broad terms of Nester's financing criteria for any individual transaction." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${TERMS.map(([v, l], i) => html`
              <${Reveal} key=${l} delay=${(i % 3) * 60} className="tile" style=${{ boxShadow: 'var(--shadow-md)' }}>
                <div class="h3" style=${{ color: 'var(--primary)' }}>${v}</div>
                <p class="body">${l}</p>
              <//>`)}
          </div>
        </div>
      </section>

      <${Trustpilot} />

      <!-- ============ Newsletter / CTA ============ -->
      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell">
          <${Reveal} className="ctapanel stack center" style=${{ gap: '22px' }}>
            <span class="glow glow--info" style=${{ width: '360px', height: '400px', top: '-160px', right: '-70px' }}></span>
            <${Eyebrow} dark>Broker portal<//>
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Ready to submit your first case?</h2>
            <p class="lede measure" style=${{ position: 'relative', color: 'rgba(255,255,255,0.82)' }}>
              Register for the Broker Portal and get responsive decisions on your clients' finance requests.
            </p>
            <div class="hero__actions" style=${{ position: 'relative', justifyContent: 'center' }}>
              <${Button} variant="white" href="#">Register as a broker<//>
              <${Button} variant="soft" href="#">Existing broker<//>
            </div>
          <//>
        </div>
      </section>
    </main>`;
}
