/**
 * BioNom Analytics — Google Apps Script
 * ═══════════════════════════════════════════════════════════════════════════
 * Backend de analíticas para el juego de biología (BioNom).
 * Misma arquitectura y mismas reglas de negocio que Chromanom Analytics
 * (nomenclatura orgánica), adaptado a los temas y al periodo de BioNom (copiado de IonNom Analytics).
 *
 * FORMATO DEL PAYLOAD que envía juego.html por POST (JSON) — ver _buildPayload
 * en juego.html para la implementación real:
 * {
 *   sesion:          'S1a2b3c4',         // código único por partida, el MISMO
 *                                        // en todos los eventos de esa sesión
 *   trigger:         'fin'|'abandono',   // (alias: 'razon', por compatibilidad)
 *   nombre:          'Juan Pérez',
 *   curso:           '10-1',
 *   grupo:           'Óxidos y Anhídridos', // TEMA jugado — esto es lo que llena
 *                                        // la columna "Nivel" de Registro (ver
 *                                        // TEMAS_PRINCIPALES para la lista completa)
 *   nivel:           'Experto',          // rango de desempeño de la sesión — NO es
 *                                        // el tema; se ignora para la columna "Nivel"
 *   correctas:       15,
 *   total:           20,   (alias: total_preguntas)
 *   pct / porcentaje: 75,               // informativos — el % real se recalcula
 *                                        // siempre desde correctas/total
 *   errores_mc, errores_drag, errores_id, errores_write: number, // por tipo de pregunta
 *   tiempo_agotado:  0,                 // el juego no tiene cronómetro; siempre 0
 *   errores_por_tema:  {'Óxidos y Anhídridos': 2, 'Sales binarias': 1},
 *   aciertos_por_tema: {'Óxidos y Anhídridos': 8}, // solo se llena si la sesión
 *                                        // fue de un único grupo (no en modo
 *                                        // "Todos los grupos")
 *   moleculas_falladas: ['Fe2O3', 'NaCl'] // fórmulas falladas en la sesión
 * }
 * Se aceptan alias en camelCase para los campos nuevos (erroresMc, tiempoAgotado,
 * etc.) y nombres previos (errores_tema/aciertos_tema, fallados) por compatibilidad
 * con versiones previas del payload. Los campos no reconocidos se ignoran.
 *
 * ENDPOINT GET ?accion=stats&nombre=...&curso=... — usado por juego.html
 * (loadStudentStats) justo después de validar el código del alumno, para
 * mostrarle sus métricas acumuladas. Responde JSON:
 * {
 *   ok:true, existe:true|false,
 *   numSesiones, totalPreguntas, pctGlobal,       // HISTÓRICO (todas las partidas
 *                                                  // jugadas alguna vez) — esto es
 *                                                  // lo que cuenta para el reto de
 *                                                  // las 1000 preguntas / 80%.
 *   numSesionesPeriodo, totalPreguntasPeriodo,
 *   pctGlobalPeriodo, notaJuego,                   // PERIODO ACADÉMICO vigente
 *                                                  // (FECHA_INICIO_PERIODO..FECHA_FIN_PERIODO)
 *                                                  // — esto es lo que cuenta para la Nota.
 *   periodo: { inicio, fin, sesionesEsperadas }     // para que el frontend muestre las
 *                                                  // fechas exactas sin duplicarlas a mano.
 * }
 * "nombre" y "curso" son los mismos STUDENT_NAME/STUDENT_COURSE que el
 * frontend resuelve a partir de la respuesta de ?accion=validarCodigo (ver
 * abajo) antes de llamar aquí.
 * Lee de la hoja "Estadísticas" ya calculada (disparador automático cada 30
 * min, o recalcularAhora()) — NO recalcula nada al vuelo desde "Registro",
 * misma arquitectura que Chromanom Analytics. El dato puede tener hasta ~30
 * min de rezago frente a la última partida jugada.
 *
 * ENDPOINT GET ?accion=validarCodigo&codigo=100401 — usado por juego.html
 * (validateCode) al entrar en Modo Estudiante. Reemplaza el listado STUDENTS
 * que antes vivía hardcodeado (con nombres reales de menores) en el propio
 * HTML público. Lee la hoja "Estudiantes" (Código | Nombre | Curso), que el
 * docente edita directamente en Sheets. Responde JSON:
 * { ok:true, existe:true|false, nombre, curso }
 */

// ── Configuración general ───────────────────────────────────────────────────
// Si SPREADSHEET_ID apunta a una hoja real y accesible, se usa esa. Si está
// vacío o ya no es válido, obtenerSpreadsheet() crea una nueva con este nombre
// y recuerda su ID (PropertiesService) para no crear una hoja distinta en cada
// ejecución — así el requisito de "crear si no existe" no depende de editar
// esta constante a mano.
const SPREADSHEET_ID   = ''; // Vacío: la primera vez se crea sola la hoja «BioNom — Registro de resultados» en el Drive del docente. Si prefiere usar una hoja suya, pegue aquí su ID.
const SPREADSHEET_NAME = 'BioNom — Registro de resultados';
const TZ = 'America/Bogota';

// Verificación de despliegue (Regla 7): abrir la URL de la Web App en el
// navegador debe mostrar este texto — así se sabe con certeza qué versión del
// código está realmente en producción y no una implementación vieja en caché.
const BUILD_TAG = 'BioNom Analytics v1.0 — 2026-11-10 — basado en IonNom Analytics v3.3';

// Periodo académico vigente y meta de sesiones (Regla 5 — Nota de juego).
// Ajustar estas tres constantes al iniciar cada periodo.
const FECHA_INICIO_PERIODO = '2026-08-10'; // yyyy-MM-dd
const FECHA_FIN_PERIODO    = '2026-10-30'; // yyyy-MM-dd
const SESIONES_ESPERADAS   = 22;           // ≈ 2 veces por semana durante el periodo
// Tamaño estándar de una sesión (ver buildQuestionQueue(pool,20) en
// juego.html, usado por TODOS los modos de juego) — se usa para rellenar
// con preguntas fallidas las sesiones que le falten a un estudiante para
// llegar a SESIONES_ESPERADAS (ver calcularNotaJuego).
const PREGUNTAS_POR_SESION = 20;

// Reto especial de premiación (ver juego.html: misma meta que se le muestra
// al estudiante en su tarjeta de estadísticas — "Reto 1.000 preguntas").
// RETO_META_PREGUNTAS es HISTÓRICO (cuenta todo lo jugado alguna vez), pero
// RETO_META_PCT se exige del PERIODO ACADÉMICO VIGENTE (ver
// calcularRetoMilPreguntas) — igual que la Nota de juego, para no penalizar
// para siempre un acierto histórico bajo de cuando el estudiante apenas
// empezaba a jugar, meses atrás.
const RETO_META_PREGUNTAS = 1000;
const RETO_META_PCT = 80;

// Grupos funcionales/temas del juego — deben coincidir EXACTAMENTE con los
// valores de GROUP_LABELS en juego.html (es lo que el frontend manda como
// "grupo"/tema de cada sesión). Se usan como columnas fijas de "% acierto por
// tema" en Estadísticas y como filas base de "Eficacia por tema" (cualquier
// tema adicional que llegue en los datos igual se agrega dinámicamente, para
// no perder información por un nombre de tema no previsto aquí — ver
// calcularEficaciaPorTema). El juego cubre más que solo nomenclatura
// inorgánica (también balanceo, estequiometría, tabla periódica, tipos de
// reacción), así que la lista refleja eso.
const TEMAS_PRINCIPALES = [
  'La célula',
  'División celular',
  'Reinos y clasificación',
  'Sistemas del cuerpo',
  'Funciones vitales comparadas',
  'Nutrición y salud',
  'Reproducción',
  'Genética',
  'Evolución',
  'Ecosistemas',
  'Ecosistemas de Colombia',
  'Ambiente y cambio climático',
  'Todos los temas'
];

// ── Columnas de "Registro" (1-based) ────────────────────────────────────────
const COL = {
  TIMESTAMP: 1, FECHA: 2, HORA: 3, NOMBRE: 4, CURSO: 5, NIVEL: 6, SESION: 7,
  CORRECTAS: 8, TOTAL: 9, PCT: 10, ERR_MC: 11, ERR_DRAG: 12, ERR_ID: 13,
  ERR_WRITE: 14, TIEMPO_AGOTADO: 15, ERR_TEMA: 16, ACIERTOS_TEMA: 17,
  FALLADOS: 18, TRIGGER: 19
};

const REG_HEADERS = [
  'Timestamp', 'Fecha', 'Hora', 'Nombre', 'Curso', 'Nivel', 'Sesión',
  'Correctas', 'Total', '% Acierto', 'Errores MC', 'Errores Drag',
  'Errores ID', 'Errores Write', 'Tiempo agotado', 'Errores por tema',
  'Aciertos por tema', 'Preguntas falladas', 'Trigger', 'Modelo de reinos', 'Nivel del juego'
];

const EST_HEADERS_BASE = [
  'Nombre', 'Curso', 'Sesiones', 'Preguntas respondidas',
  '% Acierto global', 'Nota juego (0-5)'
];

// Van al FINAL de "Estadísticas" (después de las columnas por tema), igual
// que "Errores Build"/"Errores Rxnq" al final de Registro en Chromanom: así
// no corren el índice fijo de columnas 1-6 que ya lee responderEstadisticasEstudiante().
const EST_HEADERS_PERIODO = [
  'Sesiones en el periodo', 'Preguntas en el periodo', '% Acierto en el periodo'
];

const EFI_HEADERS = ['Tema', 'Correctas', 'Errores', 'Total intentos', '% Acierto'];

const CURSO_HEADERS = [
  'Nombre', 'Sesiones', 'Preguntas respondidas', '% Acierto',
  'Nota juego (0-5)', 'Última sesión'
].concat(EST_HEADERS_PERIODO);

const RETO_HEADERS = [
  'Puesto', 'Nombre', 'Curso', 'Fecha de logro', 'Hora de logro',
  'Preguntas respondidas (histórico)', '% de acierto (periodo actual)'
];

// ══════════════════════════════════════════════════════════════════════════
// PUNTOS DE ENTRADA HTTP
// ══════════════════════════════════════════════════════════════════════════

function doGet(e) {
  const accion = String((e && e.parameter && e.parameter.accion) || '').trim();
  if (accion === 'stats') return responderEstadisticasEstudiante(e);
  if (accion === 'validarCodigo') return responderValidarCodigo(e);

  // Texto plano simple: sirve para confirmar en el navegador, sin ambigüedad,
  // qué implementación (deployment) está realmente activa en producción.
  const texto = 'BioNom Analytics activo.\n' +
    'BUILD_TAG: ' + BUILD_TAG + '\n' +
    'Spreadsheet: ' + obtenerSpreadsheet().getUrl();
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.TEXT);
}

