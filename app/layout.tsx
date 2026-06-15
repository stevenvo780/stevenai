import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBarServer";

export const metadata: Metadata = {
  title: "Daímon — Pila de inteligencia artificial · Mouseîon",
  description:
    "Daímon: pila de inteligencia artificial de Steven Vallejo. Asistente RAG, LLM local GGUF, enjambre MCP, agentes autonomos y conversor OCR GPU.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Daímon — Pila de inteligencia artificial",
    description: "Pila IA de Steven Vallejo — RAG, GGUF, MCP Swarm, OCR GPU · Parte de Mouseîon",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" className="h-full antialiased">
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
