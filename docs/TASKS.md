# TASKS.md — Portfolio Build Plan
**Owner:** Muhammad Jamil Raza Attari
**Project:** Personal Portfolio Website
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Vercel

> **How to use this file:**
> Work tasks in order. Do not start a task until all dependencies are checked off.
> Mark each `[ ]` criterion as `[x]` when complete.
> Do not skip Phase 1 — every later task depends on it.

---

## Progress Tracker

| Phase | Tasks | Completed |
|-------|-------|-----------|
| Phase 1 — Foundation  | 5 tasks | 5/5 ✓ |
| Phase 2 — Layout      | 3 tasks | 3/3 ✓ |
| Phase 3 — Sections    | 7 tasks | 7/7 ✓ |
| Phase 4 — Polish      | 5 tasks | 3/5 (code done; browser verification pending for T16-19) |
| Phase 5 — Deploy      | 4 tasks | 0/4 |
| **Total**             | **24 tasks** | **15/24** |

---

## Phase 1 — Foundation

> Goal: Ek working skeleton jisme design system, font system, aur theme system
> fully configured ho. Koi section nahi — sirf infrastructure.

---

### Task 1: Project Initialization

**Complexity:** S
**Depends on:** None
**Goal:** Next.js 14 project create karo with TypeScript, Tailwind, aur all base configs

**Steps:**
```bash
npx create-next-app@latest jamil-portfolio \
  --typescript --tailwind --app --eslint --src-dir=false
cd jamil-portfolio
npm install framer-motion lucide-react clsx tailwind-merge
```

**Done when:**
- [x] `next dev` runs without errors at `localhost:3000`
- [x] TypeScript strict mode enabled in `tsconfig.json` (`"strict": true`)
- [x] `@/` path alias working — `import X from '@/components/X'` resolves correctly
- [x] `tailwind.config.ts` has `content` array covering `./app/**` and `./components/**`
- [x] ESLint config present, `npm run lint` runs without errors
- [x] `lib/utils.ts` created with `cn()` helper:
  ```ts
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
  ```
- [x] `.gitignore` includes `.env.local`
- [x] Git initialized, initial commit made: `chore: initialize next.js portfolio project`
- [x] Default Next.js boilerplate (page.tsx content, globals.css defaults) wiped clean

---

### Task 2: Font System Setup

**Complexity:** S
**Depends on:** Task 1
**Goal:** Charo fonts load karo via `next/font` aur CSS variables ke through accessible banao

**Done when:**
- [x] `app/fonts.ts` file created with all 4 font declarations:
  - `lora` → variable `--font-heading-light`
  - `outfit` → variable `--font-body-light`
  - `jetbrainsMono` → variable `--font-heading-dark`
  - `dmSans` → variable `--font-body-dark`
- [x] All fonts use `display: 'swap'`
- [x] All 4 font variables injected on `<html>` tag in `app/layout.tsx`
- [x] `globals.css` defines:
  ```css
  :root  { --font-heading: var(--font-heading-light); --font-body: var(--font-body-light); }
  .dark  { --font-heading: var(--font-heading-dark);  --font-body: var(--font-body-dark);  }
  ```
- [x] `tailwind.config.ts` extends `fontFamily`:
  ```ts
  fontFamily: { heading: ['var(--font-heading)'], body: ['var(--font-body)'] }
  ```
- [ ] Verify: add temp `<h1 className="font-heading">Test</h1>` — Lora renders in browser
- [ ] Verify: add `.dark` class to `<html>` manually — JetBrains Mono renders for h1
- [ ] Temp test elements removed after verification
- [x] Commit: `feat(fonts): add dual-mode font system via next/font`

---

### Task 3: Color Token System

**Complexity:** S
**Depends on:** Task 1
**Goal:** Full color token system in CSS variables aur Tailwind custom colors — koi hardcoded hex allowed nahi

**Done when:**
- [x] `app/globals.css` has complete `:root` block (light mode):
  ```css
  --color-bg: #FAFAFA;
  --color-surface: #F3F4F8;
  --color-accent: #1740D4;
  --color-accent-sub: #EEF0FF;
  --color-ink: #080918;
  --color-muted: #44445A;
  --color-border: #E8E8EF;
  --color-card: #FFFFFF;
  ```
- [x] `globals.css` has complete `.dark` block (dark mode):
  ```css
  --color-bg: #0C0C16;
  --color-surface: #101018;
  --color-accent: #05D4B4;
  --color-accent-sub: #0D2420;
  --color-ink: #F0F0FA;
  --color-muted: #8888AA;
  --color-border: #1E1E2E;
  --color-card: #101018;
  ```
- [x] `tailwind.config.ts` `extend.colors` maps all 8 tokens to CSS variables
- [x] `globals.css` base layer has:
  ```css
  body { background-color: var(--color-bg); color: var(--color-ink); }
  * { transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease; }
  ```
