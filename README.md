# BioNom — Biología por niveles de organización

Sitio web interactivo de biología para bachillerato (6.° a 11.°), hermano de
**ChromaNom** (química orgánica) e **IonNom** (química inorgánica). Todo se
organiza alrededor de un **mapa de los 13 niveles de organización**, del átomo
a la biosfera.

Se publica con GitHub Pages y se puede instalar como aplicación (PWA).

## Módulos

| Archivo | Módulo | Qué tiene |
|---|---|---|
| `index.html` | Mapa de niveles | Mapa interactivo de los 13 niveles con tres ejemplos (tu cuerpo, un frailejón, un jaguar), progreso y reto de ordenar. El átomo enlaza a IonNom y la molécula a ChromaNom. |
| `celula.html` | La célula | Historia y teoría celular, tamaños, tipos, célula interactiva (animal, vegetal, bacteria), transporte de membrana, ósmosis, laboratorio virtual de papas, fotosíntesis y respiración (campana de Priestley), ciclo celular y mitosis, célula y medicina. |
| `reinos.html` | Reinos | Taxonomía, nombre científico, historia de la clasificación, Monera frente a arqueas y eubacterias, cinco reinos, clave dicotómica. |
| `sistemas.html` | Sistemas | Tejidos, cuerpo humano ilustrado por sistemas (incluye el inmune), recorridos animados, defensas y vacunas, homeostasis, reproducción y desarrollo embrionario. |
| `genetica.html` | Genética | Alelos, Mendel, Punnett para llenar, dihíbrido, meiosis, dominancia incompleta, grupos ABO, daltonismo, herencia poligénica, genealogías, ADN, tipos de ARN, del gen a la proteína paso a paso (replicación, transcripción y traducción), del gen a la proteína, mutaciones, biotecnología y ética. |
| `evolucion.html` | Evolución | Hitos de la biología, Lamarck y Darwin, selección natural con polillas, pinzones, deriva genética, selección artificial, evidencias, evolución humana, endémicas e invasoras, eras geológicas. |
| `ecosistemas.html` | Ecosistemas | Bióticos y abióticos, cadenas y red trófica, pirámide de energía, ciclos del agua, del carbono y del nitrógeno, relaciones, nicho y adaptaciones, poblaciones. |
| `regiones.html` | Ecosistemas de Colombia | Mapa interactivo de las regiones naturales con 22 lugares, tipos de ecosistema, pisos térmicos, especies amenazadas y reto. |
| `ambiente.html` | Ambiente y cambio climático | Efecto invernadero, datos de CO₂, causas en Colombia, consecuencias por región, El Niño y La Niña, océanos, energías, huella de carbono, mitigación y adaptación. |
| `juego.html` | Juego | 536 preguntas de 4 tipos en 10 temas (al menos 40 por tema) con 3 intentos y pistas, crucigrama, sopa de letras y ahorcado. Modo libre (el Modo Estudiante está desactivado hasta 2027). |
| `docente.html` | Docente | Guías de 4 sesiones, talleres, evaluaciones tipo Saber 11, laberintos, crucigramas, ahorcado, sopa de letras, criptograma genético, mapa conceptual y detective biológico, con versiones y clave. |

## Modo Estudiante

Funciona igual que en IonNom: `bionom-analytics.gs` es el backend en Google
Apps Script. Por ahora está **desactivado** (se configurará en 2027): el juego
funciona solo en modo libre. Para activarlo:

1. Abrir [script.google.com](https://script.google.com) con la cuenta de Google del docente y crear un proyecto nuevo.
2. Copiar todo `bionom-analytics.gs` y pegarlo en el editor (reemplazando lo que haya).
3. Ajustar al inicio del archivo las fechas del periodo (`FECHA_INICIO_PERIODO` y `FECHA_FIN_PERIODO`).
4. Ejecutar una vez `instalarActualizacionAutomatica` (▶ Ejecutar) y aceptar los permisos. Se crea sola la hoja «BioNom — Registro de resultados» en Drive.
5. En la pestaña **Estudiantes** de esa hoja, una fila por estudiante: Código (6 dígitos: grado, curso y número, por ejemplo 080312), Nombre y Curso.
6. En el editor: **Implementar → Nueva implementación → Aplicación web**, «Ejecutar como: yo» y «Quién tiene acceso: cualquier persona». Copiar la URL que termina en `/exec`.
7. En `juego.html`: pegar esa URL en `var APPS_SCRIPT_URL=''` y cambiar `MODO_ESTUDIANTE_ACTIVO` a `true`.
8. Cada vez que se modifique el `.gs`: **Implementar → Administrar implementaciones → Editar → Nueva versión**.

Las estadísticas se recalculan solas cada 30 minutos (o con `recalcularAhora`).

---

Desarrollado por **Harvey Bárcenas Morales** · Licencia CC BY-NC 4.0
