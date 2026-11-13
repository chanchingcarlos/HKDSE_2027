/* ============================================================
   Views: reading, listening, speaking
   ============================================================ */
(function () {
  "use strict";
  var D = window.DSE;
  D.views = D.views || {};

  /* ------------------------------------------------------------
     READING
     ------------------------------------------------------------ */
  D.views.reading = function (root) {
    var tab = D.views._readingTab || "strategy";
    var ov = D.reading.overview || {};
    var tabs = [["strategy", "策略 + 題型"], ["practice", "文章練習"]];
    var tabHTML = '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab ' + (tab === t[0] ? "active" : "") + '" data-rtab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var head = '<div class="page-head"><div class="eyebrow">Reading · 20%</div>' +
      '<h1 class="page-title">你唔需要睇得明全部，只需要答得中。</h1>' +
      '<p class="page-lede">閱讀係四份卷最難短時間提升嘅一份。策略係：<b>揀 B1、先睇題目、每題搵到出處</b>。</p></div>';

    var body = "";

    if (tab === "strategy") {
      body =
        '<div class="callout warn" style="margin-bottom:18px"><span class="ci">!</span><div><b>最重要嘅決定：揀 B1。</b>' +
        D.esc(ov.b1b2 || "B1 嘅分數上限係 Level 4，但題目淺好多。你目標 Level 2–3，揀 B1 係正確策略。") + "</div></div>" +
        '<div class="grid cols-2" style="margin-bottom:18px">' +
        '<div class="card"><div class="card-title-sm">卷嘅結構</div><p class="small" style="margin-top:8px">' + D.esc(ov.format || "") + "</p>" +
        '<p class="small" style="margin-top:8px"><b>Part A：</b>' + D.esc(ov.partA || "") + "</p>" +
        '<p class="small" style="margin-top:8px"><b>時間：</b>' + D.esc(ov.timing || "") + "</p></div>" +
        '<div class="card"><div class="card-title-sm">8 條黃金規則</div><ul class="check-list" style="margin-top:8px">' +
        (ov.goldenRules || []).map(function (r) { return "<li>" + D.esc(r) + "</li>"; }).join("") + "</ul></div></div>" +

        '<h2 style="margin:26px 0 12px">7 種題型，逐個拆</h2>' +
        (D.reading.questionTypes || []).map(function (qt) {
          return '<details class="acc"><summary><span class="badge">' + D.esc(qt.name) + "</span> " + D.esc(qt.zh) + "</summary>" +
            '<div class="acc-body"><p>' + D.esc(qt.tactic) + "</p>" +
            (qt.example ? '<div class="callout" style="margin-top:10px"><span class="ci">▸</span><div><b>例：</b>' + D.esc(qt.example.q) +
              '<div class="small" style="margin-top:8px">' + (qt.example.options || []).map(function (o, i) {
                return '<span class="badge ' + (i === qt.example.a ? "good" : "") + '" style="margin:2px">' + D.esc(o) + "</span>";
              }).join("") + "</div>" +
              '<div class="small muted" style="margin-top:8px">' + D.esc(qt.example.why) + "</div></div></div>" : "") +
            "</div></details>";
        }).join("") +

        '<div class="card" style="margin-top:22px"><div class="card-title-sm">考场提示</div><div class="grid cols-2" style="margin-top:10px">' +
        (D.reading.examTips || []).map(function (t) {
          return '<div><b class="small">' + D.esc(t.title) + "</b><p class=\"tiny muted\" style=\"margin:2px 0 0\">" + D.esc(t.zh) + "</p></div>";
        }).join("") + "</div></div>";
    }

    if (tab === "practice") {
      body = '<div class="grid cols-2">' + (D.reading.passages || []).map(function (p) {
        var done = (D.state.reading.done || []).indexOf(p.id) !== -1;
        return '<a class="pp-card" href="#/reading/' + p.id + '" style="text-decoration:none;color:inherit">' +
          '<div class="pp-meta"><span class="badge ' + (p.level === 1 ? "l1" : "l2") + '">Level ' + p.level + "</span>" +
          '<span class="badge">' + (p.questions || []).length + " 題</span>" +
          '<span class="badge">' + (p.wordCount || "—") + " 字</span>" +
          (done ? '<span class="badge good">完成</span>' : "") + "</div>" +
          "<b>" + D.esc(p.title) + "</b>" +
          '<span class="small muted">' + D.esc(p.blurb || "") + "</span></a>";
      }).join("") + "</div>" +
        '<div class="callout tip" style="margin-top:18px"><span class="ci">◎</span><div>做 Level 1 嗰兩篇先。正確率有 70% 才跳去 Level 2。做唔切唔好死撐，閱讀嘅時間壓力好大。</div></div>';
    }

    root.innerHTML = head + tabHTML + body;
    D.$$("[data-rtab]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.views._readingTab = b.getAttribute("data-rtab");
        D.views.reading(root);
      });
    });
  };

  D.views.readingPassage = function (root, id) {
    var p = D.passageById(id);
    if (!p) { root.innerHTML = D.emptyState("◌", "搵唔到呢篇文章", ""); return; }
    var selected = {};
    var submitted = false;
    var minutes = p.level === 1 ? 20 : 25;

    var paras = String(p.text || "").split(/\n{2,}/).map(function (t, i) {
      return '<p><span class="para-num">' + (i + 1) + "</span>" + D.esc(t).replace(/\n/g, "<br>") + "</p>";
    }).join("");

    var qs = (p.questions || []).map(function (q, i) {
      var h = '<div class="q-block" data-qi="' + i + '"><div class="q-num">Q' + (q.n || i + 1) + " · " + D.esc(fmtType(q.type)) + "</div>" +
        '<div style="font-size:15px">' + D.esc(q.q) + "</div>";
      if (q.type === "mc" || q.type === "tfng") {
        h += '<div class="options" style="margin-top:10px">' + (q.options || []).map(function (o, oi) {
          return '<button class="opt" data-q="' + i + '" data-o="' + oi + '"><span class="key">' + "ABCD"[oi] + "</span><span>" + D.esc(o) + "</span></button>";
        }).join("") + "</div>";
      } else if (q.type === "cloze") {
        h += '<p class="small muted" style="margin-top:8px">用文章入面嘅一個字填入。</p>' +
          '<input class="answer-line" data-input="' + i + '" placeholder="你的答案" autocomplete="off">';
      } else {
        h += '<input class="answer-line" data-input="' + i + '" placeholder="你的答案" autocomplete="off">';
      }
      h += '<div class="answer-key" id="fb' + i + '" hidden></div></div>';
      return h;
    }).join("");

    root.innerHTML =
      '<div class="exam-shell">' +
      '<div class="between" style="margin-bottom:12px"><a class="small" href="#/reading">← 返去閱讀</a>' +
      '<div class="row tight"><span class="badge ' + (p.level === 1 ? "l1" : "l2") + '">Level ' + p.level + "</span>" +
      '<span class="badge">建議 ' + minutes + " 分鐘</span></div></div>" +

      '<div class="exam-bar"><span class="badge hot">Paper 1 練習</span>' +
      '<span class="small muted">' + D.esc(p.title) + '</span><span class="grow"></span>' +
      '<span class="small muted" id="answeredCount">已答 0 / ' + (p.questions || []).length + "</span>" +
      '<button class="btn primary sm" id="submitPaper">交卷</button></div>' +

      '<div class="grid cols-2" style="align-items:start;grid-template-columns:1.05fr .95fr">' +
      '<div class="card"><div class="card-title-sm">Passage</div>' +
      '<h2 style="font-size:22px;margin:6px 0 12px">' + D.esc(p.title) + '</h2><div class="passage">' + paras + "</div></div>" +
      '<div class="card"><div class="card-title-sm">Questions</div>' + qs + "</div></div>" +

      '<div id="resultBox" style="margin-top:22px"></div></div>';

    function fmtType(t) {
      return ({ mc: "Multiple choice", tfng: "True / False / Not Given", short: "Short answer", cloze: "Summary cloze", matching: "Matching", sequence: "Sequencing", vocab: "Vocabulary" })[t] || "Question";
    }

    function updateCount() {
      var n = Object.keys(selected).length + D.$$("[data-input]", root).filter(function (x) { return x.value.trim(); }).length;
      var el = D.$("#answeredCount", root);
      if (el) el.textContent = "已答 " + n + " / " + (p.questions || []).length;
    }

    D.$$("[data-q]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (submitted) return;
        var qi = +btn.getAttribute("data-q"), oi = +btn.getAttribute("data-o");
        selected[qi] = oi;
        D.$$('[data-q="' + qi + '"]', root).forEach(function (b) { b.style.borderColor = ""; b.style.background = ""; });
        btn.style.borderColor = "var(--accent)";
        btn.style.background = "var(--accent-soft)";
        updateCount();
      });
    });
    D.$$("[data-input]", root).forEach(function (inp) {
      inp.addEventListener("input", updateCount);
    });

    D.$("#submitPaper", root).addEventListener("click", function () {
      if (submitted) return;
      submitted = true;
      var score = 0;
      (p.questions || []).forEach(function (q, i) {
        var fb = D.$("#fb" + i, root);
        var ok = false;
        var your = "";
        if (q.type === "mc" || q.type === "tfng") {
          ok = selected[i] === q.a;
          your = selected[i] != null ? (q.options || [])[selected[i]] : "（冇答）";
          D.$$('[data-q="' + i + '"]', root).forEach(function (b) {
            var oi = +b.getAttribute("data-o");
            b.disabled = true;
            if (oi === q.a) b.classList.add("correct");
            if (oi === selected[i] && !ok) b.classList.add("wrong");
          });
        } else {
          var inp = D.$$('[data-input="' + i + '"]', root)[0];
          your = inp ? inp.value : "";
          var accept = [q.a].concat(q.accept || []);
          ok = accept.some(function (a) { return D.normAnswer(a) === D.normAnswer(your); });
          if (inp) {
            inp.disabled = true;
            inp.style.borderBottomColor = ok ? "var(--good)" : "var(--bad)";
            inp.style.color = ok ? "var(--good)" : "var(--bad)";
          }
        }
        if (ok) score++;
        fb.hidden = false;
        fb.innerHTML = "<b>" + (ok ? "✓ 正確" : "✗ 唔啱") + "</b> " +
          (q.type === "mc" || q.type === "tfng" ? "答案：" + D.esc((q.options || [])[q.a]) + "。" : "答案：" + D.esc(q.a) + "。") +
          "<div class=\"small muted\" style=\"margin-top:3px\">" + D.esc(q.why || "") + "</div>";
        fb.style.borderLeftColor = ok ? "var(--good)" : "var(--bad)";
      });

      var total = (p.questions || []).length;
      var pct = Math.round(score / total * 100);
      var done = (D.state.reading.done || []).indexOf(p.id) === -1;
      if (done) { D.state.reading.done.push(p.id); }
      D.state.reading.best[p.id] = Math.max(D.state.reading.best[p.id] || 0, score);
      D.save();
      D.award(done ? 15 : 5, "reading", 1);

      D.$("#resultBox", root).innerHTML = '<div class="card center"><div class="eyebrow" style="justify-content:center">SCORE</div>' +
        '<div style="font-family:var(--font-display);font-size:52px;line-height:1">' + score + '<span class="muted" style="font-size:20px"> / ' + total + "</span></div>" +
        '<p class="muted">正確率 ' + pct + "% · " + (pct >= 70 ? "呢個 level 你已經穩，可以試下一篇。" : pct >= 50 ? "合格邊緣，逐題睇返解釋。" : "唔好灰，先將錯題寫入錯題簿。") + "</p>" +
        '<div class="btn-row" style="justify-content:center;margin-top:14px">' +
        '<a class="btn soft" href="#/reading">返去閱讀</a>' +
        '<button class="btn primary" id="retryReading">再做一次</button></div></div>';
      D.$("#retryReading", root).addEventListener("click", function () { D.views.readingPassage(root, id); });
      D.$("#resultBox", root).scrollIntoView({ behavior: "smooth", block: "start" });
      D.toast("完成 +" + (done ? 15 : 5) + " XP");
    });
  };

  /* ------------------------------------------------------------
     LISTENING
     ------------------------------------------------------------ */
  D.views.listening = function (root) {
    var tab = D.views._listeningTab || "strategy";
    var ov = D.listening.overview || {};
    var tabs = [["strategy", "策略 + 陷阱"], ["drill", "耳朵操練"], ["integrated", "綜合能力"], ["mock", "擬真題"]];
    var tabHTML = '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab ' + (tab === t[0] ? "active" : "") + '" data-ltab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var head = '<div class="page-head"><div class="eyebrow">Listening · 30%</div>' +
      '<h1 class="page-title">Paper 3 係你最應該花時間嘅一份。</h1>' +
      '<p class="page-lede">佔分最高（30%），而且題型固定。數字、串字、格式呢啲「唔識英文都執到」嘅分，全部要拎盡。</p></div>';

    var body = "";

    if (tab === "strategy") {
      body = '<div class="grid cols-2" style="margin-bottom:20px">' +
        '<div class="card"><div class="card-title-sm">卷嘅結構</div><p class="small" style="margin-top:8px">' + D.esc(ov.format || "") + "</p>" +
        '<p class="small" style="margin-top:8px"><b>Part A：</b>' + D.esc(ov.partA || "") + "</p>" +
        '<p class="small" style="margin-top:8px"><b>Part B：</b>' + D.esc(ov.partB || "") + "</p>" +
        '<p class="small" style="margin-top:8px"><b>評分：</b>' + D.esc(ov.marking || "") + "</p></div>" +
        '<div class="card"><div class="card-title-sm">8 條黃金規則</div><ul class="check-list" style="margin-top:8px">' +
        (ov.goldenRules || []).map(function (r) { return "<li>" + D.esc(r) + "</li>"; }).join("") + "</ul></div></div>" +

        '<h2 style="margin:26px 0 12px">10 個陷阱</h2>' +
        (D.listening.traps || []).map(function (t) {
          return '<details class="acc"><summary><span class="badge hot">' + D.esc(t.name) + "</span> " + D.esc(t.zh).slice(0, 50) + "</summary>" +
            '<div class="acc-body"><p>' + D.esc(t.zh) + "</p>" +
            (t.examples && t.examples.length ? '<div class="callout" style="margin-top:10px"><span class="ci">▸</span><div><b>例：</b>' +
              t.examples.map(function (e) { return "<div class=\"small\">" + D.esc(e) + "</div>"; }).join("") + "</div></div>" : "") +
            '<div class="callout good" style="margin-top:10px"><span class="ci">✓</span><div><b>點應付：</b>' + D.esc(t.fix) + "</div></div></div></details>";
        }).join("");
    }

    if (tab === "drill") {
      body = '<div class="grid cols-3" style="margin-bottom:18px">' +
        '<button class="tool-tile" data-drill="number" style="text-align:left"><span class="ti">123</span><b>數字 / 價錢 / 時間</b><span>15 題 · 用 TTS 播放</span></button>' +
        '<button class="tool-tile" data-drill="spell" style="text-align:left"><span class="ti">Aa</span><b>串字聽寫</b><span>15 個 DSE 常串錯字</span></button>' +
        '<button class="tool-tile" data-drill="sentence" style="text-align:left"><span class="ti">¶</span><b>句子聽寫</b><span>8 句 · 練手速同記憶</span></button></div>' +
        '<div class="callout warn" style="margin-bottom:16px"><span class="ci">!</span><div><b>用耳機。</b>呢度用瀏覽器內建語音，唔係真人錄音，但練數字、串字、捕捉關鍵字一樣有效。</div></div>' +
        '<div id="drillMount"></div>';
    }

    if (tab === "integrated") {
      var ig = D.listening.integrated || {};
      body = '<div class="grid cols-2" style="align-items:start">' +
        '<div class="card"><div class="card-title-sm">7 步流程</div><ol class="num-list" style="margin-top:12px">' +
        (ig.workflow || []).map(function (s) { return "<li>" + D.esc(s) + "</li>"; }).join("") + "</ol></div>" +
        '<div class="card"><div class="card-title-sm">交卷前檢查</div><ul class="check-list" style="margin-top:12px">' +
        (ig.checklist || []).map(function (s) { return "<li>" + D.esc(s) + "</li>"; }).join("") + "</ul>" +
        '<div class="callout tip" style="margin-top:14px"><span class="ci">◎</span><div><b>最易執嘅分：</b>格式（email 有 subject、report 有 heading）、覆蓋所有 requirements、冇抄錯數字。</div></div></div></div>' +
        '<h2 style="margin:26px 0 12px">6 種文體</h2>' +
        (ig.textTypes || []).map(function (t) {
          return '<details class="acc"><summary><b>' + D.esc(t.name) + "</b></summary><div class=\"acc-body\">" +
            '<div class="card-title-sm">段落動作</div><ul class="plain-list" style="margin:6px 0 14px">' +
            (t.moves || []).map(function (m) { return "<li>" + D.esc(m) + "</li>"; }).join("") + "</ul>" +
            '<div class="card-title-sm">句式</div><ul class="plain-list" style="margin-top:6px">' +
            (t.phrases || []).map(function (p) { return "<li>" + D.esc(p) + "</li>"; }).join("") + "</ul></div></details>";
        }).join("");
    }

    if (tab === "mock") {
      body = '<div class="card dark"><div class="card-title-sm" style="color:var(--sidebar-mut)">擬真題庫</div>' +
        "<h3 style=\"margin:6px 0 6px\">Paper 3 全卷練習（Level 1–2）</h3>" +
        '<p style="color:#c9c3b7;font-size:14px">6 個 Part A 聆聽 task + 4 個 Part B 綜合 task，全部原創、難度對應 Level 1–2。有 TTS 播放、答案同解釋。</p>' +
        '<div class="btn-row" style="margin-top:14px"><a class="btn primary" href="#/pastpaper/3">去 Paper 3 練習</a></div></div>' +
        '<div class="grid cols-2" style="margin-top:16px">' +
        '<div class="card"><b>點做先有效</b><ul class="num-list" style="margin-top:10px"><li>先做 Level 1，計時。</li><li>對答案，圈出「聽到但寫錯」同「完全聽唔到」。</li><li>再聽一次，今次睇 transcript 跟住聽。</li><li>將串錯嘅字寫入錯題簿。</li></ul></div>' +
        '<div class="card"><b>唔好做嘅事</b><ul class="plain-list" style="margin-top:10px"><li>唔好聽一次就對答案，浪費咗個 task。</li><li>唔好淨係聽唔寫，考試係邊聽邊寫。</li><li>唔好不停重播，逼自己一次過捉重點。</li></ul></div></div>';
    }

    root.innerHTML = head + tabHTML + body;

    D.$$("[data-ltab]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.views._listeningTab = b.getAttribute("data-ltab");
        D.views.listening(root);
      });
    });

    D.$$("[data-drill]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var kind = b.getAttribute("data-drill");
        var mount = D.$("#drillMount", root);
        if (!mount) return;
        var items = [];
        if (kind === "number") {
          items = D.sample(D.listening.numberDrill || [], 15).map(function (x) {
            return { say: x.say, answer: x.answer, type: x.type, why: "" };
          });
          D.mountDictation(mount, items, { label: "數字 / 價錢 / 時間" });
        } else if (kind === "spell") {
          items = D.sample(D.listening.spelling || [], 15).map(function (w) {
            return { say: w, answer: w, type: "word", why: "" };
          });
          D.mountDictation(mount, items, { label: "串字聽寫" });
        } else {
          items = D.sample(D.listening.dictation || [], 8).map(function (x) {
            return { say: x.say, answer: x.answer, type: "sentence", why: "" };
          });
          D.mountDictation(mount, items, { label: "句子聽寫" });
        }
        mount.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  /* ------------------------------------------------------------
     SPEAKING
     ------------------------------------------------------------ */
  D.views.speaking = function (root) {
    var tab = D.views._speakingTab || "phrases";
    var ov = D.speaking.overview || {};
    var tabs = [["phrases", "句式庫"], ["practice", "模擬練習"], ["pron", "讀音 + 常錯"]];
    var tabHTML = '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab ' + (tab === t[0] ? "active" : "") + '" data-stab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var head = '<div class="page-head"><div class="eyebrow">Speaking · 10%</div>' +
      '<h1 class="page-title">最易執分嘅一份卷，但你一直避開。</h1>' +
      '<p class="page-lede">10% 唔多，但係短時間內可以由 Level 1 跳到 Level 3。關鍵唔係用深字，係<b>肯講、有回應、唔好靜</b>。</p></div>';

    var body = "";

    if (tab === "phrases") {
      body = '<div class="grid cols-2" style="margin-bottom:20px">' +
        '<div class="card"><div class="card-title-sm">考試形式</div><p class="small" style="margin-top:8px">' + D.esc(ov.format || "") + "</p>" +
        '<p class="small" style="margin-top:8px"><b>時間：</b>' + D.esc(ov.timing || "") + "</p></div>" +
        '<div class="card"><div class="card-title-sm">黃金規則</div><ul class="check-list" style="margin-top:8px">' +
        (ov.goldenRules || []).map(function (r) { return "<li>" + D.esc(r) + "</li>"; }).join("") + "</ul></div></div>" +
        ((ov.marking || []).length ? '<div class="card" style="margin-bottom:18px"><div class="card-title-sm">評分標準</div><div class="grid cols-2" style="margin-top:10px">' +
          ov.marking.map(function (m) {
            return '<div><b class="small">' + D.esc(m.name) + '</b><p class="tiny muted" style="margin:2px 0 0">' + D.esc(m.zh) + "</p>" +
              '<p class="tiny" style="margin:3px 0 0;color:var(--accent-ink)">' + D.esc(m.tip || "") + "</p></div>";
          }).join("") + "</div></div>" : "") +
        (D.speaking.phrases || []).map(function (grp) {
          return '<div class="card" style="margin-bottom:12px"><div class="between"><h3 style="font-size:15px">' + D.esc(grp.fn) + "</h3>" +
            '<button class="btn ghost sm" data-speak-all="' + D.esc((grp.items || []).map(function (x) { return x.en; }).join(". ")) + '">♪ 全部朗讀</button></div>' +
            (grp.zh ? '<p class="tiny muted" style="margin-top:2px">' + D.esc(grp.zh) + "</p>" : "") +
            (grp.items || []).map(function (it) {
              return '<div class="phrase"><div><div class="en">' + D.esc(it.en) + '</div><div class="zh">' + D.esc(it.zh) + "</div></div>" +
                '<button class="spk" data-speak="' + D.esc(it.en) + '" aria-label="朗讀">♪</button></div>';
            }).join("") + "</div>";
        }).join("");
    }

    if (tab === "practice") {
      body = '<div class="grid cols-2" style="align-items:start">' +
        '<div class="card"><div class="card-title-sm">小組討論模擬器</div>' +
        '<div id="topicBox" style="margin-top:12px">' + topicCard(null) + "</div>" +
        '<div class="btn-row" style="margin-top:12px"><button class="btn primary" id="drawTopic">隨機抽題目</button>' +
        '<button class="btn soft" id="nextStage" hidden>下一步</button></div>' +
        '<div id="speakTimer" style="margin-top:16px"></div>' +
        '<div class="callout tip" style="margin-top:14px"><span class="ci">◎</span><div>流程：1 分鐘準備 → 8 分鐘討論 → 每人 1 分鐘個人回應。自己一個練都得，講出聲。</div></div></div>' +

        '<div class="card"><div class="card-title-sm">個人回應（1 分鐘）</div>' +
        '<p class="small muted" style="margin-top:6px">抽一題，準備 15 秒，講 1 分鐘。目標：3 個 point + 一個結尾。</p>' +
        '<button class="btn teal block" id="drawIndividual" style="margin-top:12px">抽一條個人回應題</button>' +
        '<div id="individualBox" style="margin-top:14px"></div></div></div>' +

        '<h2 style="margin:28px 0 12px">14 條練習題目</h2>' +
        '<div class="grid cols-2">' + (D.speaking.topics || []).map(function (t, i) {
          return '<div class="topic-card"><b>' + D.esc(t.topic) + "</b><p class=\"small muted\" style=\"margin:2px 0 0\">" + D.esc(t.zh) + "</p>" +
            '<div class="row tight" style="margin-top:8px"><span class="badge">' + (t.angles || []).length + " 個角度</span>" +
            '<button class="btn ghost sm" data-pick-topic="' + i + '">練呢題</button></div></div>';
        }).join("") + "</div>";
    }

    if (tab === "pron") {
      body = '<div class="grid cols-2" style="align-items:start">' +
        '<div class="card"><div class="card-title-sm">15 個常錯讀音</div><div style="margin-top:8px">' +
        (D.speaking.pronunciation || []).map(function (p) {
          return '<div class="phrase"><div><div class="en">' + D.esc(p.word) + ' <span class="mono muted small">' + D.esc(p.ipa || "") + "</span></div>" +
            '<div class="zh">' + D.esc(p.tip) + "</div></div>" +
            '<button class="spk" data-speak="' + D.esc(p.word) + '">♪</button></div>';
        }).join("") + "</div></div>" +

        '<div class="card"><div class="card-title-sm">10 個常錯句子</div><div style="margin-top:8px">' +
        (D.speaking.commonErrors || []).map(function (e) {
          return '<div style="padding:9px 0;border-bottom:1px dashed var(--line)">' +
            '<div class="small" style="color:var(--bad);text-decoration:line-through">✗ ' + D.esc(e.bad) + "</div>" +
            '<div class="small" style="color:var(--good)">✓ ' + D.esc(e.good) + "</div>" +
            '<div class="tiny muted">' + D.esc(e.why) + "</div></div>";
        }).join("") + "</div></div></div>" +
        '<div class="callout warn" style="margin-top:18px"><span class="ci">!</span><div><b>唔好死咬口音。</b>考官接受香港口音。你要做嘅係講清楚、夠大聲、唔好一路講一路停。</div></div>';
    }

    root.innerHTML = head + tabHTML + body;

    D.$$("[data-stab]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.views._speakingTab = b.getAttribute("data-stab");
        D.views.speaking(root);
      });
    });

    function topicCard(t) {
      if (!t) return '<div class="empty" style="padding:24px"><div class="ei">◍</div><b>未抽題目</b><p>撳下面個掣，隨機抽一條 DSE 風格題目。</p></div>';
      return '<div><span class="badge l2">Discussion</span><h3 style="margin:8px 0 2px">' + D.esc(t.topic) + "</h3>" +
        '<p class="small muted">' + D.esc(t.zh) + "</p>" +
        '<div class="card-title-sm" style="margin-top:12px">可以講嘅角度</div><ul class="plain-list" style="margin-top:6px">' +
        (t.angles || []).map(function (a) { return "<li>" + D.esc(a) + "</li>"; }).join("") + "</ul>" +
        '<div class="row tight" style="margin-top:10px">' + (t.vocab || []).map(function (v) { return '<span class="badge">' + D.esc(v) + "</span>"; }).join("") + "</div></div>";
    }

    var currentTopic = null;
    if (tab === "practice") {
      D.$("#drawTopic", root).addEventListener("click", function () {
        var list = D.speaking.topics || [];
        currentTopic = list[Math.floor(Math.random() * list.length)];
        D.$("#topicBox", root).innerHTML = topicCard(currentTopic);
        D.views._speakingTopic = currentTopic;
        D.mountTimer(D.$("#speakTimer", root), { seconds: 60, label: "準備 1 分鐘", doneMsg: "準備完，開始討論。" });
      });

      D.$$("[data-pick-topic]", root).forEach(function (b) {
        b.addEventListener("click", function () {
          var t = (D.speaking.topics || [])[+b.getAttribute("data-pick-topic")];
          D.views._speakingTopic = t;
          D.$("#topicBox", root).innerHTML = topicCard(t);
          D.mountTimer(D.$("#speakTimer", root), { seconds: 60, label: "準備 1 分鐘", doneMsg: "準備完，開始討論。" });
          D.$("#topicBox", root).scrollIntoView({ behavior: "smooth", block: "center" });
        });
      });

      D.$("#drawIndividual", root).addEventListener("click", function () {
        var list = D.speaking.individualPrompts || [];
        var q = list[Math.floor(Math.random() * list.length)];
        D.$("#individualBox", root).innerHTML = '<div class="callout hl"><span class="ci">◍</span><div><b>' + D.esc(q.q) + "</b>" +
          '<ul class="plain-list" style="margin-top:6px">' + (q.hints || []).map(function (h) { return "<li>" + D.esc(h) + "</li>"; }).join("") + "</ul></div></div>";
        D.mountTimer(D.$("#individualBox", root), { seconds: 60, label: "個人回應 1 分鐘", doneMsg: "時間到。有冇講到 3 個 point？" });
      });

      var mt = D.$("#speakTimer", root);
      if (mt && D.views._speakingTopic) {
        D.$("#topicBox", root).innerHTML = topicCard(D.views._speakingTopic);
      }

      // session counter
      var sess = document.createElement("div");
      sess.style.marginTop = "16px";
      sess.innerHTML = '<button class="btn soft block" id="logSession">我完成咗一次練習 +15 XP</button>';
      D.$("#speakTimer", root).parentNode.appendChild(sess);
      D.$("#logSession", sess).addEventListener("click", function () {
        D.state.speaking.sessions = (D.state.speaking.sessions || 0) + 1;
        D.save(); D.award(15, "speaking", 1, 10);
        D.toast("已記錄 +15 XP");
        D.views.speaking(root);
      });
    }
  };

})();
