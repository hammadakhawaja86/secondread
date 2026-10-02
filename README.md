# SecondRead — patient second-opinion radiology prototype

A working static prototype of a UK service that re-reads a scan a patient already
has, using a named subspecialist consultant, and returns a signed report.

**Live site:** the repository root *is* the site. `index.html` is the landing page.

## Running it

No build step, no dependencies, no backend. Any web server will do:

```
python3 -m http.server 4180
```

Then open <http://localhost:4180>.

Opening `index.html` from `file://` mostly works, but a few fetches fail under
that origin — use a server.

## Deploying

- **Vercel** — import the repository. Framework preset *Other*; leave build,
  output and install commands empty. Nothing else to configure.
- **GitHub Pages** — *Settings → Pages → Source: Deploy from a branch*, branch
  `main`, folder `/ (root)`. **`.nojekyll` must stay in place**: Pages runs
  Jekyll by default, and Jekyll silently drops directories beginning with an
  underscore, which would take the whole `_ds/` design system with it and serve
  a completely unstyled site while reporting success.
- **Netlify** — publish directory `.`, no build command.

## What's here

| | |
| --- | --- |
| `index.html` | Landing page |
| `How It Works` · `Specialists` · `Specialist Profile` · `Pricing` · `Sample Report` · `FAQs` · `Privacy` · `Terms` · `Accessibility` | Marketing site |
| `Meet the Team.dc.html` | The people behind the service |
| `Start Flow.dc.html` | The three-step order flow — upload, tell us about your case, get your report |
| `Sign In` · `Create Account` · `Dashboard` · `Case` · `Report` · `Account` | The patient portal |
| `_ds/` | Design-system tokens and stylesheet |
| `consultants.js` · `portal.js` | The single sources of truth for consultant data and portal state |
| `support.js` | The component runtime the pages are authored against |
| `responsive.css` | The only hand-written CSS; everything else is inline |
| `portraits/` · `services/` · `team/` · `uploads/` | Photography |
| `docs/` | The handoff spec, the patient-portal spec, and deployment notes |

## Read this before showing anyone

It looks like a working product and it is not one. Sign-in, uploads, cases and
payment are **simulated in the browser** against `localStorage` — no data leaves
the page, and nothing here is fit for real patient information.

The clinical content is also unverified: every GMC number is the placeholder
`7012345`, and consultant roles, hospitals and qualifications are unconfirmed
against **real named people**. Turnaround times, prices and review counts are
illustrative. `Privacy` and `Terms` carry bracketed placeholders.

If this goes anywhere publicly reachable, put it behind access control or strip
the real names first.
