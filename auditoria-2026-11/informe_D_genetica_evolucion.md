# Informe de auditoría — Bloque D (Genética y Evolución)

Páginas: `genetica.html`, `evolucion.html`, `dogma-anim.js`. Temas de preguntas: `genetica` (86 Juego, 75 Saber, 67 abiertas, 40 palabras) y `evolucion` (94 Juego, 67 Saber, 46 abiertas, 40 palabras).
Marca de confianza: SEGURO / PROBABLE / DUDOSO. Las referencias `J12`, `S5`, `A3` son los ids del volcado JSON de cada tema.
Scripts usados (solo lectura): `bloque_D/cribado.js`, `pistas.js`, `chequeos.js`, `dump.js`, en la carpeta `auditoria/bloque_D/`.

---

## 1. Resumen ejecutivo

- Revisé las dos páginas completas (HTML y JavaScript, incluidos los simuladores), la animación `dogma-anim.js` y las 515 preguntas de los dos temas. Resolví a mano los cruces, la tabla de paternidad, la cadena complementaria, los codones y las cuentas del «año de la Tierra».
- **No hay claves incorrectas** en el Juego, en Saber ni en los 20 chequeos de las páginas. Verifiqué que todos los `data-ok` apuntan a la opción correcta.
- Hallazgos: **0 críticos, 21 medios, 22 menores.**
- Lo más importante:
  1. Las etiquetas `dba`/`curso` tienen contradicciones: 12 preguntas con DBA 9.6 pero curso 7, y 7 con DBA 10.4 pero curso 9.
  2. Hay muchas preguntas duplicadas, sobre todo el bloque `n2` de Evolución, añadido en la versión 2.57.
  3. En el Juego de biotecnología (10.4), los distractores son absurdos y la correcta suele ser la más larga.
  4. La animación del dogma presenta como «trozo real del gen» una secuencia que está modificada (intrón inventado y codón de parada añadido) sin decirlo en la página.
  5. «Homínido» se usa en un sentido que hoy es impreciso, y el listado de homínidos puede leerse como una escalera lineal.
  6. Lo que enseña `genetica.html` no cubre varias evidencias del DBA 9.4: multiplicación de probabilidades, diseño de experimentos tipo Mendel y trihíbrido. Tampoco cubre mutaciones cromosómicas (síndrome de Down, cariotipo), aunque el banco las pregunta.
- La biología de las páginas es, en general, correcta y bien matizada: Lamarck no está caricaturizado, se aclara que evolucionan las poblaciones y no se usa a Haeckel.

---

## 2. Hallazgos CRÍTICOS

Ninguno. No encontré errores de hecho que inviertan una respuesta, claves incorrectas ni preguntas con dos respuestas igualmente válidas.

Candidatos revisados y descartados:
- `genetica S18` (ARNm de AATGC) es ambiguo en la hebra, pero tiene una sola respuesta posible entre las opciones. Lo dejo como MEDIO (M-10).
- `genetica J16` («en las mitocondrias») no invalida la pregunta.

---

## 3. Hallazgos MEDIOS

### Páginas y animación

**M-1. «Trozo real del gen de la hemoglobina» no es real** (PROBABLE).
- Dónde: `genetica.html` L~336 («Avanza paso a paso con un trozo real del gen de la hemoglobina») y `dogma-anim.js` L10-12.
- Problema: el gen real empieza `ATGGTGCATCTGACTCCTGAGGAGAAGTCTGCC…`. La animación pone un intrón inventado de 6 letras (`GTATAG`) después del codón 3 y cierra con `TAA` tras `AAG`. El intrón real de la beta-globina está después del codón 30 y mide unas 130 bases. El gen de la sección «Mutaciones» (`CODIF` en `genetica.html`) también lleva `TAA` añadido.
- Solo está dicho en un comentario del código («simplificado»), no en la página.
- Corrección propuesta, en el recuadro `.dg-cred` y en la frase de L~336: «Secuencia simplificada: empieza como el gen de la beta-globina, pero con un intrón corto y un codón de parada añadidos para poder dibujarlo».

**M-2. Terminología «homínido»** (PROBABLE).
- Dónde: `evolucion.html` L~342 («aparecieron muchas especies de homínidos; hoy solo quedamos nosotros»), tabla `HOM`, J23, J32, J52, palabra HOMÍNIDO.
- Problema: en la taxonomía actual, Hominidae incluye también a chimpancés, gorilas y orangutanes, que viven hoy. Lo que describe la página son los «homininos» (el linaje humano). Con la definición moderna, «hoy solo quedamos nosotros» sería falso.
- Corrección: usar «homininos (la rama de nuestro linaje; muchos textos aún los llaman homínidos)» en la primera mención. Mantener la palabra «homínido» en el ahorcado, pero con la pista 2 «Los de nuestro linaje caminan en dos patas, a diferencia de…».

