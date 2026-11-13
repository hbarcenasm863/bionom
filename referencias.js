/* referencias.js — arma las hojas de referencia (encabezado con logo, marca de
   agua y pie), la lista para escogerlas, el visor y la descarga en PDF
   (cuadro de imprimir del navegador → «Guardar como PDF»). */
(function(){
'use strict';
var MARCA=window.HOJA_SITIO||{logo:'icons/logo.png',marca:'icons/marca-bionom.png',pie:'<span class="m">Bio<b>Nom</b> · Biología por niveles de organización</span><span>© 2026 Harvey Bárcenas Morales · Licencia CC BY-NC 4.0</span>'};
var hojas=[].slice.call(document.querySelectorAll('.hoja'));
var LISTA=document.getElementById('ref-lista'),CAJA=document.getElementById('hojas');
function hoja(id){return hojas.filter(function(h){return h.getAttribute('data-hoja')===id&&!h.hasAttribute('data-pag');})[0];}
function paginas(id){return hojas.filter(function(h){return h.getAttribute('data-hoja')===id;});}
var grupos=hojas.filter(function(h){return !h.hasAttribute('data-pag');}); // primera página de cada hoja
function nPag(id){var n=paginas(id).length;return n>1?' ('+n+' páginas)':'';}

/* encabezado, marca de agua y pie de cada hoja */
hojas.forEach(function(h){
  var p1=hoja(h.getAttribute('data-hoja')),tot=paginas(h.getAttribute('data-hoja')),num=tot.length>1?' · página '+(tot.indexOf(h)+1)+' de '+tot.length:'';
  var enc=document.createElement('div');enc.className='h-enc';
  enc.innerHTML='<img src="'+MARCA.logo+'" alt="BioNom"><div class="t"><div class="k">Hoja de referencia · '+p1.getAttribute('data-tema')+num+'</div><h3>'+p1.getAttribute('data-ico')+' '+p1.getAttribute('data-tit')+'</h3></div><div class="tira"></div>';
  h.insertBefore(enc,h.firstChild);
  var wm=document.createElement('img');wm.className='h-wm';wm.src=MARCA.marca;wm.alt='';h.appendChild(wm);
  var pie=document.createElement('div');pie.className='h-pie';pie.innerHTML=MARCA.pie;h.appendChild(pie);
});

/* cuerpo humano por sistemas (dibujos de cuerpo.js) */
if(window.CUERPO)[].slice.call(document.querySelectorAll('[data-cuerpo]')).forEach(function(d){
  var s=d.getAttribute('data-cuerpo'),O=window.CUERPO.ORG,ids=Object.keys(O).filter(function(k){return O[k].s===s;});
  d.innerHTML='<svg viewBox="38 0 224 560" role="img" aria-label="Sistema '+s+'">'+window.CUERPO.svg(ids)+'</svg>';});

/* fotos con su cita APA (datos de fotos-datos.js) */
[].slice.call(document.querySelectorAll('[data-ref-foto]')).forEach(function(f){
  var c=f.querySelector('cite');if(c&&window.FOTO_APA)c.innerHTML=window.FOTO_APA(f.getAttribute('data-ref-foto'));});

/* tabla del código genético (misma organización que la de genetica.html) */
(function(){
  var cont=document.getElementById('ref-tabla-cod');if(!cont)return;
  var B1='UUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCCAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGG',B2='UUUUCCCCAAAAGGGG',B3='UCAG',AAS='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
  var COD={};for(var k=0;k<64;k++)COD[B1[k]+B2[k%16]+B3[k%4]]=AAS[k];
  var AA={F:['Phe','Fenilalanina'],L:['Leu','Leucina'],I:['Ile','Isoleucina'],M:['Met','Metionina'],V:['Val','Valina'],S:['Ser','Serina'],P:['Pro','Prolina'],T:['Thr','Treonina'],A:['Ala','Alanina'],Y:['Tyr','Tirosina'],H:['His','Histidina'],Q:['Gln','Glutamina'],N:['Asn','Asparagina'],K:['Lys','Lisina'],D:['Asp','Ácido aspártico'],E:['Glu','Ácido glutámico'],C:['Cys','Cisteína'],W:['Trp','Triptófano'],R:['Arg','Arginina'],G:['Gly','Glicina']};
  var COL={M:'#2e7d4f',V:'#1774a6',H:'#7b4bb7',L:'#c2410c',T:'#0e7490',P:'#a16207',E:'#be123c',K:'#4338ca',D:'#9d174d',G:'#047857',A:'#b45309',S:'#0369a1',F:'#6d28d9',I:'#c026d3',Y:'#15803d',Q:'#ea580c',N:'#0891b2',C:'#ca8a04',W:'#7c2d12',R:'#1d4ed8'};
  var BCOL={U:'#8e44ad',C:'#d97706',A:'#d13438',G:'#23804a'},B='UCAG'.split('');
  var h='<table class="tcod"><thead><tr><th rowspan="2">1.ª<br>base</th><th colspan="4">2.ª base</th><th rowspan="2">3.ª<br>base</th></tr><tr>'+B.map(function(b){return '<th class="bs" style="background:'+BCOL[b]+'">'+b+'</th>';}).join('')+'</tr></thead><tbody>';
  B.forEach(function(a){h+='<tr><td class="b1" style="background:'+BCOL[a]+'">'+a+'</td>';
    B.forEach(function(b){h+='<td>'+B.map(function(c){var cod=a+b+c,x=COD[cod];
      var ap=x==='*'?'<span class="ap stop">Parada</span>':'<span class="ap'+(cod==='AUG'?' ini':'')+'" style="background:'+COL[x]+'">'+AA[x][0]+(cod==='AUG'?' · inicio':'')+'</span>';
      return '<div class="cl"><code>'+cod+'</code>'+ap+'</div>';}).join('')+'</td>';});
    h+='<td class="b3">'+B.map(function(c){return '<div style="color:'+BCOL[c]+'">'+c+'</div>';}).join('')+'</td></tr>';});
  cont.innerHTML=h+'</tbody></table>';
  var l=document.getElementById('ref-aa');
  if(l)l.innerHTML='<b>Los 20 aminoácidos:</b> '+Object.keys(AA).sort(function(x,y){return AA[x][0]<AA[y][0]?-1:1;}).map(function(x){return '<b>'+AA[x][0]+'</b> '+AA[x][1].toLowerCase();}).join(' · ')+'.';
})();

/* cada hoja agranda su contenido hasta llenar la página sin tapar el pie */
function ajustar(){
  var prev=CAJA.getAttribute('style')||'';
  CAJA.style.cssText='display:block;position:absolute;left:-10000px;top:0;visibility:hidden';
  hojas.forEach(function(h){h.style.display='block';h.style.zoom=1;
    var cu=h.querySelector('.h-cuerpo');
    if(!cu){cu=document.createElement('div');cu.className='h-cuerpo';
      [].slice.call(h.children).forEach(function(c){if(!c.classList.contains('h-enc')&&!c.classList.contains('h-wm')&&!c.classList.contains('h-pie'))cu.appendChild(c);});
      h.insertBefore(cu,h.querySelector('.h-wm'));}
    var ancho=h.clientWidth-parseFloat(getComputedStyle(h).paddingLeft)-parseFloat(getComputedStyle(h).paddingRight);
    var pie=h.querySelector('.h-pie');
    function cabe(f){cu.style.zoom=f;cu.style.width=(ancho/f)+'px';return cu.getBoundingClientRect().bottom<=pie.getBoundingClientRect().top-10;}
    var lo=1,hi=1.8;if(!cabe(lo)){lo=.6;hi=1;}
    for(var i=0;i<14;i++){var m=(lo+hi)/2;if(cabe(m))lo=m;else hi=m;}
    cabe(lo);h.setAttribute('data-escala',lo.toFixed(3));});
  hojas.forEach(function(h){h.style.display='';});
  CAJA.setAttribute('style',prev);
}
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){ajustar();});

