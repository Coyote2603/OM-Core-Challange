/* Interactive Teaching Platform — shared page rendering and interaction logic. */

const DEFAULT_SITE_CONFIG = Object.freeze({
  siteTitle: "Interactive Teaching Platform",
  shortTitle: "Teaching Platform",
  courseTitle: "Course Title",
  courseSubtitle: "Guided sessions and practice activities.",
  instructorName: "",
  institutionName: "",
  footerText: "Interactive Teaching Platform",
  theme: Object.freeze({ primary: "#173f5f", accent: "#e05a47", accentText: "#b43e30" }),
  features: Object.freeze({ showGame: true }),
  games: Object.freeze([
    Object.freeze({
      title: "Interactive Game",
      description: "Practice a course decision and learn from immediate feedback.",
      href: "om-challenge.html",
      duration: "Interactive activity"
    })
  ])
});

function getGames(config) {
  if (Array.isArray(config.games) && config.games.length > 0) return config.games;
  if (config.game) return [config.game];
  return DEFAULT_SITE_CONFIG.games;
}

const mathRenderOptions = {
  delimiters: [
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true }
  ],
  throwOnError: false
};

function getSiteConfig() {
  return typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : DEFAULT_SITE_CONFIG;
}

function getSessions() {
  return typeof SESSIONS !== "undefined" && Array.isArray(SESSIONS) ? SESSIONS : [];
}

function renderMath(root) {
  if (root && typeof renderMathInElement === "function") {
    renderMathInElement(root, mathRenderOptions);
  }
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applySiteConfig() {
  const config = getSiteConfig();
  const root = document.documentElement;
  root.style.setProperty("--primary", config.theme?.primary || DEFAULT_SITE_CONFIG.theme.primary);
  root.style.setProperty("--accent", config.theme?.accent || DEFAULT_SITE_CONFIG.theme.accent);
  root.style.setProperty("--accent-text", config.theme?.accentText || DEFAULT_SITE_CONFIG.theme.accentText);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta && !document.body.classList.contains("presenter-page")) {
    themeMeta.content = config.theme?.primary || DEFAULT_SITE_CONFIG.theme.primary;
  }

  document.querySelectorAll('[data-config="siteTitle"]').forEach(element => {
    element.textContent = config.siteTitle || DEFAULT_SITE_CONFIG.siteTitle;
  });
  document.querySelectorAll('[data-config="shortTitle"]').forEach(element => {
    element.textContent = config.shortTitle || DEFAULT_SITE_CONFIG.shortTitle;
  });
  document.querySelectorAll('[data-config="courseTitle"]').forEach(element => {
    element.textContent = config.courseTitle || DEFAULT_SITE_CONFIG.courseTitle;
  });
  document.querySelectorAll('[data-config="courseSubtitle"]').forEach(element => {
    element.textContent = config.courseSubtitle || DEFAULT_SITE_CONFIG.courseSubtitle;
  });
  document.querySelectorAll('[data-config="footerText"]').forEach(element => {
    element.textContent = config.footerText || DEFAULT_SITE_CONFIG.footerText;
  });

  const courseMeta = document.getElementById("course-meta");
  if (courseMeta) {
    const details = [config.instructorName, config.institutionName].filter(Boolean);
    courseMeta.textContent = details.join(" · ");
    courseMeta.hidden = details.length === 0;
  }

  const gameLink = document.getElementById("hero-game-link");
  if (gameLink) {
    const showGame = config.features?.showGame !== false;
    gameLink.hidden = !showGame;
    gameLink.href = getGames(config)[0]?.href || "om-challenge.html";
  }
}

function currentPageName() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function renderNav() {
  const navLinks = document.getElementById("nav-links");
  if (!navLinks) return;

  const config = getSiteConfig();
  const pageName = currentPageName();
  const isHome = pageName === "index.html";

  const links = [
    `<li><a href="index.html"${isHome ? ' class="active" aria-current="page"' : ""}>Home</a></li>`
  ];

  links.push(`<li><a href="tutorial-login.html" class="nav-login${pageName === "tutorial-login.html" ? " active" : ""}">Tutorial login</a></li>`);

  if (config.features?.showGame !== false) {
    getGames(config).forEach(game => {
      const isGame = pageName === game.href;
      links.push(`<li><a href="${escapeHTML(game.href)}" class="nav-game${isGame ? " active" : ""}"${isGame ? ' aria-current="page"' : ""}>${escapeHTML(game.title)}</a></li>`);
    });
  }

  navLinks.innerHTML = links.join("");
}

