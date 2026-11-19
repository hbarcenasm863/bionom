# Informe de auditoría — Bloque A (Célula, Microscopio, División celular, Reinos)

Auditor: Claude. Fecha: 19-11-2026. Solo lectura; no se modificó el repositorio.
Confianza: SEGURO / PROBABLE / DUDOSO. Ubicación: página y línea de `/home/user/bionom/<pagina>.html`, o id de pregunta del JSON (`J`=Juego, `S`=Saber, `A`=abierta).

## 1. Resumen ejecutivo

- Revisé las 4 páginas completas (texto, scripts, 22 chequeos, simulaciones, `respiracion-anim.js`, `microlab.js`) y **todas** las preguntas: Juego 72+45+80, Saber 61+49+50, abiertas 44+40+40 y 46+40+40 palabras (≈ 650 elementos). Los `data-ok` de los 22 chequeos apuntan a la opción correcta; las 3 tablas/gráficas Saber que revisé coinciden con su respuesta.
- No encontré ninguna **clave de respuesta incorrecta** en Juego ni en Saber. El contenido científico es, en general, sólido y coherente (30–32 ATP bien usado en todas partes; hechos históricos correctos).
- Hallazgos: **2 críticos**, **24 medios**, **20 menores**.
- Lo más grave: (1) `division` S13 dice «La **fruta** de la fresa se propaga por estolones» (error de hecho); (2) `reinos.html` l.194 afirma que Colombia es primero del mundo en **mariposas** (las fuentes lo ubican segundo); (3) varias preguntas y palabras sobre temas **que la página no enseña** (líquenes, endémicas, citoesqueleto, mula/especie, descomponedores); (4) una analogía confusa en `celula.html` l.266 (atmósfera = membrana); (5) muchos `curso`/`dba` mal puestos (fase luminosa, cadena respiratoria y cuestiones de meiosis marcadas como 6.°).
- Patrón didáctico: en los chequeos y en muchas preguntas la opción correcta es la más larga y la única «elaborada»; varios vf del Juego no tienen pistas (29 de 197).

## 2. Hallazgos CRÍTICOS

| # | Ubicación | Problema y evidencia | Corrección | Conf. |
|---|---|---|---|---|
| C1 | `division` **S13** | Contexto: «La fruta de la fresa se propaga por estolones». Lo que se propaga por estolones es la **planta**, no el fruto; además la fresa es fruto accesorio. Induce un error de hecho. | «La planta de fresa se propaga por estolones (tallos que crecen sobre el suelo).» | SEGURO |
| C2 | `reinos.html` l.194 | «…el primero en especies de aves (más de 1900), de orquídeas (más de 4200) y de **mariposas**.» Las fuentes consultadas (Noticias Caracol, Min. Ambiente citado por El Tiempo, otras) lo ponen **primero en aves y orquídeas y segundo en mariposas** (≈3.272–3.642 spp.); solo una columna de opinión lo da primero. | «…el primero del mundo en especies de aves (más de 1900) y de orquídeas (más de 4200), y de los primeros en mariposas.» | PROBABLE (fuentes discrepan; no verifiqué contra SiB Colombia) |

## 3. Hallazgos MEDIOS

