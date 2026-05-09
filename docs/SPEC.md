
# SPEC.md — Portfolio Feature Specification
**Owner:** Muhammad Jamil Raza Attari
**Project:** Personal Portfolio Website
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion
**Last Updated:** May 2026

---

## Section Registry

| # | Section              | Priority     | Status |
|---|----------------------|--------------|--------|
| 1 | Hero Section         | Must-have    | [ ]    |
| 2 | About Section        | Must-have    | [ ]    |
| 3 | Projects Showcase    | Must-have    | [ ]    |
| 4 | Skills Section       | Must-have    | [ ]    |
| 5 | Experience Timeline  | Must-have    | [ ]    |
| 6 | Certifications       | Nice-to-have | [ ]    |
| 7 | Contact Form         | Must-have    | [ ]    |
| 8 | Navigation           | Must-have    | [ ]    |
| 9 | Dark / Light Toggle  | Must-have    | [ ]    |
|10 | Performance          | Must-have    | [ ]    |
|11 | SEO                  | Must-have    | [ ]    |
|12 | Accessibility        | Must-have    | [ ]    |

---

## Feature: Hero Section

**Priority:** Must-have

**Description:**
First impression — visitor ko 6 seconds mein yeh samajh aana chahiye: yeh kaun hai, kya karta hai,
aur next step kya hai. Teeno audiences (recruiter, local employer, freelance client) ko ek saath
hook karna hai. Profile photo authority establish karegi, tagline identity clear karegi.

### Acceptance Criteria

- Given visitor site open kare, when hero load ho, then naam, role, aur primary CTA 3 seconds ke andar
  visible hon (LCP ≤ 1.5s)
- Given hero render ho, when page load complete ho, then entrance animation (fade + slide up)
  smoothly play ho — 0.6s duration, no jank
- Given visitor "View Projects" CTA click kare, when button pressed ho, then Projects section par
  smooth scroll ho (behavior: smooth)
- Given visitor "Download CV" click kare, when button pressed ho, then resume.pdf new tab mein open ho
  ya download start ho
- Given mobile device (375px width), when hero render ho, then heading text clip ya overflow na kare,
  aur dono CTAs side-by-side ya stacked visible hon
- Given dark mode active ho, when hero render ho, then JetBrains Mono heading aur teal accent visible hon
- Given light mode active ho, when hero render ho, then Lora serif heading aur electric blue accent visible hon
- Given screen reader use ho, when hero traverse ho, then h1 mein full naam readable ho aur
  buttons ka purpose aria-label se clear ho

### Design Notes

- Full viewport height: `min-h-screen` with vertical centering
- Layout: Two-column on desktop (text left, photo right) — single column stacked on mobile
- Profile photo: `rounded-2xl`, `400×400` display size, slight drop shadow — `priority` load
- Eyebrow badge: `AI / ML ENGINEER · KARACHI, PK` — `text-[9px] tracking-[2.5px] uppercase`
  in accent-sub background
- Hero name: largest type on page — `text-5xl md:text-7xl font-heading font-medium tracking-tight`
- Tagline: `"I Build Intelligent AI Systems — and Teach Others to Do the Same"`
- Sub-text: `"Specialized in Agentic AI, RAG Pipelines & Computer Vision. Open to remote roles,
  freelance, and collaborations."` — `text-muted font-body`
- CTAs (left to right): `[View Projects]` (primary filled) · `[Download CV]` (outlined) · `[GitHub ↗]` (ghost)
- Entrance animation: staggered — badge (0s) → name (0.1s) → sub (0.2s) → CTAs (0.3s) → photo (0.2s)
- Subtle scroll indicator at bottom (chevron down, fade out on scroll)

### Technical Notes

- Component: `components/sections/Hero.tsx`
- Sub-components: none (self-contained)
- Image: `next/image` with `priority`, `width={400}`, `height={400}`, source: `public/profile.jpg`
- CV download: `<Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">`
- Animation: Framer Motion `motion.div` with `initial/animate` — NOT `whileInView` (above fold)
- LCP target: ≤ 1.5s (profile image is LCP candidate — must use `priority`)
- No API required

---

## Feature: About Section

