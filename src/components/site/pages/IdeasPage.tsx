"use client";

import {
  Atom,
  Bird,
  Compass,
  Gauge,
  HeartPulse,
  Lightbulb,
  Maximize2,
  Minimize2,
  ScanLine,
  Sparkles,
  Sun,
  Waves,
  Zap,
} from "lucide-react";
import { PageHero, PageWrap, SectionHead } from "../Section";
import Reveal from "../Reveal";
import FieldCard from "../FieldCard";
import InkDropDemo from "../canvas/InkDropDemo";
import CounterspaceDemo from "../canvas/CounterspaceDemo";
import type { SitePage } from "@/app/page";

const HABIT_EXAMPLES = [
  {
    icon: Gauge,
    title: "Rats, faster each generation",
    body: "W. McDougall ran rats through a water maze in the 1920s and noticed later generations learned quicker — with no genetic contact between them. Sheldrake's explanation: they were borrowing an ever-deepening morphic habit.",
  },
  {
    icon: Sparkles,
    title: "New compounds crystallize easier",
    body: "When a substance has never been crystallized, forming the first crystal is stubbornly hard. Once labs worldwide have made it, new crystals form more readily — as if the shape is already half-known.",
  },
  {
    icon: Compass,
    title: "Instincts too cheap to be encoded",
    body: "A spider weaves its web on the first try. The book argues the information needed for species-wide behaviors exceeds what DNA alone could store — the rest lives in the field.",
  },
];

const FOUNDERS = [
  {
    name: "Max Planck",
    role: "originator of quantum theory (Nobel 1918)",
    line: "“I regard consciousness as fundamental. I regard matter as derivative from consciousness.”",
  },
  {
    name: "John von Neumann",
    role: "mathematical foundations of quantum mechanics (1932)",
    line: "The chain of measurement cannot be analyzed consistently without reference to a conscious observer.",
  },
  {
    name: "Erwin Schrödinger",
    role: "the wave equation; What Is Life? (1944)",
    line: "Consciousness is not a product of physical processes — the multiplicity of minds is an illusion of spacetime.",
  },
  {
    name: "Werner Heisenberg",
    role: "the uncertainty principle",
    line: "The observer is not incidental to measurement. The observer is constitutive of it.",
  },
];

const Q_BIO = [
  {
    icon: Sun,
    color: "#eec97d",
    title: "Photosynthesis computes a wave",
    fact: "~100% transfer efficiency",
    body: "In 2007, Berkeley chemists observed quantum coherence inside the FMO light-harvesting complex at room temperature. The energy packet doesn't hop randomly between chlorophyll molecules — it travels as a wave that samples all paths at once and takes the single best one. Life runs quantum search.",
  },
  {
    icon: Bird,
    color: "#5ec4bd",
    title: "Birds see magnetic fields",
    fact: "a field 100× weaker than a fridge magnet",
    body: "Migratory birds navigate using Earth's ~50-microtesla field — far too weak for any classical sensor in a warm, noisy cell. The radical-pair model (Ritz, Adem & Schulten, 2000): entangled electron pairs in the eye's cryptochrome proteins make the field literally visible as a tint over the sky.",
  },
  {
    icon: Zap,
    color: "#a48ade",
    title: "Enzymes let hydrogen tunnel",
    fact: "through the barrier, not over it",
    body: "Scrutton and colleagues (1999) showed biological enzymes exploit quantum tunneling — particles passing through energy barriers classically forbidden to them. The warm wet cell is not a quantum-destroyer; it is a quantum workshop.",
  },
];

