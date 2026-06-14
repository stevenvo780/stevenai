import { components, getComponentByKey } from "@/lib/components-data";
import { notFound } from "next/navigation";
import RuntimeBadge from "@/components/RuntimeBadge";
import MermaidDiagram from "@/components/MermaidDiagramDynamic";
import HonestNote from "@/components/HonestNote";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ key: string }>;
}

export async function generateStaticParams() {
  return components.map((c) => ({ key: c.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params;
  const component = getComponentByKey(key);
  if (!component) return { title: "Componente no encontrado" };
  return {
    title: `${component.name} — StevenAI Suite`,
    description: component.description,
  };
}

const colorBorder: Record<string, string> = {
  teal: "border-[var(--teal)]",
  gold: "border-[var(--gold)]",
  purple: "border-purple-500",
  cyan: "border-cyan-500",
};

const colorText: Record<string, string> = {
  teal: "text-[var(--teal-light)]",
  gold: "text-[var(--gold-light)]",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

const statusDot: Record<string, string> = {
  "live-local": "bg-green-500",
  "demo-pending": "bg-yellow-500",
  available: "bg-blue-400",
};

export default async function ComponentPage({ params }: PageProps) {
  const { key } = await params;
  const component = getComponentByKey(key);
  if (!component) notFound();

  const currentIndex = components.findIndex((c) => c.key === key);
  const prev = currentIndex > 0 ? components[currentIndex - 1] : null;
  const next = currentIndex < components.length - 1 ? components[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--muted)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
          Suite
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{component.name}</span>
      </nav>

      {/* Header */}
      <header className={`border-l-4 ${colorBorder[component.color]} pl-5 mb-8`}>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className={`text-3xl font-bold ${colorText[component.color]}`}>
            {component.name}
          </h1>
          <span
            className={`w-2.5 h-2.5 rounded-full ${statusDot[component.status]}`}
            title={component.statusLabel}
          />
          <span className="text-xs text-[var(--muted)]">{component.statusLabel}</span>
        </div>
        <p className="text-[var(--muted)] italic mb-3">{component.tagline}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <RuntimeBadge runtime={component.runtime} label={component.runtimeLabel} />
          <a
            href={component.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--teal-light)] hover:underline"
          >
            Ver codigo en GitHub
          </a>
        </div>
      </header>

      {/* Status notice for demo-pending */}
      {component.status === "demo-pending" && (
        <div className="mb-6">
          <HonestNote />
        </div>
      )}

      {/* Description */}
      <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
          Descripcion
        </h2>
        <p className="text-[var(--foreground)]/90 leading-relaxed">{component.longDescription}</p>
      </section>

      {/* Hardware requirements if present */}
      {component.hardwareRequirements && (
        <section className="bg-purple-950/20 border border-purple-800/30 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">
            Requisitos de hardware
          </h2>
          <p className="text-purple-300/80 text-sm font-mono">{component.hardwareRequirements}</p>
        </section>
      )}

      {/* Two-column: capabilities + stack */}
      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
            Capacidades
          </h2>
          <ul className="space-y-2">
            {component.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-2 text-sm">
                <span className={`mt-1 ${colorText[component.color]}`}>—</span>
                <span className="text-[var(--foreground)]/80">{cap}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
            Stack tecnologico
          </h2>
          <div className="flex flex-wrap gap-2">
            {component.stack.map((s) => (
              <span key={s} className="tag text-sm">
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Architecture Diagram */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
          Diagrama de arquitectura
        </h2>
        <p className="text-sm text-[var(--muted)] mb-4">{component.architectureDescription}</p>
        <MermaidDiagram chart={component.mermaidDiagram} id={component.key} />
      </section>

      {/* GitHub CTA */}
      <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div>
          <p className="font-medium text-[var(--foreground)]">Codigo fuente</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">{component.repo}</p>
        </div>
        <a
          href={component.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg font-semibold text-white gradient-teal hover:opacity-90 transition-opacity text-sm shrink-0"
        >
          Ver en GitHub
        </a>
      </section>

      {/* Prev / Next navigation */}
      <nav className="flex justify-between gap-4">
        {prev ? (
          <Link
            href={`/components/${prev.key}`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            &larr; {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/components/${next.key}`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {next.name} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
