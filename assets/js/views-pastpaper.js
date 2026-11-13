/* ============================================================
   Past Paper 區 — 原創擬真題，只出 Level 1–2
   ============================================================ */
(function () {
  "use strict";
  var D = window.DSE;
  D.views = D.views || {};

  /* ---------- compact countdown for exam bars ---------- */
  function compactTimer(el, seconds, label) {
    var left = seconds, running = false, tick = null;
    el.innerHTML = '<span class="timer-sm" id="ctDisplay">' + fmt(left) + "</span>" +
      '<button class="btn sm soft" id="ctBtn">開始計時</button>' +
      '<button class="btn ghost sm" id="ctReset" title="重設">↺</button>';
    function fmt(s) {
      s = Math.max(0, s); var m = Math.floor(s / 60), x = s % 60;
      return String(m).padStart(2, "0") + ":" + String(x).padStart(2, "0");
    }
    function paint() {
      var d = el.querySelector("#ctDisplay");
      d.textContent = fmt(left);
      d.style.color = left <= 60 ? "var(--bad)" : "";
    }
    el.querySelector("#ctBtn").addEventListener("click", function () {
      if (running) { clearInterval(tick); running = false; this.textContent = "繼續"; return; }
      if (left <= 0) return;
      running = true; this.textContent = "暫停";
      var btn = this;
      tick = setInterval(function () {
        left--; paint();
        if (left <= 0) {
          clearInterval(tick); running = false; btn.textContent = "時間到";
          D.toast((label || "時間") + "到！");
        }
      }, 1000);
    });
    el.querySelector("#ctReset").addEventListener("click", function () {
      clearInterval(tick); running = false; left = seconds; paint();
      el.querySelector("#ctBtn").textContent = "開始計時";
    });
    paint();
  }

  function fmtType(t) {
    return ({ mc: "Multiple choice", tfng: "True / False / Not Given", short: "Short answer", cloze: "Summary cloze" })[t] || "Question";
  }

  function itemList() {
    var items = [];

    (D.reading.passages || []).forEach(function (p) {
      items.push({
        key: "p1-" + p.id, paper: 1, level: p.level,
        title: p.title, meta: (p.questions || []).length + " 題 · " + (p.wordCount || "—") + " 字",
        tag: "Paper 1 Reading", href: "#/pp/1/" + p.id
      });
    });

    (D.writing.prompts || []).forEach(function (p) {
      items.push({
        key: "p2-" + p._id, paper: 2, level: p.type === "Part A" ? 1 : 2,
        title: p.title, meta: p.type + " · " + (p.targetWords || 200) + " 字",
        tag: "Paper 2 Writing", href: "#/pp/2/" + p._id
      });
    });

    (D.ppListening.tasks || []).forEach(function (t) {
      items.push({
        key: "p3-" + t.id, paper: 3, level: t.level,
        title: t.title, meta: (t.questions || []).length + " 題 · 約 " + Math.round((t.estimateSeconds || 150) / 60) + " 分鐘",
        tag: "Paper 3 Part A", href: "#/pp/3/" + t.id
      });
    });

    (D.ppListening.integrated || []).forEach(function (t) {
      items.push({
        key: "p3b-" + t.id, paper: 3, level: t.level,
        title: t.title, meta: "綜合能力 · " + (t.dataFile || []).length + " 組資料",
        tag: "Paper 3 Part B", href: "#/pp/3b/" + t.id
      });
    });

    (D.speaking.topics || []).forEach(function (t, i) {
      items.push({
        key: "p4-" + i, paper: 4, level: i < 7 ? 1 : 2,
        title: t.topic, meta: "小組討論 · " + (t.angles || []).length + " 個角度",
        tag: "Paper 4 Speaking", href: "#/pp/4/" + i
      });
    });

    return items;
  }

  /* ------------------------------------------------------------
     OVERVIEW
     ------------------------------------------------------------ */
  D.views.pastpaper = function (root) {
    var tab = D.views._ppPaper || 0;
    var lv = D.views._ppLevel || 0;
    var items = itemList();
    var done = D.state.pp.done || [];

    var filtered = items.filter(function (it) {
      if (tab && it.paper !== tab) return false;
      if (lv && it.level !== lv) return false;
      return true;
    });

    var tabs = [[0, "全部"], [1, "Paper 1 閱讀"], [2, "Paper 2 寫作"], [3, "Paper 3 聆聽"], [4, "Paper 4 說話"]];

    var cards = filtered.map(function (it) {
      var isDone = done.indexOf(it.key) !== -1;
      return '<a class="pp-card" href="' + it.href + '" style="text-decoration:none;color:inherit">' +
        '<div class="pp-meta"><span class="badge ' + (it.level === 1 ? "l1" : "l2") + '">Level ' + it.level + "</span>" +
        '<span class="badge">' + D.esc(it.tag) + "</span>" +
        (isDone ? '<span class="badge good">完成</span>' : "") + "</div>" +
        "<b>" + D.esc(it.title) + "</b>" +
        '<span class="small muted">' + D.esc(it.meta) + "</span></a>";
    }).join("");

    root.innerHTML =
      '<div class="page-head"><div class="eyebrow">Past paper zone · Level 1–2 only</div>' +
      '<h1 class="page-title">擬真題：只出你程度嘅題目。</h1>' +
      '<p class="page-lede">呢度所有題目都係<b>原創</b>，模仿 DSE 題型同難度，並只用 Level 1–2 程度出題。Level 3 以上嘅深題唔會出現，避免你未學行先學跑。</p></div>' +

      '<div class="callout warn" style="margin-bottom:20px"><span class="ci">!</span><div><b>關於版權：</b>HKDSE 官方試題屬考評局版權，呢個網站唔會複製。官方 past paper 請經學校或考評局購買；呢度提供嘅係同類型、同難度嘅練習，用嚟操題型同時間分配。</div></div>' +

      '<div class="card tight" style="margin-bottom:20px"><div class="between">' +
      '<div class="row tight"><span class="small muted">已完成</span><b>' + done.length + " / " + items.length + "</b></div>" +
      '<div class="row tight"><span class="small muted">難度</span><div class="segmented" id="lvFilter">' +
      [[0, "全部"], [1, "Level 1"], [2, "Level 2"]].map(function (l) {
        return '<button data-lv="' + l[0] + '" class="' + (lv === l[0] ? "active" : "") + '">' + l[1] + "</button>";
      }).join("") + "</div></div></div>" +
      '<div class="bar" style="margin-top:10px"><i style="width:' + Math.round(done.length / Math.max(1, items.length) * 100) + '%"></i></div></div>' +

      '<div class="tabs">' + tabs.map(function (t) {
        return '<button class="tab ' + (tab === t[0] ? "active" : "") + '" data-pptab="' + t[0] + '">' + t[1] + "</button>";
      }).join("") + "</div>" +

      (filtered.length ? '<div class="grid cols-2">' + cards + "</div>" :
        D.emptyState("◌", "呢個篩選未有題目", "試下揀其他難度或者份卷。")) +

      '<div class="card" style="margin-top:26px"><div class="card-title-sm">點樣用呢個區（重要）</div>' +
      '<div class="grid cols-3" style="margin-top:12px">' +
      '<div><b>1. 先做 Level 1</b><p class="small muted">每個 paper 都由 Level 1 開始。正確率有 70% 才跳 Level 2。</p></div>' +
      '<div><b>2. 一定要計時</b><p class="small muted">唔計時做卷係自我安慰。用卷上面嘅計時器，時間到就停筆。</p></div>' +
      '<div><b>3. 對答案要寫錯題</b><p class="small muted">錯咩、點解錯、正確係咩，即刻寫入錯題簿。</p></div>' +
      "</div>" +
      '<div class="row" style="margin-top:14px"><a class="btn soft sm" href="https://www.hkeaa.edu.hk/" target="_blank" rel="noopener">考評局官網 ↗</a>' +
      '<span class="tiny faint">官方試題及評卷參考以考評局公布為準。</span></div></div>';
  };

  /* ------------------------------------------------------------
     PAPER 1 — READING EXAM
     ------------------------------------------------------------ */
  D.views.ppReading = function (root, id) {
    var p = D.passageById(id);
    if (!p) { root.innerHTML = D.emptyState("◌", "搵唔到呢篇", ""); return; }
    var selected = {}, submitted = false;
    var minutes = p.level === 1 ? 20 : 25;

    var paras = String(p.text || "").split(/\n{2,}/).map(function (t, i) {
      return '<p><span class="para-num">' + (i + 1) + "</span>" + D.esc(t).replace(/\n/g, "<br>") + "</p>";
    }).join("");

    var qs = (p.questions || []).map(function (q, i) {
      var h = '<div class="q-block"><div class="q-num">Q' + (q.n || i + 1) + " · " + D.esc(fmtType(q.type)) + "</div>" +
        '<div style="font-size:15px">' + D.esc(q.q) + "</div>";
      if (q.type === "mc" || q.type === "tfng") {
        h += '<div class="options" style="margin-top:10px">' + (q.options || []).map(function (o, oi) {
          return '<button class="opt" data-q="' + i + '" data-o="' + oi + '"><span class="key">' + "ABCD"[oi] + "</span><span>" + D.esc(o) + "</span></button>";
        }).join("") + "</div>";
      } else {
        h += '<input class="answer-line" data-input="' + i + '" placeholder="你的答案" autocomplete="off">';
      }
      h += '<div class="answer-key" id="fb' + i + '" hidden></div></div>';
      return h;
    }).join("");

    root.innerHTML =
      '<div class="exam-shell">' +
      '<div class="between" style="margin-bottom:12px"><a class="small" href="#/pastpaper">← 返去 Past Paper 區</a>' +
      '<div class="row tight"><span class="badge ' + (p.level === 1 ? "l1" : "l2") + '">Level ' + p.level + "</span>" +
      '<span class="badge">' + (p.questions || []).length + " 題</span></div></div>" +

      '<div class="exam-bar"><span class="badge hot">Paper 1 · Reading</span>' +
      '<span class="small muted">' + D.esc(p.title) + '</span><span class="grow"></span>' +
      '<span id="ppTimer"></span></div>' +

      '<div class="grid cols-2" style="align-items:start;grid-template-columns:1.05fr .95fr">' +
      '<div class="card"><div class="card-title-sm">Passage</div>' +
      '<h2 style="font-size:22px;margin:6px 0 12px">' + D.esc(p.title) + '</h2><div class="passage">' + paras + "</div></div>" +
      '<div class="card"><div class="card-title-sm">Questions</div>' + qs +
      '<button class="btn primary block" id="submitPaper" style="margin-top:16px">交卷</button>' +
      '<p class="tiny faint center" style="margin-top:8px">未答嘅題目會當錯。養成唔留空嘅習慣。</p></div></div>' +
      '<div id="resultBox" style="margin-top:22px"></div></div>';

    compactTimer(D.$("#ppTimer", root), minutes * 60, "Paper 1");
    var left = minutes * 60;

    D.$$("[data-q]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (submitted) return;
        var qi = +btn.getAttribute("data-q"), oi = +btn.getAttribute("data-o");
        selected[qi] = oi;
        D.$$('[data-q="' + qi + '"]', root).forEach(function (b) { b.style.borderColor = ""; b.style.background = ""; });
        btn.style.borderColor = "var(--accent)"; btn.style.background = "var(--accent-soft)";
      });
    });

    D.$("#submitPaper", root).addEventListener("click", function () {
      if (submitted) return;
      submitted = true;
      var score = 0;

      (p.questions || []).forEach(function (q, i) {
        var fb = D.$("#fb" + i, root), ok;
        if (q.type === "mc" || q.type === "tfng") {
          ok = selected[i] === q.a;
          D.$$('[data-q="' + i + '"]', root).forEach(function (b) {
            var oi = +b.getAttribute("data-o");
            b.disabled = true;
            if (oi === q.a) b.classList.add("correct");
            if (oi === selected[i] && !ok) b.classList.add("wrong");
          });
        } else {
          var inp = D.$$('[data-input="' + i + '"]', root)[0];
          var your = inp ? inp.value : "";
          ok = [q.a].concat(q.accept || []).some(function (a) { return D.normAnswer(a) === D.normAnswer(your); });
          if (inp) {
            inp.disabled = true;
            inp.style.borderBottomColor = ok ? "var(--good)" : "var(--bad)";
            inp.style.color = ok ? "var(--good)" : "var(--bad)";
          }
        }
        if (ok) score++;
        fb.hidden = false;
        fb.style.borderLeftColor = ok ? "var(--good)" : "var(--bad)";
        fb.innerHTML = "<b>" + (ok ? "✓ 正確" : "✗ 唔啱") + "</b> " +
          (q.type === "mc" || q.type === "tfng" ? "答案：" + D.esc((q.options || [])[q.a]) + "。" : "答案：" + D.esc(q.a) + "。") +
          '<div class="small muted" style="margin-top:3px">' + D.esc(q.why || "") + "</div>";
      });

      var total = (p.questions || []).length;
      var pct = Math.round(score / total * 100);
      var key = "p1-" + p.id;
      var first = (D.state.pp.done || []).indexOf(key) === -1;
      if (first) D.state.pp.done.push(key);
      D.state.pp.scores[key] = Math.max(D.state.pp.scores[key] || 0, score);
      D.save();
      D.award(first ? 20 : 5, "reading", 1);
      showResult(score, total, pct, p.level, first);
    });

    function showResult(score, total, pct, level, first) {
      D.$("#resultBox", root).innerHTML = '<div class="card center"><div class="eyebrow" style="justify-content:center">PAPER 1 RESULT</div>' +
        '<div style="font-family:var(--font-display);font-size:56px;line-height:1">' + score + '<span class="muted" style="font-size:22px"> / ' + total + "</span></div>" +
        '<p class="muted" style="margin-top:6px">正確率 ' + pct + "% · Level " + level + " 水平</p>" +
        '<p class="small">' + (pct >= 70 ? "呢個 level 穩陣，可以試高一級。" : pct >= 50 ? "合格邊緣。逐題睇返解釋，將錯因分類。" : "未夠穩。返去閱讀策略頁，再做一次 Level 1 文章。") + "</p>" +
        '<div class="btn-row" style="justify-content:center;margin-top:16px">' +
        '<a class="btn soft" href="#/pastpaper">返去 Past Paper 區</a>' +
        '<a class="btn primary" href="#/errors">寫入錯題簿</a></div></div>';
      D.$("#resultBox", root).scrollIntoView({ behavior: "smooth", block: "start" });
      D.toast("完成 +" + (first ? 20 : 5) + " XP");
    }
  };

  /* ------------------------------------------------------------
     PAPER 2 — WRITING EXAM
     ------------------------------------------------------------ */
  D.views.ppWriting = function (root, id) {
    var p = D.promptById(id);
    if (!p) { root.innerHTML = D.emptyState("◌", "搵唔到題目", ""); return; }
    var target = p.targetWords || 200;
    var minutes = p.type === "Part A" ? 45 : 75;
    var key = "p2-" + p._id;
    var draft = (D.state.writing.drafts || {})[p._id] || "";

    root.innerHTML =
      '<div class="exam-shell">' +
      '<div class="between" style="margin-bottom:12px"><a class="small" href="#/pastpaper">← 返去 Past Paper 區</a>' +
      '<div class="row tight"><span class="badge ' + (p.type === "Part A" ? "l1" : "l2") + '">Level ' + (p.type === "Part A" ? 1 : 2) + "</span>" +
      '<span class="badge">' + D.esc(p.type) + "</span></div></div>" +

      '<div class="exam-bar"><span class="badge hot">Paper 2 · Writing</span>' +
      '<span class="small muted">' + D.esc(p.title) + '</span><span class="grow"></span>' +
      '<span id="ppTimer"></span></div>' +

      '<div class="grid cols-2" style="align-items:start">' +
      '<div class="card"><div class="card-title-sm">題目</div><p style="margin-top:8px">' + D.esc(p.task) + "</p>" +
      (p.hints && p.hints.length ? '<div class="callout hl" style="margin-top:12px"><span class="ci">◎</span><div><b>提示：</b><ul style="margin:4px 0 0;padding-left:18px">' +
        p.hints.map(function (h) { return "<li>" + D.esc(h) + "</li>"; }).join("") + "</ul></div></div>" : "") +
      '<div class="callout warn" style="margin-top:12px"><span class="ci">!</span><div>唔好抄提示入文。提示係幫你諗 point，唔係幫你寫句子。</div></div></div>' +

      '<div class="card"><div class="card-title-sm">寫作區</div>' +
      '<div class="between" style="margin:8px 0"><span class="small muted">目標 ' + target + " 字</span>" +
      '<span class="small mono" id="wc">' + D.wordCount(draft) + " 字</span></div>" +
      '<textarea class="textarea" id="ppDraft" style="min-height:340px;font-size:15px;line-height:1.7" placeholder="喺呢度寫…">' + D.esc(draft) + "</textarea>" +
      '<div class="btn-row" style="margin-top:12px"><button class="btn primary" id="ppSubmit">交卷 +25 XP</button>' +
      '<button class="btn soft" id="ppSave">儲存草稿</button></div></div></div>' +

      '<div class="card" style="margin-top:16px"><div class="card-title-sm">交卷前 60 秒檢查</div>' +
      '<ul class="check-list" style="margin-top:10px">' +
      "<li>有冇離題？每一段係咪直接答題目？</li>" +
      "<li>格式齊唔齊？（email 有 subject、report 有 heading）</li>" +
      "<li>動詞時態前後一致？第三人稱單數有冇加 -s？</li>" +
      "<li>有冇一句逗號駁到尾？</li>" +
      "<li>字數夠唔夠？有冇結論？</li></ul>" +
      '<div id="ppResult" style="margin-top:14px"></div></div></div>';

    compactTimer(D.$("#ppTimer", root), minutes * 60, "Paper 2");
    var ta = D.$("#ppDraft", root);
    ta.addEventListener("input", function () {
      D.$("#wc", root).textContent = D.wordCount(ta.value) + " 字";
    });

    D.$("#ppSave", root).addEventListener("click", function () {
      D.state.writing.drafts[p._id] = ta.value;
      D.save(); D.toast("草稿已儲存");
    });

    D.$("#ppSubmit", root).addEventListener("click", function () {
      D.state.writing.drafts[p._id] = ta.value;
      var first = (D.state.pp.done || []).indexOf(key) === -1;
      if (first) D.state.pp.done.push(key);
      D.save();
      D.award(first ? 25 : 5, "writing", 1);
      var wc = D.wordCount(ta.value);
      var okLen = wc >= target * 0.8;
      D.$("#ppResult").innerHTML = '<div class="feedback ' + (okLen ? "good" : "bad") + '">' +
        "<strong>" + (okLen ? "✓ 字數達標" : "字數未夠") + "</strong> " + wc + " / " + target + " 字。" +
        " 自己用上面 5 點檢查一次，再將今次嘅錯處寫入錯題簿。</div>" +
        '<div class="btn-row" style="margin-top:12px"><a class="btn primary" href="#/errors">去錯題簿</a>' +
        '<a class="btn soft" href="#/pastpaper">返去 Past Paper 區</a></div>';
      D.toast("交卷 +" + (first ? 25 : 5) + " XP");
      D.$("#ppResult").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  /* ------------------------------------------------------------
     PAPER 3 PART A — LISTENING EXAM
     ------------------------------------------------------------ */
  D.views.ppListening = function (root, id) {
    var t = D.ppTaskById(id);
    if (!t) { root.innerHTML = D.emptyState("◌", "搵唔到呢個 task", ""); return; }
    var submitted = false;

    var qs = (t.questions || []).map(function (q, i) {
      var h = '<div class="q-block"><div class="q-num">Q' + (q.n || i + 1) + "</div>" +
        '<div style="font-size:15px">' + D.esc(q.q) + "</div>";
      if (q.options && q.options.length) {
        h += '<div class="options" style="margin-top:10px">' + q.options.map(function (o, oi) {
          return '<button class="opt" data-lq="' + i + '" data-lo="' + oi + '"><span class="key">' + "ABCD"[oi] + "</span><span>" + D.esc(o) + "</span></button>";
        }).join("") + "</div>";
      } else {
        h += '<input class="answer-line" data-linput="' + i + '" placeholder="你的答案" autocomplete="off" spellcheck="false">';
      }
      h += '<div class="answer-key" id="lfb' + i + '" hidden></div></div>';
      return h;
    }).join("");

    root.innerHTML =
      '<div class="exam-shell">' +
      '<div class="between" style="margin-bottom:12px"><a class="small" href="#/pastpaper">← 返去 Past Paper 區</a>' +
      '<div class="row tight"><span class="badge ' + (t.level === 1 ? "l1" : "l2") + '">Level ' + t.level + "</span>" +
      '<span class="badge">' + D.esc(t.paper || "Paper 3 Part A") + "</span></div></div>" +

      '<div class="exam-bar"><span class="badge hot">Listening</span>' +
      '<span class="small muted">' + D.esc(t.title) + '</span><span class="grow"></span>' +
      '<button class="btn sm primary" id="playAll">▶ 播放</button>' +
      '<button class="btn sm soft" id="pauseAll">暫停</button>' +
      '<button class="btn sm soft" id="stopAll">停止</button>' +
      '<button class="btn sm ghost" id="slowAll">慢速</button></div>' +

      '<div class="grid cols-2" style="align-items:start;grid-template-columns:1fr 1fr">' +
      '<div class="card"><div class="card-title-sm">Instructions</div>' +
      '<p class="small" style="margin-top:8px">' + D.esc(t.instructions || "") + "</p>" +
      '<div class="callout warn" style="margin-top:12px"><span class="ci">!</span><div>呢個練習用瀏覽器語音播放，唔係真人錄音。建議第一次聽唔好睇文字，做完才揭 transcript。實際考試只播一次（部分部分播兩次）。</div></div>' +
      '<details class="acc" style="margin-top:14px"><summary>完成後：顯示 transcript</summary>' +
      '<div class="acc-body"><div class="passage small">' + D.para(t.transcript || "") + "</div></div></details></div>" +

      '<div class="card"><div class="card-title-sm">Questions</div>' + qs +
      '<button class="btn primary block" id="submitListen" style="margin-top:16px">交卷</button></div></div>' +
      '<div id="listenResult" style="margin-top:22px"></div></div>';

    // no countdown for listening; the recording itself sets the pace

    var selected = {};
    D.$$("[data-lq]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (submitted) return;
        var qi = +btn.getAttribute("data-lq"), oi = +btn.getAttribute("data-lo");
        selected[qi] = oi;
        D.$$('[data-lq="' + qi + '"]', root).forEach(function (b) { b.style.borderColor = ""; b.style.background = ""; });
        btn.style.borderColor = "var(--accent)"; btn.style.background = "var(--accent-soft)";
      });
    });

    D.$("#playAll", root).addEventListener("click", function () { D.speak(t.transcript, { rate: 0.92 }); });
    D.$("#slowAll", root).addEventListener("click", function () { D.speak(t.transcript, { rate: 0.72 }); });
    D.$("#pauseAll", root).addEventListener("click", function () {
      if (!D.canSpeak) return;
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      else window.speechSynthesis.pause();
    });
    D.$("#stopAll", root).addEventListener("click", D.stopSpeak);

    D.$("#submitListen", root).addEventListener("click", function () {
      if (submitted) return;
      submitted = true;
      D.stopSpeak();
      var score = 0;

      (t.questions || []).forEach(function (q, i) {
        var fb = D.$("#lfb" + i, root), ok;
        var your = "";
        if (q.options && q.options.length) {
          ok = q.options[selected[i]] === q.a;
          your = q.options[selected[i]] || "";
          D.$$('[data-lq="' + i + '"]', root).forEach(function (b) {
            var oi = +b.getAttribute("data-lo");
            b.disabled = true;
            if (q.options[oi] === q.a) b.classList.add("correct");
            if (oi === selected[i] && !ok) b.classList.add("wrong");
          });
        } else {
          var inp = D.$$('[data-linput="' + i + '"]', root)[0];
          your = inp ? inp.value : "";
          ok = [q.a].concat(q.accept || []).some(function (a) { return D.normAnswer(a) === D.normAnswer(your); });
          if (inp) {
            inp.disabled = true;
            inp.style.borderBottomColor = ok ? "var(--good)" : "var(--bad)";
            inp.style.color = ok ? "var(--good)" : "var(--bad)";
          }
        }
        if (ok) score++;
        fb.hidden = false;
        fb.style.borderLeftColor = ok ? "var(--good)" : "var(--bad)";
        fb.innerHTML = "<b>" + (ok ? "✓ 正確" : "✗ 唔啱") + "</b> 答案：" + D.esc(q.a) +
          '<div class="small muted" style="margin-top:3px">' + D.esc(q.why || "") + "</div>";
      });

      var total = (t.questions || []).length;
      var pct = Math.round(score / total * 100);
      var key = "p3-" + t.id;
      var first = (D.state.pp.done || []).indexOf(key) === -1;
      if (first) D.state.pp.done.push(key);
      D.save(); D.award(first ? 20 : 5, "listening", 1);

      D.$("#listenResult", root).innerHTML = '<div class="card center"><div class="eyebrow" style="justify-content:center">LISTENING RESULT</div>' +
        '<div style="font-family:var(--font-display);font-size:52px;line-height:1">' + score + '<span class="muted" style="font-size:20px"> / ' + total + "</span></div>" +
        '<p class="muted">正確率 ' + pct + "%</p>" +
        '<p class="small">' + (pct >= 70 ? "好穩。試下一個 Level 2 task。" : pct >= 50 ? "可以，但要重聽一次最快漏咗嘅一段。" : "先揭 transcript 跟住聽一次，再重做。") + "</p>" +
        '<div class="btn-row" style="justify-content:center;margin-top:14px"><a class="btn soft" href="#/pastpaper">返去列表</a>' +
        '<a class="btn primary" href="#/errors">寫入錯題簿</a></div></div>';
      D.$("#listenResult", root).scrollIntoView({ behavior: "smooth", block: "start" });
      D.toast("完成 +" + (first ? 20 : 5) + " XP");
    });
  };

  /* ------------------------------------------------------------
     PAPER 3 PART B — INTEGRATED TASK
     ------------------------------------------------------------ */
  D.views.ppIntegrated = function (root, id) {
    var t = D.ppIntegratedById(id);
    if (!t) { root.innerHTML = D.emptyState("◌", "搵唔到呢個 task", ""); return; }
    var key = "p3b-" + t.id;
    var draft = (D.state.writing.drafts || {})[key] || "";
    var submitted = false;

    var dataHTML = (t.dataFile || []).map(function (g) {
      return '<div style="margin-bottom:14px"><div class="card-title-sm">' + D.esc(g.heading) + "</div><ul class=\"plain-list\" style=\"margin-top:6px\">" +
        (g.points || []).map(function (p) { return "<li>" + D.esc(p) + "</li>"; }).join("") + "</ul></div>";
    }).join("");

    root.innerHTML =
      '<div class="exam-shell">' +
      '<div class="between" style="margin-bottom:12px"><a class="small" href="#/pastpaper">← 返去 Past Paper 區</a>' +
      '<div class="row tight"><span class="badge ' + (t.level === 1 ? "l1" : "l2") + '">Level ' + t.level + "</span>" +
      '<span class="badge">Paper 3 Part B</span></div></div>' +

      '<div class="exam-bar"><span class="badge hot">Integrated skills</span>' +
      '<span class="small muted">' + D.esc(t.title) + '</span><span class="grow"></span>' +
      '<span id="ppTimer"></span></div>' +

      '<div class="card"><div class="card-title-sm">Situation</div><p style="margin-top:8px">' + D.esc(t.situation) + "</p>" +
      '<div class="grid cols-2" style="margin-top:12px">' +
      '<div><b class="small">你的角色</b><p class="small muted">' + D.esc(t.role) + "</p></div>" +
      '<div><b class="small">讀者</b><p class="small muted">' + D.esc(t.audience) + "</p></div></div>" +
      '<div class="callout warn" style="margin-top:12px"><span class="ci">!</span><div><b>任務：</b>' + D.esc(t.task) + "</div></div></div>" +

      '<div class="grid cols-2" style="align-items:start;margin-top:16px">' +
      '<div class="card"><div class="card-title-sm">Data file</div>' + dataHTML +
      '<p class="tiny faint">入面有干擾資料：唔係每一點都要用。只揀同任務有關嘅。</p></div>' +

      '<div class="card"><div class="card-title-sm">Requirements（要覆蓋）</div>' +
      '<ul class="check-list" style="margin-top:8px">' + (t.requirements || []).map(function (r) { return "<li>" + D.esc(r) + "</li>"; }).join("") + "</ul>" +
      '<div class="field" style="margin-top:16px"><label>你嘅文章</label>' +
      '<textarea class="textarea" id="intDraft" style="min-height:260px;font-size:14.5px;line-height:1.7" placeholder="喺呢度寫…">' + D.esc(draft) + "</textarea></div>" +
      '<div class="between"><span class="small mono" id="wc">' + D.wordCount(draft) + " 字</span>" +
      '<button class="btn primary sm" id="intSubmit">交卷 +30 XP</button></div>' +
      '<div id="intResult" style="margin-top:12px"></div></div></div>' +

      '<details class="acc" style="margin-top:16px" id="modelAcc"><summary>做完才睇：範文 + 檢查清單</summary>' +
      '<div class="acc-body"><div class="passage">' + D.para(t.model || "") + "</div>" +
      '<div class="card-title-sm" style="margin-top:16px">檢查清單</div><ul class="check-list" style="margin-top:6px">' +
      (t.checklist || []).map(function (c) { return "<li>" + D.esc(c) + "</li>"; }).join("") + "</ul></div></details></div>";

    compactTimer(D.$("#ppTimer", root), 45 * 60, "Part B");
    var ta = D.$("#intDraft", root);
    ta.addEventListener("input", function () { D.$("#wc", root).textContent = D.wordCount(ta.value) + " 字"; });

    D.$("#intSubmit", root).addEventListener("click", function () {
      if (submitted) return;
      submitted = true;
      D.state.writing.drafts[key] = ta.value;
      var first = (D.state.pp.done || []).indexOf(key) === -1;
      if (first) D.state.pp.done.push(key);
      D.save(); D.award(first ? 30 : 5, "listening", 1);
      D.$("#intResult").innerHTML = '<div class="feedback good"><strong>✓ 已記錄</strong> 對比範文，圈出你漏咗嘅 requirement，再將格式錯誤寫入錯題簿。</div>' +
        '<div class="btn-row" style="margin-top:10px"><a class="btn sm primary" href="#/errors">去錯題簿</a></div>';
      D.$("#modelAcc").open = true;
      D.toast("完成 +" + (first ? 30 : 5) + " XP");
      D.$("#modelAcc").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  /* ------------------------------------------------------------
     PAPER 4 — SPEAKING SIMULATION
     ------------------------------------------------------------ */
  D.views.ppSpeaking = function (root, idx) {
    var t = (D.speaking.topics || [])[+idx];
    if (!t) { root.innerHTML = D.emptyState("◌", "搵唔到題目", ""); return; }
    var key = "p4-" + idx;
    var stage = 0;

    root.innerHTML =
      '<div class="exam-shell">' +
      '<div class="between" style="margin-bottom:12px"><a class="small" href="#/pastpaper">← 返去 Past Paper 區</a>' +
      '<span class="badge hot">Paper 4 · Group discussion</span></div>' +

      '<div class="card"><div class="card-title-sm">題目</div>' +
      '<h2 style="font-size:24px;margin:6px 0 2px">' + D.esc(t.topic) + "</h2>" +
      '<p class="muted">' + D.esc(t.zh) + "</p>" +
      '<div class="callout warn" style="margin-top:12px"><span class="ci">!</span><div><b>規則：</b>1 分鐘準備，然後講 8 分鐘。你可以自己一個模擬（扮演 4 個人），或者搵同學。重點係<b>唔好靜</b>。</div></div>' +
      '<div class="btn-row" style="margin-top:14px"><button class="btn primary" id="prepBtn">開始 1 分鐘準備</button>' +
      '<button class="btn soft" id="discBtn">8 分鐘討論</button>' +
      '<button class="btn soft" id="indBtn">1 分鐘個人回應</button></div>' +
      '<div id="spTimer" style="margin-top:16px"></div></div>' +

      '<div class="grid cols-2" style="margin-top:16px;align-items:start">' +
      '<div class="card"><div class="card-title-sm">可以講嘅角度</div><ul class="plain-list" style="margin-top:8px">' +
      (t.angles || []).map(function (a) { return "<li>" + D.esc(a) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="card"><div class="card-title-sm">有用字詞</div><div class="row tight" style="margin-top:10px">' +
      (t.vocab || []).map(function (v) { return '<span class="badge">' + D.esc(v) + "</span>"; }).join("") + "</div>" +
      '<div class="callout tip" style="margin-top:14px"><span class="ci">◎</span><div>至少用 3 個上述字詞，並且回應別人一次："I see your point, but…"</div></div></div></div>' +

      '<div class="card" style="margin-top:16px"><div class="between"><div><b>完成呢次練習</b><p class="small muted">記錄一次說話練習，計入 Paper 4 進度。</p></div>' +
      '<button class="btn teal" id="doneSpeak">完成 +20 XP</button></div></div></div>';

    var mount = D.$("#spTimer", root);
    D.$("#prepBtn").addEventListener("click", function () {
      D.mountTimer(mount, { seconds: 60, label: "準備 1 分鐘", doneMsg: "準備完，開始討論。" });
    });
    D.$("#discBtn").addEventListener("click", function () {
      D.mountTimer(mount, { seconds: 8 * 60, label: "小組討論 8 分鐘", doneMsg: "討論完。有冇回應過別人？" });
    });
    D.$("#indBtn").addEventListener("click", function () {
      D.mountTimer(mount, { seconds: 60, label: "個人回應 1 分鐘", doneMsg: "時間到。" });
    });

    D.$("#doneSpeak").addEventListener("click", function () {
      var first = (D.state.pp.done || []).indexOf(key) === -1;
      if (first) D.state.pp.done.push(key);
      D.state.speaking.sessions = (D.state.speaking.sessions || 0) + 1;
      D.save(); D.award(first ? 20 : 5, "speaking", 1, 10);
      D.toast("完成 +" + (first ? 20 : 5) + " XP");
      D.views.ppSpeaking(root, idx);
    });
  };

})();
