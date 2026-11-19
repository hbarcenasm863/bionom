#!/usr/bin/env node
/* ═════════════════════════════════════════════════════════════════════
   armar-skill-banco.js — arma (o actualiza) la skill «nom-banco».

   Lee los bancos de preguntas y de palabras de los tres sitios del docente
   (BioNom, ChromaNom e IonNom), los pasa a un formato común y los guarda en
   skill/nom-banco/datos/*.json. Después empaqueta skill/nom-banco.zip, que
   es el archivo que se sube a claude.ai (Configuración → Capacidades → Skills).

   Uso (desde la carpeta de BioNom, con ChromaNom e IonNom al lado):
     node herramientas/armar-skill-banco.js
     node herramientas/armar-skill-banco.js ../chromanom ../ionom

   Volver a correrlo cada vez que cambien banco.js, ahorcado-datos.js,
   docente-datos.js (o sus equivalentes en los otros sitios) y subir el .zip
   nuevo a claude.ai: la skill lleva una COPIA de los bancos.
   ═════════════════════════════════════════════════════════════════════ */
'use strict';
const vm = require('vm'), fs = require('fs'), path = require('path'), cp = require('child_process');

const BIO = path.resolve(__dirname, '..');
const CHROMA = path.resolve(process.argv[2] || path.join(BIO, '..', 'chromanom'));
const ION = path.resolve(process.argv[3] || path.join(BIO, '..', 'ionom'));
const SKILL = path.join(BIO, 'skill', 'nom-banco');
const DATOS = path.join(SKILL, 'datos');

