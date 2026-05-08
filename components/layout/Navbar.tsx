'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Contact',    href: '#contact'    },
];

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'certifications', 'contact'];

export const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-sm transition-all duration-300',
        scrolled && 'border-b border-border'
      )}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-heading text-xl font-medium text-accent focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          JRA
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    'font-body text-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded',
                    isActive
                      ? 'text-ink border-b border-accent pb-0.5'
                      : 'text-muted hover:text-ink'
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: ThemeToggle + hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded text-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 z-50 bg-bg flex flex-col"
          >
            {/* Overlay header */}
            <div
              className="h-16 flex items-center justify-between px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href="#hero"
                onClick={closeMenu}
                className="font-heading text-xl font-medium text-accent"
              >
                JRA
              </a>
              <button
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="w-9 h-9 flex items-center justify-center rounded text-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X size={20} />
              </button>
            </div>

            {/* Overlay links */}
            <ul
              className="flex flex-col items-center justify-center flex-1 gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="font-heading text-2xl font-medium text-ink hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
