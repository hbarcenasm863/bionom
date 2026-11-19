# Informe de auditoría — Bloque B (ecosistemas, regiones/Colombia, ambiente)

Fecha: 19-11-2026. Solo lectura sobre /home/user/bionom. Confianza: SEGURO / PROBABLE / DUDOSO.
Ids de pregunta: `J` = Juego, `S` = Saber 11, `A` = abiertas, `P` = palabra (índice), con el tema entre paréntesis: (E) ecosistemas, (C) colombia, (M) ambiente.

---

## 1. Resumen ejecutivo

- Revisé las 3 páginas completas (1137 líneas, con su JavaScript) y las 660 piezas de banco de los 3 temas: Juego 220 (68+77+75), Saber 180 (58+70+52), abiertas 140 (54+46+40), palabras 120 (40 por tema). Las leí una por una; el cribado automático sirvió para longitud, duplicados y opciones repetidas.
- Hallazgos: **CRÍTICOS 4, MEDIOS 27, MENORES 24** (detalle abajo).
- Lo más grave:
  1. **S37 (E)** tiene la clave invertida: ninguna opción es correcta (el estudiante dibuja la flecha del zorro al conejo y la «respuesta correcta» describe la flecha bien hecha).
  2. **Las páginas no enseñan lo que el banco evalúa.** Hay conceptos que se evalúan y que no aparecen en ninguna de las 3 páginas: Acuerdo de París, economía circular, 3 R, microplásticos, sumidero de carbono, tiempo vs. clima, albedo, biomagnificación, especie clave, guardaparques, huella hídrica. Hay unas 35 preguntas (Juego, Saber y abiertas) sin base en el sitio.
  3. **Tabla de pisos térmicos con temperaturas incoherentes** (`regiones.html` L324-325): el páramo (3000-4700 m) dice «6 a 12 °C» y el nival «< 6 °C», pero la propia regla de 6 °C por 1000 m da 11,5 a 1,3 °C. El control deslizante muestra «1 °C (6 a 12 °C)».
  3b. **El simulador de CO₂ de `ambiente.html` (L190)** llama «Nivel actual (más de 420 ppm)» a cualquier valor entre 390 y 430 ppm.
  4. **Inventario de emisiones de Colombia** (59/31/7/3 %) es el del inventario anterior; el de 2014 da 55/34/6/4 y no lleva año ni fuente precisa.
  5. **Etiquetas `dba`/`curso` incoherentes**: DBA 11.5 (grado 11) con `curso` 7 en unas 150 preguntas. En el tema «colombia», el DBA 7.3 por defecto (redes tróficas) no describe nada de geografía ni de regiones.
- Sesgo de la clave: la opción correcta es la **más larga** en el 51 % (E), 62 % (C) y 53 % (M) de las de opción múltiple y Saber (lo esperado al azar es 25 %). Las opciones se barajan al jugar, así que no hay sesgo de posición.
- Los 17 chequeos de las páginas (6+6+5) tienen `data-ok` correcto y retroalimentación válida.

---

## 2. Hallazgos CRÍTICOS

**C1. S37 (E): clave invertida (SEGURO).**
- Texto: «Un estudiante dibuja la flecha de la cadena trófica del zorro al conejo. ¿Qué error cometió?». Marcada como correcta: «La flecha va del que es comido al que come».
- Problema: el estudiante dibujó la flecha del que come (zorro) al comido (conejo). Esa opción describe la flecha *bien* dibujada, no el error. La opción 2, «La flecha debe ir del que come al que es comido», enseña la regla al revés. Contradice J5 y la página (`ecosistemas.html` L107).
- Corrección (pegar):
  - Pregunta: «Un estudiante dibuja la flecha de la cadena trófica del zorro hacia el conejo. ¿Qué error cometió?»
  - Correcta: «La flecha debe ir del conejo (el comido) al zorro (el que come)».
  - Distractores: «La flecha está bien: va del que come al que es comido» / «En una cadena trófica no se usan flechas» / «El conejo es productor y debe ir al comienzo».

**C2. Contenido evaluado que el sitio no enseña (SEGURO, verificado con grep).**
- `ambiente.html` no contiene: Acuerdo de París (J23, J58, S21, A16), economía circular (J32, S9, A13), 3 R (J24, S34), plásticos y microplásticos (J25, S28, A26, P29, P30), sumidero de carbono (J36, A30, P31), tiempo vs. clima (J21, J54, A31), albedo (S36), huella hídrica (A36), Protocolo de Montreal y recuperación del ozono (J22, J52, S29; la página solo dice «CFC»), ni los criterios de efectos en la salud, salvo una mención de «dengue» (J31, S27, A19).
- `ecosistemas.html` no enseña: especie clave (A10), biomagnificación o bioacumulación (A22, A36, S36), compost (A29, P39), microbiota (A32, J37, P38), diseño experimental (A33), abejas y polinización como tema (J35, S34, A20). Tampoco enseña manglares como tema aparte (A37) ni sistemas de agricultura amigable (A35).
- `regiones.html` no tiene: guardaparques (A31), hipopótamos del Magdalena (A35, especie invasora), ecoturismo como tema (A37).
- Efecto: el estudiante que usa el sitio no puede responderlas. Corrección: agregar una tarjeta o pestaña corta por concepto (ver sección 5) o sacar esas preguntas.

