export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  tag?: string;
  bullets?: string[];
  prominent: boolean;
}

export const experiences: ExperienceEntry[] = [
  {
    role: 'Lead Trainer',
    company: 'SMIT (Saylani Mass IT)',
    period: 'Dec 2025 – Present',
    location: 'Karachi, Pakistan',
    bullets: [
      'Teaching Data Science & ML/DL (Python) to large student batches',
      'Guiding projects from EDA to neural network deployment',
      'Instructing Power BI for business intelligence',
    ],
    prominent: true,
  },
  {
    role: 'AI Engineer',
    company: 'Saylani Welfare Trust',
    period: 'Oct 2025 – Nov 2025',
    location: 'Karachi, Pakistan',
    bullets: [
      'Integrated AI chatbot into internal working platform',
      'Built AI Analysis Tool for cross-team usage',
    ],
    prominent: true,
  },
  {
    role: 'Data Analytics Simulation',
    company: 'Deloitte (Forage)',
    period: 'Aug 2025',
    location: 'Remote',
    tag: 'Simulation',
    bullets: [
      'Built Tableau dashboard; applied forensic data analysis',
      'Documented structured business findings',
    ],
    prominent: true,
  },
  {
    role: 'Customer Service Representative',
    company: 'ibex.',
    period: 'Jun 2024 – Oct 2024',
    location: 'Karachi, Pakistan',
    prominent: false,
  },
  {
    role: 'Business Development Officer',
    company: 'HBL',
    period: 'Jan 2024 – May 2024',
    location: 'Karachi, Pakistan',
    prominent: false,
  },
];
