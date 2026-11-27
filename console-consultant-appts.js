/* Consultant console > Appointments. Read-only against the schedule: a
 * consultant here joins, but scheduling/reschedule/cancel stays an admin
 * action, exactly as the brief's Admin > Patient > Consultant lifecycle says.
 */
(function () {
  var A = window.APPOINTMENTS;
  if (!A) return;
  var CONSULTANT_ID = 'mallon';

  var els = {};
  ['ca-rows', 'ca-empty', 'ca-count', 'ca-next', 'ca-next-clock', 'ca-next-title', 'ca-next-sub', 'ca-next-join',
   'ca-detail-modal', 'ca-detail-rows', 'ca-detail-join'
  ].forEach(function (id) { els[id.replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); })] = document.getElementById(id); });

  var activeFilter = 'all';

  function patientName(id) { var p = A.patientById(id); return p ? p.name : 'Unknown patient'; }

  function fmtWhen(a) {
    var d = A.startOf(a);
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var h = d.getHours(), m = d.getMinutes();
    return days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ', ' + (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function bucketOf(a) {
    if (a.status === 'cancelled') return 'cancelled';
    if (a.status === 'completed') return 'completed';
    var mins = A.minutesUntil(a);
    if (mins <= 24 * 60 && mins > -24 * 60) return 'today';
    return 'upcoming';
  }

  function callHref(a, role) { return 'Call.dc.html?id=' + encodeURIComponent(a.id) + '&role=' + role; }

  function render() {
    var mine = A.forConsultant(CONSULTANT_ID).sort(function (x, y) { return A.startOf(x) - A.startOf(y); });
    var counts = { all: mine.length, today: 0, upcoming: 0, completed: 0 };
    mine.forEach(function (a) {
      var b = bucketOf(a);
      if (b === 'today') counts.today++;
      else if (b === 'upcoming') counts.upcoming++;
      else if (b === 'completed') counts.completed++;
    });
    Object.keys(counts).forEach(function (k) {
      var el = document.querySelector('[data-n="' + k + '"]');
      if (el) el.textContent = counts[k];
    });

    // Next-call indicator: soonest non-cancelled, non-completed call.
    var next = mine.filter(function (a) { return a.status !== 'cancelled' && a.status !== 'completed'; })[0];
    if (next) {
      els.caNext.style.display = 'flex';
      var mins = A.minutesUntil(next);
      els.caNextClock.textContent = mins <= 0 ? 'Now' : (mins < 60 ? mins + ' min' : Math.round(mins / 60) + ' h ' + (mins % 60) + ' m');
      els.caNextTitle.textContent = patientName(next.patientId) + ' · ' + next.durationMins + ' min';
      els.caNextSub.textContent = fmtWhen(next) + (next.reason ? ' — ' + next.reason : '');
      var ready = A.joinState(next) === 'ready';
      els.caNextJoin.disabled = !ready;
      els.caNextJoin.style.opacity = ready ? '1' : '.5';
      els.caNextJoin.style.cursor = ready ? 'pointer' : 'not-allowed';
      els.caNextJoin.onclick = ready ? function () { window.location.href = callHref(next, 'consultant'); } : null;
    } else {
      els.caNext.style.display = 'none';
    }

    var visible = mine.filter(function (a) { return activeFilter === 'all' || bucketOf(a) === activeFilter; });
    els.caRows.innerHTML = visible.map(function (a) {
      var st = A.STATUS[a.status] || A.STATUS.scheduled;
      var ready = A.joinState(a) === 'ready';
      return '<tr>' +
        '<td class="caseid">' + a.id + '</td>' +
        '<td>' + patientName(a.patientId) + '</td>' +
        '<td>' + fmtWhen(a) + '</td>' +
        '<td>' + a.durationMins + ' min</td>' +
        '<td><span class="apt-status" style="color:' + st.fg + ';background:' + st.bg + ';border:1px solid ' + st.border + ';"><span class="d"></span>' + st.label + '</span></td>' +
        '<td><div class="acts">' +
          (ready ? '<a class="btn btn-primary" style="height:38px;padding:0 16px;" href="' + callHref(a, 'consultant') + '">Join</a>' : '') +
          '<button class="icon-act" type="button" data-view="' + a.id + '" aria-label="View call" title="View call"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
        '</div></td>' +
        '</tr>';
    }).join('');
    els.caEmpty.hidden = visible.length > 0;
    els.caCount.textContent = 'Showing ' + visible.length + ' of ' + mine.length + ' calls';
  }

  document.querySelectorAll('.statf').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.statf').forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.getAttribute('data-filter');
      render();
    });
  });

  els.caRows.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-view]');
    if (!btn) return;
    var a = A.getAppointment(btn.getAttribute('data-view'));
    if (!a) return;
    document.getElementById('ca-detail-title').innerHTML = 'Call <span>' + a.id + '</span>';
    var st = A.STATUS[a.status] || A.STATUS.scheduled;
    els.caDetailRows.innerHTML =
      '<div><dt>Patient</dt><dd>' + patientName(a.patientId) + '</dd></div>' +
      '<div><dt>When</dt><dd>' + fmtWhen(a) + '</dd></div>' +
      '<div><dt>Duration</dt><dd>' + a.durationMins + ' minutes</dd></div>' +
      '<div><dt>Status</dt><dd style="color:' + st.fg + ';">' + st.label + '</dd></div>' +
      (a.reason ? '<div><dt>Reason</dt><dd>' + a.reason + '</dd></div>' : '');
    var ready = A.joinState(a) === 'ready';
    els.caDetailJoin.href = callHref(a, 'consultant');
    els.caDetailJoin.style.display = ready ? 'inline-flex' : 'none';
    els.caDetailModal.showModal();
  });
  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function () { var dlg = btn.closest('dialog'); if (dlg) dlg.close(); });
  });
  els.caDetailModal.addEventListener('click', function (e) { if (e.target === els.caDetailModal) els.caDetailModal.close(); });

  window.addEventListener('storage', function (e) { if (e.key === 'secondread:appointments:v1') render(); });
  setInterval(render, 15000);
  render();
})();
