/* Second Opinion Radiology, patient portal store.
 *
 * Single source of truth for the signed-in patient, their cases and their
 * reports. Loaded as a plain synchronous script BEFORE support.js so that
 * window.PORTAL exists by the time any component renders.
 *
 * DEMO BUILD. There is no server and no real authentication. Accounts are
 * passwordless: a six-digit code stands in for the emailed one, and it is
 * generated here and shown on screen because there is no mail server.
 * Everything lives in localStorage on this device, and every portal page
 * carries a visible notice saying so. Nothing here is a security boundary.
 *
 * CONTENT STATUS, for the client:
 *   · The two delivered reports are written demonstration content. They are
 *     not real reports and describe no real patient.
 *   · Radiologist names and GMC numbers come from consultants.js.
 */
(function (root) {
  'use strict';

  var KEY = 'secondread:portal:v3';
  var HOUR = 3600 * 1000;

  /* ---------------------------------------------------------------- statuses
   * The six patient-facing states. Every case maps to exactly one. Nothing
   * here hints at a clinical finding: "Under review" reads the same for a
   * normal scan and an urgent one.
   */
  var STATUS = {
    action: {
      id: 'action',
      chip: 'Action needed',
      title: 'Action needed',
      support: 'We need one thing from you before we can carry on. It only takes a minute.',
      position: 0,
      action: "See what's needed",
      bg: '#FDF2E2', fg: '#8A5712', border: '#E7CB97',
      dot: '#C68A2E'
    },
    submitted: {
      id: 'submitted',
      chip: 'Submitted',
      title: "We've got everything",
      support: "Your scan and details are safely with us. We're getting your case ready for a radiologist.",
      position: 1,
      action: 'View your case',
      bg: '#EEF2F4', fg: '#4A5C68', border: '#D4DDE0',
      dot: '#5A6B77'
    },
    matching: {
      id: 'matching',
      chip: 'Being assigned',
      title: 'Finding the right specialist',
      support: 'Your scan is being assigned to a radiologist who specialises in this part of the body.',
      position: 2,
      action: 'View your case',
      bg: '#E4F2F2', fg: '#095458', border: '#C3E0DE',
      dot: '#0D6E70'
    },
    review: {
      id: 'review',
      chip: 'Under expert review',
      title: 'Your radiologist is reviewing your scan',
      support: 'They are reading your images in full.',
      position: 3,
      action: 'View your case',
      bg: '#E4F2F2', fg: '#095458', border: '#C3E0DE',
      dot: '#0D6E70'
    },
    ready: {
      id: 'ready',
      chip: 'Report ready',
      title: 'Your second opinion is ready',
      support: "Your radiologist's full report is here, with a plain-English explanation of what it means.",
      position: 4,
      action: 'Read my report',
      bg: '#E3F3EA', fg: '#1F6B45', border: '#B7DEC8',
      dot: '#2C8759'
    },
    followup: {
      id: 'followup',
      chip: 'Follow-up available',
      title: 'Questions about your report?',
      support: 'You can send written questions to your radiologist, or book a call.',
      position: 4,
      action: 'Ask a question',
      bg: '#EEF2F4', fg: '#4A5C68', border: '#D4DDE0',
      dot: '#5A6B77'
    }
  };

  /* The four tracked stages, named exactly as they are named on the website,
   * in the confirmation screen and in the emails. "Action needed" sits outside
   * the rail because it is a pause, not a stage, the case keeps the position
   * it had when it stopped. "Follow-up available" sits after the rail is full.
   */
  var TIMELINE = ['Submitted', 'Being assigned', 'Under expert review', 'Report ready'];

  /* -------------------------------------------------------- comparison keys
   * A closed clinical vocabulary. The radiologist picks one; the label they
   * pick is the exact label the patient reads. No other value is valid.
   */
  var CATEGORY = {
    confirms:    { label: 'Confirms original finding', tone: 'good',    bg: '#E3F3EA', fg: '#1F6B45', border: '#B7DEC8' },
    clarifies:   { label: 'Clarifies finding',         tone: 'neutral', bg: '#E4F2F2', fg: '#095458', border: '#C3E0DE' },
    additional:  { label: 'Additional finding',        tone: 'notable', bg: '#FDF2E2', fg: '#8A5712', border: '#E7CB97' },
    differing:   { label: 'Differing interpretation',  tone: 'notable', bg: '#FDF2E2', fg: '#8A5712', border: '#E7CB97' },
    no_material: { label: 'No material difference identified', tone: 'good', bg: '#E3F3EA', fg: '#1F6B45', border: '#B7DEC8' },
    interval:    { label: 'Change since your earlier scan', tone: 'neutral', bg: '#E4F2F2', fg: '#095458', border: '#C3E0DE' }
  };

  /* One turnaround, one standard fee. Older cases may still carry speed '24'
     or '12' from before the single-turnaround pricing; they fall back to the
     48-hour entry rather than losing their label. */
  var SPEEDS = {
    '48': { label: '48 hours', hours: 48, price: 250 }
  };

  var STANDARD_FEE = 250;
  var COMPARISON_FEE = 50;

  var AREA_LABELS = {
    brain: 'Brain or spine',
    chest: 'Chest or heart',
    bones: 'Bones or joints',
    abdomen: 'Abdomen or pelvis',
    breast: 'Breast',
    headneck: 'Head or neck'
  };

  /* -------------------------------------------------------------- seed data
   * Offsets are in hours from "now", recomputed on every read, so the demo
   * never shows stale dates however long it sits between showings.
   */
  function seed() {
    return {
      signedIn: false,
      // Emails that already belong to an account. Starting a case with one of
      // these is not an error to recover from. It is a sign-in.
      accounts: ['hammad.khawaja@31g.co.uk'],
      pending: null,
      user: {
        // "Hammad A." is the first-name field so that the full display name
        // reads "Hammad A. Khawaja" while the greeting still shortens to
        // "Hammad" and the avatar still reads HK.
        firstName: 'Hammad A.',
        lastName: 'Khawaja',
        email: 'hammad.khawaja@31g.co.uk',
        dob: '4 September 1971',
        phone: '07700 900412',
        country: 'United Kingdom'
      },
      cases: [
        {
          ref: 'SR-2026-4417',
          status: 'action',
          resumeStatus: 'review',
          scan: 'MRI',
          area: 'brain',
          consultant: 'mallon',
          speed: '24',
          createdOffsetH: -9,
          scanDate: 'March 2026',
          provider: 'Spire Harpenden Hospital',
          question: 'The report mentions a small area of high signal in my brain. I want to know whether it explains my headaches, and whether it is anything to worry about.',
          hasOriginalReport: true,
          priorStudy: null,
          demo: true,
          tasks: [
            {
              id: 't1',
              title: 'Your radiologist needs one more thing',
              body: 'Dr Mallon has started reviewing your scan and needs a little more information before finishing your report.',
              ask: 'When did your headaches first start, and have they changed in the last three months?',
              placeholder: 'For example: they started around November, and have been worse in the mornings since February.'
            }
          ],
          messages: [
            { from: 'Second Opinion Radiology clinical team', role: 'team', offsetH: -8.5, text: 'Thanks. Your images came through complete and readable. Your case has been assigned to Dr Mallon, consultant neuroradiologist.' }
          ],
          report: null,
          comparison: null
        },
        {
          ref: 'SR-2025-8830',
          status: 'ready',
          scan: 'CT',
          area: 'chest',
          consultant: 'alsanjari',
          speed: '48',
          createdOffsetH: -122,
          deliveredOffsetH: -74,
          opened: false,
          scanDate: 'November 2025',
          provider: 'Royal Free Hospital',
          question: 'My report mentions a nodule in my right lung. Is it serious, and does it need another scan?',
          hasOriginalReport: true,
          priorStudy: null,
          demo: true,
          tasks: [],
          messages: [
            { from: 'Second Opinion Radiology clinical team', role: 'team', offsetH: -120, text: 'Your images and original report are with Dr Al-Sanjari. Your report is due within 48 hours.' }
          ],
          report: {
            inShort: 'The nodule in your right lung is there, and your radiologist agrees with the original description of it. Its appearance is the kind that is very unlikely to be cancer, and the recommended next step is a single repeat scan in twelve months rather than anything sooner.',
            clinicalHistory: 'Incidental pulmonary nodule identified on CT performed for investigation of a persistent cough. No smoking history. No weight loss.',
            technique: 'Non-contrast volumetric CT of the thorax, 1 mm reconstructions, reviewed on lung and mediastinal windows. Multiplanar reformats reviewed.',
            findings: [
              'There is a solid nodule in the posterior segment of the right upper lobe measuring 5.8 x 5.1 mm on the axial plane (previously reported as "approximately 6 mm"). The margins are smooth and well defined. There is no spiculation, no pleural tag and no cavitation.',
              'The nodule contains a small focus of dense, uniform calcification centrally. This pattern of calcification was not commented on in the original report.',
              'No other pulmonary nodules are identified on review of the full volume.',
              'The airways are patent to segmental level. There is no consolidation, no pleural effusion and no pneumothorax.',
              'Mediastinal and hilar nodes are not enlarged by size criteria. The largest right hilar node measures 7 mm in short axis.',
              'The visualised upper abdomen, thoracic skeleton and chest wall are unremarkable.'
            ],
            impression: [
              'Solitary 5.8 mm solid right upper lobe nodule with smooth margins and central benign-pattern calcification.',
              'The calcification pattern is characteristic of a healed granuloma and carries a very low probability of malignancy.',
              'Interval CT at 12 months is sufficient. Shorter-interval imaging is not indicated on radiological grounds.'
            ],
            meansForYou: [
              'You have one small spot in the upper part of your right lung, just under 6 mm across, about the size of a grain of rice. It is really there; this is not something the first scan got wrong.',
              'What your radiologist was able to add is the reason it looks the way it does. There is a small patch of calcium, essentially chalk, sitting in the middle of it. Calcium in that pattern is the fingerprint of an old, healed infection that your body dealt with, very possibly years ago without you knowing. It is not the pattern that lung cancers make.',
              'The edges matter too. This nodule has smooth, clean borders. The nodules that worry radiologists tend to have spiky, irregular edges that reach into the surrounding lung. Yours does not.',
              'That is why your radiologist is comfortable recommending a single check-up scan in a year rather than in three months. The one-year scan is there to confirm it has stayed the same, which is what is expected.'
            ],
            nextSteps: [
              { n: '1', text: 'Share this report with your GP or the doctor who ordered your original scan.' },
              { n: '2', text: 'Ask them to arrange a repeat CT of the chest in 12 months.' },
              { n: '3', text: 'No scan is needed sooner than that on the basis of these images.' },
              { n: '4', text: 'If you develop a cough that will not settle, cough up blood, or lose weight without trying, see your GP without waiting for the 12-month scan.' }
            ]
          },
          comparison: {
            available: true,
            overallOutcome: 'clarifies',
            overallSummary: 'Your radiologist found the same nodule the original report described, and agrees it is there. What they were able to add is a specific feature, the pattern of calcium inside it, that makes it very unlikely to be anything serious, and that changes how often it needs checking.',
            original: {
              sourceLabel: 'Supplied by you',
              providerName: 'Royal Free Hospital',
              reportDate: '14 November 2025',
              verbatim: 'CT THORAX. There is a small solid nodule in the right upper lobe measuring approximately 6 mm. No other nodules are seen. No lymphadenopathy. No pleural effusion. IMPRESSION: Indeterminate 6 mm right upper lobe pulmonary nodule. Recommend interval CT in 3 months to assess for growth.'
            },
            items: [
              {
                region: 'Right upper lobe nodule, presence and size',
                before: 'A small solid nodule in the right upper lobe measuring approximately 6 mm.',
                found: 'A solid nodule in the posterior segment of the right upper lobe measuring 5.8 x 5.1 mm, with smooth, well-defined margins.',
                category: 'confirms',
                differenceNote: '',
                meansForYou: 'Both radiologists see the same thing in the same place, at the same size. The measurement is simply more precise here because it was taken on thin reconstructions.'
              },
              {
                region: 'Pattern of calcification',
                before: 'Not mentioned.',
                found: 'A small focus of dense, uniform central calcification within the nodule, a pattern characteristic of a healed granuloma.',
                category: 'additional',
                differenceNote: 'This feature is visible on the original images but is not described in the original report. It is the single most useful piece of information about this nodule, because central calcification of this type is strongly associated with a benign cause.',
                meansForYou: 'This is the finding that does the work in your report. The calcium sitting in the middle of the nodule is the sign of an old infection your body has already healed. It is not what a cancer looks like.'
              },
              {
                region: 'Recommended interval for a repeat scan',
                before: 'Recommend interval CT in 3 months to assess for growth.',
                found: 'Interval CT at 12 months is sufficient. Shorter-interval imaging is not indicated on radiological grounds.',
                category: 'differing',
                differenceNote: 'The original recommendation is the correct and appropriate one for a nodule described as indeterminate. Once the benign calcification pattern is taken into account, published guidance supports a longer interval. Both recommendations are reasonable readings of the images; they differ because they rest on different characterisations of the nodule.',
                meansForYou: 'You were told to come back in three months. Your radiologist thinks a year is enough, because of the calcium pattern. This is a judgement call between two specialists, not a mistake, take this report to your doctor and decide together.'
              },
              {
                region: 'Rest of the chest',
                before: 'No other nodules are seen. No lymphadenopathy. No pleural effusion.',
                found: 'No other pulmonary nodules on review of the full volume. No nodes enlarged by size criteria. No effusion, consolidation or pneumothorax.',
                category: 'confirms',
                differenceNote: '',
                meansForYou: 'The rest of your chest is clear, and both reads agree on that.'
              }
            ]
          }
        },
        {
          ref: 'SR-2025-6104',
          status: 'followup',
          scan: 'MRI',
          area: 'bones',
          consultant: 'rajakulasingam',
          speed: '24',
          createdOffsetH: -2900,
          deliveredOffsetH: -2876,
          opened: true,
          scanDate: 'July 2025',
          provider: 'Nuffield Health Brentwood',
          question: 'I was told I have a meniscal tear and need surgery. Is that definitely what the scan shows?',
          hasOriginalReport: true,
          priorStudy: null,
          demo: true,
          tasks: [],
          messages: [],
          report: {
            inShort: 'Your radiologist read your knee MRI independently and reached the same conclusions as the original report. There is a tear in the back part of the inner meniscus, and the rest of the knee is in good condition. Nothing was found that changes the picture you were given.',
            clinicalHistory: 'Medial-sided right knee pain following a twisting injury. Locking reported. Query meniscal tear.',
            technique: 'MRI right knee, 1.5T. Sagittal, coronal and axial proton density and fat-suppressed sequences reviewed.',
            findings: [
              'There is a horizontal-oblique tear of the posterior horn of the medial meniscus, extending to the inferior articular surface. The tear measures approximately 11 mm in length.',
              'The meniscal body and anterior horn are intact. The lateral meniscus is intact throughout.',
              'The anterior and posterior cruciate ligaments are intact and of normal signal. The collateral ligaments are intact.',
              'Articular cartilage is preserved over the femoral condyles, tibial plateaux and patella, with no full-thickness defect.',
              'There is a small joint effusion. No Baker cyst. No marrow oedema and no fracture.'
            ],
            impression: [
              'Horizontal-oblique tear of the posterior horn of the medial meniscus, surfacing inferiorly.',
              'No cruciate or collateral ligament injury. Cartilage preserved.',
              'Small joint effusion, in keeping with the reported symptoms.'
            ],
            meansForYou: [
              'There is a tear in the back section of the meniscus on the inner side of your right knee. The meniscus is a C-shaped pad of cartilage that acts as a shock absorber between the two bones of the knee joint.',
              'The tear runs sideways through the pad and reaches the underneath surface. That is the type of tear that can catch as the knee moves, which fits the locking you described.',
              'The good news in this scan is everything that is not damaged. Your cruciate ligaments, the ones that hold the knee stable and that take much longer to recover from, are intact. Your cartilage surfaces are in good condition for your age, with no worn-through areas. The other meniscus is fine.',
              'Whether this needs an operation is a decision for your surgeon rather than a radiologist, and it depends on your symptoms as much as on the scan. What this report can tell you is that the scan finding is real, it is the only significant finding, and the rest of the knee is in a good state to recover.'
            ],
            nextSteps: [
              { n: '1', text: 'Take this report to your orthopaedic surgeon at your next appointment.' },
              { n: '2', text: 'Ask them specifically whether a trial of physiotherapy is reasonable before surgery, given that your cartilage and ligaments are intact.' },
              { n: '3', text: 'No further imaging is needed to make that decision.' }
            ]
          },
          comparison: {
            available: true,
            overallOutcome: 'no_material',
            overallSummary: 'Your radiologist reviewed your images independently and reached the same conclusions as the original report. That is a meaningful result: two specialists, working separately, agree on what your scan shows.',
            original: {
              sourceLabel: 'Supplied by you',
              providerName: 'Nuffield Health Brentwood',
              reportDate: '22 July 2025',
              verbatim: 'MRI RIGHT KNEE. Horizontal tear posterior horn medial meniscus extending to the inferior surface. Cruciate and collateral ligaments intact. Articular cartilage preserved. Small joint effusion. IMPRESSION: Medial meniscal tear. Orthopaedic referral advised.'
            },
            items: [
              {
                region: 'Medial meniscus',
                before: 'Horizontal tear posterior horn medial meniscus extending to the inferior surface.',
                found: 'Horizontal-oblique tear of the posterior horn of the medial meniscus, surfacing inferiorly, approximately 11 mm in length.',
                category: 'confirms',
                differenceNote: '',
                meansForYou: 'Both radiologists describe the same tear, in the same place, reaching the same surface. The length measurement is added detail, not a different finding.'
              },
              {
                region: 'Ligaments',
                before: 'Cruciate and collateral ligaments intact.',
                found: 'Anterior and posterior cruciate ligaments intact and of normal signal. Collateral ligaments intact.',
                category: 'confirms',
                differenceNote: '',
                meansForYou: 'The ligaments that hold your knee stable are undamaged, on both reads.'
              },
              {
                region: 'Cartilage surfaces',
                before: 'Articular cartilage preserved.',
                found: 'Cartilage preserved over the femoral condyles, tibial plateaux and patella, with no full-thickness defect.',
                category: 'confirms',
                differenceNote: '',
                meansForYou: 'No wear-through anywhere in the joint. This is the finding that matters most for how well a knee recovers.'
              }
            ]
          }
        }
      ]
    };
  }

  /* ------------------------------------------------------------ persistence */
  function load() {
    var raw = null;
    try { raw = root.localStorage.getItem(KEY); } catch (e) {}
    if (!raw) return seed();
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.cases)) return seed();
      if (!Array.isArray(parsed.accounts)) parsed.accounts = [];
      if (typeof parsed.pending === 'undefined') parsed.pending = null;
      return parsed;
    } catch (e) {
      return seed();
    }
  }

  function save(state) {
    try { root.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    return state;
  }

  function reset() {
    try { root.localStorage.removeItem(KEY); } catch (e) {}
    return seed();
  }

  /* ------------------------------------------------------------------ dates */
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];

  function clock(d) {
    var h = d.getHours();
    var m = d.getMinutes();
    var suffix = h < 12 ? 'am' : 'pm';
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + ':' + (m < 10 ? '0' : '') + m + ' ' + suffix;
  }

  // "Friday 15 March, 4:00 pm", an absolute moment, never a countdown.
  function fmtLong(d) {
    return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ', ' + clock(d);
  }

  // "14 Mar 2026"
  function fmtShort(d) {
    return d.getDate() + ' ' + MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear();
  }

  // "2 days ago", only ever used for things that have already happened.
  function fmtAgo(d) {
    var mins = Math.round((Date.now() - d.getTime()) / 60000);
    if (mins < 2) return 'just now';
    if (mins < 60) return mins + ' minutes ago';
    var hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs === 1 ? '1 hour ago' : hrs + ' hours ago';
    var days = Math.round(hrs / 24);
    if (days < 31) return days === 1 ? 'yesterday' : days + ' days ago';
    var months = Math.round(days / 30);
    return months === 1 ? 'last month' : months + ' months ago';
  }

  function at(offsetH) { return new Date(Date.now() + offsetH * HOUR); }

  /* --------------------------------------------------------------- decorate
   * Turns a stored case into everything a view needs: resolved radiologist,
   * resolved status, live dates. Stored data stays minimal; this is where the
   * derived values live, so no view has to recompute them.
   */
  function created(c) {
    return typeof c.createdOffsetH === 'number' ? at(c.createdOffsetH) : new Date(c.createdISO);
  }

  function delivered(c) {
    if (typeof c.deliveredOffsetH === 'number') return at(c.deliveredOffsetH);
    if (c.deliveredISO) return new Date(c.deliveredISO);
    return null;
  }

  // The deadline, with any paused time added back on. A case sitting in
  // "Action needed" is not burning its own clock, §4.6 of the spec.
  function due(c) {
    var speed = SPEEDS[c.speed] || SPEEDS['48'];
    var base = created(c).getTime() + speed.hours * HOUR;
    if (c.pausedMs) base += c.pausedMs;
    if (c.status === 'action') base += Date.now() - (c.pausedAt || Date.now());
    return new Date(base);
  }

  function decorate(c) {
    var st = STATUS[c.status] || STATUS.submitted;
    var doc = (root.CONSULTANT_BY_ID || {})[c.radiologist] || null;
    var speed = SPEEDS[c.speed] || SPEEDS['48'];
    var createdAt = created(c);
    var deliveredAt = delivered(c);
    var dueAt = due(c);
    var isDelivered = c.status === 'ready' || c.status === 'followup';
    // A paused case has not lost its place: the timeline shows the step it
    // stopped at, not an empty rail.
    var pos = c.status === 'action'
      ? ((STATUS[c.resumeStatus] || STATUS.review).position)
      : st.position;
    // Time left on the clock once the patient replies.
    var leftMs = createdAt.getTime() + speed.hours * HOUR - Date.now();
    var leftH = Math.max(1, Math.round(leftMs / HOUR));

    return {
      raw: c,
      ref: c.ref,
      status: st,
      statusId: c.status,
      position: pos,
      remainingLabel: leftH === 1 ? 'About 1 hour left once you reply'
        : 'About ' + leftH + ' hours left once you reply',
      isDelivered: isDelivered,
      isActive: !isDelivered,
      needsAction: c.status === 'action' && (c.tasks || []).length > 0,
      consultant: doc,
      consultantName: doc ? 'Dr ' + doc.name : 'Being assigned',
      consultantSurname: doc ? 'Dr ' + doc.name.split(' ').slice(-1)[0] : 'your radiologist',
      consultantRole: doc ? doc.role : '',
      scan: c.scan,
      areaLabel: AREA_LABELS[c.area] || 'Not specified',
      scanLine: c.scan + ' · ' + (AREA_LABELS[c.area] || 'Not specified'),
      speedLabel: speed.label,
      price: speed.price,
      createdAt: createdAt,
      createdShort: fmtShort(createdAt),
      dueAt: dueAt,
      dueLong: fmtLong(dueAt),
      deliveredAt: deliveredAt,
      deliveredShort: deliveredAt ? fmtShort(deliveredAt) : '',
      deliveredLong: deliveredAt ? fmtLong(deliveredAt) : '',
      deliveredAgo: deliveredAt ? fmtAgo(deliveredAt) : '',
      scanDate: c.scanDate || '',
      provider: c.provider || '',
      symptoms: c.symptoms || '',
      symptomsOnset: c.symptomsOnset || '',
      symptomsChange: c.symptomsChange || '',
      history: c.history || '',
      hasOriginalReport: c.hasOriginalReport !== false,
      priorStudy: c.priorStudy || null,
      clinician: c.clinician || null,
      tasks: c.tasks || [],
      messages: (c.messages || []).map(function (m) {
        var when = typeof m.offsetH === 'number' ? at(m.offsetH) : new Date(m.ts);
        return { from: m.from, role: m.role, text: m.text, ago: fmtAgo(when), when: when };
      }),
      report: c.report,
      comparison: c.comparison,
      outcome: c.comparison && c.comparison.available
        ? (CATEGORY[c.comparison.overallOutcome] || CATEGORY.clarifies)
        : null,
      caseHref: 'Case.dc.html?ref=' + encodeURIComponent(c.ref),
      reportHref: 'Report.dc.html?ref=' + encodeURIComponent(c.ref)
    };
  }

  /* -------------------------------------------------------- account journey
   * A patient never chooses a password. Starting a case creates a *pending*
   * account from a name and an email address; we send a six-digit code to that
   * address; the account becomes real only once the code comes back. The draft
   * case is held against the pending account from that moment, so closing the
   * tab halfway through an upload never loses it.
   *
   * DEMO BUILD: the code is generated here and shown on screen because there is
   * no mail server. A real build sends it and never returns it to the browser.
   */
  function normaliseEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function hasAccount(email) {
    var e = normaliseEmail(email);
    if (!e) return false;
    return load().accounts.indexOf(e) !== -1;
  }

  // { ok: true, code }, or { ok: false, reason: 'exists' } when the address is
  // already an account, which the caller turns into a sign-in prompt.
  function startPending(first, last, email) {
    var e = normaliseEmail(email);
    var s = load();
    if (s.accounts.indexOf(e) !== -1) return { ok: false, reason: 'exists' };
    var code = String(Math.floor(Math.random() * 900000) + 100000);
    s.pending = {
      firstName: String(first || '').trim(),
      lastName: String(last || '').trim(),
      email: e,
      code: code,
      sentISO: new Date().toISOString()
    };
    save(s);
    return { ok: true, code: code };
  }

  // Signing in uses the same one-time code, so there is one mechanism and one
  // set of screens rather than a password path bolted alongside.
  function startSignIn(email) {
    var e = normaliseEmail(email);
    var s = load();
    if (s.accounts.indexOf(e) === -1) return { ok: false, reason: 'unknown' };
    var code = String(Math.floor(Math.random() * 900000) + 100000);
    s.pending = { mode: 'signin', email: e, code: code, sentISO: new Date().toISOString() };
    save(s);
    return { ok: true, code: code };
  }

  function pending() { return load().pending; }

  // Re-issues the code without disturbing the draft case behind it.
  function resendCode() {
    var s = load();
    if (!s.pending) return null;
    s.pending.code = String(Math.floor(Math.random() * 900000) + 100000);
    s.pending.sentISO = new Date().toISOString();
    save(s);
    return s.pending.code;
  }

  function verifyPending(code) {
    var s = load();
    if (!s.pending) return { ok: false, reason: 'none' };
    if (String(code || '').replace(/\s/g, '') !== s.pending.code) {
      return { ok: false, reason: 'code' };
    }
    if (s.pending.mode !== 'signin') {
      s.user.firstName = s.pending.firstName || s.user.firstName;
      s.user.lastName = s.pending.lastName || s.user.lastName;
    }
    s.user.email = s.pending.email;
    if (s.accounts.indexOf(s.pending.email) === -1) s.accounts.push(s.pending.email);
    s.pending = null;
    s.signedIn = true;
    save(s);
    return { ok: true };
  }

  function cancelPending() {
    var s = load();
    s.pending = null;
    return save(s);
  }

  /* ----------------------------------------------------------------- actions */

  function signIn(email) {
    var s = load();
    s.signedIn = true;
    if (email) {
      var e = normaliseEmail(email);
      s.user.email = e;
      if (s.accounts.indexOf(e) === -1) s.accounts.push(e);
    }
    return save(s);
  }

  function signOut() {
    var s = load();
    s.signedIn = false;
    return save(s);
  }

  function isSignedIn() { return !!load().signedIn; }

  // Called by Start Flow when an order is placed. This is what makes the
  // checkout and the dashboard one continuous journey rather than two demos.
  function addCase(order) {
    var s = load();
    s.signedIn = true;
    var messages = [{
      from: 'Second Opinion Radiology clinical team',
      role: 'team',
      ts: new Date().toISOString(),
      text: 'Thanks. We have everything we need. We are checking your images are complete and readable, then assigning your case to a radiologist.'
    }];
    // An invited clinician is a real dependency, not a nicety: the case does
    // not move to assignment until their section is in, so say so here.
    if (order.clinician && order.clinician.mode !== 'self' && order.clinician.email) {
      messages.push({
        from: 'Second Opinion Radiology clinical team',
        role: 'team',
        ts: new Date().toISOString(),
        text: 'We have sent a secure, single-case link to ' + order.clinician.email +
              '. It is valid for seven days and gives access to this case only.'
      });
    }
    s.cases.unshift({
      ref: order.ref,
      status: 'submitted',
      scan: order.scan || 'MRI',
      area: order.area || 'brain',
      consultant: order.radiologist || '',
      speed: order.speed || '48',
      createdISO: new Date().toISOString(),
      scanDate: order.scanDate || '',
      provider: order.provider || '',
      question: order.question || '',
      symptoms: order.symptoms || '',
      symptomsOnset: order.symptomsOnset || '',
      symptomsChange: order.symptomsChange || '',
      history: order.history || '',
      hasOriginalReport: order.hasOriginalReport !== false,
      priorStudy: order.priorStudy || null,
      // 'self' | 'invite' | 'both', see the clinician invite in the case flow.
      clinician: order.clinician || null,
      demo: false,
      tasks: [],
      messages: messages,
      report: null,
      comparison: null
    });
    save(s);
    return s;
  }

  function getCase(ref) {
    var s = load();
    for (var i = 0; i < s.cases.length; i++) {
      if (s.cases[i].ref === ref) return decorate(s.cases[i]);
    }
    return null;
  }

  function allCases() {
    return load().cases.map(decorate);
  }

  // Answering a task restarts the clock and banks the paused time, so the new
  // deadline is honest rather than silently shortened.
  function answerTask(ref, taskId, answer) {
    var s = load();
    for (var i = 0; i < s.cases.length; i++) {
      var c = s.cases[i];
      if (c.ref !== ref) continue;
      c.tasks = (c.tasks || []).filter(function (t) { return t.id !== taskId; });
      c.messages = c.messages || [];
      c.messages.push({
        from: (s.user.firstName || 'You'),
        role: 'patient',
        ts: new Date().toISOString(),
        text: answer
      });
      if (c.tasks.length === 0 && c.status === 'action') {
        c.status = c.resumeStatus || 'review';
      }
    }
    return save(s);
  }

  function sendMessage(ref, text) {
    var s = load();
    for (var i = 0; i < s.cases.length; i++) {
      if (s.cases[i].ref !== ref) continue;
      s.cases[i].messages = s.cases[i].messages || [];
      s.cases[i].messages.push({
        from: (s.user.firstName || 'You'),
        role: 'patient',
        ts: new Date().toISOString(),
        text: text
      });
    }
    return save(s);
  }

  function markOpened(ref) {
    var s = load();
    var changed = false;
    for (var i = 0; i < s.cases.length; i++) {
      if (s.cases[i].ref === ref && !s.cases[i].opened) {
        s.cases[i].opened = true;
        changed = true;
      }
    }
    if (changed) save(s);
    return s;
  }

  function updateUser(patch) {
    var s = load();
    for (var k in patch) { if (patch.hasOwnProperty(k)) s.user[k] = patch[k]; }
    return save(s);
  }

  /* ------------------------------------------------------------- navigation */

  var ALLOWED_NEXT = [
    'Dashboard.dc.html', 'Case.dc.html', 'Report.dc.html', 'Account.dc.html',
    'Start Flow.dc.html', 'index.html'
  ];

  function safeNext(raw) {
    if (!raw) return 'Dashboard.dc.html';
    var page = String(raw).split('?')[0];
    for (var i = 0; i < ALLOWED_NEXT.length; i++) {
      if (ALLOWED_NEXT[i] === page) return String(raw);
    }
    return 'Dashboard.dc.html';
  }

  // Portal pages call this in the real <head>, before anything renders, so a
  // signed-out visitor never sees a flash of someone else's dashboard.
  function guard() {
    if (isSignedIn()) return true;
    // Send them back to what they were actually aiming at, not to a generic
    // dashboard, a bookmarked report should still open the report.
    var here = root.location.pathname.split('/').pop() + root.location.search;
    root.location.replace('Sign In.dc.html?next=' + encodeURIComponent(safeNext(decodeURIComponent(here))));
    return false;
  }

  // Only ever returns a page inside this prototype. An arbitrary ?next= is
  // ignored rather than followed.
  function param(name) {
    try {
      return new root.URLSearchParams(root.location.search).get(name) || '';
    } catch (e) { return ''; }
  }

  function dashboardHref() {
    return isSignedIn() ? 'Dashboard.dc.html' : 'Sign In.dc.html?next=Dashboard.dc.html';
  }

  /* --------------------------------------------------- state-aware nav links
   * The header and footer entry points are static markup on every page. React
   * re-renders them, so patch on every mutation batch rather than once.
   */
  function patchLinks() {
    var nodes = root.document.querySelectorAll('[data-portal-link]');
    if (!nodes.length) return;
    var href = dashboardHref();
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.getAttribute('href') !== href) el.setAttribute('href', href);
    }
  }

  /* ------------------------------------------------------- deep-link scroll
   * The body is rendered at runtime, so a #hash target does not exist when the
   * browser tries to jump to it. Wait for the element to appear, scroll once,
   * then stop looking.
   */
  var hashDone = false;

  function scrollToHash() {
    if (hashDone || !root.location.hash) return;
    var el = root.document.getElementById(root.location.hash.slice(1));
    if (!el) return;
    hashDone = true;
    var id = root.location.hash.slice(1);
    // Arriving at a section by link should simply put you there, so this jump
    // is instant rather than animated. The first paint is not the last one, // the runtime keeps rendering, images and fonts land, and an early scroll
    // gets undone, so land it again as the page settles.
    function go() {
      var target = root.document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    go();
    root.setTimeout(go, 150);
    root.setTimeout(go, 500);
    root.setTimeout(go, 1000);
  }

  function watchLinks() {
    if (!root.document || !root.document.body) return;
    patchLinks();
    scrollToHash();
    var queued = false;
    var obs = new root.MutationObserver(function () {
      if (queued) return;
      queued = true;
      root.requestAnimationFrame(function () {
        queued = false;
        patchLinks();
        scrollToHash();
      });
    });
    obs.observe(root.document.body, { childList: true, subtree: true });
  }

  if (root.document) {
    if (root.document.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', watchLinks);
    } else {
      watchLinks();
    }
  }

  /* ------------------------------------------------------------------ export */
  root.PORTAL = {
    STATUS: STATUS,
    TIMELINE: TIMELINE,
    CATEGORY: CATEGORY,
    SPEEDS: SPEEDS,
    STANDARD_FEE: STANDARD_FEE,
    COMPARISON_FEE: COMPARISON_FEE,
    AREA_LABELS: AREA_LABELS,
    load: load,
    save: save,
    reset: reset,
    seed: seed,
    hasAccount: hasAccount,
    startPending: startPending,
    startSignIn: startSignIn,
    pending: pending,
    resendCode: resendCode,
    verifyPending: verifyPending,
    cancelPending: cancelPending,
    signIn: signIn,
    signOut: signOut,
    isSignedIn: isSignedIn,
    addCase: addCase,
    getCase: getCase,
    allCases: allCases,
    answerTask: answerTask,
    sendMessage: sendMessage,
    markOpened: markOpened,
    updateUser: updateUser,
    decorate: decorate,
    guard: guard,
    safeNext: safeNext,
    param: param,
    dashboardHref: dashboardHref,
    scrollToHash: scrollToHash,
    fmtLong: fmtLong,
    fmtShort: fmtShort,
    fmtAgo: fmtAgo
  };
})(window);