**C3. Temperaturas de la tabla de pisos térmicos (SEGURO).**
- `regiones.html` L324: Páramo 3000-4700 m, «6 a 12 °C»; L325 Nival «< 6 °C». El mismo script (L343) calcula T = 29,5 − 0,006·altura, que da 11,5 °C a 3000 m y 1,3 °C a 4700 m. El panel muestra, por ejemplo, «4600 m · Páramo — Temperatura aprox.: 2 °C (6 a 12 °C)».
- Los otros pisos sí cuadran (templado 17,5-23,5; frío 11,5-17,5). Los datos de J8-J10, J42, S31 y S42 son coherentes con la regla, pero no con esa tabla.
- Corrección: Páramo «1 a 12 °C»; Nival «menos de 1 a 2 °C» (el nival suele definirse por temperatura media cercana o menor a 0-1,5 °C). La división real entre pisos varía según la clasificación Caldas-Lang; conviene decir «según la clasificación de Caldas-Lang».

**C4. Simulador de CO₂: rótulo «Nivel actual» mal puesto (SEGURO).**
- `ambiente.html` L190: `c<=430 ? '<b>Nivel actual</b> (más de 420 ppm)…'` cubre 390, 400, 410, 420 y 430. A 390 ppm (año 2010) dice «más de 420». Además `if(c>=420)marcarSeccion` es correcto, pero el texto no.
- Corrección: dividir en `c<=410 ? 'Nivel de 2010 a 2020 aprox.'` y `c<=430 ? 'Nivel actual (más de 420 ppm)…'`.

---

## 3. Hallazgos MEDIOS

### 3.1 Páginas (cifras, ciencia, didáctica)

M1. **Inventario de emisiones, `ambiente.html` L211 (PROBABLE).** Valores 59/31/7/3 % «aprox. (IDEAM)» sin año. Una búsqueda halló que el inventario IDEAM 2014 da AFOLU ≈ 55 %, energía ≈ 34 %, residuos ≈ 6 %, IPPU ≈ 4 % (cálculo propio sobre 239 244 Gg CO₂eq) y que el IDEAM ya publicó la serie 1990-2021, cuyos porcentajes no pude consultar. Poner «Inventario 2014 (IDEAM, 2018)» o actualizar con la serie 2021. La conclusión pedagógica (el uso del suelo es la primera fuente) se mantiene.

M2. **Niveles tróficos incoherentes entre secciones, `ecosistemas.html` L88 y L263-267 (SEGURO).** El jaguar y el águila arpía se muestran como «consumidores terciarios / superdepredadores», pero en la red comen herbívoros (danta, mono, guacamaya), o sea que serían consumidores secundarios. La anaconda come peces herbívoros, ranas y aves, y también queda en el nivel 2. El nivel trófico depende de lo que come el animal en cada cadena; los organismos omnívoros ocupan varios niveles.
- Añadir al `dato` L107: «El nivel trófico depende de a quién se come: el jaguar es consumidor secundario cuando come dantas y terciario cuando come caimanes que comieron peces».
- Y cambiar L88 a: «Grandes depredadores que se comen a otros carnívoros (por ejemplo, el águila de páramo de la cadena de abajo)».
- Cambiar la etiqueta de la fila 3 de la red por «Superdepredadores (en la cima)».

M3. **Red trófica sin descomponedores (L250-266) (SEGURO).** El error conceptual «los descomponedores no son parte de la red» no se previene: no hay un nodo de hongos o bacterias con flechas desde todos los demás. Agregar el nodo «🍄 Hongos y bacterias (descomponedores)» con flechas desde todos (puede dibujarse aparte, con una nota).

M4. **«Peces pequeños: herbívoros de los ríos» (L258) (PROBABLE).** Muchos peces pequeños amazónicos son omnívoros o insectívoros. Cambiar a «Peces pequeños: comen plantas, algas y restos» o clasificarlos como omnívoros.

M5. **`ecosistemas.html` L211: la barra «Siguiente →» está en la mitad de la sección 09 (SEGURO).** La sucesión ecológica (L212-224) queda después de los botones de navegación y no está en la tabla de contenido (L58-68). Mover el `.sig` al final y añadir «🌱 Sucesión» al toc.

M6. **Pirámide de energía (L112, L317) (PROBABLE).**
- Se usa «kcal» sin área ni tiempo (la unidad correcta es kcal/m²/año). Con un control de 1000-100 000 kcal no hay problema para el curso, pero conviene decirlo.
- «Cerca del 10 %» se presenta como regla exacta; la eficiencia real va de 5 a 20 %.
- Corrección: «cerca del 10 % (entre 5 y 20 %, según el ecosistema)».

M7. **«Toda la energía del ecosistema entra por ellos» (L85) (PROBABLE).** Excepto la quimiosíntesis (respiraderos hidrotermales). Es aceptable para 7.°; poner «casi toda».

M8. **Retamo espinoso: «no tenía depredadores» (`ecosistemas.html` L210, J19, S7) (SEGURO en la terminología).** Es una planta; lo que le falta son *herbívoros y enemigos naturales*. Corregir en L210 y en la pista 2 de J19.

M9. **Ciclo del carbono: océano (L335) (PROBABLE).** No menciona que el fitoplancton marino también fija CO₂ (J35 y S35 hablan de él). Agregar a «Océanos»: «El fitoplancton también hace fotosíntesis y absorbe CO₂».

