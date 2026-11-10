# Historial de cambios (sesiones con Claude)

Este archivo registra, sesión por sesión, los cambios hechos al repositorio
con ayuda de Claude Code. Las entradas más recientes van arriba.

Ver `CLAUDE.md` para la regla que mantiene este archivo actualizado.

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
