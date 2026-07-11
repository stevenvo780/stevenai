"use client";
import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

interface MermaidDiagramProps {
  chart: string;
  id: string;
  ariaLabel?: string;
}

export default function MermaidDiagram({ chart, id, ariaLabel }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        // "base" theme gives full control over themeVariables without dark-theme CSS
        // overrides that silently kill node label contrast.
        theme: "base",
        themeVariables: {
          // --- canvas & backgrounds --- Cloud Atlas palette
          background: "#0f1c20",
          mainBkg: "#11211f",           // default node fill (dark teal-near-black)
          nodeBorder: "#43b5a6",        // teal brand border
          clusterBkg: "#0f1c20",        // subgraph background
          clusterBorder: "#43b5a6",

          // --- node text — must be light on dark fill ---
          primaryColor: "#11211f",      // default node fill (same as mainBkg)
          primaryBorderColor: "#43b5a6",
          primaryTextColor: "#f3ece0",  // light text on dark nodes
          nodeTextColor: "#f3ece0",     // explicit override (Mermaid v11)

          // --- secondary nodes (rhombuses / decision boxes) ---
          secondaryColor: "#132120",
          secondaryBorderColor: "#e0a85e",
          secondaryTextColor: "#f3ece0",

          // --- tertiary nodes (database cylinders etc.) ---
          tertiaryColor: "#0b1417",
          tertiaryBorderColor: "#43b5a6",
          tertiaryTextColor: "#f3ece0",

          // --- edges & labels ---
          lineColor: "#c9c2b6",
          edgeLabelBackground: "#0f1c20",  // avoid transparent bg on arrow labels
          labelTextColor: "#f3ece0",

          // --- cluster/subgraph labels ---
          titleColor: "#43b5a6",

          // --- text sizes ---
          fontSize: "15px",
        },
      });
      if (cancelled || !ref.current) return;
      try {
        const { svg: svgString } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled && ref.current) {
          // Sanitize SVG with DOMPurify to prevent XSS while preserving <foreignObject>
          // for Mermaid v11 labels. Config allows SVG tags and common elements.
          const sanitized = DOMPurify.sanitize(svgString, {
            ALLOWED_TAGS: [
              "svg", "g", "path", "text", "tspan", "rect", "circle", "line", "polyline",
              "polygon", "ellipse", "defs", "style", "marker", "foreignObject", "div",
              "span", "p", "a", "strong", "em", "br",
            ],
            ALLOWED_ATTR: [
              "id", "class", "style", "width", "height", "viewBox", "xmlns",
              "x", "y", "d", "cx", "cy", "r", "x1", "y1", "x2", "y2",
              "fill", "stroke", "stroke-width", "opacity", "font-size",
              "text-anchor", "dominant-baseline", "transform", "data-id",
              "href", "target", "rel", "role", "aria-label",
            ],
          });
          ref.current.innerHTML = sanitized;
          // Ensure SVG inside has proper accessibility attributes
          const svgElement = ref.current.querySelector("svg");
          if (svgElement && !svgElement.getAttribute("role")) {
            svgElement.setAttribute("role", "img");
            svgElement.setAttribute("aria-label", ariaLabel || `Diagrama: ${id}`);
          }
        }
      } catch (e) {
        if (!cancelled && ref.current) {
          const errorMsg = e instanceof Error ? e.message : String(e);
          // Truncate long error messages and show user-friendly error
          const displayMsg = errorMsg.length > 100
            ? `Error rendering diagram: ${errorMsg.substring(0, 97)}...`
            : `Error rendering diagram: ${errorMsg}`;
          const pre = document.createElement("pre");
          pre.className = "text-xs text-red-400 p-4";
          pre.textContent = displayMsg;
          ref.current.replaceChildren(pre);
        }
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, ariaLabel]);

  return (
    <div className="mermaid-wrapper" role="img" aria-label={ariaLabel || `Diagrama: ${id}`}>
      <div ref={ref} className="flex justify-center" />
    </div>
  );
}
