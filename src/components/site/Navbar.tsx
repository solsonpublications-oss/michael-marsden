"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen } from "lucide-react";
import type { SitePage } from "@/app/page";

const LINKS: { id: SitePage; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "ideas", label: "Core Ideas" },
  { id: "equations", label: "The Four Equations" },
  { id: "journey", label: "The Journey" },
  { id: "science", label: "The Science" },
  { id: "about", label: "The Book" },
];

/** Spiral drain glyph — the centripetal signature of counterspace. */
export function FieldGlyph({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fg-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eec97d" />
          <stop offset="100%" stopColor="#5ec4bd" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#fg-g)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M24 24 m0 -2 a2 2 0 1 1 -2 2 a4.5 4.5 0 1 1 4.5 -4.5 a9 9 0 1 1 -9 -9 a14.5 14.5 0 1 1 14.5 14.5 a20 20 0 1 1 -20 20" opacity="0.95" />
      </g>
      <circle cx="24" cy="24" r="2.2" fill="#d9a441" className="heartbeat" />
    </svg>
  );
}

export default function Navbar({
  page,
  navigate,
}: {
  page: SitePage;
  navigate: (p: SitePage) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    // close the mobile menu whenever the page changes (hash is the router)
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0514]/85 backdrop-blur-xl border-b border-hairline shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="max-w-7xl mx-auto flex items-center justify-between px-5 lg:px-8 h-16 lg:h-[72px]"
      >
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 group"
          aria-label="Go to home"
        >
          <span className="transition-transform duration-700 group-hover:rotate-180">
            <FieldGlyph className="w-9 h-9" />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-lg lg:text-xl tracking-wide text-ivory">
              Memory <span className="italic text-gold">of the</span> Universe
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mt-1 hidden sm:block">
              How Reality Works — a field guide
            </span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              data-active={page === l.id}
              className={`resonant-link text-[13px] tracking-wide uppercase transition-colors duration-300 ${
                page === l.id
                  ? "text-gold-bright"
                  : "text-ivory/70 hover:text-ivory"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => navigate("about")}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-4 py-2 text-[13px] font-semibold text-gold-bright hover:bg-gold/20 hover:border-gold/70 transition-all duration-300 hover:shadow-[0_0_24px_-6px_rgba(217,164,65,0.6)]"
          >
            <BookOpen className="w-4 h-4" />
            Read the idea
          </button>
        </div>

        <button
          className="lg:hidden text-ivory/90 hover:text-gold p-2 rounded-lg border border-hairline"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#0a0514]/95 backdrop-blur-xl border-b border-hairline"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => navigate(l.id)}
                  className={`text-left px-4 py-3 rounded-xl transition-colors ${
                    page === l.id
                      ? "bg-gold/10 text-gold-bright border border-gold/30"
                      : "text-ivory/80 hover:bg-panel-2 hover:text-ivory"
                  }`}
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
