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
  **Subir `CACHE` en cada publicación**, aunque solo cambie un `.html`: el
  aviso «Nueva versión disponible» de la app instalada solo aparece cuando
  cambia `sw.js` (versión 2.25).

- **Emojis:** no usar banderas (Windows no las dibuja: para Colombia usar
  `<span class="co"></span>`) ni emojis de la versión 12 en adelante (🫁 🫀
  🫘 🫧 🪸 🩸 🟢…), porque en el Windows del docente salen como
  rectángulos negros.

## Arquitectura

| Archivo | Qué es |
|---|---|
| `bio.css` | Para texto naranja usar `--cn-naranja-tx` (contraste AA), no `--cn-naranja`. Estilos comunes y componentes (`.chequeo`, `.pasos`, `.flip`, `.tabs`, `.term`, `.fig`/`.det`, `.tl`, clasificador). Usa los nombres de clase de ChromaNom (`.cn-page-head`, `.sec`, `.cn-btn`) para que funcionen `narracion.js` y `actividades.css`. |
| `bio.js` | Menú, barra inferior del celular, pie, progreso en `localStorage` (`bionom_visitas`, `bionom_secciones`), montaje de componentes y `BIO.clasificar()`. La lista `MODULOS` dice qué niveles de organización estudia cada módulo: la usa el mapa de la portada. |
| `index.html` | Mapa interactivo de los 13 niveles de organización. |
| Orden de los módulos | Desde la versión 2.26 (auditoría de secuencia 6.°–9.°): Célula → División → Reinos → Ecosistemas → Ecosistemas de Colombia → Ambiente → Sistemas (Funciones, Nutrición) → Reproducción → Genética → Evolución. Si se agrega o mueve un módulo, actualizar `MODULOS` y los botones `.sig` de las páginas vecinas. Lo que sea de 10.°–11.° se marca con `<span class="nivel-prof">Profundización 10.°–11.°</span>` en su título. |
| Subpáginas | Un módulo con `padre:'id'` en `MODULOS` es subpágina de ese tema: no sale en el menú de arriba, sale sangrado en «Más», y `bio.js` pone arriba la barra `.sub-nav` de la familia. Hoy `funciones.html` y `nutricion.html` son subpáginas de `sistemas.html`. **Regla:** las páginas nuevas se agregan como subpáginas de un tema principal y con sus `niveles`, para que cuelguen del mapa de niveles de organización sin desordenar el menú. |
| Modelo de reinos | El docente escoge 5, 6 o 7 reinos y con o sin dominios (en `reinos.html` o en el recuadro de `docente.html`). Se guarda en `bionom_clasificacion` o llega por el enlace `?reinos=6&dominios=si`; `window.BIO_CLASIF` (en `bio.js`) lo lee. Los datos de reinos llevan `m:'5'|'6'|'7'|'56'|'67'` (modelos en que sirven) y `d:1` (solo con dominios), y `banco.js`, `docente-datos.js` y `ahorcado-datos.js` filtran o ajustan al cargar. **Regla:** contenido nuevo de reinos que dependa del modelo debe llevar esas marcas o nombrar el modelo («en el modelo de cinco reinos»). |
| `celula.html`, `microscopio.html`, `division.html`, `reinos.html`, `sistemas.html`, `funciones.html`, `nutricion.html`, `reproduccion.html`, `genetica.html`, `evolucion.html`, `ecosistemas.html`, `regiones.html`, `ambiente.html` | Módulos de contenido. `cuerpo.js` dibuja el cuerpo humano; `fondo-plantas.svg` es el fondo de plantas de Colombia. |
| `mapa-colombia.js` | Contornos simplificados de las regiones naturales y departamentos (de los límites del DANE/MGN 2018). La franja del Pacífico en Valle, Cauca y Nariño es aproximada. |
| `repro-anim.js` | Animaciones con volumen de `reproduccion.html` (`ANIM.montar(el,'nombre')` o `<div data-anim="nombre">`). Cada paso dibuja la escena según su avance; los degradados llevan nombres únicos por animación. |
| `banco.js` | Banco de preguntas del juego y del generador (`BANCO_BIO`), al menos 40 por tema y al menos 40 cortas por tema para los laberintos (opciones de hasta 36 caracteres o verdadero/falso). Cada pregunta lleva `p` (2 pistas: general y concreta, sin la respuesta) y `exp` (explicación completa). Al final, `BIO_AJ` agrega pistas a preguntas existentes y `BIO_NUEVAS` agrega preguntas. |
| `retos.js` | Reglas comunes de los juegos de los tres sitios (mismo archivo en ChromaNom e IonNom): 3 intentos con pistas progresivas, crucigrama y sopa de letras de 10 palabras, ahorcado y tiempos según la dificultad. No tiene bancos: cada sitio le pasa los suyos. |
| `juego.html` | Juego con Modo Libre y Modo Estudiante. Tiene niveles Básico (6.°–7.°), Medio (8.°–9.°) y Completo (10.°–11.°): `nivelDe()` da a cada pregunta y palabra su nivel mínimo por tema y por palabras clave; se guarda en `bionom_nivel_juego` o llega con `?nivel=basico|medio|completo`. Si se agrega un tema o contenido de profundización, revisar esas listas. |
| `docente.html` | Panel docente con 10 pestañas: Guías de 4 sesiones, Talleres y Evaluaciones tipo Saber 11 (`docente-app.js`, contenido en `docente-datos.js`), Laberintos (`laberinto.js`, copia del de ChromaNom con preguntas de `banco.js`), Crucigramas (`crucigrama.js`, armado con `retos.js`), Ahorcado y Sopa (`ahorcado.js`, `sopa.js`), Criptograma genético, Mapa conceptual y Detective biológico (`extras.js`, el mismo archivo de ChromaNom e IonNom, con `window.EXTRAS_SITIO`). No tiene pestaña de orientaciones: los pasos del Modo Estudiante están en `README.md`. |
| `docente-datos.js` | Solo contenido del panel docente: `TEMAS` (sesión 1 de aprendizajes previos, sesión 2 con lectura y mapa de ideas, autoevaluación «Puedo…»), `SABER` (40 preguntas tipo Saber 11 por tema; la primera opción es la correcta en el archivo), `ABIERTAS` (40 por tema) y `window.DETECTIVE` (5 historias por tema, cada una con 8 frases dudosas). Lo agregado en la versión 2.4 está al final del archivo, dentro de un bloque que hace `push`. |
| `saber-icfes.js`, `icfes-datos.js`, `img/icfes/` | Modelo basado en evidencias del Icfes. `saber-icfes.js` (el mismo archivo en ChromaNom e IonNom) tiene las competencias y afirmaciones de la prueba Saber 11, reparte las preguntas de la evaluación entre las tres competencias y arma la matriz. `icfes-datos.js` tiene las preguntas oficiales del cuadernillo 2026 que son de biología, **copiadas sin cambios y siempre con su crédito**. Las preguntas nuevas tipo Saber deben llevar `c` ('uso', 'exp' o 'ind') y `af` (código de la afirmación). Una pregunta puede traer sus datos en `tabla:[[encabezados],[fila]…]` o en `graf:{tipo:'lin'|'bar',x,y|series,ex,ey,ymin}`; `saber-icfes.js` las dibuja (evaluación y juego). |
| `saber-juego.js`, `herramientas/generar-saber-juego.js` | Preguntas Saber del panel docente pasadas al juego (generadas: si cambian las de `docente-datos.js`, volver a correr `node herramientas/generar-saber-juego.js`). |
| `fotos.js`, `fotos-datos.js`, `img/fotos/` | Fotos reales de bancos libres con su cita APA debajo (`FOTO(clave,pie)`). Ver «Regla de imágenes». |
| `modelo3d.js` | Modelos 3D en canvas que se giran con el dedo (`M3D.montar(el,'atomo_O')`; también `atomo_C`, `atomo_Fe`, `adn`, `clorofila`, `melanina`). Los usa el mapa de niveles de la portada. **No** volver a poner desplazamientos automáticos de la página al tocar algo: hacían bajar la pantalla en el celular (versión 2.18). En su lugar, `bio.js` muestra el recuadro flotante `.flota-exp` cuando la explicación queda fuera de la vista (versión 2.21). |
| `microlab.js`, `microscopio.html` | Laboratorio virtual de microscopía en su propia página (`microscopio.html`, subpágina de La célula, `<div id="microlab">`). En el celular se usa en horizontal: en vertical pide girar (pantalla completa + `screen.orientation.lock`): muestras, tinciones, objetivos, tornillos, diafragma, aceite de inmersión, retos y medición. |
| Conclusiones | `<div class="conclusion" data-lab="id" data-tabla="id-tabla" data-titulo="…">` (en `bio.js`): recuadro «Escribe tu conclusión» que se guarda en el equipo y se imprime como informe. Ponerlo en todo laboratorio nuevo. |
| Pantalla completa | `bio.js` pone el botón «⛶ Pantalla completa» en cada simulación de las páginas de contenido: la detecta sola (recuadros `.card`, `.lado` o `.cuerpo-wrap` con `canvas`, `svg` con id, deslizadores, `data-anim` o pasos animados) o se marca a mano con `data-pantalla="Nombre"`. En el celular gira a horizontal si puede; en iPhone usa un modo de respaldo que llena la pantalla (sale con el botón o Esc). **Toda simulación nueva debe quedar con este botón**: si la detección no la encuentra, ponerle `data-pantalla`. |
| `embrion-fig.js` | Ilustraciones del desarrollo embrionario humano (`EMB.fig(clave)`) para «Semana a semana» y «De la fecundación al parto». |
| `MATRIZ_MEN.md` | Cobertura de cada Estándar Básico de Competencias del MEN (6.° a 11.°) y dónde se trabaja. Actualizarla si se agrega o quita contenido. |
| `AUDITORIA_2026-11.md` | Informe de la auditoría biológica y didáctica (principios de Mayer) de la versión 2.13. |
| `bionom-analytics.gs` | Backend de Google Apps Script del Modo Estudiante (copiado de IonNom). |

