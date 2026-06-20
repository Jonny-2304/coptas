# CoPTaS Website

A modern brochure-style website for the **College of People, Technology and Systems (CoPTaS)** — an independent, practitioner-focused, not-for-profit organisation.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Sanity CMS.

## Features

- Responsive, mobile-first design with academic aesthetic
- Server Components with GROQ queries to Sanity CMS
- SEO: Metadata API, Open Graph, Twitter cards, sitemap, robots.txt
- Accessible semantic HTML, skip links, ARIA labels, and colour contrast
- Team profiles with expandable accordion sections
- Searchable, filterable published papers list
- Optional dark mode via `prefers-color-scheme`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and add your Sanity credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (e.g. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version date |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO |

The site runs without Sanity configured — it falls back to default settings and empty team/paper lists.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Run Sanity Studio

```bash
npm run sanity
```

Create a **Site Settings** document (singleton), **Team Members**, and **Published Papers** in the studio.

## Project Structure

```
src/
├── app/                  # App Router pages and SEO routes
├── components/
│   ├── home/             # Hero and home sections
│   ├── layout/           # Header, Footer
│   ├── papers/           # PaperCard, PaperList
│   ├── team/             # TeamCard, TeamAccordion
│   └── ui/               # CtaButton, SearchInput, SectionContainer
└── lib/
    ├── content/          # Static home page content
    └── sanity/           # Client, queries, types, fetch helpers
sanity/
└── schemaTypes/          # Team Member, Published Paper, Site Settings
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, purpose, aim, objectives, vision, about, CTA |
| `/team` | Team member grid with accordion details |
| `/papers` | Searchable, filterable publications list |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run sanity` | Start Sanity Studio |
| `npm run sanity:deploy` | Deploy Sanity Studio |

## Sanity Schemas

- **Team Member** — name, role, photo, areas of interest, biography, display order
- **Published Paper** — title, authors, year, journal, external link, abstract, featured
- **Site Settings** — site name, tagline, contact email, footer text, logo

## License

Private — CoPTaS.
