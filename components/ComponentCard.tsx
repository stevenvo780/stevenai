import Link from "next/link";
import { ProjectMotif } from "@/components/visual/ProjectMotif";
import { catalogGroups } from "@/lib/catalog-groups";
import { components, type AIComponent } from "@/lib/components-data";
import "@/app/styles/detail.css";

interface ComponentCardProps {
  component: AIComponent;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const number = components.findIndex((item) => item.key === component.key) + 1;
  const group = catalogGroups.find((item) => item.id === component.category);

  return (
    <Link
      href={`/components/${component.key}`}
      className="component-card"
      data-category={component.category}
    >
      <div className="component-card-visual">
        <div className="component-card-visual-top">
          <span>{String(number).padStart(2, "0")}</span>
          <span>Motivo conceptual</span>
        </div>
        <ProjectMotif projectKey={component.key} category={component.category} />
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
