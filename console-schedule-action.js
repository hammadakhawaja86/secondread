/* Admin dashboard case table > per-row Actions select. "Schedule a call" is
 * a jump, not a status change: it hands the patient off to the Appointments
 * console with that patient already selected, rather than trying to
 * reproduce the scheduling form inline in a <select>.
 */
(function () {
  var A = window.APPOINTMENTS;
  var table = document.querySelector('.tablewrap table');
  if (!table) return;

  function patientIdForName(name) {
    if (!A) return '';
    var match = A.PATIENTS.filter(function (p) { return p.name === name; })[0];
    return match ? match.id : '';
  }

  table.addEventListener('change', function (e) {
    var sel = e.target.closest('.actsel');
    if (!sel) return;
    if (sel.value !== 'Schedule a call') return;

    var tr = sel.closest('tr');
    var patientName = tr.cells[1].textContent.trim();
    var patientId = patientIdForName(patientName);

    // Put the select back to whatever it showed before, so leaving the page
    // (e.g. via back button) doesn't leave "Schedule a call" sitting there
    // as if it were a status.
    var prior = Array.prototype.find.call(sel.options, function (o) { return o.defaultSelected; });
    if (prior) sel.value = prior.value;

    var url = 'Admin Appointments.dc.html';
    if (patientId) url += '?schedule=' + encodeURIComponent(patientId);
    window.location.href = url;
  });
})();
