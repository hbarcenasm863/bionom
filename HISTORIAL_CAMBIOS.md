# Historial de cambios de BioNom

> **Leer este archivo primero en cada sesión** (regla de `CLAUDE.md`).
> Las versiones más recientes van arriba. Cada sesión nueva agrega su entrada
> encima de esta, numerada (Versión 1.1, 1.2… o 2 si el cambio es grande).

---

## Versión 2.12 — 11 de noviembre de 2026 · Fotos reales en célula, división, sistemas, ecosistemas y ambiente

**Contexto.** El docente pidió seguir con las fotos de bancos libres (con su
cita APA debajo) en sistemas, ecosistemas, ambiente y división celular, y que
en célula, mitosis y meiosis también hubiera imágenes reales además de las
animaciones.

**Cambios.** 44 fotos nuevas en `img/fotos/` y sus citas en `fotos-datos.js`
(fuentes: Wikimedia Commons por Openverse, iNaturalist y Flickr).
- `celula.html`: bacterias frente a células eucariotas; células de mejilla,
  de cebolla y de *Elodea* con cloroplastos (animal vs. vegetal); al tocar
  núcleo, aparato de Golgi, cloroplasto, pared o vacuola aparece su foto al
  microscopio; ósmosis con glóbulos rojos y plasmólisis en cebolla morada;
  cloroplastos y estomas en fotosíntesis.
- `division.html`: cromosomas humanos reales; tres fotos de la punta de raíz
  de cebolla con células en distintas fases de la mitosis; meiosis en la antera
  del lirio y tétradas de polen; células de cáncer (HeLa) y cariotipo con
  trisomía 21.
- `sistemas.html`: micrografías de los cuatro tejidos (epitelial, cartílago,
  músculo esquelético, neuronas) y fagocitos (neutrófilo atrapando bacterias,
  macrófago).
- `ecosistemas.html`: humedal Santa María del Lago (Bogotá) para bióticos y
  abióticos; colibrí, bromelia, chigüiro y retamo espinoso en las relaciones
  entre especies; pato andino, garza y tingua bogotana en hábitat y nicho.
- `ambiente.html`: cada región muestra una foto de su problema (glaciar
  Conejeras y gráfica de su retroceso, sequía en La Guajira, inundación,
  incendio forestal, selva talada, corales blanqueados); blanqueamiento en
  océanos; embalse Peñol-Guatapé, paneles solares, carbón del Cerrejón y pozo
  de petróleo en energías.
- `sw.js` (`bionom-v27`), `fotos-datos.js?v=2` en las páginas.

**Verificación.** Playwright a 1366 y 390 px en las 10 páginas con fotos: sin
errores, sin desbordes, todas las fotos montadas con su cita.

**Sin resolver.** No se encontró foto libre útil para: garrapatas en ganado,
erosión costera del Caribe, daños del huracán Iota en Providencia, retrato de
Schleiden. La foto del parque eólico Jepírachi no se pudo descargar (Commons
limitó las descargas). Wikimedia Commons bloquea consultas seguidas (error
429): por eso en varias citas el año aparece como «s. f.». Recargar con
Ctrl+F5.

## Versión 2.11 — 10 de noviembre de 2026 · Fotos reales con cita APA y embriones humanos ilustrados

**Contexto.** El docente pidió quitar la comparación con objetos (emojis) en
«Semana a semana» del embarazo y mostrar cómo se ve de verdad el desarrollo
embrionario humano en sus etapas más importantes. Luego preguntó si se podían
usar imágenes gratuitas de bancos como Pixabay, pidió revisar todo el sitio
para ver qué imágenes podían cambiarse, buscar otros bancos gratuitos, poner
la cita APA debajo de cada imagen y dejar como regla usar imágenes de bancos
libres cuando sea posible.

**Red del entorno.** Se habilitaron Wikimedia Commons, Openverse, iNaturalist
y Flickr. Pixabay quedó habilitado pero no se pudo usar: bloquea programas
automáticos y su buscador pide una clave de API (lo mismo pasa con Unsplash y
Pexels).

**Cambios.**
- `embrion-fig.js` (nuevo): 14 ilustraciones del embrión y el feto humanos
  (cigoto, blastocisto, semanas 4 a 40, fecundación, implantación, placenta,
  parto) con tamaño y peso reales. Reemplazan los emojis de «Semana a semana»
  y acompañan los pasos «De la fecundación al parto».
- `fotos.js` y `fotos-datos.js` (nuevos), carpeta `img/fotos/` (52 fotos,
  3,8 MB): componente de foto con la **cita APA debajo** (autor, año, título,
  tipo, fuente, URL y licencia CC).
- `reproduccion.html`: en «Semana a semana» cada etapa muestra la ilustración
  y debajo «Así se ve en realidad» (cigoto, blastocisto, embriones de 5 y 7
  semanas, ecografías de 12, 20 y 32 semanas, recién nacido). En «El desarrollo
  embrionario», fotos al microscopio de cigoto, 8 células y blastocisto. Se
  recortó el encabezado de las ecografías (una mostraba el nombre de la
  paciente). No se usaron fotos de placenta por ser sangrientas.
- `celula.html`: la línea del tiempo muestra el corcho de *Micrographia*,
  Leeuwenhoek, Schwann, Virchow, Pasteur, el microscopio de Ruska y Margulis.
  Schleiden quedó con emoji: no se encontró un retrato con licencia libre.
- `evolucion.html`: Lamarck, Cuvier, el viaje del Beagle, Wallace, la portada
  de *El origen de las especies* y Mendel en la línea del tiempo; retratos de
  Lamarck y Darwin en la comparación de la jirafa; fotos de las dos formas de
  la polilla *Biston betularia* en la simulación.
- `genetica.html`: retrato de Mendel.
- `reinos.html`: foto de un organismo en cada tarjeta de reino y en el mapa en
  árbol (bacteria, arquea, paramecio, diatomea, hongo, frailejón, jaguar).
- `regiones.html`: las tarjetas de ecosistemas ahora muestran una foto real
  de Colombia (Nevado del Ruiz, páramo de Iguaque, Salento, Apaporis, bosque
  seco de La Guajira, Tatacoa, Vichada, manglar, San Andrés, Ciénaga Grande);
  también al tocar un ecosistema en el mapa. Cada especie amenazada muestra su
  foto (iNaturalist y Flickr).
- `bio.css` (estilos `.foto`, `.fotos`), `sw.js` (`bionom-v26`, nuevos
  archivos), `?v=14` en todas las páginas.
