"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { BorderTrail } from "@/components/ui/border-trail";
import { industries, portfolioProjects } from "@/lib/portfolio-projects";

type Work = {
  category: string;
  platform: string;
  title: string;
  desc: string;
  stats?: { value: string; label: string }[];
  /** Work preview or clearly labeled reconstruction using fictional data. */
  image?: { src: string; alt: string };
  demoHref?: string;
};

// Screenshots that match no single card. Shown as a small row under the grid.
const moreSamples = [
  { src: "/works/Example1.webp?v=2", alt: "Fictional outreach tracker showing each practice’s response and next action" },
  { src: "/works/Example2.webp?v=2", alt: "Fictional retail tenant shortlist comparing space needs, fit and follow-up" },
  { src: "/works/Example3.webp?v=2", alt: "Fictional hotel prospect list showing decision-making roles and verification status" },
  { src: "/works/Lead list.webp?v=2", alt: "Fictional lead export showing which records to include, merge or hold for review" },
  { src: "/works/instantly_2026-03-23 (2).webp", alt: "Instantly campaign chart showing contacted, opened, replied and opportunities" },
];

// Result cards exported from Instantly.ai for campaigns Aaron ran himself.
// Alt text repeats only what each card shows.
const campaignResults = [
  { src: "/works/results/instantly-varsity-base-82.webp", alt: "Instantly result card, Varsity Base: 82 opportunities created, 2,755 contacts engaged, 7,065 emails sent" },
  { src: "/works/results/instantly-gymnastics-45.webp", alt: "Instantly result card, gymnastics campaign: 45 opportunities created, 2,452 contacts engaged, 6,449 emails sent" },
  { src: "/works/results/instantly-youth-sports-37.webp", alt: "Instantly result card, youth and sports club campaign: 37 opportunities created, 1,270 contacts engaged, 3,649 emails sent" },
  { src: "/works/results/instantly-martial-arts-22.webp", alt: "Instantly result card, Varsity Base martial arts dojos campaign: 22 opportunities created, 837 contacts engaged, 2,443 emails sent" },
  { src: "/works/results/instantly-golf-30k.webp", alt: "Instantly result card, golf courses campaign: 6 opportunities and 49 replies" },
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
  ...portfolioProjects.map((project) => ({
    category: "websites",
    platform: `${industries[project.industry]} · Portfolio concept`,
    title: project.title,
    desc: project.desc,
    image: { src: `/works/${project.slug}.webp`, alt: project.alt },
    demoHref: `/work/${project.slug}`,
  })),
  {
    category: "crm",
    platform: "Outreach · Instantly.ai",
    title: "Email Campaign",
    desc: "Full B2B outreach campaign, from list build to sequence execution and opportunity tracking.",
    stats: [
      { value: "76.9%", label: "Open Rate" },
      { value: "2,600",  label: "Contacts" },
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
    desc: "Workflows connecting Facebook/Instagram, Google Drive, Airtable, and HTTP modules, so data moves automatically.",
    stats: [],
    image: { src: "/works/Make Sample Automations.webp", alt: "Make.com scenario list with Facebook, Instagram, Airtable and Google Drive automations" },
  },
  {
    category: "data",
    platform: "Data · Airtable",
    title: "Lead & Prospect Tracking Base",
    desc: "Airtable database for tracking leads, statuses, notes, and outreach history, with custom views per team member.",
    stats: [],
    image: { src: "/works/Airtable Auto.webp", alt: "Airtable base with status, post type, links and dates" },
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
  { key: "all",        label: "All Work" },
  { key: "websites",   label: "Websites" },
  { key: "leads",      label: "Lead Generation" },
  { key: "crm",        label: "CRM & Outreach" },
  { key: "automation", label: "Automations" },
  { key: "data",       label: "Data & Sheets" },
];

export function WorksSection() {
  const [active, setActive] = useState("all");

  const filtered = works.filter((w) => active === "all" || w.category === active);

  return (
    <section id="works" className="py-24 px-[5%]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-3">
            Portfolio
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] mb-4">
            Samples of my work
          </h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            Client work and self-initiated portfolio projects. Choose a category to explore.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((w) => (
              <motion.div
                key={w.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 hover:-translate-y-1 transition-[transform,box-shadow,border-color,background-color,color,opacity] duration-300 overflow-hidden flex flex-col"
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
                  {w.title}
                </h3>
                <p className="relative z-10 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed flex-1">
                  {w.desc}
                </p>

                {w.demoHref && (
                  <a
                    href={w.demoHref}
                    className="relative z-10 mt-3 inline-flex min-h-11 items-center self-start text-sm font-semibold text-[hsl(var(--primary))] underline underline-offset-4 hover:text-[hsl(var(--foreground))]"
                  >
                    Open live demo<span className="sr-only"> for {w.title}</span>
                  </a>
                )}

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
        <h3 className="font-display font-bold text-base mt-14 mb-2">Campaign results</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5 max-w-2xl">
          Cold email campaigns I ran in Instantly.ai. Pipeline value is Instantly&apos;s own estimate, not closed revenue.
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 list-none">
          {campaignResults.map((r) => (
            <li key={r.src}>
              <a
                href={r.src}
                target="_blank"
                rel="noopener noreferrer"
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

        {/* Extra screenshots */}
        <h3 className="font-display font-bold text-base mt-14 mb-5">More samples</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 list-none">
          {moreSamples.map((s) => (
            <li key={s.src}>
              <a
                href={encodeURI(s.src)}
                target="_blank"
                rel="noopener noreferrer"
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
      </div>
    </section>
  );
}
