# Informe de auditoría — Bloque C (Sistemas, Funciones vitales, Nutrición y salud, Reproducción)

Auditor: Claude. Fecha: 19-11-2026. Solo lectura sobre el repositorio.
Alcance: 4 páginas HTML + animaciones, y 569 preguntas (Juego 211, Saber 11 198, abiertas 160) + 163 palabras de ahorcado, leídas una por una.
Notación: `S/F/N/R` = tema (sistemas, funciones, nutricion, reproduccion); `J12`, `S5`, `A3` = ids de los JSON. Confianza: SEGURO / PROBABLE / DUDOSO.

---

## 1. Resumen ejecutivo

- Revisé las 4 páginas completas (incluido el código con datos de los simuladores), las 4 listas de preguntas y las palabras. Verifiqué los 25 chequeos de las páginas: **todos los `data-ok` apuntan a la opción correcta** y todas las claves de Juego/Saber que revisé tienen UNA respuesta correcta defendible. No encontré claves incorrectas.
- Hallazgos: **3 críticos/altos, 22 medios, 20 menores** (los críticos son errores de hecho o de diseño que conviene corregir pronto, no claves malas).
- Lo más grave:
  1. `nutricion.html` L113: el sello «Contiene grasas trans» no existe así; el sello oficial es «EXCESO EN GRASAS TRANS» (Res. 810/2021 modificada por la 2492/2022). SEGURO.
  2. **Etiquetas `curso` incoherentes con el DBA: 192 de 569 preguntas** dicen, por ejemplo, `dba 8.4` con `curso 7` (funciones 109, nutrición 83). El filtro por curso del panel docente queda contradictorio. SEGURO.
  3. Reproducción S44 (y en parte S43): el montaje con bolsas no demuestra que «el polen deba llegar al estigma» (el tomate se autopoliniza dentro de la bolsa). PROBABLE.
  4. DBA 8.° 4, evidencia 2 (hábitos no saludables en los seis sistemas): solo cubierta para nervioso y endocrino; faltan excretor, óseo, muscular. DBA 8.° 5: los riesgos del embarazo adolescente están en una sola frase en la página.
  5. Preguntas que el sitio no enseña (nefrona/formación de orina, coagulación/plaquetas, circulación mayor/menor, bocio, ósmosis, autoinmunidad): desajuste página–banco.
- Fortalezas: contenido científico muy sólido en general, buenos chequeos con retroalimentación por error, lenguaje respetuoso, semanas del embarazo bien explicadas (excepto J34), buen contexto colombiano.
- Fuentes web usadas (búsqueda): Minsalud (lineamientos VPH 2024; Res. 810/2021 y 2492/2022) vía WebSearch. El resto lo verifiqué con conocimiento propio (marcado cuando no pude comprobarlo).

---

## 2. Hallazgos CRÍTICOS / ALTOS

**C1. Sello «Contiene grasas trans» — `nutricion.html` L113.** Texto: «…o **«Contiene grasas trans»**». Según Res. 810/2021 modificada por la 2492/2022 el octágono dice «EXCESO EN GRASAS TRANS» (solo el edulcorante usa «CONTIENE»). Corrección: `«Exceso en grasas trans» o «Contiene edulcorante»`. También conviene citar «Ley 2120 de 2021 y Resolución 810 de 2021». Nota: Minsalud estudia reemplazar la 810 (no pude confirmar si ya salió); revisar antes de publicar. Confianza SEGURO.

**C2. `curso` menor que el grado del DBA (sistemático).** Ejemplos: funciones J2 → `8.4 / c7`; nutrición J4 → `8.4 / c6`; nutrición J0 → `7.3 / c6`. Son 192 de 569 preguntas (S 0, F 109, N 83, R 0). Un DBA de 8.° no puede tener curso mínimo 7. Causa: `BASE` en `dba-bio.js` (funciones 7, nutrición 6) contra `DBA_TEMA` (def 8.4 / 7.3). Ver sección 6 para la corrección. SEGURO.

