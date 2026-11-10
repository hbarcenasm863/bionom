/* ════════════════════════════════════════════════════════════════════════
   cuerpo.js — ilustración anatómica del cuerpo humano (vista frontal)
   La usa sistemas.html (figura interactiva y recorridos).
   - Contornos suavizados con curvas Catmull-Rom → Bézier, simétricos.
   - Degradados radiales para dar volumen a cada órgano.
   - CUERPO.ORG[id] = {s: sistema, d: dibujo SVG, a: [x, y] punto de la
     línea guía}. El texto de cada órgano está en sistemas.html.
   Sistema de coordenadas: viewBox "-80 0 460 640", eje del cuerpo en x = 150.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var CX=150;
/* curva suave que pasa por todos los puntos (Catmull-Rom → Bézier) */
function sp(p,cerrada,t){
  t=t==null?0.5:t;var n=p.length,d='M'+p[0][0].toFixed(1)+' '+p[0][1].toFixed(1);
  var last=cerrada?n:n-1;
  for(var i=0;i<last;i++){
    var p0=p[(i-1+n)%n],p1=p[i],p2=p[(i+1)%n],p3=p[(i+2)%n];
    if(!cerrada){if(i===0)p0=p1;if(i+2>=n)p3=p2;}
    var c1=[p1[0]+(p2[0]-p0[0])*t/3,p1[1]+(p2[1]-p0[1])*t/3],c2=[p2[0]-(p3[0]-p1[0])*t/3,p2[1]-(p3[1]-p1[1])*t/3];
    d+=' C'+c1[0].toFixed(1)+' '+c1[1].toFixed(1)+' '+c2[0].toFixed(1)+' '+c2[1].toFixed(1)+' '+p2[0].toFixed(1)+' '+p2[1].toFixed(1);
  }
  return d+(cerrada?'Z':'');
}
function espejo(p){return p.map(function(q){return [2*CX-q[0],q[1]];});}
function pf(d,fill,stroke,sw,extra){return '<path d="'+d+'" fill="'+fill+'"'+(stroke?' stroke="'+stroke+'" stroke-width="'+(sw||1.2)+'"':'')+(extra||'')+'/>';}
function linea(d,col,w,extra){return '<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"'+(extra||'')+'/>';}
/* tubo con volumen: borde oscuro + relleno + brillo */
function tubo(d,w,borde,relleno,brillo){return linea(d,borde,w+2.4)+linea(d,relleno,w)+(brillo?linea(d,brillo,Math.max(1,w*0.28),' opacity=".7"'):'');}

/* ── degradados ── */
function rg(id,c1,c2,fx,fy){return '<radialGradient id="'+id+'" cx="50%" cy="50%" r="65%" fx="'+(fx||'38%')+'" fy="'+(fy||'32%')+'"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></radialGradient>';}
var DEFS='<defs>'+
 '<linearGradient id="g-piel" x1="0" x2="1"><stop offset="0" stop-color="#ecd2bf"/><stop offset=".5" stop-color="#f7e6d8"/><stop offset="1" stop-color="#e8cab5"/></linearGradient>'+
 rg('g-pulmon','#fbd0d8','#d97c91')+rg('g-corazon','#f0625f','#9e1b1f')+rg('g-higado','#b9614a','#6e2d20')+rg('g-estomago','#f7c0a6','#d4785c')+
 rg('g-rinon','#c4504a','#6f1f1c')+rg('g-vejiga','#fbe6a2','#d9ad3c')+rg('g-cerebro','#fbd3dc','#d98aa0')+rg('g-glandula','#d7b8ee','#8a4fbf')+
 rg('g-pancreas','#fbe0a8','#e0a84a')+rg('g-linfa','#c8efb0','#3f9e3a')+rg('g-bazo','#c06a8a','#6e2a45')+rg('g-vesicula','#a8d48c','#4f8f2e')+rg('g-musculo','#ea8b84','#a8423c')+rg('g-intestino','#fde1d3','#f2b59c')+
 '<linearGradient id="g-hueso" x1="0" x2="1"><stop offset="0" stop-color="#e7dcc4"/><stop offset=".5" stop-color="#fbf6ea"/><stop offset="1" stop-color="#dfd2b6"/></linearGradient>'+
 '<filter id="f-sombra" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="2.4" flood-color="#5b3a26" flood-opacity=".22"/></filter>'+
 '<filter id="f-suave"><feGaussianBlur stdDeviation="1.2"/></filter>'+
 '</defs>';

