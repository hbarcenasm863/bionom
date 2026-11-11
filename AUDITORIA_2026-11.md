# Auditoría de BioNom · 11 de noviembre de 2026

Revisión de **todo el contenido biológico** del sitio y de su **diseño didáctico**
según los principios del aprendizaje multimedia de Richard Mayer.

## 1. Qué se revisó y cómo

| Material | Cantidad | Cómo se revisó |
|---|---|---|
| Módulos de teoría (célula, división, reinos, sistemas, reproducción, genética, evolución, ecosistemas, regiones, ambiente) y portada | 11 páginas, ~290 000 caracteres | Lectura completa del texto visible **y** de los textos escondidos en el código (fichas, pasos, animaciones, tarjetas, clasificadores) |
| Banco de preguntas del Juego (`banco.js`) | 536 preguntas | Lectura de cada pregunta con su respuesta correcta + búsqueda de errores conceptuales típicos |
| Preguntas tipo Saber 11 (`docente-datos.js`) | 400 | Lectura de cada contexto, pregunta y respuesta correcta |
| Lecturas y datos curiosos del panel docente | 10 temas | Lectura completa |
| Palabras del ahorcado, sopa, crucigrama y criptograma (`ahorcado-datos.js`) | 400 palabras con 3 pistas | Lectura completa |
| Preguntas abiertas y Detective biológico | 400 + 50 historias | Búsqueda dirigida de los errores encontrados en el resto (no lectura completa) |
| Ilustraciones del embarazo (`embrion-fig.js`) | 14 figuras | Comparación de tamaños y semanas con las etapas de Carnegie |
| Diseño didáctico | 10 módulos | Inspección del código y **mediciones con el navegador** (Playwright) en computador y celular |

Las cifras se contrastaron con fuentes de referencia: IDEAM e Instituto Humboldt
(Colombia), UICN, CDC/OMS (anticonceptivos), NHGRI (ADN compartido), etapas
de Carnegie (embriología) y los acuerdos actuales de bioquímica (rendimiento
de ATP).

## 2. Resultado biológico

**Conclusión general: el contenido es correcto y está actualizado.** No se
encontraron errores graves ni ideas alternativas (errores conceptuales) en
la teoría. Se encontraron **28 grupos de imprecisiones o datos desactualizados**, todos
corregidos:

### 2.1 Correcciones de contenido

