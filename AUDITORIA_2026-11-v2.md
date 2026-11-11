# Auditoría de BioNom, segunda revisión · 11 de noviembre de 2026

Revisión independiente, posterior a la versión 2.21, del contenido biológico, la
cobertura de los Estándares Básicos de Competencias del MEN y el diseño
didáctico según los principios de Richard Mayer. Este informe **no cambia
ningún archivo**: cada hallazgo trae el texto actual exacto, para encontrarlo
con «Buscar», y el texto de reemplazo exacto.

## 1. Resumen ejecutivo

- **El sitio está en muy buen estado.** La teoría de los 13 módulos es correcta
  en lo esencial, las 500 preguntas tipo Saber 11 y las 682 del juego tienen
  bien marcada la respuesta correcta, y se cumplen las reglas del docente: ATP
  de 30 a 32 por glucosa, semanas de embarazo contadas desde la última
  menstruación (con la edad desde la fecundación aclarada), ninguna fórmula con
  ramas entre paréntesis, ningún emoji de bandera ni de la versión 12 o
  posterior, y el docente siempre en masculino.
- **En el navegador todo funciona.** Las 15 páginas cargan sin errores en
  computador (1366 px) y en celular (Pixel 7), sin desborde horizontal. Los
  chequeos, clasificadores, la clave dicotómica, el selector de 5/6/7 reinos con
  dominios, el juego en Modo Libre y la generación de guías, talleres y
  evaluaciones del panel docente funcionan.
- **Se encontraron 45 hallazgos: 7 de prioridad alta, 16 de prioridad media y 22
  de prioridad baja.** Los altos son errores que un estudiante aprendería mal:
  las bacterias no hacen mitosis; el metano de las vacas y los rellenos lo
  producen arqueas, no bacterias; las arqueas del rumen no digieren la
  celulosa; el polen no es un gameto (una pregunta del juego lo volvió a decir);
  una respuesta «correcta» del año de la Tierra contradice su propia
  explicación; no es cierto que la mayoría de las especies vivan en el agua; y la
  tabla de anticonceptivos dice que la pastilla de emergencia deja «15 embarazos
  de cada 100 en un año», un dato que no existe.
- Varios hallazgos medios son **incoherencias entre partes del sitio** que ya se
  habían corregido en una parte pero no en otra (Linneo y las bacterias,
  El Niño «más intenso», el antibiótico «a la mitad», rangos de los pisos
  térmicos, número de alvéolos).
- **Cobertura MEN:** todos los estándares de biología tienen una sección, pero
  cinco están flojos: los tipos de selección natural (10.°–11.°), el clima en las
  eras geológicas (8.°–9.°), el origen del universo (6.°–7.°), la clasificación
  de plantas y animales dentro de cada reino (8.°–9.°) y «verifico la utilidad
  de microorganismos en la industria alimenticia» (10.°–11.°), que pide un
  experimento.
- **Mayer:** todos los módulos tienen palabras clave al inicio, al menos tres
  chequeos, pasos o pestañas, narración y ningún párrafo de más de 80 palabras.
  Solo un chequeo (Pasteur, en célula) no explica cada opción equivocada.

## 2. Cómo se revisó

| Material | Cómo |
|---|---|
| 13 páginas de contenido (incluidos textos escondidos en el código: fichas, pasos, tarjetas, clasificadores, pies de foto, modelos 3D de `modelo3d.js`) | Lectura completa del texto extraído y de los atributos `data-def`, `data-exp`, `data-por` y `data-pie` |
| `banco.js` (682 preguntas cargadas sin filtro de modelo) | Lectura completa de enunciado, respuesta correcta, distractores y explicación |
| `docente-datos.js` | Lectura completa de las 500 Saber 11, las 12 guías (lecturas, datos curiosos, contexto, «Puedo…»), 30 de las 60 historias del Detective; búsqueda dirigida en las demás historias y en las preguntas abiertas |
| `ahorcado-datos.js` (483 palabras con 3 pistas) | Lectura completa |
| `fotos-datos.js` (129 fotos) | Revisión de cita completa, licencia (ninguna NC ni ND) y archivo; inspección visual de las ecografías |
| Reglas del docente | Búsquedas automáticas: ATP, fórmulas con paréntesis, emojis por rango Unicode, semanas |
| Navegador | Playwright con Chromium, computador y Pixel 7, service workers bloqueados: carga de las 15 páginas, clic en respuestas equivocadas de cada chequeo, clave dicotómica con 7 reinos y dominios, juego en Modo Libre, guía, taller, evaluación y las 7 pestañas extra del panel docente |