/* lista de hojas */
LISTA.innerHTML=grupos.map(function(h){var id=h.getAttribute('data-hoja');
  return '<div class="ref-card" id="tarjeta-'+id+'"><span class="e" aria-hidden="true">'+h.getAttribute('data-ico')+'</span><span class="tema">'+h.getAttribute('data-tema')+'</span><h3>'+h.getAttribute('data-tit')+'</h3><p>'+h.getAttribute('data-desc')+nPag(id)+'</p>'+
    '<div class="acc"><button type="button" class="cn-btn" data-ver="'+id+'">👁 Ver</button><button type="button" class="cn-btn cn-btn--primary" data-pdf="'+id+'">⬇️ Descargar PDF</button></div></div>';}).join('');

/* visor */
var actual=null;
function escala(){var z=Math.min(1,(window.innerWidth-24)/816);hojas.forEach(function(h){h.style.zoom=z;});}
function abrir(id){actual=id;hojas.forEach(function(h){h.classList.toggle('sel',h.getAttribute('data-hoja')===id);});
  var h=hoja(id);document.getElementById('visor-tit').textContent=h.getAttribute('data-ico')+' '+h.getAttribute('data-tit');
  escala();CAJA.classList.add('abierto');CAJA.setAttribute('aria-hidden','false');document.documentElement.classList.add('visor-abierto');CAJA.scrollTop=0;}
