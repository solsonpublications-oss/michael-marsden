"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Atom,
  BookLock,
  BookMarked,
  BrainCircuit,
  ExternalLink,
  GraduationCap,
  Library,
  LibraryBig,
  MapPin,
  MoveRight,
  ShoppingBag,
  Sparkles,
  TabletSmartphone,
  Waves,
} from "lucide-react";
import MorphicFieldCanvas from "@/components/site/canvas/MorphicFieldCanvas";
import BookCover from "../BookCover";
import FieldCard from "../FieldCard";
import Reveal from "../Reveal";
import { SectionHead, PageWrap } from "../Section";
import type { SitePage } from "@/app/page";

/* ---------- book details ---------- */

const FACTS: [string, string][] = [
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
    name: "Kindle",
    price: "$9.99",
    note: "Read instantly · free with Kindle Unlimited",
  },
  {
    icon: BookMarked,
    name: "Paperback",
    price: "$16.80",
    note: "Most popular · ships worldwide",
  },
  {
    icon: BookLock,
    name: "Hardcover",
    price: "$24.99",
    note: "Collector's choice · gift-ready",
  },
];

/* ---------- author journey timeline ---------- */

const JOURNEY = [
  {
    icon: GraduationCap,
    when: "1968 – 1973",
    title: "The Berkeley years",
    body: "University of California, Berkeley — dual majors in Chemistry and Cytology. He completed the work, then refused the degrees on principle, choosing independent research outside institutional dogmas.",
  },
  {
    icon: Atom,
    when: "1973 → today",
    title: "Fifty-five years of one question",
    body: "What is this, really? The question became a life's work: the Polytropic Morphic Field Model — the first mathematical framework for morphic resonance, in which the vacuum itself is the universe's memory.",
  },
  {
    icon: LibraryBig,
    when: "The corpus",
    title: "Four books · seven papers · one monograph",
    body: "Including Unified Vacuum Geometry 2.0 — 21 chapters and appendices A–R, deriving the proton's mass, charge radius and the gravitational constant from pure geometry, with no free parameters.",
  },
  {
    icon: MapPin,
    when: "Now",
    title: "Chico, Northern California",
    body: "He lives and writes there still — and the entire academic corpus is openly accessible, because rigorous foundations should be examinable by anyone, anywhere.",
  },
];

/* ---------- the one extra section: gateway to the ideas ---------- */

const PILLARS = [
  {
    icon: Library,
    page: "ideas" as SitePage,
    kicker: "It stores",
    title: "Nature's library",
    body: "The vacuum is not empty. Its information capacity — 10¹⁴⁴ bits per cubic centimeter — dwarfs every library ever built. Everything that happens is written somewhere.",
    cta: "Explore the core ideas",
  },
  {
    icon: Waves,
    page: "equations" as SitePage,
    kicker: "It learns",
    title: "Habits, not just laws",
    body: "Repetition strengthens the field. The four equations of the PMFM describe how the universe's habits form, deepen, and finally harden into what we call the laws of nature.",
    cta: "Read the four equations",
  },
  {
    icon: BrainCircuit,
    page: "journey" as SitePage,
    kicker: "It remembers you",
    title: "An address in counterspace",
    body: "The coupling constant κ does not go to zero at death. You are a permanent entry in the universe's library — a pattern woven deeper by every moment of love.",
    cta: "Walk the 18-chapter journey",
  },
];

