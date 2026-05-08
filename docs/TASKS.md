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
| Phase 1 — Foundation  | 5 tasks | 0/5 |
| Phase 2 — Layout      | 3 tasks | 0/3 |
| Phase 3 — Sections    | 7 tasks | 0/7 |
| Phase 4 — Polish      | 5 tasks | 0/5 |
| Phase 5 — Deploy      | 4 tasks | 0/4 |
| **Total**             | **24 tasks** | **0/24** |

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
- [ ] `next dev` runs without errors at `localhost:3000`
- [ ] TypeScript strict mode enabled in `tsconfig.json` (`"strict": true`)
- [ ] `@/` path alias working — `import X from '@/components/X'` resolves correctly
- [ ] `tailwind.config.ts` has `content` array covering `./app/**` and `./components/**`
- [ ] ESLint config present, `npm run lint` runs without errors
- [ ] `lib/utils.ts` created with `cn()` helper:
  ```ts
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
  ```
- [ ] `.gitignore` includes `.env.local`
- [ ] Git initialized, initial commit made: `chore: initialize next.js portfolio project`
- [ ] Default Next.js boilerplate (page.tsx content, globals.css defaults) wiped clean

---

### Task 2: Font System Setup

**Complexity:** S
**Depends on:** Task 1
**Goal:** Charo fonts load karo via `next/font` aur CSS variables ke through accessible banao

**Done when:**
- [ ] `app/fonts.ts` file created with all 4 font declarations:
  - `lora` → variable `--font-heading-light`
  - `outfit` → variable `--font-body-light`
  - `jetbrainsMono` → variable `--font-heading-dark`
  - `dmSans` → variable `--font-body-dark`
- [ ] All fonts use `display: 'swap'`
- [ ] All 4 font variables injected on `<html>` tag in `app/layout.tsx`
- [ ] `globals.css` defines:
  ```css
  :root  { --font-heading: var(--font-heading-light); --font-body: var(--font-body-light); }
  .dark  { --font-heading: var(--font-heading-dark);  --font-body: var(--font-body-dark);  }
  ```
- [ ] `tailwind.config.ts` extends `fontFamily`:
  ```ts
  fontFamily: { heading: ['var(--font-heading)'], body: ['var(--font-body)'] }
  ```
- [ ] Verify: add temp `<h1 className="font-heading">Test</h1>` — Lora renders in browser
- [ ] Verify: add `.dark` class to `<html>` manually — JetBrains Mono renders for h1
- [ ] Temp test elements removed after verification
- [ ] Commit: `feat(fonts): add dual-mode font system via next/font`

---

### Task 3: Color Token System

**Complexity:** S
**Depends on:** Task 1
**Goal:** Full color token system in CSS variables aur Tailwind custom colors — koi hardcoded hex allowed nahi

**Done when:**
- [ ] `app/globals.css` has complete `:root` block (light mode):
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
- [ ] `globals.css` has complete `.dark` block (dark mode):
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
- [ ] `tailwind.config.ts` `extend.colors` maps all 8 tokens to CSS variables
- [ ] `globals.css` base layer has:
  ```css
  body { background-color: var(--color-bg); color: var(--color-ink); }
  * { transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease; }
  ```
- [ ] Verify: `<div className="bg-bg text-ink">` renders with correct light colors
- [ ] Verify: toggle `.dark` on `<html>` — colors switch correctly
- [ ] Commit: `feat(tokens): add full color token system for dual-mode theme`

---

### Task 4: Data Layer Setup

**Complexity:** S
**Depends on:** Task 1
**Goal:** Saara static content TypeScript data files mein move karo — koi hardcoded strings JSX mein nahi

**Done when:**
- [ ] `data/projects.ts` created with `Project` interface and all 6 projects:
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
- [ ] `data/skills.ts` created with `SkillCategory` interface and 4 categories:
  ```ts
  export interface SkillCategory { name: string; icon: string; skills: string[]; }
  ```
  (Agentic AI · ML/DL · Data Science · MLOps)
