export const projects = [
  {
    id: 'iadocuments',
    featured: true,
    title: 'IADocuments',
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
    id: 'agent-cli',
    featured: false,
    title: 'agent-cli',
    description: {
      es: 'Agente de línea de comandos con uso de herramientas (tool use) sobre un LLM autoalojado. El soporte nativo de function calling de Ollama se quedaba colgado con el modelo usado, así que implementé el patrón ReAct a mano: el modelo pide una acción en JSON, se ejecuta la herramienta real y se le devuelve el resultado, en bucle hasta la respuesta final.',
      en: 'Command-line agent with tool use over a self-hosted LLM. Ollama\'s native function-calling support hung with the model used, so I implemented the ReAct pattern by hand: the model requests an action as JSON, the real tool runs, and the result feeds back in, looping until a final answer.',
    },
    highlights: {
      es: [
        'Bucle ReAct propio: parseo robusto de JSON, encadenado de varias herramientas en una sola tarea, manejo de errores de herramienta sin romper la ejecución.',
        '5 herramientas sin coste ni claves: tiempo, info de repos de GitHub, calculadora, lectura de ficheros y listado de directorio (estas dos con sandboxing real contra path traversal).',
        'Validado en real contra el Ollama de producción de IADocuments, encadenando dos herramientas con datos reales.',
      ],
      en: [
        'Custom ReAct loop: robust JSON parsing, chaining multiple tools within a single task, tool-error handling that doesn\'t crash the run.',
        '5 free, keyless tools: weather, GitHub repo info, calculator, file reading and directory listing (the latter two with real path-traversal sandboxing).',
        'Validated live against IADocuments\' production Ollama instance, chaining two tools with real data.',
      ],
    },
    tech: ['TypeScript', 'Node.js', 'Ollama', 'Jest'],
    links: {
      github: 'https://github.com/JuanMiguelAbellan/agent-cli',
    },
  },
  {
    id: 'autoencoders',
    featured: false,
    title: 'Detección de anomalías con Autoencoders',
    titleEn: 'Network Anomaly Detection with Autoencoders',
    description: {
      es: 'Sistema de detección de anomalías en tráfico de red mediante autoencoders y variational autoencoders, entrenados de forma no supervisada para detectar comportamiento de proceso anómalo por error de reconstrucción. Desarrollado durante mis prácticas de grado en un contexto real de ciberseguridad.',
      en: 'Network traffic anomaly detection system using autoencoders and variational autoencoders, trained unsupervised to flag anomalous process behavior via reconstruction error. Built during my degree internship in a real cybersecurity context.',
    },
    highlights: {
      es: [
        'Feature engineering temporal por ventana deslizante (frecuencia, entropía de dominios, tiempo desde última aparición...).',
        'Comparativa sistemática de arquitecturas, funciones de pérdida y umbrales vía un orquestador de experimentos propio.',
        'VAE con pérdida combinada de reconstrucción + divergencia KL.',
      ],
      en: [
        'Sliding-window temporal feature engineering (frequency, domain entropy, time since last seen...).',
        'Systematic comparison of architectures, loss functions and thresholds via a custom experiment orchestrator.',
        'VAE with a combined reconstruction + KL-divergence loss.',
      ],
    },
    tech: ['Python', 'TensorFlow/Keras', 'scikit-learn', 'pandas'],
    links: {
      github: 'https://github.com/JuanMiguelAbellan/autoencoders',
    },
  },
]
