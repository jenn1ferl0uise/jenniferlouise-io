import { Inter, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Jennifer Louise | Full Stack Web Developer & Freelancer",
  description:
    "Jennifer Louise is a full stack web developer specializing in React, Next.js, Node.js, PostgreSQL, and Vercel. Available for freelance projects and collaborations.",
  keywords: [
    "Full Stack Developer",
    "Freelance Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Vercel",
    "Portfolio",
    "Jennifer Louise",
  ],
  openGraph: {
    title: "Jennifer Louise | Full Stack Web Developer & Freelancer",
    description:
      "Portfolio and contact for Jennifer Louise, a freelance full stack web developer with expertise in React, Next.js, Node.js, PostgreSQL, and cloud infrastructure.",
    url: "https://jenniferlouise.io/",
    siteName: "Jennifer Louise",
    images: [
      {
        url: "https://jenniferlouise.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jennifer Louise Portfolio",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jennifer Louise | Full Stack Web Developer & Freelancer",
    description:
      "Portfolio and contact for Jennifer Louise, a freelance full stack web developer with expertise in React, Next.js, Node.js, PostgreSQL, and cloud infrastructure.",
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
          <header className="py-6 px-6">JL</header>

          <main className="flex-1">{children}</main>

          <footer className="py-6 px-6 text-muted text-center italic text-xs">
            © 2026
          </footer>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