## Regla de imágenes: fotos reales de bancos libres, siempre con cita APA

Establecida por el docente (10-11-2026). Cuando una foto real explique mejor
que un dibujo (organismos, ecosistemas y especies de Colombia, micrografías,
embriones, ecografías, retratos de científicos, documentos históricos), usar
imágenes de **bancos de imágenes libres** en vez de emojis o dibujos
improvisados. Los esquemas interactivos y las animaciones se mantienen donde
expliquen mejor un proceso.

- **Fuentes** (dominios ya permitidos en el entorno): Wikimedia Commons
  (`commons.wikimedia.org`, `upload.wikimedia.org`, `thumb.wikimedia.org`),
  Openverse (`api.openverse.org`, buscador de imágenes Creative Commons que
  incluye Flickr y Commons) e iNaturalist (`api.inaturalist.org`, ideal para
  especies). Pixabay, Unsplash y Pexels piden clave de API: no se usan por
  ahora. La API de Commons limita consultas seguidas (error 429): buscar con
  Openverse y pedir a Commons solo los metadatos finales, en una consulta.
- **Licencias aceptadas**: CC0, dominio público, CC BY y CC BY-SA. Evitar NC
  y ND. Revisar cada foto antes de usarla (que sea lo que dice, sin nombres
  de pacientes en ecografías, sin imágenes sangrientas para estudiantes).
