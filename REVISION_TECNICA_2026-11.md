# Revisión técnica y visual de BioNom — 11 de noviembre de 2026

Informe para el docente. Explica, sin tecnicismos, qué se revisó en el sitio,
qué fallas se encontraron, qué se arregló y qué quedó pendiente.

## 1. Qué se probó

Todo se probó con un navegador automático (Playwright con Chromium) que abre
las páginas como lo haría un estudiante, en cuatro tamaños de pantalla:

- computador (1366 × 850),
- tableta (1024 × 768),
- celular Android (Pixel 7) y celular iPhone (iPhone 13), **tocando la
  pantalla con toques reales**, no con clics de ratón.

Páginas revisadas: la portada (mapa de niveles), los 12 módulos (célula,
división, reinos, sistemas, funciones vitales, nutrición, reproducción,
genética, evolución, ecosistemas, regiones, ambiente), el juego y el panel
docente.

Qué se revisó en cada una:

1. **Errores**: errores de programación en la consola, archivos que no cargan
   (error 404), fotos rotas, y que todos los archivos que la app guarda para
   funcionar sin internet existan.
2. **Botones y ejercicios**: se tocaron uno por uno todos los botones,
   opciones de los chequeos, fichas de los clasificadores, tarjetas que se
   voltean, pestañas, pasos, palabras clave, partes de los dibujos (SVG) y
   botones de la narración (con una voz simulada). En cada toque se midió si
   la página se movía sola (lo que se corrigió en las versiones 2.14 y 2.18).
3. **Juego (modo libre)**: se jugaron 10 preguntas de **cada uno de los 13
   temas** (selección múltiple, verdadero o falso, respuesta escrita y
   ordenar), y además crucigrama, sopa de letras y ahorcado de dos temas, en
   celular Android, iPhone y computador.
4. **Panel docente**: se generaron las 10 pestañas (guía, taller,
   evaluación, laberinto, crucigrama, ahorcado, sopa, criptograma, mapa
   conceptual y detective) y se simuló la impresión de cada una, revisando
   que ninguna hoja se corte y que salga una hoja impresa por cada hoja de la
   vista previa.
5. **Diseño**: páginas más anchas que la pantalla, textos o tarjetas
   cortados, imágenes deformadas, botones demasiado pequeños para el dedo,
   colores de texto con poco contraste (norma WCAG AA), foco visible al
   navegar con el teclado y textos alternativos de las imágenes.
6. **Rendimiento**: peso de las imágenes y animaciones que siguen
   trabajando cuando no se ven.

## 2. Resultado general

El sitio está en buen estado. **No hubo ningún error de programación, ningún
archivo faltante, ninguna foto rota ni ninguna página más ancha que la
pantalla** en los cuatro tamaños. Todas las imágenes tienen texto alternativo
y ninguna se ve deformada. La página **no se mueve sola** al tocar ejercicios
(solo donde es a propósito: «Empezar reto» en Regiones y los niveles de la
portada). El juego funcionó en los 13 temas sin trabarse, y las 10 pestañas
del panel docente generan e imprimen bien (las hojas no se cortan).

## 3. Fallas encontradas y arreglos