// ── Estadísticas de UN estudiante (sesiones, preguntas, % acierto, nota) ────
// Llamado por juego.html justo después de validar el código de acceso, para
// mostrarle sus métricas acumuladas (igual que hace Chromanom con las suyas).
// El backend no conoce el código del alumno (solo Nombre/Curso, que es lo
// que upsertRegistro guarda) — por eso recibe nombre y curso por query string,
// los mismos valores (STUDENT_NAME/STUDENT_COURSE) que el frontend ya resolvió
// desde su propio listado de códigos antes de llamar aquí.
//
// Lee de la hoja "Estadísticas" YA CALCULADA por el disparador automático
// cada 30 min (o por recalcularAhora()) — NO recalcula nada al vuelo desde
// "Registro". Recalcular en cada consulta competiría por el mismo
// LockService que usa upsertRegistro() y arriesgaría la misma sobrecarga
// ("Too many simultaneous invocations: Spreadsheets") que ya afectaba los
// envíos de resultados con varios estudiantes entrando su código a la vez.
// El dato puede tener hasta ~30 min de rezago — aceptable para un resumen
// de "cómo voy", igual que en Chromanom.
function responderEstadisticasEstudiante(e) {
  const nombre = String((e && e.parameter && e.parameter.nombre) || '').trim();
  const curso = String((e && e.parameter && e.parameter.curso) || '').trim();
  const periodo = { inicio: FECHA_INICIO_PERIODO, fin: FECHA_FIN_PERIODO, sesionesEsperadas: SESIONES_ESPERADAS };
  const vacio = function () {
    return {
      ok: true, existe: false,
      numSesiones: 0, totalPreguntas: 0, pctGlobal: 0, notaJuego: 0,
      numSesionesPeriodo: 0, totalPreguntasPeriodo: 0, pctGlobalPeriodo: 0,
      periodo: periodo
    };
  };
  if (!nombre) return salidaJSON({ ok: false, error: 'falta nombre' });

  // Reintento corto con jitter (sin lock propio: esta es una lectura, no
  // compite por el mismo LockService que usan upsertRegistro/recalcularTodasLasEstadisticas)
  // por si toda una clase consulta su progreso casi al mismo tiempo al
  // arrancar sesión y la hoja tropieza con el mismo error transitorio de
  // cuota que puede darse en escrituras concurrentes.
  const INTENTOS = 3;
  let ultimoError;
  for (let intento = 0; intento < INTENTOS; intento++) {
    try {
      const ss = obtenerSpreadsheet();
      const sh = ss.getSheetByName('Estadísticas');
      if (!sh || sh.getLastRow() < 2) return salidaJSON(vacio());

      // Columnas fijas de "Estadísticas" (ver calcularEstadisticas()): Nombre,
      // Curso, Sesiones, Preguntas respondidas, % Acierto global, Nota juego,
      // ...(% por tema, TEMAS_PRINCIPALES.length columnas)..., Sesiones en el
      // periodo, Preguntas en el periodo, % Acierto en el periodo (últimas 3).
      const totalCols = EST_HEADERS_BASE.length + TEMAS_PRINCIPALES.length + EST_HEADERS_PERIODO.length;
      const datos = sh.getRange(2, 1, sh.getLastRow() - 1, totalCols).getValues();
      const pOffset = EST_HEADERS_BASE.length + TEMAS_PRINCIPALES.length; // índice 0-based de la 1ª columna de periodo
      const buscado = normalizarNombreClave(nombre) + '|' + (curso || '(Sin curso)');
      for (let i = 0; i < datos.length; i++) {
        const r = datos[i];
        const claveFila = normalizarNombreClave(r[0]) + '|' + String(r[1] || '(Sin curso)');
        if (claveFila !== buscado) continue;
        return salidaJSON({
          ok: true, existe: true,
          numSesiones: Number(r[2]) || 0,
          totalPreguntas: Number(r[3]) || 0,
          pctGlobal: Number(r[4]) || 0,
          notaJuego: Number(r[5]) || 0,
          numSesionesPeriodo: Number(r[pOffset]) || 0,
          totalPreguntasPeriodo: Number(r[pOffset + 1]) || 0,
          pctGlobalPeriodo: Number(r[pOffset + 2]) || 0,
          periodo: periodo
        });
      }
      return salidaJSON(vacio());
    } catch (err) {
      ultimoError = err;
      if (intento < INTENTOS - 1) {
        const base = 400 * Math.pow(1.8, intento);
        const jitter = Math.random() * 300;
        Utilities.sleep(Math.min(base + jitter, 1500));
      }
    }
  }
  registrarError('responderEstadisticasEstudiante', ultimoError);
  return salidaJSON({ ok: false, error: String((ultimoError && ultimoError.message) || ultimoError) });
}

// ══════════════════════════════════════════════════════════════════════════
// HOJA "Estudiantes" — listado de códigos válidos (Código → Nombre, Curso)
// ══════════════════════════════════════════════════════════════════════════
// Antes este listado vivía como un objeto STUDENTS hardcodeado en texto
// plano dentro de juego.html — visible para cualquiera que abriera "ver
// código fuente" en el repositorio público de GitHub Pages, incluyendo el
// nombre completo de cada estudiante (protección de datos de menores). Se
// migró aquí: el docente edita esta hoja directamente en Sheets (agregar,
// corregir o quitar un estudiante ya NO requiere tocar ni redesplegar
// juego.html), y el frontend valida el código contra responderValidarCodigo()
// en vez de mirar un listado local.
const ESTUDIANTES_HEADERS = ['Código', 'Nombre', 'Curso'];

function obtenerHojaEstudiantes_(ss) {
  let sh = ss.getSheetByName('Estudiantes');
  if (!sh) {
    sh = ss.insertSheet('Estudiantes');
    sh.getRange(1, 1, 1, ESTUDIANTES_HEADERS.length).setValues([ESTUDIANTES_HEADERS])
      .setBackground('#343a40').setFontColor('#ffffff').setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.setColumnWidth(1, 90);
    sh.setColumnWidth(2, 320);
    sh.setColumnWidth(3, 90);
  }
  return sh;
}

// ── Validar código de estudiante (GET ?accion=validarCodigo&codigo=100401) ──
// Llamado por juego.html (validateCode) al entrar en Modo Estudiante, en vez
// de mirar el listado STUDENTS que antes vivía hardcodeado en el HTML. Solo
// lee la hoja "Estudiantes" — no hay recálculo ni escritura, así que no
// compite por el LockService que usan doPost/recalcularTodasLasEstadisticas.
function responderValidarCodigo(e) {
  const codigo = String((e && e.parameter && e.parameter.codigo) || '').trim();
  if (!codigo) return salidaJSON({ ok: false, error: 'falta código' });

  const INTENTOS = 3;
  let ultimoError;
  for (let intento = 0; intento < INTENTOS; intento++) {
    try {
      const ss = obtenerSpreadsheet();
      const sh = obtenerHojaEstudiantes_(ss);
      if (sh.getLastRow() < 2) return salidaJSON({ ok: true, existe: false });

      const datos = sh.getRange(2, 1, sh.getLastRow() - 1, ESTUDIANTES_HEADERS.length).getValues();
      for (let i = 0; i < datos.length; i++) {
        if (String(datos[i][0]).trim() === codigo) {
          return salidaJSON({
            ok: true, existe: true,
            nombre: String(datos[i][1] || ''),
            curso: String(datos[i][2] || '')
          });
        }
      }
      return salidaJSON({ ok: true, existe: false });
    } catch (err) {
      ultimoError = err;
      if (intento < INTENTOS - 1) {
        const base = 400 * Math.pow(1.8, intento);
        const jitter = Math.random() * 300;
        Utilities.sleep(Math.min(base + jitter, 1500));
      }
    }
  }
  registrarError('responderValidarCodigo', ultimoError);
  return salidaJSON({ ok: false, error: String((ultimoError && ultimoError.message) || ultimoError) });
}

// OJO: ya NO recalcula Estadísticas/Eficacia por tema/Curso X en cada envío
// (a diferencia de versiones anteriores de este script). Con una clase
// completa (~25-30 estudiantes) terminando casi al mismo tiempo, hacerlo
// aquí saturaba la ejecución y producía el error transitorio de Google
// "Too many simultaneous invocations: Spreadsheets" — que el frontend
// mostraba como un genérico "error al enviar", sin relación real con la
// URL del Apps Script. El recálculo pesado ahora lo hace solo el
// disparador automático cada 30 min (ver actualizarEstadisticasAutomatico)
// o recalcularAhora() manualmente — misma arquitectura que Chromanom.
// appendRow (vía upsertRegistro) es rápido y sigue pasando al instante.
function doPost(e) {
  // El JSON se parsea UNA sola vez, fuera del bucle de reintentos: un
  // payload malformado fallaría siempre igual, así que reintentarlo no
  // ayudaría — solo desperdiciaría los intentos que sí sirven para el
  // error transitorio de cuota de Spreadsheets.
  let d;
  try {
    d = JSON.parse(e.postData ? e.postData.contents : '{}');
  } catch (err) {
    registrarError('doPost', err);
    return salidaJSON({ ok: false, error: 'JSON inválido: ' + String((err && err.message) || err) });
  }

  // INTENTOS=4 / waitLock=6s (antes: 6 intentos de 15s cada uno — hasta ~90s
  // solo esperando el lock, sin contar el backoff entre intentos). El
  // frontend (_postConReintento/sendResults en juego.html) YA reintenta por
  // su cuenta 3 veces con su propio backoff si recibe {ok:false} o la
  // conexión falla, así que el servidor no necesita ser tan persistente:
  // cuanto más tiempo retiene doPost() un slot de ejecución reintentando
  // internamente, menos slots quedan libres para las demás solicitudes
  // concurrentes de la clase — justo lo que puede escalar a "Too many
  // simultaneous invocations: Spreadsheets". Fallar más rápido y dejar que
  // el reintento del cliente (con una solicitud NUEVA, no la misma colgada)
  // se acomode reduce la congestión en vez de alimentarla. Además,
  // recalcularTodasLasEstadisticas() ahora solo retiene este mismo lock
  // durante la LECTURA de "Registro" (antes retenía el lock durante todo el
  // recálculo + reescritura de 4 hojas), así que hay muchas menos
  // probabilidades de toparse con el lock ocupado en primer lugar.
  const INTENTOS = 4;
  let ultimoError;
  for (let intento = 0; intento < INTENTOS; intento++) {
    // La búsqueda/escritura de la fila en "Registro" va bajo lock (evita que
    // dos envíos concurrentes calculen la misma fila destino y se pisen),
    // pero el lock se toma y suelta EN CADA INTENTO, no una sola vez afuera:
    // así, si updateStats() (disparador de 30 min o recalcularAhora) tiene
    // el lock ocupado en ese instante, este intento falla rápido y el
    // siguiente (con jitter) tiene otra oportunidad, en vez de quedarse
    // esperando cerca del límite de ejecución de Apps Script (6 min).
    const lock = LockService.getScriptLock();
    try {
      lock.waitLock(6000);
    } catch (err) {
      ultimoError = new Error('No se obtuvo el lock (servidor congestionado): ' + err);
      if (intento < INTENTOS - 1) {
        const base = 1000 * Math.pow(1.7, intento);
        const jitter = Math.random() * 500;
        Utilities.sleep(Math.min(base + jitter, 4000));
      }
      continue;
    }
    try {
      const ss = obtenerSpreadsheet();
      upsertRegistro(ss, d);
      return salidaJSON({ ok: true });
    } catch (err) {
      ultimoError = err;
      if (intento < INTENTOS - 1) {
        const base = 1000 * Math.pow(1.7, intento);
        const jitter = Math.random() * 500;
        Utilities.sleep(Math.min(base + jitter, 4000));
      }
    } finally {
      lock.releaseLock();
    }
  }
  registrarError('doPost', ultimoError);
  return salidaJSON({ ok: false, error: String((ultimoError && ultimoError.message) || ultimoError) });
}

function salidaJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ── Obtener (o crear) el spreadsheet de destino ─────────────────────────────
function obtenerSpreadsheet() {
  if (SPREADSHEET_ID) {
    try { return SpreadsheetApp.openById(SPREADSHEET_ID); } catch (err) { /* ID inválido, seguimos con el fallback */ }
  }
  const props = PropertiesService.getScriptProperties();
  const idGuardado = props.getProperty('SPREADSHEET_ID_CREADO');
  if (idGuardado) {
    try { return SpreadsheetApp.openById(idGuardado); } catch (err) { /* también inválido, se recrea abajo */ }
  }
  const nuevo = SpreadsheetApp.create(SPREADSHEET_NAME);
  props.setProperty('SPREADSHEET_ID_CREADO', nuevo.getId());
  return nuevo;
}

// ══════════════════════════════════════════════════════════════════════════
// HOJA "Registro" — upsert por código de sesión (Regla 1)
// ══════════════════════════════════════════════════════════════════════════
// Un mismo código de sesión llega varias veces (inicio, fin_partida/cierre/
// manual). Si cada evento se añadiera como fila nueva, la misma partida
// quedaría duplicada varias veces y las estadísticas de "Sesiones" quedarían
// infladas. Por eso: buscar primero por código de Sesión y actualizar esa
// fila en lugar de añadir una nueva.
function upsertRegistro(ss, d) {
  const sh = obtenerHojaRegistro(ss);

  const sesionCod = String(d.sesion || d.codigoSesion || d.sessionId || '').trim();
  const trigger = String(d.trigger || d.razon || d.evento || '').trim();
  // juego.html manda "total"/"total_preguntas" como el tamaño COMPLETO de la
  // sesión (20), sin importar si el estudiante la abandonó a medio camino —
  // "respondidas" es lo que sí refleja cuántas preguntas llegó a ver antes de
  // salir. Si se usa el tamaño completo como denominador de una sesión
  // abandonada, un estudiante que acierta la única pregunta que alcanzó a
  // responder (1 de 1) queda registrado con 1/20 = 5% en vez de 1/1 = 100%,
  // hundiendo su % de acierto y su Nota de juego por preguntas que nunca
  // llegó a ver. Para 'abandono' se usa "respondidas" como Total; para 'fin'
  // no cambia nada (una sesión terminada siempre respondió las 20).
  const totalCompleto = Number(d.total || d.total_preguntas || 0) || 0;
  const respondidasCrudas = Number(d.respondidas || 0) || 0;
  const total = trigger === 'abandono' ? Math.min(respondidasCrudas, totalCompleto || respondidasCrudas) : totalCompleto;
  const correctasCrudas = Number(d.correctas || 0) || 0;
  const correctas = total > 0 ? Math.min(correctasCrudas, total) : correctasCrudas;
  const pct = total > 0 ? Math.round((correctas / total) * 100) : Math.round(Number(d.porcentaje || 0) || 0);

  const erroresTema = (d.errores_por_tema || d.errores_tema || d.erroresTema || {});
  const aciertosTema = (d.aciertos_por_tema || d.aciertos_tema || d.aciertosTema || {});
  const fallados = d.moleculas_falladas || d.fallados || d.compuestos_fallados || [];
  const falladosTxt = Array.isArray(fallados) ? fallados.join(', ') : String(fallados || '');
  // El "Nivel" de esta hoja es el TEMA/grupo funcional jugado, que el frontend
  // manda en "grupo" (p. ej. "Óxidos y Anhídridos"). El campo "nivel" que
  // manda juego.html es en realidad el rango de desempeño (Experto/Avanzado/
  // Principiante...), no un tema — por eso "grupo" tiene prioridad aquí.
  const tema = String(d.grupo || d.nivel || '').trim();

  // Buscar la fila de esta sesión, si ya existe. Antes se leía y recorría
  // TODA "Registro" en cada envío, bajo el candado -- a medida que la hoja
  // crece con el semestre, esa búsqueda se vuelve más lenta, retiene el
  // candado más tiempo, y genera más "No se obtuvo el lock (servidor
  // congestionado)" para los demás estudiantes que envían al mismo tiempo
  // (empeora solo con el tiempo, nunca mejora -- confirmado en la hoja
  // "Errores": ráfagas de ese error que se repiten en varios días).
  // Los eventos de UNA misma sesión de juego (inicio -> fin/abandono)
  // llegan separados por minutos, no por días, así que basta buscar en las
  // últimas VENTANA_BUSQUEDA_SESION filas (las más recientes). Si una
  // concurrencia extremadamente alta hiciera que esa fila ya no esté en la
  // ventana, no se encuentra y se crea una fila nueva en vez de actualizar
  // la existente -- un duplicado ocasional, no una pérdida de datos:
  // limpiarRegistroDuplicados() ya existe para ese caso.
  const VENTANA_BUSQUEDA_SESION = 500;
  let filaExistente = -1;
  let timestampOriginal = null;
  if (sesionCod && sh.getLastRow() > 1) {
    const filaInicio = Math.max(2, sh.getLastRow() - VENTANA_BUSQUEDA_SESION + 1);
    const numFilas = sh.getLastRow() - filaInicio + 1;
    const datos = sh.getRange(filaInicio, 1, numFilas, REG_HEADERS.length).getValues();
    for (let i = datos.length - 1; i >= 0; i--) {
      if (String(datos[i][COL.SESION - 1]).trim() === sesionCod) {
        filaExistente = filaInicio + i;
        timestampOriginal = datos[i][COL.TIMESTAMP - 1];
        break;
      }
    }
  }

  // El Timestamp se fija con la hora del servidor al recibir el primer evento
  // de la sesión (no con el reloj del navegador del estudiante, que puede
  // estar desincronizado, ni parseando el string que manda el cliente, cuyo
  // formato sin zona horaria se presta a interpretarse mal). Al actualizar,
  // se conserva ese Timestamp original — nunca se pisa (Regla 1).
  const timestamp = (filaExistente !== -1 && timestampOriginal instanceof Date) ? timestampOriginal : new Date();
  const fecha = Utilities.formatDate(timestamp, TZ, 'yyyy-MM-dd');
  const hora = Utilities.formatDate(timestamp, TZ, 'HH:mm:ss');

  const fila = [
    timestamp, fecha, hora,
    String(d.nombre || ''), String(d.curso || ''), tema,
    sesionCod, correctas, total, pct,
    Number(d.errores_mc || d.erroresMc || 0) || 0,
    Number(d.errores_drag || d.erroresDrag || 0) || 0,
    Number(d.errores_id || d.erroresId || 0) || 0,
    Number(d.errores_write || d.erroresWrite || 0) || 0,
    Number(d.tiempo_agotado || d.tiempoAgotado || 0) || 0,
    JSON.stringify(erroresTema || {}),
    JSON.stringify(aciertosTema || {}),
    falladosTxt,
    trigger,
    String(d.modelo_reinos || ''), // p. ej. «6 reinos con 3 dominios» (versión 2.21)
    String(d.nivel_juego || '')    // Básico, Medio o Completo (versión 2.31)
  ];

  let filaIdx;
  if (filaExistente !== -1) {
    sh.getRange(filaExistente, 1, 1, fila.length).setValues([fila]);
    filaIdx = filaExistente;
  } else {
    sh.appendRow(fila);
    filaIdx = sh.getLastRow();
  }
  sh.getRange(filaIdx, 1, 1, fila.length).setBackground(colorPorPorcentaje(pct));
}

function obtenerHojaRegistro(ss) {
  let sh = ss.getSheetByName('Registro');
  if (!sh) {
    sh = ss.insertSheet('Registro');
    escribirEncabezadosRegistro(sh);
  } else {
    // La hoja ya existía (posiblemente con datos del esquema anterior de
    // IonNom Analytics v1) — migrarla si hace falta antes de usarla.
    migrarRegistroSiEsNecesario(sh);
  }
  // Con cada versión anterior del script, los datos reales quedaron
  // repartidos en OTRAS pestañas del mismo spreadsheet (ver
  // migrarDatosHistoricosSiEsNecesario_) — se incorporan aquí también, una
  // sola vez, para que esas sesiones jugadas antes de este despliegue sigan
  // contando.
  migrarDatosHistoricosSiEsNecesario_(ss, sh);
  return sh;
}

// Completa con celdas vacías las filas migradas que tengan menos columnas que
// REG_HEADERS (por ejemplo, sin «Modelo de reinos»).
function rellenarFilas_(filas) {
  filas.forEach(function (f) { while (f.length < REG_HEADERS.length) f.push(''); });
  return filas;
}

function escribirEncabezadosRegistro(sh) {
  sh.getRange(1, 1, 1, REG_HEADERS.length).setValues([REG_HEADERS])
    .setBackground('#343a40').setFontColor('#ffffff').setFontWeight('bold');
  sh.setFrozenRows(1);
}