**M-3. La lista de homínidos se lee como una escalera** (PROBABLE).
- Dónde: `evolucion.html` L~342-346 y el JS `HOM`.
- Problema: seis botones en orden cronológico y una barra de cerebro creciente sugieren «evolución = progreso lineal» y que los neandertales son antepasados nuestros. La propia barra contradice la escalera (neandertal 1450 cm³ > sapiens 1350 cm³) y no se comenta.
- Corrección: añadir debajo un recuadro `.dato ojo`: «No es una escalera ni una fila: es un arbusto. Varias especies vivieron al mismo tiempo (neandertales y sapiens se cruzaron). Lucy, habilis y erectus no son «etapas» de un mismo camino. La evolución no tiene meta».

**M-4. Falta definir «teoría científica»** (PROBABLE).
- Dónde: `evolucion.html` L~260 («La evolución no es una simple opinión») y la sección 02.
- Problema: la página usa «teoría» y «hipótesis» sin definirlas. El error «una teoría es una suposición» solo se ataca en el Juego (J40, S36). Debería estar en la página, que es lo que el estudiante lee primero.
- Corrección: añadir a las palabras clave o a la sección 09 un recuadro: «En ciencia, una teoría es una explicación que muchas pruebas independientes han confirmado. Una hipótesis es una explicación que todavía se va a poner a prueba».

**M-5. Mal entendido «solo sobreviven los más fuertes»: no se previene** (PROBABLE).
- Dónde: `evolucion.html` sección 05-06.
- Problema: J38 y varias explicaciones usan «los mejor adaptados». Nunca se dice que lo que cuenta es dejar más descendencia, no la fuerza. Tampoco se dice que «mejor adaptado» depende del ambiente y puede cambiar.
- Corrección: en el recuadro `.clave` de la sección 06, añadir: «No sobreviven «los más fuertes», sino los que dejan más hijos en ese ambiente. Si el ambiente cambia, cambia quién tiene ventaja».

**M-6. Falta prevenir «dominante = más común»** (PROBABLE).
- Dónde: `genetica.html` sección 01 (flip «Dominante y recesivo»).
- Corrección: añadir al reverso: «Dominante no significa más frecuente ni mejor: solo indica qué alelo se ve cuando hay uno de cada uno. Hay rasgos dominantes poco comunes (como tener un dedo de más) y recesivos muy comunes (como la sangre O)».

**M-7. El chequeo de bioética se contradice con la propia sección** (SEGURO).
- Dónde: `genetica.html` L397 y J64.
- Problema: la opción «¿Cuánto cuesta cada edición?» se marca como «pregunta económica, no bioética». Pero la tarjeta «Terapia génica y CRISPR» y el «lente social» de la misma página tratan el costo y el acceso como preguntas éticas («¿quién podrá pagarla?»). S58 las acepta como social.
- Corrección: cambiar el distractor por «¿Cuántas horas tarda el procedimiento?» (en el chequeo) y «¿Cuántos gramos de ADN se necesitan?» (en J64).

**M-8. Casi la mitad de los chequeos de las páginas delatan la correcta por ser la más larga** (SEGURO).
- Chequeos donde la correcta mide cerca del doble o más que las demás:
  - `genetica.html` L179 (48 contra 25/25), L341 (62 contra 31/49), L376 (72 contra 24/32), L397 (44 contra 31/28).
  - `evolucion.html` L111 (71 contra 27/40), L129 (83 contra 50/32), L207 (106 contra 67/64), L252, L291, L304 (72 contra 40/44), L327 (89 contra 56/51).
- Corrección: acortar la correcta o alargar los distractores. Ejemplo para L207: «Había jirafas de cuello largo y corto, y las largas dejaron más crías».

**M-9. Contenido que sobrepasa el DBA y no está marcado** (PROBABLE).
- Dónde: `genetica.html` chequeo L345 (primasa, cebador de ARN) y J52.
- Problema: es profundización de 10.°-11.° (tema de replicación) pero aparece como chequeo de la sección 10, dentro de un módulo de 9.°. La animación sí marca la replicación con `.nivel-prof`; el chequeo no.
- Corrección: poner el `.nivel-prof` en ese chequeo, o cambiar la pregunta por: «¿Qué enzima une los nucleótidos nuevos durante la replicación?» (ADN polimerasa).

### DBA: cobertura y nivel

**M-10. `genetica S18` ambiguo en la hebra** (PROBABLE).
- Texto: «Una cadena de ADN es A A T G C. ¿Qué ARN mensajero se forma a partir de ella?». La clave es UUACG (complementaria), correcta solo si la hebra dada es la molde.
- Si fuera la codificante, el ARNm sería AAUGC, que no aparece en las opciones.
- Corrección: «Una cadena **molde** de ADN es A A T G C…». Lo mismo para A63: «(la cadena que te da el docente es la molde)».

