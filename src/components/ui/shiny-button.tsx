import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./shiny-button.module.css";

interface ShinyButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function ShinyButton({ children, className, href, onClick }: ShinyButtonProps) {
  const classes = cn(
    styles.shine,
    "relative inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2 text-sm font-medium uppercase tracking-wide text-[hsl(var(--foreground))] backdrop-blur-xl transition-shadow hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
    className
  );
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>{children}</a>;
  }
  return <button type="button" onClick={onClick} className={classes}>{children}</button>;
}
