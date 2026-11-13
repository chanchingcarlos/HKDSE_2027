/* ============================================================
   Router + app shell
   ============================================================ */
(function () {
  "use strict";
  var D = window.DSE;

  var NAV = [
    { group: "學習" },
    { id: "dashboard", href: "#/dashboard", label: "首頁", icon: "◎" },
    { id: "plan", href: "#/plan", label: "22 週計劃", icon: "▤" },
    { group: "四份卷" },
    { id: "grammar", href: "#/grammar", label: "文法診所", icon: "✎" },
    { id: "vocab", href: "#/vocab", label: "單字庫", icon: "◈" },
    { id: "writing", href: "#/writing", label: "寫作", icon: "▦" },
    { id: "reading", href: "#/reading", label: "閱讀", icon: "▣" },
    { id: "listening", href: "#/listening", label: "聆聽 + 綜合", icon: "♪" },
    { id: "speaking", href: "#/speaking", label: "說話", icon: "◍" },
    { group: "實戰" },
    { id: "pastpaper", href: "#/pastpaper", label: "Past Paper 區", icon: "▥" },
    { id: "errors", href: "#/errors", label: "錯題簿", icon: "⚑" },
    { group: "其他" },
    { id: "tools", href: "#/tools", label: "工具箱", icon: "⚒" }
  ];

  var CRUMBS = {
    dashboard: "首頁", plan: "22 週計劃", grammar: "文法診所", vocab: "單字庫",
    writing: "寫作", reading: "閱讀", listening: "聆聽 + 綜合", speaking: "說話",
    pastpaper: "Past Paper 區", errors: "錯題簿", tools: "工具箱", print: "列印版"
  };

  function renderNav(active) {
    var p = D.progress();
    var openErrors = (D.state.errors || []).filter(function (e) { return !e.fixed; }).length;
    var counts = {
      grammar: p.grammarDone + "/" + p.grammarTotal,
      vocab: p.vocabSeen,
      pastpaper: (D.state.pp.done || []).length,
      errors: openErrors || ""
    };
    var html = "";
    NAV.forEach(function (n) {
      if (n.group) { html += '<div class="nav-group">' + n.group + "</div>"; return; }
      html += '<a href="' + n.href + '" data-nav="' + n.id + '" class="' + (active === n.id ? "active" : "") + '">' +
        '<span class="ni">' + n.icon + "</span>" + n.label +
        (counts[n.id] !== undefined && counts[n.id] !== "" ? '<span class="count">' + counts[n.id] + "</span>" : "") +
        "</a>";
    });
    D.$("#nav").innerHTML = html;
  }

  function setCrumbs(parts) {
    var root = parts[0] || "dashboard";
    var name = CRUMBS[root] || "首頁";
    var extra = "";
    if (parts[1]) {
      if (root === "grammar") { var t = D.topicById(parts[1]); extra = t ? t.title : ""; }
      else if (root === "writing") { var f = D.formatById(parts[1]); extra = f ? f.name : ""; }
      else if (root === "write") { var pr = D.promptById(parts[1]); extra = pr ? pr.title : "寫作練習"; name = "寫作"; }
      else if (root === "reading") { var pa = D.passageById(parts[1]); extra = pa ? pa.title : ""; }
      else if (root === "pp") { name = "Past Paper 區"; extra = "Paper " + (parts[1] === "3b" ? "3 Part B" : parts[1]); }
    }
    D.$("#crumbs").innerHTML = '<span>DSE English</span><span class="sep">/</span><strong>' + D.esc(name) +
      (extra ? '</strong><span class="sep">/</span><span>' + D.esc(extra) : "") + "</span>";
    document.title = (extra || name) + " · Level Up DSE English";
  }

  function route() {
    D.stopSpeak();
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash ? hash.split("/") : [];
    var root = parts[0] || "dashboard";
    var app = D.$("#app");
    var known = ["dashboard", "plan", "grammar", "vocab", "writing", "write", "reading", "listening", "speaking", "pastpaper", "pp", "errors", "tools", "print"];

    if (known.indexOf(root) === -1) {
      app.innerHTML = D.emptyState("◌", "搵唔到呢一頁", '<a href="#/dashboard">返去首頁</a>');
      return;
    }

    try {
      if (root === "dashboard") D.views.dashboard(app);
      else if (root === "plan") D.views.plan(app);
      else if (root === "grammar") {
        if (parts[1]) D.views.grammarTopic(app, parts[1]); else D.views.grammar(app);
      }
      else if (root === "vocab") D.views.vocab(app);
      else if (root === "writing") {
        if (parts[1]) D.views.writingFormat(app, parts[1]); else D.views.writing(app);
      }
      else if (root === "write") D.views.writePrompt(app, parts[1]);
      else if (root === "reading") {
        if (parts[1]) D.views.readingPassage(app, parts[1]); else D.views.reading(app);
      }
      else if (root === "listening") D.views.listening(app);
      else if (root === "speaking") D.views.speaking(app);
      else if (root === "pastpaper") D.views.pastpaper(app);
      else if (root === "pp") {
        var paper = parts[1], id = parts[2];
        if (paper === "1") D.views.ppReading(app, id);
        else if (paper === "2") D.views.ppWriting(app, id);
        else if (paper === "3") D.views.ppListening(app, id);
        else if (paper === "3b") D.views.ppIntegrated(app, id);
        else if (paper === "4") D.views.ppSpeaking(app, id);
        else D.views.pastpaper(app);
      }
      else if (root === "errors") D.views.errors(app);
      else if (root === "tools") D.views.tools(app);
      else if (root === "print") D.views.print(app);
    } catch (err) {
      app.innerHTML = D.emptyState("⚠", "呢頁出咗少少問題", "試下返去首頁再入嚟。如果持續，可能係資料檔案未載入。");
      if (window.console) console.error(err);
    }

    renderNav(root === "pp" ? "pastpaper" : root);
    setCrumbs(parts);
    D.refreshChrome();
    window.scrollTo({ top: 0, behavior: "auto" });
    document.body.classList.remove("nav-open");
    D.$("#scrim").hidden = true;
    var mb = D.$("#menuBtn"); if (mb) mb.setAttribute("aria-expanded", "false");
  }

  function bindGlobal() {
    document.addEventListener("click", function (e) {
      var sp = e.target.closest("[data-speak]");
      if (sp) { e.preventDefault(); D.speak(sp.getAttribute("data-speak")); return; }
      var sa = e.target.closest("[data-speak-all]");
      if (sa) { e.preventDefault(); D.speak(sa.getAttribute("data-speak-all")); }
    });

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
      var onChange = function () { if (D.state.settings.theme === "auto") D.applyTheme(); };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  function init() {
    D.applyTheme();
    bindGlobal();
    if (!location.hash) location.hash = "#/dashboard";
    route();
    D.refreshChrome();
    if (D.canSpeak) {
      // prime the voice list on some browsers
      window.speechSynthesis.getVoices();
    }
    if (!D.storageOK) {
      D.toast("呢個瀏覽器封鎖咗本機儲存，進度未必保存到。");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

})();