**M-11. Fallan evidencias del DBA 9.4 en las páginas** (SEGURO). Detalle en la sección 5.
- No hay regla de probabilidades (multiplicar y sumar). Solo hay cuadro de Punnett.
- No hay trihíbrido (el ejemplo oficial es TtAaLl × ttaall).
- No hay cruce de prueba como actividad (solo se menciona en J3, S41).
- No hay «diseña experiencias que demuestren las leyes de Mendel».
- La sección 05 «Meiosis y Mendel» es solo un recuadro y un enlace.
- Las fuentes de variabilidad entre hermanos (entrecruzamiento, fecundación) están solo en `evolucion.html` sección 14, no en genética.

**M-12. Preguntas de mutaciones cromosómicas sin contenido en la página** (SEGURO).
- J38 (síndrome de Down), A36 (cariotipo) y S27/J31 hablan de cromosomas.
- `genetica.html` no trata trisomías, cariotipos ni mutaciones cromosómicas. Solo hay mutaciones de una base y de marco de lectura.
- Corrección: agregar una tarjeta en la sección 11 «Mutaciones» con las tres categorías (génicas, cromosómicas, y a veces genómicas) y el ejemplo de Down. Si no, eliminar J38 y A36 de este tema. No pude verificar si `division.html` lo cubre.

**M-13. Los DBA 9.5 y 9.6 piden «argumenta la influencia de las mutaciones en la selección»** (PROBABLE).
- La página cubre la idea en sección 14 («Profundización 10.°-11.°») y en el recuadro de las polillas. Pero la sección 14 está marcada como profundización, y esa evidencia pertenece a 9.°.
- Corrección: quitar el `.nivel-prof` del párrafo de fuentes de variabilidad (mutaciones, entrecruzamiento, fecundación). Dejarlo solo en la deriva genética.

### Preguntas

**M-14. Etiquetas `dba`/`curso` inconsistentes** (SEGURO). Ver sección 6 completa.

**M-15. Duplicados de enunciado o de contenido** (SEGURO). Ver sección 7.

**M-16. Distractores absurdos en el Juego de biotecnología (10.4) y en algunos Saber** (SEGURO).
- Ejemplos: J61 (microscopio, vacuna, fertilizante), J66 («que se vuelvan animales»), J67, J69 («más ADN», «no necesita sol»), J71 («el color del ADN», «el tamaño del tubo», «la temperatura de la sala»), S57 («el color del tubo de ensayo»), S58 («quién inventó el microscopio»), S55 («cambiar el sexo y el color de ojos»).
- Efecto: el estudiante acierta sin saber, así que la pregunta no mide nada.
- Corrección sugerida:
  - J71: «El costo del secuenciador / El tamaño de la muestra / La rapidez del resultado».
  - S58: «¿Quién puede pagar el tratamiento? / ¿Cómo se conserva la muestra? / ¿Cuánto demora el estudio? / ¿Cuántas muestras se necesitan?».

**M-17. Correcta más larga en el Juego** (SEGURO; confirmado con el cribado). Rescribir con opciones de largo parecido:
- Genética: J24, J26, J27, J37, J38, J51 (48 contra 33), J52, J54 (56 contra 31), J55, J56, J58, J59, J60, J61 (43 contra 15), J70, J80, J83 (49 contra 31).
- Evolución: J32, J55, J66, J68, J70, J71, J79, J81 (60 contra 30), J84.
- Ejemplos:
  - J54: «Usar seres vivos para obtener productos útiles» / «Estudiar solo los virus del suelo» / «Construir máquinas con metales» / «Mirar células con el microscopio».
  - J61: «Una herramienta que corta el ADN» / «Un microscopio muy potente» / «Una vacuna contra virus» / «Un abono para cultivos».
  - J51: «Lleva la receta del gen al ribosoma» / «Copia el ADN antes de dividirse» / «Trae aminoácidos al ribosoma» / «Forma la pared de la célula».

**M-18. VF sin pistas** (SEGURO). Contra la regla de 2 pistas por pregunta (CLAUDE.md).
- Genética: J4, J10, J19, J33, J43, J47, J50, J53.
- Evolución: J2, J12, J18, J28, J35, J40, J44, J47, J51, J54, J67, J69.
- Posiblemente sea por diseño del juego para los VF; si no, agregarlas.

**M-19. `J22` y `S28` («a América llegó hace 15 000 a 20 000 años»)** (DUDOSO).
- Hallazgos recientes (huellas de White Sands, 21 000 a 23 000 años) sugieren que la fecha es mayor y discutida.
- La página dice «más de 12 000 años» para Colombia, lo cual es coherente.
- Corrección: «hace más de 15 000 años (la fecha exacta se sigue discutiendo)». No pude verificar con búsqueda web.

**M-20. Archaeopteryx como «reptil y ave»** (PROBABLE).
- Dónde: S27 («Muestra rasgos de reptiles y de aves a la vez»), S50 («cola larga como un reptil»), J75 («Une a los reptiles con las aves»), palabra ARCHAEOPTERYX («Une reptiles y aves»).
- La página (L~275) dice correctamente «como un dinosaurio». Alinear las preguntas: «rasgos de dinosaurios y de aves».

