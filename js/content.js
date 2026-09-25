/*
 * Synthetic starter content for the Interactive Teaching Platform.
 *
 * Every name, organization, scenario, and exercise below is fictional. Replace
 * these five session objects with your own course material while preserving the
 * field names used by the renderer.
 */

const SESSIONS = Object.freeze([
  {
    number: 1,
    slug: "concepts-and-vocabulary",
    title: "Concepts and Vocabulary",
    kicker: "Build a shared language",
    summary: "Introduce a small set of reusable terms and show how they fit together before learners attempt an application.",
    objectives: [
      "Distinguish a decision from a topic",
      "Separate evidence, constraints, and preferences",
      "Express a simple decision rule"
    ],
    concepts: [
      {
        marker: "01",
        title: "Decision frame",
        body: "A concise statement of the choice, the decision owner, the time horizon, and the outcome that matters."
      },
      {
        marker: "02",
        title: "Evidence signal",
        body: "An observation that can update a judgment. A signal can be useful without being perfectly precise."
      },
      {
        marker: "03",
        title: "Decision rule",
        body: "A transparent statement connecting the available evidence to an action under stated constraints."
      }
    ],
    diagrams: [
      {
        title: "From an open question to a reviewable choice",
        caption: "The decision rule is explicit enough that another learner can inspect the logic.",
        html: `<div class="flow-diagram" role="img" aria-label="A four-step flow from frame to evidence to rule to action">
          <div class="flow-node"><span>1</span><strong>Frame</strong><small>Name the choice</small></div>
          <span class="flow-arrow" aria-hidden="true">→</span>
          <div class="flow-node"><span>2</span><strong>Evidence</strong><small>Collect signals</small></div>
          <span class="flow-arrow" aria-hidden="true">→</span>
          <div class="flow-node"><span>3</span><strong>Rule</strong><small>Connect signal to action</small></div>
          <span class="flow-arrow" aria-hidden="true">→</span>
          <div class="flow-node"><span>4</span><strong>Review</strong><small>Test the reasoning</small></div>
        </div>`
      }
    ],
    materials: [
      {
        label: "Sample concept handout",
        type: "HTML handout",
        description: "A printable example showing one way to package definitions and a short reflection prompt.",
        url: "assets/examples/sample-handout.html",
        optional: true
      },
      {
        label: "Blank decision worksheet",
        type: "HTML worksheet",
        description: "A reusable one-page activity that learners can complete individually or in groups.",
        url: "assets/examples/sample-worksheet.html",
        optional: true
      }
    ],
    problems: [
      {
        title: "Frame the Parkside choice",
        level: "Warm-up",
        context: "The fictional Parkside Student Collective is deciding whether its next skills clinic should run as one longer session or two shorter sessions. The organizer cares about participation and meaningful practice, and the venue is available for only one afternoon.",
        parts: [
          {
            question: "Write a one-sentence decision frame that names the choice, owner, horizon, and intended outcome.",
            solution: `<p><strong>One possible frame:</strong> The clinic organizer must choose a one-session or two-session format for next month’s clinic to maximize meaningful participation within the available afternoon.</p><p>Other wording can work if all four elements are explicit.</p>`
          },
          {
            question: "Classify each input as evidence, constraint, or preference: prior attendance records; the fixed venue window; the organizer’s preference for simpler setup.",
            solution: `<ul><li><strong>Evidence:</strong> prior attendance records.</li><li><strong>Constraint:</strong> the fixed venue window.</li><li><strong>Preference:</strong> the organizer’s preference for simpler setup.</li></ul>`
          },
          {
            question: "Draft a decision rule that the organizer could explain to the group.",
            solution: `<p><strong>Example:</strong> Choose two shorter sessions if prior sign-up patterns indicate that the extra access is likely to add enough participants to justify the additional setup; otherwise choose one longer session.</p><p>The point is not the specific rule. The point is making the condition and resulting action inspectable.</p>`
          }
        ]
      }
    ],
    readings: [
      {
        label: "Reading guide: making reasoning visible",
        meta: "Included sample · 5 minutes",
        url: "assets/examples/sample-handout.html"
      }
    ],
    teachingSlides: [
      {
        type: "title",
        title: "Concepts and Vocabulary",
        subtitle: "A shared language for choices that can be explained and reviewed",
        content: `<p class="slide-lead">Today’s goal is not to memorize a glossary. It is to use three terms to make a decision easier to discuss.</p>`
      },
      {
        type: "concept",
        title: "Three objects, three different jobs",
        content: `<div class="slide-card-grid"><article><span>Frame</span><h3>What are we deciding?</h3><p>Defines scope and outcome.</p></article><article><span>Signal</span><h3>What could change our view?</h3><p>Supplies relevant evidence.</p></article><article><span>Rule</span><h3>How will evidence guide action?</h3><p>Makes the logic testable.</p></article></div>`,
        hints: [
          {
            icon: "?",
            label: "Quick check",
            content: "Ask learners which object is missing when a discussion has plenty of facts but no agreement about what choice is actually being made. The missing object is usually the decision frame."
          }
        ]
      },
      {
        type: "diagram",
        title: "Make the reasoning inspectable",
        content: `<div class="presenter-flow" role="img" aria-label="Frame leads to evidence, then rule, then review"><div><b>Frame</b><small>Scope the choice</small></div><i>→</i><div><b>Evidence</b><small>Update the view</small></div><i>→</i><div><b>Rule</b><small>Choose transparently</small></div><i>→</i><div><b>Review</b><small>Learn and revise</small></div></div>`,
        hints: [
          {
            icon: "↺",
            label: "Discuss the loop",
            content: "The process is not strictly linear. Review may reveal that the original frame or the selected evidence needs to change."
          }
        ]
      },
      {
        type: "step",
        title: "Try it in sixty seconds",
        content: `<div class="activity-prompt"><span>Individual prompt</span><p>Think of a low-stakes choice your group faces. Write one sentence for the frame, one useful signal, and one simple rule.</p><div class="activity-lines"><i></i><i></i><i></i></div></div>`,
        hints: [
          {
            icon: "✓",
            label: "Reveal a sample",
            content: `<p><strong>Frame:</strong> Choose the format for Friday’s review.</p><p><strong>Signal:</strong> Anonymous topic requests.</p><p><strong>Rule:</strong> Use live practice if most requests involve application; use a guided recap otherwise.</p>`
          }
        ]
      }
    ]
  },

  {
    number: 2,
    slug: "worked-example",
    title: "Worked Example",
    kicker: "Show the reasoning in motion",
    summary: "Walk through a transparent comparison, check the calculation, and ask what would have to change for the recommendation to reverse.",
    objectives: [
      "Translate priorities into criteria",
      "Compute and explain a weighted comparison",
      "Use a sensitivity check before recommending"
    ],
    concepts: [
      {
        marker: "A",
        title: "Criterion",
        body: "A dimension that matters for the choice and can be assessed consistently across alternatives."
      },
      {
        marker: "B",
        title: "Weighted score",
        body: "A compact comparison that multiplies each rating by its stated importance and adds the results."
      },
      {
        marker: "C",
        title: "Sensitivity check",
        body: "A deliberate test of whether a reasonable change in an assumption would alter the recommendation."
      }
    ],
    diagrams: [
      {
        title: "An auditable comparison",
        caption: "Inputs remain separate from the recommendation, so learners can challenge one assumption at a time.",
        html: `<div class="split-diagram" role="img" aria-label="Criteria and ratings combine into weighted totals, followed by a sensitivity check">
          <div class="split-input"><strong>Priorities</strong><span>Reach · Learning · Setup</span></div>
          <span class="flow-arrow" aria-hidden="true">+</span>
          <div class="split-input"><strong>Ratings</strong><span>Same scale for both options</span></div>
          <span class="flow-arrow" aria-hidden="true">→</span>
          <div class="split-output"><strong>Compare</strong><span>Weighted totals</span></div>
          <span class="flow-arrow" aria-hidden="true">→</span>
          <div class="split-output accent"><strong>Stress-test</strong><span>Could the choice reverse?</span></div>
        </div>`
      }
    ],
    materials: [
      {
        label: "Worked-example worksheet",
        type: "HTML worksheet",
        description: "A printable matrix with space for criteria, weights, ratings, and a sensitivity note.",
        url: "assets/examples/sample-worksheet.html",
        optional: true
      }
    ],
    problems: [
      {
        title: "Choose a pilot for Juniper Community Lab",
        level: "Guided practice",
        context: "The fictional Juniper Community Lab is comparing a compact workshop with an open studio. It weights reach at 40%, depth of learning at 35%, and ease of setup at 25%. On a five-point scale, the compact workshop scores 4, 3, and 5; the open studio scores 3, 5, and 2.",
        parts: [
          {
            question: "Calculate the weighted total for each option.",
            solution: `<p><strong>Compact workshop:</strong> \\(0.40(4)+0.35(3)+0.25(5)=3.90\\).</p><p><strong>Open studio:</strong> \\(0.40(3)+0.35(5)+0.25(2)=3.45\\).</p>`
          },
          {
            question: "What does this calculation support, and what does it not prove?",
            solution: `<p>It supports the compact workshop under the stated criteria, weights, and ratings. It does not prove that the workshop is universally better. The recommendation depends on judgment embedded in those inputs.</p>`
          },
          {
            question: "Name one useful sensitivity check before making the recommendation.",
            solution: `<p>For example, increase the importance of depth of learning and reduce the importance of setup, then recalculate. The team could also test whether the reach ratings are one point too high or too low. A useful check targets a plausible and consequential uncertainty.</p>`
          }
        ]
      }
    ],
    readings: [
      {
        label: "Facilitation note: compare assumptions, not just totals",
        meta: "Included sample · 6 minutes",
        url: "assets/examples/sample-handout.html"
      }
    ],
    teachingSlides: [
      {
        type: "title",
        title: "Worked Example",
        subtitle: "From priorities to a recommendation that others can challenge",
        content: `<p class="slide-lead">We will build the comparison first and interpret the result second.</p>`
      },
      {
        type: "table",
        title: "Step 1: keep weights and ratings separate",
        content: `<div class="slide-table-wrap"><table class="slide-table"><thead><tr><th>Criterion</th><th>Weight</th><th>Compact workshop</th><th>Open studio</th></tr></thead><tbody><tr><td>Reach</td><td>40%</td><td>4</td><td>3</td></tr><tr><td>Learning depth</td><td>35%</td><td>3</td><td>5</td></tr><tr><td>Ease of setup</td><td>25%</td><td>5</td><td>2</td></tr></tbody></table></div>`,
        hints: [
          {
            icon: "!",
            label: "Common trap",
            content: "Do not let a high weight automatically create a high rating. The weight says how much a criterion matters; the rating says how an option performs on it."
          }
        ]
      },
      {
        type: "formula",
        title: "Step 2: calculate the same way for every option",
        content: `<div class="formula-box">\\[\\text{Weighted total}=\\sum_i \\text{weight}_i\\times\\text{rating}_i\\]</div><div class="worked-lines"><p><strong>Compact workshop</strong><span>\\(0.40(4)+0.35(3)+0.25(5)=3.90\\)</span></p><p><strong>Open studio</strong><span>\\(0.40(3)+0.35(5)+0.25(2)=3.45\\)</span></p></div>`,
        hints: [
          {
            icon: "✓",
            label: "Calculation check",
            content: "The weights add to 100%, and both options use the same five-point scale. Those two checks catch many avoidable errors."
          }
        ]
      },
      {
        type: "concept",
        title: "Step 3: recommend conditionally",
        content: `<blockquote class="recommendation-quote">Choose the compact workshop for the pilot <strong>under the current priorities and ratings</strong>. Before committing, test whether a stronger emphasis on learning depth would reverse the result.</blockquote>`,
        hints: [
          {
            icon: "↔",
            label: "Why the condition matters",
            content: "Conditional language is not weakness. It tells the decision owner exactly which assumptions support the recommendation."
          }
        ]
      }
    ]
  },

  {
    number: 3,
    slug: "decision-lab",
    title: "Decision Lab",
    kicker: "Practice before feedback",
    summary: "Give learners a bounded choice, delay the answer, and use progressive hints to make their reasoning visible.",
    objectives: [
      "Commit to a recommendation before seeing feedback",
      "Identify the assumption driving disagreement",
      "Revise a rule after observing a new signal"
    ],
    concepts: [
      {
        marker: "01",
        title: "Commitment",
        body: "A provisional choice made before feedback. Commitment turns passive recognition into active retrieval."
      },
      {
        marker: "02",
        title: "Diagnostic hint",
        body: "A prompt that reveals the next useful question without revealing the final answer."
      },
      {
        marker: "03",
        title: "Revision note",
        body: "A brief record of what changed in the reasoning after a new signal or peer challenge."
      }
    ],
    diagrams: [
      {
        title: "The lab cycle",
        caption: "Feedback becomes useful after learners expose an initial model of the problem.",
        html: `<div class="cycle-diagram" role="img" aria-label="A cycle of commit, explain, test, and revise">
          <div><span>1</span><strong>Commit</strong></div><b aria-hidden="true">→</b>
          <div><span>2</span><strong>Explain</strong></div><b aria-hidden="true">→</b>
          <div><span>3</span><strong>Test</strong></div><b aria-hidden="true">→</b>
          <div><span>4</span><strong>Revise</strong></div><b aria-hidden="true">↺</b>
        </div>`
      }
    ],
    materials: [
      {
        label: "Decision-lab worksheet",
        type: "HTML worksheet",
        description: "A blank structure for an initial choice, rationale, new evidence, and revised choice.",
        url: "assets/examples/sample-worksheet.html",
        optional: true
      }
    ],
    problems: [
      {
        title: "Design a feedback protocol",
        level: "Lab",
        context: "The fictional Solstice Learning Club must choose how teams will receive feedback on early project ideas. Option A is one detailed facilitator review. Option B is two shorter peer reviews using a shared rubric. The club wants useful revision while keeping preparation manageable.",
        parts: [
          {
            question: "Commit to Option A or B and state the assumption doing the most work in your choice.",
            solution: `<p>Either choice can be defensible. A strong answer identifies a pivotal assumption. For example: choose B if a shared rubric is sufficient to make peer feedback specific and consistent; choose A if facilitator expertise is necessary for useful revision.</p>`
          },
          {
            question: "You learn that teams already completed two rubric-calibration exercises. How should this signal affect the recommendation?",
            solution: `<p>The signal makes consistent peer review more plausible, so it strengthens the case for Option B. It should not decide the issue by itself; the team should still consider whether the rubric covers the kind of expertise projects need.</p>`
          },
          {
            question: "Write a revision note that distinguishes the new signal from the final judgment.",
            solution: `<p><strong>Example:</strong> I moved toward two peer reviews because prior calibration reduces my concern about inconsistent feedback. I would still choose facilitator review if projects require specialized guidance that the rubric cannot capture.</p>`
          }
        ]
      }
    ],
    readings: [
      {
        label: "Practice note: writing hints that preserve productive struggle",
        meta: "Included sample · 5 minutes",
        url: "assets/examples/sample-handout.html"
      }
    ],
    teachingSlides: [
      {
        type: "title",
        title: "Decision Lab",
        subtitle: "Commit, explain, test, revise",
        content: `<p class="slide-lead">There is no hidden trick. The goal is to locate the assumption that drives your choice.</p>`
      },
      {
        type: "concept",
        title: "The choice",
        content: `<div class="choice-grid"><article><span>Option A</span><h3>One facilitator review</h3><p>Deeper expert attention, one feedback moment.</p></article><div class="choice-vs">or</div><article><span>Option B</span><h3>Two peer reviews</h3><p>More perspectives, shared rubric.</p></article></div><p class="slide-question">Which protocol is more likely to support useful revision without excessive preparation?</p>`,
        hints: [
          {
            icon: "1",
            label: "Hint 1",
            content: "List what has to be true for each option to work. Do not compare the labels alone."
          },
          {
            icon: "2",
            label: "Hint 2",
            content: "Ask whether feedback quality depends more on specialized expertise or on receiving multiple well-structured perspectives."
          }
        ]
      },
      {
        type: "step",
        title: "Commit before the signal",
        content: `<div class="commitment-card"><p>Write three lines:</p><ol><li>My choice is …</li><li>The pivotal assumption is …</li><li>I would switch if I learned …</li></ol></div>`,
        hints: [
          {
            icon: "?",
            label: "What counts as pivotal?",
            content: "A pivotal assumption is one that could realistically reverse the recommendation if it turned out to be wrong."
          }
        ]
      },
      {
        type: "concept",
        title: "A new signal arrives",
        content: `<div class="signal-reveal"><span>New evidence</span><p>Teams have already completed two rubric-calibration exercises and produced closely aligned practice ratings.</p></div><p class="slide-question">Update your recommendation. What changed, and what did not?</p>`,
        hints: [
          {
            icon: "✓",
            label: "Interpretation",
            content: "The signal reduces concern about inconsistent peer ratings. It does not tell us whether the rubric captures every kind of expertise the projects require."
          }
        ]
      }
    ]
  },

  {
    number: 4,
    slug: "applied-case",
    title: "Applied Case",
    kicker: "Connect analysis to action",
    summary: "Use a fictional organizational decision to combine stakeholder needs, uncertain assumptions, and an implementation checkpoint.",
    objectives: [
      "Map stakeholder needs without treating all claims as equal",
      "Prioritize assumptions by consequence and uncertainty",
      "Write an actionable, reversible recommendation"
    ],
    concepts: [
      {
        marker: "01",
        title: "Stakeholder need",
        body: "An outcome a person or group requires from the decision, stated separately from a preferred solution."
      },
      {
        marker: "02",
        title: "Critical assumption",
        body: "A belief that is both uncertain and consequential enough to merit testing before or during implementation."
      },
      {
        marker: "03",
        title: "Review trigger",
        body: "A pre-agreed observation that prompts the team to continue, adapt, or stop an implementation."
      }
    ],
    diagrams: [
      {
        title: "From stakeholder claims to a reversible plan",
        caption: "The recommendation includes a review trigger instead of pretending all uncertainty has disappeared.",
        html: `<div class="case-map" role="img" aria-label="Stakeholder needs and evidence feed a recommendation, pilot, and review trigger">
          <div class="case-sources"><span>Participant needs</span><span>Facilitator capacity</span><span>Access evidence</span></div>
          <span class="flow-arrow" aria-hidden="true">→</span>
          <div class="case-center"><strong>Recommendation</strong><small>with assumptions stated</small></div>
          <span class="flow-arrow" aria-hidden="true">→</span>
          <div class="case-end"><span>Pilot</span><span>Review trigger</span></div>
        </div>`
      }
    ],
    materials: [
      {
        label: "Case-analysis worksheet",
        type: "HTML worksheet",
        description: "Use the included matrix to organize claims, assumptions, evidence, and a review trigger.",
        url: "assets/examples/sample-worksheet.html",
        optional: true
      },
      {
        label: "Concept handout",
        type: "HTML handout",
        description: "A concise reminder of the platform’s sample decision vocabulary.",
        url: "assets/examples/sample-handout.html",
        optional: true
      }
    ],
    problems: [
      {
        title: "Cedar Bridge mentoring pilot",
        level: "Applied",
        context: "The fictional Cedar Bridge Learning Cooperative is considering evening drop-in mentoring. Learners want flexible access, mentors want predictable preparation, and the coordinator has evidence that requests cluster around project deadlines. The team can pilot either weekly drop-ins or three scheduled clinics tied to common deadlines.",
        parts: [
          {
            question: "Restate each stakeholder’s position as a need rather than a preferred solution.",
            solution: `<ul><li><strong>Learners:</strong> timely access to help when project questions arise.</li><li><strong>Mentors:</strong> enough predictability to prepare and protect their time.</li><li><strong>Coordinator:</strong> a format that directs limited capacity toward periods of greatest need.</li></ul>`
          },
          {
            question: "Identify one critical assumption behind choosing the scheduled-clinic pilot.",
            solution: `<p>A critical assumption is that most high-value mentoring needs can be anticipated from the known deadline pattern. If important needs arise unpredictably, three scheduled clinics may provide insufficient access.</p>`
          },
          {
            question: "Write a recommendation with a review trigger.",
            solution: `<p><strong>Example:</strong> Pilot three deadline-linked clinics for one project cycle. Continue the format if most requests are served within the clinics and unmet requests remain low; add a limited drop-in window if substantial needs appear between clinics.</p>`
          }
        ]
      }
    ],
    readings: [
      {
        label: "Case guide: recommendation, assumption, review trigger",
        meta: "Included sample · 7 minutes",
        url: "assets/examples/sample-handout.html"
      }
    ],
    teachingSlides: [
      {
        type: "title",
        title: "Applied Case",
        subtitle: "A recommendation can be decisive and still remain open to learning",
        content: `<p class="slide-lead">The case is fictional. The reasoning structure is designed to be replaced with any discipline-specific case.</p>`
      },
      {
        type: "concept",
        title: "Separate needs from proposed solutions",
        content: `<div class="needs-grid"><article><span>Says</span><p>“We need weekly drop-ins.”</p></article><i aria-hidden="true">→</i><article><span>May need</span><p>Timely help when project questions arise.</p></article></div><div class="needs-grid"><article><span>Says</span><p>“We need scheduled clinics.”</p></article><i aria-hidden="true">→</i><article><span>May need</span><p>Predictable preparation and bounded commitments.</p></article></div>`,
        hints: [
          {
            icon: "?",
            label: "Discussion prompt",
            content: "Why does translating a preferred solution into an underlying need create more room for a workable design?"
          }
        ]
      },
      {
        type: "diagram",
        title: "Prioritize what to test",
        content: `<div class="assumption-matrix" role="img" aria-label="Two by two matrix of uncertainty and consequence"><div class="matrix-axis matrix-y">Consequence ↑</div><div class="matrix-cell muted">Monitor</div><div class="matrix-cell critical"><strong>Test first</strong><span>High uncertainty<br>High consequence</span></div><div class="matrix-cell muted">Document</div><div class="matrix-cell">Check if inexpensive</div><div class="matrix-axis matrix-x">Uncertainty →</div></div>`,
        hints: [
          {
            icon: "!",
            label: "Do not test everything",
            content: "An assumption deserves early testing when being wrong would materially change the recommendation and current confidence is low."
          }
        ]
      },
      {
        type: "step",
        title: "Write a reversible recommendation",
        content: `<div class="recommendation-builder"><div><span>Action</span><p>Pilot three deadline-linked clinics.</p></div><div><span>Reason</span><p>Requests appear to cluster around known deadlines.</p></div><div><span>Review trigger</span><p>Add a drop-in window if substantial needs arise between clinics.</p></div></div>`,
        hints: [
          {
            icon: "✓",
            label: "Quality check",
            content: "A useful review trigger names an observable condition and the action it would prompt. “Review later” is not specific enough."
          }
        ]
      }
    ]
  },

  {
    number: 5,
    slug: "review-workshop",
    title: "Review Workshop",
    kicker: "Retrieve, connect, transfer",
    summary: "Close the sequence with retrieval prompts, a synthesis map, and a transfer task that learners can adapt to a new context.",
    objectives: [
      "Retrieve the core objects without notes",
      "Connect calculations to judgment and review",
      "Transfer the structure to a new course context"
    ],
    concepts: [
      {
        marker: "R",
        title: "Retrieval",
        body: "Reconstructing an idea from memory before looking back at the material."
      },
      {
        marker: "C",
        title: "Connection",
        body: "Explaining how two concepts constrain, complement, or challenge one another."
      },
      {
        marker: "T",
        title: "Transfer",
        body: "Using the same reasoning structure in a situation with different surface features."
      }
    ],
    diagrams: [
      {
        title: "The complete learning loop",
        caption: "The loop closes when review produces a better frame, not merely a score.",
        html: `<div class="review-map" role="img" aria-label="Frame, compare, commit, apply, and review form a loop">
          <span>Frame</span><b aria-hidden="true">→</b><span>Compare</span><b aria-hidden="true">→</b><span>Commit</span><b aria-hidden="true">→</b><span>Apply</span><b aria-hidden="true">→</b><span class="review-accent">Review</span><b aria-hidden="true">↺</b>
        </div>`
      }
    ],
    materials: [
      {
        label: "Review and transfer worksheet",
        type: "HTML worksheet",
        description: "A printable template for retrieval, connection, and a new-domain application.",
        url: "assets/examples/sample-worksheet.html",
        optional: true
      }
    ],
    problems: [
      {
        title: "Build a tutorial for another discipline",
        level: "Synthesis",
        context: "Imagine adapting this platform for an introductory course outside the sample topic. Choose a discipline you know and outline one 30-minute tutorial session.",
        parts: [
          {
            question: "Name one concept, one misconception, and one observable learning objective for the session.",
            solution: `<p><strong>Illustrative answer for a writing course:</strong> concept: claim-evidence alignment; misconception: more evidence always makes a claim stronger; objective: learners can remove one irrelevant source and explain why the remaining evidence fits the claim better.</p>`
          },
          {
            question: "Design a two-part problem and decide what the first hint should reveal.",
            solution: `<p>Part one should require an initial attempt; part two should ask learners to justify or revise it. The first hint should reveal a useful diagnostic question, not the answer. For the writing example: “Which sentence in the source directly bears on the claim?”</p>`
          },
          {
            question: "Specify one presenter slide and one optional resource that would support the activity.",
            solution: `<p>A presenter slide could show two claims with the same evidence and ask which pairing is better aligned. An optional resource could be a one-page checklist that learners use after committing to an answer.</p>`
          }
        ]
      }
    ],
    readings: [
      {
        label: "Adaptation checklist: replace content while preserving the learning flow",
        meta: "Included sample · 8 minutes",
        url: "assets/examples/sample-handout.html"
      }
    ],
    teachingSlides: [
      {
        type: "title",
        title: "Review Workshop",
        subtitle: "Retrieve the structure, connect the pieces, transfer the design",
        content: `<p class="slide-lead">Close your notes for the first prompt. The difficulty of retrieval is part of the learning.</p>`
      },
      {
        type: "step",
        title: "Retrieval sprint",
        content: `<div class="retrieval-grid"><article><span>1</span><p>What belongs in a decision frame?</p></article><article><span>2</span><p>Why keep weights separate from ratings?</p></article><article><span>3</span><p>What makes an assumption critical?</p></article><article><span>4</span><p>What makes a review trigger actionable?</p></article></div>`,
        hints: [
          {
            icon: "✓",
            label: "Reveal checkpoints",
            content: `<ol><li>Choice, owner, horizon, outcome.</li><li>Importance and performance are different judgments.</li><li>It is uncertain and consequential.</li><li>It connects an observable condition to a response.</li></ol>`
          }
        ]
      },
      {
        type: "diagram",
        title: "Connect the pieces",
        content: `<div class="presenter-flow compact" role="img" aria-label="Frame leads to compare, then commit, apply, and review"><div><b>Frame</b></div><i>→</i><div><b>Compare</b></div><i>→</i><div><b>Commit</b></div><i>→</i><div><b>Apply</b></div><i>→</i><div><b>Review</b></div></div><p class="slide-question">Where would a sensitivity check enter? Where would a diagnostic hint enter?</p>`,
        hints: [
          {
            icon: "↔",
            label: "Possible connections",
            content: "A sensitivity check strengthens comparison before commitment. A diagnostic hint supports a learner after an initial commitment but before the final explanation."
          }
        ]
      },
      {
        type: "concept",
        title: "Transfer the structure",
        content: `<div class="transfer-prompt"><span>New context</span><h3>Choose another course you teach or know well.</h3><p>Replace the sample concepts, case, and exercises. Keep the sequence: explain, model, practice, apply, review.</p></div>`,
        hints: [
          {
            icon: "+",
            label: "Adaptation ideas",
            content: "A statistics course might use data interpretation; a history course might use source evaluation; a design course might use critique decisions. The platform structure does not assume a particular discipline."
          }
        ]
      }
    ]
  }
]);
