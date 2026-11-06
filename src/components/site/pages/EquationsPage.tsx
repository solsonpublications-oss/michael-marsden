"use client";

import { useState } from "react";
import { CircleDot, Compass, GitBranch, MoveHorizontal, Orbit, Sigma } from "lucide-react";
import { PageHero, PageWrap, SectionHead } from "../Section";
import Reveal from "../Reveal";
import FieldCard from "../FieldCard";
import KappaChart from "../canvas/KappaChart";
import SymphonyRings from "../canvas/SymphonyRings";
import type { SitePage } from "@/app/page";

const EQ_CARDS = [
  { id: "eq1", num: "I", name: "The Field Snapshot", tag: "what the field is", color: "#eec97d" },
  { id: "eq2", num: "II", name: "The Compression Law", tag: "how specific it is", color: "#d9a441" },
  { id: "eq3", num: "III", name: "The Memory Engine", tag: "how habits grow", color: "#5ec4bd" },
  { id: "eq4", num: "IV", name: "The Symphony of Scales", tag: "how they layer", color: "#a48ade" },
];

function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {items.map(([sym, mean]) => (
        <div key={sym} className="flex items-start gap-3 text-sm">
          <span className="font-mono text-gold-bright shrink-0 min-w-[54px]">{sym}</span>
          <span className="text-ivory/60 leading-relaxed">{mean}</span>
        </div>
      ))}
    </div>
  );
}

function EqBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="equation-box p-7 sm:p-9">
      <span className="eq-corner border-t-2 border-l-2 top-2 left-2 absolute rounded-tl" />
      <span className="eq-corner border-t-2 border-r-2 top-2 right-2 absolute rounded-tr" />
      <span className="eq-corner border-b-2 border-l-2 bottom-2 left-2 absolute rounded-bl" />
      <span className="eq-corner border-b-2 border-r-2 bottom-2 right-2 absolute rounded-br" />
      <div className="text-center font-mono text-xl sm:text-2xl lg:text-[26px] text-gold-bright tracking-wide overflow-x-auto pb-1">
        {children}
      </div>
    </div>
  );
}