| # | Falla | Dónde | Arreglo |
|---|---|---|---|
| 1 | Textos en **naranja claro** sobre fondo blanco casi no se leían (contraste 2,5 de 4,5 mínimo): años de la línea del tiempo, «hace 7 Ma» de los homínidos, el calendario de la Tierra, la semana del embarazo. | `celula.html`, `evolucion.html`, `reproduccion.html` | Nuevo color `--cn-naranja-tx` (naranja oscuro, #b45309) en `bio.css`, solo para **texto**. Los adornos y bordes siguen con el naranja de siempre. |
| 2 | **Azul** de textos y etiquetas un poco por debajo del mínimo (4,4). | Todo el sitio | `--cn-azul` pasa de #1a7fb5 a #1774a6 (casi igual a la vista) en `bio.css`, y el mismo cambio en los colores escritos dentro de las páginas. |
| 3 | La barra de **categorías de la UICN** (LC, NT, VU, EN, CR…) tenía letras blancas sobre verde claro, amarillo y naranja: casi ilegibles. | `regiones.html` | Letra oscura sobre los colores claros (NT, VU, EN); verde y rojo un poco más oscuros para LC y CR. También en la etiqueta de la especie escogida. |
| 4 | Las **bases del ADN** (A, T, C, G, U) tenían letra blanca sobre colores claros; la C (amarilla) casi no se leía. | `genetica.html` | Colores de las bases un poco más oscuros y letra oscura sobre la C. Lo mismo en el centrómero naranja del cromosoma y en los «?» grises del cuadro de Punnett. |
| 5 | Título del sistema escogido en el cuerpo humano con su color claro (contraste 3). | `sistemas.html` | El título usa el mismo color del sistema, oscurecido un 30 %. |
| 6 | En el celular, la **doble cadena de ADN** para completar no cabía: los dos últimos pares quedaban escondidos a la derecha y había que deslizar de lado sin saberlo. | `genetica.html` | En pantallas pequeñas la cadena se parte en dos filas, todo a la vista. |
| 7 | Botón **«⬇ Instalar»** del menú muy pequeño en el celular (36 × 30 px). | `pwa-install.js` | Ahora mide al menos 40 × 40 px. |
| 8 | **Funciones vitales** y **Nutrición y salud** (las subpáginas nuevas de la 2.16) no tenían el control de tamaño de letra (A− / A+) ni el botón de instalar, que sí tienen las demás páginas. | `funciones.html`, `nutricion.html` | Se agregaron `text-zoom.js` y `pwa-install.js`, como en las demás páginas. |
| 9 | Botones pequeños para el dedo: puntos de los pasos (34 px), botones de órganos en Sistemas y Reproducción (30 px) y leyenda de Regiones (32 px). | `bio.css`, `sistemas.html`, `reproduccion.html`, `regiones.html` | Puntos de 38 px; botones de 36 px. |
| 10 | Con el **teclado** (tecla Tab) no se veía qué parte del dibujo estaba seleccionada en el ciclo celular, el árbol de reinos y los marcadores del mapa de Colombia. | `division.html`, `reinos.html`, `regiones.html` | Se agregó un borde naranja oscuro visible al recibir el foco con el teclado (no cambia nada al tocar con el dedo). El contorno general del foco también pasó a naranja oscuro para que se vea mejor. |
| 11 | La animación de la **citocinesis** (célula animal y vegetal) se redibujaba 60 veces por segundo **aunque estuviera lejos en la página**, gastando batería del celular. | `division.html` | Ahora solo se anima cuando está en pantalla. Probado: 0 redibujos fuera de la vista, 60 por segundo a la vista. |

Después de cada arreglo se repitieron las pruebas: siguen sin errores, sin
desbordes y sin saltos de página.

## 4. Lo que no se arregló y por qué

- **Crucigrama del juego en el celular.** Con palabras largas el crucigrama
  es más ancho que la pantalla y hay que deslizarlo de lado dentro de su
  recuadro (funciona, pero no es obvio). Las casillas ya están en el tamaño
  mínimo para el dedo. El arreglo está en `retos.js`, que es **el mismo
  archivo de ChromaNom e IonNom**; conviene cambiarlo en los tres sitios a la
  vez (por ejemplo, con un aviso «desliza →» o armando crucigramas más
  angostos en el celular).
- **Botones «Anterior / Siguiente» de los pasos.** Cuando un paso es más
  corto o más largo que el anterior, esos botones cambian de altura (en el
  iPhone, hasta 580 px en la célula y 230 px en genética). La página no se
  mueve, pero el botón queda en otro lugar. Igualar la altura de todos los
  pasos dejaría mucho espacio en blanco en los pasos cortos, así que no se
  cambió. Los números de los pasos, arriba, siempre quedan en el mismo sitio.
- **Barra de subpáginas en el celular** («Sistemas del cuerpo › Funciones
  vitales › Nutrición»): ocupa tres renglones. Funciona bien; se dejó así
  para no cambiar el diseño acordado en la 2.17.
- **Hojas de la guía en la vista previa del celular**: el medidor reporta
  6 píxeles de más en alguna hoja, pero es solo margen; no se corta ningún
  texto y la impresión sale completa.
- Las imágenes `icons/logo.png` (420 KB) y `icons/marca-bionom.png` (280 KB)
  son pesadas, pero solo se usan en las hojas impresas, donde hace falta
  buena resolución. Las 129 fotos pesan en promedio 75 KB y se cargan solo
  cuando se acercan a la pantalla.
- **Contenido científico:** no se cambió ningún texto científico. No se
  notaron errores de contenido durante esta revisión técnica.

## 5. Archivos modificados y versiones

Archivos modificados (sin commit, quedan en el árbol de trabajo):

- `bio.css` — colores `--cn-naranja-tx` (nuevo) y `--cn-azul`, contorno del
  foco y puntos de los pasos de 38 px.
- `pwa-install.js` — botón Instalar de 40 × 40 px como mínimo.
- `celula.html`, `evolucion.html`, `reproduccion.html` — textos en naranja
  oscuro; azul nuevo; botones de órganos (reproducción).
- `genetica.html` — colores de las bases, cadena de ADN en dos filas en el
  celular, «?» del cuadro de Punnett, centrómero (sin tocar la sección
  `#arn` que se estaba editando en paralelo).
- `regiones.html` — categorías de la UICN, leyenda, foco de los marcadores.
- `sistemas.html` — título del sistema, botones de órganos.
- `division.html` — animación de la citocinesis solo a la vista, foco del
  ciclo celular.
- `reinos.html` — foco del árbol de clasificación.
- `funciones.html`, `nutricion.html` — se agregan `text-zoom.js` y
  `pwa-install.js`.
- `ambiente.html`, `ecosistemas.html`, `index.html`, `docente.html`,
  `juego.html` — azul nuevo o solo los `?v=`.
- `sw.js` — `CACHE` pasa a **`bionom-v37`** (la `bionom-v36` ya la había
  usado el commit de genética de hoy). La lista `ASSETS` no cambia: todos sus
  archivos existen y ninguno está repetido.
- `REVISION_TECNICA_2026-11.md` — este informe (nuevo).

Versiones subidas en **las 15 páginas**: `bio.css?v=20` → `?v=21` y
`pwa-install.js?v=13` → `?v=14`.

No hay pasos manuales: basta con hacer commit y push a `main`. No se tocó
`bionom-analytics.gs`.
