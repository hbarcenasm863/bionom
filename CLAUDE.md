# Instrucciones para Claude en este repositorio (BioNom)

BioNom es el sitio de biología del docente, hermano de ChromaNom (química
orgánica) e IonNom (química inorgánica). Toma las mismas ideas: páginas de
teoría muy interactivas, juego con Modo Libre y Modo Estudiante, generador
docente y PWA instalable. Todo se organiza alrededor del **mapa de niveles de
organización** de la portada (`index.html`).

## Regla 0: leer primero `HISTORIAL_CAMBIOS.md`

Al empezar **cualquier** sesión en este repositorio, Claude lee primero
`HISTORIAL_CAMBIOS.md` (empezando por la versión más reciente) antes de tocar
código o responder sobre el proyecto. Ahí está todo lo hecho, lo pendiente y los
pasos manuales.

## Push a `main`

El docente estableció (10-11-2026) que hacer **push a `main` está autorizado**:
cuando una tarea queda lista y probada, Claude hace commit y push a `main` sin
volver a preguntar. Si en una sesión el docente indica otra cosa, se respeta lo
que diga en esa sesión.

## Regla obligatoria: registrar cada sesión en `HISTORIAL_CAMBIOS.md`

Al terminar cada sesión que modifique archivos, Claude DEBE, sin que se lo
pidan:

1. Agregar una entrada nueva **arriba de todas** en `HISTORIAL_CAMBIOS.md`,
   con número de versión (1.1, 1.2… o 2 si el cambio es grande), fecha, contexto (qué pidió el docente y por qué), cambios por archivo
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
  (por ejemplo `bionom-v12` → `bionom-v13`) y el `?v=` de las páginas en el
  mismo commit. No repetir archivos en `ASSETS`: un archivo repetido hace
  fallar la instalación de la app.

- **Emojis:** no usar banderas (Windows no las dibuja: para Colombia usar
  `<span class="co"></span>`) ni emojis de la versión 12 en adelante (🫁 🫀
  🫘 🫧 🪸 🩸 🟢…), porque en el Windows del docente salen como
  rectángulos negros.

## Arquitectura

| Archivo | Qué es |
|---|---|
| `bio.css` | Estilos comunes y componentes (`.chequeo`, `.pasos`, `.flip`, `.tabs`, `.term`, `.fig`/`.det`, `.tl`, clasificador). Usa los nombres de clase de ChromaNom (`.cn-page-head`, `.sec`, `.cn-btn`) para que funcionen `narracion.js` y `actividades.css`. |
| `bio.js` | Menú, barra inferior del celular, pie, progreso en `localStorage` (`bionom_visitas`, `bionom_secciones`), montaje de componentes y `BIO.clasificar()`. La lista `MODULOS` dice qué niveles de organización estudia cada módulo: la usa el mapa de la portada. |
| `index.html` | Mapa interactivo de los 13 niveles de organización. |
| `celula.html`, `reinos.html`, `sistemas.html`, `reproduccion.html`, `genetica.html`, `evolucion.html`, `ecosistemas.html`, `regiones.html`, `ambiente.html` | Módulos de contenido. `cuerpo.js` dibuja el cuerpo humano; `fondo-plantas.svg` es el fondo de plantas de Colombia. |
| `mapa-colombia.js` | Contornos simplificados de las regiones naturales y departamentos (de los límites del DANE/MGN 2018). La franja del Pacífico en Valle, Cauca y Nariño es aproximada. |
| `banco.js` | Banco de preguntas del juego y del generador (`BANCO_BIO`), al menos 40 por tema. Cada pregunta lleva `p` (2 pistas: general y concreta, sin la respuesta) y `exp` (explicación completa). Al final, `BIO_AJ` agrega pistas a preguntas existentes y `BIO_NUEVAS` agrega preguntas. |
| `retos.js` | Reglas comunes de los juegos de los tres sitios (mismo archivo en ChromaNom e IonNom): 3 intentos con pistas progresivas, crucigrama y sopa de letras de 10 palabras, ahorcado y tiempos según la dificultad. No tiene bancos: cada sitio le pasa los suyos. |
| `juego.html` | Juego con Modo Libre y Modo Estudiante. |
| `docente.html` | Panel docente con 10 pestañas: Guías de 4 sesiones, Talleres y Evaluaciones tipo Saber 11 (`docente-app.js`, contenido en `docente-datos.js`), Laberintos (`laberinto.js`, copia del de ChromaNom con preguntas de `banco.js`), Crucigramas (`crucigrama.js`, armado con `retos.js`), Ahorcado y Sopa (`ahorcado.js`, `sopa.js`), Criptograma genético, Mapa conceptual y Detective biológico (`extras.js`, el mismo archivo de ChromaNom e IonNom, con `window.EXTRAS_SITIO`). No tiene pestaña de orientaciones: los pasos del Modo Estudiante están en `README.md`. |
| `docente-datos.js` | Solo contenido del panel docente: `TEMAS` (sesión 1 de aprendizajes previos, sesión 2 con lectura y mapa de ideas, autoevaluación «Puedo…»), `SABER` (10 preguntas tipo Saber 11 por tema; la primera opción es la correcta en el archivo), `ABIERTAS` y `window.DETECTIVE` (una historia por tema con 8 frases dudosas). |
| `bionom-analytics.gs` | Backend de Google Apps Script del Modo Estudiante (copiado de IonNom). |

## Regla de contenido

Las fórmulas químicas que aparezcan (por ejemplo en biomoléculas) siguen la
regla de los otros sitios: nunca con ramas entre paréntesis; usar fórmula
molecular (C₆H₁₂O₆) o figuras.
