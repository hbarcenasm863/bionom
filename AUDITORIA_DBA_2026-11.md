# Auditoría total de BioNom contrastada con los DBA (19 de noviembre de 2026)

Cuatro auditores expertos en biología y didáctica revisaron **las 13 páginas de contenido y unas 2 100
preguntas** (Juego, Saber 11, abiertas y palabras del ahorcado) contra los Derechos Básicos de Aprendizaje
de Ciencias Naturales del MEN (V.1, 2016). Solo leyeron: **no se cambió nada del sitio**. Este documento
resume lo más importante y propone un orden de corrección; el detalle, con ubicación exacta y la corrección
lista para pegar, está en los cuatro informes de la carpeta `auditoria-2026-11/`.

| Bloque | Páginas | Preguntas | Críticos | Medios | Menores | Informe |
|---|---|---|---|---|---|---|
| A | Célula, Microscopio, División, Reinos | ≈ 650 | 2 | 24 | 20 | `informe_A_celula_division_reinos.md` |
| B | Ecosistemas, Regiones (Colombia), Ambiente | 660 | 4 | 27 | 24 | `informe_B_ecosistemas_colombia_ambiente.md` |
| C | Sistemas, Funciones, Nutrición, Reproducción | 732 | 3 | 25 | 20 | `informe_C_sistemas_funciones_nutricion_reproduccion.md` |
| D | Genética (y animación del dogma), Evolución | 515 | 0 | 21 | 22 | `informe_D_genetica_evolucion.md` |
| **Total** | | **≈ 2 560 piezas** | **9** | **97** | **86** | |

**La noticia buena.** Ningún auditor encontró una clave de respuesta incorrecta en el Juego ni una
ambigüedad que invalide una pregunta (salvo **una** pregunta Saber con la clave invertida, ver C-B1). Los
**más de 80 chequeos de las páginas** tienen bien marcada la opción correcta y retroalimentación específica de cada
error. La ciencia central de las páginas es sólida: ósmosis, mitosis y meiosis, ATP, ciclos, cruces de Mendel,
código genético, animación del dogma, año de la Tierra, citocromo c y eficacias de los anticonceptivos se
comprobaron y coinciden.

**La noticia mala.** Lo que falla no es la biología central, sino la **coherencia del sistema**: etiquetas de
DBA y curso contradictorias (muchas por reglas que yo escribí en las versiones 2.56 a 2.58), preguntas que
evalúan lo que las páginas no enseñan, claves que se delatan por ser las más largas, pistas que regalan la
respuesta y muchos duplicados.

---

## 1. Verificado por mí antes de presentarlo

Revisé personalmente los hallazgos más graves; los cuatro primeros son errores reales:

1. **Ecosistemas, Saber S37, clave invertida.** «Un estudiante dibuja la flecha del zorro al conejo. ¿Qué
   error cometió?» La respuesta marcada (la correcta) es «La flecha va del que es comido al que come», que
   describe la flecha bien dibujada; la otra opción enseña la regla al revés. Ninguna opción es correcta.
2. **Ambiente, simulador de CO₂** (`ambiente.html`, línea 190): cualquier valor por encima de 380 y hasta 430 ppm se rotula
   «Nivel actual (más de 420 ppm)».
3. **Regiones, pisos térmicos** (`regiones.html`, líneas 324-325): el páramo dice «6 a 12 °C» y el nival «< 6 °C»,
   pero la regla de 6 °C por 1 000 m de la misma página da unos 11,5 a 1,3 °C.
4. **Nutrición** (`nutricion.html`, línea 113): «Contiene grasas trans». El auditor encontró en Minsalud
   (Res. 810 de 2021, modificada por la 2492 de 2022) que el sello es «Exceso en grasas trans»; conviene
   confirmarlo antes de corregir (podría haber una norma más nueva).
5. **Etiquetas DBA/curso:** **252 de 1 432** preguntas (Juego y Saber) tienen un curso menor que el grado de su
   DBA, por ejemplo «DBA 8.4 con curso 7» (ambiente 81, funciones 79, nutrición 62, colombia 19, evolución 9,
   genética 2). Es un defecto de mis reglas en `dba-bio.js` (`BASE` de funciones = 7 y de nutrición = 6,
   frente a un DBA por defecto de 8.4).

---

## 2. Hallazgos críticos y altos (9)

