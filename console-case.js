/* The case lightbox: what the patient actually asked, what they attached, and
   what has been said since. Each View button carries its own case as JSON, so
   the page stays static and the dialog can never drift from the row it opened
   from. */
(function () {
  var dlg = document.getElementById('case');
  if (!dlg || typeof dlg.showModal !== 'function') return;

  var dl = document.getElementById('case-dl');
  var flag = document.getElementById('case-flag');
  var see = dlg.querySelector('.msg-see');
  var more = dlg.querySelector('[data-f="more"]');
  var reply = dlg.querySelector('[data-reply]');
  var current;

  var PILL = {
    'Unassigned': 'p-unassigned', 'Being assigned': 'p-matching', 'Flagged by admin': 'p-flagged',
    'With radiologist': 'p-with', 'Report ready': 'p-ready', 'Signed': 'p-signed', 'Archived': 'p-signed'
  };

  function fill(c) {
    current = c;
    dlg.querySelectorAll('[data-f]').forEach(function (el) {
      var k = el.getAttribute('data-f');
      if (k === 'who') return el.textContent = c.name;
      if (k === 'ini2') return el.textContent = c.ini;
      el.textContent = c[k] == null ? '' : c[k];
    });

    var pill = dlg.querySelector('.pill[data-f="status"]');
    pill.className = 'pill ' + (PILL[c.status] || 'p-with');
    pill.innerHTML = '<span class="d"></span>' + c.status;

    // "See more" only exists when there is more.
    more.hidden = true;
    see.hidden = !c.more;
    see.textContent = 'See more';

    reply.hidden = !c.reply;

    // A report can only be downloaded once one exists.
    dl.disabled = !c.report;
    dl.title = c.report ? '' : 'No report yet. This case has not been signed.';
    dl.setAttribute('data-tip', dl.title);
    if (!c.report) dl.removeAttribute('title');
  }

  see.addEventListener('click', function () {
    more.hidden = !more.hidden;
    see.textContent = more.hidden ? 'See more' : 'See less';
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-case]');
    if (btn) {
      try { fill(JSON.parse(btn.getAttribute('data-case'))); } catch (err) { return; }
      dlg.showModal();
      return;
    }
    if (e.target.closest('#case [data-close]') || e.target === dlg) dlg.close();
  });

  dl.addEventListener('click', function () {
    if (dl.disabled) return;
    window.consoleToast('Report for ' + current.id + ' downloaded.');
  });

  flag.addEventListener('click', function () {
    window.consoleToast(current.id + ' flagged for admin. It will not be assigned until someone clears it.');
    dlg.close();
  });
})();