/* ── silueta ── */
var MITAD=[[13,86],[15,104],[28,114],[48,119],[61,127],[67,145],[69,175],[72,212],[75,246],[80,280],[85,310],[89,330],[95,345],[96,360],[90,371],[82,365],[78,348],[74,332],[66,298],[60,264],[55,232],[50,200],[45,174],
 [44,206],[41,240],[43,272],[50,302],[54,332],[54,372],[50,420],[46,462],[45,500],[42,542],[37,588],[43,603],[39,615],[19,616],[14,601],[16,560],[15,512],[13,470],[11,424],[7,384],[0,356]];
function silueta(){
  var der=MITAD.map(function(q){return [CX+q[0],q[1]];});
  var izq=MITAD.slice().reverse().map(function(q){return [CX-q[0],q[1]];});
  var pts=izq.concat(der.slice(1,-1));
  var cuerpo=sp(pts,true,0.55);
  return '<g class="sil-g" filter="url(#f-sombra)">'+pf(cuerpo,'url(#g-piel)','#c9a48b',1.4)+
   '<ellipse cx="150" cy="52" rx="30" ry="37" fill="url(#g-piel)" stroke="#c9a48b" stroke-width="1.4"/>'+
   '<ellipse cx="119" cy="56" rx="4" ry="8" fill="#ecd2bf" stroke="#c9a48b" stroke-width="1"/><ellipse cx="181" cy="56" rx="4" ry="8" fill="#ecd2bf" stroke="#c9a48b" stroke-width="1"/></g>'+
   // líneas suaves de referencia (clavículas, ombligo)
   '<g opacity=".35" fill="none" stroke="#b98d72" stroke-width="1"><path d="M112 121 Q131 117 146 120 M188 121 Q169 117 154 120"/><circle cx="150" cy="276" r="2"/></g>';
}

/* ── órganos ── */
var O={};
function org(id,s,ancla,dib){O[id]={s:s,a:ancla,d:dib};}
/* DIGESTIVO */
org('boca','digestivo',[150,76],pf('M140 75 Q150 82 160 75 Q150 79 140 75Z','#b9473f','#7d2620',1)+pf('M142 75.5 Q150 77 158 75.5','none','#e9a39a',0.8));
org('esofago','digestivo',[153,150],tubo(sp([[150,84],[151,110],[153,140],[155,180],[159,205],[164,214]],false),5,'#b46552','#e3998a','#f5c9be'));
org('higado','digestivo',[118,226],'<g filter="url(#f-sombra)">'+pf(sp([[103,216],[116,207],[136,205],[158,211],[170,219],[160,229],[140,239],[120,246],[106,240],[100,228]],true),'url(#g-higado)','#5a2318',1.2)+
  pf('M152 212 Q146 226 138 238','none','#5a2318',0.8,' opacity=".6"')+'</g>');
org('vesicula','digestivo',[132,250],pf(sp([[129,238],[136,240],[137,250],[132,256],[127,250]],true),'url(#g-vesicula)','#3b6b22',1));
org('estomago','digestivo',[184,230],'<g filter="url(#f-sombra)">'+pf(sp([[163,212],[173,206],[186,209],[194,222],[193,238],[184,251],[168,258],[153,257],[147,250],[156,245],[170,241],[177,232],[174,222],[166,219]],true),'url(#g-estomago)','#a9563d',1.3)+
  linea('M168 222 Q182 230 176 246 M160 250 Q172 250 182 242','#c87a62',0.8,' opacity=".6"')+'</g>');
