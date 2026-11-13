/* ============================================================
   Interactive engines: quiz, flashcards, dictation, timer
   ============================================================ */
(function () {
  "use strict";
  var D = window.DSE;

  function letters(i) { return "ABCD"[i] || String(i + 1); }

  /* ------------------------------------------------------------
     MCQ quiz
     questions: [{ q, options:[], a:index, why, meta }]
     opts: { instant:true, xp:5, kind:'drills', onDone(score,total) }
     ------------------------------------------------------------ */
  D.mountQuiz = function (root, questions, opts) {
    opts = opts || {};
    var instant = opts.instant !== false;
    var i = 0, score = 0, answered = false, picked = [];
    var total = questions.length;

    if (!total) { root.innerHTML = D.emptyState("◌", "未有題目", "遲啲再嚟。"); return; }

    function head() {
      return '<div class="between" style="margin-bottom:6px">' +
        '<span class="badge">第 ' + (i + 1) + " / " + total + " 題</span>" +
        '<span class="small muted">已答對 <b style="color:var(--good)">' + score + "</b> 題</span></div>" +
        '<div class="bar thin" style="margin:8px 0 18px"><i style="width:' + Math.round(i / total * 100) + '%"></i></div>';
    }

    function renderQuestion() {
      var q = questions[i];
      answered = false;
      var html = head() + '<div class="quiz-q">' + q.q + "</div>";
      html += '<div class="options">';
      q.options.forEach(function (o, oi) {
        html += '<button class="opt" data-opt="' + oi + '"><span class="key">' + letters(oi) + "</span><span>" + o + "</span></button>";
      });
      html += "</div><div id=\"qFeedback\"></div>";
      root.innerHTML = html;

      D.$$(".opt", root).forEach(function (btn) {
        btn.addEventListener("click", function () { choose(+btn.getAttribute("data-opt")); });
      });
    }

    function choose(oi) {
      if (answered) return;
      answered = true;
      var q = questions[i];
      var ok = oi === q.a;
      if (ok) score++;
      picked.push(ok);

      D.$$(".opt", root).forEach(function (btn, bi) {
        btn.disabled = true;
        if (bi === q.a) btn.classList.add("correct");
        if (bi === oi && !ok) btn.classList.add("wrong");
      });

      var fb = D.$("#qFeedback", root);
      fb.innerHTML = '<div class="feedback ' + (ok ? "good" : "bad") + '">' +
        "<strong>" + (ok ? "✓ 正確" : "✗ 唔啱") + "</strong> " +
        (q.why ? D.esc(q.why) : ("正確答案係 " + letters(q.a) + "。")) +
        "</div>" +
        '<div class="btn-row" style="margin-top:14px;justify-content:flex-end">' +
        '<button class="btn primary" id="nextQ">' + (i + 1 < total ? "下一題 →" : "睇結果") + "</button></div>";

      D.$("#nextQ", root).addEventListener("click", function () {
        i++;
        if (i >= total) finish(); else renderQuestion();
      });
      D.award(ok ? (opts.xp || 5) : 1, opts.kind || "drills", 1);
    }

    function finish() {
      var pct = Math.round(score / total * 100);
      var msg = pct >= 80 ? "好穩陣，可以繼續下一課。" : pct >= 50 ? "合格水平，錯嘅題目再睇一次解釋。" : "唔好灰，呢個就係你要補嘅位；將錯題寫入錯題簿。";
      root.innerHTML =
        '<div class="center" style="padding:18px 0 4px">' +
        '<div class="eyebrow" style="justify-content:center">RESULT</div>' +
        '<div style="font-family:var(--font-display);font-size:54px;line-height:1">' + score + '<span class="muted" style="font-size:22px"> / ' + total + "</span></div>" +
        '<p class="muted" style="margin-top:8px">' + msg + "</p></div>" +
        '<div class="bar" style="margin:18px 0 8px"><i class="' + (pct >= 60 ? "ok" : "") + '" style="width:' + pct + '%"></i></div>' +
        '<div class="between small muted"><span>正確率 ' + pct + "%</span><span>+" + (opts.xp || 5) * score + " XP</span></div>" +
        '<div class="btn-row" style="margin-top:22px;justify-content:center">' +
        '<button class="btn soft" id="retryQ">再做一次</button>' +
        '<a class="btn primary" href="' + (opts.backHref || "#/grammar") + '">返回</a></div>';

      D.$("#retryQ", root).addEventListener("click", function () {
        i = 0; score = 0; picked = []; renderQuestion();
      });
      if (opts.onDone) opts.onDone(score, total, picked);
      D.toast("完成！+" + (opts.xp || 5) * score + " XP");
    }

    renderQuestion();
  };

  /* ------------------------------------------------------------
     Flashcards
     ------------------------------------------------------------ */
  D.mountFlashcards = function (root, words, opts) {
    opts = opts || {};
    var queue = words.slice();
    var i = 0, flipped = false, known = 0, unknown = 0, awarded = {};
    var again = [];

    if (!queue.length) {
      root.innerHTML = D.emptyState("◌", "冇卡可以溫", "試下去「字庫」揀其他篩選，或者先睇一次字庫。");
      return;
    }

    function card() { return queue[i]; }

    function render() {
      var w = card();
      if (!w) return finish();
      flipped = false;
      var box = (D.state.vocab.boxes[w.w] || 0);
      root.innerHTML =
        '<div class="between" style="max-width:620px;margin:0 auto 4px">' +
        '<span class="badge">' + (i + 1) + " / " + queue.length + "</span>" +
        '<span class="small muted">Box ' + (box || "新") + " · 已睇 " + (D.state.vocab.seen[w.w] || 0) + " 次</span></div>" +
        '<div class="bar thin" style="max-width:620px;margin:8px auto 0"><i style="width:' + Math.round(i / queue.length * 100) + '%"></i></div>' +
        '<div class="flash-stage"><div class="flashcard" id="flash" tabindex="0" role="button" aria-label="翻轉卡片">' +
        '<div class="flash-face front"><div class="flash-pos">' + D.esc(w.pos || "") + "</div>" +
        '<div class="flash-word">' + D.esc(w.w) + "</div>" +
        '<div class="flash-hint">點一下 / 按 Space 睇解釋</div></div>' +
        '<div class="flash-face back"><div class="flash-pos">' + D.esc(w.pos || "") + " · " + D.esc(w.band === 3 ? "Level 3 加分字" : "Level 2 必備") + "</div>" +
        '<div class="flash-back-zh">' + D.esc(w.zh) + "</div>" +
        '<div class="flash-def">' + D.esc(w.def) + "</div>" +
        '<div class="flash-ex">' + D.esc(w.ex) + "</div>" +
        '<div class="flash-col">配搭：' + D.esc(w.col || "—") + "</div></div></div></div>" +
        '<div class="flash-btns"><button class="btn soft" data-rate="0">唔識</button>' +
        '<button class="btn soft" data-rate="1">有印象</button>' +
        '<button class="btn primary" data-rate="2">識</button></div>' +
        '<p class="center tiny faint" style="margin-top:12px">快捷鍵：Space 翻卡 · 1 唔識 · 2 有印象 · 3 識</p>';

      var fc = D.$("#flash", root);
      function flip() { flipped = !flipped; fc.classList.toggle("flipped", flipped); }
      fc.addEventListener("click", flip);
      fc.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
      D.$$("[data-rate]", root).forEach(function (b) {
        b.addEventListener("click", function () { rate(+b.getAttribute("data-rate")); });
      });
      if (!awarded[w.w]) {
        awarded[w.w] = 1;
        D.state.vocab.seen[w.w] = (D.state.vocab.seen[w.w] || 0) + 1;
        D.award(2, "cards", 1);
      }
      D.save();
    }

    function rate(level) {
      var w = card();
      var box = D.state.vocab.boxes[w.w] || 0;
      if (level === 0) { D.state.vocab.boxes[w.w] = 1; unknown++; again.push(w); }
      else if (level === 1) { D.state.vocab.boxes[w.w] = Math.max(2, Math.min(3, box + 1)); known++; }
      else { D.state.vocab.boxes[w.w] = Math.min(5, Math.max(3, box + 1)); known++; }
      D.save();
      i++;
      if (i >= queue.length) finish(); else render();
    }

    function finish() {
      root.innerHTML =
        '<div class="center" style="padding:34px 0 10px">' +
        '<div class="eyebrow" style="justify-content:center">一輪完成</div>' +
        '<div style="font-family:var(--font-display);font-size:46px;line-height:1.1">' + (known + unknown) + " 張</div>" +
        '<p class="muted">識 / 有印象：<b style="color:var(--good)">' + known + "</b> · 唔熟：" + unknown + " 張</p></div>" +
        '<div class="btn-row" style="justify-content:center;margin-top:18px">' +
        (again.length ? '<button class="btn primary" id="againCards">再溫 ' + again.length + " 張唔熟</button>" : "") +
        '<a class="btn soft" href="#/vocab">返回字庫</a></div>';
      var btn = D.$("#againCards", root);
      if (btn) btn.addEventListener("click", function () {
        queue = again.slice(); again = []; i = 0; known = 0; unknown = 0; render();
      });
      D.toast("完成一輪 +" + (known + unknown) * 2 + " XP");
    }

    document.addEventListener("keydown", function handler(e) {
      if (!document.body.contains(root)) { document.removeEventListener("keydown", handler); return; }
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      var fc = D.$("#flash", root);
      if (!fc) return;
      if (e.key === " ") { e.preventDefault(); fc.click(); }
      if (e.key === "1") { var b1 = D.$('[data-rate="0"]', root); if (b1) b1.click(); }
      if (e.key === "2") { var b2 = D.$('[data-rate="1"]', root); if (b2) b2.click(); }
      if (e.key === "3") { var b3 = D.$('[data-rate="2"]', root); if (b3) b3.click(); }
    });

    render();
  };

  /* ------------------------------------------------------------
     Vocabulary quiz builder
     ------------------------------------------------------------ */
  D.vocabQuestions = function (words, n) {
    var pool = words.filter(function (w) { return w && w.zh; });
    if (pool.length < 4) return [];
    var chosen = D.sample(pool, Math.min(n, pool.length));
    var qs = [];
    chosen.forEach(function (w, idx) {
      var type = idx % 3 === 2 ? "cloze" : "meaning";
      var others = D.sample(pool.filter(function (x) { return x.w !== w.w; }), 3);
      if (type === "cloze" && w.ex && new RegExp(D.escapeReg(w.w), "i").test(w.ex)) {
        var sentence = w.ex.replace(new RegExp(D.escapeReg(w.w), "ig"), "____");
        var opts = D.shuffle([w].concat(others).map(function (x) { return x.w; }));
        qs.push({
          q: "揀合適嘅字填入：<br><span class=\"muted\" style=\"font-size:14px\">" + D.esc(sentence) + "</span><br><span class=\"tiny faint\">提示：" + D.esc(w.zh) + "</span>",
          options: opts.map(D.esc),
          a: opts.indexOf(w.w),
          why: w.w + " = " + w.zh + "。" + w.def,
          meta: w
        });
      } else {
        var opts2 = D.shuffle([w].concat(others).map(function (x) { return x.zh; }));
        qs.push({
          q: "<b>" + D.esc(w.w) + "</b> <span class=\"muted small\">(" + D.esc(w.pos) + ")</span> 點解？",
          options: opts2.map(D.esc),
          a: opts2.indexOf(w.zh),
          why: w.w + " = " + w.zh + "。" + w.def,
          meta: w
        });
      }
    });
    return qs;
  };

  /* ------------------------------------------------------------
     Dictation (numbers / spelling / sentences)
     ------------------------------------------------------------ */
  function norm(s) {
    return String(s == null ? "" : s).toLowerCase()
      .replace(/[,\u3001]/g, "")
      .replace(/[.!?;:'"“”‘’()\-–—]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  D.normAnswer = norm;

  D.mountDictation = function (root, items, opts) {
    opts = opts || {};
    var i = 0, score = 0, checked = false;
    if (!items.length) { root.innerHTML = D.emptyState("◌", "未有練習", ""); return; }

    function render() {
      var it = items[i];
      checked = false;
      var typeLabel = opts.label || (it.type === "sentence" ? "句子聽寫" : "數字 / 資料聽寫");
      root.innerHTML =
        '<div class="between" style="margin-bottom:8px">' +
        '<span class="badge">' + (i + 1) + " / " + items.length + "</span>" +
        '<span class="small muted">答對 <b style="color:var(--good)">' + score + "</b></span></div>" +
        '<div class="bar thin" style="margin-bottom:20px"><i style="width:' + Math.round(i / items.length * 100) + '%"></i></div>' +
        '<div class="card" style="text-align:center">' +
        '<div class="card-title-sm">' + D.esc(typeLabel) + "</div>" +
        '<div style="margin:16px 0 20px"><button class="btn primary lg" id="playBtn">▶ 播放</button> ' +
        '<button class="btn soft" id="playSlow">慢速再播</button></div>' +
        '<div class="field" style="text-align:left;max-width:420px;margin:0 auto">' +
        '<label for="dictInput">你聽到嘅答案</label>' +
        '<input class="input mono" id="dictInput" autocomplete="off" spellcheck="false" placeholder="' + (it.type === "sentence" ? "輸入完整句子" : "輸入答案") + '">' +
        "</div>" +
        '<div class="btn-row" style="justify-content:center;margin-top:16px">' +
        '<button class="btn primary" id="checkBtn">對答案</button></div>' +
        '<div id="dictFb" style="margin-top:16px"></div></div>';

      var input = D.$("#dictInput", root);
      D.$("#playBtn", root).addEventListener("click", function () { D.speak(it.say); });
      D.$("#playSlow", root).addEventListener("click", function () { D.speak(it.say, { rate: 0.7 }); });
      D.$("#checkBtn", root).addEventListener("click", check);
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); check(); } });
      D.speak(it.say);
    }

    function check() {
      if (checked) { next(); return; }
      checked = true;
      var it = items[i];
      var v = D.$("#dictInput", root).value;
      var accept = [it.answer].concat(it.accept || []);
      var ok = accept.some(function (a) { return norm(a) === norm(v); });
      if (ok) { score++; D.award(3, "listening", 1); }
      else D.award(0, "listening", 1);
      var fb = D.$("#dictFb", root);
      fb.innerHTML = '<div class="feedback ' + (ok ? "good" : "bad") + '">' +
        "<strong>" + (ok ? "✓ 正確" : "✗ 再聽一次") + "</strong><br>" +
        "正確答案：<b>" + D.esc(it.answer) + "</b>" +
        (it.why ? '<div class="small muted" style="margin-top:6px">' + D.esc(it.why) + "</div>" : "") +
        "</div>" +
        '<div class="btn-row" style="justify-content:center;margin-top:12px">' +
        '<button class="btn primary" id="nextD">' + (i + 1 < items.length ? "下一題 →" : "睇結果") + "</button></div>";
      D.$("#nextD", root).addEventListener("click", next);
      D.$("#checkBtn", root).textContent = "下一題";
      D.$("#checkBtn", root).onclick = next;
    }

    function next() {
      i++;
      if (i >= items.length) finish(); else render();
    }

    function finish() {
      var pct = Math.round(score / items.length * 100);
      root.innerHTML =
        '<div class="center" style="padding:24px 0">' +
        '<div class="eyebrow" style="justify-content:center">DICTATION DONE</div>' +
        '<div style="font-family:var(--font-display);font-size:50px;line-height:1">' + score + '<span class="muted" style="font-size:20px"> / ' + items.length + "</span></div>" +
        '<p class="muted">正確率 ' + pct + "% · " + (pct >= 80 ? "耳朵幾好，繼續。" : "串字同數字要再練。") + "</p></div>" +
        '<div class="btn-row" style="justify-content:center">' +
        '<button class="btn soft" id="againD">再練一次</button>' +
        '<a class="btn primary" href="#/listening">返回聆聽</a></div>';
      D.$("#againD", root).addEventListener("click", function () { i = 0; score = 0; render(); });
      if (opts.onDone) opts.onDone(score, items.length);
    }

    render();
  };

  /* ------------------------------------------------------------
     Timer
     ------------------------------------------------------------ */
  D.mountTimer = function (root, opts) {
    opts = opts || {};
    var total = opts.seconds || 300;
    var left = total, running = false, tick = null, done = false;

    root.innerHTML =
      '<div class="timer-card">' +
      '<div class="timer-label">' + D.esc(opts.label || "計時器") + "</div>" +
      '<div class="timer" id="timerDisplay">' + fmt(left) + "</div>" +
      '<div class="btn-row" style="justify-content:center;margin-top:18px">' +
      '<button class="btn primary" id="timerStart">開始</button>' +
      '<button class="btn soft" id="timerReset">重設</button>' +
      "</div>" +
      (opts.presets ? '<div class="btn-row" style="justify-content:center;margin-top:10px" id="presets">' + opts.presets.map(function (p) {
        return '<button class="btn ghost sm" data-sec="' + p.seconds + '">' + D.esc(p.label) + "</button>";
      }).join("") + "</div>" : "") +
      "</div>";

    function fmt(s) {
      s = Math.max(0, s);
      var m = Math.floor(s / 60), x = s % 60;
      return String(m).padStart(2, "0") + ":" + String(x).padStart(2, "0");
    }
    function paint() {
      var el = D.$("#timerDisplay", root);
      if (!el) return;
      el.textContent = fmt(left);
      el.classList.toggle("warn", left <= 30 && left > 0);
      el.classList.toggle("done", left <= 0);
    }
    function stop() { if (tick) { clearInterval(tick); tick = null; } running = false; var b = D.$("#timerStart", root); if (b) b.textContent = "繼續"; }
    function start() {
      if (running) { stop(); return; }
      if (left <= 0) return;
      running = true;
      D.$("#timerStart", root).textContent = "暫停";
      tick = setInterval(function () {
        left--;
        paint();
        if (left <= 0) {
          stop();
          D.$("#timerStart", root).textContent = "開始";
          D.toast(opts.doneMsg || "時間到！");
          if (opts.onDone) opts.onDone();
        }
      }, 1000);
    }
    D.$("#timerStart", root).addEventListener("click", start);
    D.$("#timerReset", root).addEventListener("click", function () {
      stop(); left = total; done = false; paint();
      var b = D.$("#timerStart", root); if (b) b.textContent = "開始";
    });
    if (opts.presets) {
      D.$$("#presets [data-sec]", root).forEach(function (b) {
        b.addEventListener("click", function () {
          stop(); total = +b.getAttribute("data-sec"); left = total; paint();
          var s = D.$("#timerStart", root); if (s) s.textContent = "開始";
        });
      });
    }
    paint();

    // clean the interval when the view is replaced
    var observer = new MutationObserver(function () {
      if (!document.body.contains(root)) { if (tick) clearInterval(tick); observer.disconnect(); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  /* ------------------------------------------------------------
     Small helper: word count for writing
     ------------------------------------------------------------ */
  D.wordCount = function (text) {
    var t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(function (x) { return /[A-Za-z0-9]/.test(x); }).length;
  };

})();