| # | Dónde | Problema | Corrección |
|---|---|---|---|
| A1 | División, Saber S13 | «La **fruta** de la fresa se propaga por estolones» (error de hecho) | «La **planta** de fresa se propaga por estolones» |
| A2 | `reinos.html`, línea 194 (y `regiones.html`) | **Fuentes que no coinciden, no un error seguro:** el auditor halló medios que ponen a Colombia segunda en mariposas; el kit del Instituto Humboldt (2024), que es la fuente que cita `regiones.html`, la pone **primera** (aves, orquídeas y mariposas). Lo mismo con «segundo en plantas» (pregunta J30 de colombia): el SiB Colombia la ubica tercera y otra fuente, segunda | Escribir siempre «según el Instituto Humboldt (2024)» y, para plantas, «entre los primeros» |
| B1 | Ecosistemas, Saber S37 | Clave invertida (ver arriba) | Reescribir con la corrección que da el informe B |
| B2 | Banco de Ambiente, Ecosistemas y Colombia | **Unas 35 preguntas evalúan lo que las páginas no enseñan:** Acuerdo de París, economía circular, 3 R, microplásticos, sumidero de carbono, tiempo vs. clima, albedo, huella hídrica, biomagnificación, especie clave, compost, etc. | Agregar una tarjeta por concepto o mover/eliminar esas preguntas |
| B3 | `regiones.html`, líneas 324-325 | Temperaturas del páramo y del nival incoherentes con la regla de 6 °C/1 000 m | Páramo «1 a 12 °C»; nival «menos de 1 a 2 °C» |
| B4 | `ambiente.html`, línea 190 | Rótulo «Nivel actual» mal puesto; además el inventario de emisiones de Colombia (59/31/7/3 %) no lleva año y es anterior al de 2014 (≈ 55/34/6/4) | Dividir el rango y citar el inventario con su año |
| C1 | `nutricion.html`, línea 113 | Sello «Contiene grasas trans» (ver arriba) | «Exceso en grasas trans» |
| C2 | `dba-bio.js` | 192 preguntas de Funciones y Nutrición con curso menor que el DBA | Cambiar `BASE` y reetiquetar (listas en el informe C, sección 6) |
| C3 | Reproducción, Saber S44 (y S43) | El montaje de las bolsas sobre flores de tomate no prueba lo que dice: el tomate se autopoliniza dentro de la bolsa | Usar emasculación (quitar las anteras antes de que abran) o una planta de polinización cruzada |

---

## 3. Patrones que se repiten en todo el sitio

1. **DBA y curso contradictorios o mal puestos.** Además de lo anterior: casi todo el banco geográfico de
   *colombia* quedó bajo el DBA 7.3 (redes tróficas), que no le corresponde; unas 150 preguntas de *ambiente*
   y *colombia* tienen DBA 11.5 con curso 7 y muchas de recuerdo básico están marcadas curso 11; la fase
   luminosa, la cadena respiratoria y varias de meiosis están como 6.°; las de Big Bang y Miller-Urey tienen
   DBA 9.6 y curso 7; las de biotecnología con curso 9. Los cuatro informes traen la lista id por id.
   Hay también contenido que **ningún DBA nombra** (relaciones entre especies, nicho, poblaciones, pisos
   térmicos, ubicaciones): vive en los Estándares Básicos, no en los DBA, y la matriz debe decirlo en vez de
   forzarlo a 7.3.
2. **Desajuste entre las páginas y el banco** (el estudiante no puede responder lo que no se enseña).
   Ejemplos: nefrona y formación de orina, coagulación y componentes de la sangre, circulación mayor y menor,
   bocio (Sistemas); líquenes, citoesqueleto, endémicas, cutícula (Célula y Reinos); mutaciones cromosómicas,
   síndrome de Down y cariotipo (Genética); y lo ya dicho de Ambiente. Solución: agregar el contenido (una
   tarjeta corta) o mover/eliminar las preguntas.
3. **La opción correcta es la más larga** en 50 a 62 % de las preguntas de opción múltiple (por azar sería
   25 %), y en cerca de la mitad de los chequeos de las páginas. Incluye mis preguntas de las versiones
   2.57 y 2.58: mi revisión de entonces solo medía las Saber. Debe agregarse una revisión automática que
   lo detecte en todo el banco antes de publicar.
4. **Pistas que regalan la respuesta** (por ejemplo J3 y J17 de colombia, J2 y J12 de reinos, J14 y J15 de
   funciones, J4 y J31 de reproducción), y **vf sin pistas** (29 en el bloque A, 20 en Genética y Evolución),
   contra la regla de 2 pistas por pregunta.
5. **Duplicados.** Genética y Evolución (el bloque que agregué en la 2.57 repite parejas como homólogos,
   análogos, coxis y eras); Ecosistemas (la eutrofización cinco veces); Colombia; y cruces entre célula y
   división. No conviene borrarlos de golpe porque la meta es 20 o más por DBA: hay que reescribir cada pareja
   para que pida algo distinto.
6. **Distractores absurdos** (sobre todo en biotecnología: «el color del tubo de ensayo», «quién inventó el
   microscopio»): el estudiante acierta sin saber.
