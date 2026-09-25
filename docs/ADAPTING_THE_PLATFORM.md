# Adapting the platform

The platform separates identity, educational content, and rendering logic. Most course adaptations should stay in `js/site-config.js` and `js/content.js`. This keeps upgrades manageable and makes it easy to compare your course-specific changes with improvements to the shared infrastructure.

## 1. Set the course identity

`js/site-config.js` exposes one global `SITE_CONFIG` object.

| Key | Purpose | Guidance |
| --- | --- | --- |
| `siteTitle` | Browser and document title | Use the public name of the site. |
| `shortTitle` | Compact navigation brand | Keep it short enough for a phone-width header. |
| `courseTitle` | Main dashboard heading | Name the course, program, or learning sequence. |
| `courseSubtitle` | Dashboard explanation | State what learners will do or gain. |
| `instructorName` | Instructor or team credit | Use a public professional name or a neutral team label. |
| `institutionName` | Optional institution label | Leave as `""` to omit it. Use a name only with permission. |
| `footerText` | Footer attribution or context | Keep it concise and suitable for every page. |
| `theme.primary` | Main interface color | Use a six-digit hexadecimal color with strong contrast. |
| `theme.accent` | Highlight and action color | Check contrast in buttons, badges, and focus states. |
| `theme.accentText` | Accessible accent text on light surfaces | Choose a darker companion to `theme.accent` with at least 4.5:1 contrast against white. |
| `features.showGame` | Show or hide the game entry point | Use `true` or `false`, without quotation marks. |
| `game.title` | Public game-card title | Change the label without changing the game itself. |
| `game.description` | Public game-card summary | Explain the activity in one or two sentences. |
| `game.href` | Game-page URL | Keep `om-challenge.html` unless linking elsewhere. |
| `game.duration` | Expected completion time | Give learners a realistic estimate. |

The objects are frozen to prevent accidental runtime mutation. Edit the source values directly and preserve `Object.freeze(...)`.

## 2. Choose a visual identity

Start with the three theme colors. `primary` and `accent` drive the main interface, while `accentText` keeps small accent labels readable on light surfaces. The OM Core Challenge reuses these same tokens (see `css/om-challenge.css`), so changing them here also restyles the activity. Review every page after changing colors.

A usable theme should:

- preserve readable text and control contrast;
- avoid using color as the only signal;
- maintain visible keyboard focus;
- work on projector screens as well as laptops; and
- remain legible for common forms of color-vision deficiency.

If you add a logo or photograph, use an asset you own or have permission to redistribute. Record its source and license in `THIRD_PARTY_NOTICES.md` when appropriate. Do not copy an institutional mark from a private site merely because you teach there.

## 3. The sample session sequence

The five synthetic sessions demonstrate one possible arc:

| Pattern | Teaching purpose | Possible adaptations |
| --- | --- | --- |
| Concepts and Vocabulary | Establish a shared language | Definitions in law, constructs in research methods, symbols in engineering |
| Worked Example | Make expert reasoning visible | Statistical derivation, accounting calculation, clinical reasoning vignette |
| Decision Lab | Require a choice before feedback | Forecast, diagnosis, design selection, interpretation exercise |
| Applied Case | Combine evidence and action | Policy memo, product decision, ethical analysis, field scenario |
| Review Workshop | Retrieve, connect, and transfer | Exam review, capstone synthesis, professional certification practice |

This arc can be retained, repeated across modules, or replaced entirely. In the sample, each session object corresponds to one learner-facing destination.

## 4. Replace the sample content

Edit the `SESSIONS` array in `js/content.js`. Each session can combine:

- learning objectives;
- concept cards;
- a diagram or visual model;
- public or LMS-hosted materials;
- multi-part problems with revealable feedback;
- readings; and
- interactive slides with optional hints.

The [Content model](CONTENT_MODEL.md) gives the exact shape and a copyable starter object. The optional [notes on the sample sessions](TEACHING_DESIGN_GUIDE.md) explain how this demonstration combines the components.

## 5. Handle materials deliberately

A material link can point to either a public asset or an authenticated destination.

### Public materials

Repository-local resources are suitable only when all of the following are true:

- the file was created for public release or has a compatible redistribution license;
- it contains no student data, answer key, confidential case information, or hidden metadata;
- its source and attribution are documented; and
- its size and extension pass the public-boundary policy.

The template uses small HTML samples because they are easy to inspect in code review. Common office files, archives, and videos are prohibited by default.

### Restricted materials

Keep restricted documents, recordings, datasets, and solutions in an authenticated LMS or server-side protected system. Add only an HTTPS link and describe the sign-in requirement in the material's `description`.

Do not rely on:

- an unlisted URL;
- JavaScript that hides a link;
- a password or password hash stored in the repository;
- a query-string token;
- `robots.txt`; or
- a repository being difficult to discover.

Those measures do not protect files served by a public static host.

## 6. Adapt the OM Core Challenge

If process capacity, batching, queueing, or service operations fit your course, the complete activity can be used unchanged. You can alter the questions, hints, or worked solutions by following [OM Core Challenge](OM_CHALLENGE.md) and rerunning `npm test`.

If the activity is unrelated, set `features.showGame` to `false`. Keeping the files in the repository still allows you to turn it on later or share its direct public URL.

## 7. Extend to another discipline

The infrastructure does not assume operations management. A few mappings illustrate the range:

- **Research methods:** concepts become identification terms, problems become interpretation tasks, and hints reveal diagnostic questions.
- **Finance:** diagrams show cash-flow timing, problems reveal calculation steps, and presenter slides stage a valuation discussion.
- **Marketing:** sessions move from constructs to segmentation practice, then to a fictional launch decision.
- **Strategy:** concept cards define frameworks, problems ask for evidence-based choices, and an applied case ends with implementation risks.
- **Medicine or public health:** fictional vignettes support structured reasoning, provided the site clearly states that examples are educational and not clinical advice.
- **Engineering:** diagrams show system structure, problems expose units and assumptions, and hints target common model-selection errors.
- **Humanities:** concept cards define analytical lenses, problems compare interpretations, and revealable feedback models textual reasoning using public-domain or properly licensed excerpts.

The included examples emphasize interaction, but the same components can also support more reading-focused approaches.

## 8. Optional approach for easier upgrades

When possible:

- restrict course-specific edits to `js/site-config.js`, `js/content.js`, and clearly licensed assets;
- avoid renaming renderer fields;
- document any structural changes;
- preserve validation scripts; and
- merge infrastructure updates separately from content revisions.

This separation makes it easier to bring accessibility, browser-compatibility, and game improvements from the public project into a course adaptation.
