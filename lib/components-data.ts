export interface AIComponent {
  key: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  repo: string;
  runtime: "gpu-local" | "api" | "local-cpu";
  runtimeLabel: string;
  status: "live-local" | "demo-pending" | "available";
  statusLabel: string;
  stack: string[];
  capabilities: string[];
  hardwareRequirements?: string;
  architectureDescription: string;
  mermaidDiagram: string;
  color: "teal" | "gold" | "purple" | "cyan";
}

export const components: AIComponent[] = [
  {
    key: "jarvis-v1",
    name: "Jarvis IA v1",
    tagline: "El asistente original — arquitectura cerebro modular",
    description:
      "Primera iteración del asistente personal en español. Inspirado en el cerebro humano: corteza OS, lóbulos NLP, sistema de memoria, ego de respuesta y pesos emocionales para personalizar interacciones.",
    longDescription:
      "Jarvis v1 es una arquitectura modular Node.js que emula partes del cerebro humano. Cuenta con un módulo 'Corteza' que controla el sistema operativo, 'Lóbulos Procesativos' que albergan múltiples modelos NLP de transformers y un lector Mycroft, 'Gestión de Memoria' con aprendizaje continuo, y el 'Ego' como controlador de respuestas. Se integra con Betty (comandos OS en lenguaje natural) y WolframAlpha para matemáticas.",
    repo: "https://github.com/stevenvo780/jarvisIA",
    runtime: "local-cpu",
    runtimeLabel: "Local CPU / NLP ligero",
    status: "available",
    statusLabel: "Código disponible",
    stack: ["Node.js", "NLP.js", "Python", "Mycroft", "WolframAlpha", "HuggingFace API"],
    capabilities: [
      "Procesamiento de lenguaje natural en español",
      "Ejecución de comandos del sistema operativo",
      "Aprendizaje continuo por retroalimentación",
      "Sistema de pesos emocionales para personalizar respuestas",
      "Integración con terminal (Betty)",
      "Resolución matemática via WolframAlpha",
      "Texto a voz (TTS) en español",
    ],
    architectureDescription:
      "Arquitectura modular inspirada en el cerebro humano con separación clara de responsabilidades entre percepción, procesamiento y respuesta.",
    mermaidDiagram: `graph TD
    User([Usuario]) --> Jarvis[Jarvis - Iniciador]
    Jarvis --> Ego[EGO - Controlador de Respuestas]
    Ego --> Corteza[Corteza - Control OS]
    Ego --> Lobulos[Lobulos Procesativos]
    Ego --> GestMem[Gestión de Memoria]
    Lobulos --> NLP[NLP Transformers]
    Lobulos --> Mycroft[Mycroft Reader]
    Corteza --> Betty[Betty - Comandos OS]
    Corteza --> Terminal[Terminal]
    GestMem --> Memoria[(Memoria / Aprendizaje)]
    NLP --> Wolfram[WolframAlpha]
    NLP --> HF[HuggingFace API]`,
    color: "teal",
  },
  {
    key: "jarvis-v2",
    name: "Jarvis IA v2",
    tagline: "Asistente RAG avanzado — multi-modelo, voz, GPU",
    description:
      "Versión avanzada con interfaz web tipo ChatGPT, sistema RAG sobre ChromaDB con embeddings BGE-M3, selección automática de modelo por dificultad de query, TTS/STT y monitoreo GPU en tiempo real.",
    longDescription:
      "JarvisIAV2 es un asistente completo que corre en hardware local con GPU. Soporta múltiples LLMs (Qwen2.5-14B/32B, LLaMA 3.1 70B, DeepSeek 14B) con selección automática según complejidad de la consulta. El sistema RAG usa ChromaDB y embeddings BGE-M3 para recuperación semántica. Incluye interfaz web moderna con tema oscuro, historial de chat, indicadores de estado GPU, y capacidades de voz bidireccionalmente.",
    repo: "https://github.com/stevenvo780/jarvisIAV2",
    runtime: "gpu-local",
    runtimeLabel: "GPU Local (16GB+ VRAM recomendado)",
    status: "demo-pending",
    statusLabel: "Demo GPU pendiente de hosting",
    stack: [
      "Python 3.10+",
      "FastAPI",
      "ChromaDB",
      "BGE-M3 Embeddings",
      "Qwen2.5-14B/32B",
      "LLaMA 3.1 70B",
      "DeepSeek 14B",
      "CUDA 11.8+",
      "Docker",
    ],
    capabilities: [
      "RAG con ChromaDB y embeddings BGE-M3",
      "Selección automática de modelo por dificultad",
      "Interfaz web moderna tipo ChatGPT",
      "TTS y STT (voz bidireccional)",
      "Monitoreo GPU en tiempo real",
      "Carga/descarga dinámica de modelos sin reiniciar",
      "Soporte multi-modelo: Qwen, LLaMA, DeepSeek",
      "API REST para integración con otros sistemas",
    ],
    hardwareRequirements: "RTX 3090/4090/5070 Ti | 16GB+ VRAM | 32GB+ RAM | CUDA 11.8+",
    architectureDescription:
      "Pipeline RAG completo con selección inteligente de modelo, base de vectores ChromaDB, y servicio web FastAPI.",
    mermaidDiagram: `graph TD
    UI[Web UI - ChatGPT Style] --> API[FastAPI Backend]
    API --> Orchestrator[Orchestrator]
    Orchestrator --> Selector{Selector por dificultad}
    Selector -->|Simple| Qwen14[Qwen2.5-14B-AWQ]
    Selector -->|Complejo| Qwen32[Qwen2.5-32B-GPTQ]
    Selector -->|Razonamiento| LLaMA[LLaMA 3.1 70B]
    Selector -->|Codigo| DS[DeepSeek 14B]
    Orchestrator --> RAG[RAG Pipeline]
    RAG --> Embed[BGE-M3 Embeddings]
    RAG --> ChromaDB[(ChromaDB Vector Store)]
    API --> Voice[TTS / STT]
    API --> Monitor[GPU Monitor - CUDA]`,
    color: "teal",
  },
  {
    key: "ia-gguf",
    name: "Chat IA Local GGUF",
    tagline: "LLM cuantizado GGUF sobre llama.cpp — 5 GB VRAM",
    description:
      "App de chat local optimizada para GPUs con ~5 GB VRAM. Usa modelos GGUF cuantizados (Qwen2.5-7B, LLaMA 3.1 8B, Gemma 2 9B, DeepSeek-R1) vía llama-cpp-python con aceleración CUDA.",
    longDescription:
      "Solución de LLM local diseñada para hardware accesible. Corre Qwen2.5-7B-Instruct en Q4_K_M (~4.6 GB VRAM) en una RTX 2060 con tokens de alta calidad. Soporta multi-GPU vía tensor_split, cambio dinámico de modelo desde la UI sin reiniciar el servidor, y múltiples puertos para distintos modelos simultáneos. Backend FastAPI + UI web incluida.",
    repo: "https://github.com/stevenvo780/IA",
    runtime: "gpu-local",
    runtimeLabel: "GPU Local (5 GB VRAM mínimo, RTX 2060+)",
    status: "demo-pending",
    statusLabel: "Demo GPU pendiente de hosting",
    stack: [
      "Python 3.10+",
      "llama-cpp-python",
      "FastAPI",
      "CUDA / cuDNN",
      "Qwen2.5-7B GGUF",
      "LLaMA 3.1 8B GGUF",
      "Gemma 2 9B GGUF",
      "DeepSeek-R1 GGUF",
    ],
    capabilities: [
      "Inferencia LLM cuantizada GGUF (Q4_K_M)",
      "Aceleración GPU NVIDIA con CUDA",
      "Soporte multi-GPU con tensor_split",
      "Cambio dinámico de modelo sin reiniciar",
      "Múltiples instancias en distintos puertos",
      "UI web de chat incluida",
      "Fallback CPU automático",
    ],
    hardwareRequirements: "RTX 2060+ | 5 GB VRAM mínimo | CUDA + cuDNN | Linux / WSL2",
    architectureDescription:
      "Server FastAPI con llama-cpp-python como motor de inferencia GGUF, con gestión de modelos y API REST.",
    mermaidDiagram: `graph TD
    UI[Web UI Chat] --> FastAPI[FastAPI Server]
    FastAPI --> ModelMgr[Model Manager]
    ModelMgr --> GGUF[llama-cpp-python]
    GGUF --> CUDA{CUDA Offload}
    CUDA -->|N_GPU_LAYERS=-1| GPU1[GPU 0 - RTX 2060]
    CUDA -->|tensor_split| GPU2[GPU 1 - Multi-GPU]
    ModelMgr --> Models[(GGUF Models)]
    Models --> Qwen7B[Qwen2.5-7B Q4_K_M]
    Models --> LLaMA8B[LLaMA 3.1 8B Q4_K_M]
    Models --> Gemma9B[Gemma 2 9B Q4_K_M]
    Models --> DS7B[DeepSeek-R1 7B Q4_K_M]`,
    color: "purple",
  },
  {
    key: "mcp-swarm",
    name: "MCP Swarm Delegator",
    tagline: "Enjambre local Planner-Worker-Reviewer via MCP",
    description:
      "Servidor MCP que expone herramientas a Copilot y Cursor para delegar tareas complejas a un enjambre de LLMs locales en Ollama. Pipeline Planner (deepseek-r1:14b) → Workers paralelos (qwen2.5-coder:14b) → Reviewer (qwen2.5:14b).",
    longDescription:
      "MCP-delegate-agents implementa el patrón Planner-Workers-Reviewer sobre Ollama local. El Planner razona y genera un plan JSON; los Workers ejecutan tareas en paralelo (código, tests, documentación); el Reviewer consolida y valida. Diseñado para RTX 5070 Ti con modelos de 14B que caben íntegros en 16 GB VRAM. Se conecta como servidor MCP stdio a VS Code / Copilot Chat.",
    repo: "https://github.com/stevenvo780/MCP-delegate-agents",
    runtime: "gpu-local",
    runtimeLabel: "GPU Local (16 GB VRAM, RTX 5070 Ti)",
    status: "demo-pending",
    statusLabel: "Demo GPU pendiente de hosting",
    stack: [
      "TypeScript / Node.js",
      "MCP Protocol (stdio)",
      "Ollama",
      "deepseek-r1:14b",
      "qwen2.5-coder:14b",
      "qwen2.5:14b",
      "VS Code Copilot",
    ],
    capabilities: [
      "Servidor MCP stdio para Copilot / Cursor",
      "Planeación automática de tareas complejas (JSON)",
      "Ejecución paralela de Workers especializados",
      "Revision y consolidacion por LLM Reviewer",
      "Verificacion de disponibilidad de Ollama",
      "Listado dinámico de modelos instalados",
      "Inyeccion de config MCP en VS Code automaticamente",
    ],
    hardwareRequirements: "RTX 5070 Ti | 16 GB VRAM | Ollama corriendo localmente",
    architectureDescription:
      "Enjambre de agentes LLM locales con patrón Planner-Workers-Reviewer, expuesto vía protocolo MCP para integración con IDEs.",
    mermaidDiagram: `graph TD
    Copilot[VS Code Copilot / Cursor] -->|MCP stdio| Server[MCP Swarm Server]
    Server --> delegate_run[delegate_run tool]
    delegate_run --> Planner[Planner - deepseek-r1:14b]
    Planner -->|Plan JSON| Workers[Workers Paralelos]
    Workers --> W1[Worker 1 - qwen2.5-coder:14b]
    Workers --> W2[Worker 2 - qwen2.5-coder:14b]
    Workers --> W3[Worker N - qwen2.5-coder:14b]
    W1 --> Reviewer[Reviewer - qwen2.5:14b]
    W2 --> Reviewer
    W3 --> Reviewer
    Reviewer --> Result[Respuesta Final]
    Server --> status[get_agent_status]
    Server --> models[list_available_models]
    Planner & Workers & Reviewer --> Ollama[(Ollama Local - 16GB VRAM)]`,
    color: "gold",
  },
  {
    key: "mcp-agents",
    name: "MCP Autonomous Agents",
    tagline: "Servidor MCP con agentes autónomos — OpenAI + REST",
    description:
      "Servidor MCP dual (stdio + HTTP) con agentes autónomos integrados con OpenAI. Herramientas de análisis de código, contexto automático de proyecto y endpoints REST para integración web.",
    longDescription:
      "MCPagents expone dos servidores: uno MCP stdio para VS Code y Claude Desktop, y uno HTTP REST para integraciones web. Los agentes incluyen contexto automático del proyecto (estructura, git, archivos principales) en cada llamada. Soporta todos los modelos OpenAI (GPT-4o, GPT-5, o1) con control de temperatura y tokens. Incluye herramientas especializadas de análisis y optimización de código.",
    repo: "https://github.com/stevenvo780/MCPagents",
    runtime: "api",
    runtimeLabel: "API Cloud (OpenAI)",
    status: "available",
    statusLabel: "Disponible — requiere OPENAI_API_KEY",
    stack: [
      "TypeScript / Node.js",
      "MCP Protocol",
      "OpenAI API (GPT-4o, GPT-5, o1)",
      "Express / HTTP",
      "Docker",
    ],
    capabilities: [
      "Servidor MCP stdio para VS Code y Claude Desktop",
      "API REST HTTP para integraciones web",
      "Contexto automático de proyecto (git, estructura, archivos)",
      "Análisis avanzado de código con IA",
      "Soporte a todos los modelos OpenAI",
      "Endpoint JSON-RPC compatible con MCP",
      "Modo streaming de respuestas",
      "Stress testing incluido",
    ],
    architectureDescription:
      "Servidor dual MCP/HTTP con contexto automático de proyecto, conectado a la API de OpenAI para capacidades de agente autónomo.",
    mermaidDiagram: `graph TD
    VsCode[VS Code / Claude Desktop] -->|MCP stdio| StdioServer[MCP Stdio Server]
    WebClient[Web Client] -->|HTTP REST| WebServer[Web HTTP Server]
    StdioServer & WebServer --> AgentCore[Agent Core]
    AgentCore --> CtxBuilder[Context Builder]
    CtxBuilder --> GitCtx[Git Context]
    CtxBuilder --> FileCtx[File Structure]
    AgentCore --> Tools[MCP Tools]
    Tools --> AskTool[autonomous_ask]
    Tools --> AnalyzeTool[analyze_code]
    AgentCore --> OpenAI[OpenAI API]
    OpenAI --> GPT4o[GPT-4o]
    OpenAI --> GPT5[GPT-5]
    OpenAI --> O1[o1-preview]`,
    color: "cyan",
  },
  {
    key: "pdf-converter",
    name: "PDF to Markdown IA",
    tagline: "Conversor OCR GPU — PDF/DOCX/PPTX a Markdown con Surya",
    description:
      "Conversor de documentos a Markdown con OCR acelerado por GPU usando el modelo Surya. Arquitectura separada en Backend API, Worker GPU y Frontend para maxima estabilidad. Soporta PDF, DOCX y PPTX.",
    longDescription:
      "ConvertPDFToMarkdownIA usa el modelo de OCR Surya con aceleración CUDA para extraer y convertir documentos complejos (PDFs con imágenes, presentaciones, Word) a Markdown limpio. La arquitectura en tres capas evita bloqueos de UI: Backend API sin GPU para orquestación, Worker GPU dedicado para procesamiento, y Frontend estático. Configurable vía variables de entorno para forzar CPU o deshabilitar OCR.",
    repo: "https://github.com/stevenvo780/ConvertPDFToMarkdownIA",
    runtime: "gpu-local",
    runtimeLabel: "GPU Local (CUDA, RTX recomendado) + fallback CPU",
    status: "demo-pending",
    statusLabel: "Demo GPU pendiente de hosting",
    stack: [
      "Python 3.10+",
      "Surya OCR",
      "FastAPI",
      "CUDA / PyTorch",
      "pdfminer / python-docx / python-pptx",
    ],
    capabilities: [
      "OCR acelerado por GPU con modelo Surya",
      "Conversión de PDF, DOCX y PPTX a Markdown",
      "Arquitectura desacoplada Backend/Worker/Frontend",
      "Procesamiento batch de múltiples documentos",
      "Modo CPU forzado (PDF2MD_FORCE_CPU=1)",
      "Timeout y límite de tamaño configurables",
      "CORS configurable para UI separada",
      "Health checks por capa independientes",
    ],
    hardwareRequirements: "GPU NVIDIA con CUDA (recomendado) | fallback CPU disponible",
    architectureDescription:
      "Arquitectura en tres capas independientes: API de orquestación, Worker GPU de procesamiento OCR, y Frontend estático.",
    mermaidDiagram: `graph TD
    Frontend[Frontend Estático :5173] -->|API calls| BackendAPI[Backend API :8001]
    BackendAPI --> Queue[Job Queue]
    Queue --> Worker[GPU Worker]
    Worker --> Surya[Surya OCR Model]
    Surya --> CUDA{CUDA disponible?}
    CUDA -->|Si| GPU[GPU NVIDIA]
    CUDA -->|No| CPU[CPU Fallback]
    Worker --> Parsers[Document Parsers]
    Parsers --> PDF[pdfminer - PDF]
    Parsers --> Docx[python-docx - DOCX]
    Parsers --> Pptx[python-pptx - PPTX]
    Worker --> Storage[(Markdown Output)]`,
    color: "gold",
  },
];

export function getComponentByKey(key: string): AIComponent | undefined {
  return components.find((c) => c.key === key);
}
