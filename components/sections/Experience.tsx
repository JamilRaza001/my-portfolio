import { SectionLabel } from '@/components/ui/SectionLabel';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { experiences } from '@/data/experience';

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 md:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel text="Experience" />

        <h2
          id="experience-heading"
          className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
        >
          Where I&apos;ve Worked
        </h2>

        <div className="border-l-2 border-border ml-1.5 space-y-10">
          {experiences.map((entry) => (
            <TimelineItem key={`${entry.company}-${entry.period}`} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
};
