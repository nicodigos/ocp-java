const state = {
  manifest: [],
  chapterIndex: 0,
  questionIndex: 0,
  questions: [],
  selections: new Set(),
  progress: {},
};
const CONTENT_VERSION = "15";

const flash = {
  activeSection: "review",
  collections: {
    java: { decks: [], deckIndex: 0, cardId: null, flipped: false, progress: {}, clock: 0 },
    g1: { decks: [], deckIndex: 0, cardId: null, flipped: false, progress: {}, clock: 0 },
    sanctions: { decks: [], deckIndex: 0, cardId: null, flipped: false, progress: {}, clock: 0 },
  },
};

const generator = {
  question: null,
  nextQuestion: null,
  selections: new Set(),
  graded: false,
  result: null,
  loading: false,
  pollTimer: null,
  chaptersLoaded: false,
};

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

function splitTableRow(line) {
  const cells = [];
  let value = "";
  for (let i = 1; i < line.length - 1; i += 1) {
    if (line[i] === "\\" && line[i + 1] === "|") { value += "|"; i += 1; }
    else if (line[i] === "|") { cells.push(value.trim()); value = ""; }
    else value += line[i];
  }
  cells.push(value.trim());
  return cells;
}

function plainMarkdown(value) {
  return value.replace(/<br\s*\/?\s*>/gi, " ").replace(/<img\b[^>]*>/gi, "").replace(/\*\*(.*?)\*\*/g, "$1").trim();
}

function imageFrom(value) {
  const match = value.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
  return match && /^(?:mto_g1_assets|assets)\/[\w./-]+$/.test(match[1]) ? match[1] : "";
}