**C3. Reproducción S44 (y S43) — diseño experimental.** S44: «¿si el polen de una flor debe llegar al estigma para que se forme el fruto en tomate?» → «Cubrir unas flores con bolsas que impidan la llegada del polen». La bolsa impide el polen *externo* (viento, insectos), pero el tomate es autógamo: el polen de la misma flor cae en su estigma dentro de la bolsa y sí forma fruto. Lo que prueba es el papel de los polinizadores. Corrección: usar una planta de polinización cruzada o pedir «quitar las anteras de unas flores antes de que se abran y cubrirlas con bolsa (emasculación), y dejar otras sin tocar». S43 (cubrir el estigma) es aceptable. PROBABLE.

---

## 3. Hallazgos MEDIOS

### 3.1 Páginas

**M1. DBA 8.4 evidencia 2 incompleta (`nutricion.html` §06 y `sistemas.html`).** Hábitos no saludables → efecto en cada sistema: nervioso ✓ (alcohol, drogas), endocrino/metabólico ✓ (sedentarismo→diabetes), inmune ~ (antibióticos). Faltan **excretor** (poca agua, exceso de sal, abuso de analgésicos/alcohol y riñón), **óseo** (calcio, vitamina D, sedentarismo, tabaco, osteoporosis) y **muscular** (sedentarismo, esteroides anabólicos, lesiones). Agregar una tarjeta «Mis hábitos y mis sistemas» con una línea por sistema y 2 preguntas Saber.

**M2. DBA 8.5 evidencia 1 (embarazo adolescente) muy breve — `reproduccion.html` L202.** Una sola frase. El detalle (anemia, preeclampsia, parto prematuro, bajo peso; deserción escolar, ansiedad/depresión, cambio del proyecto de vida) solo está en la explicación de J37. Agregar tarjeta con riesgos físicos y psicológicos, y rutas de apoyo (servicios amigables, Línea 141 ICBF para menores, Línea 192 opción 4 de salud mental — **no pude verificar los números vigentes**, confirmarlos antes de publicar).

**M3. Salud mental casi ausente (`nutricion.html`).** Solo aparece como efecto del ejercicio (L ~149). Falta estrés, ansiedad, depresión, sueño, pantallas/ciberacoso, y señales de alerta con a quién acudir. Tampoco hay trastornos de la conducta alimentaria (anorexia, bulimia), importantes en la adolescencia y en «nutrición y salud». Sin alarmismo: 1 tarjeta + 1 chequeo.

**M4. Consentimiento, abuso y violencia sexual ausentes (`reproduccion.html` L245).** Solo hay la frase «consentimiento». Falta: qué es consentimiento, señales de abuso/grooming/sexting, y la ruta de denuncia (ICBF Línea 141, Fiscalía, comisaría de familia). Tampoco figura la interrupción voluntaria del embarazo ni la información sobre la ruta legal (Sentencia C-055 de 2022); es decisión del docente incluirla, pero hoy el módulo calla un tema que el estudiante preguntará.

**M5. Anatomía genital incompleta y binaria (`reproduccion.html` L372-405).** El sistema femenino no incluye genitales externos (vulva, clítoris, labios) ni mamas; el masculino sí incluye pene y escroto. Es asimétrico y deja el mito del «himen». Agregar «Vulva y clítoris» y «Glándulas mamarias». Inclusión: los botones «♀/♂» y «sexo cromosómico» son correctos biológicamente; añadir una línea de respeto a la diversidad (personas intersexuales, identidad de género distinta del sexo biológico) a criterio del docente.

**M6. Esporulación como «asexual» para musgos y helechos (`reproduccion.html` L94).** «Hongos, mohos, **musgos y helechos**» bajo «Formas de reproducción asexual». En plantas las esporas se forman por meiosis dentro de una alternancia de generaciones con gametos y fecundación (la propia página lo dice en L306-307 y en el chequeo L120: «el gameto masculino nade»). Contradicción interna y errores conceptuales. Corrección: «Se producen esporas resistentes (en hongos pueden ser asexuales; en musgos y helechos hacen parte de un ciclo con gametos, ver más abajo)». PROBABLE.

**M7. Armadillo «se enrolla» (`funciones.html` L133).** El gurre colombiano (*Dasypus novemcinctus*) no se enrolla en bola; solo algunas especies suramericanas (*Tolypeutes*) lo hacen. Corrección: «el armadillo se refugia bajo su caparazón y cava». PROBABLE.

