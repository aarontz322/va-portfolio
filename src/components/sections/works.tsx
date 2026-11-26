"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { BorderTrail } from "@/components/ui/border-trail";
import { industries, portfolioProjects } from "@/lib/portfolio-projects";
import { WorkHelix, type HelixSample } from "./work-helix";
import { WebsiteGrid } from "./website-grid";
import styles from "./work-story.module.css";

type Work = {
  category: string;
  platform: string;
  title: string;
  desc: string;
  stats?: { value: string; label: string }[];
  /** Work preview or clearly labeled reconstruction using fictional data. */
  image?: { src: string; alt: string };
};

// Screenshots that match no single card. Shown as a small row under the grid.
const moreSamples = [
  { category: "leads", title: "Outreach follow-up tracker", src: "/works/Example1.webp?v=2", alt: "Fictional outreach tracker showing each practice’s response and next action" },
  { category: "leads", title: "Retail tenant shortlist", src: "/works/Example2.webp?v=2", alt: "Fictional retail tenant shortlist comparing space needs, fit and follow-up" },
  { category: "leads", title: "Hotel prospect list", src: "/works/Example3.webp?v=2", alt: "Fictional hotel prospect list showing decision-making roles and verification status" },
  { category: "leads", title: "Lead export quality check", src: "/works/Lead list.webp?v=2", alt: "Fictional lead export showing which records to include, merge or hold for review" },
  { category: "crm", title: "Instantly campaign chart", src: "/works/instantly_2026-03-23 (2).webp", alt: "Instantly campaign chart showing contacted, opened, replied and opportunities" },
];

// Result cards exported from Instantly.ai for campaigns Aaron ran himself.
// Alt text repeats only what each card shows.
const campaignResults = [
  { title: "Varsity Base campaign", src: "/works/results/instantly-varsity-base-82.webp", alt: "Instantly result card, Varsity Base: 82 opportunities created, 2,755 contacts engaged, 7,065 emails sent" },
  { title: "Gymnastics campaign", src: "/works/results/instantly-gymnastics-45.webp", alt: "Instantly result card, gymnastics campaign: 45 opportunities created, 2,452 contacts engaged, 6,449 emails sent" },
  { title: "Youth and sports club campaign", src: "/works/results/instantly-youth-sports-37.webp", alt: "Instantly result card, youth and sports club campaign: 37 opportunities created, 1,270 contacts engaged, 3,649 emails sent" },
  { title: "Martial arts campaign", src: "/works/results/instantly-martial-arts-22.webp", alt: "Instantly result card, Varsity Base martial arts dojos campaign: 22 opportunities created, 837 contacts engaged, 2,443 emails sent" },
  { title: "Golf courses campaign", src: "/works/results/instantly-golf-30k.webp", alt: "Instantly result card, golf courses campaign: 6 opportunities and 49 replies" },
];

const works: Work[] = [
  {
    category: "leads",
    platform: "Lead Generation · LinkedIn",
    title: "LinkedIn Sales Navigator List",
    desc: "Targeted lead list with name, role, company, email pattern, and LinkedIn URLs. Ready for outreach.",
    stats: [],
    image: { src: "/works/Example.webp?v=2", alt: "Fictional athletics outreach list showing school programs, contact roles and outreach signals" },
  },
  {
    category: "crm",
    platform: "Outreach · Instantly.ai",
    title: "Email Campaign",
    desc: "Four weeks of B2B outreach in Instantly, from the prospect list through replies and opportunities.",
    stats: [
      { value: "76.9%", label: "Open Rate" },
      { value: "2.6K", label: "Emails sent" },
    ],
    image: { src: "/works/Instantly.webp", alt: "Instantly campaign dashboard showing sent, open rate, reply rate and opportunities" },
  },
  {
    category: "crm",
    platform: "CRM · GoHighLevel",
    title: "GHL Pipeline Setup & Cleanup",
    desc: "Full CRM organization including deduplication, pipeline stage setup, tagging, notes, and task assignment.",
    stats: [],
    image: { src: "/works/GHL Sample.webp?v=2", alt: "Fictional CRM cleanup queue showing each contact’s stage and assigned task" },
  },
  {
    category: "automation",
    platform: "Automation · Make.com",
    title: "Multi-Platform Automation",
    desc: "A reconstructed list of my Make scenarios for social publishing, captions, and Airtable updates.",
    stats: [],
    image: { src: "/works/Make Sample Automations.webp?v=2", alt: "Reconstructed workflow list for social publishing, captions, Google Drive, HTTP and Airtable" },
  },
  {
    category: "data",
    platform: "Data · Airtable",
    title: "Social Publishing Calendar",
    desc: "An Airtable calendar for Facebook and Instagram posts, with captions, post types, publishing dates, and links.",
    stats: [],
    image: { src: "/works/Airtable Auto.webp", alt: "Social publishing calendar in Airtable showing captions, post types, and scheduled dates" },
  },
  {
    category: "data",
    platform: "Data · Excel / Google Sheets",
    title: "Performance Dashboard & Reports",
    desc: "Sales performance charts, revenue tracking, and business metrics dashboards, clean enough to hand to a client.",
    stats: [],
  },
  {
    category: "leads",
    platform: "Lead Generation · Apollo.io",
    title: "B2B Prospect Research",
    desc: "Scraped and verified decision-maker contacts across target industries using Apollo.io and ZoomInfo.",
    stats: [
      { value: "500+", label: "Verified Contacts" },
    ],
    image: { src: "/works/Example4.webp?v=2", alt: "Fictional investment prospect list showing firms, decision-making roles and investment focus" },
  },
  {
    category: "crm",
    platform: "CRM · HubSpot",
    title: "HubSpot Database Cleanup",
    desc: "Deduped and re-tagged contacts across a HubSpot instance. Restored pipeline clarity and accurate stage tracking.",
    stats: [
      { value: "1,000+", label: "Contacts Cleaned" },
    ],
  },
];

