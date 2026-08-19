import { html, Reveal } from '../lib.js';
import { Eyebrow, ArticleCard } from '../components.js';

const ARTICLES = [
  { title: 'How to Create an Account With Nester', image: 'public/images/article-1.png',
    excerpt: 'Welcome to Nester! Here you can learn how to create a new account and start investing in property-backed opportunities.' },
  { title: 'Nester Reaches Major Milestone with Over £100 Million in Total Financings', image: 'public/images/article-2.png',
    excerpt: 'Nester, a leading non-bank financial institution regulated by the Financial Conduct Authority (FCA), marks a major moment.' },
  { title: "Nester's New Head of Asset Management, Dawood Ahmedji, To Expand Sharia-Compliant Offerings", image: 'public/images/article-3.png',
    excerpt: 'At Nester, every decision is guided by our vision of creating a more inclusive, transparent, and empowering platform.' },
];

export function Blog() {
  return html`
    <main>
      <section class="section" style=${{ paddingBlock: 'clamp(2.5rem, 4vw, 4rem)' }}>
        <div class="shell stack" style=${{ gap: '18px' }}>
          <${Reveal}>
            <${Eyebrow}>Insights<//>
            <h1 class="h1" style=${{ marginTop: '10px' }}>Articles.</h1>
            <p class="lede measure" style=${{ marginTop: '10px' }}>
              News, product updates, and guides from the Nester team.
            </p>
          <//>
        </div>
      </section>

      <section class="section" style=${{ paddingTop: 0 }}>
        <div class="shell grid-3">
          ${ARTICLES.map((a, i) => html`
            <${Reveal} key=${a.title} delay=${i * 60} style=${{ display: 'flex' }}>
              <${ArticleCard} ...${a} />
            <//>`)}
        </div>
      </section>
    </main>`;
}