- [ ] `data/experience.ts` created with `ExperienceEntry` interface and all 5 entries:
  ```ts
  export interface ExperienceEntry {
    role: string; company: string; period: string;
    location: string; bullets?: string[]; prominent: boolean;
  }
  ```
- [ ] `data/certifications.ts` created with `Certification` interface and entries
- [ ] All data files export typed arrays — no `any`
- [ ] `npm run type-check` passes with no errors
- [ ] Commit: `feat(data): add typed data layer for all portfolio content`

---

### Task 5: Theme Toggle Logic

**Complexity:** S
**Depends on:** Task 2, Task 3
**Goal:** Working ThemeToggle component with localStorage persistence, system preference fallback, aur zero flash on reload

**Done when:**
- [ ] `app/layout.tsx` `<head>` mein flash-prevention inline script present hai:
  ```tsx
  <script dangerouslySetInnerHTML={{ __html: `
    const t = localStorage.getItem('theme');
    const d = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', d);
  `}} />
  ```
- [ ] `components/ui/ThemeToggle.tsx` created — `'use client'` directive present
- [ ] Toggle uses `mounted` state to prevent hydration mismatch:
  ```ts
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); ... }, []);
  if (!mounted) return <div className="w-9 h-9" />;
  ```
- [ ] Click handler: toggles `.dark` on `document.documentElement` AND saves to `localStorage`
- [ ] Light mode: Moon icon (`lucide-react`) shown
- [ ] Dark mode: Sun icon shown
- [ ] Button has `aria-label="Toggle dark mode"` / `"Toggle light mode"` dynamically
- [ ] Verify: switch to dark, refresh page — dark mode persists (no flash)
- [ ] Verify: clear localStorage, reload — system preference applied
- [ ] Verify: font switches — Lora in light, JetBrains Mono in dark (add temp h1 to test)
- [ ] Commit: `feat(theme): add theme toggle with localStorage persistence and flash prevention`

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
- [ ] `app/layout.tsx` has:
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
- [ ] `app/page.tsx` has `<main id="main-content">` wrapping all section placeholders
- [ ] Section placeholders added with correct IDs:
  `#hero` `#about` `#projects` `#skills` `#experience` `#certifications` `#contact`
- [ ] `<body>` has `font-body` class applied as default body font
- [ ] `npm run build` completes without errors or warnings
- [ ] Commit: `feat(layout): add root layout with metadata, skip link, and page structure`

---

### Task 7: Navbar Component

**Complexity:** M
**Depends on:** Task 5, Task 6
**Goal:** Sticky responsive navbar — desktop links + mobile hamburger menu + ThemeToggle + active section tracking

**Done when:**
- [ ] `components/layout/Navbar.tsx` created
- [ ] Desktop layout: logo left (`JRA` in `font-heading text-accent`) · nav links center-right · ThemeToggle rightmost
- [ ] Nav links: `Projects · Experience · Skills · Contact` — smooth scroll on click
- [ ] Navbar is sticky: `fixed top-0 w-full z-50`
- [ ] Background: `bg-bg/80 backdrop-blur-sm` at all times
- [ ] Border bottom `border-b border-border` appears after 20px scroll (JS scroll event listener in `useEffect`)
- [ ] Mobile (< 768px): logo + hamburger icon only — nav links hidden
- [ ] Mobile hamburger click: full-screen overlay opens with all nav links stacked
- [ ] Overlay: `bg-bg`, links `text-2xl font-heading`, close button (X icon) top-right
- [ ] Overlay open: `document.body.style.overflow = 'hidden'` — scroll locked
- [ ] Overlay close: on link click, ESC key, or outside tap
- [ ] `useEffect` cleanup removes overflow lock
- [ ] Active section tracking: `IntersectionObserver` on each section ID — active link has `text-ink border-b border-accent`
- [ ] Overlay animation: Framer Motion `AnimatePresence` with slide or fade
- [ ] `<nav>` has `aria-label="Main navigation"`
- [ ] All links keyboard-focusable with visible focus ring
- [ ] Verify: desktop links scroll correctly to each section
- [ ] Verify: mobile menu opens, link clicked, menu closes, section scrolled to
- [ ] Commit: `feat(navbar): add responsive navbar with mobile menu and active section tracking`

