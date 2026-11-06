"use client";

import { useEffect, useRef } from "react";

/**
 * The hero visualization of the whole book:
 * a MORPHIC FIELD — centripetal, like a whirlpool.
 * Particles are born at the boundary of counterspace and converge,
 * spiraling inward toward the focus (the "organism").
 * Move the cursor: you become the attractor the field converges upon.
 */
export default function MorphicFieldCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const cx = () => w / 2;
    const cy = () => h * 0.46;

    const mouse = { x: cx(), y: cy(), active: false };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => (mouse.active = false);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    type P = {
      a: number; // angle
      r: number; // radius from center
      spd: number; // angular speed
      app: number; // inward approach speed
      size: number;
      hue: "gold" | "teal" | "violet";
      tw: number; // twinkle phase
    };

    const palette = ["gold", "gold", "teal", "violet"] as const;
    const colorOf = (hue: string, alpha: number) =>
      hue === "gold"
        ? `rgba(233, 196, 118, ${alpha})`
        : hue === "teal"
          ? `rgba(94, 196, 189, ${alpha})`
          : `rgba(164, 138, 222, ${alpha})`;

    const spawn = (): P => {
      const maxR = Math.hypot(w, h) * 0.62;
      return {
        a: Math.random() * Math.PI * 2,
        r: maxR * (0.55 + Math.random() * 0.45),
        spd: (0.0022 + Math.random() * 0.0042) * (Math.random() < 0.5 ? 1 : 1),
        app: 0.12 + Math.random() * 0.3,
        size: 0.8 + Math.random() * 2.0,
        hue: palette[Math.floor(Math.random() * palette.length)],
        tw: Math.random() * Math.PI * 2,
      };
    };

    const N = Math.min(190, Math.floor((w * h) / 9000));
    let parts: P[] = Array.from({ length: N }, spawn);

    // pause when tab hidden
    let running = true;
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);

    let t = 0;
    const tick = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      const fx = mouse.active ? mouse.x : cx() + Math.sin(t * 0.4) * w * 0.03;
      const fy = mouse.active ? mouse.y : cy() + Math.cos(t * 0.55) * h * 0.02;

      // central glow — the focus where everything converges
      const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, 150);
      glow.addColorStop(0, "rgba(217, 164, 65, 0.14)");
      glow.addColorStop(0.5, "rgba(217, 164, 65, 0.05)");
      glow.addColorStop(1, "rgba(217, 164, 65, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // breathing rings — the heartbeat of the universe
      for (let k = 0; k < 3; k++) {
        const phase = (t * 0.35 + k / 3) % 1;
        const rr = 40 + phase * Math.min(w, h) * 0.42;
        ctx.beginPath();
        ctx.arc(fx, fy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217, 164, 65, ${0.14 * (1 - phase)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const maxR = Math.hypot(w, h) * 0.62;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const px = fx + Math.cos(p.a) * p.r;
        const py = fy + Math.sin(p.a) * p.r;

        // faster spin as they approach the focus (whirlpool behavior)
        const nearness = 1 - Math.min(1, p.r / maxR);
        p.a += p.spd * (1 + nearness * 9);
        p.r -= p.app * (0.6 + nearness * 2.4);

        const tw = 0.55 + 0.45 * Math.sin(t * 2 + p.tw);
        const alpha = Math.min(0.9, (0.25 + nearness * 0.75) * tw);

        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.7 + nearness * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = colorOf(p.hue, alpha);
        ctx.fill();

        // re-spawn at the boundary — the field never runs dry
        if (p.r < 6) parts[i] = spawn();
      }

      // faint connective tissue between nearby particles (entanglement)
      ctx.lineWidth = 0.55;
      for (let i = 0; i < parts.length; i += 1) {
        const a = parts[i];
        const ax = fx + Math.cos(a.a) * a.r;
        const ay = fy + Math.sin(a.a) * a.r;
        for (let j = i + 1; j < Math.min(i + 7, parts.length); j++) {
          const b = parts[j];
          const bx = fx + Math.cos(b.a) * b.r;
          const by = fy + Math.sin(b.a) * b.r;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 66) {
            ctx.strokeStyle = `rgba(236, 231, 219, ${0.07 * (1 - d / 66)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
