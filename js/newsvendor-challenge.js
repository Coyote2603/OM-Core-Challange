/* The Newsvendor Challenge — an 8-round simulation
 *
 * You run a newsstand at the campus gate. Each "morning" gives you mean
 * demand, demand uncertainty (std. deviation), selling price, unit cost,
 * and salvage value. You predict which way the optimal order Q* has moved
 * relative to baseline, then commit an order quantity before that
 * morning's demand is drawn. Profit is computed from the realized demand,
 * and compared against what the optimal policy Q* would have earned on
 * that exact same demand draw — so the comparison isn't against an
 * abstract average, it's against the same luck you just had.
 *
 * Scenario, numbers, and all text below are original to this course
 * adaptation. Structure (baseline, five single-input changes, one round
 * combining two opposing changes, one capstone) mirrors a well-established
 * teaching pattern for this kind of exercise, but the content, copy, and
 * code are written fresh for this platform.
 */

// ---- Normal-distribution math ----

// Standard normal inverse CDF (Acklam's rational approximation).
function nvInvNorm(p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
             1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
             6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
             -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00,
             3.754408661907416e+00];
  const plow = 0.02425, phigh = 1 - plow;
  let q, r;
  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
           ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
  if (p <= phigh) {
    q = p - 0.5; r = q*q;
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q /
           (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
  }
  q = Math.sqrt(-2 * Math.log(1-p));
  return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
          ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
}

function nvRandNormal(mean, std) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + z * std;
}

function nvComputeQStar(round) {
  const cu = round.sell - round.cost;
  const co = round.cost - round.salvage;
  const ratio = cu / (cu + co);
  const z = nvInvNorm(ratio);
  return { cu, co, ratio, z, qStar: Math.round(round.mean + z * round.std) };
}

function nvProfitAt(round, Q, demand) {
  const sales = Math.min(Q, demand);
  const leftover = Math.max(Q - demand, 0);
  const lost = Math.max(demand - Q, 0);
  const profit = round.sell * sales + round.salvage * leftover - round.cost * Q;
  return { sales, leftover, lost, profit };
}

function nvFmtMoney(v) {
  const rounded = Math.round(v);
  return rounded < 0 ? `-Rs. ${Math.abs(rounded)}` : `Rs. ${rounded}`;
}

// ---- Scenario data ----

const NV_EPSILON = 3; // units within which a directional prediction counts as "about the same" / "at mean"

const NV_ROUNDS = Object.freeze([
  Object.freeze({
    id: 1, title: "A typical morning", tag: "Baseline", tagClass: "nv-tag-baseline",
    description: "Your newsstand at the campus gate sells one newspaper title. This morning sets the reference point — its numbers are the baseline every later morning is compared against.",
    mean: 220, std: 40, sell: 12, cost: 5, salvage: 1, changed: [], predictionType: "absolute"
  }),
  Object.freeze({
    id: 2, title: "Convocation crowd", tag: "One change: mean demand",
    description: "Convocation brings extra visitors through the gate. Only the average turnout moves — uncertainty and all three prices stay at baseline.",
    mean: 300, std: 40, sell: 12, cost: 5, salvage: 1, changed: ["mean"], predictionType: "relative"
  }),
  Object.freeze({
    id: 3, title: "Mid-semester uncertainty", tag: "One change: demand uncertainty",
    description: "It's mid-semester — some days are packed, others quiet, and you can no longer tell which in advance. Average turnout hasn't moved, only how much it swings.",
    mean: 220, std: 75, sell: 12, cost: 5, salvage: 1, changed: ["std"], predictionType: "relative"
  }),
  Object.freeze({
    id: 4, title: "Cover-story premium", tag: "One change: selling price",
    description: "A front-page story lets you charge more for today's copy. Your supplier's price and the publisher's buyback rate are unchanged.",
    mean: 220, std: 40, sell: 16, cost: 5, salvage: 1, changed: ["sell"], predictionType: "relative"
  }),
  Object.freeze({
    id: 5, title: "Printer's surcharge", tag: "One change: unit cost",
    description: "Paper prices spike and the printer passes along a surcharge on every copy you buy. Nothing else about today changes.",
    mean: 220, std: 40, sell: 12, cost: 9, salvage: 1, changed: ["cost"], predictionType: "relative"
  }),
  Object.freeze({
    id: 6, title: "Buyback withdrawn", tag: "One change: salvage value",
    description: "The publisher stops crediting unsold copies — worse, you now pay a small recycling fee for every copy you can't sell.",
    mean: 220, std: 40, sell: 12, cost: 5, salvage: -3, changed: ["salvage"], predictionType: "relative"
  }),
  Object.freeze({
    id: 7, title: "Two changes at once", tag: "Two opposing changes",
    description: "A rival stand undercuts you, so you raise today's price to protect margin — but your printer raises costs the very same morning. One change pulls Q* up, the other pulls it down.",
    mean: 220, std: 40, sell: 15, cost: 8, salvage: 1, changed: ["sell", "cost"], predictionType: "relative"
  }),
  Object.freeze({
    id: 8, title: "Finals week", tag: "Capstone: everything moves",
    description: "Finals week changes the turnout, the uncertainty, and the full cost structure together. Nothing here matches an earlier morning — work it out from the numbers alone.",
    mean: 160, std: 55, sell: 14, cost: 6, salvage: 2, changed: ["mean", "std", "sell", "cost", "salvage"], predictionType: "relative"
  })
]);

