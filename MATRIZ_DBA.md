# Matriz de cobertura · Derechos Básicos de Aprendizaje de Ciencias Naturales (MEN, V.1, 2016)

Fuente: Ministerio de Educación Nacional. (2016). *Derechos Básicos de Aprendizaje. Ciencias
Naturales* (V.1). Solo se incluyen los DBA de **biología**; los de física y química corresponden
a ChromaNom, IonNom o a física. El panel docente (`dba-bio.js`) usa esta tabla para filtrar
las preguntas por curso. Los DBA dicen qué se enseña en cada curso, pero no a qué curso
pertenece cada pregunta: ese mapeo es criterio de BioNom.

| Curso | DBA | Tema de BioNom | Cobertura | Juego / Saber 11 / abiertas (exacto) |
|---|---|---|---|---|
| 6.° | 4. Funciones básicas de la célula: transporte de membrana, obtención de energía (**respiración celular y rol de la mitocondria**) y división celular (mitosis) | La célula, División celular | ✅ | 84 / 87 / 61 |
| 6.° | 5. Clasificación en grupos taxonómicos y dominios según el tipo de células | Reinos | ✅ | 69 / 46 / 35 |
| 7.° | 3. Cadenas y redes tróficas; nutrición, fotosíntesis y **respiración celular** (comparar reactivos y productos) | Ecosistemas, La célula, Funciones, Nutrición | ✅ | 27 / 33 / 20 |
| 7.° | 4. Ciclos del carbono, el nitrógeno y el agua; intervención humana; uso responsable del agua | Ecosistemas, Ambiente | ✅ (se completaron preguntas en la 2.58) | 24 / 21 / 22 |
| 8.° | 4. Sistemas de órganos (excretor, inmune, nervioso, endocrino, óseo, muscular) y homeostasis; hábitos no saludables | Sistemas, Funciones, Nutrición | ✅ | 82 / 84 / 71 |
| 8.° | 5. Reproducción asexual y sexual; embarazo en la adolescencia; prevención | Reproducción | ✅ | 56 / 48 / 41 |
| 9.° | 4. Genética mendeliana y post-mendeliana; meiosis y leyes de Mendel | Genética, División celular | ✅ | 40 / 45 / 39 |
| 9.° | 5. Expresión del ADN (traducción), fenotipo, mutaciones | Genética | ✅ | 30 / 21 / 20 |
| 9.° | 6. Origen de las especies: selección natural y **ancestro común** (distribución geográfica, fósiles, homologías, comparación de ADN); eras geológicas | Evolución | ✅ desde la versión 2.57: «Las evidencias de la evolución» ya tenía anatomía, fósiles, ADN y embriones; se agregaron las pestañas **Ancestro común** (árbol interactivo) y **Dónde viven** (biogeografía) | 83 / 65 / 44 |
| 10.° | 4. Biotecnología (fertilización asistida, clonación, modificación genética, terapias génicas) e implicaciones bioéticas | Genética (sección 12) | ✅ desde la 2.57: se agregó el Proyecto Genoma Humano, los lentes social, bioético y ambiental y un chequeo de bioética | 27 / 27 / 25 |
| 11.° | 5. Cuestiones ambientales (calentamiento global, contaminación, tala, minería); Colombia megadiversa | Ambiente, Ecosistemas de Colombia | ✅ desde la 2.57: nueva sección «Colombia, país megadiverso» en Regiones (implicaciones social, ambiental y cultural; minería, ganadería, tala, carreteras, agricultura y tráfico) | 100 / 86 / 64 |

**Cómo se cuenta (exacto desde la versión 2.58; con «sin DBA» desde la 2.61).** Cada pregunta tiene un DBA o la
etiqueta **«sin DBA»** (contenido que ningún DBA de biología nombra: relaciones entre especies, nicho y poblaciones,
ubicación de regiones y ecosistemas de Colombia, origen del universo y de la vida, demografía, comparación de funciones
vitales entre animales, biomoléculas y dieta; se apoyan en los Estándares Básicos de Competencias). Las de las versiones
2.57 y 2.58 llevan el `dba` escrito; las demás se etiquetan por tema y palabras clave (`DBA_TEMA` en `dba-bio.js`) y los
ajustes pregunta por pregunta de la auditoría están en `dba-ajustes.js`. **El curso nunca es menor que el grado de su DBA**
(0 contradicciones de 1 432). Cada DBA tiene **20 o más** preguntas del Juego, Saber 11 y abiertas. Sin DBA propio hay
130 del Juego, 122 Saber y 95 abiertas. El panel docente permite escoger «Solo un DBA» o «Sin DBA propio».

**Sin DBA propio:** Funciones vitales comparadas y Nutrición y salud (se ligan a 7.° 3 y 8.° 4).
La respiración celular: el DBA pide *explicar el proceso y el rol de la mitocondria* en 6.° y
*compararla con la fotosíntesis (reactivos y productos)* en 7.°. Las etapas (glucólisis, ciclo de
Krebs, cadena respiratoria, ATP sintasa) no están en ningún DBA: en el panel salen como
profundización de 10.°.

**Datos para revisar.** Cifras de las pestañas nuevas (citocromo c, fechas de ancestros comunes,
primeros lugares de Colombia en aves, orquídeas y mariposas) son aproximadas y vienen de tablas
clásicas, TimeTree y el Instituto Humboldt (2024). Las tablas y gráficas de las preguntas que
dicen «datos de ejemplo» son inventadas para practicar.
