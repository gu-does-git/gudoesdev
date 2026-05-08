# gudoesdev

Personal portfolio and blog website built with modern web technologies. Bilingual (English & Portuguese), fully responsive, with a focus on performance and user experience.

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ✨ Features

### Implemented ✅
- [x] **Multiple collections** - Projects and Blog posts
- [x] **Bilingual (i18n)** - English & Portuguese with seamless language switching
- [x] **Type-safe markdown** - Full TypeScript support for content
- [x] **Super fast performance** - Static generation with Astro
- [x] **Accessible** - ARIA labels, semantic HTML, keyboard navigation
- [x] **Responsive design** - Mobile to desktop layouts
- [x] **Mobile hamburger menu** - Animated navigation toggle with slide animations
- [x] **Mobile responsiveness audit** - Grid, padding, and spacing fixes across all breakpoints
- [x] **Custom fonts with astro-font** - Plus Jakarta Sans for body, JetBrains Mono for code
- [x] **SEO-friendly** - Proper meta tags and structure
- [x] **Light & Dark mode** - Theme switcher with persistence
- [x] **Search functionality** - Real-time post and project search
- [x] **Smooth animations** - Transitions and fade effects throughout
- [x] **Individual post pages** - Full blog post viewing with metadata
- [x] **Projects showcase** - Featured projects on homepage with details
- [x] **Full projects listing page** - Complete projects grid with search
- [x] **About page** - Professional profile with experience, education, certifications
- [x] **Statistics section** - Animated counters for achievements
- [x] **Tech stack showcase** - Interactive technology grid with icons
- [x] **Social links** - GitHub, Twitter, Email integration
- [x] **Language-aware routing** - Automatic locale detection and switching
- [x] **Two-column layouts** - Modern hero section and about page design
- [x] **Post tags system** - Categorized blog posts with tag navigation
- [x] **Pill-styled components** - Professional card designs for content sections

### Planned 📋
- [ ] Create new posts
- [ ] Standardize icon sets and styling across components
- [ ] Share buttons on blog posts
- [ ] astro-robots-txt - Robots.txt generation
- [ ] @astrojs/sitemap - Sitemap generation
- [ ] @astrojs/rss - RSS feed for posts
- [ ] astro-compress - Asset compression
- [ ] astro-seo - Enhanced SEO control
- [ ] astro-analytics - Analytics integration
- [ ] astro-vtbot - view transitions
- [ ] astro-breadcrumbs - Breadcrumb navigation
- [ ] Core Web Vitals optimization
- [ ] View counter for posts
- [ ] Search.json for client-side search
- [ ] Syntax highlighting improvements
- [ ] SEO enhancements
- [ ] Code snippet copy button
- [ ] Custom 404 page
- [ ] Donations/Support page (Ko-fi, Buy Me A Coffee)
- [ ] Video content support
- [ ] Dynamic OG image generation
- [ ] Fuzzy search with FuseJS
- [ ] Newsletter integration

## 💻 Tech Stack

- **Main Framework** - [Astro](https://astro.build/)
- **Type Checking** - [TypeScript](https://www.typescriptlang.org/)
- **Component Framework** - [React](https://reactjs.org/)
- **Styling** - [Tailwind CSS](https://tailwindcss.com/)
- **Code Formatting** - [Prettier](https://prettier.io/)
- **Icons** - [Astro Icon](https://www.astroicon.dev/) with Material Symbols & UIm icon sets
- **Internationalization** - [Astro i18n](https://docs.astro.build/en/guides/internationalization/)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:3000` to see your site.

## 📱 Testing Responsiveness

Test across these breakpoints to ensure proper layout and functionality:

- **Mobile (xs)** - < 640px: Single column layouts, hamburger menu, stacked components
- **Small (sm)** - 640px+: Mobile menu transitions to desktop, 2-column grids start
- **Medium (md)** - 768px+: Full desktop layouts, 3-column grids, expanded spacing
- **Large (lg)** - 1024px+: Maximum content width, enhanced typography
- **Extra Large (xl)** - 1280px+: Full-width optimizations

### Key pages to test:
- **Index**: Hero section responsiveness, statistics grid (2x2 → 4x1), tech stack grid
- **Posts/Projects**: Search functionality on mobile, grid layout transitions
- **About**: Two-column avatar+bio layout, pill-styled sections on all sizes
- **Header**: Hamburger menu animation, navigation transitions at sm breakpoint
- **Dividers**: Centered badges and gradients across all breakpoints

### Testing tools:
- Chrome DevTools: Responsive Design Mode (`Ctrl+Shift+M`)
- Test on real devices (phone, tablet) when possible
- Use Firefox responsive mode for additional browser testing

## ✅ Lighthouse Score

<p align="center">
  <a href="https://pagespeed.web.dev/report?url=https://gudoes.dev%2F&form_factor=desktop">
    <img width="710" alt="gudoesdev Lighthouse Score" src="lighthouse-score.svg">
  </a>
</p>