### 3.1 Páginas
- **M1. `celula.html` l.266 (analogía de la atmósfera).** «La atmósfera funciona un poco como una membrana… gases como el CO₂ y el metano no dejan salir todo el calor.» Mezcla permeabilidad selectiva (paso de sustancias) con efecto invernadero (retención de radiación infrarroja); un estudiante puede concluir que el efecto invernadero es «un filtro de gases». Propuesta: quitar el recuadro o reescribir: «Una membrana semipermeable deja pasar unas sustancias y otras no, como un colador. (No confundir con el efecto invernadero, que ocurre con la radiación y se verá en Ambiente).» — PROBABLE.
- **M2. Falta explícito «respirar ≠ respiración celular»** (`celula.html` §10, l.312–330). Solo A41 y la animación lo tocan. Error conceptual muy frecuente («la célula respira = pulmones»). Agregar un `.dato`: «Respirar (tomar aire con los pulmones) lleva el O₂ a las células; la respiración celular ocurre en las mitocondrias y es otra cosa.» — SEGURO (laguna).
- **M3. `celula.html` l.332–353 vs. DBA 7.3.** La comparación fotosíntesis–respiración (reactivos/productos) está bien (l.316–317), pero no hay ejercicio de «comparar» (tabla lado a lado o chequeo). Agregar chequeo: «¿Qué es reactivo en la fotosíntesis y producto en la respiración?» (CO₂/H₂O/glucosa/O₂). — SEGURO.
- **M4. `reinos.html` l.164 / NODO arq.** «No se conoce ninguna arquea que enferme a las personas.» Es la postura clásica; hay asociaciones (metanógenas en periodontitis) aún discutidas. Suavizar: «no se ha demostrado que ninguna arquea cause enfermedades graves en personas». — DUDOSO.
- **M5. `reinos.html` l.173 «Termófilas… a más de 80 °C».** Las termófilas viven desde ~45 °C; >80 °C son las hipertermófilas. Además, las arqueas en Paipa, Ruiz, Puracé, Manaure y Zipaquirá (l.177, NODO arq, RX arq, J8, S28, retos) son afirmaciones locales **que no pude verificar**. Sugerencia: «viven en aguas muy calientes, de más de 45 °C (algunas, más de 80 °C)» y citar el estudio fuente o redactar «en ambientes como las salinas de Manaure (microorganismos halófilos)». — PROBABLE/DUDOSO.
- **M6. `reinos.html` l.168 y MOD['7'].** «Euglenas: la mayoría son heterótrofos»; la euglena es mixótrofa (cloroplastos) y la propia página lo dice en RX.protozoa. Quitar «la mayoría son heterótrofos» o decir «muchos». — PROBABLE.
- **M7. `reinos.html` l.203 y J54.** «Papa criolla y pastusa… misma especie (Solanum tuberosum).» La criolla es *S. phureja* (hoy tratada como grupo Phureja de *S. tuberosum*): decir «grupos/variedades cultivadas de *S. tuberosum*». — DUDOSO.
- **M8. `reinos.html` l.201 y J53.** «Canis familiaris»: nombre desactualizado; hoy *Canis lupus familiaris* (o *Canis familiaris* aún aceptado por algunos). — PROBABLE (menor).
- **M9. Reino Animalia: NODO/R `animalia` «Pluricelulares, con tejidos»** con ejemplo «esponja de mar» (l. NODO y R): las esponjas **no tienen tejidos verdaderos**. Decir «casi todos con tejidos (las esponjas no tienen tejidos verdaderos)». — SEGURO.
- **M10. Historia de la clasificación (HC), `reinos.html`.** (a) 1866 Haeckel: su reino Protista incluía bacterias, algas, protozoos y hongos; la página dice «Plantae incluye hongos» en ese paso. (b) 1969: Monera ya la había propuesto Copeland (1938/1956); Whittaker lo adoptó. (c) 2015: «Con el ADN de miles de especies» simplifica (Ruggiero et al. es una clasificación de consenso con varios tipos de evidencia); «Lo usa el Catálogo de la Vida» **no pude verificar que siga vigente**. — PROBABLE/DUDOSO.
- **M11. TAX (`reinos.html`): «Filo: Magnoliophyta».** En plantas se usa «división»; Magnoliophyta/Magnoliopsida es nomenclatura antigua. Cambiar a «Tracheophyta (división Magnoliophyta)» o escribir «Filo/división». — PROBABLE.
- **M12. Modelo de reinos (regla de CLAUDE.md).** La fila «Dominio» de la escalera (TAX), el chequeo 0 («¿… Dominio?» y su `data-por`), **J0, J15, J33, J41, A2, A4** y la palabra DOMINIO se muestran aunque el docente elija «sin dominios» (solo J6, J47, J70, J71 llevan `d:1`). Además las opciones/distractores «Monera» y «Protista» (J2, J10, J43, J45, S0…) aparecen con 6 y 7 reinos, donde esos reinos ya no existen. Marcar con `d:1` o ajustar. — SEGURO (según la regla del proyecto).
- **M13. `reinos.html` definición «especie» (palabra clave, l.85 y J15/chequeo 0).** Solo se da el concepto biológico («crías fértiles»); no se avisa que no sirve para bacterias y organismos asexuales, justo los que esta página clasifica. Agregar una frase. — PROBABLE.
- **M14. Líquenes, endémicas, descomponedores, simbiosis: sin cobertura en la página.** `reinos.html` no menciona líquenes ni especies endémicas ni la mula/especie estéril, pero las evalúan J22, J38, S7, S9, S23, A15, A19, A21, A24, A39 y la palabra LIQUEN. Agregar una pestaña «Casos» en §08 o mover estas preguntas a Ecosistemas/Colombia. — SEGURO.
- **M15. `celula.html`: citoesqueleto** no se enseña (ORG no lo incluye) y lo evalúan J35, A36 y CITOESQUELETO; **cáscara de huevo y cutícula** (J53, J55, S40) tampoco aparecen en la página. Agregar organelo «Citoesqueleto» a ORG o reubicar las preguntas. — SEGURO.
- **M16. `division.html`: ciclo celular vs. texto.** l.75 «la división (fase M) es solo una pequeña parte» y l.162 «interfase ≈ 90 %» pero el anillo (CICLO) dibuja M = 50/360 = 14 % e interfase 86 %. Reducir el arco M (p. ej. 20°) o decir «cerca del 90 %… el dibujo la agranda para verla». — SEGURO.
- **M17. Microscopio: inconsistencia de tamaños.** `celula.html` ESC dice cebolla 100–200 µm; `microlab.js` l.174–175 («unos 250 µm… 170–360 µm») y su reto de medición. La epidermis de cebolla mide ~200–400 µm de largo y 50–100 µm de ancho. Unificar («unos 250 µm de largo»). También l.51: «con el objetivo de 10× el campo mide 1800 µm… enfoca a 100×» mezcla objetivo y aumento total; escribir «a 100 aumentos (objetivo 10×)». — SEGURO.
- **M18. `celula.html` chequeos 4, 6 y los de reinos (2,3,4,5,6):** la opción correcta es la más larga y/o la única detallada (ver sección 3.3). — SEGURO.

