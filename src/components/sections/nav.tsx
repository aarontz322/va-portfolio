"use client";
import { ShinyButton } from "@/components/ui/shiny-button";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-[5%] h-16 flex items-center justify-between bg-[hsl(var(--background)/85%)] backdrop-blur-md border-b border-[hsl(var(--border))]">
      <div className="font-display font-extrabold text-lg tracking-tight">
        Aaron<span className="text-[hsl(var(--primary))]">.</span>Novicio
      </div>
      <ul className="hidden md:flex items-center gap-8 list-none">
        {["Services", "Pricing", "Works", "About"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] uppercase tracking-widest transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <ShinyButton
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        className="text-[hsl(var(--foreground))] border border-[hsl(var(--border))]"
      >
        Book a Call
      </ShinyButton>
    </nav>
  );
}