M10. **Suelos amazónicos (L159, J57, S41) (PROBABLE).** Se generaliza «los suelos amazónicos son pobres». Los suelos de várzea (aluviales) son fértiles y existen las terra preta. Decir «la mayoría de los suelos de tierra firme». J57 (vf «son muy fértiles») sigue siendo falsa en general.

M11. **`regiones.html` L250 (LUG): Caño Cristales clasificado como «sabana» (PROBABLE).** Es un río de la serranía de la Macarena (escudo guayanés, transición Andes-Orinoquía-Amazonía), no una sabana. Con el filtro «Sabana» el estudiante ve como sabana un río de roca. Reclasificar como `humedal`/río o agregar un ecosistema «río de serranía».

M12. **Reto del mapa: «¿Dónde está Caño Cristales?» → solo Orinoquía (L355) (DUDOSO).** La Macarena también se considera de transición con la Amazonía. Aceptable, pero J3 dice «entre los Andes, la Orinoquía y la Amazonía»; incluir en la explicación del reto que se cuenta como Orinoquía.

M13. **Visión sistémica incompleta (11.5) (SEGURO).** El DBA pide visión «económico, social, ambiental y cultural». La sección 06 de `regiones.html` tiene tarjetas social, ambiental y cultural, pero falta la económica (ecoturismo, servicios del agua, empleo, costo de la deforestación). Sin ella, S64 y A45 no tienen base. Agregar tarjeta «💰 Económica».

M14. **Calculadora de huella (`ambiente.html` L262-279) (SEGURO).**
- No es una calculadora: es un cuestionario de hábitos 0-3, sin factores de emisión ni fuentes (sin kg CO₂ por kilómetro, por kilo de carne, etc.). El texto dice «Calcula tu huella de carbono» y el resultado «Tu huella es baja/media/alta». Es engañoso; se arregla renombrando a «Mis hábitos y mi huella» o agregando factores reales (p. ej., carne de res ≈ 27 kg CO₂e/kg; Poore y Nemecek, 2018, *Science*).
- Todas las preguntas pesan igual (la ducha de 20 min pesa lo mismo que ir en carro).
- La pregunta 3 (ultraprocesados) tiene poca relación directa con el carbono; la 1 (cómo vas al colegio) depende de la familia y no del estudiante: puede estigmatizar («tu huella es alta»). Falta electricidad, gas de cocina y viajes en avión.
- Mejor retroalimentación: «hábitos de bajo/alto impacto», y decir que la huella de un hogar depende de decisiones familiares y de ciudad.

M15. **Clasificador de acciones (L289-296) (SEGURO, ambigüedad).** «Restaurar manglares…» solo se acepta como mitigación, pero su `exp` reconoce «¡también sirve para adaptarse!». Un estudiante que elige «Adaptación» es marcado incorrecto con razón válida. Quitar la ficha o dejar claro que acepta dos cajas.
- «Seguros de cosecha» como resiliencia (L295) y «Planes de emergencia» como resiliencia: la frontera adaptación/resiliencia es difusa para este grado. Mejor tres cajas con ejemplos inequívocos.

M16. **Equilibrio vs. observado en el simulador de CO₂ (L188) (PROBABLE).** `dt = 3·log₂(c/280)` es calentamiento de equilibrio (sensibilidad ≈ 3 °C por duplicación). A 424 ppm muestra «+1,8 °C» mientras J35 dice que el aumento actual es ≈ 1,2 °C: el estudiante verá una contradicción. Agregar: «El aumento ya medido (1,2 °C) es menor porque el océano tarda décadas en calentarse». Además el texto rojo «Por encima de 1,5 °C… pérdida de casi todos los corales» aparece desde 400 ppm: IPCC habla de 70-90 % de pérdida de arrecifes a 1,5 °C y 99 % a 2 °C. Cambiar «casi todos» por «la gran mayoría» y añadir acciones («aún depende de lo que hagamos») para evitar catastrofismo.

M17. **El Niño, Colombia (L99, L239) (PROBABLE).** Dice «menos lluvias en las regiones Andina y Caribe», correcto, pero «El Niño» no se asocia con más lluvia en el Pacífico/Orinoquía ni se advierte que los efectos cambian por región. Es un detalle; está bien para el grado.

M18. **Falta una sección sobre agua y uso responsable (7.4, evidencia 4) (SEGURO).** Solo hay «ducha de 5 minutos» (L268-274). Las abiertas A41/A47 piden acciones de uso responsable del agua y no hay contenido. Ver sección 5.

M19. **El ciclo del nitrógeno no menciona amonificación por nombre ni el papel de las actividades humanas más allá de fertilizantes (L345-351) (DUDOSO).** Suficiente para 7.°.

### 3.2 Preguntas: clave, ambigüedad, nivel, pistas

M20. **S51 (M) — datos con variable de confusión (PROBABLE).** Bosque 500 árboles = 410 ppm; avenida con tráfico y 5 árboles = 450 ppm. La conclusión «donde hay más árboles hay menos CO₂» mezcla árboles y tráfico. Quitar «con tráfico» o poner una avenida sin tráfico, o cambiar la pregunta por «¿qué diferencia hay entre los sitios?».

