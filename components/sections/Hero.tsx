import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center py-24 md:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-[55fr_45fr] gap-12 items-center">
          {/* Text column */}
          <div className="flex flex-col gap-6 order-1">
            {/* Eyebrow badge */}
            <div className="inline-flex">
              <span className="font-body text-[9px] tracking-[2.5px] uppercase text-accent bg-accent-sub px-3 py-1.5 rounded-sm">
                AI / ML Engineer · Karachi, PK
              </span>
            </div>

            {/* Name + tagline */}
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight text-ink leading-[1.1]">
                I Build Intelligent AI Systems — and Teach Others to Do the Same
              </h1>
              <p className="font-body text-base text-muted leading-relaxed max-w-xl">
                Specialized in Agentic AI, RAG Pipelines &amp; Computer Vision. Open to remote
                roles, freelance, and collaborations.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="font-body text-sm px-5 py-2.5 rounded bg-accent text-white hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="View my projects"
              >
                View Projects
              </a>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm px-5 py-2.5 rounded border border-accent text-accent hover:bg-accent-sub transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="Download my CV as PDF"
              >
                Download CV
              </Link>
              <Link
                href="https://github.com/JamilRaza001"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm px-5 py-2.5 rounded border border-border text-muted hover:text-ink hover:border-ink/30 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="Visit my GitHub profile"
              >
                GitHub ↗
              </Link>
            </div>
          </div>

          {/* Photo column */}
          <div className="flex justify-center md:justify-end order-2">
            <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
              <Image
                src="/profile.jpg"
                alt="Muhammad Jamil Raza Attari"
                width={400}
                height={400}
                priority
                className="rounded-2xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-12 md:mt-16">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="text-muted hover:text-ink transition-colors animate-bounce focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};
