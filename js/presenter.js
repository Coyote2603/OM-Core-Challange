/* Interactive Teaching Platform — interactive presenter mode. */

const PRESENTER_DEFAULTS = Object.freeze({
  siteTitle: "Interactive Teaching Platform",
  theme: Object.freeze({ primary: "#173f5f", accent: "#e05a47" })
});

const mathRenderOptions = {
  delimiters: [
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true }
  ],
  throwOnError: false
};

let presenterSession = null;
let currentSlide = 0;
let totalSlides = 0;
let lastOverlayTrigger = null;

function setPresenterBackgroundBlocked(blocked) {
  document.querySelectorAll("#presenter > :not(.presenter-overlay)").forEach(element => {
    if (blocked) {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    } else {
      element.removeAttribute("inert");
      element.removeAttribute("aria-hidden");
    }
  });
}

function presenterConfig() {
  return typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : PRESENTER_DEFAULTS;
}

function presenterSessions() {
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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function applyPresenterTheme() {
  const config = presenterConfig();
  document.documentElement.style.setProperty("--primary", config.theme?.primary || PRESENTER_DEFAULTS.theme.primary);
  document.documentElement.style.setProperty("--accent", config.theme?.accent || PRESENTER_DEFAULTS.theme.accent);
}

function renderHints(hints) {
  if (!hints?.length) return "";

  const buttons = hints.map((hint, index) => `<button type="button" class="hint-btn" data-hint-index="${index}" id="hint-button-${index}" aria-expanded="false" aria-controls="hint-panel-${index}">
    <span class="hint-icon" aria-hidden="true">${escapeHTML(hint.icon || "?")}</span>
    <span>${escapeHTML(hint.label || `Hint ${index + 1}`)}</span>
  </button>`).join("");

  const panels = hints.map((hint, index) => `<section class="hint-panel" id="hint-panel-${index}" aria-labelledby="hint-button-${index}" hidden>
    <div class="hint-panel-header"><strong>${escapeHTML(hint.label || `Hint ${index + 1}`)}</strong><button type="button" class="hint-close" data-close-hint="${index}" aria-label="Close ${escapeHTML(hint.label || "hint")}">×</button></div>
    <div class="hint-panel-body">${hint.content || ""}</div>
  </section>`).join("");

  return `<div class="hint-area"><div class="hint-bar" aria-label="Optional slide hints">${buttons}</div><div class="hint-panels">${panels}</div></div>`;
}

function setupHintControls() {
  document.querySelectorAll(".hint-btn").forEach(button => {
    button.addEventListener("click", () => toggleHint(Number(button.dataset.hintIndex)));
  });
  document.querySelectorAll("[data-close-hint]").forEach(button => {
    button.addEventListener("click", () => closeHint(Number(button.dataset.closeHint), true));
  });
}

function toggleHint(index) {
  const panel = document.getElementById(`hint-panel-${index}`);
  const button = document.getElementById(`hint-button-${index}`);
  if (!panel || !button) return;
  const shouldOpen = panel.hidden;

  document.querySelectorAll(".hint-panel").forEach(item => { item.hidden = true; });
  document.querySelectorAll(".hint-btn").forEach(item => {
    item.classList.remove("active");
    item.setAttribute("aria-expanded", "false");
  });

  if (shouldOpen) {
    panel.hidden = false;
    button.classList.add("active");
    button.setAttribute("aria-expanded", "true");
    renderMath(panel);
    requestAnimationFrame(() => {
      panel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
      updateScrollCue();
    });
  } else {
    requestAnimationFrame(updateScrollCue);
  }
}

function closeHint(index, restoreFocus = false) {
  const panel = document.getElementById(`hint-panel-${index}`);
  const button = document.getElementById(`hint-button-${index}`);
  if (panel) panel.hidden = true;
  if (button) {
    button.classList.remove("active");
    button.setAttribute("aria-expanded", "false");
    if (restoreFocus) button.focus({ preventScroll: true });
  }
  requestAnimationFrame(updateScrollCue);
}

function slideTypeIcon(type) {
  return ({ title: "T", concept: "C", formula: "ƒ", step: "S", table: "#", diagram: "D", image: "I" })[type] || "•";
}

function openSlideJump() {
  if (!presenterSession || document.getElementById("slide-jump-overlay")) return;
  closePresenterHelp(false);
  lastOverlayTrigger = document.activeElement;
  document.getElementById("slide-counter").setAttribute("aria-expanded", "true");

  const overlay = document.createElement("div");
  overlay.id = "slide-jump-overlay";
  overlay.className = "presenter-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "slide-jump-title");

  overlay.innerHTML = `<div class="overlay-dialog slide-jump-dialog">
    <div class="overlay-header"><div><span>Session ${presenterSession.number}</span><h2 id="slide-jump-title">Choose a slide</h2></div><button type="button" class="overlay-close" aria-label="Close slide navigator">×</button></div>
    <div class="slide-jump-grid">${presenterSession.teachingSlides.map((slide, index) => `<button type="button" class="slide-jump-item${index === currentSlide ? " current" : ""}" data-slide-index="${index}"${index === currentSlide ? ' aria-current="true"' : ""}>
      <span class="jump-number">${String(index + 1).padStart(2, "0")}</span><b aria-hidden="true">${slideTypeIcon(slide.type)}</b><span>${escapeHTML(slide.title)}</span>
    </button>`).join("")}</div>
  </div>`;

  document.getElementById("presenter").appendChild(overlay);
  overlay.querySelector(".overlay-close").addEventListener("click", () => closeSlideJump());
  overlay.querySelectorAll("[data-slide-index]").forEach(button => {
    button.addEventListener("click", () => {
      currentSlide = Number(button.dataset.slideIndex);
      closeSlideJump(false);
      renderSlide(currentSlide);
      document.getElementById("slide-viewport").focus({ preventScroll: true });
    });
  });
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeSlideJump();
  });
  overlay.addEventListener("keydown", trapFocus);
  (overlay.querySelector(".slide-jump-item.current") || overlay.querySelector(".overlay-close")).focus();
  setPresenterBackgroundBlocked(true);
}