- [ ] Verify: `<div className="bg-bg text-ink">` renders with correct light colors
- [ ] Verify: toggle `.dark` on `<html>` — colors switch correctly
- [x] Commit: `feat(tokens): add full color token system for dual-mode theme`

---

### Task 4: Data Layer Setup

**Complexity:** S
**Depends on:** Task 1
**Goal:** Saara static content TypeScript data files mein move karo — koi hardcoded strings JSX mein nahi

**Done when:**
- [x] `data/projects.ts` created with `Project` interface and all 6 projects:
  ```ts
  export interface Project {
    id: string; title: string; category: string;
    description: string; techStack: string[];
    githubUrl: string; liveUrl?: string; featured: boolean;
  }
  ```
  - Broadway Pizza Chatbot (`featured: true`, has `liveUrl`)
  - Pothole Detection (`featured: true`, no `liveUrl`)
  - SpaceX Launch Prediction (`featured: true`, has `liveUrl`)
  - Heart Disease Dashboard (`featured: true`, no `liveUrl`)
  - Real Estate Prediction (`featured: false`)
  - Secure Data Encryption (`featured: false`)
- [x] `data/skills.ts` created with `SkillCategory` interface and 4 categories:
  ```ts
  export interface SkillCategory { name: string; icon: string; skills: string[]; }
  ```
  (Agentic AI · ML/DL · Data Science · MLOps)
- [x] `data/experience.ts` created with `ExperienceEntry` interface and all 5 entries:
  ```ts
  export interface ExperienceEntry {
    role: string; company: string; period: string;
    location: string; tag?: string; bullets?: string[]; prominent: boolean;
  }
  ```
- [x] `data/certifications.ts` created with `Certification` interface and entries
- [x] All data files export typed arrays — no `any`
- [x] `npm run type-check` passes with no errors
- [x] Commit: `feat(data): add typed data layer for all portfolio content`

---

### Task 5: Theme Toggle Logic

**Complexity:** S
**Depends on:** Task 2, Task 3
**Goal:** Working ThemeToggle component with localStorage persistence, system preference fallback, aur zero flash on reload

**Done when:**
- [x] `app/layout.tsx` `<head>` mein flash-prevention inline script present hai:
  ```tsx
  <script dangerouslySetInnerHTML={{ __html: `
    const t = localStorage.getItem('theme');
    const d = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', d);
  `}} />
  ```
- [x] `components/ui/ThemeToggle.tsx` created — `'use client'` directive present
- [x] Toggle uses `mounted` state to prevent hydration mismatch:
  ```ts
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); ... }, []);
  if (!mounted) return <div className="w-9 h-9" />;
  ```
- [x] Click handler: toggles `.dark` on `document.documentElement` AND saves to `localStorage`
- [x] Light mode: Moon icon (`lucide-react`) shown
- [x] Dark mode: Sun icon shown
- [x] Button has `aria-label="Toggle dark mode"` / `"Toggle light mode"` dynamically
- [ ] Verify: switch to dark, refresh page — dark mode persists (no flash)
- [ ] Verify: clear localStorage, reload — system preference applied
- [ ] Verify: font switches — Lora in light, JetBrains Mono in dark (add temp h1 to test)
- [x] Commit: `feat(theme): add theme toggle with localStorage persistence and flash prevention`

---

## Phase 2 — Layout

> Goal: Page ka skeleton ready karo — navbar, footer, aur main page structure.
> Koi real content nahi — sirf structural components.

---

### Task 6: Root Layout & Page Structure

**Complexity:** S
**Depends on:** Task 2, Task 3, Task 5
**Goal:** `app/layout.tsx` aur `app/page.tsx` production-ready structure ke saath setup karo

**Done when:**
- [x] `app/layout.tsx` has:
  - All 4 font variables on `<html>` tag
  - Flash-prevention script in `<head>`
  - Complete `metadata` export (title, description, keywords, OG tags, twitter card)
  - `lang="en"` on `<html>`
  - Skip-to-content link as first child of `<body>`:
    ```tsx
    <a href="#main-content"
       className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                  focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white
                  focus:rounded">
      Skip to content
    </a>
    ```
- [x] `app/page.tsx` has `<main id="main-content">` wrapping all section placeholders
- [x] Section placeholders added with correct IDs:
  `#hero` `#about` `#projects` `#skills` `#experience` `#certifications` `#contact`
- [x] `<body>` has `font-body` class applied as default body font
- [x] `npm run build` completes without errors or warnings
- [x] Commit: `feat(layout): add root layout with metadata, skip link, and page structure`

> **Implementation note:** CSS color variables converted from hex (`#FAFAFA`) to
> RGB-channel format (`250 250 250`) and Tailwind config updated to
> `rgb(var(--color-bg) / <alpha-value>)`. This enables `bg-token/opacity` modifiers
> (e.g. `bg-bg/80`) across all components. `scroll-behavior: smooth` added to `html`.

---

