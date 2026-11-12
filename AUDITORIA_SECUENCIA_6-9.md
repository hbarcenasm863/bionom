# Orden y profundidad de BioNom para sexto a noveno · 12 de noviembre de 2026

Evaluación de la **secuencia** y la **profundidad** de los contenidos de BioNom
para los grupos de grados 6.°–7.° y 8.°–9.° (estudiantes de 11 a 15 años),
frente a los *Estándares Básicos de Competencias en Ciencias Naturales* (MEN,
2004) y a la forma habitual de organizar el plan de estudios de biología en
Colombia. Se revisó la versión del sitio que incluye los cambios 2.22 a 2.25.
Este informe **no cambia ningún archivo**: cada cambio de contenido trae el
texto actual exacto y el reemplazo exacto, entre los signos ⟪ ⟫.

## 1. Resumen ejecutivo

- **El sitio está ordenado por niveles de organización** (célula → organismo →
  población → ecosistema), no por grados. Esa lógica es buena para el mapa de
  la portada, pero la cadena «Anterior / Siguiente» lleva a un estudiante de
  sexto por genética y evolución (8.°–9.°) **antes** de llegar a ecosistemas,
  ciclos y suelo, que el MEN pone en 6.°–7.°.
- **Hay un error de navegación:** desde *Ecosistemas de Colombia* el botón
  «Siguiente» salta al Juego y nunca lleva a *Ambiente y cambio climático*,
  aunque el menú sí lo pone después.
- **Ningún módulo es de un solo grado.** Casi todos mezclan contenido de
  6.°–7.°, 8.°–9.° y 10.°–11.°, sin ninguna marca. Por ejemplo, *La célula*
  (6.°) incluye el ciclo de Krebs y el NADPH; *Sistemas del cuerpo* (7.°)
  incluye el potencial de acción en milivoltios (10.°–11.°); *Reinos* (6.°)
  explica enlaces éter y éster y la PCR. El juego, el banco de preguntas y las
  preguntas tipo Saber 11 tampoco tienen grado, y el docente no puede filtrar
  por nivel.
- **Se usan conceptos antes de explicarlos:** la meiosis de *División celular*
  «sigue los alelos» de una célula AaBb y habla de las leyes de Mendel antes de
  *Genética*; *La célula* usa ATP, glucosa y proteínas antes de *Nutrición*
  (biomoléculas); y el banco del juego pregunta por el microscopio (ocular,
  objetivo, tornillo micrométrico), la sucesión ecológica, el estuario, la
  coevolución y la radiación adaptativa, que **no se enseñan en ninguna
  página**.
- **Profundidad:** para 6.°–7.° es adecuada o excesiva; nada esencial falta,
  salvo el **microscopio** (no hay sección sobre sus partes ni su uso). Para
  8.°–9.° es adecuada en casi todo. Están flojos «Formulo hipótesis acerca del
  origen y evolución de un grupo de organismos», «Describo procesos físicos y
  químicos de la contaminación atmosférica» (no hay lluvia ácida ni smog) y la
  lectura de etiquetas de alimentos (los sellos de advertencia de la Ley 2120 de
  2021).
- **Mayer:** las cinco secciones más largas (más de 550 palabras con sus
  pasos) concentran el contenido de 10.°–11.°. Conviene partirlas en una parte
  «base» y otra de «profundización».
- **Recomendación central:** sin rehacer el sitio, (1) reordenar la cadena de
  módulos (abajo) y corregir el «Siguiente» de *Ecosistemas de Colombia*;
  (2) marcar en cada página las secciones de **profundización 10.°–11.°** con
  un distintivo visible; (3) en una segunda etapa, agregar un selector de grado
  que filtre secciones y preguntas, igual al selector de reinos que ya existe.
- **Acciones:** 6 de prioridad alta, 10 de prioridad media y 7 de prioridad
  baja (sección 8).

## 2. Cómo se evaluó

- Orden del menú y de los botones «Anterior / Siguiente»: lista `MODULOS` de
  `bio.js` y el bloque `<div class="sig">` de cada página.
- Orden y extensión de las secciones de cada módulo: títulos, número de
  palabras (incluidos los pasos y tarjetas escritos en la página) y número de
  chequeos.
- Mapa de 33 términos técnicos por módulo, para ver en qué página aparece por
  primera vez cada uno.
- Cruce del banco del juego (697 preguntas) y de las 500 tipo Saber 11 con lo
  que de verdad explican las páginas.
- Estándares de 6.°–7.° y 8.°–9.° del MEN (2004) y la secuencia que siguen la
  mayoría de los planes de área y los textos escolares del país:
  - 6.°: célula, clasificación y ecosistemas;
  - 7.°: nutrición y sistemas, ciclos y relaciones ecológicas;
  - 8.°: reproducción y sistemas de control;
  - 9.°: genética, evolución y biotecnología.
  Esta secuencia es una costumbre, no una norma: el MEN solo fija lo que se
  logra al final de cada grupo de dos grados.

## 3. Orden actual frente al orden recomendado

### 3.1 Cadena de módulos

