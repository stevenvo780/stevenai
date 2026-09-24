import type { Metadata } from "next";
import Link from "next/link";
import { GroupMotif } from "@/components/visual/ProjectMotif";
import { components } from "@/lib/components-data";
import { catalogGroups } from "@/lib/catalog-groups";
import "@/app/styles/detail.css";

const PAGE_URL = "https://daimon.stevenvallejo.com/architecture";

export const metadata: Metadata = {
  title: "Mapa de proyectos — Daímon · Mouseîon",
  description: "Atlas editorial de los proyectos y módulos de IA de Daímon, agrupados por propósito. No representa una integración técnica entre ellos.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Mapa de proyectos — Daímon · Mouseîon",
    description: "Asistentes, infraestructura, inferencia y herramientas del catálogo Daímon, agrupados por propósito.",
    url: PAGE_URL,
    siteName: "Mouseîon",
    locale: "es_ES",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Daímon, atlas de proyectos de inteligencia artificial" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default function ArchitecturePage() {
  const publicCount = components.filter((project) => project.sourceAccess !== "private").length;

  return (
    <main className="atlas-page">
      <div className="atlas-shell">
        <nav className="detail-breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/">Daímon</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Mapa</span>
        </nav>

        <header className="atlas-hero">
          <div>
            <p className="detail-overline">Índice visual / Daímon</p>
            <h1>Una colección.<br />{" "}<em>Muchas maneras de pensar con IA.</em></h1>
          </div>
          <div className="atlas-hero-aside">
            <p>
              Este mapa reúne asistentes, infraestructura, experimentos y herramientas por su propósito.
              Cada ficha explica el alcance real del proyecto o módulo que documenta.
            </p>
            <div className="atlas-hero-counts" aria-label="Tamaño del catálogo">
              <span><strong>{String(components.length).padStart(2, "0")}</strong> fichas</span>
              <span><strong>{String(publicCount).padStart(2, "0")}</strong> fuentes públicas</span>
            </div>
          </div>
        </header>

        <nav className="atlas-index" aria-label="Familias del catálogo">
          {catalogGroups.map((group, index) => (
            <a href={`#${group.id}`} key={group.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {group.title}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <div className="atlas-groups">
          {catalogGroups.map((group, groupIndex) => {
            const projects = components.filter((project) => project.category === group.id);
            return (
              <section className="atlas-group" data-category={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
                <div className="atlas-group-sidebar">
                  <div className="atlas-group-heading" id={group.id}>
                    <span>0{groupIndex + 1} / {String(projects.length).padStart(2, "0")}</span>
                    <h2 id={`${group.id}-title`}>{group.title}</h2>
                    <p>{group.description}</p>
                  </div>
                  <figure className="atlas-group-visual">
                    <GroupMotif category={group.id} />
                    <figcaption>Motivo conceptual</figcaption>
                  </figure>
                </div>

                <ol className="atlas-project-list">
                  {projects.map((project) => {
                    const projectNumber = components.findIndex((item) => item.key === project.key) + 1;
                    return (
                      <li key={project.key}>
                        <Link href={`/components/${project.key}`}>
                          <span className="atlas-project-number">{String(projectNumber).padStart(2, "0")}</span>
                          <span className="atlas-project-copy">
                            <strong>{project.name}</strong>
                            <span>{project.tagline}</span>
                          </span>
                          <span className="atlas-project-access">
                            {project.sourceAccess === "private" ? "Referencia privada" : "Ficha pública"}
                          </span>
                          <span className="atlas-project-arrow" aria-hidden="true">↗</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>

        <aside className="atlas-note">
          <span>Cómo leer el mapa</span>
          <p>
            Estas familias ayudan a explorar el catálogo. Los motivos visuales son conceptuales:
            no representan un flujo operativo ni conexiones técnicas entre todos los proyectos.
          </p>
          <Link href="/#catalogo">Volver al catálogo <span aria-hidden="true">↗</span></Link>
        </aside>
      </div>
    </main>
  );
}