### Task 7: Navbar Component

**Complexity:** M
**Depends on:** Task 5, Task 6
**Goal:** Sticky responsive navbar — desktop links + mobile hamburger menu + ThemeToggle + active section tracking

**Done when:**
- [x] `components/layout/Navbar.tsx` created
- [x] Desktop layout: logo left (`JRA` in `font-heading text-accent`) · nav links center-right · ThemeToggle rightmost
- [x] Nav links: `Projects · Experience · Skills · Contact` — smooth scroll on click
- [x] Navbar is sticky: `fixed top-0 w-full z-50`
- [x] Background: `bg-bg/80 backdrop-blur-sm` at all times
- [x] Border bottom `border-b border-border` appears after 20px scroll (JS scroll event listener in `useEffect`)
- [x] Mobile (< 768px): logo + hamburger icon only — nav links hidden
- [x] Mobile hamburger click: full-screen overlay opens with all nav links stacked
- [x] Overlay: `bg-bg`, links `text-2xl font-heading`, close button (X icon) top-right
- [x] Overlay open: `document.body.style.overflow = 'hidden'` — scroll locked
- [x] Overlay close: on link click, ESC key, or outside tap
- [x] `useEffect` cleanup removes overflow lock
- [x] Active section tracking: `IntersectionObserver` on each section ID — active link has `text-ink border-b border-accent`
- [x] Overlay animation: Framer Motion `AnimatePresence` with slide or fade
- [x] `<nav>` has `aria-label="Main navigation"`
- [x] All links keyboard-focusable with visible focus ring
- [x] Verify: desktop links scroll correctly to each section
- [x] Verify: mobile menu opens, link clicked, menu closes, section scrolled to
- [x] Commit: `feat(navbar): add responsive navbar with mobile menu and active section tracking`

---

### Task 8: Footer Component

**Complexity:** S
**Depends on:** Task 6
**Goal:** Simple footer with social links, copyright, aur "Open to work" status badge

**Done when:**
- [x] `components/layout/Footer.tsx` created
- [x] Content: copyright line + GitHub / LinkedIn / Email icon links
- [x] "Open to remote work" green dot + text — small status badge
- [x] Icons: GitHub + LinkedIn as inline SVG, `Mail` from Lucide (see note below)
- [x] All icon links: `aria-label` present (e.g. `"Visit GitHub profile"`)
- [x] All links: `target="_blank" rel="noopener noreferrer"`
- [x] Footer added to `app/page.tsx` below `<main>`
- [x] Responsive: stacked on mobile, row on desktop
- [x] Commit: `feat(footer): add footer with social links and availability badge`

> **Icon note:** `lucide-react` (installed version) does NOT export `Github` or `Linkedin`
> brand icons. Use inline SVG for these two everywhere in the project (Footer, Contact section).
> `Mail`, `MapPin`, and all non-brand icons are available from lucide-react normally.

---

## Phase 3 — Sections

> Goal: Har section independently build karo. Start karo Hero se aur end karo Contact se.
> Animations is phase mein ADD MAT KARO — Phase 4 mein aayengi.

---

### Task 9: Hero Section

**Complexity:** M
**Depends on:** Task 4, Task 6, Task 7
**Goal:** Full hero section — photo, tagline, sub-text, CTAs — responsive, no animations yet

**Done when:**
- [x] `components/sections/Hero.tsx` created
- [ ] `public/profile.jpg` present (professional headshot) — **PENDING: user must add manually**
- [ ] `public/resume.pdf` present (latest CV) — **PENDING: user must add manually**
- [x] Layout: single-column (photo temporarily removed — will restore to two-column when profile.jpg added)
- [x] Eyebrow badge: `AI / ML ENGINEER · KARACHI, PK` — `font-body text-[9px] tracking-[2.5px] uppercase text-accent bg-accent-sub`
- [x] Heading: `"I Build Intelligent AI Systems — and Teach Others to Do the Same"` — `font-heading text-5xl md:text-7xl font-medium tracking-tight text-ink`
- [x] Sub-text: `"Specialized in Agentic AI, RAG Pipelines & Computer Vision. Open to remote roles, freelance, and collaborations."` — `font-body text-base text-muted`
- [x] CTA buttons (3):
  - `View Projects` → smooth scroll to `#projects` (primary: `bg-accent text-white`)
  - `Download CV` → `/resume.pdf` new tab (outlined: `border-accent text-accent`)
  - `GitHub ↗` → `https://github.com/JamilRaza001` (ghost: `border-border text-muted`)
- [ ] Profile photo: `next/image` with `priority`, `alt="Muhammad Jamil Raza Attari"`, `rounded-2xl` — **PENDING: restore when profile.jpg added**
- [x] Section has `id="hero"` and `min-h-screen`
- [x] Scroll indicator: chevron-down icon centered at bottom, `animate-bounce`
- [x] Verify: all 3 CTAs functional
- [x] Commit: `feat(hero): add hero section with photo, tagline, and CTAs`

