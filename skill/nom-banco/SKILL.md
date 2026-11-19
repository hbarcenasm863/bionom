---
name: nom-banco
description: Banco de preguntas y palabras de los sitios del docente (BioNom = biología 6.°–11.°, ChromaNom = química orgánica, IonNom = química inorgánica) con generadores de crucigramas, sopas de letras, ahorcados, talleres, evaluaciones y cuestionarios tipo Saber 11 listos para imprimir con su hoja de respuestas. Úsala SIEMPRE que el docente pida un crucigrama, sopa de letras, ahorcado, taller, quiz, evaluación, cuestionario, preguntas tipo Icfes/Saber 11, preguntas abiertas o ejercicios de nomenclatura de biología o química, o cuando pida escribir preguntas o palabras nuevas para BioNom, ChromaNom o IonNom: primero se usa lo que ya está en el banco y lo nuevo se escribe con las reglas del banco y se revisa con el validador.
---

# Banco y retos de BioNom, ChromaNom e IonNom

El usuario es **docente de ciencias en Colombia** (hombre: «el docente»). Sus tres
sitios comparten reglas de juego y de contenido. Esta skill trae una **copia** de
sus bancos (carpeta `datos/`) y un programa (`scripts/nom.js`) que arma hojas
para imprimir con las mismas reglas de los sitios.

| Sitio | Materia | Qué trae |
|---|---|---|
| `bio` (BioNom) | Biología 6.° a 11.° | 808 preguntas del juego (con curso, DBA del MEN y nivel), 680 tipo Saber, 537 abiertas, 489 palabras |
| `chroma` (ChromaNom) | Química orgánica (11.°) | 863 preguntas (incluye nomenclatura con el dibujo de cada estructura), 373 Saber, 217 abiertas, 146 palabras |
| `ion` (IonNom) | Química inorgánica (10.°) | 378 preguntas, 1023 Saber, 522 abiertas, 162 palabras y 783 compuestos para ejercicios de nomenclatura |

## Paso 1: ver los temas

```bash
node scripts/nom.js temas bio      # o chroma, ion
```

Muestra el id de cada tema (lo que va en `--tema`), cuántas preguntas y palabras
tiene, y los grupos de palabras. **Siempre** usa estos ids; no los inventes.

## Paso 2: generar la hoja

Todas las hojas salen en HTML tamaño carta, con el logo del sitio, los espacios
para Nombre/Curso/Fecha, el pie del sitio y **una segunda página con las
respuestas**. Con `--pdf` también se guarda el PDF (usa Playwright y Chromium).

```bash
# Crucigrama de 10 palabras (pistas 1 y 2 de cada palabra)
node scripts/nom.js crucigrama bio --tema celula --n 10 --pdf
# Sopa de letras: se busca la palabra a partir de su pista (→ ↓ ↘ ↗)
node scripts/nom.js sopa ion --tema atomo --n 10 --pdf
node scripts/nom.js sopa bio --tema reinos --mostrar-palabras --facil   # para 6.°: lista visible, solo → y ↓
# Ahorcado para jugar en parejas (6 fallos; pista 2 al 2.º fallo y pista 3 al 4.º)
node scripts/nom.js ahorcado chroma --tema carbono --n 6
# Taller o evaluación: preguntas del juego + tipo Saber + abiertas
node scripts/nom.js cuestionario bio --tema genetica --juego 10 --saber 5 --abiertas 2 --curso 9 --pdf
# Nomenclatura inorgánica: nombre ↔ fórmula
node scripts/nom.js cuestionario ion --tema ox-bas,sal-bin --juego 0 --compuestos 12 --sistema stock,tradicional --modo mixto
```

Opciones útiles:

- `--tema a,b` varios temas (o un grupo de palabras). `--n` cantidad.
- `--curso 6..11` (BioNom): solo preguntas que corresponden hasta ese curso según los
  DBA. `--nivel basico|medio|completo`: niveles del juego (6.°–7.°, 8.°–9.°, 10.°–11.°).
  `--dba 9.4` solo un DBA.
- `--tipo mc,vf,esc,ord` tipos de pregunta del juego; `--comp uso|exp|ind` competencia
  Saber; `--cortas` opciones de 36 caracteres o menos (las de los laberintos).
