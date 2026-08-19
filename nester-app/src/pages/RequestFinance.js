import { html, Icon, Reveal } from '../lib.js';
import { Button, Eyebrow, SectionHead, Trustpilot } from '../components.js';

const STATS = [
  ['150+', 'Combined years of experience'],
  ['100%', 'FCA authorised and regulated'],
  ['5,000+', 'Hours of technological development'],
];

const TERMS = [
  ['Up to 75%', 'Finance to value'],
  ['Up to 85%', 'Finance to cost'],
  ['From 9% p.a.', 'Profit rates'],
  ['None', 'Early redemption fees'],
  ['Up to 36 months', 'Term'],
  ['From 2%', 'Fees'],
];

const PROCESS = [
  ['1', 'Indicative Terms', 'Submit your enquiry and receive initial terms within 24-48 hours.'],
  ['2', 'Credit Approval & Reservation', 'Once approved, due diligence is completed and funds reserved.'],
  ['3', 'Execution & Funding', 'Legal completion and immediate funding from pre-funded capital.'],
];

const HOW = [
  ['1', 'Application Receipt', 'Your finance request is logged and assigned to the underwriting team.'],
  ['2', 'Application Screening', 'Reviewed by property professionals with extensive underwriting experience.'],
  ['3', 'Credit Committee', 'Progressed deals are presented to credit committee for approval.'],
  ['4', 'Deal Live', 'Approved deals go live on the Nester platform for Investors.'],
  ['5', 'Pre-funding & Investing', 'Funding is drawn from pre-funded capital ahead of investor allocation.'],
  ['6', 'Regular Review', 'Nester continues to monitor the transaction until final maturity.'],
];

export function RequestFinance() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(3rem, 5vw, 5.5rem)' }}>
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <${Eyebrow}>Request finance<//>
            <h1 class="h-display">Can Nester provide you finance?</h1>
            <p class="lede measure">
              Fast, flexible property finance backed by a fully funded model — designed for
              certainty, speed, and execution.
            </p>
            <div class="hero__actions">
              <${Button} variant="primary" href="#">Request finance<//>
              <span class="body" style=${{ fontSize: 'var(--t-sm)' }}>
                Existing buyer? ${' '}
                <a href="#" style=${{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>Log in</a>
              </span>
            </div>
          <//>
          <${Reveal} className="hero__visual" delay=${80}>
            <img src="public/images/dev-property.png" alt="UK property development financed through Nester" />
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

      <!-- ============ Finance terms ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead}
            eyebrow="Finance criteria"
            title="Our finance, at a glance."
            sub="This outlines the broad terms of Nester's financing criteria for any individual transaction." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${TERMS.map(([v, l], i) => html`
              <${Reveal} key=${l} delay=${(i % 3) * 60} className="tile" style=${{ boxShadow: 'var(--shadow-md)' }}>
                <div class="h3" style=${{ color: 'var(--primary)' }}>${v}</div>
                <p class="body">${l}</p>
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ 3-step process ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead} eyebrow="How to apply" title="From enquiry to funding in 3 steps." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${PROCESS.map(([n, title, body], i) => html`
              <${Reveal} key=${n} delay=${i * 60} className="tile" style=${{ boxShadow: 'var(--shadow-md)' }}>
                <span class="stepnum stepnum--blue">${n}</span>
                <h3 class="h4">${title}</h3>
                <p class="body">${body}</p>
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ Deal journey ============ -->
      <section class="section section--dark">
        <div class="shell stack center" style=${{ gap: '56px' }}>
          <${SectionHead} dark eyebrow="Process" title="How does it work?" sub="This is Nester's Deal Journey." />
          <div class="grid-2" style=${{ width: '100%', gap: '20px' }}>
            ${HOW.map(([n, title, body], i) => html`
              <${Reveal} key=${n} delay=${(i % 2) * 60} className="jtile">
                <span class="stepnum stepnum--sm stepnum--blue">${n}</span>
                <div class="stack" style=${{ gap: '8px' }}>
                  <h4 class="h4">${title}</h4>
                  <p>${body}</p>
                </div>
              <//>`)}
          </div>
        </div>
      </section>

      <${Trustpilot} />

      <!-- ============ CTA ============ -->
      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell">
          <${Reveal} className="ctapanel stack center" style=${{ gap: '22px' }}>
            <span class="glow glow--info" style=${{ width: '360px', height: '400px', top: '-160px', right: '-70px' }}></span>
            <${Eyebrow} dark>Get started<//>
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Ready to fund your next project?</h2>
            <p class="lede measure" style=${{ position: 'relative', color: 'rgba(255,255,255,0.82)' }}>
              Submit your enquiry and receive indicative terms within 24-48 hours.
            </p>
            <div class="hero__actions" style=${{ position: 'relative', justifyContent: 'center' }}>
              <${Button} variant="white" href="#">New buyer<//>
              <${Button} variant="soft" href="#">Existing buyer<//>
            </div>
          <//>
        </div>
      </section>
    </main>`;
}