function renderRich(value) {
  return plainMarkdown(value).split(/(`[^`]+`)/g).map((part) => part.startsWith("`") && part.endsWith("`")
    ? `<code>${escapeHtml(part.slice(1, -1))}</code>` : escapeHtml(part)).join("");
}

function javaCardContext(card) {
  return card.context || "";
}

function parseFlashcardMarkdown(markdown, collection) {
  const decks = [];
  let deck = null;
  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/)?.[1];
    if (heading) {
      if (collection === "java" && !/^Chapter \d+\s+-/.test(heading)) { deck = null; continue; }
      if (collection === "g1" && !/^Part [AB]\s+—/.test(heading)) { deck = null; continue; }
      if (collection === "sanctions" && heading !== "Sanctions deck") { deck = null; continue; }
      deck = {
        id: collection === "java" ? heading.match(/^Chapter (\d+)/)[1] : collection === "sanctions" ? "sanctions" : heading.startsWith("Part A") ? "rules" : "signs",
        title: collection === "sanctions" ? "Offences and sanctions" : heading.replace(/^Chapter \d+\s+-\s*/, "").replace(/^Part [AB]\s+—\s+/, ""), cards: [],
      };
      decks.push(deck);
      continue;
    }
    if (!deck || !/^\|\s*(?:\d+|[RS]\d{3})\s*\|/.test(line)) continue;
    const cells = splitTableRow(line);
    if (collection === "java") deck.cards.push({ id: `${deck.id}-${cells[0]}`, front: cells[1], back: cells[2], note: cells[3], image: imageFrom(cells[2]) });
    else if (deck.id === "rules" || collection === "sanctions") deck.cards.push({ id: cells[0], topic: cells[1], front: cells[2], back: cells[3], note: "", image: imageFrom(cells[3]) });
    else deck.cards.push({ id: cells[0], front: "", back: cells[2], note: "", image: imageFrom(cells[1]) });
  }
  return decks;
}

function progressKey(deckId, cardId) { return `${deckId}:${cardId}`; }

async function loadFlashProgress(collection) {
  const data = flash.collections[collection];
  const response = await fetch(`/api/flashcards/progress?collection=${collection}`);
  if (!response.ok) throw new Error(`Could not load ${collection.toUpperCase()} flashcard progress`);
  data.progress = await response.json();
  data.clock = Math.max(0, ...Object.values(data.progress).map((item) => Number(item.dueOrder) || 0));
}

function currentFlashDeck(collection) { return flash.collections[collection].decks[flash.collections[collection].deckIndex]; }

function remainingFlashcards(collection, deck = currentFlashDeck(collection)) {
  const data = flash.collections[collection];
  return deck.cards.filter((card) => data.progress[progressKey(deck.id, card.id)]?.learned !== true);
}

function chooseFlashcard(collection) {
  const data = flash.collections[collection];
  const deck = currentFlashDeck(collection);
  if (!deck?.cards.length) return null;
  const available = remainingFlashcards(collection, deck);
  const ranked = available.map((card, index) => {
    const saved = data.progress[progressKey(deck.id, card.id)] || {};
    return { card, index, due: Number(saved.dueOrder) || 0, mastery: Number(saved.mastery) || 0 };
  }).filter(({ card }) => card.id !== data.cardId || available.length === 1)
    .sort((a, b) => a.due - b.due || a.mastery - b.mastery || a.index - b.index);
  return ranked[0]?.card || null;
}

function renderFlashcard(collection) {
  const data = flash.collections[collection];
  const deck = currentFlashDeck(collection);
  const mount = el(`${collection}-flashcards`);
  if (!deck) return;
  const remaining = remainingFlashcards(collection, deck);
  let card = remaining.find((item) => item.id === data.cardId);
  if (!card) { card = chooseFlashcard(collection); data.cardId = card?.id; }
  const records = deck.cards.map((item) => data.progress[progressKey(deck.id, item.id)] || {});
  const seen = records.filter((item) => item.seenCount).length;
  const learned = records.filter((item) => item.learned === true).length;
  if (!card) {
    mount.innerHTML = `
      <div class="deck-status"><span>${deck.cards.length} cards · ${seen} seen · ${learned} learned</span><span>0 remaining</span></div>
      <div class="deck-complete"><strong>Deck complete</strong><span>All cards are learned. Reset the deck to study them again.</span><button class="deck-reset ghost-button">Reset deck</button></div>`;
    mount.querySelector(".deck-reset").addEventListener("click", () => resetFlashDeck(collection));
    return;
  }
  const cardPosition = remaining.findIndex((item) => item.id === card.id) + 1;
  const current = data.progress[progressKey(deck.id, card.id)] || { mastery: 0 };
  const isRoadSign = collection === "g1" && deck.id === "signs";
  const isBookFigure = collection === "java" && Boolean(card.image);
  const context = collection === "java" ? javaCardContext(card, deck) : "";
  const imageAlt = isBookFigure ? plainMarkdown(card.back) : "Official Ontario driver's handbook illustration";
  const image = card.image ? `<img class="flashcard-image${isRoadSign ? " sign-image" : ""}${isBookFigure ? " book-figure" : ""}" src="${escapeHtml(card.image)}" alt="${escapeHtml(imageAlt)}">` : "";
  mount.innerHTML = `
    <div class="deck-status"><span>${deck.cards.length} cards · ${seen} seen · ${learned} learned</span><span>Level ${Number(current.mastery) || 0}/5</span></div>
    <button class="flashcard-scene" type="button" aria-label="Flip flashcard" aria-pressed="${data.flipped}">
      <span class="flashcard-inner ${data.flipped ? "flipped" : ""}">
        <span class="flashcard-face flashcard-front${isRoadSign ? " sign-front" : ""}">
          ${isRoadSign ? image : ""}
          ${isRoadSign ? "" : `<span class="card-front-copy"><span class="card-question">${renderRich(card.front)}</span>${context ? `<span class="card-context">${renderRich(context)}</span>` : ""}</span>`}
          <span class="flip-hint">Click or press Space to reveal</span>
        </span>
        <span class="flashcard-face flashcard-back">
          ${isBookFigure ? `<span class="figure-answer">${image}<span class="card-answer">${renderRich(card.back)}</span></span>` : `<span class="card-answer">${renderRich(card.back)}</span>`}
          ${collection === "g1" && deck.id === "rules" ? image : ""}
          ${card.note ? `<span class="card-note">${renderRich(card.note)}</span>` : ""}
        </span>
      </span>
    </button>
    <div class="card-navigation" aria-label="Browse cards without rating">
      <button class="nav-button" data-move="-1">← Previous</button>
      <span class="card-counter">${cardPosition} of ${remaining.length} remaining</span>
      <button class="nav-button" data-move="1">Next →</button>
    </div>
    <div class="flashcard-actions">
      <button class="rating-button learning" data-rating="again"><span>↻</span> Still learning</button>
      <button class="rating-button known" data-rating="known"><span>✓</span> I know this</button>
      <button class="deck-reset ghost-button">Reset deck</button>
    </div>`;
  mount.querySelector(".flashcard-scene").addEventListener("click", () => {
    data.flipped = !data.flipped;
    mount.querySelector(".flashcard-inner").classList.toggle("flipped", data.flipped);
    mount.querySelector(".flashcard-scene").setAttribute("aria-pressed", String(data.flipped));
  });
  mount.querySelectorAll("[data-rating]").forEach((button) => button.addEventListener("click", () => rateFlashcard(collection, button.dataset.rating)));
  mount.querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => moveFlashcard(collection, Number(button.dataset.move))));
  mount.querySelector(".deck-reset").addEventListener("click", () => resetFlashDeck(collection));
}

function moveFlashcard(collection, direction) {
  const data = flash.collections[collection];
  const deck = currentFlashDeck(collection);
  const remaining = remainingFlashcards(collection, deck);
  if (!remaining.length) return;
  const currentIndex = Math.max(0, remaining.findIndex((card) => card.id === data.cardId));
  const nextIndex = (currentIndex + direction + remaining.length) % remaining.length;
  data.cardId = remaining[nextIndex].id;
  data.flipped = false;
  renderFlashcard(collection);
}

async function rateFlashcard(collection, rating) {
  const data = flash.collections[collection];
  const deck = currentFlashDeck(collection);
  const key = progressKey(deck.id, data.cardId);
  const mount = el(`${collection}-flashcards`);
  mount.querySelectorAll("[data-rating]").forEach((button) => { button.disabled = true; });
  try {
    const response = await fetch("/api/flashcards/rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection, deck: deck.id, cardId: data.cardId, rating }),
    });
    if (!response.ok) throw new Error("Progress could not be saved");
    data.progress[key] = await response.json();
    data.cardId = chooseFlashcard(collection)?.id;
    data.flipped = false;
    renderFlashcard(collection);
  } catch (error) {
    mount.querySelectorAll("[data-rating]").forEach((button) => { button.disabled = false; });
    alert(error.message);
  }
}

async function resetFlashDeck(collection) {
  const data = flash.collections[collection];
  const deck = currentFlashDeck(collection);
  if (!confirm(`Reset all progress for ${deck.title}?`)) return;
  try {
    const response = await fetch(`/api/flashcards/progress?collection=${collection}&deck=${encodeURIComponent(deck.id)}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Deck could not be reset");
  } catch (error) {
    alert(error.message);
    return;
  }
  for (const card of deck.cards) delete data.progress[progressKey(deck.id, card.id)];
  data.cardId = null; data.flipped = false; renderFlashcard(collection);
}

