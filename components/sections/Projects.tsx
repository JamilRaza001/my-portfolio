'use client';

import Link from 'next/link';
import { m, useReducedMotion, type Variants } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : 'hidden';
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="py-24 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <SectionLabel text="Featured Projects" />
          <h2
            id="projects-heading"
            className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
          >
            Things I&apos;ve Built
          </h2>
        </m.div>

        <m.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {featured.map((project) => (
            <m.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </m.div>
          ))}
        </m.div>

        <m.div
          className="mt-8 flex justify-center"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
        >
          <Link
            href="https://github.com/JamilRaza001"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-muted border border-border px-5 py-2.5 rounded hover:text-ink hover:border-ink/30 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="View all projects on GitHub"
          >
            View All Projects →
          </Link>
        </m.div>
      </div>
    </section>
  );
};
