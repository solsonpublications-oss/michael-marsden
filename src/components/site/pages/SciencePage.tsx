"use client";

import { Atom, FlaskConical, Landmark, Microscope, ScrollText, ShieldCheck, TestTube2, Waves } from "lucide-react";
import { PageHero, PageWrap, SectionHead } from "../Section";
import Reveal from "../Reveal";
import FieldCard from "../FieldCard";
import CrystalDemo from "../canvas/CrystalDemo";
import type { SitePage } from "@/app/page";

const EVIDENCE = [
  {
    icon: Atom,
    year: "1982",
    who: "Aspect, Dalibard & Roger",
    what: "Bell's inequalities tested with time-varying analyzers",
    why: "Entanglement correlations are real and non-local — the connective tissue morphic resonance needs actually exists.",
  },
  {
    icon: Waves,
    year: "2007",
    who: "Fleming et al., Berkeley",
    what: "Quantum coherence in the FMO photosynthesis complex",
    why: "Nature — 446, 782. Energy travels as a wave sampling all paths at once: quantum computation inside a warm cell.",
  },
  {
    icon: Landmark,
    year: "2000",
    who: "Ritz, Adem & Schulten",
    what: "Radical-pair model of bird magnetoreception",
    why: "Biophysical Journal, 78, 707. A mechanism by which entangled electrons make Earth's magnetic field visible to a bird's eye.",
  },
  {
    icon: Microscope,
    year: "1999",
    who: "Scrutton et al.",
    what: "Hydrogen tunneling in enzyme catalysis",
    why: "Science, 284, 1337. Enzymes exploit quantum tunneling — biology using physics classically forbidden to it.",
  },
  {
    icon: TestTube2,
    year: "1927",
    who: "William McDougall",
    what: "Rats learning a maze faster, generation after generation",
    why: "British Journal of Psychology, 17, 267. The classic anomaly morphic resonance was built to explain.",
  },
];

const LABS = [
  ["Lab A", "London, UK"],
  ["Lab B", "Tokyo, Japan"],
  ["Lab C", "San Francisco, USA"],
  ["Lab D", "Sydney, Australia"],
  ["Lab E", "Cape Town, South Africa"],
];

const PHASES = [
  {
    n: "Phase One",
    months: "Months 1–6",
    color: "#a48ade",
    who: "Lab A only — London",
    body: "300 automated cooling cycles establish the baseline. A compound that has never crystallized in the history of the universe should supercool stubbornly — nucleating at low temperatures.",
  },
  {
    n: "Phase Two",
    months: "Months 7–12",
    color: "#5ec4bd",
    who: "Labs B & C join — Tokyo, San Francisco",
    body: "The critical test. No shared equipment, no traveling personnel, separate reagents and water. Yet their very first trials should start at higher thresholds — because the compound has already been crystallized 300 times in London.",
  },
  {
    n: "Phase Three",
    months: "Months 13–18",
    color: "#eec97d",
    who: "All five labs — 4,500 total trials",
    body: "Global convergence. Thresholds should rise everywhere together, following the Memory Engine's logistic curve — a crystal nucleating in Sydney reinforcing the template in Cape Town.",
  },
];

/** Predicted threshold rise — logistic curve vs flat null hypothesis. */
function PredictionChart() {
  // threshold T(t): T0 + Δ · logistic(progress), Δ = 1.8°C illustrative
  const T0 = 41.0;
  const dT = 1.8;
  const pts = (hypothesis: "morphic" | "null") => {
    const arr: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const x = i / 100;
      const rise =
        hypothesis === "morphic"
          ? dT / (1 + 24 * Math.exp(-6.5 * x))
          : 0.04;
      const t = T0 + rise;
      const y = 100 - ((t - T0) / dT) * 82 - 9; // map to viewBox
      arr.push(`${i === 0 ? "M" : "L"}${x * 100},${y.toFixed(2)}`);
    }
    return arr.join(" ");
  };
  return (
    <div className="rounded-2xl border border-hairline bg-panel p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
        The prediction, plotted
      </p>
      <p className="mt-2 text-sm text-ivory/60 leading-relaxed">
        Nucleation threshold temperature (°C) vs. cumulative global
        crystallizations. The morphic curve rises as κ grows; the null
        hypothesis stays flat.
      </p>
      <div className="mt-5 relative rounded-xl border border-hairline bg-[#080312] p-4">
        <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="none" role="img" aria-label="Chart showing predicted rising nucleation threshold under the morphic hypothesis versus a flat line under the null hypothesis">
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(236,231,219,0.06)" strokeWidth="0.4" />
          ))}
          <path d={pts("null")} fill="none" stroke="#8f7bd4" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          <defs>
            <linearGradient id="morphGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a48ade" />
              <stop offset="55%" stopColor="#5ec4bd" />
              <stop offset="100%" stopColor="#eec97d" />
            </linearGradient>
          </defs>
          <path d={pts("morphic")} fill="none" stroke="url(#morphGrad)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
          <span>0 crystallizations</span>
          <span>4,500 trials →</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
        <span className="flex items-center gap-2 text-ivory/70">
          <span className="w-5 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#a48ade,#eec97d)" }} />
          morphic resonance — threshold rises with global κ
        </span>
        <span className="flex items-center gap-2 text-ivory/70">
          <span className="w-5 h-0.5 rounded-full" style={{ background: "#8f7bd4", opacity: 0.7 }} />
          null hypothesis — standard QED crystallization, flat
        </span>
      </div>
    </div>
  );
}