// ---- State ----

let nvIndex = 0;
let nvBaselineQStar = null;
let nvCumProfit = 0;
let nvCumGap = 0;
let nvCorrectCount = 0;
let nvLog = [];
let nvUserChoice = null;
let nvCommittedThisRound = false;

function nvReset() {
  nvIndex = 0;
  nvBaselineQStar = null;
  nvCumProfit = 0;
  nvCumGap = 0;
  nvCorrectCount = 0;
  nvLog = [];
  nvUserChoice = null;
  nvCommittedThisRound = false;
}

// ---- Rendering ----

function nvParamCell(label, value, key, round, isMoney) {
  const changed = round.changed.includes(key);
  const display = isMoney ? nvFmtMoney(value) : value;
  return `<div class="nv-param${changed ? " nv-param-changed" : ""}">
    <span>${label}</span><strong>${display}</strong>
  </div>`;
}

function nvRenderStatsBar() {
  const bar = document.getElementById("nv-stats-bar");
  if (!bar) return;
  const morningNum = Math.min(nvIndex + 1, NV_ROUNDS.length);
  bar.innerHTML = `
    <div class="nv-stat"><span>Morning</span><strong>${morningNum} of ${NV_ROUNDS.length}</strong></div>
    <div class="nv-stat"><span>Your profit</span><strong>${nvFmtMoney(nvCumProfit)}</strong></div>
    <div class="nv-stat ${nvCumGap >= 0 ? "nv-stat-positive" : "nv-stat-negative"}">
      <span>Gap vs Q*</span><strong>${nvCumGap >= 0 ? "+" : ""}${nvFmtMoney(nvCumGap)}</strong>
    </div>
  `;
}

