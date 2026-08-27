# Deploying the SecondRead prototype

The prototype is **static files with no build step** — no npm install, no bundler, no
environment variables, no server. Whatever you point at
`design_handoff_secondread/design/` will serve it.

That folder is the **site root**. `index.html` is the landing page.

---

## What must not go wrong

| Thing | Why it matters |
| --- | --- |
| **`.nojekyll` must be present in the site root** | GitHub Pages runs Jekyll by default, and Jekyll silently drops any directory whose name starts with an underscore. The entire design system lives in `_ds/`, so without this file every page loads with no tokens and no stylesheet — and Pages reports a successful deploy while doing it. |
| **Filenames contain spaces** | `Start Flow.dc.html`, `Sample Report.dc.html` and others. Every host serves these fine; the URLs are percent-encoded (`Start%20Flow.dc.html`). Do not "tidy" the names without updating every `href`. |
| **`.dc.html` is a double extension, not a custom type** | The files are ordinary HTML and are served as `text/html` by extension. Nothing needs configuring. |
| **Google Fonts is the one external request** | Inter, Montserrat and IBM Plex Mono load from `fonts.googleapis.com`. Everything else is local. If the deployment sits behind a strict CSP, that host has to be allowed or the type falls back. |

---

## GitHub Pages

Already wired up. `.github/workflows/pages.yml` publishes
`SecondRead/design_handoff_secondread/design/` on every push to `main`.

To turn it on the first time:

1. Push the branch to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push again, or run the workflow by hand from the Actions tab.

The site lands at `https://<user>.github.io/<repo>/`.

---

## Vercel

No framework to detect, so tell it there isn't one:

- **Framework preset:** Other
- **Root directory:** `SecondRead/design_handoff_secondread/design`
- **Build command:** leave empty
- **Output directory:** leave empty
- **Install command:** leave empty

Vercel serves the root directory as static files. Deploy the `main` branch;
`.nojekyll` is harmless there and costs nothing to keep.

## Netlify

- **Base directory:** `SecondRead/design_handoff_secondread/design`
- **Build command:** leave empty
- **Publish directory:** `SecondRead/design_handoff_secondread/design`

## Anything else

Drop the contents of `design/` behind any web server. Opening `index.html` from
`file://` will *mostly* work, but a few fetches fail under that origin — use a
server:

```
python3 -m http.server 4180 --directory SecondRead/design_handoff_secondread/design
```

---

## Environment variables

**None.** There is no backend, no API key, no database. Sign-in, uploads, cases and
payment are all simulated in the browser against `localStorage`
(`secondread:portal:v3`, `secondread:draft:v1`).

This is also the thing to be clearest about with anyone who sees it: **it looks like a
working product and is not one.** No data leaves the browser, and nothing in it is
suitable for real patient information.

---

## Before this is ever public

The prototype contains placeholder and unverified clinical content — see
**Content and compliance** in `design_handoff_secondread/README.md`. At minimum:

- every GMC number is the placeholder `7012345`
- consultant roles, hospitals and qualifications are unverified, against **real named people**
- `Privacy.dc.html` and `Terms.dc.html` carry bracketed placeholders
- turnaround times, prices and review counts are illustrative

If this is deployed anywhere reachable, put it behind access control, or strip the
real names first.
