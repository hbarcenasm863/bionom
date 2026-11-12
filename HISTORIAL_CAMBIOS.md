# Historial de cambios de BioNom

> **Leer este archivo primero en cada sesión** (regla de `CLAUDE.md`).
> Las versiones más recientes van arriba. Cada sesión nueva agrega su entrada
> encima de esta, numerada (Versión 1.1, 1.2… o 2 si el cambio es grande).

---

## Versión 2.30 — 12 de noviembre de 2026 · El laboratorio de microscopía en su propia página, en horizontal

**Contexto.** El docente prefirió el laboratorio de microscopía en una página
aparte, para que se vea mejor, y pidió que en el celular se use en horizontal,
con todos los controles a un lado.

**Cambios.**
- **`microscopio.html` (nueva)**, subpágina de *La célula*
  (`padre:'celula'` en `MODULOS`; aparece en la barra de subpáginas, en «Más»
  y en la portada). Tiene:
  - palabras clave (ocular, objetivo, aumento total, diafragma, tinción y
    aceite de inmersión);
  - el laboratorio (`microlab.js`) con las fotos reales para comparar;
  - tres chequeos: aumento total, para qué se tiñe y para qué sirve el aceite;
  - el recuadro «Escribe tu conclusión».
- **Celular en horizontal** (`orientation:landscape` y alto ≤ 560 px):
  - se ocultan el menú, la barra inferior, la subbarra, la narración y el
    control de tamaño de letra;
  - el ocular queda grande a la izquierda (fijo) y los cuatro grupos de
    controles a la derecha, en dos columnas que caben en la pantalla;
  - los retos, la medición y la tabla siguen abajo, en la misma columna.
- **Celular en vertical:**
  - en lugar del laboratorio aparece «Gira tu celular», con el botón
    «Pantalla completa en horizontal»: pantalla completa y bloqueo de
    orientación con `screen.orientation.lock`, que funciona en Android y en la
    app instalada;
  - en iPhone el navegador no permite girar la pantalla solo: el aviso pide
    girarlo a mano y el laboratorio se acomoda;
  - un enlace permite usarlo en vertical de todos modos;
  - en computador hay un botón de pantalla completa.
- **`celula.html`:**
  - la sección del microscopio conserva las partes, la calculadora, la
    preparación de la lámina y sus dos chequeos;
  - el laboratorio se cambió por un botón grande «Abre el laboratorio de
    microscopía»;
  - «Siguiente» va al laboratorio, y en `division.html` «Anterior» vuelve a
    él.
- `sw.js`: `microscopio.html` agregado a `ASSETS`.

**Pruebas.** Con Playwright:
- Pixel 7 e iPhone 13 en horizontal: sin menú, ocular a la izquierda y
  controles a la derecha, sin desbordes;
- Pixel 7 en vertical: aviso de girar y la opción de usarlo en vertical;
- en computador y en Pixel 7 horizontal, el laboratorio completo: los 5
  retos, la lámina rota, 100× sin y con aceite, la medición, la conclusión
  guardada y el informe;
- las 16 páginas sin errores.

**Versiones.** `bio.js?v=23`, `sw.js` → `bionom-v43`.

---

## Versión 2.29 — 12 de noviembre de 2026 · Fotos reales para comparar en el laboratorio de microscopía

**Contexto.** El docente preguntó si las muestras del laboratorio de
microscopía usaban fotos reales. No: lo que se ve por el ocular es un dibujo
generado por el programa, porque tiene que cambiar con cada objetivo, enfoque,
diafragma y tinción. El docente pidió agregar fotos reales con su cita APA.

**Cambios.**
- `microlab.js`: debajo del ocular hay un recuadro **«Así se ve en un
  microscopio real»**. Aparece al cumplir el reto de cada muestra, con la foto
  real, su pie explicativo y la cita APA (con `FOTO()` de `fotos.js`). Antes
  de cumplir el reto dice «Cumple el reto de esta muestra para compararla con
  una foto real».
- **Fotos de cada muestra:**
  - cebolla: `k_cebolla`;
  - mejilla con azul de metileno: `k_cheek`;
  - Elodea: `k_elodea`;
  - frotis de sangre teñido con un neutrófilo: `m_frotis`, nueva
    (Chaurasiya, A. K., CC BY-SA 4.0);
  - bacterias del yogur, *Lactobacillus bulgaricus* a través del ocular:
    `m_yogur`, nueva (Bondarev.gal, CC BY 4.0).
- `fotos-datos.js`: 2 fotos nuevas (132 en total).

**Pruebas.** Con Playwright en computador y en Pixel 7: en las 5 muestras, la
foto aparece al cumplir el reto, carga bien y lleva su cita APA. Sin errores
ni desbordes.

**Versiones.** `fotos-datos.js?v=7`, `microlab.js?v=4`, `sw.js` →
`bionom-v42`.

---

## Versión 2.28 — 12 de noviembre de 2026 · Preguntas oficiales del Icfes y modelo basado en evidencias

**Contexto.** El docente compartió el *Cuadernillo de preguntas Saber 11.º, Prueba Ciencias Naturales* del Icfes (2026) y pidió usar sus preguntas, dando el crédito, y revisar que las preguntas del juego y sobre todo de las herramientas docentes sigan el **modelo basado en evidencias** de la prueba (competencias → afirmaciones → evidencias) para fortalecer esas competencias. También pidió decidir qué pregunta va en cuál de los tres sitios.

**Diagnóstico de los bancos tipo Saber (antes de esta sesión).** La competencia de cada pregunta se tomó de su marca (`c`) o, si no la tenía, se estimó por el enunciado:

| Competencia (Icfes) | En la prueba real (cuadernillo 2026) | ChromaNom | IonNom | BioNom |
|---|---|---|---|---|
| Uso comprensivo del conocimiento científico | 26 % | 60 % | 39 % | 68 % |
| Explicación de fenómenos | 36 % | 28 % | 46 % | 29 % |
| Indagación | 38 % | 12 % → 19 % con las nuevas | 14 % | 3 % → 7 % con las nuevas |
| Preguntas sin contexto (situación, tabla o gráfica) | 0 | 0 | 610 de 736 | 0 |

La indagación (analizar datos, controlar variables, evaluar predicciones, sacar conclusiones) es la competencia con más preguntas en la prueba y la más débil en los tres sitios.

