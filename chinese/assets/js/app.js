/* ============================================================
   拾級 · DSE 中文三級特訓
   State, router, views, drills.
   ============================================================ */
(function () {
  "use strict";

  var D = window.CH = {};
  var META = window.CH_DATA_META || {};
  var READING = window.CH_DATA_READING || { sets: [] };
  var PRACTICAL = window.CH_DATA_PRACTICAL || { sets: [] };
  var COMPOSITION = window.CH_DATA_COMPOSITION || { sets: [] };
  var SBA = window.CH_DATA_SBA || { sets: [], guide: {} };
  var FANWEN = window.CH_DATA_FANWEN || [];

  /* ---------- fallbacks so the app still works while content loads ---------- */
  META.exam = META.exam || {
    year: 2027,
    countdownDefault: "2027-04-24",
    dateLabel: "2027 年 4 月（以考評局公布為準）",
    papers: [
      { id: "p1", name: "卷一 閱讀能力", weight: "40%", time: "1 小時 30 分", desc: "甲部指定文言 30%＋乙部課外篇章 70%" },
      { id: "p2a", name: "卷二 甲部 實用寫作", weight: "13.5%", time: "約 40 分鐘", desc: "書信、通告、演講辭、建議書、報告、評論" },
      { id: "p2b", name: "卷二 乙部 命題寫作", weight: "31.5%", time: "約 90 分鐘", desc: "三選一長文，不少於 650 字" },
      { id: "sba", name: "校本評核 閱讀匯報", weight: "15%", time: "校內", desc: "一次文字報告＋一次口頭匯報" }
    ],
    notes: [
      "2024 年起中文科公開試只剩卷一閱讀（40%）及卷二寫作（45%）。",
      "舊制卷三聆聽、卷四說話已取消；說話能力改為 SBA 口頭匯報。",
      "SBA 閱讀匯報佔 15%，包括文字報告及口頭匯報各一次。"
    ]
  };
  META.levels = META.levels || [
    { n: 1, name: "Level 1 · 打好底", desc: "先處理看得明、寫得通、答得中。", target: "目標：穩住基本分，建立答題習慣。", focus: ["直接理解", "基本格式", "減少離題"] },
    { n: 2, name: "Level 2 · 站穩陣", desc: "開始練分析、推論、手法與比較。", target: "目標：穩定 Level 3–4。", focus: ["深層理解", "結構完整", "手法分析"] },
    { n: 3, name: "Level 3 · 衝刺", desc: "練高階比較、評價、駁論與跨文本。", target: "目標：衝 Level 5。", focus: ["比較閱讀", "批判思考", "個人見解"] }
  ];
  META.plan14 = META.plan14 || [
    { day: 1, station: "p1-l1", label: "卷一閱讀 L1", note: "白話記敘，先練定位" },
    { day: 2, station: "p2a-l1", label: "實用寫作 L1", note: "通告／邀請函格式" },
    { day: 3, station: "p2b-l1", label: "命題寫作 L1", note: "記敘文，一件小事" },
    { day: 4, station: "sba-l1", label: "SBA L1", note: "單一文本報告" },
    { day: 5, station: "p1-l2", label: "卷一閱讀 L2", note: "描寫抒情＋文言小段" },
    { day: 6, station: "p2a-l2", label: "實用寫作 L2", note: "書信／演講辭" },
    { day: 7, station: "p2b-l2", label: "命題寫作 L2", note: "描寫抒情文" },
    { day: 8, station: "sba-l2", label: "SBA L2", note: "分析式報告" },
    { day: 9, station: "p1-l3", label: "卷一閱讀 L3", note: "文言＋白話雙篇" },
    { day: 10, station: "p2a-l3", label: "實用寫作 L3", note: "建議書／評論" },
    { day: 11, station: "p2b-l3", label: "命題寫作 L3", note: "議論文＋駁論" },
    { day: 12, station: "sba-l3", label: "SBA L3", note: "跨文本比較" },
    { day: 13, station: "", label: "錯題回顧", note: "重做錯題，整理失分模式" },
    { day: 14, station: "", label: "計時模擬", note: "卷一 90 分鐘＋卷二 135 分鐘" }
  ];
  META.prescribed = META.prescribed || [];
  META.formats = META.formats || [];
  META.frameworks = META.frameworks || [];
  META.quotes = META.quotes || [];

  D.stations = []
    .concat(READING.sets || [])
    .concat(PRACTICAL.sets || [])
    .concat(COMPOSITION.sets || [])
    .concat(SBA.sets || []);
  D.stationById = {};
  D.stations.forEach(function (s) { D.stationById[s.id] = s; });
  D.fanwen = FANWEN.slice();
  var FW_ORDER = (META.prescribed || []).map(function (x) { return x.id; });
  D.fanwen.sort(function (a, b) {
    var ia = FW_ORDER.indexOf(a.id), ib = FW_ORDER.indexOf(b.id);
    if (ia < 0) ia = 99;
    if (ib < 0) ib = 99;
    return ia - ib;
  });
  D.fanwenById = {};
  D.fanwen.forEach(function (t) { if (t && t.id) D.fanwenById[t.id] = t; });

  var TRACKS = {
    reading: {
      id: "reading", name: "卷一 閱讀", short: "閱讀", weight: 40,
      href: "#/reading", color: "var(--indigo)",
      desc: "甲部指定文言 30%＋乙部課外篇章 70%。90 分鐘，全部必答。",
      lede: "閱讀卷佔全科 40%，係最高區分度嘅一卷。先練定位，再練手法，最後練比較。"
    },
    practical: {
      id: "practical", name: "卷二 甲部 實用寫作", short: "實用寫作", weight: 13.5,
      href: "#/practical", color: "var(--gold)",
      desc: "佔卷二 30%，即全科 13.5%。設閱讀材料，字數有上限。",
      lede: "實用文係「格式＋語境＋資料整合」嘅送分題。格式錯一樣，分數就一路漏。"
    },
    composition: {
      id: "composition", name: "卷二 乙部 命題寫作", short: "命題寫作", weight: 31.5,
      href: "#/composition", color: "var(--seal)",
      desc: "佔卷二 70%，即全科 31.5%。三選一長文，一般不少於 650 字。",
      lede: "命題寫作係單一最大評分項目。審題定生死，立意分高下，結構決定閱卷員跟唔跟得到。"
    },
    sba: {
      id: "sba", name: "SBA 閱讀匯報", short: "SBA", weight: 15,
      href: "#/sba", color: "var(--good)",
      desc: "佔全科 15%。一次文字報告＋一次口頭匯報，校內進行。",
      lede: "SBA 係相對可控嘅 15%。有準備嘅人，用同一本書（或同一組作品）就可以同時交出文字報告同口頭匯報。"
    }
  };
  D.TRACKS = TRACKS;

  /* ---------- tiny DOM helpers ---------- */
  D.$ = function (sel, root) { return (root || document).querySelector(sel); };
  D.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  D.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  D.clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
  D.pad2 = function (n) { return (n < 10 ? "0" : "") + n; };
  D.today = function () { return D.iso(new Date()); };
  D.iso = function (d) {
    return d.getFullYear() + "-" + D.pad2(d.getMonth() + 1) + "-" + D.pad2(d.getDate());
  };
  D.addDays = function (iso, n) {
    var p = String(iso).split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return D.iso(d);
  };
  D.daysBetween = function (a, b) {
    var pa = String(a).split("-"), pb = String(b).split("-");
    var da = new Date(+pa[0], +pa[1] - 1, +pa[2]);
    var db = new Date(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((db - da) / 86400000);
  };
  D.fmtDate = function (iso) {
    if (!iso) return "—";
    var p = String(iso).split("-");
    return (+p[1]) + " 月 " + (+p[2]) + " 日";
  };
  D.text = function (s) {
    return String(s == null ? "" : s).split(/\n{2,}/).map(function (p) {
      return "<p>" + D.esc(p).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  };
  D.passage = function (s) {
    return String(s == null ? "" : s).split(/\n{2,}/).map(function (p, i) {
      return '<p><span class="para-num">' + (i + 1) + "</span>" + D.esc(p).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  };
  D.blankQ = function (s) {
    return D.esc(s).replace(/_{2,}/g, '<span class="blank"></span>');
  };
  D.countZh = function (text) {
    var t = String(text || "").replace(/\s+/g, "");
    t = t.replace(/[，。！？、；：「」『』（）《》〈〉…—·,.!?;:'"“”‘’()\[\]{}<>\/\\\-–—]/g, "");
    return t.length;
  };
  D.norm = function (s) {
    return String(s == null ? "" : s).toLowerCase()
      .replace(/[\s，。、；：！？「」『』（）()《》〈〉…—·,\.!\?;:'"“”‘’\-–—$＄%％]/g, "")
      .trim();
  };
  D.answerVariants = function (q) {
    var raw = [q.a].concat(q.accept || []);
    var out = [];
    raw.forEach(function (a) {
      String(a).split(/[\/／]|或/).forEach(function (x) {
        var v = String(x).trim();
        if (v && out.indexOf(v) === -1) out.push(v);
      });
    });
    return out;
  };
  D.matchAnswer = function (q, value) {
    var n = D.norm(value);
    if (!n) return false;
    return D.answerVariants(q).some(function (a) { return D.norm(a) === n; });
  };
  D.wcLabel = function (text) {
    var n = D.countZh(text);
    return n;
  };

  /* ---------- state ---------- */
  var KEY = "dse_chinese_shiji_v1";
  D.storageOK = true;
  try { window.localStorage.setItem("__t", "1"); window.localStorage.removeItem("__t"); }
  catch (e) { D.storageOK = false; }

  function defaults() {
    return {
      v: 1,
      createdAt: D.today(),
      settings: {
        theme: "auto",
        examDate: META.exam.countdownDefault || "2027-04-24",
        name: ""
      },
      xp: 0,
      streak: { count: 0, best: 0, last: null },
      days: {},
      stations: { done: [], best: {}, attempts: {} },
      fanwen: { done: [], best: {} },
      drafts: {},
      errors: [],
      missions: {}
    };
  }
  function merge(base, saved) {
    if (!saved || typeof saved !== "object") return base;
    var out = Array.isArray(base) ? base.slice() : {};
    if (!Array.isArray(base)) Object.keys(base).forEach(function (k) { out[k] = base[k]; });
    Object.keys(saved).forEach(function (k) {
      var bv = out[k], sv = saved[k];
      if (sv && typeof sv === "object" && !Array.isArray(sv) &&
          bv && typeof bv === "object" && !Array.isArray(bv)) {
        out[k] = merge(bv, sv);
      } else {
        out[k] = sv;
      }
    });
    return out;
  }
  function load() {
    var base = defaults();
    if (!D.storageOK) return base;
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return base;
      return merge(base, JSON.parse(raw));
    } catch (e) { return base; }
  }
  var S = D.state = load();
  D.save = function () {
    if (!D.storageOK) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  };
  D.reset = function () { S = D.state = defaults(); D.save(); };

  D.dayStats = function () {
    var k = D.today();
    if (!S.days[k]) S.days[k] = { xp: 0, stations: 0, questions: 0, writing: 0, speaking: 0, minutes: 0 };
    return S.days[k];
  };
  D.touch = function () {
    var t = D.today(), s = S.streak;
    if (s.last === t) return;
    var y = D.addDays(t, -1);
    s.count = s.last === y ? (s.count || 0) + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best || 0, s.count);
    D.save();
  };
  D.award = function (xp, kind, qty) {
    D.touch();
    var st = D.dayStats();
    S.xp = (S.xp || 0) + (xp || 0);
    st.xp += xp || 0;
    if (kind) st[kind] = (st[kind] || 0) + (qty == null ? 1 : qty);
    D.save();
    refreshChrome();
  };
  D.levelInfo = function () {
    var xp = S.xp || 0;
    var lv = Math.floor(Math.sqrt(xp / 50)) + 1;
    var cur = Math.pow(lv - 1, 2) * 50;
    var next = Math.pow(lv, 2) * 50;
    var pct = next > cur ? D.clamp(Math.round((xp - cur) / (next - cur) * 100), 0, 100) : 0;
    var names = ["初學", "起步", "穩陣", "進階", "衝刺", "實戰", "大勇"];
    return { level: lv, name: names[Math.min(lv - 1, names.length - 1)], xp: xp, cur: cur, next: next, pct: pct };
  };

  function isDone(id) { return (S.stations.done || []).indexOf(id) !== -1; }
  function bestOf(id) {
    var b = S.stations.best[id];
    return typeof b === "number" ? b : 0;
  }
  function trackStats(track) {
    var sets = D.stations.filter(function (s) { return s.track === track; });
    var done = 0, sum = 0, attempted = 0;
    sets.forEach(function (s) {
      if (isDone(s.id)) done++;
      if (typeof S.stations.best[s.id] === "number") { sum += S.stations.best[s.id]; attempted++; }
    });
    var avg = attempted ? Math.round(sum / attempted) : 0;
    var completion = sets.length ? done / sets.length : 0;
    var scorePart = attempted ? avg / 100 : 0;
    return {
      track: track, sets: sets, done: done, total: sets.length, avg: avg,
      progress: Math.round((0.65 * completion + 0.35 * scorePart) * 100)
    };
  }
  D.progress = function () {
    var tracks = {}, readiness = 0, done = 0;
    ["reading", "practical", "composition", "sba"].forEach(function (k) {
      tracks[k] = trackStats(k);
      readiness += TRACKS[k].weight * tracks[k].progress / 100;
      done += tracks[k].done;
    });
    return {
      tracks: tracks,
      readiness: Math.round(readiness),
      done: done,
      total: D.stations.length
    };
  };
  D.band = function (r) {
    if (r < 20) return { label: "Level 1 · 起步", cls: "l1" };
    if (r < 40) return { label: "Level 1 · 接近 Level 2", cls: "l1" };
    if (r < 62) return { label: "Level 2 · 站穩", cls: "l2" };
    if (r < 82) return { label: "Level 2 · 接近 Level 3", cls: "l2" };
    return { label: "Level 3 · 衝刺", cls: "l3" };
  };
  function nextStation() {
    var i, s;
    for (i = 0; i < (META.plan14 || []).length; i++) {
      if (META.plan14[i].station) {
        s = D.stationById[META.plan14[i].station];
        if (s && !isDone(s.id)) return s;
      }
    }
    for (i = 0; i < D.stations.length; i++) {
      if (!isDone(D.stations[i].id)) return D.stations[i];
    }
    return null;
  }
  function recordResult(id, pct) {
    var first = !isDone(id);
    if (first) {
      S.stations.done.push(id);
      D.dayStats().stations = (D.dayStats().stations || 0) + 1;
    }
    S.stations.best[id] = Math.max(bestOf(id), Math.round(pct));
    S.stations.attempts[id] = (S.stations.attempts[id] || 0) + 1;
    D.save();
    refreshChrome();
    var st = D.stationById[id];
    if (st) renderNav(st.track);
    return first;
  }
  function ensureFanwenState() {
    if (!S.fanwen || typeof S.fanwen !== "object") S.fanwen = { done: [], best: {} };
    if (!Array.isArray(S.fanwen.done)) S.fanwen.done = [];
    if (!S.fanwen.best || typeof S.fanwen.best !== "object") S.fanwen.best = {};
  }
  function fanwenDone(id) { ensureFanwenState(); return S.fanwen.done.indexOf(id) !== -1; }
  function fanwenBest(id) {
    ensureFanwenState();
    var b = S.fanwen.best[id];
    return typeof b === "number" ? b : 0;
  }
  function recordFanwen(id, pct) {
    ensureFanwenState();
    var first = S.fanwen.done.indexOf(id) === -1;
    if (first) S.fanwen.done.push(id);
    S.fanwen.best[id] = Math.max(fanwenBest(id), Math.round(pct));
    D.save();
    refreshChrome();
    return first;
  }
  function addError(set, q, your, correct, why) {
    var key = set.id + "|" + q;
    var found = null;
    (S.errors || []).forEach(function (e) { if (e.key === key && !e.fixed) found = e; });
    if (found) {
      found.your = your;
      found.at = Date.now();
    } else {
      S.errors.unshift({
        key: key, station: set.id, stationTitle: set.title,
        q: q, your: your, correct: correct, why: why,
        at: Date.now(), fixed: false
      });
    }
    if (S.errors.length > 240) S.errors.length = 240;
    D.save();
  }

  /* ---------- UI helpers ---------- */
  D.toast = function (msg) {
    var wrap = D.$("#toastWrap");
    if (!wrap) return;
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add("out"); }, 2200);
    setTimeout(function () { el.remove(); }, 2600);
  };
  D.modal = function (html, onOpen) {
    var root = D.$("#modalRoot");
    root.innerHTML = '<div class="modal-back" data-close="1"><div class="modal" role="dialog" aria-modal="true">' + html + "</div></div>";
    var back = root.firstChild;
    function close() { root.innerHTML = ""; document.removeEventListener("keydown", onKey); }
    function onKey(e) { if (e.key === "Escape") close(); }
    back.addEventListener("click", function (e) {
      if (e.target === back) close();
      if (e.target.closest("[data-close]")) close();
    });
    document.addEventListener("keydown", onKey);
    if (onOpen) onOpen(back);
    return { close: close };
  };
  D.confirm = function (title, body, onYes, yesLabel) {
    D.modal(
      "<h3>" + D.esc(title) + "</h3><p class=\"muted\">" + body + "</p>" +
      '<div class="btn-row" style="justify-content:flex-end;margin-top:18px">' +
      '<button class="btn soft" data-close="1">取消</button>' +
      '<button class="btn seal" data-yes="1">' + D.esc(yesLabel || "確定") + "</button></div>",
      function (root) {
        root.querySelector("[data-yes]").addEventListener("click", function () {
          onYes();
          root.querySelector("[data-close]").click();
        });
      }
    );
  };
  D.ringSVG = function (pct, size) {
    size = size || 150;
    var r = (size - 12) / 2;
    var c = 2 * Math.PI * r;
    var off = c * (1 - D.clamp(pct, 0, 100) / 100);
    return '<svg class="ring" viewBox="0 0 ' + size + " " + size + '" width="' + size + '" height="' + size + '" aria-hidden="true">' +
      '<circle class="track" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '"></circle>' +
      '<circle class="fill" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle></svg>';
  };
  D.speak = function (text, opts) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      D.toast("呢個瀏覽器唔支援語音播放，可以自己讀一次範例。");
      return;
    }
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(text));
    u.lang = "zh-HK";
    u.rate = (opts && opts.rate) || 0.88;
    var voices = window.speechSynthesis.getVoices() || [];
    var v = voices.filter(function (x) { return /zh[-_]HK/i.test(x.lang); })[0] ||
            voices.filter(function (x) { return /^zh/i.test(x.lang); })[0];
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  };
  D.stopSpeak = function () { if (window.speechSynthesis) window.speechSynthesis.cancel(); };

  /* ---------- theme ---------- */
  D.applyTheme = function () {
    var mode = S.settings.theme || "auto";
    var dark = mode === "dark" || (mode === "auto" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#141311" : "#f4efe3");
    var label = D.$("#themeLabel");
    if (label) label.textContent = mode === "auto" ? "跟隨系統" : (dark ? "淺色模式" : "深色模式");
  };
  D.toggleTheme = function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    S.settings.theme = dark ? "light" : "dark";
    D.save(); D.applyTheme(); refreshChrome();
  };

  /* ---------- chrome / nav ---------- */
  var NAV = [
    { group: "開始" },
    { id: "dashboard", href: "#/dashboard", label: "首頁", icon: "首" },
    { id: "stations", href: "#/stations", label: "三級特訓", icon: "級" },
    { group: "四個戰場" },
    { id: "reading", href: "#/reading", label: "卷一 · 閱讀", icon: "讀" },
    { id: "fanwen", href: "#/fanwen", label: "範文庫 · 12篇", icon: "範" },
    { id: "practical", href: "#/practical", label: "卷二 · 實用寫作", icon: "實" },
    { id: "composition", href: "#/composition", label: "卷二 · 命題寫作", icon: "文" },
    { id: "sba", href: "#/sba", label: "SBA · 閱讀匯報", icon: "報" },
    { group: "修正" },
    { id: "errors", href: "#/errors", label: "錯題簿", icon: "錯" },
    { id: "tools", href: "#/tools", label: "工具箱", icon: "具" }
  ];
  var CRUMBS = {
    dashboard: "首頁", stations: "三級特訓", reading: "卷一 閱讀",
    fanwen: "範文庫", practical: "卷二 實用寫作", composition: "卷二 命題寫作",
    sba: "SBA 閱讀匯報", errors: "錯題簿", tools: "工具箱"
  };

  function renderNav(active) {
    var p = D.progress();
    ensureFanwenState();
    var openErrors = (S.errors || []).filter(function (e) { return !e.fixed; }).length;
    var counts = {
      stations: p.done + "/" + p.total,
      reading: p.tracks.reading.done + "/" + p.tracks.reading.total,
      fanwen: S.fanwen.done.length + "/" + D.fanwen.length,
      practical: p.tracks.practical.done + "/" + p.tracks.practical.total,
      composition: p.tracks.composition.done + "/" + p.tracks.composition.total,
      sba: p.tracks.sba.done + "/" + p.tracks.sba.total,
      errors: openErrors || ""
    };
    var html = "";
    NAV.forEach(function (n) {
      if (n.group) { html += '<div class="nav-group">' + n.group + "</div>"; return; }
      html += '<a href="' + n.href + '" class="' + (active === n.id ? "active" : "") + '">' +
        '<span class="ni">' + n.icon + "</span>" + n.label +
        (counts[n.id] !== undefined && counts[n.id] !== "" ? '<span class="count">' + counts[n.id] + "</span>" : "") +
        "</a>";
    });
    D.$("#nav").innerHTML = html;
  }
  function refreshChrome() {
    var p = D.progress();
    var lv = D.levelInfo();
    var band = D.band(p.readiness);
    var sp = D.$("#sidePct"), sb = D.$("#sideBar"), sh = D.$("#sideHint");
    if (sp) sp.textContent = p.readiness + "%";
    if (sb) sb.style.width = p.readiness + "%";
    if (sh) sh.textContent = band.label;
    var stats = D.$("#topstats");
    if (stats) {
      stats.innerHTML =
        '<span class="chip"><span class="dot"></span>連續 <b>' + (S.streak.count || 0) + "</b> 日</span>" +
        '<span class="chip xp"><span class="dot"></span>LV ' + lv.level + " · <b>" + lv.xp + "</b> XP</span>";
    }
  }
  function setCrumbs(parts) {
    var root = parts[0] || "dashboard";
    var name = CRUMBS[root] || "首頁";
    var extra = "";
    var second = "";
    if (root === "station") {
      var st = D.stationById[parts[1]];
      if (st) {
        name = TRACKS[st.track].name;
        extra = st.title;
      } else {
        name = "訓練站";
      }
    } else if (root === "fanwen") {
      name = "範文庫";
      if (parts[1] && D.fanwenById[parts[1]]) extra = D.fanwenById[parts[1]].shortTitle || D.fanwenById[parts[1]].title;
    } else if (root === "stations") {
      name = "三級特訓";
    }
    D.$("#crumbs").innerHTML = '<span>DSE 中文</span><span class="sep">/</span><strong>' +
      D.esc(name) + "</strong>" +
      (extra ? '<span class="sep">/</span><span>' + D.esc(extra) + "</span>" : "");
    document.title = (extra || name) + " · 拾級 DSE 中文";
  }

  /* ---------- timers ---------- */
  D._cleanups = [];
  D.cleanup = function () {
    D._cleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
    D._cleanups = [];
  };
  function mountExamTimer(el, seconds, label) {
    var left = seconds, running = false, tick = null;
    el.innerHTML = '<span class="timer-sm" data-time>' + fmt(left) + "</span>" +
      '<button class="btn sm soft" data-start type="button">開始</button>' +
      '<button class="btn ghost sm" data-reset type="button" title="重設">↺</button>';
    function fmt(s) {
      s = Math.max(0, s);
      return D.pad2(Math.floor(s / 60)) + ":" + D.pad2(s % 60);
    }
    function paint() {
      var d = el.querySelector("[data-time]");
      if (!d) return;
      d.textContent = fmt(left);
      d.className = "timer-sm" + (left <= 60 && left > 0 ? " warn" : "") + (left <= 0 ? " done" : "");
    }
    el.querySelector("[data-start]").addEventListener("click", function () {
      if (running) {
        clearInterval(tick); running = false; this.textContent = "繼續"; return;
      }
      if (left <= 0) return;
      running = true; this.textContent = "暫停";
      var btn = this;
      tick = setInterval(function () {
        left--; paint();
        if (left <= 0) {
          clearInterval(tick); running = false; btn.textContent = "時間到";
          D.toast((label || "時間") + "到，停筆。");
        }
      }, 1000);
    });
    el.querySelector("[data-reset]").addEventListener("click", function () {
      clearInterval(tick); running = false; left = seconds; paint();
      el.querySelector("[data-start]").textContent = "開始";
    });
    D._cleanups.push(function () { if (tick) clearInterval(tick); });
    paint();
  }
  function mountOralTimer(el, defaultSec) {
    var total = defaultSec || 180, left = total, running = false, tick = null;
    el.innerHTML = '<div class="tl">口頭匯報計時</div><div class="big-time" data-time>' + fmt(left) + "</div>" +
      '<div class="btn-row" style="justify-content:center">' +
      '<button class="btn sm soft" data-sec="60" type="button">1 分鐘</button>' +
      '<button class="btn sm soft" data-sec="120" type="button">2 分鐘</button>' +
      '<button class="btn sm soft" data-sec="180" type="button">3 分鐘</button>' +
      '<button class="btn sm seal" data-start type="button">開始</button>' +
      '<button class="btn sm ghost" data-reset type="button">↺</button></div>';
    function fmt(s) { s = Math.max(0, s); return D.pad2(Math.floor(s / 60)) + ":" + D.pad2(s % 60); }
    function paint() {
      var d = el.querySelector("[data-time]");
      if (!d) return;
      d.textContent = fmt(left);
      d.className = "big-time" + (left <= 15 && left > 0 ? " warn" : "") + (left <= 0 ? " done" : "");
    }
    el.querySelector("[data-start]").addEventListener("click", function () {
      if (running) { clearInterval(tick); running = false; this.textContent = "繼續"; return; }
      if (left <= 0) return;
      running = true; this.textContent = "暫停";
      var btn = this;
      tick = setInterval(function () {
        left--; paint();
        if (left <= 0) {
          clearInterval(tick); running = false; btn.textContent = "時間到";
          D.toast("口頭匯報時間到。");
        }
      }, 1000);
    });
    el.querySelector("[data-reset]").addEventListener("click", function () {
      clearInterval(tick); running = false; left = total; paint();
      el.querySelector("[data-start]").textContent = "開始";
    });
    D.$$("[data-sec]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        clearInterval(tick); running = false; total = +b.getAttribute("data-sec"); left = total; paint();
        el.querySelector("[data-start]").textContent = "開始";
      });
    });
    D._cleanups.push(function () { if (tick) clearInterval(tick); });
    paint();
  }

  /* ---------- shared pieces ---------- */
  function pageHead(eyebrow, title, lede) {
    return '<div class="page-head"><div class="eyebrow">' + D.esc(eyebrow) + "</div>" +
      '<h1 class="page-title">' + title + "</h1>" +
      '<p class="page-lede">' + lede + "</p></div>";
  }
  function stationCard(s) {
    var t = TRACKS[s.track];
    var done = isDone(s.id);
    var best = bestOf(s.id);
    var meta = s.mode === "quiz"
      ? (s.questions || []).length + " 題"
      : (s.mode === "sba" ? "報告＋口述" : "寫作 · " + (s.targetWords || "—") + " 字");
    return '<a class="station-card ' + (done ? "done" : "") + '" style="--lv:' + t.color + '" href="#/station/' + s.id + '">' +
      '<div class="station-top"><span class="badge l' + s.level + '">Level ' + s.level + "</span>" +
      '<span class="badge">' + D.esc(t.short) + "</span>" +
      (done ? '<span class="badge good">完成</span>' : "") + "</div>" +
      "<h3>" + D.esc(s.title) + "</h3>" +
      "<p>" + D.esc(s.subtitle || s.intro || "") + "</p>" +
      '<div class="tag-row">' + (s.skills || []).map(function (x) { return '<span class="badge ghost">' + D.esc(x) + "</span>"; }).join("") + "</div>" +
      '<div class="station-foot"><span>' + (s.minutes || 20) + " 分鐘 · " + D.esc(meta) + "</span>" +
      '<span class="score">' + (best ? best + "%" : "") + "</span></div>" +
      (done ? '<span class="done-mark">✓</span>' : "") + "</a>";
  }
  function planHTML() {
    return '<div class="plan-grid">' + (META.plan14 || []).map(function (d) {
      var st = d.station ? D.stationById[d.station] : null;
      var done = st ? isDone(st.id) : false;
      var href = st ? "#/station/" + st.id : (d.day === 13 ? "#/errors" : "#/tools");
      return '<a class="plan-day ' + (done ? "done" : "") + (d.station ? "" : " rest") + '" href="' + href + '">' +
        '<span class="day-num">' + d.day + "</span>" +
        '<span class="pd-label"><b>' + D.esc(d.label) + "</b><span>" + D.esc(d.note || "") + "</span></span>" +
        '<span class="pd-status">' + (done ? "✓" : (d.station ? "→" : "·")) + "</span></a>";
    }).join("") + "</div>";
  }
  function emptyState(icon, title, body, action) {
    return '<div class="empty"><div class="ei">' + icon + "</div><b>" + D.esc(title) + "</b><p>" + body + "</p>" + (action || "") + "</div>";
  }
  function levelLabel(n) {
    var l = (META.levels || []).filter(function (x) { return +x.n === +n; })[0];
    return l ? l.name : "Level " + n;
  }

  /* ---------- dashboard ---------- */
  D.views = {};
  D.views.dashboard = function (root) {
    var p = D.progress();
    var lv = D.levelInfo();
    var days = D.daysBetween(D.today(), S.settings.examDate || META.exam.countdownDefault);
    var next = nextStation();
    var band = D.band(p.readiness);
    var st = D.dayStats();
    var missions = [
      { label: "完成 1 個訓練站", target: 1, have: st.stations || 0, href: "#/stations" },
      { label: "做 8 條題目", target: 8, have: st.questions || 0, href: "#/stations" },
      { label: "寫 100 字", target: 100, have: st.writing || 0, href: "#/composition" }
    ];
    var missionHTML = missions.map(function (m) {
      var pct = D.clamp(Math.round((m.have / m.target) * 100), 0, 100);
      var done = m.have >= m.target;
      return '<a class="mission-card ' + (done ? "done" : "") + '" href="' + m.href + '">' +
        '<span class="mission-mark">' + (done ? "✓" : "·") + "</span>" +
        '<span style="flex:1"><b class="small">' + m.label + "</b>" +
        '<span class="bar thin" style="margin-top:5px;display:block"><i class="' + (done ? "good" : "") + '" style="width:' + pct + '%"></i></span></span>' +
        '<span class="tiny faint">' + Math.min(m.have, m.target) + "/" + m.target + "</span></a>";
    }).join("");
    var trackHTML = ["reading", "practical", "composition", "sba"].map(function (k) {
      var t = TRACKS[k], s = p.tracks[k];
      return '<a class="track-card" href="' + t.href + '" style="--track:' + t.color + '">' +
        '<div class="track-top"><div><div class="track-name">' + t.name + '</div><div class="track-sub">' + D.esc(t.desc) + "</div></div>" +
        '<div class="track-weight">' + t.weight + "%</div></div>" +
        "<p>" + D.esc(t.lede) + "</p>" +
        '<div class="bar"><i style="width:' + s.progress + '%"></i></div>' +
        '<div class="track-foot"><span>完成 ' + s.done + "/" + s.total + "</span><span>" + (s.avg ? "平均 " + s.avg + "%" : "未開始") + "</span></div></a>";
    }).join("");
    var quote = (META.quotes && META.quotes.length)
      ? META.quotes[(new Date().getDate() + new Date().getMonth()) % META.quotes.length]
      : null;
    var quoteHTML = quote
      ? '<div class="card" style="margin-top:18px"><div class="card-title-sm">今日一句</div><p style="font-family:var(--font-serif);font-size:18px;line-height:1.8">「' + D.esc(quote.text) + '」</p>' +
        '<p class="small muted" style="margin-top:4px">—— ' + D.esc(quote.source) + "。" + D.esc(quote.meaning || "") + "</p></div>"
      : "";

    root.innerHTML =
      '<section class="hero">' +
      '<div class="hero-stamp">距離<br>DSE<br><b style="font-size:20px;color:#f0c56a">' + Math.max(0, days) + "</b><br>日</div>" +
      '<div class="hero-grid"><div>' +
      '<div class="eyebrow">DSE 中文 · Level 1 → 3</div>' +
      '<h1>中文唔係靠感覺。<br>由 <span class="accent">Level 1</span> 操到 <span class="accent">Level 3</span>。</h1>' +
      "<p>四個戰場：卷一閱讀、卷二實用寫作、卷二命題寫作、SBA 匯報。每一級都有原創題目、範文同答題框架，做完即刻知自己錯喺邊。</p>" +
      '<div class="hero-stats">' +
      '<div class="hero-stat"><b>' + p.done + "</b><span>完成訓練站</span></div>" +
      '<div class="hero-stat"><b>' + lv.level + "</b><span>LV · " + lv.name + "</span></div>" +
      '<div class="hero-stat"><b>' + (S.streak.count || 0) + "</b><span>連續日數</span></div>" +
      '<div class="hero-stat"><b>' + band.label.split(" · ")[0] + "</b><span>" + band.label.split(" · ")[1] + "</span></div>" +
      "</div></div>" +
      '<div class="ring-wrap">' + D.ringSVG(p.readiness, 150) +
      '<div class="ring-label"><b>' + p.readiness + "%</b><span>準備度</span></div></div>" +
      "</div></section>" +
      '<p class="tiny faint" style="margin:0 0 24px">「準備度」係練習完成度（按卷一 40%、實用寫作 13.5%、命題寫作 31.5%、SBA 15% 加權），<b>唔係 DSE 預測等級</b>。</p>' +

      '<div class="callout info" style="margin-bottom:22px"><span class="ci">i</span><div><b>2024 起新制：</b>公開試只剩卷一閱讀（40%）＋卷二寫作（45%），另加 SBA 15%。舊制卷三聆聽、卷四說話已取消；說話能力改為 SBA 口頭匯報。呢個網站按最新制設計，將卷二拆成甲、乙兩部，即係你嘅「四個戰場」。</div></div>' +

      '<div class="section-head"><h2>四個戰場</h2><span class="zh-num">按佔分排</span></div>' +
      '<div class="grid cols-4">' + trackHTML + "</div>" +

      '<div class="section-head"><h2>下一個最好動作</h2><span class="zh-num">唔好諗，開始</span></div>' +
      (next
        ? '<div class="card next-card"><div class="between"><div><div class="card-title-sm">建議下一站</div><h3>' + D.esc(next.title) + "</h3>" +
          '<p class="small muted" style="margin-top:4px">' + D.esc(next.subtitle || next.intro || "") + "</p></div>" +
          '<span class="badge l' + next.level + '">Level ' + next.level + "</span></div>" +
          '<div class="btn-row" style="margin-top:13px"><a class="btn seal" href="#/station/' + next.id + '">開始訓練</a>' +
          '<a class="btn soft" href="#/stations">睇全部 12 站</a></div></div>'
        : '<div class="card"><b>12 個站都完成晒。</b><p class="small muted">做一次計時模擬，然後返去錯題簿收拾最後嘅失分位。</p><div class="btn-row" style="margin-top:10px"><a class="btn seal" href="#/tools">計時模擬</a><a class="btn soft" href="#/errors">錯題簿</a></div></div>') +

      '<div class="section-head"><h2>今日任務</h2><span class="zh-num">做完就收工</span></div>' +
      '<div class="grid cols-3">' + missionHTML + "</div>" +

      '<div class="section-head"><h2>14 日考前路線</h2><span class="zh-num">Level 1 → 3</span></div>' +
      '<div class="card"><div class="between" style="margin-bottom:12px"><p class="small muted">每日一站，Day 13 回顧錯題，Day 14 計時模擬。唔需要跟到足，但<b>要跟次序</b>：先補底，再練題型，最後衝難度。</p><a class="small" href="#/stations">篩選訓練站 →</a></div>' + planHTML() + "</div>" +
      quoteHTML +

      '<div class="section-head"><h2>快速入口</h2></div>' +
      '<div class="grid cols-3">' +
      '<a class="card tight" href="#/reading" style="text-decoration:none;color:inherit"><b>卷一 閱讀</b><p class="small muted">範文＋文白篇章＋題型</p></a>' +
      '<a class="card tight" href="#/fanwen" style="text-decoration:none;color:inherit"><b>範文庫</b><p class="small muted">12 組逐篇註解＋自測</p></a>' +
      '<a class="card tight" href="#/practical" style="text-decoration:none;color:inherit"><b>實用寫作</b><p class="small muted">6 類格式＋語境＋資料整合</p></a>' +
      '<a class="card tight" href="#/composition" style="text-decoration:none;color:inherit"><b>命題寫作</b><p class="small muted">審題、立意、結構、範文</p></a>' +
      '<a class="card tight" href="#/sba" style="text-decoration:none;color:inherit"><b>SBA 匯報</b><p class="small muted">文字報告＋口頭匯報</p></a>' +
      '<a class="card tight" href="#/errors" style="text-decoration:none;color:inherit"><b>錯題簿</b><p class="small muted">自動收集答錯嘅題目</p></a>' +
      '<a class="card tight" href="#/tools" style="text-decoration:none;color:inherit"><b>工具箱</b><p class="small muted">倒數、計時、字數、備份</p></a>' +
      "</div>";
  };

  /* ---------- stations overview ---------- */
  D.ui = { level: 0, track: "all" };
  D.views.stations = function (root) {
    var p = D.progress();
    var lv = D.ui.level || 0;
    var tr = D.ui.track || "all";
    var list = D.stations.filter(function (s) {
      if (lv && +s.level !== +lv) return false;
      if (tr !== "all" && s.track !== tr) return false;
      return true;
    });
    var levelBtns = [[0, "全部"], [1, "Level 1"], [2, "Level 2"], [3, "Level 3"]].map(function (x) {
      return '<button data-lv="' + x[0] + '" class="' + (lv === x[0] ? "active" : "") + '">' + x[1] + "</button>";
    }).join("");
    var trackTabs = [["all", "全部"], ["reading", "卷一閱讀"], ["practical", "實用寫作"], ["composition", "命題寫作"], ["sba", "SBA"]].map(function (x) {
      return '<button class="tab ' + (tr === x[0] ? "active" : "") + '" data-track="' + x[0] + '">' + x[1] + "</button>";
    }).join("");

    root.innerHTML =
      pageHead("Training stations · 12 stops", "12 個訓練站，<br>四個戰場、三個 Level。",
        "由 Level 1 開始，正確率有八成先跳 Level 2；Level 2 穩陣先好挑戰 Level 3。每個站都有即時批改、答案解釋同錯題記錄。") +
      '<div class="card tight" style="margin-bottom:18px"><div class="between">' +
      '<div><span class="small muted">整體完成</span> <b style="margin-left:6px">' + p.done + " / " + p.total + "</b></div>" +
      '<div class="segmented">' + levelBtns + "</div></div>" +
      '<div class="bar" style="margin-top:10px"><i style="width:' + Math.round(p.done / Math.max(1, p.total) * 100) + '%"></i></div></div>' +
      '<div class="tabs">' + trackTabs + "</div>" +
      (list.length ? '<div class="grid cols-3">' + list.map(stationCard).join("") + "</div>"
        : emptyState("◌", "呢個篩選未有訓練站", "試下揀其他 Level 或者份卷。")) +
      '<div class="section-head"><h2>三個 Level 代表咩？</h2><span class="zh-num">唔係 DSE 等級</span></div>' +
      '<div class="grid cols-3">' + (META.levels || []).map(function (l) {
        return '<div class="card"><span class="badge l' + l.n + '">Level ' + l.n + "</span>" +
          '<h3 style="margin-top:8px">' + D.esc(l.name) + "</h3>" +
          '<p class="small muted" style="margin-top:5px">' + D.esc(l.desc) + "</p>" +
          '<p class="small" style="margin-top:8px"><b>' + D.esc(l.target) + "</b></p>" +
          '<div class="tag-row" style="margin-top:8px">' + (l.focus || []).map(function (f) { return '<span class="badge ghost">' + D.esc(f) + "</span>"; }).join("") + "</div></div>";
      }).join("") + "</div>" +
      '<div class="section-head"><h2>唔知由邊度開始？</h2><span class="zh-num">跟路線</span></div>' +
      '<div class="card"><p class="small muted" style="margin-bottom:12px">跟住 14 日路線做，每日一站。做完 Level 1 先好跳 Level 2，唔好一開始就衝 Level 3。</p>' + planHTML() + "</div>" +
      '<div class="callout tip" style="margin-top:18px"><span class="ci">◎</span><div><b>三條規矩：</b>一，計時做；二，錯咗即刻睇解釋；三，口頭／寫作都要交，唔好只做選擇題。</div></div>';

    D.$$("[data-lv]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.ui.level = +b.getAttribute("data-lv");
        D.views.stations(root);
      });
    });
    D.$$("[data-track]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.ui.track = b.getAttribute("data-track");
        D.views.stations(root);
      });
    });
  };

  /* ---------- track pages ---------- */
  function prescribedHTML() {
    var list = META.prescribed || [];
    if (!list.length) return emptyState("◌", "範文資料載入中", "重新整理一次，或者先做閱讀訓練站。");
    return '<div class="ref-grid">' + list.map(function (x) {
      return '<details class="ref-card"><summary><span class="rc-main"><b>' + D.esc(x.title) + "</b><span>" +
        D.esc((x.author || "") + (x.genre ? " · " + x.genre : "") + (x.era ? " · " + x.era : "")) +
        '</span></span><span class="rc-plus">＋</span></summary><div class="ref-body">' +
        "<p>" + D.esc(x.summary || "") + "</p>" +
        ((x.keyPoints || []).length ? '<h5>考核重點</h5><ul>' + x.keyPoints.map(function (k) { return "<li>" + D.esc(k) + "</li>"; }).join("") + "</ul>" : "") +
        ((x.quotes || []).length ? '<h5>名句</h5>' + x.quotes.map(function (q) { return '<div class="quote-mark">「' + D.esc(q) + "」</div>"; }).join("") : "") +
        ((x.traps || []).length ? '<h5>常見陷阱</h5><ul>' + x.traps.map(function (t) { return "<li>" + D.esc(t) + "</li>"; }).join("") + "</ul>" : "") +
        '<a class="small" href="#/fanwen/' + D.esc(x.id) + '" style="display:inline-block;margin-top:8px">逐篇註解、句譯、DSE 題型 →</a>' +
        "</div></details>";
    }).join("") + "</div>";
  }
  function formatsHTML() {
    var list = META.formats || [];
    if (!list.length) return emptyState("◌", "格式庫載入中", "先做實用寫作訓練站。");
    return '<div class="grid cols-2">' + list.map(function (f) {
      return '<div class="format-card"><div class="card-title-sm">' + D.esc(f.when || "實用文") + "</div><h3>" + D.esc(f.name) + "</h3>" +
        '<div class="structure">' + (f.structure || []).map(function (s) { return "<span>" + D.esc(s) + "</span>"; }).join("") + "</div>" +
        (f.tone ? '<p class="small muted">語氣：' + D.esc(f.tone) + "</p>" : "") +
        (f.sampleOpening ? '<p class="small" style="margin-top:6px;font-family:var(--font-serif)">' + D.esc(f.sampleOpening) + "</p>" : "") +
        ((f.pitfalls || []).length ? '<p class="pitfall">易錯：' + f.pitfalls.map(D.esc).join("；") + "</p>" : "") +
        "</div>";
    }).join("") + "</div>";
  }
  function frameworksHTML() {
    var list = META.frameworks || [];
    if (!list.length) return emptyState("◌", "框架庫載入中", "先做命題寫作訓練站。");
    return '<div class="grid cols-2">' + list.map(function (f) {
      return '<div class="format-card"><div class="card-title-sm">' + D.esc(f.use || "寫作框架") + "</div><h3>" + D.esc(f.name) + "</h3>" +
        '<ul class="structure-list" style="margin-top:8px">' + (f.structure || []).map(function (s, i) {
          return '<li><span class="sn">' + (i + 1) + '</span><span class="st"><b>' + D.esc(s.part) + "</b><span>" + D.esc(s.note) + "</span></span></li>";
        }).join("") + "</ul>" +
        ((f.tips || []).length ? '<p class="small muted" style="margin-top:8px">' + f.tips.map(D.esc).join(" · ") + "</p>" : "") +
        "</div>";
    }).join("") + "</div>";
  }
  function sbaGuideHTML() {
    var g = SBA.guide || {};
    var sections = [
      ["SBA 是什麼", g.what],
      ["準備時間線", (g.timeline || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("")],
      ["文字報告技巧", (g.reportTips || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("")],
      ["口頭匯報技巧", (g.oralTips || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("")],
      ["常見失分位", (g.pitfalls || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("")]
    ];
    return '<div class="grid cols-2">' + sections.map(function (s, i) {
      var body = s[1] || "";
      if (s[0] !== "SBA 是什麼" && body) body = '<ul class="plain-list" style="margin-top:6px">' + body + "</ul>";
      return '<div class="card"><div class="card-title-sm">0' + (i + 1) + "</div><h3>" + s[0] + "</h3><div class=\"small muted\" style=\"margin-top:6px;line-height:1.9\">" + body + "</div></div>";
    }).join("") + "</div>";
  }
  D.views.track = function (root, track) {
    var t = TRACKS[track];
    var st = D.progress().tracks[track];
    var sets = D.stations.filter(function (s) { return s.track === track; });
    var extra = "";
    if (track === "reading") {
      extra = '<div class="section-head"><h2>閱讀四招</h2><span class="zh-num">答題框架</span></div>' +
        '<div class="grid cols-4">' +
        '<div class="card"><div class="card-title-sm">01 · 詞義題</div><b>唔好靠今義</b><p class="small muted" style="margin-top:4px">回到原句，看前後文和詞性；把候選解釋放回句子讀一次，通唔通順。</p></div>' +
        '<div class="card"><div class="card-title-sm">02 · 段意 / 主旨</div><b>看首尾與轉折</b><p class="small muted" style="margin-top:4px">留意首句、尾句、「然而」「其實」等轉折詞；主旨要包括事件＋體會，不可只抄情節。</p></div>' +
        '<div class="card"><div class="card-title-sm">03 · 手法作用</div><b>手法＋內容＋效果</b><p class="small muted" style="margin-top:4px">不要只寫「用了比喻」；要講明比喻了什麼、突出什麼感情或人物形象。</p></div>' +
        '<div class="card"><div class="card-title-sm">04 · 比較題</div><b>逐點對照</b><p class="small muted" style="margin-top:4px">每一段都同時講甲、乙，用「相同／不同」的比較詞；不要先講完一篇再講另一篇。</p></div>' +
        "</div>" +
        '<div class="card next-card" style="margin-top:18px"><div class="between"><div><div class="card-title-sm">進階</div><h3>範文庫：12 組逐篇詳解</h3><p class="small muted">背景、段意、字詞註解、句譯、手法、主旨、跨篇比較、DSE 題型與自測。</p></div><a class="btn seal" href="#/fanwen">入範文庫</a></div></div>' +
        '<div class="section-head"><h2>12 組指定文言範文</h2><span class="zh-num">甲部 30%</span></div>' +
        '<p class="small muted" style="margin:-6px 0 12px">「十二篇」其實有 16 篇：唐詩三首、詞三首各計三篇。點開睇快速重點；逐篇深入註解請入範文庫。以考評局最新公布為準。</p>' + prescribedHTML();
    } else if (track === "practical") {
      extra = '<div class="section-head"><h2>6 類實用文格式</h2><span class="zh-num">先背骨架</span></div>' + formatsHTML();
    } else if (track === "composition") {
      extra = '<div class="section-head"><h2>4 個寫作框架</h2><span class="zh-num">唔好靠靈感</span></div>' + frameworksHTML();
    } else if (track === "sba") {
      extra = '<div class="section-head"><h2>SBA 攻略</h2><span class="zh-num">15% 可控分</span></div>' + sbaGuideHTML();
    }
    root.innerHTML =
      pageHead("Battlefield · " + t.weight + "%", t.name, t.lede) +
      '<div class="card" style="margin-bottom:18px"><div class="between"><div><div class="card-title-sm">考試格式</div><p class="small">' + D.esc(t.desc) + "</p></div>" +
      '<div style="text-align:right;min-width:110px"><div class="track-weight" style="color:' + t.color + ';font-size:30px">' + t.weight + '%</div><div class="tiny faint">全科比重</div></div></div>' +
      '<div class="bar" style="margin-top:12px"><i style="width:' + Math.round(st.done / Math.max(1, st.total) * 100) + '%"></i></div>' +
      '<div class="between" style="margin-top:6px"><span class="tiny faint">完成 ' + st.done + "/" + st.total + "</span><span class=\"tiny faint\">" + (st.avg ? "平均 " + st.avg + "%" : "未開始") + "</span></div></div>" +
      '<div class="section-head"><h2>三級訓練</h2><span class="zh-num">Level 1 → 3</span></div>' +
      '<div class="grid cols-3">' + sets.map(stationCard).join("") + "</div>" +
      '<div class="callout warn" style="margin-top:16px"><span class="ci">!</span><div><b>唔好跳級：</b>每份卷都由 Level 1 開始。做完、睇完解釋、錯題改正，先好去下一個 Level。</div></div>' +
      extra;
  };

  /* ---------- fanwen library ---------- */
  function fanwenList() {
    return D.fanwen.length ? D.fanwen : (META.prescribed || []);
  }
  function eraClass(era) {
    if (!era) return "";
    if (/先秦/.test(era)) return "preqin";
    if (/漢|三國/.test(era)) return "han";
    if (/唐/.test(era)) return "tang";
    if (/宋/.test(era)) return "song";
    return "";
  }
  function fanwenCard(t) {
    var done = fanwenDone(t.id);
    var best = fanwenBest(t.id);
    var nGloss = (t.glossary || []).length;
    var nDse = (t.dse || []).length;
    var cardTitle = (t.id === "tangshi" || t.id === "cisan") ? (t.shortTitle || t.title) : (t.title || t.shortTitle);
    return '<a class="fanwen-card ' + eraClass(t.era) + '" href="#/fanwen/' + D.esc(t.id) + '">' +
      '<div class="fanwen-card-top"><span class="badge ' + eraClass(t.era) + '">' + D.esc(t.era || "指定篇章") + "</span>" +
      '<span class="badge">' + D.esc(t.genre || "文言") + "</span>" +
      (done ? '<span class="badge good">已自測</span>' : "") + "</div>" +
      "<h3>" + D.esc(cardTitle) + "</h3>" +
      '<div class="fanwen-author">' + D.esc(t.author || "") + "</div>" +
      "<p>" + D.esc((t.overview || t.summary || "").slice(0, 105)) + (String(t.overview || t.summary || "").length > 105 ? "……" : "") + "</p>" +
      '<div class="tag-row">' + (nGloss ? '<span class="badge ghost">' + nGloss + " 條字詞</span>" : "") +
      (nDse ? '<span class="badge ghost">' + nDse + " 題 DSE</span>" : "") +
      ((t.quiz || []).length ? '<span class="badge ghost">' + (t.quiz || []).length + " 題自測</span>" : "") + "</div>" +
      '<div class="fanwen-card-foot"><span>逐篇註解 · 句譯 · 手法</span><span class="score">' + (best ? best + "%" : "→") + "</span></div></a>";
  }
  D.views.fanwen = function (root) {
    ensureFanwenState();
    var list = fanwenList();
    var done = S.fanwen.done.length;
    var total = list.length || 12;
    root.innerHTML =
      pageHead("卷一甲部 · 12 組指定文言", "範文庫", "逐篇拆開：背景、段意、字詞、句譯、手法、主旨、跨篇比較、DSE 題型與即時自測。唔好只背譯文，要練到「點解這樣寫」。") +
      '<div class="card" style="margin-bottom:18px"><div class="between"><div><span class="small muted">範文自測完成</span> <b style="margin-left:6px">' + done + " / " + total + "</b></div>" +
      '<span class="badge">12 組 · 16 篇</span></div><div class="bar" style="margin-top:10px"><i style="width:' + Math.round(done / Math.max(1, total) * 100) + '%"></i></div>' +
      '<div class="grid cols-3" style="margin-top:14px"><div class="stat-box"><b>12</b><span>指定篇章組</span></div><div class="stat-box"><b>16</b><span>實際篇目</span></div><div class="stat-box"><b>' + done + "</b><span>已完成自測</span></div></div>" +
      '<p class="tiny faint" style="margin-top:10px">範文自測進度獨立計算，唔影響四卷「準備度」。</p></div>' +
      '<div class="callout tip" style="margin-bottom:18px"><span class="ci">◎</span><div><b>點用：</b>先睇「段意結構」建立框架，再用「字詞註解」和「句譯」逐句扣實，之後睇「手法 / 主旨 / 比較」，最後做「DSE 題型」與自測。每一篇都應該由頭到尾走一次。</div></div>' +
      '<div class="grid cols-2">' + list.map(fanwenCard).join("") + "</div>" +
      '<div class="section-head"><h2>範文溫習次序</h2><span class="zh-num">先厚後薄</span></div>' +
      '<div class="grid cols-4">' +
      '<div class="card"><div class="card-title-sm">01</div><b>先建框架</b><p class="small muted">段意、結構、主旨。唔好一開始就逐個字背。</p></div>' +
      '<div class="card"><div class="card-title-sm">02</div><b>再扣字詞</b><p class="small muted">古今異義、通假、詞類活用，全部放回原句記。</p></div>' +
      '<div class="card"><div class="card-title-sm">03</div><b>練手法與比較</b><p class="small muted">每一種手法都要講到「例子＋效果」，比較要逐點對照。</p></div>' +
      '<div class="card"><div class="card-title-sm">04</div><b>最後計時答題</b><p class="small muted">用 DSE 題型練答題框架，再自測；錯題入錯題簿。</p></div>' +
      "</div>";
  };
  function fwSection(id, kicker, title, body) {
    return '<section class="fw-section" id="' + id + '"><div class="section-head"><h2>' + title + '</h2><span class="zh-num">' + kicker + "</span></div>" + body + "</section>";
  }
  function fwNav() {
    var items = [
      ["fw-overview", "概覽"], ["fw-structure", "段意"], ["fw-glossary", "字詞"],
      ["fw-trans", "句譯"], ["fw-techniques", "手法"], ["fw-themes", "主旨"],
      ["fw-compare", "比較"], ["fw-dse", "DSE 題型"], ["fw-quiz", "自測"],
      ["fw-quotes", "金句／陷阱"]
    ];
    return '<div class="fw-nav" id="fwNav">' + items.map(function (x) {
      return '<button type="button" data-fw-scroll="' + x[0] + '">' + x[1] + "</button>";
    }).join("") + "</div>";
  }
  function renderFanwenQuiz(root, text) {
    var qs = text.quiz || [];
    if (!qs.length) {
      root.innerHTML = '<p class="small muted">這篇暫未加入自測題。</p>';
      return;
    }
    var answers = {}, submitted = false;
    var objectiveCount = qs.filter(function (q) { return q.type !== "open"; }).length;
    root.innerHTML = '<div class="between"><div><div class="card-title-sm">範文自測</div><p class="small muted">先自己答，再交卷。客觀題自動批改，長答會顯示得分點與範答。</p></div>' +
      '<span class="badge">' + qs.length + " 題 · " + objectiveCount + " 題自動計分</span></div>" +
      '<div class="q-list" style="margin-top:10px">' + qs.map(function (q, i) { return qHTML(q, i, "fq"); }).join("") + "</div>" +
      '<button class="btn seal block" id="fwSubmit" style="margin-top:14px">交卷</button><div id="fwResult"></div>';
    D.$$("[data-fq]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (submitted) return;
        var qi = +btn.getAttribute("data-fq"), oi = +btn.getAttribute("data-o");
        answers[qi] = oi;
        D.$$('[data-fq="' + qi + '"]', root).forEach(function (b) { b.classList.remove("sel"); });
        btn.classList.add("sel");
      });
    });
    D.$("#fwSubmit", root).addEventListener("click", function () {
      if (submitted) return;
      submitted = true;
      var score = 0, total = 0;
      qs.forEach(function (q, i) {
        var fb = D.$("#fqfb" + i, root);
        if (q.type === "open") {
          var ta = D.$$('[data-fqinput="' + i + '"]', root)[0];
          if (ta) ta.disabled = true;
          fb.hidden = false;
          fb.style.borderLeftColor = "var(--gold)";
          fb.innerHTML = '<div class="fb-title">參考答案 / 得分點</div><ul class="points-list">' +
            (q.points || []).map(function (p) { return "<li>" + D.esc(p) + "</li>"; }).join("") +
            '</ul><div class="model-box"><b>範答：</b>' + D.esc(q.model || "") + '</div><div class="why">' + D.esc(q.why || "") + "</div>";
          return;
        }
        total++;
        var your = "", ok = false;
        if (q.type === "mc" || q.type === "tfng") {
          ok = answers[i] === q.a;
          your = (q.options || [])[answers[i]] || "（未答）";
          D.$$('[data-fq="' + i + '"]', root).forEach(function (b) {
            var oi = +b.getAttribute("data-o");
            b.disabled = true;
            if (oi === q.a) b.classList.add("correct");
            if (oi === answers[i] && !ok) b.classList.add("wrong");
          });
        } else {
          var inp = D.$$('[data-fqinput="' + i + '"]', root)[0];
          your = inp ? inp.value : "";
          ok = D.matchAnswer(q, your);
          if (inp) {
            inp.disabled = true;
            inp.style.borderBottomColor = ok ? "var(--good)" : "var(--bad)";
            inp.style.color = ok ? "var(--good)" : "var(--bad)";
          }
        }
        if (ok) score++;
        else addError({ id: "fanwen:" + text.id, title: "範文 · " + (text.shortTitle || text.title) }, q.q, your || "（未答）", q.type === "mc" || q.type === "tfng" ? (q.options || [])[q.a] : q.a, q.why);
        fb.hidden = false;
        fb.className = "feedback " + (ok ? "" : "bad");
        fb.innerHTML = '<div class="fb-title">' + (ok ? "✓ 正確" : "✗ 唔啱") + "</div>答案：" +
          D.esc(q.type === "mc" || q.type === "tfng" ? (q.options || [])[q.a] : q.a) +
          '<div class="why">' + D.esc(q.why || "") + "</div>";
      });
      var pct = total ? Math.round(score / total * 100) : 0;
      var first = recordFanwen(text.id, pct);
      D.award(first ? 25 : 5, "reading", qs.length);
      renderNav("fanwen");
      var db = D.$("#fwDoneBadge");
      if (db) { db.textContent = "已自測"; db.className = "badge good"; }
      var bb = D.$("#fwBestBadge");
      if (bb) { bb.hidden = false; bb.textContent = "最佳 " + Math.max(fanwenBest(text.id), pct) + "%"; }
      var advice = pct >= 80 ? "這篇範文已經穩，可以練跨篇比較。" : pct >= 60 ? "基本掌握，逐題睇返解釋，補回未穩的段意。" : "未夠穩。返去段意、字詞、句譯再走一次，然後重做。";
      D.$("#fwResult", root).innerHTML = resultCard("範文自測 · " + (text.shortTitle || text.title), score, total, pct, advice,
        '<a class="btn soft" href="#/fanwen">返去範文庫</a><a class="btn seal" href="#/errors">寫入錯題簿</a>' +
        '<button class="btn soft" id="fwRetry" type="button">再做一次</button>');
      D.$("#fwRetry", root).addEventListener("click", function () { renderFanwenQuiz(root, text); });
      D.$("#fwResult").scrollIntoView({ behavior: "smooth", block: "start" });
      D.toast("範文自測完成 +" + (first ? 25 : 5) + " XP");
    });
  }
  D.views.fanwenText = function (root, id) {
    var t = D.fanwenById[id];
    if (!t) {
      root.innerHTML = emptyState("◌", "搵唔到這篇範文", '<a href="#/fanwen">返去範文庫</a>');
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    var best = fanwenBest(id), done = fanwenDone(id);
    var fullTitle = (t.title && t.title !== t.shortTitle && t.title !== "《" + t.shortTitle + "》") ? t.title : "";
    var glossHTML = (t.glossary || []).map(function (g) {
      return '<div class="gloss-item" data-gloss="' + D.esc(((g.term || "") + " " + (g.sentence || "") + " " + (g.gloss || "") + " " + (g.note || "")).toLowerCase()) + '">' +
        '<div class="gloss-head"><span class="gloss-term">' + D.esc(g.term) + "</span>" +
        (g.exam ? '<span class="badge ghost">' + D.esc(g.exam) + "</span>" : "") + "</div>" +
        (g.sentence ? '<div class="gloss-sentence">「' + D.esc(g.sentence) + "」</div>" : "") +
        '<div class="gloss-gloss">' + D.esc(g.gloss) + "</div>" +
        (g.note ? '<div class="gloss-note">' + D.esc(g.note) + "</div>" : "") + "</div>";
    }).join("");
    var structureHTML = (t.structure || []).map(function (s) {
      return '<div class="fw-structure-row"><div class="fs-part"><b>' + D.esc(s.part) + "</b>" + (s.range ? "<span>" + D.esc(s.range) + "</span>" : "") + "</div>" +
        '<div class="fs-body"><p>' + D.esc(s.gist) + "</p><div class=\"fs-meta\">" +
        (s.role ? "<span><b>作用：</b>" + D.esc(s.role) + "</span>" : "") +
        (s.exam ? '<span class="badge ghost">' + D.esc(s.exam) + "</span>" : "") + "</div></div></div>";
    }).join("");
    var transHTML = (t.translations || []).map(function (x) {
      return '<div class="trans-item"><div class="trans-original">' + D.esc(x.original) + "</div>" +
        '<div class="trans-plain">' + D.esc(x.plain) + "</div>" +
        (x.note ? '<div class="trans-note">' + D.esc(x.note) + "</div>" : "") + "</div>";
    }).join("");
    var techHTML = (t.techniques || []).map(function (x) {
      return '<div class="card tech-card"><div class="between"><b>' + D.esc(x.name) + "</b>" + (x.exam ? '<span class="badge ghost">' + D.esc(x.exam) + "</span>" : "") + "</div>" +
        '<div class="tech-example">' + D.esc(x.example) + "</div>" +
        '<p class="small muted">' + D.esc(x.effect) + "</p></div>";
    }).join("");
    var themesHTML = (t.themes || []).map(function (x) {
      return '<div class="card theme-card"><h3>' + D.esc(x.title) + "</h3><p class=\"small\">" + D.esc(x.detail) + "</p>" +
        ((x.evidence || []).length ? '<ul class="plain-list small" style="margin-top:6px">' + x.evidence.map(function (e) { return "<li>" + D.esc(e) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
    }).join("");
    var figuresHTML = (t.figures || []).length ? '<div class="grid cols-2">' + t.figures.map(function (f) {
      return '<div class="card"><h3>' + D.esc(f.name) + "</h3><ul class=\"plain-list small\" style=\"margin-top:6px\">" + (f.points || []).map(function (p) { return "<li>" + D.esc(p) + "</li>"; }).join("") + "</ul></div>";
    }).join("") + "</div>" : "";
    var compareHTML = (t.comparisons || []).map(function (c) {
      return '<div class="card compare-card"><div class="between"><b>與 ' + D.esc(c.with) + " 比較</b><span class=\"badge ghost\">" + D.esc(c.angle) + "</span></div>" +
        '<div class="compare-row"><span>相同</span><p>' + D.esc(c.similarity) + "</p></div>" +
        '<div class="compare-row"><span>不同</span><p>' + D.esc(c.difference) + "</p></div></div>";
    }).join("");
    var dseHTML = (t.dse || []).map(function (q, i) {
      return '<div class="dse-card"><div class="dse-top"><span class="badge seal">' + D.esc(q.type) + '</span><span class="tiny faint">DSE 題型 ' + (i + 1) + "</span></div>" +
        '<div class="dse-q">' + D.esc(q.q) + "</div>" +
        '<details class="acc"><summary>答題框架 + 範答</summary><div class="acc-body">' +
        '<div class="card-title-sm" style="margin-top:8px">得分點</div><ul class="points-list">' + (q.points || []).map(function (p) { return "<li>" + D.esc(p) + "</li>"; }).join("") + "</ul>" +
        '<div class="model-box" style="margin-top:10px"><b>範答：</b>' + D.esc(q.model) + "</div>" +
        (q.trap ? '<p class="tiny" style="color:var(--bad);margin-top:7px">陷阱：' + D.esc(q.trap) + "</p>" : "") +
        "</div></details></div>";
    }).join("");
    var quotesHTML = (t.quotes || []).map(function (q) {
      return '<div class="quote-item"><div class="quote-text">「' + D.esc(q.text) + '」</div><div class="quote-use">' + D.esc(q.use) + "</div></div>";
    }).join("");
    var trapsHTML = (t.traps || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("");

    root.innerHTML =
      '<div class="between" style="margin-bottom:12px"><a class="small" href="#/fanwen">← 返去範文庫</a><div class="row tight"><span class="badge">' + D.esc(t.era || "") + "</span><span class=\"badge\">" + D.esc(t.genre || "") + "</span></div></div>" +
      '<div class="fanwen-head"><div class="eyebrow">卷一甲部 · 指定文言</div><h1 class="fanwen-title">' + D.esc(t.shortTitle || t.title) + "</h1>" +
      (fullTitle ? '<div class="fanwen-fulltitle">' + D.esc(fullTitle) + "</div>" : "") +
      '<div class="fanwen-meta">' + D.esc(t.author || "") + (t.era ? " · " + D.esc(t.era) : "") + (t.genre ? " · " + D.esc(t.genre) : "") + "</div>" +
      (t.examNote ? '<div class="callout warn" style="margin-top:12px"><span class="ci">!</span><div><b>DSE 點考：</b>' + D.esc(t.examNote) + "</div></div>" : "") +
      '<div class="row" style="margin-top:10px"><span class="badge ' + (done ? "good" : "") + '" id="fwDoneBadge">' + (done ? "已自測" : "未自測") + "</span>" +
      '<span class="badge" id="fwBestBadge"' + (best ? "" : " hidden") + '>最佳 ' + best + "%</span>" +
      '<a class="small" href="#/fanwen">全部 12 組 →</a></div></div>' +
      fwNav() +
      fwSection("fw-overview", "01 · 概覽", "篇章檔案", '<div class="card"><p class="fw-overview">' + D.esc(t.overview || "") + "</p>" +
        '<div class="fw-facts"><div><span>作者</span><b>' + D.esc(t.author || "—") + "</b></div><div><span>體裁</span><b>" + D.esc(t.genre || "—") + "</b></div><div><span>年代</span><b>" + D.esc(t.era || "—") + "</b></div><div><span>卷別</span><b>卷一甲部</b></div></div>" +
        '<div class="card-title-sm" style="margin-top:16px">背景與讀法</div><ul class="plain-list small">' + (t.background || []).map(function (b) { return "<li>" + D.esc(b) + "</li>"; }).join("") + "</ul></div>") +
      fwSection("fw-structure", "02 · 段意", "段意結構", '<div class="fw-structure">' + structureHTML + "</div>") +
      fwSection("fw-glossary", "03 · 字詞", "重點字詞註解", '<div class="card tight" style="margin-bottom:10px"><input class="input" id="glossSearch" placeholder="搜尋字詞、句子或解釋……" autocomplete="off"></div><div class="gloss-grid" id="glossGrid">' + glossHTML + "</div>") +
      fwSection("fw-trans", "04 · 句譯", "關鍵句語譯", '<div class="trans-list">' + transHTML + "</div>") +
      fwSection("fw-techniques", "05 · 手法", "寫作手法與效果", '<div class="grid cols-2">' + techHTML + "</div>") +
      fwSection("fw-themes", "06 · 主旨", "主旨與思想", '<div class="grid cols-2">' + themesHTML + "</div>" + (figuresHTML ? '<div class="card-title-sm" style="margin-top:18px">人物分析</div>' + figuresHTML : "")) +
      fwSection("fw-compare", "07 · 比較", "跨篇比較", '<div class="grid cols-2">' + compareHTML + "</div>") +
      fwSection("fw-dse", "08 · 實戰", "DSE 題型與答題框架", '<div class="callout tip" style="margin-bottom:12px"><span class="ci">◎</span><div>先自己寫答題大綱，再打開「答題框架 + 範答」。不要一開始就背範答。</div></div><div class="dse-list">' + dseHTML + "</div>") +
      fwSection("fw-quotes", "09 · 金句", "金句與陷阱", '<div class="grid cols-2"><div class="card"><div class="card-title-sm">可引用金句</div>' + quotesHTML + '</div><div class="card"><div class="card-title-sm">常見陷阱</div><ul class="plain-list small">' + trapsHTML + "</ul></div></div>") +
      fwSection("fw-quiz", "10 · 自測", "範文自測", '<div class="card" id="fwQuizBody"></div>');

    D.$$("[data-fw-scroll]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var el = document.getElementById(b.getAttribute("data-fw-scroll"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    var gs = D.$("#glossSearch", root);
    if (gs) {
      gs.addEventListener("input", function () {
        var q = gs.value.toLowerCase().trim();
        D.$$("#glossGrid .gloss-item", root).forEach(function (item) {
          item.style.display = !q || (item.getAttribute("data-gloss") || "").indexOf(q) !== -1 ? "" : "none";
        });
      });
    }
    renderFanwenQuiz(D.$("#fwQuizBody", root), t);
  };

  /* ---------- station: common ---------- */
  function backHref(track) { return TRACKS[track].href; }
  function stationHeader(set) {
    var t = TRACKS[set.track];
    return '<div class="between" style="margin-bottom:10px"><a class="small" href="' + backHref(set.track) + '">← ' + D.esc(t.name) + "</a>" +
      '<div class="row tight"><span class="badge l' + set.level + '">Level ' + set.level + "</span>" +
      '<span class="badge">' + D.esc(t.short) + "</span></div></div>" +
      '<div class="exam-bar"><span class="badge seal">' + D.esc(t.short) + '</span><span class="small muted">' + D.esc(set.title) + '</span><span class="grow"></span><span id="examTimer"></span></div>' +
      '<div class="callout tip" style="margin-bottom:16px"><span class="ci">◎</span><div><b>點做：</b>' + D.esc(set.intro || set.subtitle || "") + "</div></div>";
  }
  function typeLabel(t) {
    return ({ mc: "多項選擇", tfng: "判斷", short: "短答", fill: "填充", open: "長答 / 語譯" })[t] || "題目";
  }
  function qHTML(q, i, prefix) {
    var p = prefix || "q";
    var h = '<div class="q-block"><div class="q-num">第 ' + (i + 1) + " 題 · " + typeLabel(q.type) + "</div>" +
      '<div class="q-text">' + D.blankQ(q.q) + "</div>";
    if (q.type === "mc" || q.type === "tfng") {
      h += '<div class="options">' + (q.options || []).map(function (o, oi) {
        return '<button class="opt" type="button" data-' + p + '="' + i + '" data-o="' + oi + '"><span class="key">' + "ABCD"[oi] + "</span><span>" + D.esc(o) + "</span></button>";
      }).join("") + "</div>";
    } else if (q.type === "open") {
      h += '<div class="open-box"><textarea class="textarea" data-' + p + 'input="' + i + '" placeholder="用自己嘅文字作答……" style="min-height:100px"></textarea></div>';
    } else {
      h += '<input class="answer-line" data-' + p + 'input="' + i + '" placeholder="你的答案" autocomplete="off">';
    }
    h += '<div class="feedback" id="' + p + 'fb' + i + '" hidden></div></div>';
    return h;
  }
  function gradeWarmup(set, answers, root) {
    var ws = set.warmup || [], score = 0;
    ws.forEach(function (q, i) {
      var ok = answers[i] === q.a;
      if (ok) score++;
      var fb = D.$("#wfb" + i, root);
      if (fb) {
        fb.hidden = false;
        fb.className = "feedback " + (ok ? "" : "bad");
        fb.innerHTML = "<div class=\"fb-title\">" + (ok ? "✓ 正確" : "✗ 唔啱") + "</div>答案：" +
          D.esc((q.options || [])[q.a]) + '<div class="why">' + D.esc(q.why || "") + "</div>";
      }
      D.$$('[data-wq="' + i + '"]', root).forEach(function (b) {
        var oi = +b.getAttribute("data-o");
        b.disabled = true;
        if (oi === q.a) b.classList.add("correct");
        if (oi === answers[i] && !ok) b.classList.add("wrong");
      });
      if (!ok) addError(set, q.q, (q.options || [])[answers[i]] || "（未答）", (q.options || [])[q.a], q.why);
    });
    return { score: score, total: ws.length, pct: ws.length ? Math.round(score / ws.length * 100) : 0 };
  }
  function resultCard(title, score, total, pct, advice, links) {
    return '<div class="card center" style="margin-top:18px"><div class="eyebrow" style="justify-content:center">' + D.esc(title) + "</div>" +
      '<div style="font-family:var(--font-serif);font-size:56px;line-height:1.1">' + score + '<span class="muted" style="font-size:22px"> / ' + total + "</span></div>" +
      '<p class="muted" style="margin-top:4px">正確率 ' + pct + "%</p>" +
      '<p class="small" style="max-width:52ch;margin:8px auto 0">' + D.esc(advice) + "</p>" +
      '<div class="btn-row" style="justify-content:center;margin-top:16px">' + (links || "") + "</div></div>";
  }

  /* ---------- station: quiz ---------- */
  function renderQuiz(root, set) {
    var qs = set.questions || [];
    var objective = qs.filter(function (q) { return q.type !== "open"; });
    var answers = {};
    var submitted = false;
    var passage = '<div class="text-label"><span class="badge">' + D.esc(set.textLabel || "篇章") + '</span><span class="tiny faint">原創／公有領域材料</span></div>' +
      '<div class="text-scroll passage">' + D.passage(set.text || "") + "</div>";
    if (set.text2 && String(set.text2).trim()) {
      passage += '<div class="text-label" style="margin-top:18px"><span class="badge">' + D.esc(set.text2Label || "篇章二") + "</span></div>" +
        '<div class="text-scroll passage">' + D.passage(set.text2) + "</div>";
    }
    root.innerHTML = stationHeader(set) +
      '<div class="reading-grid"><div class="card text-panel">' + passage + "</div>" +
      '<div class="card"><div class="between"><div class="card-title-sm">Questions</div><span class="tiny faint">' + objective.length + " 題自動計分</span></div>" +
      '<div class="q-list">' + qs.map(function (q, i) { return qHTML(q, i, "q"); }).join("") + "</div>" +
      '<button class="btn seal block" id="submitQuiz" style="margin-top:14px">交卷</button>' +
      '<p class="tiny faint center" style="margin-top:7px">未答嘅客觀題會當錯；長答題會顯示參考答案同得分點，自己對。</p></div></div>' +
      '<div id="quizResult"></div>';
    mountExamTimer(D.$("#examTimer", root), (set.minutes || 20) * 60, "作答時間");

    D.$$("[data-q]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (submitted) return;
        var qi = +btn.getAttribute("data-q"), oi = +btn.getAttribute("data-o");
        answers[qi] = oi;
        D.$$('[data-q="' + qi + '"]', root).forEach(function (b) { b.classList.remove("sel"); });
        btn.classList.add("sel");
      });
    });

    D.$("#submitQuiz", root).addEventListener("click", function () {
      if (submitted) return;
      submitted = true;
      var score = 0, total = 0;
      qs.forEach(function (q, i) {
        var fb = D.$("#qfb" + i, root);
        if (q.type === "open") {
          var ta = D.$$('[data-qinput="' + i + '"]', root)[0];
          if (ta) ta.disabled = true;
          fb.hidden = false;
          fb.style.borderLeftColor = "var(--gold)";
          fb.innerHTML = '<div class="fb-title">參考答案 / 得分點</div>' +
            '<ul class="points-list">' + (q.points || []).map(function (p) { return "<li>" + D.esc(p) + "</li>"; }).join("") + "</ul>" +
            '<div class="model-box"><b>參考答案：</b>' + D.esc(q.model || "") + "</div>" +
            '<div class="why">' + D.esc(q.why || "") + "</div>";
          return;
        }
        total++;
        var your = "", ok = false;
        if (q.type === "mc" || q.type === "tfng") {
          ok = answers[i] === q.a;
          your = (q.options || [])[answers[i]] || "（未答）";
          D.$$('[data-q="' + i + '"]', root).forEach(function (b) {
            var oi = +b.getAttribute("data-o");
            b.disabled = true;
            if (oi === q.a) b.classList.add("correct");
            if (oi === answers[i] && !ok) b.classList.add("wrong");
          });
        } else {
          var inp = D.$$('[data-qinput="' + i + '"]', root)[0];
          your = inp ? inp.value : "";
          ok = D.matchAnswer(q, your);
          if (inp) {
            inp.disabled = true;
            inp.style.borderBottomColor = ok ? "var(--good)" : "var(--bad)";
            inp.style.color = ok ? "var(--good)" : "var(--bad)";
          }
        }
        if (ok) score++;
        else addError(set, q.q, your || "（未答）", q.type === "mc" || q.type === "tfng" ? (q.options || [])[q.a] : q.a, q.why);
        fb.hidden = false;
        fb.className = "feedback " + (ok ? "" : "bad");
        fb.innerHTML = '<div class="fb-title">' + (ok ? "✓ 正確" : "✗ 唔啱") + "</div>答案：" +
          D.esc(q.type === "mc" || q.type === "tfng" ? (q.options || [])[q.a] : q.a) +
          '<div class="why">' + D.esc(q.why || "") + "</div>";
      });
      var pct = total ? Math.round(score / total * 100) : 0;
      var first = recordResult(set.id, pct);
      D.award(first ? (set.xp || 30) : 5, "questions", qs.length);
      D.save();
      var advice = pct >= 80 ? "呢個 Level 穩陣，可以試高一級。" :
        pct >= 60 ? "站穩陣，但要逐題睇返解釋，將錯因分類。" :
        "未夠穩。返去篇章再讀一次，然後重做。";
      D.$("#quizResult", root).innerHTML = resultCard("Result · " + TRACKS[set.track].short, score, total, pct, advice,
        '<a class="btn soft" href="' + backHref(set.track) + '">返去 ' + D.esc(TRACKS[set.track].short) + "</a>" +
        '<a class="btn seal" href="#/errors">寫入錯題簿</a>' +
        '<button class="btn soft" id="retryQuiz" type="button">再做一次</button>');
      D.$("#retryQuiz", root).addEventListener("click", function () {
        D.cleanup();
        D.views.station(root, set.id);
      });
      D.$("#quizResult").scrollIntoView({ behavior: "smooth", block: "start" });
      D.toast("完成 +" + (first ? (set.xp || 30) : 5) + " XP");
    });
  }

  /* ---------- station: writing ---------- */
  function renderWrite(root, set) {
    var isPractical = set.track === "practical";
    var target = set.targetWords || (isPractical ? 450 : 700);
    var maxWords = set.maxWords || 0;
    var key = "write:" + set.id;
    var draft = S.drafts[key] || "";
    var submitted = false;
    var warmAnswers = {};
    var warmGraded = false;
    var warmResult = { score: 0, total: 0, pct: 0 };

    var materials = (set.materials || []).map(function (m) {
      return '<div class="material"><h4>' + D.esc(m.heading || "材料") + "</h4><p>" + D.esc(m.content || "").replace(/\n/g, "<br>") + "</p></div>";
    }).join("");
    var warmHTML = (set.warmup || []).map(function (q, i) {
      return '<div class="q-block"><div class="q-num">熱身 ' + (i + 1) + " · " + typeLabel(q.type || "mc") + "</div>" +
        '<div class="q-text">' + D.blankQ(q.q) + "</div>" +
        '<div class="options">' + (q.options || []).map(function (o, oi) {
          return '<button class="opt" type="button" data-wq="' + i + '" data-o="' + oi + '"><span class="key">' + "ABCD"[oi] + "</span><span>" + D.esc(o) + "</span></button>";
        }).join("") + "</div>" +
        '<div class="feedback" id="wfb' + i + '" hidden></div></div>';
    }).join("");

    root.innerHTML = stationHeader(set) +
      '<div class="grid cols-2" style="align-items:start">' +
      '<div class="card"><div class="card-title-sm">題目</div><div class="prompt-block">' + D.esc(set.task || "") + "</div>" +
      (materials ? '<div class="materials">' + materials + "</div>" : "") +
      ((set.situation || set.role || set.audience) ? '<div style="margin-top:12px">' +
        (set.situation ? '<div class="kv"><span>情境</span><b>' + D.esc(set.situation) + "</b></div>" : "") +
        (set.role ? '<div class="kv"><span>身份</span><b>' + D.esc(set.role) + "</b></div>" : "") +
        (set.audience ? '<div class="kv"><span>對象</span><b>' + D.esc(set.audience) + "</b></div>" : "") +
        (set.purpose ? '<div class="kv"><span>目的</span><b>' + D.esc(set.purpose) + "</b></div>" : "") +
        "</div>" : "") +
      ((set.extraPrompts || []).length ? '<details class="acc" style="margin-top:12px"><summary>延伸題目（' + set.extraPrompts.length + " 題，可揀嚟練）</summary><div class=\"acc-body\">" +
        set.extraPrompts.map(function (p) {
          return '<div style="padding:8px 0;border-bottom:1px dashed var(--line)"><b>' + D.esc(p.title) + "</b><p class=\"small muted\" style=\"margin-top:3px\">" + D.esc(p.task) + "</p></div>";
        }).join("") + "</div></details>" : "") +
      "</div>" +
      '<div class="card"><div class="card-title-sm">構思（落筆前 5 分鐘）</div>' +
      '<div style="margin-top:6px"><b class="small">題目要求</b><ul class="req-list">' + (set.requirements || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("") + "</ul></div>" +
      '<div style="margin-top:12px"><b class="small">引導問題</b><ul class="plan-list">' + (set.planning || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("") + "</ul></div>" +
      ((set.phrases || []).length ? '<div style="margin-top:12px"><b class="small">句式 / 格式提示</b><div style="margin-top:5px">' +
        set.phrases.map(function (p) {
          return '<div class="phrase-row"><span class="pat">' + D.esc(p.pattern || p.en || "") + "</span>" + (p.zh ? '<span class="zh">' + D.esc(p.zh) + "</span>" : "") + "</div>";
        }).join("") + "</div></div>" : "") +
      "</div></div>" +

      '<div class="grid cols-2" style="margin-top:16px;align-items:start">' +
      '<div class="card"><div class="between"><div class="card-title-sm">語言熱身</div><span class="tiny faint">' + (set.warmup || []).length + " 題" + "</span></div>" +
      (warmHTML || '<p class="small muted">呢個站冇熱身題，直接寫。</p>') +
      ((set.warmup || []).length ? '<button class="btn soft sm" id="checkWarm" style="margin-top:10px">對熱身題</button><p class="tiny faint" style="margin-top:5px">熱身題唔計入寫作分，但會自動入錯題簿。</p>' : "") +
      "</div>" +
      '<div class="card"><div class="between"><div class="card-title-sm">寫作區</div><span class="tiny faint">' +
      (isPractical ? "上限 " + maxWords + " 字" : "建議 " + target + " 字") + "</span></div>" +
      '<div class="wc-row"><span>已寫 <b class="wc-num" id="wcNum">' + D.countZh(draft) + '</b> 字</span><span id="wcHint">目標 ' + target + ' 字</span></div>' +
      '<textarea class="textarea writing-area" id="writeBox" placeholder="喺呢度寫……">' + D.esc(draft) + "</textarea>" +
      '<div class="btn-row" style="margin-top:10px"><button class="btn seal" id="submitWrite">交卷</button>' +
      '<button class="btn soft" id="saveDraft">儲存草稿</button><span class="tiny faint" id="saveHint"></span></div></div></div>' +
      '<div id="writeResult"></div><div id="modelSection" hidden></div>';

    mountExamTimer(D.$("#examTimer", root), (set.minutes || 40) * 60, "寫作時間");
    var ta = D.$("#writeBox", root);

    D.$$("[data-wq]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (warmGraded) return;
        var qi = +btn.getAttribute("data-wq"), oi = +btn.getAttribute("data-o");
        warmAnswers[qi] = oi;
        D.$$('[data-wq="' + qi + '"]', root).forEach(function (b) { b.classList.remove("sel"); });
        btn.classList.add("sel");
      });
    });

    function checkWarm() {
      if (warmGraded) return warmResult;
      warmGraded = true;
      warmResult = gradeWarmup(set, warmAnswers, root);
      return warmResult;
    }
    if (D.$("#checkWarm", root)) {
      D.$("#checkWarm").addEventListener("click", function () {
        var r = checkWarm();
        D.toast("熱身題 " + r.score + " / " + r.total + "，錯題已記錄。");
        this.disabled = true;
        this.textContent = "已對答案";
      });
    }

    function updateWC() {
      var n = D.countZh(ta.value);
      D.$("#wcNum").textContent = n;
      var hint = D.$("#wcHint");
      var over = maxWords && n > maxWords;
      hint.textContent = maxWords ? "上限 " + maxWords + " 字" : "目標 " + target + " 字";
      hint.className = over ? "over" : (n >= target * 0.9 ? "ok" : "");
      return n;
    }
    ta.addEventListener("input", function () { updateWC(); });
    D.$("#saveDraft").addEventListener("click", function () {
      S.drafts[key] = ta.value;
      D.save();
      D.$("#saveHint").textContent = "已儲存 " + D.countZh(ta.value) + " 字";
      D.toast("草稿已儲存");
    });

    D.$("#submitWrite").addEventListener("click", function () {
      if (submitted) return;
      var n = D.countZh(ta.value);
      var minWords = Math.max(60, Math.floor(target * 0.5));
      if (n < minWords) { D.toast("至少寫 " + minWords + " 字先交卷，而家只有 " + n + " 字。"); return; }
      submitted = true;
      var wr = checkWarm();
      S.drafts[key] = ta.value;
      var first = recordResult(set.id, wr.pct);
      D.award(first ? (set.xp || 35) : 5, "writing", n);
      D.save();
      var hit = n >= target * 0.9;
      var over = maxWords && n > maxWords;
      D.$("#writeResult").innerHTML = '<div class="card" style="margin-top:16px"><div class="between"><div><div class="card-title-sm">交卷結果</div><h3>' +
        (hit ? (over ? "字數超上限" : "字數達標") : "字數未夠") + "</h3></div>" +
        '<span class="badge ' + (hit && !over ? "good" : "bad") + '">' + n + " 字</span></div>" +
        '<div class="stat-row"><div class="stat-box"><b>' + n + '</b><span>已寫字數</span></div><div class="stat-box"><b>' + target + '</b><span>目標字數</span></div><div class="stat-box"><b>' + wr.score + "/" + wr.total + '</b><span>熱身題</span></div></div>' +
        '<p class="small">' + (over ? "超過題目上限，實戰會被扣分。下次先刪走重複同離題嘅句子。" : hit ? "字數夠。跟住下面嘅範文同檢查清單，對一次結構同立意。" : "未夠建議字數。先補內容，唔好用空泛口號填字。") + "</p>" +
        '<div class="btn-row" style="margin-top:12px"><a class="btn soft" href="' + backHref(set.track) + '">返去 ' + D.esc(TRACKS[set.track].short) + "</a>" +
        '<a class="btn seal" href="#/errors">去錯題簿</a>' +
        '<button class="btn soft" id="retryWrite" type="button">再寫一次</button></div></div>';
      D.$("#retryWrite", root).addEventListener("click", function () {
        D.cleanup();
        D.views.station(root, set.id);
      });
      D.$("#modelSection").hidden = false;
      D.$("#modelSection").innerHTML = '<details class="acc" open><summary>範文 + 檢查清單 + 評分準則</summary><div class="acc-body">' +
        '<div class="card-title-sm" style="margin-top:10px">範文</div><div class="passage" style="font-size:14.5px;line-height:1.95">' + D.text(set.model || "") + "</div>" +
        '<div class="card-title-sm" style="margin-top:18px">交卷前檢查</div><ul class="check-list">' + (set.checklist || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("") + "</ul>" +
        '<div class="card-title-sm" style="margin-top:18px">評分準則</div>' + (set.rubric || []).map(function (r) {
          return '<div class="rubric-row"><div class="rn">' + D.esc(r.name) + '</div><div class="rd">' + D.esc(r.desc) + "</div></div>";
        }).join("") +
        "</div></details>";
      ta.disabled = true;
      D.$("#submitWrite").disabled = true;
      D.$("#writeResult").scrollIntoView({ behavior: "smooth", block: "start" });
      D.toast("交卷 +" + (first ? (set.xp || 35) : 5) + " XP");
    });
    updateWC();
  }

  /* ---------- station: SBA ---------- */
  function renderSba(root, set) {
    var key = "sba:" + set.id;
    var draft = S.drafts[key] || "";
    var target = set.targetWords || 500;
    var submitted = false;
    var warmAnswers = {};
    var warmGraded = false;
    var warmResult = { score: 0, total: 0, pct: 0 };

    var book = set.book || {};
    var warmHTML = (set.warmup || []).map(function (q, i) {
      return '<div class="q-block"><div class="q-num">熱身 ' + (i + 1) + " · " + typeLabel(q.type || "mc") + "</div>" +
        '<div class="q-text">' + D.blankQ(q.q) + "</div>" +
        '<div class="options">' + (q.options || []).map(function (o, oi) {
          return '<button class="opt" type="button" data-wq="' + i + '" data-o="' + oi + '"><span class="key">' + "ABCD"[oi] + "</span><span>" + D.esc(o) + "</span></button>";
        }).join("") + "</div>" +
        '<div class="feedback" id="wfb' + i + '" hidden></div></div>';
    }).join("");

    root.innerHTML = stationHeader(set) +
      '<div class="sba-grid"><div class="stack">' +
      '<div class="card book-card"><div class="card-title-sm">示例書目</div><h3>' + D.esc(book.title || "自選書目") + "</h3>" +
      '<div class="author">' + D.esc(book.author || "") + "</div><p>" + D.esc(book.summary || "") + "</p></div>" +
      '<div class="card"><div class="card-title-sm">文字報告結構</div><ul class="structure-list">' +
      (set.reportStructure || []).map(function (x, i) {
        return '<li><span class="sn">' + (i + 1) + '</span><span class="st"><b>' + D.esc(x.part) + "</b><span>" + D.esc(x.note) + "</span></span></li>";
      }).join("") + "</ul></div>" +
      '<div class="card"><div class="card-title-sm">口頭匯報結構</div><ul class="structure-list">' +
      (set.oralStructure || []).map(function (x, i) {
        return '<li><span class="sn">' + (i + 1) + '</span><span class="st"><b>' + D.esc(x.part) + "</b><span>" + D.esc(x.note) + "</span></span></li>";
      }).join("") + "</ul></div>" +
      '<div class="oral-timer" id="oralTimer"></div>' +
      "</div>" +

      '<div class="stack">' +
      '<div class="card"><div class="card-title-sm">文字報告任務</div><p class="small" style="margin-top:6px">' + D.esc(set.reportTask || "") + "</p>" +
      '<div style="margin-top:10px"><b class="small">思考問題</b><ul class="plan-list">' + (set.prompts || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="wc-row"><span>已寫 <b class="wc-num" id="wcNum">' + D.countZh(draft) + "</b> 字</span><span>建議 " + target + " 字</span></div>" +
      '<textarea class="textarea writing-area" id="sbaBox" placeholder="喺呢度寫文字報告……" style="min-height:300px">' + D.esc(draft) + "</textarea>" +
      '<div class="btn-row" style="margin-top:10px"><button class="btn seal" id="submitSba">交卷</button><button class="btn soft" id="saveSba">儲存草稿</button><span class="tiny faint" id="saveHint"></span></div></div>' +
      '<div class="card"><div class="card-title-sm">口頭匯報任務</div><p class="small" style="margin-top:6px">' + D.esc(set.oralTask || "") + "</p>" +
      '<div class="btn-row" style="margin-top:10px"><button class="btn soft sm" id="playOral">▶ 播放範例（瀏覽器語音）</button><button class="btn ghost sm" id="stopOral">停止</button></div>' +
      '<p class="tiny faint" style="margin-top:6px">先用上面計時器講一次，再聽範例。考試時唔可以照讀。</p></div>' +
      '<div class="card"><div class="card-title-sm">SBA 規則熱身</div>' + warmHTML +
      ((set.warmup || []).length ? '<button class="btn soft sm" id="checkWarm" style="margin-top:10px">對熱身題</button>' : "") + "</div>" +
      "</div></div>" +
      '<div id="sbaResult"></div><div id="sbaModel" hidden></div>';

    mountExamTimer(D.$("#examTimer", root), (set.minutes || 40) * 60, "報告時間");
    mountOralTimer(D.$("#oralTimer", root), set.level === 1 ? 60 : (set.level === 2 ? 120 : 180));
    var ta = D.$("#sbaBox", root);

    D.$$("[data-wq]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (warmGraded) return;
        var qi = +btn.getAttribute("data-wq"), oi = +btn.getAttribute("data-o");
        warmAnswers[qi] = oi;
        D.$$('[data-wq="' + qi + '"]', root).forEach(function (b) { b.classList.remove("sel"); });
        btn.classList.add("sel");
      });
    });
    function checkWarm() {
      if (warmGraded) return warmResult;
      warmGraded = true;
      warmResult = gradeWarmup(set, warmAnswers, root);
      return warmResult;
    }
    if (D.$("#checkWarm", root)) {
      D.$("#checkWarm").addEventListener("click", function () {
        var r = checkWarm();
        D.toast("熱身題 " + r.score + " / " + r.total + "。");
        this.disabled = true;
        this.textContent = "已對答案";
      });
    }
    ta.addEventListener("input", function () {
      D.$("#wcNum").textContent = D.countZh(ta.value);
    });
    D.$("#saveSba").addEventListener("click", function () {
      S.drafts[key] = ta.value; D.save();
      D.$("#saveHint").textContent = "已儲存 " + D.countZh(ta.value) + " 字";
      D.toast("草稿已儲存");
    });
    D.$("#playOral").addEventListener("click", function () { D.speak(set.sampleOral || ""); });
    D.$("#stopOral").addEventListener("click", D.stopSpeak);

    D.$("#submitSba").addEventListener("click", function () {
      if (submitted) return;
      var n = D.countZh(ta.value);
      var minWords = Math.max(150, Math.floor(target * 0.4));
      if (n < minWords) { D.toast("報告至少寫 " + minWords + " 字先交卷，而家只有 " + n + " 字。"); return; }
      submitted = true;
      var wr = checkWarm();
      S.drafts[key] = ta.value;
      var first = recordResult(set.id, wr.pct);
      D.award(first ? (set.xp || 35) : 5, "writing", n);
      D.award(0, "speaking", 1);
      D.save();
      var sbaHit = n >= target * 0.8;
      D.$("#sbaResult").innerHTML = '<div class="card" style="margin-top:16px"><div class="between"><div><div class="card-title-sm">交卷結果</div><h3>報告已記錄 · ' + (sbaHit ? "字數達標" : "字數偏少") + "</h3></div>" +
        '<span class="badge ' + (sbaHit ? "good" : "bad") + '">' + n + " 字</span></div>" +
        '<div class="stat-row"><div class="stat-box"><b>' + n + '</b><span>報告字數</span></div><div class="stat-box"><b>' + target + '</b><span>建議字數</span></div><div class="stat-box"><b>' + wr.score + "/" + wr.total + '</b><span>規則熱身</span></div></div>' +
        '<p class="small">' + (sbaHit ? "字數夠。跟住下面嘅範例報告、口頭範例同評分準則，對一次自己嘅結構同反思深度。" : "字數偏少。實戰報告一般要 400–600 字，先補具體細節同反思，再對範例。") + "</p>" +
        '<div class="btn-row" style="margin-top:12px"><a class="btn soft" href="' + backHref(set.track) + '">返去 SBA</a><a class="btn seal" href="#/errors">去錯題簿</a>' +
        '<button class="btn soft" id="retrySba" type="button">再寫一次</button></div></div>';
      D.$("#retrySba", root).addEventListener("click", function () {
        D.cleanup();
        D.views.station(root, set.id);
      });
      D.$("#sbaModel").hidden = false;
      D.$("#sbaModel").innerHTML = '<details class="acc" open><summary>範例報告 + 口頭範例 + 評分準則</summary><div class="acc-body">' +
        '<div class="card-title-sm" style="margin-top:10px">文字報告範例</div><div class="passage" style="font-size:14px;line-height:1.9">' + D.text(set.sampleReport || "") + "</div>" +
        '<div class="card-title-sm" style="margin-top:18px">口頭匯報範例</div><div class="model-box">' + D.text(set.sampleOral || "") + "</div>" +
        '<div class="card-title-sm" style="margin-top:18px">評分準則</div>' + (set.rubric || []).map(function (r) {
          return '<div class="rubric-row"><div class="rn">' + D.esc(r.name) + '</div><div class="rd">' + D.esc(r.desc) + "</div></div>";
        }).join("") +
        "</div></details>";
      ta.disabled = true;
      D.$("#submitSba").disabled = true;
      D.$("#sbaResult").scrollIntoView({ behavior: "smooth", block: "start" });
      D.toast("交卷 +" + (first ? (set.xp || 35) : 5) + " XP");
    });
  }

  D.views.station = function (root, id) {
    var set = D.stationById[id];
    if (!set) {
      root.innerHTML = emptyState("◌", "搵唔到呢個訓練站", '<a href="#/stations">返去三級特訓</a>');
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    if (set.mode === "quiz" || (set.questions && set.questions.length && !set.reportTask && !set.task)) {
      renderQuiz(root, set);
    } else if (set.mode === "sba" || set.reportTask) {
      renderSba(root, set);
    } else {
      renderWrite(root, set);
    }
  };

  /* ---------- errors ---------- */
  D.views.errors = function (root) {
    var filter = D.ui.errorFilter || "open";
    var list = (S.errors || []).slice();
    if (filter === "open") list = list.filter(function (e) { return !e.fixed; });
    if (filter === "fixed") list = list.filter(function (e) { return e.fixed; });
    var open = (S.errors || []).filter(function (e) { return !e.fixed; }).length;
    var fixed = (S.errors || []).length - open;

    var items = list.map(function (e) {
      var backHref = "";
      if (e.station) {
        backHref = e.station.indexOf("fanwen:") === 0
          ? "#/fanwen/" + D.esc(e.station.slice(7))
          : "#/station/" + D.esc(e.station);
      }
      return '<div class="error-item"><div class="error-top"><span class="badge">' + D.esc(e.stationTitle || "錯題") + "</span>" +
        '<span class="mono">' + new Date(e.at || Date.now()).toLocaleDateString("zh-HK") + "</span>" +
        '<span class="error-actions">' +
        (backHref ? '<a class="btn ghost sm" href="' + backHref + '">返原站</a>' : "") +
        '<button class="btn ghost sm" data-fix="' + D.esc(e.key) + '">' + (e.fixed ? "還原" : "已修正") + "</button>" +
        '<button class="btn ghost sm" data-del="' + D.esc(e.key) + '">刪除</button></span></div>' +
        '<div class="error-q">' + D.esc(e.q) + "</div>" +
        '<div class="error-answers"><span class="wrong-ans">你答：' + D.esc(e.your || "（未答）") + '</span><span class="right-ans">正確：' + D.esc(e.correct || "") + "</span></div>" +
        (e.why ? '<div class="error-why">' + D.esc(e.why) + "</div>" : "") + "</div>";
    }).join("");

    root.innerHTML = pageHead("Error log · 失分模式", "錯題簿", "錯題唔係用嚟收藏，係用嚟重做。每次錯，問自己：係睇唔明、答唔中，定係格式錯？") +
      '<div class="stat-row" style="max-width:520px"><div class="stat-box"><b>' + open + '</b><span>未修正</span></div><div class="stat-box"><b>' + fixed + '</b><span>已修正</span></div><div class="stat-box"><b>' + (S.errors || []).length + '</b><span>總記錄</span></div></div>' +
      '<div class="between" style="margin:16px 0"><div class="segmented">' +
      [["open", "未修正"], ["fixed", "已修正"], ["all", "全部"]].map(function (x) {
        return '<button data-ef="' + x[0] + '" class="' + (filter === x[0] ? "active" : "") + '">' + x[1] + "</button>";
      }).join("") + "</div>" +
      '<button class="btn soft sm" id="manualToggle">＋ 手動記錄</button></div>' +
      '<div class="card" id="manualForm" hidden style="margin-bottom:16px"><div class="card-title-sm">手動記錄一個錯處</div>' +
      '<div class="form-grid" style="margin-top:8px">' +
      '<div class="field"><label>題目 / 錯處</label><input class="input" id="mQ" placeholder="例如：〈岳陽樓記〉「謫」點解？"></div>' +
      '<div class="field"><label>你嘅答案</label><input class="input" id="mYour" placeholder="你寫咗咩"></div>' +
      '<div class="field"><label>正確答案</label><input class="input" id="mCorrect" placeholder="正確係咩"></div>' +
      '<div class="field"><label>錯因 / 提醒</label><input class="input" id="mWhy" placeholder="例如：把古今異義詞當成今義"></div>' +
      "</div><div class=\"btn-row\" style=\"margin-top:10px\"><button class=\"btn seal sm\" id=\"mAdd\">加入錯題簿</button></div></div>" +
      (items || emptyState("✓", filter === "fixed" ? "未有已修正記錄" : "錯題簿好乾淨", "做訓練站時答錯，客觀題會自動記錄喺度。")) +
      (open ? '<div class="callout warn" style="margin-top:16px"><span class="ci">!</span><div><b>用法：</b>每題重做一次，答對先撳「已修正」。唔好一次過撳晒，呃自己冇意思。</div></div>' : "");

    D.$("#manualToggle").addEventListener("click", function () {
      var f = D.$("#manualForm"); f.hidden = !f.hidden;
    });
    D.$("#mAdd").addEventListener("click", function () {
      var q = D.$("#mQ").value.trim();
      if (!q) { D.toast("寫低題目先。"); return; }
      S.errors.unshift({
        key: "manual|" + Date.now(), stationTitle: "手動記錄", q: q,
        your: D.$("#mYour").value.trim(), correct: D.$("#mCorrect").value.trim(),
        why: D.$("#mWhy").value.trim(), at: Date.now(), fixed: false
      });
      D.save(); renderNav("errors"); D.toast("已加入錯題簿"); D.views.errors(root);
    });
    D.$$("[data-ef]", root).forEach(function (b) {
      b.addEventListener("click", function () { D.ui.errorFilter = b.getAttribute("data-ef"); D.views.errors(root); });
    });
    D.$$("[data-fix]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-fix");
        (S.errors || []).forEach(function (e) { if (e.key === k) e.fixed = !e.fixed; });
        D.save(); renderNav("errors"); D.views.errors(root);
      });
    });
    D.$$("[data-del]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-del");
        S.errors = (S.errors || []).filter(function (e) { return e.key !== k; });
        D.save(); renderNav("errors"); D.views.errors(root);
      });
    });
  };

  /* ---------- tools ---------- */
  D.views.tools = function (root) {
    D.cleanup();
    var days = D.daysBetween(D.today(), S.settings.examDate || META.exam.countdownDefault);
    root.innerHTML = pageHead("Toolbox · 考前控制台", "工具箱", "倒數、計時、字數、備份。唔好將時間花喺搵工具，直接開始。") +
      '<div class="tool-grid">' +
      '<div class="card"><div class="card-title-sm">DSE 倒數</div><div class="timer-display" style="font-size:48px">' + Math.max(0, days) + '<span style="font-size:18px;color:var(--muted)"> 日</span></div>' +
      '<p class="small muted center">考試日期（可改，預設只作倒數）</p>' +
      '<div class="row" style="justify-content:center;margin-top:8px"><input class="input" type="date" id="examDate" value="' + D.esc(S.settings.examDate || META.exam.countdownDefault) + '" style="max-width:190px">' +
      '<button class="btn sm soft" id="saveDate">儲存</button></div><p class="tiny faint center" style="margin-top:6px">' + D.esc(META.exam.dateLabel || "") + "</p></div>" +

      '<div class="card"><div class="card-title-sm">考試計時器</div><div class="timer-display" id="toolTimer">00:00</div>' +
      '<div class="btn-row" style="justify-content:center">' +
      '<button class="btn sm soft" data-min="90" data-label="卷一 閱讀">卷一 90′</button>' +
      '<button class="btn sm soft" data-min="135" data-label="卷二 寫作">卷二 135′</button>' +
      '<button class="btn sm soft" data-min="40" data-label="實用寫作">實用 40′</button>' +
      '<button class="btn sm soft" data-min="90" data-label="命題寫作">命題 90′</button></div>' +
      '<div class="btn-row" style="justify-content:center;margin-top:10px"><button class="btn seal sm" id="ttStart">開始</button><button class="btn soft sm" id="ttReset">重設</button></div>' +
      '<p class="tiny faint center" id="ttLabel" style="margin-top:6px">揀一個時段</p></div>' +

      '<div class="card"><div class="card-title-sm">中文字數</div><div class="between"><span class="small muted">計中文字，唔計標點</span><b class="mono" id="toolWc">0</b></div>' +
      '<textarea class="textarea" id="toolText" placeholder="貼上你嘅作文，即時數字……" style="min-height:150px;margin-top:8px"></textarea>' +
      '<p class="tiny faint" style="margin-top:5px">DSE 命題寫作建議不少於 650 字；實用寫作有上限，超字會影響內容評級。</p></div>' +

      '<div class="card"><div class="card-title-sm">進度備份</div><p class="small muted">進度只存喺呢個瀏覽器。換機或清 cache 前，匯出一次。</p>' +
      '<div class="btn-row" style="margin-top:10px"><button class="btn soft sm" id="exportBtn">匯出 JSON</button>' +
      '<label class="btn soft sm" style="cursor:pointer">匯入<input type="file" id="importFile" accept="application/json" hidden></label>' +
      '<button class="btn ghost sm" id="resetBtn">清空進度</button></div>' +
      '<p class="tiny faint" style="margin-top:8px" id="backupHint"></p></div>' +

      '<div class="card"><div class="card-title-sm">考試流程</div><ul class="plain-list small" style="margin-top:6px">' +
      '<li><b>卷一 閱讀</b>：90 分鐘。甲部範文約 30–35 分鐘，乙部約 50 分鐘，留 5 分鐘覆核。</li>' +
      '<li><b>卷二 寫作</b>：135 分鐘。甲部實用約 35–40 分鐘；乙部命題約 85–90 分鐘；另留 5 分鐘審題與覆核。</li>' +
      '<li><b>SBA</b>：校內進行，文字報告＋口頭匯報。留意學校截止日期。</li></ul>' +
      '<div class="callout warn" style="margin-top:10px"><span class="ci">!</span><div>唔好將「睇範文」當成「練寫作」。輸入同輸出係兩種能力。</div></div></div>' +

      '<div class="card"><div class="card-title-sm">考前 3 日</div><ul class="check-list">' +
      "<li>重看 12 組範文嘅主旨、手法、名句</li>" +
      "<li>重做錯題簿未修正嘅題目</li>" +
      "<li>計時寫一篇實用文＋一篇命題文</li>" +
      "<li>整理 6 類實用文格式骨架</li>" +
      "<li>早睡。中文科考驗狀態，唔係臨急抱佛腳</li></ul></div>" +
      "</div>" +
      '<div class="card" style="margin-top:16px"><div class="between"><div class="card-title-sm">2027 考試結構</div><span class="badge seal">新制</span></div>' +
      (META.exam.papers || []).map(function (p) {
        return '<div class="between" style="padding:10px 0;border-bottom:1px dashed var(--line);gap:18px"><div><b>' + D.esc(p.name) + '</b><div class="tiny muted">' + D.esc(p.desc || "") + " · " + D.esc(p.time || "") + "</div></div>" +
          '<b style="font-family:var(--font-serif);color:var(--seal);font-size:19px;white-space:nowrap">' + D.esc(p.weight) + "</b></div>";
      }).join("") +
      '<div class="callout info" style="margin-top:12px"><span class="ci">i</span><div>' +
      (META.exam.notes || []).map(function (x) { return "<div>" + D.esc(x) + "</div>"; }).join("") +
      '</div></div><p class="tiny faint" style="margin-top:8px">資料以考評局最新公布為準：<a href="https://www.hkeaa.edu.hk/" target="_blank" rel="noopener">HKEAA ↗</a></p></div>';

    D.$("#saveDate").addEventListener("click", function () {
      var v = D.$("#examDate").value;
      if (!v) return;
      S.settings.examDate = v; D.save(); D.views.tools(root); D.toast("考試日期已更新");
    });

    var total = 0, left = 0, tick = null, running = false, label = "";
    function fmt(s) { s = Math.max(0, s); return D.pad2(Math.floor(s / 60)) + ":" + D.pad2(s % 60); }
    function paint() {
      var el = D.$("#toolTimer");
      if (!el) return;
      el.textContent = fmt(left);
      el.className = "timer-display" + (left <= 60 && left > 0 ? " warn" : "") + (left <= 0 ? " done" : "");
    }
    D.$$("[data-min]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        if (tick) clearInterval(tick);
        running = false;
        total = left = +b.getAttribute("data-min") * 60;
        label = b.getAttribute("data-label");
        paint();
        D.$("#ttStart").textContent = "開始";
        D.$("#ttLabel").textContent = label + " · " + b.getAttribute("data-min") + " 分鐘";
      });
    });
    D.$("#ttStart").addEventListener("click", function () {
      if (running) { clearInterval(tick); running = false; this.textContent = "繼續"; return; }
      if (left <= 0) return;
      running = true; this.textContent = "暫停";
      var btn = this;
      tick = setInterval(function () {
        left--; paint();
        if (left <= 0) {
          clearInterval(tick); running = false; btn.textContent = "時間到";
          D.toast((label || "時間") + "到。");
        }
      }, 1000);
    });
    D.$("#ttReset").addEventListener("click", function () {
      if (tick) clearInterval(tick);
      running = false; left = total; paint();
      D.$("#ttStart").textContent = "開始";
    });
    D._cleanups.push(function () { if (tick) clearInterval(tick); });
    paint();

    D.$("#toolText").addEventListener("input", function () {
      D.$("#toolWc").textContent = D.countZh(this.value);
    });
    D.$("#exportBtn").addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "shiji-dse-chinese-" + D.today() + ".json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      D.$("#backupHint").textContent = "已匯出。";
    });
    D.$("#importFile").addEventListener("change", function () {
      var f = this.files && this.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var obj = JSON.parse(reader.result);
          S = D.state = merge(defaults(), obj);
          D.save(); D.applyTheme(); refreshChrome(); renderNav("tools");
          D.$("#backupHint").textContent = "已匯入。重新整理一次以套用所有畫面。";
          D.toast("進度已匯入");
        } catch (e) { D.toast("匯入失敗：檔案格式唔啱。"); }
      };
      reader.readAsText(f);
    });
    D.$("#resetBtn").addEventListener("click", function () {
      D.confirm("清空所有進度？", "呢個動作不能復原。建議先匯出備份。", function () {
        D.reset(); D.applyTheme(); renderNav("tools"); D.views.tools(root); D.toast("進度已清空");
      }, "清空");
    });
  };

  /* ---------- router ---------- */
  var KNOWN = ["dashboard", "stations", "reading", "practical", "composition", "sba", "fanwen", "station", "errors", "tools"];
  function route() {
    D.cleanup();
    D.stopSpeak();
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash ? hash.split("/") : [];
    var root = parts[0] || "dashboard";
    var app = D.$("#app");
    if (KNOWN.indexOf(root) === -1) {
      app.innerHTML = emptyState("◌", "搵唔到呢一頁", '<a href="#/dashboard">返去首頁</a>');
      return;
    }
    try {
      if (root === "dashboard") D.views.dashboard(app);
      else if (root === "stations") D.views.stations(app);
      else if (root === "reading") D.views.track(app, "reading");
      else if (root === "practical") D.views.track(app, "practical");
      else if (root === "composition") D.views.track(app, "composition");
      else if (root === "sba") D.views.track(app, "sba");
      else if (root === "fanwen") {
        if (parts[1]) D.views.fanwenText(app, parts[1]); else D.views.fanwen(app);
      }
      else if (root === "station") D.views.station(app, parts[1]);
      else if (root === "errors") D.views.errors(app);
      else if (root === "tools") D.views.tools(app);
    } catch (err) {
      app.innerHTML = emptyState("⚠", "呢頁出咗少少問題", "試下返去首頁再入嚟。如果持續，可能係資料檔案未載入。");
      if (window.console) console.error(err);
    }
    var activeNav = root;
    if (root === "station") {
      var st = D.stationById[parts[1]];
      activeNav = st ? st.track : "";
    }
    renderNav(activeNav);
    setCrumbs(parts);
    refreshChrome();
    window.scrollTo({ top: 0, behavior: "auto" });
    document.body.classList.remove("nav-open");
    var scrim = D.$("#scrim"); if (scrim) scrim.hidden = true;
    var mb = D.$("#menuBtn"); if (mb) mb.setAttribute("aria-expanded", "false");
  }

  function bindGlobal() {
    var menu = D.$("#menuBtn"), scrim = D.$("#scrim");
    if (menu) menu.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      scrim.hidden = !open;
      menu.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (scrim) scrim.addEventListener("click", function () {
      document.body.classList.remove("nav-open"); scrim.hidden = true;
    });
    var themeBtn = D.$("#themeBtn");
    if (themeBtn) themeBtn.addEventListener("click", D.toggleTheme);
    window.addEventListener("hashchange", route);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function () { if (S.settings.theme === "auto") D.applyTheme(); };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  function init() {
    D.applyTheme();
    bindGlobal();
    if (!location.hash) location.hash = "#/dashboard";
    route();
    refreshChrome();
    if (!D.storageOK) D.toast("呢個瀏覽器封鎖咗本機儲存，進度未必保存到。");
    if (!D.stations.length) {
      // Content files may be missing while the site is being built.
      if (window.console) console.warn("No station data loaded. Check assets/js/data/*.js");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
