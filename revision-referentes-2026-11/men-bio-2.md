# Informe men-bio-2 (BioNom, experto en currículo MEN)

Revisadas: 1299 entradas (saber 450, juego 346, abiertas 218, palabras 203; temas division, funciones, nutricion, ecosistemas, colombia, ambiente).
Hallazgos: 277 (1 alta, 147 media, 129 baja). Los archivos de apoyo `_m2_*.py` y `_men2_add.py` en `salida/` solo sirvieron para generar el JSON.

## Hallazgos por tipo
- **DBA vacío completado** (la mayoría): funciones (digestión 7.3; excreción, hormonas vegetales, sistema nervioso y homeostasis 8.4, con curso 8; el resto `sin`), nutrición (7.3, 8.4, 6.3, `sin`), ecosistemas (7.3, 7.4, `sin`) y Colombia (7.4, `sin`).
- **Curso demasiado alto**: 90 % de ambiente y buena parte de Colombia estaban en 11.5|11. Se rebajan por priorizados SED: energías renovables 6.°, causas del cambio climático 7.°, El Niño y La Niña 8.°, huella de carbono 9.°, ciclo del carbono y del agua 7.4|7. Siguen en 11.5|11 megadiversidad, endemismo, minería, tráfico de fauna, océanos y visión sistémica.
- **DBA mal puesto**: 10xt5lz y j607 (código genético y ADN universal, no 8.4), j566 y j568 (biomoléculas), segunda ley de la termodinámica (7.3|10, pasa a 8.1|8), ecolocalización y fitohormonas (8.4).
- **Inconsistencias entre hermanas** (misma idea con DBA distinto): excreción, fitohormonas y defensas en funciones; agua en nutrición.
- **No mide ciencias**: division|1qgk9rq (inclusión de personas con síndrome de Down), bio-a421 (se reformula con la trisomía 21) y bio-p166 INCLUSIÓN.
- **Telómeros** (division|1k1ve82): `sin`, curso 10.
- **Ley de Poiseuille**: elzj0v `sin`|10; bio-p435 y bio-a475 marcadas nivel Completo.
- **Error científico** (alta): bio-p164 CARIOCINESIS no es sinónimo de mitosis; es la división del núcleo.
- **Vocabulario de grado posterior**: BENEDICT (11.4), QUIMIOSÍNTESIS, «seleccionada» en la pista de ADAPTACIÓN.

## Decisiones que el docente debe confirmar
- **`sin` con curso 7 u 8 frente a «profundización de 10.°».** La instrucción dice que lo que ningún DBA nombra va como profundización de 10.°. Aquí se conservó `sin` con el curso 6.° a 9.° cuando un estándar de 6.°-7.° u 8.°-9.° o un priorizado SED lo cubre (funciones comparadas, relaciones ecológicas, regiones de Colombia, dieta), porque es la práctica ya usada en el banco (bio-j99 a j137, j514 a j561). Pasarlo todo a 10.° dejaría vacíos los niveles Básico y Medio de esos temas.
- **Priorizados no son DBA.** Ambiente: energías renovables, El Niño y La Niña, huella de carbono y causas del cambio climático quedan `sin` con el curso del priorizado; si el docente prefiere mantener 11.5, el curso mínimo sería 11.
- Funciones: se asignó 8.4|8 a excreción, nervioso y hormonas (curso 8). Digestión, intercambio de gases, circulación y transporte comparados quedan `sin` (ningún DBA nombra esos sistemas).

## Limitaciones
- Abiertas y palabras no traen DBA ni curso en el lote: solo se revisó vocabulario, pistas y nivel. No se resolvieron las preguntas a ciegas (eso lo hace el experto en ciencias).
- No hay distractores en `saber`; no se juzgó la calidad del ítem.
- `1qgk9rq` solo recibe cambio de etiqueta; la reformulación (trisomía 21, 9.4) requiere ver sus opciones.
