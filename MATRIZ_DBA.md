# Matriz de cobertura · Derechos Básicos de Aprendizaje de Ciencias Naturales (MEN, V.1, 2016)

Fuente: Ministerio de Educación Nacional. (2016). *Derechos Básicos de Aprendizaje. Ciencias
Naturales* (V.1). Solo se incluyen los DBA de **biología**; los de física y química corresponden
a ChromaNom, IonNom o a física. El panel docente (`dba-bio.js`) usa esta tabla para filtrar
las preguntas por curso. Los DBA dicen qué se enseña en cada curso, pero no a qué curso
pertenece cada pregunta: ese mapeo es criterio de BioNom.

| Curso | DBA | Tema de BioNom | Cobertura | Preguntas Juego / Saber 11 |
|---|---|---|---|---|
| 6.° | 4. Funciones básicas de la célula: transporte de membrana, obtención de energía (**respiración celular y rol de la mitocondria**) y división celular (mitosis) | La célula, División celular | ✅ | 59 / 83 (por palabras clave) |
| 6.° | 5. Clasificación en grupos taxonómicos y dominios según el tipo de células | Reinos | ✅ | 48 / 34 |
| 7.° | 3. Cadenas y redes tróficas; nutrición, fotosíntesis y **respiración celular** (comparar reactivos y productos) | Ecosistemas, La célula, Funciones, Nutrición | ✅ | 28 / 23 (+4 Saber nuevas) |
| 7.° | 4. Ciclos del carbono, el nitrógeno y el agua; intervención humana; uso responsable del agua | Ecosistemas, Ambiente | ✅ (+5 abiertas) | 24 / 30 |
| 8.° | 4. Sistemas de órganos (excretor, inmune, nervioso, endocrino, óseo, muscular) y homeostasis; hábitos no saludables | Sistemas, Funciones, Nutrición | ✅ | 25 / 28 |
| 8.° | 5. Reproducción asexual y sexual; embarazo en la adolescencia; prevención | Reproducción | ✅ | 29 / 22 |
| 9.° | 4. Genética mendeliana y post-mendeliana; meiosis y leyes de Mendel | Genética, División celular | ✅ | 27 / 36 |
| 9.° | 5. Expresión del ADN (traducción), fenotipo, mutaciones | Genética | ✅ | 27 / 30 (+6 Saber nuevas) |
| 9.° | 6. Origen de las especies: selección natural y **ancestro común** (distribución geográfica, fósiles, homologías, comparación de ADN); eras geológicas | Evolución | ✅ desde la versión 2.57: «Las evidencias de la evolución» ya tenía anatomía, fósiles, ADN y embriones; se agregaron las pestañas **Ancestro común** (árbol interactivo) y **Dónde viven** (biogeografía) | **24 / 20 etiquetadas** |
| 10.° | 4. Biotecnología (fertilización asistida, clonación, modificación genética, terapias génicas) e implicaciones bioéticas | Genética (sección 12) | ✅ desde la 2.57: se agregó el Proyecto Genoma Humano, los lentes social, bioético y ambiental y un chequeo de bioética | **24 / 20 etiquetadas** |
| 11.° | 5. Cuestiones ambientales (calentamiento global, contaminación, tala, minería); Colombia megadiversa | Ambiente, Ecosistemas de Colombia | ✅ desde la 2.57: nueva sección «Colombia, país megadiverso» en Regiones (implicaciones social, ambiental y cultural; minería, ganadería, tala, carreteras, agricultura y tráfico) | **24 / 20 etiquetadas** |

**Cómo se cuenta.** Las preguntas nuevas de la versión 2.57 llevan `dba:'9.6'` (o 10.4, 11.5, 7.3,
9.5) y `curso`: eso da un conteo exacto. Para los demás DBA el conteo es por palabras clave del
enunciado y la respuesta correcta (ver `dbacount` en la sesión 2.57), así que es aproximado.

**Sin DBA propio:** Funciones vitales comparadas y Nutrición y salud (se ligan a 7.° 3 y 8.° 4).
La respiración celular: el DBA pide *explicar el proceso y el rol de la mitocondria* en 6.° y
*compararla con la fotosíntesis (reactivos y productos)* en 7.°. Las etapas (glucólisis, ciclo de
Krebs, cadena respiratoria, ATP sintasa) no están en ningún DBA: en el panel salen como
profundización de 10.°.

**Datos para revisar.** Cifras de las pestañas nuevas (citocromo c, fechas de ancestros comunes,
primeros lugares de Colombia en aves, orquídeas y mariposas) son aproximadas y vienen de tablas
clásicas, TimeTree y el Instituto Humboldt (2024). Las tablas y gráficas de las preguntas que
dicen «datos de ejemplo» son inventadas para practicar.
