"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Crystallization Threshold idea, made visible (Chapter Sixteen).
 * A supersaturated solution: molecules wander randomly…
 * then nucleation begins and they snap into a lattice —
 * the morphic template pulling chaos toward remembered form.
 */
export default function CrystalDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<"solution" | "nucleating" | "crystal">("solution");
  const [kappa, setKappa] = useState(4);
  const nucleatingRef = useRef(false);

  const startNucleation = () => {
    nucleatingRef.current = true;
    setPhase("nucleating");
  };
  const reset = () => {
    nucleatingRef.current = false;
    setPhase("solution");
    setKappa(4);
  };

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

    type Mol = { x: number; y: number; tx: number; ty: number; s: number; delay: number };
    let mols: Mol[] = [];

    const seedMolecules = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      mols = [];
      const spacing = 26;
      const cols = Math.floor((w - 90) / spacing);
      const rows = Math.floor((h - 90) / spacing);
      const ox = (w - (cols - 1) * spacing) / 2;
      const oy = (h - (rows - 1) * spacing) / 2;
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          mols.push({
            x: Math.random() * w,
            y: Math.random() * h,
            tx: ox + c * spacing,
            ty: oy + r * spacing,
            s: 2 + Math.random() * 1.6,
            delay: i * 3.5,
          });
          i++;
        }
      }
    };
    seedMolecules();
    const onRz = () => {
      resize();
      seedMolecules();
      nucleatingRef.current = false;
      setPhase("solution");
    };
    window.addEventListener("resize", onRz);

    let raf = 0;
    let running = true;
    let t = 0;
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = () => {
      if (!running) return;
      t += 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // solution tint
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
      g.addColorStop(0, "rgba(217,164,65,0.05)");
      g.addColorStop(1, "rgba(217,164,65,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      let settled = 0;
      for (const m of mols) {
        if (nucleatingRef.current && t > 30 + m.delay) {
          const dx = m.tx - m.x;
          const dy = m.ty - m.y;
          m.x += dx * 0.045 + (Math.random() - 0.5) * 0.7;
          m.y += dy * 0.045 + (Math.random() - 0.5) * 0.7;
          if (Math.hypot(dx, dy) < 3) settled++;
        } else if (!nucleatingRef.current) {
          // Brownian wander
          m.x += (Math.random() - 0.5) * 1.5;
          m.y += (Math.random() - 0.5) * 1.5;
          m.x = Math.max(4, Math.min(w - 4, m.x));
          m.y = Math.max(4, Math.min(h - 4, m.y));
        } else {
          const dx = m.tx - m.x;
          const dy = m.ty - m.y;
          m.x += dx * 0.045 + (Math.random() - 0.5) * 0.7;
          m.y += dy * 0.045 + (Math.random() - 0.5) * 0.7;
          if (Math.hypot(dx, dy) < 3) settled++;
        }

        const isSettled = nucleatingRef.current && Math.hypot(m.tx - m.x, m.ty - m.y) < 3;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.s, 0, Math.PI * 2);
        if (isSettled) {
          ctx.fillStyle = "rgba(238,201,125,0.9)";
          ctx.shadowColor = "rgba(217,164,65,0.9)";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = "rgba(164,138,222,0.55)";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // growing lattice bonds once mostly settled
      if (nucleatingRef.current && settled > mols.length * 0.6) {
        ctx.strokeStyle = "rgba(238,201,125,0.28)";
        ctx.lineWidth = 0.7;
        const spacing = 26;
        for (const m of mols) {
          if (Math.hypot(m.tx - m.x, m.ty - m.y) > 3) continue;
          const nx = m.tx + spacing;
          const ny = m.ty;
          const match = mols.find((q) => Math.abs(q.tx - nx) < 1 && Math.abs(q.ty - ny) < 1 && Math.hypot(q.tx - q.x, q.ty - q.y) < 3);
          if (match) {
            ctx.beginPath();
            ctx.moveTo(m.tx, m.ty);
            ctx.lineTo(nx, ny);
            ctx.stroke();
          }
        }
      }

      if (nucleatingRef.current) {
        const pct = Math.round((settled / Math.max(1, mols.length)) * 100);
        setKappa(4 + pct * 0.16);
        if (pct > 96) setPhase((p) => (p === "crystal" ? p : "crystal"));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onRz);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-hairline bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold/85">
            Nucleation · the field finds the form
          </p>
          <p className="mt-1 text-sm text-ivory/55">
            Chaos in a supersaturated solution — until the template asserts itself.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] border transition-colors duration-500 ${
            phase === "solution"
              ? "border-violetfield/50 text-violetfield bg-violetfield/10"
              : phase === "nucleating"
                ? "border-tealquantum/50 text-tealquantum bg-tealquantum/10"
                : "border-gold/60 text-gold-bright bg-gold/15"
          }`}
        >
          {phase === "solution" ? "supercooled liquid" : phase === "nucleating" ? "nucleation…" : "lattice locked"}
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-hairline bg-[#080312] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-64 sm:h-72"
          aria-label="Simulation of molecules in a solution snapping into an ordered crystal lattice during nucleation"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[220px]">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>morphic coupling κ</span>
            <span className="font-mono text-gold-bright">{kappa.toFixed(1)}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-ivory/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (kappa / 20) * 100)}%`,
                background: "linear-gradient(90deg, #a48ade, #5ec4bd, #eec97d)",
                boxShadow: "0 0 12px rgba(217,164,65,0.5)",
              }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={startNucleation}
            disabled={phase !== "solution"}
            className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold-bright hover:bg-gold/20 transition-all hover:shadow-[0_0_20px_-4px_rgba(217,164,65,0.7)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ✦ Seed the crystal
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-hairline px-4 py-2 text-xs text-ivory/70 hover:text-ivory hover:border-ivory/40 transition-all"
          >
            Dissolve
          </button>
        </div>
      </div>
      <p className="mt-4 text-xs text-ivory/45 leading-relaxed">
        The prediction of the Memory Engine: once a compound has been
        crystallized many times worldwide, its nucleation threshold temperature
        should rise — subsequent crystals form <em>easier</em>, because κ has
        grown.
      </p>
    </div>
  );
}
