"use client";

import Image from "next/image";
import { ExternalLink, Gamepad2, GraduationCap, Heart, LibraryBig, Sparkles, ShoppingBag, TabletSmartphone, BookMarked, BookLock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero, PageWrap, SectionHead } from "../Section";
import Reveal from "../Reveal";
import FieldCard from "../FieldCard";
import type { SitePage } from "@/app/page";

const GLOSSARY: [string, string][] = [
  ["Active Information", "David Bohm's concept that fields can carry information which actively guides physical processes — without mechanical force or energy transfer. In the morphic model, vacuum polarization patterns act as active information."],
  ["Absolute Plane / Plane at Infinity", "In projective geometry and counterspace, the surrounding boundary of space — the dual complement of the Euclidean point, and the global boundary context from which counterspace geometries are formed."],
  ["Bekenstein–Hawking Bound", "The fundamental limit on how much information a region of space can contain: proportional to the surface area of its boundary in Planck areas, not its volume. The mathematical anchor of the holographic premise."],
  ["Centrifugal Field", "A field radiating outward from a central source, weakening with distance — electric fields, gravity, light."],
  ["Centripetal Field", "A field converging inward from a surrounding boundary toward a center, intensifying as it approaches its focus — the geometry of morphic fields in counterspace."],
  ["Copenhagen Interpretation", "The orthodox reading of quantum mechanics: systems exist as probability superpositions until measured, and asking what a particle was doing before measurement is forbidden."],
  ["Counterspace", "The projective-geometric dual of Euclidean space. Planes are primary; points arise where planes intersect. The natural habitat of centripetal, boundary-determined fields."],
  ["Coupling Constant (κ)", "The parameter measuring the strength of resonance between a physical system and its morphic template — the mathematics of habit itself."],
  ["Decoherence", "The process by which a quantum system's phase coherence spreads into its environment until it behaves classically. In the book: the writing process by which the world imprints the vacuum."],
  ["Dirac Monopole Condition", "Paul Dirac's 1931 result that a single magnetic monopole would explain the quantization of electric charge across the universe."],
  ["Explicate Order", "Bohm's term for the manifest, unfolded layer of reality — where objects appear localized and separate in space and time."],
  ["Implicate Order", "Bohm's term for the enfolded, undivided substrate — where everything is interconnected and information is distributed holistically."],
  ["Larmor Frequency", "The rate at which a spinning charged particle precesses in a magnetic field, set by its charge-to-mass ratio and field strength. The universe's clock tick."],
  ["Memory Engine", "The third PMFM equation: dκ/dt = ακ − βκ² + γ·Ξentangle — how morphic coupling grows through habit reinforcement and quantum entanglement."],
  ["Morphic Field", "An organizing, non-material region of influence that shapes the form and behavior of self-organizing systems at every scale of nature."],
  ["Morphic Resonance", "The process by which templates of past forms and behaviors influence present similar systems — non-local, similarity-based resonance."],
  ["Polytropic Index (n)", "The parameter encoding a morphic field's 'personality': from diffuse (n = 0) to sharp and rigid (n = 5)."],
  ["Proton Projector–Accumulator", "The subatomic mechanism of the PMFM: the proton as transducer, projecting physical properties outward and recording environmental history inward at the Larmor frequency."],
  ["Zero-Point Energy", "The residual, non-removable energy of a quantum system — including the vacuum itself — even at absolute zero, arising from the uncertainty principle."],
];

const FACTS: [string, string][] = [
  ["Title", "Memory of the Universe: How Reality Works"],
  ["Author", "Michael K. Marsden"],
  ["Publisher", "Wadsworth Publishing"],
  ["Publication date", "28 October 2026"],
  ["Print length", "241 pages · English"],
  ["Category", "Science & Maths › Physics › Quantum Theory"],
  ["ASIN", "B0HPLS6WD9"],
];