/** Proton projector / accumulator — inline SVG diagram with CSS animation. */
function ProtonDiagram() {
  return (
    <div className="relative rounded-2xl border border-hairline bg-[#080312] p-6 sm:p-8 overflow-hidden">
      <svg viewBox="0 0 420 260" className="w-full" role="img" aria-label="Diagram of the proton as a two-way transducer: projecting physical reality outward and accumulating morphic memory inward">
        <defs>
          <radialGradient id="pglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eec97d" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#d9a441" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
          </radialGradient>
          <marker id="arrOut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#eec97d" />
          </marker>
          <marker id="arrIn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#5ec4bd" />
          </marker>
        </defs>

        {/* outward projection rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 210 + Math.cos(rad) * 34;
          const y1 = 130 + Math.sin(rad) * 34;
          const x2 = 210 + Math.cos(rad) * 118;
          const y2 = 130 + Math.sin(rad) * 118;
          return (
            <g key={deg}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eec97d" strokeWidth="1.1" strokeDasharray="4 6" markerEnd="url(#arrOut)" opacity="0.75">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.4s" repeatCount="indefinite" />
              </line>
            </g>
          );
        })}
        {[26, 116, 206, 296].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 210 + Math.cos(rad) * 168;
          const y2 = 130 + Math.sin(rad) * 168;
          return (
            <circle key={deg} cx={x2} cy={y2} r="3.5" fill="#eec97d" opacity="0.85">
              <animate attributeName="opacity" values="0.1;0.9;0.1" dur="2.2s" begin={`${(deg % 100) / 100}s`} repeatCount="indefinite" />
            </circle>
          );
        })}

        {/* inward accumulation arcs */}
        {[20, 110, 200, 290].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 210 + Math.cos(rad) * 150;
          const y1 = 130 + Math.sin(rad) * 150;
          const x2 = 210 + Math.cos(rad) * 46;
          const y2 = 130 + Math.sin(rad) * 46;
          return (
            <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5ec4bd" strokeWidth="1.1" strokeDasharray="3 7" markerEnd="url(#arrIn)" opacity="0.8">
              <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1.8s" repeatCount="indefinite" />
            </line>
          );
        })}

        {/* proton core */}
        <circle cx="210" cy="130" r="52" fill="url(#pglow)" />
        <circle cx="210" cy="130" r="17" fill="#0d0d16" stroke="#eec97d" strokeWidth="1.6" />
        <text x="210" y="134" textAnchor="middle" fill="#eec97d" fontSize="11" fontFamily="monospace">p⁺</text>

        {/* labels */}
        <text x="210" y="18" textAnchor="middle" fill="#eec97d" fontSize="10" letterSpacing="3">CENTRIFUGAL PROJECTION — reality rendered outward</text>
        <text x="210" y="250" textAnchor="middle" fill="#5ec4bd" fontSize="10" letterSpacing="3">CENTRIPETAL ACCUMULATION — history recorded inward</text>
        <text x="210" y="34" textAnchor="middle" fill="#9a937f" fontSize="8.5" fontFamily="monospace">the movie projector · ~2×10¹⁶ frames / second</text>
        <text x="210" y="266" textAnchor="middle" fill="#9a937f" fontSize="8.5" fontFamily="monospace">the microphone · writing the vacuum's library</text>
      </svg>
    </div>
  );
}