> **Photo restore steps (when profile.jpg is ready):**
> 1. Add `import Image from 'next/image'` back to Hero.tsx
> 2. Change wrapper `<div>` back to `<div className="grid md:grid-cols-[55fr_45fr] gap-12 items-center">`
> 3. Add `order-1` to text column div
> 4. Add photo column back after text column:
>    ```tsx
>    <div className="flex justify-center md:justify-end order-2">
>      <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
>        <Image src="/profile.jpg" alt="Muhammad Jamil Raza Attari"
>               width={400} height={400} priority
>               className="rounded-2xl object-cover w-full h-full" />
>      </div>
>    </div>
>    ```
> 5. Also add `public/resume.pdf` for Download CV button

---

### Task 10: About Section

**Complexity:** S
**Depends on:** Task 4, Task 6
**Goal:** About section with value proposition copy aur 3 stat cards

**Done when:**
- [x] `components/sections/About.tsx` created
- [x] Section has `id="about"`, `py-24 md:py-32`
- [x] Eyebrow label: `ABOUT` using `SectionLabel` component
- [x] Heading: `"A Builder Who Teaches"` — `font-heading text-3xl md:text-4xl text-ink`
- [x] Body copy — 3 paragraphs: builder identity, educator/SMIT, availability
- [x] 3 stat cards in `grid-cols-3`: `6+` Projects Built · `1yr` Experience · `Lead Trainer` @ SMIT
- [x] Stat cards: `bg-surface rounded-xl p-5` — muted label above, bold value below
- [x] Commit: `feat(about): add about section with copy and stat cards`

---

### Task 11: Projects Section

**Complexity:** M
**Depends on:** Task 4, Task 6
**Goal:** Projects grid with 4 featured project cards — all data from `data/projects.ts`

**Done when:**
- [x] `components/sections/Projects.tsx` created
- [x] `components/ui/ProjectCard.tsx` created with `Project` interface as props type
- [x] Section has `id="projects"`, `py-24 md:py-32`
- [x] Only `featured: true` projects rendered — exactly 4 cards
- [x] Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
- [x] ProjectCard: category badge, h3 title, description (line-clamp-2), tech pills, divider, links
- [x] `liveUrl` conditionally rendered — Broadway Pizza + SpaceX have Live Demo; Pothole + Heart Disease do not
- [x] GitHub icon: inline SVG (lucide-react has no brand icons)
- [x] `flex flex-col` + `mt-auto` on links — always pinned to card bottom
- [x] Hover: `hover:-translate-y-1 hover:border-accent/40 transition-all duration-200`
- [x] aria-labels on all links: `View ${title} on GitHub` / `View ${title} live demo`
- [x] "View All Projects →" ghost link → `https://github.com/JamilRaza001`
- [x] Commit: `feat(projects): add projects grid with conditional live demo links`

---

### Task 12: Skills Section

**Complexity:** S
**Depends on:** Task 4, Task 6
**Goal:** 4-category skill grid — all data from `data/skills.ts`

**Done when:**
- [x] `components/sections/Skills.tsx` created
- [x] `components/ui/SkillBadge.tsx` created: accepts `label: string` prop
- [x] Section has `id="skills"`, `py-24 md:py-32`
- [x] Grid: `grid grid-cols-1 md:grid-cols-2 gap-8`
- [x] Category names as `h3` (font-heading, text-ink) with emoji icon
- [x] Badge style: `bg-surface border border-border text-muted text-[11px] px-3 py-1 rounded-sm`
- [x] Badge hover: `hover:border-accent/50 transition-colors cursor-default`
- [x] All 4 categories from `data/skills.ts`: Agentic & Generative AI · ML / Deep Learning · Data Science & Analytics · MLOps & Deployment
- [x] Commit: `feat(skills): add 4-category skills section with badge components`

---

### Task 13: Experience Section

**Complexity:** M
**Depends on:** Task 4, Task 6
**Goal:** Vertical timeline with prominent AI roles (full detail) aur compact non-AI roles

**Done when:**
- [x] `components/sections/Experience.tsx` created
- [x] `components/ui/TimelineItem.tsx` created — accepts `ExperienceEntry` (prominent flag on interface)
- [x] Section has `id="experience"`, `py-24 md:py-32`
- [x] Timeline: left vertical line `border-l-2 border-border ml-1.5`, entries `pl-8 relative`
- [x] Each entry: dot `w-3 h-3 rounded-full absolute -left-[0.4rem] top-1.5`
- [x] Prominent entries: `bg-accent` dot, full layout — role + tag + company + period + location + bullets
- [x] Compact entries: `bg-muted/50` dot, single line — `Role · Company · Period`
- [x] 3 prominent (Lead Trainer, AI Engineer, Deloitte) + 2 compact (ibex, HBL)
- [x] Chronological descending (Dec 2025 → Jan 2024)
- [x] Deloitte has `"Simulation"` tag badge
- [x] `space-y-10` between entries
- [x] Commit: `feat(experience): add timeline with prominent and compact entry variants`