const FORMATS = [
  {
    icon: TabletSmartphone,
    name: "Kindle Edition",
    price: "$9.99",
    badge: "Read instantly",
    note: "Or read free with Kindle Unlimited — unlimited reading, millions of titles.",
    perks: ["Delivered in seconds · 392 KB", "Word Wise & Page Flip enabled", "Screen reader supported"],
  },
  {
    icon: BookMarked,
    name: "Paperback",
    price: "$16.80",
    badge: "Most popular",
    note: "The classic reading experience — 241 pages to annotate, lend and keep.",
    perks: ["241 printed pages", "Other new copies from $16.80", "Ships worldwide"],
  },
  {
    icon: BookLock,
    name: "Hardcover",
    price: "$24.99",
    badge: "Collector's choice",
    note: "The durable edition for the shelf you return to — and hand down.",
    perks: ["Library-quality binding", "The definitive keepsake", "Gift-ready"],
  },
];

const INITIATIVES = [
  {
    icon: LibraryBig,
    t: "Unified Vacuum Geometry Institute (in formation)",
    d: "Being established to advance empirical research, multi-laboratory testing protocols like the Crystallization Threshold Experiment, and educational resources for the physics of consciousness and counterspace.",
  },
  {
    icon: Sparkles,
    t: "Illustrated children's book — coming soon",
    d: "Manuscript complete, now in production: introducing younger minds to the living architecture of the cosmos, universal memory, and the wonder of interconnected awareness.",
  },
  {
    icon: Gamepad2,
    t: "A non-fiction video game — 40 levels of morphic repair",
    d: "Across 40 progressive levels, player actions and conscious intentions actively repair damage done to our morphic field — a technology-assisted conscious system magnifying the player's intent.",
  },
];

