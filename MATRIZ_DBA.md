# Matriz de cobertura · Derechos Básicos de Aprendizaje de Ciencias Naturales (MEN, V.1, 2016)

Fuente: Ministerio de Educación Nacional. (2016). *Derechos Básicos de Aprendizaje. Ciencias
Naturales* (V.1). Solo se incluyen los DBA de **biología**; los de física y química corresponden
a ChromaNom, IonNom o a física. El panel docente (`dba-bio.js`) usa esta tabla para filtrar
las preguntas por curso. Los DBA dicen qué se enseña en cada curso, pero no a qué curso
pertenece cada pregunta: ese mapeo es criterio de BioNom.

| Curso | DBA | Tema de BioNom | Cobertura | Juego / Saber 11 / abiertas (exacto) |
|---|---|---|---|---|
| 6.° | 4. Funciones básicas de la célula: transporte de membrana, obtención de energía (**respiración celular y rol de la mitocondria**) y división celular (mitosis) | La célula, División celular | ✅ | 84 / 87 / 64 |
| 6.° | 5. Clasificación en grupos taxonómicos y dominios según el tipo de células | Reinos | ✅ | 73 / 50 / 39 |
| 7.° | 3. Cadenas y redes tróficas; nutrición, fotosíntesis y **respiración celular** (comparar reactivos y productos) | Ecosistemas, La célula, Funciones, Nutrición | ✅ | 110 / 106 / 80 |
| 7.° | 4. Ciclos del carbono, el nitrógeno y el agua; intervención humana; uso responsable del agua | Ecosistemas, Ambiente | ✅ (se completaron preguntas en la 2.58) | 25 / 23 / 20 |
| 8.° | 4. Sistemas de órganos (excretor, inmune, nervioso, endocrino, óseo, muscular) y homeostasis; hábitos no saludables | Sistemas, Funciones, Nutrición | ✅ | 128 / 123 / 107 |
| 8.° | 5. Reproducción asexual y sexual; embarazo en la adolescencia; prevención | Reproducción | ✅ | 50 / 50 / 40 |
| 9.° | 4. Genética mendeliana y post-mendeliana; meiosis y leyes de Mendel | Genética, División celular | ✅ | 44 / 49 / 38 |
| 9.° | 5. Expresión del ADN (traducción), fenotipo, mutaciones | Genética | ✅ | 27 / 20 / 21 |
| 9.° | 6. Origen de las especies: selección natural y **ancestro común** (distribución geográfica, fósiles, homologías, comparación de ADN); eras geológicas | Evolución | ✅ desde la versión 2.57: «Las evidencias de la evolución» ya tenía anatomía, fósiles, ADN y embriones; se agregaron las pestañas **Ancestro común** (árbol interactivo) y **Dónde viven** (biogeografía) | 88 / 67 / 46 |
| 10.° | 4. Biotecnología (fertilización asistida, clonación, modificación genética, terapias génicas) e implicaciones bioéticas | Genética (sección 12) | ✅ desde la 2.57: se agregó el Proyecto Genoma Humano, los lentes social, bioético y ambiental y un chequeo de bioética | 27 / 22 / 23 |
| 11.° | 5. Cuestiones ambientales (calentamiento global, contaminación, tala, minería); Colombia megadiversa | Ambiente, Ecosistemas de Colombia | ✅ desde la 2.57: nueva sección «Colombia, país megadiverso» en Regiones (implicaciones social, ambiental y cultural; minería, ganadería, tala, carreteras, agricultura y tráfico) | 96 / 83 / 59 |

**Cómo se cuenta (exacto desde la versión 2.58).** Cada pregunta tiene su DBA: las de la versión 2.57
y 2.58 lo llevan escrito (`dba:'9.6'`); las demás se etiquetan por tema y palabras clave del
enunciado y la respuesta correcta (`BIO_DBA.dba`, en `dba-bio.js`). Cada DBA tiene **20 o más** preguntas
del Juego (opción múltiple y verdadero/falso), tipo Saber 11 y abiertas. El panel docente permite
escoger «Solo un DBA». Las etiquetas por palabras clave son criterio de BioNom y se pueden corregir
en `dba-bio.js` (`DBA_TEMA`) o con `dba` en la pregunta.

**Sin DBA propio:** Funciones vitales comparadas y Nutrición y salud (se ligan a 7.° 3 y 8.° 4).
La respiración celular: el DBA pide *explicar el proceso y el rol de la mitocondria* en 6.° y
*compararla con la fotosíntesis (reactivos y productos)* en 7.°. Las etapas (glucólisis, ciclo de
Krebs, cadena respiratoria, ATP sintasa) no están en ningún DBA: en el panel salen como
profundización de 10.°.

**Datos para revisar.** Cifras de las pestañas nuevas (citocromo c, fechas de ancestros comunes,
primeros lugares de Colombia en aves, orquídeas y mariposas) son aproximadas y vienen de tablas
clásicas, TimeTree y el Instituto Humboldt (2024). Las tablas y gráficas de las preguntas que
dicen «datos de ejemplo» son inventadas para practicar.
