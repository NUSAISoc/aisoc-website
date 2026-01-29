# NUS SoC AI Society (AISOC) Website

> **FROM THEORY TO DEPLOYMENT.**

The official website for the National University of Singapore (NUS) School of Computing AI Society (AISOC). This project is built with a focus on "Graphic Realism"—blending industrial, data-dense aesthetics with rigorous engineering principles.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **UI Components**: [React](https://reactjs.org/) + [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Mathematics**: [KaTeX](https://katex.org/) (via `remark-math` and `rehype-katex`)
- **Deployment**: [Cloudflare Workers / Pages](https://pages.cloudflare.com/)

## ✨ Features

- **Events Subpage (`/events`)**: Display upcoming events for registration and an archive of past gatherings.
- **Core Team Subpage (`/team`)**: Showcase the students and researchers driving AISOC forward.
- **Blog Subpage (`/blog`)**: Technical articles on machine learning, engineering, and research, synced from external sources.
- **Industrial Design**: A high-contrast "Clinical Acid" color palette and geometric typography.

## 🛠️ Quick Start

All commands are run from the root of the project:

```sh
# Install dependencies
npm install

# Start local development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📂 Project Structure

```text
/
├── src/
│   ├── components/
│   │   ├── react/     # Interactive React components (Islands)
│   │   └── ui/        # shadcn/ui base components
│   ├── content/       # Markdown data (Events, Team, Blog)
│   ├── layouts/       # Base Astro layouts
│   └── pages/         # Route definitions
├── public/            # Static assets (images, fonts)
├── scripts/           # Build-time utilities (e.g., blog fetching)
├── astro.config.mjs   # Astro configuration
└── blog.config.mjs    # Blog sync settings
```

## 📝 Content Management

The site uses **Astro Content Collections** for type-safe data management.

- **Events**: Add/edit `.md` files in `src/content/events/`.
- **Team**: Add/edit `.md` files in `src/content/team/`.
- **Blog**:
    - Posts are managed in `src/content/blog/`.
    - Can be synced from an external GitHub repo by configuring `blog.config.mjs` and running `npm run build`.

## 🎨 Design Philosophy: Graphic Realism

AISOC avoids generic sci-fi tropes. Our identity is built on:

- **Clinical Acid Palette**: Void Black (#080808), Clinical White (#F2F2F2), and Marathon Green (#CCFF00).
- **Mathematical Primitives**: Using tensors, loss landscapes, and activation functions as visual elements.
- **Typography**: [Tomorrow](https://fonts.google.com/specimen/Tomorrow) for headers and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for data/body.

---

Built with ⚡ by [@itsvari](https://github.com/itsvari) for the **NUS SoC AI Society**.