## 3. Tabla de hallazgos

Las columnas «Texto actual» y «Reemplazo» van entre comillas angulares
dobles ⟪ ⟫ para que se vea exactamente dónde empieza y termina cada texto.

### 3.1 Prioridad alta

| # | Prioridad | Archivo y ubicación (texto actual) | Problema | Corrección propuesta (texto exacto) |
|---|---|---|---|---|
| A1 | Alta | `division.html`, tarjeta «¿Para qué sirve la mitosis?»: ⟪en organismos como bacterias, amebas o fresas⟫ | Las bacterias no hacen mitosis: se dividen por fisión binaria, sin huso ni cromosomas condensados. Es un error frecuente que el sitio refuerza aquí (en otras partes lo dice bien: `banco.js` «Las bacterias se reproducen por meiosis. Falso… bipartición»). | ⟪en organismos como amebas, levaduras o fresas (las bacterias no hacen mitosis: se parten por bipartición)⟫ |
| A2 | Alta | `banco.js`, pregunta «¿Qué gas producen las vacas al digerir el pasto?», explicación: ⟪cuando las bacterias de su estómago fermentan el pasto⟫ | El metano lo fabrican **arqueas** metanógenas, no bacterias. El propio sitio lo dice bien en `ambiente.html` («gracias a arqueas de su estómago») y en `reinos.html`. | ⟪cuando los microbios de su estómago fermentan el pasto y unas arqueas, las metanógenas, producen el metano⟫ |
| A2b | Alta | `banco.js`, pregunta «¿Qué gas producen los arrozales y las vacas?»: ⟪por la acción de bacterias sin oxígeno⟫ | Igual que A2. | ⟪por la acción de arqueas metanógenas, que viven sin oxígeno⟫ |
| A2c | Alta | `banco.js`, pregunta «Los rellenos sanitarios producen metano porque…»: ⟪y las bacterias producen metano⟫ | Igual que A2: las bacterias descomponen, pero el metano lo hacen las arqueas. | ⟪y los microbios la descomponen; al final, unas arqueas producen metano⟫ |
| A3 | Alta | `funciones.html`, paso «Cuatro compartimentos»: ⟪En el rumen viven bacterias y arqueas que digieren la celulosa del pasto⟫ | Las arqueas del rumen no digieren celulosa: producen metano. La celulosa la rompen bacterias, hongos y protozoos del rumen. | ⟪En el rumen viven bacterias, hongos y protozoos que digieren la celulosa del pasto (y arqueas que producen metano)⟫ |
| A3b | Alta | `banco.js`, pregunta «¿Quién digiere la celulosa del pasto en el rumen de la vaca?»: respuesta ⟪"Bacterias y arqueas"⟫ y explicación ⟪Las bacterias y arqueas del rumen producen enzimas que rompen la celulosa⟫ | Igual que A3. | Respuesta: ⟪"Bacterias y otros microbios"⟫. Explicación: ⟪Las bacterias, hongos y protozoos del rumen producen enzimas que rompen la celulosa⟫ |
| A3c | Alta | `docente-datos.js`, Detective «En la finca ganadera»: ⟪En el rumen, bacterias y arqueas digieren la celulosa del pasto.⟫ | Igual que A3. Además, es la frase **correcta** de la historia. | ⟪En el rumen, bacterias y otros microbios digieren la celulosa del pasto.⟫ |
| A4 | Alta | `banco.js`, pregunta «¿Para qué sirve la meiosis?», explicación: ⟪(óvulos, espermatozoides y polen)⟫ | El polen **no es un gameto**: lleva las células sexuales masculinas. La auditoría anterior corrigió esto en todo el sitio, pero esta explicación quedó igual. | ⟪(óvulos y espermatozoides; en las plantas, las células que darán el polen)⟫ |
| A5 | Alta | `evolucion.html`, chequeo del año de la Tierra, opción marcada como correcta: ⟪El 31 de diciembre, en la última media hora⟫ | La propia explicación dice «unos 34 minutos antes de la medianoche» (300 000 años equivalen a 34 minutos): eso **no** es la última media hora. La respuesta correcta es falsa según su explicación. | ⟪El 31 de diciembre, en la última hora⟫ |
| A6 | Alta | `nutricion.html`, paso «Es hogar»: ⟪La vida empezó en el agua y la mayoría de especies aún vive en ella.⟫ | Falso: cerca del 80 % de las especies descritas son terrestres (sobre todo insectos y plantas). | ⟪La vida empezó en el agua y ningún ser vivo puede prescindir de ella.⟫ |
| A7 | Alta | `reproduccion.html`, tabla de anticonceptivos (código): ⟪'</p><p style="margin-top:6px;font-size:.9rem">De cada 100 personas que lo usan durante un año, cerca de <b>'+Math.round(100-m[2])+'</b> quedan en embarazo.</p>';⟫ | Al tocar «Pastilla de emergencia» la página dice «De cada 100 personas que lo usan durante un año, cerca de 15 quedan en embarazo». El 85 % de la pastilla es por cada relación, no por año: el dato anual no existe y confunde. | ⟪'</p><p style="margin-top:6px;font-size:.9rem">'+(m[0]==='Pastilla de emergencia'?'Evita cerca de 85 de cada 100 embarazos que habrían ocurrido en esa relación. No sirve como método para todo el año.':'De cada 100 personas que lo usan durante un año, cerca de <b>'+Math.round(100-m[2])+'</b> quedan en embarazo.')+'</p>';⟫ |

