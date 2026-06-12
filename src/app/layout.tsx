import type { Metadata } from "next";
import "./globals.css";
import "../../node_modules/tw-animate-css/dist/tw-animate.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Nitish Durga - Portfolio",
  description: "Personal portfolio of Nitish Durga, featuring Django, Python, and Web Development projects.",
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
    <html lang="en" data-theme="ocean-cyan" data-mode="dark">
      <head>
        {/* We can place standard head tags here if needed */}
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen bg-background text-text transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
