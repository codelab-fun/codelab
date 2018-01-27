!function t(e, r) {
  "object" == typeof exports && "object" == typeof module ? module.exports = r(require("react"), require("highcharts/highmaps")) : "function" == typeof define && define.amd ? define(["react", "highcharts/highmaps"], r) : "object" == typeof exports ? exports.ReactHighmaps = r(require("react"), require("highcharts/highmaps")) : e.ReactHighmaps = r(e.React, e.Highcharts)
}(this, function (t, e) {
  return function (t) {
    function e(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {i: n, l: !1, exports: {}};
      return t[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports
    }

    var r = {};
    return e.m = t, e.c = r, e.i = function (t) {
      return t
    }, e.d = function (t, r, n) {
      e.o(t, r) || Object.defineProperty(t, r, {configurable: !1, enumerable: !0, get: n})
    }, e.n = function (t) {
      var r = t && t.__esModule ? function e() {
        return t.default
      } : function e() {
        return t
      };
      return e.d(r, "a", r), r
    }, e.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 19)
  }({
    0: function (e, r) {
      e.exports = t
    }, 1: function (t, e, r) {
      "use strict";
      (function (e) {
        function n(t) {
          return t && t.__esModule ? t : {default: t}
        }

        function o(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
          if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function c(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }

        var a = Object.assign || function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
          }
          return t
        }, u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
          }

          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e
          }
        }(), s = r(0), f = n(s), h = void 0 === e ? window : e;
        t.exports = function (e, r) {
          var n = function (t) {
            function n() {
              o(this, n);
              var t = i(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
              return t.setChartRef = function (e) {
                t.chartRef = e
              }, t.chartType = e, t.Highcharts = r, t.displayName = "Highcharts" + e, t
            }

            return c(n, t), u(n, [{
              key: "renderChart", value: function t(e) {
                var r = this;
                if (!e) throw Error("Config must be specified for the " + this.displayName + " component");
                var n = e.chart;
                this.chart = new this.Highcharts[this.chartType](a({}, e, {chart: a({}, n, {renderTo: this.chartRef})}), this.props.callback), this.props.neverReflow || h && h.requestAnimationFrame && requestAnimationFrame(function () {
                  r.chart && r.chart.options && r.chart.reflow()
                })
              }
            }, {
              key: "shouldComponentUpdate", value: function t(e) {
                return !!(e.neverReflow || e.isPureConfig && this.props.config === e.config) || (this.renderChart(e.config), !1)
              }
            }, {
              key: "getChart", value: function t() {
                if (!this.chart) throw Error("getChart() should not be called before the component is mounted");
                return this.chart
              }
            }, {
              key: "componentDidMount", value: function t() {
                this.renderChart(this.props.config)
              }
            }, {
              key: "componentWillUnmount", value: function t() {
                this.chart.destroy()
              }
            }, {
              key: "render", value: function t() {
                return f.default.createElement("div", a({ref: this.setChartRef}, this.props.domProps))
              }
            }]), n
          }(s.Component), p;
          n.defaultProps = {
            callback: function t() {
            }, domProps: {}
          };
          var l = n;
          return l.Highcharts = r, l.withHighcharts = function (r) {
            return t.exports(e, r)
          }, l
        }
      }).call(e, r(2))
    }, 17: function (t, r) {
      t.exports = e
    }, 19: function (t, e, r) {
      t.exports = r(7)
    }, 2: function (t, e) {
      var r;
      r = function () {
        return this
      }();
      try {
        r = r || Function("return this")() || (0, eval)("this")
      } catch (t) {
        "object" == typeof window && (r = window)
      }
      t.exports = r
    }, 7: function (t, e, r) {
      "use strict";
      t.exports = r(1)("Map", r(17))
    }
  })
});
