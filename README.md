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
| `genetica.html` | Genética | Alelos, Mendel, Punnett para llenar, dihíbrido, meiosis, dominancia incompleta, grupos ABO, daltonismo, herencia poligénica, genealogías, ADN, ARN y replicación, del gen a la proteína, mutaciones, biotecnología y ética. |
| `evolucion.html` | Evolución | Hitos de la biología, Lamarck y Darwin, selección natural con polillas, pinzones, deriva genética, selección artificial, evidencias, evolución humana, endémicas e invasoras, eras geológicas. |
| `ecosistemas.html` | Ecosistemas | Bióticos y abióticos, cadenas y red trófica, pirámide de energía, ciclos del agua, del carbono y del nitrógeno, relaciones, nicho y adaptaciones, poblaciones. |
| `regiones.html` | Ecosistemas de Colombia | Mapa interactivo de las regiones naturales con 22 lugares, tipos de ecosistema, pisos térmicos, especies amenazadas y reto. |
| `ambiente.html` | Ambiente y cambio climático | Efecto invernadero, datos de CO₂, causas en Colombia, consecuencias por región, El Niño y La Niña, océanos, energías, huella de carbono, mitigación y adaptación. |
| `juego.html` | Juego | 203 preguntas de 4 tipos, Modo libre y Modo Estudiante. |
| `docente.html` | Docente | Talleres y evaluaciones con versiones, ahorcado, sopa de letras y orientaciones. |

## Modo Estudiante

Funciona igual que en IonNom: `bionom-analytics.gs` es el backend en Google
Apps Script. Los pasos para activarlo están en `docente.html` (pestaña
Orientaciones). Mientras `APPS_SCRIPT_URL` esté vacía en `juego.html`, el
juego solo funciona en Modo libre.

---

Desarrollado por **Harvey Bárcenas Morales** · Licencia CC BY-NC 4.0