M21. **J56 (E) y S42 (E) — curso mal puesto (SEGURO).** La segunda ley de la termodinámica está marcada como profundización 10.°-11.° en la propia página (L125-130) pero las preguntas tienen `curso` 7. Poner `curso:10` (el DBA queda 7.3). J56 además tiene distractores flojos («No pasa nada», «Se crea energía»).

M22. **J3 (C) y J17 (C): la pista 2 revela la respuesta (SEGURO).**
- J3: pista 1 «Está en el departamento del Meta» → la respuesta incluye «(Meta)». Sustituir por «Es una serranía en el límite entre los Andes y los Llanos».
- J17: pista 2 «Tiene montañas de paredes verticales y miles de dibujos antiguos» ≈ «tepuyes y pinturas rupestres». Sustituir por «Es un parque de la Amazonía, entre Caquetá y Guaviare» (la pista 1 ya dice eso: pasar a una pista nueva como «Es Patrimonio Mixto de la Humanidad»).
- J17 (E): pista 2 «Es un mamífero rosado de río» entrega la respuesta. Dejar «Vive en agua dulce y es un mamífero».
- J2 (M): pista 2 «Tiene que ver con tumbar bosques y con las vacas» repite casi literal la opción correcta; J0 (M) pista 2 también.
- J46 (E): «Es la condensación» y «Están en el cielo»: reveladoras.
- J53 (M) pista «Ocurre sobre todo en la Amazonía. Tiene que ver con talar bosques.»

M23. **J3 (M) pista 1 dice «bacterias del estómago de la vaca» (SEGURO).** La explicación y la página (L85) dicen *arqueas*. J56 (M) pista 1 «bacterias sin oxígeno» también. Cambiar por «microorganismos (arqueas) del estómago».

M24. **J5 (C) — enunciado mal planteado (SEGURO).** «El bosque seco tropical es muy importante porque: ya casi no queda…» mezcla importancia con amenaza. Propuesta: «¿Por qué el bosque seco tropical es uno de los ecosistemas más amenazados?» → «Porque casi todo se convirtió en potreros, cultivos y ciudades» (distractores: «Porque tiene nieve…», «Porque la sequía lo mató», «Porque cubre más de la mitad del país»).

M25. **Cifras inconsistentes entre preguntas y páginas (PROBABLE).**
- J7 (E…C) y J51 (C): palma de cera «más de 60 metros»; `regiones.html` L236 dice «más de 50 m». La más alta registrada es ≈ 60 m. Decir «hasta 60 m» en todas partes.
- J30 (C): «segundo en plantas». El Ministerio de Ambiente (SiB Colombia) la pone tercera en plantas (primera en aves, orquídeas y mariposas; segunda en anfibios, peces dulceacuícolas, palmas y murciélagos; sexta en mamíferos; séptima en reptiles). La fuente de la página (Humboldt 2024) coincide con ese listado; corregir J30 a «primero en aves, orquídeas y mariposas y segundo en anfibios».
- J29 (C): «2000 a 3000 m» frente a `regiones.html` L213 «entre 1000 y 3000 m» y pisos: la altura del bosque de niebla depende de la fuente; unificar.
- J58 «más de 1 900 aves» ✓; J59 «más de 4 200 orquídeas» ✓ (SiB: ≈ 4 270).

M26. **Distribución de nivel (`curso`) engañosa en C y M (SEGURO).**
- Con 51 preguntas del Juego de C y 47 de M marcadas como curso 11 se esperaría contenido de análisis; muchas son recuerdo muy básico (J57 «¿Qué significa megadiverso?», J67 «El tráfico de fauna consiste en…», J61 «mercurio», J41 (M) «¿Qué gas emiten los carros?»). A la vez, 33 (C) y 111 (M) piezas tienen `dba` 11.5 pero `curso` 7. El docente que filtra por 11.° recibe preguntas de 6.°, y el filtro por DBA 11.5 en 7.° trae preguntas de grado 11. Ver sección 6.

M27. **Opciones de largo desigual (SEGURO, regla del proyecto).** La correcta es la más larga y supera 1,3× el promedio de las demás en 17 (E), 28 (C) y 17 (M) preguntas. Las más graves: S43 (E) (112 vs. 72 caracteres), S43 (C) (122 vs. 76), S41 (M) (129 vs. 82), J64 (E) (26 vs. 4), J14 (E), J55 (E), J38 (C) (73 vs. 47), J69 (C), J0/J4/J41 (M) (18 vs. 7). Listado completo en sección 7.

M28. **Distractores inverosímiles (PROBABLE).** J23 (E) «artificial», J24 (E) «genética artificial», J56 (E), J2 (M) «quema de basura en las playas», J25 (M) «son comida para los peces y los engordan», J35 (C) «escapar de los tiburones blancos», S29 (C) «es una isla en el Pacífico», S7 (E) «productora nativa», S19 (M) «Más agua para siempre / Nada / Ríos más fríos para siempre», S22 (M) «No tienen efecto». Distractores absurdos dejan de medir comprensión.

M29. **Preguntas sin base científica estable (DUDOSO).**
- J13 (C): «Sierra Nevada de Santa Marta… 5775 m» y «picos Cristóbal Colón y Simón Bolívar» como máximos: la altura exacta se discute (existen mediciones recientes ligeramente menores). No pude verificarlo. Decir «cerca de 5700 m».
- J2 (C): «más de 10 000 mm al año» en Lloró: la cifra se cita con valores entre 8 000 y 13 000 mm según la serie; decir «cerca de 10 000 mm o más».
- S2 (C): camaroneras que talan manglar en el Pacífico: en Colombia son sobre todo del Caribe. No pude verificarlo; cambiar a «costa» sin océano.