**M8. La Guajira — causa única (`nutricion.html` L131).** «En las sequías falta comida y agua: por eso la desnutrición infantil es un problema de salud pública allí.» Atribuye el problema solo al clima. Las causas incluyen pobreza, acceso desigual al agua y falta de servicios; el tono puede estigmatizar al pueblo wayuu. Corrección: «…Las sequías, la pobreza y la dificultad para llegar a agua potable y servicios de salud hacen que la desnutrición infantil sea un problema grave». Lo mismo aplica a N S16 («principalmente»).

**M9. Drogas — «actúan sobre el sistema de recompensa (dopamina)» (`nutricion.html` L165).** Simplificación: la marihuana actúa en receptores cannabinoides (y aumenta dopamina indirectamente) y los inhalantes son sobre todo depresores. Falta mencionar sustancias de consumo preocupante en Colombia (tusi/«cocaína rosada», bazuco, opioides) y rutas de ayuda con número telefónico. Mejor: «casi todas terminan alterando el sistema de recompensa».

**M10. Clasificador de funciones sin el sistema inmune (`sistemas.html` L372-379).** Ocho fichas, falta «Inmune». Es uno de los seis sistemas del DBA 8.4. Agregar `{t:'Inmune',caja:'rel',...}` o dejar claro que defiende (muchos textos la ponen en «nutrición/mantenimiento»; decidir con el docente y explicar).

**M11. Riñón «limpia toda tu sangre unas 300 veces al día» (`sistemas.html` L233).** Impreciso: por los riñones pasa ~1,2 L/min de sangre y se filtran unos 180 L de líquido al día; el plasma completo se filtra unas 60 veces. Corrección: «filtran unos 180 litros de líquido al día y devuelven casi todo a la sangre; sacan la urea, las sales y el agua sobrante en forma de orina (1 a 2 litros)». PROBABLE.

**M12. Excretor del DBA 8.4 poco desarrollado.** La página no explica filtración, reabsorción ni la nefrona, pero hay preguntas (J6, S5, S11, S20, A10, palabras NEFRONA). Agregar un paso «Cómo se forma la orina» (3 líneas) o retirar esas preguntas.

**M13. Preguntas que la página no enseña** (desajuste página–banco, Mayer/coherencia): coagulación y plaquetas (S J30, J44, S12; la página solo menciona «plaquetas» una vez en la médula ósea L255), componentes de la sangre (S31, A36), circulación mayor/menor (J32, A4, S8), bocio (J18, S25, A23), amilasa (J34), ósmosis (F J24, S20), enfermedades autoinmunes (A34), potencial de reposo/umbral (J53-J57, S40-S43: sí están en §08). Solución: agregar una mini-sección «La sangre» en `sistemas.html`.

**M14. Mismatch de edad/etapa en fotos del embarazo (`reproduccion.html` L454).** Texto de la diapositiva «Semana 8 (6 después de la fecundación)» con foto rotulada «7.ª semana (5 después)»; diapositiva «Semana 10 (8 después)… Desde ahora se llama feto» con foto de «6 a 7 semanas después (9 de embarazo)» —es un embrión—; diapositiva «Semana 28» con ecografía «de 32 semanas». Alinear (o cambiar el título de la diapositiva a la edad real de la foto) para cumplir la regla de CLAUDE.md. Además «Blastocisto» y «Cigoto» aparecen ambos como «Semana 3» (L443-444).

**M15. Preguntas con la idea de «semana» sin aclarar** — R J34 (ordenar etapas): pista «La etapa de feto empieza hacia la semana 9» y explicación «hasta la semana 8» sin decir «después de la fecundación». Viola la regla de CLAUDE.md. Corrección: «…hasta la semana 8 después de la fecundación (10 de embarazo)».

### 3.2 Preguntas (nivel, DBA y claridad)

**M16. Nivel de curso inconsistente en neurofisiología.** J53 (−70 mV) y S41 («umbral, todo o nada») tienen `c8`, mientras J54, J56, S40, S43 tienen `c10` y la página lo marca «Profundización 10.°–11.°». Corrección: J53 → c10, S41 → c10.

**M17. Poiseuille en curso 7.** F J41 y S35 (`d8.4/c7`) piden la ley del radio a la cuarta potencia (sección marcada «Profundización»). Deben ser `c10` (o 11) — la regla de palabras clave no las detecta porque el enunciado no dice «Poiseuille». F J41 pista 2 «(0,5)×(0,5)×(0,5)×(0,5)» entrega el procedimiento completo.

