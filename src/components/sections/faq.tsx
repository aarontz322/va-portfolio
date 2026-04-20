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
    answer: "I'm proficient in Trello, Asana, ClickUp, or even a simple shared Google Sheet. We'll choose the platform that best fits your current workflow to ensure smooth handovers.",
    meta: "Workflow"
  },
  {
    question: "Can we start with a trial period?",
    answer: "Absolutely. I offer a 1-week paid trial period so we can see if our workflows and communication styles are a good match before committing to a longer retainer.",
    meta: "Process"
  },
  {
    question: "What industries do you specialize in?",
    answer: "I have extensive experience working with B2B SaaS founders, Real Estate investors, and Marketing Agencies. My skills are transferable to almost any industry.",
    meta: "Specialty"
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes! If none of my standard packages fit your specific needs, we can discuss a custom arrangement during our discovery call.",
    meta: "Pricing"
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-black">
       {/* We wrap the monochrome FAQ to match your site's dark mode by default */}
       <FAQ1 items={vaFaqs} />
    </section>
  );
}
