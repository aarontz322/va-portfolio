"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./website-grid.module.css";

type Website = { title: string; label: string; image: string; alt: string; desc: string; href: string };
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function WebsiteGrid({ projects }: { projects: Website[] }) {
  const grid = useRef<HTMLDivElement>(null);

  // Measure stationary grid slots. Moving the measured element itself would
  // feed its animation back into the next scroll reading.
  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const slots = Array.from(element.querySelectorAll<HTMLElement>("[data-website-slot]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;
    function configure() {
      stop?.();
      if (preference.matches || !element) return;
      let columns = 1;
      let frame = 0;
      const nearby = new Set<HTMLElement>();
      const paintSlot = (slot: HTMLElement) => {
        const bounds = slot.getBoundingClientRect();
        const height = window.innerHeight;
        const progress = clamp((height - bounds.top) / (height * .39));
        const leaving = clamp(1 - bounds.bottom / (height * .2));
        slot.style.setProperty("--row-progress", progress.toFixed(4));
        slot.style.setProperty("--leaving", leaving.toFixed(4));
      };
      const paint = () => { frame = 0; nearby.forEach(paintSlot); };
      const schedule = () => { if (!frame && nearby.size) frame = requestAnimationFrame(paint); };
      const measure = () => {
        columns = getComputedStyle(element).gridTemplateColumns.split(" ").length;
        slots.forEach((slot, index) => {
          const column = index % columns;
          const firstRow = index < columns;
          let from = "below";
          if (columns === 1) from = ["left", "right", "below"][index % 3];
          else if (firstRow) from = column === 0 ? "left" : column === columns - 1 ? "right" : "above";
          const bounds = slot.getBoundingClientRect();
          const width = document.documentElement.clientWidth;
          const dx = from === "left" ? -bounds.right - bounds.width * .12 : from === "right" ? width - bounds.left + bounds.width * .12 : 0;
          // A full-screen drop crosses the departing ribbon before the side cards arrive.
          const dy = from === "above" ? -Math.min(bounds.width * .5, window.innerHeight * .22) : from === "below" ? window.innerHeight * .42 : 0;
          slot.dataset.origin = from;
          slot.toggleAttribute("data-landing-row", firstRow);
          slot.style.setProperty("--from-x", dx + "px");
          slot.style.setProperty("--from-y", dy + "px");
          slot.style.setProperty("--stagger", String(column * .105));
          paintSlot(slot);
        });
        element.dataset.motionReady = "true";
      };
      measure();
      const resize = new ResizeObserver(measure);
      resize.observe(element);
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const slot = entry.target as HTMLElement;
          if (entry.isIntersecting) nearby.add(slot);
          else nearby.delete(slot);
          paintSlot(slot);
        }
      }, { rootMargin: "40% 0px" });
      slots.forEach(slot => observer.observe(slot));
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", schedule, { passive: true });
      stop = () => {
        delete element.dataset.motionReady;
        observer.disconnect();
        resize.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", schedule);
      };
    }
    configure();
    preference.addEventListener("change", configure);
    return () => { stop?.(); preference.removeEventListener("change", configure); };
  }, [projects]);

  return (
    <div ref={grid} data-helix-landing-grid="" className={styles.grid}>
      {projects.map(site => (
        <article key={site.href} data-website-slot="" className={styles.slot}>
          <a href={site.href} data-website-card="" aria-label={`Open live demo for ${site.title}`} className={styles.card}>
            <div className={styles.image}>
              <Image src={site.image} alt={site.alt} fill sizes="(max-width: 359px) 90vw, (max-width: 899px) 45vw, (min-width: 1280px) 380px, 30vw" />
            </div>
            <div className={styles.caption}>
              <div className={styles.title}><h3>{site.title}</h3><ArrowUpRight size={18} aria-hidden="true"/></div>
              <p className={styles.industry}>{site.label}</p>
              <p className={styles.description}>{site.desc}</p>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