**M18. N J7 / J8 / J9 / S0 / S1 / S42 / A0 con `curso 11`** por la palabra «prueba de» / «lugol» / «reactivo»: lugol y Biuret son prácticas de 7.°–8.°. Propuesta: c7 (nutrición, biomoléculas) o c8; J7 («Que todos los seres vivos tengan ADN… es prueba de antepasado común») es contenido de 9.° `9.6/c9`, no de 11.° `7.3`. PROBABLE.

**M19. N S30 / J34 («peptidoglucano»)** con `c6`: la pared de peptidoglucano es 9.°–10.°; los antibióticos van con 8.4/8.5 → c8.

**M20. Temas mezclados con DBA equivocado en `sistemas`.** J25, J26, J27, J28, J35 (reproducción, gametos, fecundación, embrión/feto, testosterona) están como `8.4`; corresponden a `8.5` (J35 podría quedarse en 8.4 por endocrino, pero es 8.5 por pubertad). Ver sección 6.

**M21. Pistas que revelan la respuesta (mc).**
- F J15 (rana, 3 cavidades): «Dos aurículas.» + «Un solo ventrículo.» = 2+1. F J14: «Una aurícula y…» «…un ventrículo».
- R J4: «Su nombre empieza por “s”» (única opción con s). R J31: «Su nombre empieza por “E”» (única: Estrógeno). R J35: «Empieza por “c”».
- N J42 «Su nombre tiene tres letras» (ATP es la única de 3). N J1 «Son los fosfolípidos» (nombra la respuesta casi).
- F J7: «Son tubos que llevan aire» ≈ tráqueas.

**M22. Clave larga que se delata (regla de «largo parecido»).** Ejemplos: S J12 (36 vs ~20), J18, J21; F J12, J22, J24, J26, J39, J40; N J18, J26, J27, J36, J43; R J26 «Pistilo (o carpelo)», J38; Saber: S2, S44, F S0, S25, N S10, S40, R S43 (103 vs 65 caracteres), R S49. Revisión: acortar la correcta o alargar distractores.

**M23. Ambigüedad conceptual.**
- R J21 / S30: «Si cortas una estrella de mar en trozos y cada trozo forma una estrella nueva» → sólo algunas especies (p. ej. *Linckia*) y casi siempre con parte del disco central; la animación de la propia página lo matiza. Reescribir: «En algunas especies de estrellas de mar, un brazo desprendido regenera un individuo completo. Es…». Además no alentar a cortar animales.
- F J19: «los peces eliminan amoníaco» → peces óseos; tiburones y rayas excretan urea. Añadir «de agua dulce» / «óseos».
- F J33/J34, S31: la clasificación morfológica/fisiológica es del sitio (no estándar; falta «conductual» que aparece solo como distractor). J33 ofrece «Fisiológica» y no «Química»; consistente, pero conviene decir en la explicación «(química)».
- N J36 pista «Sobreviven las más fuertes» → error conceptual de selección natural; reemplazar por «Sobreviven las que ya eran resistentes».
- N J38 pistas: «Aumenta en cada eslabón» (biomagnificación) y luego «Se llama bioacumulación». Distinguir (la página L ~215 sí distingue).
- S J20: «Los anticuerpos los fabrican los… linfocitos B» (en rigor las células plasmáticas derivadas de los B); aceptable en 8.°, mencionarlo en la explicación.
- S J48/F: R J26 «(o carpelo)» — el pistilo está formado por uno o más carpelos.

**M24. Banco de reproducción con demografía fuera de DBA.** R J51, J52, S40, S41 (tasa de reemplazo, pirámide) están como `8.5`; no corresponden a ningún evidencia del DBA 8.5. Aceptable como ampliación, pero etiquetarlas «complemento».

**M25. `competencia` mal asignada (Saber).** S S1 (olla caliente→médula) está como `ind` pero es `uso`; F S23 (hormona de la metamorfosis) `ind` → `uso`; R S17 (caballito de mar) `ind` → `exp`. Las `ind` verdaderas (tabla/gráfica/diseño) están bien.

---

## 4. Hallazgos MENORES