- `--semilla 123` repite exactamente la misma hoja (la semilla sale en el pie). Para
  dos versiones de una evaluación (fila A y fila B), usa dos semillas distintas.
- `--titulo "Evaluación 2.° periodo"`, `--instrucciones "…"`, `--lineas 6` (renglones
  de las abiertas), `--sin-respuestas`, `--sin-barajar`, `--pistas 1|2|3` (crucigrama),
  `--pistas-aparte` (ahorcado: pistas 2 y 3 solo en la hoja del docente), `--lado 15` (sopa).
- `--salida ruta/hoja.html` (por defecto `./salida/`).

Para **buscar** preguntas y usarlas en otro formato (Word, diapositivas, chat):

```bash
node scripts/nom.js buscar bio --de saber --tema ecosistemas --curso 7 --n 5
node scripts/nom.js buscar ion --de compuestos --tema ac-ox --nivel easy --n 10
```

`--de` puede ser `juego`, `saber`, `abiertas`, `palabras` o `compuestos`; `--texto` busca
una palabra. El formato de cada pregunta está en `referencias/formato.md`.

## Paso 3: entregar

- **Pidió PDF o «para imprimir»** → `--pdf` y entrega el PDF (y el HTML si quiere editarlo).
  Si no hay Playwright, abre el HTML en el navegador → Imprimir → Guardar como PDF, o
  conviértelo con la herramienta de PDF que tengas.
- **Pidió Word** → arma el documento con la skill de Word usando lo que devuelve `buscar`
  (o el HTML como guía), con la hoja de respuestas al final.
- **En el chat** → muestra las preguntas y deja la clave al final, separada.
- Di siempre de dónde salió (sitio, temas, curso) y la semilla, para poder repetirla.

## Preguntas o palabras NUEVAS

Primero usa el banco: crea contenido nuevo solo cuando el docente lo pida o cuando el
banco no alcance para lo que pide (el programa avisa «Solo hay N…»). Lo nuevo:

1. Se escribe en un archivo JSON con el formato común (ver `referencias/formato.md`) y
   siguiendo `referencias/reglas.md` (2 pistas que no regalan la respuesta, explicación
   completa, distractores creíbles de longitud parecida, competencia y afirmación del
   Icfes en las Saber, DBA y curso en BioNom, sin fórmulas con ramas entre paréntesis…).
2. **Se revisa siempre** con el validador y se corrige hasta que no queden errores:
   ```bash
   node scripts/nom.js validar bio nuevas.json
   ```
   Revisa reglas de forma, que la palabra o la pregunta no estén ya en el banco y que
   la clave no se delate por ser la más larga.
3. Se puede usar de una vez en una hoja: `cuestionario bio --desde nuevas.json`,
   `crucigrama bio --desde palabras.json` (también sopa y ahorcado).
4. Si el docente quiere **sumarlas a su sitio**, pásalas al formato del archivo del sitio:
   ```bash
   node scripts/nom.js exportar bio nuevas.json
   ```
   Dice en qué archivo y en qué arreglo va cada bloque. En el repositorio, seguir su
   `CLAUDE.md` (subir `CACHE` en `sw.js`, `?v=`, historial…).

Para ChromaNom, toda estructura nueva se dibuja con la skill `chromanom-estructuras`
(semidesarrollada con todos sus enlaces); el SVG va en el campo `svg` de la pregunta y
la hoja lo pone encima del enunciado. Las preguntas de nomenclatura que ya están en el
banco traen su dibujo.

## Sin Node

Si no puedes correr `node`, lee `datos/<sitio>.json` (con Python u otra herramienta) y
arma la hoja a mano respetando las mismas reglas: crucigrama y sopa de 10 palabras sin
tildes (la Ñ es una letra), pista con el número de letras, sopa en → ↓ ↘ ↗ con cada
palabra una sola vez, ahorcado de 6 fallos, y hoja de respuestas aparte.

## Actualizar la copia del banco

Los datos se copiaron de los repositorios en la fecha que muestra `temas`. Para
actualizarlos: en el repositorio de BioNom, con ChromaNom e IonNom al lado, correr
`node herramientas/armar-skill-banco.js` y volver a subir `skill/nom-banco.zip` a
claude.ai (Configuración → Capacidades → Skills).
