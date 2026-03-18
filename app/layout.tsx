import { Inter, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Jennifer Louise Lynch | Frontend Web Developer",
  description:
    "Jennifer Louise Lynch is a front end focused full stack web developer specializing in React, Next.js, Node.js, PostgreSQL, and Vercel. Available for freelance projects and collaborations.",
  keywords: [
    "Full Stack Developer",
    "Freelance Web Developer",
    "Frontend Web Developer",
    "Front end Web Developer",
    "Frontend Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Vercel",
    "Portfolio",
    "Jennifer Louise",
    "Jennifer Lynch",
    "Jennifer Louise Lynch",
  ],
  openGraph: {
    title: "Jennifer Louise | Full Stack Web Developer & Freelancer",
    description:
      "Portfolio and contact for Jennifer Louise Lynch, a freelance full stack web developer with expertise in React, Next.js, Node.js, PostgreSQL, and cloud infrastructure.",
    url: "https://jenniferlouise.io/",
    siteName: "Jennifer Louise Lynch Portfolio",
    images: [
      {
        url: "https://jenniferlouise.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jennifer Louise Lynch Portfolio",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jennifer Louise Lynch | Full Stack Web Developer & Freelancer",
    description:
      "Portfolio and contact for Jennifer Louise Lynch, a freelance full stack web developer with expertise in React, Next.js, Node.js, PostgreSQL, and cloud infrastructure.",
    images: ["https://jenniferlouise.io/og-image.png"],
  },
  metadataBase: new URL("https://jenniferlouise.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.variable} ${dmSans.variable}`}>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <span className="fixed self-center inset-05 text-center font-stretch-condensed text-[20rem] font-extrabold text-foreground/10 select-none pointer-events-none leading-none">
            JENNIFER
            <br />
            LOUISE
          </span>
          <header className="py-6 px-12 flex justify-between">
            <Link href="/">JL</Link>
            <Link href="/#contact">CONTACT</Link>
          </header>

          <main className="flex-1 mx-auto">{children}</main>

          <footer className="py-6 flex px-6 text-muted  italic text-xs justify-between">
            <div>Jennifer Louise Lynch © 2026</div>
            <div className="flex text-lg items-center">
              <a href="https://github.com/jenn1ferl0uise/">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/jennifer-louise-lynch">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </footer>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
