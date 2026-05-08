import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export const Projects = () => {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="py-24 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel text="Featured Projects" />

        <h2
          id="projects-heading"
          className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
        >
          Things I&apos;ve Built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="https://github.com/JamilRaza001"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-muted border border-border px-5 py-2.5 rounded hover:text-ink hover:border-ink/30 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="View all projects on GitHub"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
};
