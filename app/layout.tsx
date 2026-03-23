import { Inter, DM_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import FooterLinks from '@/components/footer-links';
import NavigationHeader from '@/components/navigation-header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Jennifer Louise Lynch | Frontend Web Developer',
  description:
    'Jennifer Louise Lynch is a front end focused full stack web developer specializing in React, Next.js, Node.js, PostgreSQL, and Vercel. Available for freelance projects and collaborations.',
  keywords: [
    'Full Stack Developer',
    'Freelance Web Developer',
    'Frontend Web Developer',
    'Front end Web Developer',
    'Frontend Software Engineer',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Vercel',
    'Portfolio',
    'Jennifer Louise',
    'Jennifer Lynch',
    'Jennifer Louise Lynch',
  ],
  openGraph: {
    title: 'Jennifer Louise | Full Stack Web Developer & Freelancer',
    description:
      'Portfolio and contact for Jennifer Louise Lynch, a freelance full stack web developer with expertise in React, Next.js, Node.js, PostgreSQL, and cloud infrastructure.',
    url: 'https://jenniferlouise.io/',
    siteName: 'Jennifer Louise Lynch Portfolio',
    images: [
      {
        url: 'https://jenniferlouise.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jennifer Louise Lynch Portfolio',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jennifer Louise Lynch | Full Stack Web Developer & Freelancer',
    description:
      'Portfolio and contact for Jennifer Louise Lynch, a freelance full stack web developer with expertise in React, Next.js, Node.js, PostgreSQL, and cloud infrastructure.',
    images: ['https://jenniferlouise.io/og-image.png'],
  },
  metadataBase: new URL('https://jenniferlouise.io'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.variable} ${dmSans.variable}`}>
        <div className="bg-background text-foreground flex min-h-screen flex-col">
          <span className="inset-05 text-foreground/10 pointer-events-none fixed self-center text-center text-[20rem] leading-none font-extrabold font-stretch-condensed select-none">
            JENNIFER
            <br />
            LOUISE
          </span>
          <NavigationHeader />
          <main className="mx-auto flex-1">{children}</main>

          <footer className="text-muted flex justify-between px-6 py-6 text-xs italic">
            <div>Jennifer Louise Lynch © 2026</div>
            <FooterLinks />
          </footer>
          <Toaster position="top-center" />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
