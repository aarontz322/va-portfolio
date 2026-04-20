import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Aaron Novicio — VA for Leads, CRM & Operations",
  description:
    "Virtual Assistant specializing in lead generation, CRM management, and admin support for founders and growing teams.",
};

import { CursorCanvas } from "@/components/ui/cursor-canvas";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
        <CursorCanvas />
        {children}
      </body>
    </html>
  );
}
