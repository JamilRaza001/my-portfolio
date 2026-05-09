'use client';

import { m, useReducedMotion, type Variants } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';

const stats = [
  { value: '6+', label: 'Projects Built' },
  { value: '1yr', label: 'Experience' },
  { value: 'Lead Trainer', label: '@ SMIT' },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : 'hidden';

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <m.div variants={itemVariants}>
            <SectionLabel text="About" />
          </m.div>

          <m.h2
            id="about-heading"
            className="font-heading text-3xl md:text-4xl font-medium text-ink mb-6"
            variants={itemVariants}
          >
            A Builder Who Teaches
          </m.h2>

          <m.div className="max-w-2xl mb-12" variants={itemVariants}>
            <p className="font-body text-base text-muted leading-relaxed">
              I&apos;m an AI/ML Engineer based in Karachi, Pakistan, building production-ready
              Agentic AI systems, RAG pipelines, and Computer Vision models.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mt-4">
              Beyond building, I lead technical training at SMIT — guiding students from Python
              basics to deploying real-world ML models.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mt-4">
              I&apos;m open to remote AI/ML roles, freelance AI projects, and consulting
              engagements worldwide.
            </p>
          </m.div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ value, label }) => (
              <m.div
                key={label}
                className="bg-surface rounded-xl p-5 flex flex-col gap-1"
                variants={itemVariants}
              >
                <span className="font-body text-[13px] text-muted">{label}</span>
                <span className="font-heading text-2xl font-medium text-ink">{value}</span>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
};
