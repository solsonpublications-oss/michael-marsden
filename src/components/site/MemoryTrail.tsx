"use client";

import { useEffect, useRef } from "react";

/**
 * A faint golden trail follows the cursor and slowly fades —
 * "the universe keeps everything": even your path across the page
 * is written, briefly, into the field. Desktop pointers only.
 */
export default function MemoryTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 900) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; life: number; size: number; hue: number };
    const pts: P[] = [];
    let last = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (Math.hypot(dx, dy) < 6) return;
      last = { x: e.clientX, y: e.clientY };
      pts.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: 2.2 + Math.random() * 2.6,
        hue: Math.random() < 0.75 ? 42 : 172,
      });
      if (pts.length > 46) pts.shift();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.life -= 0.016;
        if (p.life <= 0) {
          pts.splice(i, 1);
          continue;
        }
        const a = p.life * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === 42
            ? `rgba(238, 201, 125, ${a})`
            : `rgba(94, 196, 189, ${a * 0.8})`;
        ctx.shadowColor =
          p.hue === 42 ? "rgba(217,164,65,0.8)" : "rgba(94,196,189,0.6)";
        ctx.shadowBlur = 12 * p.life;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none hidden lg:block"
      aria-hidden="true"
    />
  );
}