**Priority:** Must-have

**Description:**
Trust-building section — recruiter aur freelance client dono ko value proposition samajh aani chahiye.
Personal story nahi, professional positioning statement. "Remote-ready" aur "open to freelance" signal
explicitly dena hai taake international audience immediately qualify ho sake.

### Acceptance Criteria

- Given visitor About section reach kare, when section enters viewport, then fade-in animation trigger ho
- Given content render ho, when visitor reads, then 3 distinct value props clear hon:
  builder identity, educator identity, aur availability signal
- Given mobile device, when About renders, then text readable ho aur line length ≤ 65 characters
- Given any device, when section render ho, then no walls of text — max 4 sentences in main copy
- Given visitor, when section scanned, then "Open to remote roles" aur "freelance projects" explicitly
  visible hon

### Design Notes

- Section label: `ABOUT` eyebrow above heading
- Heading: `"Who I Am"` or `"A Builder Who Teaches"` — font-heading
- Main copy (max 4 sentences):
  ```
  I'm an AI/ML Engineer based in Karachi, Pakistan, building production-ready
  Agentic AI systems, RAG pipelines, and Computer Vision models.

  Beyond building, I lead technical training at SMIT — guiding students from
  Python basics to deploying real-world ML models.

  I'm open to remote AI/ML roles, freelance AI projects, and consulting engagements.
  ```
- 3 stat/highlight cards below copy (grid of 3):
  - `6+` Projects Built
  - `1` Year Experience
  - `Lead Trainer` @ SMIT
- Cards: metric card style — muted label + large number/text
- Scroll-triggered animation: `whileInView`, `once: true`

### Technical Notes

- Component: `components/sections/About.tsx`
- No API required
- Stat data: hardcoded in component (small, static)
- Animation: `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}`

---

## Feature: Projects Showcase

**Priority:** Must-have

**Description:**
Most important conversion section — yeh section recruiter ko GitHub pe bhejega aur client ko
project quality dikhayega. 4 featured projects card grid mein display honge. Har card mein
problem, tech stack, aur links clearly visible honge. Future mein grid/list toggle nice-to-have hai.

### Acceptance Criteria

- Given Projects section load ho, when rendered, then exactly 4 featured project cards visible hon
- Given project card render ho, when visible, then title, category badge, 1-line description,
  tech stack badges, aur action links sab present hon
- Given project has liveUrl, when card rendered, then "Live Demo" link visible aur functional ho
- Given project only has githubUrl, when card rendered, then sirf "GitHub" link show ho —
  no broken/empty "Live Demo" button
- Given mobile device (375px), when grid render ho, then cards single column mein stack hon
- Given desktop (1024px+), when grid render ho, then cards 2-column grid mein display hon
- Given card hover karo, when mouse enters, then subtle lift effect (translateY -4px, border brightens)
- Given dark mode, when cards render, then card background `--color-card` aur border `--color-border`
  correct values use karen
- Given screen reader, when card traverse ho, then project naam h3 ho aur links descriptive
  aria-labels rakhen (e.g. "View Broadway Pizza Chatbot on GitHub")

### Projects Data (ordered by display priority)

```
1. Broadway Pizza Chatbot
   Category : RAG · CHATBOT
   Desc     : RAG-based chatbot for Broadway Pizza Pakistan that eliminates
              hallucinations by grounding responses in a live SQLite database.
   Tech     : Python · Gemini LLM · RAG · SQLite · Streamlit
   Links    : Live Demo ✓ · GitHub ✓
   Featured : true

2. Pothole Detection (YOLOv8)
   Category : COMPUTER VISION · EDGE AI
   Desc     : Edge-ready road damage detection pipeline trained on annotated
              road images, exported for real-world inference deployment.
   Tech     : YOLOv8 · OpenCV · Python · ONNX
   Links    : GitHub ✓
   Featured : true

3. SpaceX Launch Prediction
   Category : MLOps · DASHBOARD
   Desc     : End-to-end ML pipeline with Random Forest Classifier, Streamlit
              dashboard, Folium maps, and containerized scheduled retraining.
   Tech     : Scikit-learn · Streamlit · Docker · Folium · MLflow
   Links    : Live Demo ✓ · GitHub ✓
   Featured : true

4. Heart Disease Prediction
   Category : CLINICAL ML · MONITORING
   Desc     : Logistic Regression model with k-fold CV (80-87% accuracy) on
              1,025 patient records, with data drift and cohort monitoring.
   Tech     : Scikit-learn · Streamlit · Pandas · Matplotlib
   Links    : GitHub ✓
   Featured : true
```

