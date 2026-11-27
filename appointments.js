/* Second Opinion Radiology, consultant call scheduling and the call session
 * that follows it.
 *
 * Single source of truth for every appointment, read and written by three
 * different surfaces: the admin console (schedule, reschedule, cancel), the
 * patient dashboard (join, watch status), and the consultant console (same).
 * All three are plain scripts reading the same localStorage record, so a
 * change made in one tab is a change every other tab sees on its next read.
 *
 * DEMO BUILD. There is no real video connection and no real transcription
 * service. Two tabs on the same browser — one on Call.dc.html?role=patient,
 * one on ?role=consultant, for the same appointment id — reflect each
 * other's actions live via the browser's `storage` event, which is what
 * makes "both participants in the same call" demonstrable without a signalling
 * server. That is the whole trick, and it is exactly what the acceptance
 * criteria ask for: real shared state, not two screens pretending to agree.
 */
(function (root) {
  'use strict';

  var KEY = 'secondread:appointments:v1';
  var MIN = 60 * 1000;

  var PATIENTS = [
    // Only this one has a signed-in portal account (PORTAL's demo user), so
    // only her appointments are visible on the Patient Dashboard. The rest
    // exist so the admin's search, filter and conflict check have more than
    // one row to work against.
    { id: 'hammad', name: 'Hammad A. Khawaja', email: 'hammad.khawaja@31g.co.uk', initials: 'HK' },
    { id: 'akhawaja', name: 'A. Khawaja', email: 'a.khawaja@example.com', initials: 'AK' },
    { id: 'tmensah', name: 'T. Mensah', email: 't.mensah@example.com', initials: 'TM' },
    { id: 'rokafor', name: 'R. Okafor', email: 'r.okafor@example.com', initials: 'RO' },
    { id: 'sidris', name: 'S. Idris', email: 's.idris@example.com', initials: 'SI' },
    { id: 'mdoyle', name: 'M. Doyle', email: 'm.doyle@example.com', initials: 'MD' }
  ];

  var DURATIONS = [10, 15, 20, 30]; // minutes

  var STATUS = {
    scheduled: { label: 'Scheduled', fg: '#095458', bg: '#E4F2F2', border: '#C3E0DE' },
    rescheduled: { label: 'Rescheduled', fg: '#6B4310', bg: '#FDF2E2', border: '#E7CB97' },
    completed: { label: 'Completed', fg: '#1F6B45', bg: '#E3F3EA', border: '#B7DEC8' },
    cancelled: { label: 'Cancelled', fg: '#7E2B26', bg: '#FBEEEC', border: '#E7BDB8' },
    missed: { label: 'Missed', fg: '#7E2B26', bg: '#FBEEEC', border: '#E7BDB8' }
  };

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function isoTime(d) { return pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function plusMinutes(mins) { return new Date(Date.now() + mins * MIN); }
  function plusDays(days, h, m) {
    var d = new Date(Date.now() + days * 86400000);
    d.setHours(h, m, 0, 0);
    return d;
  }
  function minusDays(days, h, m) {
    var d = new Date(Date.now() - days * 86400000);
    d.setHours(h, m, 0, 0);
    return d;
  }

  function startOf(a) {
    // Appointments store the calendar date and time the admin actually
    // picked, as plain strings — the one place "when is this" is computed
    // from parts rather than carried as a single stored instant, since a
    // reschedule only ever changes these two fields.
    return new Date(a.date + 'T' + a.time + ':00');
  }

  function seed() {
    var soon = plusMinutes(8);
    var tomorrow = plusDays(1, 10, 0);
    var yesterday = minusDays(1, 15, 0);
    return {
      nextSeq: 4,
      appointments: [
        {
          id: 'AP-2026-001',
          patientId: 'hammad',
          consultantId: 'mallon',
          date: isoDate(soon),
          time: isoTime(soon),
          durationMins: 10,
          status: 'scheduled',
          reason: 'Follow-up on brain MRI second opinion',
          createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
          history: [
            { at: new Date(Date.now() - 2 * 86400000).toISOString(), event: 'Scheduled by admin', by: 'admin' }
          ],
          patientNotified: false,
          call: freshCall()
        },
        {
          id: 'AP-2026-002',
          patientId: 'hammad',
          consultantId: 'mallon',
          date: isoDate(tomorrow),
          time: isoTime(tomorrow),
          durationMins: 15,
          status: 'scheduled',
          reason: 'Discuss chest CT comparison',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          history: [
            { at: new Date(Date.now() - 86400000).toISOString(), event: 'Scheduled by admin', by: 'admin' }
          ],
          patientNotified: true,
          call: freshCall()
        },
        {
          id: 'AP-2026-000',
          patientId: 'hammad',
          consultantId: 'mallon',
          date: isoDate(yesterday),
          time: isoTime(yesterday),
          durationMins: 10,
          status: 'completed',
          reason: 'Initial consultation',
          createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 + 20 * MIN).toISOString(),
          history: [
            { at: new Date(Date.now() - 5 * 86400000).toISOString(), event: 'Scheduled by admin', by: 'admin' },
            { at: new Date(Date.now() - 86400000 + 20 * MIN).toISOString(), event: 'Call completed', by: 'system' }
          ],
          patientNotified: true,
          call: (function () {
            var c = freshCall();
            c.endedAt = new Date(Date.now() - 86400000 + 20 * MIN).toISOString();
            c.durationSec = 612;
            c.recording.consentPatient = true;
            c.recording.everRecorded = true;
            c.transcription.status = 'completed';
            c.transcription.text = 'Sample transcript. Dr Mallon: Thanks for joining — I’ve had a look at the comparison images. Patient: Is the nodule still the same size? Dr Mallon: Yes, no change since your last scan, which is the reassuring finding we were hoping for.… (sample content only)';
            return c;
          })()
        }
      ]
    };
  }

  function freshCall() {
    return {
      phase: 'not_started', // not_started | patient_lobby | consultant_lobby | live | ended
      patientJoinedAt: null,
      consultantJoinedAt: null,
      consentPatient: null,
      consentConsultant: null,
      recording: { active: false, consentPatient: null, everRecorded: false, startedAt: null, stoppedAt: null },
      transcription: { status: 'unavailable', text: null, requestedAt: null },
      endedAt: null,
      durationSec: null
    };
  }

  function load() {
    var raw = null;
    try { raw = root.localStorage.getItem(KEY); } catch (e) {}
    if (!raw) return healStaleDemo(seed());
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.appointments)) return healStaleDemo(seed());
      return healStaleDemo(parsed);
    } catch (e) {
      return healStaleDemo(seed());
    }
  }

  function save(state) {
    try { root.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    return state;
  }

  // The one pre-seeded "starts soon" appointment is only a useful demo while
  // it is actually soon. Rather than let it silently become "missed" the day
  // after someone first opens the site, a still-scheduled appointment more
  // than two hours in the past is rolled forward to 8 minutes from now, same
  // as it was seeded. This runs on every load, so it only ever acts once per
  // staleness, and it never touches an appointment with any history beyond
  // its original scheduling (i.e. never one a real action has happened to).
  function healStaleDemo(state) {
    var changed = false;
    state.appointments.forEach(function (a) {
      if (a.id === 'AP-2026-001' && a.status === 'scheduled' && a.history.length === 1) {
        var start = startOf(a);
        if (Date.now() - start.getTime() > 2 * 60 * MIN) {
          var soon = plusMinutes(8);
          a.date = isoDate(soon);
          a.time = isoTime(soon);
          changed = true;
        }
      }
    });
    if (changed) save(state);
    return state;
  }

  function nextId(state) {
    var n = state.nextSeq || (state.appointments.length + 1);
    state.nextSeq = n + 1;
    return 'AP-2026-' + (n < 100 ? (n < 10 ? '00' : '0') : '') + n;
  }

  function patientById(id) {
    var i;
    for (i = 0; i < PATIENTS.length; i++) if (PATIENTS[i].id === id) return PATIENTS[i];
    return null;
  }

  function consultantById(id) {
    var list = (root.CONSULTANTS || []);
    var i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function searchPatients(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return PATIENTS.slice();
    return PATIENTS.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) !== -1 || p.email.toLowerCase().indexOf(q) !== -1;
    });
  }

  function allAppointments() { return load().appointments.slice(); }

  function getAppointment(id) {
    var list = load().appointments;
    var i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function forPatient(patientId) {
    return load().appointments.filter(function (a) { return a.patientId === patientId; });
  }

  function forConsultant(consultantId) {
    return load().appointments.filter(function (a) { return a.consultantId === consultantId; });
  }

  // Two appointments for the same consultant conflict if their time windows
  // overlap at all. excludeId lets a reschedule check against everything
  // except the appointment being moved.
  function findConflict(consultantId, date, time, durationMins, excludeId) {
    var start = new Date(date + 'T' + time + ':00').getTime();
    var end = start + durationMins * MIN;
    var list = load().appointments;
    var i, a, aStart, aEnd;
    for (i = 0; i < list.length; i++) {
      a = list[i];
      if (a.id === excludeId) continue;
      if (a.consultantId !== consultantId) continue;
      if (a.status === 'cancelled') continue;
      aStart = startOf(a).getTime();
      aEnd = aStart + a.durationMins * MIN;
      if (start < aEnd && end > aStart) return a;
    }
    return null;
  }

  function schedule(fields) {
    var state = load();
    var id = nextId(state);
    var now = new Date().toISOString();
    var appt = {
      id: id,
      patientId: fields.patientId,
      consultantId: fields.consultantId,
      date: fields.date,
      time: fields.time,
      durationMins: fields.durationMins,
      status: 'scheduled',
      reason: fields.reason || '',
      createdAt: now,
      updatedAt: now,
      history: [{ at: now, event: 'Scheduled by admin', by: 'admin' }],
      patientNotified: true,
      call: freshCall()
    };
    state.appointments.push(appt);
    save(state);
    return appt;
  }

  function reschedule(id, date, time, durationMins) {
    var state = load();
    var a = state.appointments.filter(function (x) { return x.id === id; })[0];
    if (!a) return null;
    var now = new Date().toISOString();
    a.date = date;
    a.time = time;
    if (durationMins) a.durationMins = durationMins;
    a.status = 'rescheduled';
    a.updatedAt = now;
    a.patientNotified = true;
    a.history.push({ at: now, event: 'Rescheduled', by: 'admin' });
    save(state);
    return a;
  }

  function cancel(id, reason) {
    var state = load();
    var a = state.appointments.filter(function (x) { return x.id === id; })[0];
    if (!a) return null;
    var now = new Date().toISOString();
    a.status = 'cancelled';
    a.updatedAt = now;
    a.history.push({ at: now, event: 'Cancelled' + (reason ? ': ' + reason : ''), by: 'admin' });
    save(state);
    return a;
  }

  function patch(id, mutator) {
    var state = load();
    var a = state.appointments.filter(function (x) { return x.id === id; })[0];
    if (!a) return null;
    mutator(a);
    a.updatedAt = new Date().toISOString();
    save(state);
    return a;
  }

  // ------------------------------------------------------------- join state
  // Three states a "Join call" button can be in. The window opens 10 minutes
  // before the scheduled start and stays open indefinitely once a status is
  // still "scheduled"/"rescheduled" — a demo should never lock a visitor out
  // because real time moved on while they were reading the page.
  function joinState(a) {
    if (a.status === 'cancelled') return 'cancelled';
    if (a.status === 'completed') return 'completed';
    var start = startOf(a).getTime();
    var opensAt = start - 10 * MIN;
    if (Date.now() < opensAt) return 'locked';
    return 'ready';
  }

  function minutesUntil(a) {
    return Math.round((startOf(a).getTime() - Date.now()) / MIN);
  }

  root.APPOINTMENTS = {
    PATIENTS: PATIENTS,
    DURATIONS: DURATIONS,
    STATUS: STATUS,
    patientById: patientById,
    consultantById: consultantById,
    searchPatients: searchPatients,
    allAppointments: allAppointments,
    getAppointment: getAppointment,
    forPatient: forPatient,
    forConsultant: forConsultant,
    findConflict: findConflict,
    schedule: schedule,
    reschedule: reschedule,
    cancel: cancel,
    patch: patch,
    joinState: joinState,
    minutesUntil: minutesUntil,
    startOf: startOf,
    load: load,
    save: save
  };
})(typeof window !== 'undefined' ? window : this);
