"use client";
import dynamic from "next/dynamic";

// Mermaid renders in the browser only (uses DOM APIs + DOMPurify).
// ssr: false is only allowed inside Client Components (Next.js 16+ Turbopack rule).
const MermaidDiagram = dynamic(() => import("./MermaidDiagram"), {
  ssr: false,
  loading: () => (
    <div className="mermaid-wrapper flex items-center justify-center min-h-[200px] text-[var(--muted)] text-sm">
      Cargando diagrama...
    </div>
  ),
});

export default MermaidDiagram;
