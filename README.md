# Portfolio — Juan Miguel Abellán

Portfolio personal, en React + Vite, bilingüe (ES/EN). Sin backend: contenido de proyectos y skills en `src/data/`, textos de interfaz en `src/i18n/`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Sistema de temas

El sitio tiene **tres temas visuales completos**, elegibles con la píldora fija de abajo:

| Tema | Carpeta | Identidad |
| --- | --- | --- |
| **Latente** (por defecto) | `src/themes/latente/` | Oscuro y ámbar. Hero con un "espacio de embeddings" en canvas: el cursor es la consulta, los 7 puntos más cercanos se iluminan. |
| **Papel** | `src/themes/papel/` | Claro y bermellón. Retícula de cruces de fondo, nombre con grosor de letra variable según el cursor, tarjetas de proyecto `sticky` que se apilan. |
| **ASCII** | `src/themes/ascii/` | Azul y lima. Campo de caracteres generado por ruido con una lente bajo el cursor, texto que se descifra (scramble) al aparecer, tarjetas con tilt 3D. |

Cada sección (`Header`, `Hero`, `About`, `Projects`, `Hackathons`, `Skills`, `Contact`) tiene un componente "router" en `src/components/` que elige la variante según `useTheme()`. Los tres temas comparten los mismos datos (`src/data/*`) y textos (`src/i18n/translations.js`) — nunca hay contenido duplicado o distinto entre temas, solo el layout y las animaciones cambian.

**Estado y tokens**: `src/theme/ThemeContext.jsx` guarda el tema en `localStorage` (`jma-theme`); `src/theme/tokens.js` tiene los valores exactos por tema (`TK`) como objeto JS, usados por los canvas (que no pueden leer variables CSS) — las mismas paletas están también en `src/index.css` como variables CSS (`--bg`, `--ink`, `--accent`...) para el resto de componentes. El modal de proyecto es uno solo (`src/themes/shared/ProjectModal.jsx`) y se adapta con esas variables.

**Cambio de tema**: una cortina (`src/components/ThemeSwitcher.jsx`) crece con `clip-path: circle()` desde el punto del clic, cambia el tema y se encoge — instantáneo si el sistema pide `prefers-reduced-motion`.

### Los hooks de efectos

Viven en `src/hooks/` y cada uno monta su propio `requestAnimationFrame`/listeners y los limpia al desmontarse (por eso cambiar de tema varias veces seguidas no deja animaciones de fondo colgadas: cada canvas vive dentro del componente de su tema, no de un singleton global):

- `useEmbeddingField`, `useCrossGrid`, `useAsciiField` — los tres fondos de canvas.
- `useScrollReveal`, `useWordLight`, `useWordStagger`, `useMaskReveal`, `useNameStagger`, `useScramble`, `useDecodeText` — revelados de texto.
- `useCircleReveal`, `useStickyStack`, `useVariableWeight`, `useAboutPanelScroll`, `useBigTitleScroll`, `usePapelTono` — efectos ligados al scroll o al cursor específicos de un tema.
- `usePointerFino` — detecta `(hover: hover) and (pointer: fine)`; los efectos que solo tienen sentido con ratón (vista previa flotante, tilt, grosor variable) se desactivan en táctil y cada fondo cae en su recorrido automático.

Todos respetan `prefers-reduced-motion`: sin eso, los canvas pintan un único frame estático, los revelados aparecen ya visibles y no hay scroll-scrub. Los tres canvas paran el `requestAnimationFrame` de verdad (no solo se saltan el dibujo) cuando salen del viewport o la pestaña se oculta, con `ResizeObserver` para el tamaño y `devicePixelRatio` limitado a 2.

### Añadir o tocar un tema

La referencia visual y de comportamiento (colores exactos, curvas de animación, algoritmos de los canvas) está en `design/Portfolio.dc.html` — un prototipo de un solo archivo que no se ejecuta en este proyecto, solo se lee como especificación.

## Añadir un proyecto nuevo

Editar `src/data/projects.js` — `featured: true` lo manda primero y le añade la etiqueta de destacado; el resto del campo es igual para todos. `description` y `highlights` van en `{ es, en }`.

## Stack

React 19, Vite, sin librerías de UI ni de i18n — CSS propio por componente y un contexto de idioma minimalista (`src/i18n/LanguageContext.jsx`).