### 3.2 Prioridad media

| # | Prioridad | Archivo y ubicación (texto actual) | Problema | Corrección propuesta (texto exacto) |
|---|---|---|---|---|
| M1 | Media | `reinos.html`, línea del tiempo «1735 · Linneo», recuadro del reino: ⟪plantas, hongos, bacterias⟫ | El texto de al lado ya dice «Los hongos quedaban con las plantas» (corregido en la auditoría anterior), pero el recuadro sigue diciendo que Linneo puso a las bacterias con las plantas. | ⟪plantas, hongos⟫ |
| M2 | Media | `reproduccion.html`, chequeo de la boa, explicación (`data-exp`): ⟪El tiburón toro y la boa son ovovivíparos⟫ | En Colombia «tiburón toro» es *Carcharhinus leucas*, que es **vivíparo con placenta**. | ⟪El tiburón ballena y la boa son ovovivíparos⟫ |
| M3 | Media | `funciones.html`, clasificador de defensas: ⟪Camuflaje del camaleón',caja:'mor',pista:'Es el color y la forma de su cuerpo.'⟫ | El camaleón cambia de color con células especiales que controla su cuerpo: es una respuesta **fisiológica**. Como ficha «morfológica» enseña lo contrario. | ⟪Camuflaje del insecto palo',caja:'mor',pista:'Es la forma de su cuerpo, que parece una rama.'⟫ |
| M4 | Media | `evolucion.html`, año de la Tierra: ⟪'30 de diciembre','La cordillera Oriental⟫ | 5 millones de años equivalen a unas 9,5 horas del año: el 31 de diciembre hacia las 2:30 p. m., no el 30. | ⟪'31 de diciembre, hacia las 2:30 p. m.','La cordillera Oriental⟫ |
| M5 | Media | `celula.html`, chequeo «El experimento de Pasteur apoya directamente…»: ⟪<button class="op">los seres vivos están hechos de células.</button>⟫ y ⟪<button class="op">la célula tiene información hereditaria.</button>⟫ | Es el único chequeo del sitio sin explicación para las opciones equivocadas (en el navegador muestra solo «Vuelve a leer la explicación de arriba»). Incumple la regla de explicar cada error. | ⟪<button class="op" data-por="Ese es el postulado de la unidad estructural (Schleiden y Schwann). Los frascos de Pasteur no estudiaban de qué están hechos los seres vivos.">los seres vivos están hechos de células.</button>⟫ y ⟪<button class="op" data-por="Pasteur no estudió la herencia: mostró que los microbios no aparecen solos en el caldo.">la célula tiene información hereditaria.</button>⟫ |
| M6 | Media | `regiones.html`, pisos térmicos, ejemplos del templado: ⟪Medellín, Bucaramanga, Armenia.⟫ | Bucaramanga está a unos 960 m: según la misma tabla (1000–2000 m) es piso cálido. | ⟪Medellín, Ibagué, Armenia.⟫ |
| M7 | Media | `banco.js`, preguntas de pisos térmicos: ⟪entre 12 y 17 °C⟫, ⟪entre 17 y 24 °C⟫ y ⟪páramo (3000-4000 m)⟫; `docente-datos.js` (Saber 11): ⟪Entre 12 y 17 °C⟫ | La página `regiones.html` usa 12–18 °C, 18–24 °C y páramo de 3000 a 4700 m. Con 3000–4000 queda un hueco sin piso entre 4000 y 4700 m. | ⟪entre 12 y 18 °C⟫, ⟪entre 18 y 24 °C⟫, ⟪páramo (3000-4700 m)⟫ y ⟪Entre 12 y 18 °C⟫ |
| M8 | Media | `banco.js`, pregunta de los alvéolos: ⟪Hay unos 300 millones en los pulmones.⟫ | `sistemas.html` dice «unos 480 millones» (la cifra actual). | ⟪Hay unos 480 millones en los pulmones.⟫ |
| M9 | Media | `banco.js`, «El Niño y La Niña los causa directamente el ser humano»: ⟪Lo que preocupa es que el calentamiento global puede hacerlos más intensos.⟫ | La auditoría anterior suavizó esta idea en `ambiente.html` porque no hay consenso sobre la intensidad; este banco quedó igual. | ⟪Lo que preocupa es que, en un planeta más caliente, sus efectos (sequías, incendios, lluvias extremas) son más fuertes.⟫ |
| M10 | Media | `docente-datos.js`, guía de evolución, contexto local: ⟪Si alguien deja de tomar el antibiótico antes de tiempo, las bacterias más resistentes sobreviven: es evolución en un solo cuerpo.⟫ | La auditoría anterior cambió esta explicación por la recomendación médica actual («cada uso selecciona a las resistentes: solo con receta, en la dosis y el tiempo indicados»). La guía conserva la versión antigua. | ⟪Cada vez que se usa un antibiótico sin necesidad, sobreviven y se multiplican las bacterias resistentes: es selección natural que se ve en pocos días.⟫ |
| M11 | Media | `banco.js`: ⟪Las algas verdes, rojas y pardas se clasifican tradicionalmente en el reino:⟫ (respuesta Protista, distractor Plantae) | No lleva marca de modelo. Con 7 reinos (Ruggiero y otros, 2015) las algas verdes y rojas están **en Plantae**, que aquí es un distractor; y Protista no existe. Probado: sale en la guía generada con 7 reinos. | Agregar la marca `m:'56'` a esa pregunta (en el bloque final de `banco.js`, sumar su enunciado a la lista `SOLO5` o crear una lista para «5 y 6»). |
| M12 | Media | `index.html`, tarjeta del módulo Reinos: ⟪dominios, los 5 reinos y una clave para clasificar.⟫ | El módulo ahora trabaja con 5, 6 o 7 reinos según el docente. | ⟪dominios, los modelos de 5, 6 y 7 reinos y una clave para clasificar.⟫ |
| M13 | Media | `reproduccion.html`, sección de anticonceptivos: ⟪impiden que el espermatozoide llegue al óvulo, impiden la ovulación o impiden la implantación⟫ | Ningún método de la tabla tiene como acción principal impedir la implantación (el DIU y los hormonales actúan antes de la fecundación, según la OMS). La frase es imprecisa y además sensible. | ⟪impiden que el espermatozoide llegue al óvulo o impiden la ovulación⟫ |
| M14 | Media | `nutricion.html`, chequeo del mercurio, explicación de la opción del aire (`data-por`): ⟪El mercurio no viaja así hasta las personas.⟫ | Falso: al quemar la amalgama de oro, el mercurio pasa al aire y enferma a quienes viven cerca de minas y compraventas de oro. La opción es incorrecta solo por «lejos de las minas». | ⟪Cerca de las minas y compraventas de oro también se respira, pero a quien vive lejos le llega sobre todo por el pescado.⟫ |
| M15 | Media | `ecosistemas.html`, clasificador de adaptaciones: ⟪{t:'El mangle elimina la sal por sus hojas'⟫ | En `celula.html` ya se corrigió: no todos los mangles lo hacen, solo algunas especies. | ⟪{t:'El mangle negro elimina la sal por glándulas de sus hojas'⟫ |
| M16 | Media | `docente-datos.js`, guía de funciones, lectura: ⟪capilaridad del xilema⟫ | El agua no sube por capilaridad (eso solo explica pocos centímetros): sube por la transpiración y la cohesión. La página lo explica bien, pero la lectura refuerza el error común. | ⟪transpiración y cohesión del agua en el xilema⟫ |

### 3.3 Prioridad baja

| # | Prioridad | Archivo y ubicación (texto actual) | Problema | Corrección propuesta (texto exacto) |
|---|---|---|---|---|
| B1 | Baja | `index.html`, nivel átomo, ejemplo «tu cuerpo»: ⟪El oxígeno (O) que respiras: es el 65 % de la masa de tu cuerpo.⟫ | Sugiere que ese 65 % es el oxígeno que respiramos; casi todo está en el agua del cuerpo. | ⟪El oxígeno (O): es el 65 % de la masa de tu cuerpo, sobre todo en el agua, y también lo respiras.⟫ |
| B2 | Baja | `celula.html`, línea del tiempo, Ruska y Knoll: ⟪y aumenta más de un millón de veces⟫ | El primero, de 1931, aumentaba unas 400 veces; el millón es de los modernos. | ⟪y hoy aumenta más de un millón de veces (el primero, unas 400)⟫ |
| B3 | Baja | `celula.html`, chequeo del glóbulo rojo en agua destilada: ⟪El agua dulce tiene menos sal que el interior del glóbulo rojo⟫ | La pregunta habla de agua destilada; el agua dulce de un río tiene algo de sales. | ⟪El agua destilada no tiene sal, y el interior del glóbulo rojo sí⟫ |
| B4 | Baja | `reinos.html`, ficha del reino Monera (modelo de 5 reinos): ⟪{id:'monera',n:'Monera',e:'🦠',c:'#64748b',cel:'Procariota (sin núcleo)',num:'Unicelulares',nut:'Autótrofos o heterótrofos',pared:'Sí (peptidoglucano)'⟫ | Monera incluye a las arqueas, que no tienen peptidoglucano. | Cambiar solo el final por ⟪pared:'Sí (en las bacterias, de peptidoglucano)'⟫ |
| B5 | Baja | `reinos.html`, sección «Microorganismos que trabajan para nosotros»: ⟪y enzimas de arqueas se usan en detergentes y en pruebas genéticas⟫ y ficha ⟪Enzimas de arqueas en detergentes⟫ | Las enzimas de detergentes vienen sobre todo de bacterias (*Bacillus*) y hongos; las de arqueas se usan sobre todo en pruebas genéticas. | ⟪y enzimas de otros microbios de lugares extremos se usan en detergentes y en pruebas genéticas⟫ y ⟪Enzimas de microbios extremófilos en detergentes⟫ |
| B6 | Baja | `reinos.html`, clave dicotómica: ⟪¿Es pluricelular con tejidos y órganos (raíz, tallo, hojas) y se desarrolla a partir de un embrión?⟫ | Los musgos (que la ficha de Plantae pone como ejemplo) no tienen raíz verdadera. | ⟪¿Es pluricelular, con tejidos, y se desarrolla a partir de un embrión que la planta madre protege?⟫ |
| B7 | Baja | `docente-datos.js`, guía de reinos, contexto global: ⟪Carl Woese descubrió en 1977 que las arqueas son tan distintas de las bacterias como de nosotros, y por eso propuso los tres dominios.⟫ | Los dominios se propusieron en 1990 (así lo dice `reinos.html`). | ⟪Carl Woese descubrió en 1977 que las arqueas son tan distintas de las bacterias como de nosotros, y en 1990 propuso los tres dominios.⟫ |
| B8 | Baja | `evolucion.html` (endémicas): ⟪solo vive en un pequeño sector del Chocó⟫; `regiones.html` (especies amenazadas): ⟪Solo vive en un pequeño sector del Chocó⟫ | *Phyllobates terribilis* vive en el río Saija, en la costa pacífica del **Cauca**, dentro del Chocó biogeográfico. | ⟪solo vive en un pequeño sector de la costa pacífica del Cauca (Chocó biogeográfico)⟫ y ⟪Solo vive en un pequeño sector de la costa pacífica del Cauca (Chocó biogeográfico)⟫ |
| B9 | Baja | `reproduccion.html`, clasificador de fecundación, pista de la rana dorada: ⟪Los anfibios suelen fecundar en el agua.⟫ | Las ranas venenosas ponen los huevos en tierra; la fecundación es externa pero no en el agua. | ⟪Los anfibios suelen tener fecundación externa: el macho fecunda los huevos cuando la hembra los pone.⟫ |
| B10 | Baja | `reproduccion.html`, reproducción asexual: ⟪las nuevas células se forman por⟫ (sigue «mitosis») | Igual que A1, en las bacterias no hay mitosis. | Agregar después de ⟪<b>mitosis</b>⟫: ⟪ (en las bacterias, por bipartición)⟫ |
| B11 | Baja | `banco.js`, «¿Para qué sirve la mitosis?», distractor: ⟪"Para formar polen"⟫ | Dentro del grano de polen sí hay mitosis; el distractor puede ser parcialmente cierto. | ⟪"Para formar espermatozoides"⟫ |
| B12 | Baja | `banco.js`, «La cianobacteria es una planta porque hace fotosíntesis», explicación: ⟪pertenece a Monera (dominio Bacteria)⟫ | Con 6 o 7 reinos el estudiante lee «Monera». | ⟪pertenece a Monera en el modelo de cinco reinos, o a Eubacteria (Bacteria) en los de seis y siete⟫ |
| B13 | Baja | `nutricion.html`, chequeo del mercurio: ⟪(bioacumulación)⟫ | El aumento en cada eslabón se llama biomagnificación. | ⟪(bioacumulación y biomagnificación)⟫ |
| B14 | Baja | `ahorcado-datos.js`, palabra BIOACUMULACIÓN, pista 2: ⟪Aumenta en la cadena trófica.⟫ | Igual que B13. | ⟪Se acumula en los tejidos de un ser vivo.⟫ |
| B15 | Baja | `ahorcado-datos.js`, palabra RESPIRACIÓN, pista 3: ⟪Produce unos 30 ATP.⟫ | La regla del docente es «unos 30 a 32». | ⟪Produce unos 30 a 32 ATP.⟫ |
| B16 | Baja | `ahorcado-datos.js`, palabra HOMÍNIDO, pista 2: ⟪Caminan en dos patas.⟫ | En la clasificación actual, Hominidae incluye gorilas y chimpancés, que no son bípedos. Debatible: el sitio usa «homínido» en el sentido tradicional. | ⟪Los de nuestro linaje caminan en dos patas.⟫ |
| B17 | Baja | `docente-datos.js`, pregunta abierta de división: ⟪regla «PMAT»⟫ | En `division.html` la ayuda para recordar se llama «ProMeAnaTe». | ⟪regla «ProMeAnaTe»⟫ |
| B18 | Baja | `docente-datos.js`, Detective de antibióticos: ⟪Luego le explicó qué pasa al dejarlo a la mitad.⟫ | Mismo enfoque antiguo que M10. Debatible: la recomendación «en la dosis y el tiempo indicados» sigue siendo correcta. | ⟪Luego le explicó qué pasa si se usan sin necesidad o mal.⟫ |
| B19 | Baja | `docente-datos.js`, guía de célula, dato curioso: ⟪La célula más grande que existe es la yema de un huevo de avestruz: es una sola célula.⟫ | Solo vale para el huevo sin fecundar, y hay células más largas (neuronas, algas como *Caulerpa*). | ⟪Una de las células más grandes es la yema de un huevo de avestruz sin fecundar: es una sola célula.⟫ |
| B20 | Baja | `division.html`, meiosis I: ⟪¡Aquí se separan los alelos A y a (segregación)!⟫ | La figura dibuja un entrecruzamiento en el cromosoma de A: si el trozo intercambiado incluye el gen, A y a se separan en la meiosis II. Debatible para el nivel escolar. | ⟪¡Aquí se separan casi siempre los alelos A y a (segregación)!⟫ |
| B21 | Baja | `fotos-datos.js`, foto `a_incendio` (pie «Incendio forestal en Colombia») | En la imagen casi no se ve el incendio: es una loma con árboles. Poco pertinente. | Buscar en Openverse una foto donde se vean el humo y las llamas, con cita APA. |
| B22 | Baja | `MATRIZ_MEN.md`, 8.°–9.°: ⟪Clasifico organismos en grupos taxonómicos de acuerdo con sus características celulares.⟫ | El texto del MEN para 8.°–9.° es otro (el citado es el de 6.°–7.°). | ⟪Clasifico seres vivos en diversos grupos taxonómicos (plantas, animales, microorganismos…).⟫ (ver sección 4) |

## 4. Cobertura de los Estándares del MEN por grado

La matriz de la versión 2.16 (`MATRIZ_MEN.md`) es correcta en lo general: cada
estándar de *Entorno vivo* y de *Ciencia, tecnología y sociedad* de biología,
salud y ambiente tiene al menos una sección con chequeos y preguntas. Al
contrastarla con las páginas, estos quedaron flojos:

### Sexto a séptimo

| Estándar | Estado real | Qué falta |
|---|---|---|
| Explico el origen del universo y de la vida a partir de varias teorías. | **Flojo en el universo.** El Big Bang es una sola frase; el origen de la vida sí está bien desarrollado (cinco tarjetas y simulación de Miller y Urey). | Un paso o tarjeta sobre el Big Bang (evidencias: expansión, radiación de fondo) y la formación de la Tierra. |
| Clasifico membranas según su permeabilidad. | Cubierto. El clasificador mezcla membranas con cubiertas (plumas, cutícula), pero el texto lo advierte. | — |
| Indago acerca del uso industrial de microorganismos de ambientes extremos. | Cubierto con una tarjeta y una ficha. | Ver B5. |
| Resto (célula, ósmosis, energía, biomoléculas, agua, suelo, ecosistemas, placas, extinciones, dieta, sustancias, deporte, contaminación) | Bien cubiertos, con actividades y chequeos. | — |

### Octavo a noveno

| Estándar | Estado real | Qué falta |
|---|---|---|
| Clasifico seres vivos en diversos grupos taxonómicos (plantas, animales, microorganismos…). (Texto del MEN distinto del que cita la matriz.) | **Flojo.** `reinos.html` clasifica en reinos, pero no hay una actividad para clasificar dentro de cada reino (musgos, helechos, gimnospermas, angiospermas; filos de animales y clases de vertebrados). Hay preguntas en el juego y en «En cada grupo» de reproducción. | Una sección en `reinos.html` («Dentro de cada reino») con un clasificador de plantas y de vertebrados. |
| Establezco relaciones entre el clima en las diferentes eras geológicas y las adaptaciones de los seres vivos. | **Flojo.** La tabla de eras no tiene columna de clima; el clima aparece solo en las extinciones y en la Titanoboa. | Una columna «Clima» en la tabla de eras (por ejemplo: Paleozoico, glaciaciones y bosques cálidos del Carbonífero; Mesozoico, cálido sin casquetes polares; Cenozoico, enfriamiento y glaciaciones del Cuaternario) y un chequeo que relacione clima y adaptación. |
| Identifico criterios para clasificar individuos dentro de una misma especie. | Cubierto con cuatro tarjetas y un chequeo; suficiente para el estándar. | — |
| Comparo sistemas de órganos de diferentes grupos; hormonas; defensa y ataque; natalidad; reproducción; ADN y proteínas | Bien cubiertos (`funciones.html`, `sistemas.html`, `reproduccion.html`, `genetica.html`). | Ver M3. |

### Décimo a undécimo

| Estándar | Estado real | Qué falta |
|---|---|---|
| Comparo casos en especies actuales que ilustren diferentes acciones de la selección natural. | **Flojo.** Solo hay selección direccional (polillas, pinzones, resistencia). «Diferentes acciones» pide comparar tipos. | Una tarjeta o simulación con selección direccional, estabilizadora (peso al nacer) y disruptiva (pinzones de pico grande y pequeño), y de paso la selección sexual. |
| Busco ejemplos de principios termodinámicos en algunos ecosistemas. | **Flojo.** Un párrafo de 76 palabras debajo de la pirámide. | Un chequeo propio y un ejemplo numérico (respiración que se pierde como calor). |
| Verifico la utilidad de microorganismos en la industria alimenticia. | **Flojo.** «Verifico» pide experimentar; hoy hay una tarjeta y un clasificador. | Un laboratorio virtual de levadura (globo que se infla con distintas cantidades de azúcar o temperaturas) con variables, como el de la papa. |
| Neuronas, mecánica de fluidos, fotosíntesis, ciclos, relaciones, antibióticos, sexualidad, tecnologías colombianas | Bien cubiertos. «Identifico tecnologías desarrolladas en Colombia» se apoya en la variedad Castillo y Medicina Legal: suficiente, pero podría sumar ejemplos (vacunas del Instituto Nacional de Salud, Cenicaña). | — |

### Me aproximo al conocimiento como científico natural y compromisos

Bien trabajados: hipótesis, variables y datos en el laboratorio de la papa, la
campana de Priestley, Miller y Urey, la deriva genética, la extinción y la curva
de CO₂; modelos matemáticos (regla del 10 %, Poiseuille, pirámide de
población). Más flojos: **dar el crédito a las fuentes** (las fotos tienen cita
APA, pero el estudiante nunca practica citar), **comunicar resultados** (no hay
un espacio para escribir conclusiones propias, fuera de las preguntas abiertas
del panel docente) y **trabajo en grupo y debate**, que dependen de las guías
del docente.

## 5. Principios de Mayer por módulo

Mediciones automáticas sobre el código (no incluye los textos que se arman por
JavaScript) y pruebas en el navegador.

| Módulo | Palabras clave | Chequeos | Pasos / pestañas / tarjetas | Clasificadores | Fotos | Párrafo más largo | Observaciones |
|---|---|---|---|---|---|---|---|
| Portada | — | 0 | Mapa por niveles y reto de ordenar | — | 21 y 6 modelos 3D | 44 | Contigüidad muy buena: la ficha del nivel queda junto al mapa. La portada no necesita chequeos; el reto de ordenar cumple la práctica. |
| Célula | Sí | 6 | 4 / 2 / 13 | 3 | 11 | 52 | M5: un chequeo sin explicación por opción. |
| División | Sí | 3 | Fases con animación y pasos | 1 | 8 | 59 | Correcto. |
| Reinos | Sí | 5 | 1 / – / 3 + selector de modelo | 3 | 3 | 65 | El selector de 5/6/7 reinos funciona y sincroniza mapa, fichas, clave y reto (probado con 7 reinos y dominios). |
| Sistemas | Sí | 4 | 4 / – / 4 | 1 | 6 | 51 | El recuadro flotante evita que la explicación del cuerpo quede fuera de la vista. |
| Funciones | Sí | 7 | 2 / 1 / – | 3 | 3 | 54 | M3. |
| Nutrición | Sí | 9 | 2 / 2 / 6 | 1 | 4 | 55 | Muy buena práctica de recuperación. |
| Reproducción | Sí | 4 | 1 / 2 / 6 | 1 | 4 | 55 | Es el módulo más largo; se podría partir (embarazo y salud sexual aparte). |
| Genética | Sí | 4 | 3 / 1 / 6 | 0 | 1 | 61 | Una sola foto: sería útil una de un cariotipo o de los guisantes de Mendel. Tiene simuladores propios (Punnett, mutaciones). |
| Evolución | Sí | 7 | 2 / 1 / – | 2 | 7 | 52 | A5 y M4. |
| Ecosistemas | Sí | 4 | 2 / 1 / – | 3 | 9 | 54 | El párrafo de termodinámica (76 palabras) roza el límite. |
| Regiones | Sí | 4 | 1 / – / – | 0 | 11 | 51 | El reto del mapa compensa la falta de clasificador. |
| Ambiente | Sí | 3 | – / – / 3 | 2 | 7 | 65 | Sin pasos ni pestañas, pero el contenido va en controles y tarjetas: la segmentación se cumple. |

**Por principio:**

- **Preentrenamiento:** cumple en los 12 módulos.
- **Contigüidad espacial:** cumple; el recuadro flotante de la versión 2.21
  resolvió el celular sin mover la página. No se encontró desborde horizontal.
- **Contigüidad temporal y modalidad:** la narración lee solo lo visible y lee
  cada paso nuevo.
- **Segmentación:** cumple en todos.
- **Señalización:** secciones numeradas, índice y negritas; bien.
- **Coherencia:** ningún párrafo pasa de 80 palabras; ningún emoji problemático.
  Siguen siendo muchos emojis en botones (recomendación de la auditoría anterior).
- **Redundancia:** la narración repite el texto escrito; se acepta porque es
  opcional.
- **Personalización:** tuteo y ejemplos de Colombia en todo el sitio.
- **Práctica de recuperación:** chequeos con explicación de cada error (salvo
  M5), juego con tres intentos y dos pistas, y panel docente. 89 preguntas del
  juego (casi todas de verdadero o falso) no traen sus dos pistas propias; el
  juego las genera solo y funcionan, pero no son tan buenas como las escritas.
- **Fotos:** las 129 tienen autor, año, título, fuente, enlace y licencia libre
  (ninguna NC ni ND) y su archivo existe. Las ecografías no muestran nombres de
  pacientes. Solo la del incendio forestal es poco pertinente (B21).

## 6. Lo que está bien

- Reglas del docente cumplidas en todo el sitio y los bancos: ATP de 30 a 32
  (con la nota del cálculo antiguo), semanas de embarazo desde la última
  menstruación con la equivalencia desde la fecundación, sin fórmulas con
  paréntesis, sin banderas ni emojis nuevos.
- Datos actuales y bien contrastados: 30 billones de células, 98,8 % de ADN con
  el chimpancé, *Monquirasaurus boyacensis*, 480 millones de alvéolos, emisiones
  del IDEAM (59 % uso del suelo), metano 80 veces el CO₂ en 20 años, CO₂ de
  Mauna Loa, categorías UICN de las especies de Colombia, efectividad típica de
  los anticonceptivos (OMS/CDC).
- La secuencia real del gen de la beta-globina y la mutación GAG → GUG de la
  anemia falciforme están bien puestas en el simulador.
- El modelo 3D del ADN tiene 10 pares de bases por vuelta; el del hierro, sus 4
  capas (2, 8, 14, 2) y 30 neutrones.
- El selector de reinos se aplica en todo el material: con 7 reinos la guía
  cambia la lectura y los mapas, el juego avisa del modelo y la clave lleva a la
  ameba a Protozoa dentro de Eukarya.
- Las 500 preguntas tipo Saber 11 tienen contextos bien construidos,
  distractores plausibles y la primera opción siempre correcta.
- El diseño didáctico es sólido: ningún error de JavaScript en las 15 páginas,
  ni en computador ni en celular.
