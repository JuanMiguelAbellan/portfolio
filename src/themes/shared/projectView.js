// Vista derivada de un proyecto, compartida por los 3 temas: mismo
// origen de datos (src/data/projects.js), mismo orden (destacado
// primero), mismos campos calculados (título por idioma, tech
// recortada...). Cada tema añade encima lo que sea suyo.
export function proyectosOrdenados(projects) {
  return [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

export function derivarProyecto(p, i, lang, t) {
  const title = lang === 'en' && p.titleEn ? p.titleEn : p.title
  const techTop = p.tech.slice(0, 3)
  const more = p.tech.length - techTop.length
  return {
    ...p,
    title,
    img: p.preview,
    summary: p.summary[lang],
    techTop,
    techStr: techTop.join(' / '),
    techMore: more > 0 ? '+' + more : '',
    num: String(i + 1).padStart(2, '0'),
    aria: `${t.projects.openDetails} ${title}`,
    featuredLabel: t.projects.featuredLabel,
  }
}
