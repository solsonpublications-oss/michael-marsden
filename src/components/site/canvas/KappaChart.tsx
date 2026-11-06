"use client";

import { useMemo, useState } from "react";

/**
 * The Memory Engine (Equation Three) rendered as a living curve.
 *   dκ/dt = ακ − βκ²  (+ γ·Ξ_entangle)
 *
 * α = habit reinforcement: each repetition of a pattern deepens the groove.
 * β = saturation: coupling cannot run away to infinity.
 * κ = the strength of the bond between a form and nature's memory of it.
 *
 * Drag the slider: watch a "new pattern" become an "ancient habit."
 */
export default function KappaChart() {
  // α as a slider (habit reinforcement strength)
  const [alpha, setAlpha] = useState(0.8);
  const [label, setLabel] = useState<"new" | "growing" | "ancient">("new");

  const K_MAX = 10; // α/β with β = 0.08 -> 12.5, clamp display
  const beta = 0.08;

  const path = useMemo(() => {
    // logistic solution: κ(t) = (α/β) / (1 + ((α/(β·κ0)) − 1)·e^(−α t)), κ0 = 0.15
    const k0 = 0.15;
    const K = alpha / beta;
    const A = K / k0 - 1;
    const pts: [number, number][] = [];
    const T = 40;
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * T;
      const k = K / (1 + A * Math.exp(-alpha * t));
      pts.push([t / T, Math.min(k / K_MAX, 1)]);
    }
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${(p[0] * 100).toFixed(2)},${((1 - p[1]) * 100).toFixed(2)}`).join(" ");
  }, [alpha]);

  // characteristic repetition count to reach 90% of plateau
  const reps = useMemo(() => {
    const k0 = 0.15;
    const K = alpha / beta;
    const A = K / k0 - 1;
    const t90 = Math.log(A / 0.111) / alpha; // 1 - 0.9 = 0.111
    return Math.round(t90);
  }, [alpha]);

  const tone =
    label === "new"
      ? { c: "#a48ade", t: "A brand-new pattern", d: "κ is small. The field is weak — the system is free to explore many arrangements. First crystallization, first word, first step: all difficult." }
      : label === "growing"
        ? { c: "#5ec4bd", t: "A strengthening habit", d: "Each repetition deepens the groove. Future similar systems find the pattern progressively easier to follow." }
        : { c: "#eec97d", t: "An ancient habit", d: "κ is enormous. Repeated over millions of years, the pattern is effectively permanent and universal — like a spider spinning its web." };

  return (
    <div className="rounded-2xl border border-hairline bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold/85">
            The Memory Engine — live
          </p>
          <p className="mt-2 font-mono text-sm text-ivory/80">
            dκ/dt = <span style={{ color: "#eec97d" }}>ακ</span> −{" "}
            <span style={{ color: "#a48ade" }}>βκ²</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            repetitions to near-permanence
          </p>
          <p className="stat-number font-display text-4xl">{reps.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6 relative rounded-xl border border-hairline bg-[#080312] p-4">
        <svg viewBox="0 0 100 100" className="w-full h-52" preserveAspectRatio="none" role="img" aria-label="Curve of morphic coupling kappa growing toward a plateau as repetitions accumulate">
          {/* grid */}
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(236,231,219,0.06)" strokeWidth="0.4" />
          ))}
          {[25, 50, 75].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="rgba(236,231,219,0.05)" strokeWidth="0.4" />
          ))}
          {/* plateau line κ = α/β */}
          <line
            x1="0"
            y1={(1 - Math.min(alpha / beta / K_MAX, 1)) * 100}
            x2="100"
            y2={(1 - Math.min(alpha / beta / K_MAX, 1)) * 100}
            stroke="rgba(217,164,65,0.4)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
          <defs>
            <linearGradient id="kgrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a48ade" />
              <stop offset="55%" stopColor="#5ec4bd" />
              <stop offset="100%" stopColor="#eec97d" />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="url(#kgrad)" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
          <span>t = 0 · first repetition</span>
          <span>time →</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label htmlFor="alpha" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            habit reinforcement α
          </label>
          <span className="font-mono text-xs text-gold-bright">α = {alpha.toFixed(2)}</span>
        </div>
        <input
          id="alpha"
          type="range"
          min={0.25}
          max={2.5}
          step={0.05}
          value={alpha}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setAlpha(v);
            const k0 = 0.15;
            const K = v / beta;
            const A = K / k0 - 1;
            const t90 = Math.log(A / 0.111) / v;
            setLabel(t90 > 90 ? "new" : t90 > 25 ? "growing" : "ancient");
          }}
          className="cylinder-range w-full mt-3"
          aria-label="Adjust habit reinforcement strength"
        />
        <div className="mt-4 rounded-xl border border-hairline p-4" style={{ background: `${tone.c}0f` }}>
          <p className="font-display text-xl" style={{ color: tone.c }}>
            {tone.t}
          </p>
          <p className="mt-1 text-sm text-ivory/65 leading-relaxed">{tone.d}</p>
        </div>
      </div>
    </div>
  );
}