| Tema | Decía | Ahora dice | Por qué |
|---|---|---|---|
| Respiración celular (célula, juego, ahorcado) | «cerca de 36 (o 36 a 38) ATP por glucosa» | «unos 30 a 32 ATP (los libros antiguos dicen 36 o 38)» | Es la cifra actual de la bioquímica; 36–38 es un cálculo antiguo |
| Ciclo de Krebs | No mencionaba ATP | «se obtienen 2 ATP» | Cuadra la suma por etapas |
| Ciclo de Calvin | «arma la glucosa átomo por átomo» | «fija una molécula de CO₂ a la vez y con esos carbonos forma azúcares» | La imagen de «átomo por átomo» induce un error |
| Medicina | «Pasteur y Koch… así nacieron las vacunas» | «impulsó nuevas vacunas (como la de la rabia)» | Las vacunas empezaron con Jenner (1796) |
| Penicilina | «destruye la pared de las bacterias» | «impide que construyan su pared» | Así actúa el medicamento |
| Manglares | «eliminan la sal por sus hojas» | «impiden que entre por sus raíces o la eliminan por glándulas de sus hojas» | Cada especie de mangle lo hace distinto |
| Laboratorio de la papa | Título: «¿cuánta **sal** hay dentro de una papa?» | «¿qué tan concentrado es el interior de una papa?» | El experimento usa azúcar, no sal |
| Polen (división, reproducción, genética, lecturas) | El polen aparecía como gameto | El polen **lleva** las células sexuales masculinas | El grano de polen no es un gameto |
| Combinaciones en los gametos | «Por el entrecruzamiento y la orientación… 8 millones» | «Solo por la orientación al azar, más de 8 millones (2²³); con el entrecruzamiento, muchísimas más» | 2²³ sale de la orientación al azar |
| **Semanas del embarazo** | Mezclaba semanas desde la fecundación (1 a 8) con semanas de embarazo (12 a 40) | Todo en **semanas de embarazo**, con la edad desde la fecundación entre paréntesis y una nota que explica las dos formas de contar | Es la forma en que cuentan los médicos y explica por qué el embarazo dura 40 semanas |
| Tamaño del embrión | 6 mm (semana 6) y 1,6 cm (semana 8) | 1,3 cm (semana 8 de embarazo) y 3 cm (semana 10) | Etapas de Carnegie |
| Latido del embrión | «unas 110 veces por minuto» | «unas 150, el doble que el de la madre» | A esa edad late entre 150 y 170 veces |
| Sexo en la ecografía | «A las 12 semanas se ven sus órganos sexuales» | «ya se formaron, pero se distinguen bien desde la semana 16 a 20» | A las 12 semanas no es confiable |
| Cordados | «tienen médula espinal» | «notocorda en el embrión y un cordón nervioso» | Es lo que define al filo |
| Mapa de 7 reinos | Foto del paramecio en Protozoa | Sin foto en Protozoa | En ese modelo el paramecio va en Chromista |
| Linneo | «Los hongos y las bacterias quedaban con las plantas» | «Los hongos quedaban con las plantas» | Linneo no clasificó bacterias |
| Corazón | «tejido nervioso (marca el ritmo)» | «el nodo sinusal, un músculo especial, marca el ritmo; el tejido nervioso lo acelera o lo frena» | El marcapasos es músculo |
| Arterias | «del corazón hacia el cuerpo» | «hacia el cuerpo y los pulmones» | La arteria pulmonar va a los pulmones |
| Médula ósea | «dentro de los huesos largos» | «en el adulto, sobre todo en cadera, esternón, costillas y vértebras» | Los huesos largos del adulto tienen sobre todo médula amarilla |
| Marsupiales | «el único marsupial común en Colombia» | «el más común, aunque hay muchos más» | Colombia tiene decenas de especies |
| Fósil de Villa de Leyva | *Kronosaurus* | *Monquirasaurus boyacensis* (antes *Kronosaurus*) | Reclasificado en 2023 |
| Resistencia a antibióticos (evolución, Saber 11) | «Si dejas el tratamiento a mitad sobreviven las resistentes» | «Cada uso de antibióticos selecciona a las resistentes: solo con receta, en la dosis y el tiempo indicados» | Es la explicación médica actual |
| ADN compartido con el gorila | 96 % | 98,3 % | Medido igual que el del chimpancé (98,8 %) |
| Fijismo | «dominante hasta el siglo XVIII» | «hasta el siglo XIX» | Darwin publicó en 1859 |
| Ciclo del carbono | «todos los seres vivos queman glucosa en sus mitocondrias» | «casi todos… (las bacterias, en su membrana)» | Las bacterias no tienen mitocondrias |
| El Niño y La Niña | «el calentamiento los está volviendo más intensos» | «en un planeta más caliente sus efectos son más fuertes» | Es lo que tiene consenso científico |
| Portada | Páramos «solo en Colombia, Venezuela, Ecuador, Perú y Costa Rica»; «la Amazonia regula el clima de todo el planeta»; «guisantes» | Se agregó Panamá; «produce gran parte de la lluvia de Suramérica e influye en el clima del planeta»; «arvejas» | Precisión y coherencia con el resto del sitio |
| Banco y datos docentes | «37 billones de células» (y en otras partes 30); «más bacterias que células»; «Todas las plantas hacen fotosíntesis»; orden de regiones por tamaño | 30 billones en todo el sitio; «tantas bacterias como células, o un poco más»; «las plantas tienen pared de celulosa»; orden solo con regiones cuyo tamaño no se discute | Coherencia y datos actuales |

### 2.2 Lo que se verificó y está bien

Fechas e historia de la ciencia, código genético, leyes de Mendel y sus cifras
(6022 : 2001), grupos sanguíneos en Colombia (O ≈ 60 %), categorías UICN de las
especies, alturas y temperaturas de los pisos térmicos, cifras de glaciares,
páramos, bosque seco y emisiones del IDEAM, efectividad de los anticonceptivos
(uso típico, CDC/OMS), datos de las ITS y de la vacuna del VPH, eras geológicas
y el «año de la Tierra», evolución humana, las 400 preguntas Saber 11 y las
536 del juego (respuestas correctas y distractores bien construidos).

## 3. Auditoría didáctica: principios de Mayer

