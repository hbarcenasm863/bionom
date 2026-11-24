# Informe del experto Saber 11 / Icfes — lote icfes-bio-3 (BioNom)

**Temas:** evolución (74), ecosistemas (76), ecosistemas de Colombia (84). **Revisadas:** 234.
**Resueltas a ciegas:** 234; **coincidencias con la clave:** 234 (100 %). Ninguna clave incorrecta ni pregunta con dos correctas.
Se entregan `ev` (evidencia del Marco 2019) y `nd` (nivel de desempeño 1–4) de las 234.

## Conteo de hallazgos (58)
- **Alta (1):** Caño Cristales (9w45yl): la correcta dice «una planta acuática que florece»; el rojo lo dan los tallos y hojas de *Macarenia clavigera*, no la flor.
- **Media (51):**
  - 15 en evolución con `af:I1` cambiadas a `I2` (4.4; una de ellas, 16dxlsi, también quita de la correcta un paréntesis que la delataba) y 1 de `I3` a `I2` (n3awnq): en la tabla 6.3, I1 solo tiene evidencias 5.1–5.7 y ninguna es de evolución.
  - 24 de competencia o afirmación mal puesta: predicciones con el modelo de selección o de ecosistema marcadas como uso (→ exp E1); salud, recursos y conservación marcadas como E1, E2, I1 o I2 (→ E3, afirmación 1); naturaleza de la ciencia y conclusiones de experimentos marcadas como uso (→ ind N1/N2); más 1c3rog6 (E3→E1), 1349anv (E2→E1) y 1dw7yow (I1→I2, 4.2). La de 16dxlsi (I1→I2) va con las de evolución, porque además corrige la correcta delatada.
  - 6 afirmaciones de indagación: leer una gráfica marcado N2 (→ N4); «predecir el siguiente valor» marcado N4 (1j3y2ro, 10i0m31 → N2, 7.4); control experimental marcado N1 (→ N3).
  - 4 de I3 cambiadas a I1: procesos del ecosistema (ciclo del nitrógeno, regulación hídrica, mercurio en la cadena) marcados como procesos del organismo.
  - 1 de situación ambigua: las «sabanas que se inundan» también existen en el Caribe (1i0rv1n). Se precisa: «al oriente de los Andes».
- **Baja (6):** distractor «Ninguna» (1h2y1rz) y correctas mucho más largas que los distractores en ítems cortos (1pgxqal, rqjvqo, 16ahjfk, 1d0b0in, 1l99wf2). 1349anv también tenía este problema; quedó dentro de su hallazgo media.

## Patrones
1. **Afirmación por defecto I1.** La regla automática de `saber-icfes.js` pone I1 a todo lo de uso que no diga «se llama» o «tipo». En evolución eso deja etiquetas sin evidencia que les corresponda.
2. **Uso frente a explicación.** «¿Qué se espera después de muchas generaciones?» o «¿Qué puede pasar?» piden usar un modelo para predecir: son E1 o E2, no uso.
3. **Longitud de la correcta.** En 114 de las 234 preguntas la correcta es la opción más larga, cuando por azar serían unas 59 (25 %). Sobre todo pasa en las preguntas cortas de las auto-etiquetadas (opciones de 1 a 4 palabras). Solo se ajustaron los casos muy evidentes.
4. **Ítems repetidos casi iguales.** Homología: s3woei, 1ptukm5, hsxop. Análogos: 114kduj, 19g5ih8. Especiación por un río: wpni3u, on8x1p. Teosinte: 1rkr6d1, 1c3rog6. Caño Cristales: 10kpblz, 9w45yl. Mercurio en peces: 4bdodd, 18z1fib, ftqr9z. Páramo y agua: qakohz, 1bei731, 1vuq6rl. Conviene no ponerlos juntos en una misma evaluación.
5. **Niveles.** Las preguntas sin `niv` escrito (las primeras de cada tema) son casi todas de nivel 1–2. Las de datos (escritas a mano) llegan a 3–4. El lote está bien para 6.°–9.°, pero en Colombia y Ecosistemas hay pocas de nivel 4.
6. **Estilo de miles.** Unas preguntas usan punto (1.200; 100.000; 8.000) y otras espacio (1 500; 15 000). Habría que unificar; no se reportó ítem por ítem.

## Limitaciones
- En el archivo ciego, la correcta seguía siempre el ciclo de posiciones A, C, D, B. Se resolvió por contenido, pero conviene barajar de verdad en lotes futuros.
- No cambié `dba` ni `curso`, porque los revisa el experto en currículo. Vi `dba: []` en muchas preguntas de ecosistemas y Colombia, y el origen de la vida (Miller-Urey, Redi) asignado a grado 7.
- Los datos reales (IDEAM, NOAA, USGS, Grant, Lenski, Darlington, Woodwell) se contrastaron de memoria: coinciden en orden de magnitud y tendencia.
