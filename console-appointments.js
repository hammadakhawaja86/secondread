/* Admin > Appointments. Schedules, reschedules and cancels consultant calls
 * against the shared APPOINTMENTS store (appointments.js), the same store the
 * patient dashboard and the consultant console read. Nothing here is faked:
 * every action here is visible, immediately, on the other two surfaces.
 */
(function () {
  var A = window.APPOINTMENTS;
  if (!A) return;

  var els = {};
  ['apt-when', 'apt-new', 'apt-rows', 'apt-empty', 'apt-count',
   'apt-form-modal', 'apt-form-title', 'apt-form-sub',
   'apt-f-patientsearch', 'apt-f-patientlist', 'apt-f-patientid',
   'apt-f-patientchosen', 'apt-f-patientav', 'apt-f-patientname', 'apt-f-patientclear',
   'apt-f-consultant', 'apt-f-date', 'apt-f-time', 'apt-f-duration', 'apt-f-reason',
   'apt-f-conflict', 'apt-f-submit',
   'apt-confirm-modal', 'apt-confirm-rows', 'apt-confirm-go', 'apt-confirm-back', 'apt-confirm-back-x',
   'apt-detail-modal', 'apt-detail-rows', 'apt-detail-cancel', 'apt-detail-reschedule',
   'apt-cancel-modal', 'apt-cancel-go', 'apt-cancel-keep', 'apt-cancel-keep-x', 'apt-toasts'
  ].forEach(function (id) { els[id.replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); })] = document.getElementById(id); });

  var activeFilter = 'all';
  var formMode = 'create'; // 'create' | 'reschedule'
  var formApptId = null;
  var detailApptId = null;

  function patientName(id) {
    var p = A.patientById(id);
    return p ? p.name : 'Unknown patient';
  }
  function patientInitials(id) {
    var p = A.patientById(id);
    return p ? p.initials : '?';
  }
  function consultantName(id) {
    var c = A.consultantById(id);
    return c ? 'Dr ' + c.name : 'Unassigned';
  }

  function fmtWhen(a) {
    var d = A.startOf(a);
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var h = d.getHours(), m = d.getMinutes();
    return days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ', ' +
      (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function statusMeta(a) {
    var st = A.STATUS[a.status] || A.STATUS.scheduled;
    return st;
  }

  function bucketOf(a) {
    if (a.status === 'cancelled') return 'cancelled';
    if (a.status === 'completed') return 'completed';
    var mins = A.minutesUntil(a);
    if (mins <= 24 * 60 && mins > -24 * 60) return 'today';
    return 'upcoming';
  }

  function render() {
    var now = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    els.aptWhen.textContent = days[now.getDay()] + ' ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

    var all = A.allAppointments().sort(function (x, y) { return A.startOf(x) - A.startOf(y); });
    var counts = { all: all.length, today: 0, upcoming: 0, completed: 0 };
    all.forEach(function (a) {
      var b = bucketOf(a);
      if (b === 'today') counts.today++;
      else if (b === 'upcoming') counts.upcoming++;
      else if (b === 'completed') counts.completed++;
    });
    Object.keys(counts).forEach(function (k) {
      var el = document.querySelector('[data-n="' + k + '"]');
      if (el) el.textContent = counts[k];
    });

    var visible = all.filter(function (a) {
      if (activeFilter === 'all') return true;
      return bucketOf(a) === activeFilter;
    });

    els.aptRows.innerHTML = visible.map(function (a) {
      var st = statusMeta(a);
      return '<tr>' +
        '<td class="caseid">' + a.id + '</td>' +
        '<td>' + patientName(a.patientId) + '</td>' +
        '<td>' + consultantName(a.consultantId) + '</td>' +
        '<td>' + fmtWhen(a) + '</td>' +
        '<td>' + a.durationMins + ' min</td>' +
        '<td><span class="apt-status" style="color:' + st.fg + ';background:' + st.bg + ';border:1px solid ' + st.border + ';"><span class="d"></span>' + st.label + '</span></td>' +
        '<td><div class="acts"><button class="icon-act" type="button" data-view="' + a.id + '" aria-label="View call" title="View call"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button></div></td>' +
        '</tr>';
    }).join('');

    els.aptEmpty.hidden = visible.length > 0;
    els.aptCount.textContent = 'Showing ' + visible.length + ' of ' + all.length + ' calls';
  }

  // --------------------------------------------------------------- statgrid
  document.querySelectorAll('.statf').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.statf').forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.getAttribute('data-filter');
      render();
    });
  });

  // ------------------------------------------------------------------ form
  function fillConsultantSelect() {
    els.aptFConsultant.innerHTML = '<option value="">Choose a consultant…</option>' +
      window.CONSULTANTS.map(function (c) {
        return '<option value="' + c.id + '">Dr ' + c.name + ' · ' + c.role + '</option>';
      }).join('');
  }
  function fillDurationSelect() {
    els.aptFDuration.innerHTML = A.DURATIONS.map(function (d) {
      return '<option value="' + d + '"' + (d === 15 ? ' selected' : '') + '>' + d + ' minutes</option>';
    }).join('');
  }
  fillConsultantSelect();
  fillDurationSelect();

  function resetForm() {
    formApptId = null;
    els.aptFPatientid.value = '';
    els.aptFPatientsearch.value = '';
    els.aptFPatientsearch.style.display = '';
    els.aptFPatientchosen.style.display = 'none';
    els.aptFPatientlist.innerHTML = '';
    els.aptFConsultant.value = '';
    els.aptFDate.value = '';
    els.aptFTime.value = '';
    els.aptFDuration.value = '15';
    els.aptFReason.value = '';
    els.aptFConflict.style.display = 'none';
    checkFormValid();
  }

  function choosePatient(p) {
    els.aptFPatientid.value = p.id;
    els.aptFPatientsearch.style.display = 'none';
    els.aptFPatientlist.innerHTML = '';
    els.aptFPatientchosen.style.display = 'flex';
    els.aptFPatientav.textContent = p.initials;
    els.aptFPatientname.textContent = p.name + ' · ' + p.email;
    checkFormValid();
  }

  els.aptFPatientsearch.addEventListener('input', function () {
    var q = els.aptFPatientsearch.value;
    var results = A.searchPatients(q);
    els.aptFPatientlist.innerHTML = results.map(function (p) {
      return '<button type="button" class="apt-presult" data-pid="' + p.id + '"><span class="av">' + p.initials + '</span><span><span class="nm" style="display:block;">' + p.name + '</span><span class="em">' + p.email + '</span></span></button>';
    }).join('');
  });
  els.aptFPatientlist.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-pid]');
    if (!btn) return;
    var p = A.patientById(btn.getAttribute('data-pid'));
    if (p) choosePatient(p);
  });
  els.aptFPatientclear.addEventListener('click', function () {
    els.aptFPatientid.value = '';
    els.aptFPatientsearch.value = '';
    els.aptFPatientsearch.style.display = '';
    els.aptFPatientchosen.style.display = 'none';
    checkFormValid();
  });

  function currentConflict() {
    var cid = els.aptFConsultant.value, date = els.aptFDate.value, time = els.aptFTime.value;
    var dur = parseInt(els.aptFDuration.value, 10) || 15;
    if (!cid || !date || !time) return null;
    return A.findConflict(cid, date, time, dur, formApptId);
  }

  function checkFormValid() {
    var hasPatient = !!els.aptFPatientid.value;
    var hasConsultant = !!els.aptFConsultant.value;
    var hasDate = !!els.aptFDate.value;
    var hasTime = !!els.aptFTime.value;
    var conflict = currentConflict();
    if (conflict) {
      els.aptFConflict.style.display = 'block';
      els.aptFConflict.textContent = 'Dr ' + (A.consultantById(conflict.consultantId) || {}).name + ' already has ' + conflict.id + ' at this time. Choose a different slot.';
    } else {
      els.aptFConflict.style.display = 'none';
    }
    els.aptFSubmit.disabled = !(hasPatient && hasConsultant && hasDate && hasTime && !conflict);
  }
  ['change', 'input'].forEach(function (ev) {
    [els.aptFConsultant, els.aptFDate, els.aptFTime, els.aptFDuration].forEach(function (el) {
      el.addEventListener(ev, checkFormValid);
    });
  });

  function openForm(mode, appt) {
    formMode = mode;
    resetForm();
    if (mode === 'reschedule' && appt) {
      formApptId = appt.id;
      els.aptFormTitle.textContent = 'Reschedule call ' + appt.id;
      els.aptFormSub.textContent = 'Pick a new date and time. The patient and consultant both see the update.';
      var p = A.patientById(appt.patientId);
      if (p) choosePatient(p);
      els.aptFConsultant.value = appt.consultantId;
      els.aptFDate.value = appt.date;
      els.aptFTime.value = appt.time;
      els.aptFDuration.value = String(appt.durationMins);
      els.aptFReason.value = appt.reason || '';
    } else {
      els.aptFormTitle.textContent = 'Schedule a consultant call';
      els.aptFormSub.textContent = "Pick a patient, a consultant and a time. We check the consultant's diary before confirming.";
    }
    checkFormValid();
    els.aptFormModal.showModal();
  }

  els.aptNew.addEventListener('click', function () { openForm('create', null); });

  els.aptFSubmit.addEventListener('click', function () {
    if (els.aptFSubmit.disabled) return;
    var patientId = els.aptFPatientid.value;
    var consultantId = els.aptFConsultant.value;
    var date = els.aptFDate.value;
    var time = els.aptFTime.value;
    var dur = parseInt(els.aptFDuration.value, 10) || 15;
    var reason = els.aptFReason.value.trim();

    var rows =
      '<div><dt>Patient</dt><dd>' + patientName(patientId) + '</dd></div>' +
      '<div><dt>Consultant</dt><dd>' + consultantName(consultantId) + '</dd></div>' +
      '<div><dt>Date &amp; time</dt><dd>' + fmtWhen({ date: date, time: time }) + '</dd></div>' +
      '<div><dt>Duration</dt><dd>' + dur + ' minutes</dd></div>' +
      (reason ? '<div><dt>Reason</dt><dd>' + reason + '</dd></div>' : '');
    els.aptConfirmRows.innerHTML = rows;
    document.getElementById('apt-confirm-title').textContent = formMode === 'reschedule' ? 'Confirm the new time' : 'Confirm this call';

    els.aptConfirmGo.onclick = function () {
      if (formMode === 'reschedule' && formApptId) {
        A.reschedule(formApptId, date, time, dur);
        A.patch(formApptId, function (a) { a.reason = reason || a.reason; });
        toast('Call ' + formApptId + ' rescheduled. The patient and consultant have been notified.');
      } else {
        var a = A.schedule({ patientId: patientId, consultantId: consultantId, date: date, time: time, durationMins: dur, reason: reason });
        toast('Call ' + a.id + ' scheduled for ' + patientName(patientId) + '.');
      }
      els.aptConfirmModal.close();
      render();
    };
    // Only one dialog should ever be visible at once: the form closes as the
    // confirm step opens, rather than stacking a modal on top of a modal.
    els.aptFormModal.close();
    els.aptConfirmModal.showModal();
  });

  function backToForm() {
    els.aptConfirmModal.close();
    els.aptFormModal.showModal();
  }
  els.aptConfirmBack.addEventListener('click', backToForm);
  els.aptConfirmBackX.addEventListener('click', backToForm);

  // ---------------------------------------------------------------- detail
  function openDetail(id) {
    var a = A.getAppointment(id);
    if (!a) return;
    detailApptId = id;
    document.getElementById('apt-detail-title').innerHTML = 'Call <span>' + a.id + '</span>';
    var st = statusMeta(a);
    var histHtml = (a.history || []).map(function (h) {
      return '<div><dt>' + new Date(h.at).toLocaleString('en-GB') + '</dt><dd>' + h.event + '</dd></div>';
    }).join('');
    els.aptDetailRows.innerHTML =
      '<div><dt>Patient</dt><dd>' + patientName(a.patientId) + '</dd></div>' +
      '<div><dt>Consultant</dt><dd>' + consultantName(a.consultantId) + '</dd></div>' +
      '<div><dt>When</dt><dd>' + fmtWhen(a) + '</dd></div>' +
      '<div><dt>Duration</dt><dd>' + a.durationMins + ' minutes</dd></div>' +
      '<div><dt>Status</dt><dd style="color:' + st.fg + ';">' + st.label + '</dd></div>' +
      (a.reason ? '<div><dt>Reason</dt><dd>' + a.reason + '</dd></div>' : '') +
      histHtml;
    var inactive = a.status === 'cancelled' || a.status === 'completed';
    els.aptDetailCancel.disabled = inactive;
    els.aptDetailReschedule.disabled = inactive;
    els.aptDetailModal.showModal();
  }

  els.aptRows.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-view]');
    if (btn) openDetail(btn.getAttribute('data-view'));
  });

  els.aptDetailReschedule.addEventListener('click', function () {
    var a = A.getAppointment(detailApptId);
    if (!a) return;
    els.aptDetailModal.close();
    openForm('reschedule', a);
  });
  els.aptDetailCancel.addEventListener('click', function () {
    els.aptDetailModal.close();
    els.aptCancelModal.showModal();
  });
  els.aptCancelGo.addEventListener('click', function () {
    if (detailApptId) {
      A.cancel(detailApptId);
      toast('Call ' + detailApptId + ' cancelled. The patient and consultant have been notified.');
    }
    els.aptCancelModal.close();
    render();
  });
  function backToDetail() {
    els.aptCancelModal.close();
    els.aptDetailModal.showModal();
  }
  els.aptCancelKeep.addEventListener('click', backToDetail);
  els.aptCancelKeepX.addEventListener('click', backToDetail);

  // ------------------------------------------------------------------ toast
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<span>' + msg + '</span>';
    els.aptToasts.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('on'); });
    setTimeout(function () {
      t.classList.remove('on');
      setTimeout(function () { t.remove(); }, 220);
    }, 4200);
  }

  // ----------------------------------------------------------- close wiring
  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dlg = btn.closest('dialog');
      if (dlg) dlg.close();
    });
  });
  document.querySelectorAll('dialog.modal').forEach(function (dlg) {
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  });

  window.addEventListener('storage', function (e) {
    if (e.key === 'secondread:appointments:v1') render();
  });
  setInterval(render, 30000);

  render();

  // Arriving from a case row's "Schedule a call" action: open straight into
  // the form with that patient already chosen, rather than making admin
  // search for them again.
  (function openFromQueryString() {
    var patientId = new URLSearchParams(window.location.search).get('schedule');
    if (!patientId) return;
    var p = A.patientById(patientId);
    openForm('create', null);
    if (p) choosePatient(p);
    history.replaceState(null, '', window.location.pathname);
  })();
})();
