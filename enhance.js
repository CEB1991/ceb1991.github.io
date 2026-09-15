/* Progressive enhancement shared across pages: staggered scroll reveals.
   Content is fully visible without JavaScript and stays still under
   prefers-reduced-motion. */
(function () {
  var body = document.body;
  body.classList.add('js');

  var targets = document.querySelectorAll(
    '.piece, .phase, .tool, .callout, table, figure, .creds section, .qa, .evidence article, details.caveat, .stack > *'
  );
  Array.prototype.forEach.call(targets, function (el) { el.classList.add('reveal'); });

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

  Array.prototype.forEach.call(targets, function (el, i) {
    el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
    observer.observe(el);
  });
})();
