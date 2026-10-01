import { projects } from './projects'
import { hackathons } from './hackathons'

// El recuento de tests no es un campo estructurado en projects.js (vive
// como texto suelto dentro de los highlights de cada proyecto), así que
// aquí va a mano: reciclab2b 151 + reservas 43+13 + tablero 52+9 +
// rag-eval 43 + docs-search-mcp 30 + react-agent-loop 14 = 355.
export const stats = [
  { id: 'proyectos', valor: projects.length, sufijo: '', label: { es: 'Proyectos construidos', en: 'Projects built' } },
  { id: 'tests', valor: 355, sufijo: '+', label: { es: 'Tests automatizados', en: 'Automated tests' } },
  { id: 'hackathons', valor: hackathons.length, sufijo: '', label: { es: 'Hackathons y jams', en: 'Hackathons & jams' } },
  { id: 'rag', valor: 38, prefijo: '+', sufijo: '%', label: { es: 'Mejora medida de MRR en RAG', en: 'Measured RAG MRR gain' } },
]
