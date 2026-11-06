"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import MemoryTrail from "@/components/site/MemoryTrail";
import HomePage from "@/components/site/pages/HomePage";
import IdeasPage from "@/components/site/pages/IdeasPage";
import EquationsPage from "@/components/site/pages/EquationsPage";
import JourneyPage from "@/components/site/pages/JourneyPage";
import SciencePage from "@/components/site/pages/SciencePage";
import AboutPage from "@/components/site/pages/AboutPage";

export type SitePage =
  | "home"
  | "ideas"
  | "equations"
  | "journey"
  | "science"
  | "about";

const VALID: SitePage[] = [
  "home",
  "ideas",
  "equations",
  "journey",
  "science",
  "about",
];

function readHash(): SitePage {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace("#", "").trim();
  return (VALID as string[]).includes(raw) ? (raw as SitePage) : "home";
}

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export default function Home() {
  const page = useSyncExternalStore(subscribeHash, readHash, () => "home" as SitePage);

  const navigate = useCallback(
    (target: SitePage) => {
      if (target === page) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      window.location.hash = target;
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    },
    [page],
  );

  const pages = useMemo<Record<SitePage, React.ReactNode>>(
    () => ({
      home: <HomePage navigate={navigate} />,
      ideas: <IdeasPage navigate={navigate} />,
      equations: <EquationsPage navigate={navigate} />,
      journey: <JourneyPage navigate={navigate} />,
      science: <SciencePage navigate={navigate} />,
      about: <AboutPage navigate={navigate} />,
    }),
    [navigate],
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-clip">
      <MemoryTrail />
      <Navbar page={page} navigate={navigate} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {pages[page]}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
