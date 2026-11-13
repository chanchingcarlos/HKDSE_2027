/* ============================================================
   拆解所 — question generator
   Deterministic generation so the question bank and progress IDs
   stay stable across reloads. All maths is built from factors,
   then expanded, so the printed answer always matches the question.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- seeded RNG ---------- */
  function rng(seed) {
    var t = (seed >>> 0) || 1;
    return function () {
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function maybe(r, p) { return r() < p; }
  function shuffle(r, arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { t = a % b; a = b; b = t; } var t; return a; }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }
  function isSquare(n) { if (n < 0) return false; var s = Math.round(Math.sqrt(n)); return s * s === n; }
  function sup(n) { return n > 1 ? "<sup>" + n + "</sup>" : ""; }
  function negNum(s) {
    s = String(s);
    if (s.charAt(0) === "−") return s.slice(1);
    if (s.charAt(0) === "-") return s.slice(1);
    return "−" + s;
  }
  function recipNum(s) {
    s = String(s);
    var neg = s.charAt(0) === "−" || s.charAt(0) === "-";
    if (neg) s = s.slice(1);
    var parts = s.split("/");
    var v = parts.length === 2 ? parts[1] + "/" + parts[0] : "1/" + s;
    return (neg ? "−" : "") + v;
  }

  /* ---------- polynomial tools ---------- */
  function T(c, x, y) { return { c: c, x: x || 0, y: y || 0 }; }
  function combine(p) {
    var map = {}, out = [];
    p.forEach(function (t) {
      if (!t.c) return;
      var k = (t.x || 0) + "|" + (t.y || 0);
      if (!map[k]) { map[k] = T(0, t.x, t.y); out.push(map[k]); }
      map[k].c += t.c;
    });
    return out.filter(function (t) { return t.c !== 0; });
  }
  function mul(p, q) {
    var out = [];
    p.forEach(function (a) {
      q.forEach(function (b) {
        out.push(T(a.c * b.c, (a.x || 0) + (b.x || 0), (a.y || 0) + (b.y || 0)));
      });
    });
    return combine(out);
  }
  function expand(factors) {
    return factors.reduce(function (p, f) { return mul(p, f); }, [T(1)]);
  }
  function sortPoly(p) {
    return p.slice().sort(function (a, b) {
      return (b.x + b.y) - (a.x + a.y) || b.x - a.x || b.y - a.y;
    });
  }
  function polyStr(p) {
    p = sortPoly(combine(p));
    if (!p.length) return "0";
    return p.map(function (t, i) {
      var s = "", c = t.c, a = Math.abs(c);
      if (c < 0) s = i === 0 ? "−" : " − ";
      else if (i > 0) s = " + ";
      if (a !== 1 || (!t.x && !t.y)) s += a;
      if (t.x) s += "x" + sup(t.x);
      if (t.y) s += "y" + sup(t.y);
      return s;
    }).join("");
  }
  function factorStr(f) {
    f = combine(f);
    if (!f.length) return "1";
    if (f.length === 1) return polyStr(f);
    return "(" + polyStr(f) + ")";
  }
  function productStr(factors) {
    var filtered = factors.filter(function (f) {
      return !(f.length === 1 && f[0].c === 1 && !f[0].x && !f[0].y);
    });
    var out = "", groups = [];
    filtered.forEach(function (f) {
      var s = factorStr(f);
      var hit = groups.filter(function (g) { return g.s === s; })[0];
      if (hit) hit.n++;
      else groups.push({ s: s, n: 1 });
    });
    groups.forEach(function (g) {
      out += g.s + (g.n > 1 ? sup(g.n) : "");
    });
    return out || "1";
  }
  function monoOf(f) { return f.length === 1 ? f[0] : null; }
  function signedTerm(n) { return n < 0 ? " − " + Math.abs(n) : " + " + n; }
  function bracketStr(f) { return factorStr(f); }

  /* ---------- method generators ---------- */
  function genCommon(r, lv) {
    var templates = lv === 2 ? ["two", "bracket", "negative"] : ["two", "three", "bracket", "negative"];
    var kind = pick(r, templates);

    if (kind === "bracket") {
      var A, C, b;
      do { A = ri(r, 2, 7); C = ri(r, 2, 6); } while (gcd(A, C) !== 1);
      b = maybe(r, 0.25) ? -ri(r, 1, 5) : ri(r, 1, 5);
      var br = [T(1, 1), T(b)];
      var f1 = [T(A)], f2 = [T(C, 1), T(A)];
      var brS = factorStr(br);
      var q = A + brS + " + " + C + "x" + brS;
      if (b < 0) q = A + brS + " + " + C + "x" + brS; // bracket already carries the minus
      var ans = productStr([br, f2]);
      return {
        kind: "factorise", q: q, a: ans, factors: [br, f2],
        steps: [
          "兩項都有共同括號 " + brS + "，可以整個抽出來。",
          "第一項剩 " + A + "，第二項剩 " + C + "x。",
          "答案：" + ans + "。"
        ]
      };
    }

    var g, m, a, b2, p, outer, inside, neg, factors, q2, ans2;
    do { g = ri(r, 2, lv === 2 ? 7 : 9); } while (g === 1);
    m = ri(r, 1, lv === 2 ? 1 : 2);

    if (kind === "negative") {
      do { a = ri(r, 1, 6); b2 = ri(r, 1, 6); } while (gcd(a, b2) !== 1);
      p = pick(r, [1, 3]);
      outer = [T(-g, m)];
      inside = [T(a, p), T(b2)];
      factors = [outer, inside];
    } else if (kind === "three") {
      var c1, disc;
      do {
        a = ri(r, 1, 4); b2 = ri(r, 1, 6); c1 = ri(r, 1, 6);
        disc = b2 * b2 - 4 * a * c1;
      } while (gcd(gcd(a, b2), c1) !== 1 || isSquare(disc) || b2 === 0);
      outer = [T(g, m)];
      inside = [T(a, 2), T(b2, 1), T(c1)];
      factors = [outer, inside];
    } else {
      do { a = ri(r, 1, 7); b2 = ri(r, 1, 7); } while (gcd(a, b2) !== 1);
      p = pick(r, [1, 3]);
      neg = maybe(r, 0.35);
      outer = [T(g, m)];
      inside = [T(a, p), T(neg ? -b2 : b2)];
      factors = [outer, inside];
    }

    q2 = polyStr(expand(factors));
    ans2 = productStr(factors);
    var insideStr = factorStr(inside);
    var outerStr = polyStr(outer);
    var stepHcf = "係數的最大公因數是 " + Math.abs(outer[0].c) + "。";
    var stepVar = "字母取最低次方，公因數是 " + outerStr + "。";
    var stepDivide = "逐項除以 " + outerStr + "，括號內得到 " + insideStr + "。";
    return {
      kind: "factorise", q: q2, a: ans2, factors: factors,
      steps: [stepHcf, stepVar, stepDivide, "答案：" + ans2 + "。"]
    };
  }

  function genGrouping(r, lv) {
    var kind = pick(r, lv === 2 ? ["xy", "xy", "split"] : ["xy", "threeone", "cubic"]);
    var a, b, c, d, f1, f2, factors, q, ans, steps;

    if (kind === "threeone") {
      do { a = ri(r, 2, 4); b = ri(r, 1, 5); c = ri(r, 1, 4); } while (b === 0 || gcd(a, b) !== 1);
      var base = [T(a, 1), T(b)];
      f1 = [T(a, 1), T(-c, 0, 1), T(b)];
      f2 = [T(a, 1), T(c, 0, 1), T(b)];
      q = "(" + polyStr(base) + ")<sup>2</sup> − (" + (c === 1 ? "y" : c + "y") + ")<sup>2</sup>";
      ans = productStr([f1, f2]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2],
        steps: [
          "三加一分組：前三項 " + polyStr(expand([base, base])) + " = (" + polyStr(base) + ")<sup>2</sup>。",
          "原式 = (" + polyStr(base) + ")<sup>2</sup> − (" + (c === 1 ? "y" : c + "y") + ")<sup>2</sup>，是平方差。",
          "用 a<sup>2</sup> − b<sup>2</sup> = (a + b)(a − b)。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "cubic") {
      a = ri(r, 1, 5);
      factors = [[T(1, 1), T(a)], [T(1, 1), T(-1)], [T(1, 1), T(1)]];
      q = polyStr(expand(factors));
      ans = productStr(factors);
      return {
        kind: "factorise", q: q, a: ans, factors: factors,
        steps: [
          "分組：x<sup>2</sup>(x + " + a + ") − (x + " + a + ")。",
          "抽出共同括號 (x + " + a + ")：(x + " + a + ")(x<sup>2</sup> − 1)。",
          "x<sup>2</sup> − 1 是平方差，再拆成 (x − 1)(x + 1)。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "split") {
      do { a = ri(r, 1, 5); b = ri(r, 1, 5); } while (b === 0 || b === a);
      var mid = a + b;
      var axTxt = a === 1 ? "x" : a + "x";
      var bxTxt = b === 1 ? "x" : b + "x";
      q = "x<sup>2</sup> + " + axTxt + " + " + bxTxt + " + " + (a * b);
      factors = [[T(1, 1), T(a)], [T(1, 1), T(b)]];
      ans = productStr(factors);
      return {
        kind: "factorise", q: q, a: ans, factors: factors,
        steps: [
          "分組：x(x + " + a + ") + " + b + "(x + " + a + ")。",
          "抽出共同括號 (x + " + a + ")。",
          "答案：" + ans + "。"
        ]
      };
    }

    var triesG = 0;
    do {
      a = ri(r, 1, lv === 2 ? 2 : 3);
      c = ri(r, 1, lv === 2 ? 2 : 3);
      b = maybe(r, 0.25) ? -ri(r, 1, 5) : ri(r, 1, 5);
      d = maybe(r, 0.25) ? -ri(r, 1, 5) : ri(r, 1, 5);
      triesG++;
    } while ((gcd(a, b) !== 1 || gcd(c, d) !== 1) && triesG < 80);
    f1 = [T(a, 1), T(b)];
    f2 = [T(c, 0, 1), T(d)];
    factors = [f1, f2];
    q = polyStr(expand(factors));
    ans = productStr(factors);
    var g1 = polyStr([T(a * c, 1, 1), T(a * d, 1)]);
    var g2 = polyStr([T(b * c, 0, 1), T(b * d)]);
    var bPart = b < 0 ? " − " + Math.abs(b) : " + " + b;
    steps = [
      "分組：(" + g1 + ") + (" + g2 + ")。",
      "各組抽公因數： " + polyStr([T(a, 1)]) + "(" + polyStr(f2) + ")" + bPart + "(" + polyStr(f2) + ")。",
      "兩組都有 " + factorStr(f2) + "，抽出來。",
      "答案：" + ans + "。"
    ];
    return { kind: "factorise", q: q, a: ans, factors: factors, steps: steps };
  }

  function genDots(r, lv) {
    var kind = pick(r, lv === 2 ? ["plain", "bracket"] : ["plain", "bracket", "quartic", "twosquares"]);
    var a, b, f1, f2, q, ans;

    if (kind === "quartic") {
      a = ri(r, 2, 6);
      q = "x<sup>4</sup> − " + (a * a * a * a);
      f1 = [T(1, 2), T(a * a)];
      f2 = [T(1, 1), T(-a)];
      var f3 = [T(1, 1), T(a)];
      ans = productStr([f1, f2, f3]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2, f3],
        steps: [
          "x<sup>4</sup> = (x<sup>2</sup>)<sup>2</sup>，" + (a * a * a * a) + " = " + (a * a) + "<sup>2</sup>。",
          "先拆成 (x<sup>2</sup> + " + (a * a) + ")(x<sup>2</sup> − " + (a * a) + ")。",
          "x<sup>2</sup> − " + (a * a) + " 仍是平方差，再拆成 (x − " + a + ")(x + " + a + ")。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "twosquares") {
      var aa, bb, cc, dd;
      do {
        aa = ri(r, 2, 4); bb = ri(r, 1, 5); cc = ri(r, 2, 4); dd = ri(r, 1, 5);
      } while (aa <= cc || gcd(aa - cc, bb - dd) !== 1 || gcd(aa + cc, bb + dd) !== 1);
      var base1 = [T(aa, 1), T(bb)];
      var base2 = [T(cc, 1), T(dd)];
      f1 = [T(aa - cc, 1), T(bb - dd)];
      f2 = [T(aa + cc, 1), T(bb + dd)];
      q = "(" + polyStr(base1) + ")<sup>2</sup> − (" + polyStr(base2) + ")<sup>2</sup>";
      ans = productStr([f1, f2]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2],
        steps: [
          "把兩個括號分別看成 A 和 B，原式是 A<sup>2</sup> − B<sup>2</sup>。",
          "A + B = " + polyStr(f2) + "，A − B = " + polyStr(f1) + "。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "bracket") {
      a = ri(r, 1, 5); b = ri(r, 2, 7);
      q = "(x + " + a + ")<sup>2</sup> − " + (b * b);
      f1 = [T(1, 1), T(a - b)];
      f2 = [T(1, 1), T(a + b)];
      ans = productStr([f1, f2]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2],
        steps: [
          (b * b) + " = " + b + "<sup>2</sup>，所以原式是 (x + " + a + ")<sup>2</sup> − " + b + "<sup>2</sup>。",
          "A = x + " + a + "，B = " + b + "。",
          "[(x + " + a + ") + " + b + "][(x + " + a + ") − " + b + "] = " + ans + "。"
        ]
      };
    }

    var triesD = 0;
    do {
      a = ri(r, 1, lv === 2 ? 5 : 9);
      b = ri(r, 1, lv === 2 ? 5 : 9);
      triesD++;
    } while (gcd(a, b) !== 1 && triesD < 80);
    var twoVar = lv === 3 && maybe(r, 0.5);
    f1 = twoVar ? [T(a, 1), T(-b, 0, 1)] : [T(a, 1), T(-b)];
    f2 = twoVar ? [T(a, 1), T(b, 0, 1)] : [T(a, 1), T(b)];
    q = polyStr(expand([f1, f2]));
    ans = productStr([f1, f2]);
    var Astr = a === 1 ? "x" : a + "x";
    var Bstr = twoVar ? b + "y" : "" + b;
    return {
      kind: "factorise", q: q, a: ans, factors: [f1, f2],
      steps: [
        "將 " + q + " 看成 (" + Astr + ")<sup>2</sup> − (" + Bstr + ")<sup>2</sup>。",
        "A = " + Astr + "，B = " + Bstr + "。",
        "用平方差：(" + Astr + " + " + Bstr + ")(" + Astr + " − " + Bstr + ")。",
        "答案：" + ans + "。"
      ]
    };
  }

  function genPerfect(r, lv) {
    var a, b, triesP = 0;
    do {
      a = lv === 2 ? ri(r, 1, 2) : ri(r, 1, 4);
      b = ri(r, 1, lv === 2 ? 6 : 5);
      triesP++;
    } while (gcd(a, b) !== 1 && triesP < 80);
    var sign = maybe(r, 0.4) ? -1 : 1;
    var twoVar = lv === 3 && maybe(r, 0.4);
    var base = twoVar ? [T(a, 1), T(sign * b, 0, 1)] : [T(a, 1), T(sign * b)];
    var q = polyStr(expand([base, base]));
    var ans = productStr([base, base]);
    var mid = 2 * a * b;
    var axTxt = a === 1 ? "x" : a + "x";
    var byTxt = b === 1 ? (twoVar ? "y" : "1") : b + (twoVar ? "y" : "");
    var byPow = b === 1 ? (twoVar ? "y<sup>2</sup>" : "") : (b * b) + (twoVar ? "y<sup>2</sup>" : "");
    return {
      kind: "factorise", q: q, a: ans, factors: [base, base],
      steps: [
        "首項 " + (a * a) + "x<sup>2</sup> = (" + axTxt + ")<sup>2</sup>，尾項 " + byPow + " = (" + byTxt + ")<sup>2</sup>。",
        "中間項 = 2 × " + axTxt + " × " + byTxt + " = " + mid + "x" + (twoVar ? "y" : "") + "，符號是" + (sign < 0 ? "減" : "加") + "。",
        "所以 " + q + " = " + ans + "。"
      ]
    };
  }

  function genCross1(r, lv) {
    var twoVar = lv === 3 && maybe(r, 0.25);
    var p, qv;
    do {
      p = maybe(r, 0.35) ? -ri(r, 1, lv === 2 ? 6 : 10) : ri(r, 1, lv === 2 ? 6 : 10);
      qv = maybe(r, 0.35) ? -ri(r, 1, lv === 2 ? 6 : 10) : ri(r, 1, lv === 2 ? 6 : 10);
    } while (p + qv === 0 || (p === 0) || (qv === 0));
    var f1 = twoVar ? [T(1, 1), T(p, 0, 1)] : [T(1, 1), T(p)];
    var f2 = twoVar ? [T(1, 1), T(qv, 0, 1)] : [T(1, 1), T(qv)];
    var q = polyStr(expand([f1, f2]));
    var ans = productStr([f1, f2]);
    var sum = p + qv, prod = p * qv;
    var sumTxt = twoVar ? sum + "xy" : sum + "x";
    var prodTxt = twoVar ? prod + "y<sup>2</sup>" : "" + prod;
    return {
      kind: "factorise", q: q, a: ans, factors: [f1, f2],
      steps: [
        (twoVar ? "把 y 當成常數的一部分。" : "") + "需要兩數相乘 " + prod + "、相加 " + sum + "。",
        "找到 " + p + " 和 " + qv + "：" + p + " × " + qv + " = " + prod + "，" + p + " + " + qv + " = " + sum + "。",
        "所以 " + q + " = " + ans + "。"
      ]
    };
  }

  function genCross2(r, lv) {
    var a, c, b, d, m;
    var tries = 0;
    do {
      a = lv === 2 ? 2 : ri(r, 2, 4);
      c = lv === 2 ? (maybe(r, 0.4) ? 1 : 2) : ri(r, 2, 4);
      b = maybe(r, 0.35) ? -ri(r, 1, 6) : ri(r, 1, 6);
      d = maybe(r, 0.35) ? -ri(r, 1, 6) : ri(r, 1, 6);
      m = a * d + c * b;
      tries++;
    } while ((m === 0 || gcd(a, b) !== 1 || gcd(c, d) !== 1) && tries < 80);
    if (m === 0) { b = 2; d = 1; m = a + 2 * c; }
    var f1 = [T(a, 1), T(b)];
    var f2 = [T(c, 1), T(d)];
    var q = polyStr(expand([f1, f2]));
    var ans = productStr([f1, f2]);
    return {
      kind: "factorise", q: q, a: ans, factors: [f1, f2],
      steps: [
        "首項 " + (a * c) + "x<sup>2</sup> 拆成 " + a + "x 和 " + c + "x；常數項 " + (b * d) + " 拆成 " + b + " 和 " + d + "。",
        "交叉相乘：(" + a + "x)(" + d + ") + (" + c + "x)(" + b + ") = " + (a * d) + "x + " + (c * b) + "x = " + m + "x。",
        "符合中間項，所以答案 " + ans + "。"
      ]
    };
  }

  function genCombined(r, lv) {
    var kind = pick(r, lv === 2 ? ["dots", "perfect"] : ["dots", "perfect", "cross", "triple"]);
    var k, a, b, c, d, m, outer, inner, factors, q, ans;

    if (kind === "dots") {
      do { k = ri(r, 2, 6); a = ri(r, 2, 6); } while (false);
      m = maybe(r, 0.7) ? 1 : 2;
      outer = [T(k, m)];
      factors = [outer, [T(1, 1), T(-a)], [T(1, 1), T(a)]];
      q = polyStr(expand(factors));
      ans = productStr(factors);
      return {
        kind: "factorise", q: q, a: ans, factors: factors,
        steps: [
          "先抽公因數 " + polyStr(outer) + "：" + polyStr(outer) + "(x<sup>2</sup> − " + (a * a) + ")。",
          "括號內是平方差，拆成 (x − " + a + ")(x + " + a + ")。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "perfect") {
      k = ri(r, 2, 6); a = ri(r, 1, 6);
      outer = [T(k)];
      factors = [outer, [T(1, 1), T(a)], [T(1, 1), T(a)]];
      q = polyStr(expand(factors));
      ans = productStr(factors);
      return {
        kind: "factorise", q: q, a: ans, factors: factors,
        steps: [
          "先抽公因數 " + k + "：" + k + "(x<sup>2</sup> + " + (2 * a) + "x + " + (a * a) + ")。",
          "括號內是完全平方：x<sup>2</sup> + " + (2 * a) + "x + " + (a * a) + " = (x + " + a + ")<sup>2</sup>。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "triple") {
      k = ri(r, 2, 4); a = ri(r, 1, 5);
      outer = [T(k, 1)];
      factors = [outer, [T(1, 1), T(a)], [T(1, 1), T(a)]];
      q = polyStr(expand(factors));
      ans = productStr(factors);
      return {
        kind: "factorise", q: q, a: ans, factors: factors,
        steps: [
          "先抽公因數 " + polyStr(outer) + "：" + polyStr(outer) + "(x<sup>2</sup> + " + (2 * a) + "x + " + (a * a) + ")。",
          "括號內是完全平方，寫成 (x + " + a + ")<sup>2</sup>。",
          "答案：" + ans + "。"
        ]
      };
    }

    var tries = 0;
    do {
      k = ri(r, 2, 4);
      a = ri(r, 2, 3); c = ri(r, 1, 3);
      b = maybe(r, 0.3) ? -ri(r, 1, 5) : ri(r, 1, 5);
      d = maybe(r, 0.3) ? -ri(r, 1, 5) : ri(r, 1, 5);
      tries++;
    } while ((a * d + c * b === 0 || gcd(a, b) !== 1 || gcd(c, d) !== 1) && tries < 80);
    outer = [T(k)];
    factors = [outer, [T(a, 1), T(b)], [T(c, 1), T(d)]];
    q = polyStr(expand(factors));
    ans = productStr(factors);
    return {
      kind: "factorise", q: q, a: ans, factors: factors,
      steps: [
        "先抽公因數 " + k + "，括號內用十字相乘。",
        "交叉相乘驗證中間項，得到 " + ans + "。",
        "答案：" + ans + "。"
      ]
    };
  }

  function genSubstitution(r, lv) {
    var a = 1;
    var b = ri(r, 1, 4);
    var br = [T(a, 1), T(b)];
    var p, q;
    do {
      p = maybe(r, 0.35) ? -ri(r, 1, 5) : ri(r, 1, 5);
      q = maybe(r, 0.35) ? -ri(r, 1, 5) : ri(r, 1, 5);
    } while (p + q === 0 || b + p === 0 || b + q === 0);
    var sum = p + q, prod = p * q;
    var brS = bracketStr(br);
    var sumPart = sum === 1 ? " + " + brS : (sum === -1 ? " − " + brS : signedTerm(sum) + brS);
    var prodPart = prod === 1 ? " + 1" : (prod === -1 ? " − 1" : signedTerm(prod));
    var qExpr = brS + "<sup>2</sup>" + sumPart + prodPart;
    var f1 = [T(a, 1), T(b + p)];
    var f2 = [T(a, 1), T(b + q)];
    var ans = productStr([f1, f2]);
    return {
      kind: "factorise", q: qExpr, a: ans, factors: [f1, f2],
      steps: [
        "令 y = " + brS + "，原式變成 y<sup>2</sup>" + (sum === 1 ? " + y" : (sum === -1 ? " − y" : signedTerm(sum) + "y")) + (prod === 1 ? " + 1" : (prod === -1 ? " − 1" : signedTerm(prod))) + "。",
        "分解 y 的二次式：(y " + (p > 0 ? "+ " + p : "− " + Math.abs(p)) + ")(y " + (q > 0 ? "+ " + q : "− " + Math.abs(q)) + ")。",
        "代返 y = " + brS + "，得到 " + ans + "。"
      ]
    };
  }

  function genHidden(r, lv) {
    var kind = pick(r, ["quartic", "biquadratic", "twosquare", "cubic", "threeone"]);
    var a, b, f1, f2, f3, q, ans, p, qv;

    if (kind === "quartic") {
      a = ri(r, 2, 6);
      q = "x<sup>4</sup> − " + (a * a * a * a);
      f1 = [T(1, 2), T(a * a)];
      f2 = [T(1, 1), T(-a)];
      f3 = [T(1, 1), T(a)];
      ans = productStr([f1, f2, f3]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2, f3],
        steps: [
          "改寫成平方差：(x<sup>2</sup>)<sup>2</sup> − " + (a * a) + "<sup>2</sup>。",
          "先拆成 (x<sup>2</sup> + " + (a * a) + ")(x<sup>2</sup> − " + (a * a) + ")。",
          "x<sup>2</sup> − " + (a * a) + " 再拆成 (x − " + a + ")(x + " + a + ")。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "biquadratic") {
      var squares = [1, 4, 9, 16];
      p = pick(r, squares); qv = pick(r, squares);
      while (qv === p) qv = pick(r, squares);
      var x = Math.sqrt(p), y = Math.sqrt(qv);
      q = "x<sup>4</sup> − " + (p + qv) + "x<sup>2</sup> + " + (p * qv);
      f1 = [T(1, 1), T(-x)]; f2 = [T(1, 1), T(x)];
      f3 = [T(1, 1), T(-y)];
      var f4 = [T(1, 1), T(y)];
      ans = productStr([f1, f2, f3, f4]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2, f3, f4],
        steps: [
          "令 y = x<sup>2</sup>，原式變成 y<sup>2</sup> − " + (p + qv) + "y + " + (p * qv) + "。",
          "分解成 (y − " + p + ")(y − " + qv + ")，代返 x<sup>2</sup>。",
          "(x<sup>2</sup> − " + p + ")(x<sup>2</sup> − " + qv + ") 兩個括號都是平方差。",
          "再拆成 " + ans + "。"
        ]
      };
    }

    if (kind === "cubic") {
      a = ri(r, 1, 6);
      q = "x<sup>3</sup> + " + (a === 1 ? "x<sup>2</sup>" : a + "x<sup>2</sup>") + " − x − " + a;
      f1 = [T(1, 1), T(a)]; f2 = [T(1, 1), T(-1)]; f3 = [T(1, 1), T(1)];
      ans = productStr([f1, f2, f3]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2, f3],
        steps: [
          "分組：x<sup>2</sup>(x + " + a + ") − (x + " + a + ")。",
          "抽出 (x + " + a + ")，得到 (x + " + a + ")(x<sup>2</sup> − 1)。",
          "x<sup>2</sup> − 1 = (x − 1)(x + 1)。",
          "答案：" + ans + "。"
        ]
      };
    }

    if (kind === "threeone") {
      do { a = ri(r, 2, 4); b = ri(r, 1, 5); } while (false);
      var base = [T(a, 1), T(-1)];
      q = polyStr(expand([base, base])) + " − " + (b === 1 ? "y<sup>2</sup>" : (b * b) + "y<sup>2</sup>");
      f1 = [T(a, 1), T(-1), T(-b, 0, 1)];
      f2 = [T(a, 1), T(-1), T(b, 0, 1)];
      ans = productStr([f1, f2]);
      return {
        kind: "factorise", q: q, a: ans, factors: [f1, f2],
        steps: [
          "前三項 " + polyStr(expand([base, base])) + " = (" + polyStr(base) + ")<sup>2</sup>。",
          "原式 = (" + polyStr(base) + ")<sup>2</sup> − (" + b + "y)<sup>2</sup>，是平方差。",
          "答案：" + ans + "。"
        ]
      };
    }

    a = ri(r, 1, 6);
    q = "x<sup>2</sup> − (y + " + a + ")<sup>2</sup>";
    f1 = [T(1, 1), T(-1, 0, 1), T(-a)];
    f2 = [T(1, 1), T(1, 0, 1), T(a)];
    ans = productStr([f1, f2]);
    return {
      kind: "factorise", q: q, a: ans, factors: [f1, f2],
      steps: [
        "A = x，B = y + " + a + "。",
        "原式 = A<sup>2</sup> − B<sup>2</sup> = (A + B)(A − B)。",
        "答案：" + ans + "。"
      ]
    };
  }

  /* ---------- application generators ---------- */
  function genSolve(r, lv, nonMonic) {
    var a, b, p, q, f1, f2, roots, qExpr;

    if (!nonMonic) {
      do {
        p = maybe(r, 0.3) ? -ri(r, 1, 8) : ri(r, 1, 8);
        q = maybe(r, 0.3) ? -ri(r, 1, 8) : ri(r, 1, 8);
      } while (p + q === 0 || p === q);
      f1 = [T(1, 1), T(-p)];
      f2 = [T(1, 1), T(-q)];
      qExpr = polyStr(expand([f1, f2])) + " = 0";
      roots = ["" + p, "" + q];
    } else {
      var aa, bb, pp, qq, k;
      do {
        aa = ri(r, 2, 4); bb = ri(r, 2, 4);
        pp = ri(r, 1, 7); qq = ri(r, 1, 7);
        k = 0;
      } while (gcd(pp, aa) !== 1 || gcd(qq, bb) !== 1 || pp * bb === qq * aa);
      f1 = [T(aa, 1), T(-pp)];
      f2 = [T(bb, 1), T(-qq)];
      qExpr = polyStr(expand([f1, f2])) + " = 0";
      roots = [pp + "/" + aa, qq + "/" + bb];
    }

    var ans = "x = " + roots[0] + " 或 x = " + roots[1];
    return {
      kind: "solve", q: "解方程 " + qExpr + "。", a: ans, roots: roots, factors: [f1, f2],
      steps: [
        "因式分解：" + polyStr(expand([f1, f2])) + " = " + productStr([f1, f2]) + "。",
        "令每個因式等於 0：" + factorStr(f1) + " = 0 或 " + factorStr(f2) + " = 0。",
        "所以 " + ans + "。"
      ]
    };
  }

  function genSimplify(r, lv) {
    var a, b, c, fnum, fden, num, den, ans, restriction;
    var dots = maybe(r, 0.5);

    if (dots) {
      do { a = ri(r, 2, 6); b = ri(r, 1, 6); } while (b === a);
      fnum = [[T(1, 1), T(-a)], [T(1, 1), T(a)]];
      fden = [[T(1, 1), T(-a)], [T(1, 1), T(b)]];
      ans = "(x + " + a + ")/(x + " + b + ")";
      restriction = "x ≠ " + a + "、−" + b;
    } else {
      do {
        a = ri(r, 1, 6); b = ri(r, 2, 7); c = ri(r, 2, 7);
      } while (b === c || a === b || a === c);
      fnum = [[T(1, 1), T(a)], [T(1, 1), T(b)]];
      fden = [[T(1, 1), T(a)], [T(1, 1), T(c)]];
      ans = "(x + " + b + ")/(x + " + c + ")";
      restriction = "x ≠ −" + a + "、−" + c;
    }

    num = polyStr(expand(fnum));
    den = polyStr(expand(fden));
    var qExpr = "化簡 (" + num + ") / (" + den + ")。";
    var original = "(" + num + ")/(" + den + ")";
    return {
      kind: "simplify", q: qExpr, a: ans,
      simplify: { num: ans.split("/")[0], den: ans.split("/")[1].replace(/[()]/g, ""), original: original },
      steps: [
        "分子因式分解：" + num + " = " + productStr(fnum) + "。",
        "分母因式分解：" + den + " = " + productStr(fden) + "。",
        "約走共同因式 " + factorStr([T(1, 1), T(a)]) + "，答案 " + ans + "。",
        "（" + restriction + "）"
      ]
    };
  }

  function genIdentity(r) {
    var p = ri(r, 2, 7), q = ri(r, 2, 7);
    var a = p + q, b = q;
    var c = p * q;
    var qExpr = "已知 x<sup>2</sup> + ax + " + c + " ≡ (x + " + p + ")(x + b)，求 a 和 b。";
    return {
      kind: "identity", q: qExpr,
      a: "a = " + a + "，b = " + b,
      steps: [
        "展開右邊：(x + " + p + ")(x + b) = x<sup>2</sup> + (" + p + " + b)x + " + p + "b。",
        "比較常數項：" + p + "b = " + c + "，所以 b = " + b + "。",
        "比較 x 的係數：a = " + p + " + " + b + " = " + a + "。"
      ]
    };
  }

  function genFactorTheorem(r) {
    var p = ri(r, 2, 6), q = ri(r, 2, 6);
    var c = p * q;
    var k = -(p + q);
    var qExpr = "已知 (x − " + p + ") 是 x<sup>2</sup> + kx + " + c + " 的因式，求 k，並因式分解該多項式。";
    return {
      kind: "factor", q: qExpr,
      a: "k = " + k + "；(x − " + p + ")(x − " + q + ")",
      steps: [
        "因式定理：代入 x = " + p + " 會等於 0。",
        p + "<sup>2</sup> + " + p + "k + " + c + " = 0，所以 " + (p * p + c) + " + " + p + "k = 0。",
        "k = " + k + "，多項式是 x<sup>2</sup> " + (k < 0 ? "− " + Math.abs(k) : "+ " + k) + "x + " + c + "。",
        "因式分解：(x − " + p + ")(x − " + q + ")。"
      ]
    };
  }

  function genArea(r) {
    var a = ri(r, 2, 7), b = ri(r, 4, 9);
    var qExpr = "一個長方形的面積是 x<sup>2</sup> + " + (a + b) + "x + " + (a * b) + "，其中長是 x + " + a + "。求闊。";
    return {
      kind: "area", q: qExpr, a: "x + " + b,
      steps: [
        "面積 = 長 × 闊，所以闊 = 面積 ÷ 長。",
        "因式分解：x<sup>2</sup> + " + (a + b) + "x + " + (a * b) + " = (x + " + a + ")(x + " + b + ")。",
        "闊 = x + " + b + "。"
      ]
    };
  }

  function genValue(r) {
    var s = ri(r, 5, 12), p = ri(r, 3, 20);
    var val = s * s - 2 * p;
    var qExpr = "已知 a + b = " + s + "，ab = " + p + "，求 a<sup>2</sup> + b<sup>2</sup> 的值。";
    return {
      kind: "value", q: qExpr, a: "a<sup>2</sup> + b<sup>2</sup> = " + val,
      steps: [
        "利用恆等式 (a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>。",
        "a<sup>2</sup> + b<sup>2</sup> = (a + b)<sup>2</sup> − 2ab。",
        "= " + s + "<sup>2</sup> − 2(" + p + ") = " + (s * s) + " − " + (2 * p) + " = " + val + "。"
      ]
    };
  }

  var APP_MAKERS = [genSolve, genSimplify, genIdentity, genFactorTheorem, genArea, genValue];

  /* ---------- options ---------- */
  function withCorrect(r, correct, wrong) {
    var seen = {}, opts = [];
    function add(s) {
      s = String(s);
      if (!s || seen[s] || s === correct) return;
      seen[s] = 1; opts.push(s);
    }
    wrong.forEach(add);
    if (opts.length < 3) {
      add("不能分解");
      add("未能確定");
    }
    opts = opts.slice(0, 3);
    var all = shuffle(r, [{ html: correct, ok: true }].concat(opts.map(function (s) {
      return { html: s, ok: false };
    })));
    return { options: all, correct: all.findIndex(function (o) { return o.ok; }) };
  }

  function factorOptions(res, r) {
    var fs = res.factors.map(function (f) { return f.map(function (t) { return T(t.c, t.x, t.y); }); });
    var wrong = [];

    fs.forEach(function (f, i) {
      if (f.length > 1) {
        var g = f.map(function (t) { return T(t.c, t.x, t.y); });
        g[g.length - 1].c = -g[g.length - 1].c;
        var copy = fs.map(function (x, j) { return j === i ? g : x; });
        wrong.push(productStr(copy));
      }
    });

    var mono = fs.length > 1 ? monoOf(fs[0]) : null;
    if (mono && !(mono.c === 1 && !mono.x && !mono.y)) {
      wrong.push(productStr(fs.slice(1)));
    }

    if (fs.length >= 2) {
      var lastTwo = mul(fs[fs.length - 2], fs[fs.length - 1]);
      var prefix = fs.slice(0, -2).map(factorStr).join("");
      wrong.push(prefix + "(" + polyStr(lastTwo) + ")");
    }

    var changed = fs.map(function (f) { return f.map(function (t) { return T(t.c, t.x, t.y); }); });
    if (changed[0].length) changed[0][0].c += 1;
    wrong.push(productStr(changed));
    wrong.push(res.q);

    return withCorrect(r, res.a, wrong);
  }

  function solveOptions(res, r) {
    var roots = res.roots;
    var w1 = roots.map(negNum);
    var w2 = [negNum(roots[0]), roots[1]];
    var w3 = [recipNum(roots[0]), roots[1]];
    var w4 = [roots[0]];
    function pair(a) { return "x = " + a[0] + (a.length > 1 ? " 或 x = " + a[1] : ""); }
    return withCorrect(r, "x = " + roots[0] + " 或 x = " + roots[1], [pair(w1), pair(w2), pair(w3), pair(w4)]);
  }

  function simplifyOptions(res, r) {
    var s = res.simplify;
    var correct = res.a;
    var wrong = [
      s.den + "/" + s.num,
      "(" + s.den.replace(/\s/g, "") + ")/(" + s.num.replace(/\s/g, "") + ")",
      s.original,
      "(" + s.num + ")(" + s.den + ")"
    ];
    return withCorrect(r, correct, wrong);
  }

  /* ---------- dispatch ---------- */
  var FACTOR_METHODS = ["common", "grouping", "dots", "perfect", "cross1", "cross2", "combined", "substitution", "hidden"];
  var GENERATORS = {
    common: genCommon, grouping: genGrouping, dots: genDots, perfect: genPerfect,
    cross1: genCross1, cross2: genCross2, combined: genCombined,
    substitution: genSubstitution, hidden: genHidden
  };

  function make(method, lv, seed) {
    var r = rng(seed || 1);
    var res, name = method;

    if (method === "app" || method === "solve" || method === "simplify") {
      if (method === "solve") res = genSolve(r, lv, maybe(r, 0.55));
      else if (method === "simplify") res = genSimplify(r, lv);
      else {
        var app = pick(r, APP_MAKERS);
        res = app(r, lv);
      }
      name = "app";
    } else {
      res = (GENERATORS[method] || genCommon)(r, lv);
    }

    function clean(x) { return String(x).replace(/-/g, "−"); }
    res.q = clean(res.q);
    res.a = clean(res.a);
    res.steps = res.steps.map(clean);
    res.m = name;
    res.lv = lv;
    if (res.kind === "factorise") {
      var o = factorOptions(res, r);
      res.options = o.options.map(function (x) { return { html: clean(x.html), ok: x.ok }; });
      res.correct = o.correct;
      delete res.factors; // keep payload light; options already built
    } else if (res.kind === "solve") {
      var o2 = solveOptions(res, r);
      res.options = o2.options.map(function (x) { return { html: clean(x.html), ok: x.ok }; });
      res.correct = o2.correct;
    } else if (res.kind === "simplify") {
      var o3 = simplifyOptions(res, r);
      res.options = o3.options.map(function (x) { return { html: clean(x.html), ok: x.ok }; });
      res.correct = o3.correct;
    }
    return res;
  }

  /* ---------- bank ---------- */
  var METHOD_COUNT = {
    common: 24, grouping: 24, dots: 24, perfect: 24, cross1: 24,
    cross2: 24, combined: 24, substitution: 22, hidden: 24, app: 28
  };

  function buildBank() {
    var out = [], seen = {};
    var methods = window.FACTOR_METHODS || [];
    methods.forEach(function (m, mi) {
      var count = METHOD_COUNT[m.id] || 20;
      var made = 0, attempt = 0;
      while (made < count && attempt < count * 20) {
        var lv = made % 2 === 0 ? 2 : 3;
        var seed = 100000 + mi * 10000 + made * 97 + attempt * 13;
        var q;
        try { q = make(m.id, lv, seed); } catch (e) { attempt++; continue; }
        if (!q || seen[q.q]) { attempt++; continue; }
        seen[q.q] = 1;
        out.push({
          id: m.id + "-" + String(made + 1).padStart(2, "0"),
          m: m.id, lv: lv, kind: q.kind, q: q.q, a: q.a, steps: q.steps,
          options: q.options, correct: q.correct
        });
        made++;
      }
    });
    return out;
  }

  /* ---------- daily / drill / mock ---------- */
  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function daily(dateStr) {
    var seed = hashStr("daily-" + dateStr);
    var r = rng(seed);
    var m = pick(r, FACTOR_METHODS);
    return make(m, 2, seed);
  }

  function makeDrill(opts) {
    opts = opts || {};
    var count = opts.count || 10;
    var lv = opts.lv || 2;
    var method = opts.method || "mix";
    var mode = opts.mode || "factor";
    var out = [], seen = {};
    var r = rng(opts.seed || Date.now());
    var tries = 0;
    while (out.length < count && tries < count * 30) {
      tries++;
      var useLv = lv === "mix" ? (r() < 0.5 ? 2 : 3) : +lv;
      var q;
      if (mode === "solve") {
        q = genSolve(r, useLv, maybe(r, 0.55));
        q.m = "app"; q.lv = useLv;
        var o = solveOptions(q, r); q.options = o.options; q.correct = o.correct;
      } else if (mode === "simplify") {
        q = genSimplify(r, useLv);
        q.m = "app"; q.lv = useLv;
        var o2 = simplifyOptions(q, r); q.options = o2.options; q.correct = o2.correct;
      } else {
        var m = method === "mix" ? pick(r, FACTOR_METHODS) : method;
        if (FACTOR_METHODS.indexOf(m) === -1) m = pick(r, FACTOR_METHODS);
        q = make(m, useLv, Math.floor(r() * 1e9));
      }
      if (!q || !q.options || seen[q.q]) continue;
      seen[q.q] = 1;
      out.push(q);
    }
    return out;
  }

  function makeMock(count, seed) {
    var r = rng(seed || 7);
    var out = [], seen = {}, tries = 0;
    while (out.length < count && tries < count * 40) {
      tries++;
      var m = pick(r, FACTOR_METHODS);
      var lv = r() < 0.6 ? 2 : 3;
      var q = make(m, lv, Math.floor(r() * 1e9));
      if (!q || !q.options || seen[q.q]) continue;
      seen[q.q] = 1;
      out.push(q);
    }
    return out;
  }

  window.FactorGen = {
    make: make,
    buildBank: buildBank,
    daily: daily,
    makeDrill: makeDrill,
    makeMock: makeMock,
    methods: FACTOR_METHODS,
    hashStr: hashStr
  };
})();
