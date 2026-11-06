"use client";

import Image from "next/image";
import { Heart, Atom, Library } from "lucide-react";
import type { SitePage } from "@/app/page";

export default function Footer({
  navigate,
}: {
  navigate: (p: SitePage) => void;
}) {
  return (
    <footer className="mt-auto border-t border-hairline bg-[#080311]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 group">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(217,164,65,0.35), rgba(164,138,222,0.18) 50%, transparent 72%)",
                    filter: "blur(3px)",
                  }}
                />
                <Image
                  src="/images/book-cover.jpg"
                  alt="Memory of the Universe — book cover"
                  width={56}
                  height={90}
                  sizes="56px"
                  className="relative block w-14 h-auto rounded ring-1 ring-gold/50 group-hover:-translate-y-1 group-hover:shadow-[0_10px_28px_-8px_rgba(217,164,65,0.5)] transition-all duration-400"
                />
              </div>
              <div>
                <p className="font-display text-xl text-ivory">
                  Memory <span className="italic text-gold">of the</span> Universe
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  How Reality Works — by Michael K. Marsden
                </p>
              </div>
            </div>
            <p className="book-quote mt-6 text-sm text-muted-foreground italic font-display text-[15px] leading-relaxed">
              For everyone who sensed that there was more — and refused to stop
              looking.
            </p>
          </div>

          <div className="md:justify-self-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">
              Explore the field
            </p>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  ["ideas", "Core Ideas"],
                  ["equations", "The Four Equations"],
                  ["journey", "The Journey — 18 Chapters"],
                  ["science", "The Science & The Experiment"],
                  ["about", "The Book & The Author"],
                ] as [SitePage, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => navigate(id)}
                    className="text-ivory/65 hover:text-gold-bright transition-colors duration-300"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">
              The wider work
            </p>
            <ul className="space-y-2.5 text-sm text-ivory/65">
              <li className="flex items-start gap-2">
                <Library className="w-4 h-4 mt-0.5 text-tealquantum shrink-0" />
                <span>
                  Research portal:{" "}
                  <a
                    href="https://UnifiedVacuumGeometry.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gold/40 underline-offset-4 hover:text-gold-bright transition-colors"
                  >
                    UnifiedVacuumGeometry.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Atom className="w-4 h-4 mt-0.5 text-violetfield shrink-0" />
                <span>
                  Open papers on{" "}
                  <a
                    href="https://204.academia.edu/MichaelMarsden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gold/40 underline-offset-4 hover:text-gold-bright transition-colors"
                  >
                    Academia.edu
                  </a>{" "}
                  — 4 books, 7 papers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>
                  &ldquo;The only thing you can take with you is the love you
                  have for others.&rdquo;
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ornament-rule my-8 text-xs">
          <span className="font-display italic tracking-widest">
            the field remembers
          </span>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          An independent reader&apos;s companion to the book &ldquo;Memory of the
          Universe: How Reality Works&rdquo; by Michael K. Marsden (Wadsworth
          Publishing · 241 pages · 28 October 2026). Ideas belong to their
          author; wonder belongs to everyone.
        </p>
      </div>
    </footer>
  );
}