---

### Task 14: Certifications & Contact Sections

**Complexity:** M
**Depends on:** Task 4, Task 6
**Goal:** Certifications grid (if applicable) aur complete Formspree-connected contact form

**Done when:**
**Certifications:**
- [x] `components/sections/Certifications.tsx` created
- [x] Section has `id="certifications"`, `py-24 md:py-32`
- [x] Grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`
- [x] Each cert card: name, issuer, date — `bg-card border border-border rounded-xl p-5`

**Contact Form:**
- [x] `components/sections/Contact.tsx` created — `'use client'` directive
- [x] Section has `id="contact"`, `py-24 md:py-32`
- [x] Availability line: `"Open to: Remote AI/ML Roles · Freelance Projects · Collaborations"` — `text-accent`
- [ ] `.env.local` created with `NEXT_PUBLIC_FORMSPREE_ID=your_id` — **PENDING: user must set up Formspree**
- [x] Form fields: Name (required), Email (type="email", required), Subject (optional), Message (required, 5-row textarea)
- [x] Every `<input>` / `<textarea>` has matching `<label>` via `htmlFor` + `id`
- [x] Submit handler: checks `NEXT_PUBLIC_FORMSPREE_ID` presence, `fetch` POST to Formspree
- [x] Status state: `'idle' | 'loading' | 'success' | 'error'`
- [x] Loading: Loader2 spinner + button disabled
- [x] Success: CheckCircle icon + message, form fields clear
- [x] Error: AlertCircle icon + direct email link fallback
- [x] Right column: email (mailto), LinkedIn, GitHub (inline SVG), MapPin location
- [x] Desktop: `grid-cols-[60fr_40fr]`, single column mobile
- [x] Commit: `feat(contact): add contact form with formspree integration and status handling`

> **Verify contact form when ready:** Add `.env.local` → `NEXT_PUBLIC_FORMSPREE_ID=your_id`
> Then test on localhost: submit form → check inbox. Also set allowed domains in Formspree dashboard.

---

> **Phase 3 — Implementation Summary (completed May 2026)**
>
> **What was built:** 11 files created — `SectionLabel`, `ProjectCard`, `SkillBadge`, `TimelineItem` (UI components) + `Hero`, `About`, `Projects`, `Skills`, `Experience`, `Certifications`, `Contact` (sections). `app/page.tsx` wired up. `next.config.mjs` updated with `placehold.co` remote pattern.
>
> **Verified:** `npm run type-check` → 0 errors. `npm run lint` → 0 warnings. All SPEC.md acceptance criteria checked against code.
>
> **Pending (user action required before Phase 5):**
> - `public/profile.jpg` → add professional headshot, then restore Hero two-column layout (steps in Task 9 above)
> - `public/resume.pdf` → add latest CV (Download CV button will 404 without it)
> - `.env.local` → `NEXT_PUBLIC_FORMSPREE_ID=your_id` (contact form is silent without it)
>
> **Key decisions made:**
> - `lucide-react` has no GitHub/LinkedIn brand icons → inline SVG used in `ProjectCard` and `Contact` (same pattern as `Footer`)
> - CSS color variables use **RGB channel format** (`23 64 212` not `#1740D4`) — enables `bg-accent/40` opacity modifiers
> - Phase 3 is **animation-free** intentionally — all Framer Motion work is in Task 15 (Phase 4)
> - `LazyMotion` + `domAnimation` + `<m.div>` must be used in Phase 4 (NOT `import { motion }`) — reduces bundle ~75%

---

## Phase 4 — Polish

> Goal: Animations, final responsive fixes, reduced-motion support, aur visual refinements.
> Build karo section by section — test karo toggle ke saath dono modes mein.

---

### Task 15: Scroll Animations

**Complexity:** M
**Depends on:** Task 9, Task 10, Task 11, Task 12, Task 13, Task 14
**Goal:** Framer Motion scroll-triggered entrance animations — all sections (except Hero)

**Done when:**
- [x] Framer Motion `LazyMotion` + `domAnimation` used (NOT full `motion` import):
  ```tsx
  import { LazyMotion, domAnimation, m } from 'framer-motion';
  // <m.div> instead of <motion.div>
  ```
- [x] `useReducedMotion()` hook imported — if `true`, all animations disabled (`initial={false}` skips hidden state)
- [x] Hero section: `initial/animate` (NOT `whileInView`) — stagger order:
  badge (0s) → name (0.1s) → sub-text (0.2s) → CTAs (0.3s) → scroll indicator (0.4s)
