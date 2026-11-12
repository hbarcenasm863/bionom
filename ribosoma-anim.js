/* ribosoma-anim.js — La traducción de cerca: el ribosoma y los ARN de transferencia.
   Dibujo propio inspirado en el esquema de traducción del NHGRI (National Human
   Genome Research Institute): ribosoma sobre el ARNm, dos ARNt a la vez (sitios P
   y A), la cadena de aminoácidos que pasa al ARNt nuevo, el ARNt vacío que sale y
   el siguiente que llega. Uso: <div id="ribo-anim"></div> y este archivo después.
   Usa la misma secuencia que el traductor de genetica.html (inicio de la beta-globina). */
(function(){
var raiz=document.getElementById('ribo-anim');if(!raiz)return;
var ARN='AUGGUGCAUCUGACUCCUGAGGAGAAGUAA';
var COD=[];for(var i=0;i<ARN.length;i+=3)COD.push(ARN.substr(i,3));
var AA={AUG:['Met','#2e7d4f'],GUG:['Val','#1774a6'],CAU:['His','#7b4bb7'],CUG:['Leu','#c2410c'],ACU:['Thr','#0e7490'],CCU:['Pro','#a16207'],GAG:['Glu','#be123c'],AAG:['Lys','#4338ca']};
var BC={A:'#d13438',U:'#8e44ad',C:'#f0a020',G:'#23804a'},ANTI={A:'U',U:'A',G:'C',C:'G'};
var W=680,H=420,PX=300,CW=66,LW=20,MY=330,TY=MY-8; // PX: centro del sitio P; MY: línea del ARNm; TY: base del ARNt
var NUM=COD.length; // 10 codones; el último (UAA) es de parada
var QUIETO=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

raiz.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Animación de la traducción en el ribosoma" style="width:100%;height:auto;display:block;background:#f8fbff;border-radius:14px"></svg>'+
  '<p class="ribo-nota" aria-live="polite" style="min-height:3.2em;margin:10px 0 6px"></p>'+
  '<div class="ctrl"><button type="button" class="cn-btn cn-btn--primary" data-r="play">⏸ Pausa</button><button type="button" class="cn-btn" data-r="paso">⏭ Siguiente codón</button><button type="button" class="cn-btn" data-r="reini">🔄 Reiniciar</button></div>';
var S=raiz.querySelector('svg'),NOTA=raiz.querySelector('.ribo-nota');
var VX=0,VW=W; // en pantallas angostas se acerca la vista al ribosoma
function vista(){var n=raiz.clientWidth&&raiz.clientWidth<560;VX=n?140:0;VW=n?440:W;S.setAttribute('viewBox',VX+' 50 '+VW+' '+(H-50));}
vista();window.addEventListener('resize',function(){vista();dibujar();});

function L(a,b,t){return a+(b-a)*t;}
function suave(t){t=Math.max(0,Math.min(1,t));return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function tramo(u,a,b){return suave((u-a)/(b-a));}
function T(x,y,t,o){o=o||{};return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||'middle')+'" font-size="'+(o.s||13)+'" font-weight="'+(o.w||700)+'" fill="'+(o.c||'#1e293b')+'"'+(o.op!=null?' opacity="'+o.op+'"':'')+' font-family="Outfit,system-ui,sans-serif">'+t+'</text>';}
function xCod(i,corr){return PX+(i-corr)*CW;} // centro del codón i cuando el codón «corr» está en el sitio P

/* ARNt: cuerpo en forma de trébol (azul claro), anticodón abajo y aminoácido arriba */
function arnt(x,y,cod,op,conAA,etq){
  if(op<=0)return '';
  var o='<g opacity="'+op.toFixed(2)+'" transform="translate('+x.toFixed(1)+','+y.toFixed(1)+')">';
  o+='<path d="M-13 -8 L-13 -40 Q-28 -44 -28 -58 Q-28 -74 -15 -72 Q-14 -90 0 -90 Q14 -90 15 -72 Q28 -74 28 -58 Q28 -44 13 -40 L13 -8 Q0 2 -13 -8 Z" fill="#9ed3f0" stroke="#3b8fc2" stroke-width="2"/>';
  o+='<path d="M-5 -16 L-5 -68 M5 -16 L5 -68" stroke="#5aaad8" stroke-width="2" stroke-dasharray="3 3"/>';
  o+='<line x1="10" y1="-90" x2="10" y2="-106" stroke="#3b8fc2" stroke-width="3"/>';
  o+=T(0,-52,'ARNt',{s:10,c:'#0c4a6e'});
  for(var k=0;k<3;k++){var b=ANTI[cod[k]],bx=(k-1)*LW;
    o+='<rect x="'+(bx-7)+'" y="-6" width="14" height="16" rx="3" fill="'+BC[b]+'"/>'+T(bx,7,b,{s:11,c:'#fff'});}
  if(conAA){var a=AA[cod];o+='<circle cx="10" cy="-116" r="13" fill="'+a[1]+'" stroke="#fff" stroke-width="2"/>'+T(10,-112,a[0],{s:10,c:'#fff'});}
  if(etq)o+=etq.izq?T(-40,-30,etq.t,{s:12,c:'#0c4a6e',a:'end'}):T(0,-138,etq,{s:12,c:'#0c4a6e'});
  return o+'</g>';
}
/* cadena de aminoácidos ya unidos; el más nuevo queda en (x,y) y los demás suben en zigzag */
function cadena(n,x,y,op){
  if(n<=0)return '';var o='',p=[];
  for(var j=0;j<n;j++){var k=n-1-j;p.push(k<5?[x+(k%2?-14:0)+k*2,y-k*19]:[x+8-(k-4)*25,y-4*19-24-(k%2?8:0)]);}
  for(j=1;j<n;j++)o+='<line x1="'+p[j-1][0]+'" y1="'+p[j-1][1]+'" x2="'+p[j][0]+'" y2="'+p[j][1]+'" stroke="#475569" stroke-width="3"/>';
  for(j=0;j<n;j++){var a=AA[COD[j]];o+='<circle cx="'+p[j][0]+'" cy="'+p[j][1]+'" r="13" fill="'+a[1]+'" stroke="#fff" stroke-width="2"/>'+T(p[j][0],p[j][1]+4,a[0],{s:10,c:'#fff'});}
  if(n>=2)o+=T(p[0][0],p[0][1]-20,'cadena de aminoácidos',{s:12,c:'#334155'});
  return '<g opacity="'+(op==null?1:op)+'">'+o+'</g>';
}
function arnm(corr,op){
  var o='<g opacity="'+(op==null?1:op)+'"><line x1="0" y1="'+(MY+31)+'" x2="'+W+'" y2="'+(MY+31)+'" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>';
  for(var i=0;i<NUM;i++){var cx=xCod(i,corr);if(cx<-40||cx>W+40)continue;
    for(var k=0;k<3;k++){var b=COD[i][k],bx=cx+(k-1)*LW;o+='<rect x="'+(bx-7)+'" y="'+(MY+8)+'" width="14" height="17" rx="3" fill="'+BC[b]+'"/>'+T(bx,MY+21,b,{s:11,c:'#fff'});}
    o+='<rect x="'+(cx-CW/2+2)+'" y="'+(MY+5)+'" width="'+(CW-4)+'" height="23" rx="5" fill="none" stroke="#94a3b8" stroke-width="1"/>';}
  return o+'</g>';
}
function ribosoma(sep,op){ // subunidad grande arriba y pequeña abajo; sep las separa al final
  op=op==null?1:op;
  return '<g opacity="'+op+'"><ellipse cx="'+(PX+CW/2)+'" cy="'+(236-sep*60)+'" rx="165" ry="112" fill="#cfe7f7" fill-opacity=".55" stroke="#7fb3d5" stroke-width="2"/>'+
    '<ellipse cx="'+(PX+CW/2)+'" cy="'+(368+sep*30)+'" rx="140" ry="36" fill="#cfe7f7" fill-opacity=".7" stroke="#7fb3d5" stroke-width="2"/></g>';
}
function sitios(op){
  return '<g opacity="'+op+'">'+'<rect x="'+(PX-CW/2)+'" y="'+(MY+4)+'" width="'+CW+'" height="25" rx="6" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="4 3"/>'+
    '<rect x="'+(PX+CW/2)+'" y="'+(MY+4)+'" width="'+CW+'" height="25" rx="6" fill="none" stroke="#b91c1c" stroke-width="2" stroke-dasharray="4 3"/>'+
    T(PX,MY+52,'sitio P',{s:11,c:'#0f766e'})+T(PX+CW,MY+52,'sitio A',{s:11,c:'#b91c1c'})+'</g>';
}

/* Estado: ciclo c (1…9) = el codón c entra al sitio A; u de 0 a 1 dentro del ciclo.
   Fases: 0–.35 llega el ARNt · .35–.6 la cadena pasa al ARNt nuevo · .6–1 el ribosoma avanza un codón y sale el ARNt vacío. */
var c=1,u=0,corriendo=!QUIETO,ult=null,DUR=4200,fin=false;
function dibujar(){
  var o='',nota='';
  var fijos=T(VX+14,MY+52,'ARNm',{a:'start',s:13,c:'#c2410c'})+T(VX+VW-14,MY+52,'codones →',{a:'end',s:11,c:'#64748b'})+T(VX+VW-14,410,'Ribosoma',{a:'end',s:12,c:'#3b82a6'});
  if(c<NUM-1){ // ciclos normales
    var llega=tramo(u,0,.35),pasa=tramo(u,.35,.6),avanza=tramo(u,.6,1);
    var corr=c-1+avanza;
    var xP=xCod(c-1,corr),xA=xCod(c,corr);
    var yVacio=TY-Math.max(0,(avanza-.35)/.65)*150,opVacio=1-Math.max(0,(avanza-.55)/.45);
    o+=ribosoma(0)+sitios(1-avanza*.6)+arnm(corr);
    // ARNt del sitio P (al final del ciclo queda vacío y sale)
    o+=arnt(xP-Math.max(0,avanza-.35)*40,yVacio,COD[c-1],opVacio,false,avanza>.45?{izq:1,t:'ARNt vacío sale'}:'');
    // ARNt que llega al sitio A
    var xL=L(xA+190,xA,llega),yL=L(TY-150,TY,llega);
    o+=arnt(xL,yL,COD[c],1,!(pasa>=1),llega<1?'ARNt que llega':'');
    // cadena: primero cuelga del ARNt del sitio P; luego pasa al ARNt del sitio A
    var pPx=xP+10,pPy=TY-116,pAx=xA+10-14+2,pAy=TY-116-19;
    if(pasa<1)o+=cadena(c,L(pPx,pAx,pasa),L(pPy,pAy,pasa));
    else o+=cadena(c+1,xA+10,TY-116);
    if(pasa>0&&pasa<1)o+=T(xA+40,TY-110,'enlace peptídico',{a:'start',s:12,c:'#7c2d12'});
        var an=COD[c].split('').map(function(b){return ANTI[b];}).join('');
    nota=u<.35?'<b>Llega un ARN de transferencia</b> al sitio A con el anticodón <b>'+an+'</b>, que encaja con el codón <b>'+COD[c]+'</b> del ARNm. Trae el aminoácido <b>'+AA[COD[c]][0]+'</b>.':
      u<.6?'<b>Enlace peptídico:</b> la cadena que tenía el ARNt del sitio P se une al aminoácido nuevo. Ahora la cadena cuelga del ARNt del sitio A.':
      '<b>El ribosoma avanza un codón</b> (tres letras). El ARNt que quedó vacío sale para cargar otro aminoácido, y el sitio A queda libre para el siguiente.';
  }else{ // codón de parada UAA en el sitio A: se suelta la proteína y el ribosoma se separa
    var corr2=NUM-2,suelta=tramo(u,.3,.75),sep=tramo(u,.55,1);
    var xP2=xCod(NUM-2,corr2),xA2=xCod(NUM-1,corr2);
    o+=ribosoma(sep,1-sep*.5)+sitios(1-sep)+arnm(corr2,1-sep*.4);
    o+=arnt(xP2,TY-suelta*60,COD[NUM-2],1-suelta,false,'');
    o+=cadena(NUM-1,xP2+10+suelta*150,TY-116+suelta*10);
    o+='<g opacity="'+(1-sep)+'"><rect x="'+(xA2-20)+'" y="'+(TY-58)+'" width="40" height="52" rx="10" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>'+T(xA2,TY-36,'factor',{s:9,c:'#334155'})+T(xA2,TY-24,'de',{s:9,c:'#334155'})+T(xA2,TY-12,'liberación',{s:9,c:'#334155'})+'</g>';
    o+=T(xP2+165,TY-75,suelta>.5?'¡proteína lista!':'',{s:14,c:'#14532d'});
    nota='<b>Codón de parada UAA:</b> no hay ARNt para él. Entra un <b>factor de liberación</b>, la proteína se suelta y se pliega, y las dos partes del ribosoma se separan.';
    fin=u>=1;
  }
  S.innerHTML='<rect width="'+W+'" height="'+H+'" fill="#f8fbff"/>'+o+fijos;
  NOTA.innerHTML=nota;
}
var bucle=false,vis=true;
function cuadro(ts){
  if(!corriendo||!vis){bucle=false;ult=null;return;}
  if(ult!==null){u+=Math.min(100,ts-ult)/DUR;
    if(u>=1){if(c<NUM-1){c++;u=0;}else{u=1;dibujar();corriendo=false;bucle=false;ult=null;
      setTimeout(function(){if(!corriendo&&c>=NUM-1&&u>=1){c=1;u=0;corriendo=true;ponerPlay();arrancar();}},2500);return;}}}
  ult=ts;dibujar();requestAnimationFrame(cuadro);
}
function arrancar(){if(!bucle&&corriendo&&vis){bucle=true;ult=null;requestAnimationFrame(cuadro);}}
var bPlay=raiz.querySelector('[data-r=play]');
function ponerPlay(){bPlay.innerHTML=corriendo?'⏸ Pausa':'▶ Reproducir';}
bPlay.onclick=function(){corriendo=!corriendo;if(corriendo&&c>=NUM-1&&u>=1){c=1;u=0;}ponerPlay();arrancar();};
raiz.querySelector('[data-r=paso]').onclick=function(){corriendo=false;ponerPlay();if(c>=NUM-1&&u>=1){c=1;u=.36;}else if(u<.99){u=.999;}else{c=Math.min(NUM-1,c+1);u=.999;}
  if(c>=NUM-1)u=1;dibujar();};
raiz.querySelector('[data-r=reini]').onclick=function(){c=1;u=0;dibujar();corriendo=true;ponerPlay();arrancar();};
// solo anima cuando se ve en pantalla (ahorra batería en el celular)
if('IntersectionObserver' in window){vis=false;new IntersectionObserver(function(e){vis=e[0].isIntersecting;arrancar();}).observe(raiz);}
raiz._ir=function(cc,uu){corriendo=false;ponerPlay();c=cc;u=uu;dibujar();};
ponerPlay();
if(QUIETO){u=.999;}
dibujar();
arrancar();
})();