- `CLAUDE.md`: nueva **regla de imágenes** (bancos libres, licencias aceptadas,
  cita APA obligatoria y cómo agregar fotos).

**Verificación.** Playwright a 1366 y 390 px en las seis páginas: sin errores,
sin desbordes, todas las fotos cargan con su cita.

**Pendiente.** Se puede seguir agregando fotos en otros módulos (sistemas,
ecosistemas, ambiente, división celular) siguiendo la regla. Recargar con
Ctrl+F5 para ver los cambios.

## Versión 2.10 — 10 de noviembre de 2026 · Un pollito de verdad al nacer del huevo

### Contexto
En la animación «Ovíparo» de Reproducción, el docente notó que lo que salía
del huevo no parecía la cría de un ave: era solo una bola amarilla.

### Cambios (`repro-anim.js`)
- **Nuevo dibujo `pollito()`:** cuerpo, cabeza con plumón, pico, ojo con
  brillo, ala que se abre y patas, todo con volumen.
- **Cáscara rota en tres piezas:** la parte de abajo, el borde dentado
  delante del pollito y el casquete de arriba, que sale volando y gira.
- **Paso 3 de «Ovíparo»:** primero el huevo tiembla y se agrieta; después el
  pollito se asoma, crece y abre el ala mientras el casquete cae. El texto
  ahora menciona el «diente de huevo».
- **Paso 4 de «Aves»:** el mismo pollito nace en el nido y el padre llega a
  darle de comer.
- **Versión:** `repro-anim.js?v=9`.

### Verificación
Con Playwright se tomaron capturas al inicio, la mitad y el final de los dos
pasos. No hay errores.

## Versión 2.9 — 10 de noviembre de 2026 · Reinos: mapa de la clasificación en árbol

### Contexto
El docente pidió que, al ver los modelos de 5, 6 y 7 reinos, la clasificación
se muestre como un mapa con las divisiones, y que al tocar cada reino o
dominio aparezcan sus características.

### Cambios (`reinos.html`, sección «Monera: ¿un reino o dos?»)
- **Mapa de la clasificación:** árbol en SVG debajo de los botones de modelo.
  Cambia con el modelo elegido y sus cajas aparecen con una animación corta:
  - **5 reinos:** Seres vivos → Procariotas / Eucariotas → reinos.
  - **6 reinos:** Monera se parte en Eubacteria y Archaea.
  - **7 reinos:** además, Protista se parte en Protozoa y Chromista.
  - **3 dominios:** Seres vivos → Bacteria / Archaea / Eukarya → reinos.
- **Al tocar una caja** (también con el teclado), el panel de al lado muestra
  sus características: célula, número de células, nutrición, pared y ejemplos
  colombianos. Son 15 cajas con ficha, entre reinos, dominios, procariotas y
  eucariotas.
- **En el celular:** el árbol se desliza de lado, con `svg.ancha` de
  `bio.js`. La vista de cajas de «Tres dominios» ya no se sale de la pantalla.

### Verificación
Con Playwright se revisaron los cuatro modelos en computador y en celular:
- Sin errores.
- Sin desbordes.
- Sin cajas encimadas.

## Versión 2.8 — 10 de noviembre de 2026 · Reinos: el modelo de 7 reinos

### Contexto
El docente pidió agregar en Reinos la otra división de la que se habla: la de
7 reinos.

### Cambios (`reinos.html`)
- **Historia de la clasificación:** nuevo botón «2015 · Ruggiero y
  Cavalier-Smith: 7 reinos». Son Bacteria, Archaea, Protozoa, Chromista,
  Fungi, Plantae y Animalia; es la clasificación del Catálogo de la Vida.
- **Sección «Monera: ¿un reino o dos?»:**
  - Nuevo botón «Modelo de 7 reinos» en la comparación de modelos.
  - Nueva tarjeta «¿Y el modelo de 7 reinos?»: explica por qué Protista era
    un «cajón de sastre» y cómo se parte en Protozoa (amebas, euglenas,
    tripanosoma del Chagas) y Chromista (algas pardas, diatomeas, paramecio,
    plasmodio y la gota de la papa, *Phytophthora*), y que la ciencia se
    corrige con nuevas evidencias.
- **Reto «¿A qué reino pertenece?»:**
  - Se escoge entre 5, 6 o 7 reinos.
  - Con 7 aparecen las cajas Bacteria, Archaea, Protozoa y Chromista.
  - Se agregaron ameba, tripanosoma y diatomea; ahora son 15 fichas.
- La introducción de «Los cinco reinos» menciona también el modelo de 7.

### Verificación
Con Playwright, en computador y celular:
- Sin errores.
- El reto con 7 reinos se resolvió completo: 15 de 15, sin errores.

## Versión 2.7 — 10 de noviembre de 2026 · La cuadrícula ya no llena media hoja ni la hoja entera

### Contexto
El docente pidió evitar hojas que queden con media página, o la página entera, solo de cuadrícula.

### Cambios
- **`docente-app.js` (`llenarHoja`):** la cuadrícula de las preguntas abiertas sigue creciendo para usar el espacio libre, ahora con límites:
  - Cada cuadrícula crece como máximo hasta **10 cuadros** (unos 5 cm); antes eran 26, casi media hoja.
  - Entre todas no pasan del **45 % del alto** de la hoja. Si una hoja trae muchas preguntas abiertas, cada una conserva su espacio mínimo, pero no crece más.
  - En las hojas sin preguntas abiertas, el recuadro de «Notas» o «Borrador» tiene como máximo **5 cuadros** y solo aparece si caben al menos 3. Antes llenaba todo el espacio vacío, y por eso aparecían hojas casi enteras de cuadrícula.
  - El espacio que sobra queda en blanco.
- **Versión:** `?v=13` y `bionom-v24`.

### Verificación
Con Playwright se revisaron, una por una, las hojas de evaluación, taller y guía con cada uno de los 10 temas, con 3 temas y con los 10 juntos, en tres configuraciones (pocas, muchas y ninguna pregunta abierta, con y sin actividades).
- Antes, 143 hojas tenían más del 40 % de cuadrícula, con casos de hasta 84 %.
- Ahora ninguna hoja pasa del 50 %, salvo una hoja de evaluación con 6 preguntas abiertas seguidas, donde cada una conserva su espacio mínimo para responder.
- Ninguna hoja se desborda y no hay errores.