| Posición | Orden actual (menú y «Siguiente») | Grado que más le corresponde | Orden recomendado | Por qué |
|---|---|---|---|---|
| 1 | La célula | 6.° | La célula | Base de todo. |
| 2 | División celular | 7.° (mitosis) y 8.° (meiosis) | División celular | El MEN pide comparar la mitosis y la meiosis en 6.°–7.°. Se deja aquí, pero la parte de alelos y Mendel se marca para 8.°–9.° (acción A4). |
| 3 | Reinos y clasificación | 6.° (reinos); 8.°–9.° (grupos, variedades, difícil ubicación) | Reinos y clasificación | Clasificar por las características de las células es de 6.°–7.°. |
| 4 | Sistemas del cuerpo (con Funciones y Nutrición) | 7.° | **Ecosistemas** | Ecosistemas, ciclos y suelo son de 6.°–7.°; hoy aparecen en el puesto 10. |
| 5 | Funciones vitales comparadas | 8.° | **Ecosistemas de Colombia** | Placas, clima y adaptaciones en Colombia son de 6.°–7.°. |
| 6 | Nutrición y salud | 7.° | **Ambiente y cambio climático** | Los recursos, las energías y la contaminación son de 6.°–7.°; el cambio climático se profundiza en 8.°–9.°. |
| 7 | Reproducción | 8.° | Sistemas del cuerpo | 7.° |
| 8 | Genética | 9.° | Funciones vitales comparadas | 8.° (comparar sistemas de órganos entre grupos; hormonas). |
| 9 | Evolución | 9.° (el origen del universo y las extinciones, 6.°–7.°) | Nutrición y salud | 7.° (biomoléculas, agua, dieta, enfermedades). |
| 10 | Ecosistemas | 6.°–7.° | Reproducción | 8.° |
| 11 | Ecosistemas de Colombia | 6.°–7.° | Genética | 9.° |
| 12 | Ambiente y cambio climático | 6.°–7.° y 8.°–9.° | Evolución | 9.° |

**Prerrequisitos que se cumplen con este orden:**
- célula antes de división;
- división antes de reproducción y genética;
- reproducción antes de genética;
- genética antes de evolución (la evolución usa alelos y mutaciones);
- ecosistemas antes de Colombia y de ambiente;
- sistemas antes de funciones comparadas.

**El único que no se cumple:** *Ecosistemas de Colombia* menciona la
especiación y las especies endémicas antes de *Evolución*. Lo explica en la
misma página con palabras sencillas, así que no estorba.

**Nutrición y biomoléculas.** Lo ideal sería ver «Las moléculas de la vida» y
«El agua» antes de *La célula*. Mover el módulo completo no conviene, porque el
resto de *Nutrición* es de salud (7.°). Basta un enlace «Antes: Las moléculas
de la vida» en el encabezado de *La célula* y dos palabras clave nuevas
(acción M2).

### 3.2 Orden de las secciones dentro de cada módulo

| Módulo | Problema de orden | Recomendación |
|---|---|---|
| La célula | La sección 09 (fotosíntesis y respiración) mezcla la ecuación, adecuada para 6.°, con las etapas (tilacoides, estroma, NADPH, glucólisis, Krebs, cadena respiratoria), que son de 10.°–11.°. | Dejar la ecuación y la campana de Priestley como base; marcar «Las etapas, paso a paso» como profundización (A3). |
| División celular | La meiosis (05) usa alelos y las leyes de Mendel, que aún no se han explicado. | Quitar las letras del texto inicial o explicarlas (A4). |
| Reinos | La sección 04 (Monera: ¿uno o dos?, la más larga del módulo, con química de membranas) va antes de «Los cinco reinos» (05), que es lo básico de 6.°. | Para 6.°: 01 → 02 → 03 → 05 → 09 → 10. Para 8.°–9.°: 04 → 06 → 08. Para 10.°–11.°: el laboratorio de la levadura (07). Si se reordena la página, poner 05 antes que 04. |
| Sistemas | «La neurona y el impulso nervioso» (08, de 10.°–11.°) queda en medio de un módulo de 7.°. | Marcarla como profundización (A3). |
| Funciones | «La mecánica de fluidos» (07) es de 10.°–11.°. | Marcarla como profundización. |
| Nutrición | «Los antibióticos» (08) es un estándar de 10.°–11.°, pero su idea central (no sirven contra virus) sí es para todos. | Dejarla; marcar como profundización solo el paso de los ribosomas. |
| Reproducción | «El desarrollo embrionario» (03, 560 palabras: gástrula y capas germinativas) va antes de la flor y del sistema reproductor humano, y antes de «Fecundación, embarazo y parto» (07). | Orden sugerido: 01 → 02 → 04 (flor) → 05 → 06 → 07 → 03 (embriones y estrategias) → 08 → 10 → 09. |
| Genética | Bien ordenado (Mendel → ADN → proteína → mutaciones → biotecnología). La replicación con cebador, primasa y fragmentos de Okazaki (09) es de 10.°–11.°. | Marcar la replicación como profundización. |
| Evolución | «El origen del universo y de la vida» (09) y «Las grandes extinciones» (10) son de 6.°–7.°, pero están después de «Tipos de selección natural» (05) y «Variación y deriva» (06), que son de 10.°–11.°. | Orden sugerido: 01 → 09 → 13 (eras) → 10 → 02 → 03 → 04 → 07 → 08 → 11 → 12 → 05 y 06 (profundización). |
| Ecosistemas | Bien ordenado de lo concreto a lo abstracto. La termodinámica (dentro de 04) es de 10.°–11.°. | Marcar solo ese recuadro y su chequeo. |
| Colombia y Ambiente | Bien ordenados. | — |

