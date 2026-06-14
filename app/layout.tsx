import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBarServer";

export const metadata: Metadata = {
  title: "StevenAI Suite — Pila IA local de Steven Vallejo",
  description:
    "Portal de arquitectura de la pila IA de Steven Vallejo: asistente RAG, LLM local GGUF, enjambre MCP, agentes autonomos y conversor OCR GPU.",
  openGraph: {
    title: "StevenAI Suite",
    description: "Pila IA local de Steven Vallejo — RAG, GGUF, MCP Swarm, OCR GPU",
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
            Steven Vallejo —{" "}
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
        </footer>
      </body>
    </html>
  );
}
