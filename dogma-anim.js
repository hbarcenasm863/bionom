/* dogma-anim.js — Del gen a la proteína, paso a paso: replicación, transcripción
   (con procesamiento y salida por el poro nuclear) y traducción en el ribosoma.
   Dibujo propio inspirado en los esquemas del NHGRI (National Human Genome
   Research Institute). Uso: <div id="dg-anim"></div> y este archivo después.
   Secuencia: inicio del gen de la beta-globina, con un intrón corto (simplificado). */
(function(){
var raiz=document.getElementById('dg-anim');if(!raiz)return;
var COMP={A:'T',T:'A',C:'G',G:'C'},ANTI={A:'U',U:'A',G:'C',C:'G'};
var CODIF='ATGGTGCAT'+'GTATAG'+'CTGACTCCTGAGGAGAAGTAA'; // 36 bases; el intrón va de la 9 a la 14
var I0=9,I1=15,NB=CODIF.length;
var MOLDE=CODIF.split('').map(function(b){return COMP[b];}).join('');
var PRE=CODIF.replace(/T/g,'U'),ARN=PRE.slice(0,I0)+PRE.slice(I1); // ARNm maduro: 30 bases
var COD=[];for(var i=0;i<ARN.length;i+=3)COD.push(ARN.substr(i,3));
var NUM=COD.length; // 10 codones; el último (UAA) es de parada
var AA={AUG:['Met','#2e7d4f'],GUG:['Val','#1774a6'],CAU:['His','#7b4bb7'],CUG:['Leu','#c2410c'],ACU:['Thr','#0e7490'],CCU:['Pro','#a16207'],GAG:['Glu','#be123c'],AAG:['Lys','#4338ca']};
var BC={A:'#d13438',T:'#2a74b0',U:'#8e44ad',C:'#f0a020',G:'#23804a'};
var VIEJA='#1e3a8a',NUEVA='#16a34a',ARNC='#f97316';
var QUIETO=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

function L(a,b,t){return a+(b-a)*t;}
function cl(t){return Math.max(0,Math.min(1,t));}
function suave(t){t=cl(t);return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function tramo(u,a,b){return suave((u-a)/(b-a));}
function T(x,y,t,o){o=o||{};return '<text x="'+(+x).toFixed(1)+'" y="'+(+y).toFixed(1)+'" text-anchor="'+(o.a||'middle')+'" font-size="'+(o.s||13)+'" font-weight="'+(o.w||700)+'" fill="'+(o.c||'#1e293b')+'"'+(o.op!=null?' opacity="'+(+o.op).toFixed(2)+'"':'')+' font-family="Outfit,system-ui,sans-serif">'+t+'</text>';}
function caja(x,y,l,o){o=o||{};var w=o.w||14,h=o.h||16;
  return '<g'+(o.op!=null?' opacity="'+(+o.op).toFixed(2)+'"':'')+'><rect x="'+(x-w/2).toFixed(1)+'" y="'+(y-h/2).toFixed(1)+'" width="'+w+'" height="'+h+'" rx="3" fill="'+BC[l]+'"'+
    (o.nueva?' stroke="#bbf7d0" stroke-width="2"':o.intron?' stroke="#334155" stroke-width="1.6" stroke-dasharray="2 2"':'')+'/>'+T(x,y+4,l,{s:o.s||10.5,c:l==='C'?'#1b1300':'#fff'})+'</g>';}
function linea(pts,col,w,op){if(pts.length<2)return '';return '<polyline points="'+pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ')+'" fill="none" stroke="'+col+'" stroke-width="'+(w||4)+'" stroke-linecap="round" stroke-linejoin="round"'+(op!=null?' opacity="'+op.toFixed(2)+'"':'')+'/>';}
function puente(x,y1,y2,op){return op>0?'<line x1="'+x+'" y1="'+y1+'" x2="'+x+'" y2="'+y2+'" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2" opacity="'+op.toFixed(2)+'"/>':'';}
var SX=17;function X(i){return 34+i*SX;}

/* ═════════ 1. Replicación ═════════ */
function replicacion(paso,u){
  var o='<rect x="0" y="0" width="680" height="440" fill="#f5f1fc"/>'+T(664,372,'Núcleo',{a:'end',s:14,c:'#6d28d9'});
  var ab=function(){return 0;},n=0,dy1=0,dy2=0,op=1,hx=null;
  if(paso===0)op=u;
  if(paso===1){hx=L(0,670,u);ab=function(i){return cl((hx-X(i))/80);};}
  if(paso>=2)ab=function(){return 1;};
  if(paso===2)n=Math.round(L(0,NB,tramo(u,.12,1)));
  if(paso===3){n=NB;dy1=-16*suave(u);dy2=16*suave(u);}
  var yT=[],yB=[];for(var i=0;i<NB;i++){var a=suave(ab(i));yT.push(L(200,145,a));yB.push(L(244,299,a));}
  o+='<g opacity="'+op.toFixed(2)+'">';
  // puentes entre las cadenas viejas mientras siguen unidas
  for(i=0;i<NB;i++){var a2=ab(i);o+=puente(X(i),yT[i]+8,yB[i]-8,1-a2/.35);}
  // cadenas nuevas (verdes) y sus puentes con las viejas
  for(i=0;i<n;i++){o+=puente(X(i),145+dy1+8,189+dy1-8,1)+puente(X(i),255+dy2+8,299+dy2-8,1);}
  if(n>0){var p1=[],p2=[];for(i=0;i<n;i++){p1.push([X(i),201+dy1]);p2.push([X(i),243+dy2]);}
    o+=linea(p1,NUEVA,4)+linea(p2,NUEVA,4);
    for(i=0;i<n;i++)o+=caja(X(i),189+dy1,MOLDE[i],{nueva:1})+caja(X(i),255+dy2,CODIF[i],{nueva:1});}
  // cadenas viejas (azul oscuro)
  var q1=[],q2=[];for(i=0;i<NB;i++){q1.push([X(i),yT[i]-12+(paso>=2?dy1:0)]);q2.push([X(i),yB[i]+12+(paso>=2?dy2:0)]);}
  o+=linea(q1,VIEJA,4)+linea(q2,VIEJA,4);
  for(i=0;i<NB;i++)o+=caja(X(i),yT[i]+(paso>=2?dy1:0),CODIF[i])+caja(X(i),yB[i]+(paso>=2?dy2:0),MOLDE[i]);
  o+='</g>';
  if(paso<=1){o+=T(34,176,'cadena 1',{a:'start',s:12,c:VIEJA,op:op})+T(34,276,'cadena 2',{a:'start',s:12,c:VIEJA,op:op});
    if(paso===0)o+=T(646,140,'A con T · C con G',{a:'end',s:13,c:'#334155',op:op});}
  if(hx!==null&&hx<660){var ym=222;
    o+='<path d="M'+(hx-16)+' '+(ym-34)+' Q'+(hx+26)+' '+ym+' '+(hx-16)+' '+(ym+34)+' Q'+(hx-4)+' '+ym+' '+(hx-16)+' '+(ym-34)+' Z" fill="#7c3aed" opacity=".85"/>'+T(hx,345,'helicasa',{s:13,c:'#6d28d9'});}
  if(paso===2&&n<NB){var px=X(Math.max(0,n-1))+10;
    o+='<ellipse cx="'+px+'" cy="167" rx="17" ry="12" fill="#fb923c" opacity=".85"/><ellipse cx="'+px+'" cy="277" rx="17" ry="12" fill="#fb923c" opacity=".85"/>'+T(px,118,'ADN polimerasa',{s:12,c:'#c2410c'});
    if(u<.3)o+=T(X(0)+30,348,'la primasa pone un cebador para empezar',{a:'start',s:12,c:'#be185d'});}
  if(paso===3){o+=T(646,145+dy1-24,'Molécula 1',{a:'end',s:13,c:'#334155',op:u})+T(646,299+dy2+34,'Molécula 2',{a:'end',s:13,c:'#334155',op:u});
    o+='<g opacity="'+u.toFixed(2)+'"><line x1="34" y1="350" x2="60" y2="350" stroke="'+VIEJA+'" stroke-width="5"/>'+T(66,355,'cadena vieja',{a:'start',s:12,c:VIEJA})+'<line x1="170" y1="350" x2="196" y2="350" stroke="'+NUEVA+'" stroke-width="5"/>'+T(202,355,'cadena nueva',{a:'start',s:12,c:'#15803d'})+'</g>';}
  return o;
}

/* ═════════ 2. Transcripción ═════════ */
var YT=232,YB=276,YR=160,ENV=338,PORO=340;
function fondo2(){
  var o='<rect x="0" y="0" width="680" height="'+ENV+'" fill="#f5f1fc"/><rect x="0" y="'+ENV+'" width="680" height="120" fill="#eef8f2"/>';
  o+='<line x1="0" y1="'+(ENV-4)+'" x2="'+(PORO-18)+'" y2="'+(ENV-4)+'" stroke="#a78bfa" stroke-width="4"/><line x1="0" y1="'+(ENV+4)+'" x2="'+(PORO-18)+'" y2="'+(ENV+4)+'" stroke="#a78bfa" stroke-width="4"/>';
  o+='<line x1="'+(PORO+18)+'" y1="'+(ENV-4)+'" x2="680" y2="'+(ENV-4)+'" stroke="#a78bfa" stroke-width="4"/><line x1="'+(PORO+18)+'" y1="'+(ENV+4)+'" x2="680" y2="'+(ENV+4)+'" stroke="#a78bfa" stroke-width="4"/>';
  o+=T(PORO+24,ENV+22,'poro nuclear',{a:'start',s:11,c:'#6d28d9'})+T(664,ENV-12,'Núcleo',{a:'end',s:14,c:'#6d28d9'})+T(16,ENV+30,'Citoplasma',{a:'start',s:14,c:'#15803d'});
  return o;
}
function adn2(px,abre,op){ // ADN del gen; se abre cerca de la polimerasa
  var o='<g opacity="'+(op==null?1:op).toFixed(2)+'">',yt=[],yb=[],i;
  for(i=0;i<NB;i++){var d=px==null?99:X(i)-px,a=abre*(d>-36&&d<28?1:d>-50&&d<=-36?(d+50)/14:d>=28&&d<40?(40-d)/12:0);yt.push(YT-16*a);yb.push(YB+16*a);o+=puente(X(i),yt[i]+8,yb[i]-8,1-a/.35);}
  o+=linea(yt.map(function(y,i){return [X(i),y-12];}),VIEJA,4)+linea(yb.map(function(y,i){return [X(i),y+12];}),VIEJA,4);
  for(i=0;i<NB;i++)o+=caja(X(i),yt[i],CODIF[i])+caja(X(i),yb[i],MOLDE[i]);
  o+=T(34,YT-28,'cadena codificante',{a:'start',s:12,c:VIEJA})+T(34,YB+36,'cadena molde (la que se lee)',{a:'start',s:12,c:VIEJA});
  o+='<path d="M'+(X(I0)-8)+' '+(YB+24)+' L'+(X(I0)-8)+' '+(YB+30)+' L'+(X(I1-1)+8)+' '+(YB+30)+' L'+(X(I1-1)+8)+' '+(YB+24)+'" fill="none" stroke="#64748b" stroke-width="1.5"/>'+T((X(I0)+X(I1-1))/2,YB+44,'intrón',{s:11,c:'#475569'});
  return o+'</g>';
}
function polimerasa(px,op){return '<g opacity="'+op.toFixed(2)+'"><ellipse cx="'+px+'" cy="'+((YT+YB)/2)+'" rx="44" ry="50" fill="#60a5fa" fill-opacity=".35" stroke="#3b82f6" stroke-width="2"/>'+T(Math.max(px,60),YT-62,'ARN polimerasa',{s:12,c:'#1d4ed8'})+'</g>';}
function filaARN(items,y){ // items: [{x,y,l,op,intron}]
  var o=linea(items.filter(function(b){return b.op>.5;}).map(function(b){return [b.x,(b.y||y)-12];}),ARNC,4);
  items.forEach(function(b){o+=caja(b.x,b.y||y,b.l,{op:b.op,intron:b.intron});});return o;
}
function capuchon(x,y,op){return '<g opacity="'+op.toFixed(2)+'"><path d="M'+(x-8)+' '+(y+8)+' L'+(x-8)+' '+(y-4)+' Q'+x+' '+(y-14)+' '+(x+8)+' '+(y-4)+' L'+(x+8)+' '+(y+8)+' Z" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/></g>';}
function transcripcion(paso,u){
  var o=fondo2(),i,items=[];
  if(paso===0){var px=L(-60,44,suave(u));o+=adn2(px,suave(u))+polimerasa(px,cl(u*2));
    o+=T(646,YT-28,'un gen (inicio de la beta-globina)',{a:'end',s:12,c:'#0f766e',op:u});}
  if(paso===1){var px1=L(44,656,u),n=0;for(i=0;i<NB;i++)if(X(i)<px1-6)n=i+1;
    o+=adn2(px1,1);
    for(i=0;i<n;i++){var dentro=X(i)>px1-36;items.push({x:X(i),y:dentro?(YT+YB)/2:YR,l:PRE[i],op:1,intron:i>=I0&&i<I1});}
    var afuera=items.filter(function(b){return b.y===YR;}),adentro=items.filter(function(b){return b.y!==YR;});
    o+=filaARN(afuera,YR);adentro.forEach(function(b){o+=caja(b.x,b.y,b.l,{intron:b.intron});});
    if(afuera.length&&adentro.length){var ul=afuera[afuera.length-1];o+='<path d="M'+(ul.x+7)+' '+(YR-12)+' Q'+(px1-20)+' '+(YR-10)+' '+(adentro[0].x-7)+' '+((YT+YB)/2-6)+'" fill="none" stroke="'+ARNC+'" stroke-width="4"/>';}
    o+=polimerasa(px1,1);
    if(n>0){var k=n-1;o+=T(646,YR-30,'frente a '+MOLDE[k]+' pone '+PRE[k],{a:'end',s:13,c:'#7c2d12'});}}
  if(paso>=2){var pre=paso===2;
    if(pre){var px2=L(656,780,suave(u));o+=adn2(px2,1-suave(u))+polimerasa(px2,1-u);}
    else o+=adn2(null,0,paso===4?L(1,.3,tramo(u,0,.25)):1);
    if(paso===2){for(i=0;i<NB;i++)items.push({x:X(i),l:PRE[i],op:1,intron:i>=I0&&i<I1});o+=filaARN(items,YR);
      o+=T(34,YR-30,'ARNm inmaduro (pre-ARNm)',{a:'start',s:13,c:'#c2410c',op:u});
      o+=T((X(0)+X(I0-1))/2,YR+26,'exón',{s:11,c:'#475569',op:u})+T((X(I0)+X(I1-1))/2,YR+26,'intrón',{s:11,c:'#475569',op:u})+T((X(I1)+X(NB-1))/2,YR+26,'exón',{s:11,c:'#475569',op:u});}
    if(paso===3){var a=tramo(u,0,.4),b=tramo(u,.35,.7),c=tramo(u,.65,.85),d=tramo(u,.8,1);
      for(i=0;i<NB;i++){if(i>=I0&&i<I1)items.push({x:X(i),y:YR-45*a,l:PRE[i],op:1-a,intron:1});else items.push({x:i>=I1?X(i)-(I1-I0)*SX*b:X(i),l:PRE[i],op:1});}
      for(i=0;i<4;i++)items.push({x:X(30+i),l:'A',op:d});
      o+=filaARN(items,YR)+capuchon(X(-1),YR,c);
      if(a>0&&a<1)o+=T((X(I0)+X(I1-1))/2,YR-62,'se corta el intrón',{s:12,c:'#475569',op:1-a});
      if(c>0)o+=T(X(-1)-6,YR-28,'capuchón',{a:'start',s:11,c:'#b45309',op:c});
      if(d>0)o+=T(X(31.5),YR-28,'cola poli-A',{s:11,c:'#b45309',op:d});
      if(u>.7)o+=T(34+180,YR+34,'ARNm maduro: solo exones',{a:'start',s:13,c:'#c2410c',op:tramo(u,.7,.9)});}
    if(paso===4){var a4=tramo(u,0,.25),c4=tramo(u,.75,1);
      for(i=-1;i<34;i++){var k=i+1,s0=suave(cl((u-k/35*.55)/.45)),x,y,x0=X(i);
        if(s0<.5){var q=s0/.5;x=L(x0,PORO,q);y=L(YR,ENV,q);}else{var q2=(s0-.5)/.5;x=L(PORO,x0,q2);y=L(ENV,ENV+48,q2);}
        if(i<0)o+=capuchon(x,y,1);else items.push({x:x,y:y,l:i<30?ARN[i]:'A',op:1});}
      o+=filaARN(items,0);
      o+=T(646,ENV+70,'ARN mensajero (ARNm)',{a:'end',s:14,c:'#c2410c',op:c4})+T(646,YT-50,'el ADN se queda en el núcleo',{a:'end',s:12,c:VIEJA,op:a4});}
  }
  return o;
}

/* ═════════ 3. Traducción ═════════ */
var PX=300,CW=66,LW=20,MY=330,TY=MY-8;
function xCod(i,corr){return PX+(i-corr)*CW;}
function arnt(x,y,cod,op,conAA,etq){
  if(op<=0)return '';
  var o='<g opacity="'+op.toFixed(2)+'" transform="translate('+x.toFixed(1)+','+y.toFixed(1)+')">';
  o+='<path d="M-13 -8 L-13 -40 Q-28 -44 -28 -58 Q-28 -74 -15 -72 Q-14 -90 0 -90 Q14 -90 15 -72 Q28 -74 28 -58 Q28 -44 13 -40 L13 -8 Q0 2 -13 -8 Z" fill="#9ed3f0" stroke="#3b8fc2" stroke-width="2"/>';
  o+='<path d="M-5 -16 L-5 -68 M5 -16 L5 -68" stroke="#5aaad8" stroke-width="2" stroke-dasharray="3 3"/><line x1="10" y1="-90" x2="10" y2="-106" stroke="#3b8fc2" stroke-width="3"/>'+T(0,-52,'ARNt',{s:10,c:'#0c4a6e'});
  for(var k=0;k<3;k++){var b=ANTI[cod[k]];o+=caja((k-1)*LW,1,b,{h:16,s:11});}
  if(conAA){var a=AA[cod];o+='<circle cx="10" cy="-116" r="13" fill="'+a[1]+'" stroke="#fff" stroke-width="2"/>'+T(10,-112,a[0],{s:10,c:'#fff'});}
  if(etq)o+=etq.izq?T(-40,-30,etq.t,{s:12,c:'#0c4a6e',a:'end'}):T(0,-138,etq,{s:12,c:'#0c4a6e'});
  return o+'</g>';
}
function posCadena(n,x,y){var p=[];for(var j=0;j<n;j++){var k=n-1-j;p.push(k<5?[x+(k%2?-14:0)+k*2,y-k*19]:[x+8-(k-4)*25,y-4*19-24-(k%2?8:0)]);}return p;}
function dibCadena(p,op,rot){
  var o='';for(var j=1;j<p.length;j++)o+='<line x1="'+p[j-1][0].toFixed(1)+'" y1="'+p[j-1][1].toFixed(1)+'" x2="'+p[j][0].toFixed(1)+'" y2="'+p[j][1].toFixed(1)+'" stroke="#475569" stroke-width="3"/>';
  for(j=0;j<p.length;j++){var a=AA[COD[j]];o+='<circle cx="'+p[j][0].toFixed(1)+'" cy="'+p[j][1].toFixed(1)+'" r="13" fill="'+a[1]+'" stroke="#fff" stroke-width="2"/>'+T(p[j][0],p[j][1]+4,a[0],{s:10,c:'#fff'});}
  if(rot&&p.length>=2)o+=T(p[0][0],p[0][1]-20,rot,{s:12,c:'#334155'});
  return '<g opacity="'+(op==null?1:op).toFixed(2)+'">'+o+'</g>';
}
function cadena(n,x,y,op){return n>0?dibCadena(posCadena(n,x,y),op,'cadena de aminoácidos'):'';}
function arnm3(corr,op){
  var o='<g opacity="'+(op==null?1:op).toFixed(2)+'"><line x1="0" y1="'+(MY+31)+'" x2="680" y2="'+(MY+31)+'" stroke="'+ARNC+'" stroke-width="5" stroke-linecap="round"/>';
  for(var i=0;i<NUM;i++){var cx=xCod(i,corr);if(cx<-40||cx>720)continue;
    for(var k=0;k<3;k++)o+=caja(cx+(k-1)*LW,MY+17,COD[i][k],{h:17,s:11});
    o+='<rect x="'+(cx-CW/2+2)+'" y="'+(MY+5)+'" width="'+(CW-4)+'" height="23" rx="5" fill="none" stroke="#94a3b8" stroke-width="1"/>';}
  return o+'</g>';
}
function grande(cy,op){return '<ellipse cx="'+(PX+CW/2)+'" cy="'+cy.toFixed(1)+'" rx="165" ry="112" fill="#cfe7f7" fill-opacity=".55" stroke="#7fb3d5" stroke-width="2" opacity="'+op.toFixed(2)+'"/>';}
function pequena(cy,op){return '<ellipse cx="'+(PX+CW/2)+'" cy="'+cy.toFixed(1)+'" rx="140" ry="36" fill="#cfe7f7" fill-opacity=".7" stroke="#7fb3d5" stroke-width="2" opacity="'+op.toFixed(2)+'"/>';}
function sitios(op){if(op<=0)return '';
  return '<g opacity="'+op.toFixed(2)+'"><rect x="'+(PX-CW/2)+'" y="'+(MY+4)+'" width="'+CW+'" height="25" rx="6" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="4 3"/><rect x="'+(PX+CW/2)+'" y="'+(MY+4)+'" width="'+CW+'" height="25" rx="6" fill="none" stroke="#b91c1c" stroke-width="2" stroke-dasharray="4 3"/>'+
    T(PX,MY+52,'sitio P',{s:11,c:'#0f766e'})+T(PX+CW,MY+52,'sitio A',{s:11,c:'#b91c1c'})+'</g>';}
function fondo3(){return '<rect x="0" y="0" width="680" height="440" fill="#f1f8f4"/>'+T(VX+14,72,'Citoplasma',{a:'start',s:14,c:'#15803d'})+T(VX+14,MY+52,'ARNm',{a:'start',s:13,c:'#c2410c'});}
function ciclo(c,u){ // el codón c entra al sitio A
  var o='',llega=tramo(u,0,.35),pasa=tramo(u,.35,.6),avanza=tramo(u,.6,1),corr=c-1+avanza;
  var xP=xCod(c-1,corr),xA=xCod(c,corr);
  o+=grande(236,1)+pequena(368,1)+sitios(1-avanza*.6)+arnm3(corr);
  o+=arnt(xP-Math.max(0,avanza-.35)*40,TY-Math.max(0,(avanza-.35)/.65)*150,COD[c-1],1-Math.max(0,(avanza-.55)/.45),false,avanza>.45?{izq:1,t:'ARNt vacío sale'}:'');
  o+=arnt(L(xA+190,xA,llega),L(TY-150,TY,llega),COD[c],1,!(pasa>=1),llega<1?'ARNt que llega':'');
  var pPx=xP+10,pPy=TY-116,pAx=xA-2,pAy=TY-135;
  o+=pasa<1?cadena(c,L(pPx,pAx,pasa),L(pPy,pAy,pasa)):cadena(c+1,xA+10,TY-116);
  if(pasa>0&&pasa<1)o+=T(xA+40,TY-110,'enlace peptídico',{a:'start',s:12,c:'#7c2d12'});
  return o;
}
var FIN_X=xCod(NUM-2,NUM-2)+10+150,FIN_Y=TY-116+10;
function traduccion(paso,u){
  var o=fondo3();
  if(paso===0){var a=tramo(u,0,.3),b=tramo(u,.28,.7),c=tramo(u,.65,1);
    o+=grande(L(40,236,c),c)+pequena(L(440,368,a),a)+sitios(c)+arnm3(0);
    o+=arnt(L(xCod(0,0)-200,xCod(0,0),b),L(TY-170,TY,b),COD[0],b>0?1:0,true,b<1?'ARNt con metionina':'');
    o+=T(PX,MY+72,'codón de inicio AUG',{s:12,c:'#b91c1c',op:a});
    if(a>0&&c<.5)o+=T(PX+CW/2+150,410,'subunidad pequeña',{a:'end',s:12,c:'#3b82a6',op:a});
    if(c>0)o+=T(PX+CW/2+170,150,'subunidad grande',{a:'start',s:12,c:'#3b82a6',op:c});}
  if(paso===1)o+=ciclo(1,u*.35);
  if(paso===2)o+=ciclo(1,.35+u*.25);
  if(paso===3)o+=ciclo(1,.6+u*.4);
  if(paso===4){var cc=Math.min(8.9999,2+u*7);o+=ciclo(Math.floor(cc),cc-Math.floor(cc));}
  if(paso===5){var corr=NUM-2,suelta=tramo(u,.3,.75),sep=tramo(u,.55,1),xP2=xCod(NUM-2,corr),xA2=xCod(NUM-1,corr);
    o+=grande(236-sep*60,1-sep*.5)+pequena(368+sep*30,1-sep*.5)+sitios(1-sep)+arnm3(corr,1-sep*.4);
    o+=arnt(xP2,TY-suelta*60,COD[NUM-2],1-suelta,false,'');
    o+=cadena(NUM-1,xP2+10+suelta*150,TY-116+suelta*10);
    o+='<g opacity="'+(1-sep).toFixed(2)+'"><rect x="'+(xA2-20)+'" y="'+(TY-58)+'" width="40" height="52" rx="10" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>'+T(xA2,TY-36,'factor',{s:9,c:'#334155'})+T(xA2,TY-24,'de',{s:9,c:'#334155'})+T(xA2,TY-12,'liberación',{s:9,c:'#334155'})+'</g>';
    o+=T(xA2,MY+72,'codón de parada UAA',{s:12,c:'#b91c1c',op:1-sep});}
  if(paso===6){var f=suave(u),p0=posCadena(NUM-1,FIN_X,FIN_Y),cx=470,cy=190,p=[];
    for(var j=0;j<p0.length;j++){var ang=j*2.3,r=j?18+j*3.2:0;p.push([L(p0[j][0],cx+r*Math.cos(ang),f),L(p0[j][1],cy+r*Math.sin(ang),f)]);}
    o+=arnm3(NUM-2,.35)+dibCadena(p,1,f<.5?'cadena de aminoácidos':'');
    o+=T(cx,cy+70,'proteína plegada',{s:15,c:'#14532d',op:tramo(u,.5,.8)})+T(cx,cy+90,'(inicio de la beta-globina de la hemoglobina)',{s:12,c:'#334155',op:tramo(u,.6,.9)});}
  return o;
}

/* ═════════ Pasos ═════════ */
var CAPS=[{n:'Replicación',e:'🧬',lugar:'núcleo',f:replicacion,vb:[0,78,680,302]},{n:'Transcripción',e:'📝',lugar:'núcleo',f:transcripcion,vb:[0,95,680,330]},{n:'Traducción',e:'🔧',lugar:'citoplasma',f:traduccion,vb:[0,50,680,375]}];
var PASOS=[
 [0,0,2500,'El ADN: dos cadenas unidas','El ADN está en el núcleo. Tiene dos cadenas unidas por sus bases, que siempre se emparejan igual: <b>A con T</b> y <b>C con G</b>. Antes de que la célula se divida, el ADN se copia completo: eso es la <b>replicación</b>.'],
 [0,1,4500,'La helicasa abre el ADN','La enzima <b>helicasa</b> avanza como un cierre que se abre: rompe los puentes de hidrógeno entre las bases y separa las dos cadenas. Cada cadena va a servir de <b>molde</b>.'],
 [0,2,6500,'La ADN polimerasa copia cada cadena','La <b>primasa</b> pone un cebador corto para empezar. Luego la <b>ADN polimerasa</b> recorre cada cadena vieja y le pone enfrente el nucleótido que le corresponde: A frente a T y C frente a G. Las cadenas nuevas se ven en verde. (Una de ellas se copia por pedazos, los fragmentos de Okazaki.)'],
 [0,3,2600,'Dos moléculas iguales','Resultan <b>dos moléculas de ADN idénticas</b>. Cada una tiene una cadena vieja (azul) y una nueva (verde): por eso la replicación es <b>semiconservativa</b>. Una molécula va para cada célula hija.'],
 [1,0,3000,'La ARN polimerasa llega al gen','Para fabricar una proteína no se copia todo el ADN: solo <b>un gen</b>. La <b>ARN polimerasa</b> se pega al inicio del gen (el promotor). De las dos cadenas, solo se lee una: la <b>cadena molde</b>.'],
 [1,1,8000,'Copia la cadena molde en ARN','La ARN polimerasa abre un tramo pequeño del ADN y avanza. Frente a cada base de la cadena molde pone la base de ARN que le corresponde: frente a C pone G, frente a G pone C, frente a T pone A y <b>frente a A pone U</b>, porque el ARN no tiene T sino <b>U (uracilo)</b>.'],
 [1,2,2600,'Se suelta el ARN mensajero inmaduro','Al final del gen la polimerasa se suelta y el ADN se vuelve a cerrar. El ARN copiado tiene la misma secuencia que la cadena codificante, pero con U en vez de T. Todavía está <b>inmaduro</b>: tiene partes que no se traducen, los <b>intrones</b>.'],
 [1,3,5000,'Procesamiento del ARNm','Antes de salir del núcleo, el ARNm se arregla: se <b>cortan los intrones</b> y se unen los <b>exones</b>; además recibe un <b>capuchón</b> al inicio y una <b>cola de muchas A</b> (poli-A) al final, que lo protegen y le ayudan a llegar al ribosoma.'],
 [1,4,4800,'El ARNm sale por un poro nuclear','El ARNm maduro sale del núcleo por un <b>poro nuclear</b> y llega al <b>citoplasma</b>, donde están los ribosomas. El ADN se queda guardado en el núcleo: el ARNm es la copia que viaja.'],
 [2,0,4200,'El ribosoma se arma sobre el ARNm','La <b>subunidad pequeña</b> del ribosoma se pega al ARNm y busca el <b>codón de inicio AUG</b>. Llega el primer <b>ARN de transferencia</b>, con el anticodón UAC y el aminoácido <b>metionina (Met)</b>. Luego se acopla la <b>subunidad grande</b>.'],
 [2,1,2800,'Llega el segundo ARNt','Al <b>sitio A</b> llega un ARNt con el anticodón <b>CAC</b>, que encaja con el codón <b>GUG</b>. Trae el aminoácido <b>valina (Val)</b>. Cada ARNt carga un aminoácido según su anticodón.'],
 [2,2,2400,'Enlace peptídico','El ribosoma une la metionina con la valina mediante un <b>enlace peptídico</b>. La cadena pasa al ARNt del sitio A, y el ARNt del <b>sitio P</b> queda vacío.'],
 [2,3,2800,'El ribosoma avanza un codón','El ribosoma se corre <b>tres letras</b> sobre el ARNm. El ARNt vacío sale para cargar otro aminoácido, y el sitio A queda libre para el siguiente codón.'],
 [2,4,17000,'Se repite codón por codón','El ciclo se repite: llega un ARNt, se forma el enlace peptídico y el ribosoma avanza. Así se agregan histidina, leucina, treonina, prolina, glutamato, glutamato y lisina.'],
 [2,5,4200,'Codón de parada','Al llegar al codón <b>UAA</b> no hay ARNt que encaje. Entra un <b>factor de liberación</b>, la cadena se suelta y las dos subunidades del ribosoma se separan. El ARNm puede leerse otra vez.'],
 [2,6,3200,'La proteína se pliega','La cadena de aminoácidos se dobla y toma una forma propia: así se vuelve una <b>proteína</b> que funciona. Esta es el inicio de la <b>beta-globina</b>, una parte de la hemoglobina que lleva el oxígeno en la sangre.']
];

raiz.innerHTML='<div class="dg-caps">'+CAPS.map(function(c,i){return '<button type="button" class="chip" data-cap="'+i+'">'+c.e+' '+(i+1)+'. '+c.n+' <small>('+c.lugar+')</small></button>';}).join('')+'</div>'+
  '<svg role="img" aria-label="Animación del ADN a la proteína: replicación, transcripción y traducción" style="width:100%;height:auto;display:block;border-radius:14px"></svg>'+
  '<div class="dg-puntos"></div><div class="dg-info" aria-live="polite"><div class="dg-num"></div><h4></h4><p></p></div>'+
  '<div class="ctrl dg-ctrl"><button type="button" class="cn-btn" data-d="ant">⏮ Anterior</button><button type="button" class="cn-btn cn-btn--primary" data-d="play">▶ Reproducir todo</button><button type="button" class="cn-btn" data-d="sig">Siguiente paso ⏭</button><button type="button" class="cn-btn" data-d="reini">🔄 Desde el inicio</button></div>';
var S=raiz.querySelector('svg'),PUN=raiz.querySelector('.dg-puntos'),bPlay=raiz.querySelector('[data-d=play]');
PUN.innerHTML=PASOS.map(function(p,i){return '<button type="button" class="dg-pt c'+p[0]+'" data-p="'+i+'" aria-label="Paso '+(i+1)+': '+p[3]+'"></button>';}).join('');

var si=0,u=1,corre=false,todo=false,vis=true,bucle=false,ult=null,espera=null,VX=0;
function dibujar(){
  var P=PASOS[si],cap=CAPS[P[0]],vb=cap.vb.slice();
  var ang=raiz.clientWidth&&raiz.clientWidth<560;VX=0;
  if(P[0]===2&&ang){VX=140;vb[0]=140;vb[2]=440;}
  S.setAttribute('viewBox',vb.join(' '));
  S.innerHTML=cap.f(P[1],u);
  var enCap=PASOS.filter(function(q){return q[0]===P[0];}).length,k=PASOS.slice(0,si+1).filter(function(q){return q[0]===P[0];}).length;
  raiz.querySelector('.dg-num').textContent=cap.e+' '+cap.n+' · paso '+k+' de '+enCap+'  ('+(si+1)+' de '+PASOS.length+' en total)';
  raiz.querySelector('.dg-info h4').innerHTML=P[3];raiz.querySelector('.dg-info p').innerHTML=P[4];
  raiz.querySelectorAll('[data-cap]').forEach(function(b){b.classList.toggle('on',+b.getAttribute('data-cap')===P[0]);});
  PUN.querySelectorAll('.dg-pt').forEach(function(b,i){b.classList.toggle('on',i===si);b.classList.toggle('visto',i<si);});
  raiz.querySelector('[data-d=ant]').disabled=si===0;raiz.querySelector('[data-d=sig]').disabled=si===PASOS.length-1&&u>=1;
  bPlay.innerHTML=corre&&todo?'⏸ Pausa':'▶ Reproducir todo';
  if(si===PASOS.length-1&&u>=1&&window.BIO&&BIO.marcarSeccion)BIO.marcarSeccion('proteinas');
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
PUN.querySelectorAll('.dg-pt').forEach(function(b){b.onclick=function(){ir(+b.getAttribute('data-p'),false);};});
if('IntersectionObserver' in window){vis=false;new IntersectionObserver(function(e){vis=e[0].isIntersecting;arrancar();}).observe(raiz);}
window.addEventListener('resize',dibujar);
raiz._ir=function(i,uu){parar();si=i;u=uu;dibujar();};
dibujar();
})();
