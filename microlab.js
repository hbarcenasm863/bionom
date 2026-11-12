/* BioNom · Laboratorio virtual de microscopía (celula.html, sección «El microscopio»).
   El estudiante prepara una lámina, enciende la luz, escoge el objetivo, enfoca con
   los tornillos macrométrico y micrométrico, gradúa el diafragma y, a 100×, pone
   aceite de inmersión. Las células se dibujan en micrómetros (µm) y se escalan según
   el campo visual real de cada objetivo (número de campo 18 mm): 4× → 4500 µm,
   10× → 1800 µm, 40× → 450 µm, 100× → 180 µm.
   Uso: <div id="microlab"></div> y este archivo después de bio.js. */
(function(){
var raiz=document.getElementById('microlab');if(!raiz)return;

var MUESTRAS={
  cebolla:{n:'🧅 Epidermis de cebolla',tin:['ninguna','lugol','azul'],pide:'Células vegetales en forma de ladrillo, con pared celular y núcleo.'},
  mejilla:{n:'👄 Células de la mejilla',tin:['ninguna','azul'],pide:'Células animales planas, sin pared, con el núcleo en el centro.'},
  elodea:{n:'🌿 Hoja de Elodea',tin:['ninguna'],pide:'Células vegetales vivas llenas de cloroplastos verdes.'},
  sangre:{n:'🩸 Frotis de sangre (ya teñido)',tin:['ninguna'],pide:'Muchos glóbulos rojos sin núcleo y, de vez en cuando, un glóbulo blanco.'},
  yogur:{n:'🥛 Bacterias del yogur',tin:['ninguna','azul'],pide:'Bacterias en forma de bastón: solo se ven a 1000× con aceite de inmersión.'}
};
// Foto real de cada muestra (fotos-datos.js, con su cita APA): se muestra al cumplir su reto
var REAL={cebolla:['k_cebolla','Epidermis de cebolla al microscopio óptico (400×): se ven la pared y el núcleo de cada célula.'],
  mejilla:['k_cheek','Células de la mejilla teñidas con azul de metileno: el núcleo se ve azul oscuro.'],
  elodea:['k_elodea','Hoja de <i>Elodea</i>: cada célula está llena de cloroplastos verdes.'],
  sangre:['m_frotis','Frotis de sangre teñido: un neutrófilo (glóbulo blanco) entre muchos glóbulos rojos y plaquetas.'],
  yogur:['m_yogur','<i>Lactobacillus bulgaricus</i>, la bacteria del yogur, vista por el ocular a 1000×.']};
var RETO_DE={cebolla:'ceb',mejilla:'mej',elodea:'elo',sangre:'san',yogur:'yog'};
var TIN={ninguna:'Sin teñir',lugol:'Lugol',azul:'Azul de metileno'};
var CAMPO={4:4500,10:1800,40:450,100:180};          // diámetro del campo en µm
var PROF={4:6,10:3,40:1.2,100:0.7};                   // cuánto se desenfoca por cada unidad fuera de foco
var FOCO={4:500,10:503,40:507,100:509};              // posición de enfoque de cada objetivo
var E={m:'cebolla',t:'lugol',lam:false,rota:false,luz:false,ob:4,z:430,d:70,aceite:false,errores:0,hechos:{}};

raiz.innerHTML=
 '<div class="ml">'+
  '<div class="ml-vista"><div class="ml-ocular"><canvas id="ml-cv" width="640" height="640" aria-label="Lo que se ve por el ocular"></canvas></div>'+
   '<div class="ml-info" id="ml-info" aria-live="polite"></div><div class="ml-real" id="ml-real"></div></div>'+
  '<div class="ml-ctrl">'+
   '<div class="ml-grp"><b>1. Muestra</b><select id="ml-m">'+Object.keys(MUESTRAS).map(function(k){return '<option value="'+k+'">'+MUESTRAS[k].n+'</option>';}).join('')+'</select>'+
    '<select id="ml-t" aria-label="Tinción"></select><button type="button" class="cn-btn" id="ml-prep">🧪 Preparar y poner la lámina</button></div>'+
   '<div class="ml-grp"><b>2. Luz</b><button type="button" class="cn-btn" id="ml-luz">💡 Encender</button>'+
    '<label>Diafragma <input type="range" id="ml-d" min="5" max="100" value="70"></label></div>'+
   '<div class="ml-grp"><b>3. Objetivo</b><div class="chips" id="ml-ob" role="group" aria-label="Objetivo">'+[4,10,40,100].map(function(o){return '<button type="button" class="chip'+(o===4?' on':'')+'" data-o="'+o+'">'+o+'×</button>';}).join('')+'</div>'+
    '<label class="ml-aceite"><input type="checkbox" id="ml-ac"> Gota de aceite de inmersión</label></div>'+
   '<div class="ml-grp"><b>4. Enfoque</b><label>Tornillo macrométrico <input type="range" id="ml-macro" min="300" max="560" step="10" value="430"></label>'+
    '<span class="ml-micro">Micrométrico <button type="button" class="cn-btn" data-mi="-1" aria-label="Bajar la platina un poco">▼</button><button type="button" class="cn-btn" data-mi="1" aria-label="Subir la platina un poco">▲</button></span></div>'+
  '</div>'+
 '</div>'+
 '<h3 style="margin-top:16px">🎯 Retos del laboratorio</h3><ol class="ml-retos" id="ml-retos"></ol>'+
 '<div class="card ml-medir"><h3>📏 Mide una célula con el campo visual</h3><p>Con el objetivo de <b>10×</b> el campo visual mide <b>1800 µm</b> (1,8 mm) de lado a lado. Enfoca la cebolla a 100×, cuenta cuántas células caben a lo largo del círculo y escríbelo.</p>'+
  '<label>Células a lo largo: <input type="number" id="ml-n" min="1" max="40" style="width:5em"></label> <button type="button" class="cn-btn cn-btn--primary" id="ml-calc">Calcular el tamaño</button><p id="ml-res" aria-live="polite" style="margin-top:6px"></p></div>'+
 '<div class="tbl-wrap"><table class="t" id="ml-tab"><tr><th>Muestra</th><th>Tinción</th><th>Aumento total</th><th>Lo que observé</th></tr></table></div>';

var cv=document.getElementById('ml-cv'),cx=cv.getContext('2d'),info=document.getElementById('ml-info');
function $(id){return document.getElementById(id);}
function h(i,j,k){var x=Math.sin(i*127.1+j*311.7+k*74.7)*43758.5453;return x-Math.floor(x);}
function msg(t,tipo){info.innerHTML='<span class="'+(tipo||'')+'">'+t+'</span>';}

/* ── Dibujo de cada muestra en µm, alrededor del centro de la lámina ── */
function dibujar(){
  var W=cv.width,R=W/2,campo=CAMPO[E.ob],s=W/campo; // píxeles por µm
  cx.save();cx.clearRect(0,0,W,W);
  cx.beginPath();cx.arc(R,R,R,0,Math.PI*2);cx.clip();
  if(!E.luz){cx.fillStyle='#050505';cx.fillRect(0,0,W,W);cx.restore();cv.style.filter='none';return;}
  var bri=.35+.65*E.d/100; // más diafragma abierto, más luz
  cx.fillStyle='rgb('+Math.round(250*bri)+','+Math.round(248*bri)+','+Math.round(236*bri)+')';cx.fillRect(0,0,W,W);
  if(E.lam&&!E.rota){
    var con=(E.t==='ninguna'&&E.m!=='elodea'&&E.m!=='sangre')?Math.max(.12,1.15-E.d/100)*.7:.95; // contraste
    var M=E.m,half=campo/2+40;
    function P(x,y){return [R+x*s,R+y*s];}
    if(M==='cebolla'){var cw=250,chh=62;
      for(var r=Math.floor(-half/chh);r<=half/chh;r++)for(var c=Math.floor(-half/cw)-1;c<=half/cw;c++){
        var x0=c*cw+(r%2?cw/2:0),y0=r*chh,p=P(x0,y0),w=cw*s+.5,hh=chh*s;
        if(w<2){continue;}
        cx.fillStyle=E.t==='lugol'?'rgba(214,170,60,.30)':E.t==='azul'?'rgba(80,120,220,.14)':'rgba(255,255,255,0)';cx.fillRect(p[0],p[1],w,hh);
        cx.strokeStyle='rgba(90,70,40,'+con+')';cx.lineWidth=Math.max(1,3*s);cx.strokeRect(p[0],p[1],w,hh);
        var nx=p[0]+w*(.25+.5*h(r,c,2)),ny=p[1]+hh*(.3+.4*h(r,c,3));
        cx.fillStyle=E.t==='lugol'?'rgba(110,60,10,.85)':E.t==='azul'?'rgba(25,45,150,.85)':'rgba(120,110,90,'+con*.5+')';
        cx.beginPath();cx.ellipse(nx,ny,Math.max(1,11*s),Math.max(1,8*s),0,0,Math.PI*2);cx.fill();}
      if(cw*s<2)textura('rgba(200,170,90,.25)');}
    else if(M==='elodea'){var ew=70,eh=26;
      if(ew*s<3)textura('rgba(60,150,60,.45)');else
      for(var r2=Math.floor(-half/eh);r2<=half/eh;r2++)for(var c2=Math.floor(-half/ew)-1;c2<=half/ew;c2++){
        var q=P(c2*ew+(r2%2?ew/2:0),r2*eh);cx.fillStyle='rgba(180,230,170,.35)';cx.fillRect(q[0],q[1],ew*s,eh*s);
        cx.strokeStyle='rgba(40,90,40,.85)';cx.lineWidth=Math.max(1,2*s);cx.strokeRect(q[0],q[1],ew*s,eh*s);
        if(2.5*s>=.8)for(var k=0;k<16;k++){cx.fillStyle='rgba(30,140,40,.9)';cx.beginPath();cx.arc(q[0]+(5+60*h(r2,c2,k))*s,q[1]+(5+16*h(c2,r2,k+9))*s,Math.max(.8,2.6*s),0,Math.PI*2);cx.fill();}}}
    else if(M==='mejilla'){var g=95;
      if(60*s<3){textura('rgba(150,160,200,'+(.08+con*.15)+')');}else
      for(var r3=Math.floor(-half/g);r3<=half/g;r3++)for(var c3=Math.floor(-half/g);c3<=half/g;c3++){
        if(h(r3,c3,4)<.35)continue;var o=P(c3*g+(h(r3,c3,5)-.5)*50,r3*g+(h(r3,c3,6)-.5)*50),rr=(26+12*h(r3,c3,7))*s;
        cx.beginPath();for(var v=0;v<7;v++){var a=v/7*Math.PI*2,rad=rr*(.8+.35*h(r3,c3,v+10));cx[v?'lineTo':'moveTo'](o[0]+Math.cos(a)*rad,o[1]+Math.sin(a)*rad);}cx.closePath();
        cx.fillStyle=E.t==='azul'?'rgba(120,160,230,.25)':'rgba(255,255,255,.05)';cx.fill();cx.strokeStyle='rgba(70,80,130,'+(E.t==='azul'?.7:con*.6)+')';cx.lineWidth=Math.max(1,1.5*s);cx.stroke();
        cx.fillStyle=E.t==='azul'?'rgba(20,40,140,.85)':'rgba(90,90,110,'+con*.5+')';cx.beginPath();cx.arc(o[0],o[1],Math.max(1,5*s),0,Math.PI*2);cx.fill();}}
    else if(M==='sangre'){var gs=9;
      if(7.5*s<3)textura('rgba(220,90,110,.55)');else{
      var n2=Math.ceil(half/gs);
      for(var r4=-n2;r4<=n2;r4++)for(var c4=-n2;c4<=n2;c4++){var b=P(c4*gs+(h(r4,c4,1)-.5)*4,r4*gs+(h(r4,c4,2)-.5)*4);
        if(h(r4,c4,3)<.0025){cx.fillStyle='rgba(200,180,230,.9)';cx.beginPath();cx.arc(b[0],b[1],6*s,0,Math.PI*2);cx.fill();cx.fillStyle='rgba(90,30,140,.9)';for(var l=0;l<3;l++){cx.beginPath();cx.arc(b[0]+(l-1)*2.2*s,b[1]+(l%2?1.5:-1.2)*s,1.9*s,0,Math.PI*2);cx.fill();}}
        else{var g2=cx.createRadialGradient(b[0],b[1],.5*s,b[0],b[1],3.75*s);g2.addColorStop(0,'rgba(240,170,170,.8)');g2.addColorStop(1,'rgba(200,60,70,.95)');cx.fillStyle=g2;cx.beginPath();cx.arc(b[0],b[1],3.75*s,0,Math.PI*2);cx.fill();}}}}
    else if(M==='yogur'){
      if(3*s<4)textura('rgba(120,140,200,'+(E.t==='azul'?.25:.06)+')');else{
      var gy=7,n3=Math.ceil(half/gy);cx.lineCap='round';
      for(var r5=-n3;r5<=n3;r5++)for(var c5=-n3;c5<=n3;c5++){if(h(r5,c5,8)<.45)continue;var y=P(c5*gy+(h(r5,c5,1)-.5)*5,r5*gy+(h(r5,c5,2)-.5)*5),ang=h(r5,c5,3)*Math.PI;
        cx.strokeStyle=E.t==='azul'?'rgba(30,50,160,.9)':'rgba(120,120,140,'+con*.6+')';cx.lineWidth=.9*s;cx.beginPath();cx.moveTo(y[0]-Math.cos(ang)*1.6*s,y[1]-Math.sin(ang)*1.6*s);cx.lineTo(y[0]+Math.cos(ang)*1.6*s,y[1]+Math.sin(ang)*1.6*s);cx.stroke();}}}
  }
  if(E.rota){cx.strokeStyle='rgba(60,60,60,.8)';cx.lineWidth=4;cx.beginPath();cx.moveTo(R*.3,R*.2);cx.lineTo(R*.9,R*1.1);cx.lineTo(R*.7,R*1.8);cx.moveTo(R*.9,R*1.1);cx.lineTo(R*1.7,R*1.3);cx.stroke();}
  // aro oscuro del ocular
  var vg=cx.createRadialGradient(R,R,R*.82,R,R,R);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');cx.fillStyle=vg;cx.fillRect(0,0,W,W);
  cx.restore();
  var bl=desenfoque();cv.style.filter=bl>0.3?'blur('+bl.toFixed(1)+'px)':'none';
  function textura(col){cx.fillStyle=col;cx.fillRect(0,0,W,W);for(var i=0;i<900;i++){cx.fillStyle='rgba(0,0,0,'+(.05+.1*h(i,1,2))+')';cx.fillRect(h(i,2,3)*W,h(i,4,5)*W,2,2);}}
}
function desenfoque(){if(!E.lam||E.rota||!E.luz)return 0;var b=Math.abs(E.z-FOCO[E.ob])*PROF[E.ob]/2.2;if(E.ob===100&&!E.aceite)b+=5;return Math.min(14,b);}

/* ── Estado y mensajes ── */
function mensaje(){
  if(!E.lam){msg('Primero escoge la muestra y pon la lámina en la platina (paso 1).');return;}
  if(E.rota){msg('💥 ¡Crack! Subiste la platina con el tornillo grande y el objetivo rompió la lámina. Prepara una nueva y, con 40× o 100×, usa solo el micrométrico.','mal');return;}
  if(!E.luz){msg('Todo se ve negro: enciende la luz (paso 2).');return;}
  var b=desenfoque(),T=10*E.ob,t='Aumento total: <b>'+T+'×</b> (ocular 10× × objetivo '+E.ob+'×). Campo visual: <b>'+CAMPO[E.ob]+' µm</b>. ';
  if(E.ob===100&&!E.aceite)t+='⚠️ A 100× sin <b>aceite de inmersión</b> la imagen se ve borrosa: pon una gota. ';
  else if(b>6)t+='Muy borroso: '+(E.ob<=10?'gira el tornillo macrométrico.':'usa el micrométrico (▲▼).');
  else if(b>1)t+='Casi: termina de enfocar con el micrométrico.';
  else{t+='✅ Enfocado. ';
    if(E.t==='ninguna'&&(E.m==='cebolla'||E.m==='mejilla'))t+=E.d>45?'Las células sin teñir son casi transparentes: <b>cierra un poco el diafragma</b> para ver los bordes, o tiñe la muestra.':'Cerrando el diafragma se ven mejor los bordes. Con un colorante verías el núcleo.';
    else t+=queSeVe();}
  msg(t,b<=1&&!(E.ob===100&&!E.aceite)?'bien':'');
}
function queSeVe(){
  var M=E.m,o=E.ob;
  if(M==='yogur')return o<100?'A este aumento las bacterias son solo puntitos: necesitas 100× con aceite.':'Se ven bastones azules: son lactobacilos, células procariotas sin núcleo.';
  if(M==='sangre')return o<40?'Se ve una mancha rosada: sube a 40×.':'Glóbulos rojos en forma de disco, sin núcleo, y algún glóbulo blanco con el núcleo morado.';
  if(M==='elodea')return o<40?'Se ven filas de células verdes.':'Cada célula está llena de cloroplastos verdes, pegados a la pared.';
  if(M==='mejilla')return o<40?'Células sueltas y planas: sube a 40× para ver el núcleo.':'Células planas e irregulares, sin pared, con el núcleo azul en el centro.';
  return o<10?'Muchas células pequeñas en filas.':o<40?'Células en forma de ladrillo, una junto a otra.':'Se ven la pared celular y el núcleo de cada célula.';
}
var RETOS=[
 {id:'ceb',t:'Observa los núcleos de la cebolla teñida con lugol a 400×.',ok:function(){return E.m==='cebolla'&&E.t==='lugol'&&E.ob===40;},obs:'Células en ladrillo con pared celular y núcleo café.'},
 {id:'mej',t:'Observa tus células de la mejilla con azul de metileno a 400×.',ok:function(){return E.m==='mejilla'&&E.t==='azul'&&E.ob===40;},obs:'Células planas e irregulares, sin pared, con núcleo azul.'},
 {id:'elo',t:'Encuentra los cloroplastos de la Elodea a 400×.',ok:function(){return E.m==='elodea'&&E.ob===40;},obs:'Células vegetales vivas llenas de cloroplastos.'},
 {id:'san',t:'Distingue un glóbulo blanco entre los rojos a 400×.',ok:function(){return E.m==='sangre'&&E.ob===40;},obs:'Glóbulos rojos sin núcleo y glóbulos blancos con núcleo.'},
 {id:'yog',t:'Ve las bacterias del yogur a 1000× con aceite de inmersión.',ok:function(){return E.m==='yogur'&&E.t==='azul'&&E.ob===100&&E.aceite;},obs:'Bastones azules: bacterias sin núcleo.'}
];
function revisar(){
  var listo=E.lam&&!E.rota&&E.luz&&desenfoque()<=1;
  RETOS.forEach(function(r){if(listo&&!E.hechos[r.id]&&r.ok()){E.hechos[r.id]=1;
    var tr=document.createElement('tr');tr.innerHTML='<td>'+MUESTRAS[E.m].n+'</td><td>'+TIN[E.t]+'</td><td>'+(10*E.ob)+'×</td><td>'+r.obs+'</td>';$('ml-tab').appendChild(tr);}});
  $('ml-retos').innerHTML=RETOS.map(function(r){return '<li class="'+(E.hechos[r.id]?'ok':'')+'">'+(E.hechos[r.id]?'✅ ':'⬜ ')+r.t+'</li>';}).join('')+(E.errores?'<li class="mal">Láminas rotas: '+E.errores+'</li>':'');
  if(Object.keys(E.hechos).length>=3&&window.BIO&&BIO.marcarSeccion)BIO.marcarSeccion('microscopio');
}
function real(){var r=document.getElementById('ml-real');if(!r)return;
  if(!E.lam||!E.hechos[RETO_DE[E.m]]||!window.FOTO){r.innerHTML=E.lam?'<p class="ml-real-ayuda">📷 Cumple el reto de esta muestra para compararla con una foto real.</p>':'';return;}
  var f=REAL[E.m];if(r.getAttribute('data-m')===E.m)return;r.setAttribute('data-m',E.m);
  r.innerHTML='<h4>📷 Así se ve en un microscopio real</h4>'+FOTO(f[0],f[1]);}
function todo(){dibujar();mensaje();revisar();real();}

/* ── Controles ── */
function tinciones(){var m=MUESTRAS[$('ml-m').value];$('ml-t').innerHTML=m.tin.map(function(t){return '<option value="'+t+'">'+(t==='ninguna'?(m.tin.length>1?'Sin teñir':'No necesita colorante'):TIN[t])+'</option>';}).join('');if(m.tin.indexOf('lugol')>=0)$('ml-t').value='lugol';else if(m.tin.indexOf('azul')>=0)$('ml-t').value='azul';}
$('ml-m').onchange=tinciones;tinciones();
$('ml-prep').onclick=function(){var rr=document.getElementById('ml-real');if(rr)rr.removeAttribute('data-m');E.m=$('ml-m').value;E.t=$('ml-t').value;E.lam=true;E.rota=false;E.ob=4;E.z=430;E.aceite=false;$('ml-ac').checked=false;$('ml-macro').value=430;
  document.querySelectorAll('#ml-ob .chip').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-o')==='4');});todo();};
$('ml-luz').onclick=function(){E.luz=!E.luz;this.textContent=E.luz?'💡 Apagar':'💡 Encender';todo();};
$('ml-d').oninput=function(){E.d=+this.value;todo();};
$('ml-ac').onchange=function(){E.aceite=this.checked;if(E.aceite&&E.ob!==100)msg('El aceite solo se usa con el objetivo de 100×.');else todo();};
document.querySelectorAll('#ml-ob .chip').forEach(function(b){b.onclick=function(){E.ob=+b.getAttribute('data-o');document.querySelectorAll('#ml-ob .chip').forEach(function(x){x.classList.toggle('on',x===b);});todo();};});
$('ml-macro').oninput=function(){var nz=+this.value;
  if(E.lam&&!E.rota&&E.ob>=40&&nz>FOCO[E.ob]+8){E.rota=true;E.errores++;}
  E.z=nz;todo();};
document.querySelectorAll('[data-mi]').forEach(function(b){b.onclick=function(){E.z+= +b.getAttribute('data-mi');$('ml-macro').value=E.z;todo();};});
$('ml-calc').onclick=function(){var n=+$('ml-n').value,r=$('ml-res');
  if(!n){r.textContent='Escribe cuántas células contaste.';return;}
  var t=Math.round(1800/n);r.innerHTML='Tamaño de cada célula ≈ 1800 µm ÷ '+n+' = <b>'+t+' µm</b> ('+(t/1000).toFixed(2).replace('.',',')+' mm). '+
   (t>=170&&t<=360?'✅ ¡Muy bien! Una célula de cebolla mide unos 250 µm de largo: casi un cuarto de milímetro.':'Revisa tu conteo a 100×: las células de cebolla miden unos 250 µm de largo, así que caben unas 7 a lo largo del campo.');};
todo();
})();
