# 31G Design System

Brand, foundations, components and product UI kits for **31G** (31 Green Limited) —
*"Your Technology Partner."*

> **Sources.** Brand and copy reverse-engineered from the public marketing site
> **https://31g.co.uk** (pages: `/`, `/who-we-are/`, `/what-we-do/`, `/careers/`,
> `/contact-us/`). Logo supplied as `uploads/logo2.png` → `assets/logo-full.png`.
> No codebase or Figma was provided. The site CSS was not accessible, so fonts are
> close-match substitutes (see **Caveats**).

---

## 1. Company context

31G is a UK-headquartered **digital & business transformation consultancy** —
"your expert digital & business transformation partner." They take real-world
business problems through discovery, agile software engineering, process
automation, digital consultancy and fully managed delivery. A UK-based project &
leadership team is supported by offshore development and back-office teams for
quality and cost-effectiveness.

- **Positioning:** person-centred, outcomes-led, **tech-stack agnostic** (.NET, Node, React, TypeScript, AWS, Azure, Kubernetes, Swift, Kotlin, WebRTC, …).
- **Values:** High Quality · Innovation · Integrity · Compassion.
- **Offices:** Europe HQ Sheffield (UK) · Middle East HQ Dubai (UAE) · Asia HQ Islamabad (PK).
- **Single public product surface:** the marketing website (recreated in `ui_kits/website/`).

---

## 2. Content fundamentals

How 31G writes:

- **Voice:** confident, plain, warm-but-precise. Sells outcomes, not jargon. Avoids hype words; explains value in business terms ("reduce avoidable cost", "translate your business needs into cost-effective technology").
- **Person:** **"we"** (the firm) speaking to **"you"** (the client). Inclusive and relationship-led ("person-centred", "lasting and deeply thoughtful relationships").
- **Casing:** Sentence case for body and most headings. Value names are **Title Case** ("High Quality", "Compassion"). Eyebrows/section kickers are UPPERCASE with wide tracking.
- **Spelling:** **British English** — *centre, optimise, organisation, programme*.
- **Emoji:** none. Tone is professional. Do not introduce emoji.
- **Specimen lines:**
  - *"Your expert digital & business transformation partner"* (hero)
  - *"We deeply understand all of our customers' businesses, to develop person-centred solutions."*
  - *"Need help making a decision?"* (CTA)
  - *"Book an appointment"* (primary action, used verbatim everywhere)
- **CTAs:** verb-first, short — "Book an appointment", "Contact us", "What we do", "Get in touch".

---

## 3. Visual foundations

- **Palette:** deep **navy** (`--navy-700 #16304D`) + emerald **green** (`--green-500 #14A85F`), with a bright spring-green accent (`--green-300 #2FCB6E`). Navy carries headings, text and dark surfaces; green carries action and accent. Cool grey neutrals; near-white `--paper-50` page.
- **Signature gradient:** `--gradient-brand` (135° deep-teal → green → bright-green) — the logo's play-mark fill. Used for icon medallions, hero panels, avatars. A soft tint version (`--gradient-brand-soft`) backs hero/section bands.
- **Type:** display **Space Grotesk** (geometric, techy — stands in for the bespoke wordmark face); body/UI **IBM Plex Sans**; **IBM Plex Mono** for code/tokens. Display headings are bold (700) with tight tracking; body is 400/1.65.
- **Backgrounds:** flat colour fields and the soft brand-tint gradient. No photographic full-bleeds in the system (source imagery unavailable); no noise/grain. Sections alternate white ↔ `--paper-50` ↔ navy for rhythm.
- **Corner radii:** soft and generous, echoing the rounded logo triangle. Pills (`--radius-pill`) for buttons & chips; `--radius-lg/2xl` for cards and hero panels.
- **Cards:** white, 1px hairline border (`--line-100`), soft **cool-tinted** shadow (`--shadow-sm`, rgba navy — never harsh black). Interactive cards lift `-4px` to `--shadow-lg` on hover.
- **Shadows:** one elevation family, all rgba(14,34,54,…); plus a green glow (`--shadow-green`) reserved for primary buttons and gradient medallions.
- **Motion:** quick and restrained. `--duration-fast 140ms` for hovers/presses, `--duration-base 220ms` for card lifts, `--ease-out` for entrances. No bounces, no infinite loops.
- **Hover states:** primary button darkens green + keeps glow; links shift to green with an underline; cards lift. **Press:** buttons nudge `translateY(1px)`.
- **Focus:** 3px green ring at 32% (`--ring`).
- **Borders:** hairline `--line-200`/`--line-100`. Inputs use 1.5px, green on focus.
- **Transparency / blur:** sticky header is 88% white with a 12px backdrop blur. Otherwise opaque.
- **Layout:** centred `--container-max 1200px`, 32px gutters, ~80–96px section padding. Grid-based feature rows (3–4 up).

---

## 4. Iconography

- **Set:** 31G's site uses small bespoke single-colour SVG glyphs (e.g. `high_quality.svg`, `innovation.svg`) that are **not publicly downloadable**. As a substitute the system ships **[Lucide](https://lucide.dev)** — a clean ~2px-stroke open line-icon set that matches the brand's light, geometric, professional feel. **This substitution is flagged** — replace with the real glyphs if/when supplied.
- **Delivery:** Lucide UMD from CDN (`https://unpkg.com/lucide@0.460.0`), rendered via the `Icon` component (`<Icon name="ShieldCheck" />`, PascalCase names).
- **Usage:** icons sit in gradient medallions on service/value cards, and inline (16–18px) in contact details and the footer. Stroke style, never filled; inherit `currentColor` or a brand green.
- **Emoji:** never used as iconography.
- **Logo:** `assets/logo-full.png` — full horizontal lockup ("Your Technology Partner" + 31G play-mark). Keep clear-space ≥ the mark height; holds on light, navy and the brand gradient (see Brand cards).

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import`s the token + font closure only.
- `readme.md` — this guide. · `SKILL.md` — Agent-Skill wrapper.

**Tokens** (`tokens/`) — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.

**Components** (`components/`)
- `core/` — **Button**, **Badge**, **Card**, **ServiceCard**, **Avatar**, **Icon**.
- `forms/` — **Input**, **Select**, **Checkbox**.
- `navigation/` — **Tabs**.
- Each has `.jsx` + `.d.ts` + `.prompt.md`; one `*.card.html` per directory (Components group).

**Foundation cards** (`guidelines/`) — Colors (navy, green, neutral, semantic, gradient), Type (display, body, mono, weights, eyebrow), Spacing (scale, radius, shadows), Brand (logo, logo-on-dark, voice).

**UI kits** (`ui_kits/`)
- `website/` — interactive recreation of 31g.co.uk. Entry `index.html`; see its README.

**Assets** (`assets/`) — `logo-full.png`.

> Generated by the compiler (do not edit): `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`. Components are reached at runtime via `window.Ds31GDesignSystem_5eefac`.

---

## 6. Caveats

- **Fonts are substitutes.** Space Grotesk / IBM Plex Sans are close matches to the site's geometric-tech wordmark and body face, loaded from Google Fonts. Supply the real font files to finalise.
- **Icons are substitutes** (Lucide) — see §4.
- **Imagery** (hero banner, value glyphs, tech-stack logos, client logos) was not downloadable; the UI kit uses brand-gradient panels and labelled chips in their place. Only the logo lockup is real.
- **Colours** were sampled from the logo, not the site CSS — fine-tune against brand guidelines if available.
