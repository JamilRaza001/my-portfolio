import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, category, description, techStack, githubUrl, liveUrl } = project;

  return (
    <article
      className={cn(
        'flex flex-col bg-card border border-border rounded-xl p-5 md:p-6',
        'hover:-translate-y-1 hover:border-accent/40 transition-all duration-200'
      )}
    >
      {/* Category badge */}
      <span className="font-body text-[9px] tracking-[1.5px] uppercase text-accent bg-accent-sub px-2.5 py-1 rounded-sm self-start mb-3">
        {category}
      </span>

      {/* Title */}
      <h3 className="font-heading text-lg font-medium text-ink mb-2">{title}</h3>

      {/* Description */}
      <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="font-body bg-surface border border-border text-muted text-[10px] px-2.5 py-0.5 rounded-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links — pushed to bottom */}
      <div className="border-t border-border mt-auto pt-4 flex items-center gap-4">
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-sm text-accent hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label={`View ${title} live demo`}
          >
            <ExternalLink size={14} />
            Live Demo
          </Link>
        )}
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-body text-sm text-muted hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label={`View ${title} on GitHub`}
        >
          <IconGithub />
          GitHub
        </Link>
      </div>
    </article>
  );
};