// Migración del esquema viejo (IonNom Analytics v1) al nuevo, para que los
// datos ya guardados en producción NO se pierdan y sigan contando en
// Sesiones/Estadísticas/Eficacia por tema. Es idempotente: si el encabezado
// ya es el nuevo, no hace nada; si no reconoce el encabezado (ni nuevo ni el
// viejo v1), no toca la hoja y deja constancia en "Errores" para revisión
// manual — mejor no migrar que migrar mal y perder datos.
function migrarRegistroSiEsNecesario(sh) {
  if (sh.getLastRow() < 1) { escribirEncabezadosRegistro(sh); return; }

  const anchoActual = Math.max(sh.getLastColumn(), 1);
  const encabezadoActual = sh.getRange(1, 1, 1, anchoActual).getValues()[0].map(String);

  const yaEsNuevo = REG_HEADERS.every(function (h, i) { return encabezadoActual[i] === h; });
  if (yaEsNuevo) return;
  // Hoja con todas las columnas menos la última, «Modelo de reinos» (versión
  // 2.21): basta con escribir el encabezado nuevo; las filas viejas quedan en
  // blanco en esa columna.
  // Lo mismo si faltan las dos últimas («Modelo de reinos» y «Nivel del juego», 2.31).
  for (let n = REG_HEADERS.length - 1; n >= REG_HEADERS.length - 2; n--) {
    if (REG_HEADERS.slice(0, n).every(function (h, i) { return encabezadoActual[i] === h; }) && !encabezadoActual[n]) {
      escribirEncabezadosRegistro(sh);
      return;
    }
  }

  // Esquema de IonNom Analytics v1: cada fila vieja YA era una sesión real y
  // distinta (ese script no hacía upsert ni las duplicaba), así que basta con
  // reordenar/completar columnas — no hay riesgo de colapsar sesiones legítimas.
  const HEADERS_VIEJOS = ['Timestamp', 'Código', 'Nombre', 'Curso', 'Grupo/Tema',
    'Respondidas', 'Total', 'Correctas', 'Intentos', 'Puntaje', 'Porcentaje',
    'Calificación', 'Nivel', 'Razón'];
  const esViejo = HEADERS_VIEJOS.every(function (h, i) { return encabezadoActual[i] === h; });
  if (!esViejo) {
    registrarError('migrarRegistroSiEsNecesario',
      new Error('Encabezado de "Registro" no reconocido, no se migró automáticamente: ' + JSON.stringify(encabezadoActual)));
    return;
  }

  const filasViejas = sh.getLastRow() > 1
    ? sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS_VIEJOS.length).getValues()
    : [];

  const filasNuevas = filasViejas.map(function (r, i) {
    const tsCruda = r[0] instanceof Date ? r[0] : new Date(r[0]);
    const timestamp = (tsCruda instanceof Date && !isNaN(tsCruda)) ? tsCruda : new Date();
    const fecha = Utilities.formatDate(timestamp, TZ, 'yyyy-MM-dd');
    const hora = Utilities.formatDate(timestamp, TZ, 'HH:mm:ss');

    const codigoEstudiante = String(r[1] || '');
    const nombre = String(r[2] || '');
    const curso = String(r[3] || '');
    const tema = String(r[4] || ''); // "Grupo/Tema" viejo → Nivel/tema nuevo
    const total = Number(r[6]) || 0;
    const correctas = Number(r[7]) || 0;
    const pct = total > 0 ? Math.round((correctas / total) * 100) : (Number(r[10]) || 0);
    const razon = String(r[13] || '');

    // No existía código de sesión en v1 (el "Código" viejo era el código del
    // ALUMNO, repetido en todas sus partidas) — se sintetiza uno único por
    // fila combinando código de alumno + timestamp + índice, para que cada
    // fila vieja siga contando como una sesión distinta y no se colapsen
    // entre sí con la Regla 2 de deduplicación.
    const sesionSintetica = 'MIG_' + codigoEstudiante + '_' +
      Utilities.formatDate(timestamp, TZ, "yyyyMMdd'T'HHmmss") + '_' + i;

    // v1 no desglosaba errores por tipo de pregunta ni por tema individual,
    // pero sí sabía qué "Grupo/Tema" se jugó y cuántas fueron correctas — con
    // eso se puede reconstruir un aciertos_tema/errores_tema de un solo tema
    // por fila, para que "Eficacia por tema" y el % por tema en Estadísticas
    // no queden en blanco para todo el historial migrado.
    const aciertosTema = {}, erroresTema = {};
    if (tema) {
      aciertosTema[tema] = correctas;
      erroresTema[tema] = Math.max(total - correctas, 0);
    }

    return [
      timestamp, fecha, hora, nombre, curso, tema, sesionSintetica,
      correctas, total, pct,
      0, 0, 0, 0, 0, // Errores MC/Drag/ID/Write y Tiempo agotado: sin dato en v1
      JSON.stringify(erroresTema), JSON.stringify(aciertosTema),
      '', razon
    ];
  });

  sh.clearContents();
  sh.clearFormats();
  escribirEncabezadosRegistro(sh);
  if (filasNuevas.length) {
    rellenarFilas_(filasNuevas);
    sh.getRange(2, 1, filasNuevas.length, REG_HEADERS.length).setValues(filasNuevas);
    const colores = filasNuevas.map(function (f) {
      return new Array(REG_HEADERS.length).fill(colorPorPorcentaje(f[9]));
    });
    sh.getRange(2, 1, filasNuevas.length, REG_HEADERS.length).setBackgrounds(colores);
  }
  Logger.log('Migración de "Registro" completada: ' + filasNuevas.length + ' fila(s) antiguas convertidas al nuevo esquema.');
}

// ══════════════════════════════════════════════════════════════════════════
// MIGRACIÓN DE OTRAS PESTAÑAS HISTÓRICAS ("Hoja 1"/"Resultados"/"Sesiones")
// ══════════════════════════════════════════════════════════════════════════
// Con cada versión anterior de este script, los datos reales terminaron
// repartidos en pestañas con nombres y esquemas distintos dentro del MISMO
// spreadsheet (no solo el esquema viejo de "Registro" ya cubierto arriba).
// Se ejecuta una sola vez (marcador en PropertiesService) para no reprocesar
// estas pestañas — que NO cambian solas— en cada petición.
function migrarDatosHistoricosSiEsNecesario_(ss, shRegistro) {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('MIGRACION_HISTORICA_V2') === 'hecha') return;

  const filasNuevas = [];
  Array.prototype.push.apply(filasNuevas, migrarHojasResultadosV0_(ss));
  Array.prototype.push.apply(filasNuevas, migrarHojaSesiones_(ss));

  if (filasNuevas.length) {
    const inicio = shRegistro.getLastRow() + 1;
    rellenarFilas_(filasNuevas);
    shRegistro.getRange(inicio, 1, filasNuevas.length, REG_HEADERS.length).setValues(filasNuevas);
    const colores = filasNuevas.map(function (f) {
      return new Array(REG_HEADERS.length).fill(colorPorPorcentaje(f[9]));
    });
    shRegistro.getRange(inicio, 1, filasNuevas.length, REG_HEADERS.length).setBackgrounds(colores);
  }

  props.setProperty('MIGRACION_HISTORICA_V2', 'hecha');
  Logger.log('Migración histórica completa: ' + filasNuevas.length + ' sesión(es) antigua(s) incorporada(s) a "Registro" desde otras pestañas.');
}

// "Hoja 1" (nombre por defecto que Sheets le da a la primera pestaña) y
// "Resultados" fueron, en distintos momentos, el destino del esquema MÁS
// viejo del proyecto: una fila = una sesión ya terminada, sin código de
// sesión ni columna de Trigger. Si ambas pestañas existen y coinciden en
// contenido (se vio en producción que son una copia exacta la una de la
// otra), un mismo "fingerprint" por fila evita migrar la misma sesión dos
// veces así aparezca en las dos pestañas.
function migrarHojasResultadosV0_(ss) {
  const HEADERS_V0 = ['Fecha/Hora', 'Código', 'Nombre', 'Curso', 'Grupo funcional',
    'Correctas', 'Puntaje', 'Total', 'Intentos', 'Porcentaje', 'Calificación /5', 'Nivel'];
  const NOMBRES_POSIBLES = ['Resultados', 'Hoja 1', 'Hoja1'];
  const vistos = {};
  const filasNuevas = [];

  NOMBRES_POSIBLES.forEach(function (nombreHoja) {
    const sh = ss.getSheetByName(nombreHoja);
    if (!sh || sh.getLastRow() < 2) return;
    const encabezado = sh.getRange(1, 1, 1, HEADERS_V0.length).getValues()[0].map(String);
    const esV0 = HEADERS_V0.every(function (h, i) { return encabezado[i] === h; });
    if (!esV0) return;

    const filas = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS_V0.length).getValues();
    filas.forEach(function (r, i) {
      const tsCruda = r[0] instanceof Date ? r[0] : new Date(r[0]);
      const timestamp = (tsCruda instanceof Date && !isNaN(tsCruda)) ? tsCruda : new Date();
      const codigoEstudiante = String(r[1] || '');
      const nombre = String(r[2] || '');
      const curso = String(r[3] || '');
      const tema = String(r[4] || '');
      const correctas = Number(r[5]) || 0;
      const total = Number(r[7]) || 0;
      // "Porcentaje" en v0 se guarda como fracción (0.93), no como 0-100 —
      // se recalcula desde Correctas/Total para no depender de ese formato.
      const pct = total > 0 ? Math.round((correctas / total) * 100) : Math.round((Number(r[9]) || 0) * 100);

      const huella = codigoEstudiante + '|' + Utilities.formatDate(timestamp, TZ, "yyyyMMdd'T'HHmmss") + '|' + correctas + '|' + total;
      if (vistos[huella]) return; // ya migrada desde otra pestaña con el mismo contenido
      vistos[huella] = true;

      const fecha = Utilities.formatDate(timestamp, TZ, 'yyyy-MM-dd');
      const hora = Utilities.formatDate(timestamp, TZ, 'HH:mm:ss');
      const sesionSintetica = 'MIGV0_' + codigoEstudiante + '_' +
        Utilities.formatDate(timestamp, TZ, "yyyyMMdd'T'HHmmss") + '_' + i;

      const aciertosTema = {}, erroresTema = {};
      if (tema) { aciertosTema[tema] = correctas; erroresTema[tema] = Math.max(total - correctas, 0); }

      filasNuevas.push([
        timestamp, fecha, hora, nombre, curso, tema, sesionSintetica,
        correctas, total, pct,
        0, 0, 0, 0, 0,
        JSON.stringify(erroresTema), JSON.stringify(aciertosTema),
        '', 'fin' // v0 solo guardaba sesiones ya completadas
      ]);
    });
  });
  return filasNuevas;
}

