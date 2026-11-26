"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Nova", href: "/#nova" },
  { label: "Works", href: "/#works" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const inPortfolio = usePathname().split("/")[1] === "portfolio";

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
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
      <nav aria-label="Main" className="fixed top-0 left-0 right-0 z-50 px-[5%] h-16 flex items-center justify-between bg-[hsl(var(--background)/85%)] backdrop-blur-md border-b border-[hsl(var(--border))]">
        {/* Logo */}
        <Link href="/" aria-label="Aaron Novicio home" className="font-display font-bold text-lg tracking-[-0.02em]">
          Aaron<span className="text-[hsl(var(--primary))]">.</span>Novicio
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-5 xl:gap-8 list-none">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={inPortfolio && href === "/portfolio" ? "page" : undefined}
                className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] aria-[current=page]:text-[hsl(var(--primary))] uppercase tracking-widest transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ShinyButton
            href="https://calendly.com/eyronggwp/30min"
            className="text-[hsl(var(--foreground))] border border-[hsl(var(--border))]"
          >
            Book a Free Call
          </ShinyButton>

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto lg:hidden bg-[hsl(var(--background)/96%)] backdrop-blur-md border-b border-[hsl(var(--border))]"
            >
              <ul className="flex flex-col list-none px-[5%] py-4 gap-1">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={inPortfolio && href === "/portfolio" ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] aria-[current=page]:text-[hsl(var(--primary))] uppercase tracking-widest transition-colors border-b border-[hsl(var(--border)/50%)] last:border-0"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="pt-3">
                  <ShinyButton
                    href="https://calendly.com/eyronggwp/30min"
                    onClick={() => setOpen(false)}
                    className="w-full justify-center text-[hsl(var(--foreground))] border border-[hsl(var(--primary)/50%)] bg-[hsl(var(--primary)/10%)]"
                  >
                    Book a Free Call
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
