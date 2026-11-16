"use client";

import { useEffect, useRef } from "react";
import { MOTION, trace } from "@/lib/motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  hue: number;
};

// Brand blue (--primary is hue 213). Small spread so the glow has depth.
const BASE_HUE = 213;
const HUE_SPREAD = 14;

/**
 * Soft blue glow that follows the mouse.
 * - Desktop mouse only (skipped on touch screens).
 * - Skipped when the visitor asks for reduced motion.
 * - Draws only while particles are alive. It stops when the mouse rests.
 */
export function CursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!MOTION.cursorTrail) return trace("cursor trail", "skipped (switched off)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return trace("cursor trail", "skipped (reduced motion)");
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return trace("cursor trail", "skipped (no mouse)");
    const ctx = canvas.getContext("2d");
    if (!ctx) return trace("cursor trail", "skipped (no canvas support)");

    const particles: Particle[] = [];
    let frame = 0;

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function render() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.4;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        const alpha = p.life * 0.12;
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 88%, ${alpha})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 100%, 66%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (particles.length > 0) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
        trace("cursor trail", "paused (mouse at rest)");
      }
    }

    function onMouseMove(e: MouseEvent) {
      particles.push({
        x: e.clientX + (Math.random() - 0.5) * 10,
        y: e.clientY + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.8,
        size: Math.random() * 10 + 5,
        life: 1,
        decay: Math.random() * 0.01 + 0.008,
        hue: BASE_HUE + (Math.random() - 0.5) * 2 * HUE_SPREAD,
      });
      if (!frame) {
        trace("cursor trail", "drawing");
        frame = window.requestAnimationFrame(render);
      }
    }

    resizeCanvas();
    trace("cursor trail", "ready");
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", onMouseMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      id="canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