### Pendiente
Ninguno.

---

## Versión 2.6 — 10 de noviembre de 2026 · Cuadrícula de cuaderno en las preguntas abiertas

### Contexto
El docente pidió que las preguntas abiertas tuvieran cuadrícula, igual que en ChromaNom, en lugar de renglones.

### Cambios
- **`docente-app.js`:** las preguntas abiertas llevan una cuadrícula de cuaderno (cuadros de 18,9 px, unos 5 mm), en lugar de renglones. Aplica a:
  - análisis e indagación de los talleres y de la sesión 3 de la guía;
  - las preguntas abiertas de la evaluación;
  - las preguntas para activar de la sesión 1 y la síntesis de la sesión 2.

  Como en ChromaNom, después de paginar la cuadrícula se estira, un cuadro a la vez y en ronda (máximo 26 cuadros), hasta llenar el espacio libre de la hoja. Si una hoja no tiene cuadrículas y le sobra espacio, se agrega abajo un recuadro de «Notas» («Borrador (no se califica)» en las evaluaciones). Verdadero o falso y respuesta corta siguen con su renglón.
- **`docente.html`:** estilos `.cuad` (los mismos de ChromaNom, también al imprimir) y `.notas-tit`.
- **Versión:** `?v=12` y `bionom-v23`.

### Verificación
Con Playwright se generaron evaluación, taller y guía con un tema y con los 10 temas. Las cuadrículas llenan la hoja, ninguna hoja se desborda y no hay errores.

### Pendiente
Ninguno.

---

## Versión 2.5 — 10 de noviembre de 2026 · Selección múltiple a doble columna en evaluaciones, talleres y guías

### Contexto
El docente pidió que las preguntas de opción múltiple de las evaluaciones y los talleres salieran a doble columna, como en ChromaNom, para aprovechar mejor la hoja.

### Cambios
- **`docente-app.js`:** igual que en ChromaNom, las preguntas de selección múltiple se agrupan en un contenedor de dos columnas en cada hoja. Si la siguiente pregunta no cabe, pasa a otra hoja con su propio contenedor. Aplica a:
  - las preguntas tipo Saber 11 de las evaluaciones y de la guía;
  - la selección múltiple de los talleres y de la sesión 3 de la guía;
  - las hojas de clave.

  El título de la sección va arriba, a todo lo ancho. Verdadero o falso, respuesta corta, ordenar, análisis y actividades siguen a una columna.
- **`docente.html`:** estilos `.cols2` (dos columnas con línea divisoria; cada pregunta no se parte entre columnas) y opciones en una sola columna dentro de cada pregunta.
- **Versión:** `?v=11` y `bionom-v22`.

### Verificación
Con Playwright se generaron evaluación, taller y guía con un tema y con los 10 temas. Hay hojas a doble columna, ninguna hoja se desborda y no hay errores.

### Pendiente
Ninguno.

---

## Versión 2.4 — 10 de noviembre de 2026 · 40 o más en cada sección del panel docente, por tema; División celular como tema

### Contexto
El docente pidió aumentar las preguntas de cada tema y de cada sección del panel docente a **al menos 40**. Pidió además que fueran de nivel adecuado para secundaria y que se relacionaran directamente con lo que enseña cada módulo de BioNom.

### Cambios
- **División celular pasa a ser tema**, ya que es un módulo del sitio (versión 2.2). Queda en el Juego, en las guías (sesiones 1 y 2, mapa de ideas y «Puedo…»), en todas las pestañas del panel y en `bionom-analytics.gs`.
- **Cuántas hay ahora en cada uno de los 10 temas:**

  | Sección | Antes por tema | Ahora por tema |
  |---|---|---|
  | Preguntas del Juego (talleres y guías) | 41-42 | 45-66 (536 en total) |
  | Preguntas cortas para el laberinto | 16-32 | 40-42 |
  | Preguntas tipo Saber 11 | 10 | 40 (400 en total) |
  | Preguntas abiertas | 3 | 40 (400 en total) |
  | Palabras de ahorcado, sopa, crucigrama y criptograma | 10-12 | 40 (400 en total) |
  | Detective | 1 historia de 8 frases dudosas | 5 historias = 40 frases dudosas |

  - Las preguntas nuevas del Juego también tienen 2 pistas y explicación completa.
  - Cada palabra nueva tiene 3 pistas, y ninguna palabra se repite en todo el banco.
  - Todo sale de las secciones de cada módulo (por ejemplo, en Célula: historia, partes, transporte, ósmosis, laboratorio de las papas y fotosíntesis).
- **Archivos:**
  - `banco.js`: tema nuevo en `TEMAS_JUEGO` y preguntas nuevas al final.
  - `ahorcado-datos.js`: grupo nuevo y palabras al final.
  - `docente-datos.js`: tema División celular, Saber 11, abiertas y detective al final.
  - `juego.html`: enlace «Repasar en División celular».
  - `docente.html`: casilla de División celular en el laberinto.
  - `docente-app.js`: la autoevaluación se parte en bloques de 12 filas, porque con los 10 temas juntos no cabía en una hoja.
  - `bionom-analytics.gs`: «División celular» en `TEMAS_PRINCIPALES`.
- **`CLAUDE.md`:** queda escrita la meta de 40 por tema y sección, y qué hay que tocar si se agrega un tema.
- **Versión:** `?v=10` y `bionom-v21`.

### Verificación
Con Playwright, en cada uno de los 10 temas:
- La evaluación con 30 preguntas Saber y 10 versiones no desborda ninguna hoja.
- El laberinto se arma.
- El crucigrama tiene 40 palabras y el detective 5 historias.
- La guía con los 10 temas juntos (23 hojas) tampoco desborda.
- El Juego funciona con el tema División celular, también en crucigrama.
- No hay errores en ninguna página.

Un control automático también revisó:
- Que no hubiera palabras ni preguntas repetidas.
- Que ninguna pista dijera la respuesta.
- Que las historias tuvieran 8 frases dudosas, con máximo 3 por párrafo.

### Pendiente
- **`bionom-analytics.gs`** cambió (tema nuevo). Como el Modo Estudiante está desactivado hasta 2027, no hace falta hacer nada ahora. Cuando se active, hay que copiar el `.gs` actualizado al editor de Apps Script y crear una nueva versión de la implementación.
- El mapa conceptual sigue siendo uno por tema. Cada versión deja en blanco recuadros distintos, con miles de combinaciones posibles.

---

