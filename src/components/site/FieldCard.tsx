"use client";

import { useCallback, type ReactNode } from "react";

/**
 * A card whose border "resonates" — a golden field-glow follows the cursor,
 * as if the card were a small organism drawing the field inward.
 */
export default function FieldCard({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div className={`field-card ${onClick ? "cursor-pointer" : ""} ${className}`} onMouseMove={onMove} onClick={onClick}>
      {children}
    </div>
  );
}
