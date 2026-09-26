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
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;
    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        // Native SVG labels survive the SVG sanitizer and remain readable in
        // horizontally scrollable diagrams on narrow screens.
        htmlLabels: false,
        flowchart: { useMaxWidth: false },
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
          // Mermaid necesita atributos SVG de posición y forma (dy, points,
          // marcadores). El perfil SVG conserva su geometría segura y excluye
          // los puntos de integración con HTML.
          const sanitized = DOMPurify.sanitize(svgString, {
            USE_PROFILES: { svg: true, svgFilters: true },
            FORBID_TAGS: ["foreignObject"],
          });
          ref.current.innerHTML = sanitized;
          // Ensure SVG inside has proper accessibility attributes
          const svgElement = ref.current.querySelector("svg");
          if (svgElement && !svgElement.getAttribute("role")) {
            svgElement.setAttribute("role", "img");
            svgElement.setAttribute("aria-label", ariaLabel || `Diagrama: ${id}`);
          }
          const wrapper = ref.current.closest<HTMLElement>(".mermaid-wrapper");
          const hint = wrapper?.parentElement?.querySelector<HTMLElement>(".detail-diagram-scroll-hint");
          if (svgElement && wrapper && hint) {
            const isScrollable = () => wrapper.scrollWidth > wrapper.clientWidth + 2;
            const updateHint = () => hint.toggleAttribute("data-visible", isScrollable());
            resizeObserver = new ResizeObserver(updateHint);
            resizeObserver.observe(wrapper);
            resizeObserver.observe(svgElement);
            frame = requestAnimationFrame(() => {
              updateHint();
              if (window.innerWidth > 720 || !isScrollable()) return;
              // En diagramas anchos, el nodo inicial debe verse al abrir la ficha.
              const root = svgElement.querySelector<SVGGraphicsElement>(".node");
              if (!root) return;
              const viewport = wrapper.getBoundingClientRect();
              const node = root.getBoundingClientRect();
              const center = node.left - viewport.left + wrapper.scrollLeft + node.width / 2;
              wrapper.scrollLeft = Math.max(0, center - wrapper.clientWidth / 2);
            });
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
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
    };
  }, [chart, id, ariaLabel]);

  return (
    <div className="mermaid-wrapper" role="img" aria-label={ariaLabel || `Diagrama: ${id}`}>
      <div ref={ref} className="flex justify-center" />
    </div>
  );
}
