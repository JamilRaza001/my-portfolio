'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { m, useReducedMotion, type Variants } from 'framer-motion';

const heroVariant = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
});

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : 'hidden';

  return (
    <section
      id="hero"
      className="min-h-[100svh] flex flex-col justify-center py-24 md:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="flex flex-col gap-6">
          {/* Eyebrow badge */}
          <m.div className="inline-flex" initial={initial} animate="visible" variants={heroVariant(0)}>
            <span className="font-body text-[9px] tracking-[2.5px] uppercase text-accent bg-accent-sub px-3 py-1.5 rounded-sm">
              AI / ML Engineer · Karachi, PK
            </span>
          </m.div>

          {/* Name */}
          <m.h1
            id="hero-heading"
            className="font-heading text-5xl md:text-7xl font-medium tracking-tight text-ink leading-[1.1]"
            initial={initial}
            animate="visible"
            variants={heroVariant(0.1)}
          >
            I Build Intelligent AI Systems — and Teach Others to Do the Same
          </m.h1>

          {/* Sub-text */}
          <m.p
            className="font-body text-base text-muted leading-relaxed max-w-xl"
            initial={initial}
            animate="visible"
            variants={heroVariant(0.2)}
          >
            Specialized in Agentic AI, RAG Pipelines &amp; Computer Vision. Open to remote
            roles, freelance, and collaborations.
          </m.p>

          {/* CTA buttons */}
          <m.div
            className="flex flex-wrap gap-3"
            initial={initial}
            animate="visible"
            variants={heroVariant(0.3)}
          >
            <a
              href="#projects"
              className="font-body text-sm px-5 py-2.5 rounded bg-accent text-white hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="View my projects"
            >
              View Projects
            </a>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm px-5 py-2.5 rounded border border-accent text-accent hover:bg-accent-sub transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Download my CV as PDF"
            >
              Download CV
            </Link>
            <Link
              href="https://github.com/JamilRaza001"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm px-5 py-2.5 rounded border border-border text-muted hover:text-ink hover:border-ink/30 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Visit my GitHub profile"
            >
              GitHub ↗
            </Link>
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        className="flex justify-center mt-12 md:mt-16"
        initial={initial}
        animate="visible"
        variants={heroVariant(0.4)}
      >
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="text-muted hover:text-ink transition-colors animate-bounce focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <ChevronDown size={24} />
        </a>
      </m.div>
    </section>
  );
};