// "Sesiones" fue un experimento breve (un solo día, 28/ago/2026) de registrar
// el progreso de la partida cada ~60s (Razón='progreso'), además de 'inicio'/
// 'fin'/'abandono' — se abandonó ese mismo día (ver _startProgressTracking
// desactivado en juego.html) a favor de mandar solo un evento final. Contar
// cada tick de 'progreso' como una sesión distinta multiplicaría por ~10 el
// número real de partidas jugadas ese día, así que:
//  1) se ignoran 'inicio' y 'progreso' — no son el final de una sesión;
//  2) las filas 'fin'/'abandono' del MISMO Código+Grupo funcional que caen
//     dentro de una ventana corta (≤3 min) se tratan como el mismo cierre de
//     sesión (se vio en los datos reales: un 'fin' seguido de un 'abandono'
//     segundos después por el evento beforeunload/visibilitychange del
//     navegador — el mismo bug de fondo que la Regla 1 de este script existe
//     para evitar) y se conserva solo la fila más completa de ese grupo
//     (con 'fin' explícito si lo hay, si no la de mayor Correctas/Respondidas).
function migrarHojaSesiones_(ss) {
  const sh = ss.getSheetByName('Sesiones');
  if (!sh || sh.getLastRow() < 2) return [];

  const HEADERS_SES = ['Fecha/Hora (Bogotá)', 'Fecha', 'Hora', 'Código', 'Nombre', 'Curso',
    'Grupo funcional', 'Razón', 'Respondidas', 'Total preguntas', 'Correctas', 'Intentos',
    'Puntaje', 'Porcentaje', 'Calificación /5', 'Nivel'];
  const encabezado = sh.getRange(1, 1, 1, HEADERS_SES.length).getValues()[0].map(String);
  const esSesiones = HEADERS_SES.every(function (h, i) { return encabezado[i] === h; });
  if (!esSesiones) return [];

  const VENTANA_MS = 3 * 60 * 1000; // 3 minutos
  const filas = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS_SES.length).getValues()
    .map(function (r) {
      const ts = r[0] instanceof Date ? r[0] : new Date(r[0]);
      return {
        ts: (ts instanceof Date && !isNaN(ts)) ? ts : null,
        codigo: String(r[3] || ''),
        nombre: String(r[4] || ''),
        curso: String(r[5] || ''),
        tema: String(r[6] || ''),
        razon: String(r[7] || ''),
        respondidas: Number(r[8]) || 0,
        total: Number(r[9]) || 0,
        correctas: Number(r[10]) || 0
      };
    })
    .filter(function (f) { return f.ts && (f.razon === 'fin' || f.razon === 'abandono'); })
    .sort(function (a, b) {
      if (a.codigo !== b.codigo) return a.codigo < b.codigo ? -1 : 1;
      if (a.tema !== b.tema) return a.tema < b.tema ? -1 : 1;
      return a.ts - b.ts;
    });

  const filasNuevas = [];
  let cluster = [];

  function cerrarCluster(idx) {
    if (!cluster.length) return;
    // Se prefiere una fila con Razón='fin' (cierre real); si no hay, la de
    // mayor Respondidas/Correctas (la más completa de ese grupo de eventos).
    let mejor = cluster[0];
    cluster.forEach(function (f) {
      const mejorEsFin = mejor.razon === 'fin';
      const actualEsFin = f.razon === 'fin';
      if (actualEsFin && !mejorEsFin) { mejor = f; return; }
      if (actualEsFin === mejorEsFin && (f.respondidas > mejor.respondidas ||
        (f.respondidas === mejor.respondidas && f.correctas > mejor.correctas))) { mejor = f; }
    });

    const timestamp = mejor.ts;
    const fecha = Utilities.formatDate(timestamp, TZ, 'yyyy-MM-dd');
    const hora = Utilities.formatDate(timestamp, TZ, 'HH:mm:ss');
    const total = mejor.total;
    const correctas = Math.min(mejor.correctas, total || mejor.correctas);
    const pct = total > 0 ? Math.round((correctas / total) * 100) : 0;
    const sesionSintetica = 'MIGSES_' + mejor.codigo + '_' +
      Utilities.formatDate(timestamp, TZ, "yyyyMMdd'T'HHmmss") + '_' + idx;

    const aciertosTema = {}, erroresTema = {};
    if (mejor.tema) { aciertosTema[mejor.tema] = correctas; erroresTema[mejor.tema] = Math.max(total - correctas, 0); }

    filasNuevas.push([
      timestamp, fecha, hora, mejor.nombre, mejor.curso, mejor.tema, sesionSintetica,
      correctas, total, pct,
      0, 0, 0, 0, 0,
      JSON.stringify(erroresTema), JSON.stringify(aciertosTema),
      '', mejor.razon
    ]);
  }

  filas.forEach(function (f, idx) {
    const anterior = cluster.length ? cluster[cluster.length - 1] : null;
    const mismoGrupo = anterior && anterior.codigo === f.codigo && anterior.tema === f.tema &&
      (f.ts - anterior.ts) <= VENTANA_MS;
    if (anterior && !mismoGrupo) { cerrarCluster(idx); cluster = []; }
    cluster.push(f);
  });
  cerrarCluster(filas.length);

  return filasNuevas;
}

// ══════════════════════════════════════════════════════════════════════════
// LECTURA + NORMALIZACIÓN de "Registro" (compartida por las 3 hojas de stats)
// ══════════════════════════════════════════════════════════════════════════

// Regla 4: Sheets a veces guarda como Number/Date un valor que se escribió
// como texto (si "parece" un número o una fecha), lo que rompe comparaciones
// tipo string. Por eso, al leer, se fuerza explícitamente el tipo de cada
// columna antes de usarla en cualquier comparación o agrupación.
function leerRegistroDeduplicado(ss) {
  const sh = obtenerHojaRegistro(ss); // migra el esquema viejo si hace falta antes de leer
  if (!sh || sh.getLastRow() < 2) return [];

  const datos = sh.getRange(2, 1, sh.getLastRow() - 1, REG_HEADERS.length).getValues();
  const filas = datos.map(function (r, idx) {
    return {
      fecha: normalizarFecha(r[COL.FECHA - 1]),
      hora: normalizarHora(r[COL.HORA - 1]),
      nombre: String(r[COL.NOMBRE - 1] || ''),
      curso: String(r[COL.CURSO - 1] || '').trim(),
      sesion: String(r[COL.SESION - 1] || '').trim(),
      correctas: Number(r[COL.CORRECTAS - 1]) || 0,
      total: Number(r[COL.TOTAL - 1]) || 0,
      pct: Number(r[COL.PCT - 1]) || 0,
      erroresTema: parseJSONSeguro(r[COL.ERR_TEMA - 1]),
      aciertosTema: parseJSONSeguro(r[COL.ACIERTOS_TEMA - 1]),
      _idxOriginal: idx
    };
  });

  // Regla 2: colapsar filas duplicadas del mismo código de sesión (datos
  // históricos previos a implementar el upsert de la Regla 1), quedándose con
  // la de mayor Total por ser la más completa. Solo en memoria — no borra nada
  // en "Registro". Las filas sin código de sesión nunca se colapsan entre sí.
  const mejorPorSesion = {};
  filas.forEach(function (f) {
    const clave = f.sesion || ('__SIN_SESION_' + f._idxOriginal);
    if (!mejorPorSesion[clave] || f.total > mejorPorSesion[clave].total) {
      mejorPorSesion[clave] = f;
    }
  });
  return Object.keys(mejorPorSesion).map(function (k) { return mejorPorSesion[k]; });
}

function normalizarFecha(v) {
  if (v instanceof Date) return Utilities.formatDate(v, TZ, 'yyyy-MM-dd');
  return String(v || '').trim();
}

// Misma Regla 4 aplicada a "Hora": una celda escrita como texto "14:09:12"
// puede volver de getValues() como un objeto Date (con fecha base
// 30/12/1899, el epoch de "solo hora" de Sheets) en vez del texto original.
// Sin esto, String(esaFecha) produce basura tipo "Sat Dec 30 1899 14:09:12
// GMT-0456 (Colombia Standard Time)" — justo lo que se vio en "Última
// sesión" de las hojas "Curso X".
function normalizarHora(v) {
  if (v instanceof Date) return Utilities.formatDate(v, TZ, 'HH:mm:ss');
  return String(v || '').trim();
}

function parseJSONSeguro(v) {
  try {
    const o = JSON.parse(v);
    return (o && typeof o === 'object') ? o : {};
  } catch (err) {
    return {};
  }
}

