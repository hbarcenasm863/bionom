/* ════════════════════════════════════════════════════════════════════════
   repro-anim.js — animaciones con volumen de reproduccion.html
   Cada animación es una secuencia de pasos; cada paso dibuja la escena en
   SVG según el avance p (0 → 1) y el tiempo t (para movimientos continuos).
   Volumen: degradados radiales con luz arriba a la izquierda, sombras en el
   suelo y brillos.
   Uso: ANIM.montar(elemento, 'nombre')  ·  <div class="anim" data-anim="x">
   ════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var defs={};
function f(n){return (+n).toFixed(1);}
function cl(v){return v<0?0:v>1?1:v;}
function seg(p,a,b){return cl((p-a)/(b-a));}
function L(a,b,p){return a+(b-a)*p;}
function R(i){var x=Math.sin(i*12.9898+78.233)*43758.5453;return x-Math.floor(x);}
function hx(c){c=c.replace('#','');return [0,2,4].map(function(i){return parseInt(c.substr(i,2),16);});}
function mix(c,w,t){var a=hx(c),b=hx(w);return '#'+a.map(function(v,i){return ('0'+Math.round(v+(b[i]-v)*t).toString(16)).slice(-2);}).join('');}
function G(c){var id='ra'+c.slice(1);if(!defs[id])defs[id]='<radialGradient id="'+id+'" cx="36%" cy="30%" r="78%"><stop offset="0" stop-color="'+mix(c,'#ffffff',.6)+'"/><stop offset=".5" stop-color="'+c+'"/><stop offset="1" stop-color="'+mix(c,'#000000',.38)+'"/></radialGradient>';return 'url(#'+id+')';}
function S(c){return mix(c,'#000000',.42);}
function g(tr,inner,extra){return '<g transform="'+tr+'"'+(extra||'')+'>'+inner+'</g>';}
function ball(x,y,r,c,o){if(r<=0)return '';return '<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r)+'" fill="'+G(c)+'"'+(o!=null?' opacity="'+f(o)+'"':'')+'/>'+(r>4?'<ellipse cx="'+f(x-r*.32)+'" cy="'+f(y-r*.38)+'" rx="'+f(r*.3)+'" ry="'+f(r*.18)+'" fill="#fff" opacity="'+f((o!=null?o:1)*.45)+'"/>':'');}
function ell(x,y,rx,ry,c,rot,o){return '<ellipse cx="'+f(x)+'" cy="'+f(y)+'" rx="'+f(rx)+'" ry="'+f(ry)+'" fill="'+G(c)+'" stroke="'+S(c)+'" stroke-width="1.1"'+(rot?' transform="rotate('+f(rot)+' '+f(x)+' '+f(y)+')"':'')+(o!=null?' opacity="'+f(o)+'"':'')+'/>';}
function pa(d,c,o){return '<path d="'+d+'" fill="'+G(c)+'" stroke="'+S(c)+'" stroke-width="1.2" stroke-linejoin="round"'+(o!=null?' opacity="'+f(o)+'"':'')+'/>';}
function ln(d,c,w,o,dash){return '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"'+(o!=null?' opacity="'+f(o)+'"':'')+(dash?' stroke-dasharray="'+dash+'"':'')+'/>';}
function sombra(x,y,rx,o){return '<ellipse cx="'+f(x)+'" cy="'+f(y)+'" rx="'+f(rx)+'" ry="'+f(rx*.2)+'" fill="#000" opacity="'+f(o==null?.16:o)+'"/>';}
function tx(x,y,s,c,size){return '<text x="'+f(x)+'" y="'+f(y)+'" text-anchor="middle" style="font:800 '+(size||12)+'px Outfit,sans-serif" fill="'+(c||'#14532d')+'" paint-order="stroke" stroke="#fff" stroke-width="3">'+s+'</text>';}
/* curva suave cerrada por puntos */
function suave(pts){var d='M'+f((pts[0][0]+pts[pts.length-1][0])/2)+' '+f((pts[0][1]+pts[pts.length-1][1])/2);
  for(var i=0;i<pts.length;i++){var a=pts[i],b=pts[(i+1)%pts.length];d+=' Q'+f(a[0])+' '+f(a[1])+' '+f((a[0]+b[0])/2)+' '+f((a[1]+b[1])/2);}return d+'Z';}
function blob(x,y,r,t,amp,sx){var p=[];for(var i=0;i<22;i++){var a=i/22*Math.PI*2,k=1+amp*Math.sin(3*a+t*1.7)+amp*.6*Math.sin(5*a-t*2.3);p.push([x+Math.cos(a)*r*k*(sx||1),y+Math.sin(a)*r*k]);}return suave(p);}

/* ── fondos ── */
var FONDOS={
 micro:'<radialGradient id="fmi" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#eef7ef"/><stop offset="1" stop-color="#b9d6c2"/></radialGradient>',
 agua:'<linearGradient id="fag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6f7"/><stop offset=".7" stop-color="#5aa7d6"/><stop offset="1" stop-color="#2f6f9e"/></linearGradient>',
 tierra:'<linearGradient id="fti" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dff1fb"/><stop offset=".68" stop-color="#f4fbf2"/><stop offset=".69" stop-color="#9ccf6a"/><stop offset="1" stop-color="#6b9d3e"/></linearGradient>',
 playa:'<linearGradient id="fpl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a4a"/><stop offset=".55" stop-color="#36507e"/><stop offset=".56" stop-color="#e7d3a1"/><stop offset="1" stop-color="#c9ad74"/></linearGradient>'
};
function fondo(k){
  if(k==='micro')return '<rect width="360" height="220" fill="#1f3a2a"/><circle cx="180" cy="110" r="150" fill="url(#fmi)"/>';
  if(k==='agua')return '<rect width="360" height="220" fill="url(#fag)"/><path d="M0 206 Q90 196 180 206 T360 204 L360 220 L0 220Z" fill="#d9c79a"/>';
  if(k==='tierra')return '<rect width="360" height="220" fill="url(#fti)"/>';
  if(k==='playa')return '<rect width="360" height="220" fill="url(#fpl)"/><path d="M250 121 Q300 116 360 121 L360 220 Q320 200 300 170 Q280 140 250 121Z" fill="#3a7cc4" opacity=".85"/><circle cx="60" cy="40" r="14" fill="#f4f1d0"/>';
  return '<rect width="360" height="220" fill="#eef7fb"/>';
}

