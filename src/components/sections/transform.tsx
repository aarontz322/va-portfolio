"use client";
import { motion } from "framer-motion";
import { BorderTrail } from "@/components/ui/border-trail";

const items = [
  { from: "You spend hours building lead lists — the data is incomplete or wrong.", to: "You get a verified, outreach-ready list with every field you need." },
  { from: "Your CRM is full of duplicates, missing notes, and outdated contacts.", to: "Your CRM is clean, tagged, and easy to navigate in minutes." },
  { from: "Admin tasks pile up and you keep switching tabs all day.", to: "Your inbox, calendar, and tasks stay on track so nothing slips." },
  { from: "You need someone reliable — not someone you have to chase.", to: "You get clear daily updates and on-time delivery, every time." },
  { from: "You've been burned by freelancers who delivered inaccurate data.", to: "You get a detail-obsessed VA who treats accuracy as non-negotiable." },
];

export function TransformSection() {
  return (
    <section id="services" className="py-24 px-[5%] bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(222_40%_7%)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-3">
            // The Problem & Solution
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            I fix the gaps that slow you down.
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base font-light">
            Every founder hits the same walls. Here's where I come in.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-[1fr_48px_1fr] items-stretch group"
            >
              <div className="relative flex items-center gap-3 bg-red-950/20 border border-red-500/30 rounded-l-xl px-5 py-4 text-sm text-[hsl(var(--muted-foreground))] shadow-[0_0_15px_rgba(239,68,68,0.05)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 overflow-hidden">
                <BorderTrail
                  className="bg-red-500"
                  size={100}
                  transition={{
                    duration: 6,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  style={{
                    boxShadow: "0 0 15px 5px rgba(239,68,68,0.4)",
                  }}
                />
                <span className="relative z-10 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.3)]">✕</span>
                <span className="relative z-10">{item.from}</span>
              </div>
              <div className="flex items-center justify-center bg-[hsl(var(--background))] border-y border-[hsl(var(--border))] text-[hsl(var(--primary))] text-lg group-hover:text-white transition-colors relative z-10">→</div>
              <div className="relative flex items-center gap-3 bg-[hsl(var(--primary)/8%)] border border-[hsl(var(--primary)/30%)] rounded-r-xl px-5 py-4 text-sm text-[hsl(var(--foreground))] shadow-[0_0_15px_hsl(var(--primary)/0.1)] group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] transition-all duration-300 overflow-hidden">
                <BorderTrail
                  className="bg-[hsl(var(--primary))]"
                  size={120}
                  style={{
                    boxShadow: "0 0 20px 10px hsl(var(--primary)/0.3)",
                  }}
                />
                <span className="relative z-10 w-6 h-6 rounded-full bg-[hsl(var(--primary)/20%)] flex items-center justify-center text-[hsl(var(--primary))] text-xs shrink-0 shadow-[0_0_10px_hsl(var(--primary)/0.4)]">✓</span>
                <span className="relative z-10">{item.to}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
