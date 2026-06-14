# StevenAI Suite — Architecture

Portal Next.js 15 (App Router) que vitrinea la pila IA local de Steven Vallejo.
No ejecuta ningun modelo; solo documenta y referencia los repos fuente.

## Estructura del proyecto

```
stevenai-app/
├── app/
│   ├── layout.tsx               # Layout global + NavBar + footer
│   ├── page.tsx                 # Home: hero + grid de componentes + leyenda
│   ├── architecture/
│   │   └── page.tsx             # Diagrama global + capas de arquitectura
│   └── components/
│       └── [key]/
│           └── page.tsx         # Pagina dinamica por componente (generateStaticParams)
├── components/
│   ├── NavBar.tsx               # Navegacion sticky con rutas activas
│   ├── ComponentCard.tsx        # Card con badge de runtime, stack, estado
│   ├── MermaidDiagram.tsx       # Diagrama Mermaid client-side (DOMPurify sanitizado)
│   ├── RuntimeBadge.tsx         # Badge GPU / API / CPU
│   └── HonestNote.tsx           # Aviso honesto sobre demos GPU pendientes
├── lib/
│   └── components-data.ts       # Fuente de verdad: datos de los 6 componentes IA
└── ARCHITECTURE.md              # Este archivo
```

## Componentes documentados

| Clave          | Nombre              | Runtime        | Repo                                              |
|----------------|---------------------|----------------|---------------------------------------------------|
| jarvis-v1      | Jarvis IA v1        | CPU local      | stevenvo780/jarvisIA                              |
| jarvis-v2      | Jarvis IA v2        | GPU 16GB+      | stevenvo780/jarvisIAV2                            |
| ia-gguf        | Chat IA GGUF        | GPU 5GB+       | stevenvo780/IA                                    |
| mcp-swarm      | MCP Swarm Delegator | GPU 16GB+      | stevenvo780/MCP-delegate-agents                   |
| mcp-agents     | MCP Autonomous Agents | API (OpenAI) | stevenvo780/MCPagents                             |
| pdf-converter  | PDF to Markdown IA  | GPU CUDA       | stevenvo780/ConvertPDFToMarkdownIA                |

## Capas de la pila

```
IDE / Herramientas
  └── MCP Swarm Delegator (Ollama local: deepseek-r1 + qwen2.5-coder + qwen2.5)
  └── MCP Autonomous Agents (OpenAI GPT-4o/GPT-5/o1)

Asistentes conversacionales
  └── Jarvis IA v1 (NLP modular, CPU)
  └── Jarvis IA v2 (RAG ChromaDB + BGE-M3, modelos 14B-70B, GPU)
  └── Chat IA GGUF (llama-cpp-python, modelos 7-9B cuantizados, GPU 5GB)

Procesamiento de documentos
  └── PDF to Markdown IA (Surya OCR, GPU CUDA, PDF/DOCX/PPTX)

Infraestructura compartida
  └── Ollama local
  └── ChromaDB vectorstore
  └── CUDA / cuDNN
  └── OpenAI API (fallback cloud)
```

## Nota sobre demos en vivo

Los componentes GPU requieren RTX 2060 (5 GB VRAM minimo) o RTX 5070 Ti (16 GB).
Hostear inferencia GPU en la nube a costo sostenible esta pendiente.
El codigo fuente de cada componente es publico en GitHub bajo stevenvo780.

## Stack del portal

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Mermaid (diagramas de arquitectura, client-side)
- DOMPurify (sanitizacion del SVG generado por Mermaid)
- Vercel (hosting estatico del portal)
