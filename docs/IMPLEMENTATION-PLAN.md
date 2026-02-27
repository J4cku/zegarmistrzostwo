# Zegarmistrzostwo — Implementation Plan

> **Repo:** `/Users/jacek/repos/zegarmistrzostwo`
> **Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion
> **Deploy:** Vercel (no custom domain yet)
> **Design reference:** `docs/zegarmistrzostwo-design-guide.html` (copy from this session)

---

## Phase 0 — Project Scaffold

### 0.1 Create Next.js project

```bash
cd /Users/jacek/repos
npx create-next-app@latest zegarmistrzostwo \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### 0.2 Directory structure

```
zegarmistrzostwo/
├── docs/                          # Design guide, notes, WIP files
│   └── zegarmistrzostwo-design-guide.html
├── public/
│   ├── logo/
│   │   ├── logo-dark.svg          # Charcoal on transparent (for white bg)
│   │   ├── logo-light.svg         # White on transparent (for video hero)
│   │   └── logo-icon.svg          # Watch icon only (favicon source)
│   ├── video/
│   │   └── hero-poster.jpg        # Fallback still frame (placeholder for now)
│   └── favicon.ico                # Generated from logo-icon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with fonts, metadata
│   │   ├── page.tsx               # Homepage
│   │   ├── o-nas/page.tsx         # About page
│   │   ├── oferta/page.tsx        # Services/offer page
│   │   ├── kontakt/page.tsx       # Contact page
│   │   └── globals.css            # Tailwind base + custom utilities
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # White sticky nav, centered logo, Piaget-style
│   │   │   └── Footer.tsx         # Cream footer, 4-column
│   │   ├── home/
│   │   │   ├── VideoHero.tsx      # Full-bleed video with overlay + tagline
│   │   │   ├── Collections.tsx    # "Odkryj nasze kolekcje" centered heading + link
│   │   │   ├── Categories.tsx     # 3-column category grid (Biżuteria/Zegarki/Serwis)
│   │   │   └── AboutTeaser.tsx    # Asymmetric text + image split section
│   │   └── ui/
│   │       ├── TextLink.tsx       # Underlined CTA link (Piaget-style)
│   │       ├── SectionHeading.tsx # Centered uppercase Cormorant heading
│   │       └── Container.tsx      # Max-width wrapper
│   ├── lib/
│   │   └── fonts.ts               # Google Fonts config (Cormorant, DM Sans, Inter)
│   └── styles/
│       └── (empty for now, Tailwind handles it)
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

### 0.3 Install dependencies

```bash
npm install framer-motion
npm install -D @tailwindcss/typography
```

---

## Phase 1 — Tailwind Config & Fonts

### 1.1 tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1D1D1B",
        ink: "#1A1A1A",
        gold: {
          DEFAULT: "#C5A258",
          light: "#D4B87A",
          muted: "#A8884A",
        },
        cream: "#F5F0EA",
        "warm-white": "#FAF7F2",
        smoke: "#EEEAE3",
        mid: "#8A8580",
        "light-border": "#E5DFD4",
        text: {
          DEFAULT: "#3A3835",
          light: "#6B6660",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        ui: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        "heading": "0.06em",
        "wide-caps": "0.12em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
```

### 1.2 src/lib/fonts.ts

```ts
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});
```

### 1.3 Root layout (src/app/layout.tsx)

Apply font variables to `<html>`, set default metadata, wrap with `<Navbar>` and `<Footer>`.

---

## Phase 2 — Layout Components

### 2.1 Navbar (Piaget-style, white, sticky)

Structure:
```
┌──────────────────────────────────────────────────┐
│  Lokalizacja   Sklep     ZEGARMISTRZOSTWO    🔍  │  ← top row
│          Biżuteria  Zegarki  Serwis  O nas  Kontakt  │  ← main links
└──────────────────────────────────────────────────┘
```

Key details:
- `sticky top-0 z-50 bg-white border-b border-light-border`
- Logo: centered, `font-serif font-light text-xl tracking-heading uppercase`
- Main links: centered row, `text-xs tracking-wide-caps uppercase text-text-light`
- No background color changes on scroll — stays white always
- Mobile: hamburger menu, logo stays centered

### 2.2 Footer (cream, 4 columns)

- Background: `bg-cream border-t border-light-border`
- 4 columns: Kontakt, Godziny, Serwis, Społeczność
- Column headings: `font-serif font-light uppercase tracking-heading text-charcoal`
- Links: `text-text-light text-sm`
- Bottom row: centered copyright, separated by `border-t border-light-border`

---

## Phase 3 — Homepage

### 3.1 VideoHero

```
┌──────────────────────────────────────────────────┐
│                                                  │
│            [  looping video / poster  ]           │
│                                                  │
│      ▓▓▓ subtle bottom gradient overlay ▓▓▓      │
│                                                  │
│       RZEMIOSŁO SPOTYKA ELEGANCJĘ                │
│       Biżuteria · Zegarki · Serwis              │
│       Odkryj naszą ofertę  (underlined link)     │
│                                                  │
└──────────────────────────────────────────────────┘
```

Implementation:
- `<video>` with `autoPlay muted loop playsInline` + `poster` attribute
- Bottom-only gradient: `bg-gradient-to-t from-black/45 via-black/20 to-transparent`
- Text: white, Cormorant Garamond 300, uppercase, centered
- CTA: underlined text link (not a button)
- Mobile: show poster image via `<picture>` or conditional render, skip `<video>`
- Video file: placeholder for now, use a dark still image as poster

### 3.2 Collections section

- Centered heading: "ODKRYJ NASZE KOLEKCJE" in Cormorant 300 uppercase
- Subtitle paragraph in DM Sans
- Underlined text link: "Zobacz pełną ofertę"
- White background, generous vertical padding (py-20+)

### 3.3 Categories (3-column grid)

- Grid with 1px borders between items (use `divide` or gap trick)
- Each cell: icon + heading (Cormorant uppercase) + subtitle (DM Sans, muted)
- White background
- Biżuteria / Zegarki / Serwis
- Mobile: stack to single column

### 3.4 About teaser (asymmetric split)

- 2-column grid: text left, image right
- Left: Cormorant heading + DM Sans body + underlined "Poznaj naszą historię" link
- Right: placeholder image (warm gray gradient for now)
- Mobile: stack, image first

---

## Phase 4 — Subpages (skeleton)

### 4.1 O Nas (/o-nas)
- Hero: full-width image of workshop (placeholder)
- Centered Cormorant heading
- Story text in DM Sans
- Workshop photo gallery (placeholder grid)

### 4.2 Oferta (/oferta)
- Category sections: Biżuteria, Zegarki, Serwis
- Each with image + description + underlined link
- Repair pricing table (simple HTML table styled with Tailwind)

### 4.3 Kontakt (/kontakt)
- Split layout: contact info left, embedded Google Map right
- Address, phone, hours
- Simple contact form (name, email, message — non-functional for now)
- Social links

---

## Phase 5 — Polish & SEO

### 5.1 Metadata
- Open Graph tags with site preview image
- `<title>` and `<meta description>` per page (in Polish)
- LocalBusiness JSON-LD schema (address, hours, phone, coordinates)
- Canonical URLs

### 5.2 Performance
- Optimize images with `next/image`
- Video: lazy-load, poster fallback, skip on mobile
- Font subsetting (already handled by next/font)
- Lighthouse target: 90+ on all scores

### 5.3 Favicon
- Generate from `logo-icon.svg`
- Include apple-touch-icon, favicon-32x32, favicon-16x16

---

## Phase 6 — Deploy

```bash
# Link to Vercel
npx vercel link