- **Cita APA debajo de cada imagen, siempre**: Autor. (Año). *Título*
  [Fotografía]. Fuente. URL. Licencia. Para obras antiguas, el autor y el año
  originales (Hooke, R. (1665)…); sin año conocido, «s. f.».
- **Cómo se hace**: la foto se guarda en `img/fotos/<clave>.jpg` (máx. 800 px,
  JPG calidad ~74) y sus datos en `fotos-datos.js` (`window.FOTOS_DATOS`:
  autor, anio, titulo, tipo, fuente, url, lic, licUrl). En la página se usa
  `FOTO('clave','pie de foto')` o `<div data-foto="clave" data-pie="..."></div>`
  (cargar `fotos-datos.js` y `fotos.js` antes de `bio.js`). `fotos.js` arma
  la figura con la cita APA debajo.

## Regla didáctica: principios de Mayer

Desde la auditoría de la versión 2.13 (ver `AUDITORIA_2026-11.md`), todo módulo
nuevo o modificado debe mantener: recuadro de palabras clave al inicio
(`.pre-claves`, preentrenamiento); texto junto a su figura y explicaciones que
queden a la vista en el celular (contigüidad espacial); contenido por pasos o
pestañas al ritmo del estudiante (segmentación); al menos dos chequeos con
explicación de cada error por módulo; y párrafos de menos de 80 palabras
(coherencia). La narración solo lee lo visible: no romper eso.

**Semanas del embarazo**: siempre en semanas de embarazo (desde la última
menstruación, 40 en total); si se da la edad desde la fecundación, decirlo
explícitamente. **ATP de la respiración**: unos 30 a 32 por glucosa.

## Regla de contenido

Las fórmulas químicas que aparezcan (por ejemplo en biomoléculas) siguen la
regla de los otros sitios: nunca con ramas entre paréntesis; usar fórmula
molecular (C₆H₁₂O₆) o figuras.

## Meta de contenido del panel docente

Cada tema (los 12 de `TEMAS_JUEGO`, incluidos División celular, Funciones vitales comparadas y Nutrición y salud) debe tener **al
menos 40** de cada cosa:
- preguntas del Juego y 40 cortas para los laberintos (`banco.js`);
- preguntas tipo Saber 11 y preguntas abiertas (`docente-datos.js`);
- palabras con 3 pistas para ahorcado, sopa, crucigrama y criptograma
  (`ahorcado-datos.js`). Una palabra no se repite en todo el banco y su
  pista 1 es corta (palabra + pista 1 ≤ 95 caracteres, por el criptograma);
- 40 frases dudosas en el detective (5 historias de 8; máximo 3 por párrafo).
Si se agrega un tema, también hay que sumarlo a `TEMAS_PRINCIPALES` de
`bionom-analytics.gs` (y redesplegarlo) y a las casillas del laberinto en
`docente.html`.