// intestino grueso: tubo con haustras
var COLON=sp([[127,336],[119,316],[115,292],[116,272],[124,262],[150,260],[176,260],[185,268],[187,292],[185,316],[178,332],[164,338],[154,342],[150,352]],false);
org('intgrueso','digestivo',[116,300],linea(COLON,'#9f6a4a',15.5)+linea(COLON,'#d9a07c',13)+linea(COLON,'#b9805e',13,' stroke-dasharray="1.3 7"')+linea(COLON,'#f0c7aa',3.5,' opacity=".6"'));
// intestino delgado: tubo serpenteante dentro del marco del colon
(function(){var p=[],y=272,dir=1,x0=131,x1=173;
  p.push([x0,y]);
  for(var k=0;k<7;k++){var xa=dir>0?x0:x1,xb=dir>0?x1:x0;
    p.push([xa+(xb-xa)*0.33,y+(k%2?2:-2)]);p.push([xa+(xb-xa)*0.66,y+(k%2?-2:2)]);p.push([xb,y]);p.push([xb+dir*5,y+4]);y+=8.4;p.push([xb,y]);dir=-dir;}
  var d=sp(p,false,0.6);
  org('intdelgado','digestivo',[152,300],pf('M128 268 Q152 262 176 268 Q182 300 176 332 Q152 340 128 332 Q122 300 128 268Z','url(#g-intestino)')+linea(d,'#c9806a',7.4)+linea(d,'#f4b9a0',5.2)+linea(d,'#fde3d8',1.6,' opacity=".8"'));
})();
org('pancreas','digestivo',[180,262],pf(sp([[137,259],[150,253],[168,251],[184,252],[190,257],[180,262],[160,264],[143,266]],true),'url(#g-pancreas)','#b07a26',1)+
  linea('M146 261 Q166 256 184 256','#d49a3c',0.7,' stroke-dasharray="2 2"'));

/* RESPIRATORIO */
org('nariz','respiratorio',[150,66],pf(sp([[150,56],[155,66],[156,72],[150,74],[144,72],[145,66]],true),'#e7b9a2','#a8735a',1)+'<ellipse cx="147" cy="72" rx="1.6" ry="1" fill="#7a4a36"/><ellipse cx="153" cy="72" rx="1.6" ry="1" fill="#7a4a36"/>');
(function(){var anillos='';for(var y=94;y<146;y+=5.2)anillos+='<path d="M145.5 '+y+' Q150 '+(y+2.2)+' 154.5 '+y+'" fill="none" stroke="#5f93b8" stroke-width="1.6"/>';
  var bronq=linea('M150 146 C146 152 138 156 132 162 M150 146 C154 152 162 156 168 162','#5f93b8',5.5)+linea('M150 146 C146 152 138 156 132 162 M150 146 C154 152 162 156 168 162','#a9cde6',3.2);
  org('traquea','respiratorio',[150,118],'<rect x="145" y="90" width="10" height="58" rx="4" fill="#cfe4f2" stroke="#5f93b8" stroke-width="1.2"/>'+anillos+bronq);})();
(function(){
  var L=[[141,122],[130,125],[118,137],[109,156],[104,182],[103,204],[114,212],[130,209],[140,200],[143,172],[144,140]];
  var R=[[159,122],[170,125],[182,137],[191,156],[196,182],[197,204],[186,212],[171,210],[165,201],[159,195],[157,180],[159,160],[157,140]];
  function arbol(sx){var s='';[[0,0],[1,1]].forEach(function(){});
    var b=[[[150,150],[134,165],[122,182],[114,200]],[[134,165],[126,160],[116,152]],[[134,165],[132,184],[130,202]],[[122,182],[112,184]]];
    b.forEach(function(r){s+=linea(sp(r.map(function(q){return [sx<0?q[0]:2*CX-q[0],q[1]];}),false),'#e9a3b3',1.4,' opacity=".9"');});return s;}
  org('pulmones','respiratorio',[112,170],'<g filter="url(#f-sombra)">'+pf(sp(L,true),'url(#g-pulmon)','#b9566e',1.3)+pf(sp(R,true),'url(#g-pulmon)','#b9566e',1.3)+
   linea('M108 170 Q124 168 140 160 M110 190 Q126 186 140 184','#c66b82',0.9,' opacity=".55"')+linea('M192 176 Q178 174 160 168','#c66b82',0.9,' opacity=".55"')+arbol(-1)+arbol(1)+'</g>');
})();
org('diafragma','respiratorio',[198,212],linea('M102 214 C118 196 140 202 150 205 C160 202 182 196 198 214','#a8423c',4.5)+linea('M102 214 C118 196 140 202 150 205 C160 202 182 196 198 214','#e2827a',2.4));

