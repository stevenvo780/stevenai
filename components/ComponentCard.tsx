import Link from "next/link";
import { AIComponent } from "@/lib/components-data";
import RuntimeBadge from "./RuntimeBadge";

interface ComponentCardProps {
  component: AIComponent;
}

const colorAccent: Record<AIComponent["color"], string> = {
  teal: "border-t-[var(--teal)]",
  gold: "border-t-[var(--gold)]",
  purple: "border-t-purple-500",
  cyan: "border-t-cyan-500",
};

const statusDot: Record<AIComponent["status"], string> = {
  "live-local": "bg-green-500",
  "demo-pending": "bg-yellow-500",
  available: "bg-blue-400",
};

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link href={`/components/${component.key}`} className="block group">
      <div
        className={`bg-[var(--card-bg)] border border-[var(--card-border)] border-t-2 ${colorAccent[component.color]} rounded-xl p-5 card-glow h-full transition-transform duration-200 group-hover:-translate-y-1`}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-[var(--foreground)] text-base leading-tight">
            {component.name}
          </h3>
          <span
            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${statusDot[component.status]}`}
            title={component.statusLabel}
          />
        </div>
        <p className="text-[var(--muted)] text-xs mb-3 italic">{component.tagline}</p>
        <p className="text-sm text-[var(--foreground)]/80 mb-4 line-clamp-3">
          {component.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {component.stack.slice(0, 4).map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
          {component.stack.length > 4 && (
            <span className="tag">+{component.stack.length - 4}</span>
          )}
        </div>
        <RuntimeBadge runtime={component.runtime} label={component.runtimeLabel} />
        <div className="mt-3 text-xs text-[var(--muted)]">
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full mr-1 mb-0.5 ${statusDot[component.status]}`}
          />
          {component.statusLabel}
        </div>
      </div>
    </Link>
  );
}
