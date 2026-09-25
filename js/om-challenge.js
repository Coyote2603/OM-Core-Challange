/* The OM Core Challenge
 *
 * Six worked multiple-choice problems covering capacity, batching, queueing,
 * and process analysis. Every wrong option carries its own targeted hint;
 * the correct option carries the full worked solution. A learner can try
 * any option, get the hint for that specific misconception, and try again
 * until they find the correct one — nothing is timed or auto-advanced.
 *
 * Content and every number below come directly from the instructor-supplied
 * question set. Do not change a value without re-deriving the worked
 * solution to match.
 */

const OM_CHALLENGE_QUESTIONS = Object.freeze([
  Object.freeze({
    id: 1,
    kicker: "Bottleneck & flow rate",
    title: "Sequential process with unequal worker pools",
    context: `<p>A manufacturing process consists of three sequential activities. Each unit must pass through all three activities.</p>
      <table class="context-table">
        <thead><tr><th>Activity</th><th>Processing time</th><th>Number of workers</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>6 min/unit</td><td>2</td></tr>
          <tr><td>B</td><td>4 min/unit</td><td>1</td></tr>
          <tr><td>C</td><td>9 min/unit</td><td>2</td></tr>
        </tbody>
      </table>
      <p>Each worker is available for 60 minutes per hour, and workers cannot be shared across activities. Demand is sufficiently high.</p>`,
    question: "Which activity is the bottleneck, and what is the maximum sustainable flow rate of the process?",
    options: [
      {
        key: "A",
        text: "Activity B; 15 units/hour",
        correct: false,
        hint: "Activity B can process 15 units per hour, but compare this with the effective hourly capacity of the other activities before identifying the bottleneck."
      },
      {
        key: "B",
        text: "Activity C; 13.33 units/hour",
        correct: true,
        solution: `<p>Activity A can process \\(\\dfrac{2(60)}{6} = 20\\) units/hour.</p>
          <p>Activity B can process \\(\\dfrac{60}{4} = 15\\) units/hour.</p>
          <p>Activity C can process \\(\\dfrac{2(60)}{9} = 13.33\\) units/hour.</p>
          <p>Activity C has the lowest capacity and is therefore the <strong>bottleneck</strong>. Hence, the maximum sustainable process flow rate is <strong>13.33 units/hour</strong>.</p>`
      },
      {
        key: "C",
        text: "Activity A; 20 units/hour",
        correct: false,
        hint: "This activity has substantial capacity because two workers operate in parallel. Check whether it actually constrains the overall process."
      },
      {
        key: "D",
        text: "Activity C; 10 units/hour",
        correct: false,
        hint: "You have identified a possible constraining activity, but recheck how two parallel workers affect its effective processing capacity."
      }
    ]
  }),

  Object.freeze({
    id: 2,
    kicker: "Batching & setup capacity",
    title: "One batch per variant versus two batches per variant",
    context: `<p>A production cell makes four product variants on the same machine. Each changeover between variants requires 40 minutes of setup time. Processing time is 3 minutes per unit, and the machine is available for 480 minutes per day.</p>
      <p>Daily demand is 120 units, equally split across the four variants.</p>
      <p>Management is considering producing each variant in one batch per day instead of two batches per day.</p>
      <p>Assume that the machine starts the day already set up for the first variant, so only changeovers between successive variants consume setup time.</p>`,
    question: "Which statement is correct?",
    options: [
      {
        key: "A",
        text: "Producing two batches per variant is feasible because total processing time is below the available machine time.",
        correct: false,
        hint: "Processing time is only part of the machine's capacity requirement. Include the time consumed by changeovers before assessing feasibility."
      },
      {
        key: "B",
        text: "Producing one batch per variant increases setup time and therefore reduces the machine time available for processing.",
        correct: false,
        hint: "Compare the number of changeovers and the resulting setup time under the two batching policies."
      },
      {
        key: "C",
        text: "Both batching policies use the same machine capacity because total daily demand is unchanged.",
        correct: false,
        hint: "Total production volume is unchanged, but check whether the total setup time is also unchanged."
      },
      {
        key: "D",
        text: "Producing one batch per variant is exactly feasible, while producing two batches per variant exceeds the machine's daily capacity.",
        correct: true,
        solution: `<p>Daily processing time is \\(120(3) = 360\\) minutes.</p>
          <p>With one batch for each of the four variants, there are three changeovers: \\(3(40) = 120\\) minutes. Total machine time required is \\(360 + 120 = 480\\) minutes, which exactly matches the available daily capacity.</p>
          <p>With two batches for each variant, there are eight batches and seven changeovers: \\(7(40) = 280\\) minutes. Total machine time required is \\(360 + 280 = 640\\) minutes, which exceeds the available 480 minutes.</p>
          <p>Therefore, producing one batch per variant is exactly feasible, whereas producing two batches per variant is not.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 3,
    kicker: "Queueing & pooling",
    title: "Two separate queues versus one common queue",
    context: `<p>A bank currently operates two service desks, each with its own separate queue. Management is considering replacing the two queues with one common queue feeding the same two service desks.</p>
      <p>Assume total demand, total service capacity, and average service time remain unchanged.</p>`,
    question: "Which outcome is most likely after pooling the queues?",
    options: [
      {
        key: "A",
        text: "Average waiting time decreases because pooling reduces the impact of variability across the two servers.",
        correct: true,
        solution: `<p>A common queue allows whichever server becomes available first to serve the next customer. Pooling therefore reduces the operational effect of variability across the two servers, which lowers average waiting time even though total demand and total capacity are unchanged.</p>`
      },
      {
        key: "B",
        text: "Average waiting time remains unchanged because total demand and total capacity are unchanged.",
        correct: false,
        hint: "Capacity and utilization matter, but waiting time also depends on how variability is distributed across servers."
      },
      {
        key: "C",
        text: "Average waiting time increases because customers can no longer select the shorter queue.",
        correct: false,
        hint: "Think about situations in which one server becomes idle while customers are still waiting in another queue — is that more or less likely with separate queues?"
      },
      {
        key: "D",
        text: "Average waiting time decreases only if server utilization also decreases.",
        correct: false,
        hint: "Ask whether queue design itself can affect waiting even when the number and speed of servers remain unchanged."
      }
    ]
  }),

  Object.freeze({
    id: 4,
    kicker: "Service process capacity",
    title: "Bottleneck among parallel-staffed activities",
    context: `<p>An insurance branch processes claims through the following activities:</p>
      <table class="context-table">
        <thead><tr><th>Activity</th><th>Processing time/claim</th><th>Employees</th></tr></thead>
        <tbody>
          <tr><td>Registration</td><td>6 min</td><td>1</td></tr>
          <tr><td>Assessment</td><td>15 min</td><td>3</td></tr>
          <tr><td>Approval</td><td>8 min</td><td>1</td></tr>
          <tr><td>Documentation</td><td>10 min</td><td>2</td></tr>
        </tbody>
      </table>
      <p>Demand is 8 claims per hour.</p>`,
    question: "Which statement is correct?",
    options: [
      {
        key: "A",
        text: "Registration is the bottleneck and utilization is 80%.",
        correct: false,
        hint: "Compare the hourly capacity of all four activities before identifying the bottleneck."
      },
      {
        key: "B",
        text: "Assessment is the bottleneck and utilization is 66.7%.",
        correct: false,
        hint: "Do not identify the bottleneck from the longest processing time alone. Assessment has three employees working in parallel, so calculate its hourly capacity and compare it with the capacities of the other activities."
      },
      {
        key: "C",
        text: "Approval is the bottleneck and implied utilization exceeds 100%.",
        correct: true,
        solution: `<p>Registration capacity is \\(\\dfrac{60}{6} = 10\\) claims/hour (utilization \\(8/10 = 80\\%\\)).</p>
          <p>Assessment capacity is \\(\\dfrac{3(60)}{15} = 12\\) claims/hour (utilization \\(8/12 = 66.7\\%\\)).</p>
          <p>Approval capacity is \\(\\dfrac{60}{8} = 7.5\\) claims/hour. Hence implied utilization is \\(\\dfrac{8}{7.5} = 1.067 = 106.7\\%\\).</p>
          <p>Documentation capacity is \\(\\dfrac{2(60)}{10} = 12\\) claims/hour (utilization \\(8/12 = 66.7\\%\\)).</p>
          <p>Approval has the lowest capacity, so it is the <strong>bottleneck</strong>, and demand exceeds its capacity — implied utilization is above 100%.</p>`
      },
      {
        key: "D",
        text: "Documentation is the bottleneck and utilization is 66.7%.",
        correct: false,
        hint: "Documentation has two employees working in parallel, so calculate its combined hourly capacity. Then compare it with the capacities of the other activities before deciding whether it is the bottleneck."
      }
    ]
  }),

  Object.freeze({
    id: 5,
    kicker: "Capacity under uncertainty",
    title: "Average utilization versus day-to-day demand variability",
    context: `<p>A food-processing plant uses the same packaging line for three products.</p>
      <table class="context-table">
        <thead><tr><th>Product</th><th>Average daily demand</th><th>Packaging time per unit</th></tr></thead>
        <tbody>
          <tr><td>Product A</td><td>100</td><td>2 min</td></tr>
          <tr><td>Product B</td><td>80</td><td>4 min</td></tr>
          <tr><td>Product C</td><td>50</td><td>4 min</td></tr>
        </tbody>
      </table>
      <p>The packaging line is available for 720 productive minutes per day. Daily demand may vary by approximately &plusmn;15% around its average.</p>`,
    question: "Which conclusion is most appropriate?",
    options: [
      {
        key: "A",
        text: "The plant has sufficient capacity because average total demand is only 230 units per day.",
        correct: false,
        hint: "Total number of units is not enough to assess capacity when products require different amounts of processing time."
      },
      {
        key: "B",
        text: "Average demand already requires all available processing capacity, so normal demand variability can create overload and backlog on high-demand days.",
        correct: true,
        solution: `<p>Average required processing time is \\(100(2) + 80(4) + 50(4) = 200 + 320 + 200 = 720\\) min/day, which exactly equals the available 720 minutes/day — average utilization is 100%.</p>
          <p>If the required processing time increases by 15% on a high-demand day, \\(720(1.15) = 828\\) min/day, which exceeds available capacity by \\(828 - 720 = 108\\) minutes.</p>
          <p>Thus, even though average processing requirements exactly match capacity, normal demand variability can create backlog and longer flow times.</p>`
      },
      {
        key: "C",
        text: "The plant has a 15% capacity cushion because daily demand may vary by only 15%.",
        correct: false,
        hint: "Variation in demand is not the same as spare capacity. First compare the required processing time with the available processing capacity."
      },
      {
        key: "D",
        text: "Capacity is adequate because no individual product requires more than 4 minutes of packaging time.",
        correct: false,
        hint: "Capacity depends on the combined processing time required by all products, not on the processing time of a single product."
      }
    ]
  }),

  Object.freeze({
    id: 6,
    kicker: "Product mix & labor content",
    title: "Minimum technician headcount across two test types",
    context: `<p>A diagnostic laboratory processes two types of tests using the same technician pool.</p>
      <p>A standard test requires 12 minutes of technician time, while a specialized test requires 30 minutes. The laboratory expects 240 standard tests and 80 specialized tests per day. Each technician is available for 7.5 productive hours per day.</p>
      <p>Assuming technician time can be flexibly allocated, what is the minimum number of technicians required?</p>`,
    question: "What is the minimum number of technicians required?",
    options: [
      {
        key: "A",
        text: "10",
        correct: false,
        hint: "Make sure the technician time required by both test types has been included."
      },
      {
        key: "B",
        text: "11",
        correct: false,
        hint: "Calculate the total technician time required per day and compare it with the productive minutes supplied by one technician."
      },
      {
        key: "C",
        text: "12",
        correct: true,
        solution: `<p>Total technician time required is \\(240(12) + 80(30) = 2880 + 2400 = 5280\\) min/day.</p>
          <p>Capacity per technician is \\(7.5(60) = 450\\) min/day.</p>
          <p>Therefore, \\(\\dfrac{5280}{450} = 11.73\\). Since fractional technicians are not feasible, the minimum required is <strong>12</strong>.</p>`
      },
      {
        key: "D",
        text: "13",
        correct: false,
        hint: "The question asks for the minimum theoretical workforce, so do not add an unrequested capacity cushion."
      }
    ]
  })
]);

const OM_TOPIC_SUMMARY = Object.freeze([
  Object.freeze({
    title: "Workload Balancing, Bottleneck, Takt Time and Line Balancing",
    body: `<p>A process is constrained by the activity with the lowest effective capacity, called the <strong>bottleneck</strong>. Workload balancing aims to distribute tasks across resources so that no station is excessively overloaded or underutilized.</p>
      <p><strong>Takt time</strong> links the required production pace to customer demand, while line balancing attempts to align station processing requirements with that required pace.</p>
      <p class="formula-block">\\[ \\text{Takt Time} = \\dfrac{\\text{Available Production Time}}{\\text{Customer Demand}} \\]</p>`
  }),
  Object.freeze({
    title: "Batching and Setup Capacity",
    body: `<p>Batch size creates a trade-off between setup efficiency and responsiveness. Larger batches reduce setup time per unit but may increase inventory, waiting, and response time. Smaller batches improve flexibility but require more frequent setups and therefore consume more capacity.</p>
      <p>A batching decision should consider both processing time and setup time:</p>
      <p class="formula-block">\\[ \\text{Total Machine Time Required} = \\text{Processing Time} + \\text{Setup Time} \\]</p>`
  }),
  Object.freeze({
    title: "Queueing, Variability and Pooling",
    body: `<p>Waiting is affected not only by average demand and capacity, but also by <strong>variability</strong>. As utilization becomes high, even moderate variability can cause waiting times and queues to increase significantly.</p>
      <p>Pooling customers or resources can reduce the impact of variability by allowing available capacity to serve demand more flexibly.</p>
      <p class="formula-block">\\[ \\text{High Utilization} + \\text{Variability} \\;\\Rightarrow\\; \\text{Longer Waiting} \\]</p>`
  }),
  Object.freeze({
    title: "Service Process Capacity",
    body: `<p>In a service process, effective capacity depends on both the processing time and the number of resources working in parallel. The activity with the lowest effective capacity is the process bottleneck. For a resource pool,</p>
      <p class="formula-block">\\[ \\text{Capacity} = \\dfrac{\\text{Number of Resources} \\times \\text{Available Time}}{\\text{Processing Time per Unit}} \\]</p>
      <p>Comparing demand with resource capacity helps identify potential congestion, queues, and overload.</p>`
  }),
  Object.freeze({
    title: "Capacity Analysis Under Uncertainty",
    body: `<p>Average demand alone may not be sufficient for capacity planning when demand is uncertain. A process operating close to 100% average utilization has little spare capacity to absorb fluctuations in demand.</p>
      <p>Thus, normal demand variability may create backlog and longer flow times even when average demand can just be met by available capacity. For a common process with demand and capacity expressed in the same units,</p>
      <p class="formula-block">\\[ \\text{Utilization} = \\dfrac{\\text{Flow Rate}}{\\text{Process Capacity}} \\]</p>
      <p>High average utilization combined with uncertain demand increases the risk of temporary capacity shortages.</p>`
  }),
  Object.freeze({
    title: "Product Mix and Labor Content",
    body: `<p>Different products or services may require different amounts of processing or labor time. Therefore, capacity requirements should be based on the total processing or labor time required by the product mix, rather than only on the total number of units produced.</p>
      <p class="formula-block">\\[ \\text{Total Time Required} = \\sum_i \\left(\\text{Demand}_i \\times \\text{Processing Time}_i\\right) \\]</p>
      <p>The required workforce or resource capacity can then be determined by comparing the total time required with the productive time available from each resource.</p>`
  })
]);

// ---- Rendering + interaction state ----

let omCurrentIndex = 0;
let omResolved = []; // per-question: true once the correct option has been chosen

function omEscapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function omRenderProgress() {
  const track = document.getElementById("om-progress-track");
  if (!track) return;
  track.innerHTML = OM_CHALLENGE_QUESTIONS.map((q, i) => {
    const state = omResolved[i] ? "done" : i === omCurrentIndex ? "current" : "todo";
    return `<span class="om-progress-dot om-progress-${state}" aria-hidden="true"></span>`;
  }).join("");
  const label = document.getElementById("om-progress-label");
  if (label) {
    const solvedCount = omResolved.filter(Boolean).length;
    label.textContent = `Question ${omCurrentIndex + 1} of ${OM_CHALLENGE_QUESTIONS.length} · ${solvedCount} solved`;
  }
}

function omRenderQuestion() {
  const question = OM_CHALLENGE_QUESTIONS[omCurrentIndex];
  const panel = document.getElementById("om-question-panel");
  if (!panel || !question) return;

  panel.innerHTML = `
    <span class="game-kicker">${omEscapeHTML(question.kicker)}</span>
    <h2 id="om-question-title">${omEscapeHTML(question.title)}</h2>
    <div class="om-context">${question.context}</div>
    <p class="om-question-prompt">${omEscapeHTML(question.question)}</p>
    <div class="om-options" id="om-options" role="radiogroup" aria-labelledby="om-question-title"></div>
    <div class="om-feedback" id="om-feedback" aria-live="polite"></div>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="om-prev-btn">&larr; Previous question</button>
      <button type="button" class="game-primary-btn" id="om-next-btn" hidden>Next question <span aria-hidden="true">&rarr;</span></button>
    </div>
  `;

  const optionsWrap = document.getElementById("om-options");
  const alreadyResolved = omResolved[omCurrentIndex];

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "om-option";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.dataset.key = option.key;
    btn.innerHTML = `<span class="om-option-key">${option.key}</span><span class="om-option-text">${omEscapeHTML(option.text)}</span>`;
    if (alreadyResolved && option.correct) {
      btn.classList.add("om-option-correct");
    }
    btn.addEventListener("click", () => omHandleAnswer(question, option, btn));
    optionsWrap.appendChild(btn);
  });

  if (alreadyResolved) {
    const correctOption = question.options.find(o => o.correct);
    omShowFeedback(correctOption, true);
  }

  document.getElementById("om-prev-btn").disabled = omCurrentIndex === 0;
  document.getElementById("om-prev-btn").addEventListener("click", () => {
    if (omCurrentIndex > 0) { omCurrentIndex--; omRenderQuestion(); omRenderProgress(); }
  });

  const nextBtn = document.getElementById("om-next-btn");
  if (alreadyResolved) nextBtn.hidden = false;
  nextBtn.addEventListener("click", omGoToNext);

  omRenderProgress();
  renderMath(panel);
}

function omHandleAnswer(question, option, button) {
  const optionsWrap = document.getElementById("om-options");
  optionsWrap.querySelectorAll(".om-option").forEach(el => el.setAttribute("aria-checked", "false"));
  button.setAttribute("aria-checked", "true");

  if (option.correct) {
    omResolved[omCurrentIndex] = true;
    optionsWrap.querySelectorAll(".om-option").forEach(el => {
      el.disabled = true;
      if (el.dataset.key === option.key) el.classList.add("om-option-correct");
    });
    document.getElementById("om-next-btn").hidden = false;
  } else {
    button.classList.add("om-option-wrong");
    window.setTimeout(() => button.classList.remove("om-option-wrong"), 600);
  }

  omShowFeedback(option, option.correct);
  omRenderProgress();
}

function omShowFeedback(option, isCorrect) {
  const feedback = document.getElementById("om-feedback");
  if (!feedback) return;
  if (isCorrect) {
    feedback.innerHTML = `<div class="om-feedback-box om-feedback-correct">
      <span class="om-feedback-label">Correct</span>
      ${option.solution}
    </div>`;
  } else {
    feedback.innerHTML = `<div class="om-feedback-box om-feedback-hint">
      <span class="om-feedback-label">Hint</span>
      <p>${option.hint}</p>
    </div>`;
  }
  renderMath(feedback);
}

function omGoToNext() {
  if (omCurrentIndex < OM_CHALLENGE_QUESTIONS.length - 1) {
    omCurrentIndex++;
    omRenderQuestion();
  } else {
    omRenderSummary();
  }
}

function omRenderSummary() {
  const panel = document.getElementById("om-question-panel");
  if (!panel) return;
  const solved = omResolved.filter(Boolean).length;
  panel.innerHTML = `
    <span class="game-kicker">Challenge complete</span>
    <h2>You worked through all ${OM_CHALLENGE_QUESTIONS.length} problems</h2>
    <p>${solved} of ${OM_CHALLENGE_QUESTIONS.length} were answered correctly during this pass. Revisit any question from the progress trail above, or start over.</p>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="om-review-btn">&larr; Review questions</button>
      <button type="button" class="game-primary-btn" id="om-restart-btn">Start over</button>
    </div>
  `;
  document.getElementById("om-review-btn").addEventListener("click", () => {
    omCurrentIndex = 0; omRenderQuestion();
  });
  document.getElementById("om-restart-btn").addEventListener("click", () => {
    omCurrentIndex = 0;
    omResolved = OM_CHALLENGE_QUESTIONS.map(() => false);
    omRenderQuestion();
  });
}

function initOMChallenge() {
  const panel = document.getElementById("om-question-panel");
  if (!panel) return;
  omResolved = OM_CHALLENGE_QUESTIONS.map(() => false);
  omCurrentIndex = 0;
  omRenderQuestion();
}