/* CIRCULATORIO */
var ART=[
 sp([[154,168],[151,152],[158,143],[167,148],[168,162],[166,182],[160,214],[155,250],[153,290]],false),
 sp([[153,290],[143,312],[135,340],[131,380],[129,430],[128,480],[127,540],[125,592]],false),
 sp([[153,290],[163,312],[167,340],[169,380],[171,430],[172,480],[173,540],[175,592]],false),
 sp([[155,146],[140,128],[118,126],[102,134],[93,170],[88,230],[80,290],[72,345]],false),
 sp([[162,145],[180,128],[198,128],[205,140],[209,180],[213,236],[221,292],[228,345]],false),
 sp([[153,146],[146,116],[143,94],[141,70]],false), sp([[158,146],[156,116],[157,94],[159,70]],false)
];
var VEN=[
 sp([[146,170],[144,214],[146,250],[147,290]],false),
 sp([[147,290],[137,312],[130,340],[126,380],[124,430],[123,480],[122,540],[120,592]],false),
 sp([[147,290],[157,312],[162,340],[164,380],[166,430],[167,480],[168,540],[170,592]],false),
 sp([[146,150],[134,124],[112,122],[98,130],[88,170],[83,230],[75,290],[67,345]],false),
 sp([[152,150],[176,124],[196,124],[210,136],[214,180],[218,236],[226,292],[233,345]],false),
 sp([[147,150],[138,116],[136,94],[134,70]],false), sp([[152,150],[163,116],[164,94],[166,70]],false)
];
function vasos(lst,col,brillo,ws){return lst.map(function(d,i){var w=ws[i]||2;return linea(d,col,w+1.2,' opacity=".9"')+linea(d,brillo,w*0.45);}).join('');}
org('arterias','circulatorio',[92,230],vasos(ART,'#c62a2f','#f26b6b',[4.6,3,3,2.6,2.6,2.4,2.4]));
org('venas','circulatorio',[214,250],vasos(VEN,'#2e5f9e','#6d9ad6',[4.2,3,3,2.6,2.6,2.4,2.4]));
org('corazon','circulatorio',[176,184],'<g filter="url(#f-sombra)">'+
  tubo('M152 172 C149 152 160 142 168 150 C171 156 169 166 167 176',6,'#7e1418','#d4373a','#f39a8f')+
  tubo('M159 172 C161 160 153 154 145 157',5,'#264a7c','#4b7cc4','#9fbde6')+
  pf(sp([[146,172],[158,166],[171,169],[178,181],[174,196],[162,207],[152,212],[145,203],[139,190],[139,178]],true),'url(#g-corazon)','#7e1418',1.3)+
  linea('M160 170 Q156 190 152 210','#7e1418',0.9,' opacity=".55"')+linea('M171 172 Q166 186 168 200','#f6a19a',0.8,' opacity=".6"')+'</g>');

/* EXCRETOR */
var RIN=[[129,236],[118,238],[113,250],[115,264],[123,273],[132,271],[129,262],[129,250],[134,243]];
org('rinones','excretor',[110,254],'<g filter="url(#f-sombra)">'+pf(sp(RIN,true),'url(#g-rinon)','#5a1714',1.2)+pf(sp(espejo(RIN),true),'url(#g-rinon)','#5a1714',1.2)+
  pf(sp([[129,250],[124,252],[124,258],[129,260]],false),'none','#f2b8a8',1)+pf(sp(espejo([[129,250],[124,252],[124,258],[129,260]]),false),'none','#f2b8a8',1)+'</g>');
org('ureteres','excretor',[136,300],tubo(sp([[131,258],[137,280],[141,305],[145,328]],false),2.4,'#a07d23','#f1d07a')+tubo(sp(espejo([[131,258],[137,280],[141,305],[145,328]]),false),2.4,'#a07d23','#f1d07a'));
org('vejiga','excretor',[170,338],pf(sp([[139,330],[150,325],[161,330],[164,341],[157,351],[143,351],[136,341]],true),'url(#g-vejiga)','#a07d23',1.2)+linea('M150 351 L150 360','#a07d23',2.2));
org('piel','excretor',[78,250],'<g fill="#7fc4ea" stroke="#2f80b8" stroke-width=".8">'+[[96,160],[204,160],[78,250],[222,250],[124,40],[176,40],[120,400],[180,400]].map(function(q){return '<path d="M'+q[0]+' '+(q[1]-5)+' Q'+(q[0]+4)+' '+(q[1]+1)+' '+q[0]+' '+(q[1]+3)+' Q'+(q[0]-4)+' '+(q[1]+1)+' '+q[0]+' '+(q[1]-5)+'Z"/>';}).join('')+'</g>');