- S J2 pista «unos 6 metros»; en vivo el intestino delgado mide 3–5 m (6–7 m es medición post mortem). `sistemas.html` L224 igual.
- S J32 explicación «única arteria que lleva sangre sin oxígeno»: también las arterias umbilicales (feto). Añadir «después del nacimiento».
- S J11/J1/S1: «la médula espinal controla los actos reflejos» — hay reflejos craneales; aceptable.
- `sistemas.html` L67-70: los iconos de «Célula» y «Sistema» son el mismo 🔴.
- `sistemas.html` L188: «la bomba de sodio y potasio usa cerca de un tercio de la energía de tu cuerpo en reposo» → cifra citada con frecuencia, pero la literatura da 20–40 % (y más en el cerebro). Decir «entre una cuarta y una tercera parte». DUDOSO.
- `sistemas.html` L420 simulador de glucosa: «zona normal 70–110»; tras comer el pico normal llega a 140 (S S51 lo muestra). Cambiar a «zona normal en ayunas 70–100» o ampliar.
- `funciones.html` L100: «Aves, reptiles e insectos ponen huevos con cáscara»; los insectos tienen corion, no cáscara; el ácido úrico también ahorra agua en adultos terrestres. Añadir «los insectos, por vivir en tierra».
- `funciones.html` L217: «Tinta del pulpo» se clasifica «fisiológica»; también es conductual (escape/distracción). Añadir pista.
- F J48: «Las auxinas hacen que el tallo crezca hacia la sombra» → trampa por doble lectura; reescribir «Las auxinas hacen que el tallo se curve hacia la luz».
- F J38/N J20/R J52: distractores absurdos (1/1 mmHg, «10 horas», «Rejuvenece»); mejorar plausibilidad.
- N J11: «60 % agua»: en mujeres adultas ~50–55 %; decir «entre 50 y 65 %».
- N J25 / `nutricion.html` L160: «el cerebro se desarrolla hasta los 25 años»: cifra muy difundida pero aproximada; decir «hasta cerca de los 25».
- N J43 (Pacífico): conservar; añadir en la tarjeta que hay variedad dentro de cada región.
- N S3 distractor «Celulosa en sus paredes y quitina en sus membranas» (confuso). N S47: «25 g de azúcar libre/día» corresponde a la meta ideal de la OMS (menos del 5 % de la energía; el límite fuerte es 10 % ≈ 50 g). Decir «la OMS sugiere, idealmente, menos de 25 g».
- N S43/S47: datos de etiquetas son ejemplos, no marcados «de ejemplo».
- N A37 «Compara la quimiosíntesis, la fotosíntesis y la respiración como formas de obtener energía»: la respiración no «obtiene energía» del ambiente; reformular «…como procesos de energía de los seres vivos»; además `d8.4/c6` → `7.3/c7`.
- R J26 «Está en el centro de la flor» y J15 «es de látex» (hay condones de poliuretano/nitrilo). R J33 omite conductos eyaculadores (simplificación).
- R S6 ≈ S21 (maíz, viento), R S9 ≈ S16 (marsupial), R S5 ≈ S33 (banano clonado): duplicados.
- R S47: el enunciado ya da la conclusión de Redi; distractor «las moscas ponen huevos de los que salen las larvas» está en el contexto.
- `reproduccion.html` L468-469: orden de la tabla: «método del ritmo 77 %» antes de «retiro 80 %»; ordenar de mayor a menor.
- `reproduccion.html` L461: «Muy usado por adolescentes en Colombia» no pude verificarlo; quitarlo o citar fuente (Profamilia/ENDS).
- `reproduccion.html` L494 (mito 4): «Solo se transmite por… la madre al bebé»: añadir «durante el embarazo, el parto o la lactancia».
- `reproduccion.html` L315: «Artrópodos: sexual» pero cita partenogénesis (asexual); ajustar a «ambas».
- Emojis: no encontré emojis de versión 12 en adelante en las cuatro páginas (🧴🧺🥵🥶🦴🧬🧱🦒 son de 2018 o antes). SEGURO tras revisión visual del código; no ejecuté un barrido automático completo.

---

## 5. Cobertura de los DBA

### 8.° DBA 4 — sistemas excretor, inmune, nervioso, endocrino, óseo y muscular; homeostasis