### Design Notes

- Section label: `FEATURED PROJECTS` eyebrow
- Heading: `"Things I've Built"` — font-heading
- Layout: `grid-cols-1 md:grid-cols-2 gap-6`
- Card anatomy (top to bottom):
  - Category badge: `text-accent bg-accent-sub text-[9px] tracking-[1.5px] uppercase`
  - Project title: `font-heading text-lg font-medium text-ink`
  - Description: `font-body text-sm text-muted leading-relaxed` (2 lines max)
  - Tech stack: flex-wrap of small pills `bg-surface text-muted text-[10px]`
  - Divider: `border-t border-border mt-auto pt-4`
  - Links row: `Live Demo ↗` (accent colored) + `GitHub` (muted)
- Hover state: `hover:-translate-y-1 hover:border-accent/40 transition-all duration-200`
- Stagger animation: cards enter with 0.1s delay between each
- "View All Projects" ghost link below grid → github.com/JamilRaza001

### Technical Notes

- Components: `components/sections/Projects.tsx` + `components/ui/ProjectCard.tsx`
- Data source: `data/projects.ts` — typed `Project[]` interface
- `liveUrl` is optional — conditional render in ProjectCard
- Nice-to-have (v2): filter by category (AI/ML · Data Science · MLOps)
- No API required

---

## Feature: Skills Section

**Priority:** Must-have

**Description:**
Recruiter ko 10 seconds mein skill coverage samajh aani chahiye. Skills ko 4 meaningful categories
mein group karna hai — unordered tag cloud avoid karo. Visual scanning ke liye optimized layout.

### Acceptance Criteria

- Given Skills section render ho, when visible, then 4 distinct categories clearly labeled hon
- Given visitor skill section scan kare, when reading, then category names headings ki tarah
  styled hon aur individual skills badge ki tarah
- Given mobile device, when rendered, then categories stack vertically, badges wrap cleanly
- Given dark mode, when badges render, then accent-sub bg aur accent text use ho
- Given screen reader, when section traverse ho, then category names h3 headings hon

### Skills Data (4 categories)

```
🤖 Agentic & Generative AI
   LangChain · LangGraph · OpenAI API · Anthropic · Hugging Face
   Multi-agent Systems · RAG · Semantic Search · ChromaDB · FAISS
   N8N · Make.com · Context Window Optimization

🧠 ML / Deep Learning
   PyTorch · TensorFlow · Scikit-learn · XGBoost · Keras
   YOLOv8 · OpenCV · LoRA Fine-tuning · Transformers
   MLflow · ONNX · Model Versioning

📊 Data Science & Analytics
   Pandas · NumPy · SQL · Matplotlib · Seaborn · Plotly
   Tableau · Power BI · Streamlit · Gradio
   EDA · Feature Engineering · Hypothesis Testing

⚙️ MLOps & Deployment
   FastAPI · Docker · CI/CD Pipelines · GitHub Actions
   NLTK · SpaCy · TypeScript / Next.js
```

### Design Notes

- Section label: `SKILLS` eyebrow
- Heading: `"What I Work With"` — font-heading
- Layout: `grid-cols-1 md:grid-cols-2 gap-8`
- Each category block:
  - Category icon + name: `font-heading text-base font-medium text-ink`
  - Skill badges: `flex flex-wrap gap-2 mt-3`
  - Badge style: `bg-surface border border-border text-muted text-[11px] px-3 py-1 rounded-sm`
- Hover on badge: border color shifts to `border-accent/50`
- Entrance: category blocks stagger in with `whileInView`

### Technical Notes

- Component: `components/sections/Skills.tsx` + `components/ui/SkillBadge.tsx`
- Data: `data/skills.ts` — typed `SkillCategory[]` with `{ name, icon, skills: string[] }`
- No API required

