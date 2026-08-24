import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, Playfair_Display, Cinzel, Cinzel_Decorative, Cormorant_Garamond, Pinyon_Script, Alex_Brush } from 'next/font/google';
import AppShell from './app-shell';
import '@/index.css';
import type { ReactNode } from 'react';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-alex',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GHRÉ PARIS — Luxury Hair Care, Sun & Body, and Haute Parfumerie',
  description:
    'GHRÉ PARIS by Jac Ghré — pure luxury botanical hair care, shimmering sun & body oils, and signature haute parfumerie. Paris • Saint-Tropez • Miami.',
  keywords: [
    'luxury hair care',
    'haute parfumerie',
    'shimmer body oil',
    'botanical shampoo',
    'prickly pear oil',
    'Jac Ghre',
    'GHRE Paris',
  ],
  authors: [{ name: 'Jac Ghré' }],
  openGraph: {
    title: 'GHRÉ PARIS — The Art of Sun-Kissed Beauty',
    description:
      'Luxury botanical hair rituals, shimmering sun oils, and Grasse-distilled signature perfumes by Jac Ghré.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} ${playfairDisplay.variable} ${cinzel.variable} ${cinzelDecorative.variable} ${cormorantGaramond.variable} ${pinyonScript.variable} ${alexBrush.variable}`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
