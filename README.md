# Nova - Product Launch Experience

A high-craft product launch site built for a next-generation wearable device. Engineered to Awwwards Site of the Day standards with restrained motion, responsive typography, and tactile precision.

---

## Architecture Overview

Nova is built with modern web technologies focused on visual rhythm, zero layout shift, and strict accessibility compliance:

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom CSS variable design tokens
- **Typography**: Fraunces (Variable Display Serif) + General Sans (Geometric Neo-grotesque)
- **Animation & Motion**: GSAP 3 + ScrollTrigger with unified `useReducedMotion` fallback
- **Smooth Scroll**: Lenis unified scroll engine integrated with GSAP ticker
- **PDF Generation**: `pdf-lib` dynamic generation on `/api/spec-sheet`
- **Feedback & Notifications**: `react-toastify` for responsive status updates

---

## Directory Structure

```text
Nova/
├── nova-frontend/
│   ├── public/
│   │   ├── frames/         # 90 WebP 360-degree rotation scrub frames
│   │   └── images/         # Compressed WebP product assets
│   ├── scripts/
│   │   └── generate-assets.mjs # Frame & asset generation pipeline
│   └── src/
│       ├── app/            # App Router pages (/, /specs, /waitlist, /api)
│       ├── components/
│       │   ├── home/       # Hero, FrameCanvas, ScrollReveal, FeatureBlock, SpecHighlights
│       │   ├── layout/     # Nav (glassmorphic + mobile menu), Footer
│       │   ├── specs/      # SpecTable, DownloadSpecSheet
│       │   ├── ui/         # Button, CounterValue, SectionLabel, TextLink
│       │   └── waitlist/   # WaitlistForm (inline + full variants)
│       ├── hooks/          # useScrollReveal, useFramePreloader, useReducedMotion
│       └── lib/            # Design tokens, GSAP singleton, spec data model
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm or pnpm

### Installation

```bash
# Navigate to the frontend directory
cd nova-frontend

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Asset Generation Pipeline

If you need to regenerate the 90-frame 360° scrub sequence and product image assets:

```bash
cd nova-frontend
node scripts/generate-assets.mjs
```

---

## Design System & Accessibility

- **Canvas Palette**: Warm gallery neutral (`#f4f2ee`), deep obsidian (`#0e0d0b`), and ember accent (`#d5451b`).
- **WCAG AA Compliance**: High-contrast foregrounds (`#17160f` on light canvas: 16.2:1; `#b83a16` for text labels: 5.14:1).
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce` across GSAP timelines, canvas scrubbers, and entrance transitions.
- **Responsive Layout**: Fluid typography and adaptive mobile hamburger menu navigation.