**M-21. Datos del tab «ADN» mezclan métricas** (DUDOSO).
- Dónde: `evolucion.html` L~280 (select `mol-sel`).
- Humano contra chimpancé 98,8 %, gorila 98,3 %, gato 90 %, ratón 85 %, gallina 65 %, mosca 44 %, levadura 26 %.
- Son cifras de métricas distintas (secuencia alineada, regiones codificantes, genes con equivalente). La advertencia final ya lo reconoce.
- Contradicción visible con la pestaña vecina «Ancestro común»: ahí la levadura difiere en 44 de 104 aminoácidos del citocromo c (o sea, 58 % de parecido). Un estudiante verá «26 %» y «58 %» para el mismo par.
- Corrección: decir que las cifras de este selector son de **genes con equivalente**, y que el citocromo c es una proteína muy conservada, por eso su parecido es mayor.
- Sin una fuente citada no pude comprobar cada valor.

---

## 4. Hallazgos MENORES

Páginas:
1. `genetica.html` L~160: el inicio de la animación dice «Del gen a la proteína» pero la sección arriba pone el comentario `ARN Y REPLICACIÓN` y la sección 09 solo trata ARN. Es solo un comentario HTML; sin efecto.
2. `genetica.html` L~395: la línea de tiempo de `evolucion.html` dice «1865 Mendel»; J36 dice «en 1866 publicó». Las dos son defendibles (se presentó en 1865 y se publicó en 1866). Unificar: «presentó en 1865 y publicó en 1866».
3. `evolucion.html` TL: «2003 Proyecto Genoma Humano: se termina de leer la secuencia completa» contradice la tarjeta de `genetica.html` («casi todo el ADN», que es lo correcto: la secuencia completa se logró en 2022). Cambiar a «casi completa».
4. `evolucion.html` L~102 y TL: «vida apareció hace unos 3800 millones de años». La evidencia aceptada más antigua es de unos 3500 millones; entre 3700 y 3800 se discute. Escribir «entre 3500 y 3800 millones» o «al menos hace 3500». Afecta J14, el año de la Tierra y la fecha de marzo.
5. `evolucion.html` tabla de eras (Paleozoico): «En el Carbonífero, clima cálido y húmedo…». A fines del Carbonífero hubo una glaciación. Añadir «al principio» o «en los pantanos tropicales».
6. `evolucion.html` L~164 y L333: «más de 140 especies de *Espeletia*». El género *Espeletia* tiene unas 90 especies; las ~140 son de la subtribu Espeletiinae (frailejones en general), compartidas con Venezuela (DUDOSO: no pude consultar la fuente). Escribir «unas 140 especies de frailejones (subtribu Espeletiinae)».
7. `evolucion.html` L~167: «libélulas de 70 cm» (*Meganeura*): es un insecto afín a las libélulas, no una libélula actual. Decir «insectos parecidos a las libélulas, de unos 70 cm de envergadura».
8. `evolucion.html` L~239 «especiación… ya no se reproducen entre sí»: añadir «en condiciones naturales» (hay híbridos entre especies cercanas). Solo matiz.
9. `evolucion.html` tab ancestro común: `toLocaleString('es-CO')` muestra «1.000 millones», mientras que el resto de la página escribe «13 800» y «4600» con espacio o sin separador. Un estudiante podría leer «1.000» como 1. Unificar a «1 000».
10. `evolucion.html` sección 13: la selección sexual aparece como un tipo de selección igual a los otros tres, pero no es una curva de distribución. Añadir «la selección sexual es un caso especial: actúa sobre rasgos que ayudan a conseguir pareja».
11. `evolucion.html` L~342: «Muchos humanos actuales tenemos un poco de su ADN». Precisar: «las personas de fuera de África, entre 1 % y 2 %».
12. `evolucion.html` L~342: sobre *Homo habilis*, «fabricaba las primeras herramientas de piedra». Hay herramientas más antiguas (Lomekwi, 3,3 millones de años). Escribir «entre las primeras».
13. `genetica.html` sección «Dominancia incompleta»: la notación RR / BB / RB mezcla R (rojo) y B (blanco) como si fueran letras de otros genes. Es mejor la notación C^R C^R, C^B C^B. Opcional.
14. `genetica.html` L~384 (hortensia): «azules en suelos ácidos y rosadas en básicos» es correcto, y el ejemplo del ambiente está bien.
15. `dogma-anim.js`: no se indican los extremos 5′ y 3′. La animación es coherente con el sentido (ARN crece 5′→3′ de izquierda a derecha, molde en sentido contrario), pero el estudiante no lo ve. Añadir rótulos «5′» y «3′» o una nota en el paso 1 de transcripción. La replicación dibuja ambas cadenas copiándose en el mismo sentido y la helicasa abre todo el ADN antes de que empiece la polimerasa; el texto del paso 3 menciona los fragmentos de Okazaki. Aceptable como simplificación, pero conviene decirlo («en realidad solo se abre un tramo a la vez, la horquilla»).
16. `dogma-anim.js` anticodón escrito «UAC» y «CAC» en sentido 3′→5′ (alineado al codón). Es la convención de muchos textos; si se agregan 5′/3′, habría que escribirlos «CAU» y «CAC».
17. `dogma-anim.js` paso 5: «El ARNm puede leerse otra vez» sin explicar por qué (varios ribosomas). Opcional.
18. Mutación «sin sentido» (`genetica.html` `pintarMu`): si el usuario cambia el codón de parada `UAA` por otro, el programa lo clasifica como «cambio de sentido». En realidad es una mutación que elimina la parada. Es un caso límite y no afecta al flujo normal.
19. `genetica S20`: «¿Qué ayudó a descubrir esa imagen?» (ambiguo). Corrección: «¿Qué estructura ayudó a descubrir esa imagen?».
20. `genetica S34`: «las parejas de cromosomas se separan al azar» (ambiguo entre segregación e independencia). Corrección: «se reparten en los gametos de forma independiente».
21. `genetica J31`: la pista 1 «Son 23 parejas» ya revela 46. Corrección: «Los cromosomas vienen en parejas, una de cada progenitor».
22. `genetica J68`: la respuesta («Leer todo el ADN humano») repite el enunciado. Cambiar a «Descifrar la secuencia de bases del ADN humano».
23. Otros distractores débiles: `evolucion J34` («una glaciación causada por humanos»), `J59` («La creó Darwin»), `S14` y `S24` («Nada»), `S33`, `S20` («No tienen ADN»). `J89` usa «solo», que delata la falsedad.

