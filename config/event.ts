// ─── EVENT CONFIGURATION ────────────────────────────────────────────────────
// Update this file to reflect confirmed details without touching every page.

export const EVENT = {
  name: "Startup Pitch Competition",
  year: "2026",
  fullName: "Startup Pitch Competition 2026",
  hostOrg: "Entrepreneurship Club",
  school: "SABIS International School – Sharjah",
  schoolShort: "SABIS Sharjah",

  // Schedule — update when confirmed
  week: "Week 9",
  dayOfWeek: "Thursday",
  timeProvisional: "4:00 PM",
  timeNote: "Provisional start time — subject to change",
  date: null as string | null,           // Set to e.g. "27 February 2026" when confirmed
  dateStatus: "To Be Confirmed",
  venue: null as string | null,          // Set to room/building when confirmed
  venueStatus: "SABIS Sharjah (location to be confirmed)",

  // Eligibility
  gradesMin: 7,
  gradesMax: 12,
  gradesLabel: "Grades 7–12",
  maxTeamSize: 3,
  minTeamSize: 1,

  // Contact — set when school-approved channels are available
  contactEmail: null as string | null,
  whatsappGroupNote:
    "A WhatsApp group may be set up once school approval is confirmed. Members can see each other's phone numbers; participation is optional.",

  // Registration
  registrationOpen: true,

  // Social — only add when accounts exist
  instagram: null as string | null,
  linkedin: null as string | null,
} as const;

// Award categories — all provisional until organizer confirms
export const AWARDS = [
  { title: "Best Overall Startup", description: "The most compelling end-to-end pitch and concept.", icon: "trophy" },
  { title: "Most Innovative Idea", description: "The idea that shows the greatest creative originality.", icon: "lightbulb" },
  { title: "Best Research", description: "Outstanding evidence of problem research and customer discovery.", icon: "search" },
  { title: "Best Product or Prototype", description: "The strongest tangible demonstration of progress.", icon: "wrench" },
  { title: "Best Pitch & Presentation", description: "The most confident, clear, and compelling delivery.", icon: "mic" },
  { title: "Participation Certificate", description: "Awarded to all registered participants who compete.", icon: "certificate" },
] as const;

// Judging criteria — proposed, subject to organizer confirmation
export const JUDGING_CRITERIA = [
  { label: "Idea & Originality", weight: 25, description: "Is this a compelling, original concept?" },
  { label: "Problem Understanding & Research", weight: 25, description: "Does the team understand the problem and who it affects?" },
  { label: "Feasibility & Progress", weight: 20, description: "Have they built, tested or researched something real?" },
  { label: "Pitch Clarity & Presentation", weight: 20, description: "Is the pitch clear, structured and compelling?" },
  { label: "Q&A Performance", weight: 10, description: "Can the team answer judge questions confidently?" },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Who can participate?",
    a: "All students currently enrolled in Grades 7 to 12 at SABIS Sharjah are eligible to register, regardless of year or section.",
  },
  {
    q: "Do I need to be a member of the Entrepreneurship Club?",
    a: "No. The competition is open to all eligible students at the school, whether or not you are a club member.",
  },
  {
    q: "Can I register without a business idea?",
    a: "Yes. You are welcome to register even if you don't have an idea yet. However, by competition day you must have developed a concept and have something tangible to demonstrate. We encourage you to start exploring ideas as early as possible.",
  },
  {
    q: "Do I need a working product?",
    a: "No. A complete, operational business is not required. However, you should bring something tangible — a website, a prototype, a mockup, research findings, a tested concept, or any other meaningful evidence that you've taken action on your idea.",
  },
  {
    q: "Can I use AI tools to help build my project?",
    a: "Yes. You are encouraged to use tools such as Claude, Replit, Base44, and other AI or no-code development platforms. However, you must understand your project, be able to explain what you built and how, disclose significant AI assistance during your pitch, and answer judge questions yourself.",
  },
  {
    q: "Is a PowerPoint presentation required?",
    a: "No. Slides are recommended but optional. The core of your pitch is your idea, your product or prototype, and your ability to communicate it clearly.",
  },
  {
    q: "Can I enter with friends?",
    a: `Yes. You can participate solo, or form a team of two or three students. Teams must register together using the registration form. Maximum team size is ${EVENT.maxTeamSize}.`,
  },
  {
    q: "What are the judges looking for?",
    a: "Judges will evaluate your idea and its originality, how well you understand the problem, what you've built or tested, how clearly you present, and how you handle their questions. Students are assessed on effort, reasoning and progress — not just technical sophistication.",
  },
  {
    q: "Will there be certificates?",
    a: "Participation certificates are a proposed category. Final award categories will be confirmed by the organizers and school administration.",
  },
  {
    q: "When and where is the event?",
    a: `The competition is scheduled for ${EVENT.dateStatus}. It is expected to take place on a ${EVENT.dayOfWeek} during Week ${EVENT.week.replace("Week ", "")} after school, with a provisional start of ${EVENT.timeProvisional}. Venue and exact date are subject to school confirmation.`,
  },
] as const;
