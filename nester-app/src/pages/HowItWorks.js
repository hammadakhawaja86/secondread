import { html, Icon, Reveal } from '../lib.js';
import { Button, Eyebrow, SectionHead, Trustpilot } from '../components.js';

const TYPES = [
  { title: 'Buy to Let', image: 'public/images/btl-property.png',
    body: 'A financing arrangement used to purchase or refinance residential or commercial property that is intended to be rented out to tenants (with no relationship with the Buyer), rather than occupied by the owner.' },
  { title: 'Development', image: 'public/images/dev-property.png',
    body: 'A financing arrangement used for structural projects, change of use, complex refurbishments, ground-up development, part-build completion, and finish & exit projects. Residential properties are strictly not for the subsequent residence of the Buyer or any connected party.' },
  { title: 'Bridge Finance', image: 'public/images/bridge-property.png',
    body: 'A financing arrangement used to bridge a temporary gap for stabilising assets, supporting sale or refinance transitions, or completing minor non-structural refurbishment works.' },
];

const OFFERS = [
  ['Property-backed investments', 'Generate diversified income, secured against UK property.', Icon.home()],
  ['Secure technology', 'Bank-grade encryption with full visibility on every deal.', Icon.lock()],
  ['Ethics and compliance', 'FCA-regulated, built on transparency and trust.', Icon.shieldCheck()],
  ['Full transparency', 'Direct access to your accounts and performance, no hidden fees.', Icon.eye()],
  ['Defined risk strategy', 'Clearly defined risk and reward, matched to your goals.', Icon.bars()],
];

const STEPS = [
  ['1', 'Complete Registration', 'Create your account and complete onboarding in minutes.'],
  ['2', 'Top Up Your E-Wallet', 'Deposit funds securely into your account, ready to invest.'],
  ['3', 'Start Investing', 'Browse available opportunities and allocate funds in just a few clicks.'],
];

const JOURNEY = [
  ['1', 'Nester Receives Finance Application', 'Buyers approach Nester seeking Buy to Let, Development or Bridge Finance.'],
  ['2', 'Application Screening', 'All transactions are reviewed by a team of property professionals with extensive underwriting experience.'],
  ['3', 'Credit Committee', 'Once a deal has progressed through the screening process and is supported by a team member, it is presented to credit committee for approval. A further independent check and balance.'],
  ['4', 'Deal Live', 'Once approved the deal goes live on the Nester platform and becomes available for approved Investors to invest into. Each deal summary includes a summary of the Opportunity for Investors to make an informed decision.'],
  ['5', 'Live Opportunity', 'Once an Opportunity has completed, Investors are due to receive profit payments in line with the Murabaha Contracts.'],
  ['6', 'Regular Review', 'Nester continues to regularly review and monitor transactions until Final Maturity of the Opportunity.'],
];

const TIERS = [
  { title: 'Lowest Risk', cls: 'a', grades: ['A1', 'A2', 'A3'],
    body: "'A' rated financings score highly in the majority of due diligence categories." },
  { title: 'Moderate Risk', cls: 'b', grades: ['B1', 'B2', 'B3'],
    body: "'B' rated financings score highly in some of the due diligence categories." },
  { title: 'Highest Risk', cls: 'c', grades: ['C1', 'C2', 'C3'],
    body: "'C' rated financings meets Nester's minimum financing criteria." },
];