/* NERVIOSO */
org('cerebro','nervioso',[150,22],'<g filter="url(#f-sombra)">'+pf(sp([[122,40],[124,27],[135,18],[150,16],[165,18],[176,27],[178,40],[172,49],[158,50],[150,47],[142,50],[128,49]],true),'url(#g-cerebro)','#a9516b',1.3)+
  linea('M150 18 L150 47','#a9516b',1)+linea('M128 30 q5 -4 9 0 t9 0 M126 40 q5 -4 9 0 t9 0 M156 30 q5 -4 9 0 t9 0 M158 40 q5 -4 9 0 t9 0 M134 24 q4 4 8 0 M160 24 q4 4 8 0','#c46d86',1.1)+'</g>');
org('medula','nervioso',[166,300],tubo('M150 50 L150 338',3.6,'#b8860b','#f3c63c','#fff1b0'));
(function(){var ram=[
  [[150,124],[124,128],[104,138],[94,176],[90,232],[82,292],[76,340]],[[150,124],[176,128],[196,138],[206,176],[210,232],[218,292],[224,340]],
  [[150,336],[138,352],[132,392],[129,440],[127,500],[125,590]],[[150,336],[162,352],[168,392],[171,440],[173,500],[175,590]],
  [[90,232],[80,250]],[[210,232],[220,250]],[[129,440],[118,460]],[[171,440],[182,460]],
  [[150,180],[124,186],[110,200]],[[150,180],[176,186],[190,200]],[[150,230],[126,236]],[[150,230],[174,236]],[[150,280],[128,290]],[[150,280],[172,290]]];
  org('nervios','nervioso',[214,206],ram.map(function(r){return linea(sp(r,false),'#d4a017',1.9)+linea(sp(r,false),'#ffe08a',0.7);}).join(''));})();
org('ojos','nervioso',[176,60],['<ellipse cx="139" cy="60" rx="6" ry="3.6" fill="#fff" stroke="#6b4a3a" stroke-width="1"/><circle cx="139" cy="60" r="2.6" fill="#3b6f8f"/><circle cx="139" cy="60" r="1.1" fill="#111"/>',
  '<ellipse cx="161" cy="60" rx="6" ry="3.6" fill="#fff" stroke="#6b4a3a" stroke-width="1"/><circle cx="161" cy="60" r="2.6" fill="#3b6f8f"/><circle cx="161" cy="60" r="1.1" fill="#111"/>'].join(''));

/* ENDOCRINO */
org('hipofisis','endocrino',[124,50],'<circle cx="150" cy="50" r="4.6" fill="url(#g-glandula)" stroke="#5e2d8a" stroke-width="1"/>'+linea('M150 46 L150 42','#5e2d8a',1.2));
org('tiroides','endocrino',[176,100],pf('M141 96 C141 90 147 90 148 96 L150 99 L152 96 C153 90 159 90 159 96 C160 104 154 108 150 104 C146 108 140 104 141 96Z','url(#g-glandula)','#5e2d8a',1.1));
org('suprarrenales','endocrino',[106,232],pf('M119 239 Q123 229 131 233 Q131 240 125 241Z','url(#g-glandula)','#5e2d8a',1)+pf('M181 239 Q177 229 169 233 Q169 240 175 241Z','url(#g-glandula)','#5e2d8a',1));
org('insulina','endocrino',[180,262],pf(sp([[137,259],[150,253],[168,251],[184,252],[190,257],[180,262],[160,264],[143,266]],true),'url(#g-glandula)','#5e2d8a',1)+
  '<g fill="#f6e9ff"><circle cx="150" cy="259" r="1.6"/><circle cx="163" cy="256" r="1.6"/><circle cx="176" cy="256" r="1.6"/></g>');
org('gonadas','endocrino',[178,346],'<ellipse cx="137" cy="344" rx="5" ry="6.5" fill="url(#g-glandula)" stroke="#5e2d8a" stroke-width="1"/><ellipse cx="163" cy="344" rx="5" ry="6.5" fill="url(#g-glandula)" stroke="#5e2d8a" stroke-width="1"/>');

