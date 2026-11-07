import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground grain">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