## 4. Propuesta por grado

Las secciones se citan por su número en la página.

### Sexto

| Módulo | Secciones | Nota |
|---|---|---|
| Mapa de niveles (portada) | Todo, con el reto de ordenar | Puerta de entrada al curso. |
| Nutrición y salud | 01 Las moléculas de la vida (sin el laboratorio de reactivos), 02 El agua | Antes de la célula. |
| La célula | 01, 02, 03, 04, 05, 06 (sin la bomba de sodio y potasio), 07, 08, 09 hasta la campana de Priestley, 11 | Agregar «El microscopio» (A5). |
| Reinos | 01, 02, 03, 05, 09, 10 (con 5 reinos), 07 «En la cocina colombiana» | 6 o 7 reinos, según escoja el docente. |
| Ecosistemas | 01, 02, 03, 04 (sin la termodinámica), 05 (ciclo del agua y del carbono), 06 | |
| Ecosistemas de Colombia | 01, 02, 03, 04 | |
| Evolución | 09 Del Big Bang al origen de la vida | Estándar de 6.°–7.°. |

### Séptimo

| Módulo | Secciones | Nota |
|---|---|---|
| Sistemas del cuerpo | 01–07, 09, 10 | La neurona (08) queda para 10.°–11.° o, en versión breve, para 9.°. |
| Nutrición y salud | 03–07, 09; de 08 solo la idea central | |
| División celular | 01, 02, 03, 04, 06, 07 y la meiosis sin alelos | El MEN pide comparar la mitosis y la meiosis. |
| Ecosistemas | 05 (nitrógeno), 07, 08, 09 | |
| Evolución | 10 Extinciones, 13 Eras geológicas (el año de la Tierra) | Formular hipótesis de extinción (6.°–7.°). |
| Ambiente | 01, 02, 04, 06, 07, 08 | Recursos, energías, huella. |
| Reproducción | 05 sistema reproductor y pubertad, 06 ciclo menstrual | Las implicaciones de la sexualidad son de 6.°–7.° en la parte de Ciencia, tecnología y sociedad. |

### Octavo

| Módulo | Secciones | Nota |
|---|---|---|
| Reproducción | Todo el módulo | Ciclo menstrual, anticoncepción, ITS y natalidad. |
| División celular | 05 La meiosis completa | Con alelos, como puente a genética. |
| Funciones vitales comparadas | 01–06 | |
| Sistemas del cuerpo | 05, 06, 07 (hormonas, defensa, homeostasis), repaso | |
| Reinos | 04, 06, 08 | Difícil ubicación, especie y grupos dentro de cada reino. |
| Evolución | 13 Clima en las eras | Estándar de 8.°–9.°. |
| Ambiente | 01, 03, 05 + contaminación atmosférica (acción M7) | |

### Noveno

| Módulo | Secciones | Nota |
|---|---|---|
| Genética | 01–08, 09 (solo las tarjetas y el trabajo del ARN mensajero), 10, 11, 12 | |
| Evolución | 01, 02, 03, 04, 07, 08, 11, 12 | Teorías del origen de las especies. |
| Reinos | 07 (microbios útiles, sin la PCR) | Microbiología en la industria. |
| Ecosistemas de Colombia | 05 Especies amenazadas | Biodiversidad y desarrollo del país. |

### Profundización 10.°–11.° (marcar en el sitio)

| Módulo | Sección |
|---|---|
| La célula | 09 «Las etapas, paso a paso» (fases luminosa y oscura, glucólisis, Krebs, cadena respiratoria) |
| Reinos | 04, tabla «¿En qué se diferencian?» (filas de membranas e histonas); 07 laboratorio de la levadura y la PCR |
| Sistemas del cuerpo | 08 La neurona y el impulso nervioso |
| Funciones vitales comparadas | 07 La mecánica de fluidos (Poiseuille) |
| Nutrición y salud | 08, paso «Frenan sus ribosomas» |
| Genética | 09 replicación (helicasa, cebador, primasa, Okazaki) |
| Evolución | 05 Tipos de selección natural; 06 Variación y deriva |
| Ecosistemas | 04 recuadro y chequeo de la termodinámica |

## 5. Profundidad por estándar

**Adecuada**: el nivel coincide con la edad. **Insuficiente**: falta para
cumplir el estándar. **Excesiva**: el sitio va mucho más allá de la edad, con un
vocabulario que estorba al estudiante de ese grado.

### 5.1 Sexto a séptimo (11 a 13 años)

