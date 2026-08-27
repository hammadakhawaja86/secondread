# Handoff: SecondRead — patient second-opinion radiology website

## Overview

SecondRead is a UK service that re-reads a scan (MRI, CT, ultrasound, X-ray, PET-CT) a patient
already has, using a named subspecialist consultant, and returns a signed report in 12–48 hours
from £249. No GP referral, no appointment.

> ### Status — read this first
>
> This document was written for the **first handoff**. The prototype has moved on since, and the
> sections below have **not** been rewritten to match. Where the two disagree, **the code is
> correct**. Known drift, as of the `v1.0.0` release:
>
> | Since the handoff was written | Where to look |
> | --- | --- |
> | The site is now **17 pages**, not 8: a secure patient portal (sign-in, dashboard, case, report, account) was added. | `design/*.dc.html` |
> | The order flow is **three steps** — Upload your scans · Tell us about your case · Get your expert report. The old "Choose a specialist" step is gone: patients no longer pick their own radiologist, we match one and name them before payment. | `patient-portal-spec.html` |
> | Sign-in is **passwordless** (emailed six-digit code). There is no password field, and no forgot/reset routes. | `design/Sign In.dc.html`, `design/portal.js` |
> | The wordmark is now the **SecondOpinion Radiology** lockup, at a different aspect ratio. Dimensions quoted below are stale. | `design/logo-secondread*.svg` |
> | The phone number has moved **out of the header** and into the footer only. | `design/responsive.css` |
> | Portraits are **seven real consultant headshots** as `.jpg`, named after the consultant. The base64 `data.js` delivery described below is gone. | `design/portraits/` |
> | The Services section is a **card carousel with photography**, rebuilt to a Figma reference. | `design/index.html`, `design/services/` |
>
> `patient-portal-spec.html` is the current specification for the portal and the flow. For everything
> else, `git log` is the record.

This handoff covers an **8-page marketing site plus a 3-step ordering flow**, designed as a working
prototype: filtering, accordions, a hero carousel, a specialist picker and a multi-step checkout are
all functional in the HTML.

The commercial job of the site is to move a worried patient from "I don't understand my report" to a
paid order, while making the two things that build trust unmissable: **a named consultant with a GMC
number before you pay**, and **a real deadline you can hold us to**.

---

## About the design files

The files in `design/` are **design references created in HTML** — prototypes that show the intended
look, copy and behaviour. **They are not production code to lift.**

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue,
Next, Astro, SwiftUI, native — whatever is already in place), using its established component
library, routing, styling approach and data layer. If there is no codebase yet, pick the most
appropriate framework for a content-led marketing site with one interactive flow (a React/Next or
Astro app is a natural fit) and implement the designs there.

Two specifics about how the prototypes are built, so nothing surprises you:

- **The HTML is authored with a small in-house component runtime** (`support.js`, `<x-dc>`,
  `{{ holes }}`, `<sc-for>`, `<sc-if>`). Read these as "template + state" — a `<sc-for list="{{ x }}">`
  is a `.map()`, `<sc-if value="{{ y }}">` is a conditional, and the class at the bottom of each file
  is ordinary React-class-style state and handlers. **Do not port the runtime.**
- **All styling is inline `style=` attributes**, plus `style-hover` / `style-focus` /
  `style-active` pseudo-state attributes (a runtime convenience — they compile to `:hover`,
  `:focus`, `:active`). Convert these to whatever the codebase uses (CSS modules, Tailwind,
  styled-components). Only `responsive.css` is real CSS.

---

## Fidelity

**High-fidelity.** Final colours, typography, spacing, copy, hover states and interaction behaviour.
Recreate the UI to match, using the codebase's existing primitives where they exist.

Two caveats where the design is intentionally provisional:

