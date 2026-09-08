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
    id: 'react-agent-loop',
    featured: false,
    title: 'react-agent-loop',
    description: {
      es: 'Paquete open source publicado en npm: un bucle de agente con patrón ReAct, sin dependencias, para cualquier cliente de chat. Lo extraje de agent-cli (más abajo) al darme cuenta de que el bucle no tenía nada específico de mi CLI — así que ahora agent-cli depende de este paquete, no al revés.',
      en: 'Open source package published on npm: a dependency-free ReAct-pattern agent loop for any chat client. Extracted out of agent-cli (below) once I realized the loop itself had nothing CLI-specific about it — agent-cli now depends on this package, not the other way around.',
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
    description: {
      es: 'Agente de línea de comandos con uso de herramientas reales (tiempo, GitHub, ficheros, cálculo) sobre un LLM autoalojado, construido sobre react-agent-loop (arriba).',
      en: 'Command-line agent with real tool use (weather, GitHub, files, calculator) over a self-hosted LLM, built on top of react-agent-loop (above).',
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
    links: {
      demo: 'https://anomaly-detection-demo-jmabellan.vercel.app',
      github: 'https://github.com/JuanMiguelAbellan/autoencoders',
    },
  },
]
