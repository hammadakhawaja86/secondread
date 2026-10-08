/* Which console a person lands in is decided by the address they type, so the
   prototype can walk either role from the same front door.

   This is a demonstration router, not authentication: nothing is verified and
   no code is sent. The real service emails a six-digit code and the server
   decides the role. */
(function () {
  var ROUTES = {
    'admin@31g.co.uk': 'Admin.dc.html',
    'rad@31g.co.uk': 'Consultant.dc.html'
  };

  var form = document.getElementById('auth-form');
  var field = document.getElementById('auth-email');
  var err = document.getElementById('auth-err');
  if (!form || !field) return;

  function fail(msg) {
    if (!err) return;
    err.textContent = msg;
    err.hidden = false;
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  }

  function clear() {
    if (err) err.hidden = true;
    field.removeAttribute('aria-invalid');
  }

  field.addEventListener('input', clear);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var typed = field.value.trim().toLowerCase();
    if (!typed) return fail('Enter the work address your account was created with.');
    var to = ROUTES[typed];
    if (!to) {
      return fail('No account for ' + typed + ' in this demonstration. Use admin@31g.co.uk for the operations console, or rad@31g.co.uk for the radiologist console.');
    }
    window.location.href = to;
  });

  // The two demo addresses are one click away rather than something to retype.
  document.querySelectorAll('[data-fill]').forEach(function (b) {
    b.addEventListener('click', function () {
      field.value = b.getAttribute('data-fill');
      clear();
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', {cancelable: true}));
    });
  });
})();
