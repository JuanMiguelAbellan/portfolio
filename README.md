# Portfolio — Juan Miguel Abellán

Portfolio personal, en React + Vite, bilingüe (ES/EN). Sin backend: contenido de proyectos y skills en `src/data/`, textos de interfaz en `src/i18n/`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Añadir un proyecto nuevo

Editar `src/data/projects.js` — cada entrada admite `featured: true` para la tarjeta grande, o `false` para la rejilla de proyectos secundarios. `description` y `highlights` van en `{ es, en }`.

## Stack

React 19, Vite, sin librerías de UI ni de i18n — CSS propio y un contexto de idioma minimalista (`src/i18n/LanguageContext.jsx`).