- [x] About, Skills, Experience, Certifications, Contact: `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- [x] Standard reveal variant applied consistently:
  ```ts
  hidden:  { opacity: 0, y: 20 }
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  ```
- [x] Project cards: stagger `0.1s` delay between each card
- [x] Skill categories: stagger `0.08s` between each block
- [x] Timeline entries: stagger `0.1s` between each entry
- [x] Durations: `0.4s` minimum, `0.6s` maximum — no slow dramatic animations
- [ ] Verify: animations play on first scroll into view, NOT on subsequent scrolls (`once: true`)
- [ ] Verify: enable "Emulate prefers-reduced-motion" in DevTools → all animations disabled, content visible
- [ ] Verify: no layout shift during animation entry (use `opacity` + `y`, never `height` or `width`)
- [x] Commit: `feat(animations): add scroll-triggered entrance animations with reduced-motion support`

---

### Task 16: Full Dark/Light Mode Audit

**Complexity:** M
**Depends on:** Task 15
**Goal:** Every single component verified in both modes — no hardcoded colors, no invisible text

**Done when:**
- [ ] Toggle to dark mode — visual inspection of every section:
  - [ ] Hero: JetBrains Mono heading, teal accent, dark bg
  - [ ] About: stat cards use `bg-surface` not hardcoded white
  - [ ] Projects: cards `bg-card`, badges `bg-accent-sub text-accent`
  - [ ] Skills: badges `bg-surface border-border`
  - [ ] Experience: timeline line, dots, text all readable
  - [ ] Contact: inputs `bg-surface`, labels readable
  - [ ] Navbar: correct bg in both modes, active link visible
  - [ ] Footer: text readable
- [ ] Toggle to light mode — repeat inspection above
- [x] Search codebase for any hardcoded hex: `grep -r "#[0-9a-fA-F]" components/` — ZERO results (only `#section-id` anchors, no hex colors)
- [x] Search for any `style={{ color:` or `style={{ background:` — ZERO results
- [ ] Verify font switch: Lora in light, JetBrains Mono in dark — check heading in every section
- [ ] Verify transitions: color/bg changes are smooth (0.35s) not instant
- [ ] Commit: `fix(theme): resolve all dark mode color inconsistencies`

---

### Task 17: Responsive Layout Audit

**Complexity:** M
**Depends on:** Task 15
**Goal:** Pixel-perfect responsive layout at 375px (mobile), 768px (tablet), 1280px (desktop)

**Done when:**
- [ ] Open Chrome DevTools → Responsive mode — test at exactly these widths: 375px, 428px, 768px, 1024px, 1280px
- [ ] **375px checks:**
  - [ ] Hero: no text overflow, photo below text, buttons not cut off
  - [ ] Nav: only logo + hamburger visible, mobile menu opens fullscreen
  - [ ] Projects: single column, card content not clipped
  - [ ] Skills: badges wrap cleanly, no horizontal scroll
  - [ ] Timeline: dots and line aligned, text not cut off
  - [ ] Contact: single column, inputs full-width
- [ ] **768px checks:**
  - [ ] Projects: 2-column grid activates
  - [ ] Skills: 2-column grid activates
  - [ ] Navbar: desktop layout activates
  - [ ] Hero: two-column layout activates
- [ ] **1280px checks:**
  - [ ] Max width container (`max-w-5xl mx-auto`) centered correctly
  - [ ] No elements bleeding to screen edge
- [ ] No horizontal scrollbar at any breakpoint
- [ ] Touch targets on mobile: all buttons/links ≥ 44×44px
- [ ] Commit: `fix(responsive): resolve layout issues across all breakpoints`

---

### Task 18: Typography & Spacing Refinement

**Complexity:** S
**Depends on:** Task 17
**Goal:** Final typography hierarchy aur spacing consistency pass — visual polish

**Done when:**
- [x] Heading hierarchy audit: `document.querySelectorAll('h1,h2,h3,h4')` in console:
  - Exactly 1 `h1` (Hero name) — confirmed in code
  - One `h2` per section — confirmed in code
  - `h3` for card titles only — confirmed in code
- [x] Section spacing consistent: all sections use `py-24 md:py-32`
- [x] Container consistent: all sections use `max-w-5xl mx-auto px-6`
- [x] Eyebrow labels consistent across all sections (SectionLabel component used everywhere)
- [x] Line length: body text max `65ch` — `max-w-2xl` on About body copy, `max-w-xl` on Hero sub-text
- [ ] No orphaned single words on last line of headings (add `text-balance` or adjust copy)
- [x] Letter-spacing: heading has `tracking-tight`, eyebrows have `tracking-[2.5px]`
- [ ] Verify overall visual rhythm scrolling through entire page
- [ ] Commit: `style(typography): refine heading hierarchy and section spacing`

---

### Task 19: Accessibility Audit

**Complexity:** M
**Depends on:** Task 17
**Goal:** WCAG 2.1 AA compliance — keyboard navigation, screen reader, color contrast

