import previewReciclab2b from '../assets/previews/reciclab2b.webp'
import previewIadocuments from '../assets/previews/iadocuments.webp'
import previewReactAgentLoop from '../assets/previews/react-agent-loop.webp'
import previewAgentCli from '../assets/previews/agent-cli.webp'
import previewAutoencoders from '../assets/previews/autoencoders.webp'

export const projects = [
  {
    id: 'reciclab2b',
    featured: false,
    title: 'ReciclaB2B',
    preview: previewReciclab2b,
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
    preview: previewReactAgentLoop,
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
    preview: previewAgentCli,
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
    preview: previewAutoencoders,
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