function renderDashboard() {
  const grid = document.getElementById("card-grid");
  if (!grid) return;

  const sessions = getSessions();
  const config = getSiteConfig();
  const heading = document.getElementById("session-list-title");
  if (heading) {
    heading.textContent = sessions.length > 0
      ? `${sessions.length} example ${sessions.length === 1 ? "session" : "sessions"}`
      : "Build your first guided session";
  }

  const sessionCards = sessions.map(session => {
    const objective = session.objectives?.[0] || "Open the guided session";
    return `<a class="session-card" href="session.html?s=${session.number}">
      <div class="session-card-top">
        <span class="session-card-number">${String(session.number).padStart(2, "0")}</span>
        <span class="session-card-arrow" aria-hidden="true">↗</span>
      </div>
      <span class="session-card-kicker">${escapeHTML(session.kicker || "Guided session")}</span>
      <h3>${escapeHTML(session.title)}</h3>
      <p>${escapeHTML(session.summary)}</p>
      <div class="session-card-footer"><span>Example objective</span><strong>${escapeHTML(objective)}</strong></div>
    </a>`;
  });

  if (sessions.length === 0) {
    sessionCards.push(`<article class="dashboard-empty">
      <span aria-hidden="true">＋</span>
      <div><h3>No sessions configured yet</h3><p>Add your first session object to <code>js/content.js</code>. The dashboard, navigation, and presenter links will update automatically.</p></div>
    </article>`);
  }

  if (config.features?.showGame !== false) {
    getGames(config).forEach(game => {
      sessionCards.push(`<a class="session-card game-card" href="${escapeHTML(game.href)}">
        <div class="session-card-top">
          <span class="session-card-number game-mark" aria-hidden="true">Q?</span>
          <span class="session-card-arrow" aria-hidden="true">↗</span>
        </div>
        <span class="session-card-kicker">Code required</span>
        <h3>${escapeHTML(game.title)}</h3>
        <p>${escapeHTML(game.description)}</p>
        <div class="session-card-footer"><span>${escapeHTML(game.duration)}</span><strong>Play now</strong></div>
      </a>`);
    });
  }

  grid.innerHTML = sessionCards.join("");
}

function renderConcepts(session) {
  if (!session.concepts?.length) return "";
  return `<section class="content-section" id="concepts" aria-labelledby="concepts-title">
    <div class="content-heading"><span class="eyebrow">Foundation</span><h2 id="concepts-title">Key concepts</h2><p>These short cards provide a shared reference for the session.</p></div>
    <div class="concept-grid">${session.concepts.map(concept => `<article class="concept-card">
      <span class="concept-marker" aria-hidden="true">${escapeHTML(concept.marker || "•")}</span>
      <h3>${escapeHTML(concept.title)}</h3>
      <p>${escapeHTML(concept.body)}</p>
    </article>`).join("")}</div>
  </section>`;
}

function renderDiagrams(session) {
  if (!session.diagrams?.length) return "";
  return `<section class="content-section" id="diagrams" aria-labelledby="diagrams-title">
    <div class="content-heading"><span class="eyebrow">Visual model</span><h2 id="diagrams-title">See the structure</h2></div>
    ${session.diagrams.map(diagram => `<figure class="diagram-block">
      <figcaption class="diagram-title"><h3>${escapeHTML(diagram.title)}</h3>${diagram.caption ? `<p>${escapeHTML(diagram.caption)}</p>` : ""}</figcaption>
      <div class="diagram-canvas">${diagram.html || ""}</div>
    </figure>`).join("")}
  </section>`;
}

