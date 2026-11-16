import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { CursorCanvas } from "@/components/ui/cursor-canvas";
import { Providers } from "@/components/providers";
import { CrashGuard } from "@/components/ui/crash-guard";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  // Variable font: every weight from 100 to 1000 in one file, so bold text is real bold.
  display: "swap",
});

const SITE_URL = "https://aaron-va.vercel.app";
const TITLE = "Aaron Novicio — VA for Leads, CRM & Operations";
const DESCRIPTION =
  "Virtual Assistant specializing in lead generation, CRM management, and admin support for founders and growing teams.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aaron Novicio",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aaron Novicio, Virtual Assistant for Leads, CRM & Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Novicio",
  jobTitle: "Virtual Assistant",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/mark-aaron-novicio/",
    "https://www.upwork.com/freelancers/markaaronnovicio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-[hsl(var(--primary))] focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-[hsl(var(--primary-foreground))]"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <CrashGuard name="cursor trail">
          <CursorCanvas />
        </CrashGuard>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