## Versión 2.3 — 10 de noviembre de 2026 · Panel docente completo como el de IonNom y ChromaNom; sin Orientaciones

### Contexto
El docente sentía el modo docente de BioNom incompleto frente a IonNom y ChromaNom: le faltaban las actividades interactivas y los tipos de documento que tienen los otros sitios. También pidió quitar la pestaña de Orientaciones.

### Cambios
- **`docente.html`:** se rehízo con 10 pestañas, como los otros sitios.
  - 📘 Guías, ✏️ Talleres y 📝 Evaluaciones.
  - 🧭 Laberintos, 🔤 Crucigramas, 🔠 Ahorcado y 🔍 Sopa de letras.
  - 🔐 Criptograma, 🗺️ Mapa conceptual y 🕵️ Detective biológico.
  - **Se quitó la pestaña Orientaciones.** Los pasos para activar el Modo Estudiante pasaron a `README.md`, para no perderlos, y `juego.html` remite allí.
- **`docente-app.js`** (nuevo): la lógica de guías, talleres y evaluaciones, con varias versiones, código para repetir hojas, hoja carta paginada y hojas de clave para el docente.
  - **Guía de 4 sesiones:**
    - Sesión 1, aprendizajes previos: ¿sabías que…?, la biología en contexto local, nacional y global, la vida diaria y preguntas para activar.
    - Sesión 2, información: lectura, mapa de ideas y síntesis.
    - Sesión 3, trabajo práctico: preguntas del Juego y actividades.
    - Sesión 4: autoevaluación «Puedo…».
    - La evaluación tipo Saber 11 va en hojas aparte, una versión distinta para cada fila.
  - **Taller:** selección múltiple, verdadero o falso, respuesta corta, ordenar y análisis. Además, actividades dentro del taller: sopa de letras, ahorcado, criptograma genético, mapa conceptual con huecos y detective.
  - **Evaluación tipo Saber 11:** preguntas con contexto colombiano y 4 opciones barajadas por versión, más preguntas abiertas. Lleva hoja de respuestas de burbujas y clave.
- **`docente-datos.js`** (nuevo, solo contenido de biología) para los 9 temas:
  - Sesión 1 y Sesión 2 (4 párrafos de lectura y mapa de ideas) y los «Puedo…» de la autoevaluación.
  - **90 preguntas tipo Saber 11** (10 por tema).
  - Preguntas abiertas. Las que estaban dentro de `docente.html` se movieron aquí y se agregaron las de Reproducción.
  - **9 historias del detective biológico**: una por tema, con 8 frases dudosas y como máximo 3 por párrafo.
- **`laberinto.js`** (nuevo): copia del de ChromaNom con un solo modo. Cada casilla es una pregunta corta del Juego (selección múltiple o verdadero/falso). Se puede imprimir con versiones y clave, jugar en pantalla y verificar la ruta de un estudiante.
- **`crucigrama.js`** (nuevo): crucigramas de 6 a 14 palabras con las palabras de `ahorcado-datos.js`.
  - Las pistas pueden ser la 1, la 2 o la 3, o un banco de palabras.
  - Hojas con versiones y clave.
  - Modo clase que se resuelve en pantalla con las 3 comprobaciones del Juego.
- **`extras.js`** (nuevo en BioNom; es el mismo archivo de ChromaNom e IonNom):
  - Ahora acepta `window.EXTRAS_SITIO` para cambiar los textos a «biología» y «detective biológico».
  - En BioNom, el **criptograma genético** cifra cada letra como un codón del ARN mensajero; se descifra con la tabla del código genético y el código de una letra de los aminoácidos. La tabla puede ir impresa en la hoja. Las letras que no son código de ningún aminoácido (B, J, O, U, X, Z, Ñ) se regalan.
  - Sin ese ajuste, ChromaNom e IonNom siguen exactamente igual.
- **`retos.js`:** nueva función `RETOS.armarCrucigrama` con azar con semilla, para que el mismo código dé el mismo crucigrama. Se cambió el ícono del ahorcado por 🔠, porque 🪢 es un emoji nuevo que no se ve en Windows.
- **`actividades.css`:** estilos de la casilla de codón y de la tabla del código genético.
- **Versión:** `?v=9` y `bionom-v20`, con los 5 archivos nuevos en la caché y sin repetidos.
- **`README.md` y `CLAUDE.md`:** arquitectura del panel docente y pasos del Modo Estudiante.
- Esta sesión trabajó en paralelo con las versiones 2.1 (Reproducción animada) y 2.2 (módulo División celular). Sus cambios se conservaron; esta versión solo suma el panel docente.

### Verificación
Con Playwright se revisaron las 10 pestañas, con hojas y sin errores.
- La guía con los 9 temas (22 hojas), el taller con todas las actividades y la evaluación no desbordan ninguna hoja.
- El laberinto se arma con cada uno de los 9 temas.
- Funcionan los modos clase de crucigrama, criptograma, detective y laberinto.
- ChromaNom e IonNom siguen mostrando «Criptograma químico» y «Detective químico» sin errores.

### Pendiente
- Ningún paso manual: no se tocó `bionom-analytics.gs`.
- Las palabras de ahorcado, crucigrama, sopa y criptograma siguen siendo 10-12 por tema. Si el docente quiere más variedad en 20 versiones, conviene ampliar `ahorcado-datos.js`.

---
## Versión 2.2 — 10 de noviembre de 2026 · Módulo propio de división celular

### Contexto
El docente consideró que la mitosis y la meiosis deben tener su propia
sección, después de La célula y antes de Reproducción.

### Cambios
- **`division.html` (nuevo): «División celular: mitosis y meiosis».** Va en el
  menú justo después de La célula. Tiene siete secciones:
  1. **Cromosomas:**
     - Cromosoma interactivo: cromátidas, centrómero, brazos, genes y ADN
       enrollado.
     - Cariotipo humano de 23 parejas (mujer XX / hombre XY), con 2n y n.
     - Chequeo rápido.
  2. **Ciclo celular:** diagrama circular G1, S, G2 y M, que se toca, con los
     puntos de control.
  3. **Mitosis:** la animación por fases que estaba en La célula, el truco
     «ProMeAnaTe», para qué sirve y un chequeo.
  4. **Citocinesis:** animación del surco en la célula animal y de la placa
     celular en la vegetal.
  5. **Meiosis:** la animación con los alelos A, a, B y b que estaba en
     Genética (con «Otra orientación»), su relación con Mendel y las
     combinaciones posibles.
  6. **Mitosis vs. meiosis:** tabla y clasificador.
  7. **Cuando la división falla:** cáncer y síndrome de Down (no disyunción),
     con un cariotipo con trisomía 21.