| Evidencia / sistema | Estado | Dónde / qué falta |
|---|---|---|
| Nervioso (receptores, SNC/SNP, reflejo, neurona) | **Cubierta** | `sistemas` §03, §08 (profundización); `funciones` §05. Fuerte, incluso por encima de 8.° (potencial de acción). |
| Endocrino | **Cubierta** | §03 (hipófisis, tiroides, suprarrenales, páncreas, gónadas) y §07 (simulador). Falta hipotálamo–hipófisis, solo se menciona en §07 y la explicación J41. |
| Inmune | **Cubierta** | §06 (3 líneas, vacunas, curva de anticuerpos). Falta autoinmunidad/alergias (A34 las pide). |
| Excretor | **Parcial** | Riñones/uréteres/vejiga/sudor, sin nefrona ni formación de orina (M12). |
| Óseo | **Parcial** | Lista de huesos (cráneo, columna, costillas, pelvis, extremidades). Falta tejido óseo, articulaciones, calcio, médula como función. |
| Muscular | **Parcial** | Pares antagonistas, tendones. Faltan los tres tipos y su relación con hueso en una sección propia (el tejido muscular sí aparece en §02). El sitio los une como «Locomotor» (aceptable). |
| Homeostasis | **Cubierta** | §07 (glucosa, temperatura) + simulador. |
| Efectos de hábitos no saludables en cada sistema | **Parcial/falta** | nervioso ✓ (`nutricion` §06), endocrino ✓, inmune ~ (antibióticos); excretor, óseo, muscular ✗ (M1). |
| Relaciones entre sistemas | **Cubierta** | `sistemas` §05 («corre para alcanzar el bus»), recorridos, clasificador. |

### 8.° DBA 5 — reproducción asexual/sexual, preservación de la vida

| Evidencia | Estado | Dónde / qué falta |
|---|---|---|
| Reproducción asexual y sexual en distintos grupos, importancia | **Cubierta (muy buena)** | `reproduccion` §01, §02 (20 grupos con animación), §03. |
| Riesgos y consecuencias físicas y psicológicas del embarazo adolescente | **Parcial** | Solo L202 (una frase) + J37. Agregar tarjeta (M2). |
| Medidas preventivas de patologías del sistema reproductor | **Cubierta, mejorable** | ITS, vacunas VPH/hep. B, citología, control de próstata, condón. Faltan autoexamen de mama/testículo, higiene menstrual, infecciones vaginales comunes. |
| Derechos sexuales, consentimiento, rutas | **Parcial** | Servicios amigables sí; abuso y rutas de denuncia no (M4). |

### 7.° DBA 3 (nutrición) — en `funciones`/`nutricion`

| Evidencia | Estado | Comentario |
|---|---|---|
| Tipos de nutrición autótrofa y heterótrofa en cadenas y redes | **Parcial** | `funciones` §01 compara digestión y menciona autótrofas (plantas) y heterótrofas por digestión externa; no habla de cadenas tróficas (corresponde a `ecosistemas`). |
| Fotosíntesis vs respiración celular | **No está** en estas páginas | Es de `celula`; la asignación 7.3 de F/N es razonable solo para digestión y alimentación. |

**Decisión del sitio de atar Funciones vitales comparadas y Nutrición al DBA más cercano.** Razonable: nutrición/alimentación → 7.3; hábitos, salud, antibióticos, sustancias → 8.4; ITS/embarazo → 8.5 (aunque la regla de `DBA_TEMA` pone `8.5` solo si el enunciado trae «ITS/embarazo»). Pero Funciones vitales **comparadas** (circulación, excreción, fitohormonas, defensa en plantas, fluidos) no tiene DBA oficial: lo más cercano sería 8.4 (homeostasis/regulación) y 7.3 (digestión/nutrición), por lo que **el curso 7 con DBA 8.4 es la contradicción de C2**. Propuesta en sección 6.

