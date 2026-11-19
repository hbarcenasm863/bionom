# Formato común de las preguntas y palabras

`datos/<sitio>.json` tiene: `temas` [{id, nombre}], `preguntas` (las del juego),
`saber`, `abiertas`, `palabras`, `grupos` (de palabras), y además `dba` (BioNom),
`figuras` (ChromaNom: SVG de cada estructura) y `compuestos` (IonNom).
Este mismo formato sirve para los archivos de `--desde`, `validar` y `exportar`.

## Pregunta del juego

```json
{"tema":"celula","tipo":"mc","q":"¿Qué organelo…?","ops":["Mitocondria","Ribosoma","Lisosoma","Vacuola"],"a":0,
 "pistas":["Pista general: qué revisar.","Pista concreta, sin decir la respuesta."],
 "exp":"Explicación completa de por qué es así.","curso":6,"dba":"6.4"}
```

| tipo | campos |
|---|---|
| `mc` opción múltiple | `ops` (3 a 5), `a` = índice de la correcta (0, 1, 2…). La hoja baraja las opciones. |
| `vf` verdadero/falso | `a`: `true` o `false` |
| `esc` escribir | `a`: lista de respuestas aceptadas `["cloroplasto","cloroplastos"]` |
| `ord` ordenar | `ops`: los elementos **en el orden correcto** (la hoja los desordena) |
| `rel` relacionar | `pares`: `[["Thomson","Rayos catódicos"],…]` |
| `comp` completar | `q` con `____` por cada espacio, `a`: lista en orden, `distractores`: palabras de más |
| `num` cálculo | `a`: número, `tol`: margen, `unidad` |

Campos opcionales: `ctx` (situación antes del enunciado), `tabla`
(`[["encabezado",…],["fila",…]]`), `graf` (`{tipo:'lin'|'bar', x:[…], y:[…] o series:[{n,y}], ex, ey, ymin}`),
`svg` (dibujo que va encima), `estructura` (ChromaNom: clave del dibujo en `figuras`),
`porque` (ChromaNom: por qué cada opción está mal), `subtema` (IonNom),
`nivel` (BioNom: basico, medio, completo), `curso` y `dba` (BioNom).

## Pregunta tipo Saber 11

```json
{"tema":"genetica","tipo":"saber","ctx":"Situación con datos, experimento o contexto colombiano…",
 "q":"¿Qué conclusión se apoya en estos datos?","ops":["CORRECTA","distractor","distractor","distractor"],
 "comp":"ind","af":"N2","exp":"Por qué la correcta es la correcta y en qué falla cada distractor."}
```

En las Saber **la correcta va siempre de primera** en `ops` (la hoja las baraja).
`comp`: `uso` (uso comprensivo), `exp` (explicación de fenómenos), `ind` (indagación).
`af` (afirmación del Icfes) según la competencia:

- uso → **I1** características de fenómenos con base en información y conceptos · **I2** asociar fenómenos con conceptos · **I3** procesos de los organismos.
- exp → **E1** explicar cómo ocurren fenómenos · **E2** modelar fenómenos (variables, evidencia) · **E3** uso de recursos o artefactos y sus efectos en el entorno y la salud.
- ind → **N1** la investigación construye explicaciones · **N2** derivar conclusiones de la evidencia · **N3** evaluar predicciones · **N4** patrones en los datos.

ChromaNom e IonNom usan además `k`, el componente: `Q` químico, `B` biológico,
`F` físico, `CTS` ciencia, tecnología y sociedad.

## Pregunta abierta

```json
{"tema":"celula","tipo":"abierta","q":"Diseña un experimento para…"}
```

## Palabra (ahorcado, sopa, crucigrama, criptograma)

```json
{"palabra":"GEMACIÓN","grupo":"reproduccion","pistas":["Pista 1 corta.","Pista 2.","Pista 3, la más concreta."]}
```

También se acepta el formato de los sitios: `["GEMACIÓN","reproduccion","p1","p2","p3"]`.
`grupo` es el id de tema (BioNom) o el grupo de palabras (ChromaNom: carbono, nombres,
fase3, fase4a, bio, amb; IonNom: el tema, por ejemplo `atomo`, `ox-bas`, `gases`).

## Compuesto (IonNom)

```json
{"formula":"Fe₂O₃","grupo":"ox-bas","nivel":"easy","tradicional":["óxido férrico"],"stock":["óxido de hierro (III)"],"sistematica":["trióxido de dihierro"],"pista":"…"}
```

Los de `grupo` `reaccion` traen `ecuacion` y `tipoReaccion`; los de `mol-masa`, `masaMolar` y `calculo`.

## DBA de biología (BioNom, campo `dba`)

- **6.4** Funciones básicas de la célula (transporte de membrana, energía, división) a partir de su estructura.
- **6.5** Clasificación de los organismos en grupos taxonómicos según sus células; diversidad.
- **7.3** Flujos de materia y energía en cadenas y redes tróficas; nutrición, fotosíntesis y respiración.
- **7.4** Ciclos del carbono, nitrógeno y agua en los ecosistemas.
- **8.4** Sistemas de órganos (excretor, inmune, nervioso, endocrino, óseo, muscular) y regulación.
- **8.5** Reproducción asexual y sexual en distintos grupos de seres vivos.
- **9.4** Herencia mendeliana y posmendeliana; mejoramiento de especies.
- **9.5** Expresión de la información genética del ADN, fenotipo y mutaciones.
- **9.6** Teorías sobre el origen de las especies (selección natural, ancestro común) y sus evidencias.
- **10.4** Biotecnología (fertilización asistida, clonación, transgénicos…).
- **11.5** Cuestiones ambientales actuales desde una visión sistémica.

Lo que ningún DBA nombra (por ejemplo las etapas de la respiración celular) lleva
`dba: "sin"` y va como profundización de 10.° (`curso: 10`).