---

## 5. Cobertura de los DBA

Leyenda: **Sí** / **Parcial** / **Falta**.

### 9.° DBA 4 (herencia mendeliana y post-mendeliana)

| Evidencia | Estado | Dónde / observación |
|---|---|---|
| Predice proporciones con probabilidades o Punnett | **Parcial** | Punnett completo (secciones 03, 04, 06). **No** hay multiplicación ni suma de probabilidades. |
| Explica cómo se transmite la información de padres a hijos y las causas de variabilidad entre hermanos | **Parcial** | Segregación y gametos en sección 02; A23, J34. La variabilidad (entrecruzamiento, fecundación, mutación) está en `evolucion.html` sección 14, no en genética. |
| Diseña experiencias que demuestren las leyes de Mendel y los resultados numéricos | **Falta** | Hay simulación de 4, 100, 8023 hijos y A5, S42, S45-S47, S66. No hay actividad de diseño propio. |
| Relaciona la meiosis con la 2.ª y 3.ª leyes | **Parcial** | Recuadro de la sección 05 + enlace a `division.html#meiosis`. J22, S34. Es corto. |
| Ejemplo oficial: cruce trihíbrido TtAaLl × ttaall | **Falta** | Solo dihíbrido (el selector incluye AaBb × aabb). No hay trihíbrido ni método de las ramas. |
| Post-mendeliana: dominancia incompleta, codominancia, ABO, ligada al sexo, poligénica | **Sí** | Sección 06. **Falta** el factor Rh. |

**Contenido a agregar (9.° DBA 4):**
- Un recuadro «Probabilidad sin cuadro»: P(aa) = ½ × ½ = ¼; P(A_ y B_) = ¾ × ¾ = 9/16; y su uso en un trihíbrido (P(TtAaLl × ttaall) = (½)³ por cada combinación).
- Una actividad «Diseña un cruce de prueba» con la pregunta «¿Cómo sabes si tu planta amarilla es AA o Aa?».
- Dos preguntas Saber con trihíbrido y con Rh.

### 9.° DBA 5 (expresión del ADN, genotipo-fenotipo, mutaciones)

| Evidencia | Estado | Dónde |
|---|---|---|
| Interpreta la estructura del ADN y la expresión; representa los pasos de la traducción | **Sí** | Secciones 08-10; animación de 16 pasos; tabla de códigos y simulador. |
| Relaciona la producción de proteínas con el fenotipo | **Sí** | Anemia falciforme, S74 (lactasa), A66. |
| Mecanismos de cambio en el ADN (mutación y otros) → proteínas → fenotipo → diversidad | **Parcial** | Mutaciones génicas bien tratadas. **Faltan** las cromosómicas (M-12) y que la mutación en células somáticas no se hereda (solo A27 pregunta). |
| Ejemplo oficial: insulina, secuencia → ARNm → aminoácidos con la tabla | **Sí** | Simulador de mutaciones y tabla; A63. Falta una actividad para estudiantes (no del docente). |

### 9.° DBA 6 (origen de las especies)

