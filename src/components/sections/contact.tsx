"use client";
import { BOOKING_URL } from "@/lib/contact";
import { motion } from "framer-motion";
import { Mail, Globe, Linkedin } from "lucide-react";
import { SiUpwork } from "react-icons/si";
import { ShinyButton } from "@/components/ui/shiny-button";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

export function ContactSection() {
  return (
    <>
      {/* Contact CTA */}
      <section
        id="contact"
        className="py-24 px-[5%] bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--background))]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-4">
              Let's Work Together
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] mb-5">
              Ready to get your operations{" "}
              <span className="text-[hsl(var(--primary))]">under control?</span>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base mb-10 max-w-md mx-auto">
              Book a free 30-minute discovery call. We'll talk through where
              you're stuck and figure out if I'm the right fit.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <ShinyButton
                href={BOOKING_URL}
                className="text-[hsl(var(--foreground))] border border-[hsl(var(--primary)/50%)] bg-[hsl(var(--primary)/10%)] px-10 py-3 text-sm"
              >
                Book a Free Call
              </ShinyButton>
              <a
                href="mailto:aaronnoviciova@gmail.com"
                className="px-10 py-3 rounded-lg border border-[hsl(var(--border))] text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
              >
                Send an Email
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-10 border-t border-[hsl(var(--border))]">
              {[
                { icon: Mail,     label: "aaronnoviciova@gmail.com", href: "mailto:aaronnoviciova@gmail.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mark-aaron-novicio/" },
                { icon: SiUpwork, label: "Upwork", href: "https://www.upwork.com/freelancers/markaaronnovicio" },
                { icon: Globe,    label: "Working Remotely · PH" },
              ].map((item) => {
                const Icon = item.icon;
                const inner = (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary)/10%)] border border-[hsl(var(--border))] flex items-center justify-center">
                      <Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </div>
                    {item.label}
                  </>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex min-h-11 items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hover Footer */}
      <footer className="relative border-t border-[hsl(var(--border))] overflow-hidden">
        <FooterBackgroundGradient />

        {/* Big hover text — draws itself on load, glows blue on cursor hover */}
        <div className="relative z-10 h-24 md:h-44 w-full px-4">
          <TextHoverEffect text="AARON NOVICIO" duration={0.3} />
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 border-t border-[hsl(var(--border))] px-[5%] py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
          <span>© 2026 Aaron Novicio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a
              href="mailto:aaronnoviciova@gmail.com"
              className="inline-flex min-h-11 items-center hover:text-[hsl(var(--primary))] transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.upwork.com/freelancers/markaaronnovicio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-[hsl(var(--primary))] transition-colors"
            >
              Upwork
            </a>
            <a
              href="https://www.linkedin.com/in/mark-aaron-novicio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-[hsl(var(--primary))] transition-colors"
            >
              LinkedIn
            </a>
            <span>VA for Leads, CRM & Operations</span>
          </div>
        </div>
      </footer>
    </>
  );
}
