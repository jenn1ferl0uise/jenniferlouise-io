import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Reenie_Beanie,
} from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@/components/ui/sonner';
import { SITE_URL, site } from '@/content/site';
import { DEFAULT_TITLE } from '@/lib/metadata';
import { DEFAULT_TIME_OF_DAY, timeOfDayScript } from '@/lib/time-of-day';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const hand = Reenie_Beanie({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-hand',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: '#2e2463',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-time={DEFAULT_TIME_OF_DAY} suppressHydrationWarning>
      <head>
        {/* Sets data-time from the visitor's clock before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: timeOfDayScript }} />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable} ${hand.variable}`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Toaster position="top-center" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