**Cambios.**
- **Reparto de las 50 preguntas del cuadernillo:** biología → BioNom (17: preguntas 5, 10, 11, 12, 16, 20, 21, 24, 34, 36, 38, 39, 40, 44, 46, 47 y 49); química general e inorgánica → IonNom (17: 1, 2, 3, 4, 7, 8, 15, 18, 19, 23, 27, 28, 29, 30, 33, 35 y 37); química orgánica → ChromaNom (2: 41 y 50). Las 14 de física (6, 9, 13, 14, 17, 22, 25, 26, 31, 32, 42, 43, 45 y 48) no se usan porque ningún sitio trabaja física.
- **`saber-icfes.js` (nuevo, el mismo archivo en los tres sitios):** guarda las tres competencias de la prueba y sus afirmaciones oficiales; da la competencia y la afirmación de cada pregunta (la que trae marcada o, si no la trae, una estimada por el tipo de tarea del enunciado); escoge las preguntas de la evaluación **repartidas entre las tres competencias** (meta cercana al cuadernillo: 30 % uso, 35 % explicación, 35 % indagación), con prioridad a las preguntas oficiales (hasta la mitad de la prueba) y a las que tienen contexto; y arma las figuras, el crédito de cada pregunta oficial y la **matriz de la evaluación** (número, competencia, afirmación, componente y fuente, sin respuestas).
- **Preguntas oficiales:** se copian **sin cambios** (los términos de uso del Icfes prohíben transformarlas), con sus opciones en el orden original (no se barajan, así coinciden con la clave del Icfes), las figuras recortadas del cuadernillo y debajo el crédito «Pregunta N del Cuadernillo de preguntas Saber 11.º, Prueba Ciencias Naturales (Icfes, 2026). Uso académico, sin ánimo de lucro.». Al final de la evaluación sale la cita completa del cuadernillo.
- **Figuras:** cada imagen lleva su tamaño fijo; sin eso, la paginación medía la hoja antes de que la imagen cargara y la figura se salía de la hoja (se vio en la prueba con Playwright).
- **`icfes-datos.js` (nuevo):** 17 preguntas oficiales en sus temas (Genética 5, 16, 38; Evolución 10, 11; Ambiente 12, 46; Reinos 20, 24, 40; Ecosistemas 21, 44; Nutrición 34; Célula 36, 49; Sistemas 39, 47), cada una con explicación y dos pistas de BioNom (no son del Icfes). Imágenes en `img/icfes/`.
- **`docente-datos.js`:** 24 preguntas nuevas de **indagación** (2 por tema) con su afirmación del Icfes: ósmosis en papa, levadura, fases de la mitosis, frecuencia cardíaca, germinación, Mendel, resistencia a antibióticos, conejos y zorros, páramo, oxígeno de un río, etc. La indagación pasa de 13 a 37 preguntas.
- **`docente-app.js` y `docente.html`:** la evaluación usa la selección por competencias; casilla nueva **«Priorizar preguntas oficiales del Icfes»** (marcada). En la **clave** cada pregunta dice su competencia, las oficiales traen su explicación y al final sale la **matriz de la evaluación**. En la hoja del estudiante sale el crédito de cada pregunta oficial y la cita del cuadernillo.
- **`juego.html`:** entran al juego, en su tema, las 14 preguntas oficiales que tienen opciones escritas (las de opciones dibujadas, 10, 24 y 44, quedan solo para las evaluaciones). Salen con su contexto, figura y crédito, sin barajar las opciones, con las pistas y la explicación de BioNom.
- **Versión de la app:** `sw.js` → `bionom-v42`, con los dos archivos nuevos en `ASSETS`.

**Verificación (Playwright).** Evaluación de Célula, Reinos, Genética y Ecosistemas con 14 preguntas: figuras dentro de la hoja, crédito, clave con competencias y matriz; juego con la pregunta 21 (red trófica) en celular: figura, crédito, pista y explicación. Sin errores en la consola.

**Pendiente.**
- La indagación sigue baja (7 % frente a ~38 % en la prueba): conviene seguir escribiendo preguntas con datos, tablas y gráficas.
- Las afirmaciones «estimadas» de la matriz se asignan por palabras del enunciado; si alguna queda mal, se marca a mano con `c` y `af` en `docente-datos.js`.

---

## Versión 2.27 — 12 de noviembre de 2026 · Laboratorio de microscopía, orden de secciones, chequeos y conclusiones

**Contexto.** El docente pidió cuatro cosas de las pendientes de la auditoría
de secuencia (`AUDITORIA_SECUENCIA_6-9.md`):
- una simulación completa tipo laboratorio en la sección del microscopio;
- reordenar las secciones de Reproducción y Evolución;
- más chequeos en Reproducción;
- el recuadro de conclusión en los laboratorios.

**1. Laboratorio virtual de microscopía (`microlab.js`, nuevo, en `celula.html`).**
- **Muestras:** epidermis de cebolla (sin teñir, lugol o azul de metileno),
  células de la mejilla, Elodea, frotis de sangre y bacterias del yogur.
- **Procedimiento completo:**
  - preparar y poner la lámina;
  - encender la luz y graduar el diafragma (las células sin teñir se ven
    mejor con el diafragma más cerrado);
  - objetivos de 4×, 10×, 40× y 100×;
  - tornillo macrométrico y micrométrico;
  - aceite de inmersión a 100×.
- **Realismo:**
  - el campo visual real de cada objetivo (4500, 1800, 450 y 180 µm), con
    las células dibujadas a escala en micrómetros;
  - el desenfoque crece con el aumento;
  - usar el tornillo grande con 40× o 100× rompe la lámina;
  - sin aceite, 100× se ve borroso.
- **Retos y registro:** 5 retos que se marcan solos (cebolla con lugol,
  mejilla con azul, cloroplastos de la Elodea, glóbulo blanco, bacterias a
  1000×) y una tabla de observaciones que se llena sola.
- **Medición:** el estudiante cuenta células a lo largo del campo de 1800 µm
  y calcula su tamaño (unos 250 µm).
- `microlab.js` agregado a `ASSETS` de `sw.js`.

**2. Orden de las secciones** (el orden recomendado por la auditoría). Se
movieron las secciones completas, con el índice «En esta página», la
numeración y los botones «Anterior/Siguiente» al final. Se comprobó que no se
perdió ninguna palabra.
- **Reproducción:** tipos → grupos → flor → sistema humano → ciclo →
  embarazo → desarrollo embrionario → anticonceptivos → ITS → natalidad.
- **Evolución:** ideas → origen del universo y de la vida → año de la
  Tierra → extinciones → jirafas → simulación → pinzones → selección
  artificial → evidencias → ballenas → evolución humana → endémicas → tipos de
  selección y variación (profundización).

**3. Chequeos en Reproducción:** de 4 a 11, con un chequeo en cada sección
que no tenía:
- clones del banano;
- esporas del helecho;
- el ovario se vuelve fruto;
- el espermatozoide define el sexo;
- la LH y la ovulación;
- dónde ocurre la fecundación;
- ITS sin síntomas.

**4. «Escribe tu conclusión» (componente nuevo en `bio.js` y `bio.css`).**
- Recuadro con nombre, curso, hipótesis, resultados, conclusión y «lo haría
  distinto».