const tabs = [
  { key: "all",        label: "All samples" },
  { key: "leads",      label: "Lead Generation" },
  { key: "crm",        label: "CRM & Outreach" },
  { key: "automation", label: "Automations" },
  { key: "data",       label: "Data & Sheets" },
];

const cardId = (title: string) => "work-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
const websites = portfolioProjects.map(project => ({
  title: project.title,
  label: industries[project.industry],
  image: `/works/${project.slug}.webp`,
  alt: project.alt,
  desc: project.desc,
  href: `/work/${project.slug}`,
  action: "Open live demo",
})) satisfies (HelixSample & { desc: string })[];
function PortraitIntro() {
  const intro = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = intro.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.arrival = "waiting";
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      element.dataset.arrival = "visible";
      observer.disconnect();
    }, { threshold: .32 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const lettering = (word: string, start = 0) => Array.from(word, (char, index) =>
    <span aria-hidden="true" key={index} className={styles.letter} style={{ "--letter": index + start } as CSSProperties}>{char === " " ? "\u00a0" : char}</span>
  );
  return (
    <div ref={intro} data-aaron-intro="" className={styles.intro}>
      <div className={styles.introComposition}>
        <h2 aria-label="Hey, I’m Aaron" className={styles.greeting}>
          <span data-helix-intro-line="first" className={styles.greetingLine}>
            <span className={styles.word}>{lettering("Hey, I’m")}</span>
            <span className={styles.portrait} data-aaron-portrait="">
              <Image src="/aaron-intro-portrait.png" alt="Aaron Novicio" fill sizes="(max-width: 1280px) 13vw, 171px" />
            </span>
          </span>
          <span data-helix-intro-line="second" className={styles.nameLine}><span className={styles.word}>{lettering("Aaron", 5)}</span></span>
        </h2>
        <p className={styles.sampleCount}>({websites.length} {websites.length === 1 ? "website" : "websites"})</p>
      </div>
      <div className={styles.introLinks}>
        <div className={styles.sampleShortcuts}>
          <a href="#va-samples">Lead generation &amp; CRM samples</a>
          <a href="#work-card-list">Skip to website projects</a>
        </div>
        <p>Scroll to explore <span aria-hidden="true">↓</span></p>
      </div>
    </div>
  );
}

