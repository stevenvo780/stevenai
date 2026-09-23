import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/components-data";
import { catalogGroups } from "@/lib/catalog-groups";

export const metadata: Metadata = {
  title: "Mapa de proyectos — Daímon · Mouseîon",
  description: "Mapa del catálogo de IA de Steven Vallejo: asistentes, agentes y herramientas independientes.",
  alternates: { canonical: "https://daimon.stevenvallejo.com/architecture" },
  openGraph: {
    title: "Mapa de proyectos — Daímon · Mouseîon",
    description: "Asistentes, agentes y herramientas del catálogo Daímon.",
    url: "https://daimon.stevenvallejo.com/architecture",
    siteName: "Mouseîon",
    locale: "es_ES",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ArchitecturePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 pb-20">
      <nav className="text-xs text-[var(--muted)] mb-8 flex items-center gap-2" aria-label="Ruta de navegación">
        <Link href="/" className="hover:text-[var(--foreground)]">Catálogo</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--foreground)]">Mapa</span>
      </nav>

      <p className="text-xs uppercase tracking-[0.16em] text-[var(--teal-light)] mb-2">Orientación</p>
      <h1 className="text-4xl sm:text-5xl mb-4">Mapa de proyectos</h1>
      <p className="text-[var(--muted)] max-w-2xl leading-relaxed mb-10">
        Daímon reúne proyectos de IA con propósitos distintos. El mapa los agrupa para explorarlos;
        no representa una integración técnica entre todos ellos. Cada ficha explica la arquitectura
        de su propio repositorio.
      </p>

      <div className="space-y-10">
        {catalogGroups.map((group, index) => {
          const projects = components.filter((project) => project.category === group.id);
          return (
            <section key={group.id} aria-labelledby={`${group.id}-title`}
              className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-5 md:gap-10 border-t border-[var(--card-border)] pt-6">
              <div>
                <span className="text-xs font-mono text-[var(--teal-light)]">0{index + 1}</span>
                <h2 id={`${group.id}-title`} className="text-2xl mt-2 mb-2">{group.title}</h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{group.description}</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {projects.map((project) => (
                  <li key={project.key}>
                    <Link href={`/components/${project.key}`}
                      className="block h-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 hover:border-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] transition-colors">
                      <strong className="block text-sm text-[var(--foreground)] mb-1">{project.name}</strong>
                      <span className="block text-xs text-[var(--muted)] leading-relaxed">{project.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
