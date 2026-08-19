import { html, Icon, Reveal } from '../lib.js';
import { Button, Eyebrow, SectionHead, Trustpilot } from '../components.js';

const FEATURES = [
  ['Fully funded', "Capital is reserved ahead of legal completion, so funding isn't dependent on investor allocation timing.", Icon.shieldCheck()],
  ['Fast execution', 'Indicative terms within 24-48 hours, with completion driven by your transaction, not our funding cycle.', Icon.trend()],
  ['Flexible exit', 'Structured to bridge a temporary gap — stabilising assets, supporting sale or refinance, or minor refurbishment.', Icon.home()],
];

const TERMS = [
  ['Up to 75%', 'Finance to value'],
  ['Up to 36 months', 'Term'],
  ['From 9% p.a.', 'Profit rates'],
];

export function BridgeFlex() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(3rem, 5vw, 5.5rem)' }}>
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <${Eyebrow}>BridgeFlex™<//>
            <h1 class="h-display">Bridge finance built for certainty of completion.</h1>
            <p class="lede measure">
              BridgeFlex™ is Nester's fully funded bridge finance product — used to bridge a
              temporary gap for stabilising assets, supporting sale or refinance transitions, or
              completing minor non-structural refurbishment works.
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
            <img src="public/images/bridge-property.png" alt="UK property financed through Nester's BridgeFlex product" />
            <span class="glow glow--brand" style=${{ width: '270px', height: '310px', top: '-80px', right: '-50px' }}></span>
          <//>
        </div>
      </section>

      <!-- ============ Terms ============ -->
      <section style=${{ paddingBottom: 'var(--section-y)' }}>
        <div class="shell">
          <${Reveal} className="stats" style=${{ '--stats-cols': 3 }}>
            ${TERMS.map(([v, l]) => html`
              <div key=${l} class="stat">
                <div class="stat__value">${v}</div>
                <div class="stat__label">${l}</div>
              </div>`)}
          <//>
        </div>
      </section>

      <!-- ============ Features ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead} eyebrow="Why BridgeFlex™" title="Designed for speed, without giving up certainty." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${FEATURES.map(([title, body, icon], i) => html`
              <${Reveal} key=${title} delay=${i * 60} className="tile" style=${{ boxShadow: 'var(--shadow-md)' }}>
                <span class="tile__icon">${icon}</span>
                <h3 class="h4">${title}</h3>
                <p class="body">${body}</p>
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
            <${Eyebrow} dark>BridgeFlex™<//>
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Ready to bridge the gap?</h2>
            <p class="lede measure" style=${{ position: 'relative', color: 'rgba(255,255,255,0.82)' }}>
              Submit your enquiry and receive indicative terms within 24-48 hours.
            </p>
            <div class="hero__actions" style=${{ position: 'relative', justifyContent: 'center' }}>
              <${Button} variant="white" href="#">Request finance<//>
            </div>
          <//>
        </div>
      </section>
    </main>`;
}
