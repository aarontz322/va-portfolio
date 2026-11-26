"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  TestimonialsColumn,
  testimonials,
} from "@/components/ui/testimonials-columns";
import { MOTION } from "@/lib/motion";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 5);

export function TestimonialsSection() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      id="testimonials"
      className="py-24 px-[5%] bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--card))]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-12"
        >
          <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-3">
            Client Reviews
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] mb-4">
            What clients say
          </h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            Real feedback from founders and teams I've worked with directly.
          </p>
        </motion.div>

        {MOTION.testimonialScroll && (
          <div className="mb-4 flex justify-center motion-reduce:hidden">
            <button type="button" aria-controls="client-reviews" onClick={() => setPaused(value => !value)}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-4 text-sm font-medium hover:border-[hsl(var(--primary))]">
              {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
              {paused ? "Resume reviews" : "Pause reviews"}
            </button>
          </div>
        )}
        <div id="client-reviews" className={`flex justify-center gap-6 ${MOTION.testimonialScroll ? "[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[580px] overflow-hidden motion-reduce:max-h-none motion-reduce:[mask-image:none]" : ""}`}>
          {/* Phones: one column with all five reviews, in the original order */}
          <TestimonialsColumn
            testimonials={testimonials}
            className="md:hidden"
            duration={26}
            paused={paused}
          />
          <TestimonialsColumn
            testimonials={firstColumn}
            className="hidden md:block"
            duration={14}
            paused={paused}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={18}
            paused={paused}
          />
        </div>
      </div>
    </section>
  );
}