M30. **Abiertas sin base en el sitio o demasiado exigentes (SEGURO).** A10 (E), A22 (E), A29 (E), A32 (E), A33 (E), A35 (E), A36 (E) — ver M? y C2; A24 (M), A26 (M), A36 (M), A31 (C), A35 (C), A37 (C). A24 (M) (flotar vs. tierra: «deshielo de glaciares sube el nivel del mar y el de los icebergs no») pide el principio de Arquímedes, no tratado en el sitio (nivel 10.° de física).

---

## 4. Hallazgos MENORES

m1. `ecosistemas.html` L88: «Grandes depredadores…» ver M2.
m2. L77, L123, L164, L168, L184, L188 (chequeos): la correcta es casi siempre la más larga; distractores con `data-por` bien redactados.
m3. J29 (M): «¿Qué gas, además del CO₂…?» → respuesta «Humo con monóxido de carbono y partículas». El humo no es un gas: «¿Qué contaminantes, además del CO₂…?».
m4. J11 (M): pista 1 «Hay dos tipos de acciones» pero la página enseña tres (mitigación, adaptación, resiliencia). Cambiar a «Hay varios tipos de acciones».
m5. J23/J58 (M): pista «Se firmó en una capital europea». El Acuerdo se adoptó en París (2015) y se abrió para firma en Nueva York (2016). Decir «Se adoptó».
m6. P33 (M) «PARÍS… Allí se firmó un acuerdo en 2015»: igual, «se aprobó».
m7. P11 EFECTO, P12 DIÓXIDO, P8 HUELLA (M): son fragmentos de palabras y su pista 3 define otro término. Cambiar por INVERNADERO (ya existe), «CO2», o palabras completas como «ATMÓSFERA» (ya existe), «TERMÓMETRO».
m8. P1 FRAILEJÓN (C): «Su nombre científico es Espeletia» → es un *género*; «Su género es Espeletia».
m9. P17 CARROÑERO y J (E): consistente. P4 DEPREDADOR/P22 DEPREDACIÓN (E) son tan parecidas que un ahorcado y un crucigrama puede confundirlas; revisar sus pistas.
m10. P17 CADENA y P18 RED (E): pista 3 idéntica «Se llama trófica».
m11. J11 (C): «Es la región más grande y menos poblada». La menos poblada en cifras absolutas es la Insular. «de menor densidad de población».
m12. J26 (C): dba 11.5 curso 7; ver sección 6.
m13. J33/J41 (C) casi duplicadas (región de La Guajira).
m14. Duplicadas o casi: ver sección 7.
m15. S45 (C), S42 (C): datos «se midió…» que no están marcados «datos de ejemplo» (los de S65, S66, S69 sí). Marcar.
m16. S51/S43 (E) repiten el mismo ciclo presa-depredador.
m17. `regiones.html` L166: «cerca del 70 % de la biodiversidad» y «17 países» ✓ (Mittermeier), pero «Colombia… menos del 1 % de la superficie del planeta»: la superficie terrestre es ≈ 0,77 %, correcto para *tierra*, no para el planeta entero (incluye océanos). Decir «de la superficie terrestre».
m18. `regiones.html` L212: «Colombia tiene cerca del 50 % de los páramos del mundo»: la cifra más citada es 50 % (otras fuentes dicen 36 % a 60 %). Aceptable; no pude verificar con una fuente única.
m19. L238 (LUG): Tatacoa «bosque seco muy erosionado» ✓; pero el filtro «Desierto» solo muestra La Guajira, lo que es consistente con L216.
m20. `regiones.html` L242: «De la playa a la nieve en 42 km» ✓.
m21. `ambiente.html` L116: «Las costas se erosionan: en el Caribe colombiano hay playas y casas que el mar ya se llevó». Es cierto en Córdoba, Sucre y Bolívar, pero no se atribuye solo al cambio climático (hay causas locales: dragado, mangle talado). Poner «en parte por».
m22. `ambiente.html` L134: «Calcula tu huella de carbono» (ver M14).
m23. J34 (M): comprar local reduce CO₂; matiz: el transporte es una parte pequeña de la huella de los alimentos (≈ 6 %, según Poore y Nemecek), lo que más pesa es qué se come (carne de res). La explicación dice «emiten menos CO₂» sin matiz. Añadir «aunque pesa más lo que comes que de dónde viene».
m24. S48 (M): gráfica de barras con eje que empieza en 300 ppm (`ymin`): exagera las diferencias. Está bien para ver aumentos si se advierte; añadir «el eje no empieza en cero».

---

## 5. Cobertura de los DBA

### 7.° DBA 3 (cadenas y redes tróficas, nutrición, fotosíntesis y respiración)

