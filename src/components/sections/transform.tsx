"use client";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, X } from "lucide-react";
import { BorderTrail } from "@/components/ui/border-trail";

const items = [
  { from: "You spend hours building lead lists, and the data is incomplete or wrong.", to: "You get a verified, outreach-ready list with every field you need." },
  { from: "Your CRM is full of duplicates, missing notes, and outdated contacts.", to: "Your CRM is clean, tagged, and easy to navigate in minutes." },
  { from: "Admin tasks pile up and you keep switching tabs all day.", to: "Your inbox, calendar, and tasks stay on track so nothing slips." },
  { from: "You need someone reliable, not someone you have to chase.", to: "You get clear daily updates and on-time delivery, every time." },
  { from: "You've been burned by freelancers who delivered inaccurate data.", to: "Every record is checked before it reaches you." },
];

export function TransformSection() {
  return (
    <section className="py-24 px-[5%] bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--card))]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-3">
            The Problem & Solution
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] mb-4">
            I fix the gaps that slow you down.
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base">
            Every founder hits the same walls. Here's where I come in.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5 md:gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] items-stretch group"
            >
              <div className="relative flex items-center gap-3 bg-red-950/20 border border-red-500/30 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl px-5 py-4 text-sm text-[hsl(var(--muted-foreground))] shadow-[0_0_15px_rgba(239,68,68,0.05)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-[transform,box-shadow,border-color,background-color,color,opacity] duration-300 overflow-hidden">
                <BorderTrail
                  className="bg-red-500 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                <span className="relative z-10 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.3)]" aria-hidden="true"><X className="h-3.5 w-3.5" /></span>
                <span className="relative z-10"><span className="sr-only">Problem: </span>{item.from}</span>
              </div>
              <div className="flex items-center justify-center bg-[hsl(var(--background))] border-x md:border-x-0 md:border-y border-[hsl(var(--border))] text-[hsl(var(--primary))] py-1.5 md:py-0 group-hover:text-white transition-colors relative z-10" aria-hidden="true"><ArrowDown className="h-4 w-4 md:hidden" /><ArrowRight className="hidden h-4 w-4 md:block" /></div>
              <div className="relative flex items-center gap-3 bg-[hsl(var(--primary)/8%)] border border-[hsl(var(--primary)/30%)] rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl px-5 py-4 text-sm text-[hsl(var(--foreground))] shadow-[0_0_15px_hsl(var(--primary)/0.1)] group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] transition-[transform,box-shadow,border-color,background-color,color,opacity] duration-300 overflow-hidden">
                <BorderTrail
                  className="bg-[hsl(var(--primary))] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  size={120}
                  style={{
                    boxShadow: "0 0 20px 10px hsl(var(--primary)/0.3)",
                  }}
                />
                <span className="relative z-10 w-6 h-6 rounded-full bg-[hsl(var(--primary)/20%)] flex items-center justify-center text-[hsl(var(--primary))] shrink-0 shadow-[0_0_10px_hsl(var(--primary)/0.4)]" aria-hidden="true"><Check className="h-3.5 w-3.5" /></span>
                <span className="relative z-10"><span className="sr-only">Solution: </span>{item.to}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