| Estándar (MEN) | Valoración | Evidencia | Recomendación |
|---|---|---|---|
| Explico la estructura de la célula y las funciones de sus componentes. | Adecuada, con partes excesivas | La célula que se toca, las analogías con una ciudad y las fotos son muy buenas. La tabla de tipos usa «70S» y «80S». | Quitar «70S» y «80S» (acción B1). |
| Verifico y explico la ósmosis y la difusión. | Adecuada | Simulación de partículas, glóbulo rojo y célula vegetal, laboratorio de la papa. | — |
| Clasifico membranas según su permeabilidad. | Adecuada | Clasificador de tres cajas. | — |
| Clasifico organismos en grupos taxonómicos según sus células. | Adecuada, con partes excesivas | Clave dicotómica y reto muy buenos. La sección 04 explica enlaces éter y éster, histonas y «maquinaria para leer los genes». | Simplificar dos filas de la tabla (A6). |
| Comparo sistemas de división celular. | Excesiva en la meiosis | Mitosis bien graduada. La meiosis usa alelos y las leyes de Mendel. | A4. |
| Explico las funciones de los seres vivos a partir de las relaciones entre sistemas. | Adecuada | «Los sistemas trabajan en equipo», recorridos, homeostasis. | — |
| Comparo mecanismos de obtención de energía. | Excesiva | Tabla comparativa adecuada; las etapas con NADPH, Krebs y cadena respiratoria son de 10.°–11.°. | A3. |
| Reconozco las mismas moléculas orgánicas en diversos grupos. | Adecuada | Tabla de grupos por moléculas y laboratorio de reactivos (Benedict y Biuret son nombres difíciles, pero se trabajan en el colegio). | — |
| Explico el origen del universo y de la vida. | Adecuada | Cinco pasos del Big Bang y explicaciones del origen de la vida, con Miller y Urey. | Mover la sección al inicio del módulo (M4). |
| Caracterizo ecosistemas y el equilibrio dinámico entre poblaciones. | Adecuada | Red trófica en la que se pueden quitar especies, curvas J y S. | — |
| Diversidad, placas tectónicas y clima. | Adecuada | Cinco pasos y dos chequeos. | — |
| Adaptaciones de seres vivos de Colombia. | Adecuada | Clasificador morfológica, fisiológica o conductual con especies colombianas. | — |
| Formulo hipótesis sobre las causas de extinción. | Adecuada | Caso de los dinosaurios con evidencias. Bien para 7.°. | — |
| Importancia del agua para la vida. | Adecuada | Cinco pasos. | — |
| Ciclos del agua, de algunos elementos y de la energía. | Adecuada | Tres ciclos por pasos. El del nitrógeno (nitrificación, desnitrificación) es exigente para 6.°. | Para 6.°, ciclos del agua y del carbono; el del nitrógeno para 7.°. |
| Función del suelo como depósito de nutrientes. | Adecuada | Horizontes y la paradoja de la Amazonia. | — |
| Recursos, energías renovables y no renovables. | Adecuada | Clasificador y datos de Colombia. | — |
| Recurso hídrico y comunidades. | Adecuada, pero breve | Un recuadro en Nutrición. | Suficiente. |
| Contaminación del entorno y salud. | Adecuada | Aire, agua, suelo y ruido. | — |
| Dieta de las comunidades y si es balanceada. | Adecuada | Plato saludable y tarjetas por región. | — |
| Implicaciones de la sexualidad y la reproducción. | Adecuada | El módulo de Reproducción es respetuoso y basado en evidencia. Para 6.°–7.° basta la pubertad y el sistema reproductor. | Ver la propuesta por grado. |
| Transmisión de enfermedades y prevención. | Adecuada | Clasificador por vía de transmisión. | — |
| Cafeína, tabaco, drogas y licores. | Adecuada | Pestañas con mensajes de cuidado y a dónde acudir. | — |
| Deporte y salud física y mental. | Adecuada | Control de minutos con la recomendación de la OMS. | — |
| Avance tecnológico en medicina. | Adecuada | Tarjetas de medicina, antibióticos. | — |
| Microorganismos de ambientes extremos. | Excesiva en el vocabulario | PCR, enzimas termoestables. | Explicar la PCR con una frase: «prueba que copia el ADN muchas veces, como en las pruebas de COVID-19». |
| **Me aproximo:** observo, formulo preguntas e hipótesis, identifico variables, registro y analizo datos, utilizo instrumentos. | **Insuficiente en instrumentos** | Muy bien en hipótesis y variables (papa, Priestley). No hay ninguna sección sobre el microscopio, pero el banco del juego pregunta por el ocular, el objetivo, el tornillo micrométrico y el aumento total. | A5: sección «El microscopio» en *La célula*. |
| **Compromisos personales y sociales.** | Adecuada | Huella de carbono con compromisos, plato saludable, cuidado del cuerpo. | — |

### 5.2 Octavo a noveno (13 a 15 años)