| Evidencia | Estado | Dónde |
|---|---|---|
| Evidencias del ancestro común y selección natural (distribución geográfica, fósiles, homologías, ADN) | **Sí** | Sección 09 con seis pestañas; ballenas; árbol interactivo; biogeografía. |
| Cómo actúa la selección ante una presión (clima) y su efecto en la variabilidad | **Sí** | Polillas, pinzones, tipos de selección. Falta un ejemplo de presión climática (el ejemplo es hollín y sequía en S26). |
| Mutaciones y selección natural, con evidencias | **Parcial** | Sección 14 y recuadro de polillas; S56 (mutación nueva ventajosa) y S29, S0. En la página no hay un ejemplo con datos reales (resistencia). |
| Procesos de transformación en cada era geológica | **Sí** | Tabla de eras con clima, vida y novedades; A45, J87. |
| Ejemplo oficial: gráfica de selección de escarabajos y predicción | **Parcial** | S46 y S62 tienen datos. Falta una gráfica de frecuencia de color por generaciones. |

### 10.° DBA 4 (biotecnología)

| Evidencia | Estado | Dónde |
|---|---|---|
| Describe técnicas (fertilización asistida, clonación reproductiva y terapéutica, modificación genética, terapias génicas) | **Sí** | Seis tarjetas de la sección 12; J54-J77. |
| Usos en salud, agricultura, producción energética y ambiente | **Parcial** | Salud y agricultura sí. **Energía y ambiente (biorremediación, biocombustibles) casi no**: solo A55. |
| Argumenta impactos bioéticos, legales, sociales y ambientales | **Sí** | Tres lentes; votación a favor/duda/en contra. Falta lo **legal** (Ley colombiana, prohibición de clonación humana; solo se menciona ICA y Protocolo de Cartagena). |

**Contenido a agregar (10.° DBA 4):** una tarjeta de biotecnología ambiental (bacterias que degradan petróleo, etanol de caña, biogás) y una de marco legal colombiano.

### Contenido por encima o por debajo del curso
- **Por encima (marcado correctamente):** replicación completa, procesamiento del ARNm, tipos de selección, deriva genética.
- **Por encima (sin marcar):** chequeo de primasa (M-9); detalles de la animación como poro nuclear y poli-A (paso 4 no marcado; poli-A está en el paso 7, sí marcado).
- **Por debajo / fuera de DBA:** Big Bang, panspermia, Miller y Urey, extinciones, astronomía (J66, J67, S40, S41, J57-J62). No tienen DBA de biología. Se etiquetan 9.6 con curso 7 (ver sección 6). Conviene dejarlos como contexto del tema, con `dba` 9.6 y curso 9.

---

## 6. Etiquetas `dba`/`curso` a corregir

Regla de partida: `genetica` tiene `def 9.4` y pasa a 9.5 si el enunciado o la correcta contienen palabras de ADN/ARN/proteína/mutación; pasa a 10.4 con palabras de biotecnología. Las preguntas `ord`, `vf`, `esc` no tienen `correcta` textual en el volcado, por eso la regla no las detecta.

### 6.1 DBA y curso contradictorios (dba 10.4 con curso 9)
| id | Ahora | Correcto |
|---|---|---|
| genetica J40 (prueba de ADN y paternidad) | 10.4 / c9 | 10.4 / c10 |
| genetica S27 | 10.4 / c9 | 10.4 / c10 |
| genetica A26, A46, A47 | 10.4 / c9 | 10.4 / c10 |

### 6.2 DBA 9.6 con curso 7 (el DBA es de 9.°)
Escoger: o curso 9, o quitar el DBA 9.6. Recomiendo c9 y mantener 9.6.
| id | Tema |
|---|---|
| evolucion J34, J57, J58, J59, J60, J62, J66 | extinción, Miller-Urey, Oparin, panspermia, Pérmico, Redi-Pasteur, Big Bang |
| evolucion S40, S41 | Miller-Urey, Redi |
| evolucion A39 | evolución y extinción |

### 6.3 DBA mal asignado (cae por defecto en 9.4 y debería ser otro)
| id | Ahora | Correcto |
|---|---|---|
| genetica J13 (Foto 51), J15 (dogma, `ord`), J18 (falciforme), J27 (mutágeno), J35 no (ya 9.5) | 9.4 | **9.5** |
| genetica A8 (dogma central), A28 (radiación y cáncer) | 9.4 | **9.5** |
| genetica S21 (maíz Bt), S29 (insulina en bacterias), S30 (Dolly) | 9.4 | **10.4 / c10** |
| genetica S39 (mula y especie) | 9.4 | **9.6 / c9** |
| genetica A32 (empresas y ADN de trabajadores) | 9.5 | **10.4 / c10** |
| genetica A21 (pruebas de ADN), S38 | 9.5 | 10.4 / c10 (si se quiere seguir el DBA de biotecnología) |
| genetica A54 (mutaciones y evolución) | 9.5 | 9.6 |
| evolucion J24, S22, A13 (hipopótamos, invasoras) | 9.6 | **7.4** (ciclos y ecosistemas) o 11.5 (ambiente). No pertenecen a 9.6. |
| evolucion J50, A12 (endémicas), A28 | 9.6 | 11.5 (megadiversidad) |
| evolucion J15, J20, S3, S6, S15 con c10 | 9.6 / c10 | La especiación es del DBA 9.6 (c9). Solo la deriva genética es profundización (c10). Subir S3 y J15 a c9 si se quiere cubrir 9.6. |

