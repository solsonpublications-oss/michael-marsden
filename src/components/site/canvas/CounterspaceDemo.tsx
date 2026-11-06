"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Space vs. Counterspace — the two geometries of the book, side by side.
 *
 * LEFT (Euclidean space):  centrifugal. Fields radiate OUT from a source —
 *                          a bonfire, a lamp. Bright at the center, fading out.
 * RIGHT (counterspace):    centripetal. Fields converge IN from the boundary —
 *                          a drain, a whirlpool. Intense at the focus.
 *
 * Hover a panel to feed it energy.
 */
export default function CounterspaceDemo() {
  const leftRef = useRef<HTMLCanvasElement | null>(null);
  const rightRef = useRef<HTMLCanvasElement | null>(null);
  const [focusSide, setFocusSide] = useState<"left" | "right" | null>(null);
  const hoverRef = useRef<{ left: number; right: number }>({ left: 0, right: 0 });

  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function makeSim(
      canvas: HTMLCanvasElement,
      mode: "centrifugal" | "centripetal",
      getBoost: () => number,
    ) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return () => {};
      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      type Particle = { x: number; y: number; vx: number; vy: number };
      const parts: Particle[] = [];

      const spawn = () => {
        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.min(w, h) * 0.48;
        const a = Math.random() * Math.PI * 2;
        const spd = (getBoost() > 0.5 ? 1.5 : 1) * (0.85 + Math.random() * 1.1);
        if (mode === "centrifugal") {
          parts.push({
            x: cx + Math.cos(a) * 4,
            y: cy + Math.sin(a) * 4,
            vx: Math.cos(a) * spd,
            vy: Math.sin(a) * spd,
          });
        } else {
          const r = maxR * (0.84 + Math.random() * 0.18);
          const tx = Math.cos(a + Math.PI / 2);
          const ty = Math.sin(a + Math.PI / 2);
          const rx = Math.cos(a);
          const ry = Math.sin(a);
          parts.push({
            x: cx + Math.cos(a) * r,
            y: cy + Math.sin(a) * r,
            vx: tx * spd * 0.6 - rx * spd * 0.7,
            vy: ty * spd * 0.6 - ry * spd * 0.7,
          });
        }
      };

      for (let i = 0; i < 24; i++) spawn();

      let raf = 0;
      let running = true;
      const onVis = () => {
        running = document.visibilityState === "visible";
        if (running) raf = requestAnimationFrame(tick);
      };
      document.addEventListener("visibilitychange", onVis);

      const tick = () => {
        if (!running) return;
        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.min(w, h) * 0.48;
        const boost = getBoost();
        ctx.clearRect(0, 0, w, h);

        if (Math.random() < boost * 3.2 + 1.1) spawn();

        if (mode === "centrifugal") {
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
          g.addColorStop(0, `rgba(238,201,125,${0.3 + boost * 0.28})`);
          g.addColorStop(0.35, `rgba(217,164,65,${0.1 + boost * 0.1})`);
          g.addColorStop(1, "rgba(217,164,65,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(94,196,189,${0.28 + boost * 0.34})`;
          ctx.setLineDash([4, 7]);
          ctx.lineWidth = 1.4;
          ctx.stroke();
          ctx.setLineDash([]);
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
          g.addColorStop(0, `rgba(94,196,189,${0.18 + boost * 0.3})`);
          g.addColorStop(0.5, "rgba(94,196,189,0.05)");
          g.addColorStop(1, "rgba(94,196,189,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i];
          p.x += p.vx;
          p.y += p.vy;
          const d = Math.hypot(p.x - cx, p.y - cy);

          if (mode === "centrifugal") {
            const life = 1 - Math.min(1, d / maxR);
            if (d > maxR || life <= 0.02) {
              parts.splice(i, 1);
              continue;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.6 * life + 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(238,201,125,${(0.85 * life).toFixed(3)})`;
            ctx.fill();
          } else {
            const life = 1 - Math.min(1, d / maxR);
            if (d < 6 || d > maxR * 1.06) {
              parts.splice(i, 1);
              continue;
            }
            const a2 = Math.atan2(p.y - cy, p.x - cx);
            p.vx += Math.cos(a2 + Math.PI / 2) * 0.045;
            p.vy += Math.sin(a2 + Math.PI / 2) * 0.045;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 0.8 + 1.7 * life, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(94,196,189,${(0.25 + 0.7 * life).toFixed(3)})`;
            ctx.fill();
          }
        }

        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
    }

    let stopL: () => void = () => {};
    let stopR: () => void = () => {};
    if (leftRef.current)
      stopL = makeSim(leftRef.current, "centrifugal", () => hoverRef.current.left);
    if (rightRef.current)
      stopR = makeSim(rightRef.current, "centripetal", () => hoverRef.current.right);

    // ease hover boost
    const target = { left: 0, right: 0 };
    const ease = setInterval(() => {
      hoverRef.current.left += (target.left - hoverRef.current.left) * 0.12;
      hoverRef.current.right += (target.right - hoverRef.current.right) * 0.12;
    }, 32);

    return () => {
      stopL();
      stopR();
      clearInterval(ease);
    };
  }, []);

  useEffect(() => {
    const target = { left: 0, right: 0 };
    if (focusSide === "left") target.left = 1;
    if (focusSide === "right") target.right = 1;
    // nudge the easing targets by writing into a module-level shim via hoverRef each frame
    const id = setInterval(() => {
      hoverRef.current.left += (target.left - hoverRef.current.left) * 0.25;
      hoverRef.current.right += (target.right - hoverRef.current.right) * 0.25;
    }, 32);
    return () => clearInterval(id);
  }, [focusSide]);

  return (
    <div className="grid md:grid-cols-2 gap-5 lg:gap-8">
      <div
        className="field-card p-6 lg:p-8 cursor-crosshair"
        onMouseEnter={() => setFocusSide("left")}
        onMouseLeave={() => setFocusSide(null)}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-gold/85">
          Space — built from points
        </p>
        <h3 className="mt-2 font-display text-2xl lg:text-3xl text-ivory">
          Centrifugal <span className="italic text-gold-bright">the bonfire</span>
        </h3>
        <p className="mt-3 text-sm text-ivory/60 leading-relaxed min-h-[44px]">
          Fields radiate outward from a source and weaken with distance. A lamp,
          a bonfire, gravity. Bright at the center — empty at the edges.
        </p>
        <div className="mt-5 rounded-xl border border-hairline bg-[#080312] overflow-hidden">
          <canvas
            ref={leftRef}
            className="w-full aspect-[4/3]"
            style={{
              filter:
                focusSide === "left"
                  ? "brightness(1.22) saturate(1.15)"
                  : "brightness(0.95)",
              transition: "filter 0.4s ease",
            }}
            aria-label="Animation of a centrifugal field radiating outward from a central source"
          />
        </div>
        <p className="mt-4 font-mono text-[11px] text-gold/70 tracking-wide">
          field ∝ 1/r² · source at center · fades outward
        </p>
      </div>

      <div
        className="field-card p-6 lg:p-8 cursor-crosshair"
        onMouseEnter={() => setFocusSide("right")}
        onMouseLeave={() => setFocusSide(null)}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-tealquantum/85">
          Counterspace — built from planes
        </p>
        <h3 className="mt-2 font-display text-2xl lg:text-3xl text-ivory">
          Centripetal <span className="italic text-tealquantum">the whirlpool</span>
        </h3>
        <p className="mt-3 text-sm text-ivory/60 leading-relaxed min-h-[44px]">
          Fields converge inward from the boundary and intensify toward the
          focus. A drain, a whirlpool. Nothing comes out — everything goes in.
        </p>
        <div className="mt-5 rounded-xl border border-hairline bg-[#080312] overflow-hidden">
          <canvas
            ref={rightRef}
            className="w-full aspect-[4/3]"
            style={{
              filter:
                focusSide === "right"
                  ? "brightness(1.22) saturate(1.15)"
                  : "brightness(0.95)",
              transition: "filter 0.4s ease",
            }}
            aria-label="Animation of a centripetal field converging inward from the boundary toward a focus"
          />
        </div>
        <p className="mt-4 font-mono text-[11px] text-tealquantum/70 tracking-wide">
          point = intersection of planes · focus at center · intensifies inward
        </p>
      </div>
    </div>
  );
}
