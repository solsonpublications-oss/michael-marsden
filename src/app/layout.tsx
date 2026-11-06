import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodySans = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const monoCode = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Memory of the Universe: How Reality Works — by Michael K. Marsden",
  description:
    "The universe is not a machine. It is a memory. The reader's companion to Michael K. Marsden's book 'Memory of the Universe: How Reality Works' — morphic resonance, counterspace, the four equations of the Polytropic Morphic Field Model, quantum physics and consciousness, explained simply, with living visuals.",
  keywords: [
    "Memory of the Universe",
    "How Reality Works",
    "Michael K. Marsden",
    "morphic resonance",
    "morphic fields",
    "Polytropic Morphic Field Model",
    "PMFM",
    "counterspace",
    "quantum theory",
    "Rupert Sheldrake",
    "David Bohm",
    "consciousness",
    "Wadsworth Publishing",
  ],
  authors: [{ name: "Michael K. Marsden" }],
  openGraph: {
    title: "Memory of the Universe: How Reality Works",
    description:
      "The universe is not a machine. It is a memory — and it is learning from everything that happens inside it. A field guide to Michael K. Marsden's book.",
    type: "website",
    images: [{ url: "/images/book-cover.jpg", width: 625, height: 1000 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displaySerif.variable} ${bodySans.variable} ${monoCode.variable} antialiased bg-background text-foreground grain`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
