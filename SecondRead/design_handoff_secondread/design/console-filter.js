/* The dashboard has two filter layers over one table, and they have to agree,
   so one script owns row visibility.

   The cards pick the SET - every case, the flagged ones, the ones due today.
   The column dropdowns narrow WITHIN that set by body area and modality. A
   row shows when it satisfies both.

   Two of the nine cards count people, not cases, so they swap in a second
   table instead. A radiologist has no body area or modality, so the column
   dropdowns reset when one of those views opens rather than silently hiding
   every row.

   Rows declare their own values, so no filter ever parses rendered cells.
   Card counts are real service totals; the table is one page of them, and the
   footer says so rather than pretending the two are the same number. */
(function () {
  var grid = document.querySelector('.statgrid');
  if (!grid) return;

  var cases = document.querySelector('.tablewrap:not(.people)');
  var people = document.querySelector('.tablewrap.people');
  var note = document.querySelector('.foot-note');
  var count = document.querySelector('.tfoot .count');
  var title = document.querySelector('.sect-title');
  var sub = document.querySelector('.sect-sub');
  var empty = document.querySelector('.tempty');
  var clear = document.querySelector('.clearf');
  var sels = [].slice.call(document.querySelectorAll('.thf-sel'));
  var rows = [].slice.call(document.querySelectorAll('tbody tr'));
  var set = 'all';

  var VIEW = {
    all:        ['All cases',         'Every case on the service, newest activity first.'],
    flag:       ['Flagged by admin',  'Someone has put a hold on these. They do not move until a person decides.'],
    due:        ['Due today',         'The 48-hour turnaround the patient paid for runs out today.'],
    unassigned: ['Unassigned cases',  'Oldest first. Anything past 48 hours is breaching the turnaround the patient paid for.'],
    progress:   ['In progress',       'With a radiologist now, or read and waiting to be released.'],
    delivered:  ['Reports delivered', 'Signed and sent to the patient this month.'],
    archived:   ['Archived',          'Closed. Kept for the record, not for action.'],
    approvals:  ['Radiologist approvals', 'Applications waiting on a GMC check and a decision. Nobody reads a case until this clears.'],
    rejected:   ['Radiologists rejected',  'Turned down in the last 30 days, with the reason. Reopen if the reason no longer stands.']
  };
  var PEOPLE_VIEWS = {approvals: 1, rejected: 1};
  var NOUN = {approvals: ['application', 'applications'],
              rejected: ['rejected application', 'rejected applications']};

  function render() {
    var onPeople = !!PEOPLE_VIEWS[set];
    var narrowed = onPeople ? [] : sels.filter(function (s) { return s.value; });
    var find = window.__searchMatch || function () { return true; };
    var terms = (window.__searchTerms && window.__searchTerms()) || [];
    var shown = 0, inSet = 0;

    rows.forEach(function (tr) {
      var ofSet = (' ' + tr.getAttribute('data-sets') + ' ').indexOf(' ' + set + ' ') > -1;
      if (ofSet) inSet++;
      var ok = ofSet && find(tr) && narrowed.every(function (s) {
        return tr.getAttribute('data-' + s.getAttribute('data-col')) === s.value;
      });
      tr.hidden = !ok;
      if (ok) shown++;
    });

    if (people) people.hidden = !onPeople;
    if (cases) cases.hidden = onPeople;
    // The 48-hour footnote is about cases; it says nothing about applications.
    if (note) note.hidden = onPeople;

    grid.querySelectorAll('[data-filter]').forEach(function (c) {
      var on = c.getAttribute('data-filter') === set;
      c.classList.toggle('on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    sels.forEach(function (s) { s.parentNode.classList.toggle('on', !!s.value); });

    var card = grid.querySelector('[data-filter="' + set + '"]');
    var total = card ? Number(card.querySelector('.num').textContent.trim()) : 0;
    if (title) title.textContent = VIEW[set][0];
    if (sub) sub.textContent = VIEW[set][1];

    var said = narrowed.map(function (s) { return s.value.toLowerCase(); });
    if (terms.length) said.push('\u201c' + terms.join(' ') + '\u201d');

    if (count) {
      if (!shown) {
        count.textContent = said.length
          ? 'Nothing in this view matches ' + said.join(' and ')
          : 'Nothing in this view';
      } else if (said.length) {
        count.textContent = 'Showing ' + shown + ' of ' + inSet + ' ' + VIEW[set][0].toLowerCase() +
          ' on this page · ' + said.join(' · ');
      } else {
        count.textContent = 'Showing ' + shown + ' of ' + total + ' ' +
          (NOUN[set] ? NOUN[set][total === 1 ? 0 : 1] : VIEW[set][0].toLowerCase());
      }
    }
    if (empty) empty.hidden = shown > 0 || onPeople;
    if (clear) clear.hidden = !said.length;
  }

  grid.addEventListener('click', function (e) {
    var c = e.target.closest('[data-filter]');
    if (!c) return;
    var next = c.getAttribute('data-filter');
    // The people views have no body area or modality to narrow by.
    if (PEOPLE_VIEWS[next]) sels.forEach(function (s) { s.value = ''; });
    set = next;
    render();
  });

  sels.forEach(function (s) { s.addEventListener('change', render); });

  // Resetting by reopening each dropdown and picking its own name back is a
  // puzzle, not a control. The button clears the columns and leaves the card.
  if (clear) clear.addEventListener('click', function () {
    sels.forEach(function (s) { s.value = ''; });
    var box = document.querySelector('.hd-acts .search input');
    if (box && box.value) { box.value = ''; box.dispatchEvent(new Event('input')); return; }
    render();
  });

  document.addEventListener('console:refilter', render);

  render();
})();
