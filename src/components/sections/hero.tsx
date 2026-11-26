import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/contact";
import { OutreachCrowd } from "./outreach-crowd";
import styles from "./outreach-crowd.module.css";

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className={styles.hero} data-crowd-hero>
      <div className={styles.intro}>
        <p className={styles.byline}><span />Aaron Novicio · Virtual assistant</p>
        <h1 id="hero-title">
          <span>Your leads.</span>{" "}<span>Your CRM.</span>{" "}<em>Done right.</em>
        </h1>
        <p className={styles.lead}>
          I research prospects, write outreach, and keep your CRM in order so your team knows who to follow up with next.
        </p>
        <div className={styles.actions}>
          <a href={BOOKING_URL} className={styles.primary}>Book a free call <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href="#works" className={styles.secondary}>See work samples <ArrowDownRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <OutreachCrowd />
    </section>
  );
}
