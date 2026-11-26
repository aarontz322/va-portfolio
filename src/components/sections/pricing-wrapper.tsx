"use client";
import { BOOKING_URL } from "@/lib/contact";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { PricingSection } from "@/components/ui/pricing";

const plans = [
  {
    name: "Base Ops",
    info: "For founders who need reliable help without full-time commitment.",
    price: { monthly: 400, yearly: 3840 },
    features: [
      { text: "10 hours/week", tooltip: "Flexible hours distributed across the week" },
      { text: "Lead generation & research" },
      { text: "Data entry & spreadsheets" },
      { text: "Basic admin support" },
      { text: "Daily progress updates" },
      { text: "US time zone availability" },
    ],
    btn: { text: "Book a Free Call", href: BOOKING_URL },
  },
  {
    name: "Scale & Automate",
    info: "For businesses that need steady, hands-on help week after week.",
    price: { monthly: 640, yearly: 6144 },
    features: [
      { text: "20 hours/week", tooltip: "Dedicated hours across weekdays" },
      { text: "Everything in Base Ops" },
      { text: "CRM management & cleanup", tooltip: "HubSpot, GoHighLevel, Close CRM, Google Sheets" },
      { text: "Email & LinkedIn outreach support" },
      { text: "Competitor & prospect research" },
      { text: "SOP documentation & follow-through" },
    ],
    btn: { text: "Book a Free Call", href: BOOKING_URL },
    highlighted: true,
  },
  {
    name: "Executive Support",
    info: "For busy executives and teams who need a lot covered.",
    price: { monthly: 960, yearly: 9216 },
    features: [
      { text: "30 hours/week", tooltip: "Near full-time dedicated support" },
      { text: "Everything in Scale & Automate" },
      { text: "Executive & calendar management" },
      { text: "Healthcare admin support", tooltip: "EHR, HIPAA-aware compliance work" },
      { text: "Automation support (Make, Zapier)" },
      { text: "Priority response & turnaround" },
    ],
    btn: { text: "Book a Free Call", href: BOOKING_URL },
  },
];

export function PricingSectionWrapper() {
  return (
    <section id="pricing" className="py-24 px-[5%] bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--background))]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <div className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-3">
            Packages
          </div>
        </motion.div>

        <PricingSection
          heading="Which package fits your needs?"
          description="All packages are monthly retainers with set weekly hours. No long-term lock-in, no hidden fees."
          plans={plans}
          className="text-[hsl(var(--foreground))]"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl px-6 py-5 flex items-start sm:items-center gap-5 max-w-4xl mx-auto"
        >
          <div className="w-11 h-11 rounded-lg bg-[hsl(var(--primary)/10%)] border border-[hsl(var(--primary)/20%)] flex items-center justify-center shrink-0">
            <Zap className="h-5 w-5 text-[hsl(var(--primary))]" aria-hidden="true" />
          </div>
          <p className="text-base text-[hsl(var(--muted-foreground))]">
            <strong className="text-[hsl(var(--foreground))]">Not ready for a retainer?</strong> No
            problem. You can still get expert support at{" "}
            <strong className="text-[hsl(var(--foreground))]">$8–10/hr</strong>. Good for
            one-time tasks or flexible help as needed.{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[hsl(var(--primary))] underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Book a free call
            </a>{" "}
            and we'll figure it out.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