function nvRenderRound() {
  const round = NV_ROUNDS[nvIndex];
  const panel = document.getElementById("nv-round-panel");
  const result = document.getElementById("nv-result-panel");
  if (!panel || !round) return;

  nvUserChoice = null;
  nvCommittedThisRound = false;

  const { qStar } = nvComputeQStar(round);
  if (nvIndex === 0) nvBaselineQStar = qStar;

  if (typeof window.logChallengeEvent === "function") {
    window.logChallengeEvent({ challenge: "newsvendor-sim", round_id: round.id, event_type: "round_view" });
  }

  const predictLabel = round.predictionType === "absolute"
    ? "Before you commit: where should Q* sit relative to mean demand?"
    : `Compared with the baseline Q* of ${nvBaselineQStar}, should this morning's Q* be lower, about the same, or higher?`;
  const predictOptions = round.predictionType === "absolute"
    ? ["Below mean", "At mean", "Above mean"]
    : ["Lower", "About the same", "Higher"];

  const sliderMin = Math.max(0, Math.round(round.mean - 3 * round.std));
  const sliderMax = Math.round(round.mean + 3 * round.std);

  panel.innerHTML = `
    <span class="nv-tag ${round.tagClass || ""}">${round.tag}</span>
    <h2>${round.title}</h2>
    <p class="nv-round-desc">${round.description}</p>
    <div class="nv-param-grid">
      ${nvParamCell("Mean demand", round.mean, "mean", round, false)}
      ${nvParamCell("Std. deviation", round.std, "std", round, false)}
      ${nvParamCell("Sell", round.sell, "sell", round, true)}
      ${nvParamCell("Cost", round.cost, "cost", round, true)}
      ${nvParamCell("Salvage", round.salvage, "salvage", round, true)}
    </div>
    <p class="nv-predict-label">${predictLabel}</p>
    <div class="nv-predict-row" id="nv-predict-row">
      ${predictOptions.map(opt => `<button type="button" class="nv-predict-option" data-choice="${opt}">${opt}</button>`).join("")}
    </div>
    <p class="nv-predict-warning" id="nv-predict-warning">Pick a prediction before committing your order.</p>
    <p class="nv-qty-label">Order quantity, Q</p>
    <div class="nv-slider-row">
      <input type="range" class="nv-slider" id="nv-qty-slider" min="${sliderMin}" max="${sliderMax}" value="${round.mean}" />
      <input type="number" class="nv-qty-input" id="nv-qty-input" min="${sliderMin}" max="${sliderMax}" value="${round.mean}" />
      <span class="nv-qty-unit">copies</span>
    </div>
    <div class="nv-range-labels"><span>${sliderMin}</span><span>Forecast mean: ${round.mean}</span><span>${sliderMax}</span></div>
    <details class="nv-hint">
      <summary>Need a decision hint?</summary>
      <div class="nv-hint-box">${nvHintHTML(round)}</div>
    </details>
    <button type="button" class="game-primary-btn" id="nv-commit-btn">Commit order</button>
  `;

  result.innerHTML = `<p class="nv-result-placeholder">Commit an order to see this morning's demand and outcome.</p>`;

  const slider = document.getElementById("nv-qty-slider");
  const input = document.getElementById("nv-qty-input");
  slider.addEventListener("input", () => { input.value = slider.value; });
  input.addEventListener("input", () => {
    let v = parseInt(input.value, 10);
    if (Number.isNaN(v)) return;
    v = Math.min(sliderMax, Math.max(sliderMin, v));
    slider.value = v;
  });

  document.getElementById("nv-predict-row").querySelectorAll(".nv-predict-option").forEach(btn => {
    btn.addEventListener("click", () => {
      nvUserChoice = btn.dataset.choice;
      panel.querySelectorAll(".nv-predict-option").forEach(b => b.classList.remove("nv-predict-selected"));
      btn.classList.add("nv-predict-selected");
      document.getElementById("nv-predict-warning").classList.remove("nv-visible");
    });
  });

  document.getElementById("nv-commit-btn").addEventListener("click", () => nvCommitOrder(round, qStar));

  nvRenderStatsBar();
}

function nvHintHTML(round) {
  const { cu, co, ratio } = nvComputeQStar(round);
  const direction = ratio > 0.5 + 1e-9 ? "above" : ratio < 0.5 - 1e-9 ? "below" : "at";
  return `
    <p><strong>C<sub>u</sub></strong> = sell − cost = ${nvFmtMoney(cu)} for a copy you could have sold but didn't stock.</p>
    <p><strong>C<sub>o</sub></strong> = cost − salvage = ${nvFmtMoney(co)} for a copy you stocked but couldn't sell.</p>
    <p>Critical ratio = C<sub>u</sub>/(C<sub>u</sub>+C<sub>o</sub>) = ${ratio.toFixed(3)}. That places Q* ${direction} mean demand — the standard deviation sets how far.</p>
  `;
}

