import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jennifer Louise",
  description: "Chasing daydreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