// Regla 3: normalización robusta del nombre del estudiante. El mismo alumno
// puede aparecer como "Juan Pérez", "PÉREZ JUAN" o "juan perez" en filas
// distintas. La clave de agrupación pasa a mayúsculas, quita tildes, parte en
// palabras y las ordena alfabéticamente — así el orden nombres/apellidos y los
// acentos dejan de importar para saber si es "el mismo" estudiante.
function normalizarNombreClave(nombre) {
  const limpio = quitarTildes(String(nombre || '').toUpperCase())
    .replace(/[^A-Z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!limpio) return '';
  return limpio.split(' ').filter(Boolean).sort().join(' ');
}

function quitarTildes(s) {
  // \u0300-\u036f es el rango Unicode de marcas diacríticas combinantes
  // (acentos, virgulilla, diéresis...) que NFD separa de la letra base.
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function esMayusculas(nombre) {
  const s = String(nombre || '').trim();
  return !!s && s === s.toUpperCase();
}

// Agrupa las filas deduplicadas por estudiante (nombre normalizado + curso).
// Se conserva la variante del nombre en mayúsculas como "oficial" para
// mostrar en las hojas (Regla 3); si ninguna variante viene en mayúsculas se
// deja la primera que se encontró.
function agruparPorEstudiante(filasDedup) {
  const grupos = {};
  filasDedup.forEach(function (f) {
    const normKey = normalizarNombreClave(f.nombre);
    if (!normKey) return; // fila sin nombre utilizable — no aporta a las estadísticas
    const curso = f.curso || '(Sin curso)';
    const clave = normKey + '|' + curso;
    if (!grupos[clave]) {
      grupos[clave] = { normKey: normKey, curso: curso, nombreDisplay: f.nombre, sesiones: [] };
    } else if (!esMayusculas(grupos[clave].nombreDisplay) && esMayusculas(f.nombre)) {
      grupos[clave].nombreDisplay = f.nombre;
    }
    grupos[clave].sesiones.push(f);
  });
  return grupos;
}

// ── Estadísticas agregadas de un estudiante (compartido por Estadísticas y Curso X) ──
function calcularEstadisticasEstudiante(grupo) {
  const sesiones = grupo.sesiones;
  const totalPreguntas = sesiones.reduce(function (a, s) { return a + s.total; }, 0);
  const totalCorrectas = sesiones.reduce(function (a, s) { return a + s.correctas; }, 0);
  const pctGlobal = totalPreguntas > 0 ? Math.round((totalCorrectas / totalPreguntas) * 100) : 0;

  // Regla 5: la Nota de juego solo considera las sesiones dentro del periodo
  // académico vigente — jugar mucho fuera del periodo no debe inflar la nota.
  const sesionesPeriodo = sesiones.filter(function (s) {
    return s.fecha >= FECHA_INICIO_PERIODO && s.fecha <= FECHA_FIN_PERIODO;
  });

  // Cifras del periodo (distintas de las históricas de arriba) — para que el
  // estudiante vea de dónde sale exactamente su Nota de juego, separado del
  // total histórico que cuenta para el reto de las 1000 preguntas.
  const totalPreguntasPeriodo = sesionesPeriodo.reduce(function (a, s) { return a + s.total; }, 0);
  const totalCorrectasPeriodo = sesionesPeriodo.reduce(function (a, s) { return a + s.correctas; }, 0);
  const pctGlobalPeriodo = totalPreguntasPeriodo > 0 ? Math.round((totalCorrectasPeriodo / totalPreguntasPeriodo) * 100) : 0;

  // La Nota pondera por PREGUNTAS respondidas, no por sesiones (ver
  // calcularNotaJuego) — misma fórmula que Chromanom Analytics.
  const notaJuego = calcularNotaJuego(totalCorrectasPeriodo, totalPreguntasPeriodo, sesionesPeriodo.length);

  const pctPorTema = {};
  TEMAS_PRINCIPALES.forEach(function (tema) {
    let correctasTema = 0, erroresTema = 0;
    sesiones.forEach(function (s) {
      correctasTema += Number(s.aciertosTema[tema]) || 0;
      erroresTema += Number(s.erroresTema[tema]) || 0;
    });
    const totalTema = correctasTema + erroresTema;
    pctPorTema[tema] = totalTema > 0 ? Math.round((correctasTema / totalTema) * 100) : '';
  });

  const ultimaSesion = sesiones.reduce(function (max, s) {
    if (!max) return s;
    return (s.fecha + s.hora) > (max.fecha + max.hora) ? s : max;
  }, null);

  return {
    numSesiones: sesiones.length,
    totalPreguntas: totalPreguntas,
    pctGlobal: pctGlobal,
    notaJuego: notaJuego,
    pctPorTema: pctPorTema,
    ultimaSesion: ultimaSesion,
    numSesionesPeriodo: sesionesPeriodo.length,
    totalPreguntasPeriodo: totalPreguntasPeriodo,
    pctGlobalPeriodo: pctGlobalPeriodo
  };
}

// Regla 5 — Nota de juego (0-5) dentro del periodo académico. Misma fórmula
// que Chromanom Analytics (calcularNotaJuego_): se usa el % de acierto REAL
// del periodo (total de preguntas correctas / total de preguntas
// respondidas, sin importar en cuántas sesiones se repartieron) — una
// práctica corta de 3 preguntas al 100% no pesa igual que una sesión
// completa de 20 preguntas al 100%, porque ambas entran a la misma bolsa de
// correctas/preguntas en vez de promediarse por sesión (la fórmula anterior,
// que promediaba %-por-sesión, sí las trataba igual).
//
// Hay un MÍNIMO de SESIONES_ESPERADAS sesiones, pero NO un máximo:
// - Si el estudiante NO ha llegado a esas sesiones, las que le faltan se
//   cuentan como si las hubiera jugado y fallado TODAS (0 aciertos de
//   PREGUNTAS_POR_SESION preguntas cada una) — así jugar menos de lo
//   esperado sigue penalizando la nota, aunque el % de lo que sí jugó sea
//   perfecto.
// - Una vez alcanzado ese mínimo, no hay techo de SESIONES: si el
//   estudiante sigue jugando y su % de acierto real mejora, la nota sigue
//   subiendo sin límite de sesiones — no se congela por haber llegado a las
//   sesiones esperadas mientras todavía quede periodo por delante.
// Ojo: "sin techo de sesiones" no es lo mismo que "sin techo en la nota" —
// la nota SÍ tiene un límite fijo, el máximo de la escala (5.0).
// Matemáticamente correctasPeriodo nunca debería superar a
// preguntasAjustadas (son aciertos dentro de lo respondido), así que
// pctAcierto no debería pasar de 1 — pero se deja el Math.min(5, ...) como
// cinturón de seguridad explícito, no como algo que se espere que dispare
// en uso normal.
function calcularNotaJuego(correctasPeriodo, preguntasPeriodo, sesionesJugadas) {
  const sesionesFaltantes = Math.max(0, SESIONES_ESPERADAS - sesionesJugadas);
  const preguntasAjustadas = preguntasPeriodo + sesionesFaltantes * PREGUNTAS_POR_SESION;
  if (!preguntasAjustadas) return 0;
  const pctAcierto = correctasPeriodo / preguntasAjustadas;
  return Math.min(5, Math.round(pctAcierto * 5 * 10) / 10);
}

// ── Color de fila según % (Regla 9) ─────────────────────────────────────────
function colorPorPorcentaje(pct) {
  const p = Number(pct) || 0;
  if (p >= 90) return '#d4edda'; // verde
  if (p >= 70) return '#cce5ff'; // azul
  if (p >= 50) return '#fff3cd'; // ámbar
  return '#f8d7da';               // rojo
}

// Regla 8: escritura por lotes — encabezados + todas las filas en una sola
// llamada a setValues()/setBackgrounds(), para no agotar el límite de
// ejecución de Apps Script cuando "Registro" crece mucho. Solo se usa en las
// hojas de estadísticas (que se recalculan por completo); "Registro" es
// incremental y se actualiza fila por fila en upsertRegistro().
function escribirHojaCompleta(ss, nombreHoja, headers, filas, colorEncabezado, fnValorColor) {
  let sh = ss.getSheetByName(nombreHoja);
  if (!sh) sh = ss.insertSheet(nombreHoja);
  sh.clearContents();
  sh.clearFormats();

  sh.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground(colorEncabezado).setFontColor('#ffffff').setFontWeight('bold');
  sh.setFrozenRows(1);

  if (filas.length) {
    sh.getRange(2, 1, filas.length, headers.length).setValues(filas);
    const colores = filas.map(function (fila) {
      return new Array(headers.length).fill(colorPorPorcentaje(fnValorColor(fila)));
    });
    sh.getRange(2, 1, filas.length, headers.length).setBackgrounds(colores);
  }
}

// ══════════════════════════════════════════════════════════════════════════
// HOJA "Estadísticas" — resumen por estudiante
// ══════════════════════════════════════════════════════════════════════════
function calcularEstadisticas(ss, filasDedup) {
  const grupos = agruparPorEstudiante(filasDedup);

  const headers = EST_HEADERS_BASE
    .concat(TEMAS_PRINCIPALES.map(function (t) { return '% ' + t; }))
    .concat(EST_HEADERS_PERIODO);

  const filas = Object.keys(grupos).map(function (clave) {
    const g = grupos[clave];
    const st = calcularEstadisticasEstudiante(g);
    const fila = [g.nombreDisplay, g.curso, st.numSesiones, st.totalPreguntas, st.pctGlobal, st.notaJuego];
    TEMAS_PRINCIPALES.forEach(function (t) { fila.push(st.pctPorTema[t]); });
    fila.push(st.numSesionesPeriodo, st.totalPreguntasPeriodo, st.pctGlobalPeriodo);
    return fila;
  });

  filas.sort(function (a, b) {
    return a[1] === b[1] ? String(a[0]).localeCompare(String(b[0])) : String(a[1]).localeCompare(String(b[1]));
  });

  escribirHojaCompleta(ss, 'Estadísticas', headers, filas, '#1a1a2e', function (fila) { return fila[4]; });
}

// ══════════════════════════════════════════════════════════════════════════
// HOJA "Eficacia por tema" — agregado de TODOS los estudiantes
// ══════════════════════════════════════════════════════════════════════════
function calcularEficaciaPorTema(ss, filasDedup) {
  const agregados = {};
  TEMAS_PRINCIPALES.forEach(function (t) { agregados[t] = { correctas: 0, errores: 0 }; });

  filasDedup.forEach(function (f) {
    Object.keys(f.aciertosTema || {}).forEach(function (t) {
      if (!agregados[t]) agregados[t] = { correctas: 0, errores: 0 };
      agregados[t].correctas += Number(f.aciertosTema[t]) || 0;
    });
    Object.keys(f.erroresTema || {}).forEach(function (t) {
      if (!agregados[t]) agregados[t] = { correctas: 0, errores: 0 };
      agregados[t].errores += Number(f.erroresTema[t]) || 0;
    });
  });

  // Temas principales primero (en el orden definido), luego cualquier tema
  // extra que haya llegado en los datos y no esté en la lista fija.
  const extras = Object.keys(agregados).filter(function (t) { return TEMAS_PRINCIPALES.indexOf(t) === -1; }).sort();
  const temasOrdenados = TEMAS_PRINCIPALES.concat(extras);

  const filas = temasOrdenados.map(function (t) {
    const a = agregados[t];
    const total = a.correctas + a.errores;
    const pct = total > 0 ? Math.round((a.correctas / total) * 100) : '';
    return [t, a.correctas, a.errores, total, pct];
  });

  escribirHojaCompleta(ss, 'Eficacia por tema', EFI_HEADERS, filas, '#6f42c1', function (fila) { return fila[4] || 0; });
}

// ══════════════════════════════════════════════════════════════════════════
// HOJAS "Curso X" — una por cada valor distinto de Curso en Registro
// ══════════════════════════════════════════════════════════════════════════
function calcularHojasPorCurso(ss, filasDedup) {
  const grupos = agruparPorEstudiante(filasDedup);

  const porCurso = {};
  Object.keys(grupos).forEach(function (clave) {
    const g = grupos[clave];
    if (!porCurso[g.curso]) porCurso[g.curso] = [];
    porCurso[g.curso].push(g);
  });

  Object.keys(porCurso).forEach(function (curso) {
    const filas = porCurso[curso].map(function (g) {
      const st = calcularEstadisticasEstudiante(g);
      const ultima = st.ultimaSesion ? (st.ultimaSesion.fecha + ' ' + st.ultimaSesion.hora) : '';
      // Sesiones/Preguntas/% Acierto de arriba son HISTÓRICOS (cuentan para el
      // reto de 1.000 preguntas); estas 3 últimas son del PERIODO académico
      // vigente (Regla 5) -- las que de verdad hay que mirar para saber si un
      // estudiante cumplió el umbral de un premio ligado al periodo, sin
      // depender de que la docente abra la app para ver "Periodo actual".
      return [g.nombreDisplay, st.numSesiones, st.totalPreguntas, st.pctGlobal, st.notaJuego, ultima,
        st.numSesionesPeriodo, st.totalPreguntasPeriodo, st.pctGlobalPeriodo];
    });
    filas.sort(function (a, b) { return String(a[0]).localeCompare(String(b[0])); });

    escribirHojaCompleta(ss, nombreHojaCurso(curso), CURSO_HEADERS, filas, '#198754', function (fila) { return fila[3]; });
  });
}

function nombreHojaCurso(curso) {
  // Los nombres de hoja en Sheets no admiten [ ] * / \ ? : — se sanean para
  // evitar que un curso con formato raro rompa la creación de la hoja.
  const limpio = String(curso || 'Sin curso').replace(/[\[\]\*\/\\\?:]/g, '-').trim();
  const nombre = 'Curso ' + limpio;
  return nombre.length > 100 ? nombre.substring(0, 100) : nombre;
}

// ══════════════════════════════════════════════════════════════════════════
// HOJA "Reto 1000 preguntas" — ranking de premiación
// ══════════════════════════════════════════════════════════════════════════
// El reto exige LAS DOS condiciones a la vez, no una u otra:
// - RETO_META_PREGUNTAS preguntas HISTÓRICAS (sumando TODAS las sesiones
//   jugadas alguna vez, igual que la tarjeta "Reto 1.000 preguntas" de
//   juego.html) — esto NO cambia con el periodo académico.
// - RETO_META_PCT% de acierto O MÁS, pero calculado SOLO con las sesiones
//   DENTRO DEL PERIODO ACADÉMICO VIGENTE (FECHA_INICIO_PERIODO..
//   FECHA_FIN_PERIODO — misma ventana que usa la Nota de juego). Premia el
//   desempeño reciente y no penaliza para siempre a alguien que arrastre un
//   acierto histórico bajo de cuando apenas empezaba a jugar, meses atrás.
// Se recorren las sesiones de cada estudiante EN ORDEN CRONOLÓGICO,
// acumulando dos contadores en paralelo (histórico completo para las
// preguntas; solo-periodo para el acierto), hasta la PRIMERA sesión en que
// AMBAS condiciones se cumplen simultáneamente — esa es la "fecha de
// logro". El acierto del periodo puede subir o bajar con cada sesión nueva
// dentro del periodo, así que se sigue avanzando hasta que ambas se
// cumplen a la vez, o se agotan las sesiones sin lograrlo (en ese caso el
// estudiante simplemente no aparece en esta hoja). El ranking queda
// ordenado por fecha+hora de logro ascendente: el primero en cumplir
// ambas condiciones ocupa el puesto 1, que es justo el criterio
// ("1er lugar = premio") que se anunciaba en el reto especial.
function calcularRetoMilPreguntas(ss, filasDedup) {
  const grupos = agruparPorEstudiante(filasDedup);
  const logros = [];

  Object.keys(grupos).forEach(function (clave) {
    const g = grupos[clave];
    const sesionesOrdenadas = g.sesiones.slice().sort(function (a, b) {
      const claveA = (a.fecha || '') + ' ' + (a.hora || '');
      const claveB = (b.fecha || '') + ' ' + (b.hora || '');
      return claveA < claveB ? -1 : (claveA > claveB ? 1 : 0);
    });

    let acumPreguntas = 0, acumCorrectas = 0; // histórico completo — para las 1000 preguntas
    let acumPreguntasPeriodo = 0, acumCorrectasPeriodo = 0; // solo sesiones del periodo vigente — para el 80%
    for (let i = 0; i < sesionesOrdenadas.length; i++) {
      const s = sesionesOrdenadas[i];
      acumPreguntas += s.total;
      acumCorrectas += s.correctas;
      const enPeriodo = s.fecha >= FECHA_INICIO_PERIODO && s.fecha <= FECHA_FIN_PERIODO;
      if (enPeriodo) {
        acumPreguntasPeriodo += s.total;
        acumCorrectasPeriodo += s.correctas;
      }
      const pctPeriodo = acumPreguntasPeriodo > 0 ? Math.round((acumCorrectasPeriodo / acumPreguntasPeriodo) * 100) : 0;
      if (acumPreguntas >= RETO_META_PREGUNTAS && pctPeriodo >= RETO_META_PCT) {
        logros.push({
          nombre: g.nombreDisplay,
          curso: g.curso,
          fecha: s.fecha,
          hora: s.hora,
          preguntas: acumPreguntas,
          pct: pctPeriodo
        });
        break; // solo la sesión donde cumplió ambas condiciones — no seguir sumando de más
      }
    }
  });

  logros.sort(function (a, b) {
    const claveA = (a.fecha || '') + ' ' + (a.hora || '');
    const claveB = (b.fecha || '') + ' ' + (b.hora || '');
    return claveA < claveB ? -1 : (claveA > claveB ? 1 : 0);
  });

  const filas = logros.map(function (l, idx) {
    return [idx + 1, l.nombre, l.curso, l.fecha, l.hora, l.preguntas, l.pct];
  });

  escribirHojaCompleta(ss, 'Reto 1000 preguntas', RETO_HEADERS, filas, '#8b5a3c', function (fila) { return fila[6]; });
}

// ══════════════════════════════════════════════════════════════════════════
// HOJA "Errores" — log interno del propio script
// ══════════════════════════════════════════════════════════════════════════
function registrarError(funcion, err) {
  try {
    const ss = obtenerSpreadsheet();
    let sh = ss.getSheetByName('Errores');
    if (!sh) {
      sh = ss.insertSheet('Errores');
      sh.getRange(1, 1, 1, 3).setValues([['Timestamp', 'Función', 'Error']])
        .setBackground('#dc3545').setFontColor('#ffffff').setFontWeight('bold');
      sh.setFrozenRows(1);
    }
    sh.appendRow([new Date(), funcion, String((err && err.message) || err)]);
  } catch (err2) {
    // Si ni siquiera se puede escribir en "Errores", no queda dónde más
    // reportarlo — se deja al menos en el log de ejecución de Apps Script.
    Logger.log('Fallo doble al registrar error: ' + err2);
  }
}

// ══════════════════════════════════════════════════════════════════════════
// RECÁLCULO — cada hoja de estadísticas en su propio try/catch (Regla 10),
// para que un fallo calculando una no impida calcular las demás.
// ══════════════════════════════════════════════════════════════════════════
// Antes, esta función completa (lectura de "Registro" + las 3 reescrituras
// pesadas de hojas de estadísticas) corría entera bajo el mismo LockService
// que usa doPost() para guardar partidas — y cada una de las 3 hojas volvía
// a leer "Registro" por su cuenta (3 lecturas de la misma hoja). Con un
// "Registro" grande, sumar el tiempo de leer 3 veces + reescribir 4 hojas
// completas (clearContents/clearFormats/setValues/setBackgrounds, que no
// son operaciones rápidas) bajo el mismo candado que compite con TODOS los
// estudiantes guardando resultados en vivo es exactamente el tipo de cosa
// que agota el candado y dispara "No se obtuvo el lock (servidor
// congestionado)" en doPost — sobre todo si el disparador automático de
// cada 30 min cae en horario de clase.
//
// Ahora: "Registro" se lee UNA sola vez, bajo el candado, lo más rápido
// posible; el candado se libera inmediatamente después; y las 4 hojas se
// calculan/escriben con esos mismos datos en memoria, SIN candado — ya no
// compiten con doPost por nada mientras escriben. El candado solo protege
// la lectura (para no leer "Registro" a la mitad de un upsertRegistro()).
function recalcularTodasLasEstadisticas() {
  let ss, filasDedup;
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    ss = obtenerSpreadsheet();
    filasDedup = leerRegistroDeduplicado(ss);
  } finally {
    lock.releaseLock();
  }

  try { calcularEstadisticas(ss, filasDedup); } catch (err) { registrarError('calcularEstadisticas', err); }
  try { calcularEficaciaPorTema(ss, filasDedup); } catch (err) { registrarError('calcularEficaciaPorTema', err); }
  try { calcularHojasPorCurso(ss, filasDedup); } catch (err) { registrarError('calcularHojasPorCurso', err); }
  try { calcularRetoMilPreguntas(ss, filasDedup); } catch (err) { registrarError('calcularRetoMilPreguntas', err); }
}

// ══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE MANTENIMIENTO (Regla 6) — ejecutar manualmente desde el
// editor de Apps Script (▶ Ejecutar), no se llaman desde doPost/doGet.
// ══════════════════════════════════════════════════════════════════════════

// Fuerza el recálculo completo de Estadísticas / Eficacia por tema / Curso X /
// Reto 1000 preguntas a partir de lo que ya hay en "Registro", sin esperar
// una nueva partida.
function recalcularAhora() {
  recalcularTodasLasEstadisticas();
  Logger.log('Recálculo completo ejecutado. Revisa la hoja "Errores" si algo falló.');
}

// ── Actualización automática (para no depender de recalcularAhora()) ───────
// doPost() YA NO recalcula Estadísticas en cada partida (ver el comentario
// en doPost más arriba). Este disparador de tiempo es la única forma en que
// Estadísticas se mantiene al día sola, cada 30 minutos, sin que el docente
// tenga que entrar a ejecutar nada manualmente. Misma arquitectura que
// Chromanom Analytics.
const NOMBRE_FUNCION_AUTO = 'actualizarEstadisticasAutomatico';

function actualizarEstadisticasAutomatico() {
  recalcularTodasLasEstadisticas();
}

// ── Ejecutar UNA SOLA VEZ desde el editor (▶, eligiendo esta función) para
// instalar el disparador automático de arriba. Es idempotente: si ya existe
// un disparador para actualizarEstadisticasAutomatico lo reemplaza en vez de
// duplicarlo, para no terminar con dos ejecuciones simultáneas cada 30 min
// pisándose entre sí (el mismo tipo de duplicado por el que existe la Regla
// 1/2 de deduplicación de sesiones, pero aplicado a disparadores).
function instalarActualizacionAutomatica() {
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === NOMBRE_FUNCION_AUTO; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });

  ScriptApp.newTrigger(NOMBRE_FUNCION_AUTO)
    .timeBased()
    .everyMinutes(30)
    .create();

  Logger.log('Disparador automático instalado: Estadísticas se recalculará sola cada 30 minutos.');
  return 'Disparador automático instalado: Estadísticas se recalculará sola cada 30 minutos.';
}

