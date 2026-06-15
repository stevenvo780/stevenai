import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBarServer";
import Script from "next/script";

const CANONICAL_BASE = "https://daimon.stevenvallejo.com";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: "Daímon — Pila de inteligencia artificial · Mouseîon",
  description:
    "Daímon: pila de inteligencia artificial de Steven Vallejo. Asistente RAG, LLM local GGUF, enjambre MCP, agentes autónomos y conversor OCR GPU. Parte del ecosistema Mouseîon.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Daímon — Pila de inteligencia artificial · Mouseîon",
    description:
      "Pila IA de Steven Vallejo — RAG, GGUF, MCP Swarm, agentes autónomos, OCR GPU. Parte del ecosistema Mouseîon.",
    type: "website",
    url: CANONICAL_BASE + "/",
    siteName: "Mouseîon",
    locale: "es_ES",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daímon — Pila de inteligencia artificial · Mouseîon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daímon — Pila de inteligencia artificial · Mouseîon",
    description:
      "Pila IA de Steven Vallejo — RAG, GGUF, MCP Swarm, agentes autónomos, OCR GPU.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: {
    "theme-color": "#0b1417",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": CANONICAL_BASE + "/#website",
      url: CANONICAL_BASE + "/",
      name: "Daímon",
      description:
        "Pila de inteligencia artificial de Steven Vallejo: RAG, GGUF, MCP Swarm, agentes autónomos y OCR GPU.",
      inLanguage: "es-ES",
      isPartOf: {
        "@type": "WebSite",
        name: "Mouseîon",
        url: "https://www.stevenvallejo.com",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": CANONICAL_BASE + "/#software",
      name: "Daímon",
      url: CANONICAL_BASE + "/",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux",
      description:
        "Pila de inteligencia artificial construida y operada por Steven Vallejo. Incluye asistente RAG con modelos 70B, LLM local GGUF, enjambre de agentes MCP, y conversor OCR GPU con modelo Surya.",
      screenshot: CANONICAL_BASE + "/og-image.png",
      author: {
        "@type": "Person",
        name: "Steven Vallejo",
        url: "https://www.stevenvallejo.com",
        sameAs: [
          "https://github.com/stevenvo780",
          "https://www.linkedin.com/in/stevenvo780",
        ],
      },
      isPartOf: {
        "@type": "WebSite",
        name: "Mouseîon",
        url: "https://www.stevenvallejo.com",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b1417" />
        <Script
          id="json-ld-daimon"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen">
        <NavBar />
        <main>{children}</main>
        <footer className="border-t border-[var(--card-border)] mt-16 py-8 text-center text-xs text-[var(--muted)]">
          <p>
            por{" "}
            <a
              href="https://www.stevenvallejo.com"
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
            Portal estatico. Demos vivos GPU pendientes de hosting dedicado.
          </p>
          <div className="mt-6 pt-6 border-t border-[var(--card-border)]">
            <p className="mb-2 text-[var(--text-muted)]">
              Parte de{" "}
              <a
                href="https://www.stevenvallejo.com"
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Mouseîon
              </a>
            </p>
            <nav className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.stevenvallejo.com/es#filosofia"
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Filosofia
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
                Informatica
              </a>
              <a
                href="https://www.stevenvallejo.com/es#enterprise"
                className="hover:text-[var(--teal-light)] transition-colors"
              >
                Enterprise
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
