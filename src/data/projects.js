import previewReciclab2b from '../assets/previews/reciclab2b.webp'
import previewIadocuments from '../assets/previews/iadocuments.webp'
import previewReactAgentLoop from '../assets/previews/react-agent-loop.webp'
import previewAgentCli from '../assets/previews/agent-cli.webp'
import previewAutoencoders from '../assets/previews/autoencoders.webp'
import previewRagEval from '../assets/previews/rag-eval.webp'
import previewDocsSearchMcp from '../assets/previews/docs-search-mcp.webp'

export const projects = [
  {
    id: 'reciclab2b',
    featured: false,
    title: 'ReciclaB2B',
    preview: previewReciclab2b,
    summary: {
      es: 'Mercado B2B de material reciclable con mensajería en tiempo real y control de inventario.',
      en: 'B2B recyclable-material marketplace with real-time messaging and inventory control.',
    },
    description: {
      es: 'Plataforma B2B para conectar generadores de material reciclable con compradores, distribuidores e industrias: ofertas con control de inventario, mercado con mapa y filtros, mensajería en tiempo real por oferta, y pedidos con ciclo de vida completo.',
      en: 'B2B platform connecting recyclable-material generators with buyers, distributors and industries: inventory-controlled offers, a marketplace with map and filters, real-time per-offer messaging, and full order lifecycle management.',
    },
    highlights: {
      es: [
        'Desarrollado por fases con dos auditorías de seguridad propias: encontré y cerré un bug de silent-denial que bloqueaba a cualquier miembro no-principal de una empresa, y una escalada de privilegios real en el panel de administración — ambos con tests que fallaban sin el fix.',
        'Mensajería en tiempo real por oferta (Laravel Reverb, WebSockets propios) y control de inventario con reintento ante condiciones de carrera al aceptar pedidos.',
        'Ubicaciones con privacidad: coordenadas exactas solo visibles para el propietario, aproximadas (desplazamiento determinista) en el mercado público.',
        '151 tests, 476 assertions.',
        'La demo incluye cuentas de prueba para cada rol (superadmin, admin, productor, comprador) con ofertas, chat y pedidos ya cargados — el propio login muestra las credenciales.',
      ],
      en: [
        'Built in phases with two self-run security audits: found and closed a silent-denial bug blocking any non-primary company member, and a real privilege-escalation path in the admin panel — both with tests that failed without the fix.',
        'Real-time per-offer messaging (Laravel Reverb, self-hosted WebSockets) and inventory control with race-condition-safe order acceptance.',
        'Privacy-aware locations: exact coordinates visible only to the owner, deterministically offset ones shown on the public marketplace.',
        '151 tests, 476 assertions.',
        'The demo includes test accounts for every role (superadmin, admin, producer, buyer) preloaded with offers, chat and orders — the login page itself shows the credentials.',
      ],
    },
    tech: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'Filament', 'Laravel Reverb', 'Tailwind'],
    links: {
      demo: 'https://web-production-4d6ac.up.railway.app',
      github: 'https://github.com/JuanMiguelAbellan/reciclab2b',
    },
  },
  {
    id: 'iadocuments',
    featured: true,
    title: 'IADocuments',
    preview: previewIadocuments,
    summary: {
      es: 'Asistente de IA autoalojado para preguntar, anotar y editar tus propios PDFs.',
      en: 'Self-hosted AI assistant to ask, annotate and edit your own PDFs.',
    },
    description: {
      es: 'Asistente de IA para trabajar con tus propios documentos. Sube un PDF, pregúntale directamente sobre su contenido y edítalo con anotaciones nativas — con un modelo de lenguaje autoalojado, sin depender de una API de terceros.',
      en: 'AI assistant for working with your own documents. Upload a PDF, ask it directly about its content, and annotate it natively — powered by a self-hosted language model, with no third-party API dependency.',
    },
    highlights: {
      es: [
        'RAG con embeddings (pgvector + nomic-embed-text): solo se recuperan los fragmentos relevantes del documento en vez de reenviarlo entero en cada mensaje.',
        'LLM autoalojado en infraestructura propia (Ollama) — control total sobre coste, privacidad y latencia.',
        'Streaming de la respuesta token a token por WebSocket.',
        'Edición y anotación nativa de PDF (motor completo de pdf.js).',
        'Pagos reales en modo test (Stripe: PaymentIntents + webhook) y verificación de email.',
      ],
      en: [
        'RAG with embeddings (pgvector + nomic-embed-text): only the relevant document fragments are retrieved instead of resending the whole document on every message.',
        'Self-hosted LLM on its own infrastructure (Ollama) — full control over cost, privacy and latency.',
        'Token-by-token response streaming over WebSocket.',
        'Native PDF editing and annotation (full pdf.js engine).',
        'Real test-mode payments (Stripe: PaymentIntents + webhook) and email verification.',
      ],
    },
    tech: ['React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'pgvector', 'Ollama', 'WebSockets', 'Stripe', 'Docker'],
    links: {
      demo: 'https://iadocuments-jmabellan.vercel.app',
      github: 'https://github.com/JuanMiguelAbellan/Proyecto-2-DAW',
    },
  },
  {
    id: 'rag-eval',
    featured: false,
    title: 'rag-eval',
    preview: previewRagEval,
    summary: {
      es: 'Mide con estadística real cuánto acierta un RAG. Aplicado a IADocuments: MRR de 0.685 a 0.947.',
      en: 'Measures how good a RAG pipeline really is, with real statistics. Applied to IADocuments: MRR 0.685 → 0.947.',
    },
    description: {
      es: 'Banco de pruebas para pipelines RAG: puntúa la recuperación y la calidad de las respuestas sobre un conjunto de preguntas verificado a mano, con cualquier estrategia de troceado y cualquier buscador, con intervalos de confianza y en local (Ollama, sin claves de API). Lo construí para responder una pregunta concreta sobre mi propio proyecto: ¿eran buenos los ajustes de IADocuments?',
      en: 'Test bench for RAG pipelines: scores retrieval and answer quality on a hand-checked question set, over any chunking strategy and any retriever, with confidence intervals, running locally (Ollama, no API keys). I built it to answer one concrete question about my own project: were IADocuments\' settings any good?',
    },
    highlights: {
      es: [
        'Hallazgo real: el punto débil de IADocuments era el modelo de embeddings, no el troceado. nomic-embed-text (centrado en inglés) perdía en español contra BM25, que no usa ningún modelo (0.685 vs 0.885 de MRR).',
        'Mejor configuración medida (troceado por párrafos + BM25 + bge-m3 fusionados con RRF): MRR 0.947 y 98.6 % de recall@5, y las respuestas correctas de qwen2.5:3b suben del 81.8 % al 91.8 % (IC 95 % pareado de la mejora: +2.7 a +19.1 puntos).',
        'Las etiquetas son citas literales, no ids de fragmento, así que se pueden comparar estrategias de troceado distintas de forma justa. Sin LLM como juez: puntuación determinista por hechos clave y abstención explícita.',
        'Cada diferencia lleva un bootstrap pareado (2000 remuestreos, semilla fija): «mejor» significa que el intervalo excluye el cero.',
        'Corregí mis propias conclusiones con los datos (el troceado por párrafos no gana siempre) y documenté las limitaciones: un solo anotador, sesgo léxico, un dominio.',
        '43 tests sin necesidad de Ollama (un servidor HTTP falso lo sustituye).',
      ],
      en: [
        'Real finding: IADocuments\' weak spot was the embedding model, not the chunking. nomic-embed-text (English-centric) lost on Spanish to BM25, which uses no model at all (0.685 vs 0.885 MRR).',
        'Best measured setup (paragraph chunks + BM25 + bge-m3 fused with RRF): MRR 0.947 and 98.6% recall@5, and qwen2.5:3b\'s correct answers rise from 81.8% to 91.8% (paired 95% CI of the gain: +2.7 to +19.1 points).',
        'Labels are verbatim quotes, not chunk ids, so different chunking strategies can be compared fairly. No LLM-as-judge: deterministic scoring by key facts and explicit abstention.',
        'Every difference gets a paired bootstrap (2000 resamples, fixed seed): "better" means the interval excludes zero.',
        'Corrected my own conclusions against the data (paragraph chunking does not always win) and documented the limits: single annotator, lexical bias, one domain.',
        '43 tests that need no Ollama (a fake HTTP server stands in).',
      ],
    },
    tech: ['TypeScript', 'Node.js', 'Ollama', 'RAG', 'BM25', 'Embeddings', 'Statistics'],
    links: {
      github: 'https://github.com/JuanMiguelAbellan/rag-eval',
    },
  },
  {
    id: 'docs-search-mcp',
    featured: false,
    title: 'docs-search-mcp',
    preview: previewDocsSearchMcp,
    summary: {
      es: 'Servidor MCP de solo lectura para que una IA busque en tus documentos, diseñado desconfiando del propio modelo.',
      en: 'Read-only MCP server that lets an AI search your documents, designed to distrust the calling model.',
    },
    description: {
      es: 'Servidor MCP (Model Context Protocol) que da a un cliente de IA (Claude Desktop, Claude Code o tu propio agente) tres herramientas para buscar y leer una carpeta de documentos Markdown/texto, con búsqueda híbrida BM25 + embeddings locales. Lo que más cuidé: los argumentos los escribe un LLM y puede haber sido manipulado, así que se tratan como no fiables.',
      en: 'MCP (Model Context Protocol) server that gives an AI client (Claude Desktop, Claude Code or your own agent) three tools to search and read a folder of Markdown/text documents, with hybrid BM25 + local-embedding search. What I focused on: arguments are written by an LLM that may have been manipulated, so they are treated as untrusted.',
    },
    highlights: {
      es: [
        'Ningún argumento se usa nunca como ruta de fichero: los documentos se buscan por id en memoria, así que un id como «../../etc/passwd» es simplemente desconocido (probado con rutas relativas, absolutas, de Windows, bytes NUL y URIs con traversal codificado).',
        'La carpeta servida es un límite de seguridad: los symlinks que salen de ella se ignoran, además de ficheros binarios, enormes o en exceso. Todos los argumentos tienen límites duros validados con zod.',
        'Herramientas marcadas como solo lectura, con esquema de salida y contenido estructurado. Los errores se devuelven de forma que el modelo pueda corregirse («¿Quisiste decir guides/setup.md?»).',
        '30 tests, incluido uno de extremo a extremo que lanza el CLI real por stdio. Los propios tests encontraron dos bugs míos (un fichero cargado dos veces vía symlink y un orden que dependía del idioma del sistema).',
        'Demo con un modelo local de 3B: acierta 1 de 3 preguntas y el README lo cuenta tal cual, sin retocar. El servidor hizo bien su parte; los fallos son del modelo.',
      ],
      en: [
        'No argument is ever used as a file path: documents are looked up by id in memory, so an id like "../../etc/passwd" is simply unknown (tested with relative, absolute, Windows, NUL-byte and percent-encoded traversal URIs).',
        'The served folder is a security boundary: symlinks that resolve outside it are skipped, as are binary, oversized or excess files. Every argument has hard bounds validated with zod.',
        'Tools annotated as read-only, with output schemas and structured content. Errors are returned in a way the model can recover from ("Did you mean guides/setup.md?").',
        '30 tests, including an end-to-end one that spawns the real CLI over stdio. The tests themselves caught two bugs of mine (a file loaded twice via a symlink, and an ordering that depended on the system locale).',
        'Demo with a local 3B model: it gets 1 of 3 questions right and the README says so, unedited. The server did its part; the mistakes are the model\'s.',
      ],
    },
    tech: ['TypeScript', 'MCP', 'Node.js', 'zod', 'BM25', 'Ollama', 'Security'],
    links: {
      github: 'https://github.com/JuanMiguelAbellan/docs-search-mcp',
    },
  },
  {
    id: 'react-agent-loop',
    featured: false,
    title: 'react-agent-loop',
    preview: previewReactAgentLoop,
    summary: {
      es: 'Paquete npm sin dependencias: bucle de agente ReAct para cualquier cliente de chat.',
      en: 'Dependency-free npm package: a ReAct agent loop for any chat client.',
    },
    description: {
      es: 'Paquete open source publicado en npm: un bucle de agente con patrón ReAct, sin dependencias, para cualquier cliente de chat. Lo extraje de agent-cli al darme cuenta de que el bucle no tenía nada específico de mi CLI — así que ahora agent-cli depende de este paquete, no al revés.',
      en: 'Open source package published on npm: a dependency-free ReAct-pattern agent loop for any chat client. Extracted out of agent-cli once I realized the loop itself had nothing CLI-specific about it — agent-cli now depends on this package, not the other way around.',
    },
    highlights: {
      es: [
        'Funciona con cualquier proveedor: solo necesita un cliente con chat(mensajes) => Promise<string>, no está atado a Ollama.',
        'Nace de un bug real: el tools nativo de Ollama se colgaba con el modelo usado — este paquete implementa function calling sin depender de que el proveedor lo soporte bien.',
        '14 tests, cero dependencias de producción.',
      ],
      en: [
        'Works with any provider: only needs a client with chat(messages) => Promise<string>, not tied to Ollama.',
        'Born from a real bug: Ollama\'s native tools parameter hung with the model in use — this package implements function calling without depending on the provider supporting it correctly.',
        '14 tests, zero production dependencies.',
      ],
    },
    tech: ['TypeScript', 'npm', 'Jest'],
    links: {
      demo: 'https://www.npmjs.com/package/react-agent-loop',
      github: 'https://github.com/JuanMiguelAbellan/react-agent-loop',
    },
  },
  {
    id: 'agent-cli',
    featured: false,
    title: 'agent-cli',
    preview: previewAgentCli,
    summary: {
      es: 'Agente de terminal con uso real de herramientas sobre un LLM autoalojado.',
      en: 'Terminal agent with real tool use over a self-hosted LLM.',
    },
    description: {
      es: 'Agente de línea de comandos con uso de herramientas reales (tiempo, GitHub, ficheros, cálculo) sobre un LLM autoalojado, construido sobre react-agent-loop.',
      en: 'Command-line agent with real tool use (weather, GitHub, files, calculator) over a self-hosted LLM, built on top of react-agent-loop.',
    },
    highlights: {
      es: [
        '5 herramientas sin coste ni claves; lectura de ficheros y listado de directorio con sandboxing real contra path traversal.',
        'Validado en real contra el Ollama de producción de IADocuments, encadenando dos herramientas con datos reales.',
      ],
      en: [
        '5 free, keyless tools; file reading and directory listing with real path-traversal sandboxing.',
        'Validated live against IADocuments\' production Ollama instance, chaining two tools with real data.',
      ],
    },
    tech: ['TypeScript', 'Node.js', 'react-agent-loop'],
    links: {
      github: 'https://github.com/JuanMiguelAbellan/agent-cli',
    },
  },
  {
    id: 'autoencoders',
    featured: false,
    title: 'Detección de anomalías con Autoencoders',
    preview: previewAutoencoders,
    titleEn: 'Network Anomaly Detection with Autoencoders',
    summary: {
      es: 'Autoencoders no supervisados para detectar tráfico de red anómalo, con demo en el navegador.',
      en: 'Unsupervised autoencoders flagging anomalous network traffic, with an in-browser demo.',
    },
    description: {
      es: 'Sistema de detección de anomalías en tráfico de red mediante autoencoders y variational autoencoders, entrenados de forma no supervisada para detectar comportamiento de proceso anómalo por error de reconstrucción. Desarrollado durante mis prácticas de grado en un contexto real de ciberseguridad.',
      en: 'Network traffic anomaly detection system using autoencoders and variational autoencoders, trained unsupervised to flag anomalous process behavior via reconstruction error. Built during my degree internship in a real cybersecurity context.',
    },
    highlights: {
      es: [
        'Feature engineering temporal por ventana deslizante (frecuencia, entropía de dominios, tiempo desde última aparición...).',
        'Comparativa sistemática de arquitecturas, funciones de pérdida y umbrales vía un orquestador de experimentos propio.',
        'VAE con pérdida combinada de reconstrucción + divergencia KL.',
        'Demo pública con datos 100% sintéticos: mismo autoencoder entrenado desde cero, inferencia en el navegador con TensorFlow.js, sin backend.',
      ],
      en: [
        'Sliding-window temporal feature engineering (frequency, domain entropy, time since last seen...).',
        'Systematic comparison of architectures, loss functions and thresholds via a custom experiment orchestrator.',
        'VAE with a combined reconstruction + KL-divergence loss.',
        'Public demo with 100% synthetic data: the same autoencoder trained from scratch, inference running in-browser with TensorFlow.js, no backend.',
      ],
    },
    tech: ['Python', 'TensorFlow/Keras', 'scikit-learn', 'pandas'],
    // El repo sigue privado (su historial de git aún contiene telemetría real
    // de las prácticas). Cuando sea público: volver a poner `github` y quitar
    // `repoPending`.
    repoPending: true,
    links: {
      demo: 'https://anomaly-detection-demo-jmabellan.vercel.app',
    },
  },
]
