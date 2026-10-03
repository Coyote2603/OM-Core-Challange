/* Tutorial login — a separate access code per challenge.
 *
 * This is NOT real security: the codes below and this check are visible to
 * anyone who views the page source or opens dev tools. It only keeps casual
 * visitors out.
 *
 * Each challenge (OM Core, Newsvendor, Inventory Management) has its own
 * code and its own localStorage flag, set here on a correct submission and
 * checked by the inline guard script in that challenge's own <head>. Unlocking
 * one challenge does not unlock the others.
 *
 * To change a code, edit the "code" value below for that entry — nothing
 * else needs to change.
 */
const CHALLENGE_ACCESS = Object.freeze([
  Object.freeze({
    page: "om-challenge.html",
    title: "The OM Core Challenge",
    code: "OMCoreIIMB2026",
    storageKey: "om_core_access_granted"
  }),
  Object.freeze({
    page: "newsvendor-challenge.html",
    title: "The Newsvendor Challenge",
    code: "NewsvendorIIMB2026",
    storageKey: "newsvendor_access_granted"
  }),
  Object.freeze({
    page: "inventory-challenge.html",
    title: "The Inventory Management Challenge",
    code: "InventoryIIMB2026",
    storageKey: "inventory_access_granted"
  })
]);

function tlFindChallenge(next) {
  if (!next) return undefined;
  const clean = next.split("?")[0].split("#")[0];
  const base = clean.split("/").pop();
  return CHALLENGE_ACCESS.find(entry => entry.page === base);
}

function tlRenderChooser(grid) {
  grid.innerHTML = `
    <div class="tl-login-card tl-chooser">
      <span class="tl-badge">Student access</span>
      <h1>Pick a challenge</h1>
      <p class="tl-subtitle">Each challenge below has its own access code. Choose one to continue, then enter the code shared through your course channel.</p>
      <div class="tl-chooser-list">
        ${CHALLENGE_ACCESS.map(entry => `<a class="tl-chooser-item" href="${entry.page}">${entry.title} <span aria-hidden="true">&rarr;</span></a>`).join("")}
      </div>
    </div>
  `;
}

function tlRenderForm(grid, entry, next) {
  grid.innerHTML = `
    <div class="tl-login-card">
      <span class="tl-badge">Student access</span>
      <h1>${entry.title}</h1>
      <p class="tl-subtitle">Enter the access code for this challenge.</p>
      <form id="tl-form" class="tl-form" autocomplete="off">
        <label for="tl-password" class="sr-only">Access code</label>
        <input type="password" id="tl-password" placeholder="Enter access code" autocomplete="off" />
        <button type="submit" class="game-primary-btn">Enter</button>
      </form>
      <p class="tl-error" id="tl-error" hidden>That code isn't right — check with your instructor and try again.</p>
      <p class="tl-hint">Use the code shared through your course channel for ${entry.title}. Each challenge has its own code.</p>
      <p class="tl-switch"><a href="tutorial-login.html">Looking for a different challenge?</a></p>
    </div>
  `;

  const form = document.getElementById("tl-form");
  const input = document.getElementById("tl-password");
  const error = document.getElementById("tl-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value.trim().toLowerCase() === entry.code.toLowerCase()) {
      try { localStorage.setItem(entry.storageKey, "yes"); } catch (err) { /* private browsing, etc. */ }
      window.location.href = next || entry.page;
    } else {
      error.hidden = false;
      input.value = "";
      input.focus();
    }
  });
}

(function () {
  const grid = document.getElementById("tl-grid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  const entry = tlFindChallenge(next);

  if (entry) {
    try {
      if (localStorage.getItem(entry.storageKey) === "yes") {
        window.location.replace(next);
        return;
      }
    } catch (err) { /* ignore */ }
    tlRenderForm(grid, entry, next);
  } else {
    tlRenderChooser(grid);
  }
})();
