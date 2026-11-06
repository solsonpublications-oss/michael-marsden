"use client";

import { useState } from "react";
import { ArrowUpRight, Quote } from "lucide-react";
import { PageHero, PageWrap } from "../Section";
import Reveal from "../Reveal";
import type { SitePage } from "@/app/page";

type Chapter = {
  n: number;
  title: string;
  body: string;
  quote?: { text: string; by?: string };
};

type Part = {
  label: string;
  kicker: string;
  color: string;
  chapters: Chapter[];
};

const PARTS: Part[] = [
  {
    label: "Part One",
    kicker: "The Story — how the picture forms",
    color: "#eec97d",
    chapters: [
      {
        n: 1,
        title: "Before You Were Born",
        body: "A soldier runs through cold mud a century ago and the world comes apart. A person in Sacramento wakes gasping at 6:47 AM with an ache at the base of the skull and a birthmark no doctor can name. And a boy in a 1950s garage holds a magnet and asks the question that will consume fifty-five years: what is a field made of?",
        quote: { text: "What happened to me before I was me?" },
      },
      {
        n: 2,
        title: "The Illusion of Separation",
        body: "David Bohm — exiled by McCarthyism, companion of Einstein — showed that quantum mechanics allows an alternative to the Copenhagen orthodoxy, then spent a career arguing that separate things are unfoldings of a deeper, undivided order. His ink drop in glycerin is the demonstration: enfold the drop, reverse the turn, watch it return.",
        quote: { text: "The world at its most fundamental level is an unbroken wholeness." },
      },
      {
        n: 3,
        title: "Space vs. Counterspace",
        body: "Projective geometry has a perfect symmetry between points and planes. Flip the construction: build space inward from planes instead of upward from points, and a point becomes the richest thing in geometry — the meeting of all planes. In this dual space, fields converge like whirlpools instead of radiating like bonfires. Morphic fields need exactly this geometry.",
        quote: { text: "Not a bonfire, but a whirlpool. Not a lamp, but a drain." },
      },
      {
        n: 4,
        title: "The Heartbeat of the Universe",
        body: "A screen redraws itself 60–240 times a second. The book proposes that reality too is re-instantiated frame by frame from counterspace — at the Larmor frequency, the precise rate at which spinning protons precess in magnetic fields. The same physics that lets an MRI scanner sing with your body's hydrogen.",
        quote: { text: "Space refreshes itself moment by moment." },
      },
      {
        n: 5,
        title: "Consciousness is Fundamental",
        body: "The Hard Problem: no physics explains why processing feels like anything. Planck, von Neumann, Schrödinger and Heisenberg — the builders of quantum theory — each concluded that consciousness is not produced by matter but presupposed by it. The book takes them seriously.",
        quote: {
          text: "I regard consciousness as fundamental. I regard matter as derivative from consciousness.",
          by: "Max Planck",
        },
      },
    ],
  },
  {
    label: "Part Two",
    kicker: "The Mathematics — the metaphor gets a body",
    color: "#d9a441",
    chapters: [
      {
        n: 6,
        title: "Giving Math to the Metaphor",
        body: "Wegener's continents were rejected for fifty years for lack of a mechanism. Sheldrake's morphic resonance waited forty-five for the same reason. This chapter names the three problems any solution must solve — geometry, dynamics, coupling — and introduces the PMFM as the answer.",
      },
      {
        n: 7,
        title: "The Field Snapshot — Equation One",
        body: "F̃μν = ∂μÃν − ∂νÃμ. The state of a morphic field at one point of counterspace: an intensity ε (how strongly the template pulls) and an orientation φ (toward which form). Built in dual space, so the centripetal, whirlpool character is native to the mathematics.",
      },
      {
        n: 8,
        title: "The Compression Law — Equation Two",
        body: "P·Vⁿ = K. Borrowed from stellar physics, the polytropic index n becomes a field's personality — from diffuse (n≈0) to rigid (n≈5). Prediction: the more organized the system, the stronger its morphic field. Crystals outrank liquids; neural tissue outranks nearly everything.",
      },
      {
        n: 9,
        title: "The Memory Engine — Equation Three",
        body: "dκ/dt = ακ − βκ² + γ·Ξentangle. The heart of the model: how habits deepen. Reinforcement feeds the groove, saturation caps it, and quantum entanglement couples it non-locally. New patterns have small κ; species-old habits have κ so large the behavior feels eternal.",
        quote: { text: "Kappa is the mathematical representation of habit." },
      },
      {
        n: 10,
        title: "The Symphony of Scales — Equation Four",
        body: "M_total = Σm κm · εm · f(r,t,nm). No single field shapes you — a superposition does: proton fields at picoseconds, molecular fields at nanoseconds, cellular, organismal, and species fields across geological time. Slow evolutionary bass notes; rapid molecular melodies.",
      },
    ],
  },
  {
    label: "Part Three",
    kicker: "The Mechanism & the Evidence",
    color: "#5ec4bd",
    chapters: [
      {
        n: 11,
        title: "The Proton as the Projector",
        body: "The proton, reborn as a two-way transducer: projecting reality outward at the Larmor refresh rate — twenty quadrillion frames per second — while recording every event back into the vacuum. The bridge between counterspace and the physical world, in dynamic balance.",
        quote: { text: "It renders the present from the memory of the past, and writes the present into the memory of the future." },
      },
      {
        n: 12,
        title: "Quantum Entanglement as Connective Tissue",
        body: "Entangled particles correlate instantly across light-years — the death of strict locality, confirmed experimentally since Aspect's 1982 tests. In the PMFM, entanglement is not a curiosity; it is the wire of the network, the connective tissue through which morphic resonance reaches without signals.",
      },
      {
        n: 13,
        title: "The Vacuum Substrate: Nature's Library",
        body: "The vacuum is a plenum, not a void — boiling with zero-point fluctuations. The Bekenstein–Hawking bound sets its information capacity: 10⁹⁹ bits per cubic centimeter, rising to 10¹⁴⁴ in the book's holographic model. Nature's library, where everything that happens is written.",
        quote: { text: "Space is not a void. It is a crowded, active, energetic medium." },
      },
      {
        n: 14,
        title: "Quantum Biology in Action",
        body: "Photosynthetic excitons ride coherent waves through the FMO complex at room temperature (Fleming, 2007). Migrating birds detect a field hundreds of times weaker than a fridge magnet via entangled electron pairs in their eyes. Enzymes tunnel hydrogen through forbidden barriers. Life is a quantum workshop — and the bridge to the morphic network.",
      },
      {
        n: 15,
        title: "Decoherence: Leaving a Permanent Imprint",
        body: "Decoherence is how a quantum system spreads its superposition into the environment and settles into classical behavior. The book's reading: decoherence is the writing process — the mechanism by which the physical world leaves permanent imprints in the vacuum substrate, accumulating memory with every event.",
      },
      {
        n: 16,
        title: "The Crystallization Threshold Experiment",
        body: "The empirical heart: a preregistered, multi-laboratory protocol. Five labs on three continents, one never-before-crystallized compound, automated cooling ramps and optical nucleation sensors, eighteen months in three phases. The Memory Engine's prediction stands or falls on the data.",
        quote: { text: "Designed to determine once and for all whether the universe learns." },
      },
    ],
  },
  {
    label: "Part Four",
    kicker: "The Meaning — what it changes",
    color: "#a48ade",
    chapters: [
      {
        n: 17,
        title: "Designing a Conscious Future",
        body: "If learning is morphic, every mastery anywhere makes the skill easier everywhere — education can be synchronized with the field instead of fought against it. The chapter sketches consciousness-assisted technology (CAT) and technology-assisted consciousness (TAC): systems that cooperate with nature's habits instead of overriding them.",
      },
      {
        n: 18,
        title: "Wake Up",
        body: "You have an address in counterspace — a mathematical locus defined by every memory, every love, every choice. It is not stored in neurons or DNA; it is written into the vacuum substrate. And the coupling constant κ does not go to zero at death. You are not a passenger in the universe. You are a permanent entry in its library.",
        quote: { text: "You are worth writing down." },
      },
    ],
  },
];