---

### Task 8: Footer Component

**Complexity:** S
**Depends on:** Task 6
**Goal:** Simple footer with social links, copyright, aur "Open to work" status badge

**Done when:**
- [ ] `components/layout/Footer.tsx` created
- [ ] Content: copyright line + GitHub / LinkedIn / Email icon links
- [ ] "Open to remote work" green dot + text — small status badge
- [ ] Icons: Lucide React `Github`, `Linkedin`, `Mail`
- [ ] All icon links: `aria-label` present (e.g. `"Visit GitHub profile"`)
- [ ] All links: `target="_blank" rel="noopener noreferrer"`
- [ ] Footer added to `app/page.tsx` below `<main>`
- [ ] Responsive: stacked on mobile, row on desktop
- [ ] Commit: `feat(footer): add footer with social links and availability badge`

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
- [ ] `components/sections/Hero.tsx` created
- [ ] `public/profile.jpg` present (professional headshot)
- [ ] `public/resume.pdf` present (latest CV)
- [ ] Layout: two-column desktop (text 55% / photo 45%), single-column stacked mobile
- [ ] Eyebrow badge: `AI / ML ENGINEER · KARACHI, PK` — `font-body text-[9px] tracking-[2.5px] uppercase text-accent bg-accent-sub`
- [ ] Heading: `"I Build Intelligent AI Systems — and Teach Others to Do the Same"` — `font-heading text-5xl md:text-7xl font-medium tracking-tight text-ink`
- [ ] Sub-text: `"Specialized in Agentic AI, RAG Pipelines & Computer Vision. Open to remote roles, freelance, and collaborations."` — `font-body text-base text-muted`
- [ ] CTA buttons (3):
  - `View Projects` → smooth scroll to `#projects` (primary: `bg-accent text-white`)
  - `Download CV` → `/resume.pdf` new tab (outlined: `border-accent text-accent`)
  - `GitHub ↗` → `https://github.com/JamilRaza001` (ghost: `border-border text-muted`)
- [ ] Profile photo: `next/image` with `priority`, `alt="Muhammad Jamil Raza Attari"`, `rounded-2xl`
- [ ] Section has `id="hero"` and `min-h-screen`
- [ ] Mobile: photo appears below text, buttons stack if needed
- [ ] Scroll indicator: chevron-down icon centered at bottom, `animate-bounce`
- [ ] Verify: all 3 CTAs functional
- [ ] Verify: renders correctly at 375px, 768px, 1280px
- [ ] Commit: `feat(hero): add hero section with photo, tagline, and CTAs`

---

### Task 10: About Section

**Complexity:** S
**Depends on:** Task 4, Task 6
**Goal:** About section with value proposition copy aur 3 stat cards

**Done when:**
- [ ] `components/sections/About.tsx` created
- [ ] Section has `id="about"`, `py-24 md:py-32`
- [ ] Eyebrow label: `ABOUT` using `SectionLabel` pattern (`font-body text-[9px] tracking-[2.5px] uppercase text-muted`)
- [ ] Heading: `font-heading text-3xl md:text-4xl text-ink`
- [ ] Body copy (max 4 sentences) — exact copy from SPEC.md:
  - Builder identity sentence
  - Educator/SMIT sentence
  - Availability sentence ("Open to remote AI/ML roles...")
- [ ] 3 stat cards in `grid-cols-3` row below copy:
  - `6+` / Projects Built
  - `1yr` / Experience
  - `Lead Trainer` / @ SMIT
