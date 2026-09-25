# Content model

All session content lives in the `SESSIONS` array in `js/content.js`. The browser loads this trusted author-controlled file directly. There is no database, content-management system, or build-time conversion.

## Session object

Each session uses the following fields.

| Field | Type | Purpose |
| --- | --- | --- |
| `number` | positive integer | Stable session identifier used in URLs such as `session.html?s=2`. Numbers must be unique and contiguous from 1. |
| `slug` | string | Human-readable identifier for maintainers and future extensions. Keep it lowercase with hyphens. |
| `title` | string | Session heading shown on the dashboard and session page. |
| `kicker` | string | Short teaching-purpose label shown near the title. |
| `summary` | string | One- or two-sentence learner-facing description. |
| `objectives` | array of strings | Observable learning outcomes. |
| `concepts` | array | Compact concept cards. |
| `diagrams` | array | Explanatory visual structures rendered from trusted HTML. |
| `materials` | array | Links to public resources or externally authenticated resources. |
| `problems` | array | Practice blocks with one or more revealable solution parts. |
| `readings` | array | Optional public or authenticated links for preparation or extension. |
| `teachingSlides` | array | Slides used by `present.html`. |

Arrays may be empty. The included examples each contain at least one learner activity, but the structure can be adjusted to fit a different use.

## Copyable starter session

This compact example shows the complete nesting structure.

```js
{
  number: 6,
  slug: "interpret-a-result",
  title: "Interpret a Result",
  kicker: "Move from output to judgment",
  summary: "Practise explaining what a result supports and where uncertainty remains.",
  objectives: [
    "State the direction and magnitude of a result",
    "Separate evidence from interpretation"
  ],
  concepts: [
    {
      marker: "01",
      title: "Estimate",
      body: "A quantity inferred from observed evidence."
    }
  ],
  diagrams: [
    {
      title: "A simple reasoning chain",
      caption: "Keep observation and conclusion visibly separate.",
      html: `<div class="flow-diagram" role="img"
        aria-label="Observation leads to estimate, then interpretation">
        <div class="flow-node"><strong>Observation</strong></div>
        <span class="flow-arrow" aria-hidden="true">→</span>
        <div class="flow-node"><strong>Estimate</strong></div>
        <span class="flow-arrow" aria-hidden="true">→</span>
        <div class="flow-node"><strong>Interpretation</strong></div>
      </div>`
    }
  ],
  materials: [
    {
      label: "Course dataset",
      type: "LMS resource",
      description: "Institutional sign-in is required at the destination.",
      url: "https://lms.example.edu/your-protected-resource",
      optional: false
    }
  ],
  problems: [
    {
      title: "Explain the fictional pilot result",
      level: "Core practice",
      context: "A fictional pilot reports an estimate of 4.2 with an uncertainty interval from 1.1 to 7.3.",
      parts: [
        {
          question: "Write one sentence describing the result without adding a causal claim.",
          solution: `<p>The pilot estimate is positive, with a central value of 4.2 and an uncertainty interval from 1.1 to 7.3.</p>`
        }
      ]
    }
  ],
  readings: [
    {
      label: "Optional interpretation guide",
      meta: "LMS · 8 minutes · sign-in required",
      url: "https://lms.example.edu/your-reading"
    }
  ],
  teachingSlides: [
    {
      type: "title",
      title: "Interpret a Result",
      subtitle: "What does the evidence support?",
      content: `<p class="slide-lead">Commit to an interpretation before revealing the guide.</p>`
    },
    {
      type: "concept",
      title: "Separate description from explanation",
      content: `<p>Start with what was observed, then name the assumptions needed for a stronger claim.</p>`,
      hints: [
        {
          icon: "?",
          label: "Discussion prompt",
          content: "Which additional assumption would be hardest to defend?"
        }
      ]
    }
  ]
}
```

Replace the example URLs. They are deliberately nonfunctional placeholders.

