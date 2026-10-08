/* Profile panes. The rail switches between them in place rather than loading
   three near-identical pages, and each form only offers Save once something
   has actually changed. Nothing persists past a reload: this is a
   demonstration of the settings, not a store. */
(function () {
  var rail = document.querySelector('.rail');
  if (!rail) return;

  var tabs = [].slice.call(rail.querySelectorAll('[data-pane]'));
  var panes = {};
  tabs.forEach(function (t) {
    panes[t.getAttribute('data-pane')] = document.getElementById('pane-' + t.getAttribute('data-pane'));
  });

  function show(name) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-pane') === name;
      t.classList.toggle('on', on);
      t.setAttribute('aria-current', on ? 'page' : 'false');
      if (panes[t.getAttribute('data-pane')]) panes[t.getAttribute('data-pane')].hidden = !on;
    });
  }

  rail.addEventListener('click', function (e) {
    var t = e.target.closest('[data-pane]');
    if (t) show(t.getAttribute('data-pane'));
  });

  // Save stays out of the way until there is a change to save.
  [].forEach.call(document.querySelectorAll('.prof-form'), function (form) {
    var save = form.querySelector('[type="submit"]');
    var start = snapshot(form);

    function snapshot(f) {
      return [].map.call(f.elements, function (el) {
        return el.type === 'checkbox' ? el.checked : el.value;
      }).join('\u0001');
    }
    function check() { save.disabled = snapshot(form) === start; }

    form.addEventListener('input', check);
    form.addEventListener('change', check);
    form.addEventListener('reset', function () { setTimeout(check, 0); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      start = snapshot(form);
      save.disabled = true;
      var SAID = {'notif-form': 'Notification settings saved.',
                  'avail-form': 'Availability saved.',
                  'work-form': 'The work you accept is saved. New offers will match it.'};
      var what = SAID[form.id] || 'Your details are saved.';
      if (window.consoleToast) window.consoleToast(what);
    });
  });

  // open on whichever pane the page marks as current
  var first = rail.querySelector('[data-pane].on') || rail.querySelector('[data-pane]');
  show(first.getAttribute('data-pane'));
})();
