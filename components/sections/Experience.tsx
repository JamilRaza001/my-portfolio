'use client';

import { m, useReducedMotion, type Variants } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { experiences } from '@/data/experience';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const Experience = () => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : 'hidden';

  return (
    <section
      id="experience"
      className="py-24 md:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <SectionLabel text="Experience" />
          <h2
            id="experience-heading"
            className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
          >
            Where I&apos;ve Worked
          </h2>
        </m.div>

        <m.div
          className="border-l-2 border-border ml-1.5 space-y-10"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {experiences.map((entry) => (
            <m.div key={`${entry.company}-${entry.period}`} variants={itemVariants}>
              <TimelineItem entry={entry} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
