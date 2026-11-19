#!/usr/bin/env node
/* ═════════════════════════════════════════════════════════════════════
   nom.js — banco de preguntas y generadores de BioNom, ChromaNom e IonNom.

   node scripts/nom.js temas        <sitio>
   node scripts/nom.js buscar       <sitio> [opciones]           → JSON
   node scripts/nom.js crucigrama   <sitio> [opciones]           → hoja HTML
   node scripts/nom.js sopa         <sitio> [opciones]           → hoja HTML
   node scripts/nom.js ahorcado     <sitio> [opciones]           → hoja HTML
   node scripts/nom.js cuestionario <sitio> [opciones]           → hoja HTML
   node scripts/nom.js validar      <sitio> <archivo.json>       → revisión
   node scripts/nom.js exportar     <sitio> <archivo.json>       → formato del sitio

   <sitio>: bio | chroma | ion (también bionom, chromanom, ionom).
   Opciones comunes:
     --tema celula,genetica   temas (ids de «temas»); también grupos de palabras
     --n 10                   cuántas palabras o preguntas
     --curso 7                (BioNom) solo lo que corresponde hasta ese curso
     --nivel basico|medio|completo   (BioNom) nivel del juego
     --semilla 1234           repite exactamente la misma hoja
     --titulo "…"             título de la hoja
     --salida hoja.html       archivo de salida (por defecto en ./salida/)
     --pdf                    además guarda el PDF (necesita Playwright)
     --sin-respuestas         no agrega la hoja de respuestas
     --desde archivo.json     usa preguntas o palabras escritas a mano
   Ver SKILL.md para el detalle de cada comando.
   ═════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs'), path = require('path');
const RAIZ = path.resolve(__dirname, '..');

/* ───────── argumentos ───────── */
const argv = process.argv.slice(2), cmd = argv.shift(), pos = [], op = {};
for(let i = 0; i < argv.length; i++){
  const a = argv[i];
  if(a.startsWith('--')){ const k = a.slice(2), v = argv[i + 1]; if(v !== undefined && !v.startsWith('--')){ op[k] = v; i++; } else op[k] = true; }
  else pos.push(a);
}
function fallar(msg){ console.error('✖ ' + msg); process.exit(1); }

/* ───────── datos ───────── */
const ALIAS = {bio: 'bionom', bionom: 'bionom', biologia: 'bionom', 'biología': 'bionom',
  chroma: 'chromanom', chromanom: 'chromanom', organica: 'chromanom', 'orgánica': 'chromanom',
  ion: 'ionom', ionom: 'ionom', inorganica: 'ionom', 'inorgánica': 'ionom'};
function sitio(nombre){
  const s = ALIAS[String(nombre || '').toLowerCase()];
  if(!s) fallar('Falta el sitio o no lo conozco: «' + (nombre || '') + '». Usa bio, chroma o ion.');
  return JSON.parse(fs.readFileSync(path.join(RAIZ, 'datos', s + '.json'), 'utf8'));
}
let ICFES = null;
function icfes(){ return ICFES || (ICFES = JSON.parse(fs.readFileSync(path.join(RAIZ, 'datos', 'icfes.json'), 'utf8'))); }

