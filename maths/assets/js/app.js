/* ============================================================
   拆解所 — app shell, router, views and interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- tiny helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(a, n) { return shuffle(a).slice(0, n); }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function addDaysISO(iso, n) {
    var p = iso.split("-"); var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setDate(d.getDate() + n);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }
  function pct(n, d) { return d ? Math.round(n / d * 100) : 0; }
  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function nowMs() { return Date.now(); }

  /* ---------- data ---------- */
  var STRANDS = window.STRANDS || [];
  var STRAND_BY_ID = {};
  STRANDS.forEach(function (s) { STRAND_BY_ID[s.id] = s; });

  var TOPICS = (window.MATH_TOPICS || []).slice();
  if (!TOPICS.some(function (t) { return t.id === "factorisation"; }) && window.FACTOR_TOPIC) {
    TOPICS.push(window.FACTOR_TOPIC);
  }
  var STRAND_ORDER = { number: 0, shape: 1, data: 2 };
  TOPICS.sort(function (a, b) {
    return (STRAND_ORDER[a.strand] || 0) - (STRAND_ORDER[b.strand] || 0) ||
      (a.order || a.n || 99) - (b.order || b.n || 99);
  });
  var TOPIC_BY_ID = {};
  TOPICS.forEach(function (t) { TOPIC_BY_ID[t.id] = t; });

  var METHODS = (window.FACTOR_METHODS || []).slice().sort(function (a, b) { return a.n - b.n; });
  var METHOD_BY_ID = {};
  METHODS.forEach(function (m) { METHOD_BY_ID[m.id] = m; });

  var FACTOR_FORMULA = {
    common: "ma + mb = m(a + b)",
    grouping: "ax + ay + bx + by = (a + b)(x + y)",
    dots: "a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)",
    perfect: "a<sup>2</sup> ± 2ab + b<sup>2</sup> = (a ± b)<sup>2</sup>",
    cross1: "x<sup>2</sup> + (p + q)x + pq = (x + p)(x + q)",
    cross2: "acx<sup>2</sup> + (ad + bc)x + bd = (ax + b)(cx + d)",
    combined: "先抽公因數 → 再用平方差 / 完全平方 / 十字相乘",
    substitution: "令 y = 括號，分解 y<sup>2</sup> + by + c，再代返",
    hidden: "a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)；高次式先降次",
    app: "先因式分解，再解方程 / 約分 / 比較係數"
  };
  function factorFormula(q) {
    if (!q) return "";
    if (q.kind === "solve") return "AB = 0 ⇒ A = 0 或 B = 0";
    if (q.kind === "simplify") return "分子、分母先因式分解，再約共同因式";
    if (q.kind === "identity") return "展開一邊，比較同類項的係數";
    if (q.kind === "factor") return "若 (x − a) 是因式，則 f(a) = 0";
    if (q.kind === "area") return "面積 = 長 × 闊";
    if (q.kind === "value") return "(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>";
    return FACTOR_FORMULA[q.m] || "";
  }

  var TOPIC_QUESTIONS = window.TOPIC_QUESTIONS || {};
  var FACTOR_BANK = [];
  try {
    if (window.FactorGen && window.FactorGen.buildBank) FACTOR_BANK = window.FactorGen.buildBank();
  } catch (e) { FACTOR_BANK = []; }

  var BANK = [];
  FACTOR_BANK.forEach(function (q) {
    var m = METHOD_BY_ID[q.m];
    BANK.push({
      id: "f-" + q.id, topic: "factorisation", m: q.m,
      methodTitle: m ? m.title : "", lv: q.lv, kind: q.kind === "factorise" ? "因式分解" : q.kind,
      q: q.q, a: q.a, steps: q.steps, options: q.options, correct: q.correct,
      formula: factorFormula(q)
    });
  });
  Object.keys(TOPIC_QUESTIONS).forEach(function (tid) {
    if (!TOPIC_BY_ID[tid]) return;
    (TOPIC_QUESTIONS[tid] || []).forEach(function (q, i) {
      var tt = TOPIC_BY_ID[tid];
      BANK.push({
        id: "t-" + tid + "-" + String(i + 1).padStart(2, "0"),
        topic: tid, lv: q.lv, kind: q.kind || "練習", q: q.q, a: q.a, steps: q.steps || [],
        options: q.options, correct: q.correct,
        formula: q.formula || (tt && tt.formulas && tt.formulas[0] ? tt.formulas[0].html : "")
      });
    });
  });
  var BANK_BY_ID = {};
  BANK.forEach(function (q) { BANK_BY_ID[q.id] = q; });
  var BANK_COUNT = {};
  BANK.forEach(function (q) { BANK_COUNT[q.topic] = (BANK_COUNT[q.topic] || 0) + 1; });

  var MOCKS = window.MATH_MOCKS || [];
  var FACTOR_MOCKS = window.FACTOR_MOCKS || [];
  var FACTOR_MOCK_FORMULAS = {
    paper1: [
      ["ma + mb = m(a + b)", "a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)"],
      ["x<sup>2</sup> + (p + q)x + pq = (x + p)(x + q)", "acx<sup>2</sup> + (ad + bc)x + bd = (ax + b)(cx + d)"],
      ["acx<sup>2</sup> + (ad + bc)x + bd = (ax + b)(cx + d)", "AB = 0 ⇒ A = 0 或 B = 0"],
      ["先抽公因數，再用平方差：a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)"],
      ["分子、分母先因式分解，再約共同因式"],
      ["展開一邊，比較同類項的係數", "若 (x − a) 是因式，則 f(a) = 0"],
      ["面積 = 長 × 闊", "面積 = 長 × 闊，代入 x = 3"],
      ["a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)", "AB = 0 ⇒ A = 0 或 B = 0"]
    ],
    paper2: [
      ["ma + mb = m(a + b)", "a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)"],
      ["a<sup>2</sup> ± 2ab + b<sup>2</sup> = (a ± b)<sup>2</sup>", "a<sup>2</sup> ± 2ab + b<sup>2</sup> = (a ± b)<sup>2</sup>"],
      ["acx<sup>2</sup> + (ad + bc)x + bd = (ax + b)(cx + d)", "AB = 0 ⇒ A = 0 或 B = 0"],
      ["先抽公因數，再用完全平方：a<sup>2</sup> + 2ab + b<sup>2</sup> = (a + b)<sup>2</sup>"],
      ["分子、分母先因式分解，再約共同因式"],
      ["展開一邊，比較同類項的係數", "若 (x − a) 是因式，則 f(a) = 0"],
      ["面積 = 1/2 × 底 × 高", "面積 = 1/2 × 底 × 高，代入 x = 2"],
      ["a<sup>2</sup> − 2ab + b<sup>2</sup> = (a − b)<sup>2</sup>；再用平方差", "a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)"]
    ]
  };

  /* ---------- state ---------- */
  var KEY = "hkdse_math_2027_v1";
  var storageOK = true;
  try { window.localStorage.setItem("__t", "1"); window.localStorage.removeItem("__t"); }
  catch (e) { storageOK = false; }

  function defaults() {
    return {
      v: 1,
      theme: "light",
      xp: 0,
      streak: { last: null, count: 0, best: 0 },
      daily: { date: "", count: 0 },
      topics: {},
      methods: {},
      bankSeen: {},
      stats: { answered: 0, correct: 0 },
      drill: { sessions: 0, answered: 0, correct: 0, bestStreak: 0 },
      mock: { papers: {}, paper2: { best: 0, attempts: 0 } },
      mistakes: [],
      lastTopic: null
    };
  }
  function merge(base, saved) {
    if (!saved || typeof saved !== "object") return base;
    Object.keys(base).forEach(function (k) {
      if (saved[k] === undefined) return;
      if (base[k] && typeof base[k] === "object" && !Array.isArray(base[k]) && typeof saved[k] === "object" && !Array.isArray(saved[k])) {
        base[k] = merge(base[k], saved[k]);
      } else { base[k] = saved[k]; }
    });
    return base;
  }
  var S = defaults();
  if (storageOK) {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) S = merge(defaults(), JSON.parse(raw));
    } catch (e) {}
  }
  function save() {
    if (!storageOK) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  /* ---------- XP / streak ---------- */
  var LEVELS = [
    { min: 0, name: "見習拆解員" },
    { min: 80, name: "初級拆解員" },
    { min: 200, name: "基礎穩陣" },
    { min: 380, name: "中級拆解員" },
    { min: 600, name: "解題好手" },
    { min: 900, name: "Level 3 挑戰者" },
    { min: 1300, name: "拆解大師" }
  ];
  function levelInfo() {
    var lv = LEVELS[0], next = LEVELS[1];
    for (var i = 0; i < LEVELS.length; i++) {
      if (S.xp >= LEVELS[i].min) { lv = LEVELS[i]; next = LEVELS[i + 1] || null; }
    }
    var spanStart = lv.min, spanEnd = next ? next.min : lv.min + 300;
    return { lv: lv, next: next, pct: clamp(Math.round((S.xp - spanStart) / (spanEnd - spanStart) * 100), 0, 100) };
  }
  function addXP(n) {
    var before = levelInfo().lv.name;
    S.xp += n;
    var after = levelInfo().lv.name;
    save();
    if (after !== before) toast("升級！你而家係「" + after + "」");
  }
  function touchToday() {
    var t = todayISO();
    if (S.streak.last === t) return;
    S.streak.count = S.streak.last === addDaysISO(t, -1) ? S.streak.count + 1 : 1;
    S.streak.last = t;
    S.streak.best = Math.max(S.streak.best || 0, S.streak.count);
    if (S.daily.date !== t) S.daily = { date: t, count: 0 };
    save();
  }
  function bumpDaily() {
    var t = todayISO();
    if (S.daily.date !== t) S.daily = { date: t, count: 0 };
    S.daily.count++;
    S.daily.date = t;
    save();
  }
  function toast(msg) {
    var wrap = $("#toastWrap");
    if (!wrap) return;
    var el = document.createElement("div");
    el.className = "toast"; el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () { el.remove(); }, 2600);
  }
  function pageTitle(t) { document.title = t ? t + " — 拆解所" : "拆解所 — HKDSE 數學 Level 1 → 3"; }

  /* ---------- theme ---------- */
  function applyTheme() {
    var t = S.theme || "light";
    if (t === "auto") t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
    var label = $("#themeLabel");
    if (label) label.textContent = t === "dark" ? "淺色模式" : "深色模式";
  }
  function toggleTheme() {
    S.theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(); save();
  }

  /* ---------- topic helpers ---------- */
  function topicName(id) { return (TOPIC_BY_ID[id] && TOPIC_BY_ID[id].title) || id; }
  function topicHref(t) { return t.special ? "#/factorisation" : "#/topic/" + t.id; }
  function strandOf(id) { return TOPIC_BY_ID[id] ? TOPIC_BY_ID[id].strand : "number"; }
  function lvBadge(lv) {
    if (!lv) return "";
    var cls = lv === 1 ? "lv1" : lv === 2 ? "lv2" : "lv3";
    return '<span class="badge ' + cls + '">Lv' + lv + "</span>";
  }
  function topicCode(t) {
    var pre = t.strand === "number" ? "N" : t.strand === "shape" ? "S" : "D";
    if (t.special) return pre + " · 專題";
    return pre + String(t.n || 0).padStart(2, "0");
  }
  function isDone(id) { return !!(S.topics[id] && S.topics[id].done); }
  function doneCount() { return TOPICS.filter(function (t) { return isDone(t.id); }).length; }
  function methodDone(id) { return !!(S.methods[id] && S.methods[id].done); }
  function methodDoneCount() { return METHODS.filter(function (m) { return methodDone(m.id); }).length; }

  function addMistake(q, src) {
    if (!q || !q.q) return;
    var found = S.mistakes.filter(function (x) { return x.q === q.q; })[0];
    var snap = {
      id: q.id || "", topic: q.topic || "factorisation", m: q.m || "", lv: q.lv || 2,
      kind: q.kind || "", q: q.q, a: q.a, steps: q.steps || [], formula: q.formula || "",
      at: todayISO(), count: 1, src: src || "practice"
    };
    if (found) { found.count = (found.count || 1) + 1; found.at = todayISO(); }
    else S.mistakes.unshift(snap);
    S.mistakes = S.mistakes.slice(0, 70);
    save();
    toast("已加入錯題簿");
  }

  /* ---------- icons ---------- */
  function icon(name) {
    var p = {
      home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
      grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
      map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
      spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
      book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/>',
      bank: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
      drill: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
      mock: '<path d="M6 2h8l4 4v16H6V2Z"/><path d="M14 2v4h4"/><path d="M9 11h6M9 15h6M9 19h4"/>',
      mistakes: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5"/><circle cx="12" cy="17.2" r=".8" fill="currentColor"/>',
      sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
      flame: '<path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 0 2-1 3-2 4 0-3-2-6-4-8 0 4-4 7-4 11 0 4 3 7 7 7Z"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      check: '<path d="m4 12 5 5L20 6"/>'
    };
    return '<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (p[name] || p.spark) + "</svg>";
  }

  /* ---------- nav / chrome ---------- */
  function renderNav() {
    var route = currentRoute();
    var groups = [
      { label: "開始", links: [
        { href: "#/home", t: "首頁", i: "home", key: "home" },
        { href: "#/courses", t: "課程總覽", i: "grid", key: "courses" },
        { href: "#/map", t: "學習地圖", i: "map", key: "map" }
      ] },
      { label: "專題課程", links: [
        { href: "#/factorisation", t: "因式分解 · 10 招", i: "spark", key: "factorisation", badge: "Lv2–3" }
      ] },
      { label: "操練", links: [
        { href: "#/bank", t: "題型庫", i: "bank", key: "bank", badge: BANK.length + "" },
        { href: "#/drill", t: "無限操練", i: "drill", key: "drill" },
        { href: "#/mock", t: "模擬測驗", i: "mock", key: "mock" },
        { href: "#/mistakes", t: "錯題簿", i: "mistakes", key: "mistakes", badge: S.mistakes.length ? S.mistakes.length + "" : "" },
        { href: "#/sheet", t: "公式大全", i: "sheet", key: "sheet" }
      ] }
    ];
    var active = route.name;
    if (route.name === "learn" || route.name === "factorisation") active = "factorisation";
    if (route.name === "topic") active = "courses";
    var html = groups.map(function (g) {
      return '<div class="nav-group"><div class="nav-label">' + g.label + "</div>" +
        g.links.map(function (l) {
          return '<a class="nav-link' + (active === l.key ? " active" : "") + '" href="' + l.href + '">' +
            icon(l.i) + '<span class="nav-text">' + l.t + "</span>" +
            (l.badge ? '<span class="nav-badge">' + l.badge + "</span>" : "") + "</a>";
        }).join("") + "</div>";
    }).join("");
    $("#nav").innerHTML = html;
  }

  function renderTop() {
    var route = currentRoute();
    var crumbs = ["<a href='#/home'>首頁</a>"];
    if (route.name !== "home") {
      crumbs.push('<span class="sep">/</span>');
      if (route.name === "courses") crumbs.push("<b>課程總覽</b>");
      else if (route.name === "map") crumbs.push("<b>學習地圖</b>");
      else if (route.name === "factorisation") crumbs.push("<b>因式分解</b>");
      else if (route.name === "learn") crumbs.push("<a href='#/factorisation'>因式分解</a><span class='sep'>/</span><b>" + (METHOD_BY_ID[route.id] ? METHOD_BY_ID[route.id].title : "") + "</b>");
      else if (route.name === "topic") crumbs.push("<a href='#/courses'>課程總覽</a><span class='sep'>/</span><b>" + topicName(route.id) + "</b>");
      else if (route.name === "bank") crumbs.push("<b>題型庫</b>");
      else if (route.name === "drill") crumbs.push("<b>無限操練</b>");
      else if (route.name === "mock") crumbs.push("<b>模擬測驗</b>");
      else if (route.name === "mistakes") crumbs.push("<b>錯題簿</b>");
      else if (route.name === "sheet") crumbs.push("<b>公式大全</b>");
    }
    $("#crumbs").innerHTML = crumbs.join("");
    var li = levelInfo();
    $("#topstats").innerHTML =
      '<span class="chip-stat"><span class="em">🔥</span>' + (S.streak.count || 0) + " 日</span>" +
      '<span class="chip-stat xp"><span class="em">✦</span>' + S.xp + " XP · " + li.lv.name + "</span>" +
      '<button class="icon-btn" id="topTheme" type="button" aria-label="切換深色模式">◐</button>';
    var tt = $("#topTheme");
    if (tt) tt.addEventListener("click", toggleTheme);
  }

  function renderSideFoot() {
    var li = levelInfo();
    $("#sideLevel").textContent = li.lv.name;
    $("#sidePct").textContent = li.pct + "%";
    $("#sideBar").style.width = li.pct + "%";
    $("#sideXp").textContent = S.xp + " XP";
    $("#sideTopics").textContent = doneCount() + " / " + TOPICS.length + " 課";
  }

  function openMenu() {
    $("#sidebar").classList.add("open");
    $("#scrim").hidden = false;
    $("#menuBtn").setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    $("#sidebar").classList.remove("open");
    $("#scrim").hidden = true;
    $("#menuBtn").setAttribute("aria-expanded", "false");
  }

  /* ---------- router ---------- */
  var UI = {
    bank: { strand: "all", topic: "all", lv: "all", q: "", limit: 24 },
    courses: { strand: "all", lv: "all", q: "" },
    drillMode: "factor",
    drillCfg: { method: "mix", lv: "mix", count: 10, strand: "all" },
    drill: null,
    mockTab: "paper1",
    paper: null,
    paper2: null,
    sheetQ: ""
  };
  var route = { name: "home" };

  function currentRoute() { return route; }
  function parseRoute() {
    var h = (location.hash || "#/home").replace(/^#/, "");
    var qpos = h.indexOf("?");
    var query = qpos >= 0 ? h.slice(qpos + 1) : "";
    var path = (qpos >= 0 ? h.slice(0, qpos) : h).replace(/^\/+|\/+$/g, "");
    var parts = path ? path.split("/") : ["home"];
    var name = parts[0] || "home";
    var id = parts[1] || "";
    if (["topic", "learn", "courses"].indexOf(name) === -1 && parts.length > 1) id = parts[1];
    route = { name: name, id: decodeURIComponent(id || ""), query: query, parts: parts };
    return route;
  }
  function go(hash) { location.hash = hash; }

  function render() {
    applyTheme();
    renderNav();
    renderTop();
    renderSideFoot();
    var app = $("#app");
    app.innerHTML = viewFor(route);
    app.focus({ preventScroll: true });
    bindView(route);
    var titleEl = $(".page-title") || $(".lesson-title") || $(".method-title");
    pageTitle(route.name === "home" ? "" : titleEl ? titleEl.textContent.replace(/\s+/g, " ").trim() : "");
  }

  function refresh() {
    var y = window.scrollY;
    render();
    window.scrollTo(0, y);
  }

  /* ---------- reusable components ---------- */
  function qCardHTML(q, opts) {
    opts = opts || {};
    var t = TOPIC_BY_ID[q.topic];
    var lv = q.lv || 2;
    var kind = q.kind || "練習";
    var marks = q.marks || (lv === 1 ? 1 : lv === 3 ? 3 : 2);
    var num = opts.num || "";
    var bodyText = (q.topic === "factorisation" && kind === "因式分解") ? "因式分解 " + q.q : q.q;
    var topicChip = opts.showTopic === false ? "" : '<span class="qm-topic">' + esc(topicName(q.topic)) + "</span><span class=\"qm-dot\">·</span>";
    var methodChip = q.methodTitle ? '<span class="qm-method">' + esc(q.methodTitle) + "</span><span class=\"qm-dot\">·</span>" : "";
    var kindChip = (q.topic === "factorisation" && kind === "因式分解") ? "" : '<span class="qm-dot">·</span><span class="qm-kind">' + esc(kind) + "</span>";
    return '<article class="q-card" data-qcard="' + esc(q.id) + '">' +
      '<div class="q-meta">' + topicChip + methodChip +
      '<span class="qm-lv">Lv' + lv + '</span>' + kindChip + "</div>" +
      '<div class="dse-q">' +
      '<div class="dse-q-head"><span class="dse-q-no">' + (num ? num + "." : "") + '</span><span class="dse-q-marks">（' + marks + " 分）</span></div>" +
      '<div class="dse-q-body">' + bodyText + "</div>" +
      formulaHTML(q.formula) +
      "</div>" +
      '<div class="q-actions">' +
      '<button class="btn small" data-act="reveal" data-q="' + esc(q.id) + '">睇答案</button>' +
      '<button class="btn small ghost" data-act="mistake" data-q="' + esc(q.id) + '">加入錯題簿</button>' +
      "</div>" +
      '<div class="q-answer" data-ans="' + esc(q.id) + '" hidden>' +
      '<span class="qa-k">答案</span><b>' + q.a + "</b>" +
      (q.steps && q.steps.length ? '<ol class="q-steps">' + q.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") +
      "</div></article>";
  }

  function topicCardHTML(t) {
    var done = isDone(t.id);
    var n = BANK_COUNT[t.id] || 0;
    var st = STRAND_BY_ID[t.strand] || {};
    return '<a class="topic-card' + (t.special ? " special" : "") + (done ? " done" : "") + '" href="' + topicHref(t) + '">' +
      '<div class="tc-top"><span class="tc-num"><i class="strand-dot ' + t.strand + '"></i> ' + topicCode(t) + "</span>" +
      '<span class="badge lv' + (t.level || 2) + '">' + (t.levelLabel || ("Lv" + t.level)) + "</span></div>" +
      "<h3>" + t.title + "</h3><div class='tc-en'>" + (t.en || "") + "</div>" +
      "<p>" + (t.tagline || "") + "</p>" +
      '<div class="tc-foot"><span class="prog"><i class="dot"></i>' + (done ? "已完成" : "未開始") + "</span><span>" + n + " 題</span></div></a>";
  }

  function formulaCardsHTML(arr) {
    return '<div class="formula-grid">' + arr.map(function (f) {
      return '<div class="formula-card"><div class="fk">' + (f.label || "公式") + '</div><div class="fv">' + f.html + "</div>" +
        (f.note ? '<div class="fn">' + f.note + "</div>" : "") + "</div>";
    }).join("") + "</div>";
  }

  function exampleHTML(ex, i, formula) {
    return '<div class="example-block dse-example"><div class="dse-q-head"><span class="dse-q-no">例 ' + (i + 1) + '</span><span class="dse-q-marks">（示範）</span></div>' +
      '<div class="example-q dse-q-body">' + ex.q + "</div>" +
      formulaHTML(formula) +
      '<div class="example-a">答案：<b>' + ex.a + "</b></div>" +
      '<details class="solution"><summary>睇逐步解法</summary><div class="sol-body"><ol>' +
      (ex.steps || []).map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol></div></details></div>";
  }

  function trapHTML(traps) {
    return '<div class="trap-list">' + (traps || []).map(function (t) {
      return '<div class="trap"><span class="x">錯</span><span>' + t + "</span></div>";
    }).join("") + "</div>";
  }

  function examBox(text) {
    return '<div class="exam-box"><div class="eb-mark">!</div><div><div class="eb-k">DSE 點考</div><p>' + text + "</p></div></div>";
  }

  function formulaHTML(formula) {
    if (!formula) return "";
    return '<div class="formula-peek"><button class="formula-toggle" type="button" data-act="formula">唔識？睇公式</button>' +
      '<div class="q-formula" hidden><span class="qf-k">公式</span><span class="qf-v">' + formula + "</span></div></div>";
  }

  function emptyHTML(title, text, href, label) {
    return '<div class="empty"><strong>' + title + "</strong><p>" + text + "</p>" +
      (href ? '<div style="margin-top:14px"><a class="btn small" href="' + href + '">' + label + "</a></div>" : "") + "</div>";
  }

  /* ---------- home ---------- */
  function viewHome() {
    var done = doneCount();
    var totalQ = BANK.length;
    var acc = S.stats.answered ? pct(S.stats.correct, S.stats.answered) : null;
    var next = TOPICS.filter(function (t) { return !isDone(t.id); })[0] || TOPIC_BY_ID["factorisation"];
    var last = S.lastTopic && TOPIC_BY_ID[S.lastTopic] ? TOPIC_BY_ID[S.lastTopic] : null;
    var cont = last && !isDone(last.id) ? last : next;
    var daily = dailyQuestion();
    var featuredIds = ["number-system", "indices-surds", "factorisation", "mensuration", "trigonometry", "statistics"];
    var featured = featuredIds.map(function (id) { return TOPIC_BY_ID[id]; }).filter(Boolean);
    var li = levelInfo();

    var hero = '<section class="hero">' +
      '<div class="hero-copy"><span class="hero-kicker">HKDSE MATH · LEVEL 1 → 3</span>' +
      '<h1 class="hero-title"><span class="line">數學唔使死記，</span><span class="line"><span class="accent">拆開佢</span>就明。</span></h1>' +
      '<p class="hero-sub">19 個 DSE 必修課題、' + totalQ + ' 條連步驟題目、因式分解 10 招、無限操練與全科模擬卷。由 Level 1 的地基開始，慢慢砌上 Level 3。</p>' +
      '<div class="hero-actions"><a class="btn primary" href="#/courses">開始學習 ' + icon("arrow") + '</a>' +
      '<a class="btn" href="#/drill">即刻操練</a></div>' +
      '<div class="hero-note"><span><b>Paper 1</b> 甲部（一）</span><span><b>' + totalQ + '</b> 題連步驟</span><span><b>3</b> 大範疇</span><span><b>免費</b> · 進度自動保存</span></div></div>' +
      '<div class="hero-visual"><div class="mosaic">' +
      '<div class="fm-tile accent-tile" data-k="FACTOR"><div class="f">a<sup>2</sup> − b<sup>2</sup></div><div class="l">= (a + b)(a − b)</div></div>' +
      '<div class="fm-tile hl-tile" data-k="QUAD"><div class="f">x = (−b ± √Δ) / 2a</div><div class="l">二次公式</div></div>' +
      '<div class="fm-tile teal-tile" data-k="TRIG"><div class="f">sin θ = 對邊 / 斜邊</div><div class="l">三角比</div></div>' +
      '<div class="fm-tile" data-k="PROB"><div class="f">P(A∪B) = P(A)+P(B)−P(A∩B)</div><div class="l">概率加法</div></div>' +
      '<div class="fm-tile" data-k="STAT"><div class="f">x̄ = Σx / n</div><div class="l">平均數</div></div>' +
      '<div class="fm-tile" data-k="VOL"><div class="f">V = ⅓πr<sup>2</sup>h</div><div class="l">圓錐體積</div></div>' +
      '</div></div></section>';

    var stats = '<div class="stat-strip">' +
      '<div class="stat"><div class="n">' + TOPICS.length + '<small>課</small></div><div class="l">必修課題</div></div>' +
      '<div class="stat"><div class="n">' + totalQ + '<small>題</small></div><div class="l">題庫連步驟</div></div>' +
      '<div class="stat"><div class="n">' + METHODS.length + '<small>招</small></div><div class="l">因式分解方法</div></div>' +
      '<div class="stat"><div class="n">' + (acc === null ? "—" : acc + "%") + '</div><div class="l">操練準確率</div></div></div>';

    var continueCard = '<a class="continue-card" href="' + topicHref(cont) + '" style="text-decoration:none;color:inherit">' +
      '<div class="cc-mark">' + (cont.special ? "x²" : topicCode(cont).replace(/^[NSD]\s?/, "")) + "</div>" +
      '<div class="cc-main"><div class="cc-k">' + (last && !isDone(last.id) ? "繼續上次" : "建議下一步") + '</div>' +
      '<div class="cc-t">' + cont.title + "<small>" + (cont.levelLabel || "") + " · " + (cont.time || "") + "</small></div></div>" +
      '<span class="btn small">開始 ' + icon("arrow") + "</span></a>";

    var strandCards = '<div class="strand-grid">' + STRANDS.map(function (s) {
      var ts = TOPICS.filter(function (t) { return t.strand === s.id; });
      var d = ts.filter(function (t) { return isDone(t.id); }).length;
      return '<a class="strand-card ' + s.color + '" data-icon="' + s.icon + '" href="#/courses/' + s.id + '">' +
        '<div class="sc-k">' + s.en + "</div><h3>" + s.title + "</h3><p>" + s.blurb + "</p>" +
        '<div class="sc-foot"><span>' + ts.length + " 個課題</span><strong>" + d + " / " + ts.length + " 完成</strong></div></a>";
    }).join("") + "</div>";

    var featuredHTML = '<div class="topic-grid">' + featured.map(topicCardHTML).join("") + "</div>";

    var factorBanner = '<section class="feature-factor"><div>' +
      '<div class="ff-k">專題課程 · 10 招</div><h2>因式分解，<br>拆到最盡。</h2>' +
      "<p>由抽公因數、平方差、完全平方，到十字相乘與 DSE 應用。10 個方法教室、240+ 題，每個方法都有步驟、例子和陷阱。</p>" +
      '<div class="ff-tags"><span>十字相乘</span><span>平方差</span><span>代換法</span><span>Paper 1 A(1)</span></div>' +
      '<a class="btn" href="#/factorisation">入去拆解 ' + icon("arrow") + "</a></div>" +
      '<div class="ff-side">' +
      '<div class="ff-step"><b>01</b>抽公因數<span class="f">ma + mb = m(a+b)</span></div>' +
      '<div class="ff-step"><b>03</b>平方差<span class="f">a² − b²</span></div>' +
      '<div class="ff-step"><b>05</b>十字相乘<span class="f">(x+p)(x+q)</span></div>' +
      '<div class="ff-step"><b>10</b>DSE 應用<span class="f">AB = 0</span></div>' +
      "</div></section>";

    var examCards = '<div class="exam-grid">' +
      '<div class="exam-card"><div class="ec-top"><h3>Paper 1 傳統題</h3><span class="marks">65%</span></div>' +
      '<p>' + window.EXAM_INFO.paper1.detail + '</p><div class="ec-meta"><span>2 小時 15 分</span><span>105 分</span><span>A(1) · A(2) · B</span></div></div>' +
      '<div class="exam-card"><div class="ec-top"><h3>Paper 2 選擇題</h3><span class="marks">35%</span></div>' +
      '<p>' + window.EXAM_INFO.paper2.detail + '</p><div class="ec-meta"><span>1 小時 15 分</span><span>45 題</span><span>四選一</span></div></div>' +
      "</div>";

    var levelLadder = '<div class="aside-card" style="margin-top:10px"><div class="ak">目標路線</div>' +
      window.EXAM_INFO.levels.map(function (l) {
        return '<div style="padding:8px 0;border-bottom:1px solid var(--line)"><strong style="font-size:11.5px">' + l.lv + "</strong>" +
          '<p style="font-size:10.5px">' + l.desc + "</p></div>";
      }).join("") + "</div>";

    var dailyHTML = '<div class="daily-card"><div class="daily-top"><div><div class="eyebrow">今日熱身</div>' +
      '<div class="tiny muted" style="margin-top:5px">' + topicName(daily.topic) + " · " + (daily.kind || "練習") + " · Lv" + daily.lv + "</div></div>" +
      lvBadge(daily.lv) + '</div><div class="dse-q"><div class="dse-q-head"><span class="dse-q-no">1.</span><span class="dse-q-marks">（2 分）</span></div>' +
      '<div class="dse-q-body daily-q">' + (daily.topic === "factorisation" && daily.kind === "因式分解" ? "因式分解 " : "") + daily.q + "</div>" +
      formulaHTML(daily.formula) + "</div>" +
      '<div class="daily-actions"><button class="btn small" data-act="daily-reveal">睇答案</button>' +
      '<button class="btn small ghost" data-act="daily-new">換一題</button>' +
      '<a class="btn small ghost" href="#/drill">去操練</a></div>' +
      '<div class="daily-ans" data-daily-ans hidden><b>' + daily.a + "</b>" +
      (daily.steps && daily.steps.length ? '<ol class="q-steps" style="color:var(--ink-2);margin-top:6px">' + daily.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") +
      "</div></div>";

    var tipsHTML = '<div class="aside-card"><div class="ak">讀書方法</div>' +
      '<div style="font-size:12px;line-height:1.8;color:var(--muted)">' +
      window.STUDY_TIPS.slice(0, 4).map(function (t, i) { return '<div style="padding:7px 0;border-bottom:1px solid var(--line)"><b style="font-family:var(--mono);font-size:9px;color:var(--accent);margin-right:6px">0' + (i + 1) + "</b>" + t + "</div>"; }).join("") +
      "</div></div>";

    return '<div class="page">' + hero + stats + continueCard +
      '<div class="section-head"><div><div class="eyebrow">三個範疇</div><h2>由邊度開始？</h2><p>先揀一個範疇，再順著課題編號行。每個課題都有公式、例子、陷阱和 10 題練習。</p></div><a class="section-link" href="#/courses">睇全部 19 課 →</a></div>' +
      strandCards +
      '<div class="section-head"><div><div class="eyebrow">建議起點</div><h2>呢幾課最值得先做</h2></div><a class="section-link" href="#/map">睇學習地圖 →</a></div>' +
      featuredHTML + factorBanner +
      '<div class="section-head"><div><div class="eyebrow">考試資訊</div><h2>DSE 數學點考？</h2></div><a class="section-link" href="#/sheet">公式大全 →</a></div>' +
      examCards + levelLadder +
      '<div class="section-head"><div><div class="eyebrow">每日五分鐘</div><h2>今日熱身</h2></div><a class="section-link" href="#/drill">無限操練 →</a></div>' +
      '<div class="grid grid-2">' + dailyHTML + tipsHTML + "</div></div>";
  }

  var dailyCache = null;
  function dailyQuestion() {
    if (dailyCache) return dailyCache;
    var seed = hashStr("daily-" + todayISO());
    var q = BANK[seed % BANK.length];
    if (!q) q = { id: "fallback", topic: "factorisation", lv: 2, kind: "因式分解", q: "x<sup>2</sup> − 9", a: "(x − 3)(x + 3)", steps: ["平方差。"] };
    dailyCache = q;
    return q;
  }

  /* ---------- courses ---------- */
  function viewCourses() {
    if (route.id && STRAND_BY_ID[route.id]) UI.courses.strand = route.id;
    var st = UI.courses.strand;
    var lv = UI.courses.lv;
    var q = UI.courses.q.toLowerCase();
    var list = TOPICS.filter(function (t) {
      if (st !== "all" && t.strand !== st) return false;
      if (lv !== "all" && +t.level !== +lv) return false;
      if (q && !(t.title + " " + (t.en || "") + " " + (t.tags || []).join(" ")).toLowerCase().includes(q)) return false;
      return true;
    });
    var chips = '<div class="chips" id="courseChips">' +
      '<button class="chip' + (st === "all" ? " active" : "") + '" data-course-strand="all">全部</button>' +
      STRANDS.map(function (s) { return '<button class="chip' + (st === s.id ? " active" : "") + '" data-course-strand="' + s.id + '">' + s.title + "</button>"; }).join("") +
      "</div>";
    var lvChips = '<div class="chips">' +
      ['all', 1, 2, 3].map(function (l) {
        return '<button class="chip' + (String(lv) === String(l) ? " active" : "") + '" data-course-lv="' + l + '">' + (l === "all" ? "所有程度" : "Lv" + l) + "</button>";
      }).join("") + "</div>";
    var listHTML = list.length ? '<div class="topic-grid">' + list.map(topicCardHTML).join("") + "</div>" : emptyHTML("搵唔到符合嘅課題", "試吓清除篩選，或者用其他關鍵字。", "#/courses", "重置篩選");
    return '<div class="page"><div class="page-head"><div class="eyebrow">課程總覽</div><h1 class="page-title">19 個課題，一個系統。</h1>' +
      '<p class="page-sub">覆蓋 DSE 數學必修部分的三個範疇，按 Level 1–3 排列。每課都有概念、公式、例子、陷阱與練習；因式分解另有 10 個方法教室。</p></div>' +
      '<div class="bank-toolbar"><div class="bank-filters">' + chips + lvChips +
      '<input class="input" id="courseSearch" type="search" placeholder="搜尋課題、關鍵字…" value="' + esc(UI.courses.q) + '"></div>' +
      '<span class="bank-count" id="courseCount">' + list.length + " / " + TOPICS.length + " 課</span></div>" +
      '<div id="courseList">' + listHTML + "</div>" +
      '<div class="callout" style="margin-top:20px;font-size:11.5px;color:var(--muted)">提示：Level 標籤是建議目標難度，唔係考評局官方分級。你可以由任何一課開始，進度會自動保存。</div></div>';
  }

  /* ---------- map ---------- */
  function viewMap() {
    var levels = [
      { lv: 1, title: "Lv1 地基", desc: "先穩住基本運算、方程、角度與圖表。這些分數最容易拿，也最容易因為大意而失去。" },
      { lv: 2, title: "Lv2 核心", desc: "DSE 甲部（一）的主戰場：代數技巧、圖形性質、統計與概率。" },
      { lv: 3, title: "Lv3 進階", desc: "兩步以上的應用、證明與綜合題。目標是把甲部（二）大部分變成你的分數。" }
    ];
    return '<div class="page"><div class="page-head"><div class="eyebrow">學習地圖</div><h1 class="page-title">由地基到 Level 3，分三層行。</h1>' +
      '<p class="page-sub">建議順序：先完成 Lv1 的基礎課，再入 Lv2 核心，最後挑戰 Lv3。每個範疇都可以獨立前進，唔需要等齊所有課。</p></div>' +
      '<div class="grid grid-3">' + levels.map(function (l) {
        var list = TOPICS.filter(function (t) { return +t.level === l.lv; });
        return '<div class="card" style="padding:18px"><div class="badge lv' + l.lv + '">' + l.title + "</div>" +
          '<p style="font-size:11.5px;color:var(--muted);margin:9px 0 13px">' + l.desc + "</p>" +
          list.map(function (t) {
            return '<a href="' + topicHref(t) + '" style="display:flex;align-items:center;gap:8px;padding:8px 0;border-top:1px solid var(--line);text-decoration:none;color:var(--ink)">' +
              '<span class="strand-dot ' + t.strand + '"></span><span style="font-size:12px;flex:1">' + t.title + "</span>" +
              (isDone(t.id) ? '<span class="badge done">✓</span>' : '<span class="badge">' + (t.time || "") + "</span>") + "</a>";
          }).join("") + "</div>";
      }).join("") + "</div>" +
      '<div class="section-head"><div><div class="eyebrow">建議路線</div><h2>如果你由零開始</h2></div></div>' +
      '<div class="card" style="padding:20px"><ol class="step-list">' +
      '<li><b>先做 Lv1：</b>數系與運算 → 一元一次方程 → 角度與多邊形 → 變換與對稱 → 長度、面積與體積。</li>' +
      '<li><b>入 Lv2 核心：</b>指數與根式 → 百分比、比率與比例 → 多項式 → 因式分解 → 二次方程。</li>' +
      '<li><b>同步練圖形：</b>全等與相似 → 三角學 → 坐標幾何；數據方面做統計 → 概率。</li>' +
      '<li><b>最後衝 Lv3：</b>函數與圖像 → 指數與對數 → 數列 → 圓的性質，再用模擬卷綜合。</li>' +
      "</ol></div></div>";
  }

  /* ---------- topic view ---------- */
  function viewTopic(id) {
    var t = TOPIC_BY_ID[id];
    if (!t) return emptyHTML("搵唔到這一課", "可能係連結有誤，返去課程總覽再揀。", "#/courses", "返去課程總覽");
    if (t.special) return viewFactorHome();
    S.lastTopic = id; save();
    var bank = BANK.filter(function (q) { return q.topic === id; });
    var st = STRAND_BY_ID[t.strand] || {};
    var idx = TOPICS.filter(function (x) { return x.strand === t.strand; }).indexOf(t);
    var sib = TOPICS.filter(function (x) { return x.strand === t.strand; });
    var prev = sib[idx - 1], next = sib[idx + 1];

    var sections = (t.sections || []).map(function (s) {
      return '<div class="concept-section"><h2>' + s.h + "</h2><p>" + s.body + "</p>" +
        (s.list ? "<ul>" + s.list.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" : "") + "</div>";
    }).join("");

    var examples = '<div class="example-list">' + (t.examples || []).map(function (ex, i) { return exampleHTML(ex, i, ""); }).join("") + "</div>";

    var practice = bank.length ? '<div class="bank-list" style="margin-top:12px">' + bank.map(function (q, i) { return qCardHTML(q, { showTopic: false, num: i + 1 }); }).join("") + "</div>" :
      emptyHTML("這一課的題目準備中", "你可以先去題型庫做其他課題。", "#/bank", "去題型庫");

    var aside = '<aside class="lesson-aside">' +
      '<div class="aside-card"><div class="ak">這一課的關鍵</div><div class="av">' + (t.formulas && t.formulas[0] ? t.formulas[0].html : "—") + "</div>" +
      (t.formulas && t.formulas[0] && t.formulas[0].note ? "<p>" + t.formulas[0].note + "</p>" : "") + "</div>" +
      '<div class="aside-card"><div class="ak">快速鏈接</div>' +
      '<a class="aside-link" href="#/drill">去無限操練</a><a class="aside-link" href="#/bank/' + t.id + '">睇這一課的題目</a>' +
      '<a class="aside-link" href="#/sheet">打開公式大全</a></div>' +
      '<div class="aside-card"><div class="ak">進度</div><div style="font-size:12px;color:var(--muted);line-height:1.7">' +
      (isDone(t.id) ? '<span class="badge done">✓ 已完成</span>' : '<span class="badge">未完成</span>') +
      '<p style="margin-top:8px">做完這一課，記得標記完成。你的進度只會存在這部電腦。</p>' +
      '<button class="btn small block" style="margin-top:8px" data-act="done-topic" data-topic="' + t.id + '">' + (isDone(t.id) ? "取消完成" : "標記為已完成") + "</button></div></div></aside>";

    return '<div class="page"><div class="lesson-hero">' +
      '<div class="lesson-kicker"><span class="strand-dot ' + t.strand + '"></span><span>' + st.title + '</span><span class="sep">/</span><span>' + topicCode(t) + '</span><span class="badge lv' + t.level + '">' + (t.levelLabel || "Lv" + t.level) + '</span><span class="badge">' + (t.time || "") + "</span></div>" +
      '<h1 class="lesson-title">' + t.title + '</h1><div class="lesson-en">' + (t.en || "") + "</div>" +
      '<p class="lesson-lead">' + (t.tagline || "") + "</p>" +
      '<div class="lesson-meta"><span class="badge teal">' + bank.length + " 題練習</span>" +
      (t.tags || []).slice(0, 4).map(function (x) { return '<span class="badge">' + x + "</span>"; }).join("") + "</div></div>" +
      '<div class="lesson-layout"><div class="lesson-main">' +
      (t.intro || []).map(function (p) { return '<p style="font-size:14px;color:var(--ink-2);line-height:1.85;margin-bottom:12px">' + p + "</p>"; }).join("") +
      (t.formulas && t.formulas.length ? '<div class="concept-section" style="padding-top:6px"><h2>核心公式</h2>' + formulaCardsHTML(t.formulas) + "</div>" : "") +
      sections +
      '<div class="concept-section"><h2>例題</h2>' + examples + "</div>" +
      '<div class="concept-section"><h2>常見陷阱</h2>' + trapHTML(t.traps) + "</div>" +
      '<div class="concept-section"><h2>這一課的練習</h2><p style="font-size:12px;color:var(--muted)">先自己計一次，再睇答案。做錯的題目可以加入錯題簿。分數為練習估算。</p>' + practice + "</div>" +
      examBox(t.exam || "") +
      '<div class="topic-done-row"><button class="btn ' + (isDone(t.id) ? "" : "primary") + '" data-act="done-topic" data-topic="' + t.id + '">' + (isDone(t.id) ? "✓ 已完成" : "標記為已完成") + "</button>" +
      '<a class="btn ghost" href="#/bank/' + t.id + '">去做這一課的題目</a></div>' +
      '<div class="next-prev">' +
      (prev ? '<a href="' + topicHref(prev) + '"><span class="np-k">← 上一課</span><span class="np-t">' + prev.title + "</span></a>" : "<span></span>") +
      (next ? '<a class="next" href="' + topicHref(next) + '"><span class="np-k">下一課 →</span><span class="np-t">' + next.title + "</span></a>" : "<span></span>") +
      "</div></div>" + aside + "</div></div>";
  }

  /* ---------- factorisation home ---------- */
  function viewFactorHome() {
    var done = methodDoneCount();
    var bank = BANK.filter(function (q) { return q.topic === "factorisation"; });
    var next = METHODS.filter(function (m) { return !methodDone(m.id); })[0] || METHODS[0];
    var methodCards = METHODS.map(function (m) {
      return '<a class="method-card' + (methodDone(m.id) ? " done" : "") + '" href="#/learn/' + m.id + '">' +
        '<div class="method-num">' + String(m.n).padStart(2, "0") + "</div><div>" +
        "<h3>" + m.title + "</h3><p>" + m.tagline + "</p>" +
        '<div class="method-meta"><span class="badge lv' + m.level + '">' + m.levelLabel + '</span><span class="badge">' + m.time + "</span>" +
        (methodDone(m.id) ? '<span class="badge done">✓</span>' : "") + "</div></div></a>";
    }).join("");

    return '<div class="page"><div class="lesson-hero"><div class="lesson-kicker"><span class="strand-dot number"></span><span>數與代數</span><span class="sep">/</span><span>專題課程</span><span class="badge lv3">Lv2–3 · 10 招</span></div>' +
      '<h1 class="lesson-title">因式分解，<br>拆到最盡。</h1><div class="lesson-en">FACTORISATION · PAPER 1 A(1)</div>' +
      '<p class="lesson-lead">由抽公因數到十字相乘，10 個方法教室、' + bank.length + ' 題自動生成題目、每題連步驟。呢個專題的目標係：任何一條甲部（一）的因式分解題，你都能夠在 30 秒內揀對方法。</p>' +
      '<div class="lesson-meta"><span class="badge teal">' + done + ' / 10 招已學</span><span class="badge">' + bank.length + ' 題</span><span class="badge">10 個方法</span><span class="badge">DSE 甲部（一）</span></div></div>' +
      '<div class="grid grid-3" style="margin-bottom:18px">' +
      '<div class="aside-card"><div class="ak">你而家嘅進度</div><div class="av">' + done + ' / 10 招</div><div class="bar" style="background:var(--line);margin-top:8px"><i style="width:' + (done / 10 * 100) + '%"></i></div><p>每完成一個方法，就會在這裡亮起。</p></div>' +
      '<div class="aside-card"><div class="ak">建議下一步</div><div class="av" style="font-size:16px">' + (methodDone(next.id) ? "全部學完，去操練" : next.title) + '</div><p>跟住編號行，唔需要跳來跳去。</p><a class="btn small block" style="margin-top:8px" href="#/learn/' + next.id + '">' + (methodDone(next.id) ? "去題型庫" : "開始第 " + String(next.n).padStart(2, "0") + " 招") + "</a></div>" +
      '<div class="aside-card"><div class="ak">專項操練</div><div class="av" style="font-size:16px">' + bank.length + ' 題 · 即時對答案</div><p>選擇題模式，答錯會自動入錯題簿。</p><a class="btn small block" style="margin-top:8px" href="#/drill">開始操練</a></div></div>' +
      '<div class="section-head"><div><div class="eyebrow">方法教室</div><h2>10 招，由淺入深</h2><p>按編號順序學，或者直接跳去你需要嘅方法。</p></div><a class="section-link" href="#/bank/factorisation">睇 240+ 題 →</a></div>' +
      '<div class="method-grid">' + methodCards + "</div>" +
      '<div class="section-head"><div><div class="eyebrow">實戰</div><h2>學完之後</h2></div></div>' +
      '<div class="grid grid-2"><a class="card" style="padding:18px;text-decoration:none;color:var(--ink)" href="#/mock"><div class="eyebrow">模擬卷</div><h3 style="font-size:22px;margin:8px 0">因式分解專項卷</h3><p style="font-size:12px;color:var(--muted)">兩份 Paper 1 甲部（一）風格模擬卷，連完整評分參考。</p><span class="btn small" style="margin-top:12px">去模擬測驗</span></a>' +
      '<a class="card" style="padding:18px;text-decoration:none;color:var(--ink)" href="#/sheet"><div class="eyebrow">速查</div><h3 style="font-size:22px;margin:8px 0">因式分解公式卡</h3><p style="font-size:12px;color:var(--muted)">四條核心公式、決策流程、常見錯誤，一頁睇完。</p><span class="btn small" style="margin-top:12px">打開公式大全</span></a></div>' +
      examBox("Paper 1 甲部（一）每年都會出因式分解或相關應用，通常 2–4 分。評分按步驟給分：抽公因數、公式、完整答案，所以中間步驟要寫清楚。") +
      "</div>";
  }

  /* ---------- method view ---------- */
  function viewMethod(id) {
    var m = METHOD_BY_ID[id];
    if (!m) return emptyHTML("搵唔到這個方法", "返去因式分解專題再揀。", "#/factorisation", "返去因式分解");
    S.lastTopic = "factorisation"; save();
    var idx = METHODS.indexOf(m);
    var prev = METHODS[idx - 1], next = METHODS[idx + 1];
    var checkpoints = [];
    try {
      var seedBase = 7000 + m.n * 131 + hashStr(todayISO()) % 97;
      checkpoints = [
        window.FactorGen.make(m.id, m.level === 3 ? 3 : 2, seedBase),
        window.FactorGen.make(m.id, 3, seedBase + 57)
      ].filter(Boolean);
    } catch (e) {}
    var cpHTML = checkpoints.map(function (q, i) {
      return '<div class="cp-q"><div class="dse-q-head"><span class="dse-q-no">' + (i + 1) + '.</span><span class="dse-q-marks">（' + (q.lv === 3 ? 3 : 2) + ' 分）</span></div><div class="cqq">' + (q.kind === "factorise" ? "因式分解 " : "") + q.q + '</div>' +
        formulaHTML(factorFormula(q)) +
        '<div class="q-actions"><button class="btn small" data-act="cp-reveal" data-cp="' + i + '">睇答案</button></div>' +
        '<div class="cqa" data-cp-ans="' + i + '" hidden>答案：<b>' + q.a + "</b>" +
        (q.steps ? '<ol class="q-steps" style="color:var(--ink-2);margin-top:5px">' + q.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") + "</div></div>";
    }).join("");

    return '<div class="page"><div class="method-hero"><div class="method-kicker"><a href="#/factorisation" style="color:var(--muted);text-decoration:none">因式分解</a><span class="sep">/</span><span>方法 ' + String(m.n).padStart(2, "0") + '</span><span class="badge lv' + m.level + '">' + m.levelLabel + '</span><span class="badge">' + m.time + "</span></div>" +
      '<h1 class="method-title"><span class="num">' + String(m.n).padStart(2, "0") + "</span>" + m.title + '</h1><div class="lesson-en">' + m.en + "</div>" +
      '<p class="method-lead">' + m.tagline + "</p></div>" +
      '<div class="lesson-layout"><div class="lesson-main">' +
      '<div class="formula-band"><div class="fb-k">一句話重點</div><div class="fb-v">' + m.formula.html + '</div><div class="fb-n">' + m.formula.label + "</div></div>" +
      visualFor(m.id) +
      (m.intro || []).map(function (p) { return '<p style="font-size:14px;color:var(--ink-2);line-height:1.85;margin-bottom:12px">' + p + "</p>"; }).join("") +
      '<h2 style="font-size:25px;margin:20px 0 4px">步驟</h2><ol class="step-list">' + m.steps.map(function (s) { return "<li><b>" + s.t + "：</b>" + s.d + "</li>"; }).join("") + "</ol>" +
      '<h2 style="font-size:25px;margin:24px 0 4px">例題</h2><div class="example-list">' + m.examples.map(function (ex, i) { return exampleHTML(ex, i, m.formula.html); }).join("") + "</div>" +
      '<h2 style="font-size:25px;margin:24px 0 4px">常見陷阱</h2>' + trapHTML(m.traps) +
      '<div class="checkpoint"><h3>即刻試兩題</h3><p>唔好睇答案，先自己計一次。呢兩題會每日換一次。</p>' + cpHTML + "</div>" +
      examBox(m.exam) +
      '<div class="topic-done-row"><button class="btn ' + (methodDone(m.id) ? "" : "primary") + '" data-act="done-method" data-method="' + m.id + '">' + (methodDone(m.id) ? "✓ 已學會" : "標記為已學會") + "</button>" +
      '<a class="btn ghost" href="#/bank/factorisation">去題型庫練這個方法</a></div>' +
      '<div class="next-prev">' +
      (prev ? '<a href="#/learn/' + prev.id + '"><span class="np-k">← 上一個方法</span><span class="np-t">' + prev.title + "</span></a>" : "<span></span>") +
      (next ? '<a class="next" href="#/learn/' + next.id + '"><span class="np-k">下一個方法 →</span><span class="np-t">' + next.title + "</span></a>" : "<span></span>") +
      "</div></div>" +
      '<aside class="lesson-aside"><div class="aside-card"><div class="ak">公式</div><div class="av">' + m.formula.html + "</div><p>" + m.formula.label + "</p></div>" +
      '<div class="aside-card"><div class="ak">快速檢查</div><div style="font-size:11.5px;color:var(--muted);line-height:1.8">' + m.traps.slice(0, 2).map(function (t) { return "• " + t; }).join("<br><br>") + "</div></div>" +
      '<div class="aside-card"><div class="ak">進度</div><div style="font-size:12px;color:var(--muted)">' + (methodDone(m.id) ? "已學會" : "未學會") + '<p style="margin-top:6px">學完之後，去題型庫做 10 題鞏固。</p><a class="btn small block" style="margin-top:8px" href="#/bank/factorisation">去練這個方法</a></div></div></aside>' +
      "</div></div>";
  }

  function visualFor(id) {
    if (id === "dots" || id === "hidden") {
      return '<div class="visual-figure"><div class="dots-figure"><div class="sq">a<sup>2</sup><span class="cut">b<sup>2</sup></span></div><span style="font-size:18px">→</span><div class="rect">(a + b)(a − b)</div></div></div>';
    }
    if (id === "perfect") {
      return '<div class="visual-figure"><div class="grid-math"><div class="gh">×</div><div class="gh">a</div><div class="gh">b</div>' +
        '<div class="gh">a</div><div class="gc">a<sup>2</sup></div><div>ab</div><div class="gh">b</div><div>ab</div><div class="gc">b<sup>2</sup></div></div></div>';
    }
    if (id === "cross1") {
      return '<div class="visual-figure"><div class="cross-mini"><span>x</span><span>+p</span><span>x</span><span>+q</span></div><div style="margin-left:18px;font-family:var(--math);font-size:19px">(x + p)(x + q)</div></div>';
    }
    if (id === "cross2") {
      return '<div class="visual-figure"><div class="cross-mini"><span>ax</span><span>+b</span><span>cx</span><span>+d</span></div><div style="margin-left:18px;font-family:var(--math);font-size:19px">(ax + b)(cx + d)</div></div>';
    }
    if (id === "combined" || id === "app") {
      return '<div class="visual-figure"><div class="flow-figure"><div class="node"><b>STEP 1</b>抽公因數</div><span class="arr">→</span><div class="node"><b>STEP 2</b>數項數</div><span class="arr">→</span><div class="node"><b>2 項</b>平方差</div><div class="node"><b>3 項</b>完全平方 / 十字</div><div class="node"><b>4 項</b>分組</div><span class="arr">→</span><div class="node"><b>最後</b>分解到底</div></div></div>';
    }
    if (id === "substitution") {
      return '<div class="visual-figure"><div class="flow-figure"><div class="node"><b>原本</b>(x + a)<sup>2</sup> + b(x + a) + c</div><span class="arr">→</span><div class="node"><b>設 y</b>y = x + a</div><span class="arr">→</span><div class="node"><b>分解</b>(y + p)(y + q)</div><span class="arr">→</span><div class="node"><b>代返</b>(x + a + p)(x + a + q)</div></div></div>';
    }
    if (id === "grouping") {
      return '<div class="visual-figure"><div class="flow-figure"><div class="node"><b>四項</b>分成 2 + 2</div><span class="arr">→</span><div class="node"><b>各組</b>抽公因數</div><span class="arr">→</span><div class="node"><b>共同</b>抽出括號</div><span class="arr">→</span><div class="node"><b>答案</b>(A)(B)</div></div></div>';
    }
    return '<div class="visual-figure"><div class="flow-figure"><div class="node"><b>每一項</b>找公因數</div><span class="arr">→</span><div class="node"><b>係數</b>HCF</div><div class="node"><b>字母</b>最低次方</div><span class="arr">→</span><div class="node"><b>逐項除</b>放入括號</div><span class="arr">→</span><div class="node"><b>再檢查</b>可否再拆</div></div></div>';
  }

  /* ---------- bank ---------- */
  function bankFiltered() {
    var f = UI.bank;
    var q = f.q.trim().toLowerCase();
    return BANK.filter(function (x) {
      if (f.topic !== "all" && x.topic !== f.topic) return false;
      if (f.strand !== "all" && strandOf(x.topic) !== f.strand) return false;
      if (f.lv !== "all" && +x.lv !== +f.lv) return false;
      if (q) {
        var hay = (x.q + " " + x.a + " " + topicName(x.topic) + " " + (x.methodTitle || "") + " " + (x.formula || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function viewBank() {
    if (route.id && TOPIC_BY_ID[route.id]) {
      UI.bank.topic = route.id;
      UI.bank.strand = "all";
    }
    var f = UI.bank;
    var topicsOptions = '<option value="all">所有課題</option>' + TOPICS.map(function (t) {
      return '<option value="' + t.id + '"' + (f.topic === t.id ? " selected" : "") + ">" + t.title + "</option>";
    }).join("");
    var strandsOptions = '<option value="all">所有範疇</option>' + STRANDS.map(function (s) {
      return '<option value="' + s.id + '"' + (f.strand === s.id ? " selected" : "") + ">" + s.title + "</option>";
    }).join("");
    var lvOptions = ['all', 1, 2, 3].map(function (l) {
      return '<option value="' + l + '"' + (String(f.lv) === String(l) ? " selected" : "") + ">" + (l === "all" ? "所有程度" : "Lv" + l) + "</option>";
    }).join("");
    return '<div class="page"><div class="page-head"><div class="eyebrow">題型庫</div><h1 class="page-title">' + BANK.length + ' 題，全部連步驟。</h1>' +
      '<p class="page-sub">因式分解 240+ 題，加上 18 個課題的練習題。可以按範疇、課題、程度篩選，也可以搜尋關鍵字。做錯的題目可以一鍵加入錯題簿。題號旁的分數為練習估算；模擬卷才按實際分數。</p></div>' +
      '<div class="bank-toolbar"><div class="bank-filters">' +
      '<select class="select" id="bankStrand">' + strandsOptions + "</select>" +
      '<select class="select" id="bankTopic">' + topicsOptions + "</select>" +
      '<select class="select" id="bankLv">' + lvOptions + "</select>" +
      '<input class="input" id="bankSearch" type="search" placeholder="搜尋題目、答案、課題…" value="' + esc(f.q) + '">' +
      '</div><span class="bank-count" id="bankCount"></span></div>' +
      '<div class="bank-list" id="bankList"></div><div class="load-more" id="bankMore"></div></div>';
  }

  function renderBankList() {
    var list = bankFiltered();
    var f = UI.bank;
    var shown = list.slice(0, f.limit);
    var el = $("#bankList");
    if (!el) return;
    el.innerHTML = shown.length ? shown.map(function (q, i) { return qCardHTML(q, { num: list.indexOf(q) + 1 }); }).join("") : '<div class="bank-empty">搵唔到符合嘅題目。試吓清除篩選，或者用其他關鍵字。</div>';
    var count = $("#bankCount"); if (count) count.textContent = "顯示 " + shown.length + " / " + list.length + " 題";
    var more = $("#bankMore");
    if (more) more.innerHTML = list.length > shown.length ? '<button class="btn" data-act="bank-more">載入更多</button>' : "";
  }

  /* ---------- drill ---------- */
  function viewDrill() {
    if (UI.drill) return UI.drill.done ? viewDrillSummary() : viewDrillRun();
    var mode = UI.drillMode;
    var cfg = UI.drillCfg;
    var stats = S.drill;
    var acc = stats.answered ? pct(stats.correct, stats.answered) : null;
    var modeTabs = '<div class="mode-tabs">' +
      '<button data-act="drill-mode" data-mode="factor" class="' + (mode === "factor" ? "active" : "") + '">因式分解 · 選擇題</button>' +
      '<button data-act="drill-mode" data-mode="solve" class="' + (mode === "solve" ? "active" : "") + '">解二次方程 · 選擇題</button>' +
      '<button data-act="drill-mode" data-mode="all" class="' + (mode === "all" ? "active" : "") + '">全科 · 自評</button></div>';
    var fields = "";
    if (mode === "factor") {
      fields = '<div class="field"><label>方法</label><select class="select" id="drillMethod" style="width:100%"><option value="mix">全部方法（混合）</option>' +
        METHODS.map(function (m) { return '<option value="' + m.id + '"' + (cfg.method === m.id ? " selected" : "") + ">" + String(m.n).padStart(2, "0") + " " + m.title + "</option>"; }).join("") + "</select></div>";
    }
    if (mode === "all") {
      fields += '<div class="field"><label>範疇</label><select class="select" id="drillStrand" style="width:100%"><option value="all">全部範疇</option>' +
        STRANDS.map(function (s) { return '<option value="' + s.id + '"' + (cfg.strand === s.id ? " selected" : "") + ">" + s.title + "</option>"; }).join("") + "</select></div>";
    }
    fields += '<div class="field"><label>程度</label><div class="seg" id="drillLv">' +
      [{ v: "2", t: "Lv2" }, { v: "3", t: "Lv3" }, { v: "mix", t: "混合" }].map(function (x) {
        return '<button data-lv="' + x.v + '" class="' + (String(cfg.lv) === x.v ? "active" : "") + '">' + x.t + "</button>";
      }).join("") + "</div></div>" +
      '<div class="field"><label>題數</label><div class="seg" id="drillCount">' +
      [10, 20, 50].map(function (n) { return '<button data-count="' + n + '" class="' + (+cfg.count === n ? "active" : "") + '">' + n + " 題</button>"; }).join("") + "</div></div>";

    return '<div class="page"><div class="page-head"><div class="eyebrow">無限操練</div><h1 class="page-title">每日 10 題，手感自然嚟。</h1>' +
      '<p class="page-sub">因式分解用選擇題即時對答案；全科模式用自評方式，適合所有課題。答錯會自動加入錯題簿，進度會累積。</p></div>' +
      modeTabs + '<div class="setup-grid"><div class="setup-card"><h2>' + (mode === "factor" ? "因式分解快刷" : mode === "solve" ? "解二次方程快刷" : "全科自評練習") + "</h2>" +
      "<p>" + (mode === "all" ? "抽 10–50 題跨範疇題目，自己計完再對答案，適合溫習任何一課。" : "四選一，即時對答案，附完整步驟。") + "</p>" +
      fields + '<button class="btn primary block" data-act="start-drill" style="margin-top:6px">開始操練 ' + icon("arrow") + "</button></div>" +
      '<div><div class="aside-card"><div class="ak">你的操練紀錄</div><div class="av">' + (acc === null ? "未有紀錄" : acc + "% 準確率") + "</div>" +
      '<p>累積作答 ' + stats.answered + " 題，答對 " + stats.correct + " 題。最佳連勝 " + (stats.bestStreak || 0) + " 題。</p></div>" +
      '<div class="aside-card" style="margin-top:10px"><div class="ak">操練規則</div><div style="font-size:11.5px;color:var(--muted);line-height:1.8">' +
      "• 選擇題：答錯會顯示正確答案和步驟。<br>• 自評：先自己計，再揭答案，誠實舉手。<br>• 每題 +10 XP，答錯也有 +2 XP 努力分。<br>• 錯題會自動加入錯題簿，可以之後再練。</div></div>" +
      '<div class="aside-card" style="margin-top:10px"><div class="ak">每日目標</div><div class="av">' + Math.min(S.daily.count || 0, 20) + ' / 20 題</div><div class="bar" style="background:var(--line);margin-top:8px"><i style="width:' + Math.min((S.daily.count || 0) / 20 * 100, 100) + '%"></i></div><p>今日已作答 ' + (S.daily.count || 0) + ' 題。</p></div></div></div></div>';
  }

  function viewDrillRun() {
    var d = UI.drill;
    var q = d.qs[d.idx];
    if (!q) { UI.drill = null; return viewDrill(); }
    var isMcq = d.mode !== "all";
    var optsHTML = "";
    if (isMcq) {
      optsHTML = '<div class="options">' + (q.options || []).map(function (o, i) {
        var cls = "option";
        if (d.locked) {
          if (i === q.correct) cls += " correct";
          else if (i === d.picked) cls += " wrong";
        }
        return '<button class="' + cls + '" data-act="drill-answer" data-i="' + i + '"' + (d.locked ? " disabled" : "") + '><span class="key">' + "ABCD"[i] + "</span><span>" + o.html + "</span></button>";
      }).join("") + "</div>";
    }
    var feedback = "";
    if (isMcq && d.locked) {
      var ok = d.picked === q.correct;
      feedback = '<div class="feedback ' + (ok ? "good" : "bad") + '"><div class="fb-title">' + (ok ? "答啱！" : "答錯咗，睇吓步驟：") + "</div>" +
        "<div>正確答案：<b>" + (q.options[q.correct] ? q.options[q.correct].html : q.a) + "</b></div>" +
        (q.steps ? '<ol>' + q.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") + "</div>";
    }
    if (!isMcq && d.revealed) {
      feedback = '<div class="self-answer"><span class="qa-k">答案</span><b>' + q.a + "</b>" +
        (q.steps ? '<ol class="q-steps" style="color:var(--ink-2);margin-top:6px">' + q.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") + "</div>";
    }
    var actions = "";
    if (isMcq) {
      actions = d.locked ? '<button class="btn primary" data-act="drill-next">' + (d.idx + 1 >= d.qs.length ? "睇成績" : "下一題") + " " + icon("arrow") + "</button>" : '<span class="tiny muted">按 1–4 或點擊選項</span>';
    } else {
      if (!d.revealed) actions = '<button class="btn primary" data-act="drill-reveal">睇答案</button>';
      else if (!d.locked) actions = '<div class="self-check"><button class="btn primary" data-act="drill-self" data-ok="1">識做 ✓</button><button class="btn" data-act="drill-self" data-ok="0">要再練</button></div>';
      else actions = '<button class="btn primary" data-act="drill-next">' + (d.idx + 1 >= d.qs.length ? "睇成績" : "下一題") + " " + icon("arrow") + "</button>";
    }
    return '<div class="page"><div class="drill-run"><div class="drill-top"><span>' + (isMcq ? "選擇題" : "全科自評") + " · 第 " + (d.idx + 1) + " / " + d.qs.length + " 題</span>" +
      '<span class="streak">連勝 ' + d.streak + " 🔥</span><span data-timer>00:00</span></div>" +
      '<div class="drill-progress"><i style="width:' + ((d.idx) / d.qs.length * 100) + '%"></i></div>' +
      '<div class="drill-q"><div class="dse-q-head"><span class="dse-q-no">' + (d.idx + 1) + '.</span><span class="dse-q-marks">（1 分）</span></div>' +
      '<div class="dq-k">' + topicName(q.topic) + " · Lv" + q.lv + " · " + (q.kind || "") + "</div>" +
      '<div class="dq-q">' + (q.kind === "因式分解" ? '<span class="cn">因式分解</span>' : "") + q.q + "</div>" +
      formulaHTML(q.formula) + optsHTML + feedback +
      '<div class="drill-foot"><button class="btn small ghost" data-act="drill-quit">退出</button>' + actions + "</div></div></div></div>";
  }

  function viewDrillSummary() {
    var d = UI.drill;
    var acc = d.answered ? Math.round(d.score / d.answered * 100) : 0;
    var secs = Math.floor((nowMs() - d.start) / 1000);
    var wrong = d.log.filter(function (x) { return !x.ok; });
    return '<div class="page"><div class="drill-summary"><div class="eyebrow center">操練完成</div><h1 class="page-title">' + (acc >= 80 ? "好穩陣！" : acc >= 50 ? "有進步，繼續。" : "唔緊要，錯題簿幫你。") + "</h1>" +
      '<div class="score-ring" style="--p:' + acc + '"><div class="sr-in"><div class="sr-n">' + acc + '%</div><div class="sr-l">準確率</div></div></div>' +
      '<div class="summary-stats"><div><b>' + d.score + "</b><span>答對</span></div><div><b>" + d.answered + "</b><span>作答</span></div><div><b>" + fmtTime(secs) + "</b><span>用時</span></div></div>" +
      '<p style="font-size:13px;color:var(--muted)">' + (wrong.length ? "有 " + wrong.length + " 題做錯，已加入錯題簿。" : "全部答對，冇錯題。") + "</p>" +
      '<div class="hero-actions" style="justify-content:center;margin-top:18px"><button class="btn primary" data-act="drill-restart">再嚟一局</button><a class="btn" href="#/mistakes">去錯題簿</a><a class="btn ghost" href="#/bank">去題型庫</a></div>' +
      '</div></div>';
  }

  function startDrill() {
    var cfg = UI.drillCfg;
    var mode = UI.drillMode;
    var qs = [];
    try {
      if (mode === "factor") {
        qs = window.FactorGen.makeDrill({ mode: "factor", method: cfg.method, lv: cfg.lv, count: +cfg.count, seed: nowMs() });
        qs.forEach(function (q, i) { q.id = "gen-" + i; q.topic = "factorisation"; q.kind = "因式分解"; q.formula = factorFormula(q); });
      } else if (mode === "solve") {
        qs = window.FactorGen.makeDrill({ mode: "solve", lv: cfg.lv, count: +cfg.count, seed: nowMs() + 17 });
        qs.forEach(function (q, i) { q.id = "gen-" + i; q.topic = "app"; q.kind = "解方程"; q.formula = "AB = 0 ⇒ A = 0 或 B = 0"; });
      } else {
        var pool = BANK.filter(function (q) {
          if (cfg.strand !== "all" && strandOf(q.topic) !== cfg.strand) return false;
          if (cfg.lv !== "mix" && +q.lv !== +cfg.lv) return false;
          return true;
        });
        qs = sample(pool, Math.min(+cfg.count, pool.length));
      }
    } catch (e) { qs = []; }
    if (!qs.length) { toast("未能出題，試吓換個設定。"); return; }
    UI.drill = {
      mode: mode, qs: qs, idx: 0, score: 0, answered: 0, streak: 0, bestStreak: 0,
      picked: null, locked: false, revealed: false, start: nowMs(), done: false, log: []
    };
    save();
    refresh();
  }

  function answerDrill(i) {
    var d = UI.drill;
    if (!d || d.locked) return;
    var q = d.qs[d.idx];
    d.picked = i; d.locked = true;
    var ok = i === q.correct;
    if (ok) { d.score++; d.streak++; d.bestStreak = Math.max(d.bestStreak, d.streak); }
    else { d.streak = 0; }
    d.answered++;
    d.log.push({ q: q, ok: ok });
    recordAnswer(q, ok);
    refresh();
  }

  function selfMark(ok) {
    var d = UI.drill;
    if (!d || d.locked) return;
    var q = d.qs[d.idx];
    d.locked = true;
    if (ok) { d.score++; d.streak++; d.bestStreak = Math.max(d.bestStreak, d.streak); }
    else { d.streak = 0; }
    d.answered++;
    d.log.push({ q: q, ok: ok });
    recordAnswer(q, ok);
    refresh();
  }

  function recordAnswer(q, ok) {
    S.stats.answered++;
    if (ok) S.stats.correct++;
    S.drill.answered++;
    if (ok) S.drill.correct++;
    S.drill.bestStreak = Math.max(S.drill.bestStreak || 0, UI.drill ? UI.drill.bestStreak : 0);
    addXP(ok ? 10 : 2);
    touchToday(); bumpDaily();
    if (!ok) addMistake(q, "drill");
    save();
  }

  function nextDrill() {
    var d = UI.drill;
    if (!d) return;
    if (d.idx + 1 >= d.qs.length) {
      d.done = true; S.drill.sessions++;
      if (d.score / d.answered >= 0.8) addXP(20);
      save(); refresh(); return;
    }
    d.idx++; d.picked = null; d.locked = false; d.revealed = false;
    refresh();
  }

  /* ---------- mock ---------- */
  function viewMock() {
    if (UI.paper) return viewPaper(UI.paper.paper);
    if (UI.paper2) return viewPaper2(UI.paper2.paper);
    var p1 = MOCKS.filter(function (m) { return m.type === "paper1"; });
    var p2 = MOCKS.filter(function (m) { return m.type === "paper2"; })[0];
    var tabs = '<div class="mode-tabs">' +
      '<button data-act="mock-tab" data-tab="paper1" class="' + (UI.mockTab === "paper1" ? "active" : "") + '">全科 Paper 1</button>' +
      '<button data-act="mock-tab" data-tab="paper2" class="' + (UI.mockTab === "paper2" ? "active" : "") + '">全科 Paper 2</button>' +
      '<button data-act="mock-tab" data-tab="factor" class="' + (UI.mockTab === "factor" ? "active" : "") + '">因式分解專項</button></div>';
    var body = "";
    if (UI.mockTab === "paper1") {
      body = '<div class="mock-cards">' + p1.map(function (m) {
        var b = S.mock.papers[m.id];
        return '<a class="mock-card" href="#/mock" data-act="open-paper" data-paper="' + m.id + '"><div class="mk">卷 ' + m.id.slice(-1) + " · PAPER 1</div><h3>" + m.title + "</h3><p>" + m.note + "</p>" +
          '<div class="mm"><span>' + m.subtitle + "</span>" + (b ? "<span>最佳 " + b.best + " / " + b.total + "</span>" : "") + "</div></a>";
      }).join("") + "</div>";
      if (!p1.length) body = emptyHTML("全科模擬卷準備中", "你可以先做因式分解專項卷。", "#/mock", "重整");
    } else if (UI.mockTab === "paper2") {
      var b2 = S.mock.paper2 || { best: 0, attempts: 0 };
      body = p2 ? '<div class="mock-cards"><a class="mock-card" href="#/mock" data-act="open-paper2" data-paper="' + p2.id + '"><div class="mk">PAPER 2 · 20 題</div><h3>' + p2.title + "</h3><p>" + (p2.note || "") + "</p>" +
        '<div class="mm"><span>' + p2.subtitle + "</span><span>最佳 " + b2.best + " / " + p2.questions.length + "</span><span>做過 " + b2.attempts + " 次</span></div></a></div>" :
        emptyHTML("Paper 2 準備中", "請先做 Paper 1 或專項卷。", "#/drill", "去操練");
    } else {
      body = '<div class="mock-cards">' + FACTOR_MOCKS.map(function (m) {
        var b = S.mock.papers[m.id];
        return '<a class="mock-card" href="#/mock" data-act="open-paper" data-paper="' + m.id + '"><div class="mk">專項 · PAPER 1 A(1)</div><h3>' + m.title + "</h3><p>" + m.note + "</p>" +
          '<div class="mm"><span>' + m.subtitle + "</span>" + (b ? "<span>最佳 " + b.best + " / " + b.total + "</span>" : "") + "</div></a>";
      }).join("") + "</div>";
    }
    return '<div class="page"><div class="page-head"><div class="eyebrow">模擬測驗</div><h1 class="page-title">計時、交卷、對答案。</h1>' +
      '<p class="page-sub">全科 Paper 1 同 Paper 2 模擬卷，覆蓋三個範疇；另外有兩份因式分解專項卷。Paper 1 用自評分，Paper 2 自動批改。</p></div>' + tabs + body +
      '<div class="grid grid-2" style="margin-top:18px"><div class="aside-card"><div class="ak">Paper 1 自評方法</div><p>每部分自己畀分：全對按滿分，步驟啱但答案錯按部分分。交卷後會保存最佳成績。</p></div>' +
      '<div class="aside-card"><div class="ak">Paper 2 自動批改</div><p>20 題四選一，45 分鐘。交卷即時看到分數、正確答案和每題步驟。</p></div></div></div>';
  }

  function findPaper(id) {
    return MOCKS.filter(function (m) { return m.id === id; })[0] || FACTOR_MOCKS.filter(function (m) { return m.id === id; })[0];
  }

  function openPaper(id, type) {
    if (type === "paper2") {
      var p2 = findPaper(id);
      if (!p2) return;
      UI.paper2 = { paper: p2, answers: {}, started: nowMs(), deadline: nowMs() + (p2.minutes || 45) * 60000, submitted: false };
      refresh(); return;
    }
    var p = findPaper(id);
    if (!p) return;
    UI.paper = { paper: p, marks: {}, started: null, elapsed: 0, submitted: false };
    refresh();
  }

  function viewPaper(paper) {
    var state = UI.paper;
    var totalMarks = paper.questions.reduce(function (a, q) { return a + q.marks; }, 0);
    var earned = 0;
    paper.questions.forEach(function (q, qi) {
      q.parts.forEach(function (p, pi) {
        var k = qi + "-" + pi;
        if (state.marks[k] !== undefined) earned += +state.marks[k];
      });
    });
    var questions = paper.questions.map(function (q, qi) {
      var parts = q.parts.map(function (p, pi) {
        var k = qi + "-" + pi;
        var markBtns = [];
        for (var m = 0; m <= p.marks; m++) {
          markBtns.push('<button class="mark-btn' + (String(state.marks[k]) === String(m) ? " active" : "") + '" data-act="paper-mark" data-key="' + k + '" data-mark="' + m + '">' + m + "</button>");
        }
        return '<div class="part"><div class="part-q"><span>' + (q.parts.length > 1 ? "(" + "abcd"[pi] + ") " : "") + p.q + '</span><span class="part-marks">（' + p.marks + " 分）</span></div>" +
          formulaHTML(p.formula || (FACTOR_MOCK_FORMULAS[paper.id] && FACTOR_MOCK_FORMULAS[paper.id][qi] ? FACTOR_MOCK_FORMULAS[paper.id][qi][pi] : "")) +
          '<div class="mark-row"><span class="mr-k">自評</span>' + markBtns.join("") + "</div>" +
          '<details class="part-sol"><summary>睇評分參考</summary><div class="ps-body"><b>答案：' + p.a + "</b>" +
          (p.steps ? "<ol style='margin:5px 0 0;padding-left:1.1em'>" + p.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") + "</div></details></div>";
      }).join("");
      return '<div class="paper-q"><div class="pq-head"><span class="pq-n">' + q.n + '.</span><span class="pq-marks">（' + q.marks + " 分）</span></div>" +
        (q.stem ? '<div class="pq-stem">' + q.stem + "</div>" : "") + parts + "</div>";
    }).join("");
    return '<div class="page"><div class="paper-toolbar"><button class="btn small ghost" data-act="paper-back">← 返回</button>' +
      '<span class="tiny muted">' + paper.title + " · " + paper.subtitle + '</span><span class="timer" data-timer>00:00</span>' +
      '<button class="btn small" data-act="paper-start">' + (state.started ? "重新計時" : "開始計時") + "</button></div>" +
      '<div class="paper-shell"><div class="paper-head"><div class="paper-kicker">HKDSE 2027 · MATHEMATICS (COMPULSORY PART)</div><h1>' + paper.title + "</h1><p>" + paper.note + "</p><p>建議時間 " + paper.minutes + " 分鐘 · 總分 " + totalMarks + " 分</p><div class=\"paper-instructions\">Answer ALL questions. 答案須寫出計算步驟。</div></div>" +
      questions + '<div class="paper-submit"><span class="ps-total">你的自評總分 <b>' + earned + "</b> / " + totalMarks + '</span><button class="btn primary" data-act="paper-submit">交卷 / 保存成績</button></div>' +
      (state.submitted ? '<div class="result-banner"><div class="rb-k">已保存</div><div class="rb-n">' + earned + " / " + totalMarks + "</div><p>最佳成績：" + (S.mock.papers[paper.id] ? S.mock.papers[paper.id].best + " / " + S.mock.papers[paper.id].total : "—") + "</p></div>" : "") +
      "</div></div>";
  }

  function viewPaper2(paper) {
    var st = UI.paper2;
    var answered = Object.keys(st.answers).length;
    var questions = paper.questions.map(function (q, qi) {
      var opts = q.options.map(function (o, oi) {
        var cls = "mcq-opt";
        if (!st.submitted && st.answers[qi] === oi) cls += " sel";
        if (st.submitted) {
          if (oi === q.answer) cls += " ok";
          else if (st.answers[qi] === oi) cls += " no";
        }
        return '<button class="' + cls + '" data-act="p2-opt" data-q="' + qi + '" data-o="' + oi + '"' + (st.submitted ? " disabled" : "") + '><span class="k">' + "ABCD"[oi] + "</span><span>" + o + "</span></button>";
      }).join("");
      return '<div class="mcq"><div class="mq-head"><span class="mq-n">' + (qi + 1) + '.</span><span class="mq-marks">（1 分）</span></div><div class="mq-q">' + q.q + "</div>" +
        formulaHTML(q.formula) + '<div class="mcq-options">' + opts + "</div>" +
        (st.submitted ? '<details class="part-sol" style="margin-left:0"><summary>睇步驟</summary><div class="ps-body"><b>答案：' + "ABCD"[q.answer] + "</b>" + (q.steps ? "<ol style='margin:5px 0 0;padding-left:1.1em'>" + q.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") + "</div></details>" : "") + "</div>";
    }).join("");
    var score = 0;
    if (st.submitted) {
      paper.questions.forEach(function (q, i) { if (st.answers[i] === q.answer) score++; });
    }
    return '<div class="page"><div class="paper-toolbar"><button class="btn small ghost" data-act="paper2-back">← 返回</button>' +
      '<span class="tiny muted">' + paper.title + " · 已答 " + answered + " / " + paper.questions.length + '</span><span class="timer" data-timer>--:--</span>' +
      '<span class="badge">' + (st.submitted ? "已交卷" : "進行中") + "</span></div>" +
      '<div class="paper-shell"><div class="paper-head"><div class="paper-kicker">HKDSE 2027 · MATHEMATICS (COMPULSORY PART)</div><h1>' + paper.title + "</h1><p>" + paper.note + "</p><p>45 分鐘 · 20 題 · 每題 1 分</p><div class=\"paper-instructions\">Answer ALL questions. 每題只有一個正確答案。</div></div>" +
      (st.submitted ? '<div class="result-banner"><div class="rb-k">你的分數</div><div class="rb-n">' + score + " / " + paper.questions.length + '</div><p>最佳成績：' + (S.mock.paper2.best || 0) + " / " + paper.questions.length + " · 已做 " + (S.mock.paper2.attempts || 0) + " 次</p></div>" : "") +
      '<div class="mcq-list">' + questions + "</div>" +
      '<div class="paper-submit"><span class="ps-total">已答 <b>' + answered + "</b> / " + paper.questions.length + '</span><button class="btn primary" data-act="paper2-submit">' + (st.submitted ? "重新開始" : "交卷") + "</button></div></div></div>";
  }

  function openPaper2(id) {
    var p = findPaper(id);
    if (!p) return;
    UI.paper2 = { paper: p, answers: {}, started: nowMs(), deadline: nowMs() + (p.minutes || 45) * 60000, submitted: false };
    refresh();
  }

  function submitPaper2() {
    var st = UI.paper2;
    if (!st || st.submitted) {
      if (st && st.submitted) { UI.paper2 = { paper: st.paper, answers: {}, started: nowMs(), deadline: nowMs() + (st.paper.minutes || 45) * 60000, submitted: false }; refresh(); }
      return;
    }
    var p = st.paper;
    var score = 0;
    p.questions.forEach(function (q, i) { if (st.answers[i] === q.answer) score++; });
    st.submitted = true;
    var rec = S.mock.paper2 || { best: 0, attempts: 0 };
    rec.best = Math.max(rec.best || 0, score);
    rec.attempts = (rec.attempts || 0) + 1;
    S.mock.paper2 = rec;
    S.stats.answered += p.questions.length; S.stats.correct += score;
    S.drill.answered += p.questions.length; S.drill.correct += score;
    addXP(30 + score * 2); touchToday(); save();
    toast("已交卷：" + score + " / " + p.questions.length);
    refresh(); window.scrollTo(0, 0);
  }

  /* ---------- mistakes ---------- */
  function viewMistakes() {
    var list = S.mistakes || [];
    var stats = {};
    list.forEach(function (m) { stats[m.topic] = (stats[m.topic] || 0) + 1; });
    var top = Object.keys(stats).sort(function (a, b) { return stats[b] - stats[a]; })[0];
    var body = list.length ? list.map(function (m) {
      return '<div class="mistake-item"><div class="mi-top"><span class="badge teal">' + topicName(m.topic) + "</span>" + lvBadge(m.lv) +
        '<span class="badge">' + (m.kind || "") + '</span><span class="badge">錯 ' + (m.count || 1) + ' 次</span><span class="badge">' + (m.at || "") + "</span></div>" +
        '<div class="mi-q">' + m.q + "</div>" +
        formulaHTML(m.formula || "") +
        '<div class="mi-a">答案：<b>' + m.a + "</b>" + (m.steps && m.steps.length ? '<ol class="q-steps" style="color:var(--ink-2);margin-top:5px">' + m.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") + "</div>" +
        '<div class="mi-actions"><button class="btn small ghost" data-act="mistake-remove" data-id="' + esc(m.q) + '">移除</button>' +
        '<a class="btn small" href="#/drill">再練類似題</a></div></div>';
    }).join("") : emptyHTML("錯題簿係空嘅", "去操練或題型庫做題，答錯的題目會自動出現在這裡。", "#/drill", "去操練");
    return '<div class="page"><div class="page-head"><div class="eyebrow">錯題簿</div><h1 class="page-title">錯過的，才是要練的。</h1>' +
      '<p class="page-sub">這裡收集你在操練和模擬卷做錯的題目。重複錯的題目會累積次數，幫你找出真正的弱點。</p></div>' +
      '<div class="grid grid-3"><div class="aside-card"><div class="ak">錯題數目</div><div class="av">' + list.length + " 題</div><p>最多保留 70 題。</p></div>" +
      '<div class="aside-card"><div class="ak">最弱範疇</div><div class="av" style="font-size:16px">' + (top ? topicName(top) : "未有") + "</div><p>" + (top ? "錯 " + stats[top] + " 題，建議優先重溫。" : "做多幾題就會出現。") + "</p></div>" +
      '<div class="aside-card"><div class="ak">行動</div><div class="av" style="font-size:16px">' + (list.length ? "重做錯題" : "開始操練") + '</div><p>再做一次，確認自己真的識。</p><a class="btn small block" style="margin-top:8px" href="#/drill">去操練</a></div></div>' +
      '<div class="section-head"><div><h2 style="font-size:24px">錯題清單</h2></div><div class="chips">' + (list.length ? '<button class="chip" data-act="mistakes-clear">清空錯題簿</button>' : "") + "</div></div>" + body + "</div>";
  }

  /* ---------- sheet ---------- */
  function viewSheet() {
    var items = [];
    TOPICS.forEach(function (t) {
      (t.formulas || []).forEach(function (f) {
        items.push({ strand: t.strand, topic: t.title, label: f.label, html: f.html, note: f.note || "" });
      });
    });
    METHODS.forEach(function (m) {
      items.push({ strand: "number", topic: "因式分解 · " + m.title, label: m.formula.label, html: m.formula.html, note: "方法 " + String(m.n).padStart(2, "0") });
    });
    var q = UI.sheetQ.trim().toLowerCase();
    if (q) items = items.filter(function (x) { return (x.label + " " + x.html + " " + x.topic + " " + x.note).toLowerCase().includes(q); });
    var groups = STRANDS.map(function (s) {
      var list = items.filter(function (x) { return x.strand === s.id; });
      if (!list.length) return "";
      return '<div class="sheet-group"><h2><span class="strand-dot ' + s.id + '"></span>' + s.title + '</h2><div class="sheet-grid">' + list.map(function (f) {
        return '<div class="sheet-card"><div class="sk">' + f.topic + " · " + f.label + '</div><div class="sv">' + f.html + "</div>" + (f.note ? '<div class="sn">' + f.note + "</div>" : "") + "</div>";
      }).join("") + "</div></div>";
    }).join("");
    return '<div class="page"><div class="page-head"><div class="eyebrow">公式大全</div><h1 class="page-title">考試前，睇這一頁。</h1>' +
      '<p class="page-sub">把三個範疇的核心公式、恆等式和常用關係集中在一起。可以搜尋，也可以直接列印出來貼在書桌前面。</p></div>' +
      '<div class="sheet-toolbar"><input class="input" id="sheetSearch" type="search" placeholder="搜尋公式，例如：平方差、sin、概率…" value="' + esc(UI.sheetQ) + '">' +
      '<div class="chips"><button class="btn small" data-act="print">列印 / 儲存 PDF</button><a class="btn small ghost" href="#/factorisation">因式分解 10 招</a></div></div>' +
      '<div class="sheet-note"><b>點用：</b>先睇公式，再喺題目裡認出它。DSE 不會直接問你背公式，而是考你幾時用、怎樣用。遇到圖形題，記得寫理由。</div>' +
      '<div id="sheetBody">' + (groups || emptyHTML("搵唔到公式", "試吓其他關鍵字。", "#/sheet", "清除搜尋")) + "</div>" +
      '<div class="section-head"><div><div class="eyebrow">考前檢查</div><h2>交卷前，問自己這五件事</h2></div></div>' +
      '<div class="card" style="padding:20px"><ol class="step-list">' +
      "<li>答案係唔係題目要求嘅形式？（factorized form、3 位有效數字、分數…）</li>" +
      "<li>方程有冇漏第二個解？</li>" +
      "<li>圖形題有冇寫理由？</li>" +
      "<li>概率的分母是否等於樣本空間總數？</li>" +
      "<li>統計題有冇先排序，再找中位數和四分位數？</li></ol></div></div>";
  }

  /* ---------- view dispatch ---------- */
  function viewFor(r) {
    switch (r.name) {
      case "home": return viewHome();
      case "courses": return viewCourses();
      case "map": return viewMap();
      case "topic": return viewTopic(r.id);
      case "factorisation": return viewFactorHome();
      case "learn": return viewMethod(r.id);
      case "bank": return viewBank();
      case "drill": return viewDrill();
      case "mock": return viewMock();
      case "mistakes": return viewMistakes();
      case "sheet": return viewSheet();
      default: return viewHome();
    }
  }

  /* ---------- bindings ---------- */
  function bindView(r) {
    if (r.name === "courses") bindCourses();
    if (r.name === "bank") bindBank();
    if (r.name === "sheet") bindSheet();
    if (r.name === "mock") { /* actions delegated */ }
  }

  function bindCourses() {
    $$("#courseChips [data-course-strand]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (route.id) { route.id = ""; history.replaceState(null, "", "#/courses"); }
        UI.courses.strand = b.getAttribute("data-course-strand");
        refresh();
      });
    });
    $$("[data-course-lv]").forEach(function (b) {
      b.addEventListener("click", function () { UI.courses.lv = b.getAttribute("data-course-lv"); refresh(); });
    });
    var inp = $("#courseSearch");
    if (inp) inp.addEventListener("input", function () {
      UI.courses.q = inp.value;
      var list = TOPICS.filter(function (t) {
        if (UI.courses.strand !== "all" && t.strand !== UI.courses.strand) return false;
        if (UI.courses.lv !== "all" && +t.level !== +UI.courses.lv) return false;
        var q = UI.courses.q.toLowerCase();
        return !q || (t.title + " " + (t.en || "") + " " + (t.tags || []).join(" ")).toLowerCase().includes(q);
      });
      $("#courseList").innerHTML = list.length ? '<div class="topic-grid">' + list.map(topicCardHTML).join("") + "</div>" : emptyHTML("搵唔到符合嘅課題", "試吓清除篩選。", "#/courses", "重置");
      $("#courseCount").textContent = list.length + " / " + TOPICS.length + " 課";
    });
  }

  function bindBank() {
    renderBankList();
    var strand = $("#bankStrand"), topic = $("#bankTopic"), lv = $("#bankLv"), search = $("#bankSearch");
    if (strand) strand.addEventListener("change", function () {
      if (route.id) { route.id = ""; history.replaceState(null, "", "#/bank"); }
      UI.bank.strand = strand.value;
      UI.bank.topic = "all";
      UI.bank.limit = 24;
      refresh();
    });
    if (topic) topic.addEventListener("change", function () {
      if (route.id) { route.id = ""; history.replaceState(null, "", "#/bank"); }
      UI.bank.topic = topic.value;
      UI.bank.limit = 24;
      if (topic.value !== "all") { UI.bank.strand = "all"; }
      refresh();
    });
    if (lv) lv.addEventListener("change", function () { UI.bank.lv = lv.value; UI.bank.limit = 24; renderBankList(); });
    if (search) search.addEventListener("input", function () {
      UI.bank.q = search.value; UI.bank.limit = 24; renderBankList();
    });
  }

  function bindSheet() {
    var inp = $("#sheetSearch");
    if (inp) inp.addEventListener("input", function () {
      UI.sheetQ = inp.value;
      var items = [];
      TOPICS.forEach(function (t) {
        (t.formulas || []).forEach(function (f) { items.push({ strand: t.strand, topic: t.title, label: f.label, html: f.html, note: f.note || "" }); });
      });
      METHODS.forEach(function (m) {
        items.push({ strand: "number", topic: "因式分解 · " + m.title, label: m.formula.label, html: m.formula.html, note: "方法 " + String(m.n).padStart(2, "0") });
      });
      var q = UI.sheetQ.trim().toLowerCase();
      if (q) items = items.filter(function (x) { return (x.label + " " + x.html + " " + x.topic + " " + x.note).toLowerCase().includes(q); });
      var groups = STRANDS.map(function (s) {
        var list = items.filter(function (x) { return x.strand === s.id; });
        if (!list.length) return "";
        return '<div class="sheet-group"><h2><span class="strand-dot ' + s.id + '"></span>' + s.title + '</h2><div class="sheet-grid">' + list.map(function (f) {
          return '<div class="sheet-card"><div class="sk">' + f.topic + " · " + f.label + '</div><div class="sv">' + f.html + "</div>" + (f.note ? '<div class="sn">' + f.note + "</div>" : "") + "</div>";
        }).join("") + "</div></div>";
      }).join("");
      $("#sheetBody").innerHTML = groups || emptyHTML("搵唔到公式", "試吓其他關鍵字。", "#/sheet", "清除搜尋");
    });
  }

  /* ---------- delegated actions ---------- */
  function revealQ(id) {
    var ans = $('[data-ans="' + id + '"]');
    if (ans) {
      ans.hidden = !ans.hidden;
      var btn = $('[data-act="reveal"][data-q="' + id + '"]');
      if (btn) btn.textContent = ans.hidden ? "睇答案" : "收起答案";
      if (!ans.hidden) { S.bankSeen[id] = true; save(); }
    }
  }

  document.addEventListener("click", function (e) {
    var nav = e.target.closest('#nav a[href="#/mock"], #nav a[href="#/drill"]');
    if (nav) {
      if (nav.getAttribute("href") === "#/mock" && location.hash === "#/mock") {
        UI.paper = null; UI.paper2 = null; UI.mockTab = "paper1"; refresh();
      }
      if (nav.getAttribute("href") === "#/drill" && location.hash === "#/drill" && UI.drill) {
        UI.drill = null; refresh();
      }
    }
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");

    if (act === "formula") {
      var peek = el.closest(".formula-peek");
      var box = peek ? peek.querySelector(".q-formula") : null;
      if (box) {
        box.hidden = !box.hidden;
        el.textContent = box.hidden ? "唔識？睇公式" : "收起公式";
      }
      return;
    }
    if (act === "reveal") { revealQ(el.getAttribute("data-q")); return; }
    if (act === "mistake") {
      var q = BANK_BY_ID[el.getAttribute("data-q")];
      if (q) addMistake(q, "bank");
      return;
    }
    if (act === "cp-reveal") {
      var i = el.getAttribute("data-cp");
      var box = $('[data-cp-ans="' + i + '"]');
      if (box) { box.hidden = !box.hidden; el.textContent = box.hidden ? "睇答案" : "收起答案"; }
      return;
    }
    if (act === "daily-reveal") {
      var da = $("[data-daily-ans]");
      if (da) da.hidden = !da.hidden;
      return;
    }
    if (act === "daily-new") {
      var pick = BANK[Math.floor(Math.random() * BANK.length)];
      dailyCache = pick;
      refresh();
      return;
    }
    if (act === "done-topic") {
      var id = el.getAttribute("data-topic");
      if (!S.topics[id]) S.topics[id] = {};
      S.topics[id].done = !S.topics[id].done;
      if (S.topics[id].done) { addXP(25); touchToday(); toast("已完成：" + topicName(id)); }
      save(); refresh(); return;
    }
    if (act === "done-method") {
      var mid = el.getAttribute("data-method");
      if (!S.methods[mid]) S.methods[mid] = {};
      S.methods[mid].done = !S.methods[mid].done;
      if (S.methods[mid].done) { addXP(15); touchToday(); toast("已學會：" + (METHOD_BY_ID[mid] ? METHOD_BY_ID[mid].title : "")); }
      save(); refresh(); return;
    }
    if (act === "drill-mode") { UI.drillMode = el.getAttribute("data-mode"); refresh(); return; }
    if (act === "start-drill") { startDrill(); return; }
    if (act === "drill-answer") { answerDrill(+el.getAttribute("data-i")); return; }
    if (act === "drill-reveal") { UI.drill.revealed = true; refresh(); return; }
    if (act === "drill-self") { selfMark(el.getAttribute("data-ok") === "1"); return; }
    if (act === "drill-next") { nextDrill(); return; }
    if (act === "drill-quit") { UI.drill = null; refresh(); return; }
    if (act === "drill-restart") { UI.drill = null; refresh(); return; }
    if (act === "bank-more") { UI.bank.limit += 24; renderBankList(); return; }
    if (act === "mock-tab") { UI.mockTab = el.getAttribute("data-tab"); refresh(); return; }
    if (act === "open-paper") { openPaper(el.getAttribute("data-paper"), "paper1"); window.scrollTo(0, 0); return; }
    if (act === "open-paper2") { openPaper2(el.getAttribute("data-paper")); window.scrollTo(0, 0); return; }
    if (act === "paper-back") { UI.paper = null; refresh(); window.scrollTo(0, 0); return; }
    if (act === "paper2-back") { UI.paper2 = null; refresh(); window.scrollTo(0, 0); return; }
    if (act === "paper-start") { if (UI.paper) { UI.paper.started = nowMs(); UI.paper.elapsed = 0; refresh(); } return; }
    if (act === "paper-mark") {
      if (!UI.paper) return;
      UI.paper.marks[el.getAttribute("data-key")] = +el.getAttribute("data-mark");
      refresh(); return;
    }
    if (act === "paper-submit") {
      if (!UI.paper) return;
      var paper = UI.paper.paper, earned = 0;
      paper.questions.forEach(function (q, qi) { q.parts.forEach(function (p, pi) { var k = qi + "-" + pi; if (UI.paper.marks[k] !== undefined) earned += +UI.paper.marks[k]; }); });
      var rec = S.mock.papers[paper.id] || { best: 0, total: paper.total || 0, attempts: 0 };
      rec.best = Math.max(rec.best || 0, earned); rec.total = paper.total || 0; rec.attempts = (rec.attempts || 0) + 1;
      S.mock.papers[paper.id] = rec;
      UI.paper.submitted = true;
      addXP(25); touchToday(); save(); toast("已保存：" + earned + " / " + (paper.total || 0)); refresh(); window.scrollTo(0, 0); return;
    }
    if (act === "p2-opt") {
      if (!UI.paper2 || UI.paper2.submitted) return;
      UI.paper2.answers[+el.getAttribute("data-q")] = +el.getAttribute("data-o");
      refresh(); return;
    }
    if (act === "paper2-submit") { submitPaper2(); return; }
    if (act === "mistake-remove") {
      var qq = el.getAttribute("data-id");
      S.mistakes = S.mistakes.filter(function (m) { return m.q !== qq; });
      save(); refresh(); return;
    }
    if (act === "mistakes-clear") {
      if (confirm("確定清空整個錯題簿？")) { S.mistakes = []; save(); refresh(); }
      return;
    }
    if (act === "print") { window.print(); return; }
  });

  /* drill config changes */
  document.addEventListener("change", function (e) {
    if (e.target.id === "drillMethod") { UI.drillCfg.method = e.target.value; }
    if (e.target.id === "drillStrand") { UI.drillCfg.strand = e.target.value; }
  });
  document.addEventListener("click", function (e) {
    var lv = e.target.closest("[data-lv]");
    if (lv) { UI.drillCfg.lv = lv.getAttribute("data-lv"); refresh(); return; }
    var ct = e.target.closest("[data-count]");
    if (ct) { UI.drillCfg.count = +ct.getAttribute("data-count"); refresh(); return; }
  });

  /* keyboard for drill */
  document.addEventListener("keydown", function (e) {
    if (!UI.drill || UI.drill.done || !/^#\/drill/.test(location.hash || "")) return;
    if (["INPUT", "TEXTAREA", "SELECT"].indexOf(document.activeElement.tagName) >= 0) return;
    if (e.key >= "1" && e.key <= "4") {
      var idx = +e.key - 1;
      if (UI.drill.mode !== "all" && !UI.drill.locked) { e.preventDefault(); answerDrill(idx); }
    }
    if (e.key === "Enter" && UI.drill.locked) { e.preventDefault(); nextDrill(); }
  });

  /* timer */
  function tickTimer() {
    var el = document.querySelector("[data-timer]");
    if (!el) return;
    if (UI.paper2 && !UI.paper2.submitted && UI.paper2.deadline) {
      var left = Math.floor((UI.paper2.deadline - nowMs()) / 1000);
      el.textContent = fmtTime(Math.max(0, left));
      if (left <= 0 && !UI.paper2.autoSubmitted) { UI.paper2.autoSubmitted = true; submitPaper2(); }
      return;
    }
    if (UI.paper && UI.paper.started) {
      el.textContent = fmtTime(Math.floor((nowMs() - UI.paper.started) / 1000));
      return;
    }
    if (UI.drill && !UI.drill.done) {
      el.textContent = fmtTime(Math.floor((nowMs() - UI.drill.start) / 1000));
    }
  }
  setInterval(tickTimer, 1000);

  /* ---------- boot ---------- */
  function boot() {
    applyTheme();
    $("#themeBtn").addEventListener("click", toggleTheme);
    $("#menuBtn").addEventListener("click", function () {
      if ($("#sidebar").classList.contains("open")) closeMenu(); else openMenu();
    });
    $("#scrim").addEventListener("click", closeMenu);
    $$("#nav .nav-link").forEach(function (a) { a.addEventListener("click", closeMenu); });
    if (!location.hash) location.hash = "#/home";
    parseRoute();
    render();
    window.addEventListener("hashchange", function () {
      closeMenu();
      parseRoute();
      // leaving a running drill clears it only when going elsewhere
      if (!/^#\/drill/.test(location.hash || "") && UI.drill) UI.drill = null;
      if (!/^#\/mock/.test(location.hash || "")) { UI.paper = null; UI.paper2 = null; }
      render();
      window.scrollTo(0, 0);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