- Se guarda solo en el equipo (`bionom_conclusion_<lab>`).
- Botón para imprimir o guardar en PDF un informe con la tabla de datos del
  laboratorio.
- Uso: `<div class="conclusion" data-lab="…" data-tabla="id" data-titulo="…">`.
- Está en el laboratorio de la papa, la campana de Priestley, la
  microscopía y la levadura.

**Pruebas.** Con Playwright en computador y en Pixel 7:
- la microscopía completa sin errores: los 5 retos, la lámina rota, 100× sin
  y con aceite, y la medición de 257 µm;
- la conclusión se conserva al recargar y el informe se abre para imprimir;
- los 11 chequeos de Reproducción tienen la respuesta correcta sin
  «data-por»;
- las 15 páginas sin errores ni desbordes.

**Versiones.** `bio.js?v=22`, `bio.css?v=23`, `microlab.js?v=2`, `sw.js` →
`bionom-v41`.

**Pendiente.**
- Selector de grado (`BIO_GRADO`) y guía de recorrido por grado.
- La tabla de observaciones del microscopio no se guarda al recargar la
  página: lo escrito en la conclusión sí se guarda.

---

## Versión 2.26 — 12 de noviembre de 2026 · Orden y profundidad para 6.° a 9.°

**Contexto.** El docente pidió que el auditor experto en biología y en los
lineamientos del MEN revisara si el orden y la profundidad de los contenidos
están bien para sexto a noveno. El informe está en
`AUDITORIA_SECUENCIA_6-9.md`: 6 acciones de prioridad alta, 10 media y 7
baja. El docente pidió aplicar las prioritarias y las de profundidad.

**Prioritarias (A1–A6).**
- **A1–A2. Nuevo orden de los módulos** (`MODULOS` en `bio.js`, menú, tarjetas
  de la portada y botones «Anterior/Siguiente»): Célula → División → Reinos →
  Ecosistemas → Ecosistemas de Colombia → Ambiente → Sistemas (Funciones,
  Nutrición) → Reproducción → Genética → Evolución → Juego. Así lo de
  6.°–7.° va primero. Se corrigió además el «Siguiente» de Ecosistemas de
  Colombia, que se saltaba Ambiente.
- **A3.** Distintivo morado «Profundización 10.°–11.°» (`.nivel-prof` en
  `bio.css`) en:
  - las etapas de la fotosíntesis y la respiración (célula);
  - la neurona (sistemas);
  - la mecánica de fluidos (funciones);
  - tipos de selección y variación y deriva (evolución);
  - la replicación (genética);
  - el laboratorio de la levadura (reinos);
  - la termodinámica (ecosistemas).
- **A4.** La meiosis de `division.html` ya no da por sabidos los alelos: los
  explica ahí mismo, con su definición emergente.
- **A5.** Sección nueva **«El microscopio»** en `celula.html`: partes que se
  iluminan paso a paso en un dibujo, calculadora del aumento total (ocular ×
  objetivo), cómo preparar la lámina de cebolla, cuidados y dos chequeos.
- **A6.** La tabla de bacterias y arqueas de `reinos.html` ya no habla de
  enlaces éter y éster ni de histonas en lenguaje técnico.

**Profundidad.**
- **8.°–9.° hipótesis sobre el origen de un grupo:** sección nueva «¿De dónde
  vienen las ballenas?» en `evolucion.html`, con 6 evidencias, un chequeo y
  un espacio para escribir la hipótesis propia.
- **8.°–9.° contaminación atmosférica:** sección nueva en `ambiente.html` con
  lluvia ácida, smog y ozono (arriba y abajo), y dos chequeos.
- **8.°–9.° etiquetas de alimentos:** sellos de advertencia de la Ley 2120 de
  2021 y cómo comparar dos productos, con un chequeo, en `nutricion.html`.
- **Temas que el juego preguntaba y ninguna página enseñaba:**
  - sucesión ecológica y especies pioneras (ecosistemas, con chequeo);
  - radiación adaptativa y coevolución (evolución);
  - faringe, laringe y bulbo raquídeo (sistemas);
  - donante y receptor universal (genética);
  - fibrosis quística (genética);
  - estuario (regiones);
  - endotermos y ectotermos (reinos).
- **Vocabulario de 6.°–7.°:**
  - se quitaron «70S» y «80S» en `celula.html`;
  - la PCR se explica con palabras sencillas;
  - en `celula.html`, palabras clave nuevas (glucosa y ATP) y un enlace a
    las moléculas de la vida de Nutrición.

**Pruebas.** Con Playwright: las 15 páginas sin errores ni desbordes en
computador y celular; la cadena «Siguiente» y la de «Anterior» completas en
el nuevo orden; el microscopio, las pestañas del aire y la portada en el
nuevo orden.

**Versiones.** `bio.js?v=21`, `bio.css?v=22`, `sw.js` → `bionom-v40`.

**Sin hacer (prioridad media y baja del informe).**
- Selector de grado (`BIO_GRADO`) para filtrar secciones y preguntas.
- Reordenar las secciones dentro de Reproducción y Evolución.
- Marcar el ciclo del nitrógeno para 7.°.
- Guía de recorrido por grado.
- Más chequeos en Reproducción.
- Recuadro «Escribe tu conclusión» en los laboratorios.

---

## Versión 2.25 — 11 de noviembre de 2026 · Rectángulo blanco en los modelos 3D del mapa de niveles

**Contexto.** El docente envió una captura del celular: en los modelos 3D del
mapa de niveles (portada) aparecía un rectángulo blanco grande que tapaba
media animación.

**Causa (reproducida con Playwright, Pixel 7).** Era el rótulo «tamaño:
0,1 nm» estirado de arriba abajo. En la revisión de UI/UX (2.23) la regla
general `.zoom-box .esc{bottom:8px}` quedó después de la regla de los modelos
3D `.m3d-box .esc{bottom:auto;top:8px}`. Como las dos tenían la misma
especificidad, ganó la general y el rótulo quedó pegado arriba y abajo a la
vez.

**Arreglo (`index.html`).** La regla pasa a ser `.zoom-box.m3d-box .esc`, que
gana siempre sin importar el orden. Verificado en los niveles con modelo 3D y
con foto de los tres ejemplos, en celular y computador: el rótulo mide 25 px
de alto.

**Versión de la app.** `sw.js` → `bionom-v39`. Primero se había publicado sin
subir `CACHE`, y por eso no salía el aviso «Nueva versión disponible» en la
app instalada. **Regla:** subir `CACHE` en cada publicación, aunque solo cambie
un `.html`, para que aparezca el aviso.

---

## Versión 2.24 — 11 de noviembre de 2026 · Estándares del MEN reforzados y foto del incendio

**Contexto.** De lo que quedó para decidir en la versión 2.23, el docente
escogió los dos primeros puntos: reforzar los cinco estándares del MEN que la
auditoría v2 encontró flojos y cambiar la foto del incendio forestal, en la
que casi no se veía el fuego.

