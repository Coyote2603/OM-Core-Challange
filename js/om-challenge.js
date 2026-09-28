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
  }),

  Object.freeze({
    id: 7,
    kicker: "Utilization across resource pools",
    title: "IT help desk: two support tiers, three request types",
    context: `<p>A corporate IT help desk handles three types of requests: password reset, software support, and hardware support.</p>
      <p>Password-reset requests require 4 minutes of Level-1 support. Software-support requests require 6 minutes of Level-1 support and 10 minutes of Level-2 support. Hardware-support requests require 5 minutes of Level-1 support and 15 minutes of Level-2 support.</p>
      <p>The help desk has 3 Level-1 analysts and 2 Level-2 analysts. During the morning peak, demand is 12 password-reset requests, 8 software-support requests, and 4 hardware-support requests per hour.</p>`,
    question: "What is the implied utilization of Level-1 support?",
    options: [
      {
        key: "A",
        text: "45.0–54.9%",
        correct: false,
        hint: "Check whether workload from all three request types has been included."
      },
      {
        key: "B",
        text: "60.0–69.9%",
        correct: true,
        solution: `<p>Level-1 workload is \\(12(4) + 8(6) + 4(5) = 48 + 48 + 20 = 116\\) minutes/hour.</p>
          <p>Available Level-1 capacity is \\(3(60) = 180\\) minutes/hour.</p>
          <p>Therefore, implied utilization is \\(\\dfrac{116}{180} = 0.644 = 64.4\\%\\).</p>
          <p>Implied utilization compares the workload generated by demand with the available capacity of the corresponding resource pool.</p>`
      },
      {
        key: "C",
        text: "70.0–79.9%",
        correct: false,
        hint: "Check that you divided Level-1 workload, rather than Level-2 workload, by Level-1 capacity."
      },
      {
        key: "D",
        text: "80.0–89.9%",
        correct: false,
        hint: "Recheck both the workload and the available Level-1 capacity; the resulting utilization should be below 70%."
      }
    ]
  }),

  Object.freeze({
    id: 8,
    kicker: "Bottleneck across resource pools",
    title: "IT help desk: identifying the bottleneck tier",
    context: `<p>A corporate IT help desk handles three types of requests: password reset, software support, and hardware support.</p>
      <p>Password-reset requests require 4 minutes of Level-1 support. Software-support requests require 6 minutes of Level-1 support and 10 minutes of Level-2 support. Hardware-support requests require 5 minutes of Level-1 support and 15 minutes of Level-2 support.</p>
      <p>The help desk has 3 Level-1 analysts and 2 Level-2 analysts. During the morning peak, demand is 12 password-reset requests, 8 software-support requests, and 4 hardware-support requests per hour.</p>`,
    question: "Which resource is the bottleneck?",
    options: [
      {
        key: "A",
        text: "Level-1 support",
        correct: false,
        hint: "A resource handling every request is not automatically the bottleneck; compare implied utilizations."
      },
      {
        key: "B",
        text: "Both resources have the same implied utilization",
        correct: false,
        hint: "The two resources have different workloads relative to their available capacities."
      },
      {
        key: "C",
        text: "Cannot be determined from the information given",
        correct: false,
        hint: "The demand rates, processing times, and staffing levels are sufficient to determine the bottleneck."
      },
      {
        key: "D",
        text: "Level-2 support",
        correct: true,
        solution: `<p>Level-2 workload is \\(8(10) + 4(15) = 80 + 60 = 140\\) minutes/hour.</p>
          <p>Available Level-2 capacity is \\(2(60) = 120\\) minutes/hour.</p>
          <p>Implied utilization is \\(\\dfrac{140}{120} = 1.167 = 116.7\\%\\).</p>
          <p>Since Level-2 has the highest implied utilization, <strong>Level-2 support is the bottleneck</strong>.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 9,
    kicker: "Utilization with pooled servers",
    title: "Financial call center: four pooled representatives",
    context: `<p>A financial-services call center receives one call every 2.5 minutes on average. Each call takes an average of 8 minutes to handle. Four customer-service representatives work as one pooled team.</p>`,
    question: "What is the average utilization of each representative?",
    options: [
      {
        key: "A",
        text: "80.0–84.9%",
        correct: true,
        solution: `<p>The interarrival time is \\(a = 2.5\\) minutes/call, the processing time is \\(p = 8\\) minutes, and there are \\(m = 4\\) representatives.</p>
          <p>\\[ u = \\dfrac{p}{am} = \\dfrac{8}{2.5(4)} = 0.80 \\]</p>
          <p>The four representatives jointly provide the available service capacity, so the average utilization of each representative is <strong>80%</strong>.</p>`
      },
      {
        key: "B",
        text: "65.0–69.9%",
        correct: false,
        hint: "Recheck the relationship between processing time, interarrival time, and the number of representatives; the result should be higher than 70%."
      },
      {
        key: "C",
        text: "70.0–74.9%",
        correct: false,
        hint: "Recalculate 8/[2.5(4)]; the result should be closer to 80% than to 70%."
      },
      {
        key: "D",
        text: "90.0–94.9%",
        correct: false,
        hint: "Check that the workload is divided across all four representatives; the utilization should be well below 90%."
      }
    ]
  }),

  Object.freeze({
    id: 10,
    kicker: "Utilization before pooling",
    title: "Bank counters: two separate queues",
    context: `<p>A bank operates two separate service counters in adjacent halls. Each hall receives one customer every 5 minutes on average. Service takes 4 minutes per customer. Each hall currently has one employee and its own waiting line.</p>
      <p>Management is considering combining the two waiting lines into one common queue served by both employees.</p>`,
    question: "Before pooling, what is the utilization of each employee?",
    options: [
      {
        key: "A",
        text: "60.0–69.9%",
        correct: false,
        hint: "Recheck the relationship between the 4-minute processing time and the 5-minute interarrival time; utilization is substantially above 60%."
      },
      {
        key: "B",
        text: "70.0–74.9%",
        correct: false,
        hint: "Recompute 4/5 carefully; the result is above 75%."
      },
      {
        key: "C",
        text: "80.0–84.9%",
        correct: true,
        solution: `<p>For each independent counter, \\(u = \\dfrac{4}{5} = 0.80\\).</p>
          <p>Each counter receives one customer every 5 minutes and requires 4 minutes of service per customer. Thus, each employee is busy for 4 out of every 5 minutes on average — an average utilization of <strong>80%</strong>.</p>`
      },
      {
        key: "D",
        text: "90.0–94.9%",
        correct: false,
        hint: "The processing time is shorter than the interarrival time, so utilization should remain below 90%."
      }
    ]
  }),

  Object.freeze({
    id: 11,
    kicker: "Utilization after pooling",
    title: "Bank counters: after combining the queues",
    context: `<p>A bank operates two separate service counters in adjacent halls. Each hall receives one customer every 5 minutes on average. Service takes 4 minutes per customer. Each hall currently has one employee and its own waiting line.</p>
      <p>Management is considering combining the two waiting lines into one common queue served by both employees.</p>`,
    question: "After pooling, what happens to the average utilization of each employee?",
    options: [
      {
        key: "A",
        text: "It falls to approximately 60%",
        correct: false,
        hint: "Pooling does not remove demand or add unused capacity; both original demand streams still have to be served."
      },
      {
        key: "B",
        text: "It remains approximately 80%",
        correct: true,
        solution: `<p>Pooling combines the demand streams. The pooled system receives one customer every \\(\\dfrac{5}{2} = 2.5\\) minutes, and there are now two servers, so</p>
          <p>\\[ u = \\dfrac{4}{2.5(2)} = 0.80 \\]</p>
          <p>Both total demand and total capacity are combined in the same proportion, so pooling does not change average utilization — it <strong>remains approximately 80%</strong>.</p>`
      },
      {
        key: "C",
        text: "It rises to approximately 100%",
        correct: false,
        hint: "Although the combined arrival rate doubles, there are also two employees serving the common queue."
      },
      {
        key: "D",
        text: "It cannot be determined without knowing the waiting time",
        correct: false,
        hint: "Waiting time is not required to calculate utilization when arrival rate, processing time, and number of servers are known."
      }
    ]
  }),

  Object.freeze({
    id: 12,
    kicker: "Benefit of pooling",
    title: "Bank counters: why pooling helps",
    context: `<p>A bank operates two separate service counters in adjacent halls. Each hall receives one customer every 5 minutes on average. Service takes 4 minutes per customer. Each hall currently has one employee and its own waiting line.</p>
      <p>Management is considering combining the two waiting lines into one common queue served by both employees.</p>`,
    question: "What is the main operational benefit of pooling in this setting?",
    options: [
      {
        key: "A",
        text: "Total labor capacity increases",
        correct: false,
        hint: "The same two employees remain in the process, so nominal labor capacity does not increase."
      },
      {
        key: "B",
        text: "Processing time per customer decreases",
        correct: false,
        hint: "Pooling changes how customers are assigned to servers; it does not reduce the activity time required for each customer."
      },
      {
        key: "C",
        text: "Customer demand decreases",
        correct: false,
        hint: "Combining the queues does not change the underlying customer arrival rate."
      },
      {
        key: "D",
        text: "Waiting time can decrease because available server capacity is shared across customers",
        correct: true,
        solution: `<p>Pooling enables the next available employee to serve the next waiting customer. This reduces the chance that one employee is idle while customers are waiting for another employee.</p>
          <p>Pooling can therefore <strong>reduce waiting</strong> even though processing time, total demand, total labor capacity, and average utilization remain unchanged.</p>`
      }
    ]
  }),

  Object.freeze({
    id: 13,
    kicker: "Utilization after adding capacity",
    title: "Hospital appointment desk: adding a fourth employee",
    context: `<p>A hospital appointment desk receives 18 calls per hour. Each call requires 8 minutes of employee time. There are currently 3 employees serving one common queue.</p>
      <p>Management is considering adding one employee.</p>`,
    question: "Approximately how does average utilization per employee change after the additional employee is added?",
    options: [
      {
        key: "A",
        text: "From 70.0–79.9% to 45.0–54.9%",
        correct: false,
        hint: "Compute the current workload first; 144 minutes of work relative to 180 available minutes gives utilization above 75%."
      },
      {
        key: "B",
        text: "From 90.0–99.9% to 70.0–79.9%",
        correct: false,
        hint: "Current workload is 144 minutes per hour, which is below the 180 minutes of capacity provided by three employees."
      },
      {
        key: "C",
        text: "From 80.0–84.9% to 60.0–64.9%",
        correct: true,
        solution: `<p>Total workload is \\(18(8) = 144\\) minutes/hour.</p>
          <p>With three employees, \\(u_{\\text{current}} = \\dfrac{144}{3(60)} = 0.80 = 80\\%\\).</p>
          <p>After adding a fourth employee, \\(u_{\\text{new}} = \\dfrac{144}{4(60)} = 0.60 = 60\\%\\).</p>
          <p>Demand and processing time remain unchanged, while available capacity increases from 180 to 240 minutes per hour. Therefore, utilization falls from approximately <strong>80% to 60%</strong>.</p>`
      },
      {
        key: "D",
        text: "From above 100% to 80.0–89.9%",
        correct: false,
        hint: "Current workload does not exceed the capacity of the existing three employees, so current implied utilization is below 100%."
      }
    ]
  }),

  Object.freeze({
    id: 14,
    kicker: "Pooling across product lines",
    title: "Customer support: pooling two product lines",
    context: `<p>A customer-support center has four agents. Currently, two agents handle Product A and two agents handle Product B. Both products require the same skills and have the same average processing time.</p>
      <p>At a particular time of day, Product A frequently has customers waiting, while one of the Product B agents is often idle. Management is considering allowing all four agents to handle either product from one common waiting line.</p>`,
    question: "Which statement best describes the likely operational effect?",
    options: [
      {
        key: "A",
        text: "Pooling can reduce waiting by balancing work across agents even if total demand and total capacity remain unchanged.",
        correct: true,
        solution: `<p>Pooling does not add employees or reduce the processing requirement — its benefit comes from sharing available server capacity across both customer groups.</p>
          <p>With separate queues, one Product B agent may be idle while Product A customers wait. With a common queue, that available agent can serve the next eligible customer, which can <strong>reduce waiting and improve load balancing</strong> even though total demand and total capacity remain unchanged.</p>`
      },
      {
        key: "B",
        text: "Pooling necessarily reduces the processing time per customer.",
        correct: false,
        hint: "Pooling changes the assignment of customers to agents, not the processing requirement of each customer."
      },
      {
        key: "C",
        text: "Pooling increases utilization because total capacity decreases.",
        correct: false,
        hint: "The number of agents remains four, so total nominal capacity does not decrease."
      },
      {
        key: "D",
        text: "Pooling is useful only when Product A and Product B have identical arrival rates.",
        correct: false,
        hint: "Pooling can help even when the two customer groups have different arrival rates; identical arrival rates are not required."
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
