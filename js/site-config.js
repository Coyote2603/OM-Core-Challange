/*
 * Interactive Teaching Platform
 *
 * Change the values in this file to rebrand the platform. The pages and
 * rendering code read these settings automatically; no build step is needed.
 */

const SITE_CONFIG = Object.freeze({
  siteTitle: "Interactive Teaching Platform",
  shortTitle: "Teaching Platform",
  courseTitle: "OM Core Understanding Platform",
  courseSubtitle: "14 worked problems on process bottlenecks, batching trade-offs, queueing and pooling, and capacity planning under uncertainty — every wrong answer gets a targeted hint, every right answer gets the full worked solution.",
  instructorName: "Your Name",
  institutionName: "Indian Institute of Management Bangalore",
  footerText: "Built for students and shared for adaptation.",

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
    description: "14 worked problems on capacity, batching, queueing, and process analysis — every wrong answer gets a targeted hint.",
    href: "om-challenge.html",
    duration: "About 30 minutes"
  })
});
