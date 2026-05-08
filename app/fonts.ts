import { Lora, Outfit, JetBrains_Mono, DM_Sans } from 'next/font/google';

export const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading-light',
});

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-light',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading-dark',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-dark',
});
