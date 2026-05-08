import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        accent:       'var(--color-accent)',
        'accent-sub': 'var(--color-accent-sub)',
        ink:          'var(--color-ink)',
        muted:        'var(--color-muted)',
        border:       'var(--color-border)',
        card:         'var(--color-card)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body:    ['var(--font-body)'],
      },
    },
  },
  plugins: [],
};
export default config;
