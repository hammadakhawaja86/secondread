// The "Resources" nav dropdown is a native <details>/<summary>, so opening,
// closing and keyboard reachability all come for free. The one thing a plain
// <details> does not do is close itself when something else is clicked, or on
// Escape, so that is all this file adds. It runs once, needs no DOM-ready
// wrapper (document-level delegated listeners are safe to attach before the
// body has parsed), and touches nothing React owns.
(function () {
  function openEl() {
    return document.querySelector('[data-r="navresources"][open]');
  }
  function closeAllExcept(except) {
    var nodes = document.querySelectorAll('[data-r="navresources"][open]');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] !== except) nodes[i].removeAttribute('open');
    }
  }
  document.addEventListener('click', function (e) {
    var el = openEl();
    if (el && !el.contains(e.target)) el.removeAttribute('open');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllExcept(null);
  });
  // If the burger's own menu opens while Resources is expanded inside it,
  // or vice versa, only one disclosure stays open at a time.
  document.addEventListener('toggle', function (e) {
    var el = e.target;
    if (el && el.matches && el.matches('[data-r="navresources"]') && el.open) {
      closeAllExcept(el);
    }
  }, true);
})();
