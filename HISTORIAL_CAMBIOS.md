# Historial de cambios de BioNom

> **Leer este archivo primero en cada sesión** (regla de `CLAUDE.md`).
> Las versiones más recientes van arriba. Cada sesión nueva agrega su entrada
> encima de esta, numerada (Versión 1.1, 1.2… o 2 si el cambio es grande).

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
