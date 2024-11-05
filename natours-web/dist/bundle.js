/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  var t = {
      866: () => {
        function t(e) {
          return (
            (t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            t(e)
          );
        }
        function e() {
          "use strict";
          e = function () {
            return n;
          };
          var r,
            n = {},
            o = Object.prototype,
            i = o.hasOwnProperty,
            a =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            c = "function" == typeof Symbol ? Symbol : {},
            u = c.iterator || "@@iterator",
            s = c.asyncIterator || "@@asyncIterator",
            l = c.toStringTag || "@@toStringTag";
          function f(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (r) {
            f = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function p(t, e, r, n) {
            var o = e && e.prototype instanceof b ? e : b,
              i = Object.create(o.prototype),
              c = new P(n || []);
            return a(i, "_invoke", { value: _(t, r, c) }), i;
          }
          function h(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          n.wrap = p;
          var d = "suspendedStart",
            v = "suspendedYield",
            y = "executing",
            m = "completed",
            g = {};
          function b() {}
          function x() {}
          function w() {}
          var L = {};
          f(L, u, function () {
            return this;
          });
          var E = Object.getPrototypeOf,
            O = E && E(E(N([])));
          O && O !== o && i.call(O, u) && (L = O);
          var j = (w.prototype = b.prototype = Object.create(L));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function k(e, r) {
            function n(o, a, c, u) {
              var s = h(e[o], e, a);
              if ("throw" !== s.type) {
                var l = s.arg,
                  f = l.value;
                return f && "object" == t(f) && i.call(f, "__await")
                  ? r.resolve(f.__await).then(
                      function (t) {
                        n("next", t, c, u);
                      },
                      function (t) {
                        n("throw", t, c, u);
                      },
                    )
                  : r.resolve(f).then(
                      function (t) {
                        (l.value = t), c(l);
                      },
                      function (t) {
                        return n("throw", t, c, u);
                      },
                    );
              }
              u(s.arg);
            }
            var o;
            a(this, "_invoke", {
              value: function (t, e) {
                function i() {
                  return new r(function (r, o) {
                    n(t, e, r, o);
                  });
                }
                return (o = o ? o.then(i, i) : i());
              },
            });
          }
          function _(t, e, n) {
            var o = d;
            return function (i, a) {
              if (o === y) throw Error("Generator is already running");
              if (o === m) {
                if ("throw" === i) throw a;
                return { value: r, done: !0 };
              }
              for (n.method = i, n.arg = a; ; ) {
                var c = n.delegate;
                if (c) {
                  var u = T(c, n);
                  if (u) {
                    if (u === g) continue;
                    return u;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                  if (o === d) throw ((o = m), n.arg);
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                o = y;
                var s = h(t, e, n);
                if ("normal" === s.type) {
                  if (((o = n.done ? m : v), s.arg === g)) continue;
                  return { value: s.arg, done: n.done };
                }
                "throw" === s.type &&
                  ((o = m), (n.method = "throw"), (n.arg = s.arg));
              }
            };
          }
          function T(t, e) {
            var n = e.method,
              o = t.iterator[n];
            if (o === r)
              return (
                (e.delegate = null),
                ("throw" === n &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = r),
                  T(t, e),
                  "throw" === e.method)) ||
                  ("return" !== n &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + n + "' method",
                    )))),
                g
              );
            var i = h(o, t.iterator, e.arg);
            if ("throw" === i.type)
              return (
                (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), g
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((e[t.resultName] = a.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method && ((e.method = "next"), (e.arg = r)),
                  (e.delegate = null),
                  g)
                : a
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                g);
          }
          function A(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function I(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function P(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(A, this),
              this.reset(!0);
          }
          function N(e) {
            if (e || "" === e) {
              var n = e[u];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  a = function t() {
                    for (; ++o < e.length; )
                      if (i.call(e, o))
                        return (t.value = e[o]), (t.done = !1), t;
                    return (t.value = r), (t.done = !0), t;
                  };
                return (a.next = a);
              }
            }
            throw new TypeError(t(e) + " is not iterable");
          }
          return (
            (x.prototype = w),
            a(j, "constructor", { value: w, configurable: !0 }),
            a(w, "constructor", { value: x, configurable: !0 }),
            (x.displayName = f(w, l, "GeneratorFunction")),
            (n.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === x || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (n.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, w)
                  : ((t.__proto__ = w), f(t, l, "GeneratorFunction")),
                (t.prototype = Object.create(j)),
                t
              );
            }),
            (n.awrap = function (t) {
              return { __await: t };
            }),
            S(k.prototype),
            f(k.prototype, s, function () {
              return this;
            }),
            (n.AsyncIterator = k),
            (n.async = function (t, e, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new k(p(t, e, r, o), i);
              return n.isGeneratorFunction(e)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            S(j),
            f(j, l, "Generator"),
            f(j, u, function () {
              return this;
            }),
            f(j, "toString", function () {
              return "[object Generator]";
            }),
            (n.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (n.values = N),
            (P.prototype = {
              constructor: P,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = r),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = r),
                  this.tryEntries.forEach(I),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      i.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = r);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(n, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = t),
                    (e.next = n),
                    o && ((e.method = "next"), (e.arg = r)),
                    !!o
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var a = this.tryEntries[o],
                    c = a.completion;
                  if ("root" === a.tryLoc) return n("end");
                  if (a.tryLoc <= this.prev) {
                    var u = i.call(a, "catchLoc"),
                      s = i.call(a, "finallyLoc");
                    if (u && s) {
                      if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var n = this.tryEntries[r];
                  if (
                    n.tryLoc <= this.prev &&
                    i.call(n, "finallyLoc") &&
                    this.prev < n.finallyLoc
                  ) {
                    var o = n;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), g)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                      ? ((this.rval = this.arg = t.arg),
                        (this.method = "return"),
                        (this.next = "end"))
                      : "normal" === t.type && e && (this.next = e),
                  g
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), I(r), g;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      I(r);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (t, e, n) {
                return (
                  (this.delegate = {
                    iterator: N(t),
                    resultName: e,
                    nextLoc: n,
                  }),
                  "next" === this.method && (this.arg = r),
                  g
                );
              },
            }),
            n
          );
        }
        function r(t, e, r, n, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void r(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(n, o);
        }
        document.addEventListener("DOMContentLoaded", function () {
          var t = document.getElementById("loginForm");
          document.getElementById("error"),
            t.addEventListener(
              "submit",
              (function () {
                var t,
                  n =
                    ((t = e().mark(function t(r) {
                      var n, o, i;
                      return e().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (
                                  r.preventDefault(),
                                  (n = document.getElementById("email").value),
                                  (o =
                                    document.getElementById("password").value),
                                  console.log(n, o),
                                  (t.prev = 4),
                                  (t.next = 7),
                                  axios.post(
                                    "http://127.0.0.1:8000/api/login",
                                    { email: n, password: o },
                                  )
                                );
                              case 7:
                                (i = t.sent),
                                  console.log("Login successful:", i),
                                  (t.next = 14);
                                break;
                              case 11:
                                (t.prev = 11),
                                  (t.t0 = t.catch(4)),
                                  console.error("Login error:", t.t0.response);
                              case 14:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        null,
                        [[4, 11]],
                      );
                    })),
                    function () {
                      var e = this,
                        n = arguments;
                      return new Promise(function (o, i) {
                        var a = t.apply(e, n);
                        function c(t) {
                          r(a, o, i, c, u, "next", t);
                        }
                        function u(t) {
                          r(a, o, i, c, u, "throw", t);
                        }
                        c(void 0);
                      });
                    });
                return function (t) {
                  return n.apply(this, arguments);
                };
              })(),
            );
        });
      },
      365: (t, e, r) => {
        "use strict";
        r.d(e, { A: () => c });
        var n = r(601),
          o = r.n(n),
          i = r(314),
          a = r.n(i)()(o());
        a.push([
          t.id,
          'body {\n  font-family: Arial, sans-serif;\n  background-color: #f4f4f4;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n.login-container {\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 20px;\n  width: 300px;\n}\n\nh2 {\n  margin-bottom: 20px;\n  text-align: center;\n}\n\n.form-group {\n  margin-bottom: 15px;\n}\n\nlabel {\n  display: block;\n  margin-bottom: 5px;\n}\n\ninput[type="email"],\ninput[type="password"] {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  box-sizing: border-box;\n}\n\nbutton[type="submit"] {\n  width: 100%;\n  padding: 10px;\n  background-color: #007bff;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\nbutton[type="submit"]:hover {\n  background-color: #0056b3;\n}\n\n.error {\n  color: red;\n  margin-top: 10px;\n  text-align: center;\n}\n',
          "",
        ]);
        const c = a;
      },
      314: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var r = "",
                  n = void 0 !== e[5];
                return (
                  e[4] && (r += "@supports (".concat(e[4], ") {")),
                  e[2] && (r += "@media ".concat(e[2], " {")),
                  n &&
                    (r += "@layer".concat(
                      e[5].length > 0 ? " ".concat(e[5]) : "",
                      " {",
                    )),
                  (r += t(e)),
                  n && (r += "}"),
                  e[2] && (r += "}"),
                  e[4] && (r += "}"),
                  r
                );
              }).join("");
            }),
            (e.i = function (t, r, n, o, i) {
              "string" == typeof t && (t = [[null, t, void 0]]);
              var a = {};
              if (n)
                for (var c = 0; c < this.length; c++) {
                  var u = this[c][0];
                  null != u && (a[u] = !0);
                }
              for (var s = 0; s < t.length; s++) {
                var l = [].concat(t[s]);
                (n && a[l[0]]) ||
                  (void 0 !== i &&
                    (void 0 === l[5] ||
                      (l[1] = "@layer"
                        .concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {")
                        .concat(l[1], "}")),
                    (l[5] = i)),
                  r &&
                    (l[2]
                      ? ((l[1] = "@media "
                          .concat(l[2], " {")
                          .concat(l[1], "}")),
                        (l[2] = r))
                      : (l[2] = r)),
                  o &&
                    (l[4]
                      ? ((l[1] = "@supports ("
                          .concat(l[4], ") {")
                          .concat(l[1], "}")),
                        (l[4] = o))
                      : (l[4] = "".concat(o))),
                  e.push(l));
              }
            }),
            e
          );
        };
      },
      601: (t) => {
        "use strict";
        t.exports = function (t) {
          return t[1];
        };
      },
      72: (t) => {
        "use strict";
        var e = [];
        function r(t) {
          for (var r = -1, n = 0; n < e.length; n++)
            if (e[n].identifier === t) {
              r = n;
              break;
            }
          return r;
        }
        function n(t, n) {
          for (var i = {}, a = [], c = 0; c < t.length; c++) {
            var u = t[c],
              s = n.base ? u[0] + n.base : u[0],
              l = i[s] || 0,
              f = "".concat(s, " ").concat(l);
            i[s] = l + 1;
            var p = r(f),
              h = {
                css: u[1],
                media: u[2],
                sourceMap: u[3],
                supports: u[4],
                layer: u[5],
              };
            if (-1 !== p) e[p].references++, e[p].updater(h);
            else {
              var d = o(h, n);
              (n.byIndex = c),
                e.splice(c, 0, { identifier: f, updater: d, references: 1 });
            }
            a.push(f);
          }
          return a;
        }
        function o(t, e) {
          var r = e.domAPI(e);
          return (
            r.update(t),
            function (e) {
              if (e) {
                if (
                  e.css === t.css &&
                  e.media === t.media &&
                  e.sourceMap === t.sourceMap &&
                  e.supports === t.supports &&
                  e.layer === t.layer
                )
                  return;
                r.update((t = e));
              } else r.remove();
            }
          );
        }
        t.exports = function (t, o) {
          var i = n((t = t || []), (o = o || {}));
          return function (t) {
            t = t || [];
            for (var a = 0; a < i.length; a++) {
              var c = r(i[a]);
              e[c].references--;
            }
            for (var u = n(t, o), s = 0; s < i.length; s++) {
              var l = r(i[s]);
              0 === e[l].references && (e[l].updater(), e.splice(l, 1));
            }
            i = u;
          };
        };
      },
      659: (t) => {
        "use strict";
        var e = {};
        t.exports = function (t, r) {
          var n = (function (t) {
            if (void 0 === e[t]) {
              var r = document.querySelector(t);
              if (
                window.HTMLIFrameElement &&
                r instanceof window.HTMLIFrameElement
              )
                try {
                  r = r.contentDocument.head;
                } catch (t) {
                  r = null;
                }
              e[t] = r;
            }
            return e[t];
          })(t);
          if (!n)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            );
          n.appendChild(r);
        };
      },
      540: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = document.createElement("style");
          return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
        };
      },
      56: (t, e, r) => {
        "use strict";
        t.exports = function (t) {
          var e = r.nc;
          e && t.setAttribute("nonce", e);
        };
      },
      825: (t) => {
        "use strict";
        t.exports = function (t) {
          if ("undefined" == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = t.insertStyleElement(t);
          return {
            update: function (r) {
              !(function (t, e, r) {
                var n = "";
                r.supports && (n += "@supports (".concat(r.supports, ") {")),
                  r.media && (n += "@media ".concat(r.media, " {"));
                var o = void 0 !== r.layer;
                o &&
                  (n += "@layer".concat(
                    r.layer.length > 0 ? " ".concat(r.layer) : "",
                    " {",
                  )),
                  (n += r.css),
                  o && (n += "}"),
                  r.media && (n += "}"),
                  r.supports && (n += "}");
                var i = r.sourceMap;
                i &&
                  "undefined" != typeof btoa &&
                  (n +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                      " */",
                    )),
                  e.styleTagTransform(n, t, e.options);
              })(e, t, r);
            },
            remove: function () {
              !(function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(e);
            },
          };
        };
      },
      113: (t) => {
        "use strict";
        t.exports = function (t, e) {
          if (e.styleSheet) e.styleSheet.cssText = t;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(t));
          }
        };
      },
    },
    e = {};
  function r(n) {
    var o = e[n];
    if (void 0 !== o) return o.exports;
    var i = (e[n] = { id: n, exports: {} });
    return t[n](i, i.exports, r), i.exports;
  }
  (r.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return r.d(e, { a: e }), e;
  }),
    (r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.nc = void 0),
    (() => {
      "use strict";
      var t = r(72),
        e = r.n(t),
        n = r(825),
        o = r.n(n),
        i = r(659),
        a = r.n(i),
        c = r(56),
        u = r.n(c),
        s = r(540),
        l = r.n(s),
        f = r(113),
        p = r.n(f),
        h = r(365),
        d = {};
      (d.styleTagTransform = p()),
        (d.setAttributes = u()),
        (d.insert = a().bind(null, "head")),
        (d.domAPI = o()),
        (d.insertStyleElement = l()),
        e()(h.A, d),
        h.A && h.A.locals && h.A.locals,
        r(866);
    })();
})();