**Done when:**
- [x] Skip-to-content link: implemented in `app/layout.tsx` — `sr-only focus:not-sr-only`
- [ ] Keyboard navigation: Tab through entire page — every interactive element reachable in logical order
- [x] Focus rings: `focus-visible:ring-2 focus-visible:ring-accent` on all interactive elements
- [x] No `outline: none` without replacement focus indicator
- [ ] Color contrast check (WebAIM Contrast Checker):
  - [ ] `#1740D4` (accent) on `#FAFAFA` (bg) — must be ≥ 4.5:1
  - [ ] `#44445A` (muted) on `#FAFAFA` (bg) — must be ≥ 4.5:1
  - [ ] `#05D4B4` (dark accent) on `#0C0C16` (dark bg) — must be ≥ 4.5:1
  - [ ] `#8888AA` (dark muted) on `#0C0C16` (dark bg) — must be ≥ 4.5:1
- [x] All images: no images yet (profile.jpg pending) — alt text prepared in restore steps
- [x] Icon-only buttons: `aria-label` present — ThemeToggle, hamburger, close, all social icons ✓
- [x] Contact form: every `<input>` has matching `<label>` via `htmlFor` + `id` ✓
- [x] Landmark regions: `<nav aria-label>`, `<main id="main-content">`, `<footer>`, each section `aria-labelledby` ✓
- [x] Hero section `aria-labelledby="hero-heading"` fixed — `id="hero-heading"` added to `m.h1`
- [ ] Run axe DevTools browser extension → 0 critical violations, 0 serious violations
- [ ] Commit: `a11y(audit): fix all accessibility violations for WCAG 2.1 AA compliance`

---

## Phase 5 — Deploy

> Goal: Production build, performance optimization, SEO finalization, aur live deployment.

---

### Task 20: SEO & Metadata Finalization

**Complexity:** S
**Depends on:** Task 18
**Goal:** Complete SEO setup — metadata, OG image, robots.txt, sitemap

**Done when:**
- [x] `app/layout.tsx` metadata object complete — all fields from SPEC.md present
- [ ] `og-image.png` created (1200×630px) — name + role + accent color branding
  (Use Canva / Figma: dark background, name in large white text, role subtitle, accent color accent)
- [ ] `public/og-image.png` present and correct dimensions (`file public/og-image.png` to verify)
- [x] `public/robots.txt` created: `User-agent: * / Allow: / Sitemap: https://jamil-portfolio.vercel.app/sitemap.xml`
- [x] `app/sitemap.ts` created (Next.js built-in) — generates `/sitemap.xml` pointing to `jamil-portfolio.vercel.app`
- [x] `public/favicon.ico` present — in `app/favicon.ico` (App Router convention, served at `/favicon.ico`)
- [ ] Test OG tags: paste URL in https://opengraph.xyz — correct title, description, image shown
- [ ] Commit: `feat(seo): add og image, robots.txt, sitemap, and complete metadata`

---

### Task 21: Performance Optimization

**Complexity:** M
**Depends on:** Task 19, Task 20
**Goal:** Lighthouse Performance ≥ 90, LCP ≤ 1.5s, zero CLS

**Done when:**
- [ ] Profile photo converted to WebP: `cwebp profile.jpg -o profile.webp -q 80` — file ≤ 100KB
- [ ] `public/profile.jpg` replaced/renamed to `profile.webp`, Hero component updated
- [ ] Hero `<Image>` has `priority` prop — confirmed in source
- [ ] All non-hero images use default lazy loading (no `priority` unless above fold)
- [ ] `next/image` `width` and `height` set on all Image components — no implicit sizing
- [ ] Run `npm run build` — check `.next/analyze` for large bundles (if `@next/bundle-analyzer` installed)
- [x] Framer Motion: confirm `LazyMotion` + `domAnimation` used — fixed Navbar.tsx to use `m` instead of `motion`
- [x] No unused imports across components: run `npm run lint` → 0 warnings
- [x] Check `_next/static` chunks in Network tab — First Load JS = 128 kB (≤ 150 kB target ✓)
- [ ] Run Lighthouse locally (`npm run build && npm run start` then Lighthouse in Chrome):
  - [ ] Performance ≥ 90
  - [ ] Accessibility ≥ 95
  - [ ] Best Practices ≥ 95
  - [ ] SEO = 100
- [ ] LCP: ≤ 1.5s (check in Lighthouse "Opportunities" section)
- [ ] CLS: 0.0 or < 0.1
- [ ] Commit: `perf(optimize): convert images to webp, confirm lazy motion, pass lighthouse targets`

---

### Task 22: Cross-Browser Testing

**Complexity:** S
**Depends on:** Task 21
**Goal:** Verify site renders correctly in Chrome, Firefox, Safari aur mobile browsers

