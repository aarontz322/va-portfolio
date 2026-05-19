"use client";

import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github, ShieldCheck } from "lucide-react";
import { BorderTrail } from "@/components/ui/border-trail";

// ─── Data ────────────────────────────────────────────────────────────────────

const commandCards = [
  { label: "Visibility", value: "One operating view for leads, owners, stages, and next actions." },
  { label: "Follow-up", value: "Reminders and tasks keep outreach from depending on memory." },
  { label: "Accountability", value: "Reports and audit history make VA work easier to verify." },
];

const features = [
  "Dashboard",
  "Lead database",
  "Kanban pipeline",
  "Reminders",
  "Reports",
  "Audit trail",
  "Workspaces",
  "Team roles",
];

const hardeningNotes = [
  "Hardened login, workspace recovery, and stale-cookie flows after production launch.",
  "Reduced serverless PostgreSQL pool pressure with safer sequential retry-wrapped queries.",
  "Added degraded-state API fallbacks and error boundaries to avoid blank production screens.",
];

const stackTags = ["Next.js 14", "TypeScript", "Prisma v5", "PostgreSQL", "Vercel"];

// ─── Variants ────────────────────────────────────────────────────────────────

const leftContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const panelStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const panelItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" as const },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function NovaCaseStudySection() {
  const shouldReduce = useReducedMotion();

  const progressRef = useRef<HTMLDivElement>(null);
  const progressInView = useInView(progressRef, { once: true, margin: "-80px" });

  return (
    <section
      id="nova"
      className="relative overflow-hidden border-y border-[hsl(var(--primary)/18%)] bg-[#061121] px-[5%] py-24"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--primary)/6%)_1px,transparent_1px),linear-gradient(hsl(var(--primary)/6%)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60 pointer-events-none" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">

        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <motion.div
          variants={leftContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-3 border border-[hsl(var(--primary)/35%)] bg-[hsl(var(--primary)/8%)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))]">
              <ShieldCheck className="h-4 w-4" />
              Flagship case study
            </div>
          </motion.div>

          {/* Logo — outer motion.div handles scroll-in only; inner div owns CSS animations
              so nova-float transform doesn't fight Framer Motion's y transform */}
          <motion.div variants={fadeUp} className="mb-8 w-full max-w-md">
            <div className="nova-logo-orbit">
              <div className="nova-logo-aura" />

              {/* Radar rings — CSS animation (reliable looping) */}
              <div className="nova-radar">
                <div className="nova-radar-ring" />
                <div className="nova-radar-ring" />
                <div className="nova-radar-ring" />
              </div>

              <Image
                src="/nova/nova-logo-transparent.png"
                alt="NOVA CRM logo"
                width={722}
                height={213}
                className="nova-logo-mark h-auto w-full"
                priority={false}
              />
            </div>
          </motion.div>

          {/* Eyebrow + headline */}
          <motion.div variants={fadeUp}>
            <p className="mb-3 text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              Revenue command center
            </p>
            <h2 className="mb-5 font-display text-4xl font-bold leading-none tracking-[-0.03em] md:text-6xl">
              NOVA CRM
            </h2>
          </motion.div>

          {/* Hero sub-headline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-xl font-light leading-relaxed text-[hsl(var(--foreground))] md:text-2xl"
          >
            A production lead generation command center for founders, agencies,
            and VA teams that need visible pipeline accountability.
          </motion.p>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))] md:text-base"
          >
            I designed, built, hardened, and launched NOVA as one place to manage
            leads, follow-ups, reminders, reports, audit trails, workspaces, and
            client accountability. Less scattered follow-up. More visible pipeline.
          </motion.p>

          {/* My Role */}
          <motion.div
            variants={fadeUp}
            className="mt-8 border-t border-[hsl(var(--primary)/14%)] pt-6"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              My role
            </p>
            <p className="text-sm leading-relaxed text-[hsl(var(--foreground))]">
              Product strategy · UI/UX direction · Full-stack development · Database design · Production debugging · Launch planning
            </p>
          </motion.div>

          {/* Stack */}
          <motion.div variants={fadeUp} className="mt-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {stackTags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={shouldReduce ? {} : { y: -2, transition: { duration: 0.15 } }}
                  className="cursor-default border border-[hsl(var(--primary)/22%)] bg-[hsl(var(--primary)/6%)] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[hsl(var(--primary))] transition-colors duration-200 hover:border-[hsl(var(--primary)/50%)] hover:bg-[hsl(var(--primary)/12%)]"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href="https://leadgen-app-nova.vercel.app"
              target="_blank"
              rel="noreferrer"
              whileHover={shouldReduce ? {} : { y: -1, transition: { duration: 0.15 } }}
              className="inline-flex cursor-pointer items-center gap-2 border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-colors duration-200 hover:bg-[hsl(var(--primary)/88%)]"
            >
              View Live App
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="https://github.com/aarontz322/nova"
              target="_blank"
              rel="noreferrer"
              aria-label="View NOVA CRM on GitHub"
              whileHover={shouldReduce ? {} : { y: -1, transition: { duration: 0.15 } }}
              className="inline-flex cursor-pointer items-center gap-2 border border-[hsl(var(--primary)/30%)] bg-transparent px-5 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition-colors duration-200 hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT PANEL ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduce ? 0 : 0.55, delay: shouldReduce ? 0 : 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative border border-[hsl(var(--primary)/22%)] bg-[#08182b] p-5"
        >
          <BorderTrail
            className="hidden bg-[hsl(var(--primary))] opacity-80 md:block"
            size={130}
            style={{ boxShadow: "0 0 26px 12px hsl(var(--primary)/0.35)" }}
          />

          {/* Inner card — staggered children */}
          <motion.div
            variants={panelStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="relative z-10 border border-[hsl(var(--primary)/18%)] bg-[#0b1f36]"
          >

            {/* Panel header */}
            <motion.div
              variants={panelItem}
              className="flex items-center justify-between border-b border-[hsl(var(--primary)/16%)] px-4 py-3"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  NOVA workspace
                </p>
                <p className="font-display text-lg font-bold">Command Center</p>
              </div>
              {/* Live status */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-2 w-2 bg-emerald-400"
                  animate={shouldReduce ? {} : {
                    opacity: [1, 0.35, 1],
                    scale: [1, 0.82, 1],
                  }}
                  transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                  Live
                </span>
              </div>
            </motion.div>

            {/* Command cards — nested stagger */}
            <motion.div
              variants={panelStagger}
              className="grid gap-3 p-4 sm:grid-cols-3"
            >
              {commandCards.map((item) => (
                <motion.div
                  key={item.label}
                  variants={panelItem}
                  whileHover={shouldReduce ? {} : { y: -2, transition: { duration: 0.15 } }}
                  className="group cursor-default border border-[hsl(var(--primary)/15%)] bg-white/[0.03] p-3 transition-colors duration-200 hover:border-[hsl(var(--primary)/40%)] hover:bg-white/[0.06]"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-snug transition-colors duration-200 group-hover:text-[hsl(var(--foreground))]">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Features + Hardening */}
            <div className="grid gap-4 border-t border-[hsl(var(--primary)/16%)] p-4 md:grid-cols-[0.9fr_1.1fr]">

              {/* Product surface */}
              <div>
                <motion.p
                  variants={panelItem}
                  className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--primary))]"
                >
                  Product surface
                </motion.p>
                <motion.div variants={panelStagger} className="grid grid-cols-2 gap-2">
                  {features.map((feature) => (
                    <motion.div
                      key={feature}
                      variants={panelItem}
                      whileHover={shouldReduce ? {} : { x: 2, transition: { duration: 0.15 } }}
                      className="cursor-default border border-[hsl(var(--primary)/14%)] bg-[#071426] px-3 py-2 text-xs text-[hsl(var(--foreground))] transition-colors duration-200 hover:border-[hsl(var(--primary)/35%)] hover:text-[hsl(var(--primary))]"
                    >
                      {feature}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Production hardening */}
              <div>
                <motion.p
                  variants={panelItem}
                  className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--primary))]"
                >
                  Production hardening
                </motion.p>
                <div className="space-y-3">
                  {hardeningNotes.map((note) => (
                    <motion.div
                      key={note}
                      variants={panelItem}
                      whileHover={shouldReduce ? {} : { x: 3, transition: { duration: 0.15 } }}
                      className="group cursor-default border-l-2 border-[hsl(var(--primary)/45%)] bg-white/[0.03] px-4 py-3 transition-all duration-200 hover:border-[hsl(var(--primary))] hover:bg-white/[0.06]"
                    >
                      <p className="text-xs leading-relaxed text-[hsl(var(--muted-foreground))] transition-colors duration-200 group-hover:text-[hsl(var(--foreground))]">
                        {note}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated progress bar */}
            <motion.div
              variants={panelItem}
              ref={progressRef}
              className="border-t border-[hsl(var(--primary)/16%)] p-4"
            >
              <div className="h-1.5 w-full bg-[#061121]">
                <motion.div
                  className="h-1.5 bg-[hsl(var(--primary))]"
                  initial={{ width: 0 }}
                  animate={{ width: progressInView ? "78%" : 0 }}
                  transition={{
                    duration: shouldReduce ? 0 : 1.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.25,
                  }}
                />
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                <span>Lead visibility</span>
                <span>Follow-up discipline</span>
                <span>Proof of work</span>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
