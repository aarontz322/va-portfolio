"use client";
import { BOOKING_URL } from "@/lib/contact";
import { useEffect, useState } from "react";

/**
 * Phone-only booking bar. Shows once the hero has scrolled away and hides
 * again when the contact section (which has its own booking button) arrives.
 * It is fixed to the bottom, so the header and page layout never change size.
 * Only transform and opacity are animated.
 */
export function MobileBookBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 64 : window.scrollY > 600;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !atContact);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-[hsl(var(--border))] bg-[hsl(var(--background)/92%)] backdrop-blur-md px-[5%] pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity,visibility] duration-300 ease-out ${
        show ? "translate-y-0 opacity-100 visible" : "translate-y-full opacity-0 invisible"
      }`}
    >
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-wide text-[hsl(var(--primary-foreground))]"
      >
        Book a Free Call
      </a>
    </div>
  );
}
