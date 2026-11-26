"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BOOKING_URL } from "@/lib/contact";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Nova", href: "/#nova" },
  { label: "Work samples", href: "/#works" },
  { label: "Website gallery", href: "/portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

// The home and catalog routes mount separate navigation instances.
let nextFocus: { pathname: string; id: string } | undefined;

function focusDestination(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
}

export function Nav() {
  const pathname = usePathname();
  const inPortfolio = pathname.split("/")[1] === "portfolio";
  const drawer = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const desktopFirstLink = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (nextFocus?.pathname !== pathname) return;
    const id = nextFocus.id;
    const frame = requestAnimationFrame(() => {
      focusDestination(id);
      nextFocus = undefined;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        drawer.current?.close();
        desktopFirstLink.current?.focus({ preventScroll: true });
      }
    };
    const closeOnHistoryChange = () => drawer.current?.close();
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("popstate", closeOnHistoryChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("popstate", closeOnHistoryChange);
    };
  }, [open]);

  function dismiss() {
    drawer.current?.close();
    trigger.current?.focus({ preventScroll: true });
  }

  function follow(href: string) {
    dismiss();
    const url = new URL(href, window.location.href);
    const id = url.hash.slice(1) || "main";
    if (url.pathname === pathname) focusDestination(id);
    else nextFocus = { pathname: url.pathname, id };
  }

  return (
    <>
      <nav aria-label="Main" className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/85%)] px-[5%] backdrop-blur-md max-[359px]:gap-1 max-[359px]:px-3">
        <Link href="/" aria-label="Aaron Novicio home" className="shrink-0 font-display text-lg font-bold tracking-[-0.02em] max-[359px]:text-base">
          Aaron<span className="text-[hsl(var(--primary))]">.</span>Novicio
        </Link>
        <ul className="hidden list-none items-center gap-3 lg:flex xl:gap-7">
          {links.map(({ label, href }, index) => (
            <li key={href}>
              <Link href={href} ref={index === 0 ? desktopFirstLink : undefined}
                aria-current={inPortfolio && href === "/portfolio" ? "page" : undefined}
                className="whitespace-nowrap text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))] aria-[current=page]:text-[hsl(var(--primary))]">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <ShinyButton href={BOOKING_URL} className="whitespace-nowrap border border-[hsl(var(--border))] px-3 text-[hsl(var(--foreground))] max-[359px]:px-2 max-[359px]:text-xs max-[359px]:tracking-normal sm:px-5">
            <span className="sm:hidden">Book a call</span>
            <span className="hidden sm:inline">Book a Free Call</span>
          </ShinyButton>
          <button ref={trigger} type="button" className="flex h-11 w-11 shrink-0 items-center justify-center hover:text-[hsl(var(--primary))] lg:hidden"
            onClick={() => { drawer.current?.showModal(); setOpen(true); }}
            aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-menu">
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </nav>
      <dialog ref={drawer} id="mobile-menu" aria-labelledby="mobile-menu-title"
        onClose={() => setOpen(false)}
        onCancel={event => { event.preventDefault(); dismiss(); }}
        onClick={event => { if (event.target === event.currentTarget) dismiss(); }}
        onKeyDown={event => {
          if (event.key !== "Tab") return;
          const items = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
          const start = items[0], end = items[items.length - 1];
          if (event.shiftKey && document.activeElement === start) { event.preventDefault(); end.focus(); }
          else if (!event.shiftKey && document.activeElement === end) { event.preventDefault(); start.focus(); }
        }}
        className="fixed inset-x-0 bottom-auto top-0 m-0 max-h-[100dvh] w-full max-w-none overflow-y-auto border-0 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/98%)] p-0 text-[hsl(var(--foreground))] backdrop:bg-black/60 backdrop:backdrop-blur-sm">
        <div>
          <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] px-[5%]">
            <h2 id="mobile-menu-title" className="font-display text-lg font-bold">Menu</h2>
            <button type="button" onClick={dismiss} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="px-[5%] py-4">
            <ul className="flex list-none flex-col gap-1">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} onNavigate={() => follow(href)} aria-current={inPortfolio && href === "/portfolio" ? "page" : undefined}
                    className="block py-3 text-sm font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] aria-[current=page]:text-[hsl(var(--primary))]">
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <ShinyButton href={BOOKING_URL} onClick={dismiss} className="w-full border border-[hsl(var(--primary)/50%)] bg-[hsl(var(--primary)/10%)]">Book a Free Call</ShinyButton>
              </li>
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