- **Content is plausible but unverified.** Consultant names, GMC numbers, hospitals, turnaround
  medians, review counts and the sample report body were written to demonstrate the design.
  **Every clinical, regulatory and statistical claim must be checked by the client before launch** —
  see [Content and compliance](#content-and-compliance).
- **Photography is placeholder.** Six specialist portraits and one hero image are AI-generated
  stand-ins. Real headshots are needed.

---

## Design tokens

The site is built on the **31G Design System** (`design/_ds/`), but re-themed to a teal/navy medical
palette. The values below are the source of truth for this site — take these, not the 31G defaults.

### Colour

| Token | Hex | Use |
| --- | --- | --- |
| `teal-700` | `#095458` | Link default, eyebrow text, hover fill for buttons |
| `teal-600` | `#0D6E70` | **Primary brand.** Buttons, active states, prices, icons |
| `teal-500` | `#12938F` | Gradient mid-stop only |
| `teal-300` | `#6FE3C5` | Gradient end-stop, accent figures on dark |
| `teal-100` | `#C3E0DE` | Borders on tinted surfaces |
| `teal-50` | `#E4F2F2` | Tinted panel fill, avatar background, callouts |
| `teal-25` | `#D8EEEA` | Hero background field |
| `navy-900` | `#06131C` | Footer |
| `navy-800` | `#0A1F2C` | **All headings**, dark bento tile |
| `navy-700` | `#06313A` | Heading colour when on a teal-50 surface |
| `ink-700` | `#173B4F` | Body copy on tinted surfaces, nav links |
| `ink-600` | `#22525A` → `#1B4A52` | Body copy on teal-50 |
| `ink-500` | `#4A5C68` | Body copy on white |
| `ink-400` | `#5A6B77` | Muted labels (AA-corrected from `#6F818C`) |
| `ink-300` | `#6C7C87` | Placeholder / disabled (AA-corrected from `#A3B0B8`) |
| `line-200` | `#D4DDE0` | Input and secondary-button borders |
| `line-100` | `#E2E9EC` | Card hairlines, dividers |
| `line-050` | `#EEF2F4` | Progress-track fill, ghosted numerals |
| `paper-50` | `#F4F7F8` | Alternating section background |
| `paper-25` | `#FAFCFC` | Row hover, disclaimer strip |
| `white` | `#FFFFFF` | Card surfaces |
| `warn-bg` | `#FFF6E9` | Emergency notice background |
| `warn-line` | `#F0DCC0` | Emergency notice border |
| `warn-icon` | `#E8A33D` | Emergency notice icon |
| `warn-text` | `#6B4A18` | Emergency notice text |

**Gradients**
- `gradient-brand`: `linear-gradient(135deg, #0D6E70 0%, #12938F 55%, #6FE3C5 100%)` — icon medallions, "Most chosen" badge, avatar hover.
- `gradient-hero`: `linear-gradient(135deg, #E4F2F2 0%, #EEF7F7 55%, #F7FBFB 100%)` — sub-page hero bands.
- `gradient-scrim`: `linear-gradient(100deg, rgba(216,238,234,0.97) 0%, rgba(216,238,234,0.92) 34%, rgba(216,238,234,0.55) 52%, rgba(216,238,234,0.08) 68%, rgba(216,238,234,0) 100%)` — the left-to-right fade over the hero photo that keeps the headline legible.

### Typography

Google Fonts: `Inter` (400,500,600,700) + `Montserrat` (500,600,700,800). `IBM Plex Mono` comes from
the 31G token sheet.

- **Headings** — Montserrat, weight 700, `letter-spacing: -0.015em` (display sizes tighten to `-0.02em`/`-0.025em` inline).
- **Body / UI** — Inter, 400–600.
- **Metadata labels** — IBM Plex Mono, 10–11px, `letter-spacing: 0.10–0.14em`, uppercase.

| Role | Size / line-height / weight |
| --- | --- |
| Hero H1 (home) | 48px / 1.04 / 700 |
| Sub-page H1 | 42px / 1.08 / 700 |
| Carousel slide-2 H2 | 44px / 1.06 / 700 |
| Section H2 | 30–31px / 1.2 / 700 |
| Bento step numeral | 50px / 0.9 / 700 |
| Card H3 | 19–20px / 1.35 / 700 |
| Panel H3 | 16–17px / 1.4 / 700 |
| Lead paragraph | 18px / 1.65 / 400 |
| Body | 15–16px / 1.6–1.75 / 400 |
| Small / meta | 12.5–14px / 1.55 / 400–600 |
| Eyebrow | 13px / 600 / `0.12em` / uppercase / `#095458` |
| Price display | 42–46px / 1.0 / 700 / `-0.02em` |

> Montserrat sets ~8% wider than the Space Grotesk it replaced; display sizes were reduced to
> compensate. If you substitute a different display face, re-check line breaks in the hero and
> section headings.

### Spacing, radius, elevation, motion

- **Container:** `max-width: 1200px`, `padding: 0 32px`. Narrow pages use 880px (FAQs) or 900px (sample report).
- **Section padding:** 72–88px vertical desktop; 56px at ≤860px; 44px at ≤560px.
- **Spacing scale in use:** 4, 6, 8, 10, 12, 14, 16, 20, 22, 26, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80px.
- **Radius:** `999px` pills (buttons, chips, badges) · `11–14px` inputs, small tiles, flow buttons · `16–18px` cards · `20–24px` bento tiles and hero panels · `50%` avatars.
- **Shadows** (all cool-tinted navy, never black):
  - `sm` `0 2px 8px rgba(10,31,44,0.06)` — resting card
  - `md` `0 12px 34px rgba(10,31,44,0.10)` — raised panel
  - `lg` `0 16px 34px rgba(10,31,44,0.13)` — card hover
  - `xl` `0 24px 48px rgba(10,31,44,0.14)` — bento hover
  - `green` `0 6px 20px rgba(13,110,112,0.30)` — primary button
  - `teal-hover` `0 24px 48px rgba(13,110,112,0.20)` — tinted tile hover
- **Focus ring:** `box-shadow: 0 0 0 3px rgba(13,110,112,0.16–0.18)` + `border-color: #0D6E70`.
- **Motion:** `140ms ease-out` colour/hover · `180–260ms` borders and tile lifts ·
  `220–320ms cubic-bezier(0.16,1,0.3,1)` transforms · `420–620ms` carousel crossfade and dot width ·
  `520ms cubic-bezier(0.16,1,0.3,1)` decorative orb drift. No bounce, no infinite loops.

### Buttons

| Variant | Spec |
| --- | --- |
| **Primary** | `#0D6E70` fill, white text, pill, `min-height 50–54px`, `padding 14px 30px`, 16px/600, shadow `green`. Hover `#095458`. Active `translateY(1px)`. |
| **Primary on photo** | White fill, `#0D6E70` text, 2px white border. Hover `#E4F2F2`. |
| **Secondary** | White fill, `#0A1F2C` text, `1.5px #D4DDE0` border. Hover border+text → teal. |
| **Ghost on dark** | Transparent, 2px white border, white text. Hover `rgba(255,255,255,0.14)`. |
| **Nav CTA** | Same as primary at `min-height 42px`, `padding 11px 22px`, 14px/600. |
| **Chip (unselected)** | White, `1.5px #E2E9EC`, `#173B4F`, pill or 12px radius. |
| **Chip (selected)** | `#0D6E70` fill + white text, **or** `#E4F2F2` fill + `#0D6E70` border + inline tick — see per-page notes. |

All interactive targets are **≥44px tall**; primary CTAs 50–54px.

---

## Global chrome

### Header (every page)

Sticky, `top: 0`, `z-index: 100`, `background: rgba(255,255,255,0.88)`, `backdrop-filter: blur(12px)`,
`border-bottom: 1px solid #E2E9EC`. Inner row: `max-width 1200px`, `padding 16px 32px`,
`display: flex`, `align-items: center`, `gap: 40px`.

Contents, left to right:
1. **Logo** — `logo-secondread.svg`, `height 55px`, `width 220px`, links to `index.html`. Hover `opacity: 0.78`.
2. **Nav links** — How it works · Specialists · Pricing · Sample report · FAQs. 14px/500 `#173B4F`; the current page is 14px/600 `#0D6E70`. `gap: 28px`, `white-space: nowrap`.
3. **Right cluster** (`margin-left: auto`, `gap: 14px`) — the **Start my second read** primary CTA → `Start Flow`. The phone number is **not** in the header: three items plus a burger never cleared one row on a phone, so it lives in the footer only.

The header must **never wrap into two rows above 860px**. See [Responsive](#responsive-behaviour).

### Footer (every page)

`#06131C`, white text, `padding 60px 32px 28px`. Three columns `1.4fr 1fr 1fr`, `gap 48px`:
- **Brand** — `logo-secondread-light.svg` (`height 61px`, `width 244px`) + 13px/1.65 `rgba(255,255,255,0.72)` blurb, `max-width 340px`.
- **Service** — heading 14px/600 uppercase `0.06em` `rgba(255,255,255,0.72)`; links 13px `rgba(255,255,255,0.85)` in a 10px-gap column.
- **Contact** — email, phone, "Mon–Sun, 09:00–20:00".

Bottom bar: `border-top: 1px solid rgba(255,255,255,0.1)`, `padding-top 22px`, 12px
`rgba(255,255,255,0.72)`, space-between — copyright + emergency disclaimer on the left, Privacy &
UK GDPR / Accessibility / Terms on the right.

### Breadcrumbs (all sub-pages)

13px `#5A6B77`, 8px gap, `/` separators, current page `#0A1F2C` 600. Sits at the top of the hero
band, `margin-bottom: 28px`. The specialist profile is two levels: `Home / Specialists / Dr Dermot Mallon`.

---

## Screens / views

### 1. `index.html` — Landing page

Route: `/`. Renamed from a `.dc.html` component, so it is the site entry point.

#### 1a. Hero — auto-rotating 2-slide carousel

Section: `position: relative`, `background-color: #D8EEEA`, `overflow: hidden`,
`border-bottom: 1px solid #E2E9EC`.

Two absolutely-positioned background layers, both **fading with slide 1 only**
(`opacity: 0|1`, `transition: opacity 620ms ease-out`):
1. `<img>` of the MRI photo — `inset: 0`, `object-fit: cover`, `object-position: 78% center`.
2. The `gradient-scrim` overlay.

On slide 2 both fade out, leaving the flat `#D8EEEA` field.

> Implementation note: the photo is a real `<img>` layer rather than a CSS `background-image`
> because the filename contains parentheses. Use a background image if your asset pipeline allows it.

Slides are stacked in a single grid cell (`grid-area: 1 / 1`) and crossfade:
`opacity 620ms ease-out` + `transform: translateY(14px → 0) 620ms cubic-bezier(0.16,1,0.3,1)`.
The inactive slide gets `pointer-events: none`. Each slide is a
`grid-template-columns: minmax(320px, 1.05fr) 0.95fr`, `gap: 56px`, `min-height: 520px`,
`padding-bottom: 56px` two-column layout.

**Slide 1 — the pitch**
- Left column, `gap: 24px`, `align-items: flex-start`:
  - Eyebrow pill — `#E4F2F2` fill, `#095458` text, `padding 7px 16px`, radius 999px, 13px/600: "Reports today from 14 UK consultants"
  - H1 48px/1.04/700 `-0.025em` `#0A1F2C`: "Your scan, read again by the right specialist."
  - Lead 18px/1.6 `#173B4F`, `max-width 560px`: "Upload the MRI, CT, ultrasound or X-ray you already have. A GMC-registered consultant who subspecialises in that body area reviews it and writes you a report in plain English — from £249, in as little as 12 hours."
  - Two CTAs, 14px gap: **Start my second read** (primary → `Start Flow`) · **See a real sample report →** (secondary → `Sample Report`)
  - Reassurance row, 13px `#4A5C68`, `·` separators in `#6C7C87`: "No GP referral needed · No appointment · Refund if we miss the deadline"
- Right column: a `rgba(255,255,255,0.96)` card pinned bottom-right, `max-width 340px`, radius 16px, `padding 16px 18px`, shadow `0 10px 28px rgba(10,31,44,0.18)`. Contains a 42px `gradient-brand` rounded square with a lightning glyph, a mono eyebrow "FASTEST TURNAROUND", and "Report signed within 12 hours" in 15px/600 Montserrat.

**Slide 2 — quick-start picker** (fully interactive)
- Left column: eyebrow pill "Start in under a minute" · H2 44px/1.06/700 "Two questions and we know who reads your scan." · lead 18px/1.6 `max-width 520px` · three assurance lines, each a 22px white circle with `1px #C3E0DE` border and a teal tick:
  - "No card needed yet — nothing is charged until step three"
  - "You see the consultant's name and GMC number before you pay"
  - "Do not have the images? We collect them from the hospital"
- Right column: frosted card — `rgba(255,255,255,0.96)`, `1px #C3E0DE`, radius 22px, `padding 30px 32px`, shadow `0 16px 40px rgba(10,31,44,0.16)`:
  - **"What kind of scan do you have?"** → `repeat(3, 1fr)` grid, 10px gap, six 50px buttons: MRI · CT · X-ray · Ultrasound · PET-CT · Not sure. Selected = `#E4F2F2` fill, `#0D6E70` border, `#06313A` text, inline 14px tick. Default `MRI`.
  - **"Which part of the body?"** → 50px `<select>`, six options: Brain or spine (default) · Chest or heart · Bones or joints · Abdomen or pelvis · Breast · Head or neck.
  - **Matched panel** — `#E4F2F2`, `1px #C3E0DE`, radius 14px. Mono eyebrow "MATCHED" + 15px/1.6 `#06313A` sentence naming the consultant. Recomputes live from the body area:
    | Area | Matched text |
    | --- | --- |
    | Brain or spine | Dr Dermot Mallon, consultant neuroradiologist, NHNN. Reports within 12–48 hours. |
    | Chest or heart | Dr Senan Alsanjari, cardiothoracic radiologist, NHNN. Reports within 12–48 hours. |
    | Bones or joints | Dr Ramanan Rajakulasingam, musculoskeletal radiologist, RNOH. Reports within 12–48 hours. |
    | Abdomen or pelvis | Dr Asad Tamimi, abdominal radiologist, Imperial. Reports within 12–48 hours. |
    | Breast | Dr Hebah Taufik, consultant breast radiologist, London. Reports within 12–48 hours. |
    | Head or neck | Dr Husam Wassati, head & neck radiologist, King's College Hospital. Reports within 12–48 hours. |
    If scan type is **Not sure**, the string is prefixed: "Tell us the body area and we pick the right subspecialist — ".
  - **Continue to upload** — full-width 52px, 14px radius, primary fill → `Start Flow`.

**Carousel controls** — a dot row below the slides, `padding-bottom: 28px`, 10px gap. Each dot is a
6px-tall pill button: active `width 34px` `#0D6E70`, inactive `width 10px` `rgba(10,31,44,0.22)`,
`transition: width 420ms cubic-bezier(0.16,1,0.3,1), background 260ms ease-out`. Clicking jumps to
that slide.

**Autoplay** — advances every **7000ms**, wrapping. `onMouseEnter` on the slide wrapper sets
`paused: true`; `onMouseLeave` resumes. Clear the interval on unmount.
**Add for production:** pause on keyboard focus within the carousel, honour
`prefers-reduced-motion: reduce` by disabling autoplay, and give the dot group
`role="tablist"` semantics with `aria-selected`.

#### 1b. Hero stat strip

Directly under the carousel, still inside the hero section: `repeat(3, 1fr)`, `gap: 1px` on a
`#D4DDE0` background (hairline dividers), `border-radius: 16px 16px 0 0`, `border: 1px solid #D4DDE0`
with `border-bottom: none` — so it reads as a card rising out of the next section. Cells are white,
`padding 26px 28px`: 30px/700 `#095458` figure + 14px `#4A5C68` caption.

| Figure | Caption |
| --- | --- |
| 1 in 5 | second reads change the original finding |
| 12 hrs | fastest signed consultant report |
| 4.9 ★ | across 120 patient reviews |

#### 1c. Trust bar

White, `border-bottom: 1px solid #E2E9EC`, `padding 26px 32px`. Centred flex row, `gap: 28px`,
13px/600 `#4A5C68`, separated by 1px × 18px `#D4DDE0` rules:
CQC registered · GMC · FRCR consultants · ICO · UK GDPR · Indemnified to £10m.

#### 1d. How it works (3 steps)

White background, `padding 80px 32px`. Centred head (`max-width 640px`): eyebrow "HOW IT WORKS",
H2 "Three steps. You only do the first one.", lead "From upload to a signed consultant report, with
no appointment and no referral in between."

Cards: `repeat(auto-fit, minmax(280px, 1fr))`, 22px gap. Each card is white, `1px #E2E9EC`,
radius 16px, `padding 28px`, shadow `sm`, `height: 100%`. Hover: `translateY(-4px)` +
`0 16px 34px rgba(10,31,44,0.14)`.

Card header is a space-between row: a 50px `gradient-brand` rounded square (14px radius, white
Lucide-style glyph, shadow `0 6px 16px rgba(13,110,112,0.28)`) that on hover does
`scale(1.08) rotate(-4deg)`; and a ghosted 32px/700 `#D4DDE0` numeral.

| # | Icon | Title | Body |
| --- | --- | --- | --- |
| 01 | upload-cloud | Upload your scans | Drag in a DICOM folder, a zip, or the whole CD. No images yet? We will request them from the hospital for you. |
| 02 | user-search | Choose a specialist | You tell us the body area and your question. We name the consultant — with their hospital and GMC number — before you pay, and you pick your deadline: 12, 24 or 48 hours. |
| 03 | file-text | Get your report | Findings, comparison with any prior scan, next steps, and a "What this means for you" section — then ask us anything about it. |

Below, centred: secondary button "Read the detail on how it works" → `How It Works`.

#### 1e. Specialists

White, `padding 80px 32px`. Centred head: eyebrow "THE SPECIALISTS", H2 "Fourteen consultants. One
will read yours.", lead "Every report is signed by a named, GMC-registered subspecialist — you see
who before you pay."

Grid `repeat(auto-fit, minmax(180px, 1fr))`, `gap: 40px 24px`. Each entry is a centred column,
16px gap, `cursor: pointer`, hover `translateY(-6px)`:
- **Avatar** — 128px circle, `#E4F2F2` fill, `overflow: hidden`, containing an `<img>` at
  `object-fit: cover`, `object-position: 50% 12%` (head-level crop). Hover on the wrapper:
  `box-shadow: 0 14px 30px rgba(13,110,112,0.3), 0 0 0 3px #0D6E70` (glow + teal ring); the inner
  image scales to `1.06` over `320ms cubic-bezier(0.16,1,0.3,1)`.
- **Name** — 17px/700 Montserrat `#0A1F2C`, `min-height: 44px`, `text-align: center`, `padding-top: 4px`.
  The reserved height is deliberate: it keeps the pills below aligned across rows regardless of
  one- or two-line names. **Do not use `display: flex` here** — it collapses the space in "Dr Senan Alsanjari".
- **Role pill** — `display: inline-flex`, `min-height: 44px` (also deliberate — equalises one- and
  two-line role labels), white fill, `1px #D4DDE0`, radius 999px, `padding 6px 14px`, 12px/600
  `#095458`, shadow `sm`. Hover: `#0D6E70` fill, white text.
- **Specialties** — 13px/1.55 `#4A5C68`, `max-width 190px`, `min-height: 84px` (row alignment).
- **Credential row** — 11px `#5A6B77`, centred, 6px gap: hospital · GMC · qualification.

Six specialists are shown (of fourteen claimed): Senan Alsanjari (SA), Dermot Mallon (DM),
Ramanan Rajakulasingam (RR), Hebah Taufik (HT), Asad Tamimi (AT), Geetanjali Kakar (GK).
Full data in `design/index.html`'s state block.

> **Portrait delivery in the prototype:** `design/portraits/data.js` sets
> `window.SR_PORTRAITS = { sa: "data:image/png;base64,…", … }`, keyed by lowercased initials, and the
> component resolves `photo` from it. This exists purely so the single-file export works offline —
> **replace it with normal image URLs / an asset pipeline**, ideally responsive `srcset` at
> 128/256/384px.
>
> **Known content gap:** four of the six specialists are men, but only three male portraits were
> supplied — Dr Asad Tamimi currently shows a female portrait. Needs a real headshot.

#### 1f. Pricing

`#F4F7F8`, `padding 80px 32px`. Centred head: eyebrow "PRICING", H2 "Same consultant. You choose
the deadline.", lead "One flat price per report. No consultation fee, no subscription, nothing added later."

Three cards, `repeat(auto-fit, minmax(280px, 1fr))`, 20px gap, `align-items: stretch`. Structure per
card — an outer shell at `padding: 12px`, radius 22px, containing:
1. An upper block (`padding 22px 20px 20px`): tier name 17px/700 · deadline 13px · **price** (17px `£` glyph raised via `align-self: flex-start; margin-top: 6px`, then 46px/700 `-0.03em` figure, then 14px "/ report") · full-width 46px pill button "Select this deadline".
2. A lower inset panel, radius 16px, `padding 22px 20px`, `flex: 1`, holding the five-item feature list (10px gap, teal tick + 13.5px/1.45 label).

Hover: `translateY(-6px)` + `0 22px 44px rgba(10,31,44,0.18)`.

| | 48 hours | **24 hours (featured)** | 12 hours |
| --- | --- | --- | --- |
| Price | £249 | £299 | £349 |
| Deadline | Report by Wed 5 Aug, 4pm | Report by Tue 4 Aug, 4pm | Report by tonight, 9pm |
| Card fill | `#FFFFFF` | `#0A1F2C` | `#FFFFFF` |
| Inset panel | `#F4F7F8` | `#FFFFFF` | `#F4F7F8` |
| Heading / price | `#0A1F2C` / `#0A1F2C` | `#FFFFFF` / `#6FE3C5` | `#0A1F2C` / `#0A1F2C` |
| Muted text | `#5A6B77` | `rgba(255,255,255,0.62)` | `#5A6B77` |
| Button | white fill, `#0A1F2C`, `1.5px #D4DDE0` | `#6FE3C5` fill, `#06313A` text | white fill, `#0A1F2C`, `1.5px #D4DDE0` |
| Shadow | `sm` | `0 22px 48px rgba(10,31,44,0.3)` | `sm` |

All three share the feature list: Consultant subspecialist review, signed and named · Comparison with
one prior study · "What this means for you" in plain English · Answers to your specific questions ·
Full refund if we miss the deadline.

Below the cards, a full-width **Optional add-ons** panel: `#E4F2F2`, `1px #C3E0DE`, radius 18px,
`padding 32px 30px`, with a decorative `gradient-brand` circle at `top: -40px; right: -40px`,
`160px`, `opacity: 0.14`, `border-radius: 50%` under `overflow: hidden`. Two rows separated by a
`#C3E0DE` hairline — name 15px/600 `#0A1F2C` + price 16px/700 `#0D6E70` on a baseline-aligned
space-between row, sub-note 13px `#4A5C68`:
- Three written questions — **+£50** — Answered by the same consultant
- 10-minute video call — **+£150** — Talk it through with your consultant

#### 1g. Sample report teaser

White, `padding 80px 32px`. Two columns `1.5fr 1fr`, `gap 48px`, `align-items: stretch`.
- Left: eyebrow "SAMPLE REPORT", H2 "A report written twice: once for your doctor, once for you.",
  lead, then a `#F4F7F8` quote box (`1px #E2E9EC`, radius 16px, `padding 28px 30px`) — mono eyebrow
  "WHAT THIS MEANS FOR YOU", 15px/1.75 body, and a `#E2E9EC`-topped signature line "**Dr Dermot
  Mallon** · GMC 7012345 · Signed 14:02". Below it, primary CTA "Read a full sample report (PDF)" →
  `Sample Report`.
- Right: the **1 in 5** callout, bottom-aligned to the quote box via
  `display: flex; align-items: flex-end; padding-bottom: 74px`. Card is `#E4F2F2`, `1px #C3E0DE`,
  radius 16px, `padding 30px 32px`, `width: 100%` — deliberately matched to the left box's radius,
  padding and border weight. Contents: 50px/700 `#0D6E70` "1 in 5" + 15px/1.5 `#4A5C68` "of the
  scans we re-read return a materially different finding from the original report."

#### 1h. Testimonials

`#F4F7F8`, `padding 80px 32px`. Centred head: eyebrow "PATIENT STORIES", H2 "Real scans, real answers".
Cards `repeat(auto-fit, minmax(300px, 1fr))`, 20px gap; white, `1px #E2E9EC`, radius 16px,
`padding 28px`, hover `translateY(-4px)` + shadow `lg`. Each: an 8px `#0D6E70` dot + scan type in
15px/700 Montserrat, the quote in 14px/1.7 `#173B4F`, then an `#E2E9EC`-topped attribution in 13px
`#4A5C68`.

Spine MRI / Benjamin B · CT and MRI / Tom G · Spine MRI / Kilo D.

#### 1i. FAQ accordion

White, `max-width 860px`, `padding 80px 32px`. Centred head: eyebrow "FAQS", H2 "Questions, answered
straight". Five items in a 12px-gap column; first item open by default (`openFaq: 0`).

Each item: white, `1px #E2E9EC`, radius 14px, `overflow: hidden`. The full-width header button
(`padding 20px 22px`, space-between, hover `#F4F7F8`) holds the question in 16px/600 Montserrat
`#0A1F2C` and a 22px `+` / `−` sign in `#095458`. The answer panel is `padding: 0 22px 22px`,
15px/1.65 `#173B4F`. Only one item open at a time; clicking the open item closes it (`openFaq: -1`).

Questions: Do I need a GP referral? · What if I do not have my images? · Which scans can you review? ·
Is my data safe? · What happens if you miss the deadline?

#### 1j. CTA band

`#0A1F2C`, `padding 60px 32px`, space-between, wrapping. H2 30px/700 white "Not sure whether a second
read will help?" + `rgba(255,255,255,0.78)` 16px/1.55 body, `max-width 680px`; primary green button
"Ask us first".

---

### 2. `How It Works.dc.html`

Route: `/how-it-works`.

**Hero band** — `gradient-hero`, `padding 40px 32px 64px`, breadcrumb, H1 42px "From a hospital CD to
a plain-English answer.", lead 18px/1.65 "If you do not have your images yet, start here anyway.
Getting hold of them is the part most people get stuck on, and we do it for you."

**Getting your images** — white, `padding 80px 32px`. Left-aligned head (`max-width 640px`): eyebrow
"GETTING YOUR IMAGES", H2 "Three ways your scan reaches us". Three cards
(`repeat(auto-fit, minmax(280px, 1fr))`, 22px gap), same anatomy as the home How-it-works cards —
50px `gradient-brand` medallion above a 19px/700 title and 14px/1.65 body:
- **disc** — You already have a CD or download — Drop the whole folder in. You do not need to know which files matter.
- **hospital** — Your scan is on an NHS system — You have a legal right to your images. We send you a one-page request letter and, with your consent, chase the radiology department through the Image Exchange Portal.
- **globe** — Your scan was done privately or abroad — Forward the clinic's download link. We accept images from any country and report in English.

**What happens after you pay — bento grid.** `#F4F7F8`, `padding 80px 32px`. Head: eyebrow, H2 "Four
checkpoints, all of them ours". Grid: `grid-template-columns: repeat(3, 1fr)`,
`grid-auto-rows: minmax(232px, auto)`, `gap: 16px`. All four tiles share
`transition: transform 260ms cubic-bezier(0.16,1,0.3,1), box-shadow 260ms ease-out` and lift
`translateY(-4px)` on hover. Every tile leads with a **50px/700 `0.9`-leading `-0.04em` numeral** that
scales to `1.06` on hover.

| Tile | Span | Treatment |
| --- | --- | --- |
| **01** Images checked before the clock starts | `span 1` × `span 2` (tall) | `linear-gradient(160deg, #E4F2F2 0%, #EEF7F7 58%, #F7FBFB 100%)`, `1px #C3E0DE`, radius 20px, `padding 32px`. A 240px `gradient-brand` circle at `top/right: -70px`, `opacity 0.16` → on hover `scale(1.28) translate(-14px, 18px)` and `opacity 0.26` over `520ms`. Numeral `#0D6E70`, paired with a white pill (`1px #C3E0DE`, `padding 6px 13px`) reading **clock-icon + "≤ 1 HR"**. Content sits at the bottom (`margin-bottom: auto` on the top row): a 54px white icon medallion (`1px #C3E0DE`, teal scan-check glyph, shadow `0 4px 12px rgba(13,110,112,0.14)`) that on hover becomes `#0D6E70`-filled/white and does `translateY(-4px) rotate(-6deg)`; H3 26px/1.18/700 `#06313A`; body 15px/1.65 `#1B4A52`. |
| **02** Assigned to your consultant | `span 2` | White, `1px #E2E9EC`, radius 20px, `padding 32px 34px`, space-between column. Numeral `#C3E0DE` → `#0D6E70` on hover, with a small mono "CHECKPOINT" label beside it. H3 22px, body 15px `max-width 460px`. Below: a consultant chip — `#F4F7F8`, `1px #E2E9EC`, radius 14px, `padding 14px 18px`, `max-width 400px`, holding a 40px white "DM" circle + "Dr Dermot Mallon" / "Consultant neuroradiologist · GMC 7012345". Hover: chip → `#E4F2F2` / `#C3E0DE` and slides `translateX(6px)` over `320ms`. |
| **03** Reported and double-checked | `span 1` | White card, radius 20px, `padding 30px`. Numeral + mono label as 02. H3 20px, body 14.5px. Pinned to the bottom (`margin-top: auto`), a 3-item checklist — 18px `#E4F2F2` circle + teal tick + 13px `#173B4F` label — each row sliding `translateX(4px)` on hover: Findings · Comparison with priors · What this means for you. |
| **04** Delivered to your account | `span 1` | `#E4F2F2`, `1px #C3E0DE`, radius 20px, `padding 30px`. A 180px `gradient-brand` circle at `bottom: -60px; left: -40px`, `opacity 0.14`, hover `scale(1.3) translate(18px, -18px)`. Numeral `#0D6E70`; opposite it a 38px white circle with a teal arrow-up-right glyph that on hover **rotates 45°** and inverts to `#0D6E70`/white. H3 20px `#06313A`, body 14.5px `#1B4A52`. |

Copy: 01 "A radiographer confirms the study is complete and readable. If anything is missing we tell
you first — your deadline does not begin until the images are good." · 02 "You get their name,
hospital and GMC number by email — before any reporting begins." · 03 "Findings, comparison with
prior studies, and the plain-English section." · 04 "Secure PDF, downloadable forever, shareable with
your GP in one click."

**Closing band** — white, `border-top: 1px solid #E2E9EC`, `padding 64px 32px`, space-between:
H2 28px "Do not have your images yet?" + body; primary "Start my second read" + secondary "See pricing".

---

### 3. `Pricing.dc.html`

Route: `/pricing`. Hero band as pattern: H1 "Pricing", lead "The price depends only on how fast you
need it. Same consultant, same depth of report, either way."

**Comparison table** — white section, `padding 72px 32px`. One bordered container:
`1px #E2E9EC`, radius 20px, `overflow: hidden`, shadow `sm`. Every row is a
`grid-template-columns: 1.6fr 1fr 1fr 1fr` grid with `1px #E2E9EC` left borders on the tier cells.

- **Header row** — `#F4F7F8`, `border-bottom: 1px solid #E2E9EC`. First cell: mono "INCLUDED",
  bottom-aligned. Tier cells (`padding 26px 24px`, centred): name 18px/700 · a `min-height: 20px`
  tag slot (11px/700 uppercase `0.08em`) · price 34px/700 `-0.02em`.
- **Feature rows** (5) — feature label `padding 20px 28px`, 15px `#173B4F`; three centred 18px teal
  ticks. Row hover `#FAFCFC`.
- **Footer row** — empty first cell, then a 46px pill "Choose" per tier.

Tier styling: 48h and 12h use `headBg #F4F7F8`, `footBg #FFFFFF`, `#0A1F2C` text, white/`#D4DDE0`
buttons, and an invisible tag (`color: transparent`, content `·`, purely to hold the row height).
The **24h** column is tinted throughout — `headBg #E4F2F2`, `footBg #F7FBFB`, heading `#06313A`,
price `#0D6E70`, tag "Most chosen" in `#0D6E70`, and a filled `#0D6E70` button.

Feature rows: Consultant subspecialist review · Comparison with one prior study · "What this means
for you" in plain English · Answers to your specific questions · Missed-deadline refund.

**Add-ons** — `#F4F7F8`, `padding 72px 32px`. Eyebrow "ADD-ONS", H2 "Add only what you need". Three
cards (`minmax(280px, 1fr)`, 20px gap): white, radius 16px, `padding 28px`, hover `translateY(-4px)`.
Header is a baseline space-between row — title 18px/700 + price 20px/700 `#0D6E70` — over 14px/1.65 body.
- X-ray review — £79 — Single-region plain film, 48-hour turnaround.
- Three written questions — £50 — Answered by the same consultant who reported your scan.
- 10-minute video call — £150 — Book a slot within 48 hours of your report.

**Fixed-quote band** — white section, `padding-top 72px`. `#E4F2F2` panel, `1px #C3E0DE`, radius 20px,
`padding 44px 48px`, space-between wrapping: H2 28px "Something larger than one scan?" + 16px/1.65
body ("Multiple scans, whole-body imaging, or a clinic contract? Tell us what you have and we return
a fixed quote the same working day — never "request a personalised quote" with no number attached.");
primary CTA "Get a fixed quote".

---

### 4. `Sample Report.dc.html`

Route: `/sample-report`.

**Hero band** — `gradient-hero`, breadcrumb, H1 42px "This is exactly what you get", lead 18px/1.65
"A real report, anonymised with the patient's written consent. Two audiences, one document: the
clinical section your doctor needs, then the section written for you." Then a
`repeat(auto-fit, minmax(280px, 1fr))` grid (`gap 14px 28px`, `max-width 760px`) of four guarantees —
22px white circle, `1px #C3E0DE`, teal tick, 15px/1.5 `#173B4F` label:
Named consultant, GMC number, date and time signed · Comparison with prior imaging, with measurements ·
Direct answers to the questions you asked · Recommended next steps, in order.
Primary CTA "Download the full sample (PDF)".

**Report facsimile** — `#F4F7F8` section, `padding 72px 32px 88px`. The document is `max-width 900px`,
white, `1px #E2E9EC`, radius 20px, shadow `0 12px 36px rgba(10,31,44,0.1)`, `overflow: hidden`:

1. **Letterhead** — space-between, `padding 26px 40px`, `border-bottom: 2px solid #0D6E70`.
   Logo (`height 32px`) + mono `SR-2026-0418 · 4 August 2026, 14:02` in `#5A6B77`.
2. **Metadata grid** — `1fr 1fr`, `gap: 1px` on `#E2E9EC`, cells white `padding 20px 40px`. Each:
   mono 10.5px `0.1em` uppercase label + 15px/600 `#0A1F2C` value.
   Patient `A. A., DOB 12/04/1974` · Reporting consultant `Dr D. Mallon, FRCR, GMC 7012345` ·
   Study `MRI brain with contrast, 18/01/2026` · Compared with `MRI brain, 03/2024`.
3. **Clinical question** — `padding 32px 40px`, `border-top: 1px solid #E2E9EC`. Mono label + 15.5px/1.7 `#173B4F`.
4. **Findings** — same treatment, `padding 0 40px 32px`.
5. **What this means for you** — the emphasis block: `#E4F2F2`, `1px #C3E0DE`, radius 16px,
   `margin 0 40px 32px`, `padding 28px 30px`. Mono label in `#095458`, body **16px/1.75 `#06313A`**
   (deliberately larger and darker than the clinical sections above it).
6. **Recommended next steps** — 3-item ordered list, each row a 22px `#E4F2F2` circle with a
   `#095458` 12px/700 numeral + 15.5px/1.6 text.
7. **Disclaimer strip** — `#FAFCFC`, `border-top: 1px solid #E2E9EC`, `padding 22px 40px 28px`,
   12.5px/1.6 `#5A6B77`.

Full report copy is in `design/Sample Report.dc.html`.

---

### 5. `Specialists.dc.html` — filterable directory

Route: `/specialists`. **Fully interactive.**

**Hero band** — breadcrumb, H1 "Find a specialist", lead "You do not have to choose. Tell us the body
area during your order and we match you. This page is for people who want to see who will read their scan."

**Body** — `#F4F7F8`, `padding 48px 32px 88px`, two columns `268px 1fr`, `gap 32px`, `align-items: start`.

**Filter rail** (`position: sticky; top: 96px`) — white, `1px #E2E9EC`, radius 18px, `padding 26px 24px`, shadow `sm`.
- Header row: "Body area" 15px/700 + a text-button **Reset** (12px/600 `#5A6B77`, hover `#0D6E70`) that clears all filters and any selection.
- **Body area — single-select**, 7 rows in a 4px-gap column. Each row is a full-width button,
  `padding 9px 10px`, radius 10px, hover `#EEF7F7`: an 18px checkbox (radius 5px, `1.5px` border) +
  label (flex: 1) + a live count in 12px `#5A6B77`. Selected: row `#E4F2F2`, box `#0D6E70` filled with
  a white tick, label 600 `#06313A`. Clicking the active row **deselects** it (shows all).
  Brain & spine (3) · Chest & heart (2) · Bones & joints (2) · Abdomen & pelvis (3) · Breast (1) ·
  Head & neck (2) · Children (1). **Counts are derived from the data, not hard-coded.**
- **Modality — multi-select** pill chips, 8px gap: MRI · CT · PET-CT · Ultrasound. Selected =
  `#0D6E70` fill + white. Filter logic is **AND** — a consultant must support *every* selected modality.

**Results column**
- Header: H2 22px with a **derived** string — `"{n} consultant{s} read{s} {area} imaging"`, or
  "…across all body areas" when no area is selected — plus "Sorted by soonest availability" in 13px `#5A6B77`.
- Cards in a 16px-gap column. Each: white, `1px #E2E9EC` (→ `#0D6E70` when that consultant is
  requested), radius 18px, `padding 24px`, `grid-template-columns: 132px 1fr`, `gap 24px`.
  Hover `translateY(-3px)` + shadow `lg` + border `#C3E0DE`.
  - **Portrait** — 132 × 156px, radius 14px, `#E4F2F2`. In the prototype this is an `<image-slot>`
    web component (a drag-and-drop placeholder, `id="portrait-{doctorId}"`) — **replace with real images.**
  - Name 20px/700 + an availability pill when present (`#E4F2F2`, `1px #C3E0DE`, tick + 12px/600 `#095458`).
  - Role · hospital in 14px `#4A5C68`.
  - Three tag chips: `#F4F7F8`, `1px #E2E9EC`, radius 999px, `padding 5px 12px`, 12px `#173B4F`.
  - Bio 14.5px/1.65, `max-width 620px`.
  - Actions: **Request Dr {surname}** (44px pill, `1.5px #0D6E70` outline; when active it fills
    `#0D6E70`/white and reads "Requested" — clicking again clears) and **Profile** → `Specialist Profile`.
- **Selection confirmation** — when a consultant is requested, an `#E4F2F2` bar appears below the
  list (`1px #C3E0DE`, radius 18px, `padding 24px 28px`): mono "REQUESTED" + "Dr {name} will read your
  scan" in 18px/700 `#06313A`, and a primary "Continue to upload" button. Changing any filter clears
  the selection.
- **Empty state** — white, `1px dashed #D4DDE0`, radius 18px, `padding 44px 32px`, centred:
  "No consultant matches that combination" / "Loosen the modality filter, or let us match you during
  your order." / a "Reset filters" button.

**Data — 10 consultants** (id, name, role, hospital, areas[], modalities[], tags[], bio, availability, rank).
`rank` drives sort order (0 = soonest). Availability strings: "Available today", "Next slot tomorrow", or empty.
Full array in `design/Specialists.dc.html`. The roster deliberately covers all seven areas so no
filter combination dead-ends on a single selection.

---

### 6. `Specialist Profile.dc.html`

Route: `/specialists/:slug` (prototype hard-codes Dr Dermot Mallon). Breadcrumb is three levels.

**Hero band** — `gradient-hero`, `padding 40px 32px 56px`, two columns `240px 1fr`, `gap 44px`, `align-items: start`.
- Left: 240 × 292px portrait, radius 18px, `#E4F2F2`, shadow `0 12px 30px rgba(10,31,44,0.14)` (an `<image-slot>` in the prototype).
- Right: eyebrow 12.5px/600 `0.14em` uppercase `#095458` "CONSULTANT NEURORADIOLOGIST" · H1 40px/1.08/700 ·
  lead 17.5px/1.6 `#173B4F` `max-width 660px` · four credential pills (white, `1px #C3E0DE`, radius 999px,
  `padding 7px 15px`, 12.5px/600 `#095458`): GMC 7012345 · FRCR · PhD Cambridge · Reports since 2019.
- Action row: a 52px primary **"Request Dr Mallon · from £249"** that toggles to `#095458` /
  "Dr Mallon requested"; beside it an availability line — 22px white circle + tick + 14px/600 `#095458`
  "Available today · usually reports within 18 hours".
- When requested, a white confirmation bar appears (`1px #C3E0DE`, radius 14px, `padding 18px 22px`):
  "Dr Mallon is reserved for your study." + a 44px "Continue to upload" button.

**Where Dr Mallon can help** — white, `padding 72px 32px`. H2 30px, then
`repeat(auto-fit, minmax(280px, 1fr))` at `gap 14px 32px`. Each of six tiles: `#F4F7F8`,
`1px #E2E9EC`, radius 12px, `padding 14px 16px`, a 24px `#E4F2F2` tick circle + 15px `#173B4F`.
Hover → `#EEF7F7` / `#C3E0DE`. Items: Unclear brain MRI findings · Suspected MS or inflammation ·
Stroke and vascular imaging · Spinal cord and nerve-root pain · Memory and neurodegeneration ·
Skull-base and pituitary lesions.

**Background / turnaround / quote** — `#F4F7F8`, `padding 72px 32px 88px`, two columns `1.35fr 1fr`, `gap 32px`.
- Left: white card, radius 18px, `padding 34px 36px`. Eyebrow "BACKGROUND" + two 16px/1.75 paragraphs.
- Right, a 20px-gap column:
  - **Typical turnaround** — white card, `padding 30px 32px`. Eyebrow, then three rows (`padding 13px 0`,
    `border-bottom: 1px solid #E2E9EC`, baseline space-between): study 15px `#173B4F` + time 18px/700 `#0D6E70`.
    Brain MRI 14 hours · Whole spine MRI 20 hours · Head CT 9 hours. Footnote 12.5px `#5A6B77`:
    "Median over the last 90 days, not a marketing claim."
  - **Patient quote** — `#E4F2F2`, `1px #C3E0DE`, radius 18px, `padding 30px 32px`: `★★★★★` at 16px
    with `letter-spacing: 3px` in `#0D6E70`, quote 16px/1.7 `#06313A`, attribution 13px `#4A5C68`
    "Verified patient · spine MRI".

---

### 7. `FAQs.dc.html`

Route: `/faqs`. **Interactive: live search + category filter + accordion.**

**Hero band** — breadcrumb, H1 42px "Questions people ask us", lead "Grouped, searchable, and each one
is its own linkable heading." Then a search field, `max-width 480px`: 52px tall, radius 999px,
`1.5px #D4DDE0`, `padding-left 48px` with a 17px magnifier glyph absolutely positioned at `left: 18px`.
Focus: `#0D6E70` border + 3px teal ring.

**Body** — `#F4F7F8`, `max-width 880px`, `padding 44px 32px 80px`.
- **Category chips** — 9px gap, `margin-bottom 28px`: All questions · Before you order · Getting your
  images · Your report · Privacy. Unselected white/`#D4DDE0`/`#173B4F`; selected `#0D6E70`/white.
  Changing category closes any open answer.
- **Accordion** — 12px-gap column. Each item carries `id="faq-{slug}"` so answers are individually
  linkable (`#faq-gp-referral`, `#faq-nhs-scan`, `#faq-no-images`, `#faq-bad-news`, `#faq-who-sees`,
  `#faq-outside-uk`). Card: white, `1px #E2E9EC` → `#C3E0DE` when open, radius 14px, hover shadow
  `0 10px 24px rgba(10,31,44,0.1)`.
  Header button (`padding 22px 24px`, hover `#FAFCFC`): a stacked label — mono 10px `0.12em` uppercase
  category over the question in 17px/700 Montserrat — and a 30px circle sign on the right
  (`#E4F2F2`/`#095458` with `+`; `#0D6E70`/white with `−` when open).
  Answer: `padding 0 24px 24px`, 15.5px/1.7 `#4A5C68`, `max-width 720px`. One open at a time.
- **Search behaviour** — case-insensitive substring match across question + answer + category,
  intersected (AND) with the active category. Empty result → dashed empty state "Nothing matches that"
  / "Try a different word, or just call us — we answer in about 40 seconds." / "Clear search" button
  that resets both filters.

**Talk to a person** — white, `padding 76px 32px 84px`. Eyebrow "STILL STUCK", H2 30px "Talk to a
person", lead "A member of our team answers, not a call centre. Mon–Sun, 09:00–20:00."
Three cards (`minmax(280px, 1fr)`, 20px gap), each: mono uppercase label, value 19px/700 Montserrat,
note 13.5px `#4A5C68`.
- PHONE — 01438 904272 — Average answer time 40 seconds
- EMAIL — info@secondread.co.uk — Replies within 3 working hours
- REGISTERED OFFICE — Venture House, 2 Arlington Square — Downshire Way, Bracknell RG12 1WA

**Emergency notice** — `#FFF6E9`, `1px #F0DCC0`, radius 14px, `padding 20px 24px`, a 26px `#E8A33D`
circle with a white `!` + 14.5px/1.6 `#6B4A18`: "We are not an emergency service. If you are
seriously unwell, contact NHS 111 or 999."

> The six FAQ answers were **written for the design** and read as policy commitments (especially the
> bad-news call-back and the data-retention claims). They must be reviewed and approved before launch.

---

### 8. `Start Flow.dc.html` — 3-step order flow

Route: `/start`. **The core interactive prototype.** Every "Start my second read" CTA site-wide lands here.

**Chrome (replaces the marketing header)**
- Top bar: white, `border-bottom: 1px solid #E2E9EC`, `padding 16px 32px`, `gap 24px`. Logo · a
  reassurance line (12.5px `#4A5C68` with a teal padlock glyph) "Encrypted · UK data centres · you can
  leave and return" · a right-aligned secondary 40px "Save and finish later".
- **Stepper**: `#FAFCFC`, `border-top: 1px solid #E2E9EC`. Three equal-flex buttons, `padding 16px 8px`,
  each with a `3px` bottom border (`#0D6E70` when active, else transparent), a 28px circular badge, and
  a label. Badge: pending = white / `1.5px #D4DDE0` / `#5A6B77` numeral; active and complete = `#0D6E70`
  filled white — complete shows a **tick** instead of the number. Label 14px, active 700 `#0A1F2C`, else
  500 `#5A6B77`. Steps are clickable **backwards only** (`n <= currentStep`); forward steps have
  `cursor: default`.
  Labels: 1 Your images · 2 What was scanned? · 3 When do you need it.
- No marketing footer — the flow ends at its own action row.

**Layout** — `padding 40px 32px 88px`, two columns `1fr 340px`, `gap 32px`, `align-items: start`.

**Step heading block** (all steps) — mono eyebrow `"Step {n} of 3 · {label}"` in `#095458`,
H1 34px/1.15/700 `-0.02em`, lead 16.5px/1.6 `#4A5C68` `max-width 640px`.

| Step | Title | Subtitle |
| --- | --- | --- |
| 1 | Send us the scan | Drop in everything you have — the whole CD folder is fine. We work out which series matter. |
| 2 | Tell us what we are looking at | This is how we match your subspecialist. Plain words are fine — you do not need the medical term. |
| 3 | Choose your deadline, then pay | The date you see is the date the signed report lands. Miss it and we refund you in full. |

**Step 1 — Your images**
- **Dropzone** — white, `2px dashed #C3E0DE`, radius 18px, `padding 48px 32px`, centred, clickable.
  Hover → `#0D6E70` border, `#F7FBFB` fill. Contains a 56px `gradient-brand` rounded square with a
  white upload glyph (shadow `0 8px 20px rgba(13,110,112,0.28)`), H3 20px "Drag files or a folder here",
  14px `#5A6B77` "DICOM (.dcm), .zip, ISO or images from your phone · up to 4GB", and a 46px outlined
  "Choose files" pill. Clicking appends a new file at 4% progress.
- **File rows** — white, `1px #E2E9EC`, radius 14px, `padding 20px 22px`. Name 15px/600 + meta 13px
  `#5A6B77` on the left, a status pill on the right, and a 6px progress track (`#EEF2F4`, radius 999px)
  filled with `linear-gradient(90deg, #0D6E70, #6FE3C5)` and `transition: width 300ms ease-out`.
  In-flight pill: `#F4F7F8` / `1px #E2E9EC` / `#4A5C68`, showing `{n}%`. Complete: `#E4F2F2` /
  `1px #C3E0DE` / `#095458`, showing "Ready".
  Seed state: `MRI_Brain_Jan2026.zip` at 100% ("2.1GB · 480 images · uploaded") and
  `Prior_MRI_2024.zip` at 68%.
  **Simulated upload:** a 900ms interval adds 4% to any incomplete file and rewrites the meta line as
  `"{p}% · {done}GB of 2.1GB · {mins} min left"` (done = `2.1 × p/100`, mins = `ceil((100-p)/20)`,
  floored at 1). Clears itself when everything reaches 100%. **Replace with real upload progress.**
- **Skip notice** — `#E4F2F2`, `1px #C3E0DE`, radius 14px, `padding 20px 22px`: a 26px `#0D6E70`
  circle with a white `i` + 14.5px/1.6 `#06313A` "Do not have your images? Skip this step. We will
  send you a request letter and collect them from the hospital with your consent — usually 3–5
  working days, at no extra cost."

**Step 2 — What was scanned?** (four white cards, `1px #E2E9EC`, radius 18px, `padding 28px`, 26px gap)
1. **Scan type** — H3 16px + five pill chips (46px, `padding 12px 22px`): MRI (default) · CT · Ultrasound · X-ray · PET-CT. Selected `#0D6E70`/white.
2. **Body area** — H3 + a 14px `#5A6B77` helper "This is how we pick your subspecialist. You do not
   have to know the medical term." + a `repeat(auto-fit, minmax(200px, 1fr))` grid (10px gap) of six
   radio tiles (`padding 14px 16px`, radius 12px, `1.5px` border, a 20px circle + 14.5px label).
   Selected: `#E4F2F2` fill, `#0D6E70` border, filled circle with a white tick. Default `Brain or spine`.
3. **What do you want answered?** — H3 + helper "One or two sentences is plenty. The consultant
   answers this directly in your report." + a 108px min-height textarea, radius 12px, `1.5px #D4DDE0`,
   15px/1.6, `resize: vertical`, placeholder "For example: my report mentioned a possible lesion — is
   it a tumour, and has it changed since my last scan?"
4. **Your consultant** — H3 + helper "Matched from your body area. You can change this or let us
   decide." + an `#E4F2F2` panel (`1px #C3E0DE`, radius 14px, `padding 18px 20px`, space-between): a
   46px white initials circle + name 16px/700 `#06313A` + role 13px `#4A5C68`, and a 42px outlined
   "Choose someone else" link → `Specialists`. **This panel recomputes from the selected body area.**

   | Body area | Consultant | Initials | Role |
   | --- | --- | --- | --- |
   | Brain or spine | Dr Dermot Mallon | DM | Consultant neuroradiologist |
   | Chest or heart | Dr Senan Alsanjari | SA | Cardiothoracic radiologist |
   | Bones or joints | Dr Ramanan Rajakulasingam | RR | Musculoskeletal radiologist |
   | Abdomen or pelvis | Dr Asad Tamimi | AT | Abdominal radiologist |
   | Breast | Dr Hebah Taufik | HT | Consultant breast radiologist |
   | Head or neck | Dr Husam Wassati | HW | Head & neck radiologist |

**Step 3 — When do you need it**
1. **Deadline cards** — `repeat(auto-fit, minmax(230px, 1fr))`, 16px gap. Each a left-aligned button:
   white, `2px` border (`#E2E9EC` → `#0D6E70` when selected), radius 18px, `padding 26px 24px`.
   Selected shadow `0 12px 30px rgba(13,110,112,0.2)`; hover `translateY(-4px)` + shadow `xl`.
   Header row: label 18px/700 + a 22px radio circle (filled teal with a white tick when selected).
   Then price 32px/700 `#0D6E70` and the deadline in 13.5px/1.5 `#4A5C68`.
   48 hours £249 "Report by Thu 6 Aug, 4pm" · 24 hours £299 "Report by Wed 5 Aug, 4pm" ·
   12 hours £349 "Report by tonight, 9pm". **No default** — the user must choose.
2. **Add anything else?** — white card with two checkbox rows (`padding 16px 18px`, radius 12px,
   `1.5px` border; selected `#E4F2F2`/`#0D6E70`). Each: a 20px square checkbox (radius 6px), a title
   15px/600 + note 13.5px `#4A5C68`, and `+£{price}` in 16px/700 `#0D6E70`.
   Three written questions +£50 (Answered by the same consultant) · 10-minute video call +£150 (Book a
   slot within 48 hours of your report).
3. **Where the report goes** — white card, two 48px inputs (radius 11px, `1.5px #D4DDE0`, teal focus
   ring) in a `minmax(240px, 1fr)` grid: "Your email" (`you@example.com`) and "Your GP's email
   (optional)" (`surgery@nhs.net`).

**Action row** (all steps) — `margin-top 30px`, 18px gap, wrapping: a 52px secondary **Back**
(hidden on step 1), a 52px primary next button, and a note in 13.5px `#5A6B77`.
- Step 1 → "Continue to step 2" / "Nothing is charged yet"
- Step 2 → "Continue to step 3" / "Nothing is charged yet"
- Step 3 → **"Pay £{total} and start the clock"** / "Card or Apple Pay · refunded in full if we miss the deadline"

Below: "Questions while you are here? Call **01438 904272**, 09:00–20:00, seven days."

**Sticky order summary** (`position: sticky; top: 24px`, 16px gap column)
- White card, `1px #E2E9EC`, radius 18px, `padding 26px 24px`. H2 16px/700 "Your order so far", then
  four rows (`padding 11px 0`, `border-bottom: 1px solid #E2E9EC`, baseline space-between): label 14px
  `#5A6B77` + value 14.5px/600. **Unresolved values show the step name in `#6C7C87`** ("Step 2",
  "Step 3") rather than a blank. Rows: Scan type · Body area · Consultant · Speed.
  Total row (`padding-top 18px`, no border): "Total" 15px/700 Montserrat + the amount in 26px/700
  `#0D6E70` `-0.02em`.
- `#E4F2F2` card, `1px #C3E0DE`, radius 18px, `padding 22px 24px`: 14px/1.6 `#06313A` "Rather do this
  with someone on the phone? We can take the whole order for you." + a 44px white outlined
  "Call us instead" → `tel:`.

**Total calculation** — `base + addons`, where base is the selected speed's price or **249** as a
fallback. When no speed is chosen the total renders as **"From £249"**; once chosen, "£{n}". Add-ons
sum in immediately.

---

## State management

Per-page state, all local to the page component. There is no cross-page persistence in the prototype
— **production must carry the order across steps and pages** (URL params, a server-side draft order,
or a client store), especially the specialist chosen on `Specialists` / `Specialist Profile` flowing
into Start-flow step 2.

**`index.html`**
```
slide: 0|1              // hero carousel index; 7000ms interval, wraps
paused: boolean         // set by pointer enter/leave on the slide wrapper
quickScan: string       // default 'MRI'
quickArea: string       // default 'brain'
openFaq: number         // default 0; -1 = all closed
```
Derived: slide opacity/transform/pointer-events per slide, dot widths, `quickMatch` string.

**`Specialists.dc.html`**
```
area: string            // default 'brain'; '' = all. Single-select, toggles off
modalities: string[]     // default []. Multi-select, AND logic
requested: string        // consultant name; '' = none. Cleared by any filter change
```
Derived: filtered + rank-sorted list, per-area counts, result heading, empty flag, per-card CTA label/colour.

**`Specialist Profile.dc.html`** — `requested: boolean` (drives the CTA label, its `#095458` fill, and the confirmation bar).

**`FAQs.dc.html`**
```
category: string        // '' = all
query: string           // free text
open: string            // faq id; '' = all closed
```
Derived: filtered list (category AND query), per-item sign/colours, empty flag.

**`Start Flow.dc.html`**
```
step: 1|2|3
files: [{ name, meta, progress }]
scanType: string        // default 'MRI'
area: string            // default 'brain' — drives the matched consultant
question: string
speed: '' | '48' | '24' | '12'   // no default
addons: string[]        // 'questions' | 'call'
```
Derived: eyebrow/title/subtitle, stepper badge states, file pill + progress width, matched consultant,
summary rows, total. Side effect: a 900ms upload-simulation interval, cleared on completion and unmount.

**`How It Works` / `Pricing` / `Sample Report`** — static content; no interactive state.

### Data fetching required in production

- Consultant roster (name, role, hospital, GMC, subspecialties, modalities, availability, portrait, turnaround medians).
- Live turnaround medians and availability windows (both are presented as real, current figures).
- Deadline dates in the pricing tiers and step 3 — **currently hard-coded strings** ("Report by Wed 5
  Aug, 4pm"). These must be computed server-side from the current time, the tier, and working-hours rules.
- Upload endpoint with resumable multi-GB support (DICOM folders, zips, ISOs; 4GB stated limit) and real progress.
- Order creation + payment (card / Apple Pay).
- FAQ and pricing content (both are good CMS candidates).

---

## Interactions & behaviour

### Navigation map

| From | Element | To |
| --- | --- | --- |
| all | logo | `index.html` |
| all | nav links | `How It Works`, `Specialists`, `Pricing`, `Sample Report`, `FAQs` |
| all | nav CTA "Start my second read" | `Start Flow` |
| home hero | "Start my second read" | `Start Flow` |
| home hero | "See a real sample report →" | `Sample Report` |
| home hero slide 2 | "Continue to upload" | `Start Flow` |
| home | "Read the detail on how it works" | `How It Works` |
| home | "Read a full sample report (PDF)" | `Sample Report` |
| How it works | "See pricing" | `Pricing` |
| Specialists | "Profile" | `Specialist Profile` |
| Start flow step 2 | "Choose someone else" | `Specialists` |
| all | phone / email | `tel:+441438904272`, `mailto:info@secondread.co.uk` |

Not yet wired (need routes or handlers): "Save and finish later", "Get a fixed quote", "Ask us
first", "Download the full sample (PDF)", "Choose" on the pricing table, "Continue to upload" on the
Specialists and Profile confirmation bars, and the footer legal links.

### Hover and press vocabulary

- **Cards** — `translateY(-3px … -6px)` + a deeper shadow; some also warm the border to `#C3E0DE`.
- **Icon medallions** — `scale(1.08) rotate(-4deg)`, or invert fill/colour.
- **Chips and pills** — fill and border shift to teal.
- **Buttons** — primary darkens to `#095458`; secondary shifts border and text to teal; all press with `translateY(1px)`.
- **Rows** — subtle `translateX(4–6px)` slide (bento checklist, consultant chip) or a `#FAFCFC` tint (table rows, accordion headers).
- **Decorative orbs** — slow `520ms` `scale` + `translate` drift, opacity lift.
- **Links** — shift to `#0D6E70` and underline (global `a:hover`).

### Focus and keyboard (must be completed in production)

Inputs have a proper teal focus ring. **Gaps to close:** custom button-based radios and checkboxes
need real `role="radio"` / `role="checkbox"` + `aria-checked` semantics or native inputs; accordions
need `aria-expanded` and `aria-controls`; the carousel needs `role="tablist"` + `aria-selected` on the
dots plus focus-pause; the stepper needs `aria-current="step"` and `aria-disabled` on forward steps.
Non-input interactive elements should carry a visible focus ring matching the input treatment.

### Motion preferences

Nothing currently respects `prefers-reduced-motion`. At minimum: stop the carousel autoplay, drop the
orb drifts, and reduce transforms to opacity-only.

---

## Responsive behaviour

`design/responsive.css` is the only real stylesheet and drives all of it. Because the designs are
inline-styled, it works by **attribute-targeted `!important` overrides**. Two mechanisms:

1. **`[data-r="…"]` hooks** on structural elements: `nav`, `navlinks`, `navcta`, `hero`, `heroslide`,
   `stats`, `pricetable`, and so on.
2. **Substring selectors on inline styles**, e.g. `[style*="grid-template-columns: 1.5fr 1fr"]`.

> **This approach is a prototype workaround, not a pattern to port.** In a real codebase, express
> these as ordinary responsive styles (breakpoint utilities, container queries, media queries in the
> component). The value to carry over is the **breakpoint behaviour** below.

Also global in that file: `img, svg, video { max-width: 100% }`, `-webkit-text-size-adjust: 100%`,
and unconditional `white-space: nowrap` on nav links.

| Breakpoint | Behaviour |
| --- | --- |
| **≤ 1180px** | Header is forced `nowrap` with `gap: 20px`; logo drops to 40px; nav links to 13.5px in a horizontally scrollable strip (scrollbar hidden); the phone number hides. This band exists so the bar never becomes two rows on a laptop or landscape tablet. |
| **≤ 1024px** | Two-column content grids collapse to one. Bento drops to 2 columns and the tall 01 tile stops spanning rows. Section padding reduces. |
| **≤ 860px** | Header wraps deliberately: nav links become their own full-width row (`order: 3`) below the logo and CTA. Hero becomes single-column and loses `min-height`; the specialists filter rail un-sticks and sits above the results; the order-summary sidebar un-sticks and moves below the step content; the pricing comparison table becomes horizontally scrollable with a `min-width: 720px` inner grid; footer goes to two columns. |
| **≤ 560px** | Display type steps down (hero H1 to ~32px, section H2 to ~26px); section padding to 44px; gutters to 20px; specialist grid to two-up with smaller avatars; scan-type and body-area option grids to a single column; footer to one column; the sample-report document reduces its 40px internal padding. Touch targets stay ≥44px. |

**Test matrix:** 1440 / 1280 / 1180 / 1024 / 900 / 860 / 768 / 640 / 560 / 430 / 390 / 360 wide.
Watch specifically for: the header staying one row above 860px, the pricing table scroll affordance,
the hero carousel height when slide 2's form is taller than slide 1, and the specialists row alignment
(the `min-height` values on name / pill / specialties).

---

## Content and compliance

**This is health content for UK patients. Everything below needs client sign-off before launch.**

- **Consultant identities** — all names, GMC numbers (`7012345` is a placeholder repeated across
  several profiles), hospitals, qualifications and "reports since" dates are invented. Real
  consultants must consent to being named and pictured.
- **Statistical claims** — "1 in 5 second reads change the original finding", "4.9 ★ across 120
  patient reviews", "14 UK consultants", the 90-day turnaround medians, and "Average answer time 40
  seconds" are all presented as fact and are currently unsourced.
- **Regulatory badges** — CQC registered, GMC · FRCR consultants, ICO · UK GDPR, "Indemnified to
  £10m" must be verified, and the CQC/ICO registration numbers should probably be displayed.
- **Policy promises** — the missed-deadline full refund, the bad-news phone call before report
  release, the free video call in that case, the "we chase the hospital via the Image Exchange
  Portal" commitment, "downloadable forever", and the data-access/deletion claims are all
  operational commitments written for the design.
- **Sample report** — the case, findings and signature are fictional. If a real anonymised report is
  used, written patient consent is required, as the page itself claims.
- **Clinical safety** — the emergency disclaimer appears in the footer of every page and in the FAQs
  contact block. Keep it prominent; consider surfacing it in the order flow too.
- **Payment and deadlines** — the checkout shows an exact date and time. That promise needs real
  working-hours logic, timezone handling for international patients (the copy says the deadline is
  shown in the patient's local time as well as UK time), and a refund mechanism.
- **Language** — British English throughout (*centre, organisation, optimise, programme*). Copy
  deliberately avoids contractions in reassurance lines ("Do not have your images?") — keep that voice.

---

## Assets

`design_handoff_secondread/assets/`

| File | Notes |
| --- | --- |
| `logo-secondread.svg` | The **SecondOpinion Radiology** lockup — mark plus two-line wordmark, `viewBox 0 0 2041 510` (4.00∶1). Navy `#00212D` with a `#29E6C4` ring, for light surfaces. Header 55 × 220, sample-report letterhead 46 × 184. Text is converted to outlines, because an SVG loaded through `<img>` cannot use a webfont. |
| `logo-secondread-light.svg` | The same lockup in `#FFFFFF` with a `#6FE3C5` ring, for the dark footer (61 × 244). |
| `hero-mri.png` | **Superseded.** The landing hero now uses `design/uploads/Generated image 1 (5).png`. Kept only because it is the asset the rest of this document was written against. |

> The copies of these two logos under `design/` are the ones the pages actually load. `assets/` holds
> the same files for anyone picking up the brand marks on their own.

`design/portraits/` — seven consultant headshots as `.jpg`, each named after the consultant it shows
(`senan-alsanjari.jpg`, `ramanan-rajakulasingam.jpg`, and so on). These are **real photographs of real
named consultants**; confirm you have the right to use each one before launch.

**Icons** — Lucide-style glyphs, hand-inlined as small SVG path arrays in each page's logic class
(`upload-cloud`, `user-search`, `file-text`, `zap`, `check`, `clock`, `scan-check`, `arrow-up-right`,
`lock`, `search`, `disc`, `hospital`, `globe`). No icon-font or CDN dependency. Swap for your icon
library — Lucide proper is the closest match, at `stroke-width: 2` (2.2–3 for small ticks).

**Fonts** — Montserrat + Inter from Google Fonts; IBM Plex Mono via the 31G token sheet. Self-host
for production.

`design/image-slot.js` — a drag-and-drop image-placeholder web component used for portraits on the
Specialists and Profile pages. **Prototype tooling; do not port.**

---

## Files

`design_handoff_secondread/design/`

| File | Route | Interactive |
| --- | --- | --- |
| `index.html` | `/` | Hero carousel, quick-start picker, FAQ accordion |
| `How It Works.dc.html` | `/how-it-works` | Hover-only |
| `Specialists.dc.html` | `/specialists` | Filters, sort, selection |
| `Specialist Profile.dc.html` | `/specialists/:slug` | Request toggle |
| `Pricing.dc.html` | `/pricing` | Hover-only |
| `Sample Report.dc.html` | `/sample-report` | Static |
| `FAQs.dc.html` | `/faqs` | Search, category filter, accordion |
| `Start Flow.dc.html` | `/start` | Full 3-step order flow |

Supporting: `responsive.css` (real CSS — read for breakpoint behaviour) · `support.js` (prototype
runtime — **do not port**) · `image-slot.js` (prototype tooling) · `portraits/` · `uploads/` ·
`_ds/` (the 31G Design System bundle and token sheets the pages link).

**To view the prototypes:** serve the `design/` folder over HTTP and open `index.html`. All pages are
linked, so you can click through the whole site including the order flow.

**Reading the source:** each page is one file — template markup first, then a `<script>` with the
state class at the bottom. The state class is the clearest specification of the interactive logic;
read it alongside the template.

---

## Suggested build order

1. **Tokens and chrome** — palette, type scale, spacing, shadows; then header, footer, breadcrumbs, and the button/chip/card primitives. Everything else composes from these.
2. **Static pages** — How it works, Pricing, Sample report. Fastest fidelity win, and they exercise most of the primitives.
3. **Landing page** — the hero carousel is the most involved piece; build the two slides as separate components and treat the carousel as a shell.
4. **Specialists + Profile** — needs the consultant data model, which Start-flow step 2 also depends on.
5. **FAQs** — self-contained; a good place to introduce the CMS if there is one.
6. **Start flow** — last, since it needs the data model, real upload, deadline computation and payment.
7. **Accessibility and reduced-motion pass** across all of it — see the gaps flagged above.

## Still to design

- **Contact page** (a "Contact us" route is implied by the phone/email treatment but has no page).
- **Post-payment**: order confirmation, upload-in-progress state, report-ready notification, and the patient's report-viewing account.
- **Legal pages**: Privacy & UK GDPR, Accessibility, Terms (footer links are placeholders).
- **Error, empty and loading states** for the flow (failed upload, unreadable DICOM, payment failure).
- **Mobile navigation** — the current approach scrolls the link strip; a drawer or menu may be preferable below 640px.
