"use client";
import { motion } from "framer-motion";
import { BorderTrail } from "@/components/ui/border-trail";

const services = [
  { icon: "🎯", title: "Lead Generation", desc: "High-quality leads built to your niche and targeting rules. Every record includes name, role, email pattern, LinkedIn, website, and notes.", rate: "Starting at $8/hr" },
  { icon: "🗂️", title: "CRM Management", desc: "Close CRM, HubSpot, GoHighLevel, and Google Sheets. Deduping, tagging, pipeline updates, notes, tasks, and clean reporting.", rate: "Starting at $8/hr" },
  { icon: "📊", title: "Data Entry & Spreadsheets", desc: "Fast, accurate data entry. Formatting, cleanup, validation, and tracking sheets — built on experience from Accenture and Pinnacle Logistics.", rate: "Starting at $8/hr" },
  { icon: "⚙️", title: "Executive & Admin Support", desc: "Inbox management, scheduling, file organization, SOP follow-through, and recurring task execution. I keep the engine running.", rate: "Starting at $8/hr" },
  { icon: "🏥", title: "Healthcare Admin Support", desc: "EHR updates, patient record verification, and HIPAA-aware compliance admin work. Experience with Arizona Natural Health Center using MPN.", rate: "Starting at $8/hr" },
  { icon: "🔍", title: "Competitor Research", desc: "Industry trend analysis, competitor research, and market intel — pulled together into clear, useful reports you can act on.", rate: "Starting at $8/hr" },
];

export function ServicesSection() {
  return (
    <section className="py-24 px-[5%]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-3">// What I Do</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] mb-4">Services I offer as your VA</h2>
          <p className="text-[hsl(var(--muted-foreground))] font-light">Six things I do well — so you can hand them off and stop thinking about them.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <BorderTrail
                className="bg-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
                size={120}
                style={{
                  boxShadow: "0 0 20px 10px hsl(var(--primary)/0.3)",
                }}
              />
              <div className="relative z-10 w-11 h-11 rounded-xl bg-[hsl(var(--primary)/10%)] border border-[hsl(var(--primary)/20%)] flex items-center justify-center text-xl mb-5 shadow-[0_0_15px_hsl(var(--primary)/0.05)] group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all">
                {s.icon}
              </div>
              <h3 className="relative z-10 font-display font-bold text-base mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">{s.title}</h3>
              <p className="relative z-10 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">{s.desc}</p>
              <span className="relative z-10 text-xs font-semibold text-[hsl(var(--primary))]">{s.rate}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
