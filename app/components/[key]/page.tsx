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

const CANONICAL_BASE = "https://daimon.stevenvallejo.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params;
  const component = getComponentByKey(key);
  if (!component) return { title: "Componente no encontrado" };
  const pageUrl = `${CANONICAL_BASE}/components/${key}`;
  return {
    title: `${component.name} — Daímon · Mouseîon`,
    description: component.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${component.name} — Daímon · Mouseîon`,
      description: component.description,
      url: pageUrl,
      siteName: "Mouseîon",
      locale: "es_ES",
      images: [{ url: `${CANONICAL_BASE}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${component.name} — Daímon · Mouseîon`,
      description: component.description,
      images: [`${CANONICAL_BASE}/og-image.png`],
    },
  };
}

const colorBorder: Record<string, string> = {
  teal: "border-[var(--teal)]",
  gold: "border-[var(--gold)]",
  purple: "border-[var(--accent-strong)]",
  cyan: "border-[var(--teal)]",
};

const colorText: Record<string, string> = {
  teal: "text-[var(--teal-light)]",
  gold: "text-[var(--gold-light)]",
  purple: "text-[var(--accent)]",
  cyan: "text-[var(--teal-light)]",
};

const statusDot: Record<string, string> = {
  "live-local": "bg-[var(--success)]",
  "demo-pending": "bg-[var(--warning)]",
  available: "bg-[var(--primary)]",
};

export default async function ComponentPage({ params }: PageProps) {
  const { key } = await params;
  const component = getComponentByKey(key);
  if (!component) notFound();

  const currentIndex = components.findIndex((c) => c.key === key);
  const prev = currentIndex > 0 ? components[currentIndex - 1] : null;
  const next = currentIndex < components.length - 1 ? components[currentIndex + 1] : null;

  // Fallbacks for color maps
  const borderColor = colorBorder[component.color] ?? colorBorder.teal;
  const textColor = colorText[component.color] ?? colorText.teal;
  const statusClass = statusDot[component.status] ?? statusDot.available;

  // Generate JSON-LD for this component (Product/SoftwareApplication schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${CANONICAL_BASE}/components/${component.key}/#software`,
    name: component.name,
    url: `${CANONICAL_BASE}/components/${component.key}`,
    description: component.description,
    abstract: component.longDescription,
    applicationCategory: "DeveloperApplication",
    operatingSystem: component.runtime === "gpu-local" ? "Linux" : "Web",
    runtimePlatform:
      component.runtime === "gpu-local" ? "NVIDIA CUDA" :
      component.runtime === "api" ? "OpenAI API" :
      "CPU",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Person",
      "@id": "https://www.stevenvallejo.com/#person",
      name: "Steven Vallejo",
    },
    codeRepository: component.repo,
    programmingLanguage: component.stack[0] || "TypeScript",
    keywords: component.stack.join(", "),
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.stevenvallejo.com/#website",
      name: "Mouseîon",
      url: "https://www.stevenvallejo.com",
    },
  };

  // Safe JSON.stringify with XSS escaping
  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      {/* JSON-LD Structured Data for this component */}
      <script
        id={`json-ld-component-${component.key}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

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
        <header className={`border-l-4 ${borderColor} pl-5 mb-8`}>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className={`text-3xl font-bold ${textColor}`}>
              {component.name}
            </h1>
            <span
              className={`w-2.5 h-2.5 rounded-full ${statusClass}`}
              title={component.statusLabel}
              aria-label={component.statusLabel}
              role="status"
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
              Ver código en GitHub
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
            Descripción
          </h2>
          <p className="text-[var(--foreground)] leading-relaxed">{component.longDescription}</p>
        </section>

        {/* Hardware requirements if present */}
        {component.hardwareRequirements && (
          <section className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-5 mb-6">
            <h2 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              Requisitos de hardware
            </h2>
            <p className="text-[var(--text-muted)] text-sm font-mono">{component.hardwareRequirements}</p>
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
                  <span className={`mt-1 ${textColor}`}>—</span>
                  <span className="text-[var(--foreground)]">{cap}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
              Stack tecnológico
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
          <MermaidDiagram
            chart={component.mermaidDiagram}
            id={component.key}
            ariaLabel={`Diagrama de arquitectura de ${component.name}`}
          />
        </section>

        {/* GitHub CTA */}
        <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <p className="font-medium text-[var(--foreground)]">Código fuente</p>
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
    </>
  );
}
