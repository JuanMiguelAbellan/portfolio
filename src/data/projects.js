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
      demo: 'https://frontend-psi-ashen-43.vercel.app',
      github: 'https://github.com/JuanMiguelAbellan/Proyecto-2-DAW',
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
