import { html, Reveal } from '../lib.js';
import { Button, Eyebrow, SectionHead, DealCard, Trustpilot } from '../components.js';

const DEALS = [
  { grade: 'A1', title: 'EMA GojiMurabaha ff8wuo', location: 'Teignmouth, GBR', image: 'public/images/deal-1.png',
    stats: [{ value: '4 Months', label: 'Term remaining' }, { value: '25/09/2026', label: 'Rollover date' }, { value: '£10,000', label: 'Financed' }] },
  { grade: 'A3', title: 'Northgate Development qr2tla', location: 'Manchester, GBR', image: 'public/images/deal-2.png',
    stats: [{ value: '9 Months', label: 'Term remaining' }, { value: '12/03/2027', label: 'Rollover date' }, { value: '£250,000', label: 'Financed' }] },
  { grade: 'C3', title: 'Oakfield Bridge Finance kp7zmd', location: 'Bristol, GBR', image: 'public/images/deal-3.png',
    stats: [{ value: '6 Months', label: 'Term remaining' }, { value: '08/12/2026', label: 'Rollover date' }, { value: '£85,000', label: 'Financed' }] },
];

const GRADES = ['All', 'A', 'B', 'C'];

export function Opportunities() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(2.5rem, 4vw, 4rem)' }}>
        <div class="shell stack" style=${{ gap: '18px' }}>
          <${Reveal}>
            <${Eyebrow}>Browse opportunities<//>
            <h1 class="h1" style=${{ marginTop: '10px' }}>Investment Opportunities.</h1>
            <p class="lede measure" style=${{ marginTop: '10px' }}>
              Property-backed financings, reviewed and risk-graded by our underwriting team.
              Capital is at risk — please review our Risk Statement before investing.
            </p>
          <//>
        </div>
      </section>

      <!-- ============ Filters + deal grid ============ -->
      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell stack" style=${{ gap: '32px' }}>
          <${Reveal} style=${{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            ${GRADES.map((g) => html`
              <button key=${g} class=${`btn btn--${g === 'All' ? 'primary' : 'outline'}`} style=${{ padding: '10px 20px', fontSize: 'var(--t-sm)' }}>
                ${g === 'All' ? 'All grades' : `Grade ${g}`}
              </button>`)}
          <//>
          <div class="grid-3">
            ${DEALS.map((d, i) => html`
              <${Reveal} key=${d.title} delay=${i * 60} style=${{ display: 'flex' }}>
                <${DealCard} ...${d} />
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
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Don't see the right opportunity yet?</h2>
            <p class="lede measure" style=${{ position: 'relative', color: 'rgba(255,255,255,0.82)' }}>
              New financings go live regularly. Register as an Investor to be notified the moment a new deal opens.
            </p>
            <div class="hero__actions" style=${{ position: 'relative', justifyContent: 'center' }}>
              <${Button} variant="white" href="#">Become an Investor<//>
            </div>
          <//>
        </div>
      </section>
    </main>`;
}
