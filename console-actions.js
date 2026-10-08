/* Row actions on Manage users, wired so the walkthrough can be driven rather
   than described. Nothing leaves the page: this is a demonstration of what
   each control does to the row, not a request to a server. */
(function () {
  var table = document.querySelector('.tablewrap table');
  if (!table) return;
  var count = document.querySelector('.tfoot .count');

  var ICON = {
    pause:  '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    resume: '<path d="M6 3.5 20 12 6 20.5Z"/>'
  };

  function svg(d) {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  }

  function setTip(el, text) {
    el.setAttribute('aria-label', text);
    el.setAttribute('data-tip', text);
    el.removeAttribute('title');
  }

  function pill(tr, label, cls) {
    var p = tr.querySelector('.pill');
    p.className = 'pill ' + cls;
    p.innerHTML = '<span class="d"></span>' + label;
    tr.setAttribute('data-status', label);
  }

  function refilter() { document.dispatchEvent(new CustomEvent('console:refilter')); }

  table.addEventListener('click', function (e) {
    var btn = e.target.closest('.icon-btn');
    if (!btn || btn.classList.contains('locked')) return;
    e.preventDefault();

    var tr = btn.closest('tr');
    var who = tr.cells[0].textContent.trim();
    var label = btn.getAttribute('aria-label');

    if (label === 'Pause account') {
      pill(tr, 'Paused', 'p-unassigned');
      btn.innerHTML = svg(ICON.resume);
      setTip(btn, 'Resume account');
      refilter();
      window.consoleToast(who + ' is paused. No new case will be assigned.', function () {
        pill(tr, 'Active', 'p-active');
        btn.innerHTML = svg(ICON.pause);
        setTip(btn, 'Pause account');
        refilter();
      });
      return;
    }

    if (label === 'Resume account') {
      pill(tr, 'Active', 'p-active');
      btn.innerHTML = svg(ICON.pause);
      setTip(btn, 'Pause account');
      refilter();
      window.consoleToast(who + ' is active again.');
      return;
    }

    if (label === 'Resend invitation') {
      window.consoleToast('Invitation resent to ' + tr.cells[2].textContent.trim() + '.');
      return;
    }

    if (label === 'Archive' || label === 'Delete') {
      var next = tr.nextElementSibling, parent = tr.parentNode;
      tr.remove();
      refilter();
      window.consoleToast(who + (label === 'Archive' ? ' archived.' : ' deleted.'), function () {
        parent.insertBefore(tr, next);
        refilter();
      });
      return;
    }

    if (label === 'Edit profile') openEdit(tr);
  });

  /* ---------------------------------------------------------- edit modal */
  var dlg = document.getElementById('edit');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var form = document.getElementById('edit-form');
  var save = document.getElementById('edit-save');
  var row, before;

  var FIELDS = ['name', 'status', 'email', 'sub'];
  var COL = {name: 0, email: 2, sub: 3};          // which cell each field writes to

  function read(tr) {
    return {
      name: tr.cells[0].textContent.trim(),
      status: tr.querySelector('.pill').textContent.trim(),
      email: tr.cells[2].textContent.trim(),
      sub: tr.cells[3].textContent.trim()
    };
  }

  function dirty() {
    return FIELDS.some(function (k) { return form.elements[k].value !== before[k]; });
  }

  function openEdit(tr) {
    row = tr;
    before = read(tr);
    FIELDS.forEach(function (k) { form.elements[k].value = before[k]; });
    dlg.querySelector('[data-f="initials"]').textContent =
      before.name.replace(/^Dr\s+/, '').split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
    dlg.querySelector('[data-f="name"]').textContent = before.name;
    dlg.querySelector('[data-f="registered"]').textContent = tr.cells[4].textContent.trim();
    save.disabled = true;
    dlg.showModal();
  }

  var PILL = {Active: 'p-active', Paused: 'p-unassigned', Invited: 'p-unassigned'};

  function write(tr, v) {
    tr.cells[COL.name].textContent = v.name;
    tr.cells[COL.email].textContent = v.email;
    tr.cells[COL.sub].textContent = v.sub;
    pill(tr, v.status, PILL[v.status] || 'p-active');
    tr.setAttribute('data-sub', v.sub);
    // the pause control has to agree with the status it now shows
    var pb = tr.querySelector('[aria-label="Pause account"], [aria-label="Resume account"]');
    if (pb) {
      var paused = v.status === 'Paused';
      pb.innerHTML = svg(paused ? ICON.resume : ICON.pause);
      setTip(pb, paused ? 'Resume account' : 'Pause account');
    }
    tr.__cells = null;                              // search re-reads the row
    refilter();
  }

  form.addEventListener('input', function () { save.disabled = !dirty(); });
  form.addEventListener('change', function () { save.disabled = !dirty(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var after = {};
    FIELDS.forEach(function (k) { after[k] = form.elements[k].value.trim(); });
    var was = before, tr = row;
    write(tr, after);
    dlg.close();
    window.consoleToast('Profile saved for ' + after.name + '.', function () { write(tr, was); });
  });

  dlg.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]') || e.target === dlg) dlg.close();
  });
})();