export function HowItWorks() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(3rem, 5vw, 5.5rem)' }}>
        <div class="shell hero">
          <${Reveal} className="hero__copy">
            <${Eyebrow}>Why invest in Nester?<//>
            <h1 class="h-display">You can earn up to 9% p.a. secured against UK property.</h1>
            <p class="lede measure">
              Nester offers investments ranging from Buy to Let, Development Finance, and
              Bridge Finance. Each varying in risk and return.
            </p>
            <div class="hero__actions">
              <${Button} variant="primary" href="#types">I'm ready to invest<//>
              <span class="body" style=${{ fontSize: 'var(--t-sm)' }}>
                Existing Investor? ${' '}
                <a href="#" style=${{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>Log in</a>
              </span>
            </div>
          <//>
          <${Reveal} className="hero__visual" delay=${80}>
            <img src="public/images/investor-hero.png" alt="Aerial view of UK residential properties" />
            <span class="glow glow--brand" style=${{ width: '270px', height: '310px', top: '-80px', right: '-50px' }}></span>
          <//>
        </div>
      </section>

      <!-- ============ Investment types ============ -->
      <section class="section" id="types">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead}
            eyebrow="Investment types"
            title="What can you invest in?"
            sub="Our financing criteria allows Nester to invest in three core types of property financing arrangement offered to Buyers." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${TYPES.map((t, i) => html`
              <${Reveal} key=${t.title} delay=${i * 60} style=${{ display: 'flex' }}>
                <article class="card card--interactive">
                  <div class="card__media" style=${{ aspectRatio: '5 / 3' }}>
                    <img src=${t.image} alt=${t.title} loading="lazy" />
                  </div>
                  <div class="card__body" style=${{ padding: '30px' }}>
                    <h3 class="h3">${t.title}</h3>
                    <p class="body">${t.body}</p>
                  </div>
                </article>
              <//>`)}
          </div>
          <${Button} variant="outline" href="#">See opportunities<//>
        </div>
      </section>

      <!-- ============ Our offer ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead}
            eyebrow="Our offer"
            title="What do we offer?"
            sub="Simple investments secured on property. Helping you build your nest egg." />
          <div class="grid-auto" style=${{ width: '100%' }}>
            ${OFFERS.map(([title, body, icon], i) => html`
              <${Reveal} key=${title} delay=${(i % 3) * 60} className="tile">
                <span class="tile__icon">${icon}</span>
                <h3 class="h4">${title}</h3>
                <p class="body">${body}</p>
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ How to start ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${SectionHead} eyebrow="Get started" title="How to start in 3 steps." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${STEPS.map(([n, title, body], i) => html`
              <${Reveal} key=${n} delay=${i * 60} className="tile" style=${{ boxShadow: 'var(--shadow-md)' }}>
                <span class="stepnum">${n}</span>
                <h3 class="h4">${title}</h3>
                <p class="body">${body}</p>
                <a class="btn btn--ghost" href="#" style=${{ marginTop: 'auto', fontSize: 'var(--t-sm)' }}>
                  ${Icon.playCircle()}Watch video guide
                </a>
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ Deal journey ============ -->
      <section class="section section--dark">
        <div class="shell stack center" style=${{ gap: '56px' }}>
          <${SectionHead} dark eyebrow="Process" title="How does it work?" sub="This is Nester's Deal Journey." />
          <div class="grid-2" style=${{ width: '100%', gap: '20px' }}>
            ${JOURNEY.map(([n, title, body], i) => html`
              <${Reveal} key=${n} delay=${(i % 2) * 60} className="jtile">
                <span class="stepnum stepnum--sm">${n}</span>
                <div class="stack" style=${{ gap: '8px' }}>
                  <h4 class="h4">${title}</h4>
                  <p>${body}</p>
                </div>
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ How we review ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '30px' }}>
          <${Reveal}><h2 class="h2" style=${{ textAlign: 'center' }}>How we review our deals</h2><//>
          <${Reveal} className="stack center" delay=${60} style=${{ gap: '20px', maxWidth: '78ch' }}>
            <p class="body" style=${{ textAlign: 'center', fontSize: 'var(--t-base)' }}>
              Each financing request undergoes a disciplined underwriting process supported by
              verifiable information, robust analysis, and a clear rationale for all recommendations.
              Nester applies a structured and proportionate underwriting approach to ensure all
              financing requests are assessed consistently and in line with their scale, complexity,
              and risk profile.
            </p>
            <p class="body" style=${{ textAlign: 'center', fontSize: 'var(--t-base)' }}>
              All Investors in Nester arranged financings benefit from a security package that is
              managed in trust by Nester Security Trustee Ltd. This security will always include a
              first fixed legal charge over the property being financed, as well as other security
              and/or guarantees depending on the credit analysis.
            </p>
          <//>
        </div>
      </section>

      <!-- ============ Risk framework ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '46px' }}>
          <${SectionHead}
            eyebrow="Risk framework"
            title="How we measure our risk score"
            sub="We've created a risk scoring algorithm to further assist our Investors. Results from the due diligence process are put into a scorecard that calculates a rating." />
          <div class="grid-3" style=${{ width: '100%' }}>
            ${TIERS.map((t, i) => html`
              <${Reveal} key=${t.title} delay=${i * 60} className="tile" style=${{ boxShadow: 'var(--shadow-md)' }}>
                <div style=${{ display: 'flex', gap: '10px' }}>
                  ${t.grades.map((g) => html`<span key=${g} class=${`badge badge--${t.cls}`}>${g}</span>`)}
                </div>
                <h3 class="h4">${t.title}</h3>
                <p class="body">${t.body}</p>
              <//>`)}
          </div>
          <${Reveal} style=${{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '18px 24px', borderRadius: 'var(--r-md)',
            background: 'var(--surface-subtle)', color: 'var(--muted-foreground)',
          }}>
            ${Icon.info()}
            <span class="body" style=${{ fontSize: 'var(--t-sm)' }}>
              Risk scores are provided as a guide only. They are not an absolute measure and your
              capital is at risk. It is recommended that you seek independent financial advice.
            </span>
          <//>
        </div>
      </section>

      <${Trustpilot} />

      <!-- ============ Ready to get started ============ -->
      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell">
          <${Reveal} className="ctapanel stack center" style=${{ gap: '22px' }}>
            <span class="glow glow--info" style=${{ width: '360px', height: '400px', top: '-160px', right: '-70px' }}></span>
            <${Eyebrow} dark>Get started<//>
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Ready to get started?</h2>
            <p class="lede measure" style=${{ position: 'relative', color: 'rgba(255,255,255,0.82)' }}>
              Join Nester today and start investing in property-backed opportunities.
            </p>
            <div class="hero__actions" style=${{ position: 'relative', justifyContent: 'center' }}>
              <${Button} variant="white" href="#">New users<//>
              <${Button} variant="soft" href="#">Existing users<//>
            </div>
          <//>
        </div>
      </section>
    </main>`;
}
