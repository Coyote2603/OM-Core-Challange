/* The Inventory Management Challenge
 *
 * Worked multiple-choice problems on inventory management. Starts with
 * Newsvendor and EOQ questions; more topics can be added to this same
 * challenge later by appending to INVENTORY_CHALLENGE_QUESTIONS below —
 * no other file needs to change.
 *
 * Every wrong option carries its own targeted hint; the correct option
 * carries the full worked solution. A learner can try any option, get the
 * hint for that specific misconception, and try again until they find the
 * correct one — nothing is timed or auto-advanced.
 *
 * Shares its visual styling (css/om-challenge.css) and interaction pattern
 * with the OM Core Challenge, but is a fully independent question set and
 * page — this file never loads alongside js/om-challenge.js.
 */

const INVENTORY_CHALLENGE_QUESTIONS = Object.freeze([
  Object.freeze({
    id: 1,
    kicker: "Inventory turns & holding cost",
    title: "Hospital pharmacy — per-unit inventory cost",
    context: `<p>A hospital pharmacy has annual revenue of Rs. 150 crore. It prices drugs at a 25% markup on cost and holds average inventory worth Rs. 15 crore (at cost). Its annual inventory holding cost is 24% of inventory value.</p>
      <p>1 crore = 100 lakh.</p>`,
    question: "What is the per-unit inventory cost of a drug that costs the pharmacy Rs. 500?",
    options: [
      {
        key: "A",
        text: "Rs. 11.50–12.50",
        correct: false,
        hint: "This comes from treating the Rs. 150 crore revenue figure directly as the cost of goods sold. Revenue already includes the 25% markup — back the cost out first (COGS = Revenue ÷ 1.25) before computing inventory turns."
      },
      {
        key: "B",
        text: "Rs. 14.50–15.50",
        correct: true,
        solution: `<p>Revenue includes a 25% markup on cost, so cost of goods sold (COGS) = Revenue \\(\\div\\) 1.25 = 150 \\(\\div\\) 1.25 = Rs. 120 crore.</p>
          <p>Inventory turns = COGS \\(\\div\\) Average inventory = 120 \\(\\div\\) 15 = <strong>8 turns per year</strong>.</p>
          <p>The per-unit inventory holding cost, as a fraction of the unit's cost, is the annual holding cost rate divided by the number of turns: \\(24\\% \\div 8 = 3\\%\\).</p>
          <p>Applied to a drug costing Rs. 500: \\(0.03 \\times 500 = \\) <strong>Rs. 15</strong>.</p>`
      },
      {
        key: "C",
        text: "Rs. 1.50–2.00",
        correct: false,
        hint: "This looks like the 24% annual holding rate was entered as 2.4% (a decimal-point slip when converting the percentage). Keep 24% as 0.24, not 0.024, before dividing by the number of turns."
      },
      {
        key: "D",
        text: "Rs. 115–125",
        correct: false,
        hint: "This is what you get by applying the 24% annual holding rate straight to the Rs. 500 unit cost, as if the unit sat in inventory for a full year. Divide by the number of inventory turns per year (8) first — the holding cost applies only for the fraction of a year the unit actually spends in stock."
      }
    ]
  }),

  Object.freeze({
    id: 2,
    kicker: "Reasons for holding inventory",
    title: "Diwali gift boxes — why build inventory early?",
    context: `<p>A sweet shop's kitchen can make at most 400 Diwali gift boxes per day. Festival demand is far higher than that, so the shop starts producing boxes three weeks early and stores them.</p>`,
    question: "Which reason for holding inventory does this illustrate?",
    options: [
      {
        key: "A",
        text: "Cycle inventory",
        correct: false,
        hint: "Cycle inventory comes from ordering or producing in batches to spread a fixed setup or order cost over more units — it isn't about a rigid daily capacity falling short of a seasonal demand spike."
      },
      {
        key: "B",
        text: "Safety inventory",
        correct: false,
        hint: "Safety inventory buffers against uncertainty in demand or supply. Here, the shop faces a known, predictable gap between its fixed daily capacity (400 boxes) and festival demand — not unpredictable variation."
      },
      {
        key: "C",
        text: "Seasonal inventory",
        correct: true,
        solution: `<p>The shop's production capacity (400 boxes/day) is fixed and far below the demand it must meet around Diwali. Because capacity can't flex upward for the peak, the only way to meet that peak is to build inventory ahead of time, during the weeks when demand is below capacity.</p>
          <p>This is the definition of <strong>seasonal (or anticipation) inventory</strong>: inventory built in a low-demand period specifically to cover a predictable, capacity-exceeding peak later.</p>`
      },
      {
        key: "D",
        text: "Pipeline inventory",
        correct: false,
        hint: "Pipeline inventory is stock that is in transit or in process — for example, in trucks between a factory and a warehouse. It isn't inventory deliberately built up ahead of a known demand peak."
      }
    ]
  }),

  Object.freeze({
    id: 3,
    kicker: "EOQ with cost of capital",
    title: "Campus coffee store — optimal order size",
    context: `<p>Powered by Koffee (PBK) is a campus coffee store that uses 50 bags of whole bean coffee every month, with perfectly steady demand. PBK buys from a local supplier at $25 per bag plus an $85 fixed cost for every delivery, independent of order size. Storage costs $1 per bag per month, and PBK's cost of capital is 2% per month.</p>`,
    question: "What is the optimal order size?",
    options: [
      {
        key: "A",
        text: "52–55 bags",
        correct: false,
        hint: "This matches \\(\\sqrt{KD/h}\\) rather than the EOQ formula \\(\\sqrt{2KD/h}\\) — check that you kept the factor of 2 under the square root."
      },
      {
        key: "B",
        text: "74–77 bags",
        correct: true,
        solution: `<p>Holding cost per bag per month combines storage and the cost of capital tied up in the bag's value: \\(h = \\$1 + 0.02 \\times \\$25 = \\$1.50\\) per bag per month.</p>
          <p>\\[ Q^* = \\sqrt{\\dfrac{2KD}{h}} = \\sqrt{\\dfrac{2 \\times 85 \\times 50}{1.5}} = \\sqrt{5666.7} \\approx \\textbf{75.3 bags} \\]</p>`
      },
      {
        key: "C",
        text: "90–94 bags",
        correct: false,
        hint: "This comes from using h = $1 (storage only) and leaving out the cost of capital tied up in each bag's $25 value. Holding cost should include both components: storage plus 2% of the bag's price."
      },
      {
        key: "D",
        text: "128–132 bags",
        correct: false,
        hint: "This comes from using h = $0.50 (just the 2% cost of capital, 2% \\(\\times\\) $25) and leaving out the $1/bag/month storage cost. Both components belong in h."
      }
    ]
  }),

  Object.freeze({
    id: 4,
    kicker: "EOQ with a quantity discount",
    title: "Surgical gloves — accept a quantity discount?",
    context: `<p>A hospital uses 200 boxes of surgical gloves per week, at a constant rate. Each order costs Rs. 1,500 (paperwork, transport, receiving), whatever its size. A box costs Rs. 400, and the annual holding cost is 26% of the purchase price. Assume 52 weeks per year.</p>
      <p>The supplier offers a 3% discount on the price of every box if the hospital orders at least 1,000 boxes at a time.</p>`,
    question: "Including purchase cost, what should the hospital do?",
    options: [
      {
        key: "A",
        text: "Reject; total weekly cost rises by Rs. 170–180",
        correct: false,
        hint: "This compares only the ordering-plus-holding cost under the two policies (about Rs. 1,270 at 1,000 boxes versus Rs. 1,095 at the EOQ, a Rs. 175 rise) and ignores the far larger saving on the purchase price itself — 3% of a Rs. 400 box, on 200 boxes a week, is worth much more than that."
      },
      {
        key: "B",
        text: "Accept; total weekly cost falls by Rs. 2,350–2,450",
        correct: false,
        hint: "This looks like the 3% discount was applied to the entire weekly total cost (Rs. 81,095 \\(\\times\\) 3% \\(\\approx\\) Rs. 2,433) rather than only to the per-unit purchase price. The discount only lowers the price per box — ordering and holding costs still have to be recomputed separately at the new order size."
      },
      {
        key: "C",
        text: "Accept; total weekly cost falls by Rs. 1,090–1,100",
        correct: false,
        hint: "Rs. 1,095 is the ordering-plus-holding cost of the original EOQ policy, not the savings from switching. Recompute the full new total cost — purchase plus ordering plus holding, all at the 1,000-box order size — and compare that total to the original Rs. 81,095."
      },
      {
        key: "D",
        text: "Accept; total weekly cost falls by Rs. 2,200–2,250",
        correct: true,
        solution: `<p><strong>Without the discount:</strong> \\(h = 0.26 \\times 400 \\div 52 = \\) Rs. 2/box/week. \\(Q^* = \\sqrt{2 \\times 1500 \\times 200 / 2} = 547.7\\) boxes. Ordering + holding cost at \\(Q^*\\): \\(\\sqrt{2 \\times 1500 \\times 200 \\times 2} \\approx\\) Rs. 1,095/week. Total weekly cost = \\(200 \\times 400 + 1{,}095 = \\) <strong>Rs. 81,095</strong>.</p>
          <p><strong>With the discount</strong> (price = Rs. 388, forcing \\(Q = 1{,}000\\) to qualify): \\(h' = 0.26 \\times 388 \\div 52 = \\) Rs. 1.94/box/week.</p>
          <p>Ordering = \\(1500 \\times 200 / 1000 = \\) Rs. 300/week. Holding = \\(1000/2 \\times 1.94 = \\) Rs. 970/week. Purchase = \\(200 \\times 388 = \\) Rs. 77,600/week. Total = <strong>Rs. 78,870/week</strong>.</p>
          <p>Saving = \\(81{,}095 - 78{,}870 \\approx\\) <strong>Rs. 2,225/week</strong> — accept the discount.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 5,
    kicker: "Cost of deviating from the EOQ",
    title: "Surgical gloves — ordering twice the EOQ",
    context: `<p>Continuing with the same hospital and surgical gloves (200 boxes/week, Rs. 1,500 per order, Rs. 400/box, 26% annual holding cost, no discount this time). Without any discount, the purchasing clerk orders twice the EOQ each time to cut down on paperwork.</p>`,
    question: "By about how much does the hospital's weekly ordering plus holding cost rise compared with ordering the EOQ?",
    options: [
      {
        key: "A",
        text: "50%",
        correct: false,
        hint: "This comes from adding the percentage changes of the two cost components directly — holding cost roughly doubles (+100%) while ordering cost roughly halves (−50%) — rather than recombining them correctly in the total relevant-cost ratio."
      },
      {
        key: "B",
        text: "100%",
        correct: false,
        hint: "This only tracks the holding-cost component, which does roughly double when Q doubles. But ordering cost falls as Q rises, which cushions the total — you need both components together, not holding cost alone."
      },
      {
        key: "C",
        text: "25%",
        correct: true,
        solution: `<p>The ratio of total relevant cost at any order quantity \\(Q\\) to the cost at the EOQ \\(Q^*\\) is:</p>
          <p>\\[ \\dfrac{C(Q)}{C(Q^*)} = \\dfrac{1}{2}\\left(\\dfrac{Q}{Q^*} + \\dfrac{Q^*}{Q}\\right) \\]</p>
          <p>At \\(Q = 2Q^*\\): \\(\\dfrac{1}{2}(2 + 0.5) = 1.25\\) — a <strong>25% increase</strong> in ordering-plus-holding cost.</p>
          <p>This is a general property of the EOQ model: the total relevant cost curve is quite flat near its minimum, so even doubling the order size away from the EOQ raises cost by only a modest amount.</p>`
      },
      {
        key: "D",
        text: "0%, because fewer orders exactly offset the extra holding cost",
        correct: false,
        hint: "Ordering and holding costs are exactly balanced only at the EOQ itself — that's precisely why it's optimal. Away from the EOQ, holding cost (which rises linearly with Q) and ordering cost (which falls as 1/Q) no longer offset each other exactly, which is why total cost rises on either side of \\(Q^*\\)."
      }
    ]
  }),

  Object.freeze({
    id: 6,
    kicker: "EOQ scaling with demand",
    title: "Quadrupled demand under the EOQ model",
    context: `<p>A hospital's demand rate for a supply item quadruples, while the fixed order cost \\(K\\) and the holding cost \\(h\\) per unit stay the same.</p>`,
    question: "What happens to the EOQ and to the ordering-plus-holding cost per unit under the EOQ model?",
    options: [
      {
        key: "A",
        text: "The EOQ doubles, and ordering plus holding cost per unit falls by half",
        correct: true,
        solution: `<p>The EOQ formula is \\(Q^* = \\sqrt{2KR/h}\\), where \\(R\\) is the demand rate — so \\(Q^*\\) scales with \\(\\sqrt{R}\\). If \\(R\\) quadruples, \\(Q^*\\) scales by \\(\\sqrt{4} = 2\\): <strong>the EOQ doubles</strong>.</p>
          <p>The ordering-plus-holding cost per unit of demand is \\(\\sqrt{2Kh/R}\\), which scales with \\(1/\\sqrt{R}\\). When \\(R\\) quadruples, this cost per unit scales by \\(1/\\sqrt{4} = 0.5\\): <strong>it falls by half</strong>.</p>
          <p>This is the EOQ model's economies of scale: as the volume handled grows, the fixed cost of ordering and holding gets spread over far more units, so cost per unit falls even though the batch size (and total cost) rises.</p>`
      },
      {
        key: "B",
        text: "The EOQ quadruples, and ordering plus holding cost per unit is unchanged",
        correct: false,
        hint: "This treats \\(Q^*\\) as scaling linearly with demand. But the EOQ formula has demand under a square root (\\(Q^* = \\sqrt{2KR/h}\\)), so quadrupling demand only doubles \\(Q^*\\), not quadruples it."
      },
      {
        key: "C",
        text: "The EOQ doubles, and ordering plus holding cost per unit is unchanged",
        correct: false,
        hint: "The EOQ scaling here (doubling) is right, but cost per unit doesn't stay flat — the whole point of ordering in EOQ-sized batches is that per-unit ordering and holding cost falls as the volume handled grows. Work out how the per-unit cost formula \\(\\sqrt{2Kh/R}\\) moves as R quadruples."
      },
      {
        key: "D",
        text: "The EOQ is unchanged, because K and h are unchanged",
        correct: false,
        hint: "K and h are only two of the three ingredients in the EOQ formula — the demand rate R is also inside it (\\(Q^* = \\sqrt{2KR/h}\\)). Holding K and h fixed doesn't mean the EOQ is fixed if R changes too."
      }
    ]
  }),

  Object.freeze({
    id: 7,
    kicker: "Newsvendor — optimal order quantity",
    title: "Diwali gift boxes — optimal order quantity",
    context: `<p>A sweet shop must order Diwali gift boxes from its supplier once, well before the festival. Each box costs Rs. 500 and sells for Rs. 800. Boxes left after Diwali are sold to a bulk buyer for Rs. 350 each. Festival demand is normally distributed with mean 1,000 boxes and standard deviation 300 boxes.</p>
      <p>As a reminder: the underage cost \\(C_u\\) is the margin lost on each unit of demand that couldn't be met; the overage cost \\(C_o\\) is the loss on each unit left unsold. The optimal order quantity is \\(Q = \\mu + z\\sigma\\), where \\(z\\) is the value whose cumulative probability \\(\\Phi(z)\\) equals the critical ratio \\(C_u / (C_u + C_o)\\). When the critical ratio falls between two table entries, round up to the larger \\(z\\).</p>`,
    question: "How many boxes should the shop order to maximize expected profit?",
    options: [
      {
        key: "A",
        text: "865–875",
        correct: false,
        hint: "This is \\(1000 - 0.44 \\times 300\\) — the right z-value but the wrong sign. Since the critical ratio here is above 0.5, the optimal order sits above the mean, not below it."
      },
      {
        key: "B",
        text: "1,125–1,140",
        correct: true,
        solution: `<p>\\(C_u = 800 - 500 = \\) Rs. 300 (margin lost per unit of unmet demand). \\(C_o = 500 - 350 = \\) Rs. 150 (loss per unit left over).</p>
          <p>Critical ratio = \\(\\dfrac{C_u}{C_u+C_o} = \\dfrac{300}{450} = 0.667\\).</p>
          <p>From the standard normal table, \\(\\Phi(0.43) = 0.6664\\) and \\(\\Phi(0.44) = 0.6700\\). Since 0.667 falls between these, the round-up rule picks \\(z = 0.44\\).</p>
          <p>\\(Q = \\mu + z\\sigma = 1000 + 0.44 \\times 300 = \\) <strong>1,132 boxes</strong>.</p>`
      },
      {
        key: "C",
        text: "995–1,005",
        correct: false,
        hint: "This is just the mean demand, which skips the newsvendor trade-off entirely. Because \\(C_u \\ne C_o\\) here, the optimal order isn't the average demand — it's shifted by \\(z\\sigma\\) toward whichever side is cheaper to err on."
      },
      {
        key: "D",
        text: "1,295–1,305",
        correct: false,
        hint: "This would follow from a critical ratio much higher than 0.667. Recompute the critical ratio as \\(C_u/(C_u+C_o) = 300/450\\), not some other combination of the two costs, then look up the \\(z\\) that matches that specific probability."
      }
    ]
  }),

  Object.freeze({
    id: 8,
    kicker: "Newsvendor — expected sales",
    title: "Diwali gift boxes — expected sales",
    context: `<p>Same sweet shop as before: boxes cost Rs. 500, sell for Rs. 800, and leftovers go to a bulk buyer for Rs. 350. Demand is normal with mean 1,000 and standard deviation 300.</p>
      <p>The shop orders 1,132 boxes, so \\(z = 0.44\\) and the standard normal <em>inventory function</em> \\(I(0.44) = 0.6569\\). (\\(I(z)\\) gives the expected number of standard deviations of leftover stock, as a fraction of \\(\\sigma\\), at that z.)</p>`,
    question: "What are the shop's expected sales?",
    options: [
      {
        key: "A",
        text: "995–1,005 boxes",
        correct: false,
        hint: "Expected sales can't simply equal expected demand (the mean). Sales are capped by whatever quantity is actually ordered, so expected sales are always at most the mean demand — work it out as order quantity minus expected leftover."
      },
      {
        key: "B",
        text: "1,130–1,135 boxes",
        correct: false,
        hint: "This is the order quantity itself, which assumes every box ordered gets sold. Some demand draws fall short of 1,132, leaving boxes unsold — subtract the expected leftover from the order quantity to get expected sales."
      },
      {
        key: "C",
        text: "865–875 boxes",
        correct: false,
        hint: "Expected sales isn't a quantile of the demand distribution like \\(\\mu - z\\sigma\\) — it equals the order quantity minus expected leftover units, \\(Q - \\sigma \\cdot I(z)\\). Recompute leftover as \\(\\sigma \\cdot I(z) = 300 \\times 0.6569 \\approx 197\\), then subtract that from \\(Q = 1{,}132\\)."
      },
      {
        key: "D",
        text: "930–940 boxes",
        correct: true,
        solution: `<p>Expected leftover = \\(\\sigma \\times I(z) = 300 \\times 0.6569 \\approx 197.1\\) boxes.</p>
          <p>Expected sales = \\(Q - \\text{expected leftover} = 1132 - 197.1 \\approx\\) <strong>935 boxes</strong>.</p>
          <p>Note that this is below the mean demand (1,000), even though the order quantity (1,132) is above it — because sales can never exceed demand on any given draw, expected sales are always at most the mean demand, whatever quantity is ordered.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 9,
    kicker: "Newsvendor — expected profit",
    title: "Diwali gift boxes — expected profit",
    context: `<p>Continuing the same sweet shop: boxes cost Rs. 500, sell for Rs. 800, leftovers go for Rs. 350. The shop orders \\(Q = 1{,}132\\) boxes, giving expected sales \\(\\approx 934.9\\) and expected leftover \\(\\approx 197.1\\) boxes.</p>`,
    question: "What is the shop's expected profit?",
    options: [
      {
        key: "A",
        text: "Rs. 2.48–2.53 lakh",
        correct: true,
        solution: `<p>Expected profit = \\(C_u \\times E[\\text{sales}] - C_o \\times E[\\text{leftover}]\\)</p>
          <p>\\[ = 300 \\times 934.9 - 150 \\times 197.1 \\approx \\text{Rs. } 2{,}50{,}919 \\approx \\textbf{Rs. 2.51 lakh} \\]</p>`
      },
      {
        key: "B",
        text: "Rs. 2.78–2.83 lakh",
        correct: false,
        hint: "This is \\(C_u \\times \\text{sales} = 300 \\times 934.9 \\approx\\) Rs. 2.80 lakh on its own — it's missing the \\(C_o \\times \\text{leftover}\\) penalty for the boxes that don't sell. Unsold boxes still cost the shop money (net of their salvage value); that term has to be subtracted."
      },
      {
        key: "C",
        text: "Rs. 2.98–3.02 lakh",
        correct: false,
        hint: "This is \\(C_u \\times \\mu = 300 \\times 1{,}000 = \\) Rs. 3.00 lakh — the margin on the mean demand, not on this order's actual expected sales and leftovers. The shop ordered 1,132 boxes, not 1,000, and some of those boxes go unsold at a loss; both of those facts need to enter the calculation."
      },
      {
        key: "D",
        text: "Rs. 3.38–3.42 lakh",
        correct: false,
        hint: "This is \\(C_u \\times Q = 300 \\times 1{,}132 \\approx\\) Rs. 3.40 lakh, which assumes every ordered box sells at full margin with nothing left over. Use expected sales (934.9), not the order quantity itself, and don't forget the leftover penalty."
      }
    ]
  }),

  Object.freeze({
    id: 10,
    kicker: "Newsvendor — in-stock probability",
    title: "Diwali gift boxes — in-stock probability",
    context: `<p>Same sweet shop, ordering its optimal quantity of \\(Q = 1{,}132\\) boxes against demand with mean 1,000 and standard deviation 300 (\\(z = 0.44\\), critical ratio = 0.667).</p>`,
    question: "At the optimal order of 1,132 boxes, what is the probability that the shop does not run out of boxes (in-stock probability)?",
    options: [
      {
        key: "A",
        text: "33%–34%",
        correct: false,
        hint: "This is the stockout probability (\\(1 - 0.667\\)), not the in-stock probability. The in-stock probability is \\(\\Phi(z)\\) itself, not its complement."
      },
      {
        key: "B",
        text: "50%",
        correct: false,
        hint: "A 50% in-stock probability would follow only from ordering exactly the mean (\\(z = 0\\)). Here the shop ordered above the mean (\\(z = 0.44 > 0\\)), so the in-stock probability must be above 50%."
      },
      {
        key: "C",
        text: "66%–67%",
        correct: true,
        solution: `<p>At the optimal order, the in-stock probability equals \\(\\Phi(z)\\), which by construction equals the critical ratio: \\(\\Phi(0.44) \\approx 0.667\\), i.e. <strong>about 66–67%</strong>.</p>
          <p>This is a general newsvendor result, not a coincidence of this problem: at the profit-maximizing order quantity, the in-stock probability always equals \\(C_u / (C_u + C_o)\\).</p>`
      },
      {
        key: "D",
        text: "95%",
        correct: false,
        hint: "95% is a common default service-level target in some safety-stock problems, but it isn't implied by this specific critical ratio. The in-stock probability here is set by this problem's own \\(C_u\\) and \\(C_o\\), not by a generic service-level convention."
      }
    ]
  }),

  Object.freeze({
    id: 11,
    kicker: "Newsvendor — salvage value and Q*",
    title: "Diwali gift boxes — a better salvage deal",
    context: `<p>Same sweet shop as before (boxes cost Rs. 500, sell for Rs. 800, demand mean 1,000, standard deviation 300) — except now a corporate client agrees to buy all leftover boxes at Rs. 450 each instead of Rs. 350.</p>`,
    question: "What is the new optimal order quantity?",
    options: [
      {
        key: "A",
        text: "1,130–1,135 boxes",
        correct: false,
        hint: "This is the old optimal order quantity from before the salvage value changed. The higher salvage value lowers \\(C_o\\), which changes the critical ratio — recompute it with the new salvage price before reading \\(z\\) off the table."
      },
      {
        key: "B",
        text: "1,315–1,325 boxes",
        correct: true,
        solution: `<p>New \\(C_o = 500 - 450 = \\) Rs. 50 (the loss per leftover box is smaller now that leftovers are worth more).</p>
          <p>Critical ratio = \\(\\dfrac{C_u}{C_u+C_o} = \\dfrac{300}{350} = 0.857\\).</p>
          <p>\\(\\Phi(1.06) = 0.8554\\) and \\(\\Phi(1.07) = 0.8577\\); since 0.857 falls between them, round up to \\(z = 1.07\\).</p>
          <p>\\(Q = 1000 + 1.07 \\times 300 = \\) <strong>1,321 boxes</strong>.</p>`
      },
      {
        key: "C",
        text: "920–930 boxes",
        correct: false,
        hint: "This moves the order quantity in the wrong direction. A higher salvage value makes overstocking cheaper (it lowers \\(C_o\\)), which raises the critical ratio and therefore raises the order quantity — it shouldn't lower it."
      },
      {
        key: "D",
        text: "1,450–1,460 boxes",
        correct: false,
        hint: "This overstates how far the order quantity moves. Recompute \\(C_o = 500 - 450 = 50\\), then the critical ratio \\(C_u/(C_u+C_o) = 300/350 = 0.857\\), and look up the specific \\(z\\) for that value rather than a larger one."
      }
    ]
  }),

  Object.freeze({
    id: 12,
    kicker: "Newsvendor — comparative statics",
    title: "Diwali gift boxes — what raises the order quantity?",
    context: `<p>Starting again from the original sweet shop: boxes cost Rs. 500, sell for Rs. 800, leftovers go for Rs. 350, demand mean 1,000, standard deviation 300.</p>`,
    question: "Which single change would make the shop order more boxes?",
    options: [
      {
        key: "A",
        text: "The supplier raises the price of a box",
        correct: false,
        hint: "A higher cost lowers \\(C_u\\) (the margin lost per unit short, since \\(C_u = \\text{sell} - \\text{cost}\\)) and raises \\(C_o\\) (the loss per unit left over, since \\(C_o = \\text{cost} - \\text{salvage}\\)). Both of those push the critical ratio, and the order quantity, down — not up."
      },
      {
        key: "B",
        text: "The shop lowers its selling price",
        correct: false,
        hint: "A lower selling price lowers \\(C_u = \\text{sell} - \\text{cost}\\) directly, which lowers the critical ratio and therefore the order quantity — the opposite of the effect being asked about."
      },
      {
        key: "C",
        text: "The bulk buyer stops taking leftover boxes",
        correct: false,
        hint: "If leftovers become worthless, salvage value drops to zero, which raises \\(C_o = \\text{cost} - \\text{salvage}\\) to its maximum. A higher \\(C_o\\) lowers the critical ratio and the order quantity — the opposite direction from what's being asked."
      },
      {
        key: "D",
        text: "The bulk buyer raises the price it pays for leftover boxes",
        correct: true,
        solution: `<p>A higher salvage value directly lowers \\(C_o = \\text{cost} - \\text{salvage}\\), since leftover boxes are now worth more. A lower \\(C_o\\) raises the critical ratio \\(C_u/(C_u+C_o)\\), which raises \\(z\\) and therefore raises \\(Q = \\mu + z\\sigma\\).</p>
          <p>This is the only one of the four changes that <strong>raises</strong> the critical ratio: the other three either lower \\(C_u\\) or raise \\(C_o\\), both of which push the order quantity down.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 13,
    kicker: "Newsvendor — demand uncertainty",
    title: "Diwali gift boxes — demand becomes less predictable",
    context: `<p>Starting again from the original sweet shop (boxes cost Rs. 500, sell for Rs. 800, leftovers go for Rs. 350, demand mean 1,000). A new competitor makes demand harder to predict: the mean stays at 1,000 boxes, but the standard deviation rises from 300 to 400. Prices and costs are unchanged.</p>`,
    question: "What happens to the optimal order quantity and expected profit?",
    options: [
      {
        key: "A",
        text: "The optimal order quantity rises, and expected profit falls",
        correct: true,
        solution: `<p>The critical ratio depends only on \\(C_u\\) and \\(C_o\\), which are unchanged, so it's still 0.667 and \\(z\\) is still 0.44 — a positive value. Since \\(Q = \\mu + z\\sigma\\) and \\(z > 0\\), a larger \\(\\sigma\\) makes the \\(z\\sigma\\) term bigger: \\(Q = 1000 + 0.44 \\times 400 = 1{,}176\\), which is <strong>higher</strong> than the original 1,132.</p>
          <p>More demand uncertainty means more variation in both leftovers and lost sales around the optimal order, which makes the outcome worse on average even though the order quantity has adjusted optimally — so expected profit <strong>falls</strong>.</p>`
      },
      {
        key: "B",
        text: "The optimal order quantity is unchanged, because mean demand is unchanged",
        correct: false,
        hint: "The order quantity formula is \\(Q = \\mu + z\\sigma\\) — it depends on the standard deviation \\(\\sigma\\) as well as the mean. Since \\(z \\ne 0\\) here, a change in \\(\\sigma\\) does change \\(Q\\), even with \\(\\mu\\) held fixed."
      },
      {
        key: "C",
        text: "The optimal order quantity rises, and expected profit rises",
        correct: false,
        hint: "The order quantity direction is right, but more demand variability — holding the mean and the cost structure fixed — never helps the newsvendor on average. Think about why both more leftovers and more lost sales become more likely as \\(\\sigma\\) rises, even after re-optimizing \\(Q\\)."
      },
      {
        key: "D",
        text: "The optimal order quantity falls, and expected profit falls",
        correct: false,
        hint: "The profit direction is right, but the order-quantity direction isn't. Since \\(C_u > C_o\\) here, the critical ratio is above 0.5 and \\(z\\) is positive — more uncertainty (a larger \\(\\sigma\\)) makes that positive \\(z\\sigma\\) term larger, which raises \\(Q\\), not lowers it."
      }
    ]
  }),

  Object.freeze({
    id: 14,
    kicker: "Newsvendor — overage cost exceeds underage cost",
    title: "Seasonal jacket — overage costs more than underage",
    context: `<p>A fashion retailer sells a seasonal jacket with \\(C_u = \\) Rs. 20 and \\(C_o = \\) Rs. 30. Demand is normal with mean 500 and standard deviation 100.</p>`,
    question: "Which statement is correct about the profit-maximizing order?",
    options: [
      {
        key: "A",
        text: "Order 500, the mean, giving a 50% in-stock probability",
        correct: false,
        hint: "Ordering the mean (a 50% in-stock probability) is only optimal when \\(C_u = C_o\\). Here \\(C_o\\) (Rs. 30) is larger than \\(C_u\\) (Rs. 20), so overstocking is more costly than understocking — that should pull the order below the mean, not leave it at the mean."
      },
      {
        key: "B",
        text: "Order about 525, giving about a 60% in-stock probability",
        correct: false,
        hint: "This has the right size of adjustment but the wrong direction. Since \\(C_o > C_u\\), the critical ratio is below 0.5 and \\(z\\) is negative — the optimal order should move below the mean, not above it."
      },
      {
        key: "C",
        text: "Order about 475, giving about a 40% in-stock probability",
        correct: true,
        solution: `<p>Critical ratio = \\(\\dfrac{C_u}{C_u+C_o} = \\dfrac{20}{50} = 0.40\\). Since \\(C_o > C_u\\), the ratio is below 0.5, so the optimal order sits below the mean.</p>
          <p>\\(\\Phi(-0.26) = 0.3974\\) and \\(\\Phi(-0.25) = 0.4013\\); since 0.40 falls between them, the round-up rule picks the smallest \\(z\\) whose cumulative probability is at least 0.40: \\(z = -0.25\\).</p>
          <p>\\(Q = 500 + (-0.25)(100) = \\) <strong>475</strong>. The resulting in-stock probability is \\(\\Phi(z) = \\Phi(-0.25) \\approx 0.40\\), i.e. <strong>about 40%</strong>.</p>`
      },
      {
        key: "D",
        text: "Order about 475, giving about a 60% in-stock probability",
        correct: false,
        hint: "The order quantity (475) is right, but the in-stock probability isn't — it should use the same \\(z = -0.25\\) that produced that order quantity. \\(\\Phi(-0.25) \\approx 0.40\\), not \\(\\Phi(0.25) \\approx 0.60\\); don't flip the sign partway through."
      }
    ]
  }),

  Object.freeze({
    id: 15,
    kicker: "Newsvendor — discrete demand distribution",
    title: "Flu vaccine doses — discrete demand forecast",
    context: `<p>A clinic must order flu vaccine doses once before the season. A dose costs Rs. 600 and sells for Rs. 1,000. Doses unused by the end of the season expire and are worthless. The clinic's demand forecast, given as a cumulative distribution \\(F(Q)\\), is:</p>
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
        hint: "\\(F(200) = 0.36\\) is still below the critical ratio of 0.40 — this is the largest Q that falls short of the target, not the smallest Q that reaches it. The newsvendor rule needs the first Q where \\(F(Q)\\) meets or exceeds the critical ratio."
      },
      {
        key: "B",
        text: "250",
        correct: true,
        solution: `<p>\\(C_u = 1000 - 600 = \\) Rs. 400 (profit missed per unit of unmet demand). \\(C_o = 600 - 0 = \\) Rs. 600 (the full cost is lost on every unused dose, since expired doses are worthless).</p>
          <p>Critical ratio = \\(\\dfrac{C_u}{C_u+C_o} = \\dfrac{400}{1000} = 0.40\\).</p>
          <p>From the table, \\(F(200) = 0.36 < 0.40\\) and \\(F(250) = 0.55 \\ge 0.40\\). The newsvendor rule orders the <strong>smallest</strong> \\(Q\\) whose cumulative probability reaches the critical ratio: <strong>250 doses</strong>.</p>`
      },
      {
        key: "C",
        text: "300",
        correct: false,
        hint: "This matches using the critical ratio backward: \\(C_o/(C_u+C_o) = 600/1000 = 0.60\\) instead of \\(C_u/(C_u+C_o) = 400/1000 = 0.40\\). Double check which cost belongs in the numerator — it's the underage cost, \\(C_u\\)."
      },
      {
        key: "D",
        text: "350",
        correct: false,
        hint: "This skips past the first demand level where \\(F(Q)\\) actually reaches the critical ratio (0.40 is first met at \\(Q = 250\\)). The newsvendor rule uses the smallest Q with \\(F(Q) \\ge\\) critical ratio — a larger Q isn't a safety margin, it lowers expected profit."
      }
    ]
  }),

  Object.freeze({
    id: 16,
    kicker: "Newsvendor — Teddy Bower boots",
    title: "Teddy Bower — waterproof hunting boots",
    context: `<p>Teddy Bower wants to sell waterproof hunting boots. It cannot sell them for more than $54, and the best supplier quote is $40 per boot. Excess inventory will be sold off at a 50% discount at the end of the season. At the $54 price, demand is normal with mean 400 boots and standard deviation 300.</p>`,
    question: "How many boots should Teddy Bower order to maximize expected profit?",
    options: [
      {
        key: "A",
        text: "410–420",
        correct: true,
        solution: `<p>\\(C_u = 54 - 40 = \\) $14. Salvage value = 50% of the selling price = \\(0.5 \\times 54 = \\) $27, so \\(C_o = 40 - 27 = \\) $13.</p>
          <p>Critical ratio = \\(\\dfrac{14}{27} = 0.519\\). \\(\\Phi(0.04) = 0.5160\\) and \\(\\Phi(0.05) = 0.5199\\); since 0.519 falls between them, round up to \\(z = 0.05\\).</p>
          <p>\\(Q = 400 + 0.05 \\times 300 = \\) <strong>415 boots</strong>.</p>`
      },
      {
        key: "B",
        text: "395–405",
        correct: false,
        hint: "This rounds the critical ratio (0.519) down to exactly 0.5 and orders the mean — but 0.519 is still a little above 0.5, which calls for a small positive \\(z\\), not \\(z = 0\\)."
      },
      {
        key: "C",
        text: "380–390",
        correct: false,
        hint: "This has the right size of adjustment but the wrong sign: it uses \\(z = -0.05\\) instead of \\(+0.05\\). Since \\(C_u\\) ($14) is slightly larger than \\(C_o\\) ($13), the critical ratio is just above 0.5, which calls for ordering slightly above the mean, not below it."
      },
      {
        key: "D",
        text: "530–535",
        correct: false,
        hint: "This reuses \\(z = 0.44\\) from a different newsvendor problem's critical ratio (0.667). Recompute \\(C_u\\), \\(C_o\\), and the critical ratio from this scenario's own numbers — the 50%-discount salvage value here gives a critical ratio much closer to 0.5."
      }
    ]
  }),

  Object.freeze({
    id: 17,
    kicker: "Newsvendor — perishable goods with partial salvage",
    title: "CPG Bagels — day-old resale",
    context: `<p>CPG Bagels completes its last bake at 3 p.m. and closes at 8 p.m. A bagel costs $0.20 to make and sells fresh for $0.60. Unsold bagels are sold the next day as "day old" at $0.165 each, but only about two-thirds of them sell; the rest are thrown away. Demand for plain bagels from 3 p.m. to closing is normal with mean 54 and standard deviation 21.</p>`,
    question: "How many plain bagels should the store have at 3 p.m. to maximize expected profit?",
    options: [
      {
        key: "A",
        text: "98–100",
        correct: false,
        hint: "This overshoots by several standard deviations. The critical ratio here (about 0.816) calls for \\(z \\approx 0.91\\) — about one standard deviation above the mean (\\(54 + 0.91 \\times 21 \\approx 73\\)), not something far larger. Recompute \\(C_u\\), \\(C_o\\), and the critical ratio directly from the given costs and the day-old resale terms."
      },
      {
        key: "B",
        text: "72–74",
        correct: true,
        solution: `<p>\\(C_u = 0.60 - 0.20 = \\) $0.40.</p>
          <p>Only about two-thirds of day-old bagels actually sell, each at $0.165, so the expected salvage value per leftover bagel is \\(\\frac{2}{3} \\times 0.165 \\approx\\) $0.11. \\(C_o = 0.20 - 0.11 = \\) $0.09.</p>
          <p>Critical ratio = \\(\\dfrac{0.40}{0.49} \\approx 0.816\\). \\(\\Phi(0.90) = 0.8159\\) and \\(\\Phi(0.91) = 0.8186\\); since 0.816 falls between them, round up to \\(z = 0.91\\).</p>
          <p>\\(Q = 54 + 0.91 \\times 21 \\approx\\) <strong>73 bagels</strong>.</p>`
      },
      {
        key: "C",
        text: "62–64",
        correct: false,
        hint: "This matches treating leftover bagels as a complete loss — ignoring the day-old resale channel entirely (\\(C_o = \\) full cost, $0.20) — which gives a critical ratio of \\(0.40/0.60 = 0.667\\) instead of the correct 0.816. Even partial, discounted salvage revenue still reduces \\(C_o\\) and should be included."
      },
      {
        key: "D",
        text: "54–56",
        correct: false,
        hint: "This orders the mean demand directly, skipping the critical-ratio adjustment entirely. Since a lost sale ($0.40) costs more than a wasted bagel ($0.09), \\(C_u > C_o\\) — the optimal order should sit above the mean, not at it."
      }
    ]
  })
]);

// ---- Rendering + interaction state ----

let invCurrentIndex = 0;
let invResolved = []; // per-question: true once the correct option has been chosen
let invQuestionViewedAt = 0; // timestamp when the current question was rendered, for timing analytics

function invEscapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function invRenderProgress() {
  const track = document.getElementById("inv-progress-track");
  if (!track) return;
  track.innerHTML = INVENTORY_CHALLENGE_QUESTIONS.map((q, i) => {
    const state = invResolved[i] ? "done" : i === invCurrentIndex ? "current" : "todo";
    return `<span class="om-progress-dot om-progress-${state}" aria-hidden="true"></span>`;
  }).join("");
  const label = document.getElementById("inv-progress-label");
  if (label) {
    const solvedCount = invResolved.filter(Boolean).length;
    label.textContent = `Question ${invCurrentIndex + 1} of ${INVENTORY_CHALLENGE_QUESTIONS.length} · ${solvedCount} solved`;
  }
}

function invRenderEmptyState() {
  const panel = document.getElementById("inv-question-panel");
  if (!panel) return;
  panel.innerHTML = `
    <span class="game-kicker">Coming soon</span>
    <h2>Questions are being added</h2>
    <p>This challenge is being set up. Check back shortly, or try the OM Core Challenge or the Newsvendor Challenge in the meantime.</p>
  `;
  const track = document.getElementById("inv-progress-track");
  if (track) track.innerHTML = "";
  const label = document.getElementById("inv-progress-label");
  if (label) label.textContent = "No questions yet";
}

function invRenderQuestion() {
  const question = INVENTORY_CHALLENGE_QUESTIONS[invCurrentIndex];
  const panel = document.getElementById("inv-question-panel");
  if (!panel || !question) return;

  invQuestionViewedAt = Date.now();
  if (typeof window.logChallengeEvent === "function") {
    window.logChallengeEvent({
      challenge: "inventory-management",
      question_id: question.id,
      event_type: "view"
    });
  }

  panel.innerHTML = `
    <span class="game-kicker">${invEscapeHTML(question.kicker)}</span>
    <h2 id="inv-question-title">${invEscapeHTML(question.title)}</h2>
    <div class="om-context">${question.context}</div>
    <p class="om-question-prompt">${invEscapeHTML(question.question)}</p>
    <div class="om-options" id="inv-options" role="radiogroup" aria-labelledby="inv-question-title"></div>
    <div class="om-feedback" id="inv-feedback" aria-live="polite"></div>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="inv-prev-btn">&larr; Previous question</button>
      <button type="button" class="game-primary-btn" id="inv-next-btn" hidden>Next question <span aria-hidden="true">&rarr;</span></button>
    </div>
  `;

  const optionsWrap = document.getElementById("inv-options");
  const alreadyResolved = invResolved[invCurrentIndex];

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "om-option";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.dataset.key = option.key;
    btn.innerHTML = `<span class="om-option-key">${option.key}</span><span class="om-option-text">${invEscapeHTML(option.text)}</span>`;
    if (alreadyResolved && option.correct) {
      btn.classList.add("om-option-correct");
    }
    btn.addEventListener("click", () => invHandleAnswer(question, option, btn));
    optionsWrap.appendChild(btn);
  });

  if (alreadyResolved) {
    const correctOption = question.options.find(o => o.correct);
    invShowFeedback(correctOption, true);
  }

  document.getElementById("inv-prev-btn").disabled = invCurrentIndex === 0;
  document.getElementById("inv-prev-btn").addEventListener("click", () => {
    if (invCurrentIndex > 0) { invCurrentIndex--; invRenderQuestion(); invRenderProgress(); }
  });

  const nextBtn = document.getElementById("inv-next-btn");
  if (alreadyResolved) nextBtn.hidden = false;
  nextBtn.addEventListener("click", invGoToNext);

  invRenderProgress();
  renderMath(panel);
}

function invHandleAnswer(question, option, button) {
  const optionsWrap = document.getElementById("inv-options");
  optionsWrap.querySelectorAll(".om-option").forEach(el => el.setAttribute("aria-checked", "false"));
  button.setAttribute("aria-checked", "true");

  if (typeof window.logChallengeEvent === "function") {
    window.logChallengeEvent({
      challenge: "inventory-management",
      question_id: question.id,
      event_type: "answer_attempt",
      option_key: option.key,
      correct: option.correct,
      time_spent_ms: Date.now() - invQuestionViewedAt
    });
  }

  if (option.correct) {
    invResolved[invCurrentIndex] = true;
    optionsWrap.querySelectorAll(".om-option").forEach(el => {
      el.disabled = true;
      if (el.dataset.key === option.key) el.classList.add("om-option-correct");
    });
    document.getElementById("inv-next-btn").hidden = false;
  } else {
    button.classList.add("om-option-wrong");
    window.setTimeout(() => button.classList.remove("om-option-wrong"), 600);
  }

  invShowFeedback(option, option.correct);
  invRenderProgress();
}

function invShowFeedback(option, isCorrect) {
  const feedback = document.getElementById("inv-feedback");
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

function invGoToNext() {
  if (invCurrentIndex < INVENTORY_CHALLENGE_QUESTIONS.length - 1) {
    invCurrentIndex++;
    invRenderQuestion();
  } else {
    invRenderSummary();
  }
}

function invRenderSummary() {
  const panel = document.getElementById("inv-question-panel");
  if (!panel) return;
  const solved = invResolved.filter(Boolean).length;
  panel.innerHTML = `
    <span class="game-kicker">Challenge complete</span>
    <h2>You worked through all ${INVENTORY_CHALLENGE_QUESTIONS.length} problems</h2>
    <p>${solved} of ${INVENTORY_CHALLENGE_QUESTIONS.length} were answered correctly during this pass. Revisit any question from the progress trail above, or start over.</p>
    <div class="om-nav-row">
      <button type="button" class="game-secondary-btn" id="inv-review-btn">&larr; Review questions</button>
      <button type="button" class="game-primary-btn" id="inv-restart-btn">Start over</button>
    </div>
  `;
  document.getElementById("inv-review-btn").addEventListener("click", () => {
    invCurrentIndex = 0; invRenderQuestion();
  });
  document.getElementById("inv-restart-btn").addEventListener("click", () => {
    invCurrentIndex = 0;
    invResolved = INVENTORY_CHALLENGE_QUESTIONS.map(() => false);
    invRenderQuestion();
  });
}

function initInventoryChallenge() {
  const panel = document.getElementById("inv-question-panel");
  if (!panel) return;

  if (INVENTORY_CHALLENGE_QUESTIONS.length === 0) {
    invRenderEmptyState();
    return;
  }

  invResolved = INVENTORY_CHALLENGE_QUESTIONS.map(() => false);

  const params = new URLSearchParams(window.location.search);
  const requestedId = parseInt(params.get("q"), 10);
  const foundIndex = INVENTORY_CHALLENGE_QUESTIONS.findIndex(q => q.id === requestedId);
  invCurrentIndex = foundIndex >= 0 ? foundIndex : 0;

  invRenderQuestion();
}