function closeSlideJump(restoreFocus = true) {
  const overlay = document.getElementById("slide-jump-overlay");
  setPresenterBackgroundBlocked(false);
  if (overlay) overlay.remove();
  document.getElementById("slide-counter")?.setAttribute("aria-expanded", "false");
  if (restoreFocus && lastOverlayTrigger && document.contains(lastOverlayTrigger)) {
    lastOverlayTrigger.focus({ preventScroll: true });
  }
}

function openPresenterHelp() {
  if (document.getElementById("presenter-help-overlay")) return;
  closeSlideJump(false);
  lastOverlayTrigger = document.activeElement;
  const helpButton = document.getElementById("help-btn");
  helpButton.setAttribute("aria-expanded", "true");

  const overlay = document.createElement("div");
  overlay.id = "presenter-help-overlay";
  overlay.className = "presenter-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "presenter-help-title");
  overlay.innerHTML = `<div class="overlay-dialog help-dialog">
    <div class="overlay-header"><div><span>Presenter guide</span><h2 id="presenter-help-title">Controls and study tips</h2></div><button type="button" class="overlay-close" aria-label="Close presenter help">×</button></div>
    <div class="help-grid">
      <div><span class="help-keys"><kbd>←</kbd><kbd>→</kbd></span><strong>Change slide</strong><p>Use arrow keys, the controls below, or a horizontal swipe.</p></div>
      <div><kbd>Space</kbd><strong>Scroll, then advance</strong><p>Space moves through a long slide before advancing.</p></div>
      <div><kbd>G</kbd><strong>Go to a slide</strong><p>Open the visual slide navigator.</p></div>
      <div><kbd>F</kbd><strong>Fullscreen</strong><p>Enter or leave fullscreen presentation mode.</p></div>
      <div><span class="help-symbol">?</span><strong>Optional hints</strong><p>Open one hint at a time whenever another prompt or example would help.</p></div>
      <div><kbd>Esc</kbd><strong>Close or exit</strong><p>Close an open panel, leave fullscreen, or return to the session.</p></div>
    </div>
  </div>`;

  document.getElementById("presenter").appendChild(overlay);
  overlay.querySelector(".overlay-close").addEventListener("click", () => closePresenterHelp());
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closePresenterHelp();
  });
  overlay.addEventListener("keydown", trapFocus);
  overlay.querySelector(".overlay-close").focus();
  setPresenterBackgroundBlocked(true);
}

function closePresenterHelp(restoreFocus = true) {
  const overlay = document.getElementById("presenter-help-overlay");
  setPresenterBackgroundBlocked(false);
  if (overlay) overlay.remove();
  const helpButton = document.getElementById("help-btn");
  if (helpButton) helpButton.setAttribute("aria-expanded", "false");
  if (restoreFocus && lastOverlayTrigger && document.contains(lastOverlayTrigger)) {
    lastOverlayTrigger.focus({ preventScroll: true });
  }
}

