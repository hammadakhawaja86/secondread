/* The radiologist console's own wiring: the filter cards over one table, the
   case lightbox, and the offer. Nothing leaves the page - this demonstrates
   what each control does, it does not ask a server. */
(function () {
  var grid = document.querySelector('.statgrid');
  var cases = document.querySelector('.tablewrap[data-table="cases"]');
  var offers = document.querySelector('.tablewrap[data-table="offers"]');
  if (!grid || !cases) return;

  var rows = [].slice.call(cases.querySelectorAll('tbody tr'));
  var sels = [].slice.call(document.querySelectorAll('.thf-sel'));
  var box = document.querySelector('.hd-acts .search input');
  var title = document.querySelector('.sect-title');
  var sub = document.querySelector('.sect-sub');
  var count = document.querySelector('.tfoot .count');
  var empty = document.querySelector('.tempty');
  var clear = document.querySelector('.clearf');
  var set = 'all';

  function render() {
    var onOffers = set === 'offers';
    var find = window.__searchMatch || function () { return true; };
    var terms = (window.__searchTerms && window.__searchTerms()) || [];
    var narrowed = onOffers ? [] : sels.filter(function (s) { return s.value; });
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

    cases.hidden = onOffers;
    if (offers) offers.hidden = !onOffers;

    var card = grid.querySelector('[data-filter="' + set + '"]');
    grid.querySelectorAll('[data-filter]').forEach(function (c) {
      var on = c === card;
      c.classList.toggle('on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    sels.forEach(function (s) { s.parentNode.classList.toggle('on', !!s.value); });

    if (title) title.textContent = card.getAttribute('data-title');
    if (sub) sub.textContent = card.getAttribute('data-sub');

    var said = narrowed.map(function (s) { return s.value.toLowerCase(); });
    if (terms.length) said.push('“' + terms.join(' ') + '”');

    if (count) {
      if (onOffers) count.textContent = card.getAttribute('data-count');
      else if (!shown) count.textContent = said.length
        ? 'No case of yours matches ' + said.join(' and ')
        : 'Nothing in this view';
      else if (said.length) count.textContent = 'Showing ' + shown + ' of ' + inSet + ' ' +
        card.getAttribute('data-title').toLowerCase() + ' · ' + said.join(' · ');
      else count.textContent = card.getAttribute('data-count');
    }
    if (empty) empty.hidden = shown > 0 || onOffers;
    if (clear) clear.hidden = !said.length;
  }

  grid.addEventListener('click', function (e) {
    var c = e.target.closest('[data-filter]');
    if (!c) return;
    var next = c.getAttribute('data-filter');
    if (next === 'offers') {
      sels.forEach(function (s) { s.value = ''; });
      if (box && box.value) { box.value = ''; box.dispatchEvent(new Event('input')); }
    }
    set = next;
    render();
  });

  sels.forEach(function (s) { s.addEventListener('change', render); });

  // The row menu's "Open case" goes where the banner's button goes.
  document.addEventListener('change', function (e) {
    var sel = e.target.closest('.actsel');
    if (!sel || sel.value !== 'Open case') return;
    var id = sel.closest('tr').querySelector('.caseid').textContent.trim();
    window.location.href = 'Consultant%20Cases.dc.html?case=' + encodeURIComponent(id);
  });
  document.addEventListener('console:refilter', render);
  if (clear) clear.addEventListener('click', function () {
    sels.forEach(function (s) { s.value = ''; });
    if (box && box.value) { box.value = ''; box.dispatchEvent(new Event('input')); return; }
    render();
  });

  /* ------------------------------------------------------------ the offer */
  /* The banner and the row both open the same summary. Accepting adds the
     case to the table and starts its clock; declining asks why, because
     operations has to place it again and the reason is what makes that fast. */
  var odlg = document.getElementById('offer');
  var dbox = document.getElementById('decline-box');
  var derr = document.getElementById('decline-err');
  var accept = document.getElementById('offer-accept');
  var decline = document.getElementById('offer-decline');

  function openOffer() {
    if (!odlg) return;
    dbox.hidden = true;
    derr.hidden = true;
    dbox.reset();
    decline.textContent = 'Decline';
    accept.hidden = false;
    odlg.showModal();
  }

  function offerGone(msg) {
    var tr = offers && offers.querySelector('tbody tr');
    var bar = document.querySelector('.offer');
    if (tr) tr.remove();
    if (bar) bar.hidden = true;
    var card = grid.querySelector('[data-filter="offers"]');
    if (card) {
      card.querySelector('.num').textContent = '00';
      card.setAttribute('data-count', 'No case waiting');
    }
    var none = document.querySelector('.offers-empty');
    if (none) none.hidden = false;
    if (window.consoleToast) window.consoleToast(msg);
    render();
  }

  function acceptOffer() {
    var tbody = cases.querySelector('tbody');
    var tpl = tbody.rows[0].cloneNode(true);
    tpl.setAttribute('data-sets', 'all review');
    tpl.setAttribute('data-area', 'Brain or spine');
    tpl.setAttribute('data-mod', 'MRI');
    tpl.cells[0].textContent = 'SR-2026-6744';
    tpl.cells[1].textContent = 'K. Varma';
    tpl.cells[2].textContent = 'Brain or spine';
    tpl.cells[3].textContent = 'MRI';
    tpl.cells[4].innerHTML = '<span class="wait">In 47 h</span>';
    tpl.cells[5].innerHTML = '<span class="st st-review"><span class="n">07</span> In review</span>';
    var eye = tpl.querySelector('[data-case]');
    if (eye) eye.setAttribute('data-case', JSON.stringify({
      id: 'SR-2026-6744', patient: 'K. Varma', area: 'Brain or spine', mod: 'MRI',
      state: 'In review', title: 'MRI brain with contrast',
      ask: 'My scan was reported as showing a small change near the front of my brain. I would like to know whether that is serious, and whether it has grown since 2024.',
      file: 'Royal Free report, 02/10/2026.pdf', at: '02 October 2026, 16:20',
      deadline: 'In 47 h', signed: false
    }));
    tpl.hidden = false;
    tbody.appendChild(tpl);
    rows.push(tpl);

    var yours = grid.querySelector('[data-filter="all"]');
    if (yours) {
      yours.querySelector('.num').textContent = '05';
      yours.setAttribute('data-count', 'Showing 5 of 5 cases with you');
    }
    var rev = grid.querySelector('[data-filter="review"] .num');
    if (rev) rev.textContent = '03';
    odlg.close();
    offerGone('Case accepted. SR-2026-6744 is yours, draft due 8 October, 19:00.');
  }

  if (odlg) {
    accept.addEventListener('click', acceptOffer);

    decline.addEventListener('click', function () {
      if (dbox.hidden) {
        // first press opens the reason, it does not decline anything yet
        dbox.hidden = false;
        accept.hidden = true;
        decline.textContent = 'Confirm decline';
        dbox.elements.reason.focus();
        return;
      }
      var reason = dbox.elements.reason.value;
      if (!reason) {
        derr.textContent = 'Choose a reason so operations can place the case quickly.';
        derr.hidden = false;
        dbox.elements.reason.focus();
        return;
      }
      var note = dbox.elements.note.value.trim();
      odlg.close();
      offerGone('Declined: ' + reason.toLowerCase() + '.' + (note ? ' Your note went with it.' : '') +
                ' It has gone back to the queue.');
    });

    dbox.addEventListener('change', function () { derr.hidden = true; });
    odlg.addEventListener('click', function (e) {
      if (e.target.closest('[data-oclose]') || e.target === odlg) odlg.close();
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.offer-yes') || e.target.closest('.offer-no')) openOffer();
  });

  /* ------------------------------------------------------- case lightbox */
  var dlg = document.getElementById('case');
  if (!dlg || typeof dlg.showModal !== 'function') return render();
  var draft = document.getElementById('case-draft');
  var open = document.getElementById('case-open');
  var current;

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-case]');
    if (btn) {
      try { current = JSON.parse(btn.getAttribute('data-case')); } catch (err) { return; }
      dlg.querySelectorAll('[data-f]').forEach(function (el) {
        var k = el.getAttribute('data-f');
        if (k === 'ini') return el.textContent = current.patient.replace(/\./g, '').split(/\s+/)
          .map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
        el.textContent = current[k] == null ? '' : current[k];
      });
      draft.disabled = current.signed;
      draft.textContent = current.signed ? 'Already signed' : 'Submit draft';
      dlg.showModal();
      return;
    }
    if (e.target.closest('#case [data-close]') || e.target === dlg) dlg.close();
  });

  open.addEventListener('click', function () {
    window.consoleToast('Opening ' + current.id + ' in the image viewer.');
  });
  draft.addEventListener('click', function () {
    if (draft.disabled) return;
    dlg.close();
    window.consoleToast('Draft submitted for ' + current.id + '. Operations will check and release it.');
  });

  render();
})();
