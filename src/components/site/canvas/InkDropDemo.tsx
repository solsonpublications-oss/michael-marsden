"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * David Bohm's ink-drop experiment (Chapter Two), made touchable.
 *
 * A drop of ink sits in viscous glycerin between two cylinders.
 * Rotate the outer cylinder: shear flow enfolds the drop into fine
 * filaments — it seems to vanish into the IMPPLICATE order.
 * Reverse the rotation: the drop re-assembles — the EXPPLICATE order.
 * Nothing was destroyed. The whole remembers the drop.
 */
type Mode = "explicate" | "folding" | "implicate";

export default function InkDropDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState(0); // cumulative turns of the outer cylinder
  const [mode, setMode] = useState<Mode>("explicate");
  const animRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const rotRef = useRef(0);

  // animate towards target when buttons are used
  const spinTo = useCallback((delta: number) => {
    targetRef.current += delta;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ink particles: initial cluster (angle around jar center, radius from center)
    type Ink = { th0: number; r0: number; j: number };
    const inks: Ink[] = [];
    const dropAngle = Math.PI * 0.78;
    const dropRadius = 0.52; // normalized
    for (let i = 0; i < 900; i++) {
      const rr = Math.sqrt(Math.random()) * 0.055;
      const aa = Math.random() * Math.PI * 2;
      const r = dropRadius + rr * Math.cos(aa);
      const th = dropAngle + (rr * Math.sin(aa)) / Math.max(0.2, dropRadius);
      inks.push({ th0: th, r0: Math.min(0.94, Math.max(0.1, r)), j: Math.random() * 0.03 });
    }

    const R_INNER = 0.16; // inner cylinder (stationary) radius
    const R_OUTER = 0.94; // outer cylinder (rotating) radius

    let raf = 0;
    let running = true;
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = () => {
      if (!running) return;

      // ease slider-driven motion
      if (Math.abs(targetRef.current - rotRef.current) > 0.0005) {
        rotRef.current += (targetRef.current - rotRef.current) * 0.06;
        setRotation(Math.round(rotRef.current * 100) / 100);
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const unit = Math.min(w, h) / 2;

      ctx.clearRect(0, 0, w, h);

      // jar
      ctx.beginPath();
      ctx.arc(cx, cy, unit * R_OUTER, 0, Math.PI * 2);
      const jarGrad = ctx.createRadialGradient(cx, cy, unit * 0.1, cx, cy, unit * R_OUTER);
      jarGrad.addColorStop(0, "rgba(94,196,189,0.10)");
      jarGrad.addColorStop(0.75, "rgba(94,196,189,0.05)");
      jarGrad.addColorStop(1, "rgba(94,196,189,0.12)");
      ctx.fillStyle = jarGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(94,196,189,0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // rotating outer cylinder rim — a tick marks the rotation
      const rimA = rotRef.current * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, unit * R_OUTER, rimA, rimA + 0.5);
      ctx.strokeStyle = "rgba(238,201,125,0.85)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // stationary inner hub
      ctx.beginPath();
      ctx.arc(cx, cy, unit * R_INNER, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236,231,219,0.07)";
      ctx.fill();
      ctx.strokeStyle = "rgba(236,231,219,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ink — differential rotation: ω(r) fast near hub, slow at rim (Couette-like shear)
      const shear = rotRef.current * Math.PI * 2 * 9;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      const pts: { x: number; y: number; a: number }[] = [];
      for (const p of inks) {
        const r = p.r0;
        // angular displacement depends on radius — the shear that enfolds the drop
        const wLoc = 1 - (r - R_INNER) / (R_OUTER - R_INNER);
        const th = p.th0 + shear * Math.max(0, wLoc) + Math.sin(rotRef.current * 40 + p.j * 100) * 0.004;
        const x = cx + Math.cos(th) * r * unit;
        const y = cy + Math.sin(th) * r * unit;
        pts.push({ x, y, a: th });
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      // occupancy — how much of the circle's circumference carries ink
      const BINS = 72;
      const bins = new Array(BINS).fill(false);
      for (const q of pts) {
        const rr = Math.hypot(q.x - cx, q.y - cy) / unit;
        if (rr > R_INNER * 0.9) {
          const b = Math.floor(((Math.atan2(q.y - cy, q.x - cx) + Math.PI) / (Math.PI * 2)) * BINS) % BINS;
          bins[b] = true;
        }
      }
      const occupancy = bins.filter(Boolean).length / BINS;

      // draw filaments
      for (const q of pts) {
        const rr = Math.hypot(q.x - cx, q.y - cy) / unit;
        const near = Math.min(1, Math.max(0, (rr - R_INNER) / (R_OUTER - R_INNER)));
        const alpha = 0.5 + 0.5 * (1 - near);
        ctx.beginPath();
        ctx.arc(q.x, q.y, 1.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 92, 200, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
      // soft glow where ink is dense
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < pts.length; i += 9) {
        const q = pts[i];
        ctx.beginPath();
        ctx.arc(q.x, q.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(164,138,222,0.06)";
        ctx.fill();
      }
      ctx.restore();

      raf = requestAnimationFrame(tick);

      // classify state
      const turns = Math.abs(rotRef.current);
      const next: Mode =
        turns < 0.35 && occupancy < 0.5
          ? "explicate"
          : occupancy > 0.86 || turns > 1.6
            ? "implicate"
            : "folding";
      setMode((m) => (m === next ? m : next));
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const modeLabel: Record<Mode, { title: string; body: string; color: string }> = {
    explicate: {
      title: "Explicate order",
      body: "The drop you can see — unfolded, local, separate. This is the world of visible things.",
      color: "text-gold-bright",
    },
    folding: {
      title: "Enfolding…",
      body: "The shear of the rotating fluid is folding the drop into filaments. Keep going — or turn back.",
      color: "text-violetfield",
    },
    implicate: {
      title: "Implicate order",
      body: "The drop seems gone — yet it is everywhere in the vessel, enfolded in the whole. Reverse the rotation and watch it return.",
      color: "text-tealquantum",
    },
  };

  return (
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
      <div className="relative rounded-2xl border border-hairline bg-[#080312] p-4 sm:p-6 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full aspect-square max-h-[520px]"
          aria-label="Interactive simulation of Bohm's ink drop experiment: rotate the cylinder to enfold the ink drop into the fluid, reverse to unfold it again"
        />
        <div className="absolute top-4 left-5 text-[11px] uppercase tracking-[0.3em] text-tealquantum/80">
          glycerin vessel — top view
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.42em] text-gold/85">
          Chapter Two · The demonstration Bohm carried everywhere
        </p>
        <h3 className="mt-4 font-display text-3xl lg:text-4xl text-ivory leading-tight">
          The drop that <span className="italic text-gold-bright">never stopped existing</span>
        </h3>
        <p className="mt-5 text-ivory/65 leading-relaxed text-[15px]">
          Bohm put a drop of ink in glycerin and slowly turned the outer
          cylinder. The drop stretched into fine filaments and seemed to
          disappear — mixed into the fluid, no longer a &ldquo;thing.&rdquo; Then
          he reversed the rotation, and the drop reassembled. Nothing had been
          destroyed. It had been <em>enfolded</em> — stored in the whole.
        </p>
        <p className="mt-3 text-ivory/65 leading-relaxed text-[15px]">
          This is his lifelong argument: what we call separate objects are
          unfoldings of a deeper, undivided order. Turn the cylinder below and
          feel it yourself.
        </p>

        <div className="mt-7 rounded-xl border border-hairline bg-panel p-5">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="cyl"
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              Rotate outer cylinder
            </label>
            <span className="font-mono text-xs text-gold-bright">
              {rotation.toFixed(2)} turns
            </span>
          </div>
          <input
            id="cyl"
            type="range"
            min={-2.5}
            max={2.5}
            step={0.01}
            value={rotation}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              rotRef.current = v;
              targetRef.current = v;
              setRotation(v);
            }}
            className="cylinder-range w-full mt-4"
            aria-label="Rotate the outer cylinder to enfold or unfold the ink drop"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => spinTo(1.1)}
              className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold-bright hover:bg-gold/20 transition-all hover:shadow-[0_0_20px_-4px_rgba(217,164,65,0.7)]"
            >
              ⟳ Enfold the drop
            </button>
            <button
              onClick={() => spinTo(-1.1)}
              className="rounded-full border border-tealquantum/40 bg-tealquantum/10 px-4 py-2 text-xs font-semibold text-tealquantum hover:bg-tealquantum/20 transition-all hover:shadow-[0_0_20px_-4px_rgba(94,196,189,0.7)]"
            >
              ⟲ Unfold it again
            </button>
            <button
              onClick={() => {
                rotRef.current = 0;
                targetRef.current = 0;
                setRotation(0);
              }}
              className="rounded-full border border-hairline px-4 py-2 text-xs text-ivory/70 hover:text-ivory hover:border-ivory/40 transition-all"
            >
              Reset
            </button>
          </div>
          <div className="mt-5 pt-4 border-t border-hairline">
            <p className={`font-display text-xl ${modeLabel[mode].color}`}>
              {modeLabel[mode].title}
            </p>
            <p className="mt-1 text-sm text-ivory/60 leading-relaxed">
              {modeLabel[mode].body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