### 3.2 Preguntas (clave correcta, pero con problemas)
| Id | Problema | Corrección | Conf. |
|---|---|---|---|
| celula **J23** | «¿Qué gas libera la fase luminosa?»: «fase luminosa» es profundización de 10.° (como J24) pero está en curso 7. | curso 10 (o reformular «¿Qué gas libera la fotosíntesis?» y dejar 7). | SEGURO |
| celula **J35**, A36 | Pista 2 «combina célula y esqueleto» regala la palabra; tema no enseñado (M15). | Pista: «Son fibras de proteína dentro del citoplasma». | PROBABLE |
| celula **J38** | Pista 2 «Su nombre lo dice: láctica» y el enunciado ya contiene «láctica». | Pista: «Es el mismo compuesto que se acumula en el yogur». | SEGURO |
| celula **J64** | Pista 1 «Su nombre dice qué produce» (ATP sintasa → ATP). | «Es una proteína de la membrana interna que gira.» | SEGURO |
| celula **J25, J63, J69** | J25 y J63/J69 (cadena respiratoria; «dos CO₂ salen antes del ciclo») en curso 6. | J63 → 10; J69 → 10; J25 (30–32 ATP) → 8 o 10. | PROBABLE |
| celula **J53** | «La cutícula… es Impermeable»; explicación dice «casi impermeable». | «poco permeable al agua» o pregunta «¿Qué evita la pérdida de agua?». | PROBABLE |
| celula **J44** | Distractor «El metro» también es una unidad válida (ambiguo). | «¿Qué unidad es la más adecuada para medir una célula?» | PROBABLE |
| celula **S20** | Contexto usa soluciones de sal 0/5/10 %; el laboratorio de la página usa sacarosa en M. | Alinear o aclarar «sacarosa». | DUDOSO |
| celula **S26** | «¿Por qué siguen siendo eucariotas?»: respuesta «tienen organización eucariota» es vaga; el glóbulo rojo maduro no tiene organelos. | «Porque se formaron a partir de células con núcleo (eucariotas) que lo expulsaron». | DUDOSO |
| celula **S37** | «Raíz de zanahoria no es verde por falta de luz»: las raíces pueden tener cloroplastos si reciben luz. Aceptable, pero añadir «normalmente». | — | DUDOSO |
| celula **S42 / S9** | Correcta mucho más larga (78/41/52/56 en S0; 83/57/50/56 en S43). | Igualar largos. | SEGURO |
| division **S44** | «Médula ósea: 15 de cada 100 en mitosis» es un índice mitótico poco verosímil (típico 1–5 %). | «5 de cada 100». | DUDOSO |
| division **S47** | Levadura «a 40 °C no se dividió»: *S. cerevisiae* aún crece lento a 40 °C; además la levadura se divide por gemación. | Usar 45 °C. | DUDOSO |
| division **J30** | «Las bacterias se reproducen por meiosis» etiquetada 9.4/9 por la palabra «meiosis»; el concepto (bipartición) es 6.4/6. | Reetiquetar. | PROBABLE |
| division **J0** | Pista 1 «Son 23 parejas» deja calcular 46. | «Es un número par que se reparte en parejas». | PROBABLE |
| division **S45 y reinos S45** | reinos S45: 40 % vs 42 % — la opción 2 «confirman… creció más en la oscuridad» es defendible; la correcta depende de juzgar «diferencia pequeña». | Usar 40 % vs 70 % o preguntar «¿Qué falta para concluir?». | DUDOSO |
| reinos **J1** | La correcta es la única con «(en cursiva)» y la más larga: se delata. | Poner «(en cursiva)» en todas las opciones. | SEGURO |
| reinos **J2** | Pista 2 «Su nombre en latín significa precisamente “hongos”» regala la respuesta. | «No hacen fotosíntesis y absorben su alimento.» | SEGURO |
| reinos **J12** | Pista 2 («taxis y nomos») es casi la palabra. | «Estudia cómo se ordena la diversidad.» | PROBABLE |
| reinos **J7** | Pregunta de enlaces éter/éster para 6.° (es profundización); distractor «peptidoglucano como las plantas» contiene un error («las plantas no tienen peptidoglucano»). | curso 10; distractor «Pared con peptidoglucano». | PROBABLE |
| reinos **J26** | Explicación: «ponen huevos sin cáscara en el agua»; *Phyllobates terribilis* pone los huevos en tierra y el adulto lleva los renacuajos al agua. | «Los anfibios ponen huevos sin cáscara, por lo general en agua o sitios húmedos; en las ranas venenosas los padres llevan los renacuajos al agua». | PROBABLE |
| reinos **J17, J38, S9, A37, A21** | Biodiversidad/endemismo = DBA 11.5 (megadiversidad), no 6.5. | Ver sección 6. | PROBABLE |
| reinos **J31/S33/A33** | «Plasmodium… protista» es correcto en 5/6 reinos; con 7 reinos es Chromista (S33 ya se ajusta por `m`; J31 y A33 no). | Reformular «protozoo/protista» o marcar `m`. | PROBABLE |
| reinos **S10** | «Procariota a 90 °C → Archaea»: hay bacterias hipertermófilas (Aquifex, Thermotoga). Con «probablemente» es defendible. | Decir «sin núcleo, con membrana de enlaces éter». | DUDOSO |