**Contenido por encima del curso:** potencial de acción (`sistemas` §08), ley de Poiseuille y capilaridad (`funciones` §07), peptidoglucano, ribosomas bacterianos (`nutricion` §08), reactivos Benedict/Biuret (parcialmente), meiosis en las preguntas (`R S27`, `A21`). Todo marcado «Profundización» en las páginas; falta coherencia en las etiquetas (M16-M19).
**Contenido por debajo/sin lugar:** demografía (pirámide de población, `reproduccion` §10) es de ciencias sociales/ecología.
**A agregar:** sección «La sangre» (componentes, coagulación, donación), formación de orina, hábitos y los seis sistemas, riesgos del embarazo adolescente (detalle), consentimiento y rutas, salud mental y TCA, minerales/vitaminas y anemia por falta de hierro, energía (kcal) y la lectura de la tabla nutricional.

---

## 6. Etiquetas `dba` / `curso` a corregir

Regla general sugerida: el `curso` nunca menor al grado del DBA citado. Cambiar `BASE` en `dba-bio.js`: `funciones:8` (o dar `curso:7` + `dba:'7.3'` a las de digestión/nutrición) y `nutricion:7` (las de hábitos 8). Individuales:

| Id | Hoy | Debe ser |
|---|---|---|
| S J25, J26 | 8.4/c8 | 8.5/c8 |
| S J27, J28 | 8.4/c8 | 8.5/c8 |
| S J35 | 8.4/c8 | 8.5/c8 (o 8.4; elegir una) |
| S J53 | 8.4/c8 | 8.4/c10 |
| S S41 | 8.4/c8 | 8.4/c10 |
| F J0, J1, J5, S0, S45, A0, A35 | 7.3/c7 | OK |
| F J2–J4, J6–J24, J26… (digestión, respiración, circulación comparada, excreción) | 8.4/c7 | 7.3/c7 las de digestión y alimentación (J2, J3, J4, S1, S2, S3, S4, A1); el resto sin DBA propio → `8.4/c8` (excreción, circulación, regulación) |
| F J25, J27–J30, J32, S22–S24, S27, S33 (regulación, fitohormonas, tropismos) | 8.4/c8 o c7 | 8.4/c8 |
| F J41, S35 | 8.4/c7 | 8.4/c10 |
| F J38, S34 (presión arterial) | 8.4/c7 | 8.4/c8 |
| N J0–J3, J10, J40–J42, S2, S3, S5, S6, S37 (biomoléculas) | 7.3/c6 | 7.3/c7 |
| N J4, J6, J16, J17 | 8.4/c6 | 7.3/c7 (nutrición) |
| N J7 | 7.3/c11 | 9.6/c9 (tema evolución) |
| N J8, J9, S0, S1, S42, A0 | c11 | 7.3/c7 (S42: 7.3 también) |
| N J20, J21, J25, J26, J47, J49, S18–S20, S23, A11, A13, A15, A16 | 8.4/c6 | 8.4/c8 |
| N J28–J32, J37–J39, S25–S28, S33, S34, A21, A22, A24, A31, A32 | 8.4/c6 o 7.3/c6 | 8.4/c8 |
| N J30, J33, J34, S29, S30, A25, A26 (antibióticos, Fleming) | 8.4/c6 | 8.4/c8 (S30/J34 c8–9) |
| N S35 | 7.3/c8 | 8.4/c8 |
| N A37 | 8.4/c6 | 7.3/c7 |
| R S27, A21 | 8.5/c9 | 9.4/c9 |
| R J51, J52, S40, S41 | 8.5/c8 | sin DBA propio; 8.5/c8 como «complemento» |
| R J23 (gametos «meiosis») | 8.5/c8 | OK (la pista nombra meiosis, no la pide) |

Conteo exacto por DBA: no recalculé `MATRIZ_DBA.md`; el cambio de etiquetas arriba no baja ningún DBA de 20 preguntas (8.4 y 8.5 tienen muchas más).

---

## 7. Preguntas para eliminar o reescribir

**Reescribir (defectuosas):**
- R S44 (diseño que no prueba lo que dice) y S43 (aclarar).
- R J21 y S30 (todas las estrellas de mar; no cortar animales).
- R J34 (semanas sin aclarar fecundación).
- F J19 (peces → óseos), F J48 (doble lectura), F J41 (pista que da el cálculo).
- N J36 pista «más fuertes», N J38 pistas bioacumulación/biomagnificación, N J7 (tema equivocado).
- S J12, J18, J21, N J18, J26, J27, J36, R J38 (clave más larga).
- F J14, J15, R J4, J31 (pistas que revelan).