- [ ] Stat cards: `bg-surface rounded-xl p-5` — muted label (13px) above, bold value (24px) below
- [ ] Layout: copy full-width, stats grid below
- [ ] Responsive: stats stack to `grid-cols-1` or maintain 3-col on mobile (smaller text)
- [ ] Verify: copy readable on both light and dark mode
- [ ] Commit: `feat(about): add about section with copy and stat cards`

---

### Task 11: Projects Section

**Complexity:** M
**Depends on:** Task 4, Task 6
**Goal:** Projects grid with 4 featured project cards — all data from `data/projects.ts`

**Done when:**
- [ ] `components/sections/Projects.tsx` created
- [ ] `components/ui/ProjectCard.tsx` created with `Project` interface as props type
- [ ] Section has `id="projects"`, `py-24 md:py-32`
- [ ] Only `featured: true` projects rendered (filtered via `.filter(p => p.featured)`)
- [ ] Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
- [ ] Each `ProjectCard` contains:
  - Category badge: `bg-accent-sub text-accent text-[9px] tracking-[1.5px] uppercase font-body`
  - Title: `font-heading text-lg font-medium text-ink`
  - Description: `font-body text-sm text-muted leading-relaxed` (max 2 lines)
  - Tech stack: `flex flex-wrap gap-2` of pills — `bg-surface border border-border text-muted text-[10px] px-2.5 py-0.5 rounded-sm`
  - Divider: `border-t border-border mt-auto pt-4`
  - Links row: `Live Demo ↗` (only if `liveUrl` exists) + `GitHub` (always present)
- [ ] `liveUrl` is conditionally rendered — no broken/empty button if undefined
- [ ] Cards use `flex flex-col` so links always at bottom regardless of content height
- [ ] "View All Projects →" ghost link below grid → `https://github.com/JamilRaza001`
- [ ] Hover state on cards: `hover:-translate-y-1 hover:border-accent/40 transition-all duration-200`
- [ ] Verify: exactly 4 cards shown
- [ ] Verify: Broadway Pizza and SpaceX show "Live Demo" button; Pothole and Heart Disease do not
- [ ] Verify: grid collapses to single column at 375px
- [ ] Commit: `feat(projects): add projects grid with conditional live demo links`

---

### Task 12: Skills Section

**Complexity:** S
**Depends on:** Task 4, Task 6
**Goal:** 4-category skill grid — all data from `data/skills.ts`

**Done when:**
- [ ] `components/sections/Skills.tsx` created
- [ ] `components/ui/SkillBadge.tsx` created: accepts `label: string` prop
- [ ] Section has `id="skills"`, `py-24 md:py-32`
- [ ] Grid: `grid grid-cols-1 md:grid-cols-2 gap-8`
- [ ] Each category block:
  - Category name: `font-heading text-base font-medium text-ink` with icon (text emoji or Lucide)
  - Skills: `flex flex-wrap gap-2 mt-3`
  - Each badge: `bg-surface border border-border text-muted text-[11px] px-3 py-1 rounded-sm font-body`
  - Badge hover: `hover:border-accent/50 transition-colors cursor-default`
- [ ] All 4 categories present: Agentic & Generative AI · ML / Deep Learning · Data Science & Analytics · MLOps & Deployment
- [ ] Verify: all skills from `data/skills.ts` render correctly
- [ ] Verify: badges wrap cleanly at narrow widths
- [ ] Commit: `feat(skills): add 4-category skills section with badge components`

---

### Task 13: Experience Section

**Complexity:** M
**Depends on:** Task 4, Task 6
**Goal:** Vertical timeline with prominent AI roles (full detail) aur compact non-AI roles

**Done when:**
- [ ] `components/sections/Experience.tsx` created
- [ ] `components/ui/TimelineItem.tsx` created — accepts `ExperienceEntry` + `prominent: boolean`
- [ ] Section has `id="experience"`, `py-24 md:py-32`
- [ ] Timeline: left vertical line `border-l-2 border-border ml-4`, entries relative to line
- [ ] Each entry: dot on line (`w-3 h-3 rounded-full absolute -left-[1.625rem]`)
- [ ] Prominent entries (`prominent: true`): accent dot (`bg-accent`), full layout:
  - Role (font-heading, text-ink) + Company (text-accent) + Period + Location
  - Bullet points with impact statements
