/* ════════════════════════════════════════════════════════════════════════
   embrion-fig.js — ilustraciones del desarrollo embrionario humano
   (reproduccion.html: «De la fecundación al parto» y «Semana a semana»).
   EMB.fig('s8') devuelve el SVG de esa etapa. Esquemas didácticos con
   volumen, no a escala entre sí: el tamaño real va en el rótulo.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var N=0;
function f(n){return (+n).toFixed(1);}
function defs(p){return '<defs>'+
 '<radialGradient id="'+p+'pi" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fde0d2"/><stop offset=".55" stop-color="#f2b29a"/><stop offset="1" stop-color="#c97b62"/></radialGradient>'+
 '<radialGradient id="'+p+'em" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fbe3dc"/><stop offset=".6" stop-color="#f0b8aa"/><stop offset="1" stop-color="#c98a7c"/></radialGradient>'+
 '<radialGradient id="'+p+'am" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#fffaf6"/><stop offset="1" stop-color="#f9dfe2"/></radialGradient>'+
 '<radialGradient id="'+p+'ut" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#f5a9b8"/><stop offset="1" stop-color="#c25a72"/></radialGradient>'+
 '<radialGradient id="'+p+'pl" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#d8667e"/><stop offset="1" stop-color="#8e2a44"/></radialGradient>'+
 '<radialGradient id="'+p+'ov" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#fffbe8"/><stop offset=".7" stop-color="#f6e7b8"/><stop offset="1" stop-color="#d9bf7a"/></radialGradient>'+
 '<radialGradient id="'+p+'nu" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#e4d6f5"/><stop offset="1" stop-color="#8e6fc7"/></radialGradient>'+
 '<filter id="'+p+'sh"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".22"/></filter></defs>';}
function brillo(x,y,r){return '<ellipse cx="'+f(x-r*.3)+'" cy="'+f(y-r*.35)+'" rx="'+f(r*.32)+'" ry="'+f(r*.18)+'" fill="#fff" opacity=".45"/>';}
function rotulo(t1,t2){return '<rect x="8" y="8" width="'+(Math.max(t1.length,t2.length)*7.2+18)+'" height="40" rx="10" fill="#fff" opacity=".92" stroke="#e6d4d8"/><text x="17" y="25" style="font:800 13px Outfit,sans-serif" fill="#8e2a44">'+t1+'</text><text x="17" y="41" style="font:600 11px Outfit,sans-serif" fill="#5a4a4e">'+t2+'</text>';}
function etq(x,y,t,ax,ay){var w=t.length*5.9,der=x>ax,tx2=der?352:8,ini=der?tx2-w-4:tx2+w+4;
  return '<path d="M'+f(ini)+' '+f(y)+' L'+f(ax)+' '+f(ay)+'" stroke="#5a4a4e" stroke-width="1" fill="none"/><circle cx="'+f(ax)+'" cy="'+f(ay)+'" r="2" fill="#5a4a4e"/><text x="'+f(tx2)+'" y="'+f(y+4)+'" text-anchor="'+(der?'end':'start')+'" style="font:700 10.5px Outfit,sans-serif" fill="#3c2a2e" paint-order="stroke" stroke="#fff" stroke-width="3">'+t+'</text>';}

/* ── embrión en forma de C (semanas 6 a 8 de embarazo): tubo curvado, de la cabeza a la cola ── */
function embrionC(p,cx,cy,s,lb){var o='',n=26;
  for(var i=n-1;i>=0;i--){var k=i/(n-1),a=Math.PI*(0.15+1.55*k),r=36*s,x=cx+Math.cos(a)*r,y=cy-Math.sin(a)*r*1.05,rad=(4+16*Math.pow(1-k,1.6))*s;
    o+='<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(rad)+'" fill="url(#'+p+'em)"/>';}
  for(var j=5;j<18;j++){var k2=j/(n-1),a2=Math.PI*(0.15+1.55*k2),x2=cx+Math.cos(a2)*(36*s+(4+16*Math.pow(1-k2,1.6))*s*.55),y2=cy-Math.sin(a2)*(36*s+(4+16*Math.pow(1-k2,1.6))*s*.55)*1.05;o+='<circle cx="'+f(x2)+'" cy="'+f(y2)+'" r="'+f(2.2*s)+'" fill="#d38f80" opacity=".8"/>';}
  o+='<circle cx="'+f(cx-2*s)+'" cy="'+f(cy+4*s)+'" r="'+f(9*s)+'" fill="#d64545" opacity=".9"/>'+brillo(cx-2*s,cy+4*s,9*s);
  var hx=cx+Math.cos(Math.PI*.15)*36*s,hy=cy-Math.sin(Math.PI*.15)*36*s*1.05;
  for(var q=0;q<3;q++)o+='<path d="M'+f(hx-14*s)+' '+f(hy+(8+q*6)*s)+' q'+f(6*s)+' '+f(3*s)+' '+f(12*s)+' 0" stroke="#c07a6a" stroke-width="1.4" fill="none"/>';
  if(lb>0){o+='<ellipse cx="'+f(cx-30*s)+'" cy="'+f(cy+6*s)+'" rx="'+f(7*s*lb)+'" ry="'+f(4*s*lb)+'" fill="url(#'+p+'em)" stroke="#c98a7c" transform="rotate(-30 '+f(cx-30*s)+' '+f(cy+6*s)+')"/>'+
    '<ellipse cx="'+f(cx-10*s)+'" cy="'+f(cy+34*s)+'" rx="'+f(7*s*lb)+'" ry="'+f(4*s*lb)+'" fill="url(#'+p+'em)" stroke="#c98a7c" transform="rotate(20 '+f(cx-10*s)+' '+f(cy+34*s)+')"/>'+
    '<circle cx="'+f(hx-4*s)+'" cy="'+f(hy-2*s)+'" r="'+f(2.8*s)+'" fill="#3a2a2a"/>';}
  return o;}

/* ── feto de perfil (semana 10 de embarazo en adelante) ──
   o: {x,y,s (escala), hr (radio de la cabeza), rot, dedos(0-1), cordon:[x,y]} */
function feto(p,o){var s=o.s,hr=o.hr,c='url(#'+p+'pi)',st='#b86a52';
  var h='<g transform="translate('+f(o.x)+' '+f(o.y)+') rotate('+f(o.rot||0)+') scale('+f(s)+')">';
  // pierna de atrás
  h+='<path d="M10 22 C34 18 40 -2 26 -10 C22 -2 16 8 4 10Z" fill="'+c+'" stroke="'+st+'" stroke-width="1" opacity=".85"/>';
  // cuerpo
  h+='<path d="M-22 -16 C-30 6 -18 34 6 36 C26 38 34 18 28 -4 C22 -26 -14 -32 -22 -16Z" fill="'+c+'" stroke="'+st+'" stroke-width="1.2"/>';
  // pierna de adelante (doblada hacia el pecho) y pie
  h+='<path d="M14 26 C40 28 44 0 30 -8 C24 -2 22 10 8 14Z" fill="'+c+'" stroke="'+st+'" stroke-width="1.2"/>'+
     '<ellipse cx="28" cy="-12" rx="6" ry="9" fill="'+c+'" stroke="'+st+'" transform="rotate(-30 28 -12)"/>';
  // cabeza
  var hx=-14,hy=-22-hr*.75;
  h+='<circle cx="'+f(hx)+'" cy="'+f(hy)+'" r="'+f(hr)+'" fill="'+c+'" stroke="'+st+'" stroke-width="1.2"/>'+brillo(hx,hy,hr);
  // cara: ojo cerrado, nariz, boca, oreja
  h+='<path d="M'+f(hx-hr*.62)+' '+f(hy+hr*.05)+' q'+f(hr*.14)+' '+f(hr*.08)+' '+f(hr*.28)+' 0" stroke="#5a3a2e" stroke-width="1.6" fill="none"/>'+
     '<path d="M'+f(hx-hr*.98)+' '+f(hy+hr*.25)+' q'+f(-hr*.1)+' '+f(hr*.12)+' '+f(hr*.04)+' '+f(hr*.2)+'" stroke="'+st+'" stroke-width="1.4" fill="none"/>'+
     '<path d="M'+f(hx-hr*.8)+' '+f(hy+hr*.55)+' q'+f(hr*.12)+' '+f(hr*.06)+' '+f(hr*.22)+' 0" stroke="#a5504a" stroke-width="1.4" fill="none"/>'+
     '<ellipse cx="'+f(hx+hr*.2)+'" cy="'+f(hy+hr*.15)+'" rx="'+f(hr*.14)+'" ry="'+f(hr*.22)+'" fill="none" stroke="'+st+'" stroke-width="1.4"/>';
  // brazo y mano cerca de la cara
  h+='<path d="M-14 -10 C-26 -2 -32 -12 -30 -22" stroke="'+st+'" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M-14 -10 C-26 -2 -32 -12 -30 -22" stroke="#f2b29a" stroke-width="7" stroke-linecap="round" fill="none"/>'+
     '<circle cx="-30" cy="-24" r="5.5" fill="'+c+'" stroke="'+st+'"/>';
  if(o.dedos)h+='<path d="M-34 -27 l-3 -4 M-31 -29 l-1 -5 M-28 -29 l1 -4" stroke="'+st+'" stroke-width="1.6" stroke-linecap="round" opacity="'+f(o.dedos)+'"/>';
  return h+'</g>';}
function cordon(x1,y1,x2,y2){var mx=(x1+x2)/2+18,my=(y1+y2)/2-10;return '<path d="M'+f(x1)+' '+f(y1)+' Q'+f(mx)+' '+f(my)+' '+f(x2)+' '+f(y2)+'" stroke="#c9b6d8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M'+f(x1)+' '+f(y1)+' Q'+f(mx)+' '+f(my)+' '+f(x2)+' '+f(y2)+'" stroke="#8a6db0" stroke-width="1.4" fill="none" stroke-dasharray="4 3"/>';}
/* útero en corte con saco amniótico, placenta y feto */
function utero(p,cx,cy,rx,ry,fo,cerv){var o='<g filter="url(#'+p+'sh)"><ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rx+12)+'" ry="'+(ry+12)+'" fill="url(#'+p+'ut)"/></g>'+
  (cerv?'<path d="M'+(cx-14)+' '+(cy+ry+8)+' L'+(cx-10)+' '+(cy+ry+30)+' L'+(cx+10)+' '+(cy+ry+30)+' L'+(cx+14)+' '+(cy+ry+8)+'Z" fill="url(#'+p+'ut)"/>':'')+
  '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="url(#'+p+'am)" stroke="#e6b8c2" stroke-width="2"/>';
  var px=cx+rx*.55,py=cy-ry*.72;o+='<path d="M'+f(px-34)+' '+f(py-6)+' Q'+f(px)+' '+f(py-30)+' '+f(px+40)+' '+f(py+12)+' Q'+f(px+6)+' '+f(py+6)+' '+f(px-34)+' '+f(py-6)+'Z" fill="url(#'+p+'pl)"/>';
  o+=cordon(px-2,py+2,fo.cx,fo.cy)+feto(p,fo);return o;}

var ETAPA={
 cigoto:function(p){return '<circle cx="180" cy="112" r="78" fill="#fdf3dc" opacity=".8" stroke="#e9d7a8" stroke-width="10"/><circle cx="180" cy="112" r="64" fill="url(#'+p+'ov)"/>'+brillo(180,112,64)+
   '<circle cx="164" cy="108" r="14" fill="url(#'+p+'nu)"/><circle cx="196" cy="116" r="14" fill="url(#'+p+'nu)"/><circle cx="238" cy="64" r="8" fill="url(#'+p+'ov)" stroke="#d9bf7a"/>'+
   etq(300,70,'zona pelúcida',248,76)+etq(300,140,'núcleo del óvulo',204,118)+etq(70,160,'núcleo del espermatozoide',158,116)+rotulo('Cigoto · semana 3','día 1 tras la fecundación · ≈ 0,1 mm');},
 blasto:function(p){var o='<path d="M0 170 Q90 150 180 168 T360 166 L360 220 L0 220Z" fill="url(#'+p+'ut)"/><path d="M0 172 Q90 152 180 170 T360 168" stroke="#f8d0d8" stroke-width="4" fill="none"/>';
   for(var i=0;i<26;i++){var a=i/26*Math.PI*2;o+='<circle cx="'+f(180+Math.cos(a)*58)+'" cy="'+f(104+Math.sin(a)*52)+'" r="9" fill="url(#'+p+'em)"/>';}
   o+='<ellipse cx="180" cy="104" rx="50" ry="44" fill="#fff6f0" opacity=".85"/>';for(var j=0;j<8;j++)o+='<circle cx="'+f(162+(j%4)*12)+'" cy="'+f(64+Math.floor(j/4)*12)+'" r="8" fill="url(#'+p+'em)"/>';
   return o+etq(300,58,'masa interna: será el embrión',196,70)+etq(300,120,'cavidad con líquido',214,110)+etq(60,120,'capa externa: será la placenta',124,112)+etq(60,196,'endometrio (pared del útero)',110,176)+rotulo('Blastocisto · semana 3','≈ 0,2 mm · se implanta en el útero');},
 s4:function(p){return '<ellipse cx="180" cy="118" rx="120" ry="92" fill="url(#'+p+'am)" stroke="#e6b8c2" stroke-width="2"/>'+embrionC(p,180,120,1.25,0)+'<circle cx="270" cy="170" r="16" fill="#f6e7b8" stroke="#d9bf7a"/>'+
   etq(330,80,'cerebro (tubo neural)',232,88)+etq(330,140,'corazón: ya late',176,126)+etq(40,200,'somitas: futuras vértebras y músculos',150,146)+etq(330,200,'saco vitelino',282,178)+rotulo('Embrión · semana 6','≈ 4 mm, como un grano de arroz');},
 s6:function(p){return '<ellipse cx="180" cy="118" rx="120" ry="92" fill="url(#'+p+'am)" stroke="#e6b8c2" stroke-width="2"/>'+embrionC(p,180,120,1.35,1)+
   etq(330,70,'ojo',232,92)+etq(40,110,'brazo en formación',140,128)+etq(330,175,'pierna en formación',168,168)+etq(330,130,'corazón',178,126)+rotulo('Embrión · semana 8','≈ 1,3 cm · se forman los ojos y las extremidades');},
 s8:function(p){return '<ellipse cx="180" cy="116" rx="122" ry="94" fill="url(#'+p+'am)" stroke="#e6b8c2" stroke-width="2"/>'+cordon(268,150,176,128)+'<ellipse cx="282" cy="160" rx="20" ry="30" fill="url(#'+p+'pl)"/>'+
   feto(p,{x:176,y:130,s:1.25,hr:28,rot:-10,dedos:1})+etq(330,70,'cabeza grande: el cerebro crece rápido',212,78)+etq(40,150,'dedos',132,104)+etq(330,200,'cordón umbilical',236,152)+rotulo('Embrión · semana 10','≈ 3 cm · ya están todos los órganos');},
 s12:function(p){return utero(p,180,118,104,84,{x:168,y:132,s:1.05,hr:24,rot:-6,dedos:1,cx:180,cy:136})+etq(340,40,'placenta',260,58)+etq(340,190,'líquido amniótico',260,170)+rotulo('Feto · semana 12','≈ 6 cm · 14 g · se mueve, pero aún no se siente');},
 s20:function(p){return utero(p,180,116,112,90,{x:172,y:130,s:1.3,hr:22,rot:-4,dedos:1,cx:184,cy:136})+etq(340,190,'cordón umbilical',236,98)+rotulo('Feto · semana 20','≈ 25 cm · 300 g · la madre siente sus patadas');},
 s28:function(p){return utero(p,180,116,118,94,{x:174,y:128,s:1.45,hr:20,rot:10,dedos:1,cx:186,cy:136})+rotulo('Feto · semana 28','≈ 37 cm · 1 kg · abre los ojos');},
 s36:function(p){return utero(p,180,112,122,96,{x:180,y:116,s:1.42,hr:19,rot:165,dedos:1,cx:178,cy:104},true)+etq(340,200,'cabeza abajo, lista para el parto',196,186)+rotulo('Feto · semana 36','≈ 47 cm · 2,6 kg · gira cabeza abajo');},
 s40:function(p){return utero(p,180,110,124,98,{x:180,y:114,s:1.5,hr:19,rot:172,dedos:1,cx:176,cy:100},true)+rotulo('Semana 40 · parto','≈ 50 cm · 3,3 kg · ocupa todo el útero');},
 fecundacion:function(p){var o='<circle cx="190" cy="118" r="70" fill="#fdf3dc" opacity=".75" stroke="#e9d7a8" stroke-width="8"/><circle cx="190" cy="118" r="58" fill="url(#'+p+'ov)"/>'+brillo(190,118,58)+'<circle cx="182" cy="114" r="15" fill="url(#'+p+'nu)"/>';
   for(var i=0;i<16;i++){var a=i/16*Math.PI*2+.3,r=i===3?76:98+(i%3)*14,x=190+Math.cos(a)*r,y=118+Math.sin(a)*r*.9,ang=a*180/Math.PI;
     o+='<g transform="translate('+f(x)+' '+f(y)+') rotate('+f(ang)+')"><ellipse cx="0" cy="0" rx="6" ry="4" fill="#9fc3e8" stroke="#3e6fa0"/><path d="M6 0 q8 4 16 0 t16 0" stroke="#3e6fa0" stroke-width="1.4" fill="none"/></g>';}
   return o+etq(320,30,'solo uno entra',236,104)+etq(40,200,'óvulo',136,150)+rotulo('Fecundación','En la trompa de Falopio');},
 implantacion:function(p){var o='<path d="M30 70 C90 40 140 40 180 80 C200 100 200 130 230 150" stroke="url(#'+p+'ut)" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M30 70 C90 40 140 40 180 80 C200 100 200 130 230 150" stroke="#fbe1e6" stroke-width="16" fill="none" stroke-linecap="round"/>'+
   '<path d="M222 120 Q300 100 340 150 Q350 210 280 214 Q220 214 214 170Z" fill="url(#'+p+'ut)"/><path d="M232 134 Q296 118 326 156 Q330 200 278 202 Q232 202 228 170Z" fill="#fbe1e6"/><ellipse cx="22" cy="72" rx="20" ry="14" fill="#f6e7b8" stroke="#d9bf7a"/>';
   var pas=[[66,58,1],[110,50,2],[150,60,4],[188,96,8],[214,136,'m']];
   pas.forEach(function(q){var n=q[2];if(n==='m'){for(var j=0;j<7;j++)o+='<circle cx="'+f(q[0]+(j%3-1)*5)+'" cy="'+f(q[1]+(Math.floor(j/3)-1)*5)+'" r="4" fill="url(#'+p+'em)"/>';}else{for(var k=0;k<n;k++)o+='<circle cx="'+f(q[0]+(n>1?Math.cos(k/n*6.28)*4:0))+'" cy="'+f(q[1]+(n>1?Math.sin(k/n*6.28)*4:0))+'" r="'+(n===1?6:n===2?4.4:3.6)+'" fill="url(#'+p+'em)"/>';}});
   o+='<circle cx="304" cy="168" r="12" fill="#fff6f0" stroke="#d98b6e" stroke-width="3"/><circle cx="300" cy="162" r="4" fill="url(#'+p+'em)"/>';
   return o+etq(20,110,'ovario',22,82)+etq(150,20,'se divide mientras baja',110,46)+etq(350,100,'se implanta en el útero (día 7)',306,158)+rotulo('Implantación','La trompa lleva al embrión hasta el útero');},
 placenta:function(p){return utero(p,180,118,108,86,{x:172,y:132,s:1.15,hr:22,rot:-6,dedos:1,cx:182,cy:136})+etq(340,36,'placenta: alimento y oxígeno',262,56)+etq(340,110,'cordón umbilical',226,104)+etq(340,200,'líquido amniótico: protege',262,174)+etq(30,200,'saco amniótico',92,170)+rotulo('Placenta y cordón','Las sangres de madre y bebé no se mezclan');},
 parto:function(p){return utero(p,180,104,120,92,{x:180,y:108,s:1.45,hr:19,rot:172,dedos:1,cx:176,cy:96},true)+'<path d="M180 222 l-8 -12 h16Z" fill="#8e2a44"/>'+etq(330,210,'el cuello uterino se dilata',196,212)+etq(330,60,'el útero se contrae',292,90)+rotulo('Parto · semana 40','La cabeza sale primero')}
};
function fig(k){var p='emb'+(++N)+'-';var cuerpo=ETAPA[k](p),i=cuerpo.lastIndexOf('<rect x="8" y="8"');var rot=cuerpo.slice(i);cuerpo=cuerpo.slice(0,i);return '<svg viewBox="0 0 360 280" role="img" aria-label="Ilustración: '+k+'" style="display:block;width:100%;height:auto">'+defs(p)+'<rect width="360" height="280" rx="14" fill="#fff8f6"/><g transform="translate(0 48)">'+cuerpo+'</g>'+rot+'</svg>';}
window.EMB={fig:fig};
})();
