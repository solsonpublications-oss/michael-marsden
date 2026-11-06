"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * The physical book, rendered as a floating artefact.
 * A cursor-driven 3D tilt, a golden corona and concentric rings —
 * the geometry of the cover itself, extended into the page.
 */
export default function BookCover({
  priority = false,
  sizes = "(max-width: 1024px) 60vw, 340px",
  width = 340,
}: {
  priority?: boolean;
  sizes?: string;
  width?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), {
    stiffness: 140,
    damping: 18,
  });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }, [px, py]);

  const onLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  const height = Math.round((width * 1000) / 625);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: 1100 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* corona — the light of the cover bleeding outward */}
      <div
        aria-hidden
        className="absolute w-[135%] max-w-none aspect-square rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(217,164,65,0.30) 0%, rgba(164,138,222,0.22) 34%, rgba(120,80,190,0.10) 55%, transparent 72%)",
          filter: "blur(6px)",
        }}
      />

      {/* concentric rings — echo of the cover's halo geometry */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[
          { s: 1.28, o: 0.5 },
          { s: 1.52, o: 0.32 },
          { s: 1.78, o: 0.18 },
          { s: 2.05, o: 0.09 },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gold/60 spin-slower"
            style={{
              width: `${r.s * 100}%`,
              aspectRatio: "1 / 1",
              opacity: r.o,
              borderStyle: i % 2 === 0 ? "solid" : "dashed",
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          />
        ))}
      </div>

      {/* drifting memory orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <span className="absolute -top-3 left-[12%] w-1.5 h-1.5 rounded-full bg-gold-bright shadow-[0_0_10px_2px_rgba(238,201,125,0.8)] float-drift" />
        <span
          className="absolute top-[24%] -right-4 w-2 h-2 rounded-full bg-violetfield shadow-[0_0_12px_3px_rgba(164,138,222,0.8)] float-drift"
          style={{ animationDelay: "-2.4s" }}
        />
        <span
          className="absolute bottom-[16%] -left-5 w-1 h-1 rounded-full bg-tealquantum shadow-[0_0_10px_2px_rgba(94,196,189,0.8)] float-drift"
          style={{ animationDelay: "-4.4s" }}
        />
      </div>

      {/* the book itself */}
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* spine edge for physical depth */}
        <div
          aria-hidden
          className="absolute -left-[10px] top-[6px] bottom-[6px] w-[10px] rounded-l-md"
          style={{
            background: "linear-gradient(to left, #3a2470, #1c1040 70%, #120a28)",
            transform: "rotateY(-72deg) translateX(-4px)",
            transformOrigin: "right center",
          }}
        />
        <div className="relative rounded-lg overflow-hidden ring-1 ring-gold/45 shadow-[0_30px_90px_-20px_rgba(164,138,222,0.45),0_18px_60px_-18px_rgba(217,164,65,0.5)]">
          <Image
            src="/images/book-cover.jpg"
            alt="Book cover — Memory of the Universe: How Reality Works by Michael K. Marsden"
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            className="block w-full h-auto"
          />
          {/* glass shine sweeping on hover */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -inset-y-8 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[120%] transition-all duration-700 ease-out"
            />
          </div>
        </div>
        {/* reflection beneath */}
        <div
          aria-hidden
          className="mx-auto mt-3 h-6 w-[82%] rounded-[50%] blur-md"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(164,138,222,0.35), transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
