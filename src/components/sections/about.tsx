"use client";
import { motion } from "framer-motion";
import { ProfileCard } from "@/components/ui/profile-card";

const highlights = [
  "5+ years in VA, data entry, and lead generation",
  "Strong focus on data accuracy and repeatable workflows",
  "Experience with online coaches, real estate, and healthcare",
  "Healthcare admin with EHR systems and HIPAA awareness",
  "Lead research via LinkedIn Sales Navigator and ZoomInfo",
  "Automation experience with Make.com and Zapier",
  "Available nights and US time zones",
];

const experience = [
  { company: "Accenture", role: "Data Entry Specialist", desc: "High-volume data processing with strict accuracy requirements in a corporate operations environment." },
  { company: "Arizona Natural Health Center", role: "Healthcare Admin VA", desc: "EHR updates, patient record management, compliance-focused admin using MPN and Mailchimp email support." },
  { company: "Pinnacle Logistics", role: "Lead Generation & Outreach VA", desc: "LinkedIn outreach campaigns hitting 20+ accepted invites per week with steady pipeline results." },
];

const tools = [
  "GoHighLevel","HubSpot","Instantly.ai","Make.com","Zapier",
  "Apollo.io","ZoomInfo","Airtable","LinkedIn SalesNav","Notion",
  "Calendly","Trello","Google Workspace","Microsoft Office","WordPress","Canva",
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-[5%]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
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
              email="eyronggwp@gmail.com"
              bio="I help founders scale by automating their friction and managing their lead machines."
              avatarSrc="/about-me.jpg"
              skills={["Lead Gen", "Outreach", "Automations", "Data"]}
              status="available"
              socialLinks={{
                facebook: "https://www.facebook.com/AaroonFPS/",
                linkedin: "https://www.linkedin.com/in/mark-aaron-novicio/",
                onlinejobs: "https://v2.onlinejobs.ph/jobseekers/info/397279",
                upwork: "https://www.upwork.com/freelancers/~016f67fb01cce8e9ab",
              }}
              calendlyLink="https://calendly.com/eyronggwp/30min"
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
              // About Me
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-[1.1] mb-8">
              Detail-focused.<br />
              Process-driven.<br />
              <span className="text-[hsl(var(--primary))]">Reliable.</span>
            </h2>
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] text-base font-light leading-relaxed max-w-xl">
              <p>I help founders and teams keep their leads clean, their CRM in order, and their daily operations moving without the back-and-forth.</p>
              <p>My focus is simple: make sure nothing falls through the cracks. Clean lead data, organized CRMs, admin that actually gets done.</p>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-4">
                Core Experience
              </div>
              <div className="space-y-3">
                {experience.map((e, i) => (
                  <div key={e.company} className="relative pl-4 border-l border-[hsl(var(--border))]">
                    <div className="font-display font-bold text-sm">{e.company}</div>
                    <div className="text-[10px] text-[hsl(var(--primary))] uppercase tracking-wider mb-1">{e.role}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-4">
                Top Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.slice(0, 8).map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-medium px-2 py-1 rounded bg-[hsl(var(--primary)/8%)] border border-[hsl(var(--primary)/15%)] text-[hsl(var(--primary))]"
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