export default function EquationsPage({
  navigate,
}: {
  navigate: (p: SitePage) => void;
}) {
  const [activeEq, setActiveEq] = useState<string | null>(null);

  const jump = (id: string) => {
    setActiveEq(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <PageHero
        kicker="Part II · The Mathematics"
        title="Four equations that give memory"
        accent="a body"
        lead="The Polytropic Morphic Field Model — the PMFM. The author's life's work: a precise mathematical language for how the universe stores, strengthens and layers its habits. Every equation is shown with a word-by-word translation. You can read this whole page without knowing any math, and lose nothing essential."
      />

      {/* index cards */}
      <section className="py-10 lg:py-14 px-5 lg:px-8">
        <PageWrap>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EQ_CARDS.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                <FieldCard className="p-6 text-center" onClick={() => jump(c.id)}>
                  <p className="font-display text-3xl" style={{ color: c.color }}>
                    {c.num}
                  </p>
                  <p className="mt-2 font-semibold text-ivory text-[15px]">{c.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.tag}</p>
                  <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.25em]" style={{ color: c.color }}>
                    ↓ read below
                  </span>
                </FieldCard>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </section>

      {/* why math matters */}
      <section className="py-12 lg:py-20 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline">
        <PageWrap>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <SectionHead
                align="left"
                kicker="Chapter Six · Giving math to the metaphor"
                title="Why the mathematics"
                accent="matters"
                lead="In 1912 Alfred Wegener showed that the continents fit together like puzzle pieces — and was rejected for fifty years. Not because the evidence was bad, but because he had no mechanism, no equations. When seafloor spreading supplied the physics in the 1960s, plate tectonics went from heresy to orthodoxy in under a decade."
              />
              <p className="mt-5 text-ivory/60 leading-relaxed text-[15px]">
                Stories cannot be wrong — and so they cannot be tested. A story
                cannot be falsified, cannot calculate, cannot design an
                experiment. Morphic resonance spent forty-five years as a
                beautiful story. The PMFM turns it into a scientific hypothesis:
                three mathematical problems — <strong className="text-ivory">geometry</strong>{" "}
                (where the field lives), <strong className="text-ivory">dynamics</strong>{" "}
                (how it evolves), and <strong className="text-ivory">coupling</strong>{" "}
                (how it touches matter) — each answered by one of the four
                equations.
              </p>
            </Reveal>
            <div className="space-y-4">
              {[
                {
                  icon: Compass,
                  t: "Challenge 1 — Geometry",
                  d: "Morphic fields converge inward; Euclidean field theory only handles outward radiation. Answer: the counterspace geometry of Equation One.",
                  c: "#eec97d",
                },
                {
                  icon: GitBranch,
                  t: "Challenge 2 — Dynamics",
                  d: "How does a habit strengthen with repetition and reach permanence? Answer: the memory-kernel evolution of Equation Three.",
                  c: "#5ec4bd",
                },
                {
                  icon: Orbit,
                  t: "Challenge 3 — Coupling",
                  d: "How does a non-material template move atoms? Answer: the proton interface — projection and accumulation in balance.",
                  c: "#a48ade",
                },
              ].map((x, i) => (
                <Reveal key={x.t} delay={i * 0.1}>
                  <FieldCard className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 shrink-0 rounded-lg border flex items-center justify-center"
                        style={{ borderColor: `${x.c}55`, background: `${x.c}12` }}
                      >
                        <x.icon className="w-5 h-5" style={{ color: x.c }} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-ivory">{x.t}</h3>
                        <p className="mt-2 text-sm text-ivory/60 leading-relaxed">{x.d}</p>
                      </div>
                    </div>
                  </FieldCard>
                </Reveal>
              ))}
            </div>
          </div>
        </PageWrap>
      </section>

      {/* EQ 1 */}
      <section id="eq1" className="py-14 lg:py-24 px-5 lg:px-8 scroll-mt-24">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Equation I · Chapters Seven"
              title="The Field Snapshot"
              accent="— what the field is"
              lead="Maxwell gave the electric and magnetic fields a complete description: two arrows at every point in space. The Field Snapshot is the morphic field's Maxwell — its state written down at a single point of counterspace, at a single moment."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-3xl mx-auto">
            <EqBox>
              F̃<sup>μν</sup> = ∂<sup>μ</sup>Ã<sup>ν</sup> − ∂<sup>ν</sup>Ã<sup>μ</sup>
              <span className="mx-3 text-ivory/50">⟺</span>
              Ψ<sub>M</sub>(x, t) = (ε, φ⃗)
            </EqBox>
            <Legend
              items={[
                ["F̃μν", "the morphic field tensor in its dual (counterspace) representation"],
                ["Ãν", "a potential defined on the boundary, converging inward — not radiating outward"],
                ["ε", "field intensity: how strongly the template pulls the system toward its form"],
                ["φ⃗", "field orientation: which form the pull is aimed at"],
              ]}
            />
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-hairline bg-panel p-5 hover:bg-panel-2 transition-colors duration-400">
                <CircleDot className="w-5 h-5 text-gold-bright" />
                <p className="mt-3 text-sm text-ivory/70 leading-relaxed">
                  <strong>The whirlpool test.</strong> Ordinary fields are bonfires —
                  bright at the source, fading out. This tensor is built so the field
                  is most intense at the interior focus: a drain, not a lamp. The
                  centripetal character is not added later; it is baked into the
                  mathematics from the first line.
                </p>
              </div>
              <div className="rounded-xl border border-hairline bg-panel p-5 hover:bg-panel-2 transition-colors duration-400">
                <Compass className="w-5 h-5 text-tealquantum" />
                <p className="mt-3 text-sm text-ivory/70 leading-relaxed">
                  <strong>Why dual space?</strong> Counterspace is the projective
                  dual of ordinary geometry — planes primary, points derived. Writing
                  the field with differential forms in that dual geometry is what makes
                  a converging field describable at all.
                </p>
              </div>
            </div>
          </Reveal>
        </PageWrap>
      </section>

      {/* EQ 2 */}
      <section id="eq2" className="py-14 lg:py-24 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline scroll-mt-24">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Equation II · Chapter Eight"
              title="The Compression Law"
              accent="— how specific the field is"
              lead="Borrowed from astrophysics, where polytropic relations describe how pressure and volume trade off inside stars, this law assigns every morphic field a “personality”: the polytropic index n. It predicts that the more organized a system is, the stronger its morphic field."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-3xl mx-auto">
            <EqBox>
              P · V<sup>n</sup> = K
            </EqBox>
            <Legend
              items={[
                ["P", "internal pressure of the system"],
                ["V", "spatial volume of the medium"],
                ["n", "polytropic index — the field's “personality” (diffuse → sharp)"],
                ["K", "the polytropic constant tying them together"],
              ]}
            />
            <div className="mt-8 rounded-2xl border border-hairline bg-panel p-6 lg:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                The n-index — from fog to crystal
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { n: "n ≈ 0", t: "Diffuse & permissive", d: "a general organizational tendency — fog-like", w: "12%", c: "#a48ade" },
                  { n: "n = 2", t: "Moderate specificity", d: "liquids and soft biological tissue", w: "42%", c: "#5ec4bd" },
                  { n: "n = 3–4", t: "Sharp templates", d: "crystals with their repeating lattices, neural tissue", w: "74%", c: "#d9a441" },
                  { n: "n ≈ 5", t: "Rigid & precise", d: "the most exact form-specification the model allows", w: "100%", c: "#eec97d" },
                ].map((r) => (
                  <div key={r.n} className="group">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-mono text-sm" style={{ color: r.c }}>
                        {r.n} · {r.t}
                      </p>
                      <p className="text-[11px] text-muted-foreground hidden sm:block">{r.d}</p>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-ivory/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 group-hover:brightness-125"
                        style={{ width: r.w, background: `linear-gradient(90deg, ${r.c}66, ${r.c})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-ivory/60 leading-relaxed">
                <strong className="text-ivory">The testable prediction:</strong>{" "}
                morphic effects on crystallization and on learning should scale
                with the degree of organization of the system. Crystals — precisely
                repeating lattices — should carry more morphic intensity than
                liquids; neural tissue, the most organized structure we know, the
                most of all.
              </p>
            </div>
          </Reveal>
        </PageWrap>
      </section>

      {/* EQ 3 */}
      <section id="eq3" className="py-14 lg:py-24 px-5 lg:px-8 scroll-mt-24">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Equation III · Chapter Nine"
              title="The Memory Engine"
              accent="— the heart of the model"
              lead="This is the equation the whole book orbits: how nature's habits accumulate. κ (kappa) measures the strength of the resonance between a system and its template. New pattern → small κ. Ancient species-level behavior → κ so large the pattern is effectively permanent."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-3xl mx-auto">
            <EqBox>
              dκ/dt = <span className="text-gold-bright">ακ</span> −{" "}
              <span className="text-violetfield">βκ²</span> +{" "}
              <span className="text-tealquantum">γ·Ξ<sub>entangle</sub></span>
            </EqBox>
            <Legend
              items={[
                ["dκ/dt", "how fast the habit deepens"],
                ["ακ", "habit reinforcement — repetition feeds the groove (positive feedback)"],
                ["βκ²", "stabilizing saturation — no runaway; coupling settles at a plateau"],
                ["γ·Ξentangle", "quantum entanglement's contribution to non-local resonance"],
              ]}
            />
          </Reveal>
          <Reveal delay={0.18} className="mt-10 max-w-3xl mx-auto">
            <KappaChart />
          </Reveal>
        </PageWrap>
      </section>

      {/* EQ 4 */}
      <section id="eq4" className="py-14 lg:py-24 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline scroll-mt-24">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Equation IV · Chapter Ten"
              title="The Symphony of Scales"
              accent="— fields within fields"
              lead="If morphic fields are so powerful, why does anything vary? Why doesn't every rat learn the maze at the same speed? Because you are never influenced by one field — you are influenced by a superposition of fields at every scale at once, each with its own tempo and its own κ."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-3xl mx-auto">
            <EqBox>
              M<sub>total</sub> = Σ<sub>m</sub> κ<sub>m</sub> · ε<sub>m</sub> · f(r, t, n<sub>m</sub>)
            </EqBox>
            <Legend
              items={[
                ["M_total", "the composite morphic influence acting on the system right now"],
                ["m", "one nested scale: proton → molecule → cell → organism → species"],
                ["κm · εm", "that scale's coupling strength × field intensity"],
                ["f(r,t,n_m)", "the field's shape in space and time, with its own polytropic index"],
              ]}
            />
          </Reveal>
          <Reveal delay={0.18} className="mt-14">
            <SymphonyRings />
          </Reveal>
        </PageWrap>
      </section>

      {/* proton balance + predictions */}
      <section className="py-14 lg:py-24 px-5 lg:px-8">
        <PageWrap>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Reveal>
              <SectionHead
                align="left"
                kicker="Chapter Eleven · The proton interface"
                title="The Projection–Accumulation"
                accent="balance"
                lead="The fourth equation of the formal paper ties the whole model to matter: at a stable physical state, what the proton projects outward and what it records inward must be in dynamic equilibrium."
              />
              <div className="mt-8">
                <EqBox>
                  ∇<sub>μ</sub> J̃<sup>μ</sup><sub>M,out</sub> = Ã<sub>p</sub>[M]
                </EqBox>
                <Legend
                  items={[
                    ["∇μ J̃μ", "divergence of the outward morphic current — reality rendered"],
                    ["Ãp[M]", "rate at which the proton's core draws in and stores the field M"],
                    ["⇄", "projection and memory-write balanced at every stable state"],
                  ]}
                />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <SectionHead
                align="left"
                kicker="Why this is science"
                title="Predictions you can"
                accent="go test"
                lead="The PMFM generates quantitative, laboratory-testable claims. That is what separates it from every story about a “connected universe” that came before."
              />
              <div className="mt-8 space-y-4">
                {[
                  ["The crystallization threshold should fall", "as a specific function of how many times the compound has been crystallized worldwide — following the Memory Engine's curve."],
                  ["Morphic learning should scale", "with population size and repetition count, as κ evolves."],
                  ["Coupling should track organization", "— stronger morphic effects in higher-polytropic-index (more organized) systems, measurable across levels of biology."],
                ].map(([t, d], i) => (
                  <FieldCard key={t} className="p-5 lg:p-6">
                    <div className="flex items-start gap-4">
                      <span className="font-display text-2xl text-gold-bright shrink-0 w-8">
                        {i + 1}.
                      </span>
                      <div>
                        <p className="font-semibold text-ivory">{t}</p>
                        <p className="mt-1.5 text-sm text-ivory/60 leading-relaxed">{d}</p>
                      </div>
                    </div>
                  </FieldCard>
                ))}
                <div className="rounded-xl border border-gold/30 bg-gold/5 p-6 flex items-start gap-4">
                  <Sigma className="w-6 h-6 text-gold-bright shrink-0" />
                  <p className="text-sm text-ivory/70 leading-relaxed">
                    <strong className="text-gold-bright">Revelation moment:</strong>{" "}
                    the theory was never disproven — it was never precise enough
                    to be tested. Now, for the first time, it has the
                    mathematics it needs.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => navigate("science")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-bright hover:text-gold transition-colors group"
                  >
                    <MoveHorizontal className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    See the experiment designed to test it
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </section>
    </div>
  );
}
