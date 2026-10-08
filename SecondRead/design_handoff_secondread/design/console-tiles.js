/* Overview tiles as the view switcher, the same convention the dashboard
   cards use: a tile swaps the table below it to the set that tile counts,
   and takes the dark treatment while it is the one showing.

   A tile that counts something the current table cannot hold - patients on a
   radiologist table, body areas on either - brings its own table rather than
   filtering to an empty one. The column filters and the search belong to the
   radiologist table, so they reset when another view opens. */
(function () {
  var tiles = [].slice.call(document.querySelectorAll('.tile[data-view]'));
  if (!tiles.length) return;

  var tables = {};
  [].forEach.call(document.querySelectorAll('.tablewrap[data-table]'), function (w) {
    tables[w.getAttribute('data-table')] = w;
  });

  var title = document.querySelector('.sect-title');
  var sub = document.querySelector('.sect-sub');
  var count = document.querySelector('.tfoot .count');
  var note = document.querySelector('.foot-note');
  var filterable = Object.keys(tables)[0];          // the first table owns the filters
  var sels = [].slice.call(document.querySelectorAll('.thf-sel'));
  var box = document.querySelector('.hd-acts .search input');

  function show(view) {
    tiles.forEach(function (t) {
      var on = t.getAttribute('data-view') === view;
      t.classList.toggle('lead', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    Object.keys(tables).forEach(function (k) { tables[k].hidden = k !== view; });

    var tile = tiles.filter(function (t) { return t.getAttribute('data-view') === view; })[0];
    if (title) title.textContent = tile.getAttribute('data-title');
    if (sub) sub.textContent = tile.getAttribute('data-sub');
    if (count) {
      count.textContent = tile.getAttribute('data-count');
      count.setAttribute('data-all', tile.getAttribute('data-count'));
    }
    // The footnote is about radiologist records; it says nothing about
    // patients or body areas.
    if (note) note.hidden = view !== filterable;

    var owns = view === filterable;
    sels.forEach(function (s) {
      s.closest('th').hidden = false;
      if (!owns && s.value) { s.value = ''; }
    });
    if (!owns && box && box.value) { box.value = ''; box.dispatchEvent(new Event('input')); }
    else document.dispatchEvent(new CustomEvent('console:refilter'));
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('.tile[data-view]');
    if (t) show(t.getAttribute('data-view'));
  });
})();
