"use client";
import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

interface MermaidDiagramProps {
  chart: string;
  id: string;
}

export default function MermaidDiagram({ chart, id }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#111827",
          primaryColor: "#0d9488",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#0f766e",
          lineColor: "#64748b",
          secondaryColor: "#1f2d3d",
          tertiaryColor: "#0a0f1a",
        },
      });
      if (cancelled || !ref.current) return;
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled && ref.current) {
          // Sanitize the SVG output before injecting it into the DOM.
          // USE_PROFILES.svg allowlists only SVG-safe attributes/tags (no script, no event handlers).
          const clean = DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } });
          ref.current.innerHTML = clean;
        }
      } catch (e) {
        if (!cancelled && ref.current) {
          // Error message is plain text — set via textContent, never innerHTML.
          const pre = document.createElement("pre");
          pre.className = "text-xs text-red-400 p-4";
          pre.textContent = String(e);
          ref.current.replaceChildren(pre);
        }
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div className="mermaid-wrapper">
      <div ref={ref} className="flex justify-center" />
    </div>
  );
}