**`evolucion.html`.**
- Sección nueva **«Tipos de selección natural»** (10.°–11.°), con gráfica de
  antes y después y dos chequeos:
  - direccional: *Aedes aegypti* resistente a insecticidas;
  - estabilizadora: peso al nacer;
  - disruptiva: pinzón *Pyrenestes*;
  - sexual: gallito de roca andino.
- **«Del Big Bang a la Tierra»** (6.°–7.°), en 5 pasos: expansión, Hubble
  (1929), radiación de fondo (1965), elementos fabricados en las estrellas y
  formación del Sistema Solar. Incluye foto del campo ultraprofundo del
  Hubble con cita APA y un chequeo.
- **Clima en las eras geológicas** (8.°–9.°): columna «Clima» en la tabla,
  dato de los páramos en las glaciaciones (más de 140 especies de
  *Espeletia*) y chequeo del Carbonífero (insectos gigantes por el oxígeno).

**`reinos.html`.**
- Sección nueva **«Dentro de cada reino: plantas y animales»** (8.°–9.°),
  con pestañas, un clasificador de 9 plantas, otro de 10 vertebrados y dos
  chequeos:
  - plantas: briofitos, helechos, gimnospermas y angiospermas;
  - las cinco clases de vertebrados y los invertebrados.
- **Laboratorio virtual de la levadura** (10.°–11.°): azúcar y temperatura
  como variables, globo animado, tabla de resultados, variables controladas,
  hipótesis y un chequeo.

**`ecosistemas.html`.** Chequeo de la segunda ley de la termodinámica, con el
chigüiro y el jaguar.

**Foto del incendio.** `a_incendio` ahora es una foto con llamas visibles
(Trincado, P., Pirque, Chile, CC BY 2.0). El pie aclara que la foto es de
Chile.

**`banco.js`.** 12 preguntas nuevas: 7 de evolución y 5 de reinos.
**`MATRIZ_MEN.md`.** Tabla de actualización con dónde se trabaja cada estándar
reforzado.

**Pruebas.** Con Playwright en computador y en Pixel 7: las 15 páginas sin
errores ni desbordes. Funcionan la gráfica de selección, los clasificadores y
la levadura (a 35 °C da 188 mL y a 70 °C, 0).

**Versiones.** `fotos-datos.js?v=6`, `banco.js?v=18`, `sw.js` → `bionom-v38`.

**Pendiente.** El crucigrama del juego en el celular con palabras largas: el
cambio va en `retos.js`, que es compartido con ChromaNom e IonNom.

---

## Versión 2.23 — 11 de noviembre de 2026 · Auditoría experta (ciencia, MEN, Mayer) y revisión técnica y de UI/UX

**Contexto.** El docente pidió dos revisiones a fondo con agentes: una
auditoría de un experto doctor en ciencias naturales, en los Estándares
Básicos de Competencias y en aprendizaje multimedia; y una revisión de un
ingeniero senior en programación, diseño gráfico y UI/UX, que también
ajustara los visuales. Informes completos: `AUDITORIA_2026-11-v2.md` y
`REVISION_TECNICA_2026-11.md`.

**1. Auditoría científica y didáctica: 45 hallazgos (7 altos, 16 medios y 22
bajos), todos aplicados salvo los que se indican abajo.**
- En los bancos (subido antes, en el commit de la auditoría v2):
  - arqueas metanógenas como productoras del metano;
  - microbios del rumen;
  - el polen ya no aparece como gameto;
  - pisos térmicos, alvéolos, El Niño y antibióticos coherentes con las
    páginas;
  - la pregunta de las algas ya no sale con 7 reinos (`m:'56'`);
  - pistas de RESPIRACIÓN (30 a 32 ATP), BIOACUMULACIÓN y HOMÍNIDO;
  - guías y Detective (Woese en 1990, «ProMeAnaTe», la yema de avestruz).
- En las páginas:
  - las bacterias no hacen mitosis (`division.html`, `reproduccion.html`);
  - el rumen y el camuflaje del insecto palo (`funciones.html`);
  - el año de la Tierra: «última hora» y la cordillera Oriental el 31 de
    diciembre (`evolucion.html`);
  - la vida y el agua, el mercurio, biomagnificación (`nutricion.html`);
  - la pastilla de emergencia ahora muestra el dato por relación y no por
    año; el tiburón ballena; los anticonceptivos sin «implantación»
    (`reproduccion.html`);
  - Linneo, Monera, enzimas de extremófilos y la clave dicotómica
    (`reinos.html`);
  - Ibagué en el piso templado y la rana dorada del Cauca (`regiones.html`,
    `evolucion.html`);
  - el mangle negro (`ecosistemas.html`);
  - la tarjeta de Reinos y el oxígeno del cuerpo (`index.html`);
  - el chequeo de Pasteur explica cada error, más Ruska y el agua destilada
    (`celula.html`);
  - el estándar de 8.°–9.° en `MATRIZ_MEN.md`.
- Probado: la pastilla de emergencia y el chequeo de Pasteur, en el
  navegador.

**2. Revisión técnica y UI/UX (15 páginas, en computador, tableta, Pixel 7 e
iPhone 13).** No había errores de consola, archivos 404 ni desbordes. Se
arregló:
- **Contraste (WCAG AA):** nueva variable `--cn-naranja-tx` para texto
  naranja y `--cn-azul` más oscuro; categorías UICN, bases del ADN y Punnett
  más legibles.
- **Genética en el celular:** el ADN en dos filas.
- **Áreas táctiles más grandes:** instalar, puntos de los pasos, órganos y
  leyendas.
- **Subpáginas:** `funciones.html` y `nutricion.html` cargan el control de
  letra y el botón de instalar.
- **Foco visible con teclado.**
- **Batería:** la animación de la citocinesis solo corre cuando está a la
  vista.
- **Versiones:** `bio.css?v=21`, `pwa-install.js?v=14`, `sw.js` →
  `bionom-v37`.

**Sin resolver (para decidir con el docente).**
- Estándares MEN que la auditoría encontró flojos:
  - tipos de selección natural (10.°–11.°);
  - clima en las eras geológicas (8.°–9.°);
  - origen del universo (6.°–7.°);
  - clasificar dentro de cada reino (8.°–9.°);
  - experimento con microorganismos en alimentos (10.°–11.°).
- Foto `a_incendio` poco clara: buscar otra.
- Crucigrama del juego en el celular con palabras largas: el cambio va en
  `retos.js`, que es compartido con ChromaNom e IonNom.

---

## Versión 2.22 — 11 de noviembre de 2026 · Animaciones del ARN mensajero y de la replicación

