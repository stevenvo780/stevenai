import Link from "next/link";
import { ProjectMotif } from "@/components/visual/ProjectMotif";
import { catalogGroups } from "@/lib/catalog-groups";
import { components, type AIComponent } from "@/lib/components-data";
import "@/app/styles/detail.css";

interface ComponentCardProps {
  component: AIComponent;
  compact?: boolean;
}

export default function ComponentCard({ component, compact = false }: ComponentCardProps) {
  const number = components.findIndex((item) => item.key === component.key) + 1;
  const group = catalogGroups.find((item) => item.id === component.category);

  if (compact) {
    return (
      <Link
        href={`/components/${component.key}`}
        className="dm-home-project-row"
        data-category={component.category}
      >
        <span className="dm-home-project-row-index">{String(number).padStart(2, "0")}</span>
        <span className="dm-home-project-row-copy">
          <strong>{component.name}</strong>
          <span className="dm-home-project-row-tagline">{component.tagline}</span>
          <span className="dm-home-project-row-description">{component.description}</span>
        </span>
        <span className="dm-home-project-row-state">{component.statusLabel}</span>
        <span className="dm-home-project-row-arrow" aria-hidden="true">↗</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/components/${component.key}`}
      className="component-card"
      data-category={component.category}
      data-layout="feature"
    >
      <div className="component-card-visual">
        <div className="component-card-visual-top">
          <span>{String(number).padStart(2, "0")}</span>
          <span>Motivo conceptual</span>
        </div>
        <ProjectMotif projectKey={component.key} category={component.category} compact />
      </div>
      <div className="component-card-body">
        <p className="component-card-category">{group?.title ?? "Proyecto"}</p>
        <h4>{component.name}</h4>
        <p className="component-card-tagline">{component.tagline}</p>
        <p className="component-card-description">{component.description}</p>
        <div className="component-card-footer">
          <span className="component-card-state">{component.statusLabel}</span>
          <span className="component-card-arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </Link>
  );
}
