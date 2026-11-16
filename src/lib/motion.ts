/**
 * MOTION toggle. One place to switch each effect on or off.
 * Change `true` to `false`, save, and rebuild.
 */
export const MOTION = {
  /** Soft blue glow that follows the mouse (desktop only). */
  cursorTrail: true,
  /** Interactive 3D robot in the hero. Off = a still picture. */
  robot: true,
  /** Moving light that runs around card borders. */
  borderLights: true,
  /** Sections sliding in on scroll. Off = they only fade in. */
  scrollReveals: true,
  /** Auto-scrolling testimonial columns. Off = a plain list. */
  testimonialScroll: true,
} as const;

/**
 * Trace mode. Open the site with `?trace` at the end of the address and
 * each effect logs when it starts, stops or is skipped. Silent otherwise.
 */
export function trace(effect: string, event: string) {
  if (typeof window === "undefined") return;
  if (!new URLSearchParams(window.location.search).has("trace")) return;
  console.info(`[motion] ${effect}: ${event}`);
}
