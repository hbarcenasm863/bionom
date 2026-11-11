/* BioNom · modelos 3D sencillos que el estudiante gira con el dedo o el ratón.
   No usa librerías: dibuja esferas y enlaces en un <canvas> con perspectiva.
   Uso: M3D.montar(elemento,'atomo_O')  (el elemento recibe un canvas).
   Modelos: atomo_O, atomo_C, atomo_Fe (modelo de capas de Bohr, no está a
   escala), adn, clorofila y melanina (modelos simplificados de bolas y
   varillas). Colores de los átomos: C gris, H blanco, O rojo, N azul,
   P naranja, Mg verde. */
(function(){
var COL={C:'#4b5563',H:'#e5e7eb',O:'#e11d48',N:'#2563eb',P:'#f59e0b',Mg:'#16a34a',p:'#ef4444',n:'#9ca3af',e:'#0ea5e9'};
var RAD={C:.75,H:.42,O:.72,N:.72,P:.95,Mg:1.05};

/* ── Átomo: núcleo de protones y neutrones + electrones en capas ── */
function atomo(Z,N,capas){
  var A=[],B=[],k,i,tot=Z+N,rn=Math.cbrt(tot)*0.55;
  for(k=0;k<tot;k++){ // esferas del núcleo repartidas en una bola (espiral de Fibonacci)
    var f=(k+.5)/tot,r=rn*Math.cbrt(f),th=Math.acos(1-2*((k*0.618)%1)),ph=k*2.39996;
    A.push({x:r*Math.sin(th)*Math.cos(ph),y:r*Math.sin(th)*Math.sin(ph),z:r*Math.cos(th),r:.5,c:k%2?COL.n:COL.p});
  }
  // recuenta para que haya exactamente Z protones
  var np=0;A.forEach(function(a){if(a.c===COL.p)np++;});
  for(i=0;i<A.length&&np!==Z;i++){if(np>Z&&A[i].c===COL.p){A[i].c=COL.n;np--;}else if(np<Z&&A[i].c===COL.n){A[i].c=COL.p;np++;}}
  var orb=[];
  capas.forEach(function(ne,ci){
    var R=rn+2.2+ci*1.9,tx=0.5+ci*0.9,tz=ci*0.7,pts=[],S=48;
    for(k=0;k<S;k++){var t=k/S*Math.PI*2;pts.push(rot({x:R*Math.cos(t),y:R*Math.sin(t),z:0},tx,tz));}
    var base=A.length;pts.forEach(function(p){A.push({x:p.x,y:p.y,z:p.z,r:0,c:null});});
    for(k=0;k<S;k++)B.push({a:base+k,b:base+(k+1)%S,c1:'rgba(14,116,144,.45)',w:1.2});
    var el=[];for(k=0;k<ne;k++){A.push({x:0,y:0,z:0,r:.42,c:COL.e,brillo:1});el.push(A.length-1);}
    orb.push({R:R,tx:tx,tz:tz,el:el,v:1.1/(ci+1)});
  });
  return {A:A,B:B,anim:function(m,t){orb.forEach(function(o){o.el.forEach(function(ix,j){var a=t*o.v+j*Math.PI*2/o.el.length,p=rot({x:o.R*Math.cos(a),y:o.R*Math.sin(a),z:0},o.tx,o.tz),q=m.A[ix];q.x=p.x;q.y=p.y;q.z=p.z;});});}};
}
function rot(p,ax,az){ // gira un punto alrededor del eje x y luego del eje z
  var y=p.y*Math.cos(ax)-p.z*Math.sin(ax),z=p.y*Math.sin(ax)+p.z*Math.cos(ax),x=p.x;
  return {x:x*Math.cos(az)-y*Math.sin(az),y:x*Math.sin(az)+y*Math.cos(az),z:z};
}
/* ── Moléculas ── */
function mol(lista,extraB){ // lista: [elemento,x,y,z]; enlaces por distancia
  var A=lista.map(function(l){return {e:l[0],x:l[1],y:l[2],z:l[3],r:RAD[l[0]]*0.62,c:COL[l[0]]};}),B=[];
  for(var i=0;i<A.length;i++)for(var j=i+1;j<A.length;j++){
    var d=Math.hypot(A[i].x-A[j].x,A[i].y-A[j].y,A[i].z-A[j].z),lim=(A[i].e==='H'||A[j].e==='H')?1.25:(A[i].e==='Mg'||A[j].e==='Mg')?2.2:1.7;
    if(d<lim)B.push({a:i,b:j,c1:A[i].c,c2:A[j].c,w:5});}
  (extraB||[]).forEach(function(b){B.push(b);});
  return {A:A,B:B};
}
function adn(){ // doble hélice: 10 pares de bases por vuelta, 3,4 Å entre pares
  var A=[],B=[],n=16,R=6,par={A:'#22c55e',T:'#ef4444',G:'#f59e0b',C:'#3b82f6'},sec='ATGCGTACCGATTGCA',comp={A:'T',T:'A',G:'C',C:'G'};
  for(var i=0;i<n;i++){
    var t=i*Math.PI/5,y=(i-n/2)*1.15,a1=t,a2=t+Math.PI*0.78;
    A.push({x:R*Math.cos(a1),y:y,z:R*Math.sin(a1),r:.75,c:COL.P});
    A.push({x:R*Math.cos(a2),y:y,z:R*Math.sin(a2),r:.75,c:COL.P});
    var b=sec[i],m={x:(Math.cos(a1)+Math.cos(a2))*R*0.18,y:y,z:(Math.sin(a1)+Math.sin(a2))*R*0.18};
    A.push({x:m.x,y:y,z:m.z,r:0,c:null});
    var k=A.length-3;
    B.push({a:k,b:k+2,c1:par[b],w:6},{a:k+2,b:k+1,c1:par[comp[b]],w:6});
    if(i){B.push({a:k-3,b:k,c1:'#f59e0b',w:4},{a:k-2,b:k+1,c1:'#a855f7',w:4});}
  }
  return {A:A,B:B};
}
function clorofila(){ // anillo de porfirina con el magnesio en el centro y la cola de fitol
  var L=[['Mg',0,0,0]],k;
  for(k=0;k<4;k++){var t=k*Math.PI/2,c=Math.cos,s=Math.sin;
    L.push(['N',2.05*c(t),2.05*s(t),0]);
    [-.36,.36].forEach(function(d){L.push(['C',2.95*c(t+d),2.95*s(t+d),0]);});
    [-.24,.24].forEach(function(d){L.push(['C',4.25*c(t+d),4.25*s(t+d),0]);});
    L.push(['C',3.45*c(t+Math.PI/4),3.45*s(t+Math.PI/4),0]);
  }
  L.push(['O',5.4,-1.6,0.2],['O',-5.0,-2.6,0.1]);
  var x=-4.2,y=-4.0,z=0; // cola larga de fitol que ancla la clorofila en la membrana
  for(k=0;k<7;k++){x+=(k%2?0.9:-0.6);y-=1.05;z+=(k%2?0.8:-0.5);L.push(['C',x,y,z]);}
  return mol(L);
}
function melanina(){ // tres unidades de 5,6-dihidroxiindol apiladas, como en la eumelanina
  var base=[['C',0,1.4,0],['C',1.21,0.7,0],['C',1.21,-0.7,0],['C',0,-1.4,0],['C',-1.21,-0.7,0],['C',-1.21,0.7,0],
    ['N',2.45,-1.05,0],['C',3.25,0,0],['C',2.45,1.05,0],['O',-2.45,1.35,0],['O',-2.45,-1.35,0],['H',-3.3,0.9,0],['H',-3.3,-0.9,0],['H',2.8,-2.0,0]];
  var L=[];
  [0,1,2].forEach(function(j){var a=j*0.5,dz=(j-1)*3.4;
    base.forEach(function(b){var x=b[1]-0.8,y=b[2];L.push([b[0],x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a),dz]);});});
  return mol(L);
}
var FAB={
  atomo_O:function(){return atomo(8,8,[2,6]);},
  atomo_C:function(){return atomo(6,6,[2,4]);},
  atomo_Fe:function(){return atomo(26,30,[2,8,14,2]);},
  adn:adn,clorofila:clorofila,melanina:melanina
};
var LEY={
  atomo_O:'<b style="color:#ef4444">●</b> 8 protones · <b style="color:#9ca3af">●</b> 8 neutrones · <b style="color:#0ea5e9">●</b> 8 electrones',
  atomo_C:'<b style="color:#ef4444">●</b> 6 protones · <b style="color:#9ca3af">●</b> 6 neutrones · <b style="color:#0ea5e9">●</b> 6 electrones',
  atomo_Fe:'<b style="color:#ef4444">●</b> 26 protones · <b style="color:#9ca3af">●</b> 30 neutrones · <b style="color:#0ea5e9">●</b> 26 electrones',
  adn:'<b style="color:#f59e0b">●</b> fosfato · bases: <b style="color:#22c55e">A</b>–<b style="color:#ef4444">T</b> y <b style="color:#f59e0b">G</b>–<b style="color:#3b82f6">C</b>',
  clorofila:'<b style="color:#16a34a">●</b> Mg · <b style="color:#2563eb">●</b> N · <b style="color:#4b5563">●</b> C · <b style="color:#e11d48">●</b> O',
  melanina:'<b style="color:#4b5563">●</b> C · <b style="color:#2563eb">●</b> N · <b style="color:#e11d48">●</b> O · <b style="color:#9ca3af">●</b> H'
};
function montar(el,nombre){
  if(!FAB[nombre])return;
  var m=FAB[nombre](),cv=document.createElement('canvas'),cx=cv.getContext('2d');
  cv.className='m3d';cv.setAttribute('role','img');cv.setAttribute('aria-label','Modelo 3D que se puede girar');
  cv.style.cssText='width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab';
  el.appendChild(cv);
  var ley=document.createElement('div');ley.className='m3d-ley';ley.innerHTML=(LEY[nombre]||'')+'<span>↔ arrastra para girar</span>';el.appendChild(ley);
  var cxm=0,cym=0,czm=0,nm=0;m.A.forEach(function(a){if(a.r){cxm+=a.x;cym+=a.y;czm+=a.z;nm++;}});
  if(nm&&!m.anim){cxm/=nm;cym/=nm;czm/=nm;m.A.forEach(function(a){a.x-=cxm;a.y-=cym;a.z-=czm;});}
  var R0=0;m.A.forEach(function(a){R0=Math.max(R0,Math.hypot(a.x,a.y,a.z)+(a.r||0));});
  var ay=0.6,ax=-0.35,arr=null,t0=performance.now(),quieto=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,vivo=true,visible=true;
  cv.addEventListener('pointerdown',function(e){arr={x:e.clientX,y:e.clientY,ay:ay,ax:ax};cv.style.cursor='grabbing';});
  window.addEventListener('pointermove',function(e){if(!arr)return;ay=arr.ay+(e.clientX-arr.x)*0.012;ax=Math.max(-1.4,Math.min(1.4,arr.ax+(e.clientY-arr.y)*0.012*(e.pointerType==='touch'?0:1)));});
  window.addEventListener('pointerup',function(){arr=null;cv.style.cursor='grab';});
  if(window.IntersectionObserver)new IntersectionObserver(function(es){visible=es[0].isIntersecting;}).observe(cv);
  function cuadro(now){
    if(!cv.isConnected){vivo=false;return;}
    requestAnimationFrame(cuadro);
    if(!visible)return;
    var dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;
    if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
    var t=(now-t0)/1000;if(!arr&&!quieto)ay+=0.006;
    if(m.anim)m.anim(m,quieto?0:t);
    cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);
    var esc=Math.min(W,H)*0.44/R0,D=R0*4,cy=Math.cos(ay),sy=Math.sin(ay),cxr=Math.cos(ax),sxr=Math.sin(ax);
    var P=m.A.map(function(a){var x=a.x*cy+a.z*sy,z=-a.x*sy+a.z*cy,y=a.y*cxr-z*sxr;z=a.y*sxr+z*cxr;var f=D/(D+z);return {x:W/2+x*esc*f,y:H/2+y*esc*f,z:z,f:f};});
    var items=[];
    m.B.forEach(function(b){items.push({z:(P[b.a].z+P[b.b].z)/2+0.01,b:b});});
    m.A.forEach(function(a,i){if(a.r)items.push({z:P[i].z,i:i});});
    items.sort(function(p,q){return q.z-p.z;});
    items.forEach(function(it){
      if(it.b){var b=it.b,p=P[b.a],q=P[b.b];cx.lineCap='round';
        if(b.c2&&b.c2!==b.c1){var mx=(p.x+q.x)/2,my=(p.y+q.y)/2;cx.lineWidth=b.w*p.f*esc/14;cx.strokeStyle=b.c1;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(mx,my);cx.stroke();cx.strokeStyle=b.c2;cx.beginPath();cx.moveTo(mx,my);cx.lineTo(q.x,q.y);cx.stroke();}
        else{cx.lineWidth=Math.max(1,b.w*p.f*esc/14);cx.strokeStyle=b.c1;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke();}
      }else{var a=m.A[it.i],p2=P[it.i],r=Math.max(1.5,a.r*esc*p2.f),g=cx.createRadialGradient(p2.x-r*.35,p2.y-r*.35,r*.1,p2.x,p2.y,r);
        g.addColorStop(0,'#ffffff');g.addColorStop(.25,a.c);g.addColorStop(1,sombra(a.c));
        cx.fillStyle=g;cx.beginPath();cx.arc(p2.x,p2.y,r,0,Math.PI*2);cx.fill();}
    });
  }
  requestAnimationFrame(cuadro);
}
function sombra(c){ // oscurece un color #rrggbb para el borde de la esfera
  if(c[0]!=='#')return c;var n=parseInt(c.slice(1),16),r=(n>>16)*.45,g=((n>>8)&255)*.45,b=(n&255)*.45;
  return 'rgb('+(r|0)+','+(g|0)+','+(b|0)+')';
}
window.M3D={montar:montar,modelos:Object.keys(FAB)};
})();
