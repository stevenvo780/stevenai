export interface AIComponent {
  key: string; // Must match regex: ^[a-z0-9-]+$ (alphanumeric + hyphens only)
  name: string;
  category: "assistants" | "models" | "infrastructure" | "tools";
  tagline: string;
  description: string;
  longDescription: string;
  repo: string;
  sourceAccess?: "private"; // Omitted for public repositories
  runtime: "gpu-local" | "api" | "local-cpu" | "service";
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

// Validates that a key is safe for URL paths (alphanumeric + hyphens only)
function isValidComponentKey(key: string): key is string {
  return /^[a-z0-9-]+$/.test(key);
}

export const components: AIComponent[] = [
  {
    key: "jarvis-v1",
    name: "Jarvis IA v1",
    category: "assistants",
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
    category: "assistants",
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
    category: "models",
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
    category: "infrastructure",
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
    category: "infrastructure",
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
    category: "tools",
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
  {
    key: "kratos-jarvis",
    name: "Kratos Jarvis",
    category: "assistants",
    tagline: "Asistente personal por voz, alojado en casa",
    description:
      "Sistema personal sobre OpenClaw con transcripción Whisper y voz Kokoro locales. Combina un filtro de relevancia, visión de pantalla bajo pedido y automatizaciones de seguimiento.",
    longDescription:
      "El repositorio publica una versión saneada del sistema que opera en un equipo doméstico. Reúne escucha con VAD, un filtro local que decide si una frase va dirigida al asistente, transcripción Whisper, respuestas habladas con Kokoro, visión de pantalla bajo pedido, herramientas MCP y rutinas de asesoría y supervisión. Es una referencia de una instalación particular, no un instalador universal.",
    repo: "https://github.com/stevenvo780/kratos-jarvis",
    runtime: "gpu-local",
    runtimeLabel: "Servidor local con GPU y OpenClaw",
    status: "live-local",
    statusLabel: "Sistema local; referencia pública",
    stack: ["OpenClaw", "Whisper", "Kokoro", "Ollama", "MCP", "Python"],
    capabilities: [
      "Conversación por voz con transcripción y síntesis locales",
      "Filtro de relevancia para evitar respuestas a conversaciones ajenas",
      "Visión de pantalla activada bajo pedido",
      "Asesoría apoyada en decisiones y documentos propios",
      "Rutinas de actividad y supervisión de servicios",
    ],
    hardwareRequirements: "Equipo local con GPU para la pila de voz; OpenClaw y servicios auxiliares",
    architectureDescription:
      "La voz entra por VAD y Whisper, pasa por un filtro local de relevancia y llega al agente OpenClaw; Kokoro reproduce la respuesta. La visión se activa bajo pedido.",
    mermaidDiagram: `graph LR
    Voz[Voz] --> VAD[VAD]
    VAD --> Whisper[Whisper local]
    Whisper --> Filtro[Filtro de relevancia]
    Filtro --> OpenClaw[Agente OpenClaw]
    OpenClaw --> Kokoro[Kokoro TTS]
    Pantalla[Pantalla bajo pedido] --> OpenClaw
    MCP[Herramientas MCP] --> OpenClaw`,
    color: "teal",
  },
  {
    key: "clawbar",
    name: "clawbar",
    category: "assistants",
    tagline: "Voz y estado del agente en Waybar",
    description:
      "Integración de escritorio para hablar con un agente OpenClaw y ver si escucha, transcribe, piensa o responde. Incluye detección de silencio y visión de pantalla bajo pedido.",
    longDescription:
      "clawbar conecta un escritorio Wayland con un agente OpenClaw en Docker. Permite pulsar para hablar o usar detección de voz, transcribe mediante Whisper, recibe la respuesta del agente y la reproduce con Kokoro. Un módulo de Waybar muestra la fase activa. Funciona como integración fina alrededor del agente y del servicio de audio, sin modificar su contenedor.",
    repo: "https://github.com/stevenvo780/clawbar",
    runtime: "local-cpu",
    runtimeLabel: "Escritorio Linux; audio local aparte",
    status: "available",
    statusLabel: "Código e instalador disponibles",
    stack: ["Waybar", "Hyprland", "OpenClaw", "Whisper", "Kokoro", "Docker"],
    capabilities: [
      "Pulsar para hablar o detener por silencio con VAD",
      "Estado visible en Waybar durante cada fase de la conversación",
      "Captura de pantalla solo cuando se solicita",
      "Respuesta hablada mediante síntesis de voz",
      "Instalación reversible con copias de seguridad",
    ],
    hardwareRequirements: "Escritorio Linux con Waybar, Docker, agente OpenClaw y servicio de audio",
    architectureDescription:
      "El escritorio captura voz y muestra el estado; un servicio de audio transcribe y sintetiza, mientras OpenClaw procesa la solicitud.",
    mermaidDiagram: `graph LR
    Microfono[Micrófono] --> VAD[VAD]
    VAD --> Audio[Whisper STT]
    Audio --> Agent[OpenClaw en Docker]
    Agent --> TTS[Kokoro TTS]
    TTS --> Altavoces[Altavoces]
    Agent --> Barra[Estado en Waybar]`,
    color: "cyan",
  },
  {
    key: "night-harness",
    name: "night-harness",
    category: "infrastructure",
    tagline: "Búsqueda y validación de errores con agentes",
    description:
      "Harness experimental para revisar proyectos Next.js y TypeScript con modelos locales y externos. Filtra hallazgos, prueba correcciones en un worktree aislado y deja la integración final a una persona.",
    longDescription:
      "Nació de un proyecto concreto y requiere adaptación antes de usarlo en otro repositorio. Combina cazadores de posibles errores, filtros y revisión de hipótesis; los cambios candidatos deben superar typecheck y pruebas E2E en navegador dentro de un worktree aislado. Consulta ai-usage-live para escoger modelos según la cuota disponible. El merge queda manual.",
    repo: "https://github.com/stevenvo780/night-harness",
    runtime: "local-cpu",
    runtimeLabel: "Local; modelos y CLI configurados aparte",
    status: "available",
    statusLabel: "Código de referencia disponible",
    stack: ["Python", "Ollama", "TypeScript", "Playwright", "Git worktree", "ai-usage-live"],
    capabilities: [
      "Búsqueda de posibles errores con modelos locales",
      "Refutación y revisión de hallazgos antes de editar",
      "Correcciones aisladas en un worktree",
      "Validación con typecheck y E2E de navegador",
      "Selección de modelos informada por cuotas",
    ],
    hardwareRequirements: "Proyecto Next.js/TypeScript adaptable, modelos locales y CLI compatibles",
    architectureDescription:
      "Las hipótesis pasan por filtros y revisión; una corrección candidata se valida con pruebas dentro de un worktree antes de integrarse manualmente.",
    mermaidDiagram: `graph LR
    Repo[Repositorio] --> Hunter[Cazadores]
    Hunter --> Filter[Filtro y refutación]
    Filter --> Fixer[Corrección en worktree]
    Fixer --> Gates[Typecheck y E2E]
    Gates --> Review[Revisión e integración manual]
    Quota[ai-usage-live] --> Hunter`,
    color: "purple",
  },
  {
    key: "ai-usage-live",
    name: "ai-usage-live",
    category: "tools",
    tagline: "Cuotas de asistentes de código en una TUI",
    description:
      "Panel de terminal que reúne consumo y cuotas de Claude Code, Codex, Gemini y otros proveedores. También ofrece salida JSON y un servidor MCP para consultar disponibilidad.",
    longDescription:
      "La TUI consulta las cuotas que cada CLI o servicio permite ver, conserva caché con marca de frescura y distingue cuentas no configuradas de cuotas agotadas. La salida JSON y el servidor MCP permiten a otros agentes elegir un proveedor disponible. Algunas fuentes usan estimaciones o valores manuales cuando no existe una cuota en vivo.",
    repo: "https://github.com/stevenvo780/ai-usage-live",
    runtime: "local-cpu",
    runtimeLabel: "Terminal local; CLI autenticados por separado",
    status: "available",
    statusLabel: "Código y paquete disponibles",
    stack: ["Node.js", "Python", "TUI", "MCP", "JSON", "SQLite"],
    capabilities: [
      "Vista conjunta de consumo y cuotas por proveedor",
      "Marca de frescura y caché de los datos",
      "Salida JSON para scripts y agentes",
      "Servidor MCP para consultar disponibilidad",
      "Oculta proveedores no configurados sin confundirlos con los agotados",
    ],
    architectureDescription:
      "Consulta fuentes locales y de los proveedores, normaliza su disponibilidad y la muestra en TUI, JSON o MCP.",
    mermaidDiagram: `graph LR
    CLI[CLI y servicios] --> Probe[Consultas de cuota]
    Probe --> Cache[Caché con frescura]
    Cache --> TUI[Panel TUI]
    Cache --> JSON[Salida JSON]
    Cache --> MCP[Servidor MCP]`,
    color: "teal",
  },
  {
    key: "reel-forge",
    name: "reel-forge",
    category: "tools",
    tagline: "Vídeos verticales a partir de una configuración",
    description:
      "Generador de reels MP4 con gráficos WebGL, narración local Piper, música MusicGen y subtítulos. Renderiza los fotogramas con Playwright y compone el vídeo con ffmpeg.",
    longDescription:
      "Un archivo JSON define la marca, el guion, el tema visual y el audio. reel-forge crea la narración con Piper, la música con MusicGen, captura fotogramas de una escena Three.js en Chrome y compone un MP4 vertical con ffmpeg. Incluye temas visuales y un ejemplo reproducible; requiere instalar las dependencias locales.",
    repo: "https://github.com/stevenvo780/reel-forge",
    runtime: "local-cpu",
    runtimeLabel: "Render local con Chrome y ffmpeg",
    status: "available",
    statusLabel: "Código y demo reproducible",
    stack: ["Node.js", "Three.js", "Piper", "MusicGen", "Playwright", "ffmpeg"],
    capabilities: [
      "Generación de vídeo vertical 9:16",
      "Escenas WebGL con temas intercambiables",
      "Narración local y música generativa",
      "Subtítulos animados y salida MP4",
      "Render fotograma a fotograma reproducible",
    ],
    hardwareRequirements: "Chrome, Node.js, Python y ffmpeg; render sin GPU obligatoria",
    architectureDescription:
      "Una configuración JSON genera audio y escenas visuales; Playwright captura los fotogramas y ffmpeg ensambla el vídeo final.",
    mermaidDiagram: `graph LR
    Config[Configuración JSON] --> Piper[Piper voz]
    Config --> MusicGen[MusicGen música]
    Config --> Scene[Three.js escenas]
    Scene --> Frames[Playwright fotogramas]
    Piper --> FFmpeg[ffmpeg]
    MusicGen --> FFmpeg
    Frames --> FFmpeg
    FFmpeg --> Video[MP4 vertical]`,
    color: "gold",
  },
  {
    key: "cauce-v3",
    name: "Cauce V3",
    category: "infrastructure",
    tagline: "Mensajería durable para una flota de agentes",
    description:
      "Bus de comunicación entre agentes que usan Claude Code, Codex u OpenClaw. Entrega mensajes por WebSocket, conserva estado en PostgreSQL y ofrece consola de operador.",
    longDescription:
      "Cauce V3 es un monorepo TypeScript y Python para coordinar agentes en distintos entornos. Su gateway recibe y entrega mensajes, PostgreSQL conserva el estado durable y los adaptadores conectan las sesiones de los agentes. Incluye consola de operador, puente de Telegram, monitor MCP y herramientas de operación. El repositorio público documenta la arquitectura; una instalación real requiere su propia infraestructura y configuración.",
    repo: "https://github.com/stevenvo780/cauce-v3",
    runtime: "service",
    runtimeLabel: "Servidor propio con PostgreSQL y agentes conectados",
    status: "available",
    statusLabel: "Código público; operación propia",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "WebSocket", "React", "Python"],
    capabilities: [
      "Mensajes durables entre agentes y runtimes distintos",
      "Adaptadores para sesiones de CLI",
      "Gateway HTTP y WebSocket con almacenamiento PostgreSQL",
      "Consola de operador y puente de Telegram",
      "Monitor MCP para observar la flota",
    ],
    hardwareRequirements: "Node.js 22, pnpm, PostgreSQL y despliegue de los servicios propios",
    architectureDescription:
      "Los adaptadores conectan agentes con el gateway; PostgreSQL guarda el estado y la consola permite observar la operación.",
    mermaidDiagram: `graph LR
    Agents[Agentes CLI] --> Adapter[Adaptadores]
    Adapter --> Gateway[Gateway HTTP y WS]
    Gateway --> Store[(PostgreSQL)]
    Gateway --> Console[Consola]
    Gateway --> Telegram[Puente Telegram]
    Gateway --> Monitor[Monitor MCP]`,
    color: "teal",
  },
  {
    key: "clawbus",
    name: "Clawbus",
    category: "infrastructure",
    tagline: "Bus experimental entre agentes de distintos runtimes",
    description:
      "Broker WebSocket con salas, destinatarios por alias y protección contra bucles de conversación. Incluye integraciones para Claude Code y OpenClaw.",
    longDescription:
      "Clawbus nació para que agentes que viven en procesos y contenedores distintos puedan hablar entre sí. Su broker enruta mensajes por salas y alias; incorpora presupuesto de saltos, deduplicación, límites de tasa y un cortacircuitos por pareja de agentes. El README lo presenta como prototipo funcional y advierte que la autenticación por defecto solo es adecuada para una red interna confiable.",
    repo: "https://github.com/stevenvo780/clawbus",
    runtime: "service",
    runtimeLabel: "Broker WebSocket en red confiable",
    status: "available",
    statusLabel: "Prototipo público",
    stack: ["Python", "WebSocket", "Docker", "MCP", "Claude Code", "OpenClaw"],
    capabilities: [
      "Comunicación entre agentes de diferentes runtimes",
      "Salas y mensajes dirigidos por alias",
      "Protección contra bucles de respuesta",
      "Deduplicación y límites de tasa",
      "Conectores para Claude Code y OpenClaw",
    ],
    hardwareRequirements: "Red interna confiable; reforzar autenticación antes de exponer el broker",
    architectureDescription:
      "Los conectores publican y reciben mensajes mediante un broker WebSocket que aplica reglas de enrutamiento y protección contra bucles.",
    mermaidDiagram: `graph LR
    Claude[Claude Code] --> Connector[Conector]
    OpenClaw[OpenClaw] --> Connector
    Connector --> Broker[Broker WebSocket]
    Broker --> Rooms[Salas y alias]
    Broker --> Guard[Protección de bucles]
    Rooms --> Agents[Otros agentes]`,
    color: "gold",
  },
  {
    key: "prizma-agent-stack",
    name: "Prizma Agent Stack",
    category: "infrastructure",
    tagline: "Ciclo de vida y terminales para una flota de agentes",
    description:
      "Capa de integración para levantar agentes en Docker desde un VPS, consultar su estado y abrir sesiones de terminal. Usa Clawbus para mensajería entre agentes.",
    longDescription:
      "El repositorio reúne contratos de agentes, comandos para aplicar especificaciones, operaciones de flota y acceso remoto a sesiones de terminal. El camino documentado parte de un VPS duradero con Docker y tmux, al que el operador llega por SSH. Puede conectar Clawbus y, opcionalmente, Ultimate Terminal. Sus demos usan agentes sin credenciales de proveedores.",
    repo: "https://github.com/stevenvo780/prizma-agent-stack",
    runtime: "service",
    runtimeLabel: "VPS con Docker, SSH y tmux",
    status: "available",
    statusLabel: "Código y demos de flota disponibles",
    stack: ["Python", "Docker", "SSH", "tmux", "Clawbus"],
    capabilities: [
      "Aplicar especificaciones y revisar salud de agentes",
      "Administrar sesiones persistentes de terminal",
      "Coordinar contenedores de una flota pequeña",
      "Probar mensajería real entre agentes de demostración",
      "Mantener credenciales fuera del repositorio",
    ],
    hardwareRequirements: "VPS con Python 3.12+, Docker y tmux; acceso SSH del operador",
    architectureDescription:
      "El operador usa SSH para administrar el plano de control en un VPS; allí corren los agentes Docker y el bus de mensajería.",
    mermaidDiagram: `graph LR
    Operator[Operador] --> SSH[SSH]
    SSH --> Control[Prizma Fleet y Agentctl]
    Control --> Docker[Docker]
    Docker --> Agents[Agentes]
    Agents --> Bus[Clawbus]
    Operator --> Terminal[Prizma Terminal]
    Terminal --> SSH`,
    color: "purple",
  },
  {
    key: "agora-mcp",
    name: "Agora MCP",
    category: "infrastructure",
    tagline: "Herramientas de Ágora para clientes MCP",
    description:
      "Servidor MCP para que un agente consulte y ejecute herramientas de documentos, tareas, tableros y workspaces de Ágora mediante su backend.",
    longDescription:
      "Este servidor Node expone dos herramientas MCP: una descubre el catálogo de operaciones de Ágora y otra las ejecuta. Obtiene autenticación de Firebase configurada por el operador y llama al backend de Ágora. Las operaciones destructivas requieren una confirmación explícita. Es una integración para una instalación de Ágora, no una API genérica ni una demo abierta.",
    repo: "https://github.com/stevenvo780/agora-mcp",
    runtime: "api",
    runtimeLabel: "Node.js local + backend de Ágora",
    status: "available",
    statusLabel: "Código público; requiere Ágora",
    stack: ["Node.js", "MCP", "Firebase Auth", "Ágora API"],
    capabilities: [
      "Descubrir herramientas de Ágora desde un cliente MCP",
      "Consultar documentos, tareas, tableros y workspaces",
      "Ejecutar operaciones autorizadas en el backend",
      "Exigir confirmación para operaciones destructivas",
    ],
    hardwareRequirements: "Node.js 18+ y credenciales propias de una instalación de Ágora",
    architectureDescription:
      "Un cliente MCP habla con el servidor local; este obtiene un token y consulta el backend de Ágora para ejecutar la herramienta solicitada.",
    mermaidDiagram: `graph LR
    Agent[Cliente MCP] --> Server[Agora MCP]
    Server --> Auth[Autenticación Firebase]
    Auth --> Backend[Backend Ágora]
    Server --> Catalog[Catálogo de herramientas]
    Backend --> Result[Resultado]`,
    color: "cyan",
  },
  {
    key: "agora-ai-agent",
    name: "Ágora AI Agent",
    category: "assistants",
    tagline: "Agente conversacional integrado en el backend de Ágora",
    description:
      "Módulo de AgoraBack que ofrece conversaciones con respuestas en streaming y herramientas para trabajar con documentos y lógica formal dentro de Ágora.",
    longDescription:
      "Ágora AI Agent forma parte de AgoraBack, el backend general de la plataforma Ágora; no es una aplicación independiente. Su API incluye chats persistidos y respuestas en streaming. El agente ejecuta herramientas de la plataforma, entre ellas consultas al grafo de citas y operaciones de lógica ST. Cada instalación necesita sus propios servicios de Ágora y proveedores de modelos configurados; el repositorio público documenta el módulo, pero Daímon no aloja una demo separada.",
    repo: "https://github.com/stevenvo780/agora-backend",
    runtime: "service",
    runtimeLabel: "Módulo de AgoraBack; requiere Ágora y proveedores configurados",
    status: "available",
    statusLabel: "Código público; módulo de Ágora",
    stack: ["TypeScript", "Express", "Firebase", "Firestore", "ST"],
    capabilities: [
      "Conversaciones persistidas en Ágora",
      "Respuestas del agente en streaming",
      "Herramientas para consultar el grafo de citas de documentos",
      "Comprobación y derivación mediante el lenguaje lógico ST",
      "Configuración de claves de proveedores por usuario",
    ],
    hardwareRequirements: "Instalación de Ágora con AgoraBack, Firebase/Firestore y un proveedor de modelos configurado",
    architectureDescription:
      "La interfaz de Ágora consulta AgoraBack; su módulo de agente transmite respuestas, usa proveedores de modelos y ejecuta herramientas de la plataforma. Los chats se guardan en Firestore.",
    mermaidDiagram: `graph LR
    User[Usuario de Ágora] --> UI[Interfaz de Ágora]
    UI -->|Chat y streaming| Backend[AgoraBack]
    Backend --> Agent[Ágora AI Agent]
    Agent --> Models[Proveedores de modelos]
    Agent --> Tools[Herramientas de Ágora]
    Tools --> Citations[Grafo de citas]
    Tools --> ST[Lógica ST]
    Backend --> Chats[(Chats en Firestore)]`,
    color: "teal",
  },
  {
    key: "cloud-delegate",
    name: "Cloud Delegate",
    category: "infrastructure",
    tagline: "Delegación local de tareas entre clientes MCP y CLI de agentes",
    description:
      "Servidor MCP en Python que recibe una tarea y la ejecuta mediante un CLI de agente instalado y autenticado en la misma máquina.",
    longDescription:
      "Cloud Delegate expone dos herramientas MCP: delegar_a_cloud para enviar una tarea autocontenida a un CLI compatible y listar_modelos_cloud para ver las rutas configuradas y la disponibilidad de sus ejecutables. Permite elegir nivel de acceso, tiempo límite y directorio de trabajo; limita la profundidad de delegación. El repositorio contiene el servidor reutilizable y pruebas con procesos simulados. Cada usuario configura por separado los CLI y sus credenciales; la lista de rutas no garantiza acceso a los modelos ni cuota disponible.",
    repo: "https://github.com/stevenvo780/cloud-delegate",
    runtime: "local-cpu",
    runtimeLabel: "Servidor MCP local + CLI autenticados",
    status: "available",
    statusLabel: "Código disponible; requiere CLI configurados",
    stack: ["Python 3", "MCP", "JSON-RPC", "CLI de agentes"],
    capabilities: [
      "Delegar tareas autocontenidas desde un cliente MCP",
      "Consultar rutas configuradas y ejecutables disponibles",
      "Elegir acceso de texto, lectura o escritura",
      "Limitar tiempo de ejecución y profundidad de delegación",
      "Probar el servidor sin invocar proveedores reales",
    ],
    hardwareRequirements: "Python 3 y al menos un CLI compatible instalado y autenticado localmente",
    architectureDescription:
      "Un cliente MCP llama al servidor local, que selecciona un CLI autenticado, aplica el tiempo límite y devuelve la respuesta. La configuración y autenticación permanecen en la máquina del usuario.",
    mermaidDiagram: `graph LR\n    Client[Cliente MCP] --> Server[Cloud Delegate]\n    Server --> Route[Seleccion de CLI]\n    Route --> CLI[CLI autenticado]\n    CLI --> Result[Respuesta]\n    Server --> Guard[Limite de profundidad y timeout]`,
    color: "teal",
  },
  {
    key: "talos-harness",
    name: "Talos · Harness de automatización",
    category: "infrastructure",
    tagline: "Automatizaciones empresariales con agentes y verificación",
    description:
      "Referencia de un harness privado para automatizaciones con Claude Code. Aporta checkpoints, idempotencia, revisión humana y auditoría en flujos de facturas, CRM, RPA y correos.",
    longDescription:
      "Talos reúne un núcleo de harness, un CLI y automatizaciones de referencia. El modelo toma decisiones, mientras el harness limita herramientas, conserva checkpoints, registra decisiones y permite pausas para revisión humana. Los ejemplos abarcan extracción de datos de facturas, sincronización CRM, descarga de extractos y clasificación de correos. Su repositorio es privado: esta ficha describe el proyecto, pero no ofrece acceso al código ni a una demo pública.",
    repo: "https://github.com/stevenvo780/prizma-talos",
    sourceAccess: "private",
    runtime: "api",
    runtimeLabel: "Node.js local + Claude Code",
    status: "available",
    statusLabel: "Referencia descriptiva; repositorio privado",
    stack: ["TypeScript", "Node.js", "Claude Code", "Playwright", "Next.js"],
    capabilities: [
      "Ejecutar automatizaciones registradas desde un CLI",
      "Checkpoints e idempotencia para reintentos",
      "Revisión humana en casos de baja confianza",
      "Auditoría de decisiones y resultados",
      "Ejemplos de facturas, CRM, RPA y correos",
    ],
    hardwareRequirements: "Node.js 20+ y Claude Code configurado para las automatizaciones con modelo",
    architectureDescription:
      "Claude Code decide dentro de un harness que gobierna herramientas, checkpoints, revisión humana y verificación de cada automatización.",
    mermaidDiagram: `graph LR
    User[Operador] --> CLI[CLI del harness]
    CLI --> Model[Claude Code]
    Model --> Core[Harness Core]
    Core --> Tasks[Automatizaciones]
    Core --> Checkpoint[Checkpoints y auditoría]
    Tasks --> HITL[Revisión humana]`,
    color: "gold",
  },
  {
    key: "minimax-h3",
    name: "NewsLeters · MiniMax H3",
    category: "tools",
    tagline: "Noticias convertidas en reels con vídeo generativo",
    description:
      "Pipeline para producir reels verticales de noticias desde texto, con MiniMax H3 local, guion verificado, subtítulos y exportación MP4. También prepara imágenes con Codex.",
    longDescription:
      "El proyecto toma un titular y un cuerpo de noticia, construye un guion que cita fragmentos literales de la fuente y genera tomas con MiniMax H3 local. Después monta subtítulos y exporta el reel vertical con ffmpeg. Incluye comprobaciones de ritmo y de fidelidad al texto antes de dar una pieza por válida. El módulo de imágenes usa Codex CLI por separado; no es necesario para el flujo básico de vídeo.",
    repo: "https://github.com/stevenvo780/minimax-h3",
    runtime: "gpu-local",
    runtimeLabel: "Vídeo con MiniMax H3 local; imágenes opcionales con Codex",
    status: "available",
    statusLabel: "Código de producción disponible",
    stack: ["MiniMax H3", "Python", "ffmpeg", "Codex CLI", "GPU local"],
    capabilities: [
      "Generar reels verticales desde titulares y texto",
      "Comprobar que la voz sigue la noticia fuente",
      "Ajustar duración de tomas al guion",
      "Quemar subtítulos y exportar MP4",
      "Preparar imágenes de noticias con Codex CLI",
    ],
    hardwareRequirements: "Modelo MiniMax H3 y GPU local para vídeo; ffmpeg; Codex CLI solo para imágenes",
    architectureDescription:
      "Un texto fuente pasa por la preparación del guion, generación local de vídeo y montaje final con subtítulos.",
    mermaidDiagram: `graph LR
    Source[Titular y texto] --> Script[Guion verificado]
    Script --> Video[MiniMax H3 local]
    Video --> Edit[ffmpeg y subtítulos]
    Edit --> Reel[Reel MP4]
    Source --> Images[Imágenes opcionales con Codex]`,
    color: "purple",
  },
  {
    key: "pixel-art-replicate",
    name: "Generador de pixel art",
    category: "tools",
    tagline: "Imágenes desde texto mediante Replicate",
    description:
      "Pequeña herramienta de terminal en Python que envía una descripción a la API de Replicate y guarda una imagen de pixel art.",
    longDescription:
      "CreadorDeImagenes es un proyecto compacto de línea de comandos: recibe un prompt, llama a un modelo alojado en Replicate y guarda el resultado en una carpeta de salida. Es un ejemplo de generación por API; requiere una cuenta y credencial propias de Replicate y no aloja una demo pública.",
    repo: "https://github.com/stevenvo780/CreadorDeImagenes",
    runtime: "api",
    runtimeLabel: "Python + API de Replicate",
    status: "available",
    statusLabel: "Ejemplo de CLI disponible",
    stack: ["Python", "Replicate API", "CLI"],
    capabilities: [
      "Aceptar prompts de texto desde la terminal",
      "Generar pixel art mediante una API externa",
      "Guardar imágenes en una carpeta local",
    ],
    hardwareRequirements: "Python 3 y credencial propia de Replicate",
    architectureDescription:
      "Un comando recibe el prompt, consulta Replicate y descarga la imagen generada.",
    mermaidDiagram: `graph LR
    Prompt[Prompt de texto] --> CLI[CLI Python]
    CLI --> API[Replicate API]
    API --> Image[Imagen de pixel art]
    Image --> Folder[Carpeta de salida]`,
    color: "teal",
  },
  {
    key: "neuronal-learning",
    name: "Neuronal Learning",
    category: "models",
    tagline: "Laboratorio histórico de redes neuronales y NLP",
    description:
      "Colección de ejercicios con Brain.js, TensorFlow y Python: pruebas CPU/GPU, una red XOR y experimentos de clasificación de texto. Es código exploratorio sin guía de instalación.",
    longDescription:
      "El repositorio reúne scripts independientes de aprendizaje automático. Incluye ejemplos de redes neuronales con Brain.js en CPU y GPU, una prueba de XOR y un experimento de clasificación de frases con TensorFlow/Keras. No hay README de proyecto ni un flujo de instalación unificado; conviene leer cada script antes de ejecutarlo. Se presenta como laboratorio histórico, no como servicio listo para desplegar.",
    repo: "https://github.com/stevenvo780/neuronalLearning",
    runtime: "local-cpu",
    runtimeLabel: "Scripts locales; algunos usan GPU",
    status: "available",
    statusLabel: "Código experimental sin guía única",
    stack: ["Brain.js", "TensorFlow", "Python", "JavaScript", "NLP"],
    capabilities: [
      "Ejemplos de entrenamiento en CPU y GPU",
      "Prueba de red neuronal para XOR",
      "Experimentos de clasificación de texto",
    ],
    hardwareRequirements: "Dependencias distintas por script; GPU opcional para ejemplos específicos",
    architectureDescription:
      "El repositorio contiene dos líneas de experimentación separadas: redes en JavaScript y modelos de texto en Python.",
    mermaidDiagram: `graph LR
    Repo[Repositorio] --> JS[Ejemplos JavaScript]
    Repo --> PY[Ejemplos Python]
    JS --> Brain[Brain.js CPU o GPU]
    PY --> TF[TensorFlow NLP]`,
    color: "cyan",
  },
];

export function getComponentByKey(key: string): AIComponent | undefined {
  // Prevent path traversal attacks: validate key format before lookup
  if (!isValidComponentKey(key)) {
    return undefined;
  }
  return components.find((c) => c.key === key);
}
