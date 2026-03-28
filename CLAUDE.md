# KajKam - AI-Powered Waste Management App for Zagreb

## Project Overview

KajKam ("Where to?" in Zagreb slang) is an AI-powered web app helping Zagreb citizens properly sort and dispose of waste. Built for a hackathon, it features AI waste recognition, an interactive bin map, a recycling chatbot, and gamification.

## Project Structure

```
├── app/              # Main web application (React + Vite + TypeScript)
├── landing/          # Marketing landing page (same stack)
├── prezentacija/     # Pitch deck / presentation (same stack)
├── docs/             # Project spec & brand guidelines
│   ├── project_spec.md
│   └── brand_guideline.md
└── logo/             # Brand assets
```

## Tech Stack

- **Frontend:** React 19, TypeScript 5.8, Vite 6
- **Styling:** TailwindCSS 4 (via Vite plugin), Lucide React icons, Motion (Framer Motion)
- **AI:** Google Gemini API (`@google/genai`)
- **Data:** Papa Parse (CSV parsing for bin locations)
- **Server:** Express (lightweight)

## Getting Started

```bash
# Main app
cd app && npm install && npm run dev    # runs on port 3000

# Landing page
cd landing && npm install && npm run dev

# Presentation
cd prezentacija && npm install && npm run dev
```

## Common Commands

- `npm run dev` — Start dev server (port 3000, host 0.0.0.0)
- `npm run build` — Production build
- `npm run lint` — TypeScript type-check (`tsc --noEmit`)
- `npm run preview` — Preview production build
- `npm run clean` — Remove `dist/` folder

## Environment Variables

Each sub-project has its own `.env` file:
- `GEMINI_API_KEY` — Google Gemini AI API key (required)
- `APP_URL` — Deployment URL

## Key App Features (4 Tabs)

1. **AI Scanner (Skener)** — Camera/upload waste image → Gemini AI classifies it → shows correct bin + awards EkoBodovi
2. **Map (Karta)** — Interactive map with 2,523 Zagreb bin locations from CSV, color-coded by waste type, "Report Full Bin" feature
3. **Chat (ZG Eko-Asistent)** — Gemini-powered chatbot for recycling Q&A, WhatsApp-style UI
4. **Profile (Moj Profil)** — Gamification dashboard with EkoBodovi points, progress bar, rewards

## Design System

- **Colors:** ZG Blue `#004482`/`#005BAB` (primary), ZG Red `#BB0400`/`#E10600` (accent, sparingly), White background
- **Waste colors:** Yellow (plastic), Blue (paper), Brown (bio), Green (glass), Dark Grey (mixed)
- **Typography:** Inter font, ALL CAPS headings (semi-bold), sentence case body text (`#1A1A1A`)
- **Layout:** Mobile-first, max 450px container, centered on desktop
- **Components:** Shield motif (0px top corners, 16px bottom corners), monoline 2px stroke icons, soft shadows
- **Color rule:** 60% white/grey, 30% ZG Blue, 10% ZG Red + waste colors

## Code Conventions

- Language in UI/UX copy: Croatian (Zagreb dialect/slang where appropriate)
- Code and comments: English
- Mobile-first responsive design
- All AI calls go through Google Gemini (`@google/genai`)
- Bin location data loaded client-side from `public/zagreb_bins_locations.csv`
- User state stored in `localStorage` (no backend auth)
- Path alias: `@/` maps to `src/` directory

## Important Notes

- This is a hackathon project — prioritize working demo over production-grade code
- No real authentication — `localStorage` is used for user profiles
- QR codes in profile are procedurally generated (fake, for demo purposes)
- Refer to `docs/project_spec.md` for detailed feature requirements
- Refer to `docs/brand_guideline.md` for complete design system reference
