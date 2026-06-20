export const homeContent = {
  vision: {
    title: "Our Vision",
    items: [
      {
        lead: "We think independently",
        text: "We question assumptions, test ideas rigorously, and speak plainly, even when doing so is uncomfortable or inconvenient.",
      },
      {
        lead: "We connect theory to real work",
        text: "We ground our research and learning in how people, technology, and systems actually behave in practice, not just how they are designed or described.",
      },
      {
        lead: "We work as peers",
        text: "We contribute collegially, respect experience in all its forms, and share knowledge generously to strengthen collective understanding.",
      },
      {
        lead: "We aim for practical effect",
        text: "We focus on insights that improve judgement, decision-making, and system performance where it matters most.",
      },
      {
        lead: "We act as stewards",
        text: "We take responsibility for the integrity, sustainability, and independence of the College, recognising that credibility is earned through conduct over time.",
      },
    ],
  },
  aim: {
    title: "Our Aim",
    description:
      "To advance understanding and practice at the intersection of people, technology, and complex systems, in ways that improve judgment, decision-making, and system performance in high-consequence environments.",
  },
  purpose: {
    title: "Our Purpose",
    description:
      "The purpose of CoPTaS as a not-for-profit organisation is to support independent, applied scholarship that examines how people, technologies, and systems interact in real work. Through research, learning, and thought leadership, the College seeks to influence practice beyond academia while remaining intellectually independent and practitioner-focused.",
  },
  objectives: {
    title: "Our Objectives",
    items: [
      "To bring together experienced practitioners and researchers to explore complex socio-technical systems through collaboration and inquiry;",
      "To produce and disseminate applied research that is grounded in real-world practice and addresses practical problems;",
      "To translate insight into learning, guidance, and discussion that informs better professional judgement and safer system design;",
      "To maintain intellectual independence by operating without institutional or commercial constraint, and",
      "To steward the College in a way that preserves its integrity, credibility, and long-term sustainability.",
    ],
  },
  cta: {
    title: "Explore our work",
    description:
      "Meet the people behind CoPTaS and browse our published research.",
  },
} as const;

export type HomeContent = typeof homeContent;