---

## Feature: Experience Timeline

**Priority:** Must-have

**Description:**
Professional credibility establish karna hai — sirf job list nahi, impact-focused timeline.
AI-related roles visually prominent honge, non-AI roles (HBL, ibex) present but de-emphasized.
Recruiter ko immediately Lead Trainer aur AI Engineer roles notice honni chahiye.

### Acceptance Criteria

- Given Experience section render ho, when visible, then entries chronological descending order mein hon
  (newest first)
- Given AI/ML role entry render ho, when visible, then visually emphasized ho (accent dot, full detail)
- Given non-AI role entry render ho, when visible, then present but compact — no bullet points,
  single line description
- Given mobile device, when timeline renders, then vertical line + dots cleanly aligned hon
- Given any entry, when rendered, then company, role, duration, aur location visible hon

### Experience Data

```
PROMINENT (full detail):
─────────────────────────────────────────────────────
Lead Trainer — SMIT (Saylani Mass IT)       Dec 2025 – Present · Karachi
• Teaching Data Science & ML/DL (Python) to large student batches
• Guiding projects from EDA to neural network deployment
• Instructing Power BI for business intelligence

AI Engineer — Saylani Welfare Trust         Oct 2025 – Nov 2025 · Karachi
• Integrated AI chatbot into internal working platform
• Built AI Analysis Tool for cross-team usage

Data Analytics Simulation — Deloitte (Forage)  Aug 2025 · Remote
• Built Tableau dashboard; applied forensic data analysis
• Documented structured business findings

COMPACT (single line):
─────────────────────────────────────────────────────
Business Development Officer — HBL          Jan 2024 – May 2024
Customer Service Representative — ibex.     Jun 2024 – Oct 2024
```

### Design Notes

- Section label: `EXPERIENCE` eyebrow
- Heading: `"Where I've Worked"` — font-heading
- Timeline: left vertical line `border-l-2 border-border`, each entry has dot on line
- Prominent entries: accent-colored dot (`bg-accent`), company + role + date + location +
  bullet points with impact
- Compact entries: muted dot (`bg-muted`), company + role + date — one line, no bullets
- Vertical spacing between entries: `space-y-8`
- Entrance: `whileInView` stagger per entry

### Technical Notes

- Components: `components/sections/Experience.tsx` + `components/ui/TimelineItem.tsx`
- Data: `data/experience.ts` — typed `ExperienceEntry[]` with `prominent: boolean` flag
- No API required

---

## Feature: Certifications Section

**Priority:** Nice-to-have

**Description:**
Social proof addition — sirf relevant aur verifiable certifications dikhani hain.
Wall of badges avoid karo — less is more. Agar 2 se kam certs hain toh About section
mein mention karo, separate section mat banao.

### Acceptance Criteria

- Given Certifications render ho, when visible, then max 5 certs displayed hon
- Given cert card render ho, when visible, then cert name, issuer, aur date present hon
- Given mobile, when rendered, then cards cleanly stack ya 2-column grid mein fit hon

### Design Notes

