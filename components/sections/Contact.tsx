'use client';

import { useState } from 'react';
import { Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionLabel } from '@/components/ui/SectionLabel';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const inputClass =
  'w-full font-body text-sm text-ink bg-surface border border-border rounded px-4 py-2.5 placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors';

export const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formspreeId) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || '(No subject)',
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel text="Contact" />

        <h2
          id="contact-heading"
          className="font-heading text-3xl md:text-4xl font-medium text-ink mb-3"
        >
          Let&apos;s Build Something Intelligent Together
        </h2>

        <p className="font-body text-sm text-accent mb-10">
          Open to: Remote AI/ML Roles · Freelance Projects · Collaborations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-12">
          {/* Form column */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-body text-sm text-ink">
                Name <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-body text-sm text-ink">
                Email <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="font-body text-sm text-ink">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-body text-sm text-ink">
                Message <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={handleChange}
                className={cn(inputClass, 'resize-none')}
              />
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-body text-sm">
                <CheckCircle size={16} />
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 font-body text-sm">
                <AlertCircle size={16} />
                Something went wrong. Please email me directly at{' '}
                <a
                  href="mailto:jamilraza001@gmail.com"
                  className="underline hover:no-underline"
                >
                  jamilraza001@gmail.com
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'font-body text-sm px-6 py-3 rounded bg-accent text-white',
                'hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'disabled:opacity-60 disabled:cursor-not-allowed',
                'flex items-center justify-center gap-2 self-start'
              )}
            >
              {status === 'loading' && <Loader2 size={15} className="animate-spin" />}
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {/* Info column */}
          <div className="flex flex-col gap-5 pt-1">
            <a
              href="mailto:jamilraza001@gmail.com"
              className="flex items-center gap-3 font-body text-sm text-muted hover:text-ink transition-colors group focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <Mail size={18} className="text-accent shrink-0" />
              jamilraza001@gmail.com
            </a>

            <a
              href="https://www.linkedin.com/in/jamilrazaa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="flex items-center gap-3 font-body text-sm text-muted hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <span className="text-accent shrink-0"><IconLinkedin /></span>
              linkedin.com/in/jamilrazaa
            </a>

            <a
              href="https://github.com/JamilRaza001"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="flex items-center gap-3 font-body text-sm text-muted hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <span className="text-accent shrink-0"><IconGithub /></span>
              github.com/JamilRaza001
            </a>

            <div className="flex items-center gap-3 font-body text-sm text-muted">
              <MapPin size={18} className="text-accent shrink-0" />
              Karachi, Pakistan (Remote-Ready)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
