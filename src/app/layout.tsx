import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/content";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const { name, seo } = getProfile();
  return {
    title: { default: seo.title, template: `%s - ${name}` },
    description: seo.description,
  };
}

export const viewport: Viewport = { viewportFit: "cover" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
