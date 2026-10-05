# Portfolio — Juan Miguel Abellán

Portfolio personal, en React + Vite, bilingüe (ES/EN). Sin backend: contenido de proyectos y skills en `src/data/`, textos de interfaz en `src/i18n/`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Diseño

Oscuro y ámbar. El hero tiene un "espacio de embeddings" en canvas: el cursor hace de consulta, los 7 puntos más cercanos se iluminan y se unen a él con una línea; sin ratón (o en táctil) la consulta sigue una curva automática. Las secciones viven en `src/themes/latente/`, con un modal de proyecto compartido en `src/themes/shared/ProjectModal.jsx`.

Este diseño nació de probar tres temas visuales completos a la vez (ver `design/Portfolio.dc.html`, el prototipo de un solo archivo del que salieron los colores y curvas de animación exactas); el código de los otros dos ya no está en el repo, pero algunas piezas de ese experimento se quedaron aquí: la disposición de "Sobre mí" y las tarjetas de Skills vienen de uno de esos temas, y el hover de relleno de Hackathons del otro.

### Los hooks de efectos

Viven en `src/hooks/` y cada uno monta su propio `requestAnimationFrame`/listeners y los limpia al desmontarse:

- `useEmbeddingField` — el canvas del hero.
- `useScrollReveal`, `useWordStagger`, `useNameStagger` — revelados de texto.
- `useCircleReveal` — el panel de Contacto, que se revela con un círculo atado al scroll (con inercia, no se abre de golpe si scrolleas rápido).
- `usePointerFino` — detecta `(hover: hover) and (pointer: fine)`; la vista previa flotante de Proyectos se desactiva en táctil.

Todos respetan `prefers-reduced-motion`: sin eso, el canvas pinta un único frame estático y los revelados aparecen ya visibles. El canvas para el `requestAnimationFrame` de verdad (no solo se salta el dibujo) cuando sale del viewport o la pestaña se oculta, con `ResizeObserver` para el tamaño y `devicePixelRatio` limitado a 2.

## Añadir un proyecto nuevo

Editar `src/data/projects.js` — `featured: true` lo manda primero y le añade la etiqueta de destacado; el resto del campo es igual para todos. `description` y `highlights` van en `{ es, en }`.

## Stack

React 19, Vite, sin librerías de UI ni de i18n — CSS propio por componente y un contexto de idioma minimalista (`src/i18n/LanguageContext.jsx`).
