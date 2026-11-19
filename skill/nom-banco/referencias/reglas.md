# Reglas del docente para escribir preguntas y palabras

Estas reglas vienen de los `CLAUDE.md` y de las auditorías de los tres sitios.
`node scripts/nom.js validar <sitio> archivo.json` revisa las que se pueden revisar
de forma automática. Las demás dependen de tu criterio.

## Para todos los sitios

- **Español de Colombia**, claro, para estudiantes de 6.° a 11.°. Contextos
  colombianos cuando ayuden (ecosistemas, industrias, ciudades, especies de Colombia).
- **Una sola respuesta correcta**, verificable y sin ambigüedad. Revisa el dato
  científico antes de escribirlo.
- **Distractores creíbles**: errores típicos de los estudiantes, de **longitud
  parecida** a la correcta. La clave no puede delatarse por ser la más larga ni
  por ser la única con matices. No uses «todas las anteriores» ni «ninguna de las
  anteriores».
- **Pistas progresivas** (2 en las preguntas, 3 en las palabras): la primera es
  general (qué revisar) y la siguiente más concreta. **Nunca** traen la respuesta
  ni una palabra de la misma familia («mitocondrial» delata «mitocondria»).
- **Explicación (`exp`)** completa: por qué la correcta es correcta y, si se puede,
  por qué falla el distractor más tentador. Menos de 80 palabras (Mayer: coherencia).
- **Lo que se pregunta debe estar enseñado** en la página del tema del sitio. No
  preguntes detalles que el estudiante no ha visto.
- **No repetir**: ni preguntas ya existentes (el validador compara con el banco) ni
  palabras (una palabra no se repite en todo el banco del sitio).
- **Emojis**: nada de banderas ni emojis de la versión 12 en adelante (🫁 🫀 🫘 🫧 🪸
  🩸 🟢…): en el Windows del docente salen como rectángulos negros.
- **Fórmulas químicas: nunca con ramas entre paréntesis** (nada de `CH₃−CH(CH₃)−CH₃`,
  `(CH₃)₃C−OH`, `CH₃CH(OH)CH₃`). Usa la fórmula molecular (C₄H₁₀, C₆H₁₂O₆) o el
  dibujo semidesarrollado con todos sus enlaces (skill `chromanom-estructuras`).
  Se permiten los paréntesis inorgánicos que la IUPAC exige: Ca(OH)₂, (NH₄)₂SO₄,
  Ag(NH₃)₂⁺, Fe₂(SO₄)₃. Usa subíndices reales (H₂O, no H2O).

## Preguntas tipo Saber 11

- Siempre con **situación** (`ctx`): un experimento, una tabla, una gráfica o un caso
  real. El enunciado se responde razonando sobre la situación, no recitando.
- 4 opciones; la correcta de primera en el archivo.
- Competencia (`comp`) y afirmación (`af`) del Icfes coherentes (ver `formato.md`).
  Indagación (`ind`) = datos, variables, conclusiones, predicciones.
- Reparto sano en una evaluación: más o menos un tercio de cada competencia.

## BioNom (biología)

- Cada pregunta del juego lleva **2 pistas** en `pistas` y su `exp`.
- `curso` (6 a 11) y `dba` según los DBA de Ciencias Naturales del MEN
  (`formato.md`). Un tema no se pregunta antes del curso de su DBA. Lo de 10.°–11.°
  es profundización.
- **ATP de la respiración**: unos 30 a 32 por glucosa (no 36 ni 38).
- **Embarazo**: en semanas de embarazo (40, desde la última menstruación); si se usa
  la edad desde la fecundación, decirlo.
- **Reinos**: el docente trabaja con 5, 6 o 7 reinos, con o sin dominios. Lo que
  dependa del modelo debe nombrarlo («en el modelo de cinco reinos…»).
- Laberintos: preguntas «cortas», con opciones de 36 caracteres o menos, o V/F (`--cortas`).
- Meta: al menos 40 de cada cosa por tema (juego, cortas, Saber, abiertas, palabras).

## Palabras (ahorcado, sopa, crucigrama, criptograma)

- De 4 a 14 letras para que sirvan en la sopa (el crucigrama acepta hasta 15). Sin
  frases largas.
- **3 pistas**; la pista 1 corta: palabra + pista 1 ≤ 95 caracteres (criptograma).
- La palabra va en MAYÚSCULAS con sus tildes (GEMACIÓN); el juego las quita y deja la Ñ.

## ChromaNom (química orgánica)

- Nomenclatura IUPAC actual (pentan-2-ol; se aceptan como alternativas los nombres
  como 2-pentanol en las de escribir).
- Toda estructura se muestra dibujada (semidesarrollada con todos sus enlaces) o
  como fórmula molecular. Código de 4 colores al analizar nombres: sustituyentes
  azul, cadena principal verde, insaturación naranja, grupo funcional rosado.

## IonNom (química inorgánica)

- Nombres en los tres sistemas: tradicional, Stock («óxido de hierro (III)») y
  sistemático («trióxido de dihierro»).
- En los cálculos, dar los datos necesarios (masas atómicas, R = 0,082 atm·L/mol·K)
  y la tolerancia de la respuesta. Usar coma decimal.
