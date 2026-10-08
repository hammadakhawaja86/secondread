/* Console sidebar collapse. State lives in localStorage so it survives the
   page-to-page clicks the prototype is made of. The class is put on <html>
   by an inline snippet in each page's <head>, before first paint, so the
   sidebar never flashes open and then snap shut. */
(function () {
  var KEY = 'secondread:console:nav';
  var root = document.documentElement;
  var btn = document.querySelector('.nav-toggle');
  if (!btn) return;

  function paint() {
    var closed = root.classList.contains('nav-collapsed');
    btn.setAttribute('aria-expanded', closed ? 'false' : 'true');
    var label = closed ? 'Expand navigation' : 'Collapse navigation';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  btn.addEventListener('click', function () {
    var closed = root.classList.toggle('nav-collapsed');
    try { localStorage.setItem(KEY, closed ? 'collapsed' : 'open'); } catch (e) {}
    paint();
  });

  paint();
})();