### 3.3 Cribado de largo de la opción correcta (script)
- Chequeos de páginas: la correcta es la más larga (y por mucho) en celula 4, 6, 7; reinos 2, 3, 4, 5, 6; microscopio 1, 2.
- Juego/Saber con la correcta la más larga y ≥1,3× la segunda: celula J11, J24, S0, S5; division S3, S5, S8, S13, S19, S22, S40, S41, S48; reinos J1, J22, J28, J36, J68, J71, S6, S24, S26, S42, S43. En general la correcta es la más larga en 55–60 % de las mc (azar esperado ≈25 %).
- Distractores absurdos (se descartan sin saber): J11 «Se vuelven verdes», J46 «Helio/Metano», J58 «Más de 500», J28 «entra un virus a todas las células», S22 «Big Bang», S28 «Luz/Clorofila», reinos J35 vf, S35 «poner huevos mientras vuelan».

## 4. Hallazgos MENORES

1. `celula.html` l.388/J0: Hooke comparó con «celdas de un panal» (página) y «celdas de un monasterio» (explicación J0): unificar («celdillas, como las de un panal o las celdas de un monasterio»).
2. `celula.html` l.316: «Solo en organismos con clorofila»: cianobacterias y bacterias fotosintéticas usan clorofilas/bacterioclorofila; aclarar «con clorofila u otros pigmentos fotosintéticos».
3. `celula.html` l.201: «Procariotas hace 3500 millones; eucariotas 2000 millones» correcto, añadir «aprox.».
4. `celula.html` pre-claves: la definición de «ósmosis» («menos solutos hacia más») está bien pero sin «agua» en la frase inicial; ya lo aclara. OK.
5. `celula.html` priestley: CO₂ se muestra «0,0 %» (toFixed(1)) con 0,04 %; mostrar dos decimales.
6. `celula.html` hipótesis: HIP b y c tienen el mismo texto de retroalimentación.
7. `division.html` l.150: «el bebé tiene 47 cromosomas» (cierto en trisomía libre; ~4 % por translocación): añadir «casi siempre».
8. `division.html` Gen (CP): «información para una característica»; mejor «una proteína o una función».
9. `reinos.html` l.124: «Linneo inventó el sistema binomial»: «popularizó y sistematizó».
10. `reinos.html` termófila/halófila: «10 veces más sal que el mar» (≈8–10×): «unas 10 veces».
11. `microscopio` l.133–134: aceite «casi el mismo comportamiento que el vidrio» → «casi el mismo índice de refracción que el vidrio (la luz no se desvía)».
12. `microlab.js`: *Lactobacillus bulgaricus* es hoy *L. delbrueckii* subsp. *bulgaricus*.
13. División J9/J10 y celula/division: casi duplicadas por diseño; celula J26/division J39 (ordena fases de mitosis), celula J40/division J14 (para qué sirve la mitosis), celula J28/division J18 (cáncer), celula J27/division J5 (anafase). Si el juego mezcla temas, aparecen repetidas.
14. reinos J4/J57/J58, J59/J60, J9/J61: duplicadas **por modelo** (correcto), no es defecto.
15. Palabras fuera del tema: GEMELOS, INCLUSIÓN (division), ONCOLOGÍA, ANILLO/PLACA/SURCO/POLO (genéricas); CICLO, REPOSO.
16. Abiertas: division A35 («importancia de la regla ProMeAnaTe») es trivial; A37 («repartir un libro entre dos personas sin perder ninguna página») es una **analogía errónea** (en la mitosis se copia el libro y cada hija recibe uno completo); celula A33 («los hongos no hacen fotosíntesis aunque tengan pared celular») es un non sequitur; celula A4 pide «tres postulados» pero la página enseña cuatro; celula A24 (entrenar en altura) y A16 (manzana oscura) exigen contenido no enseñado; reinos A19/A39 casi iguales.
17. Pistas con inicial: reinos J19 «Empieza por M», J72 «Empieza por Eu», J73 «Proto», J31 «P»: aceptable como pista 2 pero casi regala.
18. 29 de 197 preguntas del Juego sin pistas (todas vf): celula J3, J8, J16, J27, J32, J41, J45, J48; division J23–J32, J34; reinos J5, J11, J16, J27, J35, J40, J44, J48, J52, J74. CLAUDE.md pide 2 pistas.
19. Saber celula J/S: 48 de 61 (y 48/49, 49/50) sin explicación en los datos del volcado; el Juego sí las tiene. Confirmar si es diseño.
20. División S20 (inclusión Down) y palabra INCLUSIÓN son de valores, no de biología; competencia «uso» no corresponde.

