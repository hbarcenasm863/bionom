/* ════════════════════════════════════════════════════════════════════════
   docente-app.js — Guías, talleres y evaluaciones del panel docente de BioNom.
   Solo lógica; el contenido está en docente-datos.js (temas, Saber 11,
   abiertas) y banco.js (preguntas del Juego). Misma idea que el generador
   de ChromaNom e IonNom (ver LOGICA_DOCENTE.md de ChromaNom):
   - Tres tipos de documento, cada uno en su pestaña:
       guía de 4 sesiones (previos, información, práctica y evaluación),
       taller (preguntas del banco y actividades) y
       evaluación tipo Saber 11 (contexto + 4 opciones) con preguntas abiertas.
   - Azar con semilla: el mismo código da siempre las mismas hojas.
   - Varias versiones para evitar la copia; hoja de respuestas de burbujas y
     hojas de clave para el docente (opcionales).
   - Hojas tamaño carta (816 × 1056 px) que se paginan midiendo cada bloque.
   - Actividades dentro de talleres y guías (sopa, ahorcado, criptograma,
     mapa conceptual, detective) vía window.ACT_TALLER (extras.js).
   ════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var $=function(i){return document.getElementById(i);};
var esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
var D=window.DOCENTE_DATOS||{TEMAS:[],SABER:[],ABIERTAS:{}};
var TEMAS=window.TEMAS_JUEGO||[];
var TEMAS_N={};TEMAS.forEach(function(t){TEMAS_N[t[0]]=t[1];});
var TEMA_D={};(D.TEMAS||[]).forEach(function(t){TEMA_D[t.id]=t;});

/* ── azar con semilla ── */
function rng(str){var h=2166136261>>>0;for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}var a=h||1;return function(){a=(a+0x6D2B79F5)|0;var t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function mezclar(a,r){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function nuevaSemilla(){return Math.random().toString(36).slice(2,8).toUpperCase();}
var semilla=nuevaSemilla();
var MODO='guia';  // guia | taller | eval
var NOMBRE_MODO={guia:'Guía',taller:'Taller',eval:'Evaluación'};

/* ── formulario ── */
$('g-temas').innerHTML=TEMAS.map(function(t,i){var n=(window.BANCO_BIO||[]).filter(function(q){return q.t===t[0];}).length,s=(D.SABER||[]).concat(window.SABER_ICFES?SABER_ICFES.preguntas():[]).filter(function(q){return q.t===t[0];}).length;
  return '<label class="opt"><input type="checkbox" value="'+t[0]+'"'+(i===0?' checked':'')+'> <span><b>'+t[2]+' '+t[1]+'</b><small>'+n+' preguntas del juego · '+s+' tipo Saber 11</small></span></label>';}).join('');
function pintarActividades(){
  var box=$('g-acts');if(!box)return;
  var A=window.ACT_TALLER;if(!A){box.innerHTML='<small>Cargando actividades…</small>';return;}
  var marc={};box.querySelectorAll('input').forEach(function(i){marc[i.value]=i.checked;});
  var disp=A.disponibles(temasMarcados());
  box.innerHTML=A.tipos.map(function(t){var n=disp[t[0]]||0;return '<label class="opt"><input type="checkbox" value="'+t[0]+'"'+(marc[t[0]]&&n?' checked':'')+(n?'':' disabled')+'> <span><b>'+t[1]+'</b><small>'+(n?t[2]:'No hay material para estos temas')+'</small></span></label>';}).join('');
}
document.addEventListener('act-taller-listo',pintarActividades);
function temasMarcados(){return [].slice.call(document.querySelectorAll('#g-temas input:checked')).map(function(x){return x.value;});}
function cfg(){
  var n=function(id,mx){var e=$(id);return e?Math.max(0,Math.min(mx,parseInt(e.value,10)||0)):0;};
  var c={modo:MODO,temas:temasMarcados(),mc:n('g-mc',30),vf:n('g-vf',15),esc:n('g-esc',10),ord:n('g-ord',6),ab:n('g-ab',6),
    saber:n('g-saber',30),abE:n('g-abE',6),burbujas:$('g-burb').checked,icfes:!$('g-icfes')||$('g-icfes').checked,
    acts:[].slice.call(document.querySelectorAll('#g-acts input:checked')).map(function(x){return x.value;}),
    nver:Math.max(1,Math.min(10,n('g-nver',10)||1)),
    col:$('g-col').value.trim(),doc:$('g-doc').value.trim(),cur:$('g-cur').value.trim(),tit:$('g-tit').value.trim(),seed:($('g-seed').value.trim().toUpperCase()||semilla)};
  if(MODO==='eval'){c.mc=n('g-mcE',20);c.vf=0;c.esc=0;c.ord=0;c.ab=0;c.acts=[];}
  return c;
}

/* ── selección ── */
function preguntasBanco(c,v){
  var r=rng(c.seed+'|banco|'+v),pool=(window.BANCO_BIO||[]).filter(function(q){return c.temas.indexOf(q.t)>=0;});
  // reparte entre los temas en ronda para que no salgan todas de uno
  function tomar(k,n){
    var porT={};mezclar(pool.filter(function(q){return q.k===k;}),r).forEach(function(q){(porT[q.t]=porT[q.t]||[]).push(q);});
    var ks=Object.keys(porT),out=[],i=0,guarda=0;while(out.length<n&&guarda++<500){var l=porT[ks[i%ks.length]];if(l&&l.length)out.push(l.shift());i++;if(!ks.some(function(k){return porT[k].length;}))break;}
    return out;
  }
  var ab=[];c.temas.forEach(function(t){((D.ABIERTAS||{})[t]||[]).forEach(function(x){ab.push({t:t,q:x});});});
  return {mc:tomar('mc',c.mc).map(function(q){var ord=mezclar(q.ops.map(function(o,i){return i;}),r);return {q:q.q,ops:ord.map(function(i){return q.ops[i];}),a:ord.indexOf(q.a),exp:q.exp};}),
    vf:tomar('vf',c.vf),esc:tomar('esc',c.esc),ord:tomar('ord',c.ord).map(function(q){return {q:q.q,ok:q.ops,mez:mezclar(q.ops,r),exp:q.exp};}),ab:mezclar(ab,r).slice(0,c.ab)};
}
function preguntasEval(c,v){
  var r=rng(c.seed+'|eval|'+v),SI=window.SABER_ICFES;
  var pool=(D.SABER||[]).concat(SI?SI.preguntas():[]).filter(function(q){return c.temas.indexOf(q.t)>=0;});
  // Selección repartida entre las tres competencias de la prueba Saber 11
  // (saber-icfes.js); las preguntas oficiales del Icfes no barajan opciones.
  var elegidas=SI?SI.elegir(pool,c.saber,r,{prioIcfes:c.icfes}):mezclar(pool,r).slice(0,c.saber);
  var sab=elegidas.map(function(q){
    if(q.fijo)return {ctx:q.ctx,q:q.q,ops:q.imgOps?[]:q.o,a:q.r,exp:q.exp,src:q};
    var ord=mezclar([0,1,2,3],r);return {ctx:q.ctx,q:q.q,ops:ord.map(function(i){return q.o[i];}),a:ord.indexOf(0),src:q};});
  var ab=[];c.temas.forEach(function(t){((D.ABIERTAS||{})[t]||[]).forEach(function(x){ab.push({t:t,q:x});});});
  // en la evaluación pueden sumarse preguntas de selección del banco del juego
  var extra=c.modo==='eval'&&c.mc?preguntasBanco({seed:c.seed+'|e',temas:c.temas,mc:c.mc,vf:0,esc:0,ord:0,ab:0},v).mc.map(function(q){return {ctx:'',q:q.q,ops:q.ops,a:q.a,exp:q.exp,src:{q:q.q,k:'B'}};}):[];
  return {saber:sab.concat(extra),ab:mezclar(ab,rng(c.seed+'|abE|'+v)).slice(0,c.abE)};
}

/* ── bloques HTML (un bloque no se parte entre hojas) ── */
var L='ABCD';
function lineas(k){return '<div class="lineas">'+'<i></i>'.repeat(k)+'</div>';}
/* Cuadrícula de cuaderno para las preguntas abiertas, igual que ChromaNom:
   cuadros de 18,9 px (≈ 5 mm). Después de paginar se estira para ocupar el
   espacio libre de cada hoja (llenarHoja). */
var CUADRO=18.9;
function cuad(n){return '<div class="cuad" style="height:'+(n*CUADRO).toFixed(1)+'px"></div>';}
function bloquesBanco(P,c,clave,n0){
  var B=[],n=n0||0;
  function sec(t,arr,fn){arr.forEach(function(x,i){B.push((i===0?'<h3>'+t+'</h3>':'')+fn(x));});}
  if(P.mc.length)B.push('<h3>Selección múltiple con única respuesta</h3>');
  if(P.mc.length)P.mc.forEach(function(x){B.push((function(){n++;return '<div class="pq sq"><span class="n">'+n+'.</span><div>'+esc(x.q)+'<ol>'+x.ops.map(function(o,i){return '<li data-l="'+L[i].toLowerCase()+'"'+(clave&&i===x.a?' class="ok"':'')+'>'+esc(o)+(clave&&i===x.a?' ✔':'')+'</li>';}).join('')+'</ol>'+(clave?'<div class="exp">'+x.exp+'</div>':'')+'</div></div>';})());});
  if(P.vf.length)sec('Verdadero (V) o falso (F): si es falsa, corrígela',P.vf,function(x){n++;return '<div class="pq"><span class="n">'+n+'.</span><div><span class="vf">'+(clave?'<span class="okc">'+(x.a?'✔ V':'✔ F')+'</span>':'V &nbsp; F')+'</span>'+esc(x.q)+(clave?'<div class="exp">'+x.exp+'</div>':lineas(1))+'</div></div>';});
  if(P.esc.length)sec('Responde con una palabra o frase corta',P.esc,function(x){n++;return '<div class="pq"><span class="n">'+n+'.</span><div>'+esc(x.q)+(clave?'<div class="okc">'+esc(x.a[0])+'</div><div class="exp">'+x.exp+'</div>':lineas(1))+'</div></div>';});
  if(P.ord.length)sec('Ordena: escribe 1, 2, 3… en cada casilla',P.ord,function(x){n++;return '<div class="pq"><span class="n">'+n+'.</span><div>'+esc(x.q)+'<div class="ord-cajas">'+x.mez.map(function(o){return '<span>'+(clave?'<b>'+(x.ok.indexOf(o)+1)+'</b> ':'')+esc(o)+'</span>';}).join('')+'</div>'+(clave?'<div class="exp">'+x.exp+'</div>':'')+'</div></div>';});
  if(P.ab.length)sec('Análisis e indagación',P.ab,function(x){n++;return '<div class="pq"><span class="n">'+n+'.</span><div>'+esc(x.q)+(clave?'<div class="exp">Respuesta abierta: valore la claridad de la explicación, el uso correcto de los conceptos y las evidencias.</div>':cuad(5))+'</div></div>';});
  return {B:B,n:n};
}
function bloquesActividades(c,v){
  var A=window.ACT_TALLER,B=[];if(!A||!c.acts.length)return B;
  c.acts.forEach(function(id){
    var a=null;try{a=A.armar(id,c.temas,c.seed+'|act',v);}catch(e){a=null;}
    if(!a||!a.bloques||!a.bloques.length)return;
    a.bloques.forEach(function(b,i){B.push((i===0?'<h3>'+esc(a.titulo)+'</h3><p class="ins-act">'+esc(a.instr)+'</p>':'')+b);});
  });
  return B;
}
function bloquesEval(E,c,clave){
  var B=[],n=0;
  if(E.saber.length)B.push('<h3>Selección múltiple con única respuesta (tipo Saber 11)</h3>');
  var SI=window.SABER_ICFES;
  E.saber.forEach(function(x,i){n++;var s=x.src||{};
    B.push('<div class="pq sq" data-k="'+i+'"><span class="n">'+n+'.</span><div>'+(x.ctx?'<div class="ctx">'+esc(x.ctx)+'</div>':'')+(SI?SI.extraHTML(s):'')+'<b>'+esc(x.q)+'</b>'+
      (SI&&s.imgOps?SI.opsImgHTML(s)+(clave?'<div class="okc">✔ Respuesta: '+L[x.a]+'</div>':''):'<ol class="col1">'+x.ops.map(function(o,j){return '<li data-l="'+L[j]+'"'+(clave&&j===x.a?' class="ok"':'')+'>'+esc(o)+(clave&&j===x.a?' ✔':'')+'</li>';}).join('')+'</ol>')+
      (clave&&s.icfes&&x.exp?'<div class="exp">'+esc(x.exp)+'</div>':'')+
      (clave&&SI?'<div class="exp">Competencia: '+esc(SI.COMP[SI.competencia(s)].n)+'.</div>':'')+
      (SI?SI.creditoHTML(s):'')+'</div></div>');});
  E.ab.forEach(function(x,i){n++;B.push((i===0?'<h3>Preguntas abiertas</h3>':'')+'<div class="pq"><span class="n">'+n+'.</span><div>'+esc(x.q)+(clave?'<div class="exp">Respuesta abierta: valore la claridad, el uso de los conceptos y las evidencias.</div>':cuad(6))+'</div></div>');});
  if(c.burbujas&&E.saber.length&&!clave){
    var filas=E.saber.map(function(x,i){return '<tr><td>'+(i+1)+'</td>'+[0,1,2,3].map(function(j){return '<td><span class="burb">'+L[j]+'</span></td>';}).join('')+'</tr>';});
    // la hoja de respuestas va en bloques de 15 filas para que quepa
    for(var k=0;k<filas.length;k+=15)B.push((k===0?'<h3>Hoja de respuestas · rellena el círculo</h3>':'')+'<table class="burb-t"><tbody>'+filas.slice(k,k+15).join('')+'</tbody></table>');
  }
  if(clave&&E.saber.length)B.push('<h3>Clave</h3><p class="clave-l">'+E.saber.map(function(x,i){return (i+1)+'-'+L[x.a];}).join(' · ')+'</p>');
  if(clave&&E.saber.length&&SI)SI.matrizBloques(E.saber.map(function(x){return x.src||{q:x.q};}),1,'B',8).forEach(function(h,k){B.push((k===0?'<h3>Matriz de la evaluación (competencias y afirmaciones del Icfes)</h3>':'')+h);});
  if(!clave&&SI&&E.saber.length){var cr=SI.citaHTML(E.saber.map(function(x){return x.src||{};}));if(cr)B.push(cr);}
  return B;
}
function esquemaHTML(e){
  return '<div class="esq"><div class="esq-r">'+esc(e.raiz)+'</div><div class="esq-ramas" style="--n:'+e.ramas.length+'">'+e.ramas.map(function(r){return '<div class="esq-rama"><div class="esq-t">'+esc(r.t)+'</div>'+(r.items||[]).map(function(i){return '<div class="esq-i">'+esc(i)+'</div>';}).join('')+'</div>';}).join('')+'</div></div>';
}
function bloquesGuia(c,clave){
  var B=[],ts=c.temas.map(function(t){return TEMA_D[t];}).filter(Boolean);
  ts.forEach(function(t,k){
    var pr=t.previos||{};
    B.push('<h2 class="ses">Sesión 1 · Aprendizajes previos'+(ts.length>1?' — '+esc(t.corto||t.titulo):'')+'</h2><div class="ses-tit">'+esc(t.titulo)+'</div>');
    if((pr.curiosos||[]).length)B.push('<h3>¿Sabías que…?</h3><ul class="lista">'+pr.curiosos.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>');
    if((pr.contexto||[]).length)B.push('<h3>La biología en contexto</h3><ul class="lista ctxl">'+pr.contexto.map(function(x){return '<li><b>'+esc(x.amb)+':</b> '+x.t+'</li>';}).join('')+'</ul>');
    if((pr.cotidianos||[]).length)B.push('<h3>En la vida diaria</h3><ul class="lista">'+pr.cotidianos.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>');
    (pr.activacion||[]).forEach(function(x,i){B.push((i===0?'<h3>Para pensar antes de empezar</h3>':'')+'<div class="pq"><span class="n">'+(i+1)+'.</span><div>'+esc(x)+(clave?'<div class="exp">Respuesta personal: sirve para conocer las ideas previas.</div>':cuad(3))+'</div></div>');});
    var inf=t.info||{};
    B.push('<h2 class="ses">Sesión 2 · Información</h2>');
    (inf.lectura||[]).forEach(function(p,i){B.push((i===0?'<h3>Lectura</h3>':'')+'<p class="lect">'+p+'</p>');});
    if(inf.esquema)B.push('<h3>Mapa de ideas</h3>'+esquemaHTML(inf.esquema));
    B.push('<div class="pq"><span class="n">✎</span><div>Escribe con tus palabras las tres ideas más importantes de la lectura.'+(clave?'<div class="exp">Respuesta personal.</div>':cuad(4))+'</div></div>');
  });
  B.push('<h2 class="ses">Sesión 3 · Trabajo práctico</h2>');
  B=B.concat(bloquesBanco(preguntasBanco(c,0),c,clave).B).concat(bloquesActividades(c,0));
  B.push('<h2 class="ses">Sesión 4 · Evaluación</h2>');
  var puedo=[];ts.forEach(function(t){(t.puedo||[]).forEach(function(p){puedo.push(p);});});
  // la tabla va en bloques de 12 filas: con muchos temas no cabría en una hoja
  var cab='<table class="auto-t"><thead><tr><th>Puedo…</th><th>Lo logro</th><th>Con ayuda</th><th>Aún no</th></tr></thead><tbody>';
  for(var k=0;k<puedo.length;k+=12)B.push((k===0?'<h3>Autoevaluación</h3>':'')+cab+puedo.slice(k,k+12).map(function(p){return '<tr><td>'+esc(p)+'</td><td></td><td></td><td></td></tr>';}).join('')+'</tbody></table>');
  B.push('<p class="ins-act">La evaluación está en las hojas siguientes.</p>');
  return B;
}

/* ── encabezado y paginación ── */
function titulo(c,parte){return c.tit||(parte==='guia'?'Guía de biología':parte==='eval'?'Evaluación de biología':'Taller de biología');}
function cabecera(c,v,clave,primera,parte,nv){
  var tit=titulo(c,parte),ver=nv>1?'V'+(v+1)+' de '+nv:'';
  if(!primera)return '<div class="hoja-mini"><span>'+esc(tit)+(ver?' · '+ver:'')+(clave?' · CLAVE':'')+'</span><span>'+esc(c.col)+'</span></div>';
  return '<div class="hoja-cab"><img src="icons/logo.webp" alt=""><div class="tt"><div class="t1">'+esc(tit)+(clave?' — CLAVE':'')+'</div><div class="t2">'+[c.col,c.doc&&('Docente: '+c.doc),c.cur&&('Curso: '+c.cur),'Temas: '+c.temas.map(function(t){return TEMAS_N[t];}).join(', ')].filter(Boolean).map(esc).join(' · ')+'</div></div>'+(ver?'<div class="ver">'+ver+'</div>':'')+'</div>'+
    (clave?'<div class="hoja-ins clave-ins">🔒 Solo para el docente · Código '+esc(c.seed)+(nv>1?' · versión '+(v+1):'')+'. Las explicaciones en verde ayudan a retroalimentar.</div>'
      :'<div class="hoja-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div><div class="hoja-ins">'+(parte==='eval'?'Lee con atención. Trabaja de forma individual.'+(c.burbujas?' Marca tus respuestas en la hoja de respuestas.':''):parte==='guia'?'Desarrolla cada sesión en orden. Puedes apoyarte en los módulos de BioNom.':'Lee con atención cada pregunta. Puedes apoyarte en los módulos de BioNom.')+'</div>');
}
/* Reparte el espacio libre de la hoja entre las cuadrículas, un cuadro a la
   vez y en ronda, como en ChromaNom, pero con límites para que ninguna hoja
   quede llena de cuadrícula:
   - cada cuadrícula crece como máximo hasta 10 cuadros (≈ 5 cm);
   - entre todas no pasan del 45 % del alto de la hoja (si ya traen más por
     ser muchas preguntas abiertas, no crecen);
   - si la hoja no tiene preguntas abiertas, el recuadro de notas tiene como
     máximo 5 cuadros y solo se pone si caben al menos 3. El resto queda en
     blanco. */
var MAX_CUADROS=10,MAX_NOTAS=5,TOPE_HOJA=0.45;
function llenarHoja(c,parte){
  function libre(){var u=c.lastElementChild;if(!u)return c.clientHeight;return c.getBoundingClientRect().bottom-u.getBoundingClientRect().bottom-3;}
  var H=c.clientHeight,areas=[].slice.call(c.querySelectorAll('.cuad'));
  if(!areas.length){
    var n=Math.min(MAX_NOTAS,Math.floor((libre()-30)/CUADRO));if(n<3)return;
    var w=document.createElement('div');w.className='blq';
    w.innerHTML='<div class="notas-tit">'+(parte==='eval'?'Borrador (no se califica)':'Notas')+'</div>'+cuad(n);
    c.appendChild(w);
    while(c.scrollHeight>c.clientHeight+1&&n>2){n--;w.querySelector('.cuad').style.height=(n*CUADRO).toFixed(1)+'px';}
    if(c.scrollHeight>c.clientHeight+1)c.removeChild(w);
    return;
  }
  var alto=function(a){return parseFloat(a.style.height);};
  var total=function(){return areas.reduce(function(t,a){return t+alto(a);},0);};
  var pasos=Math.floor(libre()/CUADRO),k=0,hechos=[],guarda=0;
  while(pasos>0&&guarda++<400){
    var a=areas[k%areas.length];k++;
    if(total()+CUADRO>TOPE_HOJA*H)break;
    if(alto(a)>=MAX_CUADROS*CUADRO){if(areas.every(function(x){return alto(x)>=MAX_CUADROS*CUADRO;}))break;continue;}
    a.style.height=(alto(a)+CUADRO).toFixed(1)+'px';hechos.push(a);pasos--;
  }
  while(c.scrollHeight>c.clientHeight+1&&hechos.length){var g=hechos.pop();g.style.height=(alto(g)-CUADRO).toFixed(1)+'px';}
}
function paginar(B,c,v,clave,parte,nv,op){
  op=op||{};B=B.slice();
  var med=$('medidor');
  function hojaVacia(primera){return '<div class="hoja"><img class="wm" src="icons/marca-bionom.png" alt="">'+cabecera(c,v,clave,primera,parte,nv)+'<div class="hoja-cuerpo"></div>'+pie(99,99)+'</div>';}
  var nom={guia:'Guía',eval:'Evaluación',taller:'Taller'}[parte];
  // el pie se mide igual que se imprime (si no, la hoja real tiene menos espacio)
  function pie(k,n){return '<div class="hoja-pie"><span>BioNom · Biología por niveles de organización · © 2026 Harvey Bárcenas Morales · CC BY-NC 4.0</span><span>'+nom+' — página '+k+' de '+n+'</span></div>';}
  var out=[],i=0,pag=0;
  while(i<B.length||pag===0){
    med.innerHTML=hojaVacia(pag===0);var cuerpo=med.querySelector('.hoja-cuerpo'),puestos=0;
    while(i<B.length){
      // Las preguntas de selección múltiple («pq sq») van a doble columna
      // con SABER_ICFES.colocar: dos columnas reales que se llenan en orden
      // (izquierda y luego derecha), sin dejar una columna en blanco cuando
      // una pregunta es larga.
      if(/^<div class="pq sq/.test(B[i])&&window.SABER_ICFES){
        var nodos=[];for(var j=i;j<B.length&&/^<div class="pq sq/.test(B[j]);j++){var e=document.createElement('div');e.className='blq';e.innerHTML=B[j];nodos.push(e);}
        nodos.forEach(function(e,q){e._src=B[i+q];});
        var r=SABER_ICFES.colocar(cuerpo,nodos,0,!puestos,{reordenar:!!op.reordenar});
        // si se adelantó alguna pregunta, B sigue el nuevo orden
        nodos.forEach(function(e,q){B[i+q]=e._src;});
        i+=r;puestos+=r;
        if(r<nodos.length)break;
        continue;
      }
      var d=document.createElement('div');d.className='blq';d.innerHTML=B[i];cuerpo.appendChild(d);
      if(cuerpo.scrollHeight>cuerpo.clientHeight+1&&puestos){cuerpo.removeChild(d);break;}
      puestos++;i++;
    }
    llenarHoja(cuerpo,parte);
    out.push({primera:pag===0,html:cuerpo.innerHTML});pag++;if(!B.length)break;
  }
  med.innerHTML='';
  if(op.reordenar&&window.SABER_ICFES){
    // números 1, 2, 3… en el orden en que quedaron las preguntas
    var tmp=document.createElement('div');tmp.innerHTML=out.map(function(p){return '<div class="pg">'+p.html+'</div>';}).join('');
    paginar.orden=SABER_ICFES.renumerar(tmp,'.pq.sq[data-k]','.n',function(n){return n+'.';});
    [].forEach.call(tmp.children,function(pg,k){out[k].html=pg.innerHTML;});
  }else paginar.orden=null;
  return out.map(function(p,k){return '<div class="hoja"><img class="wm" src="icons/marca-bionom.png" alt="">'+cabecera(c,v,clave,p.primera,parte,nv)+'<div class="hoja-cuerpo">'+p.html+'</div>'+pie(k+1,out.length)+'</div>';}).join('');
}
/* Documento de una versión. La guía (sesiones 1 a 3) sale una sola vez; la
   evaluación sale una vez por versión. */
function docTaller(c,v,clave){var b=bloquesBanco(preguntasBanco(c,v),c,clave).B.concat(clave?[]:bloquesActividades(c,v));return paginar(b,c,v,clave,'taller',c.nver);}
function docEval(c,v,clave){
  var E=preguntasEval(c,v);
  // La hoja del estudiante adelanta preguntas cortas a los huecos de las
  // columnas y renumera; la clave (y su matriz) se arman con ese mismo orden.
  var est=paginar(bloquesEval(E,c,false),c,v,false,'eval',c.nver,{reordenar:true}),orden=paginar.orden;
  if(!clave)return est;
  if(window.SABER_ICFES&&orden)E.saber=SABER_ICFES.aplicarOrden(E.saber,orden);
  return paginar(bloquesEval(E,c,true),c,v,true,'eval',c.nver);
}
function docGuia(c,clave){return paginar(bloquesGuia(c,clave),c,0,clave,'guia',1);}
function vistaPrevia(c,sel){
  var clave=sel.charAt(0)==='k',v=+sel.slice(1)||0;
  if(MODO==='taller')return docTaller(c,v,clave);
  if(MODO==='eval')return docEval(c,v,clave);
  return (v===0?docGuia(c,clave):'')+docEval(c,v,clave);
}
function llenarVersiones(){var n=cfg().nver,s=$('g-vsel'),k=s.value||'v0';s.innerHTML='';
  for(var i=0;i<n;i++)s.insertAdjacentHTML('beforeend','<option value="v'+i+'">'+(MODO==='guia'?(i===0?'Guía + evaluación, versión 1':'Evaluación, versión '+(i+1)):'Versión '+(i+1))+'</option>');
  for(i=0;i<n;i++)s.insertAdjacentHTML('beforeend','<option value="k'+i+'">Clave de la versión '+(i+1)+'</option>');
  s.value=[].some.call(s.options,function(o){return o.value===k;})?k:'v0';}
function escalar(){var w=$('vista-wrap').clientWidth-32,f=Math.min(1,w/816);$('vista').style.zoom=f;}
function avisos(c){
  var m=[],pool=(window.BANCO_BIO||[]).filter(function(q){return c.temas.indexOf(q.t)>=0;});
  function falta(k,n,nom){var h=pool.filter(function(q){return q.k===k;}).length;if(n>h)m.push('solo hay '+h+' de '+nom);}
  if(MODO!=='eval'){falta('mc',c.mc,'selección múltiple');falta('vf',c.vf,'verdadero o falso');falta('esc',c.esc,'respuesta corta');falta('ord',c.ord,'ordenar');}
  if(MODO!=='taller'){var s=(D.SABER||[]).concat(window.SABER_ICFES?SABER_ICFES.preguntas():[]).filter(function(q){return c.temas.indexOf(q.t)>=0;}).length;if(c.saber>s)m.push('solo hay '+s+' preguntas tipo Saber 11 para estos temas');}
  return m.length?' · ⚠️ '+m.join('; ')+'.':'';
}
function pintar(){
  pintarActividades();
  var c=cfg();
  if(!c.temas.length){$('vista').innerHTML='<p style="padding:20px">Escoja al menos un tema.</p>';$('g-info').textContent='';return;}
  $('vista').innerHTML=vistaPrevia(c,$('g-vsel').value||'v0');escalar();
  $('g-info').textContent='Código: '+c.seed+' · '+$('vista').querySelectorAll('.hoja').length+' hoja(s) en pantalla'+avisos(c);
}
/* cambio de pestaña (Guías / Talleres / Evaluaciones) */
window.DOC_GEN={modo:function(m){MODO=m;$('panel-gen').setAttribute('data-modo',m);
  var intro={guia:'<strong>📘 Guía de 4 sesiones</strong> Sesión 1: aprendizajes previos (¿sabías que…?, la biología en contexto local, nacional y global, preguntas de activación). Sesión 2: lectura y mapa de ideas. Sesión 3: trabajo práctico con preguntas del Juego y actividades. Sesión 4: autoevaluación y evaluación tipo Saber 11 en hojas aparte, con una versión distinta para cada fila.',
    taller:'<strong>✏️ Taller</strong> Preguntas del Juego de BioNom (selección múltiple, verdadero o falso, respuesta corta, ordenar y análisis), más actividades dentro del taller: sopa de letras, ahorcado, criptograma genético, mapa conceptual y detective biológico. Varias versiones con su clave.',
    eval:'<strong>📝 Evaluación tipo Saber 11</strong> Preguntas con contexto colombiano y cuatro opciones, más preguntas abiertas. Las opciones se barajan en cada versión; hoja de respuestas de burbujas y clave para el docente.'}[m];
  $('g-intro').innerHTML=intro;llenarVersiones();pintar();},pintar:pintar};
['g-mc','g-vf','g-esc','g-ord','g-ab','g-saber','g-abE','g-mcE','g-col','g-doc','g-cur','g-tit','g-seed'].forEach(function(id){var e=$(id);if(e)e.addEventListener('input',pintar);});
if($('g-icfes'))$('g-icfes').addEventListener('change',pintar);
['g-burb'].forEach(function(id){$(id).addEventListener('change',pintar);});
$('g-acts').addEventListener('change',pintar);
$('g-nver').addEventListener('input',function(){llenarVersiones();pintar();});$('g-vsel').addEventListener('change',pintar);
$('g-temas').addEventListener('change',pintar);
$('g-otra').onclick=function(){semilla=nuevaSemilla();$('g-seed').value='';pintar();};
window.addEventListener('resize',escalar);
$('g-imp').onclick=function(){var c=cfg();if(!c.temas.length)return;var h='',k='',v;
  if(MODO==='guia')h+=docGuia(c,false);
  for(v=0;v<c.nver;v++){h+=MODO==='taller'?docTaller(c,v,false):docEval(c,v,false);}
  if($('g-clave').checked){if(MODO==='guia')k+=docGuia(c,true);for(v=0;v<c.nver;v++)k+=MODO==='taller'?docTaller(c,v,true):docEval(c,v,true);}
  $('print-root').innerHTML=h+k;document.body.classList.add('g-printing');setTimeout(function(){window.print();},250);};
window.addEventListener('afterprint',function(){if(document.body.classList.contains('g-printing')){document.body.classList.remove('g-printing');$('print-root').innerHTML='';}});
(document.fonts?Promise.all(['13.5px "STIX Two Text"','bold 13.5px "STIX Two Text"','italic 12px "STIX Two Text"','800 13px Outfit','12px Outfit'].map(function(f){return document.fonts.load(f);})).catch(function(){}):Promise.resolve()).then(function(){window.DOC_GEN.modo(MODO);});
})();