- **`celula.html`:** la sección 10 queda como tarjeta que lleva al módulo
  nuevo. Su «Siguiente» ahora es División celular.
- **`genetica.html`:** la sección 05 queda como la idea clave «La meiosis
  explica las leyes de Mendel», con enlace a la meiosis paso a paso.
- **Otros archivos:**
  - `reinos.html`: su «Anterior» ahora es División celular.
  - `reproduccion.html`: enlaza a `division.html#meiosis`.
  - `bio.js`: el menú incluye el módulo.
  - `index.html`: la portada tiene la tarjeta del módulo.
  - `sw.js`: el caché incluye la página.
- **Versiones:** `bionom-v19` y `?v=8`.

### Verificación
Con Playwright:
- Revisión de la sintaxis de todos los scripts de las páginas tocadas.
- Capturas de cada sección en computador y celular.
- No hay errores ni desbordes.

## Versión 2.1 — 10 de noviembre de 2026 · Reproducción animada y desarrollo embrionario

### Contexto
Al docente la explicación de «¿Cómo se reproduce cada grupo?» le pareció
sosa: pidió una animación que muestre lo básico del proceso. También pidió:
- Explicar los tipos de desarrollo embrionario con sus ventajas y
  desventajas.
- Acompañar el paso de la flor al fruto con imágenes de un caso real.

### Cambios
- **`repro-anim.js` (nuevo):** motor de animaciones con volumen. No son
  modelos 3D reales: se descartaron porque necesitarían una librería pesada
  que no funciona sin internet en la app instalada.
  - Dibujos en SVG con degradados de luz, brillos y sombras.
  - Cada animación avanza sola paso a paso, con un texto por paso.
  - Botones ⏮ ⏸ ⏭ y puntos para saltar a un paso.
  - Solo se mueve cuando está en pantalla.
  - Respeta la opción «reducir movimiento» del sistema.
  - 25 animaciones:
    - Una por cada uno de los 18 grupos: bacterias, protistas, hongos,
      musgos, helechos, gimnospermas, angiospermas, poríferos, cnidarios,
      platelmintos, moluscos, artrópodos, equinodermos, peces, anfibios,
      reptiles, aves y mamíferos.
    - Café (de la flor al fruto).
    - Etapas del embrión (cigoto, segmentación, mórula, blástula, gástrula
      con sus tres capas).
    - Ovíparo, ovovivíparo, vivíparo, desarrollo directo e indirecto.
  - Cada animación usa nombres de degradado propios. Si se comparten, una
    animación escondida en otra pestaña deja sin color a las demás: así pasó
    al probar.
- **`reproduccion.html`:**
  - «En cada grupo»: al tocar un grupo se ve su animación y debajo la
    explicación; arranca con Bacterias.
  - Nueva sección **03 El desarrollo embrionario**: animación de las primeras
    etapas y tabla de las tres capas. Pestañas Ovíparo, Ovovivíparo y
    Vivíparo, y luego Directo e Indirecto, cada una con su animación,
    ejemplos, ventajas y desventajas, más un chequeo rápido.
  - Las tarjetas «Conceptos de la reproducción sexual» se cambiaron por
    «Fecundación externa / interna», porque el resto ya lo cubre la sección
    nueva.
  - «De la flor al fruto»: el texto del paso a paso se cambió por el caso real
    del café (floración, polinización, fecundación, la cereza que madura en
    unos 8 meses y los granos que son las semillas), con animación y lista.
  - Las secciones siguientes se renumeraron (04 a 09).
- **Versiones:** `bionom-v17` y `?v=7`; `repro-anim.js` agregado al caché.

### Verificación
Con Playwright:
- Se dibujaron los 97 pasos de las 25 animaciones y se revisaron en imagen.
- La página no tiene errores y no se desborda en computador (1366 px) ni en
  celular (390 px).

## Versión 2 — 10 de noviembre de 2026 · Juego: 3 intentos con pistas, 40 preguntas por tema, crucigrama, sopa y ahorcado

### Contexto
El docente pidió revisar que en todos los juegos el estudiante tenga siempre 3 oportunidades para responder, con pistas progresivas que no regalen la respuesta, y que al final se explique completa la respuesta correcta. También pidió integrar como secciones del juego crucigramas de 10 palabras, sopas de letras de 10 palabras y ahorcado, con un tiempo proporcional a la dificultad de cada uno. Aclaró que cada sitio es único: los bancos de preguntas y de palabras no se comparten, solo las reglas. Para BioNom pidió además subir el banco de preguntas a al menos 40 por tema.

### Cambios
- **`retos.js`** (archivo nuevo; el mismo en ChromaNom, IonNom —en `assets/`— y BioNom). Solo tiene **reglas**, ningún banco: cada sitio le pasa su propio banco de preguntas y su propio `BANCO_AHORCADO`.
  - **3 intentos con pistas progresivas:**
    - 1.er error → la opción elegida se descarta y aparece la pista 1, la más general (qué revisar).
    - 2.º error → pista 2, más concreta.
    - 3.er error → se cierra la pregunta con la explicación completa y la lista de intentos equivocados.
    - Las pistas salen de las pistas propias de la pregunta o de su explicación, con las palabras de la respuesta tapadas (▢▢▢). Se verifica que ninguna pista contenga la respuesta.
    - Puntos: 100 % al primer intento, 50 % al segundo y 20 % al tercero.
    - Excepción: si la pregunta solo tiene 2 o 3 opciones, hay un intento menos que opciones (en verdadero/falso, un solo intento), porque si no, la última oportunidad sería regalada.
  - **Crucigrama de 10 palabras:** palabras conectadas, sin palabras «accidentales» en los cruces. Hay 3 comprobaciones: después de cada una, las palabras que siguen mal reciben la pista siguiente, y en la segunda se regala su primera letra. Puntos por palabra: 10, 5 y 2. Al final, cada palabra con su explicación (sus 3 pistas).
  - **Sopa de letras de 10 palabras:** el estudiante no ve la palabra sino su pista y el número de letras. Puede pedir hasta 3 pistas por palabra; con la tercera parpadea la primera letra en la cuadrícula. Se marca arrastrando o tocando la primera y la última letra. Cada palabra aparece una sola vez.
  - **Tiempo proporcional a la dificultad**, con su propio reloj:
    - Crucigrama: 22 s por palabra + 4 s por letra (entre 4 y 15 min; con 10 palabras, unos 9 a 11 min).
    - Sopa: 20 s por palabra + 2 s por letra + el tamaño de la cuadrícula (unos 6 a 8 min).
    - Ahorcado: 45 s + 10 s por letra distinta + 2 s por letra (entre 1:15 y 4 min por palabra).
  - Los paneles del crucigrama y de la sopa tienen fondo claro propio, así que se leen bien también en modo oscuro.