## 5. Cobertura de los DBA

| DBA / evidencia | Cobertura | Dónde | Falta / sugerencia |
|---|---|---|---|
| 6.° DBA 4 – Membrana y equilibrio interno; ósmosis y difusión con modelos | **Cubierta** | `celula.html` §07 (simulación de partículas), §08 (ósmosis), §09 (lab. papa); J11–12,18,20–21,37, S5, S27, S33, S42 | Falta nombrar «equilibrio interno/homeostasis» y 2–3 preguntas de difusión facilitada. |
| 6.° DBA 4 – Respiración celular y rol de la mitocondria | **Cubierta** | §10 (ecuaciones l.316–317, tabla comparativa), animación, ORG mitocondria | El nivel 6.° está solo en l.317 y en preguntas J5/J46; el resto es profundización. Añadir chequeo básico y aclarar «respirar ≠ respiración celular» (M2). |
| 6.° DBA 4 – Mitosis (modelos), regeneración y crecimiento | **Cubierta** | `division.html` §02–04; J14, J33, S9, S15, S30 | — |
| 6.° DBA 5 – Clasificar en dominios según tipo de célula (procariota, eucariota, animal, vegetal) | **Cubierta** | `celula.html` §05 + clasificador; `reinos.html` §04–05, retos; chequeos | La parte «relaciones de parentesco» está **parcial**: solo hongos–animales (J40) y arqueas–eucariotas (l.170). Falta un árbol de parentesco (se hace en `evolucion.html`). |
| 7.° DBA 3 – Comparar fotosíntesis y respiración (reactivos/productos) | **Cubierta/parcial** | `celula.html` §10 | Sin ejercicio de comparación (M3). |
| 7.° DBA 3 – Autótrofa/heterótrofa en cadenas tróficas | **Parcial** (fuera del bloque en gran parte) | tabla `celula.html` l.347–353, `reinos.html` NODO/R | Las cadenas tróficas son de Ecosistemas. |
| 9.° DBA 4 – Meiosis ↔ 2.ª y 3.ª leyes de Mendel | **Cubierta** | `division.html` §05, l.127–128, «Otra orientación» | No dice «segunda/tercera ley» por número. Añadirlo. |
| Profundización 10.° (glucólisis, Krebs, cadena, ATP sintasa) | Cubierta | §10 pestañas y animación | Marcada correctamente como «Profundización». |

