import type { AIComponent } from "./components-data";

export const catalogGroups: {
  id: AIComponent["category"];
  title: string;
  description: string;
}[] = [
  { id: "assistants", title: "Asistentes y voz", description: "Asistentes conversacionales y sus interfaces de voz o escritorio." },
  { id: "infrastructure", title: "Infraestructura para agentes", description: "Buses, servidores MCP y harnesses que conectan o coordinan agentes." },
  { id: "models", title: "Inferencia y experimentos", description: "Aplicaciones de inferencia local y experimentos de entrenamiento de redes neuronales." },
  { id: "tools", title: "Herramientas y creación", description: "Documentos, seguimiento de cuotas y producción visual asistida por IA." },
];
