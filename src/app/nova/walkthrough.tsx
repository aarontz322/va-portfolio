"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    name: "Research the lead",
    note: "I give the prospect an owner and save the reason for reaching out. Someone picking up the record can see why this company belongs on the list.",
    stage: "New",
    next: "Send an introduction",
    activity: ["Monday · Aaron added the company and noted its new distribution site."],
  },
  {
    name: "Record the outreach",
    note: "After the first email, I record the contact and set a reminder. The next person can see when a follow-up is due.",
    stage: "Contacted",
    next: "Follow up on Thursday",
    activity: ["Tuesday · Aaron logged the introduction and set a Thursday reminder.", "Monday · Lead added."],
  },
  {
    name: "Hand over the reply",
    note: "When the prospect replies, I update the stage and record what they asked for. The owner can pick up the conversation from its history.",
    stage: "Engaged",
    next: "Send the requested service overview",
    activity: ["Wednesday · Prospect replied and asked for a service overview.", "Tuesday · Introduction sent and reminder set.", "Monday · Lead added."],
  },
];

export function NovaWalkthrough() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  return (
    <section aria-label="NOVA workflow walkthrough" className="mt-10 grid gap-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 sm:p-8 lg:grid-cols-[.83fr_1.17fr]">
      <div>
        <p className="mb-3 text-sm text-[hsl(var(--muted-foreground))]">Step {index + 1} of {steps.length}</p>
        <div aria-live="polite" aria-atomic="true">
          <h2 className="font-display text-3xl font-bold tracking-tight">{step.name}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-[hsl(var(--muted-foreground))]">{step.note}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-4 text-sm disabled:opacity-40" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            <ArrowLeft aria-hidden="true" size={15} /> Back
          </button>
          <button className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 text-sm font-semibold text-[hsl(var(--primary-foreground))]" onClick={() => setIndex((index + 1) % steps.length)}>
            {index === steps.length - 1 ? "Start again" : "Next step"} <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
      </div>
      <article className="min-w-0 rounded-xl border border-[hsl(var(--border))] bg-[#0d1c30] p-5 sm:p-6">
        <p className="text-sm text-[#afc3db]">Example lead record</p>
        <h3 className="mt-1 font-display text-2xl font-semibold">Northline Distribution</h3>
        <dl className="mt-5 grid grid-cols-[max-content_1fr] gap-x-5 gap-y-2 border-y border-slate-600/50 py-4 text-sm">
          <dt className="text-[#afc3db]">Owner</dt><dd>Aaron</dd>
          <dt className="text-[#afc3db]">Pipeline stage</dt><dd>{step.stage}</dd>
          <dt className="text-[#afc3db]">Next action</dt><dd>{step.next}</dd>
        </dl>
        <h4 className="mb-2 mt-4 text-sm font-semibold">Activity history</h4>
        <ol className="space-y-2 text-sm text-[#c7d6e8]">
          {step.activity.map(line => <li key={line}>{line}</li>)}
        </ol>
      </article>
    </section>
  );
}