export default function SciencePage({
  navigate,
}: {
  navigate: (p: SitePage) => void;
}) {
  return (
    <div>
      <PageHero
        kicker="The Science"
        title="Not a belief system."
        accent="A testable claim."
        lead="The book is careful to say it plainly: the equations are not proven — not yet. What they are is precise. And precise hypotheses generate precise experiments. Here is the evidence base, and the experiment designed to settle the question."
      />

      {/* evidence table */}
      <section className="py-14 lg:py-20 px-5 lg:px-8">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="The anomaly shelf"
              title="What the record"
              accent="already shows"
              lead="Every pillar of the PMFM rests on published, peer-reviewed physics or a documented anomaly that the standard model explains poorly. This is the shelf the book builds on."
            />
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVIDENCE.map((e, i) => (
              <Reveal key={e.who} delay={i * 0.07}>
                <FieldCard className="h-full p-6 lg:p-7">
                  <div className="flex items-center justify-between">
                    <e.icon className="w-5 h-5 text-gold-bright" />
                    <span className="font-mono text-xs text-muted-foreground">{e.year}</span>
                  </div>
                  <p className="mt-4 font-display text-xl text-ivory leading-snug">{e.what}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-tealquantum">
                    {e.who}
                  </p>
                  <p className="mt-3 text-sm text-ivory/60 leading-relaxed">{e.why}</p>
                </FieldCard>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <FieldCard className="h-full p-6 lg:p-7 border-dashed">
                <ScrollText className="w-5 h-5 text-violetfield" />
                <p className="mt-4 font-display text-xl text-ivory leading-snug">
                  …and the 12 falsifiable predictions
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-violetfield">
                  UVG 2.0 · Chapter 20
                </p>
                <p className="mt-3 text-sm text-ivory/60 leading-relaxed">
                  The full quantitative specifications — including the derived
                  morphic coherence length L<sub>m</sub> = 7.6 μm at 37 °C — are
                  published openly for independent replication.
                </p>
                <a
                  href="https://www.academia.edu/171610887/UVG_2_0_Complete_Monograph_Chapters_1_21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright hover:text-gold transition-colors"
                >
                  Read the monograph →
                </a>
              </FieldCard>
            </Reveal>
          </div>
        </PageWrap>
      </section>

      {/* decoherence writing */}
      <section className="py-14 lg:py-20 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline">
        <PageWrap>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <Reveal>
              <SectionHead
                align="left"
                kicker="The writing mechanism"
                title="Every collapse is"
                accent="a pen stroke"
                lead="Copenhagen calls it collapse and moves on. Modern physics calls it decoherence — a quantum system's superposition spreading into its surroundings until only classical behavior remains."
              />
              <p className="mt-5 text-ivory/60 leading-relaxed text-[15px]">
                The book's move is simple and bold: decoherence is not the death
                of quantum magic. It is the <em>writing process</em> — the
                physical mechanism by which every event leaves a permanent
                imprint in the vacuum substrate. Every collapse adds a line to
                the library. Memory is not stored <em>despite</em> quantum
                physics; it is stored <em>by</em> it.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  ["01", "An event happens", "a quantum system interacts with its environment", "#a48ade"],
                  ["02", "Coherence spreads", "the superposition leaks into surrounding degrees of freedom", "#5ec4bd"],
                  ["03", "The imprint remains", "the vacuum substrate retains the pattern — the library grows", "#eec97d"],
                ].map(([n, t, d, c], i) => (
                  <div
                    key={n}
                    className="rounded-xl border border-hairline bg-panel p-5 hover:bg-panel-2 hover:-translate-y-1 transition-all duration-400"
                    style={{ borderTopColor: `${c}66`, borderTopWidth: 2 }}
                  >
                    <p className="font-display text-3xl" style={{ color: c as string }}>
                      {n}
                    </p>
                    <p className="mt-2 font-semibold text-ivory text-sm">{t}</p>
                    <p className="mt-1.5 text-xs text-ivory/55 leading-relaxed">{d}</p>
                    {i < 2 ? (
                      <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        ↓ then
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </section>

      {/* the experiment */}
      <section className="py-14 lg:py-24 px-5 lg:px-8">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Chapter Sixteen · The empirical heart"
              title="The Crystallization Threshold"
              accent="Experiment"
              lead="A preregistered, multi-laboratory, double-blinded protocol — designed to satisfy the most skeptical physical chemist. One question: does a compound crystallize more easily after the world has crystallized it before?"
            />
          </Reveal>

          {/* labs */}
          <div className="mt-12 grid sm:grid-cols-5 gap-3">
            {LABS.map((l, i) => (
              <Reveal key={l[0]} delay={i * 0.07}>
                <div className="rounded-xl border border-hairline bg-panel p-4 text-center hover:border-gold/40 hover:bg-panel-2 hover:-translate-y-1 transition-all duration-400">
                  <FlaskConical className="w-4 h-4 mx-auto text-tealquantum" />
                  <p className="mt-2 font-mono text-xs text-gold-bright">{l[0]}</p>
                  <p className="mt-1 text-[11px] text-ivory/60 leading-snug">{l[1]}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              five geographically separated laboratories · identical never-before-crystallized compound · identical automated cooling-ramp systems with optical nucleation sensors
            </p>
          </Reveal>

          {/* phases */}
          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {PHASES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <FieldCard className="h-full p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-2xl" style={{ color: p.color }}>
                      {p.n}
                    </p>
                    <span className="font-mono text-[11px] text-muted-foreground">{p.months}</span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/70">
                    {p.who}
                  </p>
                  <p className="mt-4 text-sm text-ivory/60 leading-relaxed">{p.body}</p>
                </FieldCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
            <Reveal>
              <PredictionChart />
            </Reveal>
            <Reveal delay={0.12}>
              <CrystalDemo />
            </Reveal>
          </div>

          {/* bayesian + honesty */}
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <Reveal>
              <FieldCard className="h-full p-7 lg:p-8">
                <ShieldCheck className="w-6 h-6 text-tealquantum" />
                <h3 className="mt-4 font-display text-2xl text-ivory">
                  Judged by Bayesian statistics
                </h3>
                <p className="mt-4 text-sm text-ivory/60 leading-relaxed">
                  A hierarchical Bayesian model starts from a skeptical prior —
                  the morphic effect is assumed to be zero — and updates as the
                  data arrives from all five laboratories. Power analysis gives
                  the study 80% power to detect a threshold drift as small as{" "}
                  <strong className="text-gold-bright">0.5 °C</strong> across the
                  4,500 trials. Positive, null, or ambiguous — the design yields
                  the most rigorous test of the crystallization prediction ever
                  conducted.
                </p>
              </FieldCard>
            </Reveal>
            <Reveal delay={0.1}>
              <FieldCard className="h-full p-7 lg:p-8">
                <ScrollText className="w-6 h-6 text-gold-bright" />
                <h3 className="mt-4 font-display text-2xl text-ivory">
                  Five libraries, one blank book
                </h3>
                <p className="mt-4 text-sm text-ivory/60 leading-relaxed italic book-quote">
                  Imagine five libraries in five cities, each holding a blank
                  book. A writer in London writes a page a day. Under the
                  morphic hypothesis, the text appears spontaneously in the
                  books in Tokyo, San Francisco, Sydney and Cape Town — no
                  package, no file. The experiment is designed to open those
                  books and measure the text.
                </p>
              </FieldCard>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-10">
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-7 lg:p-9 text-center">
              <p className="font-display italic text-xl lg:text-2xl text-gold-bright leading-relaxed">
                &ldquo;We can prove the universe learns — with the rigorous tools
                of modern physical chemistry and Bayesian statistics.&rdquo;
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                revelation moment · chapter sixteen
              </p>
              <button
                onClick={() => navigate("about")}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright px-7 py-3 text-sm font-bold text-[#14100a] shadow-[0_10px_36px_-10px_rgba(217,164,65,0.7)] hover:-translate-y-0.5 transition-all duration-300"
              >
                The book, the author &amp; the open research
              </button>
            </div>
          </Reveal>
        </PageWrap>
      </section>
    </div>
  );
}