function nvCommitOrder(round, qStar) {
  if (nvCommittedThisRound) return;
  if (!nvUserChoice) {
    document.getElementById("nv-predict-warning").classList.add("nv-visible");
    return;
  }

  const Q = parseInt(document.getElementById("nv-qty-input").value, 10);
  const demand = Math.max(0, Math.round(nvRandNormal(round.mean, round.std)));
  const { sales, leftover, lost, profit } = nvProfitAt(round, Q, demand);
  const qsOutcome = nvProfitAt(round, qStar, demand);
  const meanPolicyProfit = nvProfitAt(round, Math.round(round.mean), demand).profit;
  const gap = profit - qsOutcome.profit;

  nvCumProfit += profit;
  nvCumGap += gap;

  const correctAnswer = nvCorrectAnswer(round, qStar);
  const wasRight = nvUserChoice === correctAnswer;
  if (wasRight) nvCorrectCount++;

  const { cu, co, ratio } = nvComputeQStar(round);

  nvLog.push({
    morning: round.id,
    title: round.title,
    mean: round.mean,
    std: round.std,
    ratio,
    orderQ: Q,
    qStar,
    demand,
    outcome: leftover > 0 ? `${leftover} leftover` : lost > 0 ? `${lost} lost sales` : "Sold out exactly",
    profit,
    qStarProfit: qsOutcome.profit,
    meanPolicyProfit,
    predicted: nvUserChoice,
    correctAnswer,
    wasRight
  });

  if (typeof window.logChallengeEvent === "function") {
    window.logChallengeEvent({
      challenge: "newsvendor-sim", round_id: round.id, event_type: "commit",
      order_q: Q, q_star: qStar, demand, profit, q_star_profit: qsOutcome.profit,
      predicted: nvUserChoice, correct: wasRight
    });
  }

  nvCommittedThisRound = true;
  document.getElementById("nv-commit-btn").disabled = true;
  document.getElementById("nv-qty-slider").disabled = true;
  document.getElementById("nv-qty-input").disabled = true;
  document.querySelectorAll(".nv-predict-option").forEach(b => b.disabled = true);

  nvRenderResult(round, Q, qStar, demand, sales, leftover, lost, profit, qsOutcome.profit, gap, wasRight, correctAnswer);
  nvRenderLog();
  nvRenderStatsBar();
}

function nvCorrectAnswer(round, qStar) {
  if (round.predictionType === "absolute") {
    const diff = qStar - round.mean;
    return Math.abs(diff) <= NV_EPSILON ? "At mean" : diff > 0 ? "Above mean" : "Below mean";
  }
  const diff = qStar - nvBaselineQStar;
  return Math.abs(diff) <= NV_EPSILON ? "About the same" : diff > 0 ? "Higher" : "Lower";
}

function nvRenderResult(round, Q, qStar, demand, sales, leftover, lost, profit, qStarProfit, gap, wasRight, correctAnswer) {
  const result = document.getElementById("nv-result-panel");
  if (!result) return;

  let demandNote;
  if (demand > Q) {
    demandNote = `Demand came in ${demand - Q} above your order. Each lost sale forgoes ${nvFmtMoney(round.sell - round.cost)} in margin.`;
  } else if (demand < Q) {
    demandNote = `Demand came in ${Q - demand} below your order. Each leftover copy nets ${nvFmtMoney(round.salvage)}, against the ${nvFmtMoney(round.cost)} it cost to stock.`;
  } else {
    demandNote = "Demand landed exactly on your order — no leftovers, no lost sales.";
  }

  const scaleMax = Math.max(Q, demand, 1) * 1.15;
  const orderedPct = Math.min(100, (Q / scaleMax) * 100);
  const demandPct = Math.min(100, (demand / scaleMax) * 100);

  const salvageSign = round.salvage >= 0 ? "+" : "−";
  const formula = `Rs.${round.sell} × ${sales} sales ${salvageSign} ${nvFmtMoney(Math.abs(round.salvage)).replace("Rs. ", "Rs.")} × ${leftover} leftover − Rs.${round.cost} × ${Q} ordered = ${nvFmtMoney(profit)}`;

  const reviewClass = wasRight ? "nv-review-correct" : "nv-review-off";
  const reviewLabel = wasRight ? "Your prediction was right" : "Review your prediction";
  const { cu, co, ratio } = nvComputeQStar(round);

  const isLast = nvIndex === NV_ROUNDS.length - 1;

  result.innerHTML = `
    <h2>Demand was ${demand}</h2>
    <p class="nv-demand-note">${demandNote}</p>
    <div class="nv-bars">
      <div class="nv-bar-row"><span>Ordered</span><div class="nv-bar-track"><div class="nv-bar-fill nv-bar-ordered" style="width:${orderedPct}%"></div></div><span>${Q}</span></div>
      <div class="nv-bar-row"><span>Demand</span><div class="nv-bar-track"><div class="nv-bar-fill nv-bar-demand" style="width:${demandPct}%"></div></div><span>${demand}</span></div>
    </div>
    <div class="nv-outcome-grid">
      <div class="nv-outcome-cell"><span>Sales</span><strong>${sales}</strong></div>
      <div class="nv-outcome-cell"><span>Leftover</span><strong>${leftover}</strong></div>
      <div class="nv-outcome-cell"><span>Lost sales</span><strong>${lost}</strong></div>
      <div class="nv-outcome-cell nv-outcome-profit"><span>Profit</span><strong>${nvFmtMoney(profit)}</strong></div>
    </div>
    <div class="nv-formula-line">${formula}</div>
    <div class="nv-review ${reviewClass}">
      <span class="nv-review-label">${reviewLabel}</span>
      <p>C<sub>u</sub> = ${nvFmtMoney(cu)}, C<sub>o</sub> = ${nvFmtMoney(co)}, critical ratio = ${ratio.toFixed(2)}. Q* here is ${qStar}.</p>
      <p>Correct answer: <strong>${correctAnswer}</strong>${wasRight ? "" : ` — you chose "${nvUserChoice}".`}</p>
    </div>
    <div class="nv-comparison-box">
      This morning's target was Q* = ${qStar}. On this same demand, that policy would have earned ${nvFmtMoney(qStarProfit)}.
      Your choice earned ${nvFmtMoney(Math.abs(gap))} ${gap >= 0 ? "more" : "less"} on this particular realization.
    </div>
    <button type="button" class="game-primary-btn" id="nv-next-btn">${isLast ? "See your results" : "Next morning"} <span aria-hidden="true">&rarr;</span></button>
  `;

  document.getElementById("nv-next-btn").addEventListener("click", nvAdvance);
}