- Section label: `CERTIFICATIONS` eyebrow
- Heading: `"Credentials"` — font-heading
- Layout: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`
- Each cert card: issuer logo (if available) or icon, cert name, issuer, date
- Keep minimal — no progress bars, no skill meters

### Technical Notes

- Component: `components/sections/Certifications.tsx`
- Data: `data/certifications.ts`
- If only 1 cert currently: skip section, add to About stats instead

---

## Feature: Contact Form

**Priority:** Must-have

**Description:**
Primary conversion point — recruiter, local employer, aur freelance client teeno ke liye
ek clear call-to-action. Form plus social links. Freelance availability explicitly state karo.
Formspree handle karega form submission — no backend needed.

### Acceptance Criteria

- Given visitor Contact section reach kare, when rendered, then "Open to freelance projects" text
  explicitly visible ho
- Given visitor form fill kare, when all fields valid hon aur Submit click ho, then
  POST to Formspree API ho aur success message show ho
- Given visitor form submit kare with empty required field, when Submit clicked, then
  field-level validation message show ho (HTML5 + custom)
- Given Formspree API fail ho, when submission error aaye, then user-friendly error message
  show ho — no raw error dump
- Given mobile device, when form render ho, then inputs full-width hon aur keyboard
  properly triggers ho (email type for email field)
- Given submission success, when message shown, then form fields clear ho jayen
- Given screen reader, when form traversed, then every input has associated `<label>`

### Form Fields

```
Name     → text input, required, placeholder: "Your name"
Email    → email input, required, placeholder: "your@email.com"
Subject  → text input, optional, placeholder: "What's this about?"
Message  → textarea (5 rows), required, placeholder: "Tell me about your project or opportunity..."
Submit   → "Send Message" button (primary accent style)
```

### Design Notes

- Section label: `CONTACT` eyebrow
- Heading: `"Let's Build Something"` — font-heading
- Sub-heading: `"Let's Build Something Intelligent Together"` — font-heading
- Availability line: `"Open to: Remote AI/ML Roles · Freelance Projects · Collaborations"`
  — `text-accent font-body text-sm` with dots as separators
- Two-column layout on desktop: form left (60%), social/info right (40%)
- Right column content:
  - Email: `jamilraza001@gmail.com` (mailto link)
  - LinkedIn icon + link
  - GitHub icon + link
  - Location: `Karachi, Pakistan (Remote-Ready)`
- Input style: `bg-surface border border-border rounded focus:border-accent focus:ring-0`
- Success state: green checkmark icon + `"Message sent! I'll get back to you soon."`
- Error state: red warning icon + `"Something went wrong. Please email me directly."`
- Submit button: loading spinner while submitting (disabled state)

### Technical Notes

- Component: `components/sections/Contact.tsx`
- Form submission: `fetch` POST to `https://formspree.io/f/${NEXT_PUBLIC_FORMSPREE_ID}`
- Env var: `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local`
- State management: local `useState` — `{ name, email, subject, message, status }`
- Status values: `'idle' | 'loading' | 'success' | 'error'`
- Icons: Lucide React (`Mail`, `Linkedin`, `Github`, `MapPin`)
- No backend, no database

---

## Feature: Navigation

**Priority:** Must-have

**Description:**
Clean, sticky navbar — desktop mein inline links, mobile mein hamburger menu. ThemeToggle
yahan live karta hai. Scroll position se active link highlight hona chahiye.

### Acceptance Criteria

- Given any page position, when navbar visible ho, then sticky ho (scrolling pe top pe rahe)
- Given desktop (768px+), when nav renders, then logo left, links center/right, ThemeToggle rightmost ho
- Given mobile (< 768px), when nav renders, then logo + hamburger icon show ho — links hidden
- Given mobile hamburger click ho, when pressed, then full-screen menu overlay open ho with all links
- Given overlay open ho, when link clicked, then overlay close ho aur smooth scroll to section ho
- Given user scroll kare, when current section changes, then corresponding nav link active state mein ho
- Given overlay open ho, when ESC press ho ya outside click ho, then overlay close ho
- Given screen reader, when nav traversed, then landmark `<nav>` with `aria-label="Main navigation"`

### Design Notes

- Height: `h-16`
- Background: `bg-bg/80 backdrop-blur-sm` — semi-transparent blur on scroll
- Border bottom: `border-b border-border` appears after 20px scroll (JS scroll listener)
- Logo: `"JRA"` — `font-heading text-lg text-accent` — links back to `#hero`
- Nav links: `Projects · Experience · Skills · Contact` — `font-body text-sm text-muted
  hover:text-ink transition-colors`
- Active link: `text-ink border-b border-accent pb-0.5`
- ThemeToggle: rightmost item (see ThemeToggle spec)
- Mobile menu: full overlay `bg-bg`, links stacked `text-2xl font-heading`, close button top-right
- Mobile menu animation: slide in from right or fade — Framer Motion `AnimatePresence`

### Technical Notes

- Component: `components/layout/Navbar.tsx`
- Active section tracking: `IntersectionObserver` on each section with `id` attribute
- Sections require IDs: `#hero` `#about` `#projects` `#skills` `#experience` `#contact`
- Mobile menu state: local `useState(false)` — `isMenuOpen`
- Body scroll lock when mobile menu open: `document.body.style.overflow = 'hidden'`
- `useEffect` cleanup: remove overflow lock on unmount