Contenido por encima del curso: ATP/crestas/ATP sintasa (10.°, rotulado); enlaces éter (J7, 10.°); endosimbiosis (9.°); alelos y 2n/n en `division.html` (9.°, aparece desde el inicio de una página de 6.°).
Preguntas que habría que agregar: (a) 6.° — «¿Qué es la respiración celular y dónde ocurre?» básicas; (b) difusión facilitada (2); (c) 7.3 comparar fotosíntesis/respiración (3); (d) 6.5 «¿Qué diferencia a una célula animal de una vegetal?» a nivel de clasificación (2); (e) 9.4 «Segunda/tercera ley» con cruces (2).

## 6. Etiquetas `dba`/`curso` a corregir

| Id | Etiqueta actual | Propuesta |
|---|---|---|
| celula J23 | 7.3/7 | 7.3/10 (o reformular y dejar 7) |
| celula J63 | 6.4/6 | 6.4/10 |
| celula J69 | 6.4/6 | 6.4/10 |
| celula J25 | 6.4/6 | 6.4/8 (DUDOSO) |
| celula J28 | 6.4/6 | 6.4/9 (igual que division J18) |
| celula J54, S41 | 6.4/7 | 7.3/7 (tipos de nutrición) |
| celula J14, S6, S22, A15 | 6.4 / 7.3 | 6.4/9 (endosimbiosis no está en ningún DBA) |
| division J30 | 9.4/9 | 6.4/6 |
| division A6, A29, A33, A39 | 6.4/6 | 9.4/9 (hermanos, polen, 2n/n, fecundación) |
| division A36 | 9.4/9 | 6.4/6 |
| division S20, A11, palabra INCLUSIÓN | 9.4/9 | sin DBA de biología |
| reinos J7 | 6.5/6 | 6.5/10 |
| reinos J17, A37 | 6.5/6 | 11.5/11 |
| reinos J38, S9, A21 | 6.5/6 | 11.5/7 |
| reinos J22, S7, S23, A24, A19, A39 | 6.5/6 | 7.4/7 |
| reinos S42 | 6.5/6 | 10.4/10 (PCR) |
| reinos J56 (razas humanas) | 6.5/6 | 9.6/9 |

