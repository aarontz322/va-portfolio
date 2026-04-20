"use client";
import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  testimonials,
} from "@/components/ui/testimonials-columns";

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 px-[5%] bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(222_40%_7%)]"
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
            // Client Reviews
          </div>
          <div className="inline-flex items-center border border-[hsl(var(--border))] px-4 py-1 rounded-lg text-sm text-[hsl(var(--muted-foreground))] mb-4">
            Testimonials
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            What clients say
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] font-light">
            Real feedback from founders and teams I've worked with directly.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[580px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={14} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={18}
          />
        </div>
      </div>
    </section>
  );
}
