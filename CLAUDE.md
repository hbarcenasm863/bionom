# Instrucciones para Claude en este repositorio (BioNom)

BioNom es el sitio de biología del docente, hermano de ChromaNom (química
orgánica) e IonNom (química inorgánica). Toma las mismas ideas: páginas de
teoría muy interactivas, juego con Modo Libre y Modo Estudiante, generador
docente y PWA instalable. Todo se organiza alrededor del **mapa de niveles de
organización** de la portada (`index.html`).

## Regla obligatoria: registrar cada sesión en `HISTORIAL_CAMBIOS.md`

Al terminar cada sesión que modifique archivos, Claude DEBE, sin que se lo
pidan:

1. Agregar una entrada nueva **arriba de todas** en `HISTORIAL_CAMBIOS.md`
   con: fecha, contexto (qué pidió el docente y por qué), cambios por archivo
   o tema, pasos manuales pendientes y lo que quedó sin resolver.
2. Dejar los cambios y la entrada en `main` (este repositorio no usa pull
   requests como flujo normal).
3. Hacer commit y push de la entrada junto con los cambios.

Si la sesión fue solo de consulta, no hace falta registrar nada.

## Convenciones

- El usuario es docente de biología/química en Colombia, no necesariamente
  técnico: explicaciones y mensajes de commit claros, en español, sin jerga.
- El docente es hombre: «el docente», «al docente», también en el historial,
  comentarios y commits.
- Antes de dar por resuelto un bug, reproducirlo con Playwright (Chromium
  está disponible).
- Para probar el Modo Estudiante usar el código **`110106`**.
- `juego.html` y las demás páginas se sirven directo por GitHub Pages: basta
  hacer push a `main`.
- `bionom-analytics.gs` NO se despliega solo: hay que copiarlo al editor de
  Apps Script y crear una nueva versión de la implementación (Implementar →
  Administrar implementaciones → Editar → Nueva versión). Avisar siempre.
  Redesplegar ≠ recalcular: las hojas de estadísticas solo se reescriben con
  `recalcularAhora()` o con el disparador automático de 30 min.
- **Service worker y `?v=`.** Los `.js` y `.css` locales se piden con
  `?v=N` en todas las páginas y `sw.js` los sirve «red primero». Si se agrega
  un archivo o cambia mucho un CSS/JS, subir `CACHE` en `sw.js`
  (`bionom-v1` → `bionom-v2`) y el `?v=` de las páginas en el mismo commit.

## Arquitectura

| Archivo | Qué es |
|---|---|
| `bio.css` | Estilos comunes y componentes (`.chequeo`, `.pasos`, `.flip`, `.tabs`, `.term`, `.fig`/`.det`, `.tl`, clasificador). Usa los nombres de clase de ChromaNom (`.cn-page-head`, `.sec`, `.cn-btn`) para que funcionen `narracion.js` y `actividades.css`. |
| `bio.js` | Menú, barra inferior del celular, pie, progreso en `localStorage` (`bionom_visitas`, `bionom_secciones`), montaje de componentes y `BIO.clasificar()`. La lista `MODULOS` dice qué niveles de organización estudia cada módulo: la usa el mapa de la portada. |
| `index.html` | Mapa interactivo de los 13 niveles de organización. |
| `celula.html`, `reinos.html`, `sistemas.html`, `genetica.html`, `evolucion.html`, `ecosistemas.html`, `regiones.html` | Módulos de contenido. |
| `mapa-colombia.js` | Contornos simplificados de las regiones naturales y departamentos (de los límites del DANE/MGN 2018). La franja del Pacífico en Valle, Cauca y Nariño es aproximada. |
| `banco.js` | Banco de preguntas del juego y del generador (`BANCO_BIO`), al menos 40 por tema. Cada pregunta lleva `p` (2 pistas: general y concreta, sin la respuesta) y `exp` (explicación completa). Al final, `BIO_AJ` agrega pistas a preguntas existentes y `BIO_NUEVAS` agrega preguntas. |
| `retos.js` | Reglas comunes de los juegos de los tres sitios (mismo archivo en ChromaNom e IonNom): 3 intentos con pistas progresivas, crucigrama y sopa de letras de 10 palabras, ahorcado y tiempos según la dificultad. No tiene bancos: cada sitio le pasa los suyos. |
| `juego.html` | Juego con Modo Libre y Modo Estudiante. |
| `docente.html` | Generador de talleres y evaluaciones, ahorcado y sopa de letras (`ahorcado.js`, `sopa.js` y `actividades.css` vienen de ChromaNom; las palabras están en `ahorcado-datos.js`). |
| `bionom-analytics.gs` | Backend de Google Apps Script del Modo Estudiante (copiado de IonNom). |

## Regla de contenido

Las fórmulas químicas que aparezcan (por ejemplo en biomoléculas) siguen la
regla de los otros sitios: nunca con ramas entre paréntesis; usar fórmula
molecular (C₆H₁₂O₆) o figuras.
