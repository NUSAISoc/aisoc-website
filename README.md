# NUS SoC AI Society (AISOC) Website

> **FROM THEORY TO DEPLOYMENT.**

The official website for the National University of Singapore (NUS) School of Computing AI Society (AISOC).

## Tech Stack

- **Framework**: [Astro 7](https://astro.build/) (Static Site Generation with Content Layer API)
- **UI Components**: [React](https://reactjs.org/) + [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Mathematics**: [KaTeX](https://katex.org/) (via `remark-math` and `rehype-katex`)
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) via GitHub Actions

## Features

- **Events Subpage (`/events`)**: Display upcoming events for registration and an archive of past gatherings. Supports timezone-aware event dates for accurate scheduling across timezones.
- **Core Team Subpage (`/team`)**: Showcase the students and researchers driving AISOC forward.
- **Blog Subpage (`/blog`)**: Technical articles on machine learning, engineering, and research with timezone-aware publication dates.
- **Automated Content Pipeline**: Blog, event, and team content is fetched from [`aisoc-website-content`](https://github.com/NUSAISoc/aisoc-website-content) at build time and re-deployed automatically when that repo changes.

## Quick Start

All commands are run from the root of the project:

```sh
# Install dependencies
npm install

# Start local development server (localhost:4321)
npm run dev

# Build for production (fetches content from external repo first)
npm run build

# Preview production build locally
npm run preview
```

## Dependency maintenance

Use Node.js 22.12 or newer and `npm ci` to install the locked dependency tree.
Pull requests run a production build and `npm audit --audit-level=low` before merging.

The `package.json` overrides select patched transitive dependencies that upstream
packages still constrain to older releases:

- `katex` uses the direct dependency's version for both maths plugins. Its CSS and
  fonts are bundled locally from the same package.
- `postcss-selector-parser` uses 7.1.6 for `@tailwindcss/typography`, which pins
  vulnerable 6.0.10.
- `sharp` uses 0.35.5 throughout the tree, including Miniflare's older pinned copy.

Review these overrides when upgrading their parent packages. Check the complete
tree with `npm audit`, including development dependencies.

## Project Structure

```text
/
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD: build & deploy to Cloudflare Workers
├── src/
│   ├── components/
│   │   ├── react/         # Interactive React components (Islands)
│   │   └── ui/            # shadcn/ui base components
│   ├── content/           # Markdown data (fetched at build time)
│   │   ├── blog/          # ← populated from aisoc-website-content/blog/
│   │   ├── events/        # ← populated from aisoc-website-content/events/
│   │   └── team/          # ← populated from aisoc-website-content/team/
│   ├── layouts/           # Base Astro layouts
│   ├── pages/             # Route definitions
│   ├── lib/               # Utility functions and helpers
│   ├── scripts/           # Build-time scripts
│   ├── styles/            # Global styles
│   └── content.config.ts  # Content Layer schema definitions
├── public/                # Static assets (images, fonts)
├── scripts/
│   └── fetch-content.mjs  # Prebuild script: clones & syncs content repo
├── astro.config.mjs       # Astro configuration
├── content.config.mjs     # External content source configuration (GitHub repo/local)
└── package.json           # Project dependencies
```

## Content Management

### Content Collections (Astro Content Layer)

This project uses Astro's Content Layer API with collections defined in `src/content.config.ts`:

- **Events**: Support ISO8601 datetime strings with timezone offsets (e.g., `2026-03-30T10:00:00+08:00`) for accurate scheduling
- **Blog**: Articles with timezone-aware publication dates
- **Team**: Member profiles with optional social links

All content is managed in the separate [`aisoc-website-content`](https://github.com/NUSAISoc/aisoc-website-content) repository. **Do not add content files directly to this repo** — they are ignored by `.gitignore` and will be overwritten on the next build.

The `scripts/fetch-content.mjs` prebuild script clones that repo and syncs the content into `src/content/` before Astro builds the site. Files with a `_template-` filename prefix are skipped and never rendered.

To add content, follow the instructions in the `aisoc-website-content` repository's `README.md`.

## Deployment

The site is deployed to **Cloudflare Workers** via the `.github/workflows/deploy.yml` GitHub Actions workflow. A build and deploy is triggered automatically when:

- A commit is pushed to `main` in this repository.
- The `aisoc-website-content` repo pushes content changes to its `main` branch (which fires a `repository_dispatch` event to this repo).

### Required GitHub Secrets

Configure the following secrets on this repository for deployments to work:

| Secret                  | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API token with Workers deploy permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID                                |

---

Built by [@itsvari](https://github.com/itsvari) for the **NUS SoC AI Society**.