function OtherWorkSamples() {
  const [active, setActive] = useState("all");
  const cardList = useRef<HTMLDivElement>(null);
  const disclosure = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const openFromHash = () => {
      if (location.hash === "#va-samples" && disclosure.current) disclosure.current.open = true;
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);
  const filtered = works.filter((w) => active === "all" || w.category === active);

  // Browsers without scroll-driven CSS still get an entrance and exit.
  useEffect(() => {
    if (CSS.supports("animation-timeline", "view()") || !cardList.current) return;
    const observer = new IntersectionObserver(changes => {
      for (const entry of changes) {
        const card = entry.target as HTMLElement;
        card.dataset.edge = entry.isIntersecting ? "inside" : entry.boundingClientRect.bottom < window.innerHeight / 2 ? "above" : "below";
      }
    }, { rootMargin: "-6% 0px -6% 0px" });
    const cards = cardList.current.querySelectorAll<HTMLElement>("[data-work-card]");
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [active]);

  return (
    <details ref={disclosure} data-other-samples="" className={styles.otherSamples} open={!websites.length || undefined}>
      <summary id="va-samples">Lead generation, CRM &amp; operations samples</summary>
      <div ref={cardList} className="mt-6">
        <div role="group" aria-label="Filter work cards" className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              aria-pressed={active === tab.key}
              className={`px-4 py-2 min-h-11 rounded-lg text-xs font-medium border transition-[transform,box-shadow,border-color,background-color,color,opacity] duration-200 ${
                active === tab.key
                  ? "bg-[hsl(var(--primary)/10%)] border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                  : "bg-[hsl(var(--card))] border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/40%)] hover:text-[hsl(var(--primary))]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${styles.cardGrid}`}>
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((w) => (
              <motion.div
                key={w.title}
                id={cardId(w.title)}
                data-work-card=""
                tabIndex={-1}
                layout
                initial={false}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative scroll-mt-24 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 transition-[box-shadow,border-color,background-color,color] duration-300 overflow-hidden flex flex-col"
              >
                {w.image && (
                  <div className="relative z-10 -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                    <Image
                      src={w.image.src}
                      alt={w.image.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 370px"
                      className="object-cover object-left-top"
                    />
                  </div>
                )}
                <BorderTrail
                  className="bg-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
                  size={120}
                  style={{ boxShadow: "0 0 20px 10px hsl(var(--primary)/0.3)" }}
                />

                <div className="relative z-10 text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">
                  {w.platform}
                </div>
                <h3 className="relative z-10 font-display font-bold text-base mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {w.image ? <a href={w.image.src}>{w.title}</a> : w.title}
                </h3>
                <p className="relative z-10 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed flex-1">
                  {w.desc}
                </p>

                {/* Metric stats — only shown when data exists */}
                {w.stats && w.stats.length > 0 && (
                  <div className="relative z-10 mt-5 pt-4 border-t border-[hsl(var(--border))] flex gap-5">
                    {w.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-xl font-extrabold text-[hsl(var(--primary))] leading-none">
                          {s.value}
                        </div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Campaign result cards */}
        {(active === "all" || active === "crm") && <>
        <h3 className="font-display font-bold text-base mt-14 mb-2">Campaign results</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5 max-w-2xl">
          Cold email campaigns I ran in Instantly.ai. Pipeline value is Instantly&apos;s own estimate, not closed revenue.
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 list-none">
          {campaignResults.map((r) => (
            <li key={r.src} data-work-card="">
              <a
                href={r.src}
                className="group/result relative block aspect-[4/5] overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] transition-colors hover:border-[hsl(var(--primary)/60%)]"
              >
                <Image
                  src={r.src}
                  alt={r.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 215px"
                  className="object-cover transition-transform duration-300 group-hover/result:scale-105"
                />
              </a>
            </li>
          ))}
        </ul>
        </>}

        {/* Extra screenshots */}
        {moreSamples.some(s => active === "all" || s.category === active) && <>
        <h3 className="font-display font-bold text-base mt-14 mb-5">More samples</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 list-none">
          {moreSamples.filter(s => active === "all" || s.category === active).map((s) => (
            <li key={s.src} data-work-card="">
              <a
                href={encodeURI(s.src)}
                className="group/sample relative block aspect-[16/10] overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] transition-colors hover:border-[hsl(var(--primary)/60%)]"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 215px"
                  className="object-cover object-left-top transition-transform duration-300 group-hover/sample:scale-105"
                />
              </a>
            </li>
          ))}
        </ul>
        </>}
      </div>
    </details>
  );
}

export function WorksSection() {
  return (
    <section id="works" aria-label="Work samples" className={styles.works}>
      {!!websites.length && <WorkHelix samples={websites} intro={<PortraitIntro />} />}
      <div id="work-card-list" tabIndex={-1} className={styles.cardList}>
        {!!websites.length && <>
          <div className={styles.cardHeader}>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em]">Website projects</h2>
            <p className="text-[hsl(var(--muted-foreground))]">Self-initiated portfolio concepts</p>
          </div>
          <WebsiteGrid projects={websites} />
        </>}
        <OtherWorkSamples />
      </div>
    </section>
  );
}
