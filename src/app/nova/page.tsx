import Link from "next/link";
import { Nav } from "@/components/sections/nav";
import { pageMetadata } from "@/lib/site-url";
import { NovaWalkthrough } from "./walkthrough";

export const metadata = pageMetadata({
  path: "/nova",
  title: "Inside NOVA CRM | Aaron Novicio",
  description: "Follow one example lead through the CRM Aaron built, from prospect research to an outreach reminder and activity history.",
  image: "/nova/nova-logo-transparent.png",
  imageAlt: "NOVA CRM",
});

export default function NovaPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-[5%] pb-16 pt-28 lg:pt-32">
        <Link href="/#nova" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">← Back to Aaron’s portfolio</Link>
        <header className="mt-7 max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">Inside NOVA CRM</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">I built NOVA so a team can open a lead and see who owns it, what happened last, and what to do next. Follow one fictional prospect through that workflow.</p>
        </header>
        <NovaWalkthrough />
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-5 text-sm">
          <Link href="/#works" className="inline-flex min-h-11 items-center underline underline-offset-4">See more work samples</Link>
          <a href="https://leadgen-app-nova.vercel.app" className="inline-flex min-h-11 items-center underline underline-offset-4">NOVA client login ↗</a>
        </footer>
      </main>
    </>
  );
}