export default function HomePage({
  navigate,
}: {
  navigate: (p: SitePage) => void;
}) {
  return (
    <div className="relative">
      {/* ---------------- HERO ---------------- */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden starfield">
        <MorphicFieldCanvas />
        <div className="absolute inset-0 hero-glow pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-14 lg:gap-8 items-center">
            {/* -- the words -- */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.9 }}
                className="text-xs sm:text-sm uppercase tracking-[0.5em] text-gold/90"
              >
                Memory of the Universe · How Reality Works
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-display text-[42px] sm:text-6xl lg:text-[76px] leading-[1.02] text-ivory text-balance"
              >
                The universe is not a machine.
                <br />
                <span className="italic bg-gradient-to-r from-gold-bright via-gold to-violetfield bg-clip-text text-transparent">
                  It is a memory.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.9 }}
                className="mt-7 max-w-2xl mx-auto lg:mx-0 text-ivory/65 text-[15px] lg:text-lg leading-relaxed"
              >
                What if the universe remembers everything — and consciousness
                is far more fundamental than we ever imagined? This is the
                reader&apos;s companion to Michael K. Marsden&apos;s book: every
                idea, every theory, every equation, explained simply and shown
                living.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.9 }}
                className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={() => navigate("ideas")}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold to-gold-bright px-7 py-3.5 text-sm font-bold text-[#14100a] shadow-[0_10px_40px_-10px_rgba(217,164,65,0.7)] hover:shadow-[0_14px_54px_-10px_rgba(217,164,65,0.95)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Atom className="w-4.5 h-4.5 transition-transform duration-500 group-hover:rotate-180" />
                  Enter the ideas
                  <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("book")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group inline-flex items-center gap-2.5 rounded-full border border-violetfield/45 bg-violetfield/10 px-7 py-3.5 text-sm font-semibold text-violetfield hover:border-violetfield/80 hover:bg-violetfield/20 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Get the book
                  <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="mt-12 hidden lg:flex flex-col items-center lg:items-start gap-2 text-muted-foreground"
              >
                <span className="text-[11px] uppercase tracking-[0.35em]">
                  move your cursor — the field converges on you
                </span>
                <ArrowDown className="w-4 h-4 animate-bounce text-gold/70" />
              </motion.div>
            </div>

            {/* -- the book -- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="w-[240px] sm:w-[300px] lg:w-full max-w-[380px]">
                <BookCover priority />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- THE BOOK — cover + details + prices ---------------- */}
      <section
        id="book"
        className="relative py-20 lg:py-28 px-5 lg:px-8 border-y border-hairline bg-[#0b0616] starfield overflow-hidden"
      >
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <PageWrap className="relative">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-14 lg:gap-16 items-center">
            {/* the physical book */}
            <Reveal className="flex justify-center">
              <div className="w-[240px] sm:w-[280px] max-w-full">
                <BookCover sizes="(max-width: 1024px) 60vw, 300px" />
              </div>
            </Reveal>

            {/* the details */}
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.42em] text-gold/85">
                  The book · Kindle, Paperback &amp; Hardcover
                </p>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[44px] leading-tight text-ivory text-balance">
                  Memory of the Universe{" "}
                  <span className="italic text-gold-bright">— How Reality Works</span>
                </h2>
                <p className="mt-5 text-ivory/65 leading-relaxed text-[15px] lg:text-base max-w-2xl">
                  241 pages that take a question everyone has felt —{" "}
                  <em>what is this, really?</em> — and answer it with a claim
                  about physics: space itself remembers. Quantum theory, Bohm&apos;s
                  implicate order, Sheldrake&apos;s morphic resonance and the
                  Polytropic Morphic Field Model, made approachable without
                  requiring an advanced scientific background.
                </p>
              </Reveal>

              {/* fact sheet */}
              <Reveal delay={0.1}>
                <dl className="mt-8 grid sm:grid-cols-2 gap-x-8">
                  {FACTS.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-col gap-0.5 py-2.5 border-b border-hairline hover:border-gold/40 transition-colors duration-300"
                    >
                      <dt className="text-[10px] uppercase tracking-[0.25em] text-gold/75">
                        {k}
                      </dt>
                      <dd className="text-sm text-ivory/80 leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* formats & prices — USD, from amazon.com */}
              <Reveal delay={0.16}>
                <div className="mt-8 grid sm:grid-cols-3 gap-3.5">
                  {FORMATS.map((f) => (
                    <a
                      key={f.name}
                      href="https://www.amazon.com/dp/B0HPLS6WD9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl border border-hairline bg-panel p-4 hover:border-gold/50 hover:bg-panel-2 hover:-translate-y-1 hover:shadow-[0_14px_44px_-14px_rgba(217,164,65,0.4)] transition-all duration-400"
                    >
                      <div className="flex items-center justify-between">
                        <f.icon className="w-4.5 h-4.5 text-gold-bright" />
                        <MoveRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-bright transition-all duration-300" />
                      </div>
                      <p className="mt-3 stat-number font-display text-[26px] leading-none">
                        {f.price}
                      </p>
                      <p className="mt-1.5 text-xs font-semibold text-ivory/85">
                        {f.name}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                        {f.note}
                      </p>
                    </a>
                  ))}
                </div>
              </Reveal>

              {/* buy */}
              <Reveal delay={0.22}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://www.amazon.com/dp/B0HPLS6WD9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold to-gold-bright px-7 py-3.5 text-sm font-bold text-[#14100a] shadow-[0_10px_40px_-10px_rgba(217,164,65,0.7)] hover:shadow-[0_14px_54px_-10px_rgba(217,164,65,0.95)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <ShoppingBag className="w-4.5 h-4.5 transition-transform duration-500 group-hover:scale-110" />
                    Buy on Amazon — US pricing
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <button
                    onClick={() => navigate("about")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ivory/70 hover:text-gold-bright transition-colors duration-300"
                  >
                    More about the book &amp; author
                    <MoveRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </PageWrap>
      </section>

      {/* ---------------- AUTHOR JOURNEY ---------------- */}
      <section className="relative py-20 lg:py-28 px-5 lg:px-8">
        <PageWrap>
          <SectionHead
            kicker="The man behind the model"
            title="The author's"
            accent="journey"
            lead="Fifty-five years of independent research — one philosopher, one question, and the mathematical framework that grew out of it."
          />

          <div className="mt-14 grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-14 items-start">
            {/* portrait card */}
            <Reveal className="lg:sticky lg:top-28">
              <FieldCard className="p-5">
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-gold/35 group">
                  <Image
                    src="/images/author.jpg"
                    alt="Portrait of Michael K. Marsden, author of Memory of the Universe: How Reality Works"
                    width={900}
                    height={900}
                    sizes="(max-width: 1024px) 90vw, 340px"
                    className="block w-full h-auto group-hover:scale-[1.03] transition-transform duration-700"
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

            {/* timeline */}
            <div className="relative">
              {/* the connecting line */}
              <div
                aria-hidden
                className="absolute left-[22px] top-3 bottom-3 w-px hidden sm:block"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(217,164,65,0.55), rgba(164,138,222,0.35) 55%, rgba(94,196,189,0.3))",
                }}
              />
              <div className="space-y-5">
                {JOURNEY.map((j, i) => (
                  <Reveal key={j.title} delay={i * 0.1}>
                    <div className="group relative sm:pl-[68px]">
                      {/* node */}
                      <div className="hidden sm:flex absolute left-0 top-5 w-[46px] h-[46px] rounded-full border border-gold/40 bg-[#0b0616] items-center justify-center group-hover:border-gold-bright group-hover:shadow-[0_0_24px_-4px_rgba(217,164,65,0.8)] group-hover:scale-110 transition-all duration-400">
                        <j.icon className="w-5 h-5 text-gold-bright" />
                      </div>
                      <div className="rounded-2xl border border-hairline bg-panel p-6 lg:p-7 group-hover:border-gold/45 group-hover:bg-panel-2 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_50px_-18px_rgba(217,164,65,0.35)] transition-all duration-400">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                          {j.when}
                        </p>
                        <h3 className="mt-2 font-display text-xl lg:text-2xl text-ivory group-hover:text-gold-bright transition-colors duration-300">
                          {j.title}
                        </h3>
                        <p className="mt-3 text-sm text-ivory/60 leading-relaxed">
                          {j.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2}>
                <div className="sm:pl-[68px] mt-7">
                  <a
                    href="https://www.academia.edu/171610887/UVG_2_0_Complete_Monograph_Chapters_1_21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-5 py-2.5 text-xs font-semibold text-gold-bright hover:bg-gold/20 hover:border-gold/70 transition-all duration-300"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Read the UVG 2.0 monograph — open access
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </PageWrap>
      </section>

      {/* ---------------- THE IDEA IN THREE MOVEMENTS ---------------- */}
      <section className="relative py-16 lg:py-24 px-5 lg:px-8 bg-gradient-to-b from-transparent via-[#0d0718] to-transparent">
        <PageWrap>
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.42em] text-gold/85">
              The idea in three movements
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-ivory text-balance">
              One sentence, three consequences
            </h2>
            <p className="mt-5 text-ivory/60 leading-relaxed text-[15px] lg:text-base">
              If the fabric of space remembers what happens inside it, then the
              universe is not a pile of separate things running on blind
              cause-and-effect. It is a medium that stores, learns — and
              remembers you.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.12}>
                <FieldCard className="h-full p-7 lg:p-8" onClick={() => navigate(p.page)}>
                  <div className="w-11 h-11 rounded-xl border border-gold/35 bg-gold/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <p.icon className="w-5.5 h-5.5 text-gold-bright" />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80">
                    {p.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-2xl lg:text-[28px] text-ivory">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm text-ivory/60 leading-relaxed">
                    {p.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright">
                    {p.cta}
                    <MoveRight className="w-3.5 h-3.5" />
                  </span>
                </FieldCard>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </section>
    </div>
  );
}
