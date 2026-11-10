/* ═════════════════════════════════════════════════════════════════════
   crucigrama.js — pestaña «Crucigramas» del panel docente de BioNom.
   Palabras y pistas: banco del Ahorcado de BioNom (ahorcado-datos.js).
   El armado del crucigrama es el de retos.js (RETOS.armarCrucigrama):
   palabras conectadas, sin palabras «accidentales» en los cruces.
   - Hoja carta con la marca del sitio, versiones con semilla y clave.
   - Modo clase: el mismo grupo de palabras para resolver en pantalla, con
     3 comprobaciones y pistas nuevas (RETOS.crucigrama).
   ═════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var $=function(s){return document.querySelector(s);},$$=function(s){return [].slice.call(document.querySelectorAll(s));};
var esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
var MARCA=window.HOJA_SITIO||{logo:'',marca:'',nombre:'',pie:''};
var GRUPOS=window.AHORCADO_GRUPOS||[];
var MAXV=40;
function rng(str){var h=2166136261>>>0;for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}var a=h||1;return function(){a=(a+0x6D2B79F5)|0;var t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
var nuevaSemilla=function(){return Math.random().toString(36).slice(2,8).toUpperCase();};
var S={semilla:nuevaSemilla(),vista:'sheet'};

function cfg(){
  var gr=$$('#cz-grupos input:checked').map(function(i){return i.value;});
  var temas=GRUPOS.filter(function(g){return gr.indexOf(g[0])>=0;}).reduce(function(a,g){return a.concat(g[2]);},[]);
  // candidatos en el orden del banco (el azar con semilla los baraja después)
  var vistos={},cands=[];
  (window.BANCO_AHORCADO||[]).forEach(function(w){if(temas.indexOf(w[1])<0)return;var pal=RETOS.letras(w[0]);if(pal.length<4||pal.length>15||vistos[pal])return;vistos[pal]=1;cands.push({pal:pal,txt:w[0],grupo:w[1],pistas:[w[2],w[3],w[4]]});});
  var n=Math.max(6,Math.min(14,parseInt($('#cz-n').value,10)||10));
  return {cands:cands,n:n,pista:+$('#cz-pista').value||1,titulo:($('#cz-title').value||'').trim()||'Crucigrama de biología',
    nver:Math.max(1,Math.min(MAXV,parseInt($('#cz-nver').value,10)||1)),v:+$('#cz-vsel').value||0,
    seed:(($('#cz-seed').value||'').trim().toUpperCase())||S.semilla,
    vacio:!gr.length?'Marque al menos un grupo de temas.':(cands.length<6?'Esos temas tienen muy pocas palabras: marque más.':'')};
}
// Cada versión toma otra tanda de palabras (reparto «en mazo») y otro armado.
function armar(c,v){
  var r=rng(c.seed+'|cz|'+v),L=c.cands.length,orden=[],ciclo=-1,usados={};
  var base=v*c.n,cand=[];
  for(var p=base;cand.length<Math.min(L,c.n*2)&&p<base+3*L;p++){var cy=Math.floor(p/L);if(cy!==ciclo){ciclo=cy;orden=RETOS.barajar(c.cands,rng(c.seed+'|mazo|'+cy));}var w=orden[p%L];if(usados[w.pal])continue;usados[w.pal]=1;cand.push(w);}
  return RETOS.armarCrucigrama(cand,c.n,r);
}
function encabezado(titulo,sub,etq,form){
  return (MARCA.marca?'<img class="cz-wm" src="'+MARCA.marca+'" alt="" aria-hidden="true">':'')
    +'<div class="cz-head">'+(MARCA.logo?'<img src="'+MARCA.logo+'" alt="'+esc(MARCA.nombre)+'">':'')+'<div class="cz-tit"><div class="t">'+esc(titulo)+'</div>'+(sub?'<div class="s">'+sub+'</div>':'')+'</div><div class="cz-ver">'+esc(etq||'')+'</div></div>'
    +(form?'<div class="cz-form"><span>Nombre: <i class="w1"></i></span><span>Curso: <i class="w2"></i></span><span>Fecha: <i class="w3"></i></span></div>':'');
}
function hoja(c,v,clave,etq){
  var X=armar(c,v),celdas={};
  X.palabras.forEach(function(w){for(var i=0;i<w.item.pal.length;i++){var r=w.r+(w.dir==='V'?i:0),cc=w.c+(w.dir==='H'?i:0);celdas[r+','+cc]=w.item.pal[i];}});
  var cel=Math.max(20,Math.min(34,Math.floor(700/Math.max(X.C,X.F*0.9))));
  var g='';for(var r=0;r<X.F;r++)for(var cc=0;cc<X.C;cc++){var l=celdas[r+','+cc];if(!l){g+='<span class="czb-x"></span>';continue;}
    var num=X.palabras.filter(function(w){return w.r===r&&w.c===cc;})[0];g+='<span class="czb-c">'+(num?'<i>'+num.num+'</i>':'')+(clave?'<b>'+l+'</b>':'')+'</span>';}
  var pista=function(w){return c.pista===4?'':esc(w.item.pistas[Math.min(c.pista,3)-1]||w.item.pistas[0]);};
  var lista=function(dir){return X.palabras.filter(function(w){return w.dir===dir;}).map(function(w){return '<li><b>'+w.num+'.</b> '+pista(w)+' <small>('+w.item.pal.length+')</small>'+(clave?' <span class="czb-sol">'+esc(w.item.txt)+'</span>':'')+'</li>';}).join('');};
  var banco=c.pista===4&&!clave?'<div class="czb-banco"><b>Palabras:</b> '+RETOS.barajar(X.palabras.map(function(w){return w.item.txt;}),rng(c.seed+'|b|'+v)).map(esc).join(' · ')+'</div>':'';
  var ins=c.pista===4?'Ubica cada palabra del banco en el crucigrama según su número de letras y los cruces.':'Lee cada pista y escribe la respuesta, una letra por casilla. El número entre paréntesis es la cantidad de letras.';
  return '<div class="ex-hoja czb-hoja">'+encabezado(c.titulo+(clave?' · Clave':''),clave?'':ins,etq,!clave)
    +'<div class="ex-cuerpo"><div class="czb-grid" style="--cel:'+cel+'px;grid-template-columns:repeat('+X.C+',var(--cel))">'+g+'</div>'
    +(c.pista===4&&!clave?banco:'<div class="czb-pistas"><div><h4>➡ Horizontales</h4><ol>'+lista('H')+'</ol></div><div><h4>⬇ Verticales</h4><ol>'+lista('V')+'</ol></div></div>')
    +'</div>'+(MARCA.pie?'<div class="cz-pie">'+MARCA.pie+'</div>':'')+'</div>';
}
function ajustar(cont){
  cont.querySelectorAll('.ex-hoja').forEach(function(h){var f=1;h.style.removeProperty('--f');
    var c=h.querySelector('.ex-cuerpo'),desb=function(){return h.scrollHeight>1057||(c&&c.scrollHeight>c.clientHeight+1);};
    while(desb()&&f>0.6){f=Math.round((f-0.04)*100)/100;h.style.setProperty('--f',f);}});
}
function render(){
  var c=cfg(),st=$('#cz-stage'),pl=$('#cz-play');
  $('#cz-status').innerHTML=c.vacio?'⚠️ '+c.vacio:c.cands.length+' palabras disponibles para esos temas · '+c.n+' por crucigrama.';
  st.style.display=S.vista==='play'?'none':'';pl.style.display=S.vista==='play'?'':'none';
  if(c.vacio){st.innerHTML='';pl.innerHTML='';return;}
  if(S.vista==='play'){
    var X=armar(c,c.v);pl.innerHTML='<div id="cz-mini"></div>';
    RETOS.crucigrama($('#cz-mini'),null,{fijas:X.palabras.map(function(w){return w.item;}),n:X.palabras.length});
    return;
  }
  var clave=S.vista==='key';
  st.innerHTML=hoja(c,c.v,clave,clave?'código '+c.seed+' · versión '+(c.v+1):'Versión '+(c.v+1)+' de '+c.nver);ajustar(st);
}
function versiones(){var n=Math.max(1,Math.min(MAXV,parseInt($('#cz-nver').value,10)||1)),s=$('#cz-vsel'),k=+s.value||0;$('#cz-nver').value=n;s.innerHTML='';for(var i=0;i<n;i++)s.insertAdjacentHTML('beforeend','<option value="'+i+'">Versión '+(i+1)+'</option>');s.value=String(Math.min(k,n-1));}
function imprimir(){
  var c=cfg();if(c.vacio)return;var h='',k='';
  for(var v=0;v<c.nver;v++){h+=hoja(c,v,false,'Versión '+(v+1)+' de '+c.nver);k+=hoja(c,v,true,'código '+c.seed+' · versión '+(v+1));}
  var root=$('#ex-print-root');root.innerHTML=h+($('#cz-withkeys').checked?k:'');
  root.style.cssText='display:block;position:absolute;left:-12000px;top:0';ajustar(root);root.style.cssText='';
  document.body.classList.add('ex-printing');setTimeout(function(){window.print();},120);
}
function init(){
  if(!$('#cz-app'))return;
  $('#cz-grupos').innerHTML=GRUPOS.map(function(g,i){var n=(window.BANCO_AHORCADO||[]).filter(function(w){return g[2].indexOf(w[1])>=0;}).length;return '<label class="opt"><input type="checkbox" value="'+g[0]+'"'+(i<3?' checked':'')+'> <span><b>'+esc(g[1])+'</b><small>'+n+' palabras</small></span></label>';}).join('');
  versiones();
  $('#cz-app').addEventListener('change',function(e){if(e.target.closest('#cz-play'))return;if(e.target.id==='cz-nver')versiones();render();});
  $('#cz-app').addEventListener('input',function(e){if(e.target.closest('#cz-play'))return;if(e.target.matches('#cz-title,#cz-seed'))render();});
  $('#cz-btn-seed').addEventListener('click',function(){S.semilla=nuevaSemilla();$('#cz-seed').value='';render();});
  $$('#cz-seg button').forEach(function(b){b.addEventListener('click',function(){S.vista=b.getAttribute('data-view');$$('#cz-seg button').forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b?'true':'false');});render();});});
  $('#cz-btn-print').addEventListener('click',imprimir);
  render();
}
window.CRUCI={render:render};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
