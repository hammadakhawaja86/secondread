import { html, Icon, Reveal } from '../lib.js';
import { Button, Eyebrow, Trustpilot } from '../components.js';

const VALUES = [
  ['Property-backed investments', 'Generate diversified income, secured against UK property.', Icon.home()],
  ['Secure technology', 'Bank-grade encryption with full visibility on every deal.', Icon.lock()],
  ['Ethics and compliance', 'FCA-regulated, built on transparency and trust.', Icon.shieldCheck()],
  ['Full transparency', 'Direct access to your accounts and performance, no hidden fees.', Icon.eye()],
];

export function About() {
  return html`
    <main>
      <!-- ============ Hero ============ -->
      <section class="section" style=${{ paddingBlock: 'clamp(3rem, 5vw, 5.5rem)' }}>
        <div class="shell stack center" style=${{ gap: '22px', textAlign: 'center' }}>
          <${Reveal}>
            <${Eyebrow}>Our mission<//>
            <h1 class="h1" style=${{ marginTop: '10px' }}>Fixed income investments secured on UK property, for all.</h1>
          <//>
          <${Reveal} delay=${60} style=${{ maxWidth: '78ch' }}>
            <p class="lede">
              Investment products shouldn't be restricted to the elite. We create a transparent
              environment for you to learn and invest. We focus on property because it's what we
              know best. Technology now allows us to put the power back in the hands of people.
            </p>
          <//>
        </div>
      </section>

      <!-- ============ Values ============ -->
      <section class="section section--subtle">
        <div class="shell stack center" style=${{ gap: '52px' }}>
          <${Reveal}><h2 class="h2">What we offer.</h2><//>
          <div class="grid-auto" style=${{ width: '100%' }}>
            ${VALUES.map(([title, body, icon], i) => html`
              <${Reveal} key=${title} delay=${(i % 3) * 60} className="tile">
                <span class="tile__icon">${icon}</span>
                <h3 class="h4">${title}</h3>
                <p class="body">${body}</p>
              <//>`)}
          </div>
        </div>
      </section>

      <!-- ============ Company details ============ -->
      <section class="section">
        <div class="shell stack center" style=${{ gap: '18px', maxWidth: '78ch', textAlign: 'center' }}>
          <${Reveal}>
            <p class="body" style=${{ fontSize: 'var(--t-sm)', lineHeight: 1.75, color: 'var(--muted-foreground)' }}>
              Nester Platform Ltd is authorised and regulated by the Financial Conduct Authority,
              registration number 915346, and is a limited company registered in England and Wales
              (No. 12097430) with its registered office at Unit 4, Block B, 87 Stepney Way, London
              E1 2EN. Nester® is a registered trademark of Nester Holdings Ltd, a limited company
              registered in England and Wales (No. 11475486) with its registered office at Unit 4,
              Block B, 87 Stepney Way, London E1 2EN.
            </p>
          <//>
        </div>
      </section>

      <${Trustpilot} />

      <!-- ============ CTA ============ -->
      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell">
          <${Reveal} className="ctapanel stack center" style=${{ gap: '22px' }}>
            <span class="glow glow--info" style=${{ width: '360px', height: '400px', top: '-160px', right: '-70px' }}></span>
            <${Eyebrow} dark>Get started<//>
            <h2 class="h2" style=${{ color: 'var(--on-dark)', position: 'relative' }}>Join the Nester community.</h2>
            <div class="hero__actions" style=${{ position: 'relative', justifyContent: 'center' }}>
              <${Button} variant="white" href="#">Become an Investor<//>
              <${Button} variant="soft" href="#">Become a Buyer<//>
            </div>
          <//>
        </div>
      </section>
    </main>`;
}