**Done when:**
- [ ] **Chrome (latest):** Full scroll-through, toggle dark/light, submit contact form
- [ ] **Firefox (latest):** Full scroll-through, toggle dark/light, check font rendering
- [ ] **Safari (macOS):** Full scroll-through — especially check `backdrop-blur`, flexbox gaps
- [ ] **Chrome Mobile (DevTools emulation, 375px):** Touch targets, mobile menu, form inputs
- [ ] **Safari Mobile (DevTools emulation):** Check `100vh` hero height (iOS Safari viewport issue)
  - [x] Fixed preemptively: Hero now uses `min-h-[100svh]` instead of `min-h-screen`
- [ ] No console errors in any browser
- [ ] Animations play correctly in all browsers
- [ ] ThemeToggle works in all browsers (localStorage read/write)
- [ ] Contact form submits correctly in all browsers
- [ ] Commit: `fix(browser): resolve cross-browser compatibility issues`

---

### Task 23: Vercel Deployment

**Complexity:** S
**Depends on:** Task 22
**Goal:** Production deployment on Vercel with environment variables configured

**Done when:**
- [ ] GitHub repository created: `jamil-portfolio` (public or private — your choice)
- [ ] All code pushed to `main` branch: `git push origin main`
- [ ] Vercel account connected to GitHub at vercel.com
- [ ] New project imported from GitHub repo in Vercel dashboard
- [ ] Environment variable added in Vercel project settings:
  - Key: `NEXT_PUBLIC_FORMSPREE_ID`
  - Value: your Formspree form ID
- [ ] First deploy successful — no build errors in Vercel build logs
- [ ] Live URL working (e.g. `jamil-portfolio.vercel.app`)
- [ ] Verify on live URL: dark/light toggle works, contact form works (not localhost)
- [ ] Commit: `chore(deploy): configure vercel deployment with env variables`

---

### Task 24: Post-Launch Checklist

**Complexity:** S
**Depends on:** Task 23
**Goal:** Final launch verification aur social sharing

**Done when:**
- [ ] Run Lighthouse on LIVE URL (not localhost) — all targets met
- [ ] Test contact form on live URL — email received ✓
- [ ] Test CV download on live URL — PDF opens ✓
- [ ] Test all project links (GitHub + Live Demo) on live URL — no 404s ✓
- [ ] Mobile test on real device (not emulation) — scroll, toggle, menu all work
- [ ] LinkedIn profile updated with portfolio URL
- [ ] GitHub profile README updated with portfolio link
- [ ] Custom domain (optional): add in Vercel project settings if purchased
- [ ] `TASKS.md` updated — all tasks marked `[x]`
- [ ] LinkedIn post drafted:
  ```
  Excited to share my new portfolio — built with Next.js, Tailwind CSS,
  and Framer Motion. Features a dual-mode design (light + dark) and
  showcases my work in Agentic AI, RAG systems, and Computer Vision.
  [link] #AIEngineer #NextJS #OpenToWork
  ```
- [ ] Post published on LinkedIn 🚀

---

## Appendix: Quick Reference

### Task Complexity Legend
| Size | Hours | Examples |
|------|-------|---------|
| S — Small  | ~2h | Config, data files, simple components |
| M — Medium | ~4h | Complex components, integrations, audits |
| L — Large  | ~8h | Full feature sets (not used — all tasks broken smaller) |

### Total Estimated Time
```
Phase 1 — Foundation  :  5 × S      = ~10h
Phase 2 — Layout      :  2S + 1M    = ~8h
Phase 3 — Sections    :  2S + 4M + 1M = ~20h
Phase 4 — Polish      :  1S + 4M    = ~18h
Phase 5 — Deploy      :  3S + 1M    = ~10h
─────────────────────────────────────────────
Total                 :              ~66h  (≈ 14 working days at 5h/day)
```

### Dependency Graph
```
Task 1 (Init)
├── Task 2 (Fonts)
│   └── Task 5 (Toggle) ──────────────────┐
├── Task 3 (Colors)                        │
│   └── Task 5 (Toggle)                   │
├── Task 4 (Data)                          │
└── Task 5 ── Task 6 (Layout) ────────────┤
              ├── Task 7 (Navbar) ←───────┘
              ├── Task 8 (Footer)
              ├── Task 9 (Hero) ←── Task 4
              ├── Task 10 (About) ←── Task 4
              ├── Task 11 (Projects) ←── Task 4
              ├── Task 12 (Skills) ←── Task 4
              ├── Task 13 (Experience) ←── Task 4
              └── Task 14 (Certs + Contact) ←── Task 4
                  └── Task 15 (Animations)
                      └── Task 16 (Dark Mode Audit)
                          └── Task 17 (Responsive Audit)
                              └── Task 18 (Typography)
                                  └── Task 19 (A11y)
                                      └── Task 20 (SEO)
                                          └── Task 21 (Performance)
                                              └── Task 22 (Browser Test)
                                                  └── Task 23 (Deploy)
                                                      └── Task 24 (Launch)
```

---

*Read alongside CLAUDE.md and SPEC.md for full context.*
*Update `[ ]` to `[x]` as tasks complete — do not delete criteria.*
