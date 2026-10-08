/* Quick tooltips and a small toast, shared by the console pages.

   The native `title` waits about a second before it appears, which is too
   slow for a row of unlabelled icons, so the title is moved onto the element
   as data-tip and drawn here in 70ms. The attribute is removed rather than
   kept, or the browser would draw its own on top a second later. */
(function () {
  var DELAY = 70;
  var tip, timer, current;

  function node() {
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'tip';
      tip.setAttribute('role', 'tooltip');
      document.body.appendChild(tip);
    }
    return tip;
  }

  function show(el) {
    var text = el.getAttribute('data-tip');
    if (!text) return;
    var t = node();
    t.textContent = text;
    t.classList.remove('on');
    var r = el.getBoundingClientRect();
    t.style.left = '0px';
    t.style.top = '0px';
    var w = t.offsetWidth, h = t.offsetHeight;
    var x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    var above = r.top - h - 9 > 8;
    t.style.left = x + 'px';
    t.style.top = (above ? r.top - h - 9 : r.bottom + 9) + 'px';
    t.style.setProperty('--tipx', (r.left + r.width / 2 - x) + 'px');
    t.classList.toggle('below', !above);
    requestAnimationFrame(function () { t.classList.add('on'); });
    current = el;
  }

  function hide() {
    clearTimeout(timer);
    current = null;
    if (tip) tip.classList.remove('on');
  }

  function arm(e) {
    var el = e.target.closest('[data-tip]');
    if (!el || el === current) return;
    clearTimeout(timer);
    timer = setTimeout(function () { show(el); }, DELAY);
  }

  // Move every title onto data-tip so only our tooltip is ever drawn.
  function adopt(root) {
    (root || document).querySelectorAll('[title]:not([data-tip])').forEach(function (el) {
      if (!el.closest('.acts, .side, .thf, .statgrid, .tablewrap')) return;
      el.setAttribute('data-tip', el.getAttribute('title'));
      el.removeAttribute('title');
    });
  }
  adopt();
  window.__adoptTips = adopt;

  document.addEventListener('pointerover', arm);
  document.addEventListener('pointerout', function (e) {
    if (current && !e.relatedTarget) return hide();
    if (current && !current.contains(e.relatedTarget)) hide();
    else if (!current) clearTimeout(timer);
  });
  document.addEventListener('focusin', function (e) {
    var el = e.target.closest('[data-tip]');
    if (el) show(el);
  });
  document.addEventListener('focusout', hide);
  window.addEventListener('scroll', hide, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });

  // --- toast ------------------------------------------------------------
  var wrap;
  window.consoleToast = function (text, undo) {
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      wrap.setAttribute('aria-live', 'polite');
      document.body.appendChild(wrap);
    }
    var t = document.createElement('div');
    t.className = 'toast';
    t.appendChild(document.createTextNode(text));
    if (undo) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = 'Undo';
      b.addEventListener('click', function () { undo(); close(); });
      t.appendChild(b);
    }
    wrap.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('on'); });
    var timer = setTimeout(close, undo ? 6000 : 3200);
    function close() {
      clearTimeout(timer);
      t.classList.remove('on');
      setTimeout(function () { t.remove(); }, 220);
    }
    return close;
  };
})();
