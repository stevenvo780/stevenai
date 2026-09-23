import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/NavBarServer";

const CANONICAL_BASE = "https://daimon.stevenvallejo.com";
const AUTHOR_URL = "https://www.stevenvallejo.com";
const ECOSYSTEM_NAME = "Mouseîon";

// themeColor moved out of metadata (deprecated in Next 14+) into the viewport export.
// Next.js 16 viewport API auto-renders <meta name="viewport"> + <meta name="theme-color">.
export const viewport: Viewport = {
  themeColor: "#0b1417",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: "Daímon — Catálogo de proyectos de IA · Mouseîon",
  description:
    "Catálogo de proyectos de IA de Steven Vallejo: asistentes, infraestructura para agentes, modelos y herramientas con código público.",
  // authors → renders <meta name="author"> automatically via Metadata API.
  // creator/publisher → reinforce author attribution in crawlers.
  authors: [
    { name: "Steven Vallejo", url: AUTHOR_URL },
  ],
  creator: "Steven Vallejo",
  publisher: "Steven Vallejo",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Daímon — Catálogo de proyectos de IA · Mouseîon",
    description:
      "Explora los proyectos de IA de Steven Vallejo: asistentes, infraestructura para agentes, modelos y herramientas independientes.",
    type: "website",
    url: CANONICAL_BASE + "/",
    siteName: ECOSYSTEM_NAME,
    locale: "es_ES",
    images: [
      {
        url: CANONICAL_BASE + "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daímon — Catálogo de proyectos de IA · Mouseîon",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daímon — Catálogo de proyectos de IA · Mouseîon",
    description:
      "Asistentes, infraestructura para agentes, modelos y herramientas de IA con código público.",
    images: [CANONICAL_BASE + "/og-image.png"],
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
  email: "mailto:steven@stevenvallejo.com", // schema-level only; not exposed as visible mailto on page
  jobTitle: "Ingeniero-filósofo · Arquitecto de IA",
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
  worksFor: {
    "@type": "Organization",
    name: ECOSYSTEM_NAME,
    url: AUTHOR_URL,
  },
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
        "Catálogo de proyectos de IA de Steven Vallejo: asistentes, infraestructura para agentes, modelos y herramientas independientes.",
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
      // Daímon is a catalogue of separate projects, not one software product.
      "@type": "CollectionPage",
      "@id": CANONICAL_BASE + "/#catalogue",
      name: "Daímon",
      url: CANONICAL_BASE + "/",
      description:
        "Colección de proyectos independientes de inteligencia artificial con repositorios públicos.",
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
        "Catálogo de proyectos de IA de Steven Vallejo, parte del ecosistema Mouseîon.",
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
    {
      // Breadcrumb for the static routes (sitemap covers more, but BreadcrumbList is what
      // Google actually shows under the page title for /architecture and /components/*).
      "@type": "BreadcrumbList",
      "@id": CANONICAL_BASE + "/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: ECOSYSTEM_NAME,
          item: AUTHOR_URL + "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Daímon",
          item: CANONICAL_BASE + "/",
        },
      ],
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
    <html lang="es" data-theme="dark" className="h-full antialiased">
      <head>
        {/* Native <script> per Next.js 16 docs — next/script is for executable JS, not data. */}
        <script
          id="json-ld-daimon"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body className="min-h-screen">
        <NavBar />
        <div>{children}</div>
        <footer className="border-t border-[var(--card-border)] mt-16 py-8 text-center text-xs text-[var(--muted)]">
          <p>
            por{" "}
            <a
              href={AUTHOR_URL}
              className="hover:text-[var(--teal-light)] transition-colors"
            >
              Steven Vallejo
            </a>
            {" — "}
            <a
              href="https://github.com/stevenvo780"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--teal-light)] transition-colors"
            >
              github.com/stevenvo780
            </a>
          </p>
          <p className="mt-1">
            Catálogo público. Algunas demos con GPU aún no están alojadas.
          </p>
          <div className="mt-6 pt-6 border-t border-[var(--card-border)]">
            <p className="mb-2 text-[var(--text-muted)]">
              Parte de{" "}
              <a
                href={AUTHOR_URL}
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Mouseîon
              </a>
            </p>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Frentes Mouseîon">
              <a
                href="https://www.stevenvallejo.com/es#filosofia"
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Filosofía
              </a>
              <a
                href="https://www.stevenvallejo.com/es#ciencias"
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Ciencias
              </a>
              <a
                href="https://www.stevenvallejo.com/es#informatica"
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Informática
              </a>
              <a
                href="https://www.stevenvallejo.com/es#ingenieria"
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Ingeniería
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
