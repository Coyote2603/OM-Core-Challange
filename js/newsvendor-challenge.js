/* The Newsvendor & EOQ Challenge
 *
 * 15 worked multiple-choice problems covering Economic Order Quantity (EOQ)
 * and the newsvendor model. Every wrong option carries its own targeted
 * hint; the correct option carries the full worked solution. A learner can
 * try any option, get the hint for that specific misconception, and try
 * again until they find the correct one — nothing is timed or auto-advanced.
 *
 * Source: OM Core Practice Set on Inventory Management (Part B: Economic
 * Order Quantity, Part C: The Newsvendor Model). Part A (inventory turns)
 * is intentionally excluded per instructor request — EOQ and newsvendor
 * only. The source PDF's answer key gives only the correct derivation for
 * each question; the hints on the wrong options below were authored here
 * to match each distractor's numeric value to the most likely underlying
 * error (e.g. an inverted critical ratio, a missing term in the holding
 * cost, a forgotten square root) — re-derive before changing any number.
 */

const NV_CHALLENGE_QUESTIONS = Object.freeze([
  Object.freeze({
    id: 1,
    kicker: "EOQ with partial holding cost",
    title: "Campus coffee store: order size for whole bean coffee",
    context: `<p>Powered by Koffee (PBK) is a campus coffee store that uses 50 bags of whole bean coffee every month, with steady demand. PBK buys from a local supplier at $25 per bag plus an $85 fixed cost for every delivery, independent of order size. Storage costs $1 per bag per month, and PBK's cost of capital is 2% per month.</p>`,
    question: "What is the optimal order size?",
    options: [
      {
        key: "A",
        text: "52–55 bags",
        correct: false,
        hint: "This is close to \\(\\sqrt{DS/h}\\) — recheck the EOQ formula; it has a factor of 2 inside the square root that's missing here."
      },
      {
        key: "B",
        text: "74–77 bags",
        correct: true,
        solution: `<p>Holding cost combines storage and the cost of capital tied up in inventory: \\(h = \\$1 + 0.02 \\times \\$25 = \\$1.50\\) per bag per month.</p>
          <p>\\[ Q^* = \\sqrt{\\dfrac{2DS}{h}} = \\sqrt{\\dfrac{2(50)(85)}{1.50}} = \\sqrt{5{,}666.7} \\approx 75.3 \\text{ bags.} \\]</p>
          <p>The optimal order size is about <strong>75 bags</strong>.</p>`
      },
      {
        key: "C",
        text: "90–94 bags",
        correct: false,
        hint: "This matches using \\(h = \\$1\\) alone. Storage isn't the only holding cost here — PBK's 2% monthly cost of capital on the \\$25 purchase price also belongs in \\(h\\)."
      },
      {
        key: "D",
        text: "128–132 bags",
        correct: false,
        hint: "This matches using only the capital-cost portion of \\(h\\) (\\(0.02 \\times \\$25 = \\$0.50\\)) and leaving out the \\$1 storage cost. Both pieces belong in \\(h\\)."
      }
    ]
  }),

  Object.freeze({
    id: 2,
    kicker: "EOQ with a quantity discount",
    title: "Hospital gloves: accept the supplier's bulk discount?",
    context: `<p>A hospital uses 200 boxes of surgical gloves per week, at a constant rate. Each order costs Rs. 1,500 (paperwork, transport, receiving), whatever its size. A box costs Rs. 400, and the annual holding cost is 26% of the purchase price. Assume 52 weeks per year.</p>
      <p>The supplier offers a 3% discount on the price of every box if the hospital orders at least 1,000 boxes at a time.</p>`,
    question: "Including purchase cost, what should the hospital do?",
    options: [
      {
        key: "A",
        text: "Reject; total weekly cost rises by Rs. 170–180",
        correct: false,
        hint: "This matches comparing only the ordering-plus-holding cost at Q = 1,000 against the no-discount EOQ cost, while ignoring that the discount also lowers the weekly purchase cost. Include the purchase cost in both scenarios."
      },
      {
        key: "B",
        text: "Accept; total weekly cost falls by Rs. 2,350–2,450",
        correct: false,
        hint: "This matches taking 3% of the weekly purchase cost (\\(0.03 \\times \\text{Rs. }80{,}000\\)) as the entire saving. But ordering in bigger batches also changes the ordering and holding costs — those need to be recomputed too, not assumed unchanged."
      },
      {
        key: "C",
        text: "Accept; total weekly cost falls by Rs. 1,090–1,100",
        correct: false,
        hint: "This is close to the no-discount EOQ's ordering-plus-holding cost on its own. Make sure you're comparing the full total weekly cost (purchase + ordering + holding) in both scenarios, not just one cost component."
      },
      {
        key: "D",
        text: "Accept; total weekly cost falls by Rs. 2,200–2,250",
        correct: true,
        solution: `<p>Without the discount: \\(h = 0.26 \\times 400 / 52 = \\text{Rs. }2\\)/box/week. At the EOQ, ordering-plus-holding cost is</p>
          <p>\\[ C(Q^*) = \\sqrt{2 \\times 1{,}500 \\times 200 \\times 2} \\approx \\text{Rs. }1{,}095\\text{/week.} \\]</p>
          <p>Total weekly cost \\(= 200 \\times 400 + 1{,}095 = \\text{Rs. }81{,}095\\).</p>
          <p>With the discount, price falls to Rs. 388/box and \\(h = 0.26 \\times 388/52 \\approx \\text{Rs. }1.94\\)/box/week. At \\(Q = 1{,}000\\): ordering cost \\(= (200/1{,}000)(1{,}500) = \\text{Rs. }300\\), holding cost \\(= (1{,}000/2)(1.94) = \\text{Rs. }970\\), purchase cost \\(= 200 \\times 388 = \\text{Rs. }77{,}600\\). Total \\(= \\text{Rs. }78{,}870\\).</p>
          <p>Saving \\(\\approx 81{,}095 - 78{,}870 = \\text{Rs. }2{,}225\\)/week — the hospital should <strong>accept</strong> the discount.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 3,
    kicker: "Flatness of the EOQ cost curve",
    title: "Hospital gloves: the cost of ordering twice the EOQ",
    context: `<p>Same hospital and gloves as the previous question (no discount). Without any discount, the purchasing clerk orders twice the EOQ each time, to cut down on paperwork.</p>`,
    question: "By about how much does the hospital's weekly ordering-plus-holding cost rise compared with ordering the EOQ?",
    options: [
      {
        key: "A",
        text: "50%",
        correct: false,
        hint: "This matches recognizing that holding cost doubles when \\(Q\\) doubles (correct — average inventory \\(Q/2\\) doubles), but assuming ordering cost stays the same. It doesn't: ordering cost is \\((D/Q)K\\), and it falls as \\(Q\\) rises because fewer orders are placed."
      },
      {
        key: "B",
        text: "100%",
        correct: false,
        hint: "This matches assuming total cost scales linearly with order quantity — that doubling \\(Q\\) simply doubles the ordering-plus-holding cost. The EOQ cost curve is relatively flat near its minimum, so the actual rise is much smaller."
      },
      {
        key: "C",
        text: "25%",
        correct: true,
        solution: `<p>For any order quantity \\(Q\\), the ratio of its cost to the optimal cost is</p>
          <p>\\[ \\dfrac{C(Q)}{C(Q^*)} = \\dfrac{1}{2}\\left(\\dfrac{Q}{Q^*} + \\dfrac{Q^*}{Q}\\right). \\]</p>
          <p>At \\(Q = 2Q^*\\): \\(\\dfrac{1}{2}(2 + 0.5) = 1.25\\) — a <strong>25% rise</strong>. This formula is why the EOQ cost curve is described as "flat" near its minimum: even ordering twice the optimal quantity only costs 25% more.</p>`
      },
      {
        key: "D",
        text: "0%, because fewer orders exactly offset the extra holding cost",
        correct: false,
        hint: "There is a real partial offset — fewer orders do reduce ordering cost as holding cost rises — but it isn't exact. Use \\(C(Q)/C(Q^*) = \\tfrac{1}{2}(Q/Q^* + Q^*/Q)\\) to find how much net cost increase remains."
      }
    ]
  }),

  Object.freeze({
    id: 4,
    kicker: "How EOQ scales with demand",
    title: "Hospital supply item: demand quadruples",
    context: `<p>A hospital's demand for a supply item quadruples, while the order cost \\(K\\) and holding cost \\(h\\) stay the same.</p>`,
    question: "What happens under the EOQ model?",
    options: [
      {
        key: "A",
        text: "The EOQ doubles, and ordering-plus-holding cost per unit falls by half",
        correct: true,
        solution: `<p>\\(Q^* = \\sqrt{2KD/h}\\), so \\(Q^* \\propto \\sqrt{D}\\). When \\(D\\) quadruples, \\(\\sqrt{D}\\) doubles, so <strong>the EOQ doubles</strong>.</p>
          <p>Cost per unit at the optimum is \\(\\sqrt{2Kh/D}\\), which is inversely proportional to \\(\\sqrt{D}\\). Since \\(\\sqrt{D}\\) doubles, <strong>cost per unit falls by half</strong>.</p>`
      },
      {
        key: "B",
        text: "The EOQ quadruples, and ordering-plus-holding cost per unit is unchanged",
        correct: false,
        hint: "This matches assuming the EOQ scales linearly with demand. It doesn't — \\(Q^* = \\sqrt{2KD/h}\\) depends on the square root of \\(D\\), not \\(D\\) directly."
      },
      {
        key: "C",
        text: "The EOQ doubles, and ordering-plus-holding cost per unit is unchanged",
        correct: false,
        hint: "The EOQ scaling here is right. But cost per unit, \\(\\sqrt{2Kh/D}\\), also depends on \\(D\\) — recompute it rather than assuming it's unaffected."
      },
      {
        key: "D",
        text: "The EOQ is unchanged, because \\(K\\) and \\(h\\) are unchanged",
        correct: false,
        hint: "\\(K\\) and \\(h\\) being unchanged doesn't mean \\(Q^*\\) is unchanged — demand \\(D\\) is also inside the EOQ formula, \\(Q^* = \\sqrt{2KD/h}\\)."
      }
    ]
  }),

  Object.freeze({
    id: 5,
    kicker: "Newsvendor order quantity",
    title: "Diwali gift boxes: how many to order",
    context: `<p>A sweet shop must order Diwali gift boxes from its supplier once, well before the festival. Each box costs Rs. 500 and sells for Rs. 800. Boxes left after Diwali are sold to a bulk buyer for Rs. 350 each. Festival demand is normally distributed with mean 1,000 boxes and standard deviation 300 boxes.</p>`,
    question: "How many boxes should the shop order to maximize expected profit?",
    options: [
      {
        key: "A",
        text: "865–875",
        correct: false,
        hint: "This matches using \\(C_o/(C_u+C_o)\\) as the critical ratio instead of \\(C_u/(C_u+C_o)\\) — i.e. the underage and overage costs have been swapped. Recheck which one is which: \\(C_u\\) is the margin lost on a sale you can't make; \\(C_o\\) is the loss on each unsold unit."
      },
      {
        key: "B",
        text: "1,125–1,140",
        correct: true,
        solution: `<p>\\(C_u = 800 - 500 = \\text{Rs. }300\\) (margin lost if demand exceeds the order). \\(C_o = 500 - 350 = \\text{Rs. }150\\) (loss on each unsold box).</p>
          <p>Critical ratio \\(= C_u/(C_u+C_o) = 300/450 = 0.667\\). From the normal table, \\(\\Phi(0.43) = 0.6664\\) and \\(\\Phi(0.44) = 0.6700\\); by the round-up rule, \\(z = 0.44\\).</p>
          <p>\\[ Q = \\mu + z\\sigma = 1{,}000 + 0.44(300) = 1{,}132 \\text{ boxes.} \\]</p>`
      },
      {
        key: "C",
        text: "995–1,005",
        correct: false,
        hint: "This is just the mean demand — it corresponds to a critical ratio of exactly 0.5. Here \\(C_u \\neq C_o\\), so the optimal order isn't simply the mean; compute the actual critical ratio \\(C_u/(C_u+C_o)\\) first."
      },
      {
        key: "D",
        text: "1,295–1,305",
        correct: false,
        hint: "This matches using a flat \"one standard deviation above the mean\" buffer (\\(z=1\\)) as a generic safety margin, rather than deriving \\(z\\) from the actual critical ratio \\(C_u/(C_u+C_o)\\)."
      }
    ]
  }),

  Object.freeze({
    id: 6,
    kicker: "Expected sales at a given order quantity",
    title: "Diwali gift boxes: expected sales at the optimal order",
    context: `<p>Same sweet shop as above. The shop orders 1,132 boxes, so \\(z = 0.44\\) and \\(I(0.44) = 0.6569\\), where \\(I(z)\\) is the standard normal inventory (expected-leftover) function.</p>`,
    question: "What are the shop's expected sales?",
    options: [
      {
        key: "A",
        text: "995–1,005 boxes",
        correct: false,
        hint: "This is close to mean demand — but expected sales isn't simply mean demand once the order quantity differs from the mean. Use expected sales \\(= Q - \\sigma \\cdot I(z)\\)."
      },
      {
        key: "B",
        text: "1,130–1,135 boxes",
        correct: false,
        hint: "This is close to the order quantity \\(Q\\) itself — it assumes every unit ordered gets sold. Some demand realizations fall short of \\(Q\\), leaving unsold boxes, so expected sales are lower than \\(Q\\)."
      },
      {
        key: "C",
        text: "865–875 boxes",
        correct: false,
        hint: "Recompute using expected sales \\(= Q - \\sigma \\cdot I(z)\\) with the given \\(I(0.44) = 0.6569\\), rather than an approximation."
      },
      {
        key: "D",
        text: "930–940 boxes",
        correct: true,
        solution: `<p>Expected leftover stock \\(= \\sigma \\cdot I(z) = 300 \\times 0.6569 \\approx 197.1\\) boxes.</p>
          <p>Expected sales \\(= Q - \\text{expected leftover} = 1{,}132 - 197.1 \\approx\\) <strong>935 boxes</strong>.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 7,
    kicker: "Expected profit at the optimal order",
    title: "Diwali gift boxes: expected profit",
    context: `<p>Continuing the same sweet shop example: order quantity 1,132 boxes, expected sales \\(\\approx 934.9\\) boxes, expected leftover \\(\\approx 197.1\\) boxes. \\(C_u = \\text{Rs. }300\\), \\(C_o = \\text{Rs. }150\\).</p>`,
    question: "What is the shop's expected profit?",
    options: [
      {
        key: "A",
        text: "Rs. 2.48–2.53 lakh",
        correct: true,
        solution: `<p>\\[ \\text{Expected profit} = C_u \\times \\text{expected sales} - C_o \\times \\text{expected leftover} \\]</p>
          <p>\\[ = 300 \\times 934.9 - 150 \\times 197.1 \\approx \\text{Rs. }2.51 \\text{ lakh.} \\]</p>`
      },
      {
        key: "B",
        text: "Rs. 2.78–2.83 lakh",
        correct: false,
        hint: "This matches \\(C_u \\times \\text{expected sales}\\) on its own (\\(300 \\times 934.9 \\approx\\) Rs. 2.80 lakh) — the overage cost on leftover boxes (\\(C_o \\times\\) expected leftover) still needs to be subtracted."
      },
      {
        key: "C",
        text: "Rs. 2.98–3.02 lakh",
        correct: false,
        hint: "This matches \\(C_u \\times \\mu\\) (\\(300 \\times 1{,}000 = \\) Rs. 3.00 lakh) — using mean demand instead of expected sales, and leaving out the leftover cost entirely."
      },
      {
        key: "D",
        text: "Rs. 3.38–3.42 lakh",
        correct: false,
        hint: "This matches \\(C_u \\times Q\\) (\\(300 \\times 1{,}132 \\approx\\) Rs. 3.40 lakh) — margin on the full order quantity, with no deduction at all for expected leftover stock."
      }
    ]
  }),

  Object.freeze({
    id: 8,
    kicker: "In-stock probability",
    title: "Diwali gift boxes: chance of not running out",
    context: `<p>Same sweet shop, ordering the optimal 1,132 boxes (\\(z = 0.44\\)).</p>`,
    question: "What is the probability that the shop does not run out of boxes (in-stock probability)?",
    options: [
      {
        key: "A",
        text: "33%–34%",
        correct: false,
        hint: "This is the stock-out probability (\\(1 - \\Phi(z)\\)), not the in-stock probability. The question asks for the chance of <em>not</em> running out."
      },
      {
        key: "B",
        text: "50%",
        correct: false,
        hint: "In-stock probability is only 50% when you order exactly the mean (\\(z=0\\)). Here the order is above the mean (\\(z = 0.44 > 0\\)), so the in-stock probability should be higher than 50%."
      },
      {
        key: "C",
        text: "66%–67%",
        correct: true,
        solution: `<p>In-stock probability \\(= \\Phi(z) = \\Phi(0.44) = 0.67\\).</p>
          <p>At the optimal order, the in-stock probability (approximately) equals the critical ratio — here, 66.7%.</p>`
      },
      {
        key: "D",
        text: "95%",
        correct: false,
        hint: "This matches picking a generic \"high service level\" figure rather than computing \\(\\Phi(z)\\) for this specific \\(z = 0.44\\)."
      }
    ]
  }),

  Object.freeze({
    id: 9,
    kicker: "How a higher salvage value changes the order",
    title: "Diwali gift boxes: a better buyer for leftovers",
    context: `<p>Starting again from the original sweet shop (cost Rs. 500, price Rs. 800, demand mean 1,000, standard deviation 300). Now a corporate client agrees to buy all leftover boxes at Rs. 450 each instead of Rs. 350.</p>`,
    question: "What is the new optimal order quantity?",
    options: [
      {
        key: "A",
        text: "1,130–1,135 boxes",
        correct: false,
        hint: "This is the original order quantity from before the salvage value changed. A higher salvage value lowers \\(C_o\\) — recompute it using the new Rs. 450 salvage value, not the original Rs. 350."
      },
      {
        key: "B",
        text: "1,315–1,325 boxes",
        correct: true,
        solution: `<p>\\(C_o = 500 - 450 = \\text{Rs. }50\\) (smaller than before, since leftovers are now worth more). \\(C_u\\) is unchanged at Rs. 300.</p>
          <p>Critical ratio \\(= 300/(300+50) = 0.857\\). \\(\\Phi(1.06) = 0.8554\\), \\(\\Phi(1.07) = 0.8577\\); by the round-up rule, \\(z = 1.07\\).</p>
          <p>\\[ Q = 1{,}000 + 1.07(300) = 1{,}321 \\text{ boxes.} \\]</p>`
      },
      {
        key: "C",
        text: "920–930 boxes",
        correct: false,
        hint: "A higher salvage value lowers \\(C_o\\), which raises the critical ratio and \\(z\\) above its original value (0.44) — this answer is below the original order quantity, which moves in the wrong direction."
      },
      {
        key: "D",
        text: "1,450–1,460 boxes",
        correct: false,
        hint: "Check your critical ratio calculation: \\(C_u\\) is still price minus cost (\\(800-500=300\\)), unaffected by the salvage change — only \\(C_o\\) changes here, to \\(500-450=50\\)."
      }
    ]
  }),

  Object.freeze({
    id: 10,
    kicker: "What makes the newsvendor order more",
    title: "Diwali gift boxes: which change increases the order quantity",
    context: `<p>Starting again from the original sweet shop (cost Rs. 500, price Rs. 800, salvage Rs. 350, demand mean 1,000, standard deviation 300).</p>`,
    question: "Which single change would make the shop order more boxes?",
    options: [
      {
        key: "A",
        text: "The supplier raises the price of a box",
        correct: false,
        hint: "A higher purchase cost affects both \\(C_u\\) (shrinks, since the margin \\(\\text{price}-\\text{cost}\\) falls) and \\(C_o\\) (grows, since \\(\\text{cost}-\\text{salvage}\\) rises). Work out which way that moves the critical ratio \\(C_u/(C_u+C_o)\\) — it isn't up."
      },
      {
        key: "B",
        text: "The shop lowers its selling price",
        correct: false,
        hint: "Lowering price reduces \\(C_u = \\text{price}-\\text{cost}\\), which lowers the critical ratio — check whether that raises or lowers the optimal order."
      },
      {
        key: "C",
        text: "The bulk buyer stops taking leftover boxes",
        correct: false,
        hint: "Losing the salvage outlet raises \\(C_o\\) sharply (leftover units become a near-total loss), which pushes the critical ratio — and the order quantity — in the opposite direction from what the question asks for."
      },
      {
        key: "D",
        text: "The bulk buyer raises the price it pays for leftover boxes",
        correct: true,
        solution: `<p>A higher salvage value lowers \\(C_o\\) (the cost of an unsold box, cost minus salvage, shrinks). A lower \\(C_o\\) raises the critical ratio \\(C_u/(C_u+C_o)\\), which raises \\(z\\) and therefore <strong>raises the optimal order quantity</strong>.</p>
          <p>The other three options either lower \\(C_u\\) or raise \\(C_o\\) — both push the critical ratio down, reducing the order quantity.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 11,
    kicker: "More demand variability, same critical ratio",
    title: "Diwali gift boxes: a less predictable market",
    context: `<p>Starting again from the original sweet shop. A new competitor makes demand harder to predict. The mean stays at 1,000 boxes, but the standard deviation rises from 300 to 400. Prices and costs are unchanged.</p>`,
    question: "What happens to the optimal order quantity and expected profit?",
    options: [
      {
        key: "A",
        text: "The optimal order quantity rises, and expected profit falls",
        correct: true,
        solution: `<p>Costs are unchanged, so the critical ratio and \\(z = 0.44\\) stay the same. But \\(Q = \\mu + z\\sigma\\) now uses the larger \\(\\sigma\\):</p>
          <p>\\[ Q = 1{,}000 + 0.44(400) = 1{,}176 \\text{ boxes — the order quantity rises.} \\]</p>
          <p>More demand variability means more risk of costly over- or under-ordering even under the optimal policy, so <strong>expected profit falls</strong>.</p>`
      },
      {
        key: "B",
        text: "The optimal order quantity is unchanged, because mean demand is unchanged",
        correct: false,
        hint: "The order quantity formula is \\(Q = \\mu + z\\sigma\\) — it depends on \\(\\sigma\\) as well as \\(\\mu\\). A change in \\(\\sigma\\) changes \\(Q\\) even when \\(\\mu\\) and the critical ratio don't move."
      },
      {
        key: "C",
        text: "The optimal order quantity rises, and expected profit rises",
        correct: false,
        hint: "The order-quantity direction here is right. But think about whether more demand uncertainty should help or hurt expected profit when the ordering policy still has to guess at a single quantity in advance."
      },
      {
        key: "D",
        text: "The optimal order quantity falls, and expected profit falls",
        correct: false,
        hint: "The profit direction here is right, but check the order-quantity direction: since the critical ratio is above 50% (\\(z = 0.44 > 0\\)), a larger \\(\\sigma\\) pushes the optimal order further above the mean, not closer to it."
      }
    ]
  }),

  Object.freeze({
    id: 12,
    kicker: "Newsvendor with under- and overage costs given directly",
    title: "Seasonal jacket: ordering below the mean",
    context: `<p>A fashion retailer sells a seasonal jacket with \\(C_u = \\text{Rs. }20\\) and \\(C_o = \\text{Rs. }30\\). Demand is normal with mean 500 and standard deviation 100.</p>`,
    question: "Which statement is correct about the profit-maximizing order?",
    options: [
      {
        key: "A",
        text: "Order 500, the mean, giving a 50% in-stock probability",
        correct: false,
        hint: "Ordering the mean is only optimal when the critical ratio is exactly 0.5 — i.e. when \\(C_u = C_o\\). Here \\(C_u = 20 \\neq 30 = C_o\\), so recompute the critical ratio first."
      },
      {
        key: "B",
        text: "Order about 525, giving about a 60% in-stock probability",
        correct: false,
        hint: "This matches using \\(C_o/(C_u+C_o) = 30/50 = 0.6\\) as the critical ratio. It should be \\(C_u/(C_u+C_o)\\) — check which cost belongs in the numerator."
      },
      {
        key: "C",
        text: "Order about 475, giving about a 40% in-stock probability",
        correct: true,
        solution: `<p>Critical ratio \\(= C_u/(C_u+C_o) = 20/50 = 0.40\\). \\(\\Phi(-0.26) = 0.3974\\), \\(\\Phi(-0.25) = 0.4013\\); by the round-up rule (move to the value that meets or exceeds 0.40), \\(z = -0.25\\).</p>
          <p>\\[ Q = 500 + (-0.25)(100) = 475. \\]</p>
          <p>Since overage cost exceeds underage cost here (\\(C_o > C_u\\)), the optimal order sits <strong>below</strong> the mean, with in-stock probability \\(\\Phi(-0.25) \\approx 40\\%\\).</p>`
      },
      {
        key: "D",
        text: "Order about 475, giving about a 60% in-stock probability",
        correct: false,
        hint: "The order quantity here is right, but the in-stock probability at the optimum equals \\(\\Phi(z)\\), which equals the critical ratio itself (40%) — not its complement (60%, the stock-out probability)."
      }
    ]
  }),

  Object.freeze({
    id: 13,
    kicker: "Newsvendor with a discrete demand forecast",
    title: "Flu vaccine doses: ordering from a demand table",
    context: `<p>A clinic must order flu vaccine doses once before the season. A dose costs Rs. 600 and sells for Rs. 1,000. Doses unused by the end of the season expire and are worthless. The clinic's demand forecast is:</p>
      <table class="context-table">
        <thead><tr><th>Demand \\(Q\\)</th><th>100</th><th>150</th><th>200</th><th>250</th><th>300</th><th>350</th><th>400</th><th>450</th></tr></thead>
        <tbody><tr><td>\\(F(Q)\\)</td><td>0.05</td><td>0.18</td><td>0.36</td><td>0.55</td><td>0.74</td><td>0.88</td><td>0.96</td><td>1.00</td></tr></tbody>
      </table>`,
    question: "How many doses should the clinic order to maximize expected profit?",
    options: [
      {
        key: "A",
        text: "200",
        correct: false,
        hint: "This is the largest demand level with \\(F(Q)\\) still below the critical ratio. The newsvendor rule rounds up — pick the smallest \\(Q\\) with \\(F(Q)\\) at or above the critical ratio, not the largest one below it."
      },
      {
        key: "B",
        text: "250",
        correct: true,
        solution: `<p>\\(C_u = 1{,}000-600 = \\text{Rs. }400\\). Since expired doses are worthless, \\(C_o = 600 - 0 = \\text{Rs. }600\\).</p>
          <p>Critical ratio \\(= 400/(400+600) = 0.40\\).</p>
          <p>From the table, \\(F(200) = 0.36 < 0.40 \\leq F(250) = 0.55\\), so order the smallest \\(Q\\) with \\(F(Q)\\) at or above 0.40: <strong>250 doses</strong>.</p>`
      },
      {
        key: "C",
        text: "300",
        correct: false,
        hint: "This matches using \\(C_o/(C_u+C_o) = 600/1{,}000 = 0.60\\) as the critical ratio. It should be \\(C_u/(C_u+C_o)\\) — recheck which cost represents the loss from ordering too little versus too much."
      },
      {
        key: "D",
        text: "350",
        correct: false,
        hint: "Recompute the critical ratio \\(C_u/(C_u+C_o)\\) carefully, then find the smallest \\(Q\\) with \\(F(Q)\\) at least that ratio — this answer uses a threshold that's too high."
      }
    ]
  }),

  Object.freeze({
    id: 14,
    kicker: "Newsvendor with asymmetric cost derivation",
    title: "Hunting boots: setting the order before the season",
    context: `<p>Teddy Bower wants to sell waterproof hunting boots. It cannot sell them for more than \\$54, and the best supplier quote is \\$40 per boot. Excess inventory is sold off at a 50% discount (i.e. at \\$27) at the end of the season. At the \\$54 price, demand is normal with mean 400 boots and standard deviation 300.</p>`,
    question: "How many boots should Teddy Bower order to maximize expected profit?",
    options: [
      {
        key: "A",
        text: "410–420",
        correct: true,
        solution: `<p>\\(C_u = 54-40 = \\$14\\). Salvage value \\(= 0.5 \\times 54 = \\$27\\), so \\(C_o = 40-27 = \\$13\\).</p>
          <p>Critical ratio \\(= 14/27 = 0.519\\). \\(\\Phi(0.04) = 0.5160\\), \\(\\Phi(0.05) = 0.5199\\); by the round-up rule, \\(z = 0.05\\).</p>
          <p>\\[ Q = 400 + 0.05(300) = 415 \\text{ boots.} \\]</p>`
      },
      {
        key: "B",
        text: "395–405",
        correct: false,
        hint: "\\(C_u\\) (\\$14) and \\(C_o\\) (\\$13) are close but not exactly equal — compute the exact critical ratio (\\(14/27\\)) rather than rounding it to 0.5 and ordering the mean."
      },
      {
        key: "C",
        text: "380–390",
        correct: false,
        hint: "This matches using \\(C_o/(C_u+C_o) = 13/27\\) as the critical ratio instead of \\(C_u/(C_u+C_o)\\) — check which cost belongs in the numerator."
      },
      {
        key: "D",
        text: "530–535",
        correct: false,
        hint: "This order quantity is well above the mean. With \\(C_u\\) and \\(C_o\\) this close in size (\\$14 vs. \\$13), the critical ratio is close to 0.5, so the optimal order should sit only slightly above the mean, not far above it."
      }
    ]
  }),

  Object.freeze({
    id: 15,
    kicker: "Newsvendor with a partial-value salvage rate",
    title: "Bagel shop: how many to have on hand for the afternoon",
    context: `<p>CPG Bagels completes its last bake at 3 p.m. and closes at 8 p.m. A bagel costs \\$0.20 to make and sells fresh for \\$0.60. Unsold bagels are sold the next day as "day old" at \\$0.165 each, but only about two-thirds of them actually sell; the rest are thrown away. Demand for plain bagels from 3 p.m. to closing is normal with mean 54 and standard deviation 21.</p>`,
    question: "How many plain bagels should the store have on hand at 3 p.m. to maximize expected profit?",
    options: [
      {
        key: "A",
        text: "98–100",
        correct: false,
        hint: "This matches using a generic high-service heuristic (roughly \\(z \\approx 2\\)) instead of computing \\(z\\) from the actual critical ratio \\(C_u/(C_u+C_o)\\)."
      },
      {
        key: "B",
        text: "72–74",
        correct: true,
        solution: `<p>\\(C_u = 0.60-0.20 = \\$0.40\\). Only two-thirds of day-old bagels sell, so expected salvage value per leftover bagel \\(= \\tfrac{2}{3}(0.165) \\approx \\$0.11\\); \\(C_o = 0.20 - 0.11 = \\$0.09\\).</p>
          <p>Critical ratio \\(= 0.40/0.49 = 0.816\\). \\(\\Phi(0.90) = 0.8159\\), \\(\\Phi(0.91) = 0.8186\\); by the round-up rule, \\(z = 0.91\\).</p>
          <p>\\[ Q = 54 + 0.91(21) \\approx 73 \\text{ bagels.} \\]</p>`
      },
      {
        key: "C",
        text: "62–64",
        correct: false,
        hint: "This is close to the mean demand (54) plus only a small buffer. Recheck that you're using the full critical ratio \\(C_u/(C_u+C_o) = 0.40/0.49\\), not a partial or rounded version of it."
      },
      {
        key: "D",
        text: "54–56",
        correct: false,
        hint: "This is just the mean demand, corresponding to a critical ratio of 0.5. Here \\(C_u = \\$0.40\\) and \\(C_o = \\$0.09\\) are quite different, so the optimal order should sit well above the mean, not at it."
      }
    ]
  })
]);

// ---- Rendering + interaction state ----

let nvCurrentIndex = 0;
let nvResolved = []; // per-question: true once the correct option has been chosen

function nvEscapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nvRenderProgress() {
  const track = document.getElementById("nv-progress-track");
  if (!track) return;
  track.innerHTML = NV_CHALLENGE_QUESTIONS.map((q, i) => {
    const state = nvResolved[i] ? "done" : i === nvCurrentIndex ? "current" : "todo";
    return `<span class="om-progress-dot om-progress-${state}" aria-hidden="true"></span>`;
  }).join("");
  const label = document.getElementById("nv-progress-label");
  if (label) {
    const solvedCount = nvResolved.filter(Boolean).length;
    label.textContent = `Question ${nvCurrentIndex + 1} of ${NV_CHALLENGE_QUESTIONS.length} · ${solvedCount} solved`;
  }
}

function nvRenderQuestion() {
  const question = NV_CHALLENGE_QUESTIONS[nvCurrentIndex];
  const panel = document.getElementById("nv-question-panel");
  if (!panel || !question) return;

  panel.innerHTML = `
    <span class="game-kicker">${nvEscapeHTML(question.kicker)}</span>
    <h2 id="nv-question-title">${nvEscapeHTML(question.title)}</h2>
    <div class="om-context">${question.context}</div>
    <p class="om-question-prompt">${nvEscapeHTML(question.question)}</p>
    <div class="om-options" id="nv-options" role="radiogroup" aria-labelledby="nv-question-title"></div>
    <div class="om-feedback" id="nv-feedback" aria-live="polite"></div>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="nv-prev-btn">&larr; Previous question</button>
      <button type="button" class="game-primary-btn" id="nv-next-btn" hidden>Next question <span aria-hidden="true">&rarr;</span></button>
    </div>
  `;

  const optionsWrap = document.getElementById("nv-options");
  const alreadyResolved = nvResolved[nvCurrentIndex];

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "om-option";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.dataset.key = option.key;
    btn.innerHTML = `<span class="om-option-key">${option.key}</span><span class="om-option-text">${nvEscapeHTML(option.text)}</span>`;
    if (alreadyResolved && option.correct) {
      btn.classList.add("om-option-correct");
    }
    btn.addEventListener("click", () => nvHandleAnswer(question, option, btn));
    optionsWrap.appendChild(btn);
  });

  if (alreadyResolved) {
    const correctOption = question.options.find(o => o.correct);
    nvShowFeedback(correctOption, true);
  }

  document.getElementById("nv-prev-btn").disabled = nvCurrentIndex === 0;
  document.getElementById("nv-prev-btn").addEventListener("click", () => {
    if (nvCurrentIndex > 0) { nvCurrentIndex--; nvRenderQuestion(); nvRenderProgress(); }
  });

  const nextBtn = document.getElementById("nv-next-btn");
  if (alreadyResolved) nextBtn.hidden = false;
  nextBtn.addEventListener("click", nvGoToNext);

  nvRenderProgress();
  renderMath(panel);
}

function nvHandleAnswer(question, option, button) {
  const optionsWrap = document.getElementById("nv-options");
  optionsWrap.querySelectorAll(".om-option").forEach(el => el.setAttribute("aria-checked", "false"));
  button.setAttribute("aria-checked", "true");

  if (option.correct) {
    nvResolved[nvCurrentIndex] = true;
    optionsWrap.querySelectorAll(".om-option").forEach(el => {
      el.disabled = true;
      if (el.dataset.key === option.key) el.classList.add("om-option-correct");
    });
    document.getElementById("nv-next-btn").hidden = false;
  } else {
    button.classList.add("om-option-wrong");
    window.setTimeout(() => button.classList.remove("om-option-wrong"), 600);
  }

  nvShowFeedback(option, option.correct);
  nvRenderProgress();
}

function nvShowFeedback(option, isCorrect) {
  const feedback = document.getElementById("nv-feedback");
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

function nvGoToNext() {
  if (nvCurrentIndex < NV_CHALLENGE_QUESTIONS.length - 1) {
    nvCurrentIndex++;
    nvRenderQuestion();
  } else {
    nvRenderSummary();
  }
}

function nvRenderSummary() {
  const panel = document.getElementById("nv-question-panel");
  if (!panel) return;
  const solved = nvResolved.filter(Boolean).length;
  panel.innerHTML = `
    <span class="game-kicker">Challenge complete</span>
    <h2>You worked through all ${NV_CHALLENGE_QUESTIONS.length} problems</h2>
    <p>${solved} of ${NV_CHALLENGE_QUESTIONS.length} were answered correctly during this pass. Revisit any question from the progress trail above, or start over.</p>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="nv-review-btn">&larr; Review questions</button>
      <button type="button" class="game-primary-btn" id="nv-restart-btn">Start over</button>
    </div>
  `;
  document.getElementById("nv-review-btn").addEventListener("click", () => {
    nvCurrentIndex = 0; nvRenderQuestion();
  });
  document.getElementById("nv-restart-btn").addEventListener("click", () => {
    nvCurrentIndex = 0;
    nvResolved = NV_CHALLENGE_QUESTIONS.map(() => false);
    nvRenderQuestion();
  });
}

function initNVChallenge() {
  const panel = document.getElementById("nv-question-panel");
  if (!panel) return;
  nvResolved = NV_CHALLENGE_QUESTIONS.map(() => false);
  nvCurrentIndex = 0;
  nvRenderQuestion();
}
