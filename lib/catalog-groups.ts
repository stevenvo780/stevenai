import type { AIComponent } from "./components-data";

export const catalogGroups: {
  id: AIComponent["category"];
  title: string;
  description: string;
}[] = [
  { id: "assistants", title: "Asistentes y voz", description: "Asistentes personales y la interfaz de escritorio para conversar con ellos." },
  { id: "agents", title: "Modelos y agentes", description: "Inferencia local, servidores MCP y herramientas para revisar código con agentes." },
  { id: "tools", title: "Herramientas y creación", description: "Documentos, seguimiento de cuotas y producción audiovisual asistida por IA." },
];
