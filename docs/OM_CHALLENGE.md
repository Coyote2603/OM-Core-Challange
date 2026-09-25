# OM Core Challenge

The OM Core Challenge is a complete public activity included with the platform, replacing the original Newsvendor Challenge. It can be shared directly, used alongside the synthetic sessions, or retained while every other course component is replaced.

## Learning design

Across six worked problems on capacity, batching, queueing, and process analysis, a learner:

1. reads a short scenario with the numbers needed to solve it;
2. commits to one of four answer options;
3. if the choice is wrong, receives a hint written for that specific misconception and can try again immediately; and
4. once correct, sees the full worked solution rather than only the final number.

Because each wrong option carries its own targeted hint rather than a single generic one, the feedback narrows in on the actual reasoning error — mistaking the longest processing time for the bottleneck, ignoring setup time, treating demand variability as spare capacity, and so on — instead of only confirming right or wrong.

## Files

- `om-challenge.html` contains the learner-facing page structure and introductory copy.
- `css/om-challenge.css` contains the activity's presentation, built on the same design tokens as `css/style.css`.
- `js/om-challenge.js` contains the question data (`OM_CHALLENGE_QUESTIONS`), the topic summary reference (`OM_TOPIC_SUMMARY`), and the interaction logic.
- `scripts/test-om-challenge.mjs` validates the question data shape: exactly four options per question, exactly one marked correct, every incorrect option carrying a non-empty hint, and the correct option carrying a non-empty solution.

`js/site-config.js` controls the activity's card shown elsewhere on the platform. Setting `features.showGame` to `false` removes the entry point without changing the standalone page.

## Change or add questions

Questions live in `OM_CHALLENGE_QUESTIONS` in `js/om-challenge.js`. Each question has:

- `kicker`, `title`, and `context` (trusted HTML — tables, paragraphs, or an inline diagram);
- `question`, the prompt shown above the options; and
- `options`, an array of exactly four entries, each with `key`, `text`, `correct`, and either `hint` (for every incorrect option) or `solution` (for the one correct option, as trusted HTML — KaTeX math is supported with `\\(` / `\\)` delimiters, same as `js/content.js`).

After editing, run:

```bash
npm test
```

This re-validates the shape described above. It cannot verify that a hint is actually useful, that a worked solution's arithmetic is correct, or that the scenario's numbers are realistic — re-derive every changed number by hand and click through the page before publishing.

## Preserve the per-option hint design

Do not collapse the four options down to a single "wrong, try again" message. The value of this activity is that each distractor corresponds to a specific, common reasoning error, and the hint addresses that error directly. If you add a question, write each wrong option as a plausible mistake a student might actually make, and write its hint to correct that mistake specifically rather than restating the question.

## Randomization and privacy

The activity keeps no persistent score, submits nothing to a server, and stores no identity. Progress (which questions have been solved) lives only in page memory for the current visit and resets on reload.

## Classroom uses

- **Individual practice:** learners work through all six problems at their own pace, using hints only when stuck.
- **Live poll:** display one question, collect a show of hands per option before revealing which is correct and why.
- **Pairs:** one learner defends the chosen option before hints are used; the partner argues for a different option.
- **Debrief:** discuss which distractor each pair almost picked and why that mistake is a natural one to make.