**Contexto.** Una docente le comentó al docente que en la replicación faltaba
la función y la animación de lo que hace el ARN mensajero. En
`genetica.html`, sección «El ARN y la copia del ADN», el ARNm solo tenía una
tarjeta que se voltea, y la replicación eran tres pasos de texto sin figura.
Aclaración científica que quedó en la página: el ARN mensajero no participa
en la replicación (actúa en la síntesis de proteínas); el ARN que sí participa
es el **cebador** que pone la primasa.

**Cambios en `genetica.html`.**
- Nueva figura por pasos **«El trabajo del ARN mensajero»** (SVG animado,
  `window.pasoARNm`), en 5 pasos:
  1. Se copia en el núcleo: transcripción con la ARN polimerasa, a partir del
     ADN TACCACGTGGACATT.
  2. Sale por un poro de la envoltura nuclear.
  3. El ribosoma se arma sobre el codón de inicio AUG y llega el ARNt con
     UAC y metionina.
  4. Lectura de tres en tres: GUG, CAC y CUG traen valina, histidina y
     leucina.
  5. Codón de parada UAA: la proteína se suelta y el ARNm se reusa y luego
     se destruye.
- La replicación ahora tiene **figura animada** (`window.pasoReplica`) y un
  paso nuevo: helicasa, **cebador de ARN** (primasa), ADN polimerasa (con una
  mención a los fragmentos de Okazaki) y resultado semiconservativo (cadena
  vieja + cadena nueva).
- Dos chequeos nuevos con explicación de cada error: para qué sirve el ARNm y
  qué ARN participa en la replicación.
- Con «reducir movimiento» del sistema, cada paso se dibuja sin animación.

**`banco.js`.** Tres preguntas nuevas de genética para el juego y los
laberintos (función del ARNm, el cebador y el ARNm que sale del núcleo).

**Pruebas.** Con Playwright en computador y en celular (Pixel 7): los 9
pasos se dibujan sin errores, no hay desborde y los chequeos explican las
opciones equivocadas.

**Versiones.** `banco.js?v=17`, `sw.js` → `bionom-v36`.

**Antes de esta versión (11-11-2026).** Se subieron a `main` las
correcciones de la auditoría v2 en los bancos (`banco.js`,
`docente-datos.js`, `ahorcado-datos.js`) y el informe
`AUDITORIA_2026-11-v2.md`.

**Pendiente.**
- Aplicar en las páginas las correcciones de la auditoría v2: división,
  evolución, nutrición, reproducción, reinos, funciones, regiones,
  ecosistemas, célula y portada.
- Esperar la revisión técnica y de UI/UX que está en curso.

---

## Versión 2.21 — 11 de noviembre de 2026 · Se arregla lo que quedaba pendiente

**Contexto.** El docente pidió arreglar lo faltante. Se revisaron los
pendientes del historial y de la auditoría (`AUDITORIA_2026-11.md`) y se
resolvió todo lo que se puede hacer con código.

**1. Explicaciones fuera de la vista en el celular (pendiente de la 2.18).**
- Se midió con Playwright (Pixel 7) dónde la explicación aparecía fuera de la
  pantalla al tocar algo: el cuerpo humano de Sistemas (30 casos), la clave
  dicotómica de Reinos, las partes de la célula, las fases de la mitosis, el
  plato saludable y otros.
- `bio.js` y `bio.css`: si la explicación nueva queda fuera de la vista, se
  muestra una copia en un **recuadro flotante** abajo (máximo 30 % de la
  pantalla), con «Ir allá ↓» y «✕». Sus botones funcionan, porque tocan los
  botones originales. Se cierra solo cuando la explicación original queda a
  la vista. **La página no se mueve sola.** No se usa en la portada, el juego
  ni el panel docente.

**2. Modelo de reinos en los resultados del Modo Estudiante (pendiente de la 2.20).**
- `juego.html` envía `modelo_reinos` (por ejemplo «6 reinos con 3 dominios»).
- `bionom-analytics.gs`: nueva columna «Modelo de reinos» al final de la hoja
  Registro. Una hoja que ya existía recibe el encabezado sin perder datos, y
  las filas migradas se completan con celdas vacías (`rellenarFilas_`).

**3. Narración por pasos (recomendación 2 de la auditoría).** Si el
estudiante escuchó una sección con «🔊 Escuchar», al pasar de paso (botones o
puntos) o de pestaña se lee solo el texto nuevo, sin volver a tocar el botón.
Probado: al pasar al paso 2 de «Cadenas tróficas» se lee solo ese paso.

**4. Lectura completa de las preguntas abiertas y del Detective
(recomendación 5).**
- Detective: 60 historias, 5 o más por tema, todas con 8 frases dudosas, sin
  repetidas ni fórmulas con paréntesis.
- Preguntas abiertas (480): el contenido científico está correcto. Se
  corrigió «propone» por «propón» (3), se aclaró el ejemplo de los ojos
  azules (modelo sencillo de un gen), se suavizó «la deforestación es la
  principal fuente de emisiones» a «una de las principales», y se cambiaron 8
  preguntas casi repetidas dentro del mismo tema por preguntas nuevas (especie
  clave, restauración ecológica, ranas de Colombia, huella de carbono del
  transporte, deshielo y nivel del mar, polinización y fecundación, controles
  del embarazo, Whittaker y los hongos). Todos los temas siguen con 40 o más.

**Versiones.** `bio.js?v=20`, `bio.css?v=20`, `docente-datos.js?v=18`,
`sw.js` → `bionom-v35`.

**⚠️ Pasos manuales (cuando se active el Modo Estudiante en 2027).**
1. Copiar `bionom-analytics.gs` al editor de Apps Script y crear una nueva
   versión de la implementación (Implementar → Administrar implementaciones →
   Editar → Nueva versión).
2. Ejecutar `recalcularAhora()` para reescribir las hojas de estadísticas.
3. Cambiar `MODO_ESTUDIANTE_ACTIVO` a `true` y pegar la URL en
   `APPS_SCRIPT_URL` de `juego.html`, y probar con el código `110106`.

**Lo que no se puede hacer con código.** Grabar la voz del docente para la
narración (recomendación 1) y revisar cada año las cifras ambientales.

---

## Versión 2.20 — 11 de noviembre de 2026 · Todo el material de reinos sigue el modelo del docente

**Contexto.** El docente aceptó extender el modelo de reinos que escoge (5, 6 o
7 reinos, con o sin los 3 dominios) a las guías, las evaluaciones, el juego y
el resto del material, que seguían usando 5 reinos.

**Cómo funciona.**
- `bio.js`: nuevo `window.BIO_CLASIF` (se carga antes que los bancos). Lee el
  modelo guardado en el equipo (`bionom_clasificacion`) o el del enlace
  `?reinos=6&dominios=si`, y lo guarda. `vale(m)` y `valeD(d)` dicen si una
  pregunta sirve en ese modelo. `reinos.html` usa el mismo valor.