// Estas dos funciones de mantenimiento SÍ modifican "Registro" directamente
// (a diferencia de recalcularAhora(), que solo reescribe las hojas de
// estadísticas), así que toman el mismo candado que usa doPost antes de
// tocar nada — si un estudiante termina una partida justo mientras el
// docente corre esto manualmente, uno espera al otro en vez de pisarse.
function conLockDeScript_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    fn();
  } finally {
    lock.releaseLock();
  }
}

// A diferencia de recalcularAhora(), ESTA función SÍ modifica "Registro":
// borra físicamente las filas duplicadas por código de sesión, dejando solo
// la de mayor Total de cada una. Recorre de abajo hacia arriba para no
// desfasar los índices de fila al ir borrando.
function limpiarRegistroDuplicados() {
  conLockDeScript_(function () { limpiarRegistroDuplicados_(); });
}

function limpiarRegistroDuplicados_() {
  const ss = obtenerSpreadsheet();
  const sh = obtenerHojaRegistro(ss); // migra el esquema viejo si hace falta antes de tocar filas
  if (!sh || sh.getLastRow() < 2) {
    Logger.log('Registro vacío, nada que limpiar.');
    return;
  }

  const datos = sh.getRange(2, 1, sh.getLastRow() - 1, REG_HEADERS.length).getValues();
  const mejorPorSesion = {};
  datos.forEach(function (r, i) {
    const sesion = String(r[COL.SESION - 1] || '').trim();
    const total = Number(r[COL.TOTAL - 1]) || 0;
    const filaHoja = i + 2;
    const clave = sesion || ('__SIN_SESION_' + filaHoja);
    if (!mejorPorSesion[clave] || total > mejorPorSesion[clave].total) {
      mejorPorSesion[clave] = { fila: filaHoja, total: total };
    }
  });

  const filasAConservar = {};
  Object.keys(mejorPorSesion).forEach(function (k) { filasAConservar[mejorPorSesion[k].fila] = true; });

  const filasABorrar = [];
  datos.forEach(function (r, i) {
    const filaHoja = i + 2;
    if (!filasAConservar[filaHoja]) filasABorrar.push(filaHoja);
  });

  filasABorrar.sort(function (a, b) { return b - a; }).forEach(function (fila) { sh.deleteRow(fila); });

  Logger.log('Filas duplicadas eliminadas: ' + filasABorrar.length);
  recalcularTodasLasEstadisticas();
}

