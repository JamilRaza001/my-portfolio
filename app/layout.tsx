import type { Metadata } from 'next';
import { lora, outfit, jetbrainsMono, dmSans } from './fonts';
import { Navbar } from '@/components/layout/Navbar';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jamil-portfolio.vercel.app'),
  title: 'Muhammad Jamil Raza Attari — AI/ML Engineer',
  description:
    'AI/ML Engineer specialized in Agentic AI, RAG systems, and Computer Vision. Based in Karachi, Pakistan. Open to remote roles and freelance.',
  keywords: [
    'AI Engineer',
    'ML Engineer',
    'RAG',
    'LangChain',
    'Agentic AI',
    'Computer Vision',
    'Python',
    'Karachi',
    'Pakistan',
    'Remote',
  ],
  openGraph: {
    title: 'Muhammad Jamil Raza Attari — AI/ML Engineer',
    description: 'Building intelligent AI systems and teaching others to do the same.',
    siteName: 'Jamil Raza Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Jamil Raza Attari — AI/ML Engineer',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${outfit.variable} ${jetbrainsMono.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const t = localStorage.getItem('theme');
              const d = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
              document.documentElement.classList.toggle('dark', d);
            `,
          }}
        />
      </head>
      <body className="font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
