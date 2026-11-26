import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { CursorCanvas } from "@/components/ui/cursor-canvas";
import { Providers } from "@/components/providers";
import { CrashGuard } from "@/components/ui/crash-guard";
import { pageMetadata, SITE_ORIGIN } from "@/lib/site-url";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  ...pageMetadata({
    path: "/",
    title: "Aaron Novicio | Lead Generation, CRM & Operations",
    description: "I build lead lists, manage outreach and keep CRMs organized. Explore my client work, the NOVA CRM I built, and my website design portfolio.",
    image: "/og.png",
    imageAlt: "Aaron Novicio, virtual assistant for leads, CRM and operations",
  }),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Novicio",
  jobTitle: "Virtual Assistant",
  url: SITE_ORIGIN,
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