function nvRenderLog() {
  const section = document.getElementById("nv-log-section");
  const body = document.getElementById("nv-log-body");
  if (!section || !body) return;
  section.hidden = false;
  body.innerHTML = nvLog.map(row => `
    <tr>
      <td>${row.morning}</td>
      <td>${row.title}</td>
      <td>${row.orderQ}</td>
      <td>${row.demand}</td>
      <td>${row.outcome}</td>
      <td>${nvFmtMoney(row.profit)}</td>
    </tr>
  `).join("");
}

function nvAdvance() {
  if (nvIndex < NV_ROUNDS.length - 1) {
    nvIndex++;
    nvRenderRound();
    document.getElementById("nv-round-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    nvRenderSummary();
  }
}

function nvRenderSummary() {
  document.getElementById("nv-game").hidden = true;
  const summary = document.getElementById("nv-summary");
  if (!summary) return;
  summary.hidden = false;

  const totalQStarProfit = nvLog.reduce((sum, r) => sum + r.qStarProfit, 0);
  const totalMeanProfit = nvLog.reduce((sum, r) => sum + r.meanPolicyProfit, 0);
  const avgDistance = nvLog.reduce((sum, r) => sum + Math.abs(r.orderQ - r.qStar), 0) / nvLog.length;
  const belowCount = nvLog.filter(r => r.orderQ < r.qStar).length;
  const aboveCount = nvLog.filter(r => r.orderQ > r.qStar).length;
  const tendency = belowCount > aboveCount ? "below" : aboveCount > belowCount ? "above" : "evenly split around";
  const tip = belowCount > aboveCount
    ? "Recheck how a high underage cost or salvage value pushes the target percentile upward — that's usually why Q* sits further above the mean than your orders did."
    : aboveCount > belowCount
      ? "Recheck how a high overage cost pulls the target percentile downward — that's usually why Q* sits closer to or below the mean than your orders did."
      : "Your orders didn't lean consistently to either side of Q*, which is a good sign you were reasoning about each morning on its own terms rather than anchoring on one habit.";

  if (typeof window.logChallengeEvent === "function") {
    window.logChallengeEvent({
      challenge: "newsvendor-sim", event_type: "complete",
      total_profit: nvCumProfit, total_gap: nvCumGap, predictions_correct: nvCorrectCount,
      avg_distance_from_qstar: avgDistance
    });
  }

  const recapRows = nvLog.map(r => `
    <tr>
      <td>${r.title}</td>
      <td>${r.mean}</td>
      <td>${r.std}</td>
      <td>${r.ratio.toFixed(2)}</td>
      <td>${r.wasRight ? `<span class="nv-recap-correct">&check; ${r.predicted}</span>` : `${r.predicted} &rarr; ${r.correctAnswer}`}</td>
      <td>${r.orderQ}</td>
      <td><strong>${r.qStar}</strong></td>
    </tr>
  `).join("");

  summary.innerHTML = `
    <div class="nv-summary-card nv-summary-wide">
      <span class="game-kicker">Eight mornings complete</span>
      <h2>Your policy, explained</h2>
      <p class="nv-summary-lede">
        Your orders averaged ${avgDistance.toFixed(1)} units from Q* and landed more often ${tendency} the changing targets.
        ${tip} You correctly called the direction of Q* on ${nvCorrectCount} of ${NV_ROUNDS.length} mornings before choosing a quantity.
        On these same eight demand draws, the adaptive Q* policy would have earned ${nvFmtMoney(Math.abs(totalQStarProfit - nvCumProfit))}
        ${totalQStarProfit >= nvCumProfit ? "more" : "less"} than you did &mdash; comparing both policies on the identical realized demand keeps that benchmark fair.
      </p>
      <div class="nv-summary-stat-grid">
        <div class="nv-summary-cell nv-summary-cell-highlight">
          <span>Your total profit</span><strong>${nvFmtMoney(nvCumProfit)}</strong>
          <small>Avg ${avgDistance.toFixed(1)} units from Q* &middot; ${nvCorrectCount}/${NV_ROUNDS.length} predictions correct</small>
        </div>
        <div class="nv-summary-cell">
          <span>Adaptive Q* policy</span><strong>${nvFmtMoney(totalQStarProfit)}</strong>
          <small>Uses that morning's optimal order</small>
        </div>
        <div class="nv-summary-cell">
          <span>Mean-demand policy</span><strong>${nvFmtMoney(totalMeanProfit)}</strong>
          <small>Always orders that morning's forecast mean</small>
        </div>
      </div>
      <p class="nv-summary-note">Replaying with different choices changes the random demand draws too, so compare your distance from Q* and your prediction score across attempts &mdash; not raw profit totals.</p>
      <div class="nv-summary-columns">
        <div class="nv-summary-explain">
          <span class="eyebrow">The mechanism</span>
          <h3>Why Q* moved, morning to morning</h3>
          <ol class="nv-summary-steps">
            <li><span class="nv-step-num">1</span>C<sub>u</sub> = sell &minus; cost</li>
            <li><span class="nv-step-num">2</span>C<sub>o</sub> = cost &minus; salvage</li>
            <li><span class="nv-step-num">3</span>Critical ratio = C<sub>u</sub>/(C<sub>u</sub>+C<sub>o</sub>) sets the target percentile</li>
            <li><span class="nv-step-num">4</span>Q* = mean + z(ratio) &times; std. deviation combines the forecast, the economics, and the uncertainty</li>
          </ol>
          <div class="nv-log-table-wrap">
            <table class="nv-log-table">
              <thead><tr><th>Morning</th><th>&mu;</th><th>&sigma;</th><th>CR</th><th>Prediction</th><th>Your Q</th><th>Q*</th></tr></thead>
              <tbody>${recapRows}</tbody>
            </table>
          </div>
        </div>
        <div class="nv-summary-teaches">
          <span class="eyebrow">What this run teaches</span>
          <h3>Optimize the policy, not yesterday</h3>
          <ul>
            <li>The best order quantity still produces leftovers on some mornings and lost sales on others &mdash; that's expected, not a sign Q* was wrong.</li>
            <li>Mean demand moves where Q* is centered; it doesn't by itself decide which side of the mean Q* lands on.</li>
            <li>The critical ratio, not intuition, decides whether Q* sits above or below the mean.</li>
            <li>A larger standard deviation stretches the gap between the mean and Q* &mdash; it doesn't change which direction that gap points.</li>
            <li>Q* is optimal on average across many mornings. It can still lose to a different quantity on any single lucky or unlucky draw.</li>
          </ul>
        </div>
      </div>
      <button type="button" class="game-secondary-btn" id="nv-restart-btn">Play again</button>
    </div>
  `;
  document.getElementById("nv-restart-btn").addEventListener("click", () => {
    summary.hidden = true;
    nvReset();
    document.getElementById("nv-game").hidden = false;
    document.getElementById("nv-log-section").hidden = true;
    nvRenderRound();
  });
}

function initNVChallenge() {
  const startBtn = document.getElementById("nv-start-btn");
  if (!startBtn) return;
  nvReset();
  startBtn.addEventListener("click", () => {
    document.getElementById("nv-intro").hidden = true;
    document.getElementById("nv-game").hidden = false;
    nvRenderRound();
  });
}
