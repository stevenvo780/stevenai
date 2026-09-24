import Link from "next/link";
import ComponentCard from "@/components/ComponentCard";
import IntelligenceScene from "@/components/visual/IntelligenceScene";
import { GroupMotif } from "@/components/visual/ProjectMotif";
import { catalogGroups } from "@/lib/catalog-groups";
import { components, type AIComponent } from "@/lib/components-data";
import "./styles/home.css";

type SearchParams = Record<string, string | string[] | undefined>;

const featuredKeys = ["cauce-v3", "cloud-delegate", "jarvis-v2", "agora-ai-agent"];

const runtimeOptions: { value: AIComponent["runtime"]; label: string }[] = [
  { value: "gpu-local", label: "GPU local" },
  { value: "local-cpu", label: "CPU / local" },
  { value: "api", label: "API" },
  { value: "service", label: "Servicio" },
];

const readingGuide = [
  {
    number: "01",
    title: "Qué hace",
    text: "Una ficha parte del propósito y de las capacidades del proyecto. El nombre de una técnica no sustituye al problema que resuelve.",
    aside: "PROPÓSITO / ALCANCE",
  },
  {
    number: "02",
    title: "Código y acceso",
    text: "La ficha indica dónde consultar la fuente cuando es pública. Un proyecto de acceso privado se presenta como tal y no promete un repositorio abierto.",
    aside: "FUENTE / DISPONIBILIDAD",
  },
  {
    number: "03",
    title: "Condiciones",
    text: "Hardware, servicios y credenciales propias importan. Una etiqueta de ejecución describe requisitos; no anuncia una demo activa.",
    aside: "ENTORNO / LÍMITES",
  },
];

