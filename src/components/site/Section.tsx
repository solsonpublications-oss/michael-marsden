"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Consistent page header used at the top of every inner page. */
export function PageHero({
  kicker,
  title,
  accent,
  lead,
}: {
  kicker: string;
  title: string;
  accent: string;
  lead: string;
}) {
  return (
    <section className="relative pt-36 pb-14 lg:pt-44 lg:pb-20 px-5 lg:px-8 starfield hero-glow overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-gold/85">
            {kicker}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] text-ivory text-balance">
            {title}{" "}
            <span className="italic bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text text-transparent">
              {accent}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-base lg:text-lg text-ivory/65 max-w-2xl mx-auto leading-relaxed">
            {lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Section heading with kicker + ornament. */
export function SectionHead({
  kicker,
  title,
  accent,
  lead,
  align = "center",
}: {
  kicker: string;
  title: string;
  accent?: string;
  lead?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : "text-left"}>
      <p className="text-xs uppercase tracking-[0.42em] text-gold/85">{kicker}</p>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[44px] leading-tight text-ivory text-balance">
        {title}{" "}
        {accent ? (
          <span className="italic text-gold-bright">{accent}</span>
        ) : null}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-ivory/60 leading-relaxed max-w-2xl text-[15px] lg:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
      <div
        className={`ornament-rule mt-7 text-[10px] tracking-[0.3em] uppercase ${
          centered ? "max-w-md" : "max-w-xs"
        }`}
      >
        <span>✦</span>
      </div>
    </Reveal>
  );
}

/** Page container. */
export function PageWrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-7xl mx-auto px-5 lg:px-8 ${className}`}>{children}</div>
  );
}
