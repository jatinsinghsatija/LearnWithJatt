(function () {
  const API = "https://emkc.org/api/v2/piston";
  const LANGS = {
    java: { piston: "java", file: "Main.java", label: "Java" },
    kotlin: { piston: "kotlin", file: "Main.kt", label: "Kotlin" },
    dart: { piston: "dart", file: "main.dart", label: "Dart" }
  };

  const versions = {};
  let runtimesPromise = null;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normOut(text) {
    return String(text || "")
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+$/gm, "")
      .trim();
  }

  function looksUnsolved(code, starter) {
    const raw = String(code || "");
    if (/write your code/i.test(raw)) return true;
    if (normOut(raw) === normOut(starter || "")) return true;
    return false;
  }

  function hasMain(lang, code) {
    if (lang === "java") return /public\s+static\s+void\s+main\s*\(/.test(code);
    if (lang === "kotlin") return /fun\s+main\s*\(/.test(code);
    return /\bvoid\s+main\s*\(|\bmain\s*\(/.test(code);
  }

  function qualityNotes(item, code) {
    const notes = [];
    (item.quality || []).forEach((rule) => {
      try {
        if (new RegExp(rule.pattern, "i").test(code)) notes.push(rule.message);
      } catch (_) { /* skip bad regex */ }
    });
    return notes;
  }

  async function loadRuntimes() {
    if (runtimesPromise) return runtimesPromise;
    runtimesPromise = fetch(`${API}/runtimes`)
      .then((r) => {
        if (!r.ok) throw new Error("Could not load language runtimes");
        return r.json();
      })
      .then((list) => {
        Object.keys(LANGS).forEach((key) => {
          const name = LANGS[key].piston;
          const matches = (list || []).filter((x) => x.language === name);
          versions[key] = (matches[matches.length - 1] || matches[0] || {}).version || "*";
        });
        return versions;
      })
      .catch((err) => {
        runtimesPromise = null;
        throw err;
      });
    return runtimesPromise;
  }

  async function execute(lang, code) {
    await loadRuntimes();
    const meta = LANGS[lang];
    const res = await fetch(`${API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: meta.piston,
        version: versions[lang] || "*",
        files: [{ name: meta.file, content: code }],
        compile_timeout: 12000,
        run_timeout: 8000
      })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Execute failed (${res.status})`);
    }
    return res.json();
  }

  function evaluate(item, lang, code, result) {
    const compile = result.compile || {};
    const run = result.run || {};
    const compileErr = normOut(compile.stderr || compile.output || "");
    const runErr = normOut(run.stderr || "");
    const stdout = normOut(run.stdout || (run.code === 0 ? run.output : "") || "");
    const expected = normOut(item.expected);
    const bits = [];

    if (looksUnsolved(code, (item.starter || {})[lang])) {
      bits.push({ kind: "warn", title: "Not implemented yet", body: "The editor still has the starter. Fill in the logic inside main / the helper, then Execute again." });
    }
    if (!hasMain(lang, code)) {
      bits.push({ kind: "error", title: "Missing main", body: "Keep a main entry point. The runner always starts there, the same way Android Studio launches an app." });
    }

    const failed = (compile.code && compile.code !== 0) || compileErr || (run.code && run.code !== 0);
    if (compileErr && ((compile.code && compile.code !== 0) || !stdout)) {
      bits.push({ kind: "error", title: "Compile error", body: compileErr });
      return bits;
    }
    if (failed && runErr && !stdout) {
      bits.push({ kind: "error", title: "Runtime error", body: runErr });
      return bits;
    }
    if (runErr && stdout) {
      bits.push({ kind: "warn", title: "Stderr", body: runErr });
    }

    bits.push({ kind: "io", title: "Program output", body: stdout || "(no output)" });

    if (stdout === expected) {
      const notes = qualityNotes(item, code);
      if (notes.length) {
        bits.push({
          kind: "improve",
          title: "Correct answer — approach can be improved",
          body: notes.map((n, i) => `${i + 1}. ${n}`).join("\n")
        });
      } else {
        bits.push({
          kind: "ok",
          title: "Correct",
          body: "Output matches the tests for this topic. The approach looks solid for an interview write-up."
        });
      }
    } else {
      bits.push({
        kind: "error",
        title: "Wrong answer",
        body: `Expected:\n${expected}\n\nGot:\n${stdout || "(empty)"}`
      });
    }
    return bits;
  }

  function lineGutter(text) {
    const n = String(text || "").split("\n").length;
    return Array.from({ length: n }, (_, i) => i + 1).join("\n");
  }

  function renderEval(bits) {
    return bits.map((b) => `
      <div class="pg-msg pg-${escapeHtml(b.kind)}">
        <strong>${escapeHtml(b.title)}</strong>
        <pre>${escapeHtml(b.body)}</pre>
      </div>
    `).join("");
  }

  function bindCard(card, item, helpers) {
    const langs = card.querySelectorAll("[data-lang]");
    const practiceBtn = card.querySelector("[data-practice]");
    const runBtn = card.querySelector("[data-run]");
    const resetBtn = card.querySelector("[data-reset]");
    const fileTabs = card.querySelectorAll("[data-file]");
    const editor = card.querySelector("[data-editor]");
    const gutter = card.querySelector("[data-gutter]");
    const solution = card.querySelector("[data-solution]");
    const studio = card.querySelector("[data-studio]");
    const solCode = card.querySelector("[data-solcode]");
    const out = card.querySelector("[data-out]");

    const drafts = {
      java: (item.starter || {}).java || "",
      kotlin: (item.starter || {}).kotlin || "",
      dart: (item.starter || {}).dart || ""
    };
    const state = { lang: "java", practice: false };

    function showLang() {
      langs.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.lang === state.lang));
      fileTabs.forEach((el) => { el.textContent = LANGS[state.lang].file; });
      solCode.textContent = (item.solution || {})[state.lang] || "";
      if (!state.practice) return;
      editor.value = drafts[state.lang];
      gutter.textContent = lineGutter(editor.value);
    }

    function setPractice(on) {
      state.practice = on;
      solution.hidden = on;
      studio.hidden = !on;
      practiceBtn.textContent = on ? "Show solution" : "Practice";
      practiceBtn.classList.toggle("solid", !on);
      if (on) {
        editor.value = drafts[state.lang];
        gutter.textContent = lineGutter(editor.value);
        editor.focus();
      }
    }

    langs.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.practice) drafts[state.lang] = editor.value;
        state.lang = btn.dataset.lang;
        showLang();
      });
    });

    practiceBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (state.practice) drafts[state.lang] = editor.value;
      setPractice(!state.practice);
    });

    editor.addEventListener("input", () => {
      drafts[state.lang] = editor.value;
      gutter.textContent = lineGutter(editor.value);
    });
    editor.addEventListener("scroll", () => {
      gutter.scrollTop = editor.scrollTop;
    });
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.slice(0, start) + "    " + editor.value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
        drafts[state.lang] = editor.value;
        gutter.textContent = lineGutter(editor.value);
      }
    });

    resetBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      drafts[state.lang] = (item.starter || {})[state.lang] || "";
      editor.value = drafts[state.lang];
      gutter.textContent = lineGutter(editor.value);
      out.innerHTML = `<div class="pg-msg pg-io"><strong>Reset</strong><pre>Starter restored. main() will run on Execute.</pre></div>`;
    });

    runBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      drafts[state.lang] = editor.value;
      const code = editor.value;
      runBtn.disabled = true;
      runBtn.textContent = "Running…";
      out.innerHTML = `<div class="pg-msg pg-io"><strong>Execute</strong><pre>Compiling ${LANGS[state.lang].file} and running main()…</pre></div>`;
      try {
        const result = await execute(state.lang, code);
        out.innerHTML = renderEval(evaluate(item, state.lang, code, result));
      } catch (err) {
        const msg = String(err && err.message ? err.message : err);
        const hint = /Failed to fetch|NetworkError|CORS/i.test(msg)
          ? "Open LEARN WITH JATT through a local server (not file://) so the runner can reach the compiler."
          : msg;
        out.innerHTML = `<div class="pg-msg pg-error"><strong>Could not run</strong><pre>${escapeHtml(hint)}</pre></div>`;
      } finally {
        runBtn.disabled = false;
        runBtn.textContent = "Execute";
      }
    });

    showLang();
  }

  function cardHtml(item, idx, total, expanded, helpers) {
    const answer = helpers.answerHtml(item);
    const sol = escapeHtml((item.solution || {}).java || "");
    return `
      <article class="card pg-card ${expanded ? "is-open" : ""}" data-id="${escapeHtml(item.id)}">
        <button class="card-head" data-toggle="${item.id}">
          <span class="badge ${escapeHtml(item.level)}">${escapeHtml(item.level)}</span>
          <div>
            <h2>${escapeHtml(item.question)}</h2>
            <p class="meta">${escapeHtml(item.topic)}${item.tags && item.tags.length ? " · " + escapeHtml(item.tags.join(" · ")) : ""}</p>
          </div>
          <span class="meta">${idx + 1}/${total}</span>
        </button>
        <div class="card-body">
          <div class="pg-explain answer">${answer}</div>
          <div class="pg-toolbar">
            <div class="pg-langs" role="tablist">
              <button type="button" class="is-active" data-lang="java">Java</button>
              <button type="button" data-lang="kotlin">Kotlin</button>
              <button type="button" data-lang="dart">Dart</button>
            </div>
            <button type="button" class="ghost" data-practice>Practice</button>
          </div>
          <div data-solution>
            <p class="pg-filelabel">Solution · <span data-file>Main.java</span></p>
            <pre class="pg-sol"><code data-solcode>${sol}</code></pre>
          </div>
          <div class="pg-studio" data-studio hidden>
            <div class="pg-ide">
              <div class="pg-ide-bar">
                <span class="pg-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                <span class="pg-tab" data-file>Main.java</span>
                <span class="pg-ide-spacer"></span>
                <button type="button" class="ghost pg-reset" data-reset>Reset</button>
                <button type="button" class="solid pg-run" data-run>Execute</button>
              </div>
              <div class="pg-editor-wrap">
                <pre class="pg-gutter" data-gutter>1</pre>
                <textarea class="pg-code" data-editor spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>
              </div>
              <div class="pg-console">
                <div class="pg-console-title">Run / evaluation</div>
                <div class="pg-out" data-out>
                  <div class="pg-msg pg-io"><strong>Ready</strong><pre>Edit the starter, keep main(), then tap Execute. Output is checked against this topic's tests. Errors and weaker approaches are reported here.</pre></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  window.Playground = {
    renderList(list, items, helpers) {
      list.innerHTML = items.map((item, idx) => cardHtml(item, idx, items.length, helpers.expanded, helpers)).join("");
      list.querySelectorAll(".pg-card").forEach((card) => {
        const item = items.find((q) => q.id === card.dataset.id);
        bindCard(card, item, helpers);
      });
      list.querySelectorAll("[data-toggle]").forEach((btn) => {
        btn.addEventListener("click", () => btn.closest(".card").classList.toggle("is-open"));
      });
    }
  };
})();