function firstParam(value: SearchParams[string]): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function searchable(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = firstParam(params.q).trim().slice(0, 120);
  const rawArea = firstParam(params.area);
  const rawRuntime = firstParam(params.runtime);
  const area = catalogGroups.find((group) => group.id === rawArea)?.id ?? "all";
  const runtime = runtimeOptions.find((option) => option.value === rawRuntime)?.value ?? "all";
  const normalizedQuery = searchable(query);

  const visibleComponents = components.filter((component) => {
    const matchesArea = area === "all" || component.category === area;
    const matchesRuntime = runtime === "all" || component.runtime === runtime;
    const matchesQuery = !normalizedQuery || searchable([
      component.name,
      component.tagline,
      component.description,
      ...component.stack,
    ].join(" ")).includes(normalizedQuery);
    return matchesArea && matchesRuntime && matchesQuery;
  });

  const privateCount = components.filter((component) => component.sourceAccess === "private").length;
  const publicCount = components.length - privateCount;
  const featured = featuredKeys
    .map((key) => components.find((component) => component.key === key))
    .filter((component): component is AIComponent => Boolean(component));
  const filtersActive = Boolean(query || area !== "all" || runtime !== "all");

  return (
    <main className="dm-home">
      <section className="dm-home-hero" aria-labelledby="dm-home-title">
        <div className="dm-home-shell dm-home-hero-inner">
          <div className="dm-home-hero-copy">
            <p className="dm-home-eyebrow dm-home-hero-eyebrow">
              <span className="dm-home-signal" aria-hidden="true" />
              DAÍMON <span aria-hidden="true">/</span> MOUSEÎON · ATLAS DE IA
            </p>
            <h1 id="dm-home-title">La inteligencia<br />{" "}se <em>construye.</em></h1>
            <p className="dm-home-hero-intro">
              Proyectos de inteligencia artificial hechos para leerse por dentro:
              qué hacen, cómo funcionan y qué necesitan para existir.
            </p>
            <div className="dm-home-hero-actions">
              <a className="dm-home-button dm-home-button-primary" href="#catalogo">
                Explorar {components.length} proyectos <span aria-hidden="true">↗</span>
              </a>
              <a className="dm-home-hero-text-link" href="#guia">
                Cómo leer este archivo <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="dm-home-hero-scene">
            <p className="dm-home-hero-scene-hint">Desliza el esquema <span aria-hidden="true">↔</span></p>
            <IntelligenceScene variant="hero" />
          </div>
        </div>
        <div className="dm-home-shell dm-home-hero-foot" aria-hidden="true">
          <span>FIG. 01 / FLUJO CONCEPTUAL DE IA</span>
          <span>DESLIZA PARA EXPLORAR ↓</span>
        </div>
      </section>

      <div className="dm-home-index" aria-label="Resumen del catálogo">
        <div className="dm-home-shell dm-home-index-inner">
          <p><strong>{String(components.length).padStart(2, "0")}</strong><span>proyectos catalogados</span></p>
          <p><strong>{String(catalogGroups.length).padStart(2, "0")}</strong><span>áreas de trabajo</span></p>
          <p><strong>{String(publicCount).padStart(2, "0")}</strong><span>con fuente pública</span></p>
          <p><strong>{String(privateCount).padStart(2, "0")}</strong><span>de acceso privado</span></p>
        </div>
      </div>

      <section id="guia" className="dm-home-guide dm-home-paper" aria-labelledby="dm-home-guide-title">
        <div className="dm-home-shell">
          <div className="dm-home-section-heading">
            <p className="dm-home-eyebrow"><span>01 / 04</span> CRITERIO DE LECTURA</p>
            <div className="dm-home-heading-grid">
              <h2 id="dm-home-guide-title">Abrir un proyecto es<br />{" "}<em>leer tres capas.</em></h2>
              <p>Cada entrada separa la idea, su fuente y las condiciones para ponerla en marcha. Así se puede explorar el trabajo sin confundir código disponible con servicio abierto.</p>
            </div>
          </div>
          <div className="dm-home-guide-grid">
            {readingGuide.map((item) => (
              <article key={item.number} className="dm-home-guide-item">
                <span className="dm-home-guide-number">{item.number} <span aria-hidden="true">/</span> 03</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="dm-home-guide-aside">{item.aside}</span>
              </article>
            ))}
          </div>
          <p className="dm-home-guide-footnote">
            <span aria-hidden="true">↗</span> Las áreas orientan la lectura; cada ficha aclara si presenta un sistema o un módulo.
            <Link href="/architecture">Ver mapa de proyectos</Link>
          </p>
        </div>
      </section>

      <section id="areas" className="dm-home-areas dm-home-paper" aria-labelledby="dm-home-areas-title">
        <div className="dm-home-shell">
          <div className="dm-home-section-heading">
            <p className="dm-home-eyebrow"><span>02 / 04</span> CUATRO FORMAS DE EXPLORAR</p>
            <div className="dm-home-heading-grid">
              <h2 id="dm-home-areas-title">Del agente al<br />{" "}<em>instrumento.</em></h2>
              <p>Asistentes que conversan, sistemas que coordinan, modelos que se prueban y herramientas que transforman materiales. Entra por el tipo de trabajo que te interesa.</p>
            </div>
          </div>
          <div className="dm-home-area-grid">
            {catalogGroups.map((group, index) => {
              const count = components.filter((component) => component.category === group.id).length;
              return (
                <article id={group.id} className={"dm-home-area dm-home-area-" + group.id} key={group.id} aria-labelledby={"dm-home-" + group.id + "-title"}>
                  <div className="dm-home-area-top">
                    <span>{String(index + 1).padStart(2, "0")} / 04</span>
                    <span>{String(count).padStart(2, "0")} PROYECTOS</span>
                  </div>
                  <div className="dm-home-area-motif" aria-hidden="true">
                    <GroupMotif category={group.id} />
                  </div>
                  <div className="dm-home-area-copy">
                    <h3 id={"dm-home-" + group.id + "-title"}>{group.title}</h3>
                    <p>{group.description}</p>
                    <a href={"/?area=" + group.id + "#catalogo"} aria-label={"Ver proyectos de " + group.title}>
                      Ver proyectos <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dm-home-featured" aria-labelledby="dm-home-featured-title">
        <div className="dm-home-shell">
          <div className="dm-home-section-heading dm-home-section-heading-dark">
            <p className="dm-home-eyebrow"><span>03 / 04</span> SISTEMAS DESTACADOS</p>
            <div className="dm-home-heading-grid">
              <h2 id="dm-home-featured-title">Ideas distintas.<br />{" "}<em>Sistemas reales.</em></h2>
              <p>Una selección de propósitos y escalas: mensajería durable, delegación de tareas, asistencia local y un agente integrado en Ágora. Cada ficha describe su propio sistema.</p>
            </div>
          </div>
          {featured.length > 0 && (
            <div className="dm-home-featured-grid">
              <Link href={"/components/" + featured[0].key} className="dm-home-feature-lead">
                <span className="dm-home-feature-meta">01 / {String(featured.length).padStart(2, "0")} · INFRAESTRUCTURA</span>
                <span className="dm-home-feature-glyph" aria-hidden="true">C<span>V</span>3</span>
                <div className="dm-home-feature-lead-copy">
                  <h3>{featured[0].name}</h3>
                  <p>{featured[0].description}</p>
                  <span className="dm-home-feature-open">Abrir ficha <b aria-hidden="true">↗</b></span>
                </div>
              </Link>
              <div className="dm-home-feature-list">
                {featured.slice(1).map((component, index) => (
                  <Link key={component.key} href={"/components/" + component.key} className="dm-home-feature-row">
                    <span className="dm-home-feature-row-number">{String(index + 2).padStart(2, "0")}</span>
                    <span className="dm-home-feature-row-copy">
                      <span className="dm-home-feature-row-area">{catalogGroups.find((group) => group.id === component.category)?.title}</span>
                      <strong>{component.name}</strong>
                      <span>{component.tagline}</span>
                    </span>
                    <span className="dm-home-feature-arrow" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <p className="dm-home-feature-footnote">SELECCIÓN EDITORIAL / LOS PROYECTOS NO FORMAN UNA ARQUITECTURA ÚNICA</p>
        </div>
      </section>

      <section id="catalogo" className="dm-home-catalog dm-home-paper" aria-labelledby="dm-home-catalog-title">
        <div className="dm-home-shell">
          <div className="dm-home-section-heading">
            <p className="dm-home-eyebrow"><span>04 / 04</span> EL ARCHIVO COMPLETO</p>
            <div className="dm-home-heading-grid">
              <h2 id="dm-home-catalog-title">Encuentra el proyecto.<br />{" "}<em>Abre su ficha.</em></h2>
              <p>Busca por nombre, propósito o tecnología. Filtra por área y tipo de ejecución para llegar a la descripción, los requisitos y la información de acceso a la fuente.</p>
            </div>
          </div>

          <form className="dm-home-search" action="/#catalogo" method="get" role="search" aria-label="Buscar y filtrar proyectos">
            <div className="dm-home-search-field dm-home-search-query">
              <label htmlFor="dm-home-query">Buscar proyectos</label>
              <input id="dm-home-query" name="q" type="search" defaultValue={query} placeholder="Nombre, propósito o tecnología" maxLength={120} />
            </div>
            <div className="dm-home-search-field">
              <label htmlFor="dm-home-area">Área</label>
              <select id="dm-home-area" name="area" defaultValue={area}>
                <option value="all">Todas las áreas</option>
                {catalogGroups.map((group) => <option key={group.id} value={group.id}>{group.title}</option>)}
              </select>
            </div>
            <div className="dm-home-search-field">
              <label htmlFor="dm-home-runtime">Ejecución</label>
              <select id="dm-home-runtime" name="runtime" defaultValue={runtime}>
                <option value="all">Cualquier entorno</option>
                {runtimeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
            <button type="submit">Aplicar filtros <span aria-hidden="true">↗</span></button>
          </form>

          <div className="dm-home-results-heading">
            <p role="status">{visibleComponents.length} de {components.length} proyectos</p>
            {filtersActive && <Link href="/#catalogo">Limpiar filtros <span aria-hidden="true">×</span></Link>}
          </div>

          {visibleComponents.length === 0 ? (
            <div className="dm-home-empty">
              <h3>No hay proyectos con esos filtros.</h3>
              <p>Prueba otra palabra o amplía el área y el tipo de ejecución.</p>
              <Link href="/#catalogo">Ver todo el archivo <span aria-hidden="true">↗</span></Link>
            </div>
          ) : (
            <div className="dm-home-catalog-groups">
              {catalogGroups.map((group) => {
                const projects = visibleComponents.filter((component) => component.category === group.id);
                if (projects.length === 0) return null;
                return (
                  <section key={group.id} className="dm-home-catalog-group" aria-labelledby={"dm-home-catalog-" + group.id}>
                    <div className="dm-home-catalog-group-head">
                      <h3 id={"dm-home-catalog-" + group.id}>{group.title}</h3>
                      <span>{String(projects.length).padStart(2, "0")} / {String(components.filter((component) => component.category === group.id).length).padStart(2, "0")}</span>
                    </div>
                    <div className="dm-home-card-grid">
                      {projects.map((component) => <ComponentCard key={component.key} component={component} />)}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="dm-home-outro" aria-labelledby="dm-home-outro-title">
        <div className="dm-home-shell dm-home-outro-grid">
          <p className="dm-home-eyebrow">FIN DEL ÍNDICE / INICIO DE LA LECTURA</p>
          <h2 id="dm-home-outro-title">La inteligencia también<br />{" "}se <em>examina.</em></h2>
          <a href="#catalogo">Volver al archivo <span aria-hidden="true">↑</span></a>
        </div>
      </section>
    </main>
  );
}