- Marcas en los datos: `m:'5'`, `'6'`, `'7'`, `'56'` o `'67'` = solo en esos
  modelos; `d:1` = solo si se trabajan los dominios. Lo que nombra el modelo
  («en el modelo de cinco reinos», Whittaker, Woese) sirve en todos.
- `banco.js` (juego, laberintos): 3 preguntas quedan solo para 5 reinos y 2 de
  dominios solo con dominios; 18 preguntas nuevas para 6 y 7 reinos y
  dominios. Cada modelo tiene entre 55 y 66 preguntas de reinos (45 o más
  cortas).
- `docente-datos.js`: la lectura de la guía (párrafos de los reinos y de los
  dominios), el mapa de ideas (esquema del modelo), los aprendizajes previos,
  las preguntas tipo Saber (3 de Protista quedan para 5 y 6 reinos; 8 nuevas
  para 6 y 7; la clave dicotómica y los distractores ya no dicen «Monera» en
  6 y 7), las abiertas (con 40 o más en todo modelo) y el detective.
- `ahorcado-datos.js` (ahorcado, sopa, crucigrama, criptograma): palabras
  nuevas EUBACTERIA, ARCHAEBACTERIA, PROTOZOA y CHROMISTA; MONERA solo en 5
  reinos y PROTISTA no sale en 7.
- `docente.html`: recuadro «Modelo de reinos que usa en clase» arriba de las
  pestañas, con el enlace del juego para los estudiantes. Al cambiarlo la
  página se recarga.
- `juego.html`: aviso con el modelo que se está usando. Con el enlace del
  docente (`juego.html?reinos=7&dominios=si`) el celular del estudiante queda
  con ese modelo.
- `reinos.html`: el recuadro del enlace muestra también el del juego.
- Probado con Playwright: con 7 reinos y dominios, la guía y la evaluación de
  reinos ya no mencionan Monera, el juego arranca y ninguna página tiene
  errores.
- Versiones: `bio.js?v=19`, `banco.js?v=16`, `ahorcado-datos.js?v=16`,
  `docente-datos.js?v=17`, `sw.js` → `bionom-v34`.

**Pendiente.** El Modo Estudiante guarda las respuestas igual que antes; las
estadísticas no distinguen el modelo con que se respondió.

---

## Versión 2.19 — 11 de noviembre de 2026 · Mapa conceptual de reinos con el modelo del docente

**Contexto.** El docente notó que en el panel docente, pestaña «Mapa
conceptual», el tema de reinos solo generaba el mapa de 5 reinos, aunque en
`reinos.html` ya se puede escoger el modelo de 5, 6 o 7 reinos, con o sin
dominios.

**Cambios.**
- `docente-datos.js`: al final, `DOCENTE_DATOS.MAPAS_EXTRA` con cinco
  variantes del esquema de reinos: 6 reinos, 7 reinos, y 5, 6 y 7 reinos con
  los 3 dominios (con dominios, el mapa va Seres vivos → dominios → reinos).
- `extras.js`: `MP.temas()` acepta esas variantes opcionales (`base:'reinos'`)
  y las pone en la lista justo debajo del tema base. Sin `MAPAS_EXTRA` funciona
  igual que antes. **Este archivo es compartido con ChromaNom e IonNom:** si
  allá se copia la versión nueva, el cambio es compatible.
- Probado con Playwright: la lista muestra las 6 opciones de reinos y cada
  una genera su mapa sin errores; en el de 7 reinos se usaron palabras cortas
  para que quepan los 7 recuadros.
- Versiones: `docente-datos.js?v=16`, `extras.js?v=14`.

**Pendiente.** Las guías (lectura y mapa de ideas de la sesión 2), las
evaluaciones y el juego siguen usando el modelo de 5 reinos.

---

## Versión 2.18 — 11 de noviembre de 2026 · Ya no salta la página, modelos 3D y fotos reales en el mapa de niveles

**Contexto.** El docente reportó que en varias páginas, en el celular, la
pantalla bajaba sola al hacer un ejercicio o mover un deslizador. También pidió
que en el mapa de niveles de la portada la imagen de cada nivel fuera un modelo
3D o una foto real (el dibujo de una cara soplando no decía nada del átomo), y
que en la línea del tiempo de `celula.html` Robert Brown tuviera una orquídea y
Schleiden una célula vegetal.

**Página que bajaba sola (`bio.js`, `bio.css`).**
- Se reprodujo con Playwright simulando un Pixel 7 y tocando todos los botones,
  opciones, fichas y deslizadores de cada página: hubo saltos de hasta 1000 px
  (huella de carbono, laboratorio de nutrición, red trófica, genética...).
- Causa: el desplazamiento automático hacia la explicación que se agregó en la
  versión 2.13 (contigüidad espacial). **Se quitó por completo.** Tras el
  cambio, la misma prueba no muestra saltos al resolver ejercicios. Solo se
  mueve la página donde es a propósito: «Empezar reto» en Regiones, tocar un
  nivel en el mapa de la portada y el botón Escuchar de la narración.
- Los deslizadores llevan `touch-action:none`: al arrastrarlos no se mueve la
  página.

**Modelos 3D y fotos en el mapa de niveles (`index.html`, `modelo3d.js` nuevo).**
- `modelo3d.js` dibuja modelos 3D que giran solos y se pueden girar con el
  dedo, sin librerías: átomos de oxígeno, carbono y hierro (modelo de capas,
  con aviso de que no está a escala) y moléculas de ADN, clorofila y melanina
  (bolas y varillas, simplificadas). Uso: `M3D.montar(elemento,'adn')`.
- Del nivel organelo a la biosfera, cada ejemplo (tu cuerpo, frailejón y
  jaguar) muestra una foto real con su pie y su cita APA: mitocondria y
  cloroplasto al microscopio electrónico, músculo cardíaco, tricomas, hueso
  compacto, modelo del corazón, roseta de frailejón, ojos del jaguar, sistema
  circulatorio, esqueleto de jaguar, Hombre de Vitruvio, Guatapé, frailejonal
  y bosque de frailejones de Sumapaz, jaguares, Parque Simón Bolívar,
  guacamaya en Antioquia, selva desde el aire, la Tierra desde el espacio y la
  laguna de Chingaza. 21 fotos nuevas (129 en total).

**Línea del tiempo de la célula (`celula.html`).** Robert Brown: foto de la
orquídea *Cattleya trianae* (flor nacional). Schleiden: células de epidermis
de cebolla.

**Versiones.** `bio.js?v=18`, `bio.css?v=19`, `fotos-datos.js?v=5`,
`modelo3d.js?v=1` (agregado a `ASSETS`), `sw.js` → `bionom-v33`.

**Pendiente / sin resolver.**
- La explicación de las figuras ya no se acerca sola en el celular: si en
  algún ejercicio queda lejos de lo que se toca, conviene acercarla en el
  propio diseño de esa sección, sin mover la página.
