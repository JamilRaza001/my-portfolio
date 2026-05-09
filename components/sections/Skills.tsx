'use client';

import { m, useReducedMotion, type Variants } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { skillCategories } from '@/data/skills';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const Skills = () => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : 'hidden';

  return (
    <section
      id="skills"
      className="py-24 md:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <SectionLabel text="Skills" />
          <h2
            id="skills-heading"
            className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
          >
            What I Work With
          </h2>
        </m.div>

        <m.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {skillCategories.map((category) => (
            <m.div key={category.name} variants={itemVariants}>
              <h3 className="font-heading text-base font-medium text-ink flex items-center gap-2">
                <span aria-hidden="true">{category.icon}</span>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
