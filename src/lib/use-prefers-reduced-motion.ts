"use client";

import { useEffect, useState } from "react";

/**
 * True when the visitor's device asks for less motion.
 * Starts as false on the server and on first paint, so server and client
 * render the same HTML, then updates after mount.
 */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}