**Eliminar o fusionar por duplicado/casi duplicado:**
- R S6 / S21 (maíz y viento); R S9 / S16 (marsupial); R S5 / S33 (banano clonado); R S1 / S15 (ovario→fruto; mantener una).
- S J23 / J10 / S0 (insulina baja el azúcar; dejar una y dejar S51 como gráfica); S J12 / S9 (pares de músculos); S J22 / S7 y N J35 / J46 / S31 (antibióticos y gripa: tres veces cada uno; fusionar). N A20/A27 (casi idénticas).
- N J41 vs S37 (hemoglobina, insulina, anticuerpos).
- S J51: trivial.
- S J20 vs S18: bien. Dejar.
- Preguntas sobre contenido que ninguna página enseña (M13): o agregar el contenido o mover las preguntas al tema que lo enseña (p. ej. S J25, J26 → reproducción).

---

## 8. Lo que está bien

- Claves: revisé todas las opciones correctas de Juego/Saber y chequeos; ninguna es incorrecta. Explicaciones correctas y útiles en general (J13 ciclo, J15 condón, S51, S49 con datos coherentes). Verifiqué las gráficas Saber: S51 (glucosa), F S47 (frecuencia cardíaca), R S49 (temperatura basal) y las tablas N S47: los datos y las explicaciones coinciden con la respuesta.
- Eficacias de anticonceptivos (`reproduccion.html` L461-470) coinciden con las cifras de uso típico de CDC/OMS (implante 99,9; DIU 99,2; inyección 96; pastilla ~93; condón 87/79; calendario 77; retiro 80). La pastilla de emergencia está bien tratada («no es abortiva»).
- Ciclo menstrual: fases, días y hormonas del simulador son coherentes (pico de LH día 14, progesterona día ~21, vida del óvulo 24 h, espermatozoides 5 días).
- Semanas del embarazo: la explicación L196 y las diapositivas cumplen la regla (40 de embarazo, 38 desde la fecundación; embrión hasta la semana 8 después de la fecundación).
- Chequeos: 4 en `sistemas`, 7 en `funciones`, 10 en `nutricion`, 9 en `reproduccion`; todos con explicación del error (`data-por`).
- Lenguaje respetuoso, enfoque de derechos y de prevención, contexto colombiano (servicios amigables, ley de sellos, PAI, Chagas, mercurio, casabe, subienda, tortuga caná, hongo del banano en La Guajira 2019 — verificado, Foc R4T, agosto de 2019), advertencia sobre consumo sin alarmismo y ayuda en L150.
- Recuadro de palabras clave en las cuatro páginas; contenido por pasos/pestañas; mitos y realidades; simuladores con retroalimentación correcta.
- Palabras: pistas 1 cortas y sin revelar la palabra (cribado automático: ninguna pista 1–2 contiene la palabra; ninguna palabra repetida entre los cuatro temas; todas ≤ 95 caracteres).

---

## 9. Limitaciones

- No pude verificar: números telefónicos de líneas de ayuda en Colombia; si la vacuna VPH ya cubre a niños de 15 a 17 años (la búsqueda indica niñas de 9 a 17 y niños de 9 a 14 con dosis única, `reproduccion.html` L482 dice «niñas y niños desde los 9 años», que es correcto pero incompleto; confirmar con Minsalud); si Minsalud ya reemplazó la Res. 810/2021; el uso «muy usado por adolescentes» del implante; la cifra «un tercio de la energía» de la bomba Na/K; la fecha exacta de la ley 124 de 1994 (alcohol, 18 años; la conozco como vigente).
- No abrí las páginas en Playwright: la auditoría es de contenido y código. No revisé visualmente los dibujos de `cuerpo.js`, `embrion-fig.js` y los SVG de `repro-anim.js` (solo sus textos).
- No revisé `docente-app.js`, el juego ni el orden real de las opciones barajadas; asumí que `data-ok` y `correcta` se respetan al barajar.
- `MATRIZ_DBA.md` no se recalculó. Los porcentajes y conteos son de mis scripts sobre los JSON volcados (`scratchpad/auditoria/bloque_C/cribado.js`).
- Los criterios de curso son juicio mío con base en los DBA del MEN (V.1, 2016): el propio repositorio reconoce que el mapeo pregunta→curso es criterio de BioNom.
