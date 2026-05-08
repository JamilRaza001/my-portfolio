import { SectionLabel } from '@/components/ui/SectionLabel';
import { certifications } from '@/data/certifications';

export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-24 md:py-32"
      aria-labelledby="certifications-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel text="Certifications" />

        <h2
          id="certifications-heading"
          className="font-heading text-3xl md:text-4xl font-medium text-ink mb-10"
        >
          Credentials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2"
            >
              <h3 className="font-heading text-sm font-medium text-ink leading-snug">
                {cert.name}
              </h3>
              <div className="flex flex-col gap-0.5 mt-auto">
                <span className="font-body text-[11px] text-accent">{cert.issuer}</span>
                <span className="font-body text-[11px] text-muted">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