| Principio | Qué pide | Estado antes | Evidencia medida | Acción |
|---|---|---|---|---|
| **Multimedia** | Palabras + imágenes, no solo palabras | ✅ Cumple | Todos los módulos tienen figuras interactivas, animaciones y, ahora, fotos reales | — |
| **Coherencia** | Quitar lo que distrae | ✅ Cumple en lo esencial | Ningún párrafo pasa de 80 palabras; el fondo de plantas queda en los márgenes con opacidad baja | Se mantuvo; ver recomendaciones sobre emojis |
| **Señalización** | Resaltar lo importante y la organización | ✅ Cumple | Secciones numeradas, índice «En esta página», negritas en conceptos, recuadros «clave» y «dato» | — |
| **Redundancia** | No narrar y mostrar el mismo texto a la vez | ⚠️ Parcial | La narración lee el texto que también está escrito | Se mantiene porque es **opcional** y ayuda a lectores con dificultades (excepción reconocida por Mayer) |
| **Contigüidad espacial** | Texto junto a su imagen | ✅ en computador · ❌ en celular | En el celular, al tocar un órgano o una región, la explicación aparecía **fuera de la pantalla** (sistemas, regiones) o casi oculta (célula, división, reinos) | ✅ **Corregido**: en pantallas angostas la página se desplaza sola hasta la explicación, dejando visible el final de la figura. Probado en las 5 páginas |
| **Contigüidad temporal** | Narración y animación al mismo tiempo | ❌ Fallaba | La narración leía de una vez todos los pasos y pestañas, incluso los que no se veían (hasta 23 frases ocultas por página) | ✅ **Corregido**: ahora lee solo lo que está en pantalla (célula: de 15 a 9 frases; sistemas: de 6 a 2) |
| **Segmentación** | Contenido en partes, al ritmo del estudiante | ✅ Cumple | 56 secuencias de pasos, pestañas, controles deslizantes; las animaciones se pueden pausar y avanzar paso a paso | — |
| **Preentrenamiento** | Conocer los conceptos clave antes de la explicación | ❌ Débil | Solo 5 términos con definición en todo el sitio; solo genética presentaba el vocabulario al inicio | ✅ **Corregido**: cada módulo empieza con un recuadro «🔑 Antes de empezar: palabras clave» (5–6 palabras con definición al tocarlas) |
| **Modalidad** | Explicar con voz cuando hay figuras | ✅ Cumple | Botón «🔊 Escuchar» en cada sección | — |
| **Personalización** | Lenguaje cercano | ✅ Cumple | Se habla de «tú», con ejemplos de Colombia (frailejón, chigüiro, café, páramo de Sumapaz) | — |
| **Voz** | Voz humana agradable | ⚠️ Parcial | Usa la voz sintética del navegador | Recomendación: grabar la voz del docente en las secciones clave |
| **Imagen** | La imagen del narrador no mejora el aprendizaje | ✅ Cumple | No hay personajes decorativos que hablen | — |
| **Actividad generativa / práctica de recuperación** | Que el estudiante responda y reciba retroalimentación | ✅ en la mayoría · ❌ en regiones | Regiones no tenía ningún chequeo y ambiente solo uno | ✅ **Corregido**: 2 chequeos en regiones, 2 en ambiente y 1 de meiosis en división; todos con explicación de cada error |

## 4. Recomendaciones que quedan para después

1. **Voz humana**: grabar al docente leyendo las ideas centrales de cada módulo
   (principio de voz). La voz sintética funciona, pero suena menos cercana.
2. **Narración por pasos**: que al avanzar una animación o un «paso» se lea
   solo el texto de ese paso, sin tener que tocar «Escuchar» de nuevo.
   ✅ Hecho en la versión 2.21.
3. **Emojis**: hay muchos en títulos y botones. Ayudan a orientarse, pero
   conviene no agregar más de los que hay (principio de coherencia).
4. **Reproducción y genética** son los módulos más largos (~2400 palabras).
   Si los estudiantes se cansan, se pueden partir en dos páginas.
5. **Preguntas abiertas y Detective** del panel docente se revisaron solo con
   búsquedas dirigidas; conviene una lectura completa en otra sesión.
   ✅ Hecho en la versión 2.21 (ver `HISTORIAL_CAMBIOS.md`).
