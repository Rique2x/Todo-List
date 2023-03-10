(() => {
  "use strict";
  const e = {
      events: {},
      subscribe(e, t) {
        (this.events[e] = this.events[e] || []), this.events[e].push(t);
      },
      publish(e, t) {
        this.events[e] &&
          this.events[e].forEach((e) => {
            e(t);
          });
      },
    },
    t = (() => {
      const t = [];
      function n(n) {
        t.push({ title: n, id: t.length, task: [] }),
          e.publish("add-project-array", t[t.length - 1]),
          e.publish("add-project-local-storage", { key: "project", value: t });
      }
      function r(n) {
        t.splice(n, 1),
          (function () {
            let e = 0;
            t.forEach((t) => {
              (t.id = e), (e += 1);
            });
          })(),
          e.publish("delete-project-local-storage", {
            key: "project",
            value: t,
          }),
          console.log(t);
      }
      function a(n) {
        (t[n.id].title = n.title),
          e.publish("edit-project-array", n.id),
          e.publish("edit-project-local-storage", { key: "project", value: t });
      }
      return {
        render: function () {
          e.subscribe("add-project", n),
            e.subscribe("delete-project", r),
            e.subscribe("edit-project", a);
        },
        projectList: t,
      };
    })();
  function n(e, t) {
    if (t.length < e)
      throw new TypeError(
        e +
          " argument" +
          (e > 1 ? "s" : "") +
          " required, but only " +
          t.length +
          " present"
      );
  }
  function r(e) {
    return (
      (r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      r(e)
    );
  }
  function a(e) {
    n(1, arguments);
    var t = Object.prototype.toString.call(e);
    return e instanceof Date || ("object" === r(e) && "[object Date]" === t)
      ? new Date(e.getTime())
      : "number" == typeof e || "[object Number]" === t
      ? new Date(e)
      : (("string" != typeof e && "[object String]" !== t) ||
          "undefined" == typeof console ||
          (console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
          ),
          console.warn(new Error().stack)),
        new Date(NaN));
  }
  function o(e) {
    n(1, arguments);
    var t = a(e);
    return t.setHours(0, 0, 0, 0), t;
  }
  function i(e) {
    if (null === e || !0 === e || !1 === e) return NaN;
    var t = Number(e);
    return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
  }
  var c = {};
  function s() {
    return c;
  }
  function u(e, t) {
    var r, o, c, u, d, l, m, h;
    n(1, arguments);
    var f = s(),
      v = i(
        null !==
          (r =
            null !==
              (o =
                null !==
                  (c =
                    null !== (u = null == t ? void 0 : t.weekStartsOn) &&
                    void 0 !== u
                      ? u
                      : null == t ||
                        null === (d = t.locale) ||
                        void 0 === d ||
                        null === (l = d.options) ||
                        void 0 === l
                      ? void 0
                      : l.weekStartsOn) && void 0 !== c
                  ? c
                  : f.weekStartsOn) && void 0 !== o
              ? o
              : null === (m = f.locale) ||
                void 0 === m ||
                null === (h = m.options) ||
                void 0 === h
              ? void 0
              : h.weekStartsOn) && void 0 !== r
          ? r
          : 0
      );
    if (!(v >= 0 && v <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var p = a(e),
      g = p.getDay(),
      b = (g < v ? 7 : 0) + g - v;
    return p.setDate(p.getDate() - b), p.setHours(0, 0, 0, 0), p;
  }
  const d = (() => {
      const t = [];
      function r(n) {
        t.push(n),
          e.publish("add-task-local-storage", { key: "task", value: t });
      }
      function a() {
        e.publish("filter-tasks", t);
      }
      function i() {
        const r = t.filter((e) =>
          (function (e) {
            return (
              n(1, arguments),
              (function (e, t) {
                n(2, arguments);
                var r = o(e),
                  a = o(t);
                return r.getTime() === a.getTime();
              })(e, Date.now())
            );
          })(new Date(e.dueDate))
        );
        e.publish("filter-tasks", r);
      }
      function c() {
        const r = t.filter((e) =>
          (function (e, t) {
            return (
              n(1, arguments),
              (function (e, t, r) {
                n(2, arguments);
                var a = u(e, r),
                  o = u(t, r);
                return a.getTime() === o.getTime();
              })(e, Date.now(), t)
            );
          })(new Date(e.dueDate))
        );
        e.publish("filter-tasks", r);
      }
      function s(n) {
        const r = t.filter((e) => e.projectId === n);
        e.publish("filter-tasks", r);
      }
      function d(n) {
        t.splice(n, 1),
          (function () {
            let e = 0;
            t.forEach((t) => {
              (t.id = e), (e += 1);
            });
          })(),
          e.publish("complete-task-local-storage", { key: "task", value: t }),
          console.log(t);
      }
      function l() {
        for (let e = 0; e < t.length - 1; e += 1) t[e].id = e;
      }
      function m(e) {
        t.forEach((t) => {
          t.projectId > e && (t.projectId -= 1);
        });
      }
      function h(n) {
        for (let e = t.length - 1; e >= 0; e -= 1)
          t[e].projectId === n && t.splice(e, 1);
        e.publish("complete-task-local-storage", { key: "task", value: t });
      }
      function f(e) {
        const n = e.id;
        (t[n].title = e.title),
          (t[n].dueDate = e.dueDate),
          (t[n].description = e.description),
          (t[n].priority = e.priority);
      }
      return {
        render: function () {
          e.subscribe("filter-inbox-tasks", a),
            e.subscribe("filter-today-tasks", i),
            e.subscribe("filter-week-tasks", c),
            e.subscribe("filter-custom-project-tasks", s),
            e.subscribe("add-task", r),
            e.subscribe("complete-task", d),
            e.subscribe("edit-task", f),
            e.subscribe("delete-project-tasks", h),
            e.subscribe("update-task-id", l),
            e.subscribe("update-task-project-id", m);
        },
        taskList: t,
      };
    })(),
    l = (() => {
      const n = (e) => JSON.parse(localStorage.getItem(e) || "[]");
      function r() {
        n("task").forEach((e) => d.taskList.push(e));
      }
      function a() {
        n("project").forEach((e) => {
          t.projectList.push(e);
        });
      }
      function o({ key: e, value: t }) {
        localStorage.setItem(e, JSON.stringify(t));
      }
      const i = [
        {
          title: "Complete Todo List",
          description: "A project by The Odin Project.",
          dueDate: "Tue Dec 13 2022 17:09:00 GMT-0600 (Central Standard Time)",
          priority: "High",
          id: 0,
          projectId: 0,
        },
        {
          title: "Wash the dishes",
          description: "",
          dueDate: "Tue Dec 14 2022 20:00:00 GMT-0600 (Central Standard Time)",
          priority: "Medium",
          id: 1,
          projectId: 0,
        },
        {
          title: "Make the bed",
          description: "",
          dueDate: "Invalid Date",
          priority: "Low",
          id: 2,
          projectId: 1,
        },
        {
          title: "Eat dinner",
          description: "",
          dueDate: "Tue Dec 13 2022 18:30:00 GMT-0600 (Central Standard Time)",
          priority: "High",
          id: 3,
          projectId: 1,
        },
      ];
      return {
        populateStoredTasks: r,
        populateStoredProjects: a,
        checkTasksStored: function () {
          return 0 === n("task").length;
        },
        checkProjectsStored: function () {
          return 0 === n("project").length;
        },
        getSelectedProjectId: () => +n("project-id"),
        getSelectedProjectAttribute: () => {
          localStorage.getItem("project-attribute");
        },
        defaultProjects: [
          { title: "Default Project 1", id: 0, task: [i[0], i[1]] },
          { title: "Default Project 2", id: 1, task: [i[2], i[3]] },
        ],
        defaultTasks: i,
        render: function () {
          e.subscribe("add-project-local-storage", o),
            e.subscribe("delete-project-local-storage", o),
            e.subscribe("edit-project-local-storage", o),
            e.subscribe("complete-task-local-storage", o),
            e.subscribe("add-task-local-storage", o),
            e.subscribe("populate-tasks-local-storage", r),
            e.subscribe("populate-projects-local-storage", a);
        },
        setItem: o,
      };
    })();
  function m(e) {
    return (
      (m =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      m(e)
    );
  }
  function h(e) {
    if (
      (n(1, arguments),
      !(function (e) {
        return (
          n(1, arguments),
          e instanceof Date ||
            ("object" === m(e) &&
              "[object Date]" === Object.prototype.toString.call(e))
        );
      })(e) && "number" != typeof e)
    )
      return !1;
    var t = a(e);
    return !isNaN(Number(t));
  }
  var f = 864e5;
  function v(e) {
    n(1, arguments);
    var t = a(e),
      r = t.getUTCDay(),
      o = (r < 1 ? 7 : 0) + r - 1;
    return t.setUTCDate(t.getUTCDate() - o), t.setUTCHours(0, 0, 0, 0), t;
  }
  function p(e) {
    n(1, arguments);
    var t = a(e),
      r = t.getUTCFullYear(),
      o = new Date(0);
    o.setUTCFullYear(r + 1, 0, 4), o.setUTCHours(0, 0, 0, 0);
    var i = v(o),
      c = new Date(0);
    c.setUTCFullYear(r, 0, 4), c.setUTCHours(0, 0, 0, 0);
    var s = v(c);
    return t.getTime() >= i.getTime()
      ? r + 1
      : t.getTime() >= s.getTime()
      ? r
      : r - 1;
  }
  var g = 6048e5;
  function b(e, t) {
    var r, o, c, u, d, l, m, h;
    n(1, arguments);
    var f = s(),
      v = i(
        null !==
          (r =
            null !==
              (o =
                null !==
                  (c =
                    null !== (u = null == t ? void 0 : t.weekStartsOn) &&
                    void 0 !== u
                      ? u
                      : null == t ||
                        null === (d = t.locale) ||
                        void 0 === d ||
                        null === (l = d.options) ||
                        void 0 === l
                      ? void 0
                      : l.weekStartsOn) && void 0 !== c
                  ? c
                  : f.weekStartsOn) && void 0 !== o
              ? o
              : null === (m = f.locale) ||
                void 0 === m ||
                null === (h = m.options) ||
                void 0 === h
              ? void 0
              : h.weekStartsOn) && void 0 !== r
          ? r
          : 0
      );
    if (!(v >= 0 && v <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var p = a(e),
      g = p.getUTCDay(),
      b = (g < v ? 7 : 0) + g - v;
    return p.setUTCDate(p.getUTCDate() - b), p.setUTCHours(0, 0, 0, 0), p;
  }
  function y(e, t) {
    var r, o, c, u, d, l, m, h;
    n(1, arguments);
    var f = a(e),
      v = f.getUTCFullYear(),
      p = s(),
      g = i(
        null !==
          (r =
            null !==
              (o =
                null !==
                  (c =
                    null !==
                      (u = null == t ? void 0 : t.firstWeekContainsDate) &&
                    void 0 !== u
                      ? u
                      : null == t ||
                        null === (d = t.locale) ||
                        void 0 === d ||
                        null === (l = d.options) ||
                        void 0 === l
                      ? void 0
                      : l.firstWeekContainsDate) && void 0 !== c
                  ? c
                  : p.firstWeekContainsDate) && void 0 !== o
              ? o
              : null === (m = p.locale) ||
                void 0 === m ||
                null === (h = m.options) ||
                void 0 === h
              ? void 0
              : h.firstWeekContainsDate) && void 0 !== r
          ? r
          : 1
      );
    if (!(g >= 1 && g <= 7))
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var y = new Date(0);
    y.setUTCFullYear(v + 1, 0, g), y.setUTCHours(0, 0, 0, 0);
    var w = b(y, t),
      k = new Date(0);
    k.setUTCFullYear(v, 0, g), k.setUTCHours(0, 0, 0, 0);
    var S = b(k, t);
    return f.getTime() >= w.getTime()
      ? v + 1
      : f.getTime() >= S.getTime()
      ? v
      : v - 1;
  }
  var w = 6048e5;
  function k(e, t) {
    for (var n = e < 0 ? "-" : "", r = Math.abs(e).toString(); r.length < t; )
      r = "0" + r;
    return n + r;
  }
  const S = function (e, t) {
      var n = e.getUTCFullYear(),
        r = n > 0 ? n : 1 - n;
      return k("yy" === t ? r % 100 : r, t.length);
    },
    L = function (e, t) {
      var n = e.getUTCMonth();
      return "M" === t ? String(n + 1) : k(n + 1, 2);
    },
    j = function (e, t) {
      return k(e.getUTCDate(), t.length);
    },
    T = function (e, t) {
      return k(e.getUTCHours() % 12 || 12, t.length);
    },
    C = function (e, t) {
      return k(e.getUTCHours(), t.length);
    },
    M = function (e, t) {
      return k(e.getUTCMinutes(), t.length);
    },
    D = function (e, t) {
      return k(e.getUTCSeconds(), t.length);
    },
    E = function (e, t) {
      var n = t.length,
        r = e.getUTCMilliseconds();
      return k(Math.floor(r * Math.pow(10, n - 3)), t.length);
    };
  var q = {
    G: function (e, t, n) {
      var r = e.getUTCFullYear() > 0 ? 1 : 0;
      switch (t) {
        case "G":
        case "GG":
        case "GGG":
          return n.era(r, { width: "abbreviated" });
        case "GGGGG":
          return n.era(r, { width: "narrow" });
        default:
          return n.era(r, { width: "wide" });
      }
    },
    y: function (e, t, n) {
      if ("yo" === t) {
        var r = e.getUTCFullYear(),
          a = r > 0 ? r : 1 - r;
        return n.ordinalNumber(a, { unit: "year" });
      }
      return S(e, t);
    },
    Y: function (e, t, n, r) {
      var a = y(e, r),
        o = a > 0 ? a : 1 - a;
      return "YY" === t
        ? k(o % 100, 2)
        : "Yo" === t
        ? n.ordinalNumber(o, { unit: "year" })
        : k(o, t.length);
    },
    R: function (e, t) {
      return k(p(e), t.length);
    },
    u: function (e, t) {
      return k(e.getUTCFullYear(), t.length);
    },
    Q: function (e, t, n) {
      var r = Math.ceil((e.getUTCMonth() + 1) / 3);
      switch (t) {
        case "Q":
          return String(r);
        case "QQ":
          return k(r, 2);
        case "Qo":
          return n.ordinalNumber(r, { unit: "quarter" });
        case "QQQ":
          return n.quarter(r, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return n.quarter(r, { width: "narrow", context: "formatting" });
        default:
          return n.quarter(r, { width: "wide", context: "formatting" });
      }
    },
    q: function (e, t, n) {
      var r = Math.ceil((e.getUTCMonth() + 1) / 3);
      switch (t) {
        case "q":
          return String(r);
        case "qq":
          return k(r, 2);
        case "qo":
          return n.ordinalNumber(r, { unit: "quarter" });
        case "qqq":
          return n.quarter(r, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return n.quarter(r, { width: "narrow", context: "standalone" });
        default:
          return n.quarter(r, { width: "wide", context: "standalone" });
      }
    },
    M: function (e, t, n) {
      var r = e.getUTCMonth();
      switch (t) {
        case "M":
        case "MM":
          return L(e, t);
        case "Mo":
          return n.ordinalNumber(r + 1, { unit: "month" });
        case "MMM":
          return n.month(r, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return n.month(r, { width: "narrow", context: "formatting" });
        default:
          return n.month(r, { width: "wide", context: "formatting" });
      }
    },
    L: function (e, t, n) {
      var r = e.getUTCMonth();
      switch (t) {
        case "L":
          return String(r + 1);
        case "LL":
          return k(r + 1, 2);
        case "Lo":
          return n.ordinalNumber(r + 1, { unit: "month" });
        case "LLL":
          return n.month(r, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return n.month(r, { width: "narrow", context: "standalone" });
        default:
          return n.month(r, { width: "wide", context: "standalone" });
      }
    },
    w: function (e, t, r, o) {
      var c = (function (e, t) {
        n(1, arguments);
        var r = a(e),
          o =
            b(r, t).getTime() -
            (function (e, t) {
              var r, a, o, c, u, d, l, m;
              n(1, arguments);
              var h = s(),
                f = i(
                  null !==
                    (r =
                      null !==
                        (a =
                          null !==
                            (o =
                              null !==
                                (c =
                                  null == t
                                    ? void 0
                                    : t.firstWeekContainsDate) && void 0 !== c
                                ? c
                                : null == t ||
                                  null === (u = t.locale) ||
                                  void 0 === u ||
                                  null === (d = u.options) ||
                                  void 0 === d
                                ? void 0
                                : d.firstWeekContainsDate) && void 0 !== o
                            ? o
                            : h.firstWeekContainsDate) && void 0 !== a
                        ? a
                        : null === (l = h.locale) ||
                          void 0 === l ||
                          null === (m = l.options) ||
                          void 0 === m
                        ? void 0
                        : m.firstWeekContainsDate) && void 0 !== r
                    ? r
                    : 1
                ),
                v = y(e, t),
                p = new Date(0);
              return (
                p.setUTCFullYear(v, 0, f), p.setUTCHours(0, 0, 0, 0), b(p, t)
              );
            })(r, t).getTime();
        return Math.round(o / w) + 1;
      })(e, o);
      return "wo" === t ? r.ordinalNumber(c, { unit: "week" }) : k(c, t.length);
    },
    I: function (e, t, r) {
      var o = (function (e) {
        n(1, arguments);
        var t = a(e),
          r =
            v(t).getTime() -
            (function (e) {
              n(1, arguments);
              var t = p(e),
                r = new Date(0);
              return r.setUTCFullYear(t, 0, 4), r.setUTCHours(0, 0, 0, 0), v(r);
            })(t).getTime();
        return Math.round(r / g) + 1;
      })(e);
      return "Io" === t ? r.ordinalNumber(o, { unit: "week" }) : k(o, t.length);
    },
    d: function (e, t, n) {
      return "do" === t
        ? n.ordinalNumber(e.getUTCDate(), { unit: "date" })
        : j(e, t);
    },
    D: function (e, t, r) {
      var o = (function (e) {
        n(1, arguments);
        var t = a(e),
          r = t.getTime();
        t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
        var o = r - t.getTime();
        return Math.floor(o / f) + 1;
      })(e);
      return "Do" === t
        ? r.ordinalNumber(o, { unit: "dayOfYear" })
        : k(o, t.length);
    },
    E: function (e, t, n) {
      var r = e.getUTCDay();
      switch (t) {
        case "E":
        case "EE":
        case "EEE":
          return n.day(r, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return n.day(r, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return n.day(r, { width: "short", context: "formatting" });
        default:
          return n.day(r, { width: "wide", context: "formatting" });
      }
    },
    e: function (e, t, n, r) {
      var a = e.getUTCDay(),
        o = (a - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "e":
          return String(o);
        case "ee":
          return k(o, 2);
        case "eo":
          return n.ordinalNumber(o, { unit: "day" });
        case "eee":
          return n.day(a, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return n.day(a, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return n.day(a, { width: "short", context: "formatting" });
        default:
          return n.day(a, { width: "wide", context: "formatting" });
      }
    },
    c: function (e, t, n, r) {
      var a = e.getUTCDay(),
        o = (a - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "c":
          return String(o);
        case "cc":
          return k(o, t.length);
        case "co":
          return n.ordinalNumber(o, { unit: "day" });
        case "ccc":
          return n.day(a, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return n.day(a, { width: "narrow", context: "standalone" });
        case "cccccc":
          return n.day(a, { width: "short", context: "standalone" });
        default:
          return n.day(a, { width: "wide", context: "standalone" });
      }
    },
    i: function (e, t, n) {
      var r = e.getUTCDay(),
        a = 0 === r ? 7 : r;
      switch (t) {
        case "i":
          return String(a);
        case "ii":
          return k(a, t.length);
        case "io":
          return n.ordinalNumber(a, { unit: "day" });
        case "iii":
          return n.day(r, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return n.day(r, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return n.day(r, { width: "short", context: "formatting" });
        default:
          return n.day(r, { width: "wide", context: "formatting" });
      }
    },
    a: function (e, t, n) {
      var r = e.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (t) {
        case "a":
        case "aa":
          return n.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting",
          });
        case "aaa":
          return n
            .dayPeriod(r, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "aaaaa":
          return n.dayPeriod(r, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(r, { width: "wide", context: "formatting" });
      }
    },
    b: function (e, t, n) {
      var r,
        a = e.getUTCHours();
      switch (
        ((r =
          12 === a ? "noon" : 0 === a ? "midnight" : a / 12 >= 1 ? "pm" : "am"),
        t)
      ) {
        case "b":
        case "bb":
          return n.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting",
          });
        case "bbb":
          return n
            .dayPeriod(r, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "bbbbb":
          return n.dayPeriod(r, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(r, { width: "wide", context: "formatting" });
      }
    },
    B: function (e, t, n) {
      var r,
        a = e.getUTCHours();
      switch (
        ((r =
          a >= 17
            ? "evening"
            : a >= 12
            ? "afternoon"
            : a >= 4
            ? "morning"
            : "night"),
        t)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return n.dayPeriod(r, {
            width: "abbreviated",
            context: "formatting",
          });
        case "BBBBB":
          return n.dayPeriod(r, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(r, { width: "wide", context: "formatting" });
      }
    },
    h: function (e, t, n) {
      if ("ho" === t) {
        var r = e.getUTCHours() % 12;
        return 0 === r && (r = 12), n.ordinalNumber(r, { unit: "hour" });
      }
      return T(e, t);
    },
    H: function (e, t, n) {
      return "Ho" === t
        ? n.ordinalNumber(e.getUTCHours(), { unit: "hour" })
        : C(e, t);
    },
    K: function (e, t, n) {
      var r = e.getUTCHours() % 12;
      return "Ko" === t ? n.ordinalNumber(r, { unit: "hour" }) : k(r, t.length);
    },
    k: function (e, t, n) {
      var r = e.getUTCHours();
      return (
        0 === r && (r = 24),
        "ko" === t ? n.ordinalNumber(r, { unit: "hour" }) : k(r, t.length)
      );
    },
    m: function (e, t, n) {
      return "mo" === t
        ? n.ordinalNumber(e.getUTCMinutes(), { unit: "minute" })
        : M(e, t);
    },
    s: function (e, t, n) {
      return "so" === t
        ? n.ordinalNumber(e.getUTCSeconds(), { unit: "second" })
        : D(e, t);
    },
    S: function (e, t) {
      return E(e, t);
    },
    X: function (e, t, n, r) {
      var a = (r._originalDate || e).getTimezoneOffset();
      if (0 === a) return "Z";
      switch (t) {
        case "X":
          return P(a);
        case "XXXX":
        case "XX":
          return H(a);
        default:
          return H(a, ":");
      }
    },
    x: function (e, t, n, r) {
      var a = (r._originalDate || e).getTimezoneOffset();
      switch (t) {
        case "x":
          return P(a);
        case "xxxx":
        case "xx":
          return H(a);
        default:
          return H(a, ":");
      }
    },
    O: function (e, t, n, r) {
      var a = (r._originalDate || e).getTimezoneOffset();
      switch (t) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + x(a, ":");
        default:
          return "GMT" + H(a, ":");
      }
    },
    z: function (e, t, n, r) {
      var a = (r._originalDate || e).getTimezoneOffset();
      switch (t) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + x(a, ":");
        default:
          return "GMT" + H(a, ":");
      }
    },
    t: function (e, t, n, r) {
      var a = r._originalDate || e;
      return k(Math.floor(a.getTime() / 1e3), t.length);
    },
    T: function (e, t, n, r) {
      return k((r._originalDate || e).getTime(), t.length);
    },
  };
  function x(e, t) {
    var n = e > 0 ? "-" : "+",
      r = Math.abs(e),
      a = Math.floor(r / 60),
      o = r % 60;
    if (0 === o) return n + String(a);
    var i = t || "";
    return n + String(a) + i + k(o, 2);
  }
  function P(e, t) {
    return e % 60 == 0 ? (e > 0 ? "-" : "+") + k(Math.abs(e) / 60, 2) : H(e, t);
  }
  function H(e, t) {
    var n = t || "",
      r = e > 0 ? "-" : "+",
      a = Math.abs(e);
    return r + k(Math.floor(a / 60), 2) + n + k(a % 60, 2);
  }
  const U = q;
  var W = function (e, t) {
      switch (e) {
        case "P":
          return t.date({ width: "short" });
        case "PP":
          return t.date({ width: "medium" });
        case "PPP":
          return t.date({ width: "long" });
        default:
          return t.date({ width: "full" });
      }
    },
    O = function (e, t) {
      switch (e) {
        case "p":
          return t.time({ width: "short" });
        case "pp":
          return t.time({ width: "medium" });
        case "ppp":
          return t.time({ width: "long" });
        default:
          return t.time({ width: "full" });
      }
    },
    Y = {
      p: O,
      P: function (e, t) {
        var n,
          r = e.match(/(P+)(p+)?/) || [],
          a = r[1],
          o = r[2];
        if (!o) return W(e, t);
        switch (a) {
          case "P":
            n = t.dateTime({ width: "short" });
            break;
          case "PP":
            n = t.dateTime({ width: "medium" });
            break;
          case "PPP":
            n = t.dateTime({ width: "long" });
            break;
          default:
            n = t.dateTime({ width: "full" });
        }
        return n.replace("{{date}}", W(a, t)).replace("{{time}}", O(o, t));
      },
    };
  const A = Y;
  var N = ["D", "DD"],
    I = ["YY", "YYYY"];
  function V(e, t, n) {
    if ("YYYY" === e)
      throw new RangeError(
        "Use `yyyy` instead of `YYYY` (in `"
          .concat(t, "`) for formatting years to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
          )
      );
    if ("YY" === e)
      throw new RangeError(
        "Use `yy` instead of `YY` (in `"
          .concat(t, "`) for formatting years to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
          )
      );
    if ("D" === e)
      throw new RangeError(
        "Use `d` instead of `D` (in `"
          .concat(t, "`) for formatting days of the month to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
          )
      );
    if ("DD" === e)
      throw new RangeError(
        "Use `dd` instead of `DD` (in `"
          .concat(t, "`) for formatting days of the month to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
          )
      );
  }
  var F = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  };
  function z(e) {
    return function () {
      var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n = t.width ? String(t.width) : e.defaultWidth;
      return e.formats[n] || e.formats[e.defaultWidth];
    };
  }
  var G,
    B = {
      date: z({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        },
        defaultWidth: "full",
      }),
      time: z({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        },
        defaultWidth: "full",
      }),
      dateTime: z({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    Q = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
  function R(e) {
    return function (t, n) {
      var r;
      if (
        "formatting" ===
          (null != n && n.context ? String(n.context) : "standalone") &&
        e.formattingValues
      ) {
        var a = e.defaultFormattingWidth || e.defaultWidth,
          o = null != n && n.width ? String(n.width) : a;
        r = e.formattingValues[o] || e.formattingValues[a];
      } else {
        var i = e.defaultWidth,
          c = null != n && n.width ? String(n.width) : e.defaultWidth;
        r = e.values[c] || e.values[i];
      }
      return r[e.argumentCallback ? e.argumentCallback(t) : t];
    };
  }
  function X(e) {
    return function (t) {
      var n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = n.width,
        a = (r && e.matchPatterns[r]) || e.matchPatterns[e.defaultMatchWidth],
        o = t.match(a);
      if (!o) return null;
      var i,
        c = o[0],
        s = (r && e.parsePatterns[r]) || e.parsePatterns[e.defaultParseWidth],
        u = Array.isArray(s)
          ? (function (e, t) {
              for (var n = 0; n < e.length; n++) if (e[n].test(c)) return n;
            })(s)
          : (function (e, t) {
              for (var n in e)
                if (e.hasOwnProperty(n) && e[n].test(c)) return n;
            })(s);
      return (
        (i = e.valueCallback ? e.valueCallback(u) : u),
        {
          value: (i = n.valueCallback ? n.valueCallback(i) : i),
          rest: t.slice(c.length),
        }
      );
    };
  }
  const J = {
    code: "en-US",
    formatDistance: function (e, t, n) {
      var r,
        a = F[e];
      return (
        (r =
          "string" == typeof a
            ? a
            : 1 === t
            ? a.one
            : a.other.replace("{{count}}", t.toString())),
        null != n && n.addSuffix
          ? n.comparison && n.comparison > 0
            ? "in " + r
            : r + " ago"
          : r
      );
    },
    formatLong: B,
    formatRelative: function (e, t, n, r) {
      return Q[e];
    },
    localize: {
      ordinalNumber: function (e, t) {
        var n = Number(e),
          r = n % 100;
        if (r > 20 || r < 10)
          switch (r % 10) {
            case 1:
              return n + "st";
            case 2:
              return n + "nd";
            case 3:
              return n + "rd";
          }
        return n + "th";
      },
      era: R({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        defaultWidth: "wide",
      }),
      quarter: R({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
        },
        defaultWidth: "wide",
        argumentCallback: function (e) {
          return e - 1;
        },
      }),
      month: R({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        defaultWidth: "wide",
      }),
      day: R({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        defaultWidth: "wide",
      }),
      dayPeriod: R({
        values: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
        },
        defaultWidth: "wide",
        formattingValues: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
        },
        defaultFormattingWidth: "wide",
      }),
    },
    match: {
      ordinalNumber:
        ((G = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function (e) {
            return parseInt(e, 10);
          },
        }),
        function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = e.match(G.matchPattern);
          if (!n) return null;
          var r = n[0],
            a = e.match(G.parsePattern);
          if (!a) return null;
          var o = G.valueCallback ? G.valueCallback(a[0]) : a[0];
          return {
            value: (o = t.valueCallback ? t.valueCallback(o) : o),
            rest: e.slice(r.length),
          };
        }),
      era: X({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: "any",
      }),
      quarter: X({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: "any",
        valueCallback: function (e) {
          return e + 1;
        },
      }),
      month: X({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: "any",
      }),
      day: X({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: "any",
      }),
      dayPeriod: X({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: "any",
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: "any",
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
  var _ = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    Z = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    $ = /^'([^]*?)'?$/,
    K = /''/g,
    ee = /[a-zA-Z]/;
  function te(e, t, r) {
    var o, c, u, d, l, m, f, v, p, g, b, y, w, k, S, L, j, T;
    n(2, arguments);
    var C = String(t),
      M = s(),
      D =
        null !==
          (o =
            null !== (c = null == r ? void 0 : r.locale) && void 0 !== c
              ? c
              : M.locale) && void 0 !== o
          ? o
          : J,
      E = i(
        null !==
          (u =
            null !==
              (d =
                null !==
                  (l =
                    null !==
                      (m = null == r ? void 0 : r.firstWeekContainsDate) &&
                    void 0 !== m
                      ? m
                      : null == r ||
                        null === (f = r.locale) ||
                        void 0 === f ||
                        null === (v = f.options) ||
                        void 0 === v
                      ? void 0
                      : v.firstWeekContainsDate) && void 0 !== l
                  ? l
                  : M.firstWeekContainsDate) && void 0 !== d
              ? d
              : null === (p = M.locale) ||
                void 0 === p ||
                null === (g = p.options) ||
                void 0 === g
              ? void 0
              : g.firstWeekContainsDate) && void 0 !== u
          ? u
          : 1
      );
    if (!(E >= 1 && E <= 7))
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var q = i(
      null !==
        (b =
          null !==
            (y =
              null !==
                (w =
                  null !== (k = null == r ? void 0 : r.weekStartsOn) &&
                  void 0 !== k
                    ? k
                    : null == r ||
                      null === (S = r.locale) ||
                      void 0 === S ||
                      null === (L = S.options) ||
                      void 0 === L
                    ? void 0
                    : L.weekStartsOn) && void 0 !== w
                ? w
                : M.weekStartsOn) && void 0 !== y
            ? y
            : null === (j = M.locale) ||
              void 0 === j ||
              null === (T = j.options) ||
              void 0 === T
            ? void 0
            : T.weekStartsOn) && void 0 !== b
        ? b
        : 0
    );
    if (!(q >= 0 && q <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (!D.localize)
      throw new RangeError("locale must contain localize property");
    if (!D.formatLong)
      throw new RangeError("locale must contain formatLong property");
    var x = a(e);
    if (!h(x)) throw new RangeError("Invalid time value");
    var P = (function (e) {
        var t = new Date(
          Date.UTC(
            e.getFullYear(),
            e.getMonth(),
            e.getDate(),
            e.getHours(),
            e.getMinutes(),
            e.getSeconds(),
            e.getMilliseconds()
          )
        );
        return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
      })(x),
      H = (function (e, t) {
        return (
          n(2, arguments),
          (function (e, t) {
            n(2, arguments);
            var r = a(e).getTime(),
              o = i(t);
            return new Date(r + o);
          })(e, -i(t))
        );
      })(x, P),
      W = {
        firstWeekContainsDate: E,
        weekStartsOn: q,
        locale: D,
        _originalDate: x,
      };
    return C.match(Z)
      .map(function (e) {
        var t = e[0];
        return "p" === t || "P" === t ? (0, A[t])(e, D.formatLong) : e;
      })
      .join("")
      .match(_)
      .map(function (n) {
        if ("''" === n) return "'";
        var a,
          o,
          i = n[0];
        if ("'" === i) return (o = (a = n).match($)) ? o[1].replace(K, "'") : a;
        var c,
          s = U[i];
        if (s)
          return (
            (null != r && r.useAdditionalWeekYearTokens) ||
              ((c = n), -1 === I.indexOf(c)) ||
              V(n, t, String(e)),
            (null != r && r.useAdditionalDayOfYearTokens) ||
              !(function (e) {
                return -1 !== N.indexOf(e);
              })(n) ||
              V(n, t, String(e)),
            s(H, n, D.localize, W)
          );
        if (i.match(ee))
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" +
              i +
              "`"
          );
        return n;
      })
      .join("");
  }
  const ne = (() => {
      const t = (e) => te(e, "EEEE, LLLL do, y, p"),
        n = (e) => +e.target.closest(".task").dataset.taskId,
        r = () =>
          '<svg class="edit edit-task" style="width:24px;height:24px" viewBox="0 0 24 24">\n    <path fill="currentColor" d="M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.85 11.14 20.19 11.13 20.42 11.35L21.7 12.63C21.89 12.83 21.89 13.15 21.7 13.35M12 18.94V21H14.06L20.12 14.88L18.07 12.88L12 18.94M5 19H10V21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5V9H5V19M5 5V7H19V5H5Z" />\n</svg>';
      function a() {
        const { mainProjectId: t } =
          document.querySelector(".selected").dataset;
        if (null != t) {
          const n = ["inbox", "today", "week"];
          e.publish(`filter-${n[t]}-tasks`);
        } else {
          const { projectId: t } = document.querySelector(".selected").dataset;
          e.publish("filter-custom-project-tasks", +t);
        }
      }
      function o(o) {
        (document.querySelector(".all-tasks").innerHTML = ""),
          o.forEach((o) =>
            (function (o) {
              const i = document.querySelector(".all-tasks"),
                c = document.createElement("div"),
                s = document.createElement("div"),
                u = document.createElement("div"),
                d = document.createElement("div"),
                l = document.createElement("div"),
                m = document.createElement("div"),
                h = document.createElement("div"),
                f = document.createElement("div"),
                v = document.createElement("div");
              s.classList.add("task-content-left"),
                u.classList.add("task-content-right"),
                m.classList.add("complete-task"),
                l.classList.add("edit-task-container"),
                d.classList.add("text-task"),
                c.classList.add("task", o.priority),
                h.classList.add("title-task"),
                f.classList.add("description-task"),
                v.classList.add("due-date-task"),
                (c.dataset.taskId = o.id),
                (h.textContent = o.title),
                (f.textContent = o.description),
                (v.textContent =
                  "Invalid Date" !== o.dueDate
                    ? t(new Date(o.dueDate))
                    : "No Due Date"),
                (l.innerHTML += r()),
                d.append(h, f),
                s.append(m, d),
                u.append(v, l),
                c.append(s, u),
                i.appendChild(c),
                m.addEventListener("click", (t) => {
                  e.publish("complete-task", n(t)), a();
                }),
                l.addEventListener("click", (t) => {
                  t.target.closest(".task").classList.add("edit-task-active"),
                    e.publish("open-edit-task-modal");
                });
            })(o)
          );
      }
      return {
        render: function () {
          e.subscribe("filter-tasks", o),
            e.subscribe("check-tasks-to-filter", a);
        },
        checkTasksToFilter: a,
      };
    })(),
    re = (() => {
      const t = () => document.querySelector(".selected"),
        n = () => document.querySelector("#main-title");
      function r() {
        const e = document.querySelector(".selected .projects-item-name");
        n().textContent = e.textContent;
      }
      function a() {
        document
          .querySelector("[data-main-project-id='0']")
          .classList.add("selected"),
          r();
      }
      function o(e) {
        !(function (e) {
          const n = t(),
            r = e.target.closest(".projects-item");
          n !== r &&
            (n && n.classList.remove("selected"), r.classList.add("selected"));
        })(e),
          r(),
          ne.checkTasksToFilter();
      }
      return {
        render: function () {
          (function () {
            const e = document.querySelector("#task-section"),
              t = document.querySelector("nav");
            function n() {
              t.classList.toggle("hide"),
                (function () {
                  let { navOpened: t } = e.dataset;
                  (t = "true" === t ? "false" : "true"),
                    (e.dataset.navOpened = t);
                })();
            }
            const r = document.querySelector("#nav-hamburger-menu"),
              a = document.querySelector("#header-hamburger-menu");
            r.addEventListener("click", n), a.addEventListener("click", n);
          })(),
            document
              .querySelector("#main-projects-list")
              .addEventListener("click", (e) => o(e)),
            e.subscribe("project-selected", o),
            e.subscribe("default-to-inbox-project", a);
        },
      };
    })(),
    ae = (() => {
      function n(e) {
        (e.title.value = ""),
          e.title.classList.remove("active"),
          e.titleError.classList.remove("active"),
          e.isAddProject ||
            ((e.dueDate.value = ""),
            (e.description.value = ""),
            (e.priority.value = "Low"));
      }
      function r(e, t) {
        e.classList.toggle("active"), t.classList.toggle("active");
      }
      function o(e, t) {
        e.value
          ? (e.classList.remove("active"), t.classList.remove("active"))
          : (e.classList.add("active"), t.classList.add("active"));
      }
      function i() {
        const t = document.querySelector("#edit-task-modal"),
          n = document.querySelector("#edit-task-modal-overlay"),
          i = document.querySelector("#edit-task-cancel"),
          c = document.querySelector("#edit-task-modal-header-cancel"),
          s = document.querySelector("#edit-task-save"),
          u = document.querySelector("#edit-task-title"),
          l = document.querySelector("#edit-task-title-error"),
          m = document.querySelector("#edit-task-due-date"),
          f = document.querySelector("#edit-task-description"),
          v = document.querySelector("#edit-task-priority"),
          p = () => {
            const { taskId: e } =
              document.querySelector(".edit-task-active").dataset;
            return +e;
          };
        e.subscribe("open-edit-task-modal", () => {
          var e;
          r(t, n),
            (e = d.taskList[p()]),
            (u.value = e.title),
            "Invalid Date" !== e.dueDate &&
              (m.value = (function (e, t) {
                var n, r;
                if (arguments.length < 1)
                  throw new TypeError(
                    "1 argument required, but only ".concat(
                      arguments.length,
                      " present"
                    )
                  );
                var o = a(e);
                if (!h(o)) throw new RangeError("Invalid time value");
                var i = String(
                    null !== (n = null == t ? void 0 : t.format) && void 0 !== n
                      ? n
                      : "extended"
                  ),
                  c = String(
                    null !== (r = null == t ? void 0 : t.representation) &&
                      void 0 !== r
                      ? r
                      : "complete"
                  );
                if ("extended" !== i && "basic" !== i)
                  throw new RangeError("format must be 'extended' or 'basic'");
                if ("date" !== c && "time" !== c && "complete" !== c)
                  throw new RangeError(
                    "representation must be 'date', 'time', or 'complete'"
                  );
                var s = "",
                  u = "extended" === i ? "-" : "",
                  d = "extended" === i ? ":" : "";
                if ("time" !== c) {
                  var l = k(o.getDate(), 2),
                    m = k(o.getMonth() + 1, 2),
                    f = k(o.getFullYear(), 4);
                  s = "".concat(f).concat(u).concat(m).concat(u).concat(l);
                }
                if ("date" !== c) {
                  var v = k(o.getHours(), 2),
                    p = k(o.getMinutes(), 2),
                    g = k(o.getSeconds(), 2),
                    b = "" === s ? "" : " ";
                  s = ""
                    .concat(s)
                    .concat(b)
                    .concat(v)
                    .concat(d)
                    .concat(p)
                    .concat(d)
                    .concat(g);
                }
                return s;
              })(new Date(e.dueDate))),
            (f.value = e.description),
            (v.value = e.priority),
            o(u, l);
        }),
          u.addEventListener("keyup", () => o(u, l)),
          i.addEventListener("click", () => r(t, n)),
          c.addEventListener("click", () => r(t, n)),
          s.addEventListener("click", () => {
            u.value
              ? (r(t, n),
                e.publish("edit-task", {
                  title: u.value,
                  dueDate: new Date(m.value).toString(),
                  description: f.value,
                  priority: v.value,
                  id: p(),
                }),
                document
                  .querySelector(".edit-task-active")
                  .classList.remove("edit-task-active"),
                e.publish("check-tasks-to-filter"))
              : o(u, l);
          });
      }
      return {
        render: function () {
          !(function () {
            const t = document.querySelector("#add-task-modal"),
              a = document.querySelector("#add-task-modal-overlay"),
              i = document.querySelector("#add-task"),
              c = document.querySelector("#add-task-cancel"),
              s = document.querySelector("#add-task-modal-header-cancel"),
              u = document.querySelector("#add-task-add"),
              l = document.querySelector("#add-task-title"),
              m = document.querySelector("#add-task-title-error"),
              h = document.querySelector("#add-task-due-date"),
              f = document.querySelector("#add-task-description"),
              v = document.querySelector("#add-task-priority");
            l.addEventListener("keyup", () => o(l, m)),
              c.addEventListener("click", () => r(t, a)),
              s.addEventListener("click", () => r(t, a)),
              i.addEventListener("click", () => {
                n({
                  title: l,
                  dueDate: h,
                  description: f,
                  priority: v,
                  titleError: m,
                }),
                  r(t, a);
              }),
              u.addEventListener("click", () => {
                if (!l.value) return void o(l, m);
                r(t, a);
                const { projectId: n } =
                    document.querySelector(".selected").dataset,
                  i = null != n ? +n : "";
                e.publish("add-task", {
                  title: l.value,
                  dueDate: new Date(`${h.value}`).toString(),
                  description: f.value,
                  priority: v.value,
                  id: d.taskList.length,
                  projectId: i,
                }),
                  e.publish("check-tasks-to-filter");
              });
          })(),
            (function () {
              const t = document.querySelector("#add-project-modal"),
                a = document.querySelector("#add-project-modal-overlay"),
                i = document.querySelector("#nav-add-project"),
                c = document.querySelector("#add-project-cancel"),
                s = document.querySelector("#add-project-modal-header-cancel"),
                u = document.querySelector("#add-project-add"),
                d = document.querySelector("#add-project-title"),
                l = document.querySelector("#add-project-title-error");
              d.addEventListener("keyup", () => o(d, l)),
                c.addEventListener("click", () => r(t, a)),
                s.addEventListener("click", () => r(t, a)),
                i.addEventListener("click", () => {
                  n({ title: d, titleError: l, isAddProject: !0 }), r(t, a);
                }),
                u.addEventListener("click", () => {
                  d.value
                    ? (r(t, a), e.publish("add-project", d.value))
                    : o(d, l);
                });
            })(),
            i(),
            (function () {
              const n = document.querySelector("#edit-project-modal"),
                a = document.querySelector("#edit-project-modal-overlay"),
                i = document.querySelector("#edit-project-cancel"),
                c = document.querySelector("#edit-project-modal-header-cancel"),
                s = document.querySelector("#edit-project-save"),
                u = document.querySelector("#edit-project-title"),
                d = document.querySelector("#edit-project-title-error");
              u.addEventListener("keyup", () => o(u, d)),
                i.addEventListener("click", () => r(n, a)),
                c.addEventListener("click", () => r(n, a)),
                s.addEventListener("click", () => {
                  if (!u.value) return void o(u, d);
                  r(n, a);
                  const { projectId: t } =
                    document.querySelector(".selected").dataset;
                  e.publish("edit-project", { title: u.value, id: t }),
                    e.publish("check-tasks-to-filter");
                }),
                e.subscribe("open-edit-project-modal", (e) => {
                  var i;
                  r(n, a), (i = t.projectList[e]), (u.value = i.title), o(u, d);
                });
            })(),
            (function () {
              const n = document.querySelector("#delete-project-modal"),
                a = document.querySelector("#delete-project-modal-overlay"),
                o = document.querySelector("#delete-project-cancel"),
                i = document.querySelector(
                  "#delete-project-modal-header-cancel"
                ),
                c = document.querySelector("#delete-project-confirm");
              e.subscribe("open-delete-project-modal", () => {
                r(n, a);
              }),
                o.addEventListener("click", () => r(n, a)),
                i.addEventListener("click", () => r(n, a)),
                c.addEventListener("click", () => {
                  r(n, a);
                  const { projectId: o } =
                    document.querySelector(".selected").dataset;
                  e.publish("delete-project", +o),
                    e.publish("delete-project-array", t.projectList),
                    e.publish("delete-project-tasks", +o),
                    e.publish("update-task-project-id", +o),
                    e.publish("update-task-id"),
                    e.publish("populate-projects-dom", t.projectList),
                    e.publish("default-to-inbox-project"),
                    e.publish("check-tasks-to-filter");
                });
            })();
        },
      };
    })(),
    oe = ae,
    ie = (() => {
      const n = (t) => {
          const n = document.querySelector("#projects-list"),
            r = document.createElement("li"),
            a = document.createElement("div"),
            o = document.createElement("button"),
            i = document.createElement("div");
          r.classList.add("projects-item"),
            (r.dataset.projectId = t.id),
            a.classList.add("project-content-left"),
            o.classList.add("projects-item-name"),
            (o.textContent = t.title),
            (a.innerHTML +=
              '<svg class="projects-item-icon" style="width:20px;height:20px" viewBox="0 0 24 24">\n\t<path fill="currentColor"\n\t\td="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />\n \t</svg>'),
            i.classList.add("project-content-right"),
            (i.innerHTML +=
              '\t<svg class="project-delete-icon" style="width:20px;height:20px" viewBox="0 0 24 24">\n\t \t\t<path fill="currentColor"\n\t \t\t\td="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />\n\t \t</svg>\n\t \t<svg class="project-settings-icon" style="width:20px;height:20px" viewBox="0 0 24 24">\n\t \t\t<path fill="currentColor"\n\t \t\t\td="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />\n\t \t</svg>'),
            a.appendChild(o),
            r.append(a, i),
            n.appendChild(r),
            r.addEventListener("click", (t) => {
              e.publish("project-selected", t);
            });
          const c = (e) =>
            e.target.closest("[data-project-id]").dataset.projectId;
          r
            .querySelector(".project-delete-icon")
            .addEventListener("click", (t) => {
              e.publish("open-delete-project-modal", c(t));
            }),
            r
              .querySelector(".project-settings-icon")
              .addEventListener("click", (t) => {
                e.publish("open-edit-project-modal", c(t));
              });
        },
        r = () => {
          document.querySelector("#projects-list").innerHTML = "";
        };
      function a(e) {
        r(), e.forEach((e) => n(e));
      }
      function o(e) {
        (document.querySelector(
          `[data-project-id='${e}'] .projects-item-name`
        ).textContent = t.projectList[e].title),
          (document.querySelector("#main-title").textContent =
            t.projectList[e].title);
      }
      return {
        render: function () {
          e.subscribe("populate-projects-dom", a),
            e.subscribe("add-project-array", n),
            e.subscribe("edit-project-array", o);
        },
      };
    })();
  (() => {
    function n() {
      return (
        console.log(l.checkTasksStored(), l.checkProjectsStored()),
        l.checkTasksStored() && l.checkProjectsStored()
      );
    }
    return {
      render: function () {
        d.render(),
          t.render(),
          oe.render(),
          re.render(),
          ie.render(),
          ne.render(),
          l.render(),
          console.log(n()),
          n() &&
            (e.publish("add-task-local-storage", {
              key: "task",
              value: l.defaultTasks,
            }),
            e.publish("add-project-local-storage", {
              key: "project",
              value: l.defaultProjects,
            })),
          e.publish("populate-tasks-local-storage", d.taskList),
          e.publish("populate-projects-local-storage", t.taskList),
          e.publish("check-tasks-to-filter"),
          e.publish("populate-projects-dom", t.projectList);
      },
    };
  })().render();
})();
