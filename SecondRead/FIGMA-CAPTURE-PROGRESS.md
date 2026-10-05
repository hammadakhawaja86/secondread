# Figma capture progress — SecondRead prototype

File: https://www.figma.com/design/2SJcEzj0s6HNv9OD4130bO/SOR
Section: `103:247` "website app design" · page `74:10` ("Website Design")
Section now holds **28 named frames**. Nothing is unnamed.

## Captured by Hammad, manually via the plugin toolbar — 1723px wide (17)

Covers the ordering flow and the portal, including states a single capture
per page would have missed.

| Frame | Node |
| --- | --- |
| Landing | 103:248 |
| Sign In | 103:1406 |
| Sign In · code sent | 103:1598 |
| Dashboard | 103:1710 |
| Account | 103:4764 |
| Case | 103:5244 |
| Start Flow · gate, your details | 103:5612 |
| Start Flow · gate, email already exists | 103:5690 |
| Start Flow · gate, enter code | 103:5773 |
| Start Flow · step 1 upload (a/b/c) | 103:5846 · 103:6258 · 103:6686 |
| Start Flow · step 2 your case (a/b/c) | 103:7097 · 103:7554 · 103:8010 |
| Start Flow · step 3 your report | 103:8470 |
| Start Flow · order confirmed | 103:8825 |

## Captured by Claude — 1920px wide (8), row at y = 1205

Landing `114:2` · How It Works `112:2` · Specialists `111:2` ·
Specialist Profile `113:2` · Pricing `115:2` · Sample Report `117:2` ·
Meet the Team `118:2` · FAQs `116:2`

## Parked — 1110px (3), row at y = 10624

`106:2` Landing (superseded, safe to delete) · `107:2` Start Flow step 2 ·
`108:2` Dashboard

## Gaps

**No capture at any width (5):** Privacy · Terms · Accessibility ·
Create Account · Report

**Mobile 375: none captured yet (18 pages).**

**Width mismatch:** the manual set is 1723px, the Claude set is 1920px.
Landing exists at 1110, 1723 and 1920. Decide one desktop width before the
next pass — recapturing the 17 at 1920 is the larger job, so adopting 1723
as the desktop width is the cheaper path if that is acceptable.

---

## How to resume

1. Rebuild the capture copy (the real source is never modified):
   copy `SecondRead/design_handoff_secondread/design/` to a scratch dir,
   inject after `<head>` in each `*.html`:
   `<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>`
   then serve it from a `.claude/launch.json` entry on port 4188.
2. Navigate a tab first, *then* resize — a blank tab cannot take a viewport.
3. Portal pages need a session. Once per origin:
   `PORTAL.reset(); PORTAL.seed(); PORTAL.signIn();`
   plus a `secondread:draft:v1` entry with `step: 2` for the Start Flow form.
4. Per page: `generate_figma_design` (fileKey only) → navigate to
   `<url>#figmacapture=<id>&figmaendpoint=<encoded>&figmadelay=3500` → poll.

### Three gotchas, each of which cost time

- **Background tabs throttle the delayed auto-capture.** A capture stuck on
  `pending` usually just never fired. Trigger it in that tab and do NOT await:
  `window.figma.captureForDesign({captureId, endpoint, selector:'body'}); 'fired'`
  Awaiting blocks past the 45s tool timeout even though the capture succeeds.
- **`nodeId` on `generate_figma_design` does not nest the frame.** Captures
  land loose; move them in afterwards with `use_figma` + `section.appendChild`.
- **Every capture arrives named "Document".** Rename in the same pass, or the
  section becomes unreadable. Identify a frame by querying its TEXT nodes and
  reading past the first ~8 (those are shared nav chrome).

---

## Admin console — section `130:7` "Admin"

| Frame | Node | Source |
| --- | --- | --- |
| Admin 1920 — Dashboard | 136:2 | `design/Admin.dc.html` |
| Admin 1920 — Manage users | 138:2 | `design/Admin Users.dc.html` |
| Admin 1920 — Profile | 139:2 | `design/Admin Profile.dc.html` |

All three are 1920 × 1080 exactly, laid out in a row at y = 240.
Plain static HTML — no `support.js` runtime — so captures are deterministic.
Shared chrome and styling live in `design/admin.css`. Built to the MSA layout the client
supplied, in SecondRead's own palette and type.

Not linked from any nav. It is reachable by URL if the branch is deployed.

### Gotcha found here

Figma's importer **drops `stroke-dashoffset`**, so a donut drawn as dashed
circle strokes arrives with its segments scrambled. Draw ring charts as filled
annulus-sector `<path>` elements (`M … A … L … A … Z`) instead — those import
as real vectors. The generator for this one is inline in `Admin.dc.html`.

Also: firing `captureForDesign` more than once against the same capture ID
wedges it permanently. If a capture stalls, take a fresh ID and reload the
page clean rather than re-firing.
