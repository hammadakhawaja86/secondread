/* Header search over the table on the page.

   Matching is deliberately forgiving, in this order:
     1. a word in a cell STARTS WITH the term   - "mal" finds Dr Mallon
     2. any cell CONTAINS the term              - "6702" finds SR-2026-6702
   Several words all have to match, in any cell and any order, so
   "mri brain" finds the MRI brain cases without caring which column is which.

   It does not own row visibility. The card and column filters do, and they
   ask this file whether a row also matches the search, so the three narrow
   the same list together instead of overwriting each other. */
(function () {
  var box = document.querySelector('.hd-acts .search');
  if (!box) return;
  var input = box.querySelector('input');
  var terms = [];

  function norm(s) {
    return (s || '').toLowerCase().replace(/[‐-―]/g, '-').replace(/\s+/g, ' ').trim();
  }

  // Cells are read once per row and cached on the row, not on every keystroke.
  function cells(tr) {
    if (!tr.__cells) {
      tr.__cells = [].map.call(tr.cells, function (td) { return norm(td.textContent); });
      tr.__all = tr.__cells.join(' ');
    }
    return tr;
  }

  function hit(tr, t) {
    cells(tr);
    for (var i = 0; i < tr.__cells.length; i++) {
      var c = tr.__cells[i];
      if (c.lastIndexOf(t, 0) === 0) return true;              // cell starts with
      if (c.indexOf(' ' + t) > -1) return true;                 // a word starts with
    }
    return tr.__all.indexOf(t) > -1;                            // anywhere in the row
  }

  window.__searchTerms = function () { return terms; };
  window.__searchMatch = function (tr) {
    for (var i = 0; i < terms.length; i++) if (!hit(tr, terms[i])) return false;
    return true;
  };

  var clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'search-x';
  clear.setAttribute('aria-label', 'Clear search');
  clear.hidden = true;
  clear.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  input.insertAdjacentElement('afterend', clear);

  function run() {
    terms = norm(input.value).split(' ').filter(Boolean);
    clear.hidden = !terms.length;
    box.classList.toggle('on', !!terms.length);
    document.dispatchEvent(new CustomEvent('console:refilter'));
  }

  input.addEventListener('input', run);
  input.addEventListener('search', run);
  input.form && input.form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); run(); }
    if (e.key === 'Escape' && input.value) { input.value = ''; run(); }
  });
  clear.addEventListener('click', function () { input.value = ''; run(); input.focus(); });
  box.querySelector('button:not(.search-x)') &&
    box.querySelector('button:not(.search-x)').addEventListener('click', run);
})();
