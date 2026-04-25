"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BorderTrail } from "@/components/ui/border-trail";

const works = [
  { category: "leads", platform: "Lead Generation", title: "LinkedIn Sales Navigator List", desc: "Targeted lead list built using LinkedIn Sales Navigator with name, role, company, email pattern, and LinkedIn URLs — ready for outreach." },
  { category: "crm", platform: "Outreach · Instantly.ai", title: "Email Campaign — 76.9% Open Rate", desc: "2,600 contacts contacted. 1,021 opened. 98 replied. 50 opportunities generated for a B2B campaign." },
  { category: "crm", platform: "CRM · GoHighLevel", title: "GHL Pipeline Setup & Cleanup", desc: "Full CRM organization including contact deduplication, pipeline stage setup, tagging, notes, and task assignment across client accounts." },
  { category: "automation", platform: "Automation · Make.com", title: "Multi-Platform Automation Scenarios", desc: "Built automation workflows connecting Facebook/Instagram, Google Drive, Airtable, and HTTP modules — data moves where it needs to go, automatically." },
  { category: "data", platform: "Data · Airtable", title: "Lead & Prospect Tracking Base", desc: "Airtable database built for tracking leads, statuses, notes, and outreach history — with custom views and filters for each team member." },
  { category: "data", platform: "Data · Excel / Google Sheets", title: "Performance Dashboard & Reports", desc: "Sales performance charts, revenue tracking, and business metrics dashboards built in Excel — clean enough to hand straight to a client or manager." },
  { category: "leads", platform: "Lead Generation · Apollo.io", title: "B2B Prospect Research", desc: "Scraped and verified 500+ decision-maker contacts across target industries using Apollo.io and ZoomInfo — validated email patterns included." },
  { category: "crm", platform: "CRM · HubSpot", title: "HubSpot Contact Database Cleanup", desc: "Deduped and re-tagged 1,200+ contacts across a HubSpot instance — restored pipeline clarity and accurate stage tracking." },
];

const tabs = [
  { key: "all", label: "All Work" },
  { key: "leads", label: "Lead Generation" },
  { key: "crm", label: "CRM & Outreach" },
  { key: "automation", label: "Automations" },
  { key: "data", label: "Data & Sheets" },
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
                className="group relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <BorderTrail
                  className="bg-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
                  size={120}
                  style={{
                    boxShadow: "0 0 20px 10px hsl(var(--primary)/0.3)",
                  }}
                />
                <div className="relative z-10 text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">
                  {w.platform}
                </div>
                <h3 className="relative z-10 font-display font-bold text-base mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">{w.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
