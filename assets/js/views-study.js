/* ============================================================
   Views: grammar, vocabulary, writing
   ============================================================ */
(function () {
  "use strict";
  var D = window.DSE;
  D.views = D.views || {};

  // stable ids for writing prompts
  (D.writing.prompts || []).forEach(function (p, i) { if (!p._id) p._id = p.id || "wp" + i; });
  D.promptById = function (id) {
    return (D.writing.prompts || []).filter(function (p) { return p._id === id; })[0];
  };

  /* ------------------------------------------------------------
     GRAMMAR
     ------------------------------------------------------------ */
  D.views.grammar = function (root) {
    var p = D.progress();
    var rows = (D.grammar || []).map(function (g, i) {
      var c = (D.state.grammar.correct[g.id] || []).length;
      var total = (g.drills || []).length;
      var done = c >= total && total > 0;
      return '<a class="card tight" href="#/grammar/' + g.id + '" style="text-decoration:none;color:inherit;display:block">' +
        '<div class="between" style="margin-bottom:8px"><span class="badge">' + (i + 1) + "</span>" +
        (done ? '<span class="badge good">完成</span>' : '<span class="badge">' + c + "/" + total + "</span>") + "</div>" +
        "<h3 style=\"font-size:15px;line-height:1.35\">" + D.esc(g.title) + "</h3>" +
        '<p class="small muted" style="margin-top:4px">' + D.esc(g.zh) + "</p>" +
        '<div class="bar thin" style="margin-top:10px"><i class="' + (done ? "ok" : "") + '" style="width:' + Math.round(c / Math.max(1, total) * 100) + '%"></i></div></a>';
    }).join("");

    root.innerHTML =
      '<div class="page-head"><div class="eyebrow">Grammar clinic</div>' +
      '<h1 class="page-title">唔使學晒英文文法，只學你會錯嘅。</h1>' +
      '<p class="page-lede">呢 21 課係 Level 1 學生最常失分嘅位。每課 5–8 分鐘，做完即刻知點解錯。<b>目標：每課 4 題全對。</b></p></div>' +

      '<div class="card tight" style="margin-bottom:22px"><div class="between">' +
      '<div><span class="small muted">已完成 </span><b style="font-size:20px">' + p.grammarDone + " / " + p.grammarTotal + "</b></div>" +
      '<span class="small muted">文法佔你寫作同綜合能力嘅底分</span></div>' +
      '<div class="bar" style="margin-top:10px"><i style="width:' + Math.round(p.grammarDone / Math.max(1, p.grammarTotal) * 100) + '%"></i></div></div>' +

      '<div class="grid cols-3">' + rows + "</div>" +
      '<div class="callout tip" style="margin-top:24px"><span class="ci">◎</span><div><b>正確用法：</b>做完一課唔好即刻跳去下一課。先睇一次「錯題解釋」，再用自己嘅字作一句。寫得出，先算識。</div></div>';
  };

  D.views.grammarTopic = function (root, id) {
    var g = D.topicById(id);
    if (!g) { root.innerHTML = D.emptyState("◌", "搵唔到呢一課", ""); return; }
    var idx = D.grammar.indexOf(g);
    var prev = D.grammar[idx - 1], next = D.grammar[idx + 1];
    var c = (D.state.grammar.correct[g.id] || []).length;

    var h = '<a class="small" href="#/grammar">← 返去文法診所</a>' +
      '<div class="page-head" style="margin-top:14px"><div class="eyebrow">Topic ' + (idx + 1) + " / " + D.grammar.length + "</div>" +
      '<h1 class="page-title" style="font-size:clamp(26px,3.5vw,38px)">' + D.esc(g.title) + "</h1>" +
      '<p class="page-lede">' + D.esc(g.zh) + "</p></div>" +

      '<div class="callout warn" style="margin-bottom:22px"><span class="ci">!</span><div><b>點解重要：</b>' + D.esc(g.why) + "</div></div>" +

      '<div class="card"><div class="card-title-sm">規則</div>';

    (g.rules || []).forEach(function (r) {
      h += '<div class="rule"><h4>' + D.esc(r.h) + "</h4><p class=\"small\">" + D.esc(r.p) + "</p>" +
        '<div class="eg"><div class="eg-col good"><span class="lab">✓ 正確</span><ul>' +
        (r.good || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="eg-col bad"><span class="lab">✗ 錯</span><ul>' +
        (r.bad || []).map(function (x) { return "<li>" + D.esc(x) + "</li>"; }).join("") + "</ul></div></div></div>";
    });

    h += "</div>";

    if (g.traps && g.traps.length) {
      h += '<div class="card" style="margin-top:16px"><div class="card-title-sm">香港學生最常中嘅陷阱</div><ul class="plain-list" style="margin-top:10px">' +
        g.traps.map(function (t) { return "<li>" + D.esc(t) + "</li>"; }).join("") + "</ul></div>";
    }

    h += '<div class="card" style="margin-top:22px"><div class="between" style="margin-bottom:6px">' +
      '<div><div class="card-title-sm">即刻練</div><h3 style="margin:2px 0 0">' + (g.drills || []).length + " 條題目</h3></div>" +
      '<span class="badge">已答對 ' + c + " / " + (g.drills || []).length + "</span></div>" +
      '<div id="drillMount" style="margin-top:14px"></div></div>';

    h += '<div class="between" style="margin-top:22px">' +
      (prev ? '<a class="btn soft" href="#/grammar/' + prev.id + '">← ' + D.esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="btn primary" href="#/grammar/' + next.id + '">' + D.esc(next.title) + " →</a>" : '<a class="btn primary" href="#/grammar">完成，返去列表</a>') +
      "</div>";

    root.innerHTML = h;

    D.mountQuiz(D.$("#drillMount", root), (g.drills || []).map(function (d) {
      return { q: D.esc(d.q), options: (d.options || []).map(D.esc), a: d.a, why: d.why };
    }), {
      instant: true, xp: 5, kind: "drills", backHref: "#/grammar",
      onDone: function (score, total, picked) {
        var arr = D.state.grammar.correct[g.id] || [];
        picked.forEach(function (ok, i) { if (ok && arr.indexOf(i) === -1) arr.push(i); });
        D.state.grammar.correct[g.id] = arr;
        if (arr.length >= total && (D.state.grammar.done || []).indexOf(g.id) === -1) {
          D.state.grammar.done.push(g.id);
          D.toast("呢一課完成！");
        }
        D.state.grammar.attempts = (D.state.grammar.attempts || 0) + total;
        D.state.grammar.correctCount = (D.state.grammar.correctCount || 0) + score;
        D.save();
        var badge = root.querySelector(".badge");
        if (badge) badge.textContent = "已答對 " + arr.length + " / " + total;
      }
    });
  };

  /* ------------------------------------------------------------
     VOCABULARY
     ------------------------------------------------------------ */
  D.views.vocab = function (root) {
    var tab = D.views._vocabTab || "cards";
    var seen = Object.keys(D.state.vocab.seen || {}).length;
    var boxes = D.state.vocab.boxes || {};
    var due = D.vocab.filter(function (v) { return (boxes[v.w] || 0) < 3; }).length;

    var tabs = [["cards", "學習卡"], ["quiz", "測驗"], ["list", "字庫"]];
    var tabHTML = '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab ' + (tab === t[0] ? "active" : "") + '" data-vtab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var body = "";

    if (tab === "cards") {
      body =
        '<div class="grid cols-3" style="margin-bottom:20px">' +
        '<div class="stat"><div class="k">已睇過</div><div class="v">' + seen + "</div><div class=\"s\">共 " + D.vocab.length + " 個字</div></div>" +
        '<div class="stat"><div class="k">需要重溫</div><div class="v">' + due + "</div><div class=\"s\">Box 1–2</div></div>" +
        '<div class="stat"><div class="k">測驗最佳</div><div class="v">' + (D.state.vocab.quizBest || 0) + "</div><div class=\"s\">每輪 10 題</div></div></div>" +

        '<div class="card"><div class="card-title-sm">開始一輪</div>' +
        '<div class="grid cols-2" style="margin-top:12px;align-items:end">' +
        '<div class="field" style="margin:0"><label>揀邊啲字</label><select class="select" id="cardFilter">' +
        '<option value="due">需要重溫優先（Box 1–2）</option>' +
        '<option value="new">未睇過</option>' +
        '<option value="all">全部</option></select></div>' +
        '<div class="field" style="margin:0"><label>一輪幾多張</label><select class="select" id="cardCount">' +
        '<option value="10">10 張（約 4 分鐘）</option><option value="20">20 張（約 8 分鐘）</option><option value="30">30 張</option></select></div></div>' +
        '<button class="btn primary lg block" id="startCards" style="margin-top:14px">開始學習卡</button>' +
        '<p class="tiny faint center" style="margin-top:10px">唔識 = 跌返 Box 1；識 = 升 Box。Box 5 就唔會再煩你。</p></div>' +
        '<div id="cardMount" style="margin-top:18px"></div>';
    }

    if (tab === "quiz") {
      body =
        '<div class="card"><div class="between"><div><div class="card-title-sm">10 題快測</div>' +
        '<h3 style="margin:4px 0 2px">字義 + 句子填空</h3>' +
        '<p class="small muted">隨機抽 10 個字。答錯會即刻解釋。最佳成績：<b>' + (D.state.vocab.quizBest || 0) + "/10</b></p></div>" +
        '<button class="btn primary" id="startQuiz">開始測驗</button></div></div>' +
        '<div id="quizMount" style="margin-top:18px"></div>';
    }

    if (tab === "list") {
      var tags = {};
      D.vocab.forEach(function (v) { tags[v.tag] = (tags[v.tag] || 0) + 1; });
      body =
        '<div class="card tight" style="margin-bottom:16px"><div class="row">' +
        '<div class="search" style="flex:1;min-width:200px"><input class="input" id="wordSearch" placeholder="搜尋英文或中文…" autocomplete="off"></div>' +
        '<select class="select" id="tagFilter" style="width:auto"><option value="">所有主題</option>' +
        Object.keys(tags).map(function (t) { return '<option value="' + D.esc(t) + '">' + D.esc(t) + " (" + tags[t] + ")</option>"; }).join("") + "</select>" +
        '<select class="select" id="boxFilter" style="width:auto"><option value="">所有狀態</option>' +
        '<option value="new">未睇過</option><option value="low">Box 1–2</option><option value="high">Box 3–5</option></select>' +
        '<span class="small muted" id="wordCount">' + D.vocab.length + " 個字</span></div></div>" +
        '<div class="word-grid" id="wordGrid"></div>';
    }

    root.innerHTML =
      '<div class="page-head"><div class="eyebrow">Vocabulary · ' + D.vocab.length + " words</div>" +
      '<h1 class="page-title">唔好背字典，背會考嘅字。</h1>' +
      '<p class="page-lede">' + D.vocab.length + " 個 DSE 高頻字，全部有中文解釋、例句同配搭。用學習卡重複三次，好過一次過死背 100 個。</p></div>" +
      tabHTML + body;

    D.$$("[data-vtab]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.views._vocabTab = b.getAttribute("data-vtab");
        D.views.vocab(root);
      });
    });

    if (tab === "cards") {
      D.$("#startCards", root).addEventListener("click", function () {
        var f = D.$("#cardFilter", root).value;
        var n = +D.$("#cardCount", root).value;
        var pool = D.vocab.filter(function (v) {
          var b = boxes[v.w] || 0;
          if (f === "due") return b < 3;
          if (f === "new") return !D.state.vocab.seen[v.w];
          return true;
        });
        if (!pool.length) pool = D.vocab.slice();
        var picked = D.sample(pool, Math.min(n, pool.length));
        var mount = D.$("#cardMount", root);
        D.mountFlashcards(mount, picked, {});
        mount.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    if (tab === "quiz") {
      D.$("#startQuiz", root).addEventListener("click", function () {
        var qs = D.vocabQuestions(D.vocab, 10);
        D.mountQuiz(D.$("#quizMount", root), qs, {
          instant: true, xp: 3, kind: "cards", backHref: "#/vocab",
          onDone: function (score, total) {
            if (score > (D.state.vocab.quizBest || 0)) D.state.vocab.quizBest = score;
            D.state.vocab.quizCount = (D.state.vocab.quizCount || 0) + 1;
            D.save();
          }
        });
      });
    }

    if (tab === "list") {
      var grid = D.$("#wordGrid", root);
      function draw() {
        var q = D.$("#wordSearch", root).value.trim().toLowerCase();
        var tag = D.$("#tagFilter", root).value;
        var bf = D.$("#boxFilter", root).value;
        var list = D.vocab.filter(function (v) {
          if (tag && v.tag !== tag) return false;
          var b = boxes[v.w] || 0;
          if (bf === "new" && D.state.vocab.seen[v.w]) return false;
          if (bf === "low" && b >= 3) return false;
          if (bf === "high" && b < 3) return false;
          if (!q) return true;
          return (v.w + " " + v.zh + " " + v.def + " " + (v.ex || "")).toLowerCase().indexOf(q) !== -1;
        });
        D.$("#wordCount", root).textContent = list.length + " 個字";
        if (!list.length) { grid.innerHTML = D.emptyState("⌕", "搵唔到", "試下其他關鍵字。"); return; }
        grid.innerHTML = list.map(function (v) {
          return '<div class="word-item"><div class="w">' + D.esc(v.w) + '<span class="pos">' + D.esc(v.pos) + "</span></div>" +
            '<div class="zh">' + D.esc(v.zh) + "</div>" +
            '<div class="ex">' + D.esc(v.ex) + "</div>" +
            '<div class="tagline"><span class="badge">' + D.esc(v.tag) + "</span><span class=\"tiny faint\">Box " + ((boxes[v.w] || "新")) + "</span></div></div>";
        }).join("");
      }
      ["#wordSearch", "#tagFilter", "#boxFilter"].forEach(function (sel) {
        var el = D.$(sel, root);
        el.addEventListener(el.tagName === "INPUT" ? "input" : "change", draw);
      });
      draw();
    }
  };

  /* ------------------------------------------------------------
     WRITING
     ------------------------------------------------------------ */
  D.views.writing = function (root) {
    var tab = D.views._writingTab || "formats";
    var ov = D.writing.overview || {};
    var tabs = [["formats", "8 個格式"], ["sentences", "句式庫"], ["prompts", "題目練習"]];
    var tabHTML = '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab ' + (tab === t[0] ? "active" : "") + '" data-wtab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var head = '<div class="page-head"><div class="eyebrow">Writing · 25%</div>' +
      '<h1 class="page-title">寫得簡單而正確，就已經贏一半。</h1>' +
      '<p class="page-lede">Level 2 嘅寫作唔需要深字。需要<b>格式齊、段落清、句子啱</b>。下面 8 個模板直接背，考試換字就得。</p></div>';

    var body = "";

    if (tab === "formats") {
      var ovCard = '<div class="grid cols-2" style="margin-bottom:18px">' +
        '<div class="card"><div class="card-title-sm">兩部分點分工</div>' +
        '<p class="small" style="margin-top:8px"><b>Part A：</b>' + D.esc(ov.partA || "") + "</p>" +
        '<p class="small" style="margin-top:8px"><b>Part B：</b>' + D.esc(ov.partB || "") + "</p></div>" +
        '<div class="card"><div class="card-title-sm">評分標準（Content + Language）</div>' +
        (ov.marking || []).map(function (m) {
          return '<div style="margin-top:10px"><b class="small">' + D.esc(m.name) + '</b> <span class="small muted">' + D.esc(m.zh) + "</span>" +
            '<div class="tiny muted" style="margin-top:2px">' + D.esc(m.tip) + "</div></div>";
        }).join("") + "</div></div>";

      var cards = (D.writing.formats || []).map(function (f) {
        var done = (D.state.writing.formats || []).indexOf(f.id) !== -1;
        return '<a class="card tight" href="#/writing/' + f.id + '" style="text-decoration:none;color:inherit;display:block">' +
          '<div class="between" style="margin-bottom:6px"><span class="badge ' + (done ? "good" : "") + '">' + (done ? "已練習" : "模板") + "</span>" +
          '<span class="tiny faint">' + D.esc(f.wordcount || "") + "</span></div>" +
          "<h3 style=\"font-size:16px\">" + D.esc(f.name) + "</h3>" +
          '<p class="small muted" style="margin-top:4px">' + D.esc(f.when) + "</p></a>";
      }).join("");

      body = ovCard + '<div class="grid cols-3" style="margin-bottom:22px">' + cards + "</div>" +
        '<div class="callout hl"><span class="ci">◎</span><div><b>背模板嘅正確方法：</b>唔好逐字背。背「段落功能」——第一段做咩、第二段做咩、結尾做咩。到考場換上題目嘅內容。</div></div>';
    }

    if (tab === "sentences") {
      var groups = {};
      (D.writing.sentenceBank || []).forEach(function (s) {
        (groups[s.fn] = groups[s.fn] || []).push(s);
      });
      body = '<div class="callout tip" style="margin-bottom:18px"><span class="ci">◎</span><div>每個功能記 1–2 句就夠。考試用得到先算你識 —— 唔好背 30 句但一句都唔敢用。</div></div>';
      Object.keys(groups).forEach(function (fn) {
        body += '<div class="card" style="margin-bottom:12px"><div class="card-title-sm">' + D.esc(fn) + "</div>" +
          groups[fn].map(function (s) {
            return '<div class="phrase"><div><div class="en">' + D.esc(s.en) + '</div><div class="zh">' + D.esc(s.zh) + "</div>" +
              (s.ex ? '<div class="tiny muted" style="margin-top:2px">例：' + D.esc(s.ex) + "</div>" : "") + "</div></div>";
          }).join("") + "</div>";
      });
    }

    if (tab === "prompts") {
      body = '<div class="callout warn" style="margin-bottom:18px"><span class="ci">!</span><div><b>一定要計時。</b>唔計時寫得幾好都冇用，因為考場唔會等你。Part A 45 分鐘、Part B 75 分鐘。</div></div>' +
        '<div class="grid cols-2">' + (D.writing.prompts || []).map(function (p) {
          var draft = (D.state.writing.drafts || {})[p._id];
          return '<a class="pp-card" href="#/write/' + p._id + '" style="text-decoration:none;color:inherit">' +
            '<div class="pp-meta"><span class="badge ' + (p.type === "Part A" ? "l1" : "l2") + '">' + D.esc(p.type) + "</span>" +
            '<span class="badge">' + (p.targetWords || 200) + " 字</span>" +
            (draft ? '<span class="badge good">有草稿</span>' : "") + "</div>" +
            "<b>" + D.esc(p.title) + "</b>" +
            '<span class="small muted">' + D.esc(p.task).slice(0, 110) + "…</span></a>";
        }).join("") + "</div>";
    }

    root.innerHTML = head + tabHTML + body;

    D.$$("[data-wtab]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        D.views._writingTab = b.getAttribute("data-wtab");
        D.views.writing(root);
      });
    });
  };

  D.views.writingFormat = function (root, id) {
    var f = D.formatById(id);
    if (!f) { root.innerHTML = D.emptyState("◌", "搵唔到呢個格式", ""); return; }
    var done = (D.state.writing.formats || []).indexOf(f.id) !== -1;

    var h = '<a class="small" href="#/writing">← 返去寫作</a>' +
      '<div class="page-head" style="margin-top:14px"><div class="eyebrow">Writing template</div>' +
      '<h1 class="page-title" style="font-size:clamp(26px,3.5vw,38px)">' + D.esc(f.name) + "</h1>" +
      '<p class="page-lede">' + D.esc(f.when) + "</p></div>" +
      '<div class="row" style="margin-bottom:18px"><span class="badge">' + D.esc(f.wordcount || "") + "</span>" +
      (done ? '<span class="badge good">已練習</span>' : "") + "</div>" +

      '<div class="card"><div class="card-title-sm">段落結構</div>' +
      '<div class="table-wrap" style="margin-top:12px"><table><thead><tr><th style="width:90px">部分</th><th>寫咩</th></tr></thead><tbody>' +
      (f.structure || []).map(function (s) {
        return "<tr><td><b>" + D.esc(s.part) + "</b></td><td>" + D.esc(s.note) + "</td></tr>";
      }).join("") + "</tbody></table></div></div>" +

      '<div class="card" style="margin-top:16px"><div class="card-title-sm">可以直接用嘅句式</div>' +
      (f.phrases || []).map(function (p) {
        return '<div class="phrase"><div><div class="en">' + D.esc(p.en) + '</div><div class="zh">' + D.esc(p.zh) + "</div></div>" +
          '<button class="spk" data-speak="' + D.esc(p.en) + '" aria-label="朗讀">♪</button></div>';
      }).join("") + "</div>";

    if (f.model) {
      h += '<div class="card" style="margin-top:16px"><div class="between"><div><div class="card-title-sm">範文</div>' +
        "<h3 style=\"margin:2px 0 0\">" + D.esc(f.model.title || "Model answer") + "</h3></div>" +
        '<button class="btn soft sm" id="toggleModel">顯示範文</button></div>' +
        (f.model.task ? '<p class="small muted" style="margin-top:10px">題目：' + D.esc(f.model.task) + "</p>" : "") +
        '<div id="modelBox" hidden style="margin-top:14px;border-top:1px solid var(--line);padding-top:14px">' +
        '<div class="passage">' + D.para(f.model.text) + "</div></div></div>";
    }

    if (f.checklist && f.checklist.length) {
      h += '<div class="card" style="margin-top:16px"><div class="card-title-sm">交卷前檢查</div><ul class="check-list" style="margin-top:10px">' +
        f.checklist.map(function (c) { return "<li>" + D.esc(c) + "</li>"; }).join("") + "</ul></div>";
    }

    h += '<div class="btn-row" style="margin-top:20px">' +
      '<button class="btn primary" id="markDone">' + (done ? "已標記練習過" : "我已經練過呢個格式 +20 XP") + "</button>" +
      '<a class="btn soft" href="#/writing">返去寫作</a></div>';

    root.innerHTML = h;

    var tm = D.$("#toggleModel", root);
    if (tm) tm.addEventListener("click", function () {
      var box = D.$("#modelBox", root);
      box.hidden = !box.hidden;
      tm.textContent = box.hidden ? "顯示範文" : "收起範文";
    });

    D.$("#markDone", root).addEventListener("click", function () {
      if ((D.state.writing.formats || []).indexOf(f.id) === -1) {
        D.state.writing.formats.push(f.id);
        D.save(); D.award(20, "writing", 1);
        D.toast("已記錄 +20 XP");
        D.views.writingFormat(root, id);
      }
    });
  };

  D.views.writePrompt = function (root, id) {
    var p = D.promptById(id);
    if (!p) { root.innerHTML = D.emptyState("◌", "搵唔到題目", ""); return; }
    var draft = (D.state.writing.drafts || {})[p._id] || "";
    var target = p.targetWords || 200;
    var minutes = p.type === "Part A" ? 45 : 75;

    root.innerHTML =
      '<a class="small" href="#/writing">← 返去寫作</a>' +
      '<div class="page-head" style="margin-top:14px"><div class="eyebrow">' + D.esc(p.type) + " · 目標 " + target + " 字</div>" +
      '<h1 class="page-title" style="font-size:clamp(24px,3.2vw,34px)">' + D.esc(p.title) + "</h1></div>" +

      '<div class="grid cols-2" style="align-items:start">' +
      '<div class="card"><div class="card-title-sm">題目</div><p style="margin-top:8px">' + D.esc(p.task) + "</p>" +
      (p.hints && p.hints.length ? '<div class="callout hl" style="margin-top:12px"><span class="ci">◎</span><div><b>提示：</b><ul style="margin:4px 0 0;padding-left:18px">' +
        p.hints.map(function (h) { return "<li>" + D.esc(h) + "</li>"; }).join("") + "</ul></div></div>" : "") +
      '<div class="callout" style="margin-top:12px"><span class="ci">✎</span><div>先花 3 分鐘列點：每段一個 point。唔好一邊想一邊寫。</div></div></div>' +

      '<div class="card"><div id="writeTimer"></div></div></div>' +

      '<div class="card" style="margin-top:16px"><div class="between" style="margin-bottom:8px">' +
      '<div class="card-title-sm">你嘅文章</div>' +
      '<span class="small mono" id="wc">' + D.wordCount(draft) + " / " + target + " 字</span></div>" +
      '<textarea class="textarea" id="draft" style="min-height:300px;font-size:15px;line-height:1.7" placeholder="喺呢度寫…">' + D.esc(draft) + "</textarea>" +
      '<div class="btn-row" style="margin-top:12px"><button class="btn primary" id="saveDraft">儲存草稿</button>' +
      '<button class="btn soft" id="finishWrite">完成呢篇 +20 XP</button>' +
      '<a class="btn ghost" href="#/writing">返回</a></div>' +
      '<p class="tiny faint" style="margin-top:8px">草稿只存喺你部電腦。完成後記得用模板頁嘅 checklist 自己改一次。</p></div>';

    D.mountTimer(D.$("#writeTimer", root), {
      seconds: minutes * 60, label: p.type + " 計時 " + minutes + " 分鐘",
      doneMsg: "時間到。停筆，檢查一次。"
    });

    var ta = D.$("#draft", root);
    ta.addEventListener("input", function () {
      D.$("#wc", root).textContent = D.wordCount(ta.value) + " / " + target + " 字";
    });

    D.$("#saveDraft", root).addEventListener("click", function () {
      D.state.writing.drafts[p._id] = ta.value;
      D.save(); D.toast("草稿已儲存");
    });

    D.$("#finishWrite", root).addEventListener("click", function () {
      D.state.writing.drafts[p._id] = ta.value;
      D.state.writing.prompts = (D.state.writing.prompts || 0) + 1;
      D.save(); D.award(20, "writing", 1);
      var wc = D.wordCount(ta.value);
      D.toast(wc >= target * 0.8 ? "完成 +20 XP" : "完成 +20 XP（字數未夠，下次寫多啲）");
      D.views.writePrompt(root, id);
    });
  };

})();