function renderMaterials(session) {
  const hasSlides = Boolean(session.teachingSlides?.length);
  const hasMaterials = Boolean(session.materials?.length);
  if (!hasSlides && !hasMaterials) return "";

  const resourceCards = (session.materials || []).map(material => `<a class="resource-card" href="${escapeHTML(material.url)}" target="_blank" rel="noopener noreferrer">
    <span class="resource-type">${escapeHTML(material.type || "Resource")}</span>
    <h3>${escapeHTML(material.label)}</h3>
    <p>${escapeHTML(material.description || "")}</p>
    <span class="resource-action">Open resource <span aria-hidden="true">↗</span></span>
    ${material.optional ? '<span class="optional-badge">Optional</span>' : ""}<span class="sr-only"> (opens in a new tab)</span>
  </a>`).join("");

  const presenterCard = hasSlides ? `<a class="resource-card presenter-card" href="present.html?s=${session.number}">
    <span class="resource-type">Interactive presenter</span>
    <h3>Open teaching slides</h3>
    <p>Use arrows, swipe gestures, fullscreen mode, slide navigation, and progressive hints.</p>
    <span class="resource-action">Launch presenter <span aria-hidden="true">→</span></span>
  </a>` : "";

  return `<section class="content-section" id="materials" aria-labelledby="materials-title">
    <div class="content-heading"><span class="eyebrow">Choose what helps</span><h2 id="materials-title">Slides and optional resources</h2><p>Resources open separately so learners can print, save, or return to the session without losing their place.</p></div>
    <div class="resource-grid">${presenterCard}${resourceCards}</div>
  </section>`;
}

function renderProblems(session) {
  if (!session.problems?.length) return "";

  const problems = session.problems.map((problem, problemIndex) => {
    const parts = (problem.parts || []).map((part, partIndex) => {
      const solutionId = `solution-${session.number}-${problemIndex}-${partIndex}`;
      const letter = String.fromCharCode(65 + partIndex);
      return `<div class="problem-part">
        <div class="part-question"><span>${letter}</span><p>${escapeHTML(part.question)}</p></div>
        <button type="button" class="solution-toggle" data-solution-id="${solutionId}" data-solution-label="Problem ${problemIndex + 1}, part ${letter}" aria-label="Reveal worked response for Problem ${problemIndex + 1}, part ${letter}" aria-expanded="false" aria-controls="${solutionId}">
          <span class="solution-toggle-label">Reveal worked response</span><span class="solution-chevron" aria-hidden="true">＋</span>
        </button>
        <div class="solution-body" id="${solutionId}" hidden>${part.solution || ""}</div>
      </div>`;
    }).join("");

    return `<article class="problem-block">
      <div class="problem-header"><span>Problem ${problemIndex + 1}</span><span class="problem-level">${escapeHTML(problem.level || "Practice")}</span></div>
      <h3>${escapeHTML(problem.title)}</h3>
      ${problem.context ? `<div class="problem-context">${escapeHTML(problem.context)}</div>` : ""}
      <div class="problem-parts">${parts}</div>
    </article>`;
  }).join("");

  return `<section class="content-section" id="problems" aria-labelledby="problems-title">
    <div class="content-heading"><span class="eyebrow">Active practice</span><h2 id="problems-title">Multipart problems</h2><p>Worked responses can be revealed one part at a time after an attempt.</p></div>
    <div class="problem-list">${problems}</div>
  </section>`;
}

function renderReadings(session) {
  if (!session.readings?.length) return "";
  return `<section class="content-section" id="readings" aria-labelledby="readings-title">
    <div class="content-heading"><span class="eyebrow">Continue exploring</span><h2 id="readings-title">Suggested readings</h2></div>
    <div class="reading-list">${session.readings.map(reading => `<a href="${escapeHTML(reading.url)}" target="_blank" rel="noopener noreferrer">
      <span><strong>${escapeHTML(reading.label)}</strong><small>${escapeHTML(reading.meta || "Optional reading")}</small></span><b aria-hidden="true">↗</b>
      <span class="sr-only"> (opens in a new tab)</span></a>`).join("")}</div>
  </section>`;
}

