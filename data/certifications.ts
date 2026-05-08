export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: 'ibm-data-science',
    name: 'IBM Data Science Professional Certificate',
    issuer: 'IBM / Coursera',
    date: 'Jan 2025',
  },
  {
    id: 'ml-specialization',
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    date: 'Oct 2024',
  },
  {
    id: 'google-data-analytics',
    name: 'Google Data Analytics Certificate',
    issuer: 'Google / Coursera',
    date: 'Aug 2024',
  },
];
