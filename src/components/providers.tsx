"use client";

import { MotionConfig } from "framer-motion";
import { MOTION } from "@/lib/motion";

/** Makes every Framer Motion animation respect the device's reduced-motion setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion={MOTION.scrollReveals ? "user" : "always"}>{children}</MotionConfig>;
}
