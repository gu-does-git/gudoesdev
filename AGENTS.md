# Repository Guidelines

## Project Overview

Personal portfolio and blog for [gudoes.dev](https://gudoes.dev) — built with **Astro 4**, **React 18**, **Tailwind CSS 3**, and **TypeScript 5**. Features bilingual support (English / Brazilian Portuguese), dark/light theme, blog with full-text search, and projects showcase. Deployed as a static site on Vercel.

## Architecture & Data Flow

**SSG (Static Site Generation)** — Astro builds all HTML at compile time. No server-side rendering or dynamic API routes.

```
Content Collections (Markdown)
  │
  ├── getCollection() at build time  ──►  Astro pages (.astro frontmatter)
  │                                            │
  ▼                                            ▼
  Layout.astro (HTML shell + theme + fonts)
       │
       ├─► Header.astro (SSR: reads allPosts for nav maps)
       │      ├── Logo.astro (static)
       │      ├── Menu.astro (static, locale-aware links)
       │      ├── ThemeSwitcher.astro (static, vanilla JS)
       │      ├── LanguageSwitcher.tsx (client:load)
       │      └── MobileMenuToggle.tsx (client:load)
       │
       ├─► <slot/> (page content)
       │      ├── Static .astro pages (index, about, projects, posts)
       │      │     └── .astro components (Separator, TechStack, etc.)
       │      └── React islands (client:load)
       │            ├── SearchPosts.tsx
       │            ├── SearchProjects.tsx
       │            ├── NumberCounter.tsx
       │            └── ScrollReveal.tsx
       │
       └─► Footer.astro (static, locale-aware)
```

- **Content as data source**: all blog posts and projects are Markdown files in `src/content/` with frontmatter validated by Zod schemas.
- **React islands** (hydrated with `client:load`) for interactivity: search filtering, language switcher path computation, animated counters, scroll reveal. No React state management library — components use `useState` / `useMemo`.
- **i18n routing**: Astro's built-in i18n with `defaultLocale: "en"` and `locales: ["en", "pt-br"]`. Pages mirror the tree under `src/pages/pt-br/`. Content files mirror under `src/content/*/pt-br/`.
- **No API layer** — zero API routes or server endpoints. Search is fully client-side over pre-fetched collections.

## Key Directories

| Path | Purpose |
|------|---------|
| `src/pages/` | Astro file-based routing (`.astro`). `[...slug].astro` for dynamic post routes. `pt-br/` mirror for Portuguese. |
| `src/content/` | Content collections (`posts/`, `projects/`) as Markdown with Zod frontmatter schemas. `etc/` for JSON data files. |
| `src/components/` | UI components. Astro `.astro` (static) and React `.tsx` (interactive). Sub-dirs: `Index/`, `Header/`. |
| `src/layouts/` | `Layout.astro` — root HTML shell, font injection, theme meta, header/footer orchestration. |
| `src/config.ts` | Site-wide constants (URL, author, title, pagination). |
| `public/` | Static assets served at `/`. |
| `src/__tests__/` | Test files (`.test.ts`). |

## Development Commands

| Command | Runner | Description |
|---------|--------|-------------|
| `bun run dev` | Bun | Astro dev server on `localhost:4321` |
| `bun run dev:coder` | Bun | Dev server on `0.0.0.0:4321` (network-accessible) |
| `bun run build` | Bun | `astro check && astro build` — type-check then build |
| `bun run preview` | Bun | Preview production build locally |
| `bun test` | Bun | Run all tests (Bun test runner) |
| `npm run build` | npm | Vercel build command (`astro check && astro build`) |

**The `build` script runs `astro check` first** — this means `tsc --noEmit`-style type checking gates compilation. The Vercel deploy sets `CI=false` to allow `astro check` to pass in that environment.

## Code Conventions & Common Patterns

### General
- **TypeScript strict mode** (`extends: "astro/tsconfigs/strict"`).
- **Prettier**: `singleQuote: false`, `semi: true`, `trailingComma: "es5"`, `arrowParens: "avoid"`, `tabWidth: 2`, `printWidth: 80`. Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`.
- **ESLint**: `eslint:recommended` + `plugin:astro/recommended`. Astro files use `astro-eslint-parser`.
- **Commits**: Conventional Commits (`feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`). Enforced by Husky + commitlint. Pre-commit hook runs `bun test`.

### Astro Components
- Frontmatter (`---`) at the top for data fetching, then `<style>` block, then HTML template.
- Data fetching via `getCollection("posts")` or `getCollection("projects")` from `astro:content`.
- Locale-aware URLs via `getRelativeLocaleUrl()` from `astro:i18n`.
- Post rendering accessed via `post.render()` which returns `{ Content }` component.

### React Components (.tsx)
- Functional components only, no class components.
- Props interfaces defined inline above the function.
- Hydrated via `client:load` directive in parent `.astro` component.
- Local state with `useState`, derived state with `useMemo`. No Redux/Zustand.

### Content Collections
```
posts:     author, pubDatetime, modDatetime?, title, featured?, draft?, tags[],
           image, description, canonicalURL?
projects:  name, description, url, image?, tags[]?, featured?
```
- Bilingual content mirrored: `src/content/posts/code_quality.md` + `src/content/posts/pt-br/code_quality.md`.
- Draft posts excluded from production; `scheduledPostMargin` config controls early publication.
- Tags translated separately — `Header.astro` builds a `tagMap` for cross-locale tag route resolution.

### i18n Pattern
- English is default (root path `/`). Portuguese under `/pt-br/`.
- Page routes mirrored: `src/pages/about.astro` ↔ `src/pages/pt-br/about.astro`.
- Content mirrored: `src/content/posts/code_quality.md` ↔ `src/content/posts/pt-br/code_quality.md`.
- Navigation text hardcoded per locale in `Menu.astro`. `LanguageSwitcher.tsx` computes localized paths for posts, tags, and pages.

### CSS
- Tailwind utility classes in templates. `@tailwindcss/typography` for prose content.
- Scoped `<style>` tags in Astro for component-specific CSS (animations, keyframes).
- Dark mode via class strategy (`class` or `[data-theme='dark']`).
- Custom fonts: Plus Jakarta Sans (sans-serif), JetBrains Mono (monospace). Loaded via `astro-font`.

## Important Files

| File | Role |
|------|------|
| `astro.config.mjs` | Astro build config, integrations, i18n |
| `package.json` | Dependencies, scripts, project metadata |
| `src/config.ts` | `SITE` constant: URL, author, title, pagination |
| `src/content/config.ts` | Zod schemas for `posts` and `projects` collections |
| `src/layouts/Layout.astro` | Root HTML shell, theme/font/meta injection |
| `src/components/Header.astro` | Navigation, SSR-fetched posts/tag maps for i18n |
| `tailwind.config.mjs` | Design tokens: fonts, colors, typography plugin |

## Runtime / Tooling Preferences

- **Hybrid tooling**: Bun runs commit hooks and tests (`bun test`, `bun x commitlint`). npm builds on Vercel (`npm run build`). Both `package-lock.json` and `bun.lock` are tracked.
- **Node.js** required (via npm scripts).
- **No server runtime** — purely static output.
- **Husky hooks**: pre-commit → `bun test`; commit-msg → block AI attributions + `commitlint`.

## Testing & QA

- **Test runner**: Bun's built-in (`bun test`) — provides `describe`/`it`/`test`/`expect`/`mock` natively.
- **Location**: `src/__tests__/` directory, `*.test.ts` naming.
- **No** test config files, coverage setup, or test utility dependencies. A placeholder test file exists (`src/__tests__/placeholder.test.ts`).
- **Coverage**: Not configured.
- **CI**: No CI pipeline. Tests only run via the Husky pre-commit hook. Any CI addition should replicate the `bun test` invocation.
