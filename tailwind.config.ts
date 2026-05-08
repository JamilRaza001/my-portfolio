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
        bg:           'rgb(var(--color-bg) / <alpha-value>)',
        surface:      'rgb(var(--color-surface) / <alpha-value>)',
        accent:       'rgb(var(--color-accent) / <alpha-value>)',
        'accent-sub': 'rgb(var(--color-accent-sub) / <alpha-value>)',
        ink:          'rgb(var(--color-ink) / <alpha-value>)',
        muted:        'rgb(var(--color-muted) / <alpha-value>)',
        border:       'rgb(var(--color-border) / <alpha-value>)',
        card:         'rgb(var(--color-card) / <alpha-value>)',
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