// Corrige retroactivamente el Total/% Acierto de las filas 'abandono' ya
// guardadas en "Registro" desde ANTES del fix de upsertRegistro() (guardaba
// Total como el tamaño COMPLETO de la sesión, 20, sin importar cuántas
// preguntas alcanzó a ver el estudiante antes de salir — ver commit que
// agregó ese fix). "Respondidas" nunca se guardó como columna propia en
// Registro, así que aquí se aproxima sumando Correctas + el total de
// "Errores por tema" de esa misma fila (los aciertos/errores reales que sí
// quedaron registrados). Es una aproximación, no el valor exacto: si el
// estudiante falló la MISMA fórmula más de una vez antes de abandonar,
// juego.html solo cuenta ese error una vez en "Errores por tema" (dedup por
// fórmula — ver ST.errors en juego.html), así que el total aproximado puede
// quedar levemente por debajo del real. Aun así es muchísimo más justo que
// el 20 fijo que había antes (ver ejemplo en el commit del fix: 1/20=5%
// pasaba a acercarse a su verdadero 1/1=100%).
//
// Las filas 'fin' no se tocan — una sesión terminada sí respondió las 20.
// Es idempotente: si se corre más de una vez, o sobre filas que ya llegaron
// corregidas desde el fix en vivo, el total recalculado coincide con el que
// ya había y no se modifica nada (ver "if (nuevoTotal === totalActual)").
//
// Al final recalcula Estadísticas/Eficacia por tema/Curso X para que "Nota
// de juego" (que ya filtra por el periodo académico vigente — Regla 5, ver
// calcularEstadisticasEstudiante) refleje los Registro corregidos.
function corregirTotalAbandonosHistorico() {
  conLockDeScript_(function () { corregirTotalAbandonosHistorico_(); });
}

function corregirTotalAbandonosHistorico_() {
  const ss = obtenerSpreadsheet();
  const sh = obtenerHojaRegistro(ss); // migra el esquema viejo si hace falta antes de tocar filas
  if (!sh || sh.getLastRow() < 2) {
    Logger.log('Registro vacío, nada que corregir.');
    return;
  }

  const numFilas = sh.getLastRow() - 1;
  const datos = sh.getRange(2, 1, numFilas, REG_HEADERS.length).getValues();
  let corregidas = 0;

  datos.forEach(function (r, i) {
    const trigger = String(r[COL.TRIGGER - 1] || '').trim();
    if (trigger !== 'abandono') return;

    const correctas = Number(r[COL.CORRECTAS - 1]) || 0;
    const totalActual = Number(r[COL.TOTAL - 1]) || 0;
    const erroresTema = parseJSONSeguro(r[COL.ERR_TEMA - 1]);
    const erroresSuma = Object.keys(erroresTema).reduce(function (acc, k) {
      return acc + (Number(erroresTema[k]) || 0);
    }, 0);
    const respondidasAprox = correctas + erroresSuma;

    // Nunca subir el Total por encima de lo que ya había (inventaría
    // preguntas que no existieron) ni bajarlo por debajo de Correctas.
    const nuevoTotal = Math.max(correctas, Math.min(respondidasAprox, totalActual || respondidasAprox));
    if (nuevoTotal === totalActual || nuevoTotal <= 0) return;

    const nuevoPct = Math.round((correctas / nuevoTotal) * 100);
    const fila = i + 2;
    sh.getRange(fila, COL.TOTAL).setValue(nuevoTotal);
    sh.getRange(fila, COL.PCT).setValue(nuevoPct);
    sh.getRange(fila, 1, 1, REG_HEADERS.length).setBackground(colorPorPorcentaje(nuevoPct));
    corregidas++;
  });

  Logger.log('Filas "abandono" corregidas: ' + corregidas + ' de ' + numFilas + ' filas totales en Registro.');
  recalcularTodasLasEstadisticas();
}

// Lista, SIN normalizar, todos los valores distintos que existen en la
// columna "Curso" de Registro y cuántas filas tiene cada uno (con su tipo de
// dato JS), para detectar cursos con nombres inconsistentes (espacios de
// más, mayúsculas distintas, tipo numérico en vez de texto, etc.).
function diagnosticoCursos() {
  const ss = obtenerSpreadsheet();
  const sh = obtenerHojaRegistro(ss); // migra el esquema viejo si hace falta antes de leer
  if (!sh || sh.getLastRow() < 2) {
    Logger.log('Registro vacío.');
    return;
  }

  const datos = sh.getRange(2, COL.CURSO, sh.getLastRow() - 1, 1).getValues();
  const conteo = {};
  datos.forEach(function (r) {
    const valor = r[0];
    const clave = JSON.stringify(valor) + ' (' + (typeof valor) + ')';
    conteo[clave] = (conteo[clave] || 0) + 1;
  });

  Logger.log('── Valores distintos en columna Curso (sin normalizar) ──');
  Object.keys(conteo).sort().forEach(function (clave) {
    Logger.log(clave + ' → ' + conteo[clave] + ' fila(s)');
  });
}

// Crea (si no existen) las hojas base con sus encabezados, útil para dejar
// el spreadsheet listo antes de la primera partida real.
function inicializarHojas() {
  const ss = obtenerSpreadsheet();
  obtenerHojaEstudiantes_(ss);
  obtenerHojaRegistro(ss);
  recalcularTodasLasEstadisticas();
  Logger.log('Hojas de BioNom listas: ' + ss.getUrl());
}

// Ordena las pestañas en un orden fijo y predecible — Registro, Estadísticas,
// Eficacia por tema, una por cada "Curso X" (alfabético), Errores al final —
// y OCULTA (sin borrar) las pestañas heredadas de versiones anteriores del
// script ("Hoja 1", "Resultados", "Sesiones", el "Resumen por Curso" viejo):
// sus datos ya quedaron incorporados a "Registro" por la migración, así que
// solo estorban al navegar. No se borra nada — si hace falta revisarlas,
// se pueden volver a mostrar manualmente (clic derecho en la barra de
// pestañas → Mostrar hojas ocultas).
function reordenarHojas() {
  const ss = obtenerSpreadsheet();
  const HOJAS_LEGADAS = ['Hoja 1', 'Resultados', 'Sesiones', 'Resumen por Curso'];

  const hojasCurso = ss.getSheets()
    .map(function (sh) { return sh.getName(); })
    .filter(function (n) { return n.indexOf('Curso ') === 0; })
    .sort();

  const ordenDeseado = ['Estudiantes', 'Registro', 'Estadísticas', 'Eficacia por tema']
    .concat(hojasCurso)
    .concat(['Errores']);

  let posicion = 1;
  ordenDeseado.forEach(function (nombre) {
    const sh = ss.getSheetByName(nombre);
    if (!sh) return;
    ss.setActiveSheet(sh);
    ss.moveActiveSheet(posicion);
    posicion++;
  });

  // No se mueven de posición: una hoja oculta no aparece en la barra de
  // pestañas, así que su posición es irrelevante — y activarla primero
  // (como hace el bucle de arriba con setActiveSheet) arriesgaría
  // des-ocultarla, justo lo contrario de lo que esta función busca.
  const ocultadas = [];
  HOJAS_LEGADAS.forEach(function (nombre) {
    const sh = ss.getSheetByName(nombre);
    if (!sh) return;
    try {
      sh.hideSheet();
      ocultadas.push(nombre);
    } catch (err) {
      // Apps Script no deja ocultar la última hoja visible del libro; si
      // pasa, se deja esa pestaña visible en vez de fallar toda la función.
      registrarError('reordenarHojas', err);
    }
  });

  Logger.log('Pestañas reordenadas. Ocultas (no borradas): ' +
    (ocultadas.length ? ocultadas.join(', ') : 'ninguna') + '.');
}
