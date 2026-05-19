"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

const links = ["Services", "Pricing", "Nova", "Works", "About", "Contact"];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-[5%] h-16 flex items-center justify-between bg-[hsl(var(--background)/85%)] backdrop-blur-md border-b border-[hsl(var(--border))]">
        {/* Logo */}
        <div className="font-display font-bold text-lg tracking-[-0.02em]">
          Aaron<span className="text-[hsl(var(--primary))]">.</span>Novicio
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((item) => (
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ShinyButton
            onClick={() => window.open("https://calendly.com/eyronggwp/30min", "_blank")}
            className="text-[hsl(var(--foreground))] border border-[hsl(var(--border))]"
          >
            Book a Call
          </ShinyButton>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden bg-[hsl(var(--background)/96%)] backdrop-blur-md border-b border-[hsl(var(--border))]"
            >
              <ul className="flex flex-col list-none px-[5%] py-4 gap-1">
                {links.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] uppercase tracking-widest transition-colors border-b border-[hsl(var(--border)/50%)] last:border-0"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="pt-3">
                  <ShinyButton
                    onClick={() => {
                      setOpen(false);
                      window.open("https://calendly.com/eyronggwp/30min", "_blank");
                    }}
                    className="w-full justify-center text-[hsl(var(--foreground))] border border-[hsl(var(--primary)/50%)] bg-[hsl(var(--primary)/10%)]"
                  >
                    Book a Call
                  </ShinyButton>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
