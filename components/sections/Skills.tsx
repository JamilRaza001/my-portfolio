import { SectionLabel } from '@/components/ui/SectionLabel';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { skillCategories } from '@/data/skills';

export const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 md:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel text="Skills" />

        <h2
          id="skills-heading"
          className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
        >
          What I Work With
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-heading text-base font-medium text-ink flex items-center gap-2">
                <span aria-hidden="true">{category.icon}</span>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
