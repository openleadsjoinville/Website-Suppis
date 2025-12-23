import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suppis Soluções de Interiores - O seu imóvel nas mãos certas",
  description: "Especialistas em projeto de interiores e marcenaria com execução integrada.",
  icons: {
    icon: "https://suppis2.openleads.com.br/wp-content/uploads/2025/12/ico-suppis.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