- Siguen pendientes los puntos de la versión 2.17 (selector de reinos en el
  juego y el panel docente; redesplegar `bionom-analytics.gs`).

---

## Versión 2.17 — 11 de noviembre de 2026 · Subpáginas, más fotos libres y modelo de reinos escogido por el docente

**Contexto.** El docente recordó tres cosas: que todo el sitio cuelga del mapa
de niveles de organización y de allí se despliega; que, cuando se pueda, se
usen fotos de bancos libres; y que las páginas nuevas vayan como subpáginas de
los temas principales para no desordenar el menú. Después pidió que en los
mapas de reinos se pueda escoger la clasificación que da el docente: 5, 6 o 7
reinos, con o sin dominios.

**Subpáginas (`bio.js`, `bio.css`, `index.html`).**
- En `MODULOS` una página puede tener `padre`. *Funciones vitales comparadas*
  y *Nutrición y salud* ahora son subpáginas de *Sistemas del cuerpo*.
- Las subpáginas ya no salen en el menú de arriba (allí queda marcado su tema
  principal). En el menú «Más» del celular salen sangradas con ↳ bajo su tema.
- Nueva barra de subpáginas arriba de cada página de la familia:
  «Sistemas del cuerpo › Funciones vitales comparadas › Nutrición y salud».
- En la portada siguen en el mapa de niveles (organismo, sistema, órgano y
  molécula) y sus tarjetas salen como «Subpágina de Sistemas del cuerpo».

**Fotos de bancos libres con cita APA (13 nuevas, 107 en total).**
- `nutricion.html`: mosquito *Aedes aegypti*, Alexander Fleming, colonias de
  *Penicillium* y un melocactus (agua).
- `funciones.html`: esquema de la branquia, dormidera (*Mimosa pudica*) y
  drosera.
- `ecosistemas.html` (suelo): perfil real de un suelo tropical.
- `evolucion.html`: aparato de Miller y Urey (en español) y el límite K-Pg.
- `regiones.html` (placas): mapa de las placas del Caribe y norte de los Andes.
- `reinos.html`: ganado romosinuano (variedades) y euglena (reino Protozoa).

**Modelo de reinos escogido por el docente (`reinos.html`).**
- Panel nuevo al inicio: «¿Con qué clasificación trabaja tu clase?» con
  5, 6 o 7 reinos y «Sin dominios / Con 3 dominios». La elección se guarda en
  el dispositivo (`bionom_clasificacion`) y se repite en la sección del mapa y
  en el reto, siempre sincronizada.
- Enlace para los estudiantes: `reinos.html?reinos=6&dominios=si` abre la
  página ya con ese modelo (el panel muestra el enlace y un botón Copiar).
- Se ajustan solos: el mapa de la clasificación (con dominios y 5 reinos,
  Monera queda unido a los dominios Bacteria y Archaea, con una nota), los
  grupos de colores, las tarjetas de «Los N reinos» (Eubacteria, Archaebacteria
  / Bacteria, Archaea, Protozoa, Chromista, con la etiqueta de su dominio), los
  filtros, la clave dicotómica (pregunta nueva del peptidoglucano y organismo
  nuevo «Arquea de las salinas»; dice el dominio cuando aplica) y el reto de
  clasificar.

**Versiones.** `bio.js?v=17`, `bio.css?v=18`, `fotos-datos.js?v=4`, `sw.js`
→ `bionom-v32`.

**Pendiente / sin resolver.**
- El juego y el panel docente siguen preguntando con el modelo de 5 reinos
  (y algunas preguntas mencionan dominios). Si el docente lo quiere, se puede
  agregar el mismo selector al generador docente.
- Paso manual que sigue pendiente desde la versión 2.16: copiar
  `bionom-analytics.gs` al editor de Apps Script, crear una nueva versión de la
  implementación y luego ejecutar `recalcularAhora()`.

---

## Versión 2.16 — 11 de noviembre de 2026 · Cobertura completa de los Estándares Básicos de Competencias del MEN

**Contexto.** El docente pidió evaluar, con los lineamientos del MEN, si los
temas y explicaciones cubren todas las competencias de los Estándares Básicos
de Competencias en Ciencias Naturales, y agregar páginas y preguntas donde
faltara. Compartió el PDF oficial (*Estándares Básicos de Competencias*, MEN
2004). La evaluación completa, estándar por estándar, está en `MATRIZ_MEN.md`.

**Resultado de la evaluación.** De 72 estándares de biología, salud y ambiente
de sexto a undécimo, 41 ya estaban cubiertos, 7 estaban en parte y 24 faltaban.

**Páginas nuevas.**
- `funciones.html` · **Funciones vitales comparadas** (8.°-9.° y 10.°-11.°):
  digestión, respiración (clasificador), circulación con corazones de 2, 3 y 4
  cavidades, excreción (amoníaco, urea, ácido úrico), regulación nerviosa y
  hormonal con fitohormonas y experimento de fototropismo, defensa y ataque
  (clasificador morfológica/fisiológica) y mecánica de fluidos con un modelo de
  la ley de Poiseuille.
- `nutricion.html` · **Nutrición y salud** (6.°-7.° y CTS de todos los grados):
  biomoléculas en todos los grupos y laboratorio virtual de reactivos, el agua,
  plato saludable interactivo (Guías Alimentarias del ICBF), dietas de las
  regiones, deporte y salud, sustancias que hacen daño (cafeína, tabaco y
  vapeadores, alcohol, drogas), enfermedades transmisibles (clasificador),
  antibióticos y contaminación y salud.

**Secciones nuevas en módulos existentes.** Sistemas: la neurona y el impulso
nervioso con gráfica del potencial de acción. Evolución: el origen del universo
y de la vida (con simulación de Miller y Urey) y las grandes extinciones.
Ecosistemas: el suelo como depósito de nutrientes y las leyes de la
termodinámica. Ecosistemas de Colombia: placas tectónicas y clima. Reinos:
variedades dentro de una especie y microorganismos útiles. Reproducción: la
natalidad y las poblaciones (pirámide de población). Célula: clasificador de
membranas por permeabilidad y tabla de mecanismos de obtención de energía con
quimiosíntesis. Todas con palabras clave, pasos y al menos dos chequeos.

**Bancos.**
- `banco.js`: 2 temas nuevos en `TEMAS_JUEGO` con 50 preguntas cada uno (con 2
  pistas y explicación, opciones cortas que sirven en los laberintos) y 28
  preguntas para las secciones nuevas.
- `docente-datos.js`: guías de sesión (`TEMAS`), 40 preguntas tipo Saber 11 y
  40 abiertas por tema nuevo, 20 Saber 11 de las secciones nuevas y 5 historias
  del Detective por tema (8 frases dudosas cada una).
