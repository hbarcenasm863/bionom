# Historial de cambios de BioNom

> **Leer este archivo primero en cada sesión** (regla de `CLAUDE.md`).
> Las versiones más recientes van arriba. Cada sesión nueva agrega su entrada
> encima de esta, numerada (Versión 1.1, 1.2… o 2 si el cambio es grande).

---

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
