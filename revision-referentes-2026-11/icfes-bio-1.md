# Informe experto Saber 11 / Icfes — lote icfes-bio-1 (BioNom: célula y reinos)

- Preguntas revisadas: **151** (75 de célula, 76 de reinos).
- Resueltas a ciegas: **151/151 coinciden con la clave**. No hay claves incorrectas, ni preguntas con dos respuestas correctas, ni datos de tablas o gráficas que contradigan la clave.
- Se llenaron `ev` (evidencia del Marco 2019) y `nd` (nivel de desempeño 1 a 4) de las 151 preguntas.
  Niveles: muchos de 1 y 2 en uso (adecuado para 6.° y 7.°), de 3 en buena parte de la indagación con datos y uno de 4 (reinos|11yilcf).

## Hallazgos (65, todos de gravedad media; ninguno alto)

| Tipo | Cantidad |
|---|---|
| Afirmación de uso mal puesta: I1 → I2 (clasificar, nomenclatura, tipo de célula; evidencia 4.4) | 30 |
| Afirmación de uso mal puesta: I1 → I3 (procesos y estructura-función de los organismos; evidencia 5.5) | 19 (+1 de E3 → I3) |
| Competencia mal puesta (uso/exp → indagación o al revés) | 12 |
| Calidad del ítem (texto) | 7 preguntas, 8 cambios |

### Cambios de competencia
- Indagación, no uso: celula|d2kzvd y celula|aila22 (qué observación apoya una teoría, N1 6.2), celula|97e3nv y celula|1rz6fld (variables, N3 9.2), celula|9h3lqn (instrumento, N3 9.3), reinos|xnngj3 (evidencia nueva cambia la clasificación, N1), reinos|gsws2z (leer y sumar datos de la gráfica, N4 8.1).
- reinos|1tty1gw: calcular con el patrón de la tabla es predicción (N2, 7.4), no E2.
- reinos|1e4w7c0 y reinos|8pi9gr: solo ubican un grupo en el modelo de cinco reinos → uso I2, no E2.
- celula|j12tql (E3 → E1) y reinos|s081pk (E3 → uso I3): explican o reconocen un proceso; no analizan efectos sobre el ambiente o la salud.

### Calidad del ítem (cambios de texto)
- celula|exfu7e: la clave era la única opción sin «Porque» (pista gramatical).
- celula|vtwe8g: la situación no tenía resultado; se agrega lo observado.
- celula|1yo59rk: la clave era la más larga y decía «más agua pierden», cuando con 0 % y 1 % las rodajas ganan masa.
- reinos|58a5s4: dos distractores absurdos («son más grandes», «son de colores») cambiados por errores reales.
- reinos|nh744b: clave claramente la más larga; se acorta.
- reinos|1db40va: «no la apoyan» con 42 % > 40 % era discutible; nueva clave: «los datos no bastan para apoyarla».
- celula|4idqny: «fase oscura» (término en desuso) → ciclo de Calvin, fase que no usa luz directamente.

## Patrones repetidos
1. **I1 como valor por defecto en las preguntas de uso** sin `af` escrita a mano: casi todas las de célula y reinos de las primeras 40 de cada tema. En el esquema del sitio, I1 (afirmación 5) solo tiene en biología la evidencia 5.4 (ecosistemas); los procesos de los organismos son I3 y la clasificación es I2. Conviene revisar la regla automática de `saber-icfes.js` (línea 80), que pone I1 salvo palabras como «se llama».
2. Las preguntas de «qué observación apoya…», «qué variable…» y «qué objetivo usar» aparecen como uso aunque piden habilidades de indagación.
3. Hay preguntas casi repetidas (penicilina: celula|1151g86, celula|hmxw5g y celula|muqeg4; Virchow: celula|d2kzvd y celula|1e14gqk; líquenes: reinos|meyu4u, reinos|1rz2xh0 y reinos|pgimnl). No se cambian, pero conviene no ponerlas en la misma evaluación.
4. Reparto por competencia: el lote está cargado hacia uso en las 40 primeras de cada tema. Las agregadas después (con `af` escrita) sí equilibran indagación y explicación.

## Limitaciones
- No se cambiaron DBA ni curso (lo revisa el experto en currículo). Ninguna pregunta pide contenido de un grado posterior a su curso: las de Krebs, cadena respiratoria y ciclo de Calvin ya están en 10.°.
- La sensación de «quemar» en el músculo (celula|1kt993c) se atribuye en la escuela a la fermentación láctica; es una simplificación que puede revisar el experto en biología.