| Estándar (MEN) | Valoración | Evidencia | Recomendación |
|---|---|---|---|
| Importancia del modelo de la doble hélice. | Adecuada | Historia (Miescher a Watson, Crick y Franklin), cadena complementaria. | — |
| Relaciones entre genes, proteínas y funciones celulares. | Adecuada | Transcripción y traducción con un gen real, mutaciones con la anemia falciforme. La replicación con cebador y Okazaki sobra para 9.°. | Marcar la replicación (A3). |
| Comparo diferentes sistemas de reproducción. | Adecuada | Asexual, sexual y estrategias por grupo con animaciones. | — |
| Reproducción sexual y variabilidad. | Adecuada | Meiosis con «otra orientación» y entrecruzamiento. | — |
| Ciclo menstrual y reproducción humana. | Adecuada | Control día por día con hormonas. | — |
| Consecuencias del control de la natalidad. | Adecuada | Pirámide de población con datos de Colombia. | — |
| Clasifico seres vivos en grupos (plantas, animales, microorganismos). | Adecuada | «Dentro de cada reino» (versión 2.24), con dos clasificadores. | — |
| Clasificación de organismos de difícil ubicación. | Adecuada | Modelos de 5, 6 y 7 reinos, euglena, Monera. | — |
| Criterios para clasificar dentro de una especie. | Adecuada | Razas, variedades y la idea de que no hay razas humanas. | — |
| Comparo sistemas de órganos de diferentes grupos. | Adecuada | Funciones vitales comparadas. | — |
| Hormonas en la regulación humana. | Adecuada | Endocrino, homeostasis de la glucosa, hormonas del ciclo. | — |
| Defensa y ataque en animales y plantas. | Adecuada | Clasificador morfológica o fisiológica. | — |
| Formulo hipótesis sobre el origen y la evolución de un grupo de organismos. | **Insuficiente** | Hay ejemplos explicados (pinzones, jirafa), pero el estudiante nunca formula una hipótesis sobre un grupo. Solo lo hace con las extinciones. | M5: actividad «¿De dónde vienen las ballenas?» o «¿Por qué hay más de 140 frailejones?», con evidencias que el estudiante ordena. |
| Clima en las eras y adaptaciones. | Adecuada | Columna «Clima» y chequeo del Carbonífero (versión 2.24). | — |
| Comparo teorías del origen de las especies. | Adecuada | Lamarck frente a Darwin, columnas paralelas. | — |
| ADN como herramienta de análisis genético. | Adecuada | Paternidad, víctimas del conflicto. | — |
| Ventajas y desventajas de la manipulación genética. | Adecuada | Votación con argumentos de los dos lados. | — |
| Biodiversidad y desarrollo del país. | Adecuada | Especies amenazadas, variedad Castillo, semillas nativas. | — |
| Microbiología en la industria. | Adecuada | Clasificador de usos y laboratorio de la levadura. | — |
| Prevención del embarazo y de las ITS; factores culturales. | Adecuada | Efectividad con uso típico, derechos en Colombia, mitos y realidades. | — |
| Describo procesos físicos y químicos de la contaminación atmosférica. | **Insuficiente** | Solo el efecto invernadero y las partículas PM2,5. Faltan la lluvia ácida, el smog y el ozono de la superficie. | M7. |
| Comparo información química de las etiquetas de productos. | **Insuficiente** (la matriz lo deja para química) | En biología encaja con las etiquetas de alimentos y los sellos octagonales de advertencia de Colombia («Exceso en azúcares», Ley 2120 de 2021). | M8: tarjeta y chequeo en *Nutrición y salud*. |
| **Me aproximo:** modelos, mediciones, conclusiones, comunicación. | Adecuada | Punnett con simulación de 4, 100 y 8023 hijos; deriva; pirámide. Falta comunicar resultados propios. | B4. |
| **Compromisos:** cuidado del cuerpo y de la sexualidad, respeto por la diversidad. | Adecuada | Inclusión de personas con síndrome de Down, decisiones informadas. | — |

### 5.3 Preguntas del juego y tipo Saber 11 para estas edades

- **Sin grado.** Las 697 preguntas del juego y las 500 Saber 11 solo tienen
  tema. Una evaluación de reinos para 6.° puede incluir enlaces éter (6 en el
  juego); una de sistemas para 7.°, el potencial de acción (5 en el juego y 4
  Saber 11); una de genética para 9.°, el cebador o la primasa (3 y 2).
  Son pocas, pero salen al azar.
- **Preguntas sin respaldo en las páginas** (el estudiante no las puede
  estudiar en BioNom): microscopio (ocular, objetivo, tornillo micrométrico),
  sucesión ecológica y especies pioneras, estuario, radiación adaptativa,
  coevolución, endotermos, ecolocalización del guácharo, faringe y laringe,
  bulbo raquídeo, «receptor universal» y fibrosis quística (Saber 11).
- **El nivel de lenguaje es adecuado:** frases cortas, contextos colombianos y
  distractores claros. Las Saber 11 de 6.° pueden resultar largas, pero es
  el formato de la prueba.

## 6. Términos o secciones demasiado avanzados para 6.°–7.°

| Dónde | Término o sección | Sugerencia |
|---|---|---|
| La célula, 04 Tipos | «70S», «80S» | Quitar (B1). |
| La célula, 06 Transporte | Bomba de sodio y potasio («casi un tercio de la energía…») | Aceptable como dato curioso; no evaluarla en 6.°. |
| La célula, 09 Etapas | Tilacoides, estroma, NADPH, ciclo de Calvin, glucólisis, ciclo de Krebs, cadena respiratoria | Profundización 10.°–11.° (A3). |
| La célula, 05 Bacteria | Plásmidos, pili, nucleoide | Aceptable con la analogía de la ciudad; no evaluar. |
| Reinos, 04 | Enlaces éter y éster, histonas, «maquinaria para leer los genes», ARN de los ribosomas | Simplificar (A6). |
| Reinos, 03 y 04 | Ruggiero, Cavalier-Smith, Catálogo de la Vida, Chromista | Si el docente usa 5 reinos no aparecen en las fichas; el texto de la línea del tiempo sí. Aceptable. |
| Reinos, 07 | PCR, enzimas termoestables | Una frase de explicación (ver 5.1). |
| División, 05 | Alelos, AaBb, segregación, transmisión independiente | A4. |
| Sistemas, 08 | Potencial de reposo (−70 mV), umbral, canales de sodio, mielina, sinapsis | Profundización. |
| Ecosistemas, 04 | Primera y segunda ley de la termodinámica | Profundización. |
| Ecosistemas, 05 | Nitrificación, desnitrificación, amoníaco y nitrato | Para 7.°. |
| Evolución, 05 y 06 | Selección estabilizadora y disruptiva, deriva genética, frecuencia de alelos | Profundización. |

