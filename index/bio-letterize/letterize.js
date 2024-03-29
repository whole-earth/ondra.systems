/**
 * letterize.js v1.0.0
 * (c) 2020 Wojciech Krakowiak
 * Released under the MIT license
 * https://github.com/WojciechWKROPCE/letterize
 */

 !function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Letterize = e()
}(this, function() {
    "use strict";
    function n(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function d(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, r = new Array(t.length); e < t.length; e++)
                    r[e] = t[e];
                return r
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))
                return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    function h(t, e, r) {
        var n = t.textContent.trim()
          , i = n.length
          , o = [];
        t.textContent = "";
        for (var s = 0; s < i; s++) {
            var a = document.createElement(e);
            r && r.length && a.classList.add(r),
            a.textContent = " " === n[s] ? " " : n[s],
            t.before(a),
            o.push(a)
        }
        return o
    }
    function y(t, e, r, n, i, o, s, a) {
        var l;
        if (Array.isArray(e.letterize_id) || (e.letterize_id = []),
        !e.letterize_id.includes(a)) {
            e.letterize_id.push(a);
            for (var u = d(e.childNodes), c = u.length, f = 0; f < c; f++) {
                var p = void 0;
                switch (u[f].nodeType) {
                case 1:
                    -1 === Array.prototype.indexOf.call(t, u[f]) && y(t, u[f], r, n, i, o, s, a);
                    break;
                case 3:
                    p = h(u[f], r, n),
                    o.push.apply(o, d(p)),
                    (l = i[s]).push.apply(l, d(p))
                }
            }
        }
    }
    return function() {
        function c() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            !function(t, e) {
                if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, c);
            var e, r = (e = t.targets,
            NodeList.prototype.isPrototypeOf(e) || HTMLCollection.prototype.isPrototypeOf(e) || Array.isArray(e) ? e : HTMLElement.prototype.isPrototypeOf(e) ? [e] : "string" == typeof e ? document.querySelectorAll(e) : null);
            if (!r || !r.length)
                return console.error("Letterize: targets '".concat(this.targets, "' not found or not specified")),
                !1;
            var n = r.length;
            c.numInstances = (c.numInstances || 0) + 1;
            for (var i = t.wrapper || "span", o = t.className, s = c.numInstances, a = [], l = [], u = 0; u < n; u++)
                a[u] = [],
                y(r, r[u], i, o, a, l, u, s);
            this.getWrapper = function() {
                return i
            }
            ,
            this.getTargets = function() {
                return r
            }
            ,
            this.list = function() {
                return a
            }
            ,
            this.listAll = function() {
                return l
            }
            ,
            this.getClassName = function() {
                return o
            }
        }
        var t, e, r;
        return t = c,
        (e = [{
            key: "deletterize",
            value: function() {
                for (var t = this.listAll().length, e = 0; e < t; e++) {
                    var r;
                    (r = this.listAll()[e]).before.apply(r, d(this.listAll()[e].childNodes)),
                    this.listAll()[e].remove()
                }
                this.getWrapper = void 0,
                this.getTargets = void 0,
                this.list = void 0,
                this.listAll = void 0,
                this.getClassName = void 0,
                this.deletterize = void 0
            }
        }]) && n(t.prototype, e),
        r && n(t, r),
        c
    }()
});