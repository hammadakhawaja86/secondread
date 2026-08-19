import { html, useState, useEffect } from './lib.js';
import { Header, Footer, RiskBanner } from './components.js';
import { Home } from './pages/Home.js';
import { HowItWorks } from './pages/HowItWorks.js';
import { IfIsa } from './pages/IfIsa.js';
import { Opportunities } from './pages/Opportunities.js';
import { RequestFinance } from './pages/RequestFinance.js';
import { BrokerPortal } from './pages/BrokerPortal.js';
import { BridgeFlex } from './pages/BridgeFlex.js';
import { About } from './pages/About.js';
import { Blog } from './pages/Blog.js';
import { InvestorOpportunities } from './pages/InvestorOpportunities.js';

const ROUTES = {
  '#/': Home,
  '#/how-it-works': HowItWorks,
  '#/ifisa': IfIsa,
  '#/opportunities': Opportunities,
  '#/request-finance': RequestFinance,
  '#/broker': BrokerPortal,
  '#/bridgeflex': BridgeFlex,
  '#/about': About,
  '#/blog': Blog,
  '#/investor-opportunities': InvestorOpportunities,
};

const TITLES = {
  '#/how-it-works': 'Invest in UK Property — Nester',
  '#/ifisa': 'IF-ISA — Tax-Free Property Investing — Nester',
  '#/opportunities': 'Investment Opportunities — Nester',
  '#/request-finance': 'Request Finance — Nester',
  '#/broker': 'Broker Portal — Nester',
  '#/bridgeflex': 'BridgeFlex™ — Nester',
  '#/about': 'About Us — Nester',
  '#/blog': 'Articles — Nester',
  '#/investor-opportunities': 'Opportunities — Nester',
};

function useHashRoute() {
  const read = () => {
    const h = window.location.hash;
    // in-page anchors (#deals, #risk) must not swap the page
    if (!h || !h.startsWith('#/')) return '#/';
    return ROUTES[h] ? h : '#/';
  };
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onHash = () => {
      const next = read();
      setRoute((prev) => {
        if (prev !== next) window.scrollTo({ top: 0, behavior: 'auto' });
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

function App() {
  const route = useHashRoute();
  const Page = ROUTES[route] || Home;

  useEffect(() => {
    document.title = TITLES[route] || 'Nester — Sharia-compliant UK property investment';
  }, [route]);

  return html`
    <${RiskBanner} />
    <${Header} />
    <${Page} key=${route} />
    <${Footer} />
  `;
}

ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);