## 7. Aprendizaje multimedia (Mayer) para estas edades

- **Carga cognitiva.** Las secciones más largas, contadas con sus pasos y
  tarjetas, son:
  - Monera: ¿uno o dos? (*Reinos*): 628 palabras;
  - El origen del universo y de la vida (*Evolución*): 628 palabras;
  - El ARN y la copia del ADN (*Genética*): 619 palabras;
  - La energía de la vida (*La célula*): 560 palabras;
  - El desarrollo embrionario (*Reproducción*): 560 palabras.

  Ninguna tiene párrafos de más de 80 palabras, porque el texto está partido
  en pasos y tarjetas. Pero en las cinco el contenido nuevo para un estudiante
  de 11 a 13 años supera lo que puede retener en una sesión. Las cinco
  coinciden con contenido de 10.°–11.°: marcar la profundización resuelve la
  mayor parte.
- **Segmentación por grado.** Lo más útil, siguiendo la idea de
  preentrenamiento y segmentación, es que cada sección tenga un distintivo de
  grado («6.°–7.°», «8.°–9.°», «Profundización 10.°–11.°») y que el docente
  pueda ocultar la profundización. El sitio ya tiene un mecanismo igual para
  el modelo de reinos (`BIO_CLASIF`, guardado en el equipo y fijado con un
  enlace), así que se puede repetir con un `BIO_GRADO`.
- **Preentrenamiento.** Las palabras clave están bien escogidas. Faltan las de
  los conceptos que se usan antes de explicarlos: ATP y glucosa en *La célula*;
  alelo en *División*.
- **Contigüidad y modalidad.** Bien para estas edades: la explicación junto a
  la figura y la narración opcional ayudan a quienes leen despacio (6.°).
- **Personalización.** El tuteo y los ejemplos colombianos son muy adecuados
  para 11 a 15 años.
- **Práctica de recuperación.** Hay chequeos en todos los módulos, pero
  *Reproducción* tiene solo 4 para 10 secciones, y las secciones 01, 04, 05, 06,
  07 y 10 no tienen ninguno. Para 8.° conviene un chequeo del ciclo menstrual y
  uno de la flor (B5).

## 8. Acciones priorizadas

### Prioridad alta