- **`banco.js`:**
  - Pasó de 223 a **372 preguntas**: entre 41 y 42 en cada uno de los 9 temas, incluido Reproducción, el módulo nuevo de la versión 1.3. Antes había entre 20 y 30 por tema.
  - Las 149 preguntas nuevas son de los mismos cuatro tipos (opción múltiple, verdadero/falso, escribir y ordenar) y hay muchos ejemplos de Colombia.
  - **Todas** las preguntas (salvo las de verdadero/falso, que tienen un solo intento) tienen ahora 2 pistas escritas a mano en el campo `p`: la 1 general y la 2 más concreta, sin la respuesta.
  - Todas tienen una **explicación completa** en `exp`, que dice por qué la respuesta es correcta. Antes muchas eran de una línea, como «Es la ósmosis.».
  - Las pistas y explicaciones de las preguntas que ya había se agregan con `BIO_AJ`, que las busca por el comienzo del enunciado; las nuevas se agregan con `BIO_NUEVAS`. Las dos funciones están al final del archivo.
- **`juego.html`:**
  - Nuevo paso «2 · ¿Cómo quieres jugar?», con cuatro secciones: ❓ Preguntas, 🔤 Crucigrama, 🔍 Sopa de letras y 🪢 Ahorcado (10 palabras). Las palabras salen de `ahorcado-datos.js` y del tema escogido; si el tema no alcanza, se completan con palabras de otros temas de BioNom.
  - En las preguntas:
    - Opción múltiple: 3 intentos.
    - Escribir: 3 intentos; la pista 2 dice además cuántas palabras tiene la respuesta y con qué letra empieza.
    - Ordenar: 3 intentos; la pista 1 dice cuántos elementos están en su lugar y en la 2 esos quedan fijos.
    - Verdadero/falso: un intento.
    - Al final aparece el recuadro «📘 Explicación completa», con la respuesta correcta, la explicación y los intentos equivocados.
  - Los resultados (y el envío al docente, cuando se active) cuentan cada palabra del crucigrama o de la sopa como una pregunta. En la hoja, la sección se anota en «grupo» («La célula · Crucigrama»).
- **Versión:** `?v=6` en todas las páginas y `bionom-v15` en `sw.js` (con `retos.js` en la caché).
- **Modo Estudiante:** sigue desactivado (versión 1.1). Cuando se active en 2027, el envío ya cuenta cada palabra del crucigrama o de la sopa como una pregunta.
- **`CLAUDE.md`:** `retos.js` y el nuevo formato del banco, en la tabla de arquitectura.
- Esta sesión empezó en paralelo con las versiones 1.1 a 1.3. Sus cambios se conservaron: el módulo Reproducción, el Modo Estudiante desactivado y los ajustes del celular. Solo se sumaron los de esta versión.

### Verificación
Con Playwright (390 px y 1280 px):
- Se fallaron preguntas de los cuatro tipos y aparecieron las pistas correctas.
- Crucigrama y sopa se resolvieron completos (10 de 10).
- El ahorcado muestra las pistas al 2.º y 4.º fallo.
- El generador docente cuenta 41-42 preguntas por tema (9 temas).
- No hay errores en ninguna página.
- Un control automático confirmó que ninguna pista escrita a mano contiene la respuesta.

### Pendiente
- Ningún paso manual para el juego. No se tocó `bionom-analytics.gs`.
- Las palabras del ahorcado, el crucigrama y la sopa (`ahorcado-datos.js`) siguen siendo 10-12 por tema, con pistas cortas. Si el docente quiere crucigramas de un solo tema sin mezclar, convendría ampliarlas.

---

## Versión 1.3 — 10 de noviembre de 2026 · Revisión en celular y reto de 5 o 6 reinos

### Contexto
El docente pidió revisar los íconos y el tamaño de las imágenes para que se
vean bien en el celular y en el computador. También pidió que en el reto
«¿A qué reino pertenece?» se escoja si se trabaja con 5 o con 6 reinos.

### Revisión
Se tomaron capturas en celular (390 px) de todas las secciones de las 12
páginas y se midió en computador (1366 px):
- Ninguna página se desborda de lado.
- No quedan emojis que Windows no dibuje.

### Cambios
- **Gráficas en el celular:** las gráficas (polillas, ciclo menstrual, CO₂,
  emisiones, anticuerpos, azúcar en la sangre, deriva genética, poblaciones)
  quedaban diminutas e ilegibles.
  - Ahora conservan 640 px de ancho y se deslizan de lado, con el aviso
    «← desliza para ver toda la figura →».
  - Lo hace `bio.js` (función `deslizables`) con todo `canvas` y todo
    `svg.ancha` (por ahora, la red trófica).
- **Tablas en el celular:** tienen un ancho mínimo de 520 px y el aviso
  «desliza la tabla →». Antes la última columna quedaba de una o dos palabras
  por renglón.
- **`.lado`:** las columnas pueden encogerse (`minmax(0,1fr)`), así una figura
  ancha no empuja la página.
- **`reinos.html`:** botones «Con 5 reinos / Con 6 reinos» en el reto.
  - Con 6, Monera se cambia por Eubacteria y Archaebacteria.
  - Se agregaron dos arqueas: la de las salinas de Manaure y la metanógena
    del estómago de la vaca.
- **Versiones:** `bionom-v14` y `?v=5`.

## Versión 1.2 — 10 de noviembre de 2026 · Íconos que no se veían y guisantes gigantes

### Contexto
En el computador del docente (Windows) aparecían rectángulos negros en lugar
de algunos íconos. Por ejemplo, el ejemplo del átomo (pulmones), el ícono de
Organelo y el de Sistemas. La bandera de Colombia salía como «CO». En
Genética, los guisantes del experimento de Mendel y del cuadro de Punnett se
veían enormes y no dejaban ver los cruces.

