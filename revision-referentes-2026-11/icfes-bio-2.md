# Informe del experto Saber 11 / Icfes, lote icfes-bio-2 (BioNom)

**Preguntas revisadas:** 233 (sistemas 77, reproducción 66, genética 90).
**Resueltas a ciegas:** 233. **Coinciden con la clave:** 233 de 233. Ninguna pregunta tiene la clave incorrecta, dos respuestas correctas o datos que no sostengan la clave.

Se llenaron `ev` (evidencia del Marco 2019) y `nd` (nivel de desempeño) para las 233 preguntas.
Niveles: 1 → 54, 2 → 116, 3 → 55, 4 → 8.
Competencias propuestas: uso 94, explicación 74, indagación 65.

## Hallazgos (92): 0 de gravedad alta, 90 media y 2 baja

### 1. Etiquetas de competencia y afirmación (86 preguntas, gravedad media)
La mayoría de estas preguntas tienen `af_escrita:false`, es decir, la etiqueta la puso `saber-icfes.js` con sus reglas automáticas. Esas reglas dan **I1** por defecto a todo lo que es de uso. Por eso:
- **I1 → I3 (50 preguntas).** Son preguntas sobre procesos de los organismos (función de la bilis, qué hace el riñón, meiosis, codones, cruces de Mendel). Les corresponde la evidencia 5.5, que en los sitios es I3. I1 se queda solo para ecosistemas (5.4) y CTS (5.7): polinización, dispersión, pirámide de población y usos de la biotecnología.
- **I1 → I2 (20 preguntas).** Piden asociar un fenómeno con un concepto o con su nombre (tejido, órgano, hormona, tipo de herencia, técnica): evidencia 4.4.
- **→ E3 (10 preguntas).** Valoran prácticas de salud o tecnologías: doble protección, pruebas de ITS, alcohol en el embarazo, vacuna del VPH, toma correcta del antibiótico, bloqueador solar, huevos de tortuga y maíz Bt.
- **Otros 6 casos.** `sistemas|944n1s` era ind/N3 porque la regla vio «controló» y lo tomó por «control»; es uso/I3. `sistemas|1v518wj` era N4 y `sistemas|nakv41` era I3, pero los dos piden un mecanismo: son E1. `reproduccion|15wlkuj` (patrón de una tabla) pasa a N4. `genetica|p16qbx` (conclusión de Mendel) pasa a N2. `genetica|1psrak` (cómo resiste la planta Bt) pasa de E3 a E1.

Recomendación: escribir `c` y `af` a mano en las preguntas de este lote. Así la regla automática deja de etiquetarlas.

### 2. Calidad del ítem (gravedad media)
- **Pista gramatical.** En 4 preguntas los tres distractores empiezan por «Porque» y la correcta no: `sistemas|zxzsn6`, `reproduccion|1mv9niy`, `reproduccion|ljfg0b` y `genetica|gtt5jy`. Se propone empezar la correcta también por «Porque».
- **La correcta se adivina.**
  - `sistemas|1aczr4t`: la correcta repite «madre» del contexto, y «Ninguna protección» no es un distractor real. Se proponen inmunidad pasiva frente a activa.
  - `reproduccion|1xde4fg`: el contexto dice cuáles son las partes del pistilo, y eso descarta tres opciones.
- **Distractor en parte verdadero.** `genetica|lrayt7`: «solo se transcriben en una de ellas» es un caso de regulación distinta, la misma idea de la clave.
- **Distractores absurdos.** `genetica|jkjulc` ofrece como leyes de Mendel «la evolución» y «la conservación de la masa». Se proponen segregación y dominancia.
- **Fuente dudosa.** `reproduccion|ubdbey` atribuye las cifras de ovocitos a Wallace y Kelsey (2010). Ese modelo da cerca de 300 000 al nacer, no un millón; las cifras de la gráfica son las de los textos de fisiología. Hay que revisar la cita; la clave no cambia.

### 3. Redacción y explicaciones (gravedad baja)
- `sistemas|1wexgph`: el contexto anuncia una tabla que no aparece.
- `sistemas|cu7qpj`: distractores sin sentido (orina, saliva, bilis).
- Dos correcciones en `exp`:
  - `sistemas|m8u9r5`: dice que el aumento es «cada vez mayor» con aumentos de 1, 1, 2 y 3.
  - `reproduccion|7gfolz`: dice que la cáscara aporta el alimento, que en realidad viene de la yema y la clara.

## Patrones que se repiten (no se corrigieron uno por uno)
- **La correcta es la opción más larga en 114 de 233 preguntas (49 %)**; si fuera al azar sería el 25 %. Es más notorio en las preguntas cortas de memoria (`sistemas|o6jgmm`, `sistemas|1v8owqr`, `reproduccion|1jwtndi`, `genetica|9vb9w1`, `genetica|f70qkp`). Conviene emparejar las longitudes al redactar.
- **Muchas preguntas de nivel 1 a 2 tienen distractores que no nacen de un error concreto** («El corazón se detiene», «Le da pelo», «Las bacterias muertas vuelven a la vida»). Sirven para grados 6.° a 8.°, pero no miden lo que dice el Marco.
- **Las opciones barajadas siguen siempre el ciclo A, C, D, B, C.** Esto es del archivo ciego, no del sitio, pero conviene verificar que el sitio baraje de verdad al mostrar las preguntas.
- **Repartición de niveles.** Los niveles 1 y 2 son el 73 %. Las preguntas con tabla o gráfica cubren bien los niveles 3 y 4.

## Contenido de grados posteriores (para el experto en currículo)
No se cambió `dba` ni `curso`. Para que el experto en currículo lo revise:
- `genetica|1agnwi0`: la inactivación del X está etiquetada para 9.°.
- `genetica|1y0tagi`: la ventaja del heterocigoto está etiquetada para 9.°.

Las dos parecen de profundización de 10.° y 11.°.

## Limitaciones
- La frontera entre I1, I2 e I3 en biología depende de cómo los sitios reparten la afirmación 5 del Marco (5.5 = I3). Se aplicó tal cual la tabla de la sección 6.3.
- Los niveles de desempeño son una estimación del revisador, hecha con la tabla 6.4.
