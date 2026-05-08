import { cn } from '@/lib/utils';
import type { ExperienceEntry } from '@/data/experience';

interface TimelineItemProps {
  entry: ExperienceEntry;
}

export const TimelineItem = ({ entry }: TimelineItemProps) => {
  const { role, company, period, location, tag, bullets, prominent } = entry;

  return (
    <div className="relative pl-8">
      {/* Timeline dot */}
      <span
        className={cn(
          'w-3 h-3 rounded-full absolute -left-[0.4rem] top-1.5',
          prominent ? 'bg-accent' : 'bg-muted/50'
        )}
        aria-hidden="true"
      />

      {prominent ? (
        /* Full detail layout */
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="font-heading text-base font-medium text-ink">{role}</h3>
            {tag && (
              <span className="font-body text-[9px] tracking-[1.5px] uppercase text-muted border border-border px-1.5 py-0.5 rounded-sm">
                {tag}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="font-body text-sm text-accent">{company}</span>
            <span className="font-body text-xs text-muted">{period}</span>
            <span className="font-body text-xs text-muted">{location}</span>
          </div>
          {bullets && bullets.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1.5 list-none">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="font-body text-sm text-muted leading-relaxed flex gap-2"
                >
                  <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">›</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        /* Compact single-line layout */
        <p className="font-body text-sm text-muted">
          {role}
          <span className="mx-1.5 text-border">·</span>
          {company}
          <span className="mx-1.5 text-border">·</span>
          {period}
        </p>
      )}
    </div>
  );
};