| Evidencia | Estado | Dónde |
|---|---|---|
| Explica tipos de nutrición autótrofa y heterótrofa en cadenas y redes | **Cubierta** | `ecosistemas.html` §02 pasos (productores, consumidores, descomponedores); cadena del páramo; red de la Amazonía. Falta usar las palabras «autótrofo/heterótrofo» en la red (solo en J1, P2). |
| Explica la fotosíntesis como construcción de materia orgánica a partir de energía solar, CO₂ y agua, y predice efectos en la atmósfera por la tala masiva | **Parcial** | §02 menciona fotosíntesis; §05 ciclo del carbono; `ambiente.html` §02 (deforestación libera CO₂). Falta la ecuación (reactivos y productos) y la predicción explícita sobre la composición del aire. `celula.html` la desarrolla; el enlace entre ambas no está. |
| Compara fotosíntesis y respiración celular (reactivos y productos) | **Parcial** | Solo dentro del ciclo del carbono (L335). S53, A40 lo piden. Agregar una tabla comparativa en §05. |
| Ejemplo oficial: dibuja una red trófica de su entorno y explica la eficiencia de transformación de materia y energía | **Parcial** | Red de la Amazonía y regla del 10 %. Falta una actividad con organismos locales; A0, A23 la piden. |

Contenido por debajo del curso: nada. Por encima de 7.°: la segunda ley de la termodinámica (marcada como 10.°-11.° en la página ✓, pero J56 y S42 conservan `curso` 7).

### 7.° DBA 4 (ciclos del carbono, nitrógeno y agua)

| Evidencia | Estado | Dónde |
|---|---|---|
| Relaciona ciclos del carbono y nitrógeno con el mantenimiento de los suelos | **Cubierta** | §05 y §06 (suelo, humus, leguminosas). |
| Explica con casos los efectos de la intervención humana (erosión, contaminación, deforestación) en los ciclos del suelo y del agua y propone acciones | **Cubierta a medias** | Erosión y Amazonía §06; eutrofización §05; tala→ciclo del agua en J62 y en «ríos voladores». Falta un caso de contaminación del agua por vertimientos/minería con acciones de remediación (está solo en `regiones.html` §06, mercurio). El caso de Tasco (trucha, 95 000 muertas) del ejemplo oficial no está. |
| Reconoce funciones de los microorganismos en los ciclos y su utilidad en la vida diaria | **Parcial** | Bacterias fijadoras y descomponedores sí; **utilidad en la vida diaria** (compost, yogur, tratamiento de aguas) no aparece (A53, J26 M, A29 lo piden). |
| Propone acciones de uso responsable del agua en casa, escuela y contextos cercanos | **FALTA** | No hay sección (solo «ducha de 5 minutos»). A41, A47, A52 las piden. |

### 11.° DBA 5 (cuestiones ambientales actuales)

| Evidencia | Estado | Dónde |
|---|---|---|
| Explica el calentamiento global, causas y acciones locales y globales | **Parcial a buena** | `ambiente.html` §01-§02 y §09. Locales ✓. Globales: falta el Acuerdo de París y las metas (J23, J58, S21, A16 lo evalúan), el Protocolo de Montreal y el papel de los gobiernos. |
| Implicaciones de ser «país megadiverso» (social, ambiental, cultural) | **Cubierta** | `regiones.html` §06 (tres tarjetas con exactamente esas tres dimensiones). |
| Argumenta con evidencias los efectos de contaminación, minería, ganadería, agricultura, carreteras y tala en la biodiversidad | **Cubierta, sin evidencias numéricas** | `regiones.html` §06 seis tarjetas desplegables. Falta una gráfica o dato (p. ej., hectáreas deforestadas por año, mercurio medido). Los Saber S65-S69 lo hacen con datos de ejemplo. |
| Diseña investigaciones con acciones individuales y colectivas para reconocer especies de su entorno y evitar tala, captura y maltrato | **FALTA** | No hay actividad de ciencia ciudadana ni de reconocimiento de especies locales. A13, A25, A39 la piden de forma abstracta. |
| Visión sistémica (económica, social, ambiental, cultural) | **Parcial** | Falta la dimensión económica (M13). |

### Qué agregar (prioridad)
1. En `ambiente.html`: tarjeta «Acuerdos y políticas» (Acuerdo de París, Montreal, metas de Colombia), «Residuos y plásticos» (3 R, economía circular, microplásticos, compost), «Sumideros de carbono», «Tiempo vs. clima».
2. En `ecosistemas.html`: tabla fotosíntesis vs. respiración; sección «Uso responsable del agua» con 5 acciones y cifras; microbios en la vida diaria (compost, yogur, plantas de tratamiento); caja «especie clave» y «biomagnificación» (el mercurio, ya mencionado en `regiones.html`).
3. En `regiones.html`: tarjeta económica en §06 y una actividad de ciencia ciudadana (inventario de especies del colegio con iNaturalist).
4. Si no se agrega el contenido, eliminar o reescribir las preguntas de la lista 7.

---

## 6. Etiquetas `dba`/`curso` a corregir

Regla de fondo detectada: `dba-bio.js` asigna el `curso` por palabras clave y el `dba` por otras reglas, y no siempre coinciden. Sugerencia: si la pregunta lleva `dba` 11.5, el `curso` debe ser 11; si es solo recuerdo básico, que no lleve 11.5.