### Causa
- Esos íconos son emojis recientes (versión 12 o posterior, por ejemplo 🫁 🫀
  🫘 🫧 🪸 🩸 🟢) que las versiones de Windows anteriores no saben dibujar.
- Windows no dibuja ningún emoji de bandera.
- Los guisantes son dibujos de tamaño fijo, pero el estilo general `.fig svg`
  los estiraba a todo el ancho del recuadro.

### Cambios
- **Todas las páginas, `bio.js`, `banco.js` y `ahorcado-datos.js`:** cada emoji
  reciente se cambió por uno antiguo equivalente: ❤️ 🌬️ ⚙️ 🌰 💧 🐠 🔴 💛
  💚 ⚕️ 🧑, etc. El nivel Organelo usa ⚙️.
- **Bandera de Colombia:** se dibuja con CSS (clase `.co` en `bio.css`). En los
  textos de los dibujos del ahorcado se usa 🗺️. Las banderas de Francia e
  Inglaterra de Lamarck y Darwin se cambiaron por texto.
- **`genetica.html`:** `.fig svg[width]` conserva el tamaño propio de los
  guisantes y las flores.
- **Versiones:** `bionom-v13` y `?v=4`.

### Regla para el futuro
No usar emojis de banderas ni emojis posteriores a la versión 11; antes de
agregar uno, revisar que se vea en Windows 10.

## Versión 1.1 — 10 de noviembre de 2026 · Modo Estudiante desactivado

### Contexto
El docente pidió desactivar por ahora el Modo Estudiante: lo configurará en
2027.

### Cambios
- `juego.html`:
  - Nueva constante `MODO_ESTUDIANTE_ACTIVO=false`, que oculta las pestañas
    «Modo libre / Modo Estudiante»; el juego funciona solo en modo libre.
  - Todo el código del Modo Estudiante sigue en el archivo, sin borrar.
  - Se quitó la mención del Modo Estudiante en la introducción y en la
    descripción de la página.
- `index.html`: la tarjeta del Juego ya no menciona el Modo Estudiante.
- `docente.html`: Orientaciones avisa que el modo está desactivado hasta 2027
  y explica qué línea cambiar.

### Pasos pendientes (2027)
1. Cambiar `MODO_ESTUDIANTE_ACTIVO` a `true` en `juego.html`.
2. Seguir los pasos de la Versión 1 para desplegar `bionom-analytics.gs` y
   pegar la URL en `APPS_SCRIPT_URL`.

## Versión 1 — 10 de noviembre de 2026 (creación del sitio)

### Qué pidió el docente y por qué
El docente quiso un sitio nuevo de **biología**, hermano de IonNom (química
inorgánica) y ChromaNom (química orgánica), que tomara lo mejor de los dos:
- Explicaciones muy interactivas.
- Juego con Modo Estudiante.
- Generador de material para la clase.
- Aplicación instalable en el celular.

Todo debía organizarse alrededor de un **mapa de los niveles de organización**.
Pidió estos temas: la célula (historia, tipos y partes), los reinos, los
sistemas, la genética mendeliana y molecular, la evolución y los ecosistemas,
en general y por regiones de Colombia, con un mapa interactivo.

Durante la sesión pidió además:
1. El nombre **BioNom** y el repositorio `hbarcenasm863/BIONOM`.
2. Usar su logo (guacamaya con «BioNom») y su ícono para la app.
3. Que el mapa de niveles empezara **arriba** (1. Átomo).
4. Que Átomo y Molécula enlazaran a IonNom: Teoría atómica, Enlace químico y
   Nomenclatura.
5. En Reinos, explicar la diferencia entre **Monera** y la división en
   **arqueas y eubacterias**.
6. Dibujos del cuerpo humano **más profesionales**, «menos de niños».
7. Revisar que se cumplan **todos los temas y competencias de biología de los
   aprendizajes priorizados de ciencias naturales** de la SED (documentos de
   secundaria y media), **sin decirlo explícitamente** en el sitio.
8. La clave de respuestas se veía subrayada: se aclaró que es la hoja del
   docente y se hizo más evidente.
9. Un **fondo de plantas únicas de Colombia**, como el de moléculas de
   ChromaNom, y la **marca de agua con el ícono de BioNom** en las hojas
   impresas, como IonNom y ChromaNom.
10. Un módulo completo de **reproducción**: tipos, cómo se da en distintos
    grupos, sistema reproductor humano, embarazo, anticoncepción e ITS.

### Archivos y módulos

**Estructura común**
- `bio.css`: estilos y componentes: chequeo rápido, paso a paso, tarjetas que
  se voltean, pestañas, términos con definición, clasificador, línea del tiempo
  y fondo de plantas.
- `bio.js`:
  - Menú con el logo, barra inferior en el celular (con el control de letra
    dentro de «Más») y pie.
  - Progreso guardado en el dispositivo (`bionom_visitas`, `bionom_secciones`).
  - Lista `MODULOS`, que dice qué niveles trabaja cada módulo.
  - `BIO.clasificar()`.
  - Fondo `#bio-bg`.
- Copiados de ChromaNom y adaptados: `narracion.js` (botón 🔊 Escuchar),
  `text-zoom.js`, `pwa-install.js`, `ahorcado.js`, `sopa.js` y
  `actividades.css`.
- `manifest.json` y `sw.js`: aplicación instalable. Las páginas, el JS y el CSS
  se sirven «red primero». La versión del caché va en `bionom-v12`; las
  páginas piden los archivos con `?v=3`.
- `icons/`:
  - Ícono de la app, favicon y logo (`logo.webp`, `logo.png`).
  - `marca-bionom.png`: el ícono sobre fondo transparente, para la marca de
    agua de las hojas.
- `fondo-plantas.svg`: frailejón, palma de cera, orquídea *Cattleya trianae*,
  pasiflora, bromelia, anturio, helecho arborescente, victoria regia y mangle,
  en trazo fino. Se ven más en los bordes y casi nada en el centro.

**Módulos de contenido**

