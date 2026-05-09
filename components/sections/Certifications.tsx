'use client';

import { m, useReducedMotion, type Variants } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { certifications } from '@/data/certifications';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const Certifications = () => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : 'hidden';

  return (
    <section
      id="certifications"
      className="py-24 md:py-32"
      aria-labelledby="certifications-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <SectionLabel text="Certifications" />
          <h2
            id="certifications-heading"
            className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
          >
            Credentials
          </h2>
        </m.div>

        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {certifications.map((cert) => (
            <m.div
              key={cert.id}
              className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2"
              variants={itemVariants}
            >
              <h3 className="font-heading text-sm font-medium text-ink leading-snug">
                {cert.name}
              </h3>
              <div className="flex flex-col gap-0.5 mt-auto">
                <span className="font-body text-[11px] text-accent">{cert.issuer}</span>
                <span className="font-body text-[11px] text-muted">{cert.date}</span>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
