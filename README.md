# Developer Portfolio — Next.js + Sanity

A fully dynamic, section-wise developer portfolio. Every piece of content (hero, about, skills,
projects, experience, education, services, testimonials, socials, contact) is fetched live from
Sanity — nothing is hardcoded. Built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion
for scroll reveals, hover interactions, and a typewriter hero.

> **Note on the reference site:** the link you shared (`dev-portfoliosite.netlify.app`) is a
> client-rendered React app, so its actual text/content isn't visible to fetch/scrape — only an
> empty HTML shell loads before JavaScript runs. I wasn't able to copy its exact content, so I
> built a complete, professional dev-portfolio **structure** (same type: hero → about → skills →
> projects → experience → education → services → testimonials → contact) with an original visual
> design, and wired every section to Sanity so you can fill in your own real content.

## What's inside

```
portfolio-project/
├── web/        → Next.js frontend (the public website)
└── studio/     → Sanity Studio (the CMS you use to edit content)
```

## 1. Create your Sanity project

1. Go to https://www.sanity.io/manage and create a free account/project (or run
   `npx sanity@latest init` inside `studio/` and follow the prompts — this can also create the
   project for you).
2. Note your **Project ID** and dataset name (usually `production`).

## 2. Set up the Studio (CMS)

```bash
cd studio
npm install
```

Edit `sanity.config.ts` and `sanity.cli.ts` — replace `YOUR_PROJECT_ID` with your real project ID.

```bash
npm run dev
```

Studio opens at `http://localhost:3333`. You'll see these content types in the sidebar:

- **Site Settings** — logo text, resume PDF, nav tab labels, SEO meta
- **Hero** — name, rotating role titles, tagline, profile photo, stats
- **About** — bio (rich text), photo, highlights
- **Skill** — one document per skill (name, category, proficiency %)
- **Project** — title, images, description, tech stack, live/GitHub links, featured flag
- **Experience** — role, company, dates, bullet achievements
- **Education** — degree, institution, years
- **Service** — what you offer (optional section)
- **Testimonial** — quotes from clients/colleagues
- **Social Link** — GitHub, LinkedIn, Twitter, etc.
- **Contact** — heading, email, phone, location, optional form endpoint

Fill in at least Site Settings, Hero, About, a few Skills and Projects to see the site come alive.

When ready, publish the studio so you (or others) can edit content from anywhere:

```bash
npm run deploy
```

## 3. Set up the website (frontend)

```bash
cd web
npm install
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Run it:

```bash
npm run dev
```

Open `http://localhost:3000` — every section pulls straight from your Sanity data. Add/edit
content in the Studio and refresh (data revalidates every 60s, or instantly in dev).

## 4. Deploy

- **Frontend:** push `web/` to GitHub and import into [Vercel](https://vercel.com) (add the same
  three env vars in Vercel's dashboard).
- **Studio:** already deployable via `npm run deploy` (hosted free on Sanity's own domain), or
  deploy `studio/` anywhere static.

## Design notes

- Editor-tab style navigation (`about.tsx`, `projects.tsx` …) — a signature element tying the nav
  to a developer's real environment (code editor tabs), not a generic numbered menu.
- Terminal/ink color palette (`#0A0C10` background, amber `#FFB627` + teal `#35D0BA` accents),
  Space Grotesk display type, JetBrains Mono for code-flavored labels.
- Framer Motion scroll-reveals, animated skill bars, hover-lift project cards, typewriter hero
  role text, cursor-follow ambient glow, filterable project grid, testimonial carousel.
- Fully responsive, keyboard-focus visible, and respects `prefers-reduced-motion`.

## Tech stack

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Sanity v3 · GROQ · next-sanity