---

## Feature: Dark / Light Mode Toggle

**Priority:** Must-have

**Description:**
Dual personality — light mode (Studio White: Lora + blue) aur dark mode (Terminal Minimal:
JetBrains Mono + teal). Sirf colors nahi — heading font bhi switch hoga. localStorage mein
persist karega. System preference ko initial fallback ke tor par use karega.

### Acceptance Criteria

- Given first visit (no saved preference), when site loads, then system `prefers-color-scheme`
  detect ho aur apply ho
- Given returning visitor with saved preference, when site loads, then localStorage preference
  apply ho — no flash of wrong theme
- Given user toggle click kare, when pressed, then theme instantly switch ho (< 100ms)
- Given light mode active, when toggle shows, then Moon icon visible ho
- Given dark mode active, when toggle shows, then Sun icon visible ho
- Given any theme, when applied, then BOTH font AND color variables switch ho
- Given page refresh, when reloaded, then last selected theme persist kare
- Given toggle, when used repeatedly, then no cumulative layout shift occur

### Design Notes

- Toggle button: `w-9 h-9 rounded-full border border-border bg-surface hover:bg-card`
- Icon: Lucide `Sun` (in dark mode) / `Moon` (in light mode) — `size={16}`
- No label text — icon only with `aria-label`
- Placement: rightmost in Navbar
- Transition: CSS `transition: background 0.35s ease, color 0.35s ease` on `:root`

### Technical Notes

- Component: `components/ui/ThemeToggle.tsx`
- Strategy: `.dark` class on `<html>` element (Tailwind `darkMode: 'class'`)
- `localStorage` key: `'theme'` — values: `'light'` | `'dark'`
- Flash prevention: inline `<script>` in `app/layout.tsx` `<head>` before hydration:
  ```html
  <script dangerouslySetInnerHTML={{ __html: `
    const t = localStorage.getItem('theme');
    const d = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', d);
  `}} />
  ```
- Hydration mismatch prevention: `mounted` state — render placeholder until client hydrates
- Font switching: automatic via CSS variables (no JS needed for fonts — pure CSS cascade)

---

## Feature: Performance Requirements

**Priority:** Must-have

**Description:**
Portfolio performance is itself a portfolio piece — slow site recruiter ko negative signal
deta hai. Lighthouse scores targets hain jo deploy ke baad verify honge.

### Acceptance Criteria

- Given production build, when Lighthouse run ho, then Performance score ≥ 90
- Given production build, when Lighthouse run ho, then Accessibility score ≥ 95
- Given production build, when Lighthouse run ho, then Best Practices score ≥ 95
- Given production build, when Lighthouse run ho, then SEO score = 100
- Given Hero section load ho, when measured, then LCP ≤ 1.5s
- Given any page interaction, when measured, then CLS = 0 (no layout shift)
- Given page load, when measured, then FID / INP ≤ 200ms
- Given total page, when measured, then JavaScript bundle ≤ 150KB gzipped

### Technical Requirements

- `next/image` for all images — automatic WebP conversion, lazy loading (except hero: `priority`)
- `next/font` for all fonts — self-hosted, no Google Fonts external requests
- Framer Motion: `LazyMotion` + `domAnimation` features only (reduces bundle ~75%)
  ```tsx
  import { LazyMotion, domAnimation, m } from 'framer-motion';
  // Use <m.div> instead of <motion.div> inside LazyMotion
  ```
- `useReducedMotion()` hook: disable all animations if user prefers reduced motion
- No unused Tailwind classes — `content` config must cover all component paths
- Images: `profile.jpg` → WebP, ≤ 100KB, 800×800 source size
- `og-image.png`: exactly 1200×630px

---

## Feature: SEO Requirements

**Priority:** Must-have

**Description:**
Portfolio Google pe searchable hona chahiye name ke basis par. Open Graph tags
LinkedIn aur social sharing ke liye correct preview generate karne chahiye.

### Acceptance Criteria

