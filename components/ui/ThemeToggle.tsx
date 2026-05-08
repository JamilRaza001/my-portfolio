'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Toggle light mode' : 'Toggle dark mode'}
      className="w-9 h-9 rounded-full border border-border bg-surface hover:bg-card flex items-center justify-center"
    >
      {isDark ? (
        <Sun size={16} className="text-ink" />
      ) : (
        <Moon size={16} className="text-ink" />
      )}
    </button>
  );
};