7. **Modelo de reinos.** Con 6 o 7 reinos, o sin dominios, siguen apareciendo «Monera», «Protista» y
   «Dominio» (regla del proyecto: marcar con `m` y `d:1`).
8. **Datos «de ejemplo» no marcados** y cifras aproximadas sin fuente (ver sección 6).

---

## 4. Hallazgos medios destacados (los 97 están en los informes)

**Páginas — ciencia y datos**
- *Célula:* la analogía «la atmósfera funciona como una membrana» mezcla permeabilidad con efecto invernadero;
  falta decir que **respirar no es lo mismo que la respiración celular**; el anillo del ciclo celular dibuja la
  mitosis más grande que el texto; tamaño de la cebolla distinto entre la página y el microscopio.
- *Reinos:* «termófilas a más de 80 °C» (son hipertermófilas), euglenas «heterótrofas» (son mixótrofas), esponjas
  «con tejidos», «Filo: Magnoliophyta», el origen del sistema de cinco reinos, y arqueas en lugares concretos de
  Colombia que el auditor no pudo verificar.
- *Ecosistemas:* el jaguar y el águila arpía aparecen como consumidores terciarios aunque comen herbívoros; la red
  trófica **no tiene descomponedores**; el retamo espinoso «no tenía depredadores» (es una planta: no tenía
  herbívoros); la barra «Siguiente» queda a mitad de la sección 09.
- *Ambiente:* la «calculadora» de huella de carbono es un cuestionario sin factores de emisión ni fuentes y puede
  estigmatizar; el simulador mezcla calentamiento de equilibrio con el observado; el clasificador de acciones es
  ambiguo (manglares sirven para mitigar y para adaptarse).
- *Regiones:* Caño Cristales aparece como «sabana»; falta la dimensión **económica** de la visión sistémica.
- *Sistemas, Funciones, Reproducción:* el riñón «filtra la sangre 300 veces»; musgos y helechos clasificados como
  reproducción «asexual» contra lo que dice la propia página; el armadillo «se enrolla»; las fotos de las
  diapositivas del embarazo no coinciden con la semana del título.
- *Nutrición:* la Guajira se explica solo por el clima; «las drogas actúan sobre la dopamina» es simplificación.
- *Genética y Evolución:* el «trozo real del gen de la hemoglobina» de la animación está modificado (intrón
  inventado y parada añadida) sin decirlo; «homínido» se usa en sentido impreciso («hoy solo quedamos nosotros»);
  la lista de homínidos se lee como una escalera; faltan recuadros contra «teoría = suposición», «sobreviven los
  más fuertes» y «dominante = más común»; el selector de ADN compartido (26 % levadura) choca con la pestaña
  del citocromo c (58 %).

**Preguntas**
- Genética S18 es ambigua sobre la hebra (decir «cadena molde»); Evolución sobre Archaeopteryx habla de
  «reptiles» donde la página dice «dinosaurios»; la fecha de llegada a América (15 000 a 20 000 años) es discutida.
- Estrella de mar «cada trozo forma otra» generaliza de más; peces «eliminan amoníaco» solo los óseos; Poiseuille
  etiquetado como 7.°; el índice mitótico de 15 % no es verosímil.

---

## 5. Cobertura de los DBA

| DBA | Estado | Lo que falta |
|---|---|---|
| 6.° 4 Célula | Cubierto | «Respirar ≠ respiración celular»; difusión facilitada; un chequeo básico de respiración |
| 6.° 5 Clasificación | Cubierto; parentesco **parcial** | Un árbol de parentesco entre grupos |
| 7.° 3 Redes tróficas, fotosíntesis y respiración | **Parcial** | Tabla comparativa fotosíntesis–respiración con reactivos y productos; predicción de efectos de la tala en la atmósfera; red trófica local de los estudiantes; descomponedores en la red |
| 7.° 4 Ciclos y agua | **Parcial** | **Uso responsable del agua (falta)**; microorganismos en la vida diaria (compost, yogur, tratamiento de aguas); caso de contaminación con acciones de remediación |
| 8.° 4 Sistemas y homeostasis | **Parcial** | Hábitos no saludables solo para nervioso y endocrino: faltan **excretor, óseo y muscular**; excretor sin nefrona; óseo y muscular poco desarrollados; el clasificador no incluye el sistema inmune |
| 8.° 5 Reproducción | Parcial | Embarazo adolescente en una sola frase; faltan consentimiento, abuso y rutas de denuncia; salud mental y conductas alimentarias; anatomía genital externa y mamas |
| 9.° 4 Mendel | **Parcial** | Multiplicar probabilidades; trihíbrido (ejemplo oficial); diseño de experimentos tipo Mendel; factor Rh; la 2.ª y 3.ª ley nombradas por número |
| 9.° 5 ADN | Cubierto; parcial en mutaciones | Mutaciones cromosómicas; que la mutación somática no se hereda |
| 9.° 6 Origen de especies | Cubierto (desde la 2.57) | Una gráfica de frecuencias por generaciones; ejemplo con presión climática |
| 10.° 4 Biotecnología | Cubierto; parcial en usos | Biotecnología ambiental y energética; marco legal colombiano |
| 11.° 5 Ambiente | Parcial | Acuerdo de París y acuerdos globales; dimensión económica; **diseño de investigaciones sobre especies locales (falta)** |