## Concepts

Each concept has:

- `marker`, a short number, symbol, or label;
- `title`, the learner-facing term; and
- `body`, a concise plain-text explanation. The renderer escapes this field.

In the included sessions, concept cards hold distinctions that recur later. Longer explanations can instead sit in a problem, reading, or slide sequence.

## Diagrams

Each diagram has `title`, `caption`, and `html`. The `html` string is inserted into the page, so it can contain accessible HTML or inline SVG.

- Add `role="img"` and a meaningful `aria-label` when a visual relationship is not already conveyed by nearby text.
- Keep essential explanations outside color alone.
- Use unique SVG IDs if multiple diagrams define markers, gradients, or clip paths.
- Check the diagram at narrow widths and in presenter mode if reused there.

## Materials

Each material has:

- `label`, the link text;
- `type`, such as `HTML handout`, `Public dataset`, or `LMS resource`;
- `description`, including any sign-in requirement;
- `url`, a relative public path or an external authenticated HTTPS URL; and
- `optional`, a Boolean that indicates whether it is enrichment rather than core preparation.

The platform does not authenticate a material URL. If the resource is restricted, its external host must do so.

## Problems and feedback

A problem has `title`, `level`, `context`, and a `parts` array. Each part has `question` and `solution`.

The sample problems follow this sequence:

1. provide only the context needed to act;
2. ask for a concrete judgment, computation, or explanation;
3. let the learner commit before revealing feedback;
4. explain the reasoning, not only the answer; and
5. end with a check, implication, or transfer question.

Solutions may contain trusted HTML. Use headings, lists, and tables sparingly so the explanation remains scannable.

## Readings

A reading has `label`, `meta`, and `url`. `meta` works well for source type, expected time, and access status, for example `Public guide · 7 minutes` or `LMS · sign-in required`.

Do not imply that linking a resource grants permission to copy or redistribute it. Review the destination's terms and make the link's access expectations clear.

## Teaching slides

Every slide has `type`, `title`, and `content`. Title slides can also have `subtitle`. Any slide can have a `hints` array.

The presenter supports these visual types:

- `title`
- `concept`
- `formula`
- `step`
- `table`
- `diagram`
- `image`

The type selects a layout, while `content` supplies the trusted HTML inside that layout. A hint has `icon`, `label`, and `content`.

The sample hints progress by changing the available support:

1. first hint recalls a relevant concept;
2. second hint suggests a representation or next step; and
3. final hint exposes enough structure to restart the work without simply replacing it.

Instructor-only notes should not be placed in hidden hints. Anything in `js/content.js` is publicly readable even if the interface initially hides it.

## Mathematical notation

KaTeX renders inline math between `\(` and `\)` and display math between `\[` and `\]` after JavaScript evaluation. In a normal JavaScript string or template literal, double the backslash:

```js
content: `<p>The weighted total is \\(w_1x_1 + w_2x_2\\).</p>`
```

Check the rendered page for KaTeX warnings. A syntactically valid JavaScript file can still contain invalid mathematical markup.

## Trusted HTML and content safety

Several fields are rendered as HTML. Treat `js/content.js` as trusted source code, not as a place to insert unreviewed user input.

- Never interpolate URL parameters, form responses, LMS data, or student text into these fields.
- Avoid inline event handlers in educational content.
- Use HTTPS for external resources.
- Review copied HTML for scripts, tracking pixels, embedded credentials, and inaccessible controls.
- Keep fictional examples clearly fictional and institution-neutral.

If future development allows instructors or learners to submit content at runtime, add server-side validation and HTML sanitization before treating that input as displayable content.

## Validation

After every content edit, run:

```bash
npm run check
```

The content validator checks the expected shape and common authoring errors. It cannot verify pedagogical accuracy, copyright ownership, factual correctness, or whether a restricted link is truly protected. Those remain human review responsibilities.