- Given Google search `"Muhammad Jamil Raza Attari"`, when indexed, then portfolio top results mein ho
- Given LinkedIn par portfolio link share ho, when previewed, then og:image, title, aur description
  correctly display hon
- Given page source, when checked, then `<title>`, `<meta description>`, canonical URL,
  aur all OG tags present hon
- Given any modern crawler, when site crawled, then `robots.txt` allow indexing confirm kare

### Required Metadata

```tsx
title: "Muhammad Jamil Raza Attari — AI/ML Engineer"
description: "AI/ML Engineer specialized in Agentic AI, RAG systems, and Computer Vision.
              Based in Karachi, Pakistan. Open to remote roles and freelance."
keywords: ["AI Engineer", "ML Engineer", "RAG", "LangChain", "Agentic AI",
           "Computer Vision", "Python", "Karachi", "Pakistan", "Remote"]
canonical: "https://[your-domain].vercel.app"
og:title: "Muhammad Jamil Raza Attari — AI/ML Engineer"
og:description: [same as description]
og:image: "/og-image.png" (1200×630)
og:type: "website"
twitter:card: "summary_large_image"
robots: "index, follow"
```

### Technical Notes

- All metadata in `app/layout.tsx` via Next.js `Metadata` export
- `og-image.png`: design in Figma / Canva — name + role + accent color
- `public/robots.txt`: `User-agent: * / Allow: /`
- `public/sitemap.xml`: single-page site — optional but good practice

---

## Feature: Accessibility Requirements

**Priority:** Must-have

**Description:**
WCAG 2.1 AA compliance — screen reader compatible, keyboard navigable, sufficient color contrast.
Yeh recruiters ke liye bhi signal hai ke developer quality-conscious hai.

### Acceptance Criteria

- Given keyboard user, when Tab key used, then every interactive element (links, buttons, inputs)
  reachable aur focus state clearly visible ho
- Given color contrast check, when measured, then all text on background ≥ 4.5:1 ratio (AA)
- Given screen reader, when page traversed, then logical heading hierarchy: h1 (name) →
  h2 (section names) → h3 (card titles)
- Given image, when present, then all `<Image>` components have descriptive, non-empty `alt`
- Given icon-only button (ThemeToggle, social links), when encountered, then `aria-label` present
- Given form, when rendered, then every `<input>` has matching `<label>` (not placeholder-only)
- Given animations, when `prefers-reduced-motion: reduce` set, then all motion stops
- Given landmark regions, when page loaded, then `<nav>`, `<main>`, `<footer>` present

### Technical Notes

- Focus ring: never `outline: none` — use `focus-visible:ring-2 focus-visible:ring-accent`
- Skip link: `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>`
  first child of `<body>`
- Color contrast check tools: WebAIM Contrast Checker — verify accent (#1740D4) on white (#FAFAFA)
  and teal (#05D4B4) on dark (#0C0C16)
- `useReducedMotion()` from Framer Motion — wrap all `motion` variants
- Heading audit: run `document.querySelectorAll('h1,h2,h3')` in console to verify hierarchy

---

## Implementation Order (Suggested Sprint)

```
WEEK 1
──────────────────────────────────────
Day 1  → Project setup + CLAUDE.md + SPEC.md in repo
         ThemeToggle + globals.css (full token system)
Day 2  → Navbar (desktop + mobile) + layout.tsx metadata
Day 3  → Hero section (photo, tagline, CTAs, animation)
Day 4  → About + Skills sections
Day 5  → Projects section + ProjectCard component

WEEK 2
──────────────────────────────────────
Day 6  → Experience timeline + Certifications
Day 7  → Contact form + Formspree integration
Day 8  → Mobile responsiveness audit (375px, 768px, 1280px)
Day 9  → Animation polish + reduced-motion support
Day 10 → Performance audit (Lighthouse), image optimization
Day 11 → SEO metadata + og-image + robots.txt
Day 12 → Accessibility audit + keyboard navigation test
Day 13 → Final cross-browser test (Chrome, Firefox, Safari)
Day 14 → 🚀 Deploy to Vercel + LinkedIn post
```

---

*This SPEC.md should be read alongside CLAUDE.md for full project context.*
*Update this file when requirements change — do not let spec drift from implementation.*
