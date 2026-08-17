const state = {
  manifest: [],
  chapterIndex: 0,
  questionIndex: 0,
  questions: [],
  selections: new Set(),
  progress: {},
};
const CONTENT_VERSION = "3";

const el = (id) => document.getElementById(id);

function extractChoices(prompt) {
  const lines = prompt.split(/\r?\n/);
  const markers = [];
  let expectedCode = "A".charCodeAt(0);
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^[ \t]*([A-H])\.[ \t]*(.*)$/);
    if (match && match[1].charCodeAt(0) === expectedCode) {
      markers.push({ index, letter: match[1], firstLine: match[2] });
      expectedCode += 1;
    }
  }
  const choices = markers.map((marker, index) => {
    const end = markers[index + 1]?.index ?? lines.length;
    return {
      letter: marker.letter,
      text: [marker.firstLine, ...lines.slice(marker.index + 1, end)].join("\n").trim(),
    };
  });
  return {
    stem: lines.slice(0, markers[0]?.index ?? lines.length).join("\n").trim(),
    choices,
  };
}

function parseReviewMarkdown(markdown) {
  const sections = markdown.split(/^## Question (\d+)\s*$/m).slice(1);
  const questions = [];
  for (let i = 0; i < sections.length; i += 2) {
    const number = Number(sections[i]);
    const body = sections[i + 1];
    const prompt = body.match(/### Prompt\s+([\s\S]*?)\s+### Correct answer/)?.[1]?.trim() || "";
    const answer = body.match(/### Correct answer\s+([^\n]+)/)?.[1]?.trim() || "";
    const explanation = body.match(/### Explanation\s+([\s\S]*?)$/)?.[1]?.trim() || "";
    const parsedPrompt = extractChoices(prompt);
    questions.push({
      number,
      stem: parsedPrompt.stem,
      choices: parsedPrompt.choices,
      correct: answer.split(",").map((item) => item.trim()),
      explanation,
      multi: /choose (?:all|two|three|four)/i.test(prompt) || answer.includes(","),
    });
  }
  return questions;
}

function chapterKey() { return `chapter-${state.manifest[state.chapterIndex].chapter}`; }
function questionKey() { return String(state.questions[state.questionIndex]?.number); }
function savedAnswer() { return state.progress[chapterKey()]?.[questionKey()]; }

function persist() {
  localStorage.setItem("java21-review-progress", JSON.stringify(state.progress));
  renderProgress();
}

async function loadSavedProgress() {
  let legacyProgress = {};
  try {
    legacyProgress = JSON.parse(localStorage.getItem("java21-review-progress") || "{}");
  } catch {
    legacyProgress = {};
  }
  try {
    const response = await fetch("/api/progress");
    if (!response.ok) throw new Error("Progress service is unavailable");
    let databaseProgress = await response.json();
    if (Object.keys(legacyProgress).length > 0) {
      await fetch("/api/progress/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: legacyProgress }),
      });
      const refreshed = await fetch("/api/progress");
      if (refreshed.ok) databaseProgress = await refreshed.json();
    }
    state.progress = databaseProgress;
  } catch {
    state.progress = legacyProgress;
  }
}

async function saveAnswer(answer) {
  try {
    await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answer),
    });
  } catch {
    // The browser cache remains a fallback when the local database server is unavailable.
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function looksLikeCode(value) {
  return /[{};]|::|->|\b(?:public|private|protected|class|interface|record|enum|static|void|int|long|double|float|boolean|var|new|return|import|package|throws)\b/.test(value);
}

function renderStem(value) {
  const lines = value.split(/\r?\n/);
  const codeStart = lines.findIndex((line) => /^\s*(?:\d+:|[A-Z]:\s|public\b|private\b|protected\b|class\b|interface\b|record\b|enum\b|import\b|package\b|@\w+)/.test(line));
  if (codeStart < 0) return `<p class="question-stem">${escapeHtml(value.replace(/\s+/g, " ").trim())}</p>`;
  const prose = lines.slice(0, codeStart).join(" ").replace(/\s+/g, " ").trim();
  const code = lines.slice(codeStart).join("\n").trimEnd();
  return `${prose ? `<p class="question-stem">${escapeHtml(prose)}</p>` : ""}<div class="code-shell"><div class="code-label"><span></span>Java</div><pre class="code-block"><code>${escapeHtml(code)}</code></pre></div>`;
}

function sameAnswers(a, b) {
  return [...a].sort().join(",") === [...b].sort().join(",");
}

function renderQuestion() {
  const question = state.questions[state.questionIndex];
  const saved = savedAnswer();
  state.selections = new Set(saved?.selected || []);
  el("chapter-detail").textContent = `Question ${state.questionIndex + 1} of ${state.questions.length}`;
  el("chapter-bar").style.width = `${((state.questionIndex + 1) / state.questions.length) * 100}%`;
  el("previous").disabled = state.questionIndex === 0;
  el("next").textContent = state.questionIndex === state.questions.length - 1 ? "Finish chapter ✓" : "Next question →";

  const choices = question.choices.map((choice) => {
    const selected = state.selections.has(choice.letter);
    const isCorrectChoice = question.correct.includes(choice.letter);
    let status = selected ? " selected" : "";
    if (saved) status += isCorrectChoice ? " correct" : selected ? " incorrect" : "";
    const isCode = looksLikeCode(choice.text);
    const choiceText = isCode ? choice.text : choice.text.replace(/\s+/g, " ").trim();
    return `<button class="choice${status}" data-letter="${choice.letter}" ${saved ? "disabled" : ""}>
      <span class="choice-letter">${choice.letter}</span>
      <span class="choice-text ${isCode ? "code-choice" : ""}">${escapeHtml(choiceText)}</span>
    </button>`;
  }).join("");

  const feedback = saved ? `<div class="feedback ${saved.correct ? "" : "wrong"}">
    <h2>${saved.correct ? "Correct — nicely done." : "Not quite — keep this one in rotation."}</h2>
    <p class="answer-key">Correct answer: ${question.correct.join(", ")}</p>
    <p>${escapeHtml(question.explanation)}</p>
  </div>` : "";

  el("quiz-card").innerHTML = `
    <div class="question-meta">
      <span class="question-badge">Question ${question.number}</span>
      <span class="question-type">${question.multi ? "Select all that apply" : "Select one answer"}</span>
    </div>
    ${renderStem(question.stem)}
    <div class="choices">${choices}</div>
    ${!saved ? `<div class="check-row"><button id="check-answer" class="check-button" disabled>Check answer</button></div>` : ""}
    ${feedback}`;

  document.querySelectorAll(".choice").forEach((button) => button.addEventListener("click", choose));
  el("check-answer")?.addEventListener("click", grade);
  renderDots();
}

function choose(event) {
  const letter = event.currentTarget.dataset.letter;
  if (state.questions[state.questionIndex].multi) {
    state.selections.has(letter) ? state.selections.delete(letter) : state.selections.add(letter);
  } else {
    state.selections = new Set([letter]);
  }
  document.querySelectorAll(".choice").forEach((button) => button.classList.toggle("selected", state.selections.has(button.dataset.letter)));
  el("check-answer").disabled = state.selections.size === 0;
}

function grade() {
  const question = state.questions[state.questionIndex];
  const result = {
    selected: [...state.selections],
    correct: sameAnswers(state.selections, question.correct),
  };
  state.progress[chapterKey()] ||= {};
  state.progress[chapterKey()][questionKey()] = result;
  persist();
  saveAnswer({
    chapter: state.manifest[state.chapterIndex].chapter,
    question: question.number,
    ...result,
  });
  renderQuestion();
}

function renderDots() {
  const currentChapterProgress = state.progress[chapterKey()] || {};
  el("question-dots").innerHTML = state.questions.map((question, index) =>
    `<button class="dot ${index === state.questionIndex ? "active" : ""} ${currentChapterProgress[question.number] ? "answered" : ""}" data-index="${index}" aria-label="Question ${question.number}"></button>`
  ).join("");
  document.querySelectorAll(".dot").forEach((dot) => dot.addEventListener("click", () => goToQuestion(Number(dot.dataset.index))));
}

function progressStats() {
  let answered = 0;
  let correct = 0;
  for (const chapter of Object.values(state.progress)) {
    for (const result of Object.values(chapter)) {
      answered += 1;
      if (result.correct) correct += 1;
    }
  }
  return { answered, correct };
}

function renderProgress() {
  const total = state.manifest.reduce((sum, chapter) => sum + chapter.questionCount, 0);
  const stats = progressStats();
  const percent = total ? Math.round((stats.answered / total) * 100) : 0;
  el("overall-percent").textContent = `${percent}%`;
  el("overall-detail").textContent = `${stats.answered} of ${total} answered · ${stats.correct} correct`;
  renderChapterList();
}

function renderChapterList() {
  const select = el("chapter-select");
  select.innerHTML = state.manifest.map((chapter, index) => {
    const count = Object.keys(state.progress[`chapter-${chapter.chapter}`] || {}).length;
    return `<option value="${index}" ${index === state.chapterIndex ? "selected" : ""}>${String(chapter.chapter).padStart(2, "0")} — ${escapeHtml(chapter.title)} · ${count}/${chapter.questionCount}</option>`;
  }).join("");
  select.onchange = () => loadChapter(Number(select.value));
}

async function loadChapter(index) {
  state.chapterIndex = index;
  state.questionIndex = 0;
  const chapter = state.manifest[index];
  el("quiz-card").innerHTML = '<div class="loading">Loading review questions…</div>';
  el("chapter-eyebrow").textContent = `Chapter ${chapter.chapter}`;
  el("chapter-title").textContent = chapter.title;
  renderChapterList();
  try {
    const response = await fetch(`assets/review-tests/${chapter.file}?v=${CONTENT_VERSION}`);
    if (!response.ok) throw new Error(`Could not load ${chapter.file}`);
    state.questions = parseReviewMarkdown(await response.text());
    renderQuestion();
  } catch (error) {
    el("quiz-card").innerHTML = `<div class="error">${escapeHtml(error.message)}</div>`;
  }
}

function goToQuestion(index) {
  if (index < 0 || index >= state.questions.length) return;
  state.questionIndex = index;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function init() {
  try {
    const response = await fetch(`assets/review-tests/index.json?v=${CONTENT_VERSION}`);
    state.manifest = await response.json();
    await loadSavedProgress();
    renderProgress();
    await loadChapter(0);
  } catch (error) {
    el("quiz-card").innerHTML = `<div class="error">Unable to start the review lab: ${escapeHtml(error.message)}</div>`;
  }
}

el("previous").addEventListener("click", () => goToQuestion(state.questionIndex - 1));
el("next").addEventListener("click", () => {
  if (state.questionIndex < state.questions.length - 1) goToQuestion(state.questionIndex + 1);
  else window.scrollTo({ top: 0, behavior: "smooth" });
});
el("reset-progress").addEventListener("click", async () => {
  if (!confirm("Reset all saved answers and scores?")) return;
  try {
    await fetch("/api/progress", { method: "DELETE" });
  } catch {
    // Clearing the local cache still resets progress if the server is unavailable.
  }
  state.progress = {};
  persist();
  renderQuestion();
});
init();