| Archivo | Contenido |
|---|---|
| `index.html` | Mapa de los 13 niveles, del átomo (arriba) a la biosfera, con 3 recorridos de ejemplo (tu cuerpo, frailejón, jaguar). Bandas química, celular, del organismo y ecológica; línea «aquí empieza la vida». Átomo → IonNom Teoría atómica; Molécula → IonNom Enlace químico, IonNom Nomenclatura y ChromaNom Biomoléculas. Reto de ordenar los niveles y tarjetas de módulos. |
| `celula.html` | Historia (línea del tiempo de 1590 a 1967), experimento de Pasteur, teoría celular, escala de tamaños, procariota/eucariota y animal/vegetal con clasificador, célula interactiva (animal, vegetal y bacteria) con juego «¿quién soy?», transporte de membrana con simulación de partículas, ósmosis, laboratorio virtual de papas (hipótesis, variables, datos con margen de error y gráfica), fotosíntesis y respiración con sus etapas y la campana de Priestley, ciclo celular y mitosis animada, teoría celular en la medicina. |
| `reinos.html` | Taxonomía paso a paso (humano, jaguar, frailejón), nombre científico, historia de la clasificación (2, 3, 5 y 6 reinos y 3 dominios), **Monera frente a arqueas y eubacterias** (tabla, extremófilas, clasificador), los cinco reinos con filtro de características, clave dicotómica y clasificador. |
| `sistemas.html` + `cuerpo.js` | De la célula al sistema, tejidos, cuerpo humano ilustrado (curvas suaves, volumen, líneas guía) con 8 sistemas (incluye el inmune), recorridos animados del bocado y del oxígeno, trabajo en equipo de los sistemas, sistema inmune y vacunas con gráfica de anticuerpos, homeostasis con simulación del azúcar en la sangre, enlace al módulo de reproducción, funciones vitales. |
| `reproduccion.html` | Asexual y sexual (6 formas asexuales, fecundación externa e interna, ovíparos y vivíparos, metamorfosis), cómo se reproduce cada grupo (bacterias, protistas, hongos, 4 grupos de plantas, 9 grupos de animales, con ejemplos colombianos), la flor interactiva y de la polinización al fruto, sistema reproductor femenino y masculino interactivos, ciclo menstrual con gráfica de hormonas, fecundación, embarazo semana a semana y parto, anticoncepción con efectividad de uso típico, ITS por agente y «¿mito o realidad?». |
| `genetica.html` | Alelos (genotipo y fenotipo), experimento de Mendel, Punnett para llenar y simulación de descendientes, dihíbrido 9:3:3:1, meiosis animada (segregación y transmisión independiente), dominancia incompleta, grupos ABO, daltonismo, herencia poligénica y ambiente, genealogía de albinismo, historia del ADN, cadena complementaria, tipos de ARN y replicación, transcripción y traducción con el gen de la hemoglobina, mutaciones (falciforme, inserción, deleción), agentes mutágenos, biotecnología con debate ético. |
| `evolucion.html` | Hitos de la biología, jirafas de Lamarck y Darwin, simulación de polillas (el estudiante hace de pájaro), pinzones, variabilidad y simulación de deriva genética, selección artificial con mazorcas, evidencias (homólogos interactivos, fósiles colombianos, ADN, embriología), evolución humana, endémicas e invasoras, el año de la Tierra y tabla de eras geológicas. |
| `ecosistemas.html` | Bióticos y abióticos, cadena del páramo, red trófica amazónica en la que se puede «quitar» una especie y ver el efecto en cascada, pirámide de energía (regla del 10 %), ciclos del agua, del carbono y del nitrógeno, relaciones entre especies, hábitat, nicho y adaptaciones, crecimiento de poblaciones (curvas J y S). |
| `regiones.html` + `mapa-colombia.js` | Mapa de las 6 regiones naturales (a partir de los límites del DANE, MGN 2018; la franja del Pacífico en Valle, Cauca y Nariño es aproximada) con 22 lugares y filtro por 10 tipos de ecosistema, tarjetas de ecosistemas, pisos térmicos, especies amenazadas con categorías de la UICN y estrategias de conservación, reto «¿dónde lo encuentro?». |
| `ambiente.html` | Efecto invernadero con simulación del CO₂, datos de Mauna Loa con predicción, causas en Colombia, consecuencias por región y comunidades vulnerables, El Niño y La Niña, océanos, energías renovables y no renovables, calculadora de huella de carbono con compromisos, mitigación, adaptación y resiliencia. |
| `juego.html` + `banco.js` | 223 preguntas en 9 temas, de 4 tipos (selección múltiple, verdadero o falso, escribir, ordenar). Modo libre y Modo Estudiante, compatible con el backend de IonNom; envío con reintentos y registro de partidas abandonadas. |
| `docente.html` | Generador de talleres y evaluaciones en hojas carta: hasta 10 versiones, código para repetirlas, preguntas de análisis e indagación, hoja de respuestas opcional (desmarcada por defecto, con ✔ y «Solo para el docente») y marca de agua con el ícono. Ahorcado y sopa de letras (`ahorcado-datos.js`, 100 palabras con 3 pistas cada una). Orientaciones: secuencia de clase, competencias y pasos para activar el Modo Estudiante. |
| `bionom-analytics.gs` | Backend de Google Apps Script copiado de IonNom Analytics v3.3, con los temas de BioNom. `SPREADSHEET_ID` vacío: crea su propia hoja. |

### Cómo se verificó
Se probó con Playwright (Chromium) en computador (1280 px) y celular (390 px):
- Ninguna página tiene errores de JavaScript ni se desborda de lado.
- El juego se jugó completo de principio a fin.
- Los PDF del generador no tienen hojas en blanco ni texto cortado.
- Todos los archivos de la lista de la app existen y no hay repetidos.

### Pasos manuales pendientes
1. **GitHub Pages:** Settings → Pages → rama `main`, carpeta `/ (root)`.
2. **Modo Estudiante** (hasta hacerlo, el juego solo funciona en Modo libre):
   1. Copiar `bionom-analytics.gs` a un proyecto nuevo en script.google.com.
   2. Ajustar `FECHA_INICIO_PERIODO` y `FECHA_FIN_PERIODO`, que aún tienen las
      fechas de IonNom.
   3. Ejecutar `instalarActualizacionAutomatica`.
   4. Llenar la pestaña «Estudiantes».
   5. Implementar como aplicación web.
   6. Pegar la URL `/exec` en `APPS_SCRIPT_URL` de `juego.html`.
   7. Redesplegar después de cada cambio del `.gs` (redesplegar no es lo mismo
      que recalcular).

### Pendiente o sin resolver
- No se probó el Modo Estudiante con el código `110106`: el backend aún no
  está desplegado.
- Las cifras ambientales (emisiones de Colombia, CO₂, glaciares) y de
  anticoncepción son aproximadas y así se presentan; conviene revisarlas cada
  año.
