import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../node_modules/tw-animate-css/dist/tw-animate.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nitish Durga Bytaru - Portfolio",
  description:
    "Portfolio of Nitish Durga Bytaru, a full stack web developer building with React, Node.js, Flask and MongoDB.",
  icons: {
    icon: "/NitishPIC.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <noscript>
          <style>{`.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale{opacity:1;transform:none}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col bg-background text-text">
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-grow outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
