# Historial de cambios (sesiones con Claude)

Este archivo registra, sesión por sesión, los cambios hechos al repositorio
con ayuda de Claude Code. Las entradas más recientes van arriba.

Ver `CLAUDE.md` para la regla que mantiene este archivo actualizado.

---

## 2026-11-10 (2) — Juego: 3 intentos con pistas, banco de 40 preguntas por tema, crucigrama, sopa y ahorcado

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
  - Pasó de 203 a **331 preguntas**: entre 41 y 42 por tema. Antes había entre 20 y 30.
  - Las 128 preguntas nuevas son de los mismos cuatro tipos (opción múltiple, verdadero/falso, escribir y ordenar) y hay muchos ejemplos de Colombia.
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
  - Los resultados y el envío al docente cuentan cada palabra del crucigrama o de la sopa como una pregunta. En la hoja, la sección se anota en «grupo» («La célula · Crucigrama»).
- **Versión:** `?v=4` en todas las páginas y `bionom-v12` en `sw.js` (con `retos.js` en la caché).
- **`CLAUDE.md`:** `retos.js` y el nuevo formato del banco, en la tabla de arquitectura.

### Verificación
Con Playwright (390 px y 1280 px):
- Se fallaron preguntas de los cuatro tipos y aparecieron las pistas correctas.
- Crucigrama y sopa se resolvieron completos (10 de 10).
- El ahorcado muestra las pistas al 2.º y 4.º fallo.
- El generador docente cuenta 41-42 preguntas por tema.
- No hay errores en ninguna página.
- Un control automático confirmó que ninguna pista escrita a mano contiene la respuesta.

### Pendiente
- Ningún paso manual para el juego. No se tocó `bionom-analytics.gs`.
- Las palabras del ahorcado, el crucigrama y la sopa (`ahorcado-datos.js`) siguen siendo 10-12 por tema, con pistas cortas. Si el docente quiere crucigramas de un solo tema sin mezclar, convendría ampliarlas.

---

## 2026-11-10 (1) — Creación de BioNom

### Contexto
El docente quiso un sitio nuevo de biología que tomara lo mejor de IonNom y
ChromaNom (explicaciones interactivas, juego con Modo Estudiante, generador
docente, aplicación instalable), organizado con un mapa de los niveles de
organización. Pidió estos temas: la célula (historia, tipos y partes), los
reinos, los sistemas, la genética mendeliana y molecular, la evolución y los
ecosistemas, en general y por regiones de Colombia, con un mapa interactivo.
Durante la sesión pidió además:
- Usar su logo (la guacamaya).
- Que el mapa empezara arriba con el átomo.
- Que el átomo enlazara a IonNom.
- Explicar la diferencia entre Monera y la división en arqueas y eubacterias.
- Dibujar los sistemas del cuerpo de forma más profesional y menos infantil.
- Revisar que el sitio cubriera todos los temas y competencias de biología de
  los aprendizajes priorizados de ciencias de la SED (secundaria y media), sin
  decirlo de forma explícita en el sitio.

### Cambios
- **Estructura común:**
  - `bio.css` y `bio.js` traen los componentes: chequeo rápido, paso a paso,
    tarjetas que se voltean, pestañas, términos con definición y clasificador.
  - Menú con el logo, barra inferior en el celular y progreso guardado en el
    dispositivo.
  - `narracion.js`, `text-zoom.js`, `pwa-install.js`, `ahorcado.js`, `sopa.js` y
    `actividades.css` se copiaron de ChromaNom.
- **Logo e íconos:** recortados de la imagen del docente (`icons/`), con marca
  de agua para las hojas impresas.
- **Mapa de niveles (`index.html`):**
  - 13 niveles de arriba (átomo) hacia abajo (biosfera).
  - Tres ejemplos para recorrerlos: tu cuerpo, un frailejón y un jaguar.
  - El átomo enlaza a Teoría atómica de IonNom y la molécula a Biomoléculas de
    ChromaNom.
- **Módulos:**
  - Célula, Reinos, Sistemas, Genética, Evolución, Ecosistemas, Ecosistemas de
    Colombia y Ambiente (este último es nuevo, por los aprendizajes de
    educación ambiental). Su contenido está detallado en el `README.md`.
  - Laboratorios virtuales con hipótesis, variables, datos y gráficas, para la
    competencia de indagación.
- **Cuerpo humano (`cuerpo.js`):** ilustración anatómica con contornos suaves,
  volumen y nombres con líneas guía. Muestra huesos en un lado y músculos en el
  otro, y el sistema inmune.
- **Mapa de Colombia (`mapa-colombia.js`):** regiones naturales simplificadas a
  partir de los límites departamentales del DANE (MGN 2018). La franja del
  Pacífico en Valle, Cauca y Nariño es aproximada.
- **Juego (`juego.html`, `banco.js`):**
  - 203 preguntas en 8 temas, de 4 tipos.
  - Modo libre y Modo Estudiante, compatible con el backend de IonNom.
- **Backend (`bionom-analytics.gs`):** copia de IonNom Analytics v3.3 con los
  temas de BioNom. `SPREADSHEET_ID` vacío, así que crea su propia hoja.
- **Docente (`docente.html`):**
  - Talleres y evaluaciones en hojas carta, con hasta 10 versiones y semilla
    para repetirlas.
  - Preguntas de análisis e indagación.
  - Hojas de respuestas opcionales, desmarcadas por defecto y marcadas «Solo
    para el docente».
  - Ahorcado y sopa de letras con 93 palabras de biología, y orientaciones.

### Pasos manuales pendientes
1. **GitHub Pages:** Settings → Pages → rama `main`, carpeta `/ (root)`.
2. **Modo Estudiante:**
   - Copiar `bionom-analytics.gs` a un proyecto nuevo de Apps Script.
   - Ajustar `FECHA_INICIO_PERIODO` y `FECHA_FIN_PERIODO`, que aún tienen las
     fechas de IonNom.
   - Ejecutar `instalarActualizacionAutomatica`.
   - Llenar la pestaña «Estudiantes».
   - Implementar como aplicación web.
   - Pegar la URL `/exec` en `APPS_SCRIPT_URL` de `juego.html` (o pedírselo a
     Claude).
   Hasta entonces el juego solo funciona en Modo libre.

### Pendiente o sin resolver
- No se pudo probar el Modo Estudiante con el código `110106` porque el backend
  todavía no está desplegado.
- Las cifras ambientales (emisiones de Colombia, CO₂, glaciares) son
  aproximadas y están presentadas como tales; conviene actualizarlas cada año.