---

## 6. Qué no se pudo verificar (las cifras que conviene revisar antes de citarlas)

Altura de la Sierra Nevada de Santa Marta; lluvia de Lloró; superficie de Sumapaz; «cerca del 50 % de los páramos
del mundo»; fecha de llegada de los humanos a América; número de especies de frailejón; el estado actual de la
Res. 810 sobre los sellos; si la vacuna del VPH ya cubre a niños de 15 a 17 años; números de líneas de ayuda
(ICBF 141, etc.); arqueas en Paipa, Ruiz, Puracé, Zipaquirá y Manaure; porcentajes del selector de ADN
compartido; y que el Catálogo de la Vida siga usando siete reinos. Los auditores hicieron pocas o ninguna
búsqueda web. Tampoco revisaron el detective, el laberinto, el crucigrama, la sopa ni las hojas de referencia.

---

## 7. Plan de corrección propuesto (en orden)

**Fase 1 — errores de hecho y claves (poco trabajo, alto impacto).** A1, B1, B3, B4, C1, C3, citar la fuente
(Humboldt 2024) en el ranking de Colombia y suavizar «segundo en plantas», el armadillo, el riñón, musgos y helechos, el «trozo real» de la
animación, el retamo, el jaguar «terciario», Archaeopteryx. Son cambios puntuales.

**Fase 2 — etiquetas.** Corregir `BASE` y las reglas de `dba-bio.js`; aplicar las listas de reetiquetado de
los informes; usar la regla «el curso nunca es menor que el grado del DBA»; declarar en `MATRIZ_DBA.md` lo que
ningún DBA nombra; volver a medir los conteos por DBA (siguen siendo 20 o más).

**Fase 3 — calidad de las preguntas.** Igualar el largo de las opciones y reescribir pistas reveladoras (con una
revisión automática en todo el banco); mejorar distractores absurdos; reescribir los duplicados para que pidan
algo distinto; agregar pistas a los vf; marcar los datos «de ejemplo».

**Fase 4 — contenido que falta por DBA** (sección 5), en este orden de prioridad: uso responsable del agua;
hábitos y los seis sistemas; riesgos del embarazo adolescente, consentimiento y rutas; tabla fotosíntesis–
respiración; Acuerdo de París y residuos; probabilidades y trihíbrido; mutaciones cromosómicas; descomponedores
en la red trófica; dimensión económica; investigación sobre especies locales.

**Fase 5 — preguntas sin base** (B2): por cada una, o se agrega la tarjeta que la respalda o se mueve/elimina.

---

## 8. Decisiones que le tocan al docente

1. **Contenido sensible en Reproducción y Nutrición** (consentimiento y abuso, ruta legal de la interrupción
   del embarazo, salud mental y conductas alimentarias, sustancias de consumo preocupante, números de líneas de
   ayuda): ¿se incluye, con qué alcance y con qué enfoque? El auditor lo señala como laguna, pero no es una
   decisión técnica.
2. **Preguntas sin base:** ¿se agrega el contenido (más trabajo, más completo) o se retiran las preguntas?
3. **DBA estricto o por cercanía:** Funciones vitales comparadas, Nutrición y salud, y todo lo de geografía de
   Colombia no tienen DBA propio. ¿Se etiquetan con el más cercano (como hoy) o se marcan «sin DBA»?
4. **Duplicados:** ¿se prefiere mantener las 20 o más preguntas por DBA con parejas reescritas, o bajar la meta
   y eliminar?
5. **La «calculadora» de huella de carbono:** ¿se renombra («Mis hábitos») o se rehace con factores de emisión
   y fuentes?

---

## 9. Cómo se hizo

Cuatro agentes independientes, uno por bloque de temas, con el mismo método: leer cada página completa
(texto, scripts y chequeos), verificar la clave y la explicación de cada pregunta, contrastar con los DBA oficiales
del PDF V.1 y proponer la corrección. Trabajaron solo con lectura sobre los datos volcados con
`auditoria-2026-11/volcar-preguntas.js` (se puede volver a correr). Sus hallazgos llevan una marca de
confianza (SEGURO, PROBABLE, DUDOSO); los que verifiqué yo mismo están en la sección 1. Las etiquetas de DBA y
curso que proponen son su criterio contra los textos oficiales; el propio repositorio reconoce que el mapeo
pregunta-curso es criterio de BioNom.