### 6.3b Preguntas sin DBA claro
- evolucion J66, J67 (Big Bang, elementos en las estrellas): no corresponden a ningún DBA de biología (S40, S41 tampoco, aunque lindan con 9.6 por «origen de la vida»).
- genetica J25, S23, S43: se refieren a genealogías (DBA 9.4, sí), pero la genealogía no se menciona en el DBA; correcto.

---

## 7. Preguntas para eliminar o reescribir

### 7.1 Duplicadas o casi duplicadas (dejar una)

**Genética (Juego)**
- J28 / J55 / J74 («transgénico»): dejar J55.
- J29 / J58 (Dolly): dejar J58.
- J59 / J73 (clonación terapéutica): dejar J59.
- J18 / J83 (falciforme): dejar J83 (reescrita).
- J50 / J85 (el ambiente influye en el fenotipo): dejar J85.
- J51 / J81 (qué hace el ARNm) y J23.
- J7 / J8: no son duplicadas, solo parecidas (AB / O).

**Genética (Saber)**
- S17 / S71 (mutación silenciosa).
- S3 / S31 / S70 (falciforme).
- S13 / S69 (codones del fragmento AUG GCU UAA).
- S9 / S29 / S49 (insulina en bacterias).
- S50 / S9 (Bt y transgénico).
- S51 / S30 / S61 (Dolly).

**Genética (abiertas)**
- A1 / A19 (Punnett y estatura).
- A48 / A50 / A12 (mutación con ejemplo).
- A17 / A51 (transcripción y traducción).
- A2 / A13 / A42 / A59 (transgénicos en Colombia).
- A30 / A42 (qué es un transgénico).
- A41 / A60 (clonación).
- A55 / A37 (biotecnología y medicamentos).

**Evolución (Juego, bloque `n2` añadido en 2.57)**
- J6 / J72 (homólogos), J7 / J73 / J53 (análogos), J8 / J74 (coxis), J13 / J77 (chimpancé), J25 / J87 (eras), J29 / J79 (embriología), J30 / J86 (ADN), J44 / J85 (capas profundas), J51 / J88 (humanos y chimpancé), J18 / J54 / J92 (necesidad), J4 / J47 (poblaciones), J37 / J45 / J84 (mutación y variación), J28 / J93 (variación), J0 / J43 (Lamarck), J60 / J61 con página.
- Recomendación: no eliminarlas de golpe, porque la meta es 20 o más por DBA. Reescribir cada pareja para que pida algo distinto (por ejemplo, aplicar el concepto a un caso nuevo, como se hace en S45 y S66).

**Evolución (Saber)**
- S7 / S48 / S25 (análogos), S13 / S51 (coxis), S14 / S49 (embriones), S0 / S44 / S54 (antibióticos), S5 / S16 (maíz), S6 / S15 (deriva), S17 / S57 (ballenas), S3 / S60 (río y especiación).

**Evolución (abiertas)**
- A0 / A5, A2 / A3, A7 / A41, A33 / A44, A8 / A32, A9 / A35, A40 / A23.

### 7.2 Para reescribir por defectos de forma
- Correcta más larga o distractores absurdos: ver M-16 y M-17.
- `genetica S18`, `S20`, `S34`: ver M-10 y menores 19-20.
- `genetica J31` (pista que revela), `J68` (tautología).
- `evolucion S27`, `S50`, `J75`: reptil/dinosaurio.
- `evolucion A24` («Explica cómo se forma un fósil»): la página no lo enseña (solo define fósil). Añadir una frase en la pestaña Fósiles («un organismo muerto queda cubierto rápido por sedimento; con los siglos los minerales reemplazan sus partes duras») o cambiar la pregunta.
- `evolucion A37` (convergencia): la pestaña «Dónde viven» (cactus y euforbias) usa «analogía», no «convergencia». Agregar la palabra a esa tarjeta, ya que se pregunta en J41 y A37.
- `evolucion A28`, `A17`: piden investigar fuera del sitio. Es válido, pero conviene marcarlas como «investigación».
- `genetica J16`: aclarar «(en la célula eucariota, en el citoplasma)» o dejarla; las mitocondrias también tienen ribosomas, así que «En las mitocondrias» es un distractor discutible. Cambiarlo por «En el aparato de Golgi».

---

## 8. Lo que está bien

