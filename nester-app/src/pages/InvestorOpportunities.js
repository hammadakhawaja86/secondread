import { html, Icon, Reveal, useState, useMemo } from '../lib.js';
import { Button } from '../components.js';

const DEALS = [
  { grade: 'A3', title: 'Kingswood - Tranche D', location: 'Ascot, GBR', image: 'public/images/deal-1.png',
    term: '10 Months', rollover: 'Sep 07, 2026', financed: '£340,000', months: 10 },
  { grade: 'B1', title: 'Copland Avenue Tranche C', location: 'Wembley, GBR', image: 'public/images/deal-2.png',
    term: '7 Months', rollover: 'Aug 24, 2026', financed: '£300,000', months: 7 },
  { grade: 'B1', title: 'Land South of Old Road - Tranche B', location: 'Bedford, GBR', image: 'public/images/deal-3.png',
    term: '14 Months', rollover: 'Sep 01, 2026', financed: '£471,000', months: 14 },
  { grade: 'A3', title: 'Ye Olde Clock Tower - Tranche D', location: 'London, GBR', image: 'public/images/property-facade.png',
    term: '6 Months', rollover: 'Aug 24, 2026', financed: '£380,000', months: 6 },
  { grade: 'B1', title: 'Blake Lane - Extension', location: 'Birmingham, GBR', image: 'public/images/bridge-property.png',
    term: '4 Months', rollover: 'Sep 01, 2026', financed: '£1,401,000', months: 4 },
  { grade: 'A3', title: 'Winn Road - Tranche A', location: 'London, GBR', image: 'public/images/dev-property.png',
    term: '16 Months', rollover: 'Aug 25, 2026', financed: '£406,000', months: 16 },
  { grade: 'B2', title: 'Melgund Road', location: 'London, GBR', image: 'public/images/btl-property.png',
    term: '16 Months', rollover: 'Aug 24, 2026', financed: '£922,000', months: 16, redeemed: true },
  { grade: 'B1', title: 'Torridon - Tranche A', location: 'Catford, London, GBR', image: 'public/images/deal-1.png',
    term: '9 Months', rollover: 'Sep 10, 2026', financed: '£175,000', months: 9 },
  { grade: 'B2', title: 'Rotton Park Road', location: 'Birmingham, GBR', image: 'public/images/deal-2.png',
    term: '2 Months', rollover: 'Sep 01, 2026', financed: '£451,000', months: 2 },
  { grade: 'A3', title: 'Pacific House - Tranche B', location: 'Warrington, GBR', image: 'public/images/deal-3.png',
    term: '4 Months', rollover: 'Aug 27, 2026', financed: '£1,349,000', months: 4 },
  { grade: 'B2', title: 'The Residence - The Bray - Tranche B', location: 'Maidenhead, GBR', image: 'public/images/property-facade.png',
    term: '1 Month', rollover: 'Sep 07, 2026', financed: '£210,000', months: 1, redeemed: true },
  { grade: 'A2', title: 'Arena 5 - Tranche A', location: 'Oldham, GBR', image: 'public/images/bridge-property.png',
    term: '10 Months', rollover: 'Sep 02, 2026', financed: '£346,000', months: 10 },
];

const SORTS = [
  { value: 'newest', label: 'Date added: Newest' },
  { value: 'term-asc', label: 'Term Remaining: Least' },
  { value: 'term-desc', label: 'Term Remaining: Most' },
];

function PortalDealCard({ deal }) {
  return html`
    <article class="portal-card">
      <div class="portal-card__media">
        <img src=${deal.image} alt=${deal.title} loading="lazy" />
        <span class="portal-card__tag">${Icon.checkSolid()}Fully Subscribed</span>
      </div>
      <div class="portal-card__caption">
        <h3>${deal.title}</h3>
        <p>${Icon.pin()}${deal.location}</p>
      </div>
      <div class="portal-card__body">
        <div class="portal-card__price-row">
          <div>
            <div class="portal-card__price">£0</div>
            <div class="portal-card__offered">Offered by Investors</div>
          </div>
          <span class="portal-card__tier">${Icon.shield()}${deal.grade}</span>
        </div>
        <div class="dealstats">
          <div><div class="dealstat__v">${deal.term}</div><div class="dealstat__l">Term Remaining</div></div>
          <div><div class="dealstat__v">${deal.rollover}</div><div class="dealstat__l">Rollover Date</div></div>
          <div><div class="dealstat__v">${deal.financed}</div><div class="dealstat__l">Financed</div></div>
        </div>
        <${Button} variant="primary" icon=${false} href="#" className="portal-card__cta">Sign Up Or Log In<//>
      </div>
    </article>`;
}

export function InvestorOpportunities() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [includeRedeemed, setIncludeRedeemed] = useState(false);

  const deals = useMemo(() => {
    let list = DEALS.filter((d) => includeRedeemed || !d.redeemed);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((d) => d.title.toLowerCase().includes(q) || d.location.toLowerCase().includes(q));
    list = [...list];
    if (sort === 'term-asc') list.sort((a, b) => a.months - b.months);
    if (sort === 'term-desc') list.sort((a, b) => b.months - a.months);
    return list;
  }, [query, sort, includeRedeemed]);

  return html`
    <main>
      <section class="section" style=${{ paddingBlock: 'clamp(2.5rem, 4vw, 4rem)' }}>
        <div class="shell stack" style=${{ gap: '28px' }}>
          <${Reveal}>
            <h1 class="h1">Opportunities</h1>
            <p class="lede" style=${{ marginTop: '10px' }}>View the Opportunities on our platform here.</p>
          <//>

          <${Reveal} delay=${60} className="portal-toolbar">
            <label class="portal-search">
              ${Icon.search()}
              <input
                type="text" placeholder="Search..." value=${query} aria-label="Search opportunities"
                onInput=${(e) => setQuery(e.target.value)} />
            </label>
            <select class="portal-select" aria-label="Sort by" value=${sort} onChange=${(e) => setSort(e.target.value)}>
              ${SORTS.map((s) => html`<option key=${s.value} value=${s.value}>${s.label}</option>`)}
            </select>
            <button class="portal-filterbtn" aria-label="Filters" type="button">${Icon.sliders()}</button>
          <//>

          <${Reveal} delay=${100} className="portal-toggle-row">
            <button
              class="portal-switch" type="button" role="switch" aria-checked=${includeRedeemed}
              data-on=${includeRedeemed ? 'true' : 'false'}
              onClick=${() => setIncludeRedeemed((v) => !v)}></button>
            <span class="body" style=${{ fontSize: 'var(--t-sm)' }}>Include Redeemed?</span>
          <//>

          <div class="grid-3">
            ${deals.map((d, i) => html`
              <${Reveal} key=${d.title} delay=${(i % 3) * 60} style=${{ display: 'flex' }}>
                <${PortalDealCard} deal=${d} />
              <//>`)}
          </div>

          ${deals.length === 0 ? html`
            <p class="body" style=${{ textAlign: 'center', padding: '40px 0', color: 'var(--muted-foreground)' }}>
              No opportunities match your search.
            </p>` : null}
        </div>
      </section>
    </main>`;
}
