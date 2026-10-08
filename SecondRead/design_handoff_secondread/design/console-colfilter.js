/* Column-header filters. The dropdown sits in the header of the column it
   filters, so there is no separate control block to map back to a column and
   no Apply button to forget to press: changing a select filters immediately.
   Rows carry their own values, so the filter never parses rendered cells. */
(function () {
  var sels = [].slice.call(document.querySelectorAll('.thf-sel'));
  if (!sels.length) return;
  var rows = [].slice.call(sels[0].closest('table').querySelectorAll('tbody tr'));
  var count = document.querySelector('.tfoot .count');
  var empty = document.querySelector('.tempty');
  var clear = document.querySelector('.clearf');
  var noun = (count && count.getAttribute('data-noun')) || 'rows';
  var one = noun.replace(/s$/, '');

  function apply() {
    var active = sels.filter(function (s) { return s.value; });
    var find = window.__searchMatch || function () { return true; };
    var terms = (window.__searchTerms && window.__searchTerms()) || [];
    var shown = 0;

    rows.forEach(function (tr) {
      var ok = find(tr) && active.every(function (s) {
        return tr.getAttribute('data-' + s.getAttribute('data-col')) === s.value;
      });
      tr.hidden = !ok;
      if (ok) shown++;
    });

    sels.forEach(function (s) { s.parentNode.classList.toggle('on', !!s.value); });

    var said = active.map(function (s) { return s.value.toLowerCase(); });
    if (terms.length) said.push('\u201c' + terms.join(' ') + '\u201d');

    if (count) {
      count.textContent = !said.length
        ? count.getAttribute('data-all')
        : shown
          ? 'Showing ' + shown + ' of ' + rows.length + ' ' + noun + ' on this page · ' + said.join(' · ')
          : 'No ' + one + ' on this page matches ' + said.join(' and ');
    }
    if (empty) empty.hidden = shown > 0;
    if (clear) clear.hidden = !said.length;
  }

  sels.forEach(function (s) { s.addEventListener('change', apply); });

  // Resetting by reopening each dropdown and picking its own name back is a
  // puzzle, not a control. One button puts the table back.
  if (clear) clear.addEventListener('click', function () {
    sels.forEach(function (s) { s.value = ''; });
    var box = document.querySelector('.hd-acts .search input');
    if (box && box.value) { box.value = ''; box.dispatchEvent(new Event('input')); return; }
    apply();
  });

  document.addEventListener('console:refilter', apply);
})();