/* ── seres ── */
function capsula(x,y,w,h,c,rot){return '<rect x="'+f(x-w/2)+'" y="'+f(y-h/2)+'" width="'+f(w)+'" height="'+f(h)+'" rx="'+f(h/2)+'" fill="'+G(c)+'" stroke="'+S(c)+'" stroke-width="1.4"'+(rot?' transform="rotate('+f(rot)+' '+f(x)+' '+f(y)+')"':'')+'/>';}
function adn(x,y,r,t){var p=[];for(var i=0;i<16;i++){var a=i/16*Math.PI*2,k=1+.18*Math.sin(4*a+t*3);p.push([x+Math.cos(a)*r*k,y+Math.sin(a)*r*k*.7]);}return '<path d="'+suave(p)+'" fill="none" stroke="#7b4bb7" stroke-width="2.4"/>';}
function hongo(x,y,s,o){return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',sombra(0,0,26)+pa('M-9 0 C-8 -20 -7 -34 -6 -40 L6 -40 C7 -34 8 -20 9 0Z','#f1e3c8')+pa('M-40 -38 C-38 -70 38 -70 40 -38 C20 -32 -20 -32 -40 -38Z','#b5651d')+ln('M-30 -37 L-24 -33 M-15 -35 L-12 -32 M0 -35 L0 -32 M15 -35 L12 -32 M30 -37 L24 -33','#7a3d10',1.2)+ball(-16,-55,4,'#f5e6c8')+ball(10,-60,3,'#f5e6c8'),o!=null?' opacity="'+f(o)+'"':'');}
function hoja(x,y,s,rot,c){return g('translate('+f(x)+' '+f(y)+') rotate('+f(rot||0)+') scale('+f(s)+')',pa('M0 0 C20 -16 60 -16 80 0 C60 16 20 16 0 0Z',c||'#4f9e5a')+ln('M0 0 L78 0','#2f6b2a',1.2));}
function flor(x,y,s,pet){var p='';for(var i=0;i<5;i++)p+=ell(0,-14,8,15,'#e2669a',i*72,pet);return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',p+ball(0,0,6,'#f5c542'));}
function colibri(x,y,s,t,dir){var w=Math.sin(t*40)*9;return g('translate('+f(x)+' '+f(y)+') scale('+f(s*(dir||1))+' '+f(s)+')',ell(0,0,16,8,'#2e9a5a',-10)+ball(15,-5,7,'#1f7a46')+ln('M21 -5 L40 -2','#222',1.8)+'<circle cx="17" cy="-7" r="1.4" fill="#fff"/>'+ell(-4,-8-w*.4,10,4+Math.abs(w)*.5,'#8fd3a8',-30)+pa('M-14 2 L-26 -2 L-26 8Z','#1f7a46'));}
function pez(x,y,s,c,t,dir){var w=Math.sin(t*10)*6;return g('translate('+f(x)+' '+f(y)+') scale('+f(s*(dir||1))+' '+f(s)+')',pa('M-28 '+f(w*.2)+' L-44 '+f(-12+w)+' L-44 '+f(12+w)+'Z',mix(c,'#000000',.15))+pa('M-30 0 C-20 -16 18 -16 30 0 C18 16 -20 16 -30 0Z',c)+pa('M-4 -12 L6 -20 L12 -11Z',mix(c,'#000000',.15))+'<circle cx="19" cy="-3" r="3.4" fill="#fff"/><circle cx="20" cy="-3" r="1.8" fill="#111"/>');}
function rana(x,y,s){return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',pa('M-22 6 C-34 4 -40 14 -30 18 L-14 16Z','#3f8f3a')+pa('M22 6 C34 4 40 14 30 18 L14 16Z','#3f8f3a')+ell(0,0,24,16,'#5cb85c')+ball(-10,-14,7,'#5cb85c')+ball(10,-14,7,'#5cb85c')+'<circle cx="-10" cy="-15" r="3" fill="#111"/><circle cx="10" cy="-15" r="3" fill="#111"/>'+ln('M-8 4 Q0 9 8 4','#2f6b2a',1.5));}
function renacuajo(x,y,s,t,patas,cola){var w=Math.sin(t*12)*8*cola;return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',pa('M-10 0 C-24 '+f(-8+w*.3)+' -40 '+f(w)+' '+f(-34-26*cola)+' '+f(w)+' C-40 '+f(w+3)+' -24 '+f(8+w*.3)+' -10 4Z','#4a4a3a')+ell(0,0,14,11,'#3b3b2c')+'<circle cx="7" cy="-4" r="2.2" fill="#fff"/>'+(patas>0?ln('M-6 8 l-6 '+f(10*patas)+' l-5 2','#3b3b2c',3)+ln('M2 9 l3 '+f(10*patas)+' l5 2','#3b3b2c',3):''));}
function tortuga(x,y,s,rot){return g('translate('+f(x)+' '+f(y)+') rotate('+f(rot||0)+') scale('+f(s)+')',sombra(0,10,30,.2)+ell(-22,10,12,6,'#6b8e4e',30)+ell(22,10,12,6,'#6b8e4e',-30)+ell(-20,-12,10,5,'#6b8e4e',-30)+ell(20,-12,10,5,'#6b8e4e',30)+ball(0,-26,8,'#7da35c')+ell(0,0,26,20,'#5b6b3a')+ln('M-12 -8 L0 -14 L12 -8 L12 6 L0 12 L-12 6Z','#3b4a24',1.4));}
function ave(x,y,s,c){return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',pa('M-30 0 L-46 -8 L-44 8Z',mix(c,'#000000',.2))+ell(0,0,30,20,c)+ball(26,-16,13,c)+pa('M37 -18 L50 -14 L37 -11Z','#f2a541')+'<circle cx="30" cy="-19" r="2.4" fill="#111"/>'+ell(-4,-2,18,10,mix(c,'#000000',.15),-10));}
function huevo(x,y,s,c,rot){return '<ellipse cx="'+f(x)+'" cy="'+f(y)+'" rx="'+f(10*s)+'" ry="'+f(13*s)+'" fill="'+G(c||'#f4ecd8')+'" stroke="'+S(c||'#f4ecd8')+'" stroke-width="1"'+(rot?' transform="rotate('+f(rot)+' '+f(x)+' '+f(y)+')"':'')+'/>'+'<ellipse cx="'+f(x-3*s)+'" cy="'+f(y-5*s)+'" rx="'+f(3*s)+'" ry="'+f(2*s)+'" fill="#fff" opacity=".6"/>';}
function grieta(x,y,s,p){return ln('M'+f(x-9*s)+' '+f(y)+' l'+f(4*s)+' '+f(-4*s)+' l'+f(4*s)+' '+f(5*s)+' l'+f(4*s)+' '+f(-5*s)+' l'+f(4*s)+' '+f(4*s),'#6b5a3a',1.4,p);}
function estrella(x,y,r,brazos,rot,c){var p=[];for(var i=0;i<10;i++){var a=(i*36-90+rot)*Math.PI/180,k=i%2?r*.42:r*(.42+.58*brazos[i/2]);p.push([x+Math.cos(a)*k,y+Math.sin(a)*k]);}return pa(suave(p),c||'#e07a3f');}
function caracol(x,y,s,dir){return g('translate('+f(x)+' '+f(y)+') scale('+f(s*(dir||1))+' '+f(s)+')',sombra(0,8,26)+pa('M-26 6 C-26 -2 26 -4 30 -2 C40 0 40 8 30 8Z','#c9a27a')+ln('M28 -2 L34 -16 M24 -2 L28 -14','#a8865e',2)+ball(34,-16,2,'#333')+ball(28,-14,2,'#333')+ball(-6,-12,17,'#b5651d')+ln('M-6 -12 m0 -10 a10 10 0 1 1 -1 0 m1 4 a6 6 0 1 1 -1 0','#6b3a10',1.5));}
function oruga(x,y,n,s){var o='';for(var i=n-1;i>=0;i--)o+=ball(x-i*9*s,y+Math.sin(i*1.3)*1.5,7*s,i===0?'#5a8f2a':'#8bc34a');return o+(n?'<circle cx="'+f(x+3*s)+'" cy="'+f(y-2*s)+'" r="'+f(1.6*s)+'" fill="#111"/>':'');}
function mariposa(x,y,s,a){return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',g('scale('+f(a)+' 1)',ell(-14,-10,14,12,'#f08c1e',-20)+ell(14,-10,14,12,'#f08c1e',20)+ell(-10,8,9,8,'#e05a3a',20)+ell(10,8,9,8,'#e05a3a',-20)+'<circle cx="-16" cy="-12" r="3" fill="#2a1a0a"/><circle cx="16" cy="-12" r="3" fill="#2a1a0a"/>')+ell(0,0,3,14,'#2a1a0a')+ln('M0 -13 L-6 -24 M0 -13 L6 -24','#2a1a0a',1.2));}
function polipo(x,y,s,t,c){var te='';for(var i=0;i<6;i++){var a=-150+i*24,w=Math.sin(t*3+i)*6;te+=ln('M0 -38 q'+f(Math.cos(a*Math.PI/180)*14)+' '+f(-12+w)+' '+f(Math.cos(a*Math.PI/180)*24)+' '+f(-20+w),mix(c,'#ffffff',.2),4);}
  return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',pa('M-8 0 C-9 -14 -10 -28 -12 -36 L12 -36 C10 -28 9 -14 8 0Z',c)+te+ell(0,-37,12,4,mix(c,'#000000',.1)));}
function esponja(x,y,s){var o='';for(var i=0;i<9;i++)o+='<ellipse cx="'+f(-10+(i%3)*10)+'" cy="'+f(-18-Math.floor(i/3)*16)+'" rx="2.4" ry="3" fill="#8a4a10" opacity=".7"/>';
  return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',pa('M-20 0 C-26 -24 -24 -50 -18 -64 L18 -64 C24 -50 26 -24 20 0Z','#f2a541')+ell(0,-64,18,5,'#c47a1e')+o);}
function planaria(x,y,len,cabeza,s){var hl=cabeza*14;return g('translate('+f(x)+' '+f(y)+') scale('+f(s||1)+')',pa('M0 -11 C'+f(-len*.3)+' -14 '+f(-len*.8)+' -11 '+f(-len)+' 0 C'+f(-len*.8)+' 11 '+f(-len*.3)+' 14 0 11 L'+f(hl*.4)+' 12 L'+f(hl)+' '+f(7*cabeza)+' L'+f(hl*.8)+' 0 L'+f(hl)+' '+f(-7*cabeza)+' L'+f(hl*.4)+' -12Z','#a07a5a')+(cabeza>.5?'<circle cx="'+f(hl*.55)+'" cy="-3" r="1.8" fill="#111"/><circle cx="'+f(hl*.55)+'" cy="3" r="1.8" fill="#111"/>':''));}
function mamifero(x,y,s,c){c=c||'#8a6d4b';return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',sombra(0,38,60)+'<rect x="-42" y="10" width="11" height="28" rx="4" fill="'+G(c)+'"/><rect x="-20" y="12" width="11" height="26" rx="4" fill="'+G(c)+'"/><rect x="18" y="12" width="11" height="26" rx="4" fill="'+G(c)+'"/><rect x="36" y="10" width="11" height="28" rx="4" fill="'+G(c)+'"/>'+ell(0,0,56,28,c)+ell(58,-14,20,16,c,-15)+ball(48,-30,6,c)+'<circle cx="64" cy="-18" r="2.4" fill="#111"/>'+ball(76,-8,4,'#3b2a1a'));}

/* ════════════ ANIMACIONES ════════════ */
var A={};
A.bacterias={fondo:'micro',pasos:[
 ['La bacteria crece. Su ADN es un solo cromosoma circular, suelto en el citoplasma.',function(p,t){return capsula(180,110,100+20*p,48,'#7ac143')+adn(180,110,14,t);}],
 ['Copia su ADN: ahora tiene dos cromosomas idénticos.',function(p,t){return capsula(180,110,120,48,'#7ac143')+adn(180-24*p,110,14,t)+adn(180+24*p,110,14,t+1);}],
 ['La célula se alarga y se estrangula por la mitad.',function(p,t){var w=120-50*p,d=35*p;return capsula(180-d,110,w,48,'#7ac143')+capsula(180+d,110,w,48,'#7ac143')+adn(180-24-11*p,110,14,t)+adn(180+24+11*p,110,14,t+1);}],
 ['Se separan: dos bacterias hijas idénticas. ¡Algunas se dividen cada 20 minutos!',function(p,t){var d=35+45*p;return capsula(180-d,110+6*p,70,48,'#7ac143',-10*p)+capsula(180+d,110-6*p,70,48,'#7ac143',10*p)+adn(180-d,110+6*p,13,t)+adn(180+d,110-6*p,13,t+1);}]]};
A.protistas={fondo:'micro',pasos:[
 ['La ameba es una sola célula con núcleo. Se mueve estirando «falsos pies» (pseudópodos).',function(p,t){return '<path d="'+blob(160+30*p,110,50,t,.14)+'" fill="'+G('#9fd3e6')+'" stroke="#4a8fae" stroke-width="1.5" opacity=".92"/>'+ball(160+30*p,105,14,'#7b4bb7');}],
 ['Su núcleo se divide en dos.',function(p,t){return '<path d="'+blob(190,110,52,t,.1)+'" fill="'+G('#9fd3e6')+'" stroke="#4a8fae" stroke-width="1.5" opacity=".92"/>'+ball(190-20*p,105,14-3*p,'#7b4bb7')+ball(190+20*p,105,14-3*p,'#7b4bb7');}],
 ['El citoplasma se estira y se estrangula en el centro.',function(p,t){var d=30*p;return '<path d="'+blob(190-d,110,46-6*p,t,.1)+'" fill="'+G('#9fd3e6')+'" stroke="#4a8fae" stroke-width="1.5" opacity=".9"/><path d="'+blob(190+d,110,46-6*p,t+2,.1)+'" fill="'+G('#9fd3e6')+'" stroke="#4a8fae" stroke-width="1.5" opacity=".9"/>'+ball(170-d,105,11,'#7b4bb7')+ball(210+d,105,11,'#7b4bb7');}],
 ['Resultado: dos amebas idénticas (bipartición). Es reproducción asexual.',function(p,t){var d=30+40*p;return '<path d="'+blob(190-d,110,40,t,.12)+'" fill="'+G('#9fd3e6')+'" stroke="#4a8fae" stroke-width="1.5" opacity=".92"/><path d="'+blob(190+d,110,40,t+2,.12)+'" fill="'+G('#9fd3e6')+'" stroke="#4a8fae" stroke-width="1.5" opacity=".92"/>'+ball(190-d,106,11,'#7b4bb7')+ball(190+d,106,11,'#7b4bb7');}]]};
function esporas(x,y,n,p,col,ancho,caida){var o='';for(var i=0;i<n;i++){var k=cl(p*1.4-R(i)*.4);o+=ball(x+(R(i+3)-.5)*ancho+k*(R(i+7)*ancho*1.6),y+k*caida*(.5+R(i+9)*.6),2.4,col,1-k*.3);}return o;}
A.hongos={fondo:'tierra',pasos:[
 ['El champiñón es solo el «fruto» del hongo. Bajo el sombrero, en las laminillas, se forman las esporas.',function(p,t){return hongo(150,175,1.3)+ln('M110 128 L190 128','#f5c542',3,.4+.4*Math.sin(t*4));}],
 ['Las esporas caen y el viento las dispersa lejos.',function(p,t){return hongo(150,175,1.3)+esporas(150,130,40,p,'#c48a3a',60,60);}],
 ['Una espora germina y forma hifas: hilos que crecen bajo el suelo y forman el micelio.',function(p,t){var o=hongo(150,175,1.3,.35)+ball(275,170,3,'#c48a3a');for(var i=0;i<7;i++){var a=(i/7)*Math.PI*2,l=46*p*(0.6+R(i)*.5);o+=ln('M275 170 q'+f(Math.cos(a)*l*.5)+' '+f(Math.sin(a)*l*.3+8)+' '+f(Math.cos(a)*l)+' '+f(Math.abs(Math.sin(a))*l*.5+6),'#f5f0e1',2);}return o;}],
 ['Con humedad, del micelio brota un champiñón nuevo.',function(p,t){var o=hongo(150,175,1.3,.35);for(var i=0;i<7;i++){var a=(i/7)*Math.PI*2,l=46*(0.6+R(i)*.5);o+=ln('M275 170 q'+f(Math.cos(a)*l*.5)+' '+f(Math.sin(a)*l*.3+8)+' '+f(Math.cos(a)*l)+' '+f(Math.abs(Math.sin(a))*l*.5+6),'#f5f0e1',2);}return o+hongo(275,172,1.1*p);}]]};
function musgo(x,y,w){var o='';for(var i=0;i<w/6;i++)o+=ell(x-w/2+i*6,y-4-R(i)*6,4,9,'#4f9e3a',(R(i+2)-.5)*40);return o;}
function esporofito(x,y,h,ang,abierta){var tx2=x+Math.sin(ang)*h,ty=y-Math.cos(ang)*h;return ln('M'+f(x)+' '+f(y)+' Q'+f(x+3)+' '+f(y-h*.5)+' '+f(tx2)+' '+f(ty),'#a5652a',2.2)+ell(tx2,ty-6,5,10,'#b5651d',ang*180/Math.PI)+(abierta?ell(tx2,ty-15,4,2,'#f5e6c8'):'');}
A.musgos={fondo:'tierra',pasos:[
 ['El musgo verde forma los gametos. Encima crece el esporofito: un tallito con una cápsula de esporas.',function(p,t){return musgo(110,160,80)+musgo(250,160,80)+esporofito(110,150,50*p+10,0);}],
 ['La cápsula se abre y suelta las esporas, que el viento lleva.',function(p,t){return musgo(110,160,80)+musgo(250,160,80)+esporofito(110,150,60,.15*p,true)+esporas(116,90,26,p,'#c48a3a',20,70);}],
 ['Los gametos masculinos nadan en las gotas de lluvia hasta el gameto femenino de otra planta: los musgos necesitan agua.',function(p,t){var o=musgo(110,160,80)+musgo(250,160,80);for(var i=0;i<8;i++){var y=(t*90+i*40)%180;o+='<path d="M'+f(40+i*40)+' '+f(y)+' q-3 6 0 8 q3 -2 0 -8Z" fill="#5aa7d6" opacity=".7"/>';}
   for(var j=0;j<5;j++){var k=cl(p*1.3-j*.08),x=L(120,245,k),yy=150-Math.sin(k*Math.PI)*30+Math.sin(t*8+j)*3;o+=ball(x,yy,3,'#e2a03a')+ln('M'+f(x-3)+' '+f(yy)+' q-5 '+f(Math.sin(t*20+j)*4)+' -10 0','#e2a03a',1.2);}return o;}],
 ['Del óvulo fecundado crece un nuevo esporofito, y el ciclo vuelve a empezar.',function(p,t){return musgo(110,160,80)+musgo(250,160,80)+esporofito(250,150,10+50*p,0);}]]};
function helecho(x,y,s){var o=ln('M0 0 Q6 -60 30 -110 Q40 -126 30 -132','#2f7d3a',3);for(var i=0;i<10;i++){var k=i/10,px=6*k*k*20+k*20,py=-k*110,l=34*(1-k*.6);o+=ell(px-l*.55,py,l*.5,5,'#4f9e5a',-20)+ell(px+l*.55,py-3,l*.5,5,'#4f9e5a',20);}return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',o);}
function soros(x,y,s,o){var r='';for(var i=0;i<12;i++){var k=(i%6)/6,lado=i<6?-1:1;r+=ball(x+(k*k*14+k*20+lado*k*14)*s,y-(k*110+6)*s,2.3*s,'#8a4a10',o);}return r;}
function protalo(x,y,s){return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',pa('M0 0 C-30 -6 -34 -30 -16 -34 C-8 -36 -2 -30 0 -24 C2 -30 8 -36 16 -34 C34 -30 30 -6 0 0Z','#7cc35a')+ln('M-8 0 l-3 8 M0 0 l0 9 M8 0 l3 8','#c9b48a',1));}
A.helechos={fondo:'tierra',pasos:[
 ['Bajo las hojas del helecho hay puntos cafés: los soros, llenos de esporas.',function(p,t){return helecho(120,170,1.1)+soros(120,170,1.1,.6+.4*Math.sin(t*4));}],
 ['Los soros se abren y sueltan miles de esporas.',function(p,t){return helecho(120,170,1.1)+soros(120,170,1.1)+esporas(150,80,40,p,'#a5652a',60,90);}],
 ['La espora germina y forma el prótalo, una plantita con forma de corazón donde se forman los gametos.',function(p,t){return helecho(120,170,1.1,.5)+protalo(265,172,1.2*p+.05);}],
 ['Con agua, el gameto masculino nada hasta el femenino. Del cigoto crece un helecho nuevo.',function(p,t){return helecho(120,170,1.1)+protalo(265,172,1.2)+helecho(265,168,.45*p);}]]};
function pino(x,y,s){return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',sombra(0,0,40)+'<rect x="-6" y="-30" width="12" height="30" fill="'+G('#7a5230')+'"/>'+pa('M-44 -24 L0 -84 L44 -24Z','#2f7d3a')+pa('M-36 -56 L0 -116 L36 -56Z','#3f8f4a')+pa('M-26 -88 L0 -140 L26 -88Z','#4f9e5a'));}
function cono(x,y,s,ab,c){var o='';for(var i=0;i<6;i++){var yy=-i*7,w=10-Math.abs(i-2.5)*2;o+=ell(-w*.5-ab*i*.8,yy,w*.7,4,c||'#9a6a3a',-25-ab*30)+ell(w*.5+ab*i*.8,yy,w*.7,4,c||'#9a6a3a',25+ab*30);}return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',o);}
A.gimnospermas={fondo:'tierra',pasos:[
 ['Los pinos tienen conos (piñas). El cono masculino suelta nubes de polen que lleva el viento.',function(p,t){var o=pino(110,185,1)+pino(270,185,1)+cono(140,80,1,0,'#d9a441');for(var i=0;i<30;i++){var k=cl(p*1.3-R(i)*.3);o+=ball(L(140,262,k)+(R(i+1)-.5)*30*Math.sin(k*3),L(80,98,k)+(R(i+2)-.5)*24,2,'#f5c542',1-k*.4);}return o+cono(262,104,1.2,0);}],
 ['El polen llega al cono femenino. La fecundación es lenta: puede tardar meses.',function(p,t){return pino(110,185,1)+pino(270,185,1)+cono(262,104,1.3+.1*Math.sin(t*3),0)+tx(262,62,'⏳ meses…','#7a5230');}],
 ['Las escamas se abren y caen semillas «desnudas», con alas y sin fruto que las cubra.',function(p,t){var o=pino(110,185,1)+pino(270,185,1)+cono(262,104,1.3,p);for(var i=0;i<4;i++){var k=cl(p*1.2-i*.1),x=262+(i-1.5)*14+Math.sin(t*3+i)*10*k,y=104+k*70;o+=g('translate('+f(x)+' '+f(y)+') rotate('+f(t*300+i*90)+')',ell(6,0,8,3,'#d9c79a')+ball(0,0,3,'#7a5230'));}return o;}],
 ['La semilla germina y crece un pino nuevo.',function(p,t){return pino(110,185,1)+pino(270,185,1)+pino(200,190,.35*p+.02);}]]};
function florL(x,y,petO,ov,ovc){return ln('M'+f(x)+' '+f(y+60)+' L'+f(x)+' '+f(y+10),'#4f8a32',4)+ell(x-16,y+4,16,6,'#e2669a',30,petO)+ell(x+16,y+4,16,6,'#e2669a',-30,petO)+ell(x-12,y-8,14,6,'#f08cb4',55,petO)+ell(x+12,y-8,14,6,'#f08cb4',-55,petO)+ln('M'+f(x)+' '+f(y+4)+' L'+f(x)+' '+f(y-24),'#7cbf5f',3)+ball(x,y-26,4,'#5fa83e')+ball(x,y+8,ov,ovc||'#9bd17b');}
A.angiospermas={fondo:'tierra',pasos:[
 ['El colibrí visita las flores buscando néctar; se le pega polen y lo lleva a otra flor (polinización).',function(p,t){var x=L(40,170,p),y=L(50,74,p)+Math.sin(t*5)*4;return florL(200,100,1,8)+colibri(x,y,1.1,t)+ball(x+12,y+4,2.5,'#f5c542')+ball(x+8,y+6,2,'#f5c542');}],
 ['El polen cae en el estigma y forma un tubo que baja hasta el óvulo: fecundación.',function(p,t){return florL(200,100,1,8)+ball(200,74,3,'#f5c542')+ln('M200 76 L200 '+f(76+30*p),'#f08c1e',2.2)+colibri(L(170,330,p),74-30*p,1.1,t);}],
 ['Los pétalos se caen y el ovario crece: se convierte en el fruto.',function(p,t){return florL(200,100,1-p,8+28*p,mix('#9bd17b','#f08c1e',p))+ell(170,100+60*p,10,4,'#e2669a',30,1-p)+ell(232,96+66*p,10,4,'#e2669a',-30,1-p);}],
 ['Dentro del fruto están las semillas. Cada una puede germinar y formar una planta nueva.',function(p,t){var o=ln('M200 160 L200 110','#4f8a32',4)+'<circle cx="200" cy="108" r="36" fill="'+G('#f08c1e')+'"/><circle cx="200" cy="108" r="28" fill="#fde9c8"/>';for(var i=0;i<6;i++){var a=i*60*Math.PI/180;o+=ell(200+Math.cos(a)*14,108+Math.sin(a)*14,4,7,'#3b2a1a',i*60);}var k=p;return o+ell(L(300,300,k),L(120,196,seg(k,0,.5)),4,7,'#3b2a1a')+(k>.5?ln('M300 196 L300 '+f(196-30*seg(k,.5,1)),'#4f8a32',2.4)+ell(294,196-30*seg(k,.5,1),8*seg(k,.5,1),3,'#5fa83e',-20)+ell(306,196-30*seg(k,.5,1),8*seg(k,.5,1),3,'#5fa83e',20):'');}]]};
A.poriferos={fondo:'agua',pasos:[
 ['La esponja vive fija en el fondo del mar y filtra el agua por sus poros.',function(p,t){var o=esponja(140,204,1.2);for(var i=0;i<10;i++){var k=((t*.4+i/10)%1);o+=ball(L(40,124,k),120+Math.sin(i)*30,2,'#ffffff',.7*(1-k));}return o;}],
 ['A un lado le crece una yema (gemación).',function(p,t){return esponja(140,204,1.2)+ball(172,150,4+12*p,'#f2a541');}],
 ['La yema se suelta y la corriente la lleva hasta otro lugar del fondo.',function(p,t){return esponja(140,204,1.2)+ball(L(172,270,p),L(150,196,p)+Math.sin(t*3)*4*(1-p),16,'#f2a541');}],
 ['Allí crece una esponja nueva. Las esponjas también sueltan gametos al agua.',function(p,t){return esponja(140,204,1.2)+esponja(270,204,.3+.6*p);}]]};
A.cnidarios={fondo:'agua',pasos:[
 ['El pólipo de coral vive fijo y atrapa plancton con sus tentáculos.',function(p,t){return pa('M60 206 Q180 170 300 206Z','#c9b48a')+polipo(180,190,1.4,t,'#ef8fa0');}],
 ['Por gemación le salen pólipos nuevos: así crece la colonia de coral.',function(p,t){return pa('M60 206 Q180 170 300 206Z','#c9b48a')+polipo(180,190,1.4,t,'#ef8fa0')+polipo(130,196,1.1*p,t+1,'#ef8fa0')+polipo(232,196,1.1*p,t+2,'#ef8fa0');}],
 ['Una noche al año muchos corales sueltan a la vez óvulos y espermatozoides (desove masivo).',function(p,t){var o=pa('M60 206 Q180 170 300 206Z','#c9b48a')+polipo(180,190,1.4,t,'#ef8fa0')+polipo(130,196,1.1,t+1,'#ef8fa0')+polipo(232,196,1.1,t+2,'#ef8fa0');for(var i=0;i<24;i++){var k=cl(p*1.4-R(i)*.4);o+=ball([130,180,232][i%3]+(R(i+1)-.5)*30*k,L(140,30,k),3,i%2?'#f5a3c0':'#ffe0a8',k>0?1:0);}return o;}],
 ['En el agua se unen los gametos; las larvas nadan y fundan colonias nuevas.',function(p,t){var o=pa('M60 206 Q180 170 300 206Z','#c9b48a')+polipo(180,190,1.4,t,'#ef8fa0')+polipo(130,196,1.1,t+1,'#ef8fa0')+polipo(232,196,1.1,t+2,'#ef8fa0');for(var i=0;i<6;i++){o+=ell(60+i*48+Math.sin(t*2+i)*8,L(50,90,p)+Math.cos(t*3+i)*6,5,3,'#f5a3c0');}return o;}]]};
A.platelmintos={fondo:'agua',pasos:[
 ['La planaria es un gusano plano que vive en agua dulce.',function(p,t){return planaria(L(150,230,p),170,110,1,1.1);}],
 ['Si se corta en dos pedazos…',function(p,t){return planaria(200-24*p,170,60,1,1.1)+planaria(146+30*p,170,48,0,1.1)+ln('M178 '+f(140)+' L178 200','#c0392b',2,1-p,'4 4');}],
 ['…cada pedazo regenera lo que le falta: uno forma una cola nueva y el otro una cabeza nueva.',function(p,t){return planaria(176,150,L(60,110,p),1,1.1)+planaria(176+30,196,L(48,96,p),p,1.1);}],
 ['¡Ahora hay dos planarias completas! Es reproducción asexual por fragmentación.',function(p,t){return planaria(176+40*p,150,110,1,1.1)+planaria(206+20*p,196,110,1,1.1);}]]};
A.moluscos={fondo:'tierra',pasos:[
 ['Los caracoles de tierra son hermafroditas, pero se cruzan con otro caracol.',function(p,t){return caracol(L(80,150,p),168,1)+caracol(L(290,215,p),168,1,-1);}],
 ['Cada uno pone sus huevos en un hueco húmedo del suelo.',function(p,t){var o=caracol(130,168,1)+'<ellipse cx="230" cy="190" rx="44" ry="12" fill="#6b4a2a"/>';for(var i=0;i<Math.round(9*p);i++)o+=ball(200+(i%5)*14,186+Math.floor(i/5)*6,5,'#f4f1e6');return o;}],
 ['Después de unas semanas, de cada huevo sale un caracolito que ya tiene concha.',function(p,t){var o=caracol(130,168,1)+'<ellipse cx="230" cy="190" rx="44" ry="12" fill="#6b4a2a"/>';for(var i=0;i<9;i++)o+=p<.4?ball(200+(i%5)*14,186+Math.floor(i/5)*6,5,'#f4f1e6'):caracol(200+(i%5)*18+20*(p-.4),186+Math.floor(i/5)*8,.25+.1*p);return o;}]]};
A.artropodos={fondo:'tierra',pasos:[
 ['La mariposa pone un huevo en una hoja.',function(p,t){return hoja(80,120,2.6,-5)+huevo(190,104,.5*p+.05,'#f4e9c0');}],
 ['Del huevo sale una oruga que come hojas y crece muchísimo.',function(p,t){return hoja(80,120,2.6,-5)+oruga(150+60*p,104,Math.round(3+5*p),.8+.4*p);}],
 ['La oruga forma una crisálida. Adentro, su cuerpo se transforma por completo: es la metamorfosis.',function(p,t){var s=1+.04*Math.sin(t*3);return ln('M200 40 L200 70','#5a3a1a',2)+hoja(80,40,2.6,-2)+g('translate(200 96) scale('+f(s)+')',ell(0,0,12,26,'#8bbf5a')+ln('M-10 -8 Q0 -2 10 -8 M-11 4 Q0 10 11 4','#5f8f3a',1));}],
 ['Sale la mariposa adulta: estira sus alas y vuela.',function(p,t){var a=.35+.65*Math.abs(Math.sin(t*6))*seg(p,.2,1)+.1;return ln('M200 40 L200 70','#5a3a1a',2)+hoja(80,40,2.6,-2)+mariposa(L(200,270,p),L(96,60,p),1.5,p<.2?L(.2,.9,p*5):a);}]]};
A.equinodermos={fondo:'agua',pasos:[
 ['La estrella de mar tiene cinco brazos.',function(p,t){return estrella(180,140,56,[1,1,1,1,1],t*8);}],
 ['Si un depredador le arranca un brazo…',function(p,t){var b=[1,1,1,1,1];b[1]=0;return estrella(170,140,56,b,0)+g('translate('+f(225+30*p)+' '+f(120-10*p)+') rotate('+f(-18+30*p)+')',pa('M-10 -6 L40 0 L-10 6Z','#e07a3f'));}],
 ['…regenera el brazo perdido. En algunas especies, el brazo suelto forma una estrella completa.',function(p,t){var b=[1,p,1,1,1];return estrella(150,140,56,b,0)+estrella(270,128,44,[1,p,p,p,p],18);}],
 ['Las estrellas también se reproducen sexualmente: sueltan óvulos y espermatozoides al agua.',function(p,t){var o=estrella(130,170,40,[1,1,1,1,1],0)+estrella(250,170,40,[1,1,1,1,1],20);for(var i=0;i<20;i++){var k=cl(p*1.3-R(i)*.3);o+=ball((i%2?130:250)+(R(i+3)-.5)*40*k,L(160,40,k),2.5,i%2?'#ffe0a8':'#ffffff',k>0?.9:0);}return o;}]]};
A.peces={fondo:'agua',pasos:[
 ['En la subienda, los bocachicos nadan río arriba para reproducirse.',function(p,t){return pez(L(60,170,p),100,1.2,'#b0bec5',t)+pez(L(40,150,p),140,1.1,'#90a4ae',t+1);}],
 ['La hembra suelta miles de óvulos y el macho los espermatozoides en el agua: fecundación externa.',function(p,t){var o=pez(170,100,1.2,'#b0bec5',t)+pez(150,140,1.1,'#90a4ae',t+1);for(var i=0;i<26;i++){var k=cl(p*1.3-R(i)*.3);o+=ball(140-k*60*R(i+1),104+k*70*R(i+2),3,'#f5a742',k>0?1:0);}return o+'<ellipse cx="'+f(120-30*p)+'" cy="'+f(150+10*p)+'" rx="'+f(40*p)+'" ry="'+f(14*p)+'" fill="#fff" opacity=".45"/>';}],
 ['Los huevos fecundados flotan y dentro de cada uno se forma un embrión.',function(p,t){var o='';for(var i=0;i<18;i++){var x=60+(i%6)*44+Math.sin(t+i)*4,y=90+Math.floor(i/6)*36+Math.cos(t*1.3+i)*4;o+=ball(x,y,11,'#f5b56a',.95)+ball(x+2,y+2,2+4*p,'#3b2a1a');}return o;}],
 ['Nacen las larvas, que comen plancton y crecen.',function(p,t){var o='';for(var i=0;i<12;i++)o+=pez(60+(i%6)*44+p*30+Math.sin(t*2+i)*6,90+Math.floor(i/6)*40+Math.cos(t*2+i)*5,.25+.15*p,'#b0bec5',t+i);return o;}]]};
A.anfibios={fondo:'agua',pasos:[
 ['La rana pone sus huevos en el agua y el macho los fecunda afuera.',function(p,t){var o=ell(280,40,46,10,'#4f9e3a')+rana(280,26,1);for(var i=0;i<Math.round(16*p);i++)o+=ball(120+(i%4)*14+(Math.floor(i/4)%2)*7,120+Math.floor(i/4)*12,7,'#e8f4fa',.8)+ball(120+(i%4)*14+(Math.floor(i/4)%2)*7,120+Math.floor(i/4)*12,2.6,'#222');return o;}],
 ['De cada huevo sale un renacuajo: tiene cola y respira por branquias, como un pez.',function(p,t){return ell(280,40,46,10,'#4f9e3a')+renacuajo(L(100,240,p),120+Math.sin(t*2)*10,1.3,t,0,1);}],
 ['Le salen las patas, la cola se encoge y aparecen los pulmones: es la metamorfosis.',function(p,t){return ell(280,40,46,10,'#4f9e3a')+renacuajo(200+Math.sin(t)*10,110-30*p,1.4,t,p,1-p*.85);}],
 ['¡Rana adulta! Respira por pulmones y por la piel, y vive en el agua y en tierra.',function(p,t){return ell(280,40,46,10,'#4f9e3a')+rana(L(200,250,p),L(80,26,p),1)+ell(110,40,40,9,'#4f9e3a');}]]};
A.reptiles={fondo:'playa',pasos:[
 ['De noche, la tortuga caná sale a la playa, cava un hueco y pone unos 80 huevos.',function(p,t){var o='<ellipse cx="150" cy="168" rx="46" ry="16" fill="#a8895a"/>';for(var i=0;i<Math.round(10*p);i++)o+=ball(126+(i%5)*12,166+Math.floor(i/5)*8,6,'#f6f2e6');return o+tortuga(150,140,1.2);}],
 ['Los tapa con arena. La cáscara impide que el huevo se seque: el embrión crece sin agua.',function(p,t){var o='<rect x="96" y="150" width="110" height="46" rx="8" fill="#d9bf86" opacity=".9"/>';for(var i=0;i<10;i++)o+=ball(116+(i%5)*16,162+Math.floor(i/5)*16,7,'#f6f2e6')+ball(118+(i%5)*16,163+Math.floor(i/5)*16,1+3*p,'#9a7a4a');return o+tortuga(L(150,300,p),L(130,160,p),1.1,L(0,40,p))+tx(150,140,'🌡 más calor → más hembras','#7a3a10',11);}],
 ['A los dos meses las crías rompen la cáscara.',function(p,t){var o='<rect x="96" y="150" width="110" height="46" rx="8" fill="#d9bf86" opacity=".9"/>';for(var i=0;i<10;i++){var x=116+(i%5)*16,y=162+Math.floor(i/5)*16+Math.sin(t*10+i)*1.2*p;o+=ball(x,y,7,'#f6f2e6')+grieta(x,y,.6,p);}return o;}],
 ['Las tortuguitas corren hacia el mar. Pocas llegan a adultas: por eso hay que proteger sus playas.',function(p,t){var o='';for(var i=0;i<5;i++)o+=tortuga(L(130+i*16,290,cl(p*1.2-i*.05)),176-i*8,.4,70);return o;}]]};
function pollito(x,y,s,t,ab,sinPatas){ // pollito con volumen; ab: 0 alas pegadas → 1 alas abiertas
  var w=Math.sin((t||0)*6)*.6;
  return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',
   (sinPatas?'':ln('M-5 16 L-6 26 M-6 26 l-4 2 M-6 26 l2 3 M-6 26 l4 1 M5 16 L6 26 M6 26 l-4 1 M6 26 l2 3 M6 26 l4 2','#f2a541',2))+
   ell(0,4,17,14,'#f7d34b')+
   ell(-13,4,7,10,'#efc22e',-25-25*(ab||0)+w*10)+
   ball(4,-14,11,'#f9dc5c')+
   ln('M-2 -24 q2 -6 5 -2 M2 -25 q4 -5 6 0','#f2b632',1.6)+
   pa('M13 -16 L22 -13 L13 -10Z','#f08c1e')+
   '<circle cx="9" cy="-17" r="2.2" fill="#1a1a1a"/><circle cx="9.7" cy="-17.7" r=".7" fill="#fff"/>');}
function cascaraAbajo(x,y){return '<ellipse cx="'+f(x)+'" cy="'+f(y+6)+'" rx="24" ry="18" fill="'+G('#f4ecd8')+'" stroke="'+S('#f4ecd8')+'"/>';}
function cascaraBorde(x,y){return '<path d="M'+f(x-24)+' '+f(y)+' l6 -8 l6 6 l6 -8 l6 6 l6 -8 l6 6 l6 -8 l6 8 L'+f(x+24)+' '+f(y+10)+' Q'+f(x)+' '+f(y+18)+' '+f(x-24)+' '+f(y+10)+'Z" fill="'+G('#f4ecd8')+'" stroke="'+S('#f4ecd8')+'"/>';}
function cascaraArriba(x,y,rot){return g('translate('+f(x)+' '+f(y)+') rotate('+f(rot)+')','<path d="M-24 0 A24 26 0 0 1 24 0 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6Z" fill="'+G('#f4ecd8')+'" stroke="'+S('#f4ecd8')+'"/>');}
function nido(){return pa('M110 150 C120 182 240 182 250 150 C230 160 130 160 110 150Z','#8a5a2b')+ln('M112 152 L130 160 M150 166 L170 158 M200 166 L220 158 M240 152 L226 162','#5e3a1a',2);}
A.aves={fondo:'tierra',pasos:[
 ['Después de la fecundación interna, la hembra pone huevos de cáscara dura en el nido.',function(p,t){return nido()+(p>.2?huevo(160,146,1.2):'')+(p>.6?huevo(196,146,1.2,null,10):'');}],
 ['Los padres incuban los huevos: les dan calor con su cuerpo.',function(p,t){var o=nido()+huevo(160,146,1.2)+huevo(196,146,1.2,null,10)+ave(178,L(60,120,p),1.2,'#5d7fa8');for(var i=0;i<3;i++)o+=ln('M'+f(150+i*22)+' 100 q6 -8 0 -16 q-6 -8 0 -16','#f08c1e',2,.6*p);return o;}],
 ['Adentro, el embrión se alimenta de la yema. Al final, el pollito rompe la cáscara con el pico.',function(p,t){var w=Math.sin(t*14)*4*p;return nido()+huevo(178,144,1.5,null,w)+grieta(178,140,1.2,p);}],
 ['Nace el polluelo y sus padres lo alimentan hasta que puede volar.',function(p,t){var b=seg(p,0,.5);return nido()+cascaraAbajo(178,142)+pollito(178,L(146,122,b),1.05,t,b,true)+cascaraBorde(178,138)+cascaraArriba(L(178,214,b),L(118,150,b),L(0,150,b))+ave(L(300,250,seg(p,.4,1)),L(70,96,seg(p,.4,1)),1,'#5d7fa8')+(p>.8?ball(222,108,3,'#8bc34a'):'');}]]};
function utero(x,y,r,emb){return '<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r)+'" fill="#f8c8d0" stroke="#d9798d" stroke-width="2" opacity=".95"/>'+ell(x-r*.5,y-r*.55,r*.35,r*.2,'#c0607a')+ln('M'+f(x-r*.45)+' '+f(y-r*.45)+' Q'+f(x-r*.1)+' '+f(y)+' '+f(x+r*.05)+' '+f(y+r*.05),'#c0607a',2)+ball(x+r*.15,y+r*.15,emb,'#f2b29a');}
A.mamiferos={fondo:'tierra',pasos:[
 ['La fecundación es interna. El embrión se implanta en el útero de la madre.',function(p,t){return mamifero(170,128,1.3)+utero(160,128,24,4+3*p);}],
 ['La placenta y el cordón umbilical le llevan alimento y oxígeno: crece dentro de la madre (vivíparo).',function(p,t){return mamifero(170,128,1.3)+utero(160,128,26+4*p,7+10*p);}],
 ['Nace la cría, ya formada.',function(p,t){return mamifero(150,128,1.3)+g('translate('+f(L(130,260,p))+' 0)',mamifero(0,160,.45));}],
 ['La madre la amamanta con leche: todos los mamíferos lo hacen.',function(p,t){var o=mamifero(170,128,1.3)+mamifero(175,170,.42);for(var i=0;i<3;i++){var k=(t*.8+i/3)%1;o+=ball(170+i*6,150+k*10,2,'#ffffff',1-k);}return o;}]]};

/* ── caso real: del cafeto en flor a la cereza de café ── */
function rama(){return ln('M10 70 Q120 60 200 78 T350 74','#6b4a2a',6)+hoja(60,66,1.1,-35,'#2f7d3a')+hoja(60,70,1.1,25,'#3f8f4a')+hoja(270,76,1.1,-30,'#2f7d3a')+hoja(270,78,1.1,30,'#3f8f4a');}
function florCafe(x,y,s,o){var p='';for(var i=0;i<5;i++)p+=ell(0,-9,4,9,'#fbfbf4',i*72);return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',p+ball(0,0,2.5,'#f2e6a8'),o!=null?' opacity="'+f(o)+'"':'');}
function abeja(x,y,s,t){var w=Math.sin(t*45)*5;return g('translate('+f(x)+' '+f(y)+') scale('+f(s)+')',ell(-2,-8-w*.3,7,4+Math.abs(w)*.4,'#dceffa',-20)+ell(4,-8+w*.3,7,4,'#dceffa',20)+ell(0,0,10,6,'#f2b632')+ln('M-4 -5 L-4 5 M2 -5 L2 5','#2a1a0a',2)+ball(10,-1,4,'#2a1a0a'));}
function cereza(x,y,r,c){return ball(x,y,r,c)+'<circle cx="'+f(x+r*.35)+'" cy="'+f(y+r*.5)+'" r="'+f(r*.12)+'" fill="'+mix(c,'#000000',.5)+'"/>';}
var POS_F=[[130,84],[150,90],[170,84],[190,92],[210,86],[230,92]];
A.cafe={fondo:'tierra',pasos:[
 ['Después de las lluvias, el cafeto se llena de flores blancas y perfumadas, en grupos junto a las hojas (floración).',function(p,t){var o=rama();POS_F.forEach(function(q,i){o+=florCafe(q[0],q[1]+10,cl(p*1.4-i*.08)*1.2);});return o;}],
 ['Polinización: el polen pasa de las anteras al estigma. El café arábica casi siempre se poliniza a sí mismo, y las abejas ayudan a que salgan más cerezas.',function(p,t){var o=rama();POS_F.forEach(function(q){o+=florCafe(q[0],q[1]+10,1.2);});var x=L(30,190,p),y=L(30,92,p)+Math.sin(t*6)*5;return o+abeja(x,y,1.1,t)+ball(x-6,y+6,1.8,'#f5c542')+ball(x+2,y+7,1.6,'#f5c542');}],
 ['Fecundación: el polen forma un tubo que baja por el estilo hasta los óvulos del ovario. La flor se marchita a los pocos días.',function(p,t){var o=rama();POS_F.forEach(function(q){o+=florCafe(q[0],q[1]+10,1.2,1-p*.7);});
   o+='<g transform="translate(300 160)"><rect x="-44" y="-56" width="88" height="96" rx="12" fill="#fff" stroke="#c9dccf"/>'+ln('M0 -44 L0 0','#9bd17b',4)+ell(0,14,16,13,'#9bd17b')+ball(-6,14,4,'#fff')+ball(6,14,4,'#fff')+ball(0,-46,3,'#f5c542')+ln('M0 -44 L0 '+f(-44+50*p),'#f08c1e',2)+'</g>'+tx(300,206,'por dentro','#3c5446',10);return o;}],
 ['El ovario crece y se convierte en el fruto: la cereza. Pasa de verde a amarilla y a roja en unos 8 meses.',function(p,t){var o=rama(),c=p<.5?mix('#7cb342','#f2c94c',p*2):mix('#f2c94c','#c0392b',(p-.5)*2);POS_F.forEach(function(q,i){o+=cereza(q[0],q[1]+12,L(4,10,p),c);});return o;}],
 ['Dentro de cada cereza hay dos semillas: ¡los granos de café! Sembradas, germinan y crecen como «chapolas» en el almácigo.',function(p,t){var o='<g transform="translate(120 120)">'+'<circle r="44" fill="'+G('#c0392b')+'"/><circle r="36" fill="#f6e6c0"/>'+ell(-12,0,13,24,'#e8d39a')+ell(12,0,13,24,'#e8d39a')+ln('M-12 -18 Q-6 0 -12 18 M12 -18 Q6 0 12 18','#a88a4a',1.6)+'</g>'+tx(120,186,'cereza abierta','#3c5446',11);
   var k=p;o+='<rect x="250" y="168" width="70" height="30" rx="4" fill="'+G('#6b4a2a')+'"/>'+ell(285,166-28*k,8*k+1,3+2*k,'#e8d39a');if(k>.4){var h=seg(k,.4,1);o+=ln('M285 168 L285 '+f(168-40*h),'#7cb342',3)+ell(277,168-40*h,10*h,4*h,'#4f9e3a',-20)+ell(293,168-40*h,10*h,4*h,'#4f9e3a',20);}return o+tx(285,214,'chapola','#3c5446',11);}]]};
/* ── desarrollo embrionario ── */
function celulas(x,y,n,r){var o='',pos=[];if(n===1)pos=[[0,0]];else if(n===2)pos=[[-1,0],[1,0]];else if(n===4)pos=[[-1,-1],[1,-1],[-1,1],[1,1]];else{for(var i=0;i<n;i++){var a=i*2.399,d=Math.sqrt(i/n);pos.push([Math.cos(a)*d*1.8,Math.sin(a)*d*1.8]);}}
  var rr=n===1?r:n===2?r*.62:n===4?r*.5:r*.34;pos.forEach(function(q,i){o+=ball(x+q[0]*rr*.98,y+q[1]*rr*.98,rr,'#f2b29a');});return o;}
A.embrion={fondo:'micro',pasos:[
 ['Cigoto: el óvulo fecundado es una sola célula.',function(p,t){return celulas(180,110,1,46+2*Math.sin(t*2));}],
 ['Segmentación: se divide en 2, 4, 8… células, sin crecer de tamaño.',function(p,t){var n=p<.33?2:p<.66?4:8;return celulas(180,110,n,48);}],
 ['Mórula: una bolita maciza de células, parecida a una mora.',function(p,t){return celulas(180,110,30,52+4*p);}],
 ['Blástula: las células se acomodan formando una esfera hueca.',function(p,t){var o='<circle cx="180" cy="110" r="44" fill="#fde6dc"/>';for(var i=0;i<22;i++){var a=i/22*Math.PI*2;o+=ball(180+Math.cos(a)*L(30,46,p),110+Math.sin(a)*L(30,46,p),8,'#f2b29a');}return o;}],
 ['Gástrula: una parte se hunde y se forman tres capas: ectodermo (piel y nervios), mesodermo (músculos, huesos y sangre) y endodermo (intestino y pulmones).',function(p,t){var h=30*p,ar='M126 110 A54 54 0 1 0 234 110 L'+f(206-6*p)+' 110 Q180 '+f(110-h*1.6)+' '+f(154+6*p)+' 110Z';
   return pa(ar,'#5aa7d6')+'<path d="M140 110 A40 40 0 1 0 220 110 L'+f(204-6*p)+' 110 Q180 '+f(110-h*1.3)+' '+f(156+6*p)+' 110Z" fill="'+G('#e5484d')+'"/><path d="M152 110 A28 28 0 1 0 208 110 L'+f(200-5*p)+' 110 Q180 '+f(110-h)+' '+f(160+5*p)+' 110Z" fill="'+G('#f5c542')+'"/>'+(p>.6?tx(300,60,'ectodermo','#2f6f9e',11)+tx(300,80,'mesodermo','#c0392b',11)+tx(300,100,'endodermo','#a07a00',11):'');}]]};
A.oviparo={fondo:'tierra',pasos:[
 ['La madre pone el huevo afuera de su cuerpo.',function(p,t){return ave(110,120,1.1,'#c0392b')+huevo(L(130,220,p),L(130,170,p),1.6);}],
 ['El embrión crece dentro del huevo alimentándose de la yema, que se va gastando.',function(p,t){return '<ellipse cx="220" cy="140" rx="34" ry="44" fill="#fbf6ea" stroke="#c9b48a" stroke-width="2"/>'+ball(220,L(140,156,p),L(22,8,p),'#f5c542')+ball(L(220,214,p),L(140,128,p),L(4,20,p),'#f2b29a');}],
 ['La cría rompe la cáscara con su «diente de huevo» y nace un pollito.',function(p,t){var a=seg(p,0,.35),b=seg(p,.35,1);
   if(b===0)return huevo(220,150,2.4,null,Math.sin(t*14)*4)+grieta(220,140,2,a);
   return cascaraAbajo(220,160)+pollito(220,L(168,138,b),L(.8,1.25,b),t,b,true)+cascaraBorde(220,156)+cascaraArriba(L(220,268,b),L(130,176,b),L(0,160,b));}]]};
A.ovoviviparo={fondo:'agua',pasos:[
 ['Los huevos se quedan dentro del cuerpo de la madre (por ejemplo, en algunos tiburones y en la boa).',function(p,t){var o=pez(180,110,3,'#7d8fa0',t*.3);for(var i=0;i<4;i++)o+=ball(150+i*14,116,6,'#f9d29a',.9);return o;}],
 ['Cada embrión se alimenta de la yema de su huevo, no de la madre.',function(p,t){var o=pez(180,110,3,'#7d8fa0',t*.3);for(var i=0;i<4;i++)o+=ball(150+i*14,116,6,'#f9d29a',.9)+ball(150+i*14,117,1+3*p,'#3b2a1a');return o;}],
 ['Los huevos eclosionan adentro y nacen crías vivas, ya formadas.',function(p,t){var o=pez(160,100,3,'#7d8fa0',t*.3);for(var i=0;i<3;i++)o+=pez(L(150,250+i*20,p),L(116,150+i*14,p),.35,'#7d8fa0',t+i);return o;}]]};
A.viviparo=A.mamiferos;
A.directo={fondo:'tierra',pasos:[
 ['Desarrollo directo: la cría nace parecida a sus padres, solo que más pequeña.',function(p,t){return ave(130,140,1,'#c0392b')+ave(240,170,.45,'#c0392b');}],
 ['Crece sin cambiar de forma hasta ser adulta.',function(p,t){return ave(130,140,1,'#c0392b')+ave(240,L(170,140,p),L(.45,1,p),'#c0392b');}]]};
A.indirecto=A.artropodos;

/* ════════════ MOTOR ════════════ */
var EST='';Object.keys(FONDOS).forEach(function(k){EST+=FONDOS[k];});
var HOLD=1200,DUR=3200,INST=0;
function montar(el,nombre){
  var a=A[nombre];if(!a)return;
  if(el._parar)el._parar();
  el.classList.add('anim');
  el.innerHTML='<div class="an-esc"><svg viewBox="0 0 360 220" role="img" aria-label="Animación"></svg></div><p class="an-txt" aria-live="polite"></p><div class="an-ctl"><button type="button" data-a="ant" aria-label="Paso anterior">⏮</button><button type="button" data-a="play" aria-label="Pausar">⏸</button><button type="button" data-a="sig" aria-label="Paso siguiente">⏭</button><span class="an-dots">'+a.pasos.map(function(){return '<i></i>';}).join('')+'</span></div>';
  var svg=el.querySelector('svg'),txt=el.querySelector('.an-txt'),dots=el.querySelectorAll('.an-dots i'),bp=el.querySelector('[data-a="play"]');
  var k=0,t0=performance.now(),juega=true,raf=0,visible=true,pausadoEn=0,fin=false;
  function paso(n){k=Math.max(0,Math.min(a.pasos.length-1,n));t0=performance.now();fin=false;txt.textContent=(k+1)+'. '+a.pasos[k][0];dots.forEach(function(d,i){d.classList.toggle('on',i===k);d.classList.toggle('visto',i<k);});}
  var pre='i'+(++INST)+'-';
  function dibujar(p,t){defs={};var cuerpo=a.pasos[k][1](p,t);var h='<defs>'+EST+Object.keys(defs).map(function(x){return defs[x];}).join('')+'</defs>'+fondo(a.fondo)+cuerpo;
    // nombres de degradado únicos por animación: si no, una animación oculta en otra pestaña deja sin color a las demás
    svg.innerHTML=h.replace(/(id="|url\(#)(ra|fmi|fag|fti|fpl)/g,'$1'+pre+'$2');}
  function bucle(now){
    if(!el.isConnected){return;}
    raf=requestAnimationFrame(bucle);
    if(!visible||!juega)return;
    var e=now-t0,p=cl(e/DUR);
    dibujar(p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,now/1000);
    if(e>DUR+HOLD){if(k<a.pasos.length-1)paso(k+1);else if(!fin){fin=true;juega=false;bp.textContent='↺';bp.setAttribute('aria-label','Repetir');}}
  }
  bp.onclick=function(){if(fin){paso(0);juega=true;}else{juega=!juega;if(juega)t0=performance.now()-pausadoEn;else pausadoEn=performance.now()-t0;}bp.textContent=juega?'⏸':'▶';};
  el.querySelector('[data-a="ant"]').onclick=function(){paso(k-1);juega=true;bp.textContent='⏸';};
  el.querySelector('[data-a="sig"]').onclick=function(){paso(k+1);juega=true;bp.textContent='⏸';};
  dots.forEach(function(d,i){d.onclick=function(){paso(i);juega=true;bp.textContent='⏸';};});
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){visible=es[0].isIntersecting;});io.observe(el);}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){juega=false;bp.textContent='▶';}
  paso(0);dibujar(juega?0:1,0);raf=requestAnimationFrame(bucle);
  el._parar=function(){cancelAnimationFrame(raf);};
}
function auto(raiz){(raiz||document).querySelectorAll('[data-anim]').forEach(function(el){if(!el._parar)montar(el,el.getAttribute('data-anim'));});}
window.ANIM={montar:montar,auto:auto,lista:Object.keys(A)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){auto();});else auto();
})();
