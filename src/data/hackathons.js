export const hackathons = [
  {
    id: 'anrgit',
    title: 'ANRGIT',
    event: { es: 'Hackathon 2026', en: '2026 Hackathon' },
    description: {
      es: 'Reto de la Hackathon 2026: dashboard interactivo (Chart.js) que cruza los vehículos por etiqueta ambiental con la calidad del aire de Zaragoza.',
      en: '2026 Hackathon challenge: an interactive dashboard (Chart.js) crossing vehicles by environmental label with Zaragoza air-quality readings.',
    },
    highlights: {
      es: [
        '95 matrículas registradas a mano en un punto de control de Zaragoza durante el evento, clasificadas por etiqueta ambiental (B, C, ECO, 0, sin distintivo).',
        'Los vehículos más contaminantes (etiqueta B y sin distintivo) son 40 de los 95 registrados y generan ≈3960 g CO₂/km cada grupo, frente a ≈1470 g/km de los ECO; los 0 emisiones no contaminan.',
        'Cruce con datos reales de calidad del aire de la estación de Renovales (Zaragoza): ese día el AQI era 18 (aire bueno) pese al volumen de tráfico contaminante — la contaminación potencial de una calle no se traduce de forma lineal en la calidad del aire medida.',
      ],
      en: [
        '95 license plates logged by hand at a Zaragoza checkpoint during the event, classified by environmental label (B, C, ECO, 0, no label).',
        'The most polluting vehicles (label B and no-label) are 40 of the 95 logged and generate ≈3960 g CO₂/km per group, versus ≈1470 g/km for ECO vehicles; zero-emission ones contribute nothing.',
        'Cross-referenced with real air-quality data from the Renovales station (Zaragoza): that day\'s AQI was 18 (good air) despite the share of polluting traffic — a street\'s potential pollution does not translate linearly into measured air quality.',
      ],
    },
    tech: ['JavaScript', 'Chart.js', 'HTML', 'Fetch API'],
    links: {
      github: 'https://github.com/JuanMiguelAbellan/ANRGIT',
    },
  },
  {
    id: 'aws-jamrock-huesca',
    title: 'AWS JamRock',
    event: { es: 'Huesca · 2025', en: 'Huesca · 2025' },
    description: {
      es: 'Reto de construir una aplicación usando una inteligencia artificial que AWS acababa de presentar en ese mismo momento.',
      en: 'Challenge to build an application using an AI that AWS had just unveiled at that very event.',
    },
    tech: ['AWS'],
  },
  {
    id: 'aws-jam-zaragoza',
    title: 'AWS Jam',
    event: { es: 'Zaragoza · 2025', en: 'Zaragoza · 2025' },
    description: {
      es: 'Jam de resolución de retos en AWS, mismo formato que la de el Pirámide (Huesca) pero en Zaragoza.',
      en: 'AWS challenge-solving Jam, same format as the Pirámide (Huesca) one but held in Zaragoza.',
    },
    tech: ['AWS'],
  },
  {
    id: 'aws-deepracer',
    title: 'AWS DeepRacer',
    event: { es: 'Liga online España · 2024', en: 'Spain online league · 2024' },
    description: {
      es: '5º puesto en la fase online de España de la liga AWS DeepRacer: entrenamiento de un modelo de aprendizaje por refuerzo para pilotar un coche autónomo a escala.',
      en: '5th place in the Spain online round of the AWS DeepRacer League: trained a reinforcement-learning model to drive a scale autonomous car.',
    },
    tech: ['AWS DeepRacer', 'Reinforcement Learning'],
  },
  {
    id: 'aws-jam-piramide-huesca',
    title: 'AWS Jam — Pirámide',
    event: { es: 'Huesca · 2024', en: 'Huesca · 2024' },
    description: {
      es: 'Jam de resolución de retos en AWS en el edificio Pirámide (Walqa, Huesca).',
      en: 'AWS challenge-solving Jam at the Pirámide building (Walqa, Huesca).',
    },
    tech: ['AWS'],
  },
]
