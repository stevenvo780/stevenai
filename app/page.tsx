import { components } from "@/lib/components-data";
import { catalogGroups } from "@/lib/catalog-groups";
import ComponentCard from "@/components/ComponentCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-20">
      <header className="pt-8 pb-7 sm:pt-16 sm:pb-12 border-b border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--teal-light)] font-semibold mb-3 sm:mb-4">
          Mouseîon · Inteligencia artificial
        </p>
        <h1 className="text-[clamp(3.25rem,10vw,6.5rem)] leading-[0.92] font-bold mb-3 sm:mb-5">
          <span className="text-[var(--teal-light)]">Daí</span>
          <span className="text-[var(--gold-light)]">mon</span>
        </h1>
        <p className="text-xl sm:text-2xl text-[var(--foreground)] max-w-3xl leading-snug mb-3 sm:mb-4">
          Catálogo de proyectos de IA de Steven Vallejo.
        </p>
        <p className="hidden sm:block text-[var(--muted)] max-w-2xl leading-relaxed">
          Asistentes, agentes y herramientas con código público. Cada ficha explica qué hace el
          proyecto, qué necesita para funcionar y dónde encontrar su repositorio.
        </p>
      </header>

      <section id="catalogo" className="scroll-mt-32 pt-7 sm:pt-12" aria-labelledby="catalogo-titulo">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--teal-light)] mb-2">Explorar</p>
            <h2 id="catalogo-titulo" className="text-3xl sm:text-4xl text-[var(--foreground)]">El catálogo</h2>
          </div>
          <p className="hidden sm:block text-sm text-[var(--muted)] max-w-md">
            {components.length} proyectos agrupados por lo que permiten hacer. Son iniciativas
            independientes; cada una tiene su propio repositorio.
          </p>
        </div>

        <nav aria-label="Secciones del catálogo" className="flex flex-nowrap overflow-x-auto gap-2 mb-7 sm:mb-10 pb-1">
          {catalogGroups.map((group) => (
            <a key={group.id} href={`#${group.id}`}
              className="shrink-0 whitespace-nowrap rounded-full border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] transition-colors">
              {group.title}
            </a>
          ))}
        </nav>

        <div className="space-y-14">
          {catalogGroups.map((group) => {
            const projects = components.filter((project) => project.category === group.id);
            return (
              <section key={group.id} id={group.id} className="scroll-mt-32" aria-labelledby={`${group.id}-title`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-[var(--card-border)] pb-4 mb-5">
                  <h3 id={`${group.id}-title`} className="text-2xl text-[var(--foreground)]">
                    {group.title}
                    <span className="ml-3 text-sm font-sans font-normal text-[var(--muted)]">
                      {projects.length.toString().padStart(2, "0")}
                    </span>
                  </h3>
                  <p className="text-sm text-[var(--muted)] max-w-xl">{group.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((project) => <ComponentCard key={project.key} component={project} />)}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section id="guia" className="scroll-mt-32 mt-16 border-t border-[var(--card-border)] pt-10" aria-labelledby="guia-titulo">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--teal-light)] mb-2">Antes de abrir un proyecto</p>
            <h2 id="guia-titulo" className="text-3xl">Cómo leer el catálogo</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 text-sm leading-relaxed text-[var(--muted)]">
            <p><strong className="block text-[var(--foreground)] mb-1">Código disponible</strong>
              La ficha enlaza al repositorio. Algunas instalaciones son referencias de un entorno personal y requieren adaptación.</p>
            <p><strong className="block text-[var(--foreground)] mb-1">Ejecución local</strong>
              La etiqueta indica si el proyecto usa GPU, CPU o una API. No significa que haya una demo pública activa.</p>
            <p><strong className="block text-[var(--foreground)] mb-1">Demo pendiente</strong>
              El código se puede consultar; las demos que necesitan GPU aún no están alojadas aquí.</p>
            <p><strong className="block text-[var(--foreground)] mb-1">Mapa de proyectos</strong>
              Una vista rápida de las tres áreas. Cada ficha contiene además su propio diagrama.
              <Link href="/architecture" className="block mt-2 text-[var(--teal-light)] hover:underline">Ver el mapa →</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
