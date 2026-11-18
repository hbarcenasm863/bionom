/* respiracion-anim.js — «La respiración celular, paso a paso»: glucólisis (citoplasma),
   ciclo de Krebs (matriz), cadena respiratoria con ATP sintasa (crestas) y fermentación
   (sin oxígeno). Dibujo propio. Uso: <div id="rc-anim"></div> y este archivo después.
   Cada átomo de carbono de la glucosa se dibuja como un punto gris: se ve que los 6
   terminan como CO₂. Cada paso es [capítulo, paso, duración, título, texto] en PASOS. */
(function(){
var raiz=document.getElementById('rc-anim');if(!raiz)return;
var QUIETO=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var NAR='#c2410c',VERDE='#16a34a',AZUL='#1774a6',GRIS='#475569';
function L(a,b,t){return a+(b-a)*t;}
function cl(t){return Math.max(0,Math.min(1,t));}
function suave(t){t=cl(t);return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function tramo(u,a,b){return suave((u-a)/(b-a));}
function f1(n){return (+n).toFixed(1);}
function T(x,y,t,o){o=o||{};return '<text x="'+f1(x)+'" y="'+f1(y)+'" text-anchor="'+(o.a||'middle')+'" font-size="'+(o.s||13)+'" font-weight="'+(o.w||700)+'" fill="'+(o.c||'#1e293b')+'"'+(o.op!=null?' opacity="'+(+o.op).toFixed(2)+'"':'')+'>'+t+'</text>';}
/* molécula: n átomos de carbono en fila dentro de una cápsula */
function mol(x,y,n,col,op,s){s=s||1;var w=(n*16+8)*s,h=24*s,o='<g opacity="'+(op==null?1:cl(op)).toFixed(2)+'"><rect x="'+f1(x-w/2)+'" y="'+f1(y-h/2)+'" width="'+f1(w)+'" height="'+f1(h)+'" rx="'+f1(h/2)+'" fill="'+col+'" opacity=".22" stroke="'+col+'" stroke-width="2"/>';
  for(var i=0;i<n;i++)o+='<circle cx="'+f1(x-w/2+(12+i*16)*s)+'" cy="'+f1(y)+'" r="'+f1(6*s)+'" fill="'+GRIS+'"/>';
  return o+'</g>';}
function co2(x,y,op){return '<g opacity="'+cl(op==null?1:op).toFixed(2)+'"><circle cx="'+f1(x)+'" cy="'+f1(y)+'" r="7" fill="'+GRIS+'"/><circle cx="'+f1(x-9)+'" cy="'+f1(y+4)+'" r="4.5" fill="#ef4444"/><circle cx="'+f1(x+9)+'" cy="'+f1(y+4)+'" r="4.5" fill="#ef4444"/></g>';}
function atp(x,y,op,s){s=s||1;return '<g opacity="'+cl(op==null?1:op).toFixed(2)+'"><circle cx="'+f1(x)+'" cy="'+f1(y)+'" r="'+f1(13*s)+'" fill="'+VERDE+'" stroke="#bbf7d0" stroke-width="2"/>'+T(x,y+4*s,'ATP',{s:10*s,c:'#fff'})+'</g>';}
function car(x,y,nom,op){return '<g opacity="'+cl(op==null?1:op).toFixed(2)+'"><rect x="'+f1(x-22)+'" y="'+f1(y-10)+'" width="44" height="20" rx="6" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>'+T(x,y+4,nom,{s:10,c:'#422006'})+'</g>';}
function elec(x,y,op){return '<g opacity="'+cl(op==null?1:op).toFixed(2)+'"><circle cx="'+f1(x)+'" cy="'+f1(y)+'" r="6" fill="#facc15" stroke="#a16207" stroke-width="1.5"/>'+T(x,y+3,'e⁻',{s:7.5,c:'#422006',w:800})+'</g>';}
function hp(x,y,op){return '<g opacity="'+cl(op==null?1:op).toFixed(2)+'"><circle cx="'+f1(x)+'" cy="'+f1(y)+'" r="5.5" fill="#ef4444"/>'+T(x,y+3,'+',{s:9,c:'#fff',w:800})+'</g>';}
function gota(x,y,op){return '<g opacity="'+cl(op==null?1:op).toFixed(2)+'"><path d="M'+f1(x)+' '+f1(y-11)+' Q'+f1(x+11)+' '+f1(y+4)+' '+f1(x)+' '+f1(y+9)+' Q'+f1(x-11)+' '+f1(y+4)+' '+f1(x)+' '+f1(y-11)+'Z" fill="#38bdf8" stroke="#0369a1" stroke-width="1.5"/>'+T(x,y+5,'H₂O',{s:6.5,c:'#fff',w:800})+'</g>';}
function o2(x,y,op){return '<g opacity="'+cl(op==null?1:op).toFixed(2)+'"><circle cx="'+f1(x-6)+'" cy="'+f1(y)+'" r="8" fill="#ef4444"/><circle cx="'+f1(x+6)+'" cy="'+f1(y)+'" r="8" fill="#ef4444"/>'+T(x,y+3.5,'O₂',{s:8.5,c:'#fff',w:800})+'</g>';}

/* ── geometría fija ── */
var FING=[{x:432,arr:1,y:[86,232]},{x:487,arr:0,y:[168,314]},{x:542,arr:1,y:[86,232]},{x:597,arr:0,y:[168,282]}]; // crestas: arr=1 cuelga de arriba
var HW=20; // medio ancho de una cresta
function fy(f){return f.y;} // [y1,y2] de la cresta

function base(cap,paso,u){
  var dim=cap===3?.45:1;
  var o='<rect width="680" height="400" fill="#fff"/>';
  o+='<rect x="8" y="8" width="664" height="356" rx="40" fill="#fff7ed" stroke="#fdba74" stroke-width="3"/>';
  o+=T(26,34,'Citoplasma',{a:'start',s:14,c:'#9a3412'});
  // mitocondria
  o+='<g opacity="'+dim+'"><rect x="272" y="52" width="384" height="296" rx="120" fill="#ffedd5" stroke="'+NAR+'" stroke-width="4"/>';
  o+='<rect x="290" y="72" width="348" height="256" rx="100" fill="#fef3c7" stroke="#ea580c" stroke-width="3"/>';
  o+=T(464,44,'Mitocondria',{s:13,c:'#9a3412'});
  o+=T(342,316,'Matriz',{s:14,c:'#92400e'});
  var i,f,y;
  for(i=0;i<FING.length;i++){f=FING[i];y=fy(f);
    o+='<rect x="'+(f.x-HW)+'" y="'+y[0]+'" width="'+(HW*2)+'" height="'+(y[1]-y[0])+'" rx="'+HW+'" fill="#ffedd5" stroke="#ea580c" stroke-width="3"/>';}
  o+=T(487,118,'crestas',{s:9.5,c:'#9a3412',w:600});
  o+='</g>';
  return o;
}
/* resaltado de la zona activa */
function zona(cap){
  var c='#2563eb';
  if(cap===0)return '<rect x="16" y="44" width="248" height="304" rx="22" fill="none" stroke="'+c+'" stroke-width="3" stroke-dasharray="7 5"/>';
  if(cap===1)return '<rect x="296" y="78" width="104" height="216" rx="46" fill="none" stroke="'+c+'" stroke-width="3" stroke-dasharray="7 5"/>';
  if(cap===2)return '<rect x="402" y="68" width="242" height="262" rx="40" fill="none" stroke="'+c+'" stroke-width="3" stroke-dasharray="7 5"/>';
  return '<rect x="16" y="44" width="248" height="304" rx="22" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="7 5"/>';
}
/* contador de ATP */
function atpTotal(paso,u){
  if(paso===0)return 0;
  if(paso===1)return Math.round(2*tramo(u,.5,1));
  if(paso<=3)return 2;
  if(paso===4)return 2+Math.round(2*u);
  if(paso<=8)return 4;
  if(paso===9)return 4+Math.round(28*tramo(u,.1,.95));
  return 2;
}
function hud(paso,u){
  var n=atpTotal(paso,u),fin=paso===9&&u>=.95,
      o='<rect x="8" y="368" width="664" height="30" rx="10" fill="#f1f5f9" stroke="#cbd5e1"/>';
  o+=T(22,388,'ATP obtenidos de una glucosa:',{a:'start',s:13,c:'#334155'});
  o+=T(268,389,fin?'30 a 32':String(n),{a:'start',s:17,c:VERDE,w:800});
  var k=Math.min(n,32),w=Math.max(0,k/32*330);
  o+='<rect x="330" y="376" width="330" height="14" rx="7" fill="#e2e8f0"/><rect x="330" y="376" width="'+f1(w)+'" height="14" rx="7" fill="'+VERDE+'"/>';
  return o;
}

/* ═════════ Escena ═════════ */
function CX(i){return 44+i*36;}var CY=324;
function escena(cap,paso,u){
  var o=base(cap,paso,u)+zona(cap);
  var e,t,i,x,y;
  if(paso===0){
    t=tramo(u,0,.6);
    o+=mol(L(40,130,t),L(60,120,t),6,NAR,t);
    o+=T(130,152,'Glucosa (6 C)',{c:NAR,op:t});
    o+=T(130,326,'No usa oxígeno',{s:12,c:'#334155',op:tramo(u,.5,1)});
  }
  if(paso===1){
    t=tramo(u,0,.5);
    o+=mol(L(130,92,t),L(120,190,t),3,NAR);o+=mol(L(130,168,t),L(120,190,t),3,NAR);
    o+=T(92,222,'Piruvato (3 C)',{s:11,c:NAR,op:t})+T(176,222,'Piruvato (3 C)',{s:11,c:NAR,op:t});
    e=tramo(u,.5,1);
    o+=atp(70,282,e)+atp(110,282,e)+car(180,282,'NADH',e)+car(228,282,'NADH',e);
    o+=T(90,312,'+2 ATP netos',{s:12,c:VERDE,op:e})+T(204,312,'2 NADH',{s:12,c:'#a16207',op:e});
  }
  if(paso===2){
    t=tramo(u,0,1);
    o+=mol(L(92,326,t),L(190,150,t),3,NAR);o+=mol(L(168,326,tramo(u,.1,1)),L(190,250,tramo(u,.1,1)),3,NAR);
    o+=T(130,250,'El piruvato cruza las',{s:12,c:'#334155',op:1-t})+T(130,266,'dos membranas',{s:12,c:'#334155',op:1-t});
  }
    if(paso===3){
    t=tramo(u,.1,.7);
    o+=mol(326,150,2,NAR)+mol(326,250,2,NAR)+T(330,124,'Acetil (2 C)',{s:11,c:NAR});
    // el tercer carbono sale como CO₂
    o+=co2(L(326,CX(0),t),L(150,CY,t),1)+co2(L(326,CX(1),t),L(250,CY,t),1);
    o+=car(326,200,'NADH',tramo(u,.5,1));
  }
  if(paso===4){
    var ang=u*Math.PI*4,cx=326,cy=200,R=32;
    o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="#7c3aed" stroke-width="5" opacity=".6"/>';
    for(i=0;i<6;i++){var a=ang+i*Math.PI/3;o+='<circle cx="'+f1(cx+R*Math.cos(a))+'" cy="'+f1(cy+R*Math.sin(a))+'" r="7" fill="#7c3aed"/>';}
    o+=T(cx,cy+4,'Krebs',{s:12,c:'#5b21b6'});
    o+=mol(326,134,2,NAR,1-tramo(u,0,.25))+mol(326,266,2,NAR,1-tramo(u,0,.25));
    // CO₂ que salen (4)
    for(i=0;i<4;i++){var q=tramo(u,.15+i*.18,.55+i*.18);if(q>0)o+=co2(L(326+(i%2?16:-16),CX(i+2),q),L(i<2?170:230,CY,q),1);}
    // transportadores que se cargan
    for(i=0;i<6;i++){var z=tramo(u,.1+i*.13,.35+i*.13);if(z>0)o+=car(378,112+i*24,i%3===2?'FADH₂':'NADH',z);}
    o+=atp(326,262,tramo(u,.3,.5))+T(326,286,'+2 ATP',{s:11,c:VERDE,op:tramo(u,.4,.7)});
  }
  if(paso===5){
    o+='<circle cx="326" cy="200" r="32" fill="none" stroke="#7c3aed" stroke-width="5" opacity=".25"/>'+T(326,204,'Krebs',{s:12,c:'#5b21b6',op:.4});
    for(i=0;i<6;i++)o+=car(378,112+i*24,i%3===2?'FADH₂':'NADH',.55+.45*Math.abs(Math.sin(u*6+i)));
    o+=T(330,292,'transportadores cargados →',{s:10.5,c:'#334155',op:tramo(u,0,.3)});
  }
  // fila de recuento de CO₂ (carbonos que salen de la célula)
  if(cap<3&&paso>=3){
    o+=T(28,300,'CO₂ que sale de la célula:',{a:'start',s:11,c:GRIS});
    for(i=0;i<6;i++)if(paso>=5||(paso===4&&i<2)||(paso===3&&false))o+=co2(CX(i),CY,1);else o+=co2(CX(i),CY,.12);
  }
  if(paso>=6&&paso<=9)o+=cadena(paso,u);
  if(paso===10){
    t=tramo(u,0,.6);
    o+=mol(92,150,3,NAR)+mol(168,150,3,NAR)+T(130,176,'Piruvato',{s:11,c:NAR});
    o+=car(100,226,'NADH')+car(160,226,'NADH');
    o+=o2(520,200,.4)+'<g opacity="'+t.toFixed(2)+'"><line x1="410" y1="90" x2="640" y2="310" stroke="#dc2626" stroke-width="12" stroke-linecap="round"/><line x1="640" y1="90" x2="410" y2="310" stroke="#dc2626" stroke-width="12" stroke-linecap="round"/></g>';
    o+=T(340,358,'sin O₂ la cadena se detiene',{s:12,c:'#b91c1c',op:t});
  }
  if(paso===11){
    t=tramo(u,0,.7);
    o+=T(136,70,'Músculos (fermentación láctica)',{s:11.5,c:'#6d28d9'});
    o+=mol(92,100,3,'#7c3aed',t)+mol(168,100,3,'#7c3aed',t)+mol(92,100,3,NAR,1-t)+mol(168,100,3,NAR,1-t);
    o+=T(130,130,'ácido láctico',{s:12,c:'#6d28d9',op:t});
    o+=T(136,172,'Levaduras (fermentación alcohólica)',{s:11.5,c:'#0f766e'});
    o+=mol(76,208,2,'#0d9488',t)+mol(150,208,2,'#0d9488',t)+mol(76,208,3,NAR,1-t)+mol(150,208,3,NAR,1-t);
    o+=co2(L(76,50,t),L(208,246,t),t)+co2(L(150,150,t),L(208,246,t),t);
    o+=T(114,232,'alcohol (etanol)',{s:12,c:'#0f766e',op:t});
    o+=T(100,262,'CO₂',{s:11,c:GRIS,op:t});
    o+='<g opacity="'+t.toFixed(2)+'"><line x1="410" y1="90" x2="640" y2="310" stroke="#dc2626" stroke-width="10" stroke-linecap="round" opacity=".55"/><line x1="640" y1="90" x2="410" y2="310" stroke="#dc2626" stroke-width="10" stroke-linecap="round" opacity=".55"/></g>';
    o+=T(340,358,'sin oxígeno: solo 2 ATP por glucosa',{s:12,c:'#b91c1c',op:t});
  }
  return o+hud(paso,u);
}

/* cadena respiratoria: pasos 6 a 9 */
function cadena(paso,u){
  var o='',i,j,f,y,t;
  var f0=FING[0],wx=f0.x-HW;
  // complejos en las crestas (azul) y ATP sintasa (verde)
  for(i=0;i<FING.length;i++){f=FING[i];y=fy(f);
    var ys=f.arr?[y[0]+30,y[0]+64,y[0]+98]:[y[1]-30,y[1]-64,y[1]-98];
    for(j=0;j<3;j++)o+='<ellipse cx="'+(f.x-HW)+'" cy="'+ys[j]+'" rx="7" ry="12" fill="'+AZUL+'" stroke="#fff" stroke-width="1.5"/>';
    // ATP sintasa en la punta de la cresta (lado de la matriz)
    var ty=f.arr?y[1]:y[0],dir=f.arr?1:-1;
    o+='<rect x="'+(f.x-4)+'" y="'+(f.arr?ty:ty-14)+'" width="8" height="14" fill="#86efac" stroke="'+VERDE+'" stroke-width="1.5"/>';
    var hx=f.x,hy=ty+dir*24,r=paso===9?u*Math.PI*6+i:0;
    o+='<circle cx="'+hx+'" cy="'+hy+'" r="12" fill="#bbf7d0" stroke="'+VERDE+'" stroke-width="2.5"/><line x1="'+f1(hx-9*Math.cos(r))+'" y1="'+f1(hy-9*Math.sin(r))+'" x2="'+f1(hx+9*Math.cos(r))+'" y2="'+f1(hy+9*Math.sin(r))+'" stroke="'+VERDE+'" stroke-width="3" stroke-linecap="round"/>';
  }
  
  if(paso===6||paso===7){
    // el transportador entrega electrones: NADH junto a la cresta 1
    o+=car(wx-30,226,'NADH',1)+T(wx-30,250,'entrega',{s:10,c:'#a16207'})+T(wx-30,262,'electrones',{s:10,c:'#a16207'})+o2(wx-34,76,1);
    var camino=[[wx-22,214],[wx,192],[wx,152],[wx,112],[wx-18,96]],tt=(paso===6?u:(u*3)%1);
    for(i=0;i<3;i++){var p=(tt+i/3)%1,s=p*(camino.length-1),k=Math.min(camino.length-2,Math.floor(s)),m=s-k;
      o+=elec(L(camino[k][0],camino[k+1][0],m),L(camino[k][1],camino[k+1][1],m),1);}
    if(paso===6)o+=T(340,358,'los electrones saltan de un complejo a otro',{s:12,c:'#334155'});
  }
  if(paso===7||paso===8||paso===9){
    // protones acumulados dentro de las crestas
    var lleno=paso===7?tramo(u,0,1):1;
    for(i=0;i<FING.length;i++){f=FING[i];y=fy(f);
      for(j=0;j<8;j++){var ord=(i*2+j)/(FING.length*2+8);
        var vis=paso===7?cl((lleno-ord*.8)*4):1;if(vis<=0)continue;
        var hy2=f.arr?y[0]+22+(j%4)*34:y[1]-22-(j%4)*34,hx2=f.x+(j<4?-6:8);
        o+=hp(hx2,hy2+(paso===9?Math.sin(u*20+j)*1.5:0),vis);}}
    if(paso===7)o+=T(340,358,'cada salto bombea H⁺: se acumulan entre las membranas',{s:12,c:'#b91c1c'});
  }
  if(paso===8){
    t=tramo(u,0,.5);
    o+=o2(L(f0.x-HW-34,f0.x-HW-24,t),L(76,96,t),1);
    var g=tramo(u,.45,1);
    o+=gota(L(f0.x-HW-24,f0.x-HW-66,g),L(100,130,g),g)+gota(L(f0.x-HW-24,f0.x-HW-58,g),L(100,162,g),g*.8);
    o+=elec(f0.x-HW,112,1-g)+hp(f0.x-HW-12,108,1-g);
    o+=T(352,272,'O₂ + e⁻ + H⁺ → H₂O',{s:11.5,c:'#0369a1',op:g});
    o+=T(340,358,'el oxígeno recibe los electrones y forma agua',{s:12,c:'#334155'});
  }
  if(paso===9){
    for(i=0;i<FING.length;i++){f=FING[i];y=fy(f);var ty2=f.arr?y[1]:y[0],dr=f.arr?1:-1;
      for(j=0;j<2;j++){var p2=(u*2+j/2+i*.11)%1;o+=hp(f.x,L(ty2-dr*16,ty2+dr*50,p2),p2>.15&&p2<.8?1:0);}
      var q=tramo(u,.12+i*.1,.6+i*.1);if(q>0&&q<1)o+=atp(L(f.x,350+i*14,q),L(ty2+dr*44,150+i*34,q),Math.min(1,q*4)*(1-tramo(q,.85,1)),.8);
    }
    o+=T(340,358,'los H⁺ vuelven a la matriz por la ATP sintasa y se fabrica ATP',{s:12,c:'#15803d'});
  }
  return o;
}

/* ═════════ Pasos ═════════ */
var CAPS=[{n:'Glucólisis',e:'🍬',lugar:'citoplasma'},{n:'Ciclo de Krebs',e:'🔄',lugar:'matriz de la mitocondria'},{n:'Cadena respiratoria',e:'⚡',lugar:'crestas'},{n:'Sin oxígeno',e:'🚫',lugar:'citoplasma'}];
var PASOS=[
 [0,0,3200,'La glucosa entra a la célula','La respiración celular empieza con la <b>glucosa</b>, una molécula de <b>6 carbonos</b> (cada punto gris es un átomo de carbono). La primera etapa, la <b>glucólisis</b>, ocurre en el <b>citoplasma</b> y no necesita oxígeno.'],
 [0,1,4500,'La glucosa se parte en dos','La glucosa se divide en <b>dos piruvatos</b> de 3 carbonos. En el proceso se gastan 2 ATP y se producen 4: la ganancia neta es de <b>2 ATP</b>. También se cargan 2 moléculas transportadoras de energía (<b>NADH</b>).'],
 [0,2,4200,'El piruvato entra a la mitocondria','Si hay <b>oxígeno</b>, los piruvatos cruzan las dos membranas de la mitocondria y llegan a la <b>matriz</b>. Allí continúa la respiración.'],
 [1,0,5200,'El piruvato pierde un carbono','Cada piruvato pierde 1 carbono, que sale como <b>CO₂</b> (el gas que exhalas), y queda un fragmento de 2 carbonos: el <b>acetil</b>. Se carga otro NADH. Este paso previo ocurre en la matriz.'],
 [1,1,9000,'El ciclo de Krebs gira','Los fragmentos de 2 carbonos entran al <b>ciclo de Krebs</b>, una serie de reacciones que se repite como una rueda. En cada vuelta salen 2 CO₂, se produce 1 ATP y se cargan varios transportadores (<b>NADH</b> y <b>FADH₂</b>). Por cada glucosa el ciclo da dos vueltas.'],
 [1,2,5000,'Los 6 carbonos de la glucosa salieron como CO₂','Al final del ciclo, <b>los 6 carbonos de la glucosa ya salieron como 6 CO₂</b>: ese es el CO₂ que exhalas. Lo que queda son transportadores cargados de electrones que viajan hacia las <b>crestas</b>.'],
 [2,0,6000,'Los transportadores entregan sus electrones','En las crestas (la membrana interna plegada) hay una cadena de <b>complejos de proteínas</b>. El NADH y el FADH₂ entregan sus electrones (e⁻) al primer complejo, y los electrones saltan de uno a otro.'],
 [2,1,6500,'Se bombean protones (H⁺)','La energía de los electrones se usa para <b>bombear protones (H⁺)</b> hacia el espacio entre las dos membranas. Los H⁺ se acumulan allí, como el agua detrás de una represa.'],
 [2,2,5500,'El oxígeno recibe los electrones','Al final de la cadena, el <b>oxígeno (O₂)</b> que respiras recibe los electrones y los H⁺ y forma <b>agua (H₂O)</b>. Sin oxígeno, los electrones no tendrían a dónde ir y la cadena se detendría.'],
 [2,3,9000,'La ATP sintasa fabrica el ATP','Los H⁺ regresan a la matriz pasando por la <b>ATP sintasa</b>, una proteína que gira como una turbina. Con esa energía une ADP y fosfato para formar <b>ATP</b>: unos 26 a 28. En total, la respiración con oxígeno rinde <b>30 a 32 ATP por glucosa</b>.'],
 [3,0,4500,'¿Y si no hay oxígeno?','Sin oxígeno, la cadena respiratoria se detiene y la mitocondria no puede producir ATP. Solo funciona la <b>glucólisis</b> (2 ATP), pero el NADH se acumula y el piruvato queda en el citoplasma. La célula necesita otra salida: la <b>fermentación</b>.'],
 [3,1,6500,'Fermentación: láctica o alcohólica','En los <b>músculos</b> cansados el piruvato se convierte en <b>ácido láctico</b>. En las <b>levaduras</b> se convierte en <b>alcohol (etanol) y CO₂</b>: por eso se esponja el pan y se hace la chicha. En ambos casos el rendimiento es de solo <b>2 ATP por glucosa</b>.']
];

raiz.innerHTML='<div class="rc-caps">'+CAPS.map(function(c,i){return '<button type="button" class="chip" data-cap="'+i+'">'+c.e+' '+(i+1)+'. '+c.n+' <small>('+c.lugar+')</small></button>';}).join('')+'</div>'+
  '<svg role="img" viewBox="0 0 680 400" aria-label="Animación de la respiración celular: glucólisis, ciclo de Krebs, cadena respiratoria y fermentación" style="width:100%;height:auto;display:block;border-radius:14px"></svg>'+
  '<div class="rc-puntos"></div><div class="rc-info" aria-live="polite"><div class="rc-num"></div><h4></h4><p></p></div>'+
  '<div class="ctrl rc-ctrl"><button type="button" class="cn-btn" data-d="ant">⏮ Anterior</button><button type="button" class="cn-btn cn-btn--primary" data-d="play">▶ Reproducir todo</button><button type="button" class="cn-btn" data-d="sig">Siguiente paso ⏭</button><button type="button" class="cn-btn" data-d="reini">🔄 Desde el inicio</button></div>';
var S=raiz.querySelector('svg'),PUN=raiz.querySelector('.rc-puntos'),bPlay=raiz.querySelector('[data-d=play]');
PUN.innerHTML=PASOS.map(function(p,i){return '<button type="button" class="rc-pt c'+p[0]+'" data-p="'+i+'" aria-label="Paso '+(i+1)+': '+p[3]+'"></button>';}).join('');

var si=0,u=1,corre=false,todo=false,vis=true,bucle=false,ult=null,espera=null;
function dibujar(){
  var P=PASOS[si],cap=CAPS[P[0]];
  S.innerHTML=escena(P[0],si,u);
  var enCap=PASOS.filter(function(q){return q[0]===P[0];}).length,k=PASOS.slice(0,si+1).filter(function(q){return q[0]===P[0];}).length;
  raiz.querySelector('.rc-num').innerHTML=cap.e+' '+cap.n+' · paso '+k+' de '+enCap+'  ('+(si+1)+' de '+PASOS.length+' en total)';
  raiz.querySelector('.rc-info h4').innerHTML=P[3];raiz.querySelector('.rc-info p').innerHTML=P[4];
  raiz.querySelectorAll('[data-cap]').forEach(function(b){b.classList.toggle('on',+b.getAttribute('data-cap')===P[0]);});
  PUN.querySelectorAll('.rc-pt').forEach(function(b,i){b.classList.toggle('on',i===si);b.classList.toggle('visto',i<si);});
  raiz.querySelector('[data-d=ant]').disabled=si===0;raiz.querySelector('[data-d=sig]').disabled=si===PASOS.length-1&&u>=1;
  bPlay.innerHTML=corre&&todo?'⏸ Pausa':'▶ Reproducir todo';
  if(si===PASOS.length-1&&u>=1&&window.BIO&&BIO.marcarSeccion)BIO.marcarSeccion('energia');
}
function cuadro(ts){
  if(!corre||!vis){bucle=false;ult=null;return;}
  if(ult!==null)u=Math.min(1,u+Math.min(100,ts-ult)/PASOS[si][2]);
  ult=ts;dibujar();
  if(u>=1){bucle=false;ult=null;
    if(todo&&si<PASOS.length-1){espera=setTimeout(function(){espera=null;if(corre&&todo){si++;u=0;arrancar();}},1600);}
    else{corre=false;todo=false;dibujar();}
    return;}
  requestAnimationFrame(cuadro);
}
function arrancar(){if(QUIETO){u=1;dibujar();if(todo&&si<PASOS.length-1){espera=setTimeout(function(){if(corre&&todo){si++;arrancar();}},4000);}else{corre=false;todo=false;dibujar();}return;}
  if(!bucle&&corre&&vis){bucle=true;ult=null;requestAnimationFrame(cuadro);}}
function parar(){corre=false;todo=false;if(espera){clearTimeout(espera);espera=null;}}
function ir(i,auto){parar();si=Math.max(0,Math.min(PASOS.length-1,i));u=0;corre=true;todo=!!auto;dibujar();arrancar();}
bPlay.onclick=function(){if(corre&&todo){parar();dibujar();return;}
  if(espera){clearTimeout(espera);espera=null;}
  if(si===PASOS.length-1&&u>=1){ir(0,true);return;}
  if(u>=1){ir(si+1,true);return;}
  corre=true;todo=true;dibujar();arrancar();};
raiz.querySelector('[data-d=sig]').onclick=function(){if(!corre&&u<1){corre=true;todo=false;dibujar();arrancar();}else ir(si+1,false);};
raiz.querySelector('[data-d=ant]').onclick=function(){ir(si-1,false);};
raiz.querySelector('[data-d=reini]').onclick=function(){ir(0,true);};
raiz.querySelectorAll('[data-cap]').forEach(function(b){b.onclick=function(){var c=+b.getAttribute('data-cap');for(var i=0;i<PASOS.length;i++)if(PASOS[i][0]===c){ir(i,false);break;}};});
PUN.querySelectorAll('.rc-pt').forEach(function(b){b.onclick=function(){ir(+b.getAttribute('data-p'),false);};});
if('IntersectionObserver' in window){vis=false;new IntersectionObserver(function(e){vis=e[0].isIntersecting;arrancar();}).observe(raiz);}
raiz._ir=function(i,uu){parar();si=i;u=uu;dibujar();};
dibujar();
})();