**A. DBA con grado de 11 y `curso` menor (corregir o `curso:11`, o cambiar el DBA a «ninguno»).**
- (C): J5, J15, J17, J20, J21, J26, J38, J48 (11.5/7); S1, S3, S7, S15, S16, S18, S29, S30, S33, S36, S47 (11.5/7); A0, A6, A9, A10, A11, A13, A14, A17, A26, A30, A31, A39, A42, A43 (11.5/7). Total 33 en C.
- (M): J3-J10, J12, J13, J15, J16, J19, J21, J24-J29, J32-J34, J37-J39, J41, J43-J47, J49-J56, J59-J63 (todas 11.5/7); S0, S1, S3, S6, S7, S9, S11-S19, S22-S24, S26-S30, S32, S34-S37, S39-S42, S44, S47, S48 (11.5/7); A0, A1, A4, A6, A8-A14, A18, A20-A26, A29-A34, A36, A37 (11.5/7). Total 111 en M.
- Propuesta: dejarlas con DBA 11.5 y poner `curso:11` solo cuando requieran análisis (S8, S13, S20, S26, S45, S64, A0, A4, A27, A39). Las de recuerdo básico (J41, J59, J62, J63) pasar a «DBA 7.4/curso 7» (o ninguno).

**B. DBA equivocado por tema.**
- (E): J21 (eutrofización) 7.3 → **7.4**. J27 (jaguar-chigüiro), J38 (estuario) y J39 (desierto, agua) están en 7.4 pero son 7.3 (relaciones/ecosistemas). S11 (jaguar) 7.4 → 7.3. S13 (descomposición de hojas) 7.4 → 7.3 (o 7.4 si se enfoca el ciclo de nutrientes; aceptable). S28 (orina concentrada) 7.4 → 7.3.
- (E): J20, J58, J64, S5, S15, S21, S56 (fijación de N) 7.4 ✓.
- (E): las preguntas de **relaciones entre especies, nicho, adaptaciones, poblaciones y sucesión** (J6-J8, J14, J19, J22-J25, J27-J28, J30, J32-J33, J36, J41, J45, J49, J51, J53, S1, S8-S9, S14, S19-S20, S22, S25, S27, S29-S30, S33, S38 y A9, A13, A15, A24, A31) quedan en 7.3, pero **ningún DBA 6.°-11.° las nombra**; viven en los Estándares Básicos (EBC), no en los DBA. Declararlo en `MATRIZ_DBA.md` en vez de forzar 7.3.
- (C): casi todo el banco geográfico (regiones, pisos térmicos, especies emblemáticas, J0-J4, J7-J12, J14, J16, J18-J19, J22-J25, J27-J29, J31-J36, J39-J47, J49-J56 y sus S/A equivalentes) está etiquetado **7.3 (redes tróficas)**, que no corresponde. Son contenido de geografía ecológica sin DBA de biología. Si el docente exige un DBA, lo más cercano es **11.5** (biodiversidad) para amenazas/endemismo/conservación y «ninguno» para ubicaciones.
- (C): J54-J56 (placas, istmo, Andes y especiación) → mejor 9.6 (evolución: especiación) para J56 y S41; J54-J55 «ninguno».
- (C): J49, S42, S50, J8-J10, J42, S1, S31 (pisos térmicos y temperatura) → «ninguno» (EBC); no son 7.3.
- (M): S31, S46, S50, S51 (7.4) ✓; J62 (E) ✓ 7.4; S46 (M) ✓ 7.4.
- (M): J2, J13, J18, J21 etc. 11.5 ✓.

**C. `curso` con grado demasiado alto o bajo.**
- J56 (E), S42 (E): `curso` 7 → **10** (profundización).
- (C): J57-J76 con `curso` 11 pero de contenido 6.°-7.° (recuerdo): J57, J58, J59, J60, J61, J62, J63, J64, J65, J66, J67, J68, J70, J71, J72, J73, J74, J75, J76 → `curso` 7.
- (M): J0, J14, J17, J20, J22, J23, J30, J31, J40, J54, J57, J58, J64 con `curso` 11 son de grado 7.° (J0, J14, J57, J64) o de 8.°-9.° (el resto): bajar a 7-9.
- (C) J30 (megadiverso, 11.5/11) ✓.

---

## 7. Preguntas para eliminar o reescribir

**Reescribir (clave o enunciado defectuoso):** S37 (E) (C1); J5 (C) (M24); J29 (M) (m3); J56 (E) (M21); S51 (M) (M20).

**Eliminar o convertir en contenido (sin base en el sitio, ver C2):**
- Evaluadas sin enseñanza: J23, J24, J25, J32, J33 (parte), J36, J21 (M), J22 (M), J52 (M), J54 (M); S9, S21, S28, S29, S34, S36 (M); A13, A16, A24, A26, A30, A31, A36 (M).
- (E): J35, J37, S34, S36, A10, A20, A22, A29, A32, A33, A35, A36, A37.
- (C): A31, A35, A37; J23 (E→C) está bien (tráfico sí aparece en regiones).

