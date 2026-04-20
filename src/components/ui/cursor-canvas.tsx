"use client";

import { useEffect, useRef } from "react";

export function CursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let pos = { x: -1000, y: -1000 };
    let isMoving = false;
    let animationFrameId: number;
    let globalHue = 0;

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createParticle(x: number, y: number) {
      // Add slight randomness to spawn position
      const spawnX = x + (Math.random() - 0.5) * 10;
      const spawnY = y + (Math.random() - 0.5) * 10;
      
      particles.push({
        x: spawnX,
        y: spawnY,
        vx: (Math.random() - 0.5) * 1.2,     // Drift slightly slower
        vy: (Math.random() - 0.5) * 1.2 - 0.8, // Drift upwards slightly slower
        size: Math.random() * 10 + 5,       // Reduced initial size
        life: 1,                             // Life goes from 1 to 0
        decay: Math.random() * 0.01 + 0.008, // Fades slightly slower for a smoother feel
        hue: (globalHue + Math.random() * 60) % 360 // Cycle through full RGB rainbow
      });
    }

    function onMouseMove(e: MouseEvent | TouchEvent) {
      isMoving = true;
      if ("touches" in e) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      } else {
        pos.x = (e as MouseEvent).clientX;
        pos.y = (e as MouseEvent).clientY;
      }
      
      // Spawn fewer particles for a more subtle effect
      for (let i = 0; i < 1; i++) {
        createParticle(pos.x, pos.y);
      }
    }

    function render() {
      // Increment global hue slightly slower for a smoother transition
      globalHue += 1.5;
      if (globalHue >= 360) globalHue = 0;

      // Clear the canvas cleanly
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      // Use lighter composition for a glowing smoke effect
      ctx!.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        
        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.4; // Toned down expansion
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle with simplified glow
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        const alpha = p.life * 0.15; // Slightly less alpha for performance
        
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 95%, ${alpha})`); 
        gradient.addColorStop(0.4, `hsla(${p.hue}, 100%, 70%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    }

    // Initialize
    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