export default function JourneyPage({
  navigate,
}: {
  navigate: (p: SitePage) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div>
      <PageHero
        kicker="The Journey"
        title="Eighteen chapters,"
        accent="one long following of the why"
        lead="From a recurring dream at 6:47 AM to a five-laboratory experiment — and finally to what all of it means for a life. Skip nothing: the sequence matters. Hover any chapter to feel the thread brighten."
      />

      <PageWrap className="pb-24">
        {PARTS.map((part, pi) => (
          <div key={part.label} className="relative">
            {/* part divider */}
            <Reveal className="relative z-10 pt-10 pb-8">
              <div className="flex items-center gap-5">
                <span
                  className="font-display italic text-2xl lg:text-3xl whitespace-nowrap"
                  style={{ color: part.color }}
                >
                  {part.label}
                </span>
                <span className="h-px flex-1" style={{ background: `linear-gradient(to right, ${part.color}88, transparent)` }} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {part.kicker}
              </p>
            </Reveal>

            <div className="relative">
              {/* thread */}
              <div className="timeline-thread absolute left-[27px] md:left-[39px] top-0 bottom-0 w-[2px] rounded-full" />

              <div className="space-y-6">
                {part.chapters.map((ch) => {
                  const lit = hover === ch.n;
                  return (
                    <Reveal key={ch.n}>
                      <article
                        onMouseEnter={() => setHover(ch.n)}
                        onMouseLeave={() => setHover(null)}
                        className={`relative grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-8 items-start transition-transform duration-500 ${
                          lit ? "md:-translate-x-1" : ""
                        }`}
                      >
                        {/* node */}
                        <div className="relative z-10 flex justify-center pt-1">
                          <div
                            className={`w-14 h-14 md:w-[72px] md:h-[72px] rounded-full border flex items-center justify-center font-display text-xl md:text-2xl transition-all duration-500 ${
                              lit ? "scale-110" : ""
                            }`}
                            style={{
                              borderColor: lit ? part.color : "rgba(236,231,219,0.18)",
                              background: lit
                                ? `radial-gradient(circle at 35% 30%, ${part.color}44, ${part.color}11 65%, #080312)`
                                : "#0d0718",
                              color: lit ? part.color : "#9a937f",
                              boxShadow: lit
                                ? `0 0 34px -6px ${part.color}99`
                                : "none",
                            }}
                          >
                            {String(ch.n).padStart(2, "0")}
                          </div>
                        </div>

                        {/* card */}
                        <div
                          className={`rounded-2xl border bg-panel p-6 lg:p-8 transition-all duration-500 ${
                            lit
                              ? "border-gold/40 bg-panel-2 shadow-[0_18px_60px_-24px_rgba(217,164,65,0.3)]"
                              : "border-hairline"
                          }`}
                        >
                          <h3 className="font-display text-2xl lg:text-[28px] text-ivory">
                            {ch.title}
                          </h3>
                          <p className="mt-3 text-[15px] text-ivory/65 leading-relaxed">
                            {ch.body}
                          </p>
                          {ch.quote ? (
                            <p className="book-quote mt-5 font-display italic text-lg text-gold-bright/90 leading-relaxed">
                              <Quote className="inline w-4 h-4 mr-2 opacity-60" />
                              {ch.quote.text}
                              {ch.quote.by ? (
                                <span className="ml-2 text-xs uppercase tracking-[0.2em] text-muted-foreground not-italic">
                                  — {ch.quote.by}
                                </span>
                              ) : null}
                            </p>
                          ) : null}
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* closing */}
        <Reveal className="mt-16">
          <div className="relative rounded-3xl border border-gold/25 p-10 lg:p-14 text-center bg-gradient-to-b from-[#120a20] to-[#0a0514] overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(55% 70% at 50% 10%, rgba(164,138,222,0.14), transparent 60%)",
              }}
            />
            <p className="relative font-display italic text-2xl lg:text-4xl text-ivory leading-snug text-balance">
              &ldquo;The only thing you can take with you
              <br />
              is the love you have for others.&rdquo;
            </p>
            <p className="relative mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              — Christine, the author&apos;s mother and lifelong mentor
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("science")}
                className="rounded-full border border-gold/45 bg-gold/10 px-7 py-3.5 text-sm font-semibold text-gold-bright hover:bg-gold/20 hover:border-gold/70 transition-all duration-300"
              >
                The experiment that could settle it
              </button>
              <button
                onClick={() => navigate("about")}
                className="rounded-full border border-ivory/25 px-7 py-3.5 text-sm font-semibold text-ivory/85 hover:border-gold/60 hover:text-gold-bright transition-all duration-300"
              >
                Meet the author
                <ArrowUpRight className="inline w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        </Reveal>
      </PageWrap>
    </div>
  );
}
