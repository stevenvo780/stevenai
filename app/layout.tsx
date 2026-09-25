import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBarServer";
import SiteFooter from "@/components/SiteFooter";

const CANONICAL_BASE = "https://daimon.stevenvallejo.com";
const AUTHOR_URL = "https://www.stevenvallejo.com";
const ECOSYSTEM_NAME = "Mouseîon";
// WAVE3 tip+2 LCP: h1#dm-home-title render-delay was ~74% (text LCP).
// Manrope = LCP face → font-display:optional (paint fallback at t0; no late swap LCP).
// Newsreader/Plex = non-critical above-fold → preload:false so they do not contend
// with Manrope on the critical path (Mouseîon pattern: only LCP face preloads).
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "optional",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

// themeColor moved out of metadata (deprecated in Next 14+) into the viewport export.
// Next.js 16 viewport API auto-renders <meta name="viewport"> + <meta name="theme-color">.
export const viewport: Viewport = {
  themeColor: "#071519",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: "Daímon — Atlas de inteligencia artificial · Mouseîon",
  description:
    "Atlas de proyectos de inteligencia artificial de Steven Vallejo: sistemas, agentes, infraestructura y experimentos documentados.",
  // authors → renders <meta name="author"> automatically via Metadata API.
  // creator/publisher → reinforce author attribution in crawlers.
  authors: [
    { name: "Steven Vallejo", url: AUTHOR_URL },
  ],
  creator: "Steven Vallejo",
  publisher: "Steven Vallejo",
  alternates: {
    // WAVE3 tip+1: trailingSlash:true makes Metadata emit origin+/ for home.
    // Relative "/" resolves via metadataBase → https://daimon.stevenvallejo.com/
    canonical: "/",
  },
  // WAVE3 soft-P1 SEO P2: explicit index/follow (was absent in live HTML).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Daímon — Atlas de inteligencia artificial · Mouseîon",
    description:
      "Explora proyectos de inteligencia artificial de Steven Vallejo: sistemas, agentes, infraestructura y experimentos documentados.",
    type: "website",
    url: CANONICAL_BASE + "/",
    siteName: ECOSYSTEM_NAME,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daímon — Atlas de inteligencia artificial · Mouseîon",
    description:
      "Sistemas, agentes, infraestructura y experimentos de inteligencia artificial documentados.",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.json",
};

// Structured data graph.
// Person promoted to a top-level node (referenced by author/creator fields below)
// so crawlers like Google Knowledge Graph can resolve the author as its own entity.
const authorPerson = {
  "@type": "Person",
  "@id": AUTHOR_URL + "/#person",
  name: "Steven Vallejo",
  url: AUTHOR_URL,
  image: AUTHOR_URL + "/avatar.jpg", // optional but improves Knowledge Graph card
  description:
    "Autor del ecosistema Mouseîon y de los proyectos de IA reunidos en Daímon.",
  knowsAbout: [
    "Inteligencia artificial",
    "RAG (Retrieval-Augmented Generation)",
    "LLM locales (GGUF, Ollama, llama.cpp)",
    "Model Context Protocol (MCP)",
    "Agentes autónomos",
    "OCR GPU (Surya)",
    "Sistemas multi-agente",
    "Filosofía antigua",
  ],
  sameAs: [
    "https://github.com/stevenvo780",
    "https://www.linkedin.com/in/steven-vallejo/",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // The site itself.
      "@type": "WebSite",
      "@id": CANONICAL_BASE + "/#website",
      url: CANONICAL_BASE + "/",
      name: "Daímon",
      description:
        "Atlas de proyectos de inteligencia artificial de Steven Vallejo: sistemas, agentes, infraestructura y experimentos documentados.",
      inLanguage: "es-ES",
      // isPartOf ties this site into the personal hub → builds entity graph for the author.
      isPartOf: {
        "@type": "WebSite",
        "@id": AUTHOR_URL + "/#website",
        name: ECOSYSTEM_NAME,
        url: AUTHOR_URL,
      },
      author: { "@id": AUTHOR_URL + "/#person" },
      publisher: { "@id": AUTHOR_URL + "/#person" },
    },
    {
      // Daímon is a catalogue, not one software product.
      "@type": "CollectionPage",
      "@id": CANONICAL_BASE + "/#catalogue",
      name: "Daímon",
      url: CANONICAL_BASE + "/",
      description:
        "Colección documentada de sistemas, módulos y experimentos de inteligencia artificial; la disponibilidad del código se indica en cada ficha.",
      inLanguage: "es-ES",
      author: { "@id": AUTHOR_URL + "/#person" },
      publisher: { "@id": AUTHOR_URL + "/#person" },
      isPartOf: {
        "@type": "WebSite",
        "@id": AUTHOR_URL + "/#website",
        name: ECOSYSTEM_NAME,
        url: AUTHOR_URL,
      },
    },
    {
      // Daímon also as a CreativeWork → helps general crawlers/AI indexers that prefer
      // CreativeWork over SoftwareApplication for landing pages.
      "@type": "CreativeWork",
      "@id": CANONICAL_BASE + "/#creativework",
      name: "Daímon",
      abstract:
        "Atlas de proyectos de inteligencia artificial de Steven Vallejo, parte de Mouseîon.",
      author: { "@id": AUTHOR_URL + "/#person" },
      isPartOf: {
        "@type": "WebSite",
        "@id": AUTHOR_URL + "/#website",
        name: ECOSYSTEM_NAME,
        url: AUTHOR_URL,
      },
      inLanguage: "es-ES",
      url: CANONICAL_BASE + "/",
    },
    // Person declared at the end so all references above resolve first.
    authorPerson,
  ],
};

// JSON.stringify output is XSS-vulnerable if any string contains "</script>".
// Next.js 16 docs recommend escaping '<' to \u003c (unicode equivalent).
const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" className={`${manrope.variable} ${newsreader.variable} ${plexMono.variable}`}>
      <head>
        {/* Native <script> per Next.js 16 docs — next/script is for executable JS, not data. */}
        <script
          id="json-ld-daimon"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body className="min-h-screen">
        <a className="dm-skip" href="#contenido">Saltar al contenido</a>
        <NavBar />
        <div id="contenido" tabIndex={-1}>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
