import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagramDynamic";
import HonestNote from "@/components/HonestNote";
import Link from "next/link";
import { components } from "@/lib/components-data";

export const metadata: Metadata = {
  title: "Arquitectura global — StevenAI Suite",
  description:
    "Diagrama de arquitectura completo de la pila IA de Steven Vallejo: RAG, GGUF, MCP Swarm, Agentes, OCR GPU.",
};

const globalDiagram = `graph TD
  Dev[Desarrollador / IDE] -->|MCP stdio| SwarmMCP[MCP Swarm Delegator]
  Dev -->|MCP stdio| AgentsMCP[MCP Autonomous Agents]
  SwarmMCP --> Ollama[(Ollama Local\n16GB VRAM)]
  Ollama --> Planner[Planner deepseek-r1:14b]
  Ollama --> Workers[Workers qwen2.5-coder:14b]
  Ollama --> Reviewer[Reviewer qwen2.5:14b]
  AgentsMCP --> OpenAI[OpenAI API\nGPT-4o / GPT-5]
  Dev -->|Web UI| JarvisV2[Jarvis IA v2\nRAG + Multi-LLM]
  JarvisV2 --> ChromaDB[(ChromaDB\nVector Store)]
  JarvisV2 --> BGE[BGE-M3 Embeddings]
  JarvisV2 --> GPU_V2[(GPU 16GB+\nQwen/LLaMA/DeepSeek)]
  Dev -->|Web UI| ChatGGUF[Chat IA GGUF\nllama-cpp-python]
  ChatGGUF --> GPU_GGUF[(GPU 5GB+\nGGUF Cuantizado)]
  Dev -->|Terminal| JarvisV1[Jarvis IA v1\nNLP Modular]
  JarvisV1 --> NLPModules[NLP Transformers\n+ Mycroft + WolframAlpha]
  User[Usuario final] -->|Documentos| PDFConv[PDF-to-Markdown IA]
  PDFConv --> Surya[Surya OCR Model]
  Surya --> GPU_OCR[(GPU CUDA\nOCR Acelerado)]`;

const layers = [
  {
    title: "Capa IDE / Herramientas de desarrollo",
    color: "teal",
    items: [
      "MCP Swarm Delegator — delega tareas complejas a enjambre local",
      "MCP Autonomous Agents — agentes con contexto de proyecto via OpenAI",
    ],
  },
  {
    title: "Capa de asistentes conversacionales",
    color: "purple",
    items: [
      "Jarvis IA v1 — asistente modular NLP en espanol (CPU)",
      "Jarvis IA v2 — RAG + multi-modelo + voz (GPU 16GB+)",
      "Chat IA GGUF — LLM cuantizado accesible (GPU 5GB+)",
    ],
  },
  {
    title: "Capa de procesamiento de documentos",
    color: "gold",
    items: ["PDF to Markdown IA — OCR GPU con Surya para PDF/DOCX/PPTX"],
  },
  {
    title: "Infraestructura de modelos",
    color: "cyan",
    items: [
      "Ollama local — modelos 14B (deepseek-r1, qwen2.5-coder, qwen2.5)",
      "GGUF via llama-cpp-python — Qwen 7B, LLaMA 8B, Gemma 9B, DeepSeek 7B",
      "ChromaDB + BGE-M3 — vectorstore para RAG",
      "OpenAI API — GPT-4o / GPT-5 / o1 (fallback cloud)",
    ],
  },
];

const colorTextMap: Record<string, string> = {
  teal: "text-[var(--teal-light)]",
  gold: "text-[var(--gold-light)]",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

const colorBorderMap: Record<string, string> = {
  teal: "border-[var(--teal)]",
  gold: "border-[var(--gold)]",
  purple: "border-purple-500",
  cyan: "border-cyan-500",
};

export default function ArchitecturePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-xs text-[var(--muted)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
          Suite
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Arquitectura global</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
        Arquitectura de la StevenAI Suite
      </h1>
      <p className="text-[var(--muted)] max-w-2xl mb-6">
        Vision de alto nivel de como los 6 componentes IA de Steven Vallejo interactuan entre si,
        desde el IDE del desarrollador hasta los modelos GPU locales y la nube.
      </p>

      <div className="mb-6">
        <HonestNote />
      </div>

      {/* Global diagram */}
      <section className="mb-10">
        <MermaidDiagram chart={globalDiagram} id="global-arch" />
      </section>

      {/* Layers */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-5">
          Capas de la arquitectura
        </h2>
        <div className="space-y-4">
          {layers.map((layer) => (
            <div
              key={layer.title}
              className={`bg-[var(--card-bg)] border border-[var(--card-border)] border-l-4 ${colorBorderMap[layer.color]} rounded-xl p-5`}
            >
              <h3 className={`font-semibold mb-2 ${colorTextMap[layer.color]}`}>
                {layer.title}
              </h3>
              <ul className="space-y-1">
                {layer.items.map((item) => (
                  <li key={item} className="text-sm text-[var(--foreground)]/80 flex gap-2">
                    <span className={colorTextMap[layer.color]}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Components quick links */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
          Detalles por componente
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {components.map((c) => (
            <Link
              key={c.key}
              href={`/components/${c.key}`}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 text-sm hover:border-[var(--teal)] transition-colors group"
            >
              <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--teal-light)] transition-colors">
                {c.name}
              </span>
              <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-1">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
