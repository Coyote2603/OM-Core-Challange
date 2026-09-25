# Architecture

The Interactive Teaching Platform is a zero-build static application. Page templates load configuration and content into the browser, then small renderer scripts construct the visible interface.

## Runtime flow

```text
js/site-config.js ─┐
                   ├─> page renderer ─> dashboard, session, or presenter view
js/content.js ─────┘

js/om-challenge.js ──> standalone OM Core Challenge
```

There is no application server, API, database, user account, or compilation step.

## Pages

| Page | Responsibility |
| --- | --- |
| `index.html` | Course identity, recommended learning path, session dashboard, and optional game entry point |
| `session.html` | One session's objectives, concepts, diagrams, materials, problems, readings, and presenter link |
| `present.html` | Full-screen interactive teaching slides for a selected session |
| `om-challenge.html` | Standalone public OM Core Challenge |

Sessions are selected with a numeric query parameter, for example `session.html?s=3` and `present.html?s=3`.

## JavaScript responsibilities

| File | Responsibility | Typical adopter edits |
| --- | --- | --- |
| `js/site-config.js` | Public identity, theme colors, feature flags, and game-card copy | Yes |
| `js/content.js` | Synthetic sessions or course-specific public content | Yes |
| `js/app.js` | Dashboard and session rendering, link behavior, math rendering | Usually no |
| `js/presenter.js` | Slide navigation, progress, hints, overview, and keyboard behavior | Usually no |
| `js/om-challenge.js` | Question data, per-option hints and solutions, and activity UI | Only when adapting the questions |

The first two files form the intended course-authoring interface. Keeping renderer changes separate helps adopters receive infrastructure updates.

## Styles

- `css/style.css` covers the dashboard and session interface.
- `css/presenter.css` covers the full-screen teaching view.
- `css/om-challenge.css` covers the OM Core Challenge.
- Theme values from `SITE_CONFIG.theme` are applied at runtime to shared CSS custom properties.

## Math rendering

KaTeX and its fonts are vendored under `vendor/katex`. Keeping the dependency local avoids a runtime CDN dependency and allows the site to work in restricted classroom networks after the static assets have loaded.

The third-party files retain their own license. See [Third-party notices](../THIRD_PARTY_NOTICES.md).

## Trust boundary

`js/content.js` contains trusted, maintainer-reviewed HTML strings. The renderer inserts some of those strings into the DOM. That is appropriate for a static author-controlled repository, but it is not safe for untrusted user submissions.

Do not connect form responses, URL parameters, LMS submissions, or remote JSON directly to the HTML-rendered fields. A future multi-author content system would need authentication, schema validation, and HTML sanitization.

The boundary is also a publication boundary. Configuration, content, hints, solutions, and URLs are readable from the public JavaScript source even when the interface initially hides them.

## Validation architecture

`npm run check` runs three dependency-free Node.js checks:

1. `scripts/check-public-boundary.mjs` applies `PUBLIC_CONTENT_MANIFEST.json`, blocking prohibited files, oversized artifacts, private-course terms in runtime paths, and common secret patterns.
2. `scripts/validate-content.mjs` evaluates the public configuration and content data in a controlled context and checks their expected structure.
3. `scripts/test-om-challenge.mjs` checks the OM Core Challenge question data shape and worked-solution presence.

GitHub Actions runs the same integrated command on pushes and pull requests. These checks are guardrails, not a substitute for browser, licensing, accessibility, and privacy review.

## Extension points

Low-risk extensions include:

- new session objects using the existing model;
- new slide content using a supported visual type;
- new public HTML handouts;
- alternative colors and public identity; and
- additional validated OM Core Challenge questions.

Changes that deserve an architecture discussion include:

- learner accounts or saved progress;
- remote content ingestion;
- forms, analytics, or grading;
- instructor-only content inside the deployment;
- new HTML sanitization requirements;
- a framework or build tool; and
- an API or database.

Those changes add operational, privacy, security, and maintenance responsibilities that the current static model intentionally avoids.