- [ ] Compact entries (`prominent: false`): muted dot (`bg-muted/50`), single line:
  - Role · Company · Period — `font-body text-sm text-muted`
- [ ] Entries in chronological descending order (newest first)
- [ ] Deloitte entry: labeled `"Simulation"` tag — not misleading as full employment
- [ ] `space-y-10` between entries
- [ ] Verify: 3 prominent + 2 compact entries rendered
- [ ] Verify: visual hierarchy clear — prominent entries draw eye first
- [ ] Commit: `feat(experience): add timeline with prominent and compact entry variants`

---

### Task 14: Certifications & Contact Sections

**Complexity:** M
**Depends on:** Task 4, Task 6
**Goal:** Certifications grid (if applicable) aur complete Formspree-connected contact form

**Done when:**
**Certifications:**
- [ ] `components/sections/Certifications.tsx` created
- [ ] Section has `id="certifications"`, `py-24 md:py-32`
- [ ] Grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`
- [ ] Each cert card: name, issuer, date — `bg-card border border-border rounded-xl p-5`

**Contact Form:**
- [ ] `components/sections/Contact.tsx` created — `'use client'` directive
- [ ] Section has `id="contact"`, `py-24 md:py-32`
- [ ] Availability line explicitly present: `"Open to: Remote AI/ML Roles · Freelance Projects · Collaborations"` — `text-accent`
- [ ] `.env.local` created with `NEXT_PUBLIC_FORMSPREE_ID=your_id`
- [ ] Formspree account created at formspree.io, form ID obtained
- [ ] Form fields: Name (required), Email (required, type="email"), Subject (optional), Message (required, textarea)
- [ ] Every `<input>` / `<textarea>` has matching `<label>` — no placeholder-only labeling
- [ ] Submit handler: `fetch` POST to Formspree, `status` state: `'idle' | 'loading' | 'success' | 'error'`
- [ ] Loading state: spinner on button, button `disabled`
- [ ] Success state: checkmark icon + `"Message sent! I'll get back to you soon."` — form clears
- [ ] Error state: warning icon + `"Something went wrong. Please email me directly at jamilraza001@gmail.com"`
- [ ] Right column: email (mailto), LinkedIn, GitHub, location — with Lucide icons
- [ ] Desktop: two-column layout (form 60% / info 40%) — single column mobile
- [ ] Verify: submit form with real data → email received in inbox
- [ ] Verify: submit with empty required field → HTML5 validation fires
- [ ] Commit: `feat(contact): add contact form with formspree integration and status handling`

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
- [ ] Framer Motion `LazyMotion` + `domAnimation` used (NOT full `motion` import):
  ```tsx
  import { LazyMotion, domAnimation, m } from 'framer-motion';
  // <m.div> instead of <motion.div>
  ```
- [ ] `useReducedMotion()` hook imported — if `true`, all animations disabled (static render)
- [ ] Hero section: `initial/animate` (NOT `whileInView`) — stagger order:
  badge (0s) → name (0.1s) → sub-text (0.2s) → CTAs (0.3s) → photo (0.2s)
- [ ] About, Skills, Experience, Certifications, Contact: `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- [ ] Standard reveal variant applied consistently:
  ```ts
  hidden:  { opacity: 0, y: 20 }
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  ```
- [ ] Project cards: stagger `0.1s` delay between each card
- [ ] Skill categories: stagger `0.08s` between each block
- [ ] Timeline entries: stagger `0.1s` between each entry
- [ ] Durations: `0.4s` minimum, `0.6s` maximum — no slow dramatic animations
- [ ] Verify: animations play on first scroll into view, NOT on subsequent scrolls (`once: true`)
- [ ] Verify: enable "Emulate prefers-reduced-motion" in DevTools → all animations disabled, content visible
- [ ] Verify: no layout shift during animation entry (use `opacity` + `y`, never `height` or `width`)
- [ ] Commit: `feat(animations): add scroll-triggered entrance animations with reduced-motion support`

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
- [ ] Search codebase for any hardcoded hex: `grep -r "#[0-9a-fA-F]" components/` — ZERO results allowed
- [ ] Search for any `style={{ color:` or `style={{ background:` — ZERO results allowed
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
- [ ] Heading hierarchy audit: `document.querySelectorAll('h1,h2,h3,h4')` in console:
  - Exactly 1 `h1` (Hero name)
  - One `h2` per section
  - `h3` for card titles only
