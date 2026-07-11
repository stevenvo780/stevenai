import { components } from "@/lib/components-data";
import ComponentCard from "@/components/ComponentCard";
import HonestNote from "@/components/HonestNote";
import Link from "next/link";

export default function Home() {
  const gpuCount = components.filter((c) => c.runtime === "gpu-local").length;
  const apiCount = components.filter((c) => c.runtime === "api").length;
  const cpuCount = components.filter((c) => c.runtime === "local-cpu").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          <span className="text-[var(--teal-light)]">Daí</span>
          <span className="text-[var(--gold-light)]">mon</span>
        </h1>
        <p className="text-[var(--foreground)] text-xl font-semibold mb-2">
          Pila de inteligencia artificial
        </p>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto mb-6">
          Pila de inteligencia artificial construida y operada por Steven Vallejo. Desde asistentes
          RAG con modelos de 70B hasta conversores OCR GPU y enjambres de agentes MCP.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-[var(--teal-light)]">{components.length}</span>
            <span className="text-[var(--muted)] ml-2">componentes</span>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-[var(--accent)]">{gpuCount}</span>
            <span className="text-[var(--muted)] ml-2">GPU locales</span>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-[var(--primary)]">{apiCount}</span>
            <span className="text-[var(--muted)] ml-2">via API</span>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-[var(--success)]">{cpuCount}</span>
            <span className="text-[var(--muted)] ml-2">CPU local</span>
          </div>
        </div>
        <HonestNote />
      </section>

      {/* Component Grid */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">Componentes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {components.map((c) => (
            <ComponentCard key={c.key} component={c} />
          ))}
        </div>
      </section>

      {/* Architecture CTA */}
      <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Arquitectura de la suite completa</h2>
        <p className="text-[var(--muted)] mb-5 max-w-xl mx-auto">
          Diagrama de como los 6 componentes interactuan entre si: desde el IDE hasta los modelos
          GPU, pasando por los servidores MCP y los vectorstores.
        </p>
        <Link
          href="/architecture"
          className="inline-block px-6 py-3 rounded-xl font-semibold text-white gradient-teal hover:opacity-90 transition-opacity"
        >
          Ver arquitectura global
        </Link>
      </section>

      {/* Legend */}
      <section className="mt-10 flex flex-wrap gap-6 text-xs text-[var(--muted)] justify-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--success)]" aria-label="Código disponible en GitHub" />
          Codigo disponible en GitHub
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--warning)]" aria-label="Demo GPU pendiente de hosting" />
          Demo GPU pendiente de hosting
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-gpu">GPU</span>
          Corre en GPU local
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-api">API</span>
          Corre via API cloud
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-local">CPU</span>
          Corre en CPU local
        </div>
      </section>
    </div>
  );
}