**Duplicadas o casi duplicadas (mantener una):**
- (E): J32 = J49 (hábitat); J22, J32, J49 (hábitat/nicho); J6 = J45 (mutualismo); J0 = J41 (biótico/abiótico); J11 = J43; J9 = J60 = S31 (transpiración); J10 = J61 (agua); J20 = J58 = S5 = S21 (fijación de N); J21 = J48 = S2 = S16 = S57 (eutrofización, cinco veces); J15 = J25 (ecosistema/comunidad); J33 = S3 = S10 (sin depredadores); S43 = S51 (presa-depredador); S5 = S21; A12 = A51; A8 = A46 = A48 = A42; A26 = A43 = A50 (deforestación-agua).
- (C): J27 = J45 (cóndor); J33 = J41 (Caribe); J14 = J46 (Orinoquía); J34 = J47 (extensión); J2 = J44 (Pacífica lluviosa); J10 = J42 (pisos); J22 = J64 (corredor); J23 = J52 (mascotas); J1 = J66 (páramo); J7 = J51 (palma); J57 = S51 (megadiverso); J30 = A4; J20 = S5 (Caño Cristales); S6 = S18 = S57 (corredor); S8 = S26 = S56 = J37, J61 (mercurio); S3 = S52 (endémica).
- (M): J13 = A18; J23 = J58 = S21; J30 = A15; J49 = J5, J50 = J6; J11 = J46; J12 = J38 = J47; J3 = J56 (metano); J0 = J41; J43-J44 triviales.

**Opción más larga (reescribir para igualar longitudes), prioridad alta:** E: J1, J14, J22, J25, J35, J55, J56, J58, J62, J64, S42, S43, S52. C: J3, J5, J38, J40, J54, J57, J64, J67, J68, J69, S2, S4, S10, S11, S14, S29, S32, S38, S40, S41, S43, S69. M: J0, J4, J6, J8, J13, J18, J41, J66, J67, J71, J73, S5, S18, S22, S25, S32, S41.

---

## 8. Lo que está bien

- Los 17 chequeos de las páginas: `data-ok` correcto en todos, `data-por` con retroalimentación específica para cada error, y al menos dos chequeos por módulo (cumple Mayer).
- Pre-claves (`.pre-claves`) en las tres páginas; párrafos bajo 80 palabras (máximo medido: 79).
- La flecha de la red trófica y su explicación («viaja la energía») están muy bien resueltas (L107, cadena del páramo, J5); previene el error clásico.
- La segunda ley de la termodinámica y la regla del 10 % están marcadas como profundización; la cadena del páramo es contextual y correcta.
- Ciclos del agua, carbono y nitrógeno con animación por pasos y vocabulario correcto; fijación de nitrógeno por *Rhizobium* y alternancia maíz-fríjol bien explicadas; eutrofización bien causal.
- `regiones.html`: sección «País megadiverso» (§06) coincide con la evidencia oficial del DBA 11.5 (social, ambiental, cultural); categorías UICN de las 10 especies (oso VU, caimán CR, tití CR, rana dorada EN, delfín rosado EN, palma EN, carey CR, danta de montaña EN, cóndor VU, jaguar NT) coinciden con las listas rojas globales; el ranking de Humboldt (aves, orquídeas y mariposas primero; anfibios, peces dulceacuícolas, palmas y murciélagos segundo) coincide con el kit de prensa «Cifras sobre biodiversidad de Colombia» (corte 2024).
- Datos verificables correctos: CO₂ de Mauna Loa (317 en 1960 … 424 en 2024), 2,4 ppm por año, −18 °C sin efecto invernadero, 80× el metano a 20 años, mar absorbe ≈ ¼ del CO₂ y > 90 % del calor extra, 6 nevados con glaciar y ≈ 90 % de pérdida desde el siglo XIX, Iota categoría 5, La Niña 2010-2011 (> 3 millones), 42 % de Amazonía, Chiribiquete Patrimonio Mixto 2018.
- Enfoque con acciones posibles (mitigar/adaptarse, compromisos, soluciones en cada tarjeta de amenaza), contexto colombiano fuerte y tono no catastrofista salvo el aviso rojo del simulador (M16).
- Banco: sin claves que no estén entre las opciones, sin opciones repetidas dentro de una pregunta; datos tipo ejemplo de S54, S65, S66, S69 (C) y S51 (M) marcados como tales; gráficas y tablas coherentes con su respuesta (S51 (E), S54 (E), S50 (C), S48-S49 (M), S65-S66, S69 (C) verificadas numéricamente).

---

## 9. Limitaciones

- **Búsqueda web:** hice dos consultas (ranking Humboldt/SiB Colombia e inventario de GEI del IDEAM). No pude abrir los documentos primarios ni obtener los porcentajes de la serie 1990-2021.
- **No verifiqué** con fuente primaria: altura exacta del Pico Cristóbal Colón (5775 m); lluvia de Lloró; superficie exacta de Sumapaz (333 000 ha, cifra del banco); «cerca del 50 % de los páramos del mundo»; «menos del 8 %» de bosque seco tropical; cifras de población por región (≈ 70 % andina); número de parques nacionales («más de 60»); proporción de electricidad hidroeléctrica (≈ dos tercios).
- No abrí las páginas con Playwright: la auditoría es de código y contenido. No comprobé el dibujo del canvas de emisiones (`ambiente.html` L214: el rótulo «~59 %» empieza en x ≈ 880 de 900 px y podría cortarse; DUDOSO).
- No revisé las hojas de referencia (`referencias.html`) ni `celula.html`, que podrían cubrir parte de lo que falta en estas páginas (p. ej., fotosíntesis vs. respiración).
- Las etiquetas `dba`/`curso` de la sección 6 son mi criterio contra el texto de `dba-bio.js` y el PDF oficial V.1; el docente debe decidir si quiere una asignación estricta o por «cercanía».
- Los cuadros de duplicados salen de similitud léxica más lectura; puede faltar alguna pareja conceptual.
