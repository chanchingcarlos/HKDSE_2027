/* ============================================================
   Core: state, storage, progress, UI helpers
   ============================================================ */
(function () {
  "use strict";

  var D = window.DSE = window.DSE || {};

  /* ---------- tiny DOM helpers ---------- */
  D.$ = function (sel, root) { return (root || document).querySelector(sel); };
  D.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  D.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  D.clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
  D.uid = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };
  D.shuffle = function (arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  D.sample = function (arr, n) { return D.shuffle(arr).slice(0, n); };
  D.plural = function (n, one, many) { return n + " " + (n === 1 ? one : (many || one + "s")); };

  /* ---------- dates ---------- */
  D.iso = function (d) {
    var x = d ? new Date(d) : new Date();
    return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0");
  };
  D.today = function () { return D.iso(); };
  D.addDays = function (iso, n) {
    var p = String(iso).split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n); return D.iso(d);
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
  D.weekday = function (iso) {
    var p = String(iso).split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
  };

  /* ---------- data accessors ---------- */
  D.grammar = (window.DSE_GRAMMAR || []).slice();
  if (window.DSE_GRAMMAR_EXTRA) {
    D.grammar.forEach(function (t) {
      var add = window.DSE_GRAMMAR_EXTRA[t.id];
      if (add && add.length) t.drills = (t.drills || []).concat(add);
    });
  }

  var seenWords = {};
  D.vocab = (window.DSE_VOCAB_A || []).concat(window.DSE_VOCAB_B || []).concat(window.DSE_VOCAB_C || [])
    .concat(window.DSE_VOCAB_D || []).concat(window.DSE_VOCAB_E || []).filter(function (v) {
      if (!v || !v.w || seenWords[v.w.toLowerCase()]) return false;
      seenWords[v.w.toLowerCase()] = 1; return true;
    });
  D.vocabByWord = {};
  D.vocab.forEach(function (v) { D.vocabByWord[v.w.toLowerCase()] = v; });

  D.writing = window.DSE_WRITING || { overview: {}, formats: [], sentenceBank: [], prompts: [] };
  if (window.DSE_WRITING_EXTRA) {
    var wx = window.DSE_WRITING_EXTRA;
    if (wx.prompts) D.writing.prompts = (D.writing.prompts || []).concat(wx.prompts);
    if (wx.sentenceBank) D.writing.sentenceBank = (D.writing.sentenceBank || []).concat(wx.sentenceBank);
    if (wx.formatPhrases) {
      (D.writing.formats || []).forEach(function (f) {
        if (wx.formatPhrases[f.id]) f.phrases = (f.phrases || []).concat(wx.formatPhrases[f.id]);
      });
    }
  }

  D.speaking = window.DSE_SPEAKING || { overview: {}, phrases: [], topics: [], individualPrompts: [], pronunciation: [], commonErrors: [] };
  if (window.DSE_SPEAKING_EXTRA) {
    var sx = window.DSE_SPEAKING_EXTRA;
    if (sx.topics) D.speaking.topics = (D.speaking.topics || []).concat(sx.topics);
    if (sx.individualPrompts) D.speaking.individualPrompts = (D.speaking.individualPrompts || []).concat(sx.individualPrompts);
    if (sx.phrases) {
      sx.phrases.forEach(function (g) {
        var target = (D.speaking.phrases || []).filter(function (p) { return p.fn === g.fn; })[0];
        if (target) target.items = (target.items || []).concat(g.items || []);
        else D.speaking.phrases.push(g);
      });
    }
  }

  D.listening = window.DSE_LISTENING || { overview: {}, traps: [], spelling: [], numberDrill: [], integrated: { workflow: [], textTypes: [], checklist: [] }, dictation: [] };
  if (window.DSE_LISTENING_DRILLS_EXTRA) {
    var lx = window.DSE_LISTENING_DRILLS_EXTRA;
    if (lx.numberDrill) D.listening.numberDrill = (D.listening.numberDrill || []).concat(lx.numberDrill);
    if (lx.spelling) D.listening.spelling = (D.listening.spelling || []).concat(lx.spelling);
    if (lx.dictation) D.listening.dictation = (D.listening.dictation || []).concat(lx.dictation);
  }

  D.reading = window.DSE_READING || { overview: {}, questionTypes: [], passages: [], examTips: [] };
  if (window.DSE_READING_EXTRA && window.DSE_READING_EXTRA.passages) {
    D.reading.passages = (D.reading.passages || []).concat(window.DSE_READING_EXTRA.passages);
  }

  D.ppListening = window.DSE_PP_LISTENING || { tasks: [], integrated: [], examTips: [] };
  if (window.DSE_LISTENING_TASKS_EXTRA) {
    var ltx = window.DSE_LISTENING_TASKS_EXTRA;
    if (ltx.tasks) D.ppListening.tasks = (D.ppListening.tasks || []).concat(ltx.tasks);
    if (ltx.integrated) D.ppListening.integrated = (D.ppListening.integrated || []).concat(ltx.integrated);
  }

  D.plan = window.DSE_PLAN || { phases: [], weeks: [], dailyHabits: [] };

  D.topicById = function (id) { return D.grammar.filter(function (t) { return t.id === id; })[0]; };
  D.passageById = function (id) { return (D.reading.passages || []).filter(function (p) { return p.id === id; })[0]; };
  D.formatById = function (id) { return (D.writing.formats || []).filter(function (f) { return f.id === id; })[0]; };
  D.ppTaskById = function (id) { return (D.ppListening.tasks || []).filter(function (t) { return t.id === id; })[0]; };
  D.ppIntegratedById = function (id) { return (D.ppListening.integrated || []).filter(function (t) { return t.id === id; })[0]; };
  D.weekByN = function (n) { return (D.plan.weeks || []).filter(function (w) { return +w.n === +n; })[0]; };

  /* ---------- storage ---------- */
  var KEY = "dse_levelup_v1";
  D.storageOK = true;
  try { window.localStorage.setItem("__t", "1"); window.localStorage.removeItem("__t"); }
  catch (e) { D.storageOK = false; }

  function defaults() {
    return {
      v: 1,
      createdAt: D.today(),
      settings: { theme: "auto", examDate: (window.DSE_PLAN && window.DSE_PLAN.examDateDefault) || "2027-04-23", name: "" },
      xp: 0,
      streak: { count: 0, best: 0, last: null },
      days: {},
      grammar: { correct: {}, done: [] },
      vocab: { boxes: {}, seen: {}, quizBest: 0, quizCount: 0 },
      writing: { formats: [], prompts: 0, drafts: {} },
      reading: { done: [], best: {} },
      listening: { tasks: [], drills: 0, correct: 0 },
      speaking: { sessions: 0, minutes: 0 },
      pp: { done: [], scores: {} },
      plan: { tasks: {} },
      errors: [],
      missions: {}
    };
  }

  function merge(base, saved) {
    if (!saved || typeof saved !== "object") return base;
    var out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
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

  D.state = load();
  D.save = function () {
    if (!D.storageOK) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(D.state)); } catch (e) {}
  };
  D.reset = function () {
    D.state = defaults();
    D.save();
  };

  /* ---------- activity / xp / streak ---------- */
  D.dayStats = function (iso) {
    var k = iso || D.today();
    if (!D.state.days[k]) {
      D.state.days[k] = { xp: 0, cards: 0, drills: 0, listening: 0, writing: 0, reading: 0, speaking: 0, minutes: 0, plan: 0, errors: 0 };
    }
    return D.state.days[k];
  };

  D.touch = function () {
    var t = D.today(), s = D.state.streak;
    if (s.last === t) return;
    var y = D.addDays(t, -1);
    s.count = s.last === y ? (s.count || 0) + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best || 0, s.count);
    D.save();
  };

  D.award = function (xp, kind, qty, minutes) {
    if (!xp && !kind) return;
    D.touch();
    var st = D.dayStats();
    D.state.xp = (D.state.xp || 0) + (xp || 0);
    st.xp += xp || 0;
    if (kind) st[kind] = (st[kind] || 0) + (qty == null ? 1 : qty);
    if (minutes) st.minutes += minutes;
    D.save();
    D.refreshChrome();
  };

  D.levelInfo = function () {
    var xp = D.state.xp || 0;
    var lv = Math.floor(Math.sqrt(xp / 60)) + 1;
    var cur = Math.pow(lv - 1, 2) * 60;
    var next = Math.pow(lv, 2) * 60;
    var pct = next > cur ? D.clamp(Math.round((xp - cur) / (next - cur) * 100), 0, 100) : 0;
    var names = ["起步", "暖身", "上手", "穩定", "衝刺", "實戰", "狀態大勇"];
    return { level: lv, name: names[Math.min(lv - 1, names.length - 1)], xp: xp, cur: cur, next: next, pct: pct };
  };

  /* ---------- progress ---------- */
  D.progress = function () {
    var g = D.state.grammar, v = D.state.vocab, w = D.state.writing,
        r = D.state.reading, l = D.state.listening, s = D.state.speaking;

    var grammarDone = (D.grammar || []).filter(function (t) {
      var c = (g.correct && g.correct[t.id]) || [];
      return c.length >= (t.drills || []).length;
    }).length;

    var seenCount = Object.keys(v.seen || {}).length;
    var vocabTotal = Math.max(1, D.vocab.length);

    var writingDone = (w.formats || []).length;
    var readingDone = (r.done || []).length;
    var listenDone = (l.tasks || []).length;
    var speakDone = Math.min(10, s.sessions || 0);

    var planTotal = 0, planDone = 0;
    (D.plan.weeks || []).forEach(function (wk) {
      (wk.tasks || []).forEach(function (t) { planTotal++; if (D.state.plan.tasks[t.id]) planDone++; });
    });

    var pGrammar = (D.grammar.length ? grammarDone / D.grammar.length : 0);
    var pVocab = D.clamp(seenCount / Math.min(500, vocabTotal), 0, 1);
    var pWriting = D.clamp(writingDone / Math.max(1, (D.writing.formats || []).length), 0, 1);
    var pReading = D.clamp(readingDone / Math.max(1, (D.reading.passages || []).length), 0, 1);
    var pListen = D.clamp(listenDone / Math.max(1, (D.ppListening.tasks || []).length + 4), 0, 1);
    var pSpeak = D.clamp(speakDone / 10, 0, 1);
    var pPlan = planTotal ? planDone / planTotal : 0;

    var paper3 = 0.60 * pListen + 0.40 * pVocab;
    var paper2 = 0.55 * pWriting + 0.45 * pGrammar;
    var paper1 = 0.50 * pReading + 0.50 * pVocab;
    var paper4 = pSpeak;
    // 四份卷合共 85%；normalise 到 100，令「準備度」只反映練習，唔會因為 tick 計劃而虛高。
    var readiness = (30 * paper3 + 25 * paper2 + 20 * paper1 + 10 * paper4) / 85;

    var band;
    if (readiness < 18) band = { code: "1", label: "Level 1 · 基礎", tone: "bad" };
    else if (readiness < 40) band = { code: "1+", label: "Level 1 · 接近 Level 2", tone: "warn" };
    else if (readiness < 65) band = { code: "2", label: "Level 2 · 站穩", tone: "good" };
    else if (readiness < 82) band = { code: "2+", label: "Level 2 · 接近 Level 3", tone: "good" };
    else band = { code: "3", label: "Level 3 · 以上", tone: "good" };

    return {
      grammarDone: grammarDone, grammarTotal: D.grammar.length,
      vocabSeen: seenCount, vocabTotal: vocabTotal,
      writingDone: writingDone, writingTotal: (D.writing.formats || []).length,
      readingDone: readingDone, readingTotal: (D.reading.passages || []).length,
      listenDone: listenDone, speakDone: s.sessions || 0,
      planDone: planDone, planTotal: planTotal,
      pGrammar: pGrammar, pVocab: pVocab, pWriting: pWriting, pReading: pReading,
      pListen: pListen, pSpeak: pSpeak, pPlan: pPlan,
      paper3: paper3, paper2: paper2, paper1: paper1, paper4: paper4,
      readiness: Math.round(readiness), band: band
    };
  };

  D.currentWeek = function () {
    var t = D.today(), weeks = D.plan.weeks || [];
    for (var i = 0; i < weeks.length; i++) {
      if (t >= weeks[i].start && t <= weeks[i].end) return weeks[i];
    }
    if (t < weeks[0].start) return weeks[0];
    return weeks[weeks.length - 1];
  };

  D.weekTaskProgress = function (w) {
    var total = (w.tasks || []).length, done = 0;
    (w.tasks || []).forEach(function (t) { if (D.state.plan.tasks[t.id]) done++; });
    return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0 };
  };

  /* ---------- mission of the day ---------- */
  D.missions = function () {
    var st = D.dayStats();
    var list = [
      { id: "cards", label: "溫 10 張單字卡", target: 10, have: st.cards || 0, icon: "◈", href: "#/vocab" },
      { id: "drills", label: "答 8 條文法題", target: 8, have: st.drills || 0, icon: "✎", href: "#/grammar" },
      { id: "listen", label: "做 1 個聆聽練習", target: 1, have: st.listening || 0, icon: "♪", href: "#/listening" }
    ];
    return list;
  };

  /* ---------- toast / modal ---------- */
  D.toast = function (msg) {
    var wrap = D.$("#toastWrap");
    if (!wrap) return;
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add("out"); }, 2200);
    setTimeout(function () { el.remove(); }, 2500);
  };

  D.modal = function (html, opts) {
    opts = opts || {};
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
    if (opts.onOpen) opts.onOpen(back);
    return { close: close, root: back };
  };

  D.confirm = function (title, body, onYes, yesLabel) {
    D.modal(
      "<h3>" + D.esc(title) + "</h3><p class=\"muted\">" + body + "</p>" +
      '<div class="btn-row" style="justify-content:flex-end;margin-top:18px">' +
      '<button class="btn soft" data-close="1">取消</button>' +
      '<button class="btn primary" data-yes="1">' + D.esc(yesLabel || "確定") + "</button></div>",
      {
        onOpen: function (root) {
          root.querySelector("[data-yes]").addEventListener("click", function () { onYes(); root.querySelector("[data-close]").click(); });
        }
      }
    );
  };

  /* ---------- speech ---------- */
  D.canSpeak = !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  D.speak = function (text, opts) {
    if (!D.canSpeak) { D.toast("呢個瀏覽器唔支援語音播放"); return null; }
    opts = opts || {};
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(text));
    var voices = window.speechSynthesis.getVoices() || [];
    var pref = voices.filter(function (v) { return /en-GB/i.test(v.lang); })[0] ||
               voices.filter(function (v) { return /^en/i.test(v.lang); })[0];
    if (pref) u.voice = pref;
    u.lang = pref ? pref.lang : "en-GB";
    u.rate = opts.rate || 0.92;
    u.pitch = opts.pitch || 1;
    if (opts.onend) u.onend = opts.onend;
    window.speechSynthesis.speak(u);
    return u;
  };
  D.stopSpeak = function () { if (D.canSpeak) window.speechSynthesis.cancel(); };

  /* ---------- theme ---------- */
  D.applyTheme = function () {
    var mode = D.state.settings.theme || "auto";
    var dark = mode === "dark" || (mode === "auto" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#111319" : "#f3eee3");
    var label = D.$("#themeLabel");
    if (label) label.textContent = mode === "auto" ? "跟隨系統" : (dark ? "淺色模式" : "深色模式");
  };
  D.toggleTheme = function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    D.state.settings.theme = dark ? "light" : "dark";
    D.save(); D.applyTheme(); D.refreshChrome();
  };

  /* ---------- top chrome ---------- */
  D.refreshChrome = function () {
    var p = D.progress();
    var sidePct = D.$("#sidePct"), sideBar = D.$("#sideBar");
    if (sidePct) sidePct.textContent = p.readiness + "%";
    if (sideBar) sideBar.style.width = p.readiness + "%";
    var stats = D.$("#topstats");
    if (stats) {
      var lv = D.levelInfo();
      stats.innerHTML =
        '<span class="chip streak" title="連續學習日數"><span class="dot"></span>連續 <b>' + (D.state.streak.count || 0) + "</b> 日</span>" +
        '<span class="chip xp hide-sm" title="經驗值"><span class="dot"></span>LV ' + lv.level + " · <b>" + lv.xp + "</b> XP</span>";
    }
  };

  /* ---------- misc ---------- */
  D.emptyState = function (icon, title, body, action) {
    return '<div class="empty"><div class="ei">' + icon + "</div><b>" + D.esc(title) + "</b><p>" + body + "</p>" + (action || "") + "</div>";
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

  D.escapeReg = function (s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };

  D.highlight = function (text, q) {
    if (!q) return D.esc(text);
    var re = new RegExp("(" + D.escapeReg(q) + ")", "ig");
    return D.esc(text).replace(re, '<span class="mark">$1</span>');
  };

  /* ---------- download / upload ---------- */
  D.exportState = function () {
    var data = JSON.stringify(D.state, null, 2);
    var blob = new Blob([data], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "dse-levelup-progress-" + D.today() + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  };

  D.importState = function (text) {
    try {
      var obj = JSON.parse(text);
      if (!obj || typeof obj !== "object") throw new Error("bad");
      D.state = merge(defaults(), obj);
      D.save(); D.applyTheme(); D.refreshChrome();
      return true;
    } catch (e) { return false; }
  };

})();
