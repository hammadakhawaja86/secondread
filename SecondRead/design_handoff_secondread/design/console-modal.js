/* Row detail dialog. Each "View details" button carries its own row as JSON,
   so the page stays static: no fetch, no runtime, nothing to go stale against
   the table it was read from. */
(function () {
  var dlg = document.getElementById('detail');
  if (!dlg || typeof dlg.showModal !== 'function') return;

  function fill(d) {
    dlg.querySelectorAll('[data-f]').forEach(function (el) {
      var v = d[el.getAttribute('data-f')];
      el.textContent = v == null ? '' : v;
    });
    dlg.querySelectorAll('[data-f-href]').forEach(function (el) {
      el.setAttribute('href', d[el.getAttribute('data-f-href')] || '#');
    });
    // The average carries the same banding as the table's response column, so
    // a doctor who is slow looks slow in both places.
    var avg = dlg.querySelector('[data-f="avg"]');
    avg.className = 'wait' + (d.avgState ? ' ' + d.avgState : '');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-detail]');
    if (btn) {
      try { fill(JSON.parse(btn.getAttribute('data-detail'))); } catch (err) { return; }
      dlg.showModal();
      return;
    }
    if (e.target.closest('[data-close]')) { dlg.close(); return; }
    // Click on the backdrop: the dialog element itself fills the viewport, so
    // a hit on it rather than on its contents means outside the card.
    if (e.target === dlg) dlg.close();
  });
})();
