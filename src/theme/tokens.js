// Valores exactos del prototipo (design/Portfolio.dc.html, objeto TK).
// bg/page: bg = superficie elevada (tarjetas, modal, píldora del selector); page = fondo de la página.
export const TK = {
  latente: {
    bg: '#1d1a17', page: '#151311', ink: '#efebe3', soft: '#cfc9be',
    accent: '#f0a83a', accentInk: '#151311', muted: '#a29d94', line: '#3a362f',
    font: "'Archivo', sans-serif", head: "'Archivo', sans-serif", mono: "'JetBrains Mono', monospace",
    radius: '0px', pill: '0px', overlay: 'rgba(10, 9, 8, 0.82)',
  },
  papel: {
    bg: '#fbfaf6', page: '#f4f1ea', ink: '#1d1b17', soft: '#4d4941',
    accent: '#e0482a', accentInk: '#f4f1ea', muted: '#6b665c', line: '#cfc9bc',
    font: "'Bricolage Grotesque', sans-serif", head: "'Bricolage Grotesque', sans-serif", mono: "'IBM Plex Mono', monospace",
    radius: '20px', pill: '999px', overlay: 'rgba(29, 27, 23, 0.55)',
  },
  ascii: {
    bg: '#212a60', page: '#1a2152', ink: '#eef0f7', soft: '#c9cde3',
    accent: '#cdeb4f', accentInk: '#1a2152', muted: '#8f96bf', line: '#3a4378',
    font: "'Space Mono', monospace", head: "'Big Shoulders Display', sans-serif", mono: "'Space Mono', monospace",
    radius: '0px', pill: '0px', overlay: 'rgba(10, 14, 40, 0.82)',
  },
}

// Papel cicla el fondo de página por sección (data-theme="paper|ink|red" en el prototipo).
export const PAPEL_SECCIONES = {
  paper: { bg: '#f4f1ea', ink: '#1d1b17', rgb: [29, 27, 23] },
  ink: { bg: '#1d1b17', ink: '#f4f1ea', rgb: [244, 241, 234] },
  red: { bg: '#e0482a', ink: '#1d1b17', rgb: [29, 27, 23] },
}

export const THEME_ORDER = ['latente', 'papel', 'ascii']

export const THEME_LABELS = {
  latente: { es: 'Latente', en: 'Latente' },
  papel: { es: 'Papel', en: 'Papel' },
  ascii: { es: 'ASCII', en: 'ASCII' },
}

// Etiquetas flotantes del campo de embeddings (tema Latente).
export const EMBEDDING_WORDS = [
  'pgvector', 'RAG', 'Ollama', 'BM25', 'bge-m3', 'embeddings', 'React', 'TypeScript',
  'PostgreSQL', 'Docker', 'WebSockets', 'SSE', 'Playwright', 'MCP', 'ReAct', 'VAE',
  'Keras', 'Node.js', 'Express', 'Fastify', 'Next.js', 'Stripe', 'zod', 'Laravel',
  'Railway', 'LISTEN/NOTIFY', 'exclusion constraint', 'fractional index', 'MRR 0.947',
  'recall@5', 'nomic-embed', 'TensorFlow.js', 'SKIP LOCKED', 'RRF', 'qwen2.5:3b', 'pdf.js',
]

// Alfabeto del efecto scramble (tema ASCII).
export const SCRAMBLE_GLYPHS = '!<>-_\\/[]{}=+*^?#01'