# Deploy
npx vercel --prod
```

- Enable Vercel Analytics
- Set up Google Search Console
- Submit sitemap

---

## File Checklist (Phase 1 deliverables)

When you start, create these files in order:

1. `docs/zegarmistrzostwo-design-guide.html` — copy from this session
2. `tailwind.config.ts` — with full color palette
3. `src/lib/fonts.ts` — Cormorant, DM Sans, Inter
4. `src/app/globals.css` — Tailwind directives + any custom base styles
5. `src/app/layout.tsx` — root layout with fonts, metadata, Navbar, Footer
6. `src/components/layout/Navbar.tsx`
7. `src/components/layout/Footer.tsx`
8. `src/components/ui/TextLink.tsx`
9. `src/components/ui/SectionHeading.tsx`
10. `src/components/ui/Container.tsx`
11. `src/components/home/VideoHero.tsx`
12. `src/components/home/Collections.tsx`
13. `src/components/home/Categories.tsx`
14. `src/components/home/AboutTeaser.tsx`
15. `src/app/page.tsx` — homepage composing all home components
16. `public/logo/logo-dark.svg` — charcoal wordmark
17. `public/logo/logo-light.svg` — white wordmark
18. `public/logo/logo-icon.svg` — watch icon only

---

## Logo SVG Prep

The source logo is a single SVG with two parts:
- **Full logo:** viewBox `0 0 14962.42 5619.94` — icon + wordmark
- **Icon only:** viewBox `6200 0 3000 3400` — watch icon extracted

To create variants:
- `logo-dark.svg`: original file, fill `#1D1D1B` (for white backgrounds)
- `logo-light.svg`: same paths, fill `#FFFFFF` (for video hero overlay)
- `logo-icon.svg`: cropped to viewBox `6200 0 3000 3400`, fill `#1D1D1B`

---

## Design Tokens Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| `charcoal` | `#1D1D1B` | Text, logo, rare dark sections |
| `gold` | `#C5A258` | Accent: link underlines, section markers, hovers |
| `gold-light` | `#D4B87A` | Hover states, secondary accents |
| `cream` | `#F5F0EA` | Footer bg, accent blocks |
| `warm-white` | `#FAF7F2` | Callout bg, subtle contrast |
| `white` | `#FFFFFF` | Primary page bg (80%+ of surface) |
| `text` | `#3A3835` | Body text |
| `text-light` | `#6B6660` | Secondary text, descriptions |
| `mid` | `#8A8580` | Muted text, labels |
| `light-border` | `#E5DFD4` | All borders and dividers |

| Font | Weight | Usage |
|------|--------|-------|
| Cormorant Garamond | 300 | Headings (uppercase, wide tracking) |
| Cormorant Garamond | 300 italic | Pull quotes, accent text |
| DM Sans | 400 | Body copy |
| DM Sans | 500 | Labels, card values, nav links |
| Inter | 300–500 | Small UI elements, badges |

---

## Key Design Rules

1. **White-dominant** — 80%+ of page surface is white. Use cream only for footer and occasional accent blocks.
2. **Underlined text links** for CTAs, not buttons. Reserve filled buttons for nav CTA and future checkout only.
3. **Piaget-style nav** — white, sticky, centered logo, two rows (utility + main links).
4. **One dramatic moment** — the video hero. Everything else is quiet and restrained.
5. **Cormorant Garamond 300 uppercase** for all headings with generous letter-spacing.
6. **Asymmetric layouts** — text on one side, image on the other, editorial feel.
7. **No dark sections** except the video hero overlay. Footer is cream, not dark.
8. **Generous whitespace** — sections have `py-20` or more. Let content breathe.