function trapFocus(event) {
  if (event.key !== "Tab") return;
  const focusable = Array.from(event.currentTarget.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')).filter(element => !element.disabled);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    last.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === last) {
    first.focus();
    event.preventDefault();
  }
}

function renderSlide(index) {
  if (!presenterSession) return;
  const slide = presenterSession.teachingSlides[index];
  const container = document.getElementById("slide-container");
  const presenter = document.getElementById("presenter");
  if (!slide || !container || !presenter) return;

  presenter.dataset.slideType = slide.type || "concept";
  container.className = `slide-container slide-${slide.type || "concept"}`;
  container.setAttribute("role", "group");
  container.setAttribute("aria-roledescription", "slide");
  container.setAttribute("aria-label", `Slide ${index + 1} of ${totalSlides}: ${slide.title}`);

  let content = "";
  if (slide.type === "title") {
    content = `<div class="slide-title-content"><span class="slide-session-label">Session ${String(presenterSession.number).padStart(2, "0")}</span><h1>${escapeHTML(slide.title)}</h1>${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(slide.subtitle)}</p>` : ""}${slide.content ? `<div class="slide-body">${slide.content}</div>` : ""}</div>`;
  } else {
    const visualClass = slide.type === "diagram" || slide.type === "image" ? "slide-visual" : "slide-body";
    content = `<div class="slide-heading-row"><span>${escapeHTML(presenterSession.title)}</span><h1>${escapeHTML(slide.title)}</h1></div><div class="${visualClass}">${slide.content || ""}</div>`;
  }

  container.innerHTML = content + renderHints(slide.hints);
  setupHintControls();
  renderMath(container);

  const counter = document.getElementById("slide-counter");
  counter.textContent = `${index + 1} / ${totalSlides}`;
  counter.setAttribute("aria-label", `Slide ${index + 1} of ${totalSlides}. Open slide navigator`);

  const progress = document.getElementById("progress-bar");
  progress.setAttribute("aria-valuemax", String(totalSlides));
  progress.setAttribute("aria-valuenow", String(index + 1));
  progress.setAttribute("aria-valuetext", `Slide ${index + 1} of ${totalSlides}`);
  document.getElementById("progress-fill").style.width = `${((index + 1) / totalSlides) * 100}%`;

  updateNavigationState();
  const viewport = document.getElementById("slide-viewport");
  viewport.scrollTop = 0;
  requestAnimationFrame(updateScrollCue);
}

function updateNavigationState() {
  const previous = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");
  previous.disabled = currentSlide === 0;
  next.disabled = currentSlide === totalSlides - 1;
  previous.setAttribute("aria-disabled", String(previous.disabled));
  next.setAttribute("aria-disabled", String(next.disabled));
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide += 1;
    renderSlide(currentSlide);
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    currentSlide -= 1;
    renderSlide(currentSlide);
  }
}

function updateScrollCue() {
  const viewport = document.getElementById("slide-viewport");
  const cue = document.getElementById("scroll-cue");
  if (!viewport || !cue) return;
  const moreBelow = viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 8;
  cue.classList.toggle("visible", moreBelow);
}

function scrollOrAdvance() {
  const viewport = document.getElementById("slide-viewport");
  const moreBelow = viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 8;
  if (moreBelow) {
    viewport.scrollBy({ top: Math.max(180, viewport.clientHeight * 0.7), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  } else {
    nextSlide();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.();
  }
}

function updateFullscreenButton() {
  const button = document.getElementById("fullscreen-btn");
  const active = Boolean(document.fullscreenElement);
  button.setAttribute("aria-pressed", String(active));
  button.textContent = active ? "Exit fullscreen" : "Fullscreen";
}

function setupPresenterEvents() {
  document.getElementById("prev-btn").addEventListener("click", previousSlide);
  document.getElementById("next-btn").addEventListener("click", nextSlide);
  document.getElementById("slide-counter").addEventListener("click", openSlideJump);
  document.getElementById("help-btn").addEventListener("click", openPresenterHelp);
  document.getElementById("fullscreen-btn").addEventListener("click", toggleFullscreen);
  document.getElementById("slide-viewport").addEventListener("scroll", updateScrollCue, { passive: true });
  window.addEventListener("resize", updateScrollCue);
  document.addEventListener("fullscreenchange", updateFullscreenButton);

  document.addEventListener("keydown", event => {
    if (document.getElementById("presenter-help-overlay")) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePresenterHelp();
      }
      return;
    }
    if (document.getElementById("slide-jump-overlay")) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSlideJump();
      }
      return;
    }

    const interactive = event.target.closest?.("button, a, input, textarea, select");
    if (interactive && (event.key === " " || event.key === "Enter")) return;

    switch (event.key) {
      case "ArrowRight": event.preventDefault(); nextSlide(); break;
      case "ArrowLeft": event.preventDefault(); previousSlide(); break;
      case " ": event.preventDefault(); scrollOrAdvance(); break;
      case "ArrowDown":
      case "PageDown": event.preventDefault(); document.getElementById("slide-viewport").scrollBy({ top: 220, behavior: prefersReducedMotion() ? "auto" : "smooth" }); break;
      case "ArrowUp":
      case "PageUp": event.preventDefault(); document.getElementById("slide-viewport").scrollBy({ top: -220, behavior: prefersReducedMotion() ? "auto" : "smooth" }); break;
      case "Home": if (!interactive) { event.preventDefault(); currentSlide = 0; renderSlide(currentSlide); } break;
      case "End": if (!interactive) { event.preventDefault(); currentSlide = totalSlides - 1; renderSlide(currentSlide); } break;
      case "g":
      case "G": if (!interactive) { event.preventDefault(); openSlideJump(); } break;
      case "f":
      case "F": if (!interactive) { event.preventDefault(); toggleFullscreen(); } break;
      case "?": if (!interactive) { event.preventDefault(); openPresenterHelp(); } break;
      case "Escape": {
        const openHint = document.querySelector(".hint-panel:not([hidden])");
        if (openHint) closeHint(Number(openHint.id.replace("hint-panel-", "")), true);
        else if (document.fullscreenElement) document.exitFullscreen?.();
        else window.location.href = document.getElementById("exit-btn").href;
        break;
      }
    }
  });

  let touchX = 0;
  let touchY = 0;
  let horizontalScroller = false;
  const viewport = document.getElementById("slide-viewport");
  viewport.addEventListener("touchstart", event => {
    touchX = event.changedTouches[0].screenX;
    touchY = event.changedTouches[0].screenY;
    const scrollable = event.target.closest?.(".slide-table-wrap, .formula-box, .hint-panel-body");
    horizontalScroller = Boolean(scrollable && scrollable.scrollWidth > scrollable.clientWidth + 4);
  }, { passive: true });
  viewport.addEventListener("touchend", event => {
    const deltaX = event.changedTouches[0].screenX - touchX;
    const deltaY = event.changedTouches[0].screenY - touchY;
    if (!horizontalScroller && Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) nextSlide(); else previousSlide();
    }
  }, { passive: true });
}

function initPresenter() {
  applyPresenterTheme();
  const requestedNumber = Number.parseInt(new URLSearchParams(window.location.search).get("s"), 10);
  presenterSession = presenterSessions().find(item => item.number === requestedNumber);
  const container = document.getElementById("slide-container");

  if (!presenterSession?.teachingSlides?.length) {
    document.title = `No slides available | ${presenterConfig().siteTitle || PRESENTER_DEFAULTS.siteTitle}`;
    document.getElementById("presenter").classList.add("presenter-error");
    container.innerHTML = `<div class="presenter-empty"><span aria-hidden="true">?</span><h1>No slides available</h1><p>Choose a session that includes interactive slides.</p><a href="index.html">Return to the course home</a></div>`;
    document.getElementById("slide-counter").hidden = true;
    document.querySelector(".presenter-actions").hidden = true;
    document.getElementById("progress-bar").hidden = true;
    document.querySelector(".presenter-nav").hidden = true;
    return;
  }

  totalSlides = presenterSession.teachingSlides.length;
  currentSlide = 0;
  document.title = `${presenterSession.title} — Presenter | ${presenterConfig().siteTitle || PRESENTER_DEFAULTS.siteTitle}`;
  const exitButton = document.getElementById("exit-btn");
  exitButton.href = `session.html?s=${presenterSession.number}`;
  exitButton.setAttribute("aria-label", "Exit presentation and return to the session");
  setupPresenterEvents();
  renderSlide(currentSlide);
  updateFullscreenButton();
}

document.addEventListener("DOMContentLoaded", initPresenter);
