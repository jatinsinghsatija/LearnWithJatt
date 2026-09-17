(function () {
  const CATS = ["android", "java", "kotlin", "flutter", "playground"];
  const LEVELS = ["basic", "intermediate", "advanced"];

  const state = {
    cat: "android",
    level: "all",
    topic: "all",
    query: "",
    expanded: true,
    dialogIndex: -1,
    visible: []
  };

  const titles = {
    android: "Android interview questions",
    java: "Java interview questions",
    kotlin: "Kotlin interview questions",
    flutter: "Flutter interview questions",
    playground: "Coding playground"
  };

  const INTERVIEW_INTRO = "Interview questions for Android, Java, Kotlin, and Flutter, grouped as basic, intermediate, and advanced. Press <kbd>/</kbd> to search.";
  const PLAYGROUND_INTRO = "Playground is a separate coding lab. Each problem shows a solution first. Practice hides it and opens an editor with <code>main</code>. Execute runs that function in Java, Kotlin, or Dart and scores the approach.";

  function allQuestions() {
    const bank = window.QA_BANK || {};
    return CATS.flatMap((cat) => (bank[cat] || []).map((q, i) => ({
      ...q,
      category: q.category || cat,
      id: q.id || `${cat}-${i + 1}`
    })));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderMarkdown(src) {
    if (!src) return "";
    const parts = String(src).replace(/\r\n/g, "\n").split("```");
    let html = "";
    parts.forEach((chunk, index) => {
      if (index % 2 === 1) {
        const nl = chunk.indexOf("\n");
        const code = nl === -1 ? chunk : chunk.slice(nl + 1);
        html += `<pre><code>${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`;
        return;
      }
      const lines = chunk.split("\n");
      let buffer = [];
      let mode = null;

      const flush = () => {
        if (!buffer.length) return;
        const tag = mode === "ol" ? "ol" : "ul";
        html += `<${tag}>${buffer.join("")}</${tag}>`;
        buffer = [];
        mode = null;
      };

      const inline = (text) => escapeHtml(text)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>");

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          flush();
          return;
        }
        if (/^#{3}\s+/.test(trimmed)) {
          flush();
          html += `<h3>${inline(trimmed.replace(/^#{3}\s+/, ""))}</h3>`;
          return;
        }
        if (/^#{2}\s+/.test(trimmed)) {
          flush();
          html += `<h3>${inline(trimmed.replace(/^#{2}\s+/, ""))}</h3>`;
          return;
        }
        const ul = trimmed.match(/^[-*]\s+(.*)$/);
        if (ul) {
          if (mode && mode !== "ul") flush();
          mode = "ul";
          buffer.push(`<li>${inline(ul[1])}</li>`);
          return;
        }
        const ol = trimmed.match(/^\d+\.\s+(.*)$/);
        if (ol) {
          if (mode && mode !== "ol") flush();
          mode = "ol";
          buffer.push(`<li>${inline(ol[1])}</li>`);
          return;
        }
        flush();
        html += `<p>${inline(trimmed)}</p>`;
      });
      flush();
    });
    return html;
  }

  function filtered() {
    const q = state.query.trim().toLowerCase();
    return allQuestions().filter((item) => {
      if (item.category !== state.cat) return false;
      if (state.level !== "all" && item.level !== state.level) return false;
      if (state.topic !== "all" && item.topic !== state.topic) return false;
      if (!q) return true;
      const hay = [item.question, item.topic, item.answer, ...(item.tags || [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  function topicsForCat() {
    const set = new Map();
    allQuestions()
      .filter((item) => item.category === state.cat)
      .forEach((item) => set.set(item.topic, (set.get(item.topic) || 0) + 1));
    return [...set.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }

  function counts() {
    const items = allQuestions();
    const byCat = Object.fromEntries(CATS.map((c) => [c, items.filter((i) => i.category === c).length]));
    const inCat = items.filter((i) => i.category === state.cat);
    const byLevel = Object.fromEntries(LEVELS.map((l) => [l, inCat.filter((i) => i.level === l).length]));
    return { byCat, byLevel, total: inCat.length };
  }

  function renderStats(visible) {
    const c = counts();
    document.getElementById("stats").innerHTML = `
      <div class="stat"><b>${visible.length}</b><span>Showing now</span></div>
      <div class="stat"><b>${c.total}</b><span>In this category</span></div>
      <div class="stat"><b>${c.byLevel.basic}/${c.byLevel.intermediate}/${c.byLevel.advanced}</b><span>Basic / Mid / Advanced</span></div>
    `;
    CATS.forEach((cat) => {
      const el = document.getElementById(`count-${cat}`);
      if (el) el.textContent = c.byCat[cat];
    });
    const intro = document.getElementById("intro");
    if (intro && !intro.dataset.filled) {
      const interviewN = allQuestions().filter((i) => i.category !== "playground").length;
      intro.dataset.filled = "1";
      intro.dataset.interview = `${INTERVIEW_INTRO} Bank size: <strong>${interviewN}</strong> questions (${c.byCat.android} Android, ${c.byCat.java} Java, ${c.byCat.kotlin} Kotlin, ${c.byCat.flutter} Flutter).`;
      intro.dataset.playground = `${PLAYGROUND_INTRO} <strong>${c.byCat.playground || 0}</strong> problems.`;
    }
  }

  function renderTopics() {
    const box = document.getElementById("topics");
    const options = topicsForCat()
      .map(([topic, n]) => `<option value="${escapeHtml(topic)}" ${state.topic === topic ? "selected" : ""}>${escapeHtml(topic)} (${n})</option>`)
      .join("");
    box.innerHTML = `
      <label class="topic-filter">
        <span>Topic</span>
        <select id="topic-select">
          <option value="all" ${state.topic === "all" ? "selected" : ""}>All topics</option>
          ${options}
        </select>
      </label>
    `;
    document.getElementById("topic-select").addEventListener("change", (e) => {
      state.topic = e.target.value;
      paint();
    });
  }

  function looksLikeHtml(src) {
    return /<(p|ul|ol|li|pre|table|h[1-6]|div|br)\b/i.test(src || "");
  }

  function answerHtml(item) {
    const raw = item.answer || "";
    let body = looksLikeHtml(raw) ? raw : renderMarkdown(raw);
    if (item.code) {
      body += `<pre><code>${escapeHtml(item.code)}</code></pre>`;
    }
    if (item.image) {
      body += `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.topic)} diagram" />`;
    }
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach((src) => {
        body += `<img src="${escapeHtml(src)}" alt="${escapeHtml(item.topic)} diagram" />`;
      });
    }
    if (item.source) {
      body += `<p class="source">${escapeHtml(item.source)}</p>`;
    }
    return body;
  }

  function renderList(items) {
    const list = document.getElementById("list");
    const empty = document.getElementById("empty");
    empty.hidden = items.length > 0;
    if (state.cat === "playground" && window.Playground) {
      window.Playground.renderList(list, items, {
        expanded: state.expanded,
        answerHtml
      });
      return;
    }

    list.innerHTML = items.map((item, idx) => `
      <article class="card ${state.expanded ? "is-open" : ""}" data-id="${escapeHtml(item.id)}">
        <button class="card-head" data-toggle="${item.id}">
          <span class="badge ${escapeHtml(item.level)}">${escapeHtml(item.level)}</span>
          <div>
            <h2>${escapeHtml(item.question)}</h2>
            <p class="meta">${escapeHtml(item.topic)}${item.tags && item.tags.length ? " · " + escapeHtml(item.tags.join(" · ")) : ""}</p>
          </div>
          <span class="meta">${idx + 1}/${items.length}</span>
        </button>
        <div class="card-body answer">${answerHtml(item)}</div>
      </article>
    `).join("");

    list.querySelectorAll("[data-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".card").classList.toggle("is-open");
      });
      btn.addEventListener("dblclick", () => openDialog(btn.dataset.toggle));
    });
  }

  function setMode(cat) {
    state.cat = cat;
    state.topic = "all";
    document.querySelectorAll("[data-cat]").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.cat === cat);
    });
    document.body.classList.toggle("is-playground", cat === "playground");
    paint();
  }

  function paint() {
    const items = filtered();
    state.visible = items;
    document.getElementById("page-title").textContent = titles[state.cat];
    document.getElementById("eyebrow").textContent = state.cat === "playground"
      ? `Playground lab · ${state.level === "all" ? "all levels" : state.level}`
      : `${state.cat} · ${state.level === "all" ? "all levels" : state.level}`;
    document.getElementById("search").placeholder = state.cat === "playground"
      ? "Search coding problems…"
      : "Search questions, topics, tags…";
    renderStats(items);
    const intro = document.getElementById("intro");
    if (intro && intro.dataset.filled) {
      intro.innerHTML = state.cat === "playground" ? intro.dataset.playground : intro.dataset.interview;
    }
    renderTopics();
    renderList(items);
  }

  function openDialog(id) {
    const items = state.visible.length ? state.visible : filtered();
    const index = items.findIndex((q) => q.id === id);
    if (index < 0) return;
    state.dialogIndex = index;
    const item = items[index];
    document.getElementById("dlg-meta").textContent =
      `${item.category} · ${item.level} · ${item.topic}`;
    document.getElementById("dlg-title").textContent = item.question;
    document.getElementById("dlg-body").innerHTML = answerHtml(item);
    document.getElementById("dialog").showModal();
  }

  function moveDialog(delta) {
    const items = state.visible;
    if (!items.length) return;
    state.dialogIndex = (state.dialogIndex + delta + items.length) % items.length;
    openDialog(items[state.dialogIndex].id);
  }

  document.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.dataset.cat));
  });

  document.querySelectorAll(".level").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.level = btn.dataset.level;
      document.querySelectorAll(".level").forEach((b) => b.classList.toggle("is-active", b === btn));
      paint();
    });
  });

  document.getElementById("search").addEventListener("input", (e) => {
    state.query = e.target.value;
    paint();
  });
  document.getElementById("btn-expand").addEventListener("click", () => {
    state.expanded = !state.expanded;
    document.getElementById("btn-expand").textContent = state.expanded ? "Collapse all" : "Expand all";
    paint();
  });
  document.getElementById("dlg-close").addEventListener("click", () => document.getElementById("dialog").close());
  document.getElementById("dlg-next").addEventListener("click", () => moveDialog(1));
  document.getElementById("dlg-prev").addEventListener("click", () => moveDialog(-1));

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "/") {
      e.preventDefault();
      document.getElementById("search").focus();
    }
    if (e.key === "j") moveDialog(1);
    if (e.key === "k") moveDialog(-1);
  });

  paint();
})();
