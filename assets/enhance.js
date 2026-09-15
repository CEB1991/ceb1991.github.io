/* Progressive enhancement shared across pages.
   Everything here is optional: the site is complete and readable with
   JavaScript off, and all motion stops under prefers-reduced-motion. */
(function () {
  var root = document.documentElement;
  var body = document.body;
  body.classList.add('js');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme switch ---------- */
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function activeTheme() {
      var set = root.getAttribute('data-theme');
      if (set === 'dark' || set === 'light') return set;
      return systemDark ? 'dark' : 'light';
    }
    function sync() {
      var dark = activeTheme() === 'dark';
      toggle.setAttribute('aria-checked', dark ? 'true' : 'false');
      var name = toggle.getAttribute('data-name') || 'Dark theme';
      toggle.setAttribute('title', name);
    }
    toggle.addEventListener('click', function () {
      var next = activeTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) { systemDark = e.matches; sync(); };
      if (mq.addEventListener) { mq.addEventListener('change', onChange); }
      else if (mq.addListener) { mq.addListener(onChange); }
    }
    sync();
  }


  /* ---------- remember the chosen language ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('[data-setlang]') : null;
    if (!link) { return; }
    try { localStorage.setItem('lang', link.getAttribute('data-setlang')); } catch (err) {}
  });

  /* ---------- reading progress ---------- */
  var bar = document.getElementById('progress');
  if (bar && !reduce) {
    var ticking = false;
    var paint = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      bar.style.transform = 'scaleX(' + pct + ')';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(paint); }
    }, { passive: true });
    paint();
  }

  /* ---------- scroll reveals ---------- */
  var targets = document.querySelectorAll(
    '.piece, .phase, .tool, .callout, table, figure, .creds section, .qa, .evidence article, details.caveat'
  );
  Array.prototype.forEach.call(targets, function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window) || reduce) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(targets, function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      observer.observe(el);
    });
    // If anything stops the observer from firing, show everything anyway.
    // Nothing on this site should ever be permanently invisible.
    window.setTimeout(function () {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
    }, 2500);
  }

  /* ---------- count up the county figures ---------- */
  var figures = document.querySelectorAll('.figures dt');
  if (figures.length && !reduce && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countObserver.unobserve(el);
        var final = el.textContent.trim();
        var match = final.match(/^(\d+)(\D*)$/);
        if (!match) return;
        var target = parseInt(match[1], 10);
        var suffix = match[2];
        var start = null;
        var step = function (now) {
          if (start === null) start = now;
          var t = Math.min(1, (now - start) / 900);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) { window.requestAnimationFrame(step); }
          else { el.textContent = final; }
        };
        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(figures, function (el) { countObserver.observe(el); });
  }
})();
