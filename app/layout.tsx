import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Jamil Raza Attari — AI/ML Engineer',
  description: 'AI/ML Engineer specialized in Agentic AI, RAG systems, and Computer Vision.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
