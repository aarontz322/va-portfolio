"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BorderTrail } from "@/components/ui/border-trail";

type Work = {
  category: string;
  platform: string;
  title: string;
  desc: string;
  stats?: { value: string; label: string }[];
};

const works: Work[] = [
  {
    category: "leads",
    platform: "Lead Generation · LinkedIn",
    title: "LinkedIn Sales Navigator List",
    desc: "Targeted lead list with name, role, company, email pattern, and LinkedIn URLs — ready for outreach.",
    stats: [],
  },
  {
    category: "crm",
    platform: "Outreach · Instantly.ai",
    title: "Email Campaign",
    desc: "Full B2B outreach campaign — from list build to sequence execution and opportunity tracking.",
    stats: [
      { value: "76.9%", label: "Open Rate" },
      { value: "2,600",  label: "Contacts" },
      { value: "50",     label: "Opportunities" },
    ],
  },
  {
    category: "crm",
    platform: "CRM · GoHighLevel",
    title: "GHL Pipeline Setup & Cleanup",
    desc: "Full CRM organization including deduplication, pipeline stage setup, tagging, notes, and task assignment.",
    stats: [],
  },
  {
    category: "automation",
    platform: "Automation · Make.com",
    title: "Multi-Platform Automation",
    desc: "Workflows connecting Facebook/Instagram, Google Drive, Airtable, and HTTP modules — data moves automatically.",
    stats: [],
  },
  {
    category: "data",
    platform: "Data · Airtable",
    title: "Lead & Prospect Tracking Base",
    desc: "Airtable database for tracking leads, statuses, notes, and outreach history — with custom views per team member.",
    stats: [],
  },
  {
    category: "data",
    platform: "Data · Excel / Google Sheets",
    title: "Performance Dashboard & Reports",
    desc: "Sales performance charts, revenue tracking, and business metrics dashboards — clean enough to hand to a client.",
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
  },
  {
    category: "crm",
    platform: "CRM · HubSpot",
    title: "HubSpot Database Cleanup",
    desc: "Deduped and re-tagged contacts across a HubSpot instance — restored pipeline clarity and accurate stage tracking.",
    stats: [
      { value: "1,200+", label: "Contacts Cleaned" },
    ],
  },
];

const tabs = [
  { key: "all",        label: "All Work" },
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
            // Portfolio
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] mb-4">
            A glimpse of my work
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] font-light">
            Real work from real clients. Filter by category.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
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
                className="group relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
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

                {/* Metric stats — only shown when data exists */}
                {w.stats && w.stats.length > 0 && (
                  <div className="relative z-10 mt-5 pt-4 border-t border-[hsl(var(--border))] flex gap-5">
                    {w.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-xl font-extrabold text-[hsl(var(--primary))] leading-none">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-0.5">
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
      </div>
    </section>
  );
}
