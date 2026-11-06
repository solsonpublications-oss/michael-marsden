"use client";

import { motion } from "framer-motion";
import { ArrowDown, Atom, BrainCircuit, Library, MoveRight, Sparkles, Waves } from "lucide-react";
import MorphicFieldCanvas from "@/components/site/canvas/MorphicFieldCanvas";
import BookCover from "../BookCover";
import FieldCard from "../FieldCard";
import Reveal from "../Reveal";
import { PageWrap } from "../Section";
import type { SitePage } from "@/app/page";

const QUOTES = [
  {
    text: "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries of its existence.",
    who: "Nikola Tesla",
  },
  {
    text: "I regard consciousness as fundamental. I regard matter as derivative from consciousness.",
    who: "Max Planck — father of quantum physics",
  },
];

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

const STATS = [
  { n: "10¹⁴⁴", label: "bits of information per cm³ of “empty” space" },
  { n: "2×10¹⁶", label: "frames per second — the proton's refresh rate" },
  { n: "55", label: "years of independent research behind the model" },
  { n: "4", label: "equations in the Polytropic Morphic Field Model" },
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
                  onClick={() => navigate("about")}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-violetfield/45 bg-violetfield/10 px-7 py-3.5 text-sm font-semibold text-violetfield hover:border-violetfield/80 hover:bg-violetfield/20 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Get the book
                  <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 flex lg:hidden flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-[11px] uppercase tracking-[0.35em]">
              move your cursor — the field converges on you
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-gold/70" />
          </motion.div>
        </div>
      </section>

      {/* ---------------- EPIGRAPHS ---------------- */}
      <section className="relative py-20 lg:py-28 px-5 lg:px-8">
        <PageWrap>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {QUOTES.map((q, i) => (
              <Reveal key={q.who} delay={i * 0.12}>
                <figure className="h-full rounded-2xl border border-hairline bg-panel p-7 lg:p-9 hover:border-gold/40 hover:bg-panel-2 hover:-translate-y-1 hover:shadow-[0_18px_60px_-20px_rgba(217,164,65,0.25)] transition-all duration-500">
                  <blockquote className="book-quote font-display text-xl lg:text-2xl leading-relaxed text-ivory/90 italic">
                    {q.text}
                  </blockquote>
                  <figcaption className="mt-5 text-xs uppercase tracking-[0.3em] text-gold/80">
                    — {q.who}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </section>

      {/* ---------------- THREE PILLARS ---------------- */}
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

      {/* ---------------- 6:47 AM STORY STRIP ---------------- */}
      <section className="relative py-20 lg:py-28 px-5 lg:px-8 overflow-hidden starfield">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <PageWrap className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.42em] text-gold/85">
                How the book opens
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight text-balance">
                6:47 AM. <span className="italic text-gold-bright">You wake up gasping.</span>
              </h2>
              <div className="mt-7 space-y-5 text-ivory/70 leading-relaxed text-[15px] lg:text-base">
                <p>
                  Mud. Smoke. Running through a courtyard a century ago — a
                  dream so vivid it leaves an ache at the base of your skull.
                  On your chest, a birthmark no doctor can name. A question
                  that has followed you all your life, patient as stone:
                </p>
                <p className="book-quote font-display italic text-xl lg:text-2xl text-gold-bright">
                  What happened to me before I was me?
                </p>
                <p>
                  The book&apos;s answer is not a comfort or a creed — it is a
                  physics claim. The field does not erase the information. It
                  stores it. And under the right conditions, stored information
                  can be accessed again. In another body. At another time.
                </p>
              </div>
              <button
                onClick={() => navigate("journey")}
                className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-gold/45 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold-bright hover:bg-gold/20 hover:border-gold/70 hover:shadow-[0_0_28px_-6px_rgba(217,164,65,0.7)] transition-all duration-300"
              >
                Walk the journey — all 18 chapters
                <MoveRight className="w-4 h-4" />
              </button>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative rounded-3xl border border-hairline overflow-hidden bg-[#080312]">
                <div className="p-8 lg:p-10">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-tealquantum/80">
                    The epigraph of a life
                  </p>
                  <p className="mt-4 font-display text-2xl lg:text-[32px] leading-snug text-ivory">
                    &ldquo;The soul does not die.
                    <br />
                    <span className="italic text-gold-bright">It changes address.&rdquo;</span>
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    — An Anonymous Natural Philosopher
                  </p>

                  <div className="ornament-rule my-8 text-xs">
                    <span>✦</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      ["the dream", "mud · smoke · light"],
                      ["the birthmark", "a quarter-sized echo"],
                      ["the ache", "at the base of the skull"],
                    ].map(([a, b]) => (
                      <div
                        key={a}
                        className="rounded-xl border border-hairline bg-panel p-3.5 hover:border-gold/40 hover:bg-panel-2 transition-all duration-400"
                      >
                        <p className="font-display text-gold-bright text-sm lg:text-base">{a}</p>
                        <p className="text-[10px] lg:text-[11px] text-muted-foreground mt-1.5 leading-snug">
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="h-1.5 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(217,164,65,0.7), rgba(94,196,189,0.5), transparent)",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </PageWrap>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="py-16 lg:py-20 px-5 lg:px-8 border-y border-hairline bg-[#0b0616]">
        <PageWrap>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <p className="stat-number font-display text-4xl lg:text-[52px] leading-none">
                  {s.n}
                </p>
                <p className="mt-3 text-xs lg:text-[13px] text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </PageWrap>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="py-20 lg:py-28 px-5 lg:px-8">
        <PageWrap>
          <Reveal>
            <div className="relative rounded-3xl border border-gold/25 overflow-hidden p-10 lg:p-16 text-center bg-gradient-to-b from-[#120a20] to-[#0a0514]">
              <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 80% at 50% 0%, rgba(217,164,65,0.14), transparent 60%)",
                }}
              />
              <p className="relative text-xs uppercase tracking-[0.42em] text-gold/85">
                Ready to follow the why all the way down?
              </p>
              <h2 className="relative mt-5 font-display text-3xl sm:text-4xl lg:text-[54px] text-ivory leading-tight text-balance">
                The field remembers.{" "}
                <span className="italic text-gold-bright">So will you.</span>
              </h2>
              <p className="relative mt-5 max-w-xl mx-auto text-ivory/60 text-[15px] leading-relaxed">
                Begin where the book begins — with the ideas that quietly
                dismantle the clockwork universe. No scientific background
                needed. Only the willingness to hold a new idea long enough to
                feel its weight.
              </p>
              <div className="relative mt-9 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("ideas")}
                  className="rounded-full bg-gradient-to-r from-gold to-gold-bright px-8 py-3.5 text-sm font-bold text-[#14100a] shadow-[0_10px_40px_-10px_rgba(217,164,65,0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_54px_-10px_rgba(217,164,65,0.95)] transition-all duration-300"
                >
                  Start with the core ideas
                </button>
                <button
                  onClick={() => navigate("about")}
                  className="rounded-full border border-ivory/25 px-8 py-3.5 text-sm font-semibold text-ivory/85 hover:border-gold/60 hover:text-gold-bright hover:bg-gold/5 transition-all duration-300"
                >
                  About the book &amp; its author
                </button>
              </div>
            </div>
          </Reveal>
        </PageWrap>
      </section>
    </div>
  );
}