## 7. Preguntas para eliminar o reescribir

- **Reescribir:** division S13 (fruta/planta); reinos J1, J2, J12 (pistas o claves delatoras); celula J35, J38, J64 (pistas); division S44, S47 (datos poco verosímiles); reinos J26 (explicación); division A37 (analogía errónea); celula A33 (non sequitur); celula A4 (tres → cuatro postulados).
- **Reubicar/eliminar mientras la página no lo enseñe:** celula J35, A36, palabra CITOESQUELETO; J53, J55, S40 (cutícula/cáscara de huevo); reinos J22, S7, S23, A24, LIQUEN, J38, S9, A15, A21, A19, A39.
- **Eliminar por redundantes:** reinos A39 (≈ A19); palabras GEMELOS e INCLUSIÓN (fuera de tema); celula J26/division J39 (dejar una).

## 8. Lo que está bien

- Los 22 chequeos y sus `data-por` son correctos y explican cada error; Mayer cumplido (palabras clave en las 4 páginas, 3+ chequeos por módulo, párrafos < 80 palabras salvo tablas).
- Ciencia exacta en lo central: ósmosis (0,3 M ≈ 0,9 % NaCl, consistente), simulación de la papa coherente con su gráfica, historia de la teoría celular, mitosis/meiosis y sus conteos (2²³, 78→39, 8→4), ATP «30 a 32» y la animación de la respiración (6 CO₂, 26–28 ATP en la cadena) coherentes entre sí.
- Datos Saber verosímiles y coherentes con la respuesta (S42, S48 cubos de agar, S57, S59, S40, S47 reinos, división S48).
- Buen contexto colombiano (Manaure, páramo, manglares, rana dorada, kumis, chicha); aclaraciones sobre modelos de reinos bien explicadas; sin fórmulas con ramas entre paréntesis ni emojis problemáticos.

## 9. Limitaciones

- No verifiqué contra fuentes primarias: presencia de arqueas en Paipa/Ruiz/Puracé/Zipaquirá/Manaure; que el Catálogo de la Vida siga usando 7 reinos; cifras de aves/orquídeas (solo busqué mariposas); ubicación exacta de *Phyllobates terribilis*.
- Los datos volcados de Saber no traen `explicacion` ni marcas `m/d`; revisé `banco.js` y `docente-datos.js` para las marcas de modelo de reinos, pero no probé todas las combinaciones 5/6/7 con y sin dominios en el navegador.
- No renderizé las páginas con Playwright (solo extraje chequeos con él); la auditoría es de contenido, no visual.
- Los números de línea corresponden al estado actual del repositorio (19-11-2026).