| # | Acción | Archivo y texto actual exacto | Reemplazo exacto |
|---|---|---|---|
| A1 | Corregir el «Siguiente» de *Ecosistemas de Colombia*, que salta a *Ambiente* | `regiones.html`: ⟪<a class="der" href="juego.html"><small>Siguiente →</small><b>🎮 Juego de repaso</b></a>⟫ | ⟪<a class="der" href="ambiente.html"><small>Siguiente →</small><b>🌍 Ambiente y cambio climático</b></a>⟫ |
| A2 | Reordenar la cadena de módulos: ecosistemas, Colombia y ambiente después de reinos; evolución al final | `bio.js`, lista `MODULOS`: mover las tres líneas que empiezan por ⟪{id:'ecosistemas',⟫, ⟪{id:'regiones',⟫ y ⟪{id:'ambiente',⟫ para que queden justo después de la línea ⟪{id:'reinos',⟫ y antes de ⟪{id:'sistemas',⟫ | Cambios en los botones de cada página: (1) en `reinos.html`, ⟪<a class="der" href="sistemas.html"><small>Siguiente →</small><b>❤️ Sistemas del cuerpo</b></a>⟫ por ⟪<a class="der" href="ecosistemas.html"><small>Siguiente →</small><b>🌳 Ecosistemas</b></a>⟫; (2) en `ecosistemas.html`, ⟪<a href="evolucion.html"><small>← Anterior</small><b>🦎 Evolución</b></a>⟫ por ⟪<a href="reinos.html"><small>← Anterior</small><b>🍄 Reinos</b></a>⟫; (3) en `ambiente.html`, ⟪<a class="der" href="juego.html"><small>Siguiente →</small><b>🎮 Juego de repaso</b></a>⟫ por ⟪<a class="der" href="sistemas.html"><small>Siguiente →</small><b>❤️ Sistemas del cuerpo</b></a>⟫; (4) en `sistemas.html`, ⟪<a href="reinos.html"><small>← Anterior</small><b>🍄 Reinos</b></a>⟫ por ⟪<a href="ambiente.html"><small>← Anterior</small><b>🌍 Ambiente</b></a>⟫; (5) en `evolucion.html`, ⟪<a class="der" href="ecosistemas.html"><small>Siguiente →</small><b>🌳 Ecosistemas</b></a>⟫ por ⟪<a class="der" href="juego.html"><small>Siguiente →</small><b>🎮 Juego de repaso</b></a>⟫. Con A2 hecha, A1 debe quedar apuntando a `ambiente.html`. Revisar con Playwright la cadena completa. |
| A3 | Marcar la profundización de 10.°–11.° con un distintivo visible | Agregar la regla CSS ⟪.nivel-prof{display:inline-block;margin-left:8px;padding:2px 8px;border-radius:999px;background:#ede9fe;color:#5b21b6;font-size:.72rem;font-weight:700;vertical-align:middle}⟫ en `bio.css`. Ejemplos de uso: `celula.html` ⟪<h3 style="margin-top:18px">Las etapas, paso a paso</h3>⟫; `sistemas.html` ⟪<h2><span class="n">08</span> La neurona y el impulso nervioso</h2>⟫; `funciones.html` ⟪<h2><span class="n">07</span> La mecánica de fluidos en los seres vivos</h2>⟫; `evolucion.html` ⟪<h2><span class="n">05</span> Tipos de selección natural</h2>⟫; `genetica.html` ⟪<h3>2. Un cebador de ARN⟫ | ⟪<h3 style="margin-top:18px">Las etapas, paso a paso <span class="nivel-prof">Profundización 10.°–11.°</span></h3>⟫, ⟪<h2><span class="n">08</span> La neurona y el impulso nervioso <span class="nivel-prof">10.°–11.°</span></h2>⟫, ⟪<h2><span class="n">07</span> La mecánica de fluidos en los seres vivos <span class="nivel-prof">10.°–11.°</span></h2>⟫, ⟪<h2><span class="n">05</span> Tipos de selección natural <span class="nivel-prof">10.°–11.°</span></h2>⟫ y, en genética, poner el distintivo en el título de la replicación. Igual en: Reinos (laboratorio de la levadura), Evolución 06, Ecosistemas (recuadro de termodinámica). |
| A4 | No usar alelos en la meiosis antes de *Genética* | `division.html`: ⟪Esta célula es AaBb (rojo: de la madre; azul: del padre). Sigue los alelos.⟫ | ⟪Esta célula tiene dos parejas de cromosomas (rojo: de la madre; azul: del padre). Las letras A, a, B y b marcan versiones de un mismo gen, llamadas <span class="term" data-def="Cada una de las versiones de un mismo gen, por ejemplo semilla amarilla (A) o verde (a).">alelos</span>: síguelas.⟫ |
| A5 | Agregar «El microscopio» en *La célula* (instrumentos, 6.°) | `celula.html`, después de la sección 03 «¿Qué tan pequeña es una célula?» | Sección nueva con las partes (ocular, objetivos, platina, tornillos macrométrico y micrométrico, diafragma), el aumento total (ocular × objetivo), un paso a paso para preparar la lámina de cebolla y un chequeo: «Con ocular de 10× y objetivo de 40×, ¿cuál es el aumento?» (400×; error típico: sumar, 50×). Así el banco deja de preguntar algo que no se enseña. |
| A6 | Simplificar la tabla de bacterias y arqueas para 6.°–7.° | `reinos.html`: ⟪<tr><td><b>Lípidos de la membrana</b></td><td>Unidos por enlaces <b>éster</b>, como los nuestros</td><td>Unidos por enlaces <b>éter</b>, muy resistentes al calor y al ácido</td><td>Enlaces éster</td></tr>⟫ y ⟪<tr><td><b>ADN con histonas</b></td><td>No</td><td>Sí, en muchas</td><td>Sí</td></tr>⟫ | ⟪<tr><td><b>Membrana</b></td><td>Como la nuestra</td><td>Hecha de grasas especiales, muy resistentes al calor y al ácido</td><td>Como la de las bacterias</td></tr>⟫ y ⟪<tr><td><b>Cómo guardan el ADN</b></td><td>Suelto</td><td>Enrollado en proteínas, como el nuestro</td><td>Enrollado en proteínas (histonas)</td></tr>⟫ |

### Prioridad media

| # | Acción | Detalle |
|---|---|---|
| M1 | Selector de grado (`BIO_GRADO`) | Igual que el modelo de reinos: un control en `docente.html` (y un enlace `?grado=6`) que oculte en las páginas las secciones marcadas `data-grado="1011"` y filtre el juego y las evaluaciones. Requiere marcar las preguntas de `banco.js` y `docente-datos.js` con `g:'67'`, `g:'89'` o `g:'1011'`. Empezar por las de vocabulario avanzado de la sección 5.3. |
| M2 | Preentrenamiento de *La célula* | En la lista de palabras clave de `celula.html`, después de ⟪>ósmosis</span>⟫, agregar ⟪<span class="term" data-def="Azúcar que las plantas fabrican con la luz y que todas las células usan para obtener energía.">glucosa</span><span class="term" data-def="Molécula que guarda la energía que la célula usa para trabajar: su «moneda» de energía.">ATP</span>⟫, y en el encabezado un enlace «Antes: Las moléculas de la vida» a `nutricion.html`. |
| M3 | Reordenar las secciones de *Reproducción* | 01 → 02 → 04 → 05 → 06 → 07 → 03 → 08 → 10 → 09 (ver 3.2). Si se mueve el HTML, renumerar los `<span class="n">` y el índice «En esta página». |
| M4 | Reordenar las secciones de *Evolución* | 01 → 09 → 13 → 10 → 02 → 03 → 04 → 07 → 08 → 11 → 12 → 05 → 06, para que lo de 6.°–7.° vaya primero. |
| M5 | Actividad «Formula tu hipótesis sobre un grupo» (8.°–9.°) | En `evolucion.html`: tarjetas de evidencias de las ballenas (huesos de cadera, fósiles de *Pakicetus*, embriones con patas, parentesco con los hipopótamos) que el estudiante ordena para proponer de dónde vienen, con un chequeo. Las ballenas ya aparecen en la anatomía comparada del módulo. |
| M6 | Enseñar en las páginas lo que el banco pregunta | Sucesión ecológica y especies pioneras en `ecosistemas.html` (un paso en la sección 09); radiación adaptativa y coevolución en `evolucion.html` (una frase en los pinzones y una en el colibrí); endotermos y ectotermos en «Dentro de cada reino»; faringe y laringe en el recorrido del oxígeno de `sistemas.html`. Otra opción es quitar esas preguntas. |
| M7 | Contaminación atmosférica (8.°–9.°) | En `ambiente.html` o en «Contaminación y salud» de `nutricion.html`: tarjetas de lluvia ácida (óxidos de azufre y nitrógeno + agua), smog y ozono de la superficie, y la diferencia con el agujero de ozono, más un chequeo. |
| M8 | Etiquetas de alimentos (8.°–9.°) | En `nutricion.html`, sección 03: tarjeta «Lee la etiqueta: los sellos de advertencia» (octágonos negros «Exceso en azúcares», «Exceso en sodio», «Exceso en grasas saturadas», Ley 2120 de 2021) y un chequeo que compare dos bebidas. |
| M9 | Ciclo del nitrógeno solo desde 7.° | En la propuesta por grado y en las guías: las preguntas del nitrógeno (fijación, Rhizobium, eutrofización) se marcan `g:'67'` y no se usan en evaluaciones de 6.°. |
| M10 | Una guía de recorrido por grado | En `README.md` o en el panel docente, la tabla de la sección 4 de este informe, para que el docente la tenga a mano al planear el año. |

### Prioridad baja

| # | Acción | Archivo y texto actual exacto | Reemplazo exacto |
|---|---|---|---|
| B1 | Quitar la notación de sedimentación de los ribosomas | `celula.html`: ⟪<tr><td><b>Ribosomas</b></td><td>Pequeños (70S).</td><td>Más grandes (80S).</td></tr>⟫ | ⟪<tr><td><b>Ribosomas</b></td><td>Pequeños.</td><td>Más grandes.</td></tr>⟫ |
| B2 | Explicar la PCR con palabras de colegio | `reinos.html`: ⟪dio la enzima que copia el ADN en las pruebas de laboratorio (PCR)⟫ | ⟪dio la enzima que copia el ADN muchas veces en las pruebas de laboratorio (PCR), como las de COVID-19⟫ |
| B3 | Poner «Los cinco reinos» antes de «Monera: ¿uno o dos?» | `reinos.html`, secciones 04 y 05 | Intercambiar el orden y renumerar; lo básico de 6.° va primero. |
| B4 | Comunicar resultados propios | Laboratorios de la papa y de la levadura | Un recuadro final «Escribe tu conclusión» que se pueda imprimir con la guía; trabaja «comunico mis resultados» de los dos grupos de grados. |
| B5 | Más chequeos en *Reproducción* | `reproduccion.html`, secciones 04 La flor y 06 El ciclo menstrual | Uno de la flor («¿qué parte se vuelve fruto?») y uno del ciclo («¿qué hormona hace que el folículo suelte el óvulo?», LH). |
| B6 | Partir el recuadro de la bomba de sodio y potasio | `celula.html`, tarjeta de la bomba | Para 6.° basta «proteína que gasta energía para mover sustancias en contra»; el dato de las neuronas pasa a `sistemas.html` 08. |
| B7 | Alinear la matriz MEN con el grado | `MATRIZ_MEN.md` | Agregar una columna «Grado sugerido» con lo de la sección 4. |

## 9. Lo que está bien para estas edades

- El enfoque por niveles de organización da sentido a todo el curso y
  la portada es una excelente puerta de entrada para 6.°.
- El lenguaje es cercano y en segunda persona, con ejemplos de Colombia
  (frailejón, chigüiro, arepa, kumis, Sumapaz, Caño Cristales). Es muy adecuado
  para 11 a 15 años.
- La educación sexual es respetuosa, basada en evidencia y con los derechos de
  los adolescentes en Colombia.
- Los laboratorios virtuales (papa, Priestley, reactivos, levadura) y las
  simulaciones (polillas, deriva, Punnett, red trófica) trabajan bien «me
  aproximo al conocimiento como científico natural».
- Hay chequeos con explicación de cada error en todos los módulos, y un juego
  con pistas progresivas.
- Los cinco estándares que estaban flojos en la auditoría v2 ya quedaron
  cubiertos (versión 2.24).
