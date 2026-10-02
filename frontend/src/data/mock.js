// Mock content extracted from the Hearten Transitional Living brochure.
// This is FRONTEND-ONLY mock data. Backend can be wired later.

export const brand = {
  name: "Hearten",
  suffix: "Transitional Living Inc.",
  tagline: "Helping Young Adults Build Stable, Independent Futures",
  pillars: ["Safe Housing", "Life Skills", "Mentorship", "Support"],
  scriptLine: "Your Future Starts Here.",
};

export const contact = {
  phone: "(281) 826-1422",
  phoneHref: "tel:+12818261422",
  email: "info@heartenhome.org",
  website: "heartenhome.org",
  websiteHref: "https://heartenhome.org",
  address: "Spring, Texas 77379",
};

export const mission =
  "At Hearten Transitional Living, we empower individuals to achieve independence, stability, and purpose by providing supportive housing and life-enhancing services in a compassionate environment where growth, healing, and long-term stability can flourish.";

export const vision =
  "To be a beacon of hope where every young adult in transition is empowered to heal, grow, and achieve long-term stability within a compassionate community.";

export const services = [
  {
    icon: "Home",
    title: "Housing",
    blurb: "A safe, welcoming place to call home while you build your future.",
    points: [
      "Fully furnished shared housing",
      "Safe, structured environment",
      "Security monitoring for added safety.",
      "Utilities & Wi-Fi included.",
    ],
  },
  {
    icon: "BookOpen",
    title: "Life Skills",
    blurb: "Practical, everyday skills for confident independent living.",
    points: [
      "Budgeting",
      "Self-Advocacy",
      "Time management",
      "Communication",
      "Conflict resolution",
      "Household Management",
    ],
  },
  {
    icon: "Briefcase",
    title: "Career Development",
    blurb: "Guidance and tools to launch education and employment goals.",
    points: [
      "Resume assistance",
      "Employment readiness",
      "Educational planning",
      "Goal setting",
    ],
  },
  {
    icon: "HeartHandshake",
    title: "Wellness",
    blurb: "Whole-person support through mentoring and connected resources.",
    points: [
      "Mentoring",
      "Community resources",
      "Mental health referrals",
      "Case management support",
    ],
  },
];

export const whoWeServe = {
  headline: "Young adults ages 18\u201324 who are:",
  points: [
    "Aging out of foster care",
    "Experiencing housing instability",
    "Preparing for independent living",
  ],
};

export const whyChoose = [
  "Safe Home Environment",
  "Financial Literacy Training",
  "Nurse-Owned Organization",
  "Mentorship",
  "Individualized Life Skills Coaching",
  "Community Connections",
  "Employment & Education Support",
  "Long-Term Stability Focus",
];

export const values = [
  { icon: "Heart", label: "Kindness" },
  { icon: "Handshake", label: "Respect" },
  { icon: "Sparkles", label: "Empowerment" },
  { icon: "Star", label: "Opportunity" },
  { icon: "Home", label: "Stability" },
];

export const donationTiers = [
  { amount: 25, label: "Welcome Kit", desc: "Essentials for a resident's first week home." },
  { amount: 75, label: "Life Skills Session", desc: "Fund a coaching session in budgeting or wellness." },
  { amount: 150, label: "A Week of Housing", desc: "Support safe, furnished housing for one resident." },
  { amount: 500, label: "Future Builder", desc: "Sponsor a month of full wraparound support." },
];
