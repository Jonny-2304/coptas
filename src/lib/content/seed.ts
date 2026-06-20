import type { PublishedPaper, TeamMember } from "@/lib/sanity/types";

type SeedTeamMember = TeamMember & { localPhoto?: string };

export const seedTeamMembers: SeedTeamMember[] = [
  {
    _id: "seed-garry-marling",
    name: "Garry Marling",
    role: "CEO and Professor",
    localPhoto: "/images/team/garry-marling.jpeg",
    areasOfInterest: [
      "Risk Management",
      "Workplace Health and Safety",
      "Culture",
      "Systems Safety Engineering",
      "Systems Engineering",
      "Security",
    ],
    displayOrder: 1,
  },
  {
    _id: "seed-kevin-band",
    name: "Kevin Band",
    role: "Adjunct Professor",
    displayOrder: 2,
  },
  {
    _id: "seed-rudy-tadros",
    name: "Rudy Tadros",
    role: "Adjunct Professor",
    displayOrder: 3,
  },
  {
    _id: "seed-naomi-kemp",
    name: "Naomi Kemp",
    role: "Adjunct Professor",
    displayOrder: 4,
  },
  {
    _id: "seed-richard-coleman",
    name: "Richard Coleman",
    role: "Adjunct Professor",
    displayOrder: 5,
  },
  {
    _id: "seed-alan-girle",
    name: "Alan Girle",
    role: "Adjunct Professor",
    displayOrder: 6,
  },
  {
    _id: "seed-peter-aspinall",
    name: "Peter Aspinall",
    role: "Adjunct Professor",
    displayOrder: 7,
  },
  {
    _id: "seed-david-whitefield",
    name: "David Whitefield",
    role: "Adjunct Professor",
    displayOrder: 8,
  },
  {
    _id: "seed-peter-brace",
    name: "Peter Brace",
    role: "Adjunct Professor",
    displayOrder: 9,
  },
  {
    _id: "seed-justin-simkin",
    name: "Justin Simkin",
    role: "Adjunct Professor",
    displayOrder: 10,
  },
  {
    _id: "seed-mark-urbas",
    name: "Mark Urbas",
    role: "Adjunct Professor",
    displayOrder: 11,
  },
  {
    _id: "seed-anthony-beasley",
    name: "Anthony Beasley",
    role: "Adjunct Professor",
    displayOrder: 12,
  },
];

export const seedPublishedPapers: PublishedPaper[] = [
  {
    _id: "seed-paper-2009-ndm9",
    title:
      "Operator Decision Making Before Starting and While Doing an Activity/Task: Development and Evaluation of Integrated Front-end Priming and Heuristic Risk Management Tools for Operators",
    authors: ["G. J. Marling", "T. Horberry"],
    year: 2009,
    journal:
      "NDM9 Naturalistic Decision Making and Computers: Proceedings of the 9th Bi-annual International Conference on Naturalistic Decision Making, London, UK",
  },
  {
    _id: "seed-paper-2014-risk",
    title: "Words Have Meaning….. Especially in Risk Management",
    authors: ["G. J. Marling", "T. Horberry", "J. Harris"],
    year: 2014,
    journal:
      "RISK2014 Conference, Institution of Engineers Australia, Brisbane, Australia, 28–30 May 2014",
  },
  {
    _id: "seed-paper-2014-tunnelling",
    title:
      "Management of Health and Safety in Tunnelling – Application of Australian Coal Mining Knowledge",
    authors: [
      "P. Kirsch",
      "A. Kirsch",
      "G. J. Marling",
      "J. Harris",
      "A. Calderon",
      "S. Meng",
      "D. Sprott",
    ],
    year: 2014,
    journal:
      "15th Australasian Tunnelling Conference 2014, Sydney, Australia, 17–19 September 2014",
  },
  {
    _id: "seed-paper-2011-ergonomics",
    title: "Operator Decision Making in Mining and the Minerals Industry",
    authors: ["T. Horberry", "T. Cooke", "X. Li", "G. Marling"],
    year: 2011,
    journal: "Ergonomics Open, 4(S2 – M3), pp. 103–111",
  },
  {
    _id: "seed-paper-2015-phd",
    title: "Optimising risk management team processes",
    authors: ["G. Marling"],
    year: 2015,
    journal:
      "Doctoral dissertation, University of Queensland, Brisbane, Australia",
  },
  {
    _id: "seed-paper-2020-riskometric-1",
    title:
      "Development and reliability of an assessment tool to measure competency in the seven elements of the risk management process: Part One—The RISKometric",
    authors: ["G. Marling", "T. Horberry", "J. Harris"],
    year: 2020,
    journal: "Safety",
    abstract:
      "Introduces the RISKometric tool and its conceptual basis.",
  },
  {
    _id: "seed-paper-2020-edeep",
    title:
      "Second-hand mobile plant, equipment and machinery: Finding the invisible hazards before they become visible catastrophes – EDEEP a potential solution",
    authors: ["G. Marling", "T. Brennan"],
    year: 2020,
    journal: "Journal of Health & Safety Research & Practice",
  },
  {
    _id: "seed-paper-2022-riskometric-2",
    title:
      "Development and reliability review… Part Two—Evaluation of the individual results from the RISKometric tool",
    authors: ["G. Marling", "T. Horberry", "J. Harris"],
    year: 2022,
    journal: "Safety",
    abstract:
      "Tests reliability by comparing individual ratings with performance in risk scenarios.",
  },
  {
    _id: "seed-paper-2024-riskometric-3",
    title:
      "Development and reliability review… Part Three—Evaluation of the group results from the RISK Tool",
    authors: ["G. Marling", "T. Horberry", "J. Harris"],
    year: 2024,
    journal: "Safety, 10(1), 29",
  },
];
