"use client";
import { BOOKING_URL } from "@/lib/contact";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ProfileCard } from "@/components/ui/profile-card";

const highlights = [
  "5+ years in VA, data entry, and lead generation",
  "Strong focus on data accuracy and repeatable workflows",
  "Clients in healthcare, legal, logistics, tourism, ecommerce, real estate, B2B SaaS, marketing agencies, and online coaching",
  "Healthcare admin with EHR systems and HIPAA awareness",
  "Lead research via LinkedIn Sales Navigator and ZoomInfo",
  "Automation experience with Make.com and Zapier",
  "Available nights and US time zones",
];

const experience = [
  { company: "Freelance", role: "Lead Generation Specialist and VA", desc: "150 to 200 verified leads per week for Pinnacle Logistics. Audited and adjusted rates, descriptions, and discount codes in the Tourplan app for Interopa Holidays. Ran 2 Expandi LinkedIn campaigns for Lucra Commerce with a 30% reply rate from connected leads. Cleaned 1,000+ CRM contacts and cut email bounce rate by 30%." },
  { company: "Carelon Global Solutions", role: "Customer Care Representative", desc: "40+ patient calls per day on prescription refills and prior authorizations, with full HIPAA compliance." },
  { company: "Accenture", role: "Health Operations Associate", desc: "Audited healthcare and insurance records at 99% accuracy. 3 performance awards in the first year." },
  { company: "Teleserv Asia Solutions", role: "Data Entry Specialist", desc: "Entered and updated client records at 75 to 80 WPM with 98% accuracy." },
];

// Totals across all client work. Numbers supplied by Aaron.
const wins = [
  { num: "100,000+", label: "Leads Verified" },
  { num: "30%", label: "LinkedIn Reply Rate" },
];

const tools = [
  "GoHighLevel","HubSpot","Instantly.ai","Make.com","Zapier",
  "Apollo.io","ZoomInfo","Airtable","n8n","Expandi","LinkedIn SalesNav","Notion",
  "Calendly","Trello","Google Workspace","Microsoft Office","WordPress","Canva",
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-[5%]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

        {/* Left - Profile Card */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ProfileCard
              name="Aaron Novicio"
              role="Lead Gen, Outreach and Automation Specialist"
              email="aaronnoviciova@gmail.com"
              bio="I help founders scale by automating their friction and managing their lead machines."
              avatarSrc="/about-me.jpg"
              skills={["Lead Gen", "Outreach", "Automations", "Data"]}
              status="available"
              socialLinks={{
                facebook: "https://www.facebook.com/aaronnovicio.va/",
                linkedin: "https://www.linkedin.com/in/mark-aaron-novicio/",
                onlinejobs: "https://v2.onlinejobs.ph/jobseekers/info/397279",
                upwork: "https://www.upwork.com/freelancers/markaaronnovicio",
              }}
              calendlyLink={BOOKING_URL}
            />
          </motion.div>
        </div>

        {/* Right - Bio & Experience */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-3">
              About Me
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] leading-[1.1] mb-6">
              5+ years keeping leads<br />
              and CRMs <span className="text-[hsl(var(--primary))]">clean.</span>
            </h2>
            <div className="space-y-3 text-[hsl(var(--muted-foreground))] text-base leading-relaxed max-w-xl mb-8">
              <p>I find and verify leads, keep the CRM tidy, and handle the admin behind it. I also built NOVA, my own lead generation CRM, so I know how a clean pipeline should work.</p>
            </div>

            {/* Two totals across all client work */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 mb-8">
              {wins.map((w) => (
                <div key={w.label}>
                  <div className="font-display text-2xl font-extrabold text-[hsl(var(--primary))]">{w.num}</div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-1">{w.label}</div>
                </div>
              ))}
            </div>

            {/* Highlights — previously unused */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-10"
            >
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-[hsl(var(--foreground))]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                  {h}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Core Experience — now renders desc */}
            <div>
              <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-4">
                Core Experience
              </div>
              <div className="space-y-4">
                {experience.map((e) => (
                  <div key={e.company} className="relative pl-4 border-l border-[hsl(var(--border))]">
                    <div className="font-display font-bold text-sm">{e.company}</div>
                    <div className="text-xs text-[hsl(var(--primary))] uppercase tracking-wider mb-1">{e.role}</div>
                    <p className="text-[13px] text-[hsl(var(--muted-foreground))] leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Skills */}
            <div>
              <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-4">
                Top Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.slice(0, 10).map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-medium px-2 py-1 rounded bg-[hsl(var(--primary)/8%)] border border-[hsl(var(--primary)/15%)] text-[hsl(var(--primary))]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
