/* Cases assigned: the list on the left drives the panel on the right, the
   header search narrows the list, and the three buttons at the bottom do
   what they say. A signed case is read-only - a report that has gone to the
   patient is not a draft you can still edit. */
(function () {
  var list = document.querySelector('.clist');
  var detail = document.querySelector('.detail');
  if (!list || !detail) return;

  var items = [].slice.call(list.querySelectorAll('.citem'));
  var head = list.querySelector('.hd');
  var steps = [].slice.call(detail.querySelectorAll('.lc .s'));
  var bar = detail.querySelector('.bar');
  var acts = [].slice.call(bar.querySelectorAll('[data-act]'));
  var note = bar.querySelector('.sp');
  var fields = [].slice.call(detail.querySelectorAll('.form2 textarea'));
  var current;

  function paint(c) {
    current = c;
    detail.querySelectorAll('[data-d]').forEach(function (el) {
      var v = c[el.getAttribute('data-d')];
      if (v != null) el.textContent = v;
    });

    var due = detail.querySelector('[data-d="due"]');
    if (due && due.parentNode) due.parentNode.classList.toggle('tight', !!c.tight);

    // the lifecycle rail has to agree with the case it is describing
    steps.forEach(function (s, i) {
      s.classList.remove('done', 'now');
      if (i < c.step) s.classList.add('done');
      else if (i === c.step) s.classList.add('now');
    });

    var locked = c.state === 'Signed';
    fields.forEach(function (t) { t.readOnly = locked; t.classList.toggle('ro', locked); });
    acts.forEach(function (b) { b.disabled = locked; });
    if (note) note.textContent = locked
      ? 'Signed and released on 4 October. This report is a record now, not a draft.'
      : 'Autosaved 14:06 · you sign after checking, not now';

    items.forEach(function (b) { b.classList.toggle('on', b === c.__el); });
  }

  items.forEach(function (b) {
    b.addEventListener('click', function () {
      var c;
      try { c = JSON.parse(b.getAttribute('data-case')); } catch (e) { return; }
      c.__el = b;
      paint(c);
      detail.scrollTop = 0;
    });
  });

  // search narrows the list rather than the (single) panel
  document.addEventListener('console:refilter', function () {
    var match = window.__searchMatch;
    var terms = (window.__searchTerms && window.__searchTerms()) || [];
    var shown = 0;
    items.forEach(function (b) {
      var text = b.textContent.toLowerCase();
      var ok = !terms.length || terms.every(function (t) { return text.indexOf(t) > -1; });
      b.hidden = !ok;
      if (ok) shown++;
    });
    if (head) head.textContent = terms.length
      ? shown + ' of ' + items.length + ' cases match'
      : items.length + ' cases with you';
  });

  var SAID = {
    save: 'Draft saved. Nothing has gone to the patient.',
    submit: 'Draft submitted for checking. Operations release it once the checks pass.',
    flag: 'Flagged to admin. Operations has been told, and the clock is paused.'
  };
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    window.consoleToast(SAID[b.getAttribute('data-act')]);
  });

  // ?case=SR-… opens that case, so a link from the dashboard lands on the
  // right one rather than on whatever the markup happened to mark current.
  var want = (location.search.match(/[?&]case=([^&]+)/) || [])[1];
  var start = want && items.filter(function (b) {
    return b.textContent.indexOf(decodeURIComponent(want)) > -1;
  })[0];
  (start || items.filter(function (b) { return b.classList.contains('on'); })[0] || items[0]).click();
})();