export default function AboutPage({
  navigate,
}: {
  navigate: (p: SitePage) => void;
}) {
  return (
    <div>
      <PageHero
        kicker="The Book · How Reality Works"
        title="One philosopher, one question,"
        accent="fifty-five years"
        lead="What is this, really? What is matter? What is space? What is the strange fact that you and I are here, aware of our own existence? The book — and the life behind it — in one place."
      />

      {/* author */}
      <section className="py-14 lg:py-20 px-5 lg:px-8">
        <PageWrap>
          <div className="grid lg:grid-cols-[0.72fr_1.02fr_0.9fr] gap-8 items-start">
            {/* portrait */}
            <Reveal>
              <FieldCard className="p-5">
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-gold/35">
                  <Image
                    src="/images/author.jpg"
                    alt="Portrait of Michael K. Marsden, author of Memory of the Universe: How Reality Works"
                    width={900}
                    height={900}
                    sizes="(max-width: 1024px) 90vw, 320px"
                    className="block w-full h-auto"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,5,20,0.88) 0%, rgba(10,5,20,0.25) 34%, transparent 55%)",
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="font-display text-xl text-ivory leading-tight">
                      Michael K. Marsden
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gold-bright mt-1">
                      Author · Natural Philosopher
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between px-1">
                  <p className="text-[11px] text-muted-foreground italic">
                    “The universe has a memory.”
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-tealquantum">
                    <span className="w-1.5 h-1.5 rounded-full bg-tealquantum heartbeat" />
                    55 yrs of research
                  </span>
                </div>
              </FieldCard>
            </Reveal>

            {/* bio */}
            <Reveal delay={0.1}>
              <SectionHead
                align="left"
                kicker="About the author"
                title="Michael K."
                accent="Marsden"
              />
              <div className="mt-6 space-y-5 text-ivory/65 leading-relaxed text-[15px]">
                <p>
                  An independent natural philosopher and theoretical researcher.
                  From 1968 to 1973 he attended the University of California,
                  Berkeley, completing dual majors in Chemistry and Cytology —
                  and left <em>refusing the degrees on principle</em>, choosing
                  independent research outside institutional dogmas.
                </p>
                <p>
                  He then spent fifty-five years developing the Polytropic
                  Morphic Field Model: the first mathematical framework for
                  morphic resonance. His published work spans formal papers
                  submitted to leading theoretical physics journals, four
                  books, seven peer-reviewed and preprint papers, and the
                  complete monograph <em>Unified Vacuum Geometry 2.0</em> — 21
                  chapters and appendices A–R, deriving fundamental constants
                  like the proton's mass, charge radius and the gravitational
                  constant from pure geometry, without free parameters.
                </p>
                <p>
                  He lives and writes in Chico, Northern California. The entire
                  academic corpus is openly accessible — because the author
                  believes the rigorous foundations of this narrative should be
                  examinable by anyone, anywhere.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.academia.edu/171610887/UVG_2_0_Complete_Monograph_Chapters_1_21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-5 py-2.5 text-xs font-semibold text-gold-bright hover:bg-gold/20 hover:border-gold/70 transition-all duration-300"
                >
                  <GraduationCap className="w-4 h-4" />
                  UVG 2.0 monograph
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://204.academia.edu/MichaelMarsden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-tealquantum/45 bg-tealquantum/10 px-5 py-2.5 text-xs font-semibold text-tealquantum hover:bg-tealquantum/20 transition-all duration-300"
                >
                  Academia.edu — all papers
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://UnifiedVacuumGeometry.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-violetfield/45 bg-violetfield/10 px-5 py-2.5 text-xs font-semibold text-violetfield hover:bg-violetfield/20 transition-all duration-300"
                >
                  UnifiedVacuumGeometry.com
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>

            {/* book at a glance — with the actual cover */}
            <Reveal delay={0.18}>
              <FieldCard className="p-6 lg:p-7">
                <div className="relative mx-auto w-[150px] lg:w-[170px] group">
                  <div
                    aria-hidden
                    className="absolute -inset-5 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(217,164,65,0.28), rgba(164,138,222,0.16) 45%, transparent 70%)",
                      filter: "blur(4px)",
                    }}
                  />
                  <Image
                    src="/images/book-cover.jpg"
                    alt="Cover of Memory of the Universe: How Reality Works"
                    width={170}
                    height={272}
                    sizes="170px"
                    className="relative block w-full h-auto rounded-md ring-1 ring-gold/40 shadow-[0_16px_50px_-14px_rgba(164,138,222,0.5)] group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_64px_-14px_rgba(217,164,65,0.45)] transition-all duration-500"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ivory text-center">
                  The book, at a glance
                </h3>
                <dl className="mt-5 space-y-3.5">
                  {FACTS.map(([k, v]) => (
                    <div key={k} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-3 border-b border-hairline last:border-0 last:pb-0">
                      <dt className="text-[11px] uppercase tracking-[0.25em] text-gold/80 shrink-0 sm:w-32">
                        {k}
                      </dt>
                      <dd className="text-sm text-ivory/75 leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </FieldCard>
            </Reveal>
          </div>
        </PageWrap>
      </section>

      {/* get the book — formats & prices */}
      <section className="py-14 lg:py-20 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline starfield relative overflow-hidden">
        <PageWrap className="relative">
          <Reveal>
            <SectionHead
              kicker="Own the book"
              title="Get “Memory of the Universe”"
              accent="in your hands"
              lead="Kindle, Paperback or Hardcover — every format carries the same 241 pages of ambitious theoretical ideas, made approachable without requiring an advanced scientific background."
            />
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {FORMATS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <FieldCard className="h-full p-7 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl border border-gold/35 bg-gold/10 flex items-center justify-center">
                      <f.icon className="w-5.5 h-5.5 text-gold-bright" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full border border-violetfield/40 bg-violetfield/10 text-violetfield">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-ivory">{f.name}</h3>
                  <p className="mt-1.5 stat-number font-display text-[30px] leading-none">{f.price}</p>
                  <p className="mt-4 text-sm text-ivory/60 leading-relaxed">{f.note}</p>
                  <ul className="mt-5 space-y-2.5 text-[13px] text-ivory/60 flex-1">
                    {f.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Sparkles className="w-3.5 h-3.5 mt-0.5 text-gold/70 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </FieldCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="https://www.amazon.com/dp/B0HPLS6WD9"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold to-gold-bright px-8 py-4 text-sm font-bold text-[#14100a] shadow-[0_10px_44px_-10px_rgba(217,164,65,0.75)] hover:shadow-[0_16px_60px_-10px_rgba(217,164,65,0.95)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <ShoppingBag className="w-4.5 h-4.5 transition-transform duration-500 group-hover:scale-110" />
                Buy on Amazon
                <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-xs text-muted-foreground text-center sm:text-left leading-relaxed max-w-xs">
                Kindle edition sold by Amazon.com Services LLC · Amazon.com ›
                Science &amp; Maths › Physics › Quantum Theory · US pricing
              </p>
            </div>
          </Reveal>
        </PageWrap>
      </section>

      {/* dedication */}
      <section className="py-14 lg:py-20 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline starfield relative overflow-hidden">
        <PageWrap className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.42em] text-gold/85">The dedication</p>
              <p className="mt-6 font-display text-2xl sm:text-3xl lg:text-4xl text-ivory leading-snug italic text-balance">
                &ldquo;For everyone who sensed that there was more —
                <br className="hidden sm:block" /> and refused to stop looking.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="ornament-rule my-10 text-xs">
                <span>✦</span>
              </div>
              <Heart className="w-6 h-6 mx-auto text-gold-bright heartbeat" />
              <p className="mt-5 font-display italic text-lg lg:text-xl text-ivory/80 leading-relaxed">
                &ldquo;The only thing you can take with you is the love you have
                for others.&rdquo;
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                — Christine, the author&apos;s mother &amp; lifelong mentor
              </p>
            </Reveal>
          </div>
        </PageWrap>
      </section>

      {/* initiatives */}
      <section className="py-14 lg:py-20 px-5 lg:px-8">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="Announcements"
              title="What this work is"
              accent="becoming"
              lead="The book is one node in a growing body of work — research, education, and new forms of reaching people."
            />
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {INITIATIVES.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.1}>
                <FieldCard className="h-full p-7">
                  <it.icon className="w-6 h-6 text-gold-bright" />
                  <h3 className="mt-4 font-display text-xl text-ivory leading-snug">{it.t}</h3>
                  <p className="mt-3 text-sm text-ivory/60 leading-relaxed">{it.d}</p>
                </FieldCard>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </section>

      {/* glossary */}
      <section className="py-14 lg:py-20 px-5 lg:px-8 bg-[#0b0616] border-y border-hairline">
        <PageWrap>
          <Reveal>
            <SectionHead
              kicker="From the back of the book"
              title="Glossary of"
              accent="key terms"
              lead="Every term, translated — the same plain-English spirit the book brings to its equation boxes."
            />
          </Reveal>
          <Reveal delay={0.12} className="mt-10 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="rounded-2xl border border-hairline bg-panel overflow-hidden">
              {GLOSSARY.map(([term, def], i) => (
                <AccordionItem
                  key={term}
                  value={`g-${i}`}
                  className="border-b border-hairline last:border-0 data-[state=open]:bg-panel-2 transition-colors"
                >
                  <AccordionTrigger className="px-5 lg:px-6 py-4 text-left hover:no-underline group">
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-gold/70 group-hover:text-gold-bright transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg text-ivory group-hover:text-gold-bright transition-colors">
                        {term}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 lg:px-6 pb-5 pl-[52px] lg:pl-[58px]">
                    <p className="text-sm text-ivory/60 leading-relaxed">{def}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </PageWrap>
      </section>

      {/* final */}
      <section className="py-16 lg:py-24 px-5 lg:px-8">
        <PageWrap>
          <Reveal>
            <div className="relative rounded-3xl border border-gold/25 p-10 lg:p-16 text-center bg-gradient-to-b from-[#120a20] to-[#0a0514] overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(55% 75% at 50% 0%, rgba(217,164,65,0.13), transparent 62%)",
                }}
              />
              <p className="relative text-xs uppercase tracking-[0.42em] text-gold/85">
                The last words of the book
              </p>
              <p className="relative mt-6 font-display italic text-2xl sm:text-3xl lg:text-[42px] text-ivory leading-snug text-balance">
                &ldquo;The universe has a memory.
                <br />
                <span className="text-gold-bright">And this book is going to show you</span>
                <br />
                exactly how that works.&rdquo;
              </p>
              <p className="relative mt-6 text-ivory/55 text-sm max-w-xl mx-auto leading-relaxed">
                Turn the page. This is where it begins.
              </p>
              <div className="relative mt-9 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("ideas")}
                  className="rounded-full bg-gradient-to-r from-gold to-gold-bright px-8 py-3.5 text-sm font-bold text-[#14100a] shadow-[0_10px_40px_-10px_rgba(217,164,65,0.7)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Begin with the core ideas
                </button>
                <button
                  onClick={() => navigate("home")}
                  className="rounded-full border border-ivory/25 px-8 py-3.5 text-sm font-semibold text-ivory/85 hover:border-gold/60 hover:text-gold-bright transition-all duration-300"
                >
                  Back to the beginning
                </button>
              </div>
            </div>
          </Reveal>
        </PageWrap>
      </section>
    </div>
  );
}