function renderSession() {
  const container = document.getElementById("session-content");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const requestedNumber = Number.parseInt(params.get("s"), 10);
  const session = getSessions().find(item => item.number === requestedNumber);
  const config = getSiteConfig();

  if (!session) {
    const hero = document.querySelector(".session-hero");
    if (hero) hero.hidden = true;
    document.title = `Session not found | ${config.siteTitle || DEFAULT_SITE_CONFIG.siteTitle}`;
    container.innerHTML = `<section class="not-found"><span aria-hidden="true">?</span><h1>Session not found</h1><p>Choose one of the available sessions from the course home page.</p><a class="btn btn-primary" href="index.html">Return home</a></section>`;
    return;
  }

  document.title = `${session.title} | ${config.siteTitle || DEFAULT_SITE_CONFIG.siteTitle}`;
  const title = document.getElementById("session-title");
  const subtitle = document.getElementById("session-subtitle");
  const kicker = document.getElementById("session-kicker");
  const number = document.getElementById("session-number");
  const breadcrumb = document.getElementById("breadcrumb-session");
  const objectives = document.getElementById("session-objectives");

  if (title) title.textContent = session.title;
  if (subtitle) subtitle.textContent = session.summary;
  if (kicker) kicker.textContent = session.kicker || "Guided session";
  if (number) number.textContent = String(session.number).padStart(2, "0");
  if (breadcrumb) breadcrumb.textContent = session.title;
  if (objectives) {
    objectives.innerHTML = (session.objectives || []).map(objective => `<li>${escapeHTML(objective)}</li>`).join("");
  }

  const outline = [
    session.concepts?.length ? ["concepts", "Concepts"] : null,
    session.diagrams?.length ? ["diagrams", "Visual model"] : null,
    session.teachingSlides?.length || session.materials?.length ? ["materials", "Resources"] : null,
    session.problems?.length ? ["problems", "Problems"] : null,
    session.readings?.length ? ["readings", "Readings"] : null
  ].filter(Boolean);

  container.innerHTML = `<div class="session-layout container">
    <aside class="session-sidebar">
      <nav class="session-outline" aria-label="Session contents">
        <span>On this page</span>
        ${outline.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}
      </nav>
      <div class="session-tip"><span aria-hidden="true">i</span><p><strong>Ways to use this session</strong> The model, problems, and slides can support self-study, discussion, or teaching.</p></div>
    </aside>
    <div class="session-main">
      ${renderConcepts(session)}
      ${renderDiagrams(session)}
      ${renderMaterials(session)}
      ${renderProblems(session)}
      ${renderReadings(session)}
      <nav class="session-pagination" aria-label="Adjacent sessions">${renderSessionPagination(session)}</nav>
    </div>
  </div>`;

  setupSolutionToggles(container);
  renderMath(container);
}

function renderSessionPagination(session) {
  const sessions = getSessions();
  const index = sessions.findIndex(item => item.number === session.number);
  const previous = index > 0 ? sessions[index - 1] : null;
  const next = index < sessions.length - 1 ? sessions[index + 1] : null;

  return `${previous ? `<a href="session.html?s=${previous.number}"><span>← Previous</span><strong>${escapeHTML(previous.title)}</strong></a>` : "<span></span>"}
    ${next ? `<a class="next" href="session.html?s=${next.number}"><span>Next →</span><strong>${escapeHTML(next.title)}</strong></a>` : `<a class="next" href="index.html"><span>Complete</span><strong>Return home</strong></a>`}`;
}

function toggleSolution(id, button) {
  const solution = document.getElementById(id);
  if (!solution || !button) return;
  const willOpen = solution.hidden;
  solution.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  button.setAttribute("aria-label", `${willOpen ? "Hide" : "Reveal"} worked response for ${button.dataset.solutionLabel}`);
  button.querySelector(".solution-toggle-label").textContent = willOpen ? "Hide worked response" : "Reveal worked response";
  button.querySelector(".solution-chevron").textContent = willOpen ? "−" : "＋";
  if (willOpen) renderMath(solution);
}

function setupSolutionToggles(root) {
  root.querySelectorAll(".solution-toggle").forEach(button => {
    button.addEventListener("click", () => toggleSolution(button.dataset.solutionId, button));
  });
}

function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (!toggle || !navLinks || toggle.dataset.ready === "true") return;
  toggle.dataset.ready = "true";

  const close = (restoreFocus = false) => {
    const wasOpen = navLinks.classList.contains("open");
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    if (restoreFocus && wasOpen) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  navLinks.addEventListener("click", event => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close(true);
  });
}

function init() {
  applySiteConfig();
  renderNav();
  renderDashboard();
  renderSession();
  setupMobileNav();

  const config = getSiteConfig();
  if (document.getElementById("card-grid")) {
    document.title = `${config.courseTitle || DEFAULT_SITE_CONFIG.courseTitle} | ${config.siteTitle || DEFAULT_SITE_CONFIG.siteTitle}`;
  }

  if (typeof initOMChallenge === "function") initOMChallenge();
  if (typeof initNVChallenge === "function") initNVChallenge();
  if (typeof initInventoryChallenge === "function") initInventoryChallenge();
}

document.addEventListener("DOMContentLoaded", init);
