"use client";

import { useState } from "react";

/**
 * The Symphony of Scales (Equation Four) as a living orrery.
 * Nested morphic fields, each with its own timescale:
 * proton → molecule → cell → organism → species.
 * The total field influencing you is the SUM of all of them at once —
 * slow evolutionary bass notes, rapid molecular melodies.
 */
const SCALES = [
  {
    id: "proton",
    label: "Proton",
    time: "picoseconds",
    color: "#eec97d",
    size: 96,
    speed: 1.1,
    note: "The fastest melody — reality rendered at the Larmor refresh rate, ~20 quadrillion frames per second.",
  },
  {
    id: "molecule",
    label: "Molecule",
    time: "nanoseconds",
    color: "#d9a441",
    size: 160,
    speed: 2.3,
    note: "Protein folding fields guiding chemistry toward the forms it has learned to love.",
  },
  {
    id: "cell",
    label: "Cell",
    time: "milliseconds",
    color: "#5ec4bd",
    size: 232,
    speed: 4.2,
    note: "Tissue-organization fields orchestrating division, migration and repair.",
  },
  {
    id: "organism",
    label: "Organism",
    time: "days → years",
    color: "#8f7bd4",
    size: 308,
    speed: 7.5,
    note: "Your developmental blueprint — the template from which a body is rebuilt, moment by moment.",
  },
  {
    id: "species",
    label: "Species",
    time: "geological time",
    color: "#a48ade",
    size: 388,
    speed: 13,
    note: "The deep bass note: habits accumulated across millions of years, effectively permanent.",
  },
];

export default function SymphonyRings() {
  const [active, setActive] = useState<string | null>(null);
  const shown = SCALES.find((s) => s.id === active) ?? null;

  return (
    <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-center">
      <div
        className="relative mx-auto"
        style={{ width: 420, height: 420, maxWidth: "100%" }}
        role="img"
        aria-label="Concentric rings representing morphic fields at five nested scales, from proton to species, each orbiting at its own tempo"
      >
        {/* center — the living system */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <div
            className="w-16 h-16 rounded-full border border-gold/60 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(238,201,125,0.35), rgba(217,164,65,0.12) 55%, rgba(217,164,65,0.04))",
              boxShadow: "0 0 34px -6px rgba(217,164,65,0.65)",
            }}
          >
            <span className="font-display italic text-sm text-gold-bright">you</span>
          </div>
        </div>

        {SCALES.map((s, idx) => {
          const isActive = active === s.id;
          return (
            <div
              key={s.id}
              className="absolute left-1/2 top-1/2 rounded-full border transition-all duration-500 cursor-pointer"
              style={{
                width: s.size,
                height: s.size,
                marginLeft: -s.size / 2,
                marginTop: -s.size / 2,
                borderColor: isActive
                  ? s.color
                  : `${s.color}44`,
                boxShadow: isActive
                  ? `0 0 30px -6px ${s.color}88, inset 0 0 22px -10px ${s.color}66`
                  : "none",
                transform: isActive ? "scale(1.03)" : "scale(1)",
                background: isActive ? `${s.color}0d` : "transparent",
                zIndex: 10 - idx,
              }}
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : s.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(isActive ? null : s.id);
                }
              }}
              aria-label={`${s.label} scale field, operating over ${s.time}`}
            >
              {/* orbiting note — a dot riding this ring at its own tempo */}
              <div
                className={`absolute inset-0 ${isActive ? "" : "opacity-80"}`}
                style={{
                  animation: `spin ${s.speed}s linear infinite`,
                }}
              >
                <span
                  className="absolute rounded-full"
                  style={{
                    width: 7,
                    height: 7,
                    left: "50%",
                    top: -3.5,
                    marginLeft: -3.5,
                    background: s.color,
                    boxShadow: `0 0 10px 1px ${s.color}`,
                  }}
                />
              </div>
              <span
                className="absolute left-1/2 -bottom-5 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-300"
                style={{ color: isActive ? s.color : "#9a937f" }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="min-h-[220px]">
        {shown ? (
          <div className="rounded-2xl border border-hairline bg-panel p-6 lg:p-8">
            <p className="text-xs uppercase tracking-[0.35em]" style={{ color: shown.color }}>
              Scale {SCALES.length - SCALES.indexOf(shown)} of {SCALES.length} · {shown.time}
            </p>
            <h4 className="mt-3 font-display text-3xl text-ivory">
              The {shown.label} field
            </h4>
            <p className="mt-4 text-ivory/65 leading-relaxed text-[15px]">
              {shown.note}
            </p>
            <p className="mt-4 font-mono text-xs text-gold/70">
              contribution to M<sub>total</sub> = κ<sub>{shown.id}</sub> · ε
              <sub>{shown.id}</sub> · f(r, t, n<sub>{shown.id}</sub>)
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-hairline p-6 lg:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Equation Four · The Symphony of Scales
            </p>
            <h4 className="mt-3 font-display text-3xl text-ivory">
              One life, <span className="italic text-gold-bright">five orchestras</span>
            </h4>
            <p className="mt-4 text-ivory/60 leading-relaxed text-[15px]">
              There is no single morphic field around a living thing — there is
              a superposition of fields, one for every scale, each with its own
              tempo and its own memory. Hover the rings to listen to each
              instrument.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ivory/55">
              <li>· slow evolutionary bass notes — broad, consistent tendencies</li>
              <li>· rapid molecular melodies — specific local variation</li>
              <li>· M<sub>total</sub> = Σ<sub>m</sub> κ<sub>m</sub> · ε<sub>m</sub> · f(r, t, n<sub>m</sub>)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
