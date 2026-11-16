"use client";
import { FAQ1 } from "@/components/faq-monocrhome";

const vaFaqs = [
  {
    question: "What are your working hours?",
    answer: "I primarily work in US Eastern Time (EST/EDT) but can adjust to your specific time zone as needed. I ensure at least 4-5 hours of overlap for real-time collaboration.",
    meta: "Availability"
  },
  {
    question: "How do we manage tasks?",
    answer: "I work inside the task tool you already use, or a simple shared Google Sheet. We pick what fits your current workflow so handovers stay smooth.",
    meta: "Workflow"
  },
  {
    question: "Can we start with a trial period?",
    answer: "Yes. I offer a 1-week paid trial period so we can see if our workflows and communication styles are a good match before committing to a longer retainer.",
    meta: "Process"
  },
  {
    question: "What industries do you specialize in?",
    answer: "I have worked with clients in healthcare, legal, logistics, tourism and ecommerce, plus B2B SaaS founders, real estate investors, marketing agencies and online coaches.",
    meta: "Specialty"
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes. If none of my standard packages fit your specific needs, we can discuss a custom arrangement during our discovery call.",
    meta: "Pricing"
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-[hsl(var(--surface-deep))]">
       {/* We wrap the monochrome FAQ to match your site's dark mode by default */}
       <FAQ1 items={vaFaqs} />
    </section>
  );
}