/* LOCOMOTOR */
function hueso(d,w){return linea(d,'#b7a580',w+2)+linea(d,'url(#g-hueso)',w)+linea(d,'#fffdf6',w*0.25,' opacity=".8"');}
function cabeza(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="url(#g-hueso)" stroke="#b7a580" stroke-width="1"/>';}
org('craneo','oseo',[150,10],'<g filter="url(#f-sombra)">'+pf(sp([[124,52],[121,32],[132,18],[150,14],[168,18],[179,32],[176,52],[170,66],[166,80],[150,86],[134,80],[130,66]],true),'url(#g-hueso)','#a8956c',1.3)+
  '<ellipse cx="139" cy="54" rx="7" ry="6" fill="#4a3a2a"/><ellipse cx="161" cy="54" rx="7" ry="6" fill="#4a3a2a"/>'+pf('M150 60 L146 70 L154 70Z','#4a3a2a')+
  linea('M138 78 L162 78 M141 74 L141 81 M146 74 L146 81 M150 74 L150 81 M154 74 L154 81 M159 74 L159 81','#8a7650',1)+'</g>');
(function(){var v='';for(var y=90;y<334;y+=8.6)v+='<rect x="145" y="'+y.toFixed(1)+'" width="10" height="6.6" rx="2" fill="url(#g-hueso)" stroke="#a8956c" stroke-width=".9"/>';
  org('columna','oseo',[150,104],v);})();
(function(){var c='';for(var i=0;i<10;i++){var y=126+i*8.6,a=40-i*1.2+(i>6?-(i-6)*4:0);
  var d1='M147 '+y+' C132 '+(y-6)+' '+(150-a-4)+' '+(y+2)+' '+(150-a+2)+' '+(y+12+i*0.6);
  var d2='M153 '+y+' C168 '+(y-6)+' '+(150+a+4)+' '+(y+2)+' '+(150+a-2)+' '+(y+12+i*0.6);
  c+=hueso(d1,3.2)+hueso(d2,3.2);}
  c+='<rect x="146.5" y="122" width="7" height="58" rx="3" fill="url(#g-hueso)" stroke="#a8956c" stroke-width="1"/>';
  c+=hueso('M148 118 C134 113 118 115 102 124',4)+hueso('M152 118 C166 113 182 115 198 124',4);
  org('costillas','oseo',[114,170],c);})();
org('pelvis','oseo',[116,312],'<g filter="url(#f-sombra)">'+pf(sp([[150,300],[166,296],[186,300],[192,316],[180,340],[164,352],[150,348],[136,352],[120,340],[108,316],[114,300],[134,296]],true),'url(#g-hueso)','#a8956c',1.3)+
  '<ellipse cx="150" cy="328" rx="14" ry="12" fill="#f7e6d8" stroke="#a8956c" stroke-width="1"/><ellipse cx="128" cy="336" rx="5" ry="6" fill="#d9c9a4"/><ellipse cx="172" cy="336" rx="5" ry="6" fill="#d9c9a4"/></g>');
org('extremidades','oseo',[122,420],[
  hueso('M100 128 C97 170 94 210 91 240',6),hueso('M89 244 C84 280 78 310 73 334',3.2),hueso('M94 244 C90 280 84 310 79 336',3.2),
  hueso('M200 128 C203 170 206 210 209 240',6),hueso('M211 244 C216 280 222 310 227 334',3.2),hueso('M206 244 C210 280 216 310 221 336',3.2),
  hueso('M126 336 C124 380 123 420 122 466',7.5),hueso('M174 336 C176 380 177 420 178 466',7.5),
  hueso('M121 476 C122 520 123 556 124 590',6),hueso('M128 478 C129 520 129 556 129 588',2.6),hueso('M179 476 C178 520 177 556 176 590',6),hueso('M172 478 C171 520 171 556 171 588',2.6),
  cabeza(100,127,6),cabeza(200,127,6),cabeza(91,241,4.5),cabeza(209,241,4.5),cabeza(122,470,6.5),cabeza(178,470,6.5),
  '<ellipse cx="120" cy="606" rx="12" ry="5" fill="url(#g-hueso)" stroke="#a8956c" stroke-width="1"/><ellipse cx="180" cy="606" rx="12" ry="5" fill="url(#g-hueso)" stroke="#a8956c" stroke-width="1"/>',
  '<ellipse cx="70" cy="352" rx="6" ry="11" fill="url(#g-hueso)" stroke="#a8956c" stroke-width="1"/><ellipse cx="230" cy="352" rx="6" ry="11" fill="url(#g-hueso)" stroke="#a8956c" stroke-width="1"/>'].join(''));
(function(){
  function m(p){return pf(sp(p,true),'url(#g-musculo)','#86302b',1,' opacity=".92"');}
  function fibras(p){return linea(sp(p,false),'#f4b3ad',0.8,' opacity=".7"');}
  var M=[
   [[148,124],[132,122],[112,126],[104,140],[116,156],[136,158],[148,150]],                  // pectoral
   [[60,128],[50,124],[44,136],[48,156],[58,160],[64,146]].map(function(q){return [q[0]+40,q[1]];}), // deltoides
   [[96,152],[88,170],[86,200],[90,226],[98,212],[100,180]],                                   // bíceps
   [[140,210],[132,212],[130,240],[132,280],[140,292],[148,290],[148,214]],                    // abdomen
   [[126,350],[110,366],[108,400],[112,440],[122,458],[132,440],[138,400],[136,360]],          // cuádriceps
   [[118,482],[110,498],[112,530],[120,548],[126,530],[126,498]]                               // pantorrilla
  ];
  var s='';M.forEach(function(p){s+=m(espejo(p));});  // como en los libros: músculos a un lado, huesos al otro
  s+=fibras([[154,226],[160,226]])+fibras([[154,246],[166,246]])+fibras([[154,266],[166,266]]);
  s+=fibras([[186,380],[176,420],[172,446]]);
  org('musculos','oseo',[186,404],s);
})();

/* INMUNE */
org('amigdalas','inmune',[124,84],'<ellipse cx="144" cy="84" rx="4" ry="5.5" fill="url(#g-linfa)" stroke="#2f7d2a" stroke-width="1"/><ellipse cx="156" cy="84" rx="4" ry="5.5" fill="url(#g-linfa)" stroke="#2f7d2a" stroke-width="1"/>');
org('timo','inmune',[176,128],pf(sp([[150,118],[157,122],[159,136],[153,144],[150,140],[147,144],[141,136],[143,122]],true),'url(#g-linfa)','#2f7d2a',1.1));
org('bazo','inmune',[206,238],'<g filter="url(#f-sombra)">'+pf(sp([[190,226],[200,224],[205,236],[200,252],[191,256],[188,244]],true),'url(#g-bazo)','#4a1a2e',1.2)+'</g>');
(function(){var V=[[[150,96],[136,108],[112,124],[100,150]],[[150,96],[164,108],[188,124],[200,150]],[[150,150],[150,250],[150,300]],[[150,300],[132,330],[126,400],[124,470]],[[150,300],[168,330],[174,400],[176,470]],[[106,150],[90,200],[82,260]],[[194,150],[210,200],[218,260]]];
  var G=[[140,98],[160,98],[136,104],[164,104],[108,148],[112,154],[192,148],[188,154],[132,330],[138,336],[168,330],[162,336],[150,262],[146,280],[154,280]];
  org('ganglios','inmune',[96,152],V.map(function(r){return linea(sp(r,false),'#7cc46a',1.3,' opacity=".85"');}).join('')+G.map(function(q){return '<ellipse cx="'+q[0]+'" cy="'+q[1]+'" rx="3.4" ry="2.6" fill="url(#g-linfa)" stroke="#2f7d2a" stroke-width=".8"/>';}).join(''));})();
org('medulaosea','inmune',[118,400],'<g opacity=".95">'+linea('M126 346 C124 390 123 430 122 462','#b7a580',8)+linea('M126 346 C124 390 123 430 122 462','#e46a6a',4.5)+linea('M174 346 C176 390 177 430 178 462','#b7a580',8)+linea('M174 346 C176 390 177 430 178 462','#e46a6a',4.5)+'</g>');

/* ── figura completa ── */
function svg(ids){
  return DEFS+silueta()+(ids||Object.keys(O)).map(function(id){return O[id].d;}).join('');
}
window.CUERPO={ORG:O,DEFS:DEFS,silueta:silueta,svg:svg,sp:sp,VB:'-125 0 550 640'};
})();
