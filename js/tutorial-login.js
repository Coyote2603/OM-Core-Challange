/* Tutorial session login — a simple client-side access code.
 *
 * This is NOT real security: the code below and this check are visible to
 * anyone who views the page source or opens dev tools. It only keeps casual
 * visitors out. The same code gates the OM Core Challenge, the Newsvendor
 * Challenge, and the guided tutorial sessions (see the inline guard script
 * in each of those pages' <head>, which checks the same localStorage flag).
 */
(function () {
  const TUTORIAL_PASSWORD = "OMCoreIIMB2026"; // <-- change this to the code you share with students
  const STORAGE_KEY = "tutorial_access_granted";

  const form = document.getElementById("tl-form");
  if (!form) return;
  const input = document.getElementById("tl-password");
  const error = document.getElementById("tl-error");

  // If already unlocked, skip straight through.
  try {
    if (localStorage.getItem(STORAGE_KEY) === "yes") {
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "index.html";
      window.location.replace(next);
    }
  } catch (err) { /* ignore */ }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value.trim().toLowerCase() === TUTORIAL_PASSWORD.toLowerCase()) {
      try { localStorage.setItem(STORAGE_KEY, "yes"); } catch (err) { /* private browsing, etc. */ }
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "index.html";
      window.location.href = next;
    } else {
      error.hidden = false;
      input.value = "";
      input.focus();
    }
  });
})();