- [ ] Section spacing consistent: all sections use `py-24 md:py-32`
- [ ] Container consistent: all sections use `max-w-5xl mx-auto px-6`
- [ ] Eyebrow labels consistent across all sections (same font-size, tracking, opacity)
- [ ] Line length: body text max `65ch` on desktop (use `max-w-2xl` or `max-w-prose`)
- [ ] No orphaned single words on last line of headings (add `text-balance` or adjust copy)
- [ ] Letter-spacing: heading has `tracking-tight`, eyebrows have `tracking-[2.5px]`
- [ ] Verify overall visual rhythm scrolling through entire page
- [ ] Commit: `style(typography): refine heading hierarchy and section spacing`

---

### Task 19: Accessibility Audit

**Complexity:** M
**Depends on:** Task 17
**Goal:** WCAG 2.1 AA compliance — keyboard navigation, screen reader, color contrast

**Done when:**
- [ ] Skip-to-content link: Tab on page load → skip link visible, Enter → jumps to `#main-content`
- [ ] Keyboard navigation: Tab through entire page — every interactive element reachable in logical order
- [ ] Focus rings: visible on all focusable elements (`focus-visible:ring-2 focus-visible:ring-accent`)
- [ ] No `outline: none` without replacement focus indicator
- [ ] Color contrast check (WebAIM Contrast Checker):
  - [ ] `#1740D4` (accent) on `#FAFAFA` (bg) — must be ≥ 4.5:1
  - [ ] `#44445A` (muted) on `#FAFAFA` (bg) — must be ≥ 4.5:1
  - [ ] `#05D4B4` (dark accent) on `#0C0C16` (dark bg) — must be ≥ 4.5:1
  - [ ] `#8888AA` (dark muted) on `#0C0C16` (dark bg) — must be ≥ 4.5:1
- [ ] All images: non-empty, descriptive `alt` text
- [ ] Icon-only buttons: `aria-label` present (ThemeToggle, social icons, hamburger, close)
- [ ] Contact form: every `<input>` has matching `<label>` via `htmlFor` + `id`
- [ ] Landmark regions present: `<nav>`, `<main>`, `<footer>`, each section has `aria-labelledby`
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
- [ ] `app/layout.tsx` metadata object complete — all fields from SPEC.md present
- [ ] `og-image.png` created (1200×630px) — name + role + accent color branding
  (Use Canva / Figma: dark background, name in large white text, role subtitle, accent color accent)
- [ ] `public/og-image.png` present and correct dimensions (`file public/og-image.png` to verify)
- [ ] `public/robots.txt` created:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://your-domain.vercel.app/sitemap.xml
  ```
- [ ] `app/sitemap.ts` created (Next.js built-in):
  ```ts
  export default function sitemap() {
    return [{ url: 'https://your-domain.vercel.app', lastModified: new Date() }];
  }
  ```
- [ ] `public/favicon.ico` present (use initials "JR" or a simple icon)
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
- [ ] Framer Motion: confirm `LazyMotion` + `domAnimation` used — NOT `import { motion } from 'framer-motion'`
- [ ] No unused imports across components: run `npm run lint` → 0 warnings
- [ ] Check `_next/static` chunks in Network tab — main JS chunk ≤ 150KB gzipped
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
  - Fix if needed: use `min-h-[100svh]` instead of `min-h-screen` for hero
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