function cerrar(){CAJA.classList.remove('abierto');CAJA.setAttribute('aria-hidden','true');document.documentElement.classList.remove('visor-abierto');actual=null;}

/* descargar = imprimir solo esa hoja (o todas); el título sale como nombre del PDF */
var tituloOriginal=document.title;
function imprimir(id){
  if(id==='todas'){document.body.setAttribute('data-imprimir','todas');document.title='BioNom - Hojas de referencia';}
  else{document.body.setAttribute('data-imprimir',id);hojas.forEach(function(h){h.classList.toggle('sel',h.getAttribute('data-hoja')===id);h.classList.remove('ultima');});var pp=paginas(id);pp[pp.length-1].classList.add('ultima');document.title='BioNom - '+hoja(id).getAttribute('data-tit');}
  hojas.forEach(function(h){h.style.zoom=1;});
  setTimeout(function(){window.print();},60);
}
window.addEventListener('afterprint',function(){document.title=tituloOriginal;hojas.forEach(function(h){h.classList.remove('ultima');});document.body.removeAttribute('data-imprimir');
  if(actual){escala();hojas.forEach(function(h){h.classList.toggle('sel',h.getAttribute('data-hoja')===actual);});}else hojas.forEach(function(h){h.classList.remove('sel');});});

LISTA.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-ver'))abrir(b.getAttribute('data-ver'));
  if(b.hasAttribute('data-pdf'))imprimir(b.getAttribute('data-pdf'));});
/* menú selector: una hoja, o varias marcadas en un solo PDF */
var SEL=document.getElementById('ref-sel'),CHK=document.getElementById('sel-checks'),BV=document.getElementById('sel-varias-pdf');
SEL.innerHTML=grupos.map(function(h){var id=h.getAttribute('data-hoja');return '<option value="'+id+'">'+h.getAttribute('data-ico')+' '+h.getAttribute('data-tit')+nPag(id)+'</option>';}).join('');
CHK.innerHTML=grupos.map(function(h){var id=h.getAttribute('data-hoja');return '<label><input type="checkbox" value="'+id+'"> '+h.getAttribute('data-ico')+' '+h.getAttribute('data-tit')+nPag(id)+'</label>';}).join('');
function marcadas(){return [].slice.call(CHK.querySelectorAll('input:checked')).map(function(x){return x.value;});}
function contar(){var n=marcadas().length;BV.disabled=!n;BV.textContent='⬇️ Descargar o imprimir las marcadas'+(n?' ('+n+')':'');}
CHK.addEventListener('change',contar);
document.getElementById('sel-todas').onclick=function(){CHK.querySelectorAll('input').forEach(function(x){x.checked=true;});contar();};
document.getElementById('sel-ninguna').onclick=function(){CHK.querySelectorAll('input').forEach(function(x){x.checked=false;});contar();};
document.getElementById('sel-ver').onclick=function(){abrir(SEL.value);};
document.getElementById('sel-pdf').onclick=function(){imprimir(SEL.value);};
BV.onclick=function(){var ids=marcadas();if(!ids.length)return;
  if(ids.length===1){imprimir(ids[0]);return;}
  document.body.setAttribute('data-imprimir','varias');document.title='BioNom - Hojas de referencia ('+ids.length+')';
  var ult=null;hojas.forEach(function(h){var on=ids.indexOf(h.getAttribute('data-hoja'))>=0;h.classList.toggle('sel',on);h.classList.remove('ultima');h.style.zoom=1;if(on)ult=h;});
  if(ult)ult.classList.add('ultima');
  setTimeout(function(){window.print();},60);};
document.getElementById('visor-cerrar').onclick=cerrar;
document.getElementById('visor-pdf').onclick=function(){if(actual)imprimir(actual);};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&actual)cerrar();});
window.addEventListener('resize',function(){if(actual)escala();});

/* enlace directo: referencias.html?hoja=codigo abre esa hoja */
var q=new URLSearchParams(location.search).get('hoja');
if(q&&hoja(q)){SEL.value=q;var t=document.getElementById('tarjeta-'+q);if(t)t.classList.add('pedida');abrir(q);}
})();