- `ahorcado-datos.js`: 42 y 41 palabras nuevas con 3 pistas, sin repetir.
- `docente.html` (casillas del laberinto), `bio.js` (menú), `index.html`
  (descripciones), navegación anterior/siguiente, `sw.js` (`bionom-v31`) y `?v=`.

**⚠️ Paso manual pendiente.** `bionom-analytics.gs` tiene dos temas nuevos en
`TEMAS_PRINCIPALES` («Funciones vitales comparadas» y «Nutrición y salud»).
Cuando se active el Modo Estudiante en 2027, copiarlo al editor de Apps Script y
crear una nueva versión de la implementación; luego ejecutar `recalcularAhora()`.

**Verificación.** Playwright a 1366 y 390 px en las 15 páginas: sin errores ni
desbordes. Juego: los temas nuevos aparecen con 50 preguntas y funcionan. Panel
docente: guías, talleres, evaluaciones, laberinto, crucigrama, ahorcado, sopa y
Detective generan contenido de los temas nuevos sin errores.

**Sin resolver.** Los estándares de *Entorno físico* (química y física) quedan
fuera de BioNom: la química está en IonNom y ChromaNom. No se pudo descargar el
texto de los DBA porque la red del entorno no permite el sitio del MEN; la
evaluación se hizo con el PDF de los Estándares que compartió el docente.

## Versión 2.15 — 11 de noviembre de 2026 · Tarjetas volteables sin texto cortado

**Contexto.** El docente reportó que en el celular las tarjetas de «Los cuatro
tejidos del cuerpo» (sistemas) tenían el texto amontonado y cortado.

**Causa.** Las dos caras de cada tarjeta tenían una altura fija: si el texto de
atrás era largo, se salía de la tarjeta. Además el reverso se organizaba como
una columna flexible, que separaba la negrita del resto de la frase. Medido con
Playwright: 6 caras desbordadas (sistemas en celular y computador, célula
«Microbiología y vacunas» y reproducción «Reproducción vegetativa» en computador).

**Cambio.** `bio.css`: las dos caras se apilan en la misma celda de una
rejilla, de modo que la tarjeta toma la altura de su cara más larga; el reverso
fluye como un párrafo, y las tarjetas de una misma fila quedan de la misma
altura. Aplica a todas las tarjetas del sitio. `?v=16` de `bio.css` y
`sw.js` → `bionom-v30`.

**Verificación.** 0 caras desbordadas en los 11 módulos a 390 y 1366 px; las
tarjetas se siguen volteando. Recargar con Ctrl+F5.

## Versión 2.14 — 11 de noviembre de 2026 · Los deslizadores ya no mueven la página en el celular

**Contexto.** El docente reportó que en el celular, al usar un deslizador (por
ejemplo, el tiempo en la campana de Priestley), la página bajaba sola e impedía
ver la figura completa.

**Causa.** El ajuste de contigüidad espacial de la versión 2.13 (`bio.js`)
desplaza la página hasta la explicación que aparece después de un toque. Mover
un deslizador también contaba como toque. Reproducido con Playwright: el de
ósmosis bajaba la página 713 píxeles.

**Cambio.** `bio.js`: el ajuste ya no actúa cuando se toca un deslizador, una
casilla, un menú o un campo de texto; solo con figuras y botones. `?v=15` de
`bio.js` en las páginas y `sw.js` → `bionom-v29`.

**Verificación.** Deslizadores de célula (aumento, ósmosis, Priestley),
reproducción, evolución, regiones y ambiente: 0 píxeles de desplazamiento. Al
tocar una figura en célula, división, reinos, sistemas y regiones la
explicación sigue quedando a la vista. Recargar con Ctrl+F5.

## Versión 2.13 — 11 de noviembre de 2026 · Auditoría biológica y didáctica (principios de Mayer)

**Contexto.** El docente pidió una auditoría que verificara que todo el
contenido sea biológicamente correcto y que el sitio cumpla los principios del
aprendizaje multimedia de Mayer. El informe completo está en
`AUDITORIA_2026-11.md`.

**Qué se revisó.** Los 10 módulos y la portada (incluidos los textos escondidos
en el código), las 536 preguntas del juego, las 400 preguntas Saber 11, las
lecturas del panel docente, las 400 palabras con pistas del ahorcado y la sopa,
y las ilustraciones del embarazo. La didáctica se midió con Playwright en
computador y celular.

**Correcciones biológicas (28 grupos).** ATP de la respiración (30 a 32, no 36
o 38) en la teoría, el juego y el ahorcado; ciclo de Calvin y de Krebs; origen
de las vacunas; acción de la penicilina; manglares; título del laboratorio de la
papa; el polen no es un gameto; combinaciones 2²³ en la meiosis; **semanas del
embarazo unificadas** (todas en semanas de embarazo, con nota que explica la
diferencia con las semanas desde la fecundación), tamaños, latido y momento en
que se distingue el sexo en la ecografía; definición de cordados; paramecio en
el mapa de 7 reinos; Linneo; nodo sinusal del corazón; arterias pulmonares;
médula ósea del adulto; marsupiales de Colombia; *Monquirasaurus boyacensis*;
resistencia a antibióticos; ADN compartido con el gorila (98,3 %); fijismo hasta
el siglo XIX; respiración de las bacterias; efectos de El Niño; páramos de
Panamá; «arvejas»; 30 billones de células en todo el sitio; preguntas del banco
sobre plantas y sobre el tamaño de las regiones.

**Mejoras didácticas.**
- **Contigüidad temporal** (`narracion.js`): la narración lee solo lo que está
  en pantalla, no los pasos ni las pestañas ocultas.
- **Contigüidad espacial en el celular** (`bio.js`): al tocar una figura, la
  página se desplaza hasta su explicación (antes quedaba fuera de la pantalla en
  sistemas y regiones).
- **Preentrenamiento**: recuadro «🔑 Antes de empezar: palabras clave» al
  comienzo de los 10 módulos (`.pre-claves` en `bio.css`).
- **Práctica con retroalimentación**: 2 chequeos nuevos en regiones (que no
  tenía ninguno), 2 en ambiente y 1 de meiosis en división.

**Archivos.** Los 10 módulos, `index.html`, `embrion-fig.js`, `banco.js`,
`ahorcado-datos.js`, `docente-datos.js`, `bio.js`, `bio.css`, `narracion.js`,
`sw.js` (`bionom-v28`) y `?v=` de las páginas; nuevo `AUDITORIA_2026-11.md`.

**Verificación.** Las 13 páginas cargan sin errores ni desbordes a 1366 y
390 px; el banco no da avisos; los chequeos nuevos, las palabras clave, la
narración y el desplazamiento en el celular se probaron funcionando.

**Pendiente** (recomendaciones del informe): grabar la voz del docente para la
narración, narrar paso a paso las animaciones y leer completas las preguntas
abiertas y el Detective del panel docente. Recargar con Ctrl+F5.

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