- **Contenido de las páginas**: sin errores de hecho en las fechas y cifras clave. Mendel 1822-1884 y 6022/2001 (suman 8023), Miescher 1869, Avery 1944, Chargaff 1950, Franklin 1952, Watson y Crick 1953, Dolly 1996, Genoma 2003, Big Bang 13 800, Tierra 4600, Penzias-Wilson 1965, Hubble 1929, Redi 1668, Pasteur 1862, Oparin 1924, Haldane 1929, Miller 1953, Álvarez 1980, Chicxulub (~180 km, 66 Ma), las cinco extinciones, Titanoboa, Monquirasaurus (2023), Pakicetus, Ambulocetus, hipopótamos.
- **El «año de la Tierra»** está bien calculado: recalculé cada fecha y coinciden (3800 Ma ≈ 5 de marzo, 540 Ma ≈ 18 de noviembre, 5 Ma ≈ 2:30 p. m. del 31 de diciembre, humanos a las 11:26 p. m.).
- **Citocromo c y fechas de divergencia**: las diferencias de la tabla clásica (0, 10, 13, 21, 44) y las edades (7, 95, 310, 430, 1000 Ma) son razonables y coinciden con las de las tablas clásicas y con TimeTree. Están marcadas como aproximadas.
- **Tabla de Kettlewell (S46)**: los números son los reales y los porcentajes de la explicación son correctos (12,5; 6,3; 25; 53).
- **Genética calculada**: Punnett, dihíbrido (16 casillas, 9:3:3:1), ABO, daltonismo (hijos, hijas y portadoras), pedigrí del albinismo (II-2 y II-3 con 1/3 AA, 2/3 Aa), histograma poligénico (binomial), tabla del código genético (los 64 codones), gen mutado (GAG→GUG en el índice 19), regla GT-AG del intrón, simulación de deriva (Wright-Fisher) y simulación de polillas. Todos son correctos. La paternidad S67 se resuelve como dice la clave.
- **Lamarck vs. Darwin**: se presenta con respeto («acertó en que las especies cambian; se equivocó en el mecanismo»). Se destaca que las poblaciones evolucionan, que no hay «necesidad» y que las mutaciones son al azar (J18, J54, J92, A16, A30).
- **Embriología**: evita el error de Haeckel («huella de un antepasado común», sin «recapitulación»).
- **Animación del dogma**: modelo coherente con la complementariedad, el sentido de lectura, la regla GT-AG, el cap y la cola poli-A, el sitio P y A, el enlace peptídico, el factor de liberación y el semiconservativo. La secuencia traduce a Met-Val-His-Leu-Thr-Pro-Glu-Glu-Lys-parada, como dice el texto.
- **Contexto colombiano**: Titanoboa, La Venta, frailejones, café Castillo, ICA y Protocolo de Cartagena, claveles, páramos, grupo sanguíneo O.
- **Principios de Mayer**: palabras clave al inicio, 9 chequeos en genética y 20 en evolución con explicación de cada error, contenido en pasos y pestañas. Los `data-ok` son correctos en los 20 chequeos.
- **Pistas**: ninguna pista de las 2 por pregunta revela la respuesta, salvo J31 (leve). Ninguna palabra del ahorcado repite otra ni supera 95 caracteres con su pista 1.

---

## 9. Limitaciones

- **No usé la búsqueda web**: la herramienta se cargó al final y decidí no usarla. Los datos externos que verifiqué los contrasté de memoria con fuentes conocidas. **No pude verificar con fuente**:
  - Porcentajes de ADN compartido del selector (M-21).
  - Número de especies de *Espeletia* y de Espeletiinae (menor 6).
  - «60 % de grupo O en Colombia».
  - Que en La Venta haya «cocodrilos» y «monos» de 13 Ma (sí los hay en la literatura, pero no lo consulté).
  - Fecha de llegada a América (M-19).
  - El nombre actual *Monquirasaurus boyacensis* (2023): lo reconozco, pero no lo comprobé en línea.
- **No abrí las páginas en Playwright**: audité el código y el contenido. No comprobé el aspecto visual, el comportamiento táctil ni la narración (`narracion.js`).
- **No audité las 40 «frases dudosas» del detective, ni las preguntas del laberinto, el crucigrama o la sopa**, porque no están en mi volcado. Tampoco la hoja de referencia «Código genético» ni `icfes-datos.js`.
- **Preguntas Saber**: el volcado excluye las preguntas oficiales del Icfes (`icfes-datos.js`). La etiqueta de competencia (`uso`, `exp`, `ind`) la calcula `saber-icfes.js`; la revisé solo por muestreo (todas me parecieron razonables).
- **No verifiqué `nivel-bio.js` ni los niveles del juego** (campo `niv`), solo `dba`/`curso`.
- **Duplicados**: el cribado automático usó similitud de palabras; los duplicados de contenido los encontré leyendo, así que puede faltar alguno.
- **Mapa de DBA en `dba-bio.js`**: el campo `ev` de DBA 9.4 lista solo una de las cuatro evidencias oficiales (faltan las otras tres) y el de 9.5, 9.6 y 10.4 está incompleto o vacío. No afecta a las preguntas, pero conviene completarlo con las evidencias del PDF.
