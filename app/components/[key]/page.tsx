import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MermaidDiagram from "@/components/MermaidDiagramDynamic";
import HonestNote from "@/components/HonestNote";
import { ProjectMotif } from "@/components/visual/ProjectMotif";
import { catalogGroups } from "@/lib/catalog-groups";
import { components, getComponentByKey, type AIComponent } from "@/lib/components-data";
import "@/app/styles/detail.css";

interface PageProps {
  params: Promise<{ key: string }>;
}

const CANONICAL_BASE = "https://daimon.stevenvallejo.com";
const MEDIA_TOOLS = new Set(["reel-forge", "minimax-h3", "pixel-art-replicate"]);

export function generateStaticParams() {
  return components.map(({ key }) => ({ key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params;
  const component = getComponentByKey(key);
  if (!component) return { title: "Proyecto no encontrado" };

  const pageUrl = `${CANONICAL_BASE}/components/${key}`;
  const title = `${component.name} — Daímon · Mouseîon`;
  return {
    title,
    description: component.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: component.description,
      url: pageUrl,
      siteName: "Mouseîon",
      locale: "es_ES",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Daímon, atlas de proyectos de inteligencia artificial" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: component.description,
      images: ["/twitter-image"],
    },
  };
}

function programmingLanguages(stack: string[]): string[] {
  const languages = ["TypeScript", "JavaScript", "Python", "Shell"];
  return languages.filter((language) =>
    stack.some((entry) => new RegExp(`\\b${language}\\b`, "i").test(entry)),
  );
}

function applicationCategory(component: AIComponent): string {
  if (component.key === "agora-ai-agent") return "EducationalApplication";
  if (MEDIA_TOOLS.has(component.key)) return "MultimediaApplication";
  if (component.category === "infrastructure") return "DeveloperApplication";
  return "UtilitiesApplication";
}

function structuredData(component: AIComponent) {
  const isCodeLab = component.key === "neuronal-learning";
  const languages = programmingLanguages(component.stack);
  const pageUrl = `${CANONICAL_BASE}/components/${component.key}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isCodeLab ? "SoftwareSourceCode" : "SoftwareApplication",
        "@id": `${pageUrl}/#software`,
        name: component.name,
        url: pageUrl,
        description: component.description,
        abstract: component.longDescription,
        ...(isCodeLab ? {} : { applicationCategory: applicationCategory(component) }),
        ...(component.sourceAccess === "private" ? {} : { codeRepository: component.repo }),
        ...(languages.length > 0 ? { programmingLanguage: languages } : {}),
        keywords: component.stack.join(", "),
        author: {
          "@type": "Person",
          "@id": "https://www.stevenvallejo.com/#person",
          name: "Steven Vallejo",
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${CANONICAL_BASE}/#website`,
          name: "Daímon",
          url: CANONICAL_BASE,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Daímon", item: CANONICAL_BASE },
          { "@type": "ListItem", position: 2, name: component.name, item: pageUrl },
        ],
      },
    ],
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { key } = await params;
  const component = getComponentByKey(key);
  if (!component) notFound();

  const currentIndex = components.findIndex((item) => item.key === key);
  const previous = components[currentIndex - 1];
  const next = components[currentIndex + 1];
  const group = catalogGroups.find((item) => item.id === component.category);
  const isPrivate = component.sourceAccess === "private";
  const jsonLd = JSON.stringify(structuredData(component)).replace(/</g, "\\u003c");

  return (
    <main className="detail-page" data-category={component.category}>
      <script
        id={`json-ld-component-${component.key}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="detail-shell">
        <nav className="detail-breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/">Daímon</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/#${component.category}`}>{group?.title ?? "Catálogo"}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{component.name}</span>
        </nav>

        <header className="detail-hero">
          <div className="detail-hero-copy">
            <p className="detail-overline">
              <span>Archivo de IA</span>
              <span aria-hidden="true">·</span>
              <span>Ficha {String(currentIndex + 1).padStart(2, "0")}</span>
            </p>
            <h1 className="detail-title">{component.name}</h1>
            <p className="detail-deck">{component.tagline}</p>
            <p className="detail-lead">{component.description}</p>
            <div className="detail-actions">
              {isPrivate ? (
                <p className="detail-private-callout">
                  El repositorio es privado. Esta ficha presenta el proyecto sin ofrecer acceso al código.
                </p>
              ) : (
                <a className="detail-primary-link" href={component.repo} target="_blank" rel="noopener noreferrer">
                  Explorar repositorio <span aria-hidden="true">↗</span>
                </a>
              )}
              <Link className="detail-secondary-link" href="/architecture">Ver mapa de proyectos <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <figure className="detail-hero-art">
            <ProjectMotif projectKey={component.key} category={component.category} className="detail-project-motif" />
            <figcaption>
              <span>Motivo conceptual</span>
              <span>{group?.title ?? "Proyecto"}</span>
            </figcaption>
          </figure>
        </header>

        <dl className="detail-facts" aria-label="Estado y ejecución">
          <div className="detail-fact">
            <dt>Acceso al código</dt>
            <dd>{isPrivate ? "Repositorio privado" : "Repositorio público"}</dd>
          </div>
          <div className="detail-fact">
            <dt>Estado</dt>
            <dd>{component.statusLabel}</dd>
          </div>
          <div className="detail-fact">
            <dt>Ejecución</dt>
            <dd>{component.runtimeLabel}</dd>
          </div>
        </dl>

        {component.status === "demo-pending" && (
          <div className="detail-honest-note"><HonestNote /></div>
        )}

        <section className="detail-section detail-purpose" aria-labelledby="detail-purpose-title">
          <div className="detail-section-head">
            <span className="detail-section-index">01 / Propósito</span>
            <h2 id="detail-purpose-title">Qué resuelve</h2>
          </div>
          <div className="detail-purpose-body">
            <p className="detail-prose">{component.longDescription}</p>
            <div className="detail-capabilities">
              <h3>Capacidades documentadas</h3>
              <ul>
                {component.capabilities.map((capability, index) => (
                  <li key={capability}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="detail-section detail-architecture" aria-labelledby="detail-architecture-title">
          <div className="detail-section-head">
            <span className="detail-section-index">02 / Arquitectura</span>
            <h2 id="detail-architecture-title">Cómo funciona</h2>
          </div>
          <p className="detail-architecture-intro">{component.architectureDescription}</p>
          <div className="detail-diagram">
            <p className="detail-diagram-label">Síntesis editorial del proyecto · no representa un despliegue en vivo</p>
            <MermaidDiagram
              chart={component.mermaidDiagram}
              id={component.key}
              ariaLabel={`Diagrama de arquitectura de ${component.name}`}
            />
          </div>
        </section>

        <section className="detail-section detail-technical" aria-labelledby="detail-technical-title">
          <div className="detail-section-head">
            <span className="detail-section-index">03 / Condiciones</span>
            <h2 id="detail-technical-title">Para ponerlo en marcha</h2>
          </div>
          <div className="detail-technical-grid">
            <div>
              <h3>Entorno requerido</h3>
              <p>{component.hardwareRequirements ?? component.runtimeLabel}</p>
            </div>
            <div>
              <h3>Tecnologías</h3>
              <ul className="detail-stack">
                {component.stack.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <aside className="detail-source" aria-label="Origen de esta ficha">
          <div>
            <p className="detail-source-kicker">Origen de la ficha</p>
            <h2>{isPrivate ? "Referencia sin código público" : "Explora el proyecto original"}</h2>
            <p>
              {isPrivate
                ? "El repositorio de Talos es privado. La descripción permite conocer su enfoque, sin prometer acceso a implementación ni demo."
                : component.key === "agora-ai-agent"
                  ? "Ágora AI Agent es un módulo de AgoraBack. El repositorio también contiene otros servicios de la plataforma."
                  : "El repositorio contiene la implementación y la documentación disponible para este proyecto. Su ejecución puede requerir servicios o credenciales propias."}
            </p>
          </div>
          {!isPrivate && (
            <a href={component.repo} target="_blank" rel="noopener noreferrer">
              Abrir GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </aside>

        <nav className="detail-pagination" aria-label="Explorar otras fichas">
          {previous ? (
            <Link href={`/components/${previous.key}`} className="detail-pagination-link">
              <span>← Ficha anterior</span>
              <strong>{previous.name}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/components/${next.key}`} className="detail-pagination-link detail-pagination-next">
              <span>Ficha siguiente →</span>
              <strong>{next.name}</strong>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </main>
  );
}
