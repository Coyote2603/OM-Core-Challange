# Getting started

This guide takes an instructor from a fresh copy of the repository to a locally running, rebranded course site. No web-development framework is required.

## 1. Make a clean copy

Open the public repository and select [**Use this template**](https://github.com/StefanosPoulidis/course-tutorial-platform/generate). Choose **Create a new repository**, then set its owner, name, description, and visibility. Use a private repository while drafting if your institution permits it, but remember that any GitHub Pages deployment must still be reviewed and tested for its actual visibility.

Clone the new repository you just created:

```bash
git clone YOUR_NEW_REPOSITORY_URL
cd YOUR_NEW_REPOSITORY_NAME
```

If you only want to inspect the original starter locally, clone `https://github.com/StefanosPoulidis/course-tutorial-platform.git` instead.

If you are a maintainer creating the public repository from a private teaching platform, do **not** fork the private repository or copy its `.git` directory. Begin with the sanitized public files in a new repository so private materials do not survive in commit history.

## 2. Start the site

The platform has no build step. Either command below starts the same local server:

```bash
npm run serve
```

or:

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`.

## 3. Explore the demo before editing

The five synthetic sessions provide a tour of the platform's features:

1. **Concepts and Vocabulary** shows concept cards, a simple diagram, a practice problem, and presenter hints.
2. **Worked Example** demonstrates a transparent calculation and sensitivity discussion.
3. **Decision Lab** models practice before feedback and progressive scaffolding.
4. **Applied Case** shows how to combine analysis, stakeholders, and implementation.
5. **Review Workshop** demonstrates retrieval, synthesis, and transfer.

For each session:

- read the summary and learning objectives;
- open the concepts and diagram sections;
- answer a problem before revealing its solution;
- open the interactive slides;
- use the keyboard arrows to navigate; and
- reveal any optional hint or discussion prompt.

Then open the OM Core Challenge from the dashboard. The activity is complete and public and can remain in your adaptation even if you replace every demo session.

## 4. Set the course identity

Open `js/site-config.js`. Change only the values, keeping the property names and surrounding JavaScript syntax intact.

```js
const SITE_CONFIG = Object.freeze({
  siteTitle: "Your Course Site",
  shortTitle: "Your Course",
  courseTitle: "Your Course Title",
  courseSubtitle: "A short public description of the course materials.",
  instructorName: "Your Name",
  institutionName: "Your Institution",
  footerText: "Your Course Site · Your Institution",

  theme: Object.freeze({
    primary: "#173f5f",
    accent: "#e05a47",
    accentText: "#b43e30"
  }),

  features: Object.freeze({
    showGame: true
  }),

  game: Object.freeze({
    title: "The OM Core Challenge",
    description: "Work through capacity, batching, and queueing problems with feedback on every attempt.",
    href: "om-challenge.html",
    duration: "About 15 minutes"
  })
});
```

Set `institutionName` to an empty string if you do not want an institution displayed. Set `features.showGame` to `false` if the game is not relevant to your course. See [Adapting the platform](ADAPTING_THE_PLATFORM.md) for every setting.

Use only logos, names, photographs, and brand colors you are authorized to publish. This template deliberately includes no institutional logo.

## 5. Replace the sessions

Open `js/content.js`. Each object in `SESSIONS` defines one session. A practical workflow is:

1. duplicate one synthetic session object;
2. give it a unique `number`, `slug`, and `title`;
3. replace its summary and objectives;
4. edit one content section at a time;
5. load that session in the browser after each change; and
6. remove the original synthetic session only after the replacement works.

The data shape is documented in [Content model](CONTENT_MODEL.md). You may add or remove sessions. Keep session numbers unique and contiguous from 1 through the number of sessions, and preserve the field names consumed by the renderer.

## 6. Decide which resources are public

Every resource URL in `js/content.js` is visible to visitors. Choose one of two patterns:

- **Public resource.** Add a small file that you created or are licensed to redistribute, then use a relative URL such as `assets/examples/my-handout.html`.
- **Restricted resource.** Keep the file in an authenticated LMS or protected server and use its external HTTPS link. Do not copy the file into this repository.

Test restricted links while signed out. The destination, not this static site, must enforce authentication.

## 7. Check the adaptation

Run all automated checks:

```bash
npm run check
```

This runs the public-boundary scan, validates the site configuration and session data, and validates the OM Core Challenge question set. To run only that last check:

```bash
npm test
```

Also perform a browser review:

- open the dashboard and every session;
- reveal every answer and hint;
- enter presenter mode for every session;
- test the OM Core Challenge: get a question wrong to see its hint, then get it right to see the worked solution, for all six questions;
- navigate without a mouse;
- inspect a phone-width layout; and
- confirm there are no errors in the browser console.

Automated checks cannot determine whether you own a document or whether a fictional example resembles a confidential case. Complete the human review in [Release checklist](RELEASE_CHECKLIST.md).

## 8. Publish

The repository can be served by GitHub Pages or any ordinary static host. See [Deployment](DEPLOYMENT.md) for clean-repository setup, host settings, and post-deployment checks.

## Where to go next

- See the optional [notes on the sample sessions](TEACHING_DESIGN_GUIDE.md) for the rationale behind the demonstration.
- Use [Content model](CONTENT_MODEL.md) while editing `js/content.js`.
- Use [OM Core Challenge](OM_CHALLENGE.md) before changing questions, hints, or worked solutions.
- Use [Privacy and access](PRIVACY_AND_ACCESS.md) before linking course resources.