function renderDeckPicker(collection) {
  const data = flash.collections[collection];
  const select = el(`${collection}-deck-select`);
  select.innerHTML = data.decks.map((deck, index) => `<option value="${index}">${collection === "java" ? `${String(deck.id).padStart(2, "0")} — ` : ""}${escapeHtml(deck.title)} · ${deck.cards.length}</option>`).join("");
  select.value = String(data.deckIndex);
  select.onchange = () => { data.deckIndex = Number(select.value); data.cardId = null; data.flipped = false; renderFlashcard(collection); };
}

async function initFlashcards() {
  const [javaResponse, g1Response, sanctionsResponse, javaContextResponse] = await Promise.all([
    fetch(`assets/flashcards/ocp-java-21-flashcards.md?v=${CONTENT_VERSION}`),
    fetch(`Ontario_G1_Flashcards.md?v=${CONTENT_VERSION}`),
    fetch(`Ontario_G1_Sanctions_Flashcards.md?v=${CONTENT_VERSION}`),
    fetch(`assets/flashcards/ocp-java-21-contexts.json?v=${CONTENT_VERSION}`),
  ]);
  if (!javaResponse.ok || !g1Response.ok || !sanctionsResponse.ok || !javaContextResponse.ok) throw new Error("One of the flashcard banks could not be loaded");
  flash.collections.java.decks = parseFlashcardMarkdown(await javaResponse.text(), "java");
  flash.collections.g1.decks = parseFlashcardMarkdown(await g1Response.text(), "g1");
  flash.collections.sanctions.decks = parseFlashcardMarkdown(await sanctionsResponse.text(), "sanctions");
  const javaContexts = await javaContextResponse.json();
  for (const deck of flash.collections.java.decks) {
    for (const card of deck.cards) card.context = card.image ? "" : javaContexts[card.id] || "";
  }
  await Promise.all([loadFlashProgress("java"), loadFlashProgress("g1"), loadFlashProgress("sanctions")]);
  for (const collection of ["java", "g1"]) { renderDeckPicker(collection); renderFlashcard(collection); }
  initSanctionQuiz();
}

/* ---------------- Ontario G1 sanctions quiz ---------------- */

const sanctions = {
  cards: [],
  pools: { whole: [], parts: [] },
  items: [],
  index: 0,
  answers: {},
  selections: new Set(),
  topic: "all",
  length: "10",
  shuffle: true,
  seed: 1,
  finished: false,
  retry: false,
};

const SANCTION_FAMILIES = [
  { id: "points", label: "Demerit points", test: /demerit point/i },
  { id: "impound", label: "Vehicle impoundment", test: /impound/i },
  { id: "jail", label: "Jail and prison terms", test: /jail|prison|imprison/i },
  { id: "suspension", label: "Suspensions and cancellations", test: /suspen|cancel|revocation|driving ban|lose (?:the|a|his|her) .*licence|reapply/i },
  { id: "program", label: "Warnings, programs and interlock", test: /program|warning letter|interview|interlock|back on track/i },
  { id: "fine", label: "Fines", test: /\bfines?\b|\$/i },
];

const SANCTION_PRONOUNS = /^(?:it|its|they|their|this|that|these|those|which|he|she|there)\b/i;

function sanctionFamily(text) {
  for (const family of SANCTION_FAMILIES) if (family.test.test(text)) return family.id;
  return "other";
}

function sanctionRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledWith(items, random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function tidySanctionPart(value) {
  const text = value.replace(/\s+/g, " ").replace(/^[,;\s]+/, "").replace(/[.,;\s]+$/, "").trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function normalizeSanction(value) {
  return value.toLowerCase().replace(/[^a-z0-9$]+/g, " ").replace(/^(?:a|an|the)\s+/, "").trim();
}

const SANCTION_FILLER = /^(?:a|an|the|of|for|to|at|in|on|and|or|additional|extra|further|least|up|from|date|its|his|her|their|driver|drivers|driver s|s)$/;

function sanctionTokens(value) {
  return new Set(normalizeSanction(value).split(" ")
    .filter((word) => word && !SANCTION_FILLER.test(word))
    .map((word) => word.replace(/(?:ies|es|s)$/, (match) => (match === "ies" ? "y" : ""))));
}

const SANCTION_NOUNS = [
  ["points", /demerit point/],
  ["impound", /impound/],
  ["jail", /jail|prison|imprison/],
  ["interlock", /interlock/],
  ["program", /program|back on track|interview/],
  ["warning", /warning letter/],
  ["suspension", /suspen|cancel|revocation|driving ban|reapply|lose the|lose a/],
  ["fine", /fine|\$/],
];

const SANCTION_QUANTITY = /\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|sixty|ninety|hundred|thousand|life|lifetime|permanent|first|second|third|subsequent)\b/g;

function sanctionNoun(value) {
  const text = value.toLowerCase();
  for (const [noun, test] of SANCTION_NOUNS) if (test.test(text)) return noun;
  return "";
}

function sanctionQuantities(value) {
  return new Set(normalizeSanction(value).match(SANCTION_QUANTITY) || []);
}

function sameQuantities(left, right) {
  return left.size === right.size && [...left].every((value) => right.has(value));
}

// Two sanctions clash when one is just a wordier version of the other
// ("two demerit points" vs "two additional demerit points"), which would make
// the distractor arguably correct.
function sanctionsClash(left, right) {
  const a = sanctionTokens(left);
  const b = sanctionTokens(right);
  if (!a.size || !b.size) return normalizeSanction(left) === normalizeSanction(right);
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  if ([...small].every((token) => large.has(token))) return true;
  const noun = sanctionNoun(left);
  if (!noun || noun !== sanctionNoun(right)) return false;
  const leftQuantity = sanctionQuantities(left);
  const rightQuantity = sanctionQuantities(right);
  if (sameQuantities(leftQuantity, rightQuantity)) return true;
  // A vague sanction ("the licence is suspended") next to a precise one of the
  // same kind ("a 30-day suspension") would be true as well, so drop it.
  if (!leftQuantity.size && a.size <= 3) return true;
  return !rightQuantity.size && b.size <= 3;
}

// A rough shape for the sanction so a "how many demerit points" question is
// answered by point counts and a suspension question by suspension terms.
function sanctionShape(value) {
  const text = normalizeSanction(value);
  if (/^[a-z0-9-]+( additional)? demerit points?$/.test(text)) return "points";
  if (/^(immediate |minimum )?[a-z0-9-]+ (day|month|year) .*impound/.test(text)) return "impound-term";
  if (/^(immediate |minimum )?[a-z0-9-]+ (day|month|year) .*(suspension|suspended)/.test(text)) return "suspension-term";
  if (/^(heavy |substantial |increased )?fines?$/.test(text)) return "fine-only";
  if (/^(second )?warning letter/.test(text)) return "warning";
  return "";
}

// Splits a handbook answer such as "A heavy fine and six demerit points" into the
// individual sanctions it imposes, so the card can become a select-all question.
function splitSanctionParts(answer) {
  const base = answer.replace(/\s+/g, " ").replace(/\.$/, "").trim();
  const whole = [tidySanctionPart(base)].filter(Boolean);
  if (/\bor\b|\bsuch as\b|\bdepending on\b|\bup to two years\b/i.test(base)) return whole;
  let marked = base
    .replace(/,\s*(?:and|plus|along with|in addition to|as well as|together with)\s+/gi, "|")
    .replace(/\s*;\s*/g, "|")
    .replace(/\s+(?:plus|along with|in addition to|as well as|together with)\s+/gi, "|");
  if (!marked.includes("|")) marked = marked.replace(/\s+and\s+/gi, "|");
  else if (/,\s+and\s+/i.test(base)) marked = marked.replace(/,\s+/g, "|");
  const parts = marked.split("|").map(tidySanctionPart).filter(Boolean);
  if (parts.length < 2 || parts.length > 4) return whole;
  const usable = parts.every((part) => part.split(" ").length >= 2 && part.length <= 92 && !SANCTION_PRONOUNS.test(part));
  return usable ? parts : whole;
}

function buildSanctionCards() {
  const deck = flash.collections.sanctions.decks[0];
  return (deck?.cards || []).map((card) => {
    const answer = plainMarkdown(card.back);
    return {
      id: card.id,
      topic: plainMarkdown(card.topic || ""),
      front: plainMarkdown(card.front),
      answer,
      parts: splitSanctionParts(answer),
      family: sanctionFamily(answer),
    };
  }).filter((card) => card.front && card.answer);
}

function buildSanctionPools(cards) {
  const whole = [];
  const parts = [];
  const entry = (text, family, card) => ({ text, family, topic: card.topic, cardId: card.id, shape: sanctionShape(text) });
  for (const card of cards) {
    const answer = tidySanctionPart(card.answer);
    whole.push(entry(answer, card.family, card));
    if (card.parts.length > 1) {
      for (const part of card.parts) parts.push(entry(part, sanctionFamily(part), card));
    } else if (answer.length <= 92) {
      parts.push(entry(answer, card.family, card));
    }
  }
  return { whole, parts };
}

// Distractors are always real sanctions taken from the other cards in the deck,
// preferring the same topic, then the same kind of sanction, then a similar length,
// so a wrong option always reads like it could belong to the question.
function pickSanctionDistractors(pool, correct, card, count, random) {
  if (count <= 0) return [];
  const clashes = (text) => correct.some((answer) => sanctionsClash(answer, text));
  const seen = new Set();
  const shape = sanctionShape(correct[0]);
  const reference = correct.reduce((sum, text) => sum + text.length, 0) / correct.length;
  const candidates = shuffledWith(pool, random).filter((option) => {
    if (option.cardId === card.id || SANCTION_PRONOUNS.test(option.text) || clashes(option.text)) return false;
    const value = normalizeSanction(option.text);
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
  const shaped = candidates.filter((option) => shape && option.shape === shape);
  const scored = (shaped.length >= count ? shaped : candidates).map((option) => ({
    option,
    score: (option.topic && option.topic === card.topic ? 4 : 0)
      + (shape && option.shape === shape ? 3 : 0)
      + (option.family === card.family ? 2 : 0)
      - Math.min(1, Math.abs(option.text.length - reference) / 90),
  })).sort((a, b) => b.score - a.score);
  const shortlist = scored.slice(0, Math.max(count + 3, 7)).map((item) => item.option);
  const overflow = scored.slice(Math.max(count + 3, 7)).map((item) => item.option);
  return [...shuffledWith(shortlist, random), ...overflow].slice(0, count).map((option) => option.text);
}

function buildSanctionItem(card, pools, random) {
  const multiParts = card.parts.length > 1;
  let correct = multiParts ? card.parts : [tidySanctionPart(card.answer)];
  let pool = multiParts ? pools.parts : pools.whole;
  let wanted = multiParts ? Math.min(6, correct.length + 3) - correct.length : 4;
  let distractors = pickSanctionDistractors(pool, correct, card, wanted, random);
  if (multiParts && distractors.length < 2) {
    correct = [tidySanctionPart(card.answer)];
    pool = pools.whole;
    distractors = pickSanctionDistractors(pool, correct, card, 4, random);
  }
  const options = shuffledWith(
    [...correct.map((text) => ({ text, correct: true })), ...distractors.map((text) => ({ text, correct: false }))],
    random,
  ).map((option, index) => ({ ...option, letter: String.fromCharCode(65 + index) }));
  return {
    id: card.id,
    topic: card.topic,
    family: card.family,
    stem: card.front,
    options,
    multi: correct.length > 1,
    correct: options.filter((option) => option.correct).map((option) => option.letter),
    explanation: tidySanctionPart(card.answer) + ".",
  };
}

function sanctionTopicCounts() {
  const counts = new Map();
  for (const card of sanctions.cards) counts.set(card.family, (counts.get(card.family) || 0) + 1);
  return counts;
}

function renderSanctionOptions() {
  const counts = sanctionTopicCounts();
  const topics = [`<option value="all">All topics · ${sanctions.cards.length}</option>`];
  for (const family of SANCTION_FAMILIES) {
    if (!counts.get(family.id)) continue;
    topics.push(`<option value="${family.id}">${escapeHtml(family.label)} · ${counts.get(family.id)}</option>`);
  }
  if (counts.get("other")) topics.push(`<option value="other">Other sanctions · ${counts.get("other")}</option>`);
  const topicSelect = el("sanctions-topic");
  topicSelect.innerHTML = topics.join("");
  topicSelect.value = sanctions.topic;
  el("sanctions-length").value = sanctions.length;
  el("sanctions-shuffle").checked = sanctions.shuffle;
}

function sanctionLearnedRank(card) {
  const record = flash.collections.sanctions.progress[progressKey("sanctions", card.id)] || {};
  return record.learned === true ? 1 : 0;
}

function startSanctionQuiz({ retryMissed = false } = {}) {
  let selection;
  if (retryMissed) {
    const missed = sanctions.items.filter((item) => sanctions.answers[item.id] && !sanctions.answers[item.id].correct);
    selection = missed.map((item) => sanctions.cards.find((card) => card.id === item.id)).filter(Boolean);
  } else {
    selection = sanctions.cards.filter((card) => sanctions.topic === "all" || card.family === sanctions.topic);
  }
  if (!selection.length) selection = sanctions.cards;
  sanctions.seed = sanctions.shuffle ? Math.floor(Math.random() * 1e9) + 1 : 1;
  sanctions.retry = retryMissed;
  const random = sanctionRandom(sanctions.seed);
  let ordered = sanctions.shuffle ? shuffledWith(selection, random) : [...selection];
  if (!retryMissed) {
    ordered = ordered
      .map((card, index) => ({ card, index, rank: sanctionLearnedRank(card) }))
      .sort((a, b) => a.rank - b.rank || a.index - b.index)
      .map((entry) => entry.card);
  }
  const limit = retryMissed || sanctions.length === "all" ? ordered.length : Math.min(Number(sanctions.length), ordered.length);
  sanctions.items = ordered.slice(0, limit).map((card, index) => buildSanctionItem(card, sanctions.pools, sanctionRandom(sanctions.seed + index * 7919 + 13)));
  sanctions.index = 0;
  sanctions.answers = {};
  sanctions.selections = new Set();
  sanctions.finished = false;
  renderSanctionQuiz();
}

function sanctionStats() {
  const answered = Object.values(sanctions.answers);
  return { answered: answered.length, correct: answered.filter((entry) => entry.correct).length };
}

function renderSanctionHeader() {
  const stats = sanctionStats();
  const percent = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
  const learned = Object.entries(flash.collections.sanctions.progress).filter(([key, value]) => key.startsWith("sanctions:") && value.learned === true).length;
  el("sanctions-score").textContent = `${percent}%`;
  el("sanctions-score-detail").textContent = `${stats.correct} of ${stats.answered} correct · ${learned}/${sanctions.cards.length} mastered`;
  const total = sanctions.items.length || 1;
  const position = sanctions.finished ? total : sanctions.index + 1;
  el("sanctions-bar").style.width = `${(position / total) * 100}%`;
  el("sanctions-detail").textContent = sanctions.finished ? `${total} of ${total} complete` : `Question ${position} of ${sanctions.items.length}`;
}

function renderSanctionDots() {
  el("sanctions-dots").innerHTML = sanctions.items.map((item, index) => {
    const answer = sanctions.answers[item.id];
    const status = answer ? (answer.correct ? "answered" : "missed") : "";
    return `<button class="dot ${!sanctions.finished && index === sanctions.index ? "active" : ""} ${status}" data-index="${index}" aria-label="Question ${index + 1}"></button>`;
  }).join("");
  el("sanctions-dots").querySelectorAll(".dot").forEach((dot) => dot.addEventListener("click", () => goToSanctionQuestion(Number(dot.dataset.index))));
}

function renderSanctionQuiz() {
  const mount = el("sanctions-quiz");
  if (!sanctions.items.length) {
    mount.innerHTML = '<div class="loading">No questions match this topic.</div>';
    renderSanctionHeader();
    renderSanctionDots();
    return;
  }
  if (sanctions.finished) { renderSanctionResults(); return; }
  const item = sanctions.items[sanctions.index];
  const saved = sanctions.answers[item.id];
  sanctions.selections = new Set(saved?.selected || []);
  el("sanctions-previous").disabled = sanctions.index === 0;
  el("sanctions-next").textContent = sanctions.index === sanctions.items.length - 1 ? "See results ✓" : "Next question →";
  const choices = item.options.map((option) => {
    const selected = sanctions.selections.has(option.letter);
    let status = selected ? " selected" : "";
    if (saved) status = option.correct ? " correct" : selected ? " incorrect" : "";
    return `<button class="choice${status}" data-letter="${option.letter}" ${saved ? "disabled" : ""}>
      <span class="choice-letter">${option.letter}</span>
      <span class="choice-text">${escapeHtml(option.text)}</span>
    </button>`;
  }).join("");
  const feedback = saved ? `<div class="feedback ${saved.correct ? "" : "wrong"}">
    <h2>${saved.correct ? "Correct — that is the handbook penalty." : "Not quite — worth another pass."}</h2>
    <p class="answer-key">Correct: ${item.correct.map((letter) => `${letter}. ${item.options.find((option) => option.letter === letter).text}`).join(" · ")}</p>
    <p>${escapeHtml(item.explanation)}</p>
  </div>` : "";
  mount.innerHTML = `
    <div class="question-meta">
      <span class="question-badge">${escapeHtml(item.topic || "Sanction")}</span>
      <span class="question-type">${item.multi ? "Select all that apply" : "Select one answer"}</span>
    </div>
    <p class="question-stem">${escapeHtml(item.stem)}</p>
    <div class="choices">${choices}</div>
    ${!saved ? '<div class="check-row"><button id="sanctions-check" class="check-button" disabled>Check answer</button></div>' : ""}
    ${feedback}`;
  mount.querySelectorAll(".choice").forEach((button) => button.addEventListener("click", chooseSanctionOption));
  el("sanctions-check")?.addEventListener("click", gradeSanctionItem);
  renderSanctionHeader();
  renderSanctionDots();
}

function chooseSanctionOption(event) {
  const letter = event.currentTarget.dataset.letter;
  const item = sanctions.items[sanctions.index];
  if (item.multi) {
    sanctions.selections.has(letter) ? sanctions.selections.delete(letter) : sanctions.selections.add(letter);
  } else {
    sanctions.selections = new Set([letter]);
  }
  el("sanctions-quiz").querySelectorAll(".choice").forEach((button) => button.classList.toggle("selected", sanctions.selections.has(button.dataset.letter)));
  el("sanctions-check").disabled = sanctions.selections.size === 0;
}

async function rateSanctionCard(cardId, correct) {
  const data = flash.collections.sanctions;
  try {
    const response = await fetch("/api/flashcards/rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection: "sanctions", deck: "sanctions", cardId, rating: correct ? "known" : "again" }),
    });
    if (!response.ok) throw new Error("Progress could not be saved");
    data.progress[progressKey("sanctions", cardId)] = await response.json();
    renderSanctionHeader();
  } catch {
    // The quiz keeps working when the progress service is unavailable.
  }
}

function gradeSanctionItem() {
  const item = sanctions.items[sanctions.index];
  const correct = sameAnswers(sanctions.selections, item.correct);
  sanctions.answers[item.id] = { selected: [...sanctions.selections], correct };
  rateSanctionCard(item.id, correct);
  renderSanctionQuiz();
}

function renderSanctionResults() {
  const stats = sanctionStats();
  const total = sanctions.items.length;
  const percent = total ? Math.round((stats.correct / total) * 100) : 0;
  const missed = sanctions.items.filter((item) => !sanctions.answers[item.id]?.correct);
  const list = missed.map((item) => `<li>
      <p class="result-question">${escapeHtml(item.stem)}</p>
      <p class="result-answer">${escapeHtml(item.explanation)}</p>
    </li>`).join("");
  el("sanctions-quiz").innerHTML = `
    <div class="quiz-results">
      <strong>${percent}%</strong>
      <span>${stats.correct} of ${total} correct${stats.answered < total ? ` · ${total - stats.answered} skipped` : ""}</span>
      ${missed.length ? `<ul class="result-list">${list}</ul>` : '<p class="result-clean">Every sanction matched the handbook. Nicely done.</p>'}
      <div class="result-actions">
        ${missed.length ? `<button id="sanctions-retry" class="primary-button" type="button">Retry the ${missed.length} missed</button>` : ""}
        <button id="sanctions-new" class="ghost-button" type="button">New quiz</button>
      </div>
    </div>`;
  el("sanctions-retry")?.addEventListener("click", () => startSanctionQuiz({ retryMissed: true }));
  el("sanctions-new")?.addEventListener("click", () => startSanctionQuiz());
  el("sanctions-previous").disabled = false;
  el("sanctions-next").textContent = "New quiz ↻";
  renderSanctionHeader();
  renderSanctionDots();
}

function goToSanctionQuestion(index) {
  if (index < 0 || index >= sanctions.items.length) return;
  sanctions.finished = false;
  sanctions.index = index;
  renderSanctionQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initSanctionQuiz() {
  sanctions.cards = buildSanctionCards();
  sanctions.pools = buildSanctionPools(sanctions.cards);
  renderSanctionOptions();
  el("sanctions-topic").addEventListener("change", (event) => { sanctions.topic = event.target.value; startSanctionQuiz(); });
  el("sanctions-length").addEventListener("change", (event) => { sanctions.length = event.target.value; startSanctionQuiz(); });
  el("sanctions-shuffle").addEventListener("change", (event) => { sanctions.shuffle = event.target.checked; startSanctionQuiz(); });
  el("sanctions-restart").addEventListener("click", () => startSanctionQuiz());
  el("sanctions-previous").addEventListener("click", () => {
    if (sanctions.finished) { goToSanctionQuestion(sanctions.items.length - 1); return; }
    goToSanctionQuestion(sanctions.index - 1);
  });
  el("sanctions-next").addEventListener("click", () => {
    if (sanctions.finished) { startSanctionQuiz(); return; }
    if (sanctions.index < sanctions.items.length - 1) { goToSanctionQuestion(sanctions.index + 1); return; }
    sanctions.finished = true;
    renderSanctionQuiz();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  startSanctionQuiz();
}

function renderGeneratorChapters() {
  el("generator-chapters").innerHTML = state.manifest.map((chapter) => `
    <label class="chapter-option">
      <input type="checkbox" name="generator-chapter" value="${chapter.chapter}">
      <span><b>${String(chapter.chapter).padStart(2, "0")}</b>${escapeHtml(chapter.title)}</span>
    </label>`).join("");
}

function selectedGeneratorChapters() {
  return [...document.querySelectorAll('input[name="generator-chapter"]:checked')].map((input) => Number(input.value));
}

function renderGeneratedQuestion() {
  const mount = el("generated-question");
  if (!generator.question && generator.loading) {
    mount.innerHTML = '<div class="loading">Gemini is preparing your next question in the background…</div>';
    return;
  }
  const question = generator.question;
  if (!question) {
    mount.innerHTML = '<p class="generator-empty">Your selected chapters are saved. A question will appear here when it is ready.</p>';
    return;
  }
  const choices = question.choices.map((choice) => {
    const selected = generator.selections.has(choice.letter);
    const correct = generator.result?.answerKey.includes(choice.letter);
    let status = selected ? " selected" : "";
    if (generator.graded) status += correct ? " correct" : selected ? " incorrect" : "";
    const choiceText = looksLikeCode(choice.text) ? choice.text : choice.text.replace(/\s+/g, " ").trim();
    return `<button class="choice generated-choice${status}" type="button" data-letter="${choice.letter}" ${generator.graded ? "disabled" : ""}>
      <span class="choice-letter">${choice.letter}</span>
      <span class="choice-text ${looksLikeCode(choice.text) ? "code-choice" : ""}">${escapeHtml(choiceText)}</span>
    </button>`;
  }).join("");
  const correct = generator.result?.correct;
  const choiceExplanations = generator.result?.choiceExplanations || [];
  const explanationList = choiceExplanations.length ? `<ul class="choice-explanations">${choiceExplanations.map((item) => `<li class="${item.correct ? "right" : "wrong"}"><span>${escapeHtml(item.letter)} — ${item.correct ? "Correct" : "Incorrect"}</span><p>${escapeHtml(item.explanation)}</p></li>`).join("")}</ul>` : `<p>${escapeHtml(generator.result?.explanation || "")}</p>`;
  const nextControl = generator.nextQuestion
    ? '<button id="show-next-generated" class="primary-button" type="button">Show next question →</button>'
    : '<button class="primary-button" type="button" disabled>Preparing next question…</button>';
  mount.innerHTML = `<div class="generated-card">
    <div class="question-meta"><span class="question-badge">Generated question</span><span class="question-type">${question.multi ? "Select all that apply" : "Select one answer"}</span></div>
    ${renderStem(question.stem)}
    <div class="choices">${choices}</div>
    ${generator.graded ? `<div class="feedback ${correct ? "" : "wrong"}"><h2>${correct ? "Correct — nicely done." : "Not quite."}</h2><p class="answer-key">Correct answer: ${generator.result.answerKey.join(", ")}</p>${explanationList}<div class="check-row">${nextControl}</div></div>` : '<div class="check-row"><button id="check-generated-answer" class="check-button" type="button" disabled>Check answer</button></div>'}
  </div>`;
  mount.querySelectorAll(".generated-choice").forEach((button) => button.addEventListener("click", () => {
    const letter = button.dataset.letter;
    if (question.multi) generator.selections.has(letter) ? generator.selections.delete(letter) : generator.selections.add(letter);
    else generator.selections = new Set([letter]);
    mount.querySelectorAll(".generated-choice").forEach((choice) => choice.classList.toggle("selected", generator.selections.has(choice.dataset.letter)));
    el("check-generated-answer").disabled = generator.selections.size === 0;
  }));
  el("check-generated-answer")?.addEventListener("click", gradeGeneratedQuestion);
  el("show-next-generated")?.addEventListener("click", () => {
    generator.question = generator.nextQuestion;
    generator.nextQuestion = null;
    generator.selections.clear();
    generator.graded = false;
    generator.result = null;
    renderGeneratedQuestion();
  });
}

function scheduleGeneratorPoll() {
  clearTimeout(generator.pollTimer);
  generator.pollTimer = setTimeout(refreshGeneratedQuestion, 2_500);
}

async function refreshGeneratedQuestion() {
  try {
    const response = await fetch("/api/questions/current");
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Could not load the generated question");
    if (!generator.chaptersLoaded) {
      document.querySelectorAll('input[name="generator-chapter"]').forEach((input) => {
        input.checked = payload.chapters.includes(Number(input.value));
      });
      generator.chaptersLoaded = true;
    }
    if (payload.question) {
      if (generator.graded) generator.nextQuestion = payload.question;
      else generator.question = payload.question;
      generator.loading = false;
      renderGeneratedQuestion();
      return;
    }
    generator.loading = payload.status === "generating";
    renderGeneratedQuestion();
    if (payload.status === "generating" || payload.status === "idle") scheduleGeneratorPoll();
    else if (payload.status === "error") {
      mountGeneratorError(payload.error || "Question generation failed. Submit the chapters to try again.");
    }
  } catch (error) {
    if (!generator.question) mountGeneratorError(error.message);
    scheduleGeneratorPoll();
  }
}

function mountGeneratorError(message) {
  el("generated-question").innerHTML = `<div class="generator-error">${escapeHtml(message)}</div>`;
}

async function gradeGeneratedQuestion() {
  el("check-generated-answer").disabled = true;
  try {
    const response = await fetch("/api/questions/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected: [...generator.selections] }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Could not check this answer");
    generator.result = payload;
    generator.graded = true;
    renderGeneratedQuestion();
    scheduleGeneratorPoll();
  } catch (error) {
    el("generated-question").insertAdjacentHTML("beforeend", `<div class="generator-error">${escapeHtml(error.message)}</div>`);
  }
}

async function requestGeneratedQuestion(event) {
  event.preventDefault();
  const chapters = selectedGeneratorChapters();
  if (!chapters.length) {
    el("generated-question").innerHTML = '<div class="generator-error">Select at least one chapter.</div>';
    return;
  }
  generator.loading = true;
  generator.question = null;
  generator.nextQuestion = null;
  generator.selections.clear();
  generator.graded = false;
  generator.result = null;
  el("generate-question").disabled = true;
  renderGeneratedQuestion();
  try {
    const response = await fetch("/api/questions/chapters", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapters }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Could not generate a question");
    generator.loading = true;
    scheduleGeneratorPoll();
  } catch (error) {
    el("generated-question").innerHTML = `<div class="generator-error">${escapeHtml(error.message)}</div>`;
  } finally {
    generator.loading = false;
    el("generate-question").disabled = false;
    renderGeneratedQuestion();
  }
}

function initGenerator() {
  renderGeneratorChapters();
  el("generator-form").addEventListener("submit", requestGeneratedQuestion);
  el("generator-select-all").addEventListener("click", () => document.querySelectorAll('input[name="generator-chapter"]').forEach((input) => { input.checked = true; }));
  el("generator-clear").addEventListener("click", () => document.querySelectorAll('input[name="generator-chapter"]').forEach((input) => { input.checked = false; }));
  refreshGeneratedQuestion();
}

function closeMenu() {
  el("section-menu").hidden = true;
  el("menu-trigger").setAttribute("aria-expanded", "false");
}

function switchSection(section) {
  flash.activeSection = section;
  for (const name of ["review", "java-cards", "g1-cards", "sanctions-quiz", "generator"]) {
    const sectionElement = el(`${name}-section`);
    sectionElement.hidden = name !== section;
    sectionElement.classList.toggle("active", name === section);
  }
  el("quiz-header-actions").hidden = section !== "review";
  document.querySelectorAll("#section-menu [data-section]").forEach((button) => button.classList.toggle("active", button.dataset.section === section));
  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initMenu() {
  el("menu-trigger").addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = el("section-menu");
    menu.hidden = !menu.hidden;
    el("menu-trigger").setAttribute("aria-expanded", String(!menu.hidden));
  });
  document.querySelectorAll("#section-menu [data-section]").forEach((button) => button.addEventListener("click", () => switchSection(button.dataset.section)));
  document.addEventListener("click", (event) => { if (!event.target.closest(".brand-wrap")) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
}

function initFlashcardKeyboard() {
  document.addEventListener("keydown", (event) => {
    if ((event.code !== "Space" && event.key !== " ") || event.repeat) return;
    if (!/^(?:java|g1)-cards$/.test(flash.activeSection)) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest("input, select, textarea, a, [contenteditable='true'], button:not(.flashcard-scene)")) return;
    const collection = flash.activeSection.replace(/-cards$/, "");
    const scene = el(`${collection}-flashcards`).querySelector(".flashcard-scene");
    if (!scene) return;
    event.preventDefault();
    scene.click();
  });
}

async function init() {
  try {
    const response = await fetch(`assets/review-tests/index.json?v=${CONTENT_VERSION}`);
    state.manifest = await response.json();
    initGenerator();
    await loadSavedProgress();
    renderProgress();
    await Promise.all([loadChapter(0), initFlashcards()]);
  } catch (error) {
    el("quiz-card").innerHTML = `<div class="error">Unable to start the review lab: ${escapeHtml(error.message)}</div>`;
  }
}

initMenu();
initFlashcardKeyboard();
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
