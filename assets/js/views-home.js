/* ============================================================
   Views: dashboard, plan, error log, tools, print sheet
   ============================================================ */
(function () {
  "use strict";
  var D = window.DSE;
  D.views = D.views || {};

  D.para = function (text) {
    return String(text || "").split(/\n{2,}/).map(function (p) {
      return "<p>" + D.esc(p).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  };

  D.daysToExam = function () {
    return D.daysBetween(D.today(), D.state.settings.examDate || D.plan.examDateDefault);
  };

  /* ------------------------------------------------------------
     DASHBOARD
     ------------------------------------------------------------ */
  D.views.dashboard = function (root) {
    var p = D.progress();
    var lv = D.levelInfo();
    var days = D.daysToExam();
    var wk = D.currentWeek();
    var wt = D.weekTaskProgress(wk);
    var missions = D.missions();

    var ring = D.ringSVG(p.readiness, 150);

    var missionHTML = missions.map(function (m) {
      var pct = D.clamp(Math.round((m.have / m.target) * 100), 0, 100);
      var done = m.have >= m.target;
      return '<a class="card tight" href="' + m.href + '" style="text-decoration:none;color:inherit">' +
        '<div class="between" style="margin-bottom:8px"><span class="badge ' + (done ? "good" : "") + '">' + m.icon + " " + m.label + "</span>" +
        '<span class="small muted">' + Math.min(m.have, m.target) + " / " + m.target + "</span></div>" +
        '<div class="bar"><i class="' + (done ? "ok" : "") + '" style="width:' + pct + '%"></i></div>' +
        "</a>";
    }).join("");

    var papers = [
      { name: "Paper 3", sub: "聆聽 + 綜合", w: "30%", v: p.paper3, href: "#/listening" },
      { name: "Paper 2", sub: "寫作", w: "25%", v: p.paper2, href: "#/writing" },
      { name: "Paper 1", sub: "閱讀", w: "20%", v: p.paper1, href: "#/reading" },
      { name: "Paper 4", sub: "說話", w: "10%", v: p.paper4, href: "#/speaking" }
    ];
    var paperHTML = papers.map(function (x) {
      return '<div style="margin-bottom:14px">' +
        '<div class="between" style="margin-bottom:5px"><div><b>' + x.name + "</b> <span class=\"small muted\">" + x.sub + " · " + x.w + "</span></div>" +
        '<span class="small mono muted">' + Math.round(x.v * 100) + "%</span></div>" +
        '<div class="bar"><i style="width:' + Math.round(x.v * 100) + '%"></i></div></div>';
    }).join("");

    var weakest = papers.slice().sort(function (a, b) { return a.v - b.v; })[0];

    // 14-day streak strip
    var strip = "";
    for (var i = 13; i >= 0; i--) {
      var d = D.addDays(D.today(), -i);
      var st = D.state.days[d];
      var active = st && (st.cards + st.drills + st.listening + st.writing + st.reading + st.speaking + st.plan + st.errors) > 0;
      strip += '<span title="' + d + '" style="width:22px;height:22px;border-radius:5px;display:inline-block;background:' +
        (active ? "var(--good)" : "var(--paper-2)") + ';border:1px solid var(--line)"></span>';
    }

    var pending = (wk.tasks || []).filter(function (t) { return !D.state.plan.tasks[t.id]; }).slice(0, 3);

    root.innerHTML =
      '<section class="hero">' +
      '<div class="eyebrow">DSE English · Level 1 → 2</div>' +
      '<div class="hero-grid"><div>' +
      '<h1>剩返 <span style="color:var(--brand-bars)">' + Math.max(0, days) + "</span> 日。<br>由 Level 1 上 Level 2。</h1>" +
      '<p>你唔需要變成英文高手。你只需要喺四份卷執多 <strong style="color:#fff">10–15 分</strong>。呢個網站幫你逐格補。</p>' +
      '<div class="hero-stats">' +
      '<div class="hero-stat"><b>' + (D.state.streak.count || 0) + "</b><span>連續日數</span></div>" +
      '<div class="hero-stat"><b>' + p.vocabSeen + "</b><span>已睇單字</span></div>" +
      '<div class="hero-stat"><b>' + lv.level + "</b><span>LV · " + lv.name + "</span></div>" +
      '<div class="hero-stat"><b>' + p.planDone + "</b><span>已完成任務</span></div>" +
      "</div></div>" +
      '<div class="ring-wrap">' + ring +
      '<div class="ring-label"><b>' + p.readiness + '%</b><span>準備度</span></div></div>' +
      "</div></section>" +
      '<p class="tiny faint" style="margin:8px 0 26px">「準備度」係你嘅練習完成度（按四份卷佔分加權），用嚟提示進度，<b>唔係 DSE 預測等級</b>。</p>' +

      '<h2 class="sr-only">本週概況</h2>' +
      '<div class="grid cols-3">' +
      '<div class="card"><div class="card-title-sm">本周 · 第 ' + wk.n + " 週</div>" +
      "<h3 style=\"margin:4px 0 2px\">" + D.esc(wk.title) + "</h3>" +
      '<p class="small muted">' + D.esc(wk.goal) + "</p>" +
      '<div class="progress-row" style="margin-top:12px"><div class="bar"><i style="width:' + wt.pct + '%"></i></div><span class="pct">' + wt.pct + "%</span></div>" +
      '<div class="btn-row" style="margin-top:14px"><a class="btn sm primary" href="#/plan">睇本周任務</a></div></div>' +

      '<div class="card"><div class="card-title-sm">下一個最好動作</div>' +
      '<h3 style="margin:4px 0 2px">補 ' + weakest.name + " · " + weakest.sub + "</h3>" +
      '<p class="small muted">呢份卷你嘅練習完成度最低（' + Math.round(weakest.v * 100) + "%），但佔分 " + weakest.w + "。先做呢份，回報最高。</p>" +
      '<div class="btn-row" style="margin-top:14px"><a class="btn sm teal" href="' + weakest.href + '">開始</a>' +
      '<a class="btn sm soft" href="#/pastpaper">做擬真題</a></div></div>' +

      '<div class="card"><div class="card-title-sm">連續學習</div>' +
      '<div class="row" style="gap:5px;margin:10px 0 6px">' + strip + "</div>" +
      '<p class="small muted">最近 14 日。綠色 = 有學習。唔好斷，斷咗由今日重新開始就得。</p></div>' +
      "</div>" +

      '<h2 style="margin:34px 0 14px">今日任務</h2>' +
      '<div class="grid cols-3">' + missionHTML + "</div>" +

      '<h2 style="margin:34px 0 14px">四卷進度</h2>' +
      '<div class="grid cols-2">' +
      '<div class="card">' + paperHTML +
      '<div class="callout tip" style="margin-top:16px"><span class="ci">◎</span><div><b>SBA 佔 15%。</b>呢個網站追蹤唔到學校 SBA，記得同老師確認進度 —— 呢 15% 係相對容易保住嘅分。</div></div></div>' +

      '<div class="card"><div class="card-title-sm">你嘅處境</div>' +
      "<h3 style=\"margin:6px 0 10px\">Level 1 → Level 2 要幾多？</h3>" +
      '<p class="small">DSE 英文 Level 2 大約係總分 <b>四成</b>，Level 3 大約 <b>五成多</b>（每年略有浮動）。你唔需要每份卷都叻，只需要：</p>' +
      '<ul class="plain-list" style="margin-top:10px">' +
      "<li>Paper 3 執多 8 分（最容易）</li>" +
      "<li>Paper 2 執多 5 分（減少文法錯）</li>" +
      "<li>Paper 4 執多 3 分（多講幾句）</li>" +
      "</ul>" +
      '<div class="callout warn" style="margin-top:14px"><span class="ci">!</span><div><b>唔好平均發力。</b>Paper 1 閱讀要長時間累積，唔係你今個月嘅主戰場。</div></div>' +
      "</div></div>" +

      '<h2 style="margin:34px 0 14px">跟住做</h2>' +
      '<div class="grid cols-3">' +
      '<a class="tool-tile" href="#/grammar"><span class="ti">✎</span><b>文法診所</b><span>' + p.grammarDone + " / " + p.grammarTotal + " 課完成</span></a>" +
      '<a class="tool-tile" href="#/vocab"><span class="ti">◈</span><b>單字庫</b><span>' + p.vocabSeen + " / " + p.vocabTotal + " 個已睇</span></a>" +
      '<a class="tool-tile" href="#/writing"><span class="ti">▤</span><b>寫作模板</b><span>' + p.writingDone + " / " + p.writingTotal + " 個格式</span></a>" +
      '<a class="tool-tile" href="#/reading"><span class="ti">▣</span><b>閱讀策略</b><span>' + p.readingDone + " / " + p.readingTotal + " 篇完成</span></a>" +
      '<a class="tool-tile" href="#/speaking"><span class="ti">◍</span><b>說話練習</b><span>' + p.speakDone + " 次練習</span></a>" +
      '<a class="tool-tile" href="#/pastpaper"><span class="ti">▦</span><b>Past Paper 區</b><span>只出 Level 1–2 題目</span></a>' +
      "</div>";

    if (pending.length) {
      var extra = '<div class="card" style="margin-top:26px"><div class="between"><div class="card-title-sm">本周未完成</div><a class="small" href="#/plan">全部 →</a></div><ul class="plain-list" style="margin-top:10px">' +
        pending.map(function (t) { return "<li>" + D.esc(t.t) + "</li>"; }).join("") + "</ul></div>";
      root.insertAdjacentHTML("beforeend", extra);
    }
  };

  /* ------------------------------------------------------------
     PLAN
     ------------------------------------------------------------ */
  D.views.plan = function (root) {
    var p = D.progress();
    var current = D.currentWeek();
    var byPhase = {};
    (D.plan.weeks || []).forEach(function (w) {
      (byPhase[w.phase] = byPhase[w.phase] || []).push(w);
    });

    var html =
      '<div class="page-head"><div class="eyebrow">22-week roadmap</div>' +
      '<h1 class="page-title">由今日到考前，每星期做咩。</h1>' +
      '<p class="page-lede">由 11 月中開始，分四個階段。你唔需要跟到足，但<b>至少要跟住個次序</b>：先補底，再練題型，最後計時實戰。</p></div>' +

      '<div class="card" style="margin-bottom:26px"><div class="between">' +
      '<div><div class="card-title-sm">整體進度</div><div style="font-family:var(--font-display);font-size:30px;line-height:1.2">' + p.planDone + " / " + p.planTotal + " 項</div></div>" +
      '<a class="btn primary" href="#/dashboard">返回首頁</a></div>' +
      '<div class="bar" style="margin-top:12px"><i style="width:' + Math.round(p.planDone / Math.max(1, p.planTotal) * 100) + '%"></i></div></div>';

    (D.plan.phases || []).forEach(function (ph) {
      var weeks = byPhase[ph.id] || [];
      if (!weeks.length) return;
      html += '<div class="phase-band"><h3>' + D.esc(ph.name) + '</h3><span class="badge">' + D.esc(ph.range) + '</span><span class="line"></span><span class="small muted">' + D.esc(ph.dates) + "</span></div>" +
        '<p class="small muted" style="margin:-4px 0 14px;max-width:70ch">' + D.esc(ph.zh) + "</p>";

      weeks.forEach(function (w) {
        var tp = D.weekTaskProgress(w);
        var isCurrent = current && current.n === w.n;
        html += '<div class="week ' + (tp.pct === 100 ? "done" : "") + '" style="margin-bottom:10px">' +
          '<div class="week-head" data-toggle="w' + w.n + '">' +
          '<div class="week-num"><b>' + w.n + "</b><small>WEEK</small></div>" +
          '<div class="week-meta"><h4>' + D.esc(w.title) + (isCurrent ? ' <span class="badge hot">' + (D.today() < w.start ? "即將開始" : "本週") + "</span>" : "") + "</h4>" +
          "<p>" + D.fmtDate(w.start) + " – " + D.fmtDate(w.end) + " · " + D.esc(w.focus) + "</p></div>" +
          '<div style="flex:0 0 90px"><div class="bar thin"><i class="' + (tp.pct === 100 ? "ok" : "") + '" style="width:' + tp.pct + '%"></i></div>' +
          '<div class="tiny faint" style="text-align:right;margin-top:3px">' + tp.done + "/" + tp.total + "</div></div>" +
          "</div>" +
          '<div class="week-body" id="w' + w.n + '" ' + (isCurrent ? "" : "hidden") + ">" +
          '<div class="callout hl" style="margin-top:12px"><span class="ci">◎</span><div><b>本週目標：</b>' + D.esc(w.goal) + "</div></div>" +
          '<ul class="task-list">' + (w.tasks || []).map(function (t) {
            var on = !!D.state.plan.tasks[t.id];
            return '<li class="' + (on ? "checked" : "") + '"><input type="checkbox" data-task="' + t.id + '" ' + (on ? "checked" : "") + ">" +
              '<span class="t">' + D.esc(t.t) + "</span>" + (t.min ? '<span class="min">' + t.min + " 分鐘</span>" : "") + "</li>";
          }).join("") + "</ul>" +
          '<div class="callout" style="margin-top:12px"><span class="ci">✓</span><div><b>完成指標：</b>' + D.esc(w.check) + "</div></div>" +
          "</div></div>";
      });
    });

    html += '<div class="card dark" style="margin-top:30px"><div class="card-title-sm" style="color:var(--sidebar-mut)">每日基本功（唔使等週末）</div>' +
      '<div class="grid cols-3" style="margin-top:12px">' + (D.plan.dailyHabits || []).map(function (h) {
        return '<div><b style="font-family:var(--font-display);font-size:18px">' + h.min + " 分鐘</b><p class=\"small\" style=\"color:#c9c3b7;margin-top:2px\">" + D.esc(h.t) + "</p></div>";
      }).join("") + "</div></div>";

    root.innerHTML = html;

    D.$$("[data-toggle]", root).forEach(function (h) {
      h.addEventListener("click", function () {
        var target = D.$("#" + h.getAttribute("data-toggle"), root);
        if (!target) return;
        target.hidden = !target.hidden;
        if (!target.hidden) target.closest(".week").scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    D.$$("[data-task]", root).forEach(function (cb) {
      cb.addEventListener("change", function () {
        var id = cb.getAttribute("data-task");
        if (cb.checked) {
          if (!D.state.plan.tasks[id]) { D.state.plan.tasks[id] = 1; D.award(5, "plan", 1); D.toast("完成 +5 XP"); }
        } else {
          delete D.state.plan.tasks[id]; D.save(); D.refreshChrome();
        }
        var li = cb.closest("li");
        li.classList.toggle("checked", cb.checked);
        var week = cb.closest(".week");
        var wk = (D.plan.weeks || []).filter(function (w) { return w.n === +week.querySelector(".week-num b").textContent; })[0];
        if (wk) {
          var tp = D.weekTaskProgress(wk);
          week.querySelector(".bar i").style.width = tp.pct + "%";
          week.querySelector(".bar i").className = tp.pct === 100 ? "ok" : "";
          week.querySelector(".tiny.faint").textContent = tp.done + "/" + tp.total;
          week.classList.toggle("done", tp.pct === 100);
        }
      });
    });
  };

  /* ------------------------------------------------------------
     ERROR LOG
     ------------------------------------------------------------ */
  D.views.errors = function (root) {
    var typeOptions = ["Grammar", "Vocabulary", "Listening", "Writing", "Speaking", "Reading", "Other"];
    var filter = D.views._errorFilter || "all";

    function renderList() {
      var items = D.state.errors.slice().reverse();
      if (filter === "open") items = items.filter(function (e) { return !e.fixed; });
      if (filter === "fixed") items = items.filter(function (e) { return e.fixed; });
      if (filter !== "all") items = items.filter(function (e) { return e.type === filter; });

      if (!items.length) {
        return D.emptyState("✎", "錯題簿係空白", "每次做錯題、寫錯字、串錯字，都寫入嚟。Level 1 學生最大嘅問題係同一個錯犯十次。");
      }
      return items.map(function (e) {
        return '<div class="error-item ' + (e.fixed ? "fixed" : "") + '">' +
          '<div class="error-top"><span class="badge">' + D.esc(e.type) + "</span>" +
          (e.fixed ? '<span class="badge good">已修正</span>' : '<span class="badge hot">未修正</span>') +
          "<time>" + D.esc(e.date) + "</time></div>" +
          '<div class="small"><span class="error-wrong">✗ ' + D.esc(e.wrong) + "</span>" +
          ' <span class="muted">→</span> <span class="error-right">✓ ' + D.esc(e.right) + "</span></div>" +
          (e.note ? '<div class="error-note">' + D.esc(e.note) + "</div>" : "") +
          '<div class="btn-row" style="margin-top:9px">' +
          '<button class="btn ghost sm" data-fix="' + e.id + '">' + (e.fixed ? "標記為未修正" : "我已經明喇") + "</button>" +
          '<button class="btn ghost sm" data-del="' + e.id + '" style="color:var(--bad)">刪除</button></div></div>';
      }).join("");
    }

    root.innerHTML =
      '<div class="page-head"><div class="eyebrow">Error log</div>' +
      '<h1 class="page-title">錯題簿。</h1>' +
      '<p class="page-lede">同一個錯犯第二次，就係浪費分。每次錯都寫低：<b>我寫咗咩 / 正確係咩 / 點解錯</b>。</p></div>' +

      '<div class="grid cols-2" style="align-items:start">' +
      '<div class="card"><div class="card-title-sm">新增一條</div>' +
      '<div class="form-grid"><div class="field"><label>類型</label><select class="select" id="eType">' +
      typeOptions.map(function (t) { return "<option>" + t + "</option>"; }).join("") + "</select></div>" +
      '<div class="field"><label>日期</label><input class="input" id="eDate" type="date" value="' + D.today() + '"></div></div>' +
      '<div class="field"><label>我寫錯咩（或串錯嘅字）</label><input class="input" id="eWrong" placeholder="例：He go to school every day."></div>' +
      '<div class="field"><label>正確版本</label><input class="input" id="eRight" placeholder="例：He goes to school every day."></div>' +
      '<div class="field"><label>點解錯 / 提醒自己（可留空）</label><textarea class="textarea" id="eNote" style="min-height:70px" placeholder="例：第三人稱單數動詞要加 -s。"></textarea></div>' +
      '<button class="btn primary block" id="eAdd">加入錯題簿 +3 XP</button></div>' +

      '<div class="card"><div class="card-title-sm">點用先有效</div>' +
      '<ul class="num-list" style="margin-top:12px">' +
      "<li><b>即日寫。</b>做完卷即刻寫，唔好等週末，會唔記得點解錯。</li>" +
      "<li><b>寫「正確版本」而唔係只寫「錯」。</b>大腦要見到正確句式。</li>" +
      "<li><b>每日 5 分鐘讀一次。</b>唔係睇，係讀出聲。</li>" +
      "<li><b>一星期內重做。</b>呢個 app 會幫你數未修正嘅項目。</li>" +
      "</ul>" +
      '<div class="callout tip" style="margin-top:14px"><span class="ci">◎</span><div>目標：考前錯題簿<b>未修正項目少於 10 條</b>。</div></div>' +
      '<div class="row" style="margin-top:14px"><button class="btn soft sm" id="reviewBtn">隨機重溫未修正</button></div></div></div>' +

      '<div class="between" style="margin:30px 0 12px"><h2>紀錄</h2>' +
      '<div class="segmented" id="eFilter">' +
      ["all", "open", "fixed"].map(function (f) {
        return '<button data-f="' + f + '" class="' + (filter === f ? "active" : "") + '">' + ({ all: "全部", open: "未修正", fixed: "已修正" })[f] + "</button>";
      }).join("") + "</div></div>" +
      '<div class="stack" id="errorList">' + renderList() + "</div>";

    D.$("#eAdd", root).addEventListener("click", function () {
      var wrong = D.$("#eWrong", root).value.trim();
      var right = D.$("#eRight", root).value.trim();
      if (!wrong || !right) { D.toast("起碼要填「錯」同「正確」"); return; }
      D.state.errors.push({
        id: D.uid(), date: D.$("#eDate", root).value || D.today(),
        type: D.$("#eType", root).value, wrong: wrong, right: right,
        note: D.$("#eNote", root).value.trim(), fixed: false
      });
      D.save(); D.award(3, "errors", 1); D.toast("已加入 +3 XP");
      D.$("#eWrong", root).value = ""; D.$("#eRight", root).value = ""; D.$("#eNote", root).value = "";
      D.$("#errorList", root).innerHTML = renderList(); bindList();
    });

    function bindList() {
      D.$$("[data-fix]", root).forEach(function (b) {
        b.addEventListener("click", function () {
          var e = D.state.errors.filter(function (x) { return x.id === b.getAttribute("data-fix"); })[0];
          if (!e) return;
          e.fixed = !e.fixed; D.save();
          if (e.fixed) D.award(2, "errors", 1);
          D.$("#errorList", root).innerHTML = renderList(); bindList();
        });
      });
      D.$$("[data-del]", root).forEach(function (b) {
        b.addEventListener("click", function () {
          D.confirm("刪除呢條？", "冇得復原。", function () {
            D.state.errors = D.state.errors.filter(function (x) { return x.id !== b.getAttribute("data-del"); });
            D.save(); D.$("#errorList", root).innerHTML = renderList(); bindList();
          }, "刪除");
        });
      });
    }
    bindList();

    D.$$("#eFilter [data-f]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.views._errorFilter = b.getAttribute("data-f");
        D.views.errors(root);
      });
    });

    D.$("#reviewBtn", root).addEventListener("click", function () {
      var open = D.state.errors.filter(function (e) { return !e.fixed; });
      if (!open.length) { D.toast("冇未修正嘅錯題，好嘢"); return; }
      var e = open[Math.floor(Math.random() * open.length)];
      D.modal(
        '<div class="card-title-sm">先自己講一次正確版本</div>' +
        '<h3 style="margin:8px 0 14px;color:var(--bad)">✗ ' + D.esc(e.wrong) + "</h3>" +
        '<div id="revAns"></div>' +
        '<div class="btn-row" style="margin-top:16px;justify-content:flex-end">' +
        '<button class="btn soft" data-close="1">收皮</button>' +
        '<button class="btn primary" id="reveal">顯示答案</button></div>',
        {
          onOpen: function (rootm) {
            rootm.querySelector("#reveal").addEventListener("click", function () {
              rootm.querySelector("#revAns").innerHTML =
                '<div class="callout good"><span class="ci">✓</span><div><b>' + D.esc(e.right) + "</b>" +
                (e.note ? '<div class="small" style="margin-top:6px">' + D.esc(e.note) + "</div>" : "") + "</div></div>";
              this.disabled = true;
            });
          }
        }
      );
    });
  };

  /* ------------------------------------------------------------
     TOOLS
     ------------------------------------------------------------ */
  D.views.tools = function (root) {
    var p = D.progress();
    root.innerHTML =
      '<div class="page-head"><div class="eyebrow">Toolbox</div>' +
      '<h1 class="page-title">工具箱。</h1>' +
      '<p class="page-lede">倒數、番茄鐘、備份、應考清單。呢啲唔會直接加分，但會令你讀得更有系統。</p></div>' +

      '<div class="grid cols-2">' +
      '<div class="card"><div class="card-title-sm">考試倒數</div>' +
      '<p class="small muted" style="margin-top:6px">' + D.esc(D.plan.examNote || "") + "</p>" +
      '<div class="field" style="margin-top:12px"><label>英文科考試日期</label>' +
      '<input class="input" type="date" id="examDate" value="' + D.esc(D.state.settings.examDate) + '"></div>' +
      '<div class="between"><span class="small muted">距離今日</span><b style="font-family:var(--font-display);font-size:26px">' + Math.max(0, D.daysToExam()) + " 日</b></div>" +
      '<button class="btn primary block" id="saveExam" style="margin-top:12px">更新倒數</button></div>' +

      '<div class="card"><div class="card-title-sm">番茄鐘</div>' +
      '<div id="pomo" style="margin-top:10px"></div></div>' +

      '<div class="card"><div class="card-title-sm">進度備份</div>' +
      '<p class="small muted" style="margin:8px 0 14px">進度存喺呢個瀏覽器。換電腦或者清除瀏覽資料之前，匯出一個 JSON 檔。</p>' +
      '<div class="btn-row"><button class="btn primary" id="exportBtn">匯出進度</button>' +
      '<button class="btn soft" id="importBtn">匯入進度</button>' +
      '<input type="file" id="importFile" accept="application/json" hidden></div>' +
      '<hr><button class="btn danger block" id="resetBtn">清除所有進度</button></div>' +

      '<div class="card"><div class="card-title-sm">應考清單</div>' +
      '<ul class="check-list" style="margin-top:10px">' +
      "<li>准考證 + 身份證</li><li>原子筆 ×2、鉛筆、擦膠、間尺</li>" +
      "<li>准考證上嘅試場同時間，預早 30 分鐘到</li>" +
      "<li>手錶（考場未必有鐘）</li><li>水（透明樽）</li>" +
      "<li>前一晚 7 小時睡眠</li></ul>" +
      '<div class="callout tip" style="margin-top:14px"><span class="ci">◎</span><div>Paper 1 記得<b>揀 B1</b>。你嘅目標係 Level 2–3，唔好揀 B2 同自己鬥氣。</div></div></div>' +
      "</div>" +

      '<div class="card" style="margin-top:18px"><div class="between"><div><div class="card-title-sm">列印版重點紙</div>' +
      "<h3 style=\"margin:4px 0 2px\">一頁紙 cheat sheet</h3>" +
      '<p class="small muted">文法最易錯 12 點、20 句萬用句式、說話開場、聆聽陷阱。印出嚟貼喺書桌。</p></div>' +
      '<a class="btn primary" href="#/print">開啟列印版 →</a></div></div>' +

      '<div class="card" style="margin-top:18px"><div class="card-title-sm">點樣用呢個網站（唔好亂做）</div>' +
      '<div class="grid cols-3" style="margin-top:12px">' +
      '<div><b>1. 每日 30–45 分鐘</b><p class="small muted">單字卡 10 分鐘 + 一個小練習 + 錯題重溫。唔好一次過做三小時。</p></div>' +
      '<div><b>2. 先補底，後做卷</b><p class="small muted">文法未穩就狂做 past paper，只會重複同一個錯。跟 22 週計劃嘅次序。</p></div>' +
      '<div><b>3. 只做 Level 1–2</b><p class="small muted">呢個網站嘅練習全部係你程度。做太深嘅題目只會打擊信心。</p></div>' +
      "</div></div>" +

      '<p class="tiny faint" style="margin-top:24px">目前進度：' + p.readiness + "% 準備度 · " + (D.state.errors.filter(function (e) { return !e.fixed; }).length) + " 條未修正錯題 · " + D.state.xp + " XP</p>";

    D.$("#saveExam", root).addEventListener("click", function () {
      var v = D.$("#examDate", root).value;
      if (!v) return;
      D.state.settings.examDate = v; D.save(); D.toast("已更新");
      D.views.tools(root);
    });

    D.mountTimer(D.$("#pomo", root), {
      seconds: 25 * 60, label: "專注 25 分鐘",
      presets: [{ label: "15 分鐘", seconds: 900 }, { label: "25 分鐘", seconds: 1500 }, { label: "45 分鐘", seconds: 2700 }],
      doneMsg: "做完一節，休息 5 分鐘。"
    });

    D.$("#exportBtn", root).addEventListener("click", D.exportState);
    D.$("#importBtn", root).addEventListener("click", function () { D.$("#importFile", root).click(); });
    D.$("#importFile", root).addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        if (D.importState(String(r.result))) { D.toast("已匯入進度"); D.views.tools(root); }
        else D.toast("檔案格式唔啱");
      };
      r.readAsText(f);
    });
    D.$("#resetBtn", root).addEventListener("click", function () {
      D.confirm("清除所有進度？", "XP、錯題簿、已完成任務全部會消失，冇得復原。建議先匯出備份。", function () {
        D.reset(); D.applyTheme(); D.refreshChrome(); D.toast("已重設"); D.views.tools(root);
      }, "清除");
    });
  };

  /* ------------------------------------------------------------
     PRINT SHEET
     ------------------------------------------------------------ */
  D.views.print = function (root) {
    var grammarTop = (D.grammar || []).slice(0, 12);
    var phrases = (D.writing.sentenceBank || []).slice(0, 20);
    var speak = (D.speaking.phrases || []).slice(0, 6);
    var traps = (D.listening.traps || []).slice(0, 8);

    root.innerHTML =
      '<div class="no-print" style="margin-bottom:20px"><button class="btn primary" onclick="window.print()">列印 / 儲存為 PDF</button> ' +
      '<a class="btn soft" href="#/tools">返回工具箱</a></div>' +
      '<div class="card" style="max-width:900px;margin:0 auto">' +
      '<h1 style="font-family:var(--font-display);font-size:30px;margin-bottom:2px">DSE English 1→2 重點紙</h1>' +
      '<p class="small muted">貼喺書桌。每日睇一次，唔好死背。</p>' +
      '<hr>' +
      "<h2 style=\"font-size:19px;margin-bottom:10px\">1. 最易錯文法（Level 1 殺手）</h2>" +
      '<div class="grid cols-2" style="gap:10px">' + grammarTop.map(function (g) {
        return '<div style="break-inside:avoid"><b class="small">' + D.esc(g.title) + "</b><p class=\"tiny muted\" style=\"margin:2px 0 0\">" + D.esc(g.zh) + "</p></div>";
      }).join("") + "</div>" +
      '<hr><h2 style="font-size:19px;margin-bottom:10px">2. 20 句萬用句式</h2>' +
      '<div class="grid cols-2" style="gap:8px">' + phrases.map(function (s) {
        return '<div class="small" style="break-inside:avoid"><b>' + D.esc(s.en) + "</b><div class=\"tiny muted\">" + D.esc(s.zh) + "</div></div>";
      }).join("") + "</div>" +
      '<hr><h2 style="font-size:19px;margin-bottom:10px">3. 說話開場 + 互動</h2>' +
      '<div class="grid cols-2" style="gap:8px">' + speak.map(function (grp) {
        return '<div style="break-inside:avoid"><b class="small">' + D.esc(grp.fn) + "</b>" +
          '<ul class="plain-list" style="margin-top:3px">' + (grp.items || []).slice(0, 4).map(function (it) {
            return '<li class="small">' + D.esc(it.en) + "</li>";
          }).join("") + "</ul></div>";
      }).join("") + "</div>" +
      '<hr><h2 style="font-size:19px;margin-bottom:10px">4. 聆聽陷阱</h2>' +
      '<div class="grid cols-2" style="gap:8px">' + traps.map(function (t) {
        return '<div class="small" style="break-inside:avoid"><b>' + D.esc(t.name) + "</b><div class=\"tiny muted\">" + D.esc(t.zh) + "</div></div>";
      }).join("") + "</div>" +
      '<hr><div class="grid cols-2" style="gap:14px"><div><b>時間分配</b><ul class="plain-list small" style="margin-top:4px">' +
      "<li>Paper 1：約 1 小時 30 分 · 揀 B1</li><li>Paper 2：約 2 小時 · Part A 45 分鐘、Part B 75 分鐘</li>" +
      "<li>Paper 3：約 2 小時 · 先睇題目</li><li>Paper 4：小組 8 分鐘 + 個人 1 分鐘</li></ul></div>" +
      '<div><b>最後提醒</b><ul class="plain-list small" style="margin-top:4px">' +
      "<li>準確 > 複雜</li><li>唔好留空</li><li>每段一個重點</li><li>唔好靜默超過 3 秒</li></ul></div></div>" +
      "</div>";
  };

})();