export default function IdeasPage({
  navigate,
}: {
  navigate: (p: SitePage) => void;
}) {
  return (
    <div>
      <PageHero
        kicker="Core Ideas"
        title="Every big idea of the book,"
        accent="made feelable"
        lead="Morphic resonance, counterspace, the living vacuum, quantum biology — no equations yet, no jargon without translation. Just the concepts, held up to the light."
      />

      {/* ---------- 1. habits not laws ---------- */}
      <section className="py-14 lg:py-20 px-5 lg:px-8">
        <PageWrap>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <Reveal>
              <SectionHead
                align="left"
                kicker="Idea 01 · Morphic resonance"
                title="The universe has habits,"
                accent="not just laws"
                lead="Biology's deepest mystery isn't only how a fertilized egg becomes a body — it's how it knows which form to become. DNA alone is far too small a book to hold that answer. Rupert Sheldrake's proposal, defended for forty-five years: every form and behavior leaves a template in a non-material field, and similar systems resonate with it. Repetition deepens the template. The universe literally gets better at being itself."
              />
              <p className="mt-5 text-ivory/60 leading-relaxed text-[15px]">
                The author calls the fields through which this memory operates{" "}
                <em>morphic fields</em> (from the Greek <em>morphē</em> — form),
                and the process <em>morphic resonance</em>. For decades the idea
                was dismissed — not because the evidence was weak, but because
                nobody had given it mathematics. That absence is exactly what
                the Polytropic Morphic Field Model was written to end.
              </p>
            </Reveal>
            <div className="space-y-4">
              {HABIT_EXAMPLES.map((ex, i) => (
                <Reveal key={ex.title} delay={i * 0.1}>
                  <FieldCard className="p-5 lg:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-lg border border-gold/30 bg-gold/10 flex items-center justify-center">
                        <ex.icon className="w-5 h-5 text-gold-bright" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-ivory">{ex.title}</h3>
                        <p className="mt-2 text-sm text-ivory/60 leading-relaxed">{ex.body}</p>
                      </div>
                    </div>
                  </FieldCard>
                </Reveal>
              ))}
            </div>
          </div>
        </PageWrap>
      </section>

      {/* ---------- 2. Bohm ink drop ---------- */}
      <section className="py-14 lg:py-24 px-5 lg:px-8 bg-gradient-to-b from-transparent via-[#0d0718] to-transparent">
        <PageWrap>
          <Reveal>
            <InkDropDemo />
          </Reveal>
        </PageWrap>
      </section>

      {/* ---------- 3. space vs counterspace ---------- */}
      <section className="py-14 lg:py-24 px-5 lg:px-8">
        <PageWrap>
          <Reveal className="mb-12">
            <SectionHead
              kicker="Idea 03 · The geometry of memory"
              title="Space is not the stage. It is"
              accent="one of two stages."
              lead="Every field you were taught in school radiates outward — a lamp, a bonfire. But morphic fields converge inward, like a whirlpool. Ordinary geometry cannot hold that. A dual geometry can: counterspace, where the point is not the emptiest thing but the richest — the meeting of all planes."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <CounterspaceDemo />
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ["Euclidean space", "built upward from points — the atom of geometry", "#eec97d"],
                ["Counterspace", "built inward from planes — the boundary is primary", "#5ec4bd"],
                ["The morphic field", "lives in counterspace; the organism is its focus", "#a48ade"],
              ].map(([t, b, c]) => (
                <div
                  key={t}
                  className="rounded-xl border border-hairline bg-panel p-5 hover:bg-panel-2 hover:-translate-y-1 transition-all duration-400"
                  style={{ borderTopColor: `${c}66`, borderTopWidth: 2 }}
                >
                  <p className="font-display text-lg" style={{ color: c as string }}>
                    {t}
                  </p>
                  <p className="mt-1.5 text-sm text-ivory/60 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </PageWrap>
      </section>

      {/* ---------- 4. heartbeat / larmor ---------- */}
      <section className="py-14 lg:py-24 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline">
        <PageWrap>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SectionHead
                align="left"
                kicker="Idea 04 · The heartbeat of the universe"
                title="Reality has a"
                accent="refresh rate"
                lead="A screen redraws itself 60–240 times a second. The book asks the radical question: what if the seamless flow of reality is also a rapid sequence of frames, re-projected from counterspace faster than any instrument can resolve?"
              />
              <div className="mt-7 rounded-2xl border border-gold/25 bg-panel p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                  The Larmor frequency — the universe's clock
                </p>
                <p className="mt-3 font-mono text-2xl text-gold-bright">
                  ω<sub>L</sub> = q·B / 2m
                </p>
                <p className="mt-3 text-sm text-ivory/60 leading-relaxed">
                  Every spinning charged particle in a magnetic field wobbles at
                  a precise, universal rate — set only by its charge-to-mass
                  ratio and the field. It is a clean clock built into matter
                  itself. Your MRI scanner already speaks this language: it
                  listens to hydrogen protons precessing at 64 MHz and rebuilds
                  your body's interior from their radio song.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative rounded-2xl border border-hairline bg-[#080312] p-8 flex flex-col items-center justify-center min-h-[380px] overflow-hidden">
                {/* breathing larmor rings */}
                <div className="relative w-64 h-64">
                  {[0, 1, 2, 3].map((k) => (
                    <div
                      key={k}
                      className="absolute inset-0 rounded-full border border-gold/40"
                      style={{
                        animation: `larmorPulse 2.8s ease-out ${k * 0.7}s infinite`,
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, rgba(238,201,125,0.5), rgba(217,164,65,0.15) 60%, transparent)",
                        boxShadow: "0 0 44px -4px rgba(217,164,65,0.8)",
                      }}
                    >
                      <HeartPulse className="w-8 h-8 text-gold-bright heartbeat" />
                    </div>
                  </div>
                </div>
                <style>{`
                  @keyframes larmorPulse {
                    0% { transform: scale(0.18); opacity: 0.9; }
                    100% { transform: scale(1.15); opacity: 0; }
                  }
                `}</style>
                <p className="mt-8 text-center text-sm text-ivory/55 max-w-xs leading-relaxed">
                  Precession rings radiating at the Larmor rate — the pulse by
                  which, the book proposes, the proton re-instantiates the
                  world.
                </p>
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </section>

      {/* ---------- 5. consciousness fundamental ---------- */}
      <section className="py-14 lg:py-24 px-5 lg:px-8">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Idea 05 · The foundation"
              title="Consciousness is not produced."
              accent="It is presumed."
              lead="The “Hard Problem” (David Chalmers, 1995): neuroscience maps what the brain does, but nothing explains why any of it feels like anything. A camera detects red with zero error — and there is nothing it is like to be the camera. You see red, and there is. The book's position, following the quantum founders: matter is derived from consciousness, not the reverse."
            />
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <FieldCard className="h-full p-6 lg:p-7">
                  <p className="font-display text-2xl text-gold-bright">{f.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {f.role}
                  </p>
                  <p className="mt-4 book-quote text-[15px] text-ivory/75 leading-relaxed italic">
                    {f.line}
                  </p>
                </FieldCard>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </section>

      {/* ---------- 6. proton projector ---------- */}
      <section className="py-14 lg:py-24 px-5 lg:px-8 bg-gradient-to-b from-transparent via-[#0d0718] to-transparent">
        <PageWrap>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SectionHead
                align="left"
                kicker="Idea 06 · The mechanism"
                title="The proton is not a brick."
                accent="It is a projector."
                lead="Rutherford's proton sits quietly at the center of the atom. The book's proton never rests: every attosecond it projects your physical reality outward, frame by frame, like a movie projector running at twenty quadrillion frames per second — and simultaneously records everything that happens back into the vacuum, like a microphone pointed at history."
              />
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gold/30 bg-gold/5 p-5 hover:bg-gold/10 transition-colors duration-400">
                  <Maximize2 className="w-5 h-5 text-gold-bright" />
                  <p className="mt-3 font-display text-lg text-ivory">Projection →</p>
                  <p className="mt-1.5 text-xs text-ivory/60 leading-relaxed">
                    centrifugal · renders the explicate world from the counterspace template
                  </p>
                </div>
                <div className="rounded-xl border border-tealquantum/30 bg-tealquantum/5 p-5 hover:bg-tealquantum/10 transition-colors duration-400">
                  <Minimize2 className="w-5 h-5 text-tealquantum" />
                  <p className="mt-3 font-display text-lg text-ivory">← Accumulation</p>
                  <p className="mt-1.5 text-xs text-ivory/60 leading-relaxed">
                    centripetal · writes the history of events back into the field
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-ivory/55 leading-relaxed">
                Projection and accumulation stay in balance — that balance is
                the fourth equation's subject. The proton is a two-way street
                between space and counterspace: it renders the present from the
                memory of the past, and writes the present into the memory of
                the future.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ProtonDiagram />
            </Reveal>
          </div>
        </PageWrap>
      </section>

      {/* ---------- 7. vacuum library ---------- */}
      <section className="py-14 lg:py-24 px-5 lg:px-8 border-y border-hairline bg-[#0b0616]">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Idea 07 · Nature's library"
              title="The vacuum is not empty."
              accent="It is the deepest library in existence."
              lead="Quantum mechanics forbids absolute stillness — even at absolute zero, fields must fluctuate (zero-point energy). And the Bekenstein–Hawking bound tells us exactly how much information a region of space can hold. The numbers are absurd on purpose."
            />
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                icon: ScanLine,
                n: "10⁹⁹",
                t: "bits in one cubic centimeter",
                d: "of “empty” space — by the Bekenstein–Hawking bound alone.",
              },
              {
                icon: Atom,
                n: "10¹⁴⁴",
                t: "bits per cm³ with holographic capacity",
                d: "the vacuum substrate's maximum informational capacity in the book's model.",
              },
              {
                icon: Lightbulb,
                n: "10⁸⁰",
                t: "atoms in the entire visible universe",
                d: "for scale — the library could hold every book ever written many trillions of times over.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <FieldCard className="h-full p-7 text-center">
                  <s.icon className="w-6 h-6 mx-auto text-gold-bright" />
                  <p className="stat-number font-display text-5xl mt-4">{s.n}</p>
                  <p className="mt-3 font-semibold text-ivory text-sm">{s.t}</p>
                  <p className="mt-2 text-xs text-ivory/55 leading-relaxed">{s.d}</p>
                </FieldCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 book-quote max-w-3xl mx-auto font-display italic text-xl lg:text-2xl text-ivory/85 leading-relaxed">
              Your body is a storage medium — not a metaphor, a literal one.
              Every proton in you is continuously reading your pattern from the
              library and writing your experience back into it, twenty
              quadrillion times per second.
            </p>
          </Reveal>
        </PageWrap>
      </section>

      {/* ---------- 8. quantum biology ---------- */}
      <section className="py-14 lg:py-24 px-5 lg:px-8">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Idea 08 · Quantum biology"
              title="Life was always"
              accent="quantum"
              lead="For a century, physics assumed quantum effects were too fragile for the warm, wet, noisy cell. Twenty years of experiments say the opposite: life doesn't tolerate quantum mechanics — it exploits it. This is the physical bridge the book proposes between biology and the morphic network."
            />
          </Reveal>
          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {Q_BIO.map((q, i) => (
              <Reveal key={q.title} delay={i * 0.1}>
                <FieldCard className="h-full p-7 group">
                  <div
                    className="w-11 h-11 rounded-xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${q.color}55`,
                      background: `${q.color}12`,
                    }}
                  >
                    <q.icon className="w-5 h-5" style={{ color: q.color }} />
                  </div>
                  <p
                    className="mt-5 text-[11px] uppercase tracking-[0.25em]"
                    style={{ color: q.color }}
                  >
                    {q.fact}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ivory">{q.title}</h3>
                  <p className="mt-3 text-sm text-ivory/60 leading-relaxed">{q.body}</p>
                </FieldCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-12 text-center">
            <button
              onClick={() => navigate("science")}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/45 bg-gold/10 px-7 py-3.5 text-sm font-semibold text-gold-bright hover:bg-gold/20 hover:border-gold/70 hover:shadow-[0_0_28px_-6px_rgba(217,164,65,0.7)] transition-all duration-300"
            >
              <Waves className="w-4 h-4" />
              Continue to the evidence &amp; the experiment
            </button>
          </Reveal>
        </PageWrap>
      </section>
    </div>
  );
}