/* ───────── utilidades ───────── */
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sinTilde = s => String(s).replace(/ñ/g, '\u0001').replace(/Ñ/g, '\u0002').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\u0001/g, 'ñ').replace(/\u0002/g, 'Ñ');
const normal = s => sinTilde(String(s).replace(/<[^>]*>/g, '')).toLowerCase();
const letras = s => sinTilde(String(s).toUpperCase()).replace(/[^A-ZÑ]/g, '');
function azar(semilla){           // mulberry32: el mismo número da la misma hoja
  let a = semilla >>> 0;
  return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const SEMILLA = op.semilla !== undefined ? parseInt(op.semilla, 10) : Math.floor(Math.random() * 1e6);
const rnd = azar(SEMILLA);
function barajar(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const lista = v => v && v !== true ? String(v).split(',').map(s => s.trim()).filter(Boolean) : [];

/* ───────── filtros ───────── */
function temasPedidos(d){
  const t = lista(op.tema);
  if(!t.length) return null;
  const ids = new Set(d.temas.map(x => x.id).concat((d.grupos || []).map(g => g.id)));
  t.forEach(x => { if(!ids.has(x)) fallar('El tema «' + x + '» no existe en ' + d.nombre + '. Mira la lista con: node scripts/nom.js temas ' + d.sitio); });
  return t;
}
const NIVELES = {basico: ['basico'], 'básico': ['basico'], medio: ['basico', 'medio'], completo: ['basico', 'medio', 'completo']};
function filtrarPreguntas(d, arr){
  const t = temasPedidos(d);
  let r = arr.filter(q => !t || t.includes(q.tema));
  if(op.curso){ const c = parseInt(op.curso, 10); r = r.filter(q => !q.curso || q.curso <= c); }
  if(op.nivel){ const n = NIVELES[op.nivel]; if(!n) fallar('Nivel: basico, medio o completo.'); r = r.filter(q => !q.nivel || n.includes(q.nivel)); }
  if(op.tipo){ const k = lista(op.tipo); r = r.filter(q => k.includes(q.tipo)); }
  if(op.dba){ const k = lista(op.dba); r = r.filter(q => k.includes(q.dba)); }
  if(op.comp){ const k = lista(op.comp); r = r.filter(q => k.includes(q.comp)); }
  if(op.texto){ const s = normal(op.texto); r = r.filter(q => normal(JSON.stringify(q)).includes(s)); }
  if(op.cortas) r = r.filter(q => q.tipo === 'vf' || (q.tipo === 'mc' && q.ops.every(o => o.length <= 36)));
  r = r.filter(q => !q.estructura || q.svg || (d.figuras && d.figuras[q.estructura]));
  // Fórmulas con ramas entre paréntesis: el sitio las dibuja, pero en papel saldrían
  // como texto. Se dejan fuera (con --con-ramas se ven en «buscar» para dibujarlas).
  if(d.sitio === 'chromanom' && !op['con-ramas']) r = r.filter(q => !conRamas([q.q, q.ctx, q.exp].concat(q.ops || []).join(' ')));
  return r;
}
function palabrasDe(d){
  const t = temasPedidos(d);
  let w = d.palabras;
  if(t){
    const g = new Set();
    t.forEach(x => {
      g.add(x);
      (d.grupos || []).forEach(G => { if(G.id === x) G.temas.forEach(y => g.add(y)); });
      if(d.temaGrupo && d.temaGrupo[x]) g.add(d.temaGrupo[x]);
      (d.grupos || []).forEach(G => { if(G.temas.includes(x)) g.add(G.id); });
    });
    w = w.filter(p => g.has(p.grupo));
  }
  return w;
}
// Palabras del archivo --desde: [{palabra, pistas:[…]}] o [PALABRA, grupo, p1, p2, p3]
function leerDesde(){
  if(!op.desde) return null;
  let x;
  try { x = JSON.parse(fs.readFileSync(op.desde, 'utf8')); } catch(e){ fallar('No pude leer ' + op.desde + ': ' + e.message); }
  return Array.isArray(x) ? x : (x.preguntas || x.palabras || []);
}
function elegirPalabras(d, n, min, max){
  let fuente = leerDesde();
  fuente = fuente ? fuente.map(w => Array.isArray(w) ? {palabra: w[0], grupo: w[1], pistas: w.slice(2).filter(Boolean)} : w).filter(w => w && w.palabra) : palabrasDe(d);
  const vistos = {}, todos = [];
  fuente.forEach(w => {
    const pal = letras(w.palabra);
    if(!pal || vistos[pal] || pal.length < min || pal.length > max) return;
    vistos[pal] = 1;
    todos.push({pal, txt: w.palabra, grupo: w.grupo, pistas: (w.pistas || []).filter(Boolean)});
  });
  if(!todos.length) fallar('No hay palabras para ese tema (entre ' + min + ' y ' + max + ' letras).');
  return op.desde ? todos.slice(0, n || todos.length) : barajar(todos).slice(0, n || todos.length);
}

/* ═════════════════ CRUCIGRAMA (mismas reglas de retos.js) ═════════════════ */
function ubicar(lista, n){
  const G = {}, usadas = [], k = (r, c) => r + ',' + c, celda = (r, c) => G[k(r, c)];
  function cabe(p, r, c, dir){
    const dr = dir === 'V' ? 1 : 0, dc = dir === 'H' ? 1 : 0; let cruces = 0;
    if(celda(r - dr, c - dc) || celda(r + dr * p.length, c + dc * p.length)) return -1;
    for(let i = 0; i < p.length; i++){
      const rr = r + dr * i, cc = c + dc * i, g = celda(rr, cc);
      if(g){ if(g.l !== p[i] || g[dir]) return -1; cruces++; }
      else if(celda(rr + dc, cc + dr) || celda(rr - dc, cc - dr)) return -1;   // nada pegado a los lados
    }
    return cruces;
  }
  function poner(it, r, c, dir){
    const dr = dir === 'V' ? 1 : 0, dc = dir === 'H' ? 1 : 0;
    for(let i = 0; i < it.pal.length; i++){ const key = k(r + dr * i, c + dc * i); G[key] = G[key] || {l: it.pal[i]}; G[key][dir] = 1; }
    usadas.push({item: it, r, c, dir});
  }
  for(let w = 0; w < lista.length && usadas.length < n; w++){
    const it = lista[w], p = it.pal;
    if(!usadas.length){ poner(it, 0, 0, 'H'); continue; }
    const ops = [];
    usadas.forEach(u => {
      for(let i = 0; i < u.item.pal.length; i++){
        const ur = u.r + (u.dir === 'V' ? i : 0), uc = u.c + (u.dir === 'H' ? i : 0);
        for(let j = 0; j < p.length; j++){
          if(p[j] !== u.item.pal[i]) continue;
          const dir = u.dir === 'H' ? 'V' : 'H', r0 = dir === 'V' ? ur - j : ur, c0 = dir === 'H' ? uc - j : uc;
          const cr = cabe(p, r0, c0, dir);
          if(cr > 0) ops.push({r: r0, c: c0, dir, cr});
        }
      }
    });
    if(!ops.length) continue;
    ops.forEach(o => {   // más cruces y forma compacta
      const rs = [o.r, o.r + (o.dir === 'V' ? p.length - 1 : 0)], cs = [o.c, o.c + (o.dir === 'H' ? p.length - 1 : 0)];
      usadas.forEach(u => { rs.push(u.r, u.r + (u.dir === 'V' ? u.item.pal.length - 1 : 0)); cs.push(u.c, u.c + (u.dir === 'H' ? u.item.pal.length - 1 : 0)); });
      const alto = Math.max(...rs) - Math.min(...rs) + 1, ancho = Math.max(...cs) - Math.min(...cs) + 1;
      o.s = o.cr * 30 - Math.max(alto, ancho) * 2 - Math.abs(alto - ancho) + rnd() * 6;
    });
    ops.sort((a, b) => b.s - a.s);
    poner(it, ops[0].r, ops[0].c, ops[0].dir);
  }
  return usadas;
}
function armarCrucigrama(cands, n){
  let mejor = null;
  for(let i = 0; i < 60; i++){
    const r = ubicar(barajar(cands), n);
    if(!mejor || r.length > mejor.length) mejor = r;
    if(mejor.length >= n) break;
  }
  let minR = 1e9, minC = 1e9, maxR = -1e9, maxC = -1e9;
  mejor.forEach(w => { const L = w.item.pal.length; minR = Math.min(minR, w.r); minC = Math.min(minC, w.c);
    maxR = Math.max(maxR, w.r + (w.dir === 'V' ? L - 1 : 0)); maxC = Math.max(maxC, w.c + (w.dir === 'H' ? L - 1 : 0)); });
  mejor.forEach(w => { w.r -= minR; w.c -= minC; });
  const inicios = [...new Set(mejor.map(w => w.r * 1000 + w.c))].sort((a, b) => a - b);
  mejor.forEach(w => { w.num = inicios.indexOf(w.r * 1000 + w.c) + 1; });
  mejor.sort((a, b) => a.num - b.num || (a.dir === 'H' ? -1 : 1));
  return {F: maxR - minR + 1, C: maxC - minC + 1, palabras: mejor};
}
function cmdCrucigrama(d){
  const n = parseInt(op.n || 10, 10), np = Math.max(1, Math.min(3, parseInt(op.pistas || 2, 10)));
  const cands = elegirPalabras(d, 0, 4, 15);
  let cr = armarCrucigrama(cands.slice(0, Math.max(n * 3, 24)), n);
  if(cr.palabras.length < n) cr = armarCrucigrama(cands, n);
  if(cr.palabras.length < n) console.warn('⚠ Solo cupieron ' + cr.palabras.length + ' de ' + n + ' palabras (hay pocas palabras que se crucen).');
  const {F, C, palabras} = cr, celdas = {};
  palabras.forEach(w => { for(let i = 0; i < w.item.pal.length; i++){ const r = w.r + (w.dir === 'V' ? i : 0), c = w.c + (w.dir === 'H' ? i : 0);
    celdas[r + ',' + c] = celdas[r + ',' + c] || {l: w.item.pal[i]}; if(!i) celdas[r + ',' + c].num = w.num; } });
  const lado = Math.max(18, Math.min(32, Math.floor(640 / Math.max(F, C))));
  const rejilla = conLetras => '<table class="cruci" style="--c:' + lado + 'px">' + Array.from({length: F}, (_, r) => '<tr>' + Array.from({length: C}, (_, c) => {
      const x = celdas[r + ',' + c];
      return x ? '<td class="l">' + (x.num ? '<i>' + x.num + '</i>' : '') + (conLetras ? x.l : '') + '</td>' : '<td></td>';
    }).join('') + '</tr>').join('') + '</table>';
  const pista = w => esc(w.item.pistas.slice(0, np).join(' · ') || '(sin pista)') + ' <span class="nl">(' + w.item.pal.length + ')</span>';
  const col = dir => '<ol class="pistas">' + palabras.filter(w => w.dir === dir).map(w => '<li value="' + w.num + '">' + pista(w) + '</li>').join('') + '</ol>';
  const cuerpo = '<p class="inst">Lee cada pista y escribe la palabra en las casillas que empiezan con su número. No lleva tildes; la Ñ ocupa una casilla.</p>'
    + '<div class="centro">' + rejilla(false) + '</div>'
    + '<div class="dos"><div><h3>➡ Horizontales</h3>' + col('H') + '</div><div><h3>⬇ Verticales</h3>' + col('V') + '</div></div>';
  const resp = '<div class="centro">' + rejilla(true) + '</div><div class="dos"><div><h3>➡ Horizontales</h3><ol>'
    + palabras.filter(w => w.dir === 'H').map(w => '<li value="' + w.num + '">' + esc(w.item.txt) + '</li>').join('') + '</ol></div><div><h3>⬇ Verticales</h3><ol>'
    + palabras.filter(w => w.dir === 'V').map(w => '<li value="' + w.num + '">' + esc(w.item.txt) + '</li>').join('') + '</ol></div></div>';
  return hoja(d, {tipo: 'Crucigrama', cuerpo, resp, extra: palabras.length + ' palabras'});
}

/* ═════════════════ SOPA DE LETRAS (mismas reglas de retos.js) ═════════════════ */
const FREC = 'AAAAAAAAAAAAEEEEEEEEEEEEEOOOOOOOOOIIIIIIUUUUSSSSSSRRRRRRNNNNNNLLLLLDDDDDTTTTCCCCMMMPPPBBGGVYQHFZJÑXK';
function unica(M, items){
  const n = M.length, D8 = [[0,1],[1,0],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]];
  return items.every(it => {
    const p = it.pal; let cuenta = 0;
    for(let r = 0; r < n; r++) for(let c = 0; c < n; c++){
      if(M[r][c] !== p[0]) continue;
      for(const d of D8){ let i = 0; for(; i < p.length; i++){ const rr = r + d[0] * i, cc = c + d[1] * i; if(rr < 0 || rr >= n || cc < 0 || cc >= n || M[rr][cc] !== p[i]) break; } if(i === p.length) cuenta++; }
    }
    return cuenta === (p === p.split('').reverse().join('') ? 2 : 1);
  });
}
function armarSopa(items, lado, DIRS){
  for(let vuelta = 0; vuelta < 80; vuelta++){
    const M = Array.from({length: lado}, () => Array(lado).fill('')), pos = []; let ok = true;
    const orden = items.slice().sort((a, b) => b.pal.length - a.pal.length);
    for(const it of orden){
      const p = it.pal; let puesto = false;
      for(let t = 0; t < 500 && !puesto; t++){
        const d = DIRS[Math.floor(rnd() * DIRS.length)], r0 = Math.floor(rnd() * lado), c0 = Math.floor(rnd() * lado);
        const rf = r0 + d[0] * (p.length - 1), cf = c0 + d[1] * (p.length - 1);
        if(rf < 0 || rf >= lado || cf < 0 || cf >= lado) continue;
        let cabe = true;
        for(let i = 0; i < p.length; i++){ const x = M[r0 + d[0] * i][c0 + d[1] * i]; if(x && x !== p[i]){ cabe = false; break; } }
        if(!cabe) continue;
        for(let i = 0; i < p.length; i++) M[r0 + d[0] * i][c0 + d[1] * i] = p[i];
        pos.push({item: it, r: r0, c: c0, d}); puesto = true;
      }
      if(!puesto){ ok = false; break; }
    }
    if(!ok) continue;
    for(let k = 0; k < 20; k++){
      const R2 = M.map(f => f.map(x => x || FREC[Math.floor(rnd() * FREC.length)]));
      if(unica(R2, items)) return {M: R2, pos};
    }
  }
  return null;
}
function cmdSopa(d){
  const n = parseInt(op.n || 10, 10);
  const DIRS = op.facil ? [[0, 1], [1, 0]] : [[0, 1], [1, 0], [1, 1], [-1, 1]];
  let s = null, items = null;
  for(let t = 0; t < 10 && !s; t++){
    items = elegirPalabras(d, n, 4, 14);
    const largo = Math.max(...items.map(i => i.pal.length));
    const lado = op.lado ? Math.max(largo, parseInt(op.lado, 10)) : Math.max(11, Math.min(16, largo + 1));
    s = armarSopa(items, lado, DIRS);
  }
  if(!s) fallar('No se pudo armar la sopa de letras. Prueba con menos palabras o con --lado más grande.');
  const COL = ['#2f80d1', '#2e9d5b', '#d9822b', '#8e44ad', '#c0392b', '#16a085', '#b7791f', '#2c3e9e', '#d35400', '#7f8c8d', '#1abc9c', '#e91e63'];
  const marca = {};
  s.pos.forEach(p => { const i = items.indexOf(p.item); for(let k = 0; k < p.item.pal.length; k++){ const key = (p.r + p.d[0] * k) + ',' + (p.c + p.d[1] * k); if(!marca[key]) marca[key] = COL[i % COL.length]; } });
  const tabla = sol => '<table class="sopa">' + s.M.map((f, r) => '<tr>' + f.map((l, c) => {
      const m = sol && marca[r + ',' + c];
      return '<td' + (m ? ' style="background:' + m + ';color:#fff;font-weight:800"' : (sol ? ' class="tenue"' : '')) + '>' + l + '</td>';
    }).join('') + '</tr>').join('') + '</table>';
  const verPal = op['mostrar-palabras'];
  const dirTxt = op.facil ? '→ y ↓' : '→ ↓ ↘ ↗';
  const cuerpo = '<p class="inst">' + (verPal ? 'Busca estas palabras en la sopa' : 'Lee cada pista, piensa la palabra y búscala en la sopa') + '. Van en dirección ' + dirTxt + '. Sin tildes.</p>'
    + '<div class="centro">' + tabla(false) + '</div>'
    + '<ol class="pistas col2">' + items.map(it => '<li>' + (verPal ? '<b>' + esc(it.txt) + '</b>' : esc(it.pistas[0] || '') + ' <span class="nl">(' + it.pal.length + ' letras)</span> ______________') + '</li>').join('') + '</ol>';
  const resp = '<div class="centro">' + tabla(true) + '</div><ol class="col2">' + items.map((it, i) => '<li><b style="color:' + COL[i % COL.length] + '">' + esc(it.txt) + '</b></li>').join('') + '</ol>';
  return hoja(d, {tipo: 'Sopa de letras', cuerpo, resp, extra: items.length + ' palabras'});
}

/* ═════════════════ AHORCADO (6 fallos; pista 2 a los 2 fallos, pista 3 a los 4) ═════════════════ */
function cmdAhorcado(d){
  const n = parseInt(op.n || 6, 10), items = elegirPalabras(d, n, 4, 16);
  const horca = '<svg viewBox="0 0 70 80" width="70" height="80" aria-hidden="true"><path d="M5 76h40M15 76V5h32v10" fill="none" stroke="#1a2a3a" stroke-width="3" stroke-linecap="round"/></svg>';
  const ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').map(l => '<span>' + l + '</span>').join('');
  const casillas = it => String(it.txt).toUpperCase().split('').map(ch => /\s/.test(ch) ? '<span class="esp"></span>' : (/[A-ZÁÉÍÓÚÜÑ]/i.test(ch) ? '<span class="cas"></span>' : '<span class="sig">' + esc(ch) + '</span>')).join('');
  const cuerpo = '<p class="inst">Juega en parejas: uno lee la pista 1 y el otro dice letras. Tacha cada letra usada en el abecedario. Al 2.º fallo se lee la pista 2 y al 4.º la pista 3. Con 6 fallos se pierde.</p>'
    + items.map((it, i) => '<div class="ah"><div class="ah-h">' + horca + '<div class="fallos">Fallos: ○○○○○○</div></div><div class="ah-c"><b>' + (i + 1) + '.</b> <span class="cass">' + casillas(it) + '</span> <span class="nl">(' + it.pal.length + ' letras)</span>'
      + '<div class="abc">' + ABC + '</div>'
      + '<div class="p1">💡 Pista 1: ' + esc(it.pistas[0] || '') + '</div>'
      + (op['pistas-aparte'] ? '' : '<div class="p23">Pista 2 (2 fallos): ' + esc(it.pistas[1] || '—') + '<br>Pista 3 (4 fallos): ' + esc(it.pistas[2] || '—') + '</div>')
      + '</div></div>').join('');
  const resp = '<ol>' + items.map(it => '<li><b>' + esc(it.txt) + '</b>' + (op['pistas-aparte'] ? ' — Pista 2: ' + esc(it.pistas[1] || '—') + ' · Pista 3: ' + esc(it.pistas[2] || '—') : '') + '</li>').join('') + '</ol>';
  return hoja(d, {tipo: 'Ahorcado', cuerpo, resp, extra: items.length + ' palabras'});
}

/* ═════════════════ CUESTIONARIO ═════════════════ */
const LET = 'ABCDEFGH';
function tablaHTML(t){
  if(!t || !t.length) return '';
  return '<table class="datos"><tr>' + t[0].map(h => '<th>' + esc(h) + '</th>').join('') + '</tr>' + t.slice(1).map(f => '<tr>' + f.map(x => '<td>' + esc(x) + '</td>').join('') + '</tr>').join('') + '</table>';
}
function numTxt(v){ return String(Math.round(v * 100) / 100).replace('.', ','); }
function grafHTML(g){     // copia de saber-icfes.js
  if(!g || !g.x) return '';
  const W = 300, H = 176, L = 46, R = 10, T = 16, B = 48, ser = g.series || [{n: '', y: g.y}], bar = g.tipo === 'bar';
  let lo = g.ymin || 0, mx = lo; ser.forEach(z => z.y.forEach(v => { if(v > mx) mx = v; }));
  const rango = (mx - lo) || 1, mag = Math.pow(10, Math.floor(Math.log10(rango / 4))); let paso = mag;
  [1, 2, 2.5, 5, 10].some(m => { paso = m * mag; return rango / paso <= 5; });
  const top = lo + Math.ceil((mx - lo) / paso - 1e-9) * paso, n = g.x.length, pw = W - L - R, ph = H - T - B;
  const X = i => bar ? L + pw * (i + 0.5) / n : L + pw * (n === 1 ? 0.5 : i / (n - 1)) * 0.9 + pw * 0.05;
  const Y = v => T + ph - (v - lo) / (top - lo) * ph;
  const col = ['#1f4e79', '#c55a11', '#2e7d32']; let o = '';
  for(let t = lo; t <= top + 1e-9; t += paso) o += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(t).toFixed(1) + '" y2="' + Y(t).toFixed(1) + '" stroke="#ddd"/><text x="' + (L - 5) + '" y="' + (Y(t) + 3).toFixed(1) + '" text-anchor="end" font-size="9">' + numTxt(t) + '</text>';
  o += '<line x1="' + L + '" x2="' + L + '" y1="' + T + '" y2="' + (T + ph) + '" stroke="#333"/><line x1="' + L + '" x2="' + (W - R) + '" y1="' + (T + ph) + '" y2="' + (T + ph) + '" stroke="#333"/>';
  g.x.forEach((c, i) => { o += '<text x="' + X(i).toFixed(1) + '" y="' + (T + ph + 12) + '" text-anchor="middle" font-size="9">' + esc(c) + '</text>'; });
  const m = ser.length, bw = pw / n * 0.7 / (bar ? m : 1);
  ser.forEach((z, k) => {
    if(bar) z.y.forEach((v, i) => { const x0 = X(i) - bw * m / 2 + k * bw; o += '<rect x="' + x0.toFixed(1) + '" y="' + Y(v).toFixed(1) + '" width="' + (bw * 0.92).toFixed(1) + '" height="' + (T + ph - Y(v)).toFixed(1) + '" fill="' + col[k % 3] + '"/>'; });
    else o += '<polyline fill="none" stroke="' + col[k % 3] + '" stroke-width="1.8"' + (k === 1 ? ' stroke-dasharray="5 3"' : '') + ' points="' + z.y.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ') + '"/>' + z.y.map((v, i) => '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(v).toFixed(1) + '" r="2.6" fill="' + col[k % 3] + '"/>').join('');
  });
  if(g.ex) o += '<text x="' + (L + pw / 2) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="10" font-weight="700">' + esc(g.ex) + '</text>';
  if(g.ey) o += '<text transform="translate(11,' + (T + ph / 2) + ') rotate(-90)" text-anchor="middle" font-size="10" font-weight="700">' + esc(g.ey) + '</text>';
  if(m > 1) ser.forEach((z, k) => { o += '<rect x="' + (L + k * 84) + '" y="1" width="9" height="7" fill="' + col[k % 3] + '"/><text x="' + (L + k * 84 + 12) + '" y="7.5" font-size="9">' + esc(z.n) + '</text>'; });
  return '<div class="fig"><svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" style="font-family:sans-serif">' + o + '</svg></div>';
}
// Pinta una pregunta (formato común de datos/*.json) y devuelve [html, clave, explicación]
function pintar(q, num, d){
  const svg = q.svg || (q.estructura && d && d.figuras && d.figuras[q.estructura]);
  const ctx = (q.ctx ? '<p class="ctx">' + esc(q.ctx) + '</p>' : '') + (svg ? '<div class="fig mol">' + svg + '</div>' : '') + tablaHTML(q.tabla) + grafHTML(q.graf);
  let h = '', clave = '';
  const enun = '<p class="enun"><b>' + num + '.</b> ' + esc(q.q) + '</p>';
  switch(q.tipo){
    case 'mc': case 'saber': {
      const correcta = q.ops[q.tipo === 'saber' || q.a === undefined ? 0 : q.a];
      const ops = op['sin-barajar'] && q.tipo !== 'saber' ? q.ops.slice() : barajar(q.ops);
      clave = LET[ops.indexOf(correcta)] + '. ' + correcta;
      h = '<ol class="ops" type="A">' + ops.map(o => '<li>' + esc(o) + '</li>').join('') + '</ol>'; break;
    }
    case 'vf': clave = q.a ? 'Verdadero' : 'Falso'; h = '<p class="vf">( ) Verdadero &nbsp;&nbsp; ( ) Falso</p>'; break;
    case 'esc': clave = [...new Set([].concat(q.a))].slice(0, 2).join(' / '); h = '<p class="linea"></p>'; break;
    case 'num': { const c = v => String(v).replace('.', ','); clave = c(q.a) + (q.unidad ? ' ' + q.unidad : '') + (q.tol ? ' (± ' + c(q.tol) + ')' : ''); } h = '<p class="linea corta">' + (q.unidad ? ' ' + esc(q.unidad) : '') + '</p>'; break;
    case 'ord': {
      clave = q.ops.join(' → ');
      h = '<p class="nota">Numera del 1 al ' + q.ops.length + ' en el orden correcto.</p><ul class="ord">' + barajar(q.ops).map(o => '<li>( ) ' + esc(o) + '</li>').join('') + '</ul>'; break;
    }
    case 'rel': {
      const der = barajar(q.pares.map(p => p[1]));
      clave = q.pares.map((p, i) => (i + 1) + '-' + LET[der.indexOf(p[1])]).join(', ');
      h = '<div class="rel"><ol>' + q.pares.map(p => '<li>' + esc(p[0]) + '</li>').join('') + '</ol><ol type="A">' + der.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol></div><p class="nota">Escribe las parejas: 1-__ 2-__ …</p>'; break;
    }
    case 'comp': {
      const banco = barajar([].concat(q.a, q.distractores || []));
      clave = [].concat(q.a).join(', ');
      h = '<p class="nota">Palabras para escoger: ' + banco.map(esc).join(' · ') + '</p>'; break;
    }
    case 'abierta': clave = '(Respuesta abierta)'; h = '<div class="lineas">' + '<p class="linea"></p>'.repeat(parseInt(op.lineas || 5, 10)) + '</div>'; break;
    default: clave = q.a !== undefined ? JSON.stringify(q.a) : '';
  }
  let exp = q.exp || '';
  if(q.tipo === 'saber' && q.comp){ const C = icfes().competencias[q.comp]; exp = (C ? 'Competencia: ' + C.corto + (q.af ? ' (' + q.af + ')' : '') + '. ' : '') + exp; }
  return ['<div class="preg">' + ctx + enun + h + '</div>', clave, exp];
}
function cmdCuestionario(d){
  let items = [];
  const desde = leerDesde();
  if(desde){
    items = desde.filter(q => q && q.q).map(q => Object.assign({}, q, {tipo: q.tipo || (q.ctx && q.ops ? 'saber' : q.ops ? 'mc' : 'abierta')}));
  } else {
    const nj = parseInt(op.juego || (op.saber || op.abiertas ? 0 : 10), 10), ns = parseInt(op.saber || 0, 10), na = parseInt(op.abiertas || 0, 10);
    const tomar = (arr, n, que) => { const r = barajar(arr).slice(0, n); if(r.length < n) console.warn('⚠ Solo hay ' + r.length + ' ' + que + ' con esos filtros (pediste ' + n + ').'); return r; };
    items = items.concat(tomar(filtrarPreguntas(d, d.preguntas), nj, 'preguntas del juego'));
    const tp = op.tipo; delete op.tipo;   // --tipo solo aplica a las del juego
    items = items.concat(tomar(filtrarPreguntas(d, d.saber), ns, 'preguntas tipo Saber').map(q => Object.assign({}, q, {tipo: 'saber'})));
    const t = temasPedidos(d);
    items = items.concat(tomar(d.abiertas.filter(q => (!t || t.includes(q.tema)) && !(d.sitio === 'chromanom' && conRamas(q.q))), na, 'preguntas abiertas').map(q => Object.assign({}, q, {tipo: 'abierta'})));
    if(tp) op.tipo = tp;
    const nc = parseInt(op.compuestos || 0, 10);
    if(nc){
      if(!d.compuestos) fallar('--compuestos solo existe en IonNom.');
      const SIS = {tradicional: 'tradicional', stock: 'Stock', sistematica: 'sistemático'};
      const sis = op.sistema && op.sistema !== true ? lista(op.sistema) : ['tradicional', 'stock', 'sistematica'];
      sis.forEach(x => { if(!SIS[x]) fallar('--sistema: tradicional, stock o sistematica.'); });
      const t = lista(op.tema);
      let c = d.compuestos.filter(x => x.formula && (!t.length || t.includes(x.grupo)) && (!op.dificultad || x.nivel === op.dificultad));
      const modo = op.modo || 'mixto';
      const res = barajar(c).map(x => {
        const ss = sis.filter(k => x[k] && x[k].length);
        if(!ss.length) return null;
        const k = ss[Math.floor(rnd() * ss.length)], nom = x[k][0];
        const aFormula = modo === 'formula' || (modo === 'mixto' && rnd() < 0.5);
        return aFormula
          ? {tema: x.grupo, tipo: 'esc', q: 'Escribe la fórmula de: ' + nom + ' (nombre ' + SIS[k] + ').', a: [x.formula], exp: x.pista}
          : {tema: x.grupo, tipo: 'esc', q: 'Escribe el nombre ' + SIS[k] + ' de ' + x.formula + '.', a: x[k], exp: x.pista};
      }).filter(Boolean).slice(0, nc);
      if(res.length < nc) console.warn('⚠ Solo hay ' + res.length + ' compuestos con esos filtros.');
      items = items.concat(res);
    }
  }
  if(!items.length) fallar('No quedó ninguna pregunta con esos filtros.');
  const filas = items.map((q, i) => pintar(q, i + 1, d));
  const cuerpo = '<p class="inst">' + esc(op.instrucciones || 'Lee con atención cada pregunta. En las de opción múltiple marca una sola respuesta.') + '</p>' + filas.map(f => f[0]).join('');
  const resp = '<table class="clave"><tr><th style="width:34px">N.°</th><th>Respuesta</th><th>Explicación</th></tr>' + filas.map((f, i) => '<tr><td>' + (i + 1) + '</td><td>' + esc(f[1]) + '</td><td>' + esc(f[2]) + '</td></tr>').join('') + '</table>';
  return hoja(d, {tipo: 'Cuestionario', cuerpo, resp, extra: items.length + ' preguntas'});
}

/* ═════════════════ Hoja HTML para imprimir (carta) ═════════════════ */
function hoja(d, o){
  const temas = temasPedidos(d), nomT = temas ? temas.map(t => (d.temas.find(x => x.id === t) || (d.grupos || []).find(x => x.id === t) || {nombre: t}).nombre).join(', ') : '';
  const titulo = op.titulo || (o.tipo + (nomT ? ': ' + nomT : ' de ' + d.materia));
  let logo = '';
  try { logo = 'data:image/png;base64,' + fs.readFileSync(path.join(RAIZ, 'recursos', 'logo-' + d.sitio + '.png')).toString('base64'); } catch(e){}
  const cab = sub => '<header><div class="cab">' + (logo ? '<img src="' + logo + '" alt="' + esc(d.nombre) + '">' : '<b>' + esc(d.nombre) + '</b>')
    + '<div><h1>' + esc(titulo) + (sub ? ' — ' + sub : '') + '</h1><p class="sub">' + esc(d.nombre) + ' · ' + esc(o.tipo) + ' · ' + esc(o.extra) + '</p></div></div>'
    + (sub ? '' : '<div class="datos-est"><span>Nombre: ________________________________</span><span>Curso: ______</span><span>Fecha: __________</span></div>') + '</header>';
  const css = `@page{size:letter;margin:13mm 14mm 16mm}
*{box-sizing:border-box}body{font-family:"Segoe UI",Arial,sans-serif;color:#1a2a3a;font-size:12.5px;line-height:1.4;margin:0}
.pag{max-width:190mm;margin:0 auto;padding:6mm 0}.pag+.pag{page-break-before:always;break-before:page}
header{border-bottom:2px solid #1a2a3a;margin-bottom:8px;padding-bottom:6px}.cab{display:flex;gap:12px;align-items:center}.cab img{height:46px}
h1{font-size:18px;margin:0}.sub{margin:2px 0 0;color:#5a6b7d;font-size:11px}h3{margin:8px 0 4px;font-size:13px}
.datos-est{display:flex;justify-content:space-between;margin-top:8px;font-size:12px}
.inst{background:#f1f5f9;border-left:4px solid #2f80d1;padding:6px 10px;margin:8px 0;font-size:12px}
.centro{display:flex;justify-content:center;margin:8px 0}
.cruci{border-collapse:collapse}.cruci td{width:var(--c);height:var(--c);padding:0;text-align:center;vertical-align:middle;font-weight:700;font-size:calc(var(--c)*.5);position:relative}
.cruci td.l{border:1.4px solid #1a2a3a;background:#fff}.cruci i{position:absolute;top:1px;left:2px;font-size:8px;font-style:normal;font-weight:700;color:#334}
.dos{display:grid;grid-template-columns:1fr 1fr;gap:16px}.pistas li{margin:3px 0}.nl{color:#5a6b7d;font-size:11px}
.sopa{border-collapse:collapse;font-family:"Courier New",monospace}.sopa td{width:27px;height:27px;text-align:center;font-weight:700;font-size:15px;border:1px solid #cbd5e1}.sopa td.tenue{color:#b8c2cc}
.col2{columns:2;column-gap:20px}.col2 li{break-inside:avoid;margin:3px 0}
.ah{display:flex;gap:10px;border:1px solid #cbd5e1;border-radius:8px;padding:8px;margin:8px 0;break-inside:avoid}.ah-h{text-align:center;font-size:10px;color:#5a6b7d}
.cass{display:inline-flex;gap:4px;flex-wrap:wrap;vertical-align:middle}.cas{display:inline-block;width:18px;border-bottom:2px solid #1a2a3a;height:20px}.esp{display:inline-block;width:12px}.sig{font-weight:700}
.abc{display:flex;flex-wrap:wrap;gap:3px;margin:6px 0;font-family:monospace;font-size:11px}.abc span{border:1px solid #cbd5e1;border-radius:3px;padding:0 3px}
.p1{font-weight:600}.p23{font-size:11px;color:#5a6b7d;margin-top:3px}
.preg{margin:10px 0;break-inside:avoid}.enun{margin:4px 0}.ctx{margin:4px 0;background:#f8fafc;border:1px solid #e2e8f0;padding:6px 8px;border-radius:6px}
.ops{margin:2px 0 0 20px;padding-left:12px}.ops li{margin:2px 0}.vf{margin-left:18px}.nota{font-size:11px;color:#5a6b7d;margin:2px 0 2px 18px}
.linea{border-bottom:1px solid #94a3b8;height:22px;margin:4px 0 4px 18px}.linea.corta{width:45%}.lineas .linea{height:24px}
.ord{list-style:none;margin:2px 0 0 18px;padding:0}.rel{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.datos{border-collapse:collapse;margin:6px 0 6px 18px;font-size:11.5px}.datos th,.datos td{border:1px solid #94a3b8;padding:3px 7px}.datos th{background:#eef2f7}
.fig{margin:6px 0 6px 18px}.fig svg{max-width:100%;height:auto}.fig.mol svg{max-height:150px;width:auto}
.clave{border-collapse:collapse;width:100%;font-size:11.5px}.clave th,.clave td{border:1px solid #cbd5e1;padding:4px 6px;vertical-align:top;text-align:left}.clave th{background:#eef2f7}
footer{margin-top:14px;border-top:1px solid #cbd5e1;padding-top:4px;font-size:9.5px;color:#5a6b7d;display:flex;justify-content:space-between}
@media screen{body{background:#e5e7eb}.pag{background:#fff;padding:12mm 14mm;margin:10px auto;box-shadow:0 1px 6px #0002}}`;
  const pie = '<footer><span>' + esc(d.pie || d.nombre) + '</span><span>Semilla ' + SEMILLA + '</span></footer>';
  const html = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>' + esc(titulo) + '</title><style>' + css + '</style></head><body>'
    + '<section class="pag">' + cab('') + o.cuerpo + pie + '</section>'
    + (op['sin-respuestas'] ? '' : '<section class="pag">' + cab('Respuestas') + o.resp + pie + '</section>')
    + '</body></html>';
  return {html, titulo};
}

/* ═════════════════ Guardar (HTML y, si se pide, PDF) ═════════════════ */
async function guardar(r, base){
  const salida = op.salida ? path.resolve(String(op.salida)) : path.resolve('salida', base + '-' + SEMILLA + '.html');
  fs.mkdirSync(path.dirname(salida), {recursive: true});
  fs.writeFileSync(salida, r.html);
  console.log('✔ Hoja HTML: ' + salida + '  (semilla ' + SEMILLA + ')');
  if(op.pdf){
    let pw;
    try { pw = require('playwright'); } catch(e){ try { pw = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'); } catch(e2){} }
    if(!pw){ console.warn('⚠ No hay Playwright: abre el HTML en el navegador y usa Imprimir → Guardar como PDF.'); return; }
    let nav;
    try { nav = await pw.chromium.launch(); }
    catch(e){ nav = await pw.chromium.launch({executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox']}).catch(() => null); }
    if(!nav){ console.warn('⚠ No se pudo abrir Chromium para el PDF.'); return; }
    const p = await nav.newPage();
    await p.goto('file://' + salida);
    const pdf = salida.replace(/\.html?$/i, '') + '.pdf';
    await p.pdf({path: pdf, format: 'Letter', printBackground: true, preferCSSPageSize: true});
    await nav.close();
    console.log('✔ PDF: ' + pdf);
  }
}

/* ═════════════════ VALIDAR preguntas o palabras nuevas ═════════════════ */
const EMOJI_MALO = /[\u{1F1E6}-\u{1F1FF}\u{1FA70}-\u{1FAFF}\u{1F7E0}-\u{1F7EB}\u{1F90C}\u{1F972}\u{1F977}\u{1F978}\u{1F9A3}-\u{1F9A4}\u{1F9AB}-\u{1F9AD}\u{1F9CB}\u{1F9CC}\u{1F6D5}-\u{1F6D7}\u{1F6FB}\u{1F6FC}]/u;
// Rama entre paréntesis pegada a un átomo (CH(CH₃), C(CH₃)₄) o grupo que empieza con
// paréntesis y sigue con subíndice ((CH₃)₃C). No marca apartes como «metano (CH₄)».
const PARENTESIS = /[A-Z][a-z]?[₀-₉]*\((?:C|O|N|Cl|Br|I|F)[^()]{0,14}\)|\((?:CH|C[₀-₉]|C=)[^()]{0,14}\)[₀-₉]/;
const PERMITIDOS = /\b(?:EN|P|M|Mr|n|m|V|T|E)\([A-Z][a-z]?[₀-₉]*\)|\(CH₃COO\)[₀-₉]|Ag\(NH₃\)₂|Pb\(OAc\)₂|(?:[ABD-GI-Z][a-z]?|C[a-z]|H[a-z])[₀-₉]*\((?:OH|NO₃|NO₂|SO₄|SO₃|PO₄|CO₃|ClO[₀-₉]?|BrO[₀-₉]?|IO[₀-₉]?|HCO₃|HSO₄|H₂PO₄|HPO₄|CN|MnO₄|CrO₄|Cr₂O₇|NH₄)\)[₀-₉]*|\(NH₄\)[₀-₉]*|\((?:I{1,3}|IV|VI?|VII)\)/g;
const conRamas = t => PARENTESIS.test(String(t || '').replace(PERMITIDOS, ''));
const VACIAS = new Set('para como pero porque cuando donde desde hasta entre sobre tiene tienen esta este esto estos estas cual cuales todo toda todos todas otro otra mismo misma solo muy mas menos tambien ademas cada segun'.split(' '));
const raices = s => normal(s).split(/[^a-zñ0-9]+/).filter(w => w.length >= 4 && !VACIAS.has(w)).map(w => w.slice(0, 6));
function parecido(a, b){ const A = new Set(raices(a)), B = new Set(raices(b)); if(!A.size || !B.size) return 0; let c = 0; A.forEach(x => { if(B.has(x)) c++; }); return c / Math.max(A.size, B.size); }
function cmdValidar(d){
  const arch = pos[1] || op.desde;
  if(!arch) fallar('Falta el archivo: node scripts/nom.js validar <sitio> nuevas.json');
  op.desde = arch;
  const items = leerDesde(), errores = [], avisos = [];
  const temas = new Set(d.temas.map(t => t.id)), grupos = new Set((d.grupos || []).map(g => g.id).concat([...new Set(d.palabras.map(p => p.grupo))]));
  const todasQ = d.preguntas.concat(d.saber).concat(d.abiertas.map(a => Object.assign({id: 'abierta'}, a)));
  const palBanco = new Set(d.palabras.map(p => letras(p.palabra)));
  const vistasQ = [], vistasP = new Set();
  const textoDe = q => [q.q, q.ctx, q.exp].concat(q.ops || [], q.pistas || []).filter(Boolean).join(' ');
  items.forEach((x, i) => {
    const yo = '#' + (i + 1) + (x.q ? ' «' + String(x.q).slice(0, 50) + '…»' : x.palabra || Array.isArray(x) ? ' «' + (x.palabra || x[0]) + '»' : '');
    const E = m => errores.push(yo + ': ' + m), A = m => avisos.push(yo + ': ' + m);
    const texto = Array.isArray(x) ? x.join(' ') : x.palabra ? [x.palabra].concat(x.pistas || []).join(' ') : textoDe(x);
    if(EMOJI_MALO.test(texto)) E('tiene un emoji que en el Windows del docente sale como rectángulo (banderas o emojis nuevos).');
    if(conRamas(texto))
      E('tiene una fórmula con ramas entre paréntesis: escríbela como fórmula molecular o dibújala.');
    /* ── palabra para ahorcado / sopa / crucigrama ── */
    if(Array.isArray(x) || x.palabra){
      const w = Array.isArray(x) ? {palabra: x[0], grupo: x[1], pistas: x.slice(2)} : x, L = letras(w.palabra), p = (w.pistas || []).filter(Boolean);
      if(L.length < 4 || L.length > 15) A('la palabra tiene ' + L.length + ' letras: el crucigrama usa de 4 a 15 y la sopa de 4 a 14.');
      if(p.length !== 3) E('debe tener exactamente 3 pistas (tiene ' + p.length + ').');
      if(p[0] && (String(w.palabra).length + p[0].length) > 95) E('palabra + pista 1 pasan de 95 caracteres (' + (String(w.palabra).length + p[0].length) + '): acorta la pista 1 (criptograma).');
      p.forEach((s, k) => { if(normal(s).includes(normal(w.palabra))) E('la pista ' + (k + 1) + ' contiene la palabra.'); });
      if(palBanco.has(L)) E('«' + w.palabra + '» ya está en el banco de ' + d.nombre + ' (no se repiten palabras).');
      if(vistasP.has(L)) E('palabra repetida dentro del archivo.');
      vistasP.add(L);
      if(w.grupo && !grupos.has(w.grupo) && !temas.has(w.grupo)) A('el grupo «' + w.grupo + '» no existe en ' + d.nombre + '.');
      return;
    }
    /* ── pregunta ── */
    const tipo = x.tipo || (x.ctx && x.ops ? 'saber' : x.ops ? 'mc' : 'abierta');
    if(!x.q) E('falta el enunciado (q).');
    if(!x.tema) E('falta el tema.'); else if(!temas.has(x.tema)) E('el tema «' + x.tema + '» no existe en ' + d.nombre + '.');
    if(tipo !== 'abierta'){
      if(!x.exp || x.exp.length < 40) E('falta la explicación completa (exp, al menos una o dos oraciones).');
      else if(x.exp.split(/\s+/).length > 80) A('la explicación pasa de 80 palabras (regla de coherencia de Mayer).');
    }
    if(tipo === 'mc' || tipo === 'saber'){
      const o = x.ops || [];
      if(o.length < 3 || o.length > 5) E('debe tener de 3 a 5 opciones (tiene ' + o.length + ').');
      if(new Set(o.map(normal)).size !== o.length) E('hay opciones repetidas.');
      const ia = tipo === 'saber' ? 0 : x.a;
      if(typeof ia !== 'number' || ia < 0 || ia >= o.length) E('«a» debe ser el índice (0, 1, 2…) de la opción correcta.');
      else if(o.length > 2){
        const otras = o.filter((_, k) => k !== ia), prom = otras.reduce((s, y) => s + y.length, 0) / otras.length;
        if(o[ia].length > prom * 1.5 && o[ia].length - prom > 15) A('la opción correcta es mucho más larga que las demás: se delata. Empareja la longitud.');
        if(o.some(y => /todas las anteriores|ninguna de las anteriores/i.test(y))) A('evita «todas/ninguna de las anteriores».');
      }
      if(op.cortas && tipo === 'mc' && o.some(y => y.length > 36)) E('para los laberintos cada opción debe tener 36 caracteres o menos.');
    }
    if(tipo === 'vf' && typeof x.a !== 'boolean') E('en verdadero/falso, «a» debe ser true o false.');
    if(tipo === 'esc' && !(Array.isArray(x.a) && x.a.length)) E('en «esc», «a» debe ser una lista de respuestas aceptadas.');
    if(tipo === 'saber'){
      if(!x.ctx || x.ctx.length < 40) E('la pregunta tipo Saber necesita una situación (ctx) de al menos una oración.');
      if(!['uso', 'exp', 'ind'].includes(x.comp || x.c)) E('falta la competencia (comp: uso, exp o ind).');
      const af = x.af, C = icfes().competencias[x.comp || x.c];
      if(!af) A('falta la afirmación del Icfes (af: ' + (C ? C.af.join(', ') : 'I1…N4') + ').');
      else if(C && !C.af.includes(af)) E('la afirmación ' + af + ' no es de la competencia ' + (x.comp || x.c) + ' (son ' + C.af.join(', ') + ').');
      if(x.ops && x.ops.length !== 4) A('las preguntas Saber del sitio tienen 4 opciones (la correcta va de primera en el archivo).');
    }
    if(tipo !== 'abierta' && tipo !== 'saber'){
      const p = x.pistas || x.p;
      if(d.sitio === 'bionom' && !(Array.isArray(p) && p.length === 2)) E('en BioNom cada pregunta lleva 2 pistas (p): una general y una concreta.');
      if(Array.isArray(p)){
        const resp = tipo === 'mc' ? [x.ops && x.ops[x.a]] : [].concat(x.a);
        p.forEach((s, k) => resp.filter(r => typeof r === 'string' && r.length >= 4).forEach(r => {
          if(normal(s).includes(normal(r))) E('la pista ' + (k + 1) + ' trae la respuesta completa.');
          else { const R = raices(r); if(R.length && R.every(z => raices(s).includes(z))) A('la pista ' + (k + 1) + ' casi dice la respuesta.'); }
        }));
      }
    }
    if(d.sitio === 'bionom' && x.curso && (x.curso < 6 || x.curso > 11)) E('curso debe ser de 6 a 11.');
    if(d.sitio === 'bionom' && x.dba && x.dba !== 'sin' && d.dba && !((d.dba[String(x.dba).split('.')[0]] || []).some(z => String(z.n) === String(x.dba).split('.')[1]))) A('el DBA «' + x.dba + '» no está en la lista de DBA de biología.');
    // ¿ya existe en el banco?
    let mejor = null, sim = 0;
    todasQ.forEach(b => { if(b.tema !== x.tema) return; const s = parecido(x.q + ' ' + (x.ctx || ''), b.q + ' ' + (b.ctx || '')); if(s > sim){ sim = s; mejor = b; } });
    if(sim >= 0.8) E('casi igual a una pregunta del banco (' + (mejor.id || '') + '): «' + String(mejor.q).slice(0, 70) + '…».');
    else if(sim >= 0.6) A('se parece a ' + (mejor.id || 'una del banco') + ': «' + String(mejor.q).slice(0, 70) + '…».');
    vistasQ.forEach(v => { if(parecido(x.q, v) >= 0.8) A('se parece a otra pregunta del mismo archivo.'); });
    vistasQ.push(x.q || '');
  });
  console.log('Revisé ' + items.length + ' elementos para ' + d.nombre + '.');
  if(errores.length){ console.log('\n✖ ERRORES (' + errores.length + '):'); errores.forEach(e => console.log('  - ' + e)); }
  if(avisos.length){ console.log('\n⚠ AVISOS (' + avisos.length + '):'); avisos.forEach(e => console.log('  - ' + e)); }
  if(!errores.length && !avisos.length) console.log('✔ Todo cumple las reglas del banco.');
  process.exitCode = errores.length ? 1 : 0;
}

/* ═════════════════ EXPORTAR al formato de cada sitio ═════════════════ */
// Convierte preguntas y palabras escritas en el formato común al formato del
// archivo del sitio, para pegarlas en el repositorio (después de «validar»).
function cmdExportar(d){
  op.desde = pos[1] || op.desde;
  if(!op.desde) fallar('Falta el archivo: node scripts/nom.js exportar <sitio> nuevas.json');
  const items = leerDesde(), J = x => JSON.stringify(x).replace(/"([a-zA-Z_]+)":/g, '$1:');
  const juego = [], saber = [], abiertas = [], palabras = [];
  items.forEach(x => {
    if(Array.isArray(x)) return palabras.push(x);
    if(x.palabra) return palabras.push([String(x.palabra).toUpperCase(), x.grupo || x.tema].concat(x.pistas || []));
    const tipo = x.tipo || (x.ctx && x.ops ? 'saber' : x.ops ? 'mc' : 'abierta');
    if(tipo === 'saber'){
      const o = {ctx: x.ctx, q: x.q, o: x.ops, c: x.comp || x.c, af: x.af};
      if(x.exp) o.exp = x.exp; if(x.tabla) o.tabla = x.tabla; if(x.graf) o.graf = x.graf;
      if(d.sitio === 'bionom'){ o.t = x.tema; if(x.dba) o.dba = x.dba; if(x.curso) o.curso = x.curso; }
      else if(d.sitio === 'ionom'){ o.tema = x.tema; o.k = x.k || 'Q'; }
      else { o.k = x.k || 'Q'; o._tema = x.tema; }
      return saber.push(o);
    }
    if(tipo === 'abierta') return abiertas.push(d.sitio === 'ionom' ? {tema: x.tema, t: x.t || 'con', q: x.q} : d.sitio === 'chromanom' ? {_tema: x.tema, t: x.t || 'con', q: x.q} : {_tema: x.tema, q: x.q});
    if(d.sitio === 'bionom'){
      const o = {t: x.tema, k: tipo, q: x.q}; if(x.ops) o.ops = x.ops; o.a = x.a; o.exp = x.exp; o.p = x.pistas || x.p;
      if(x.dba) o.dba = x.dba; if(x.curso) o.curso = x.curso; if(x.niv) o.niv = x.niv;
      juego.push(o);
    } else if(d.sitio === 'chromanom'){
      if(tipo !== 'mc') fallar('En ChromaNom las preguntas nuevas del banco de temas son de opción múltiple (tipo mc).');
      const o = {type: 'mc', topic: x.tema, q: x.q, ans: x.ops[x.a], opts: x.ops, expl: x.exp};
      if(x.porque) o.optfb = x.porque; if(x.pistas) o.hints = x.pistas;
      juego.push(o);
    } else {
      const o = {id: x.id || String(x.q).slice(0, 40), tema: x.subtema || x.tema};
      if(x.ctx) o.ctx = x.ctx; o.q = x.q;
      if(tipo === 'mc'){ o.ok = x.ops[x.a]; o.d = x.ops.filter((_, k) => k !== x.a); }
      else if(tipo === 'num'){ o.tipo = 'calcular'; o.ok = x.a; if(x.tol) o.tol = x.tol; if(x.unidad) o.unidad = x.unidad; }
      else if(tipo === 'esc'){ o.tipo = 'escribir'; o.ok = [].concat(x.a)[0]; o.alt = [].concat(x.a).slice(1); }
      else if(tipo === 'ord'){ o.tipo = 'ordenar'; o.items = x.ops; }
      else if(tipo === 'rel'){ o.tipo = 'relacionar'; o.pares = x.pares; }
      else if(tipo === 'comp'){ o.tipo = 'completar'; o.ok = x.a; o.d = x.distractores; }
      o.x = x.exp;
      juego.push(o);
    }
  });
  const DONDE = {
    bionom: {juego: 'banco.js → dentro de BIO_NUEVAS([ … ]) al final del archivo', saber: 'docente-datos.js → bloque final que hace push a SABER (la opción correcta va de primera); luego correr node herramientas/generar-saber-juego.js',
      abiertas: 'docente-datos.js → ABIERTAS[tema] (solo el texto entre comillas)', palabras: 'ahorcado-datos.js → BANCO_AHORCADO'},
    chromanom: {juego: 'fundamentos.js / temas-extra.js / temas-11.js → el arreglo del tema (FUND_BANCO)', saber: 'docente-datos.js → SABER[tema] (sin el campo _tema; la correcta va de primera); luego correr node herramientas/generar-saber-juego.js',
      abiertas: 'docente-datos.js → ABIERTAS[tema] (sin el campo _tema)', palabras: 'ahorcado-datos.js → BANCO_AHORCADO'},
    ionom: {juego: 'banco.js → el arreglo BANCO_… del tema (BANCO_ATOMO, BANCO_ENLACE, BANCO_PH, BANCO_GASES…)', saber: 'assets/docente-datos.js → SABER (la correcta va de primera); luego correr node herramientas/generar-saber-juego.js',
      abiertas: 'assets/docente-datos.js → ABIERTAS', palabras: 'assets/bancos-extra.js → BANCO_AHORCADO'}}[d.sitio];
  const out = [['juego', juego], ['saber', saber], ['abiertas', abiertas], ['palabras', palabras]].filter(z => z[1].length)
    .map(([k, arr]) => '// ' + arr.length + ' para: ' + DONDE[k] + '\n' + arr.map(o => J(o) + ',').join('\n')).join('\n\n');
  if(op.salida){ fs.writeFileSync(op.salida, out + '\n'); console.log('✔ Guardado en ' + op.salida); } else console.log(out);
}

/* ═════════════════ TEMAS y BUSCAR ═════════════════ */
function cmdTemas(d){
  console.log(d.nombre + ' — ' + d.materia + ' (datos del ' + d.generado + ')\n');
  console.log('TEMA'.padEnd(18) + 'JUEGO SABER ABIERTAS PALABRAS  NOMBRE');
  d.temas.forEach(t => {
    const c = a => a.filter(q => q.tema === t.id).length;
    op.tema = t.id; const nw = palabrasDe(d).length; delete op.tema;
    console.log(t.id.padEnd(18) + String(c(d.preguntas)).padStart(5) + String(c(d.saber)).padStart(6) + String(c(d.abiertas)).padStart(9) + String(nw).padStart(9) + '  ' + t.nombre);
  });
  if(d.grupos && d.grupos.length){
    console.log('\nGrupos de palabras (ahorcado, sopa, crucigrama):');
    d.grupos.forEach(g => { op.tema = g.id; console.log('  ' + g.id.padEnd(16) + String(palabrasDe(d).length).padStart(4) + ' palabras  ' + g.nombre + '  [' + g.temas.join(', ') + ']'); delete op.tema; });
  }
  if(d.compuestos){ const g = {}; d.compuestos.forEach(c => { g[c.grupo] = (g[c.grupo] || 0) + 1; }); console.log('\nCompuestos (nomenclatura): ' + Object.entries(g).map(([k, v]) => k + ' ' + v).join(', ')); }
}
function cmdBuscar(d){
  const de = op.de || 'juego';
  let r;
  if(de === 'juego') r = filtrarPreguntas(d, d.preguntas);
  else if(de === 'saber') r = filtrarPreguntas(d, d.saber);
  else if(de === 'abiertas'){ const t = temasPedidos(d); r = d.abiertas.filter(q => !t || t.includes(q.tema)); if(op.texto){ const s = normal(op.texto); r = r.filter(q => normal(q.q).includes(s)); } }
  else if(de === 'palabras') r = palabrasDe(d).filter(p => !op.texto || normal(JSON.stringify(p)).includes(normal(op.texto)));
  else if(de === 'compuestos'){ r = d.compuestos || []; const t = lista(op.tema); if(t.length) r = r.filter(c => t.includes(c.grupo)); if(op.nivel) r = r.filter(c => c.nivel === op.nivel); }
  else fallar('--de puede ser juego, saber, abiertas, palabras o compuestos.');
  const total = r.length;
  if(op.n) r = barajar(r).slice(0, parseInt(op.n, 10));
  const txt = JSON.stringify(r, null, op.compacto ? 0 : 1);
  if(op.salida){ fs.writeFileSync(op.salida, txt); console.log('✔ ' + r.length + ' de ' + total + ' guardados en ' + op.salida); }
  else { console.log(txt); console.error('(' + r.length + ' de ' + total + ')'); }
}

/* ═════════════════ principal ═════════════════ */
(async () => {
  const AYUDA = 'Uso: node scripts/nom.js <temas|buscar|crucigrama|sopa|ahorcado|cuestionario|validar|exportar> <bio|chroma|ion> [opciones]';
  if(!cmd || cmd === 'ayuda' || cmd === '--help'){ console.log(AYUDA); return; }
  const d = sitio(pos[0]);
  const base = d.sitio + '-' + cmd + (op.tema && op.tema !== true ? '-' + String(op.tema).replace(/[^a-z0-9-]+/gi, '_') : '');
  switch(cmd){
    case 'temas': return cmdTemas(d);
    case 'buscar': return cmdBuscar(d);
    case 'validar': return cmdValidar(d);
    case 'exportar': return cmdExportar(d);
    case 'crucigrama': return guardar(cmdCrucigrama(d), base);
    case 'sopa': return guardar(cmdSopa(d), base);
    case 'ahorcado': return guardar(cmdAhorcado(d), base);
    case 'cuestionario': case 'taller': case 'evaluacion': return guardar(cmdCuestionario(d), base);
    default: fallar('No conozco el comando «' + cmd + '». ' + AYUDA);
  }
})().catch(e => fallar(e.stack || e.message));
