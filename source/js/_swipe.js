/*!
 * swiped-events.js - v1.1.4
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!(function (t, e) {
  "use strict";
  "function" != typeof t.CustomEvent &&
    ((t.CustomEvent = function (t, n) {
      n = n || { bubbles: !1, cancelable: !1, detail: void 0 };
      var a = e.createEvent("CustomEvent");
      return a.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), a;
    }),
    (t.CustomEvent.prototype = t.Event.prototype)),
    e.addEventListener(
      "touchstart",
      function (t) {
        if ("true" === t.target.getAttribute("data-swipe-ignore")) return;
        (s = t.target),
          (r = Date.now()),
          (n = t.touches[0].clientX),
          (a = t.touches[0].clientY),
          (u = 0),
          (i = 0);
      },
      !1
    ),
    e.addEventListener(
      "touchmove",
      function (t) {
        if (!n || !a) return;
        var e = t.touches[0].clientX,
          r = t.touches[0].clientY;
        (u = n - e), (i = a - r);
      },
      !1
    ),
    e.addEventListener(
      "touchend",
      function (t) {
        if (s !== t.target) return;
        var e = parseInt(l(s, "data-swipe-threshold", "20"), 10),
          o = parseInt(l(s, "data-swipe-timeout", "500"), 10),
          c = Date.now() - r,
          d = "",
          p = t.changedTouches || t.touches || [];
        Math.abs(u) > Math.abs(i)
          ? Math.abs(u) > e &&
            c < o &&
            (d = u > 0 ? "swiped-left" : "swiped-right")
          : Math.abs(i) > e &&
            c < o &&
            (d = i > 0 ? "swiped-up" : "swiped-down");
        if ("" !== d) {
          var b = {
            dir: d.replace(/swiped-/, ""),
            xStart: parseInt(n, 10),
            xEnd: parseInt((p[0] || {}).clientX || -1, 10),
            yStart: parseInt(a, 10),
            yEnd: parseInt((p[0] || {}).clientY || -1, 10),
          };
          s.dispatchEvent(
            new CustomEvent("swiped", {
              bubbles: !0,
              cancelable: !0,
              detail: b,
            })
          ),
            s.dispatchEvent(
              new CustomEvent(d, { bubbles: !0, cancelable: !0, detail: b })
            );
        }
        (n = null), (a = null), (r = null);
      },
      !1
    );
  var n = null,
    a = null,
    u = null,
    i = null,
    r = null,
    s = null;
  function l(t, n, a) {
    for (; t && t !== e.documentElement; ) {
      var u = t.getAttribute(n);
      if (u) return u;
      t = t.parentNode;
    }
    return a;
  }
})(window, document);