/* ───────── Cargar archivos del sitio en una «ventana» falsa ───────── */
function cargar(raiz, archivos, extra){
  const noop = () => {};
  const falso = new Proxy(function(){}, {get: (t, k) => k === Symbol.toPrimitive ? () => '' : falso, apply: () => falso, set: () => true});
  const w = {};
  Object.assign(w, {window: w, console, setTimeout: noop, addEventListener: noop, navigator: {},
    localStorage: {getItem: () => null, setItem: noop}, location: {search: '', href: '', pathname: ''},
    matchMedia: () => ({matches: false, addEventListener: noop}),
    document: {addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
      createElement: () => falso, head: falso, body: falso, readyState: 'loading', documentElement: falso}});
  vm.createContext(w);
  for(const f of archivos){
    const codigo = fs.readFileSync(path.join(raiz, f), 'utf8') + ((extra && extra[f]) || '');
    vm.runInContext(codigo, w, {filename: f});
  }
  return w;
}
const limpio = s => String(s == null ? '' : s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const plano = x => x === undefined ? undefined : JSON.parse(JSON.stringify(x));   // saca los objetos del contexto vm
function sinVacios(o){ Object.keys(o).forEach(k => { if(o[k] === undefined || o[k] === null || o[k] === '' || (Array.isArray(o[k]) && !o[k].length)) delete o[k]; }); return o; }
function palabras(banco){
  return plano(banco).map(w => sinVacios({palabra: w[0], grupo: w[1], pistas: [w[2], w[3], w[4]].filter(Boolean).map(limpio)}));
}
function grupos(g){ return plano(g || []).map(x => ({id: x[0], nombre: limpio(x[1]), temas: x[2]})); }

/* ═════════════════ BioNom ═════════════════ */
function bionom(){
  const w = cargar(BIO, ['banco.js', 'ahorcado-datos.js', 'docente-datos.js', 'dba-bio.js', 'nivel-bio.js']);
  const temas = plano(w.TEMAS_JUEGO).map(t => ({id: t[0], nombre: t[1]}));
  const NIV = {1: 'basico', 2: 'medio', 3: 'completo'};
  const preguntas = w.BANCO_BIO.map((q, i) => {
    let curso, dba, niv;
    try { curso = w.BIO_DBA.curso(q); dba = w.BIO_DBA.dba(q); } catch(e){}
    try { niv = NIV[w.BIO_NIVEL.de(q)]; } catch(e){}
    return sinVacios({id: 'bio-j' + (i + 1), tema: q.t, tipo: q.k, q: limpio(q.q), ops: q.ops && plano(q.ops).map(limpio),
      a: plano(q.a), exp: limpio(q.exp), pistas: q.p && plano(q.p).map(limpio), curso, dba, nivel: niv});
  });
  const D = w.DOCENTE_DATOS;
  const saber = D.SABER.map((s, i) => {
    let curso, dba;
    try { curso = w.BIO_DBA.curso({t: s.t, q: s.q + ' ' + (s.ctx || ''), ops: s.o, a: 0, k: 'mc'}); dba = w.BIO_DBA.dba({t: s.t, q: s.q, ops: s.o, a: 0, k: 'mc', dba: s.dba}); } catch(e){}
    return sinVacios({id: 'bio-s' + (i + 1), tema: s.t, ctx: limpio(s.ctx), q: limpio(s.q), ops: plano(s.o).map(limpio),
      comp: s.c, af: s.af, exp: limpio(s.exp), tabla: s.tabla && plano(s.tabla), graf: s.graf && plano(s.graf), curso: s.curso || curso, dba: s.dba || dba});
  });
  const abiertas = [];
  Object.keys(D.ABIERTAS).forEach(t => D.ABIERTAS[t].forEach(q => abiertas.push(sinVacios({tema: t, q: limpio(typeof q === 'string' ? q : q.q), tipo: q.t}))));
  return {sitio: 'bionom', pie: pieDe(w), nombre: 'BioNom', materia: 'Biología (6.° a 11.°)', temas, preguntas, saber, abiertas,
    palabras: palabras(w.BANCO_AHORCADO), grupos: grupos(w.AHORCADO_GRUPOS),
    dba: plano(w.BIO_DBA.DBA || {})};
}

/* ═════════════════ ChromaNom ═════════════════ */
// Saca un arreglo literal «const NOMBRE=[ … ];» de juego.html, respetando textos.
function arregloLiteral(html, nombre){
  const ini = html.indexOf('const ' + nombre + '=[');
  if(ini < 0) return [];
  let i = html.indexOf('[', ini), prof = 0, q = null;
  const desde = i;
  for(; i < html.length; i++){
    const c = html[i];
    if(q){ if(c === '\\'){ i++; continue; } if(c === q) q = null; continue; }
    if(c === '"' || c === "'" || c === '`'){ q = c; continue; }
    if(c === '/' && html[i + 1] === '/'){ i = html.indexOf('\n', i); continue; }
    if(c === '/' && html[i + 1] === '*'){ i = html.indexOf('*/', i) + 1; continue; }
    if(c === '[') prof++;
    else if(c === ']'){ prof--; if(!prof) break; }
  }
  return vm.runInNewContext('(' + html.slice(desde, i + 1) + ')', {});
}
function chromanom(){
  const w = cargar(CHROMA, ['fundamentos.js', 'temas-extra.js', 'temas-11.js', 'ahorcado-datos.js', 'docente-datos.js']);
  const D = w.DOCENTE_DATOS;
  const temas = D.TEMAS.map(t => ({id: t.id, nombre: limpio(t.titulo)}));
  const NOM = {hibridacion: 'Hibridación del carbono', principios: 'Principios de nomenclatura', cicloalcanos: 'Cicloalcanos',
    fenoles: 'Fenoles', derivados_acido: 'Haluros de ácido y anhídridos', tipos_reaccion: 'Tipos de reacción',
    fuerzas_inter: 'Fuerzas intermoleculares', orbitales_mol: 'Orbitales moleculares', quimica_ambiente: 'Química orgánica y ambiente',
    alquinos: 'Alquinos', nitrilos: 'Nitrilos', benceno: 'Benceno y aromáticos', eteres: 'Éteres', aldehidos: 'Aldehídos', cetonas: 'Cetonas', esteres: 'Ésteres', aminas: 'Aminas', amidas: 'Amidas'};
  const preguntas = [];
  plano(w.FUND_BANCO).forEach(q => {
    if(q.type !== 'mc' || q.fig || q.mol) return;          // las de figura necesitan el dibujo del sitio
    const a = q.opts.indexOf(q.ans);
    if(a < 0) return;
    preguntas.push(sinVacios({tema: q.topic, tipo: 'mc', q: limpio(q.q), ops: q.opts.map(limpio), a, exp: limpio(q.expl),
      pistas: q.hints && q.hints.map(limpio), porque: q.optfb && q.optfb.map(limpio)}));
  });
  // Nomenclatura de juego.html (codificada en base64). La estructura se dibuja
  // con la skill chromanom-estructuras: aquí va solo el NOMBRE de la molécula.
  const html = fs.readFileSync(path.join(CHROMA, 'juego.html'), 'utf8');
  const dec = s => { try { return decodeURIComponent(escape(Buffer.from(s, 'base64').toString('binary'))); } catch(e){ return s; } };
  const parece64 = s => typeof s === 'string' && /^[A-Za-z0-9+/]+={0,2}$/.test(s) && s.length % 4 === 0;
  ['QBANK', 'QBANK_EXTRA', 'QBANK_NOMENCLATURA_50', 'QBANK_HIDRO150'].forEach(n => arregloLiteral(html, n).forEach(q => {
    if(q.type !== 'mc' && q.type !== 'write') return;
    const d = s => parece64(s) ? dec(s) : s;
    const ans = d(q.ans), mol = q.mol ? d(q.mol) : '';
    const o = {tema: q.topic, q: limpio(q.q), exp: limpio(d(q.expl)), estructura: mol || undefined};
    if(q.type === 'mc'){ const a = (q.opts || []).indexOf(ans); if(a < 0) return; Object.assign(o, {tipo: 'mc', ops: q.opts.map(limpio), a}); }
    else Object.assign(o, {tipo: 'esc', a: [ans].concat(q.accepted ? [].concat(q.accepted).map(d) : [])});
    preguntas.push(sinVacios(o));
  }));
  preguntas.forEach((q, i) => { q.id = 'chr-j' + (i + 1); });
  const saber = [];
  Object.keys(D.SABER).forEach(t => D.SABER[t].forEach(s => saber.push(sinVacios({tema: t, ctx: limpio(s.ctx), q: limpio(s.q),
    ops: plano(s.o).map(limpio), comp: s.c, af: s.af, exp: limpio(s.exp), tabla: s.tabla && plano(s.tabla), graf: s.graf && plano(s.graf)}))));
  saber.forEach((s, i) => { s.id = 'chr-s' + (i + 1); });
  const abiertas = [];
  Object.keys(D.ABIERTAS).forEach(t => D.ABIERTAS[t].forEach(q => abiertas.push(sinVacios({tema: t, q: limpio(typeof q === 'string' ? q : q.q), tipo: q.t}))));
  // Temas que solo existen en el banco del juego
  const ya = new Set(temas.map(t => t.id));
  [...new Set(preguntas.map(q => q.tema))].forEach(t => { if(!ya.has(t)){ ya.add(t); temas.push({id: t, nombre: NOM[t] || (w.TEMAS11 && w.TEMAS11[t]) || t}); } });
  return {sitio: 'chromanom', pie: pieDe(w), nombre: 'ChromaNom', materia: 'Química orgánica (11.°)', temas, preguntas, saber, abiertas,
    palabras: palabras(w.BANCO_AHORCADO), grupos: grupos(w.AHORCADO_GRUPOS), temaGrupo: plano(w.ACT_TEMA_GRUPO || {})};
}

// Dibujos de las estructuras: se piden al propio juego.html abierto en Chromium.
// Semidesarrollada con todos sus enlaces (mkDevSVG) cuando existe; si no
// (anillos), el dibujo del juego. Sin Playwright, las preguntas quedan sin
// dibujo y la skill no las usa en hojas impresas.
async function figurasChroma(claves){
  let pw;
  try { pw = require('playwright'); } catch(e){ try { pw = require(cp.execSync('npm root -g').toString().trim() + '/playwright'); } catch(e2){} }
  if(!pw){ console.warn('⚠ Sin Playwright: las preguntas de nomenclatura de ChromaNom quedan sin dibujo.'); return {}; }
  const nav = await pw.chromium.launch(), p = await nav.newPage();
  await p.goto('file://' + path.join(CHROMA, 'juego.html'));
  await p.waitForTimeout(1200);
  const figs = await p.evaluate(ks => { const o = {}; ks.forEach(k => { try {
      const s = (typeof MOLDES !== 'undefined' && Array.isArray(MOLDES[k])) ? mkDevSVG(MOLDES[k]) : (M[k] ? M[k](false) : '');
      if(s && s.indexOf('<svg') >= 0) o[k] = s.replace(/\s+/g, ' ');
    } catch(e){} }); return o; }, claves);
  await nav.close();
  return figs;
}

/* ═════════════════ IonNom ═════════════════ */
function ionom(){
  const w = cargar(ION, ['banco.js', 'assets/bancos-extra.js', 'assets/docente-datos.js'],
    {'banco.js': ';window.__B={BANCO,atomo:BANCO_ATOMO,enlace:BANCO_ENLACE,acidobase:BANCO_PH,industria:BANCO_INDUSTRIA,modelos:BANCO_MODELOS,gases:BANCO_GASES,soluciones:BANCO_SOLUCIONES,estequiometria:BANCO_ESTEQUIOMETRIA};'});
  const D = w.DOCENTE_DATOS, B = plano(w.__B);
  const temas = D.TEMAS.map(t => ({id: t.id, nombre: limpio(t.titulo)}));
  const preguntas = [];
  Object.keys(B).filter(k => k !== 'BANCO').forEach(tema => B[tema].forEach(x => {
    // la configuración electrónica es su propio tema en el sitio
    const t = (tema === 'atomo' && /config|cuanticos/.test(x.tema)) ? 'config-e' : tema;
    const o = {tema: t, subtema: x.tema, ctx: limpio(x.ctx), q: limpio(x.q), exp: limpio(x.x)};
    switch(x.tipo){
      case 'calcular': Object.assign(o, {tipo: 'num', a: x.ok, tol: x.tol, unidad: x.unidad}); break;
      case 'ordenar': Object.assign(o, {tipo: 'ord', ops: x.items.map(limpio)}); break;
      case 'relacionar': Object.assign(o, {tipo: 'rel', pares: x.pares}); break;
      case 'completar': Object.assign(o, {tipo: 'comp', a: x.ok, distractores: x.d}); break;
      case 'escribir': Object.assign(o, {tipo: 'esc', a: [x.ok].concat(x.alt || [])}); break;
      default: Object.assign(o, {tipo: 'mc', ops: [x.ok].concat(x.d).map(limpio), a: 0});
    }
    preguntas.push(sinVacios(o));
  }));
  preguntas.forEach((q, i) => { q.id = 'ion-j' + (i + 1); });
  const compuestos = B.BANCO.map(c => sinVacios({formula: c.formula, ecuacion: c.ecuacion, grupo: c.group, nivel: c.level,
    tradicional: c.trad, stock: c.stock, sistematica: c.sist, tipoReaccion: c.tipo_rx, masaMolar: c.masa_molar, calculo: c.formula_calc,
    pista: limpio(c.hint), colombia: limpio(c.col)}));
  const saber = D.SABER.map((s, i) => sinVacios({id: 'ion-s' + (i + 1), tema: s.tema, ctx: limpio(s.ctx), q: limpio(s.q),
    ops: plano(s.o).map(limpio), comp: s.c, af: s.af, exp: limpio(s.exp), tabla: s.tabla && plano(s.tabla), graf: s.graf && plano(s.graf)}));
  const abiertas = D.ABIERTAS.map(q => sinVacios({tema: q.tema, q: limpio(q.q), tipo: q.t}));
  const ya = new Set(temas.map(t => t.id));
  [...new Set(preguntas.map(q => q.tema))].forEach(t => { if(!ya.has(t)){ ya.add(t); temas.push({id: t, nombre: t}); } });
  return {sitio: 'ionom', pie: pieDe(w), nombre: 'IonNom', materia: 'Química inorgánica (10.°)', temas, preguntas, saber, abiertas,
    palabras: palabras(w.BANCO_AHORCADO), grupos: grupos(w.AHORCADO_GRUPOS), temaGrupo: plano(w.ACT_TEMA_GRUPO || {}), compuestos};
}

/* ═════════════════ Guardar y empaquetar ═════════════════ */
fs.mkdirSync(DATOS, {recursive: true});
const resumen = [];
const pieDe = w => limpio(String((w && w.HOJA_SITIO && w.HOJA_SITIO.pie) || '').replace(/<\/span>\s*<span[^>]*>/g, ' · '));
(async () => {
for(const [fn, raiz] of [[bionom, BIO], [chromanom, CHROMA], [ionom, ION]]){
  if(!fs.existsSync(raiz)){ console.warn('⚠ No encontré', raiz, '— ese sitio queda con los datos anteriores.'); continue; }
  const d = fn();
  if(d.sitio === 'chromanom'){
    d.figuras = await figurasChroma([...new Set(d.preguntas.map(q => q.estructura).filter(Boolean))]);
    const sin = d.preguntas.filter(q => q.estructura && !d.figuras[q.estructura]).length;
    if(sin) console.warn('⚠ ' + sin + ' preguntas de ChromaNom quedaron sin dibujo de su estructura.');
  }
  d.generado = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(DATOS, d.sitio + '.json'), JSON.stringify(d));
  resumen.push(d.nombre + ': ' + d.preguntas.length + ' del juego, ' + d.saber.length + ' Saber, ' + d.abiertas.length + ' abiertas, '
    + d.palabras.length + ' palabras' + (d.compuestos ? ', ' + d.compuestos.length + ' compuestos' : ''));
}
// Competencias y afirmaciones de la prueba Saber 11 (saber-icfes.js, igual en los tres sitios)
{ const S = cargar(BIO, ['saber-icfes.js']).SABER_ICFES;
  fs.writeFileSync(path.join(DATOS, 'icfes.json'), JSON.stringify({competencias: plano(S.COMP), afirmaciones: plano(S.AF), componentes: plano(S.COMPONENTE)}, null, 1)); }
console.log(resumen.join('\n'));
const zip = path.join(BIO, 'skill', 'nom-banco.zip');
try {
  if(fs.existsSync(zip)) fs.unlinkSync(zip);
  cp.execFileSync('zip', ['-qr', zip, 'nom-banco', '-x', '*/salida/*'], {cwd: path.join(BIO, 'skill')});
  console.log('Paquete listo:', path.relative(BIO, zip), Math.round(fs.statSync(zip).size / 1024) + ' KB');
} catch(e){ console.warn('⚠ No se pudo crear el .zip (¿falta el programa «zip»?):', e.message); }
})();
