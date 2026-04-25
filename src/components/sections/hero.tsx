"use client";
import { motion } from "framer-motion";
import { ShinyButton } from "@/components/ui/shiny-button";
import { SplineScene } from "@/components/ui/splite";
import { BorderTrail } from "@/components/ui/border-trail";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-20 px-[5%]">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-[hsl(var(--card))] border border-[hsl(var(--primary)/30%)] rounded-full px-4 py-1.5 text-xs font-medium text-[hsl(var(--primary))] uppercase tracking-widest mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
            Available for new clients
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] mb-6"
          >
            Your leads.<br />
            Your CRM.<br />
            <span className="text-[hsl(var(--primary))]">Done right.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[hsl(var(--muted-foreground))] text-lg font-light leading-relaxed max-w-lg mb-10"
          >
            I help founders and growing teams keep their lead pipelines clean,
            their CRM in order, and their daily operations moving — without the back-and-forth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <ShinyButton
              onClick={() => window.open("https://calendly.com/eyronggwp/30min", "_blank")}
              className="text-[hsl(var(--foreground))] border border-[hsl(var(--primary)/50%)] bg-[hsl(var(--primary)/10%)] px-8 py-3 text-sm"
            >
              Schedule a Discovery Call
            </ShinyButton>
            <a
              href="#works"
              className="px-8 py-3 rounded-lg border border-[hsl(var(--border))] text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
            >
              View My Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-10 pt-8 border-t border-[hsl(var(--border))]"
          >
            {[
              { num: "5+", label: "Years Experience" },
              { num: "10+", label: "Clients Served" },
              { num: "76.9%", label: "Avg Email Open Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-extrabold text-[hsl(var(--primary))]">
                  {stat.num}
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Interactive 3D Scene */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex flex-col items-center gap-4"
        >
          {/* 3D viewport card */}
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-[hsl(var(--primary)/25%)] bg-[hsl(var(--card))] group">
            <BorderTrail
              className="bg-[hsl(var(--primary))] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              size={120}
              transition={{
                duration: 4,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{
                boxShadow: "0 0 25px 12px hsl(var(--primary)/0.4)",
              }}
            />
            
            {/* Ambient glow behind scene */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,hsl(var(--primary)/18%),transparent_65%)] pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/8%),transparent_80%)] pointer-events-none z-10" />

            {/* Corner accent */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
              <span className="text-[10px] font-mono text-[hsl(var(--primary))] uppercase tracking-widest opacity-80">
                Interactive · Drag to explore
              </span>
            </div>

            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* Caption row */}
          <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
            <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--primary)/8%)] border border-[hsl(var(--primary)/20%)] text-[hsl(var(--primary))] font-medium">
              Make.com
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--primary)/8%)] border border-[hsl(var(--primary)/20%)] text-[hsl(var(--primary))] font-medium">
              Zapier
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--primary)/8%)] border border-[hsl(var(--primary)/20%)] text-[hsl(var(--primary))] font-medium">
              HubSpot
            </span>
            <span className="opacity-60">& more</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
