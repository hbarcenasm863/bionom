/* ════════════════════════════════════════════════════════════════════════
   bio.js — piezas comunes de BioNom (todas las páginas)
   - Menú superior, barra inferior del celular, pie de página.
   - Registro de páginas y secciones visitadas (para el mapa de la portada).
   - Componentes interactivos que se escriben solo con HTML:
       .chequeo  pregunta con respuesta inmediata y explicación
       .pasos    explicación paso a paso con puntos y botones
       .flip     tarjeta que se voltea
       .tabs     pestañas (botones .chip con data-tab → .tab-p con ese id)
       .term     palabra con definición emergente (data-def)
   - BIO.clasificar(): actividad de llevar fichas a cajas (tocar o arrastrar).
   ════════════════════════════════════════════════════════════════════════ */
/* Modelo de clasificación que usa el docente: 5, 6 o 7 reinos, con o sin los
   3 dominios. Se guarda en el dispositivo (bionom_clasificacion) y se puede fijar
   con un enlace: ...?reinos=6&dominios=si. Lo usan reinos.html, el juego y el
   panel docente para mostrar solo las preguntas y textos de ese modelo.
   BIO_CLASIF.vale(m): m vacío = sirve en todo modelo; m='67' = solo 6 y 7 reinos.
   BIO_CLASIF.valeD(d): d=1 = solo si se trabajan los dominios. */
window.BIO_CLASIF=(function(){
  var C={r:5,d:0};
  try{var g=JSON.parse(localStorage.getItem('bionom_clasificacion')||'null');if(g&&[5,6,7].indexOf(g.r)>=0)C={r:g.r,d:g.d?1:0};}catch(e){}
  try{var q=new URLSearchParams(location.search),r=+q.get('reinos'),d=q.get('dominios');
    if([5,6,7].indexOf(r)>=0)C.r=r;if(d)C.d=/^(si|sí|1|true)$/i.test(d)?1:0;
    if(r||d)localStorage.setItem('bionom_clasificacion',JSON.stringify(C));}catch(e){}
  C.vale=function(m){return !m||String(m).indexOf(String(C.r))>=0;};
  C.valeD=function(d){return !d||!!C.d;};
  C.guardar=function(r,d){C.r=r;C.d=d?1:0;try{localStorage.setItem('bionom_clasificacion',JSON.stringify({r:C.r,d:C.d}));}catch(e){}};
  C.texto=function(){return C.r+' reinos'+(C.d?' con 3 dominios':' sin dominios');};
  return C;
})();
(function(){
'use strict';
var MODULOS=[
  {id:'inicio',href:'index.html',ico:'🗺️',txt:'Mapa',full:'Mapa de niveles'},
  {id:'celula',href:'celula.html',ico:'🔬',txt:'Célula',full:'La célula',niveles:['molecula','organelo','celula']},
  {id:'division',href:'division.html',ico:'✂️',txt:'División',full:'División celular: mitosis y meiosis',niveles:['celula','organismo']},
  {id:'reinos',href:'reinos.html',ico:'🍄',txt:'Reinos',full:'Reinos y clasificación',niveles:['organismo']},
  {id:'ecosistemas',href:'ecosistemas.html',ico:'🌳',txt:'Ecosistemas',full:'Ecosistemas',niveles:['poblacion','comunidad','ecosistema','bioma','biosfera']},
  {id:'regiones',href:'regiones.html',ico:'<span class="co" role="img" aria-label="Colombia"></span>',txt:'Colombia',full:'Ecosistemas de Colombia',niveles:['ecosistema','bioma']},
  {id:'ambiente',href:'ambiente.html',ico:'🌍',txt:'Ambiente',full:'Ambiente y cambio climático',niveles:['ecosistema','biosfera']},
  {id:'sistemas',href:'sistemas.html',ico:'❤️',txt:'Sistemas',full:'Sistemas del cuerpo',niveles:['tejido','organo','sistema','organismo']},
  {id:'funciones',padre:'sistemas',href:'funciones.html',ico:'🐙',txt:'Funciones',full:'Funciones vitales comparadas',niveles:['organo','sistema','organismo']},
  {id:'nutricion',padre:'sistemas',href:'nutricion.html',ico:'🍎',txt:'Nutrición',full:'Nutrición y salud',niveles:['molecula','organismo']},
  {id:'reproduccion',href:'reproduccion.html',ico:'👶',txt:'Reproducción',full:'Reproducción',niveles:['celula','organo','sistema','organismo','poblacion']},
  {id:'genetica',href:'genetica.html',ico:'🧬',txt:'Genética',full:'Genética mendeliana y molecular',niveles:['molecula','celula','organismo']},
  {id:'evolucion',href:'evolucion.html',ico:'🦎',txt:'Evolución',full:'Evolución',niveles:['poblacion','organismo']},
  {id:'juego',href:'juego.html',ico:'🎮',txt:'Juego',full:'Juego'},
  {id:'docente',href:'docente.html',ico:'📘',txt:'Docente',full:'Docente'}
];
var pagina=(location.pathname.split('/').pop()||'index.html').toLowerCase();
var actual=MODULOS.filter(function(m){return m.href===pagina;})[0];

/* ── progreso guardado en este dispositivo ── */
function leer(k,def){try{var v=JSON.parse(localStorage.getItem(k));return v==null?def:v;}catch(e){return def;}}
function guardar(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var visitas=leer('bionom_visitas',{});
if(actual){visitas[actual.id]=Date.now();guardar('bionom_visitas',visitas);}
var secciones=leer('bionom_secciones',{});
function marcarSeccion(id){
  if(!actual||!id)return;
  var k=actual.id+'#'+id;
  if(secciones[k])return;
  secciones[k]=1;guardar('bionom_secciones',secciones);
  var a=document.querySelector('.toc a[href="#'+id+'"]');if(a)a.classList.add('hecho');
}

/* ── menú, barra inferior y pie ── */
/* Subpáginas: una familia (tema principal + sus subpáginas) comparte una barra
   arriba de la página, para que el menú principal no crezca. */
function armarSubnav(){
  if(!actual||document.querySelector('.sub-nav'))return;
  var raiz=actual.padre||actual.id,hijos=MODULOS.filter(function(m){return m.padre===raiz;});
  if(!hijos.length)return;
  var fam=[MODULOS.filter(function(m){return m.id===raiz;})[0]].concat(hijos),main=document.querySelector('main');if(!main)return;
  var n=document.createElement('nav');n.className='sub-nav';n.setAttribute('aria-label','Páginas de este tema');
  n.innerHTML=fam.map(function(m,i){return (i?'<span class="sep" aria-hidden="true">›</span>':'')+'<a href="'+m.href+'"'+(m.id===actual.id?' class="on" aria-current="page"':'')+'><span aria-hidden="true">'+m.ico+'</span> '+m.full+'</a>';}).join('');
  main.insertBefore(n,main.firstChild);
}
function armarMenu(){
  armarSubnav();
  var nav=document.querySelector('.site-nav');
  if(nav&&!nav.children.length){
    nav.innerHTML='<a class="nav-brand" href="index.html"><img src="icons/icon-192.png" alt="" width="32" height="32"><span><span class="bio">Bio</span><b>Nom</b></span></a><div class="nav-links">'+
      MODULOS.filter(function(m){return !m.padre;}).map(function(m){return '<a href="'+m.href+'"'+(actual&&m.id===(actual.padre||actual.id)?' class="active" aria-current="page"':'')+' title="'+m.full+'"><span aria-hidden="true">'+m.ico+'</span><span class="full">'+m.txt+'</span></a>';}).join('')+'</div>';
  }
  if(!document.querySelector('.bot-nav')){
    var princ=['inicio','celula','ecosistemas','juego'];
    var b=document.createElement('nav');b.className='bot-nav';b.setAttribute('aria-label','Menú principal');
    b.innerHTML=MODULOS.filter(function(m){return princ.indexOf(m.id)>=0;}).map(function(m){
      return '<a href="'+m.href+'"'+(actual&&m.id===actual.id?' class="active"':'')+'><span class="i">'+m.ico+'</span>'+m.txt+'</a>';
    }).join('')+'<button type="button" id="bot-mas"><span class="i">☰</span>Más</button>';
    document.body.appendChild(b);
    b.querySelector('#bot-mas').addEventListener('click',function(){
      var o=document.createElement('div');o.className='mas-menu';
      o.innerHTML='<div class="mm-caja" role="dialog" aria-label="Todos los módulos">'+MODULOS.map(function(m){
        return '<a href="'+m.href+'"'+(m.padre?' style="padding-left:28px;font-size:.92em"':'')+'><span style="font-size:1.3rem">'+(m.padre?'↳ ':'')+m.ico+'</span>'+m.full+(visitas[m.id]?' <span style="color:var(--cn-ok)">✓</span>':'')+'</a>';}).join('')+'</div>';
      var tz=document.getElementById('text-zoom-widget'),caja=o.querySelector('.mm-caja');
      if(tz){var t=document.createElement('div');t.className='tz-t';t.textContent='Tamaño de la letra';caja.appendChild(t);caja.appendChild(tz);}
      o.addEventListener('click',function(e){if(e.target===o){if(tz)document.body.appendChild(tz);o.remove();}});
      document.body.appendChild(o);
    });
  }
  var pie=document.querySelector('.site-foot');
  if(pie&&!pie.children.length){
    pie.innerHTML='<b>Bio<span style="color:#9be3a8">Nom</span></b> · Biología interactiva por niveles de organización<br>© 2026 Harvey Bárcenas Morales · Licencia CC BY-NC 4.0';
  }
}

/* ── chequeo rápido ── */
function montarChequeos(raiz){
  (raiz||document).querySelectorAll('.chequeo:not([data-listo])').forEach(function(c){
    c.setAttribute('data-listo','');
    var ok=+c.getAttribute('data-ok'),fb=c.querySelector('.fb');
    if(!fb){fb=document.createElement('div');fb.className='fb';fb.setAttribute('aria-live','polite');c.appendChild(fb);}
    var ops=[].slice.call(c.querySelectorAll('.op'));
    ops.forEach(function(b,i){
      b.type='button';
      b.addEventListener('click',function(){
        if(c.classList.contains('resuelto'))return;
        var exp=c.getAttribute('data-exp')||'';
        var por=b.getAttribute('data-por');
        if(i===ok){
          b.classList.add('ok');c.classList.add('resuelto');
          fb.className='fb ok';fb.innerHTML='<b>¡Correcto!</b> '+exp;
          var sec=c.closest('.sec');if(sec)marcarSeccion(sec.id);
          BIO.sumar&&BIO.sumar();
        }else{
          b.classList.add('mal');b.disabled=true;
          fb.className='fb mal';fb.innerHTML='<b>Todavía no.</b> '+(por||'Vuelve a leer la explicación de arriba e inténtalo otra vez.');
        }
      });
    });
  });
}

/* ── paso a paso ── */
function montarPasos(raiz){
  (raiz||document).querySelectorAll('.pasos:not([data-listo])').forEach(function(P){
    P.setAttribute('data-listo','');
    var pasos=[].slice.call(P.querySelectorAll('.paso'));
    var body=document.createElement('div');body.className='p-body';
    pasos.forEach(function(p){body.appendChild(p);});
    var top=document.createElement('div');top.className='p-top';
    var nav=document.createElement('div');nav.className='p-nav';
    nav.innerHTML='<button type="button" class="cn-btn">← Anterior</button><button type="button" class="cn-btn cn-btn--primary">Siguiente →</button>';
    var tit=P.getAttribute('data-titulo');
    if(tit){var h=document.createElement('div');h.style.cssText='font-weight:800;align-self:center;margin-right:8px;color:var(--cn-brand-d)';h.textContent=tit;top.appendChild(h);}
    var dots=pasos.map(function(p,i){var d=document.createElement('button');d.type='button';d.className='p-dot';d.textContent=i+1;d.title=p.getAttribute('data-t')||('Paso '+(i+1));d.addEventListener('click',function(){ir(i,true);});top.appendChild(d);return d;});
    P.innerHTML='';P.appendChild(top);P.appendChild(body);P.appendChild(nav);
    var k=0;
    function ir(i,desdeUsuario){
      k=Math.max(0,Math.min(pasos.length-1,i));
      pasos.forEach(function(p,j){p.classList.toggle('on',j===k);});
      dots.forEach(function(d,j){d.classList.toggle('on',j===k);if(j<=k)d.classList.add('visto');});
      nav.children[0].disabled=k===0;
      nav.children[1].textContent=k===pasos.length-1?'✓ Terminado':'Siguiente →';
      nav.children[1].disabled=k===pasos.length-1;
      var fn=P.getAttribute('data-alcambiar');if(fn&&window[fn])window[fn](k,P);
      if(desdeUsuario)narrarParte(P,pasos[k]);
      if(k===pasos.length-1){var sec=P.closest('.sec');if(sec)marcarSeccion(sec.id);}
    }
    nav.children[0].addEventListener('click',function(){ir(k-1,true);});
    nav.children[1].addEventListener('click',function(){ir(k+1,true);});
    ir(0);
  });
}

/* ── tarjetas que se voltean ── */
function montarFlips(raiz){
  (raiz||document).querySelectorAll('.flip:not([data-listo])').forEach(function(f){
    f.setAttribute('data-listo','');f.tabIndex=0;f.setAttribute('role','button');
    function t(){f.classList.toggle('on');}
    f.addEventListener('click',t);
    f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t();}});
  });
}

/* Narración por pasos (recomendación 2 de la auditoría): si el estudiante
   escuchó esta sección con «🔊 Escuchar», al cambiar de paso o de pestaña se
   lee solo el texto nuevo, sin volver a tocar el botón. */
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.narr-btn');if(!b)return;
  var sec=b.closest('.sec');if(!sec)return;
  if(b.getAttribute('aria-pressed')==='true')sec.removeAttribute('data-narrado');else sec.setAttribute('data-narrado','');
},true);
function narrarParte(cont,parte){
  var sec=cont&&cont.closest('.sec');
  if(!sec||!parte||!sec.hasAttribute('data-narrado')||!window.CN_NARRAR)return;
  var btn=sec.querySelector('.narr-btn');if(!btn)return;
  var t=CN_NARRAR.textoDe(parte);if(!t)return;
  CN_NARRAR.parar();CN_NARRAR.leer(t,btn,sec);
}
/* ── «Escribe tu conclusión» (versión 2.27) ──
   <div class="conclusion" data-lab="papa" data-tabla="id-de-la-tabla" data-titulo="Laboratorio de…"></div>
   El estudiante escribe hipótesis, resultados y conclusión. Se guarda solo en este
   equipo (bionom_conclusion_<lab>) y se puede imprimir o guardar como PDF con la
   tabla de resultados del laboratorio. */
function montarConclusiones(raiz){
  (raiz||document).querySelectorAll('.conclusion:not([data-listo])').forEach(function(C){
    C.setAttribute('data-listo','');
    var lab=C.getAttribute('data-lab')||'lab',clave='bionom_conclusion_'+lab,tit=C.getAttribute('data-titulo')||'Informe de laboratorio';
    var CAMPOS=[['hip','🔮 Mi hipótesis','¿Qué esperabas que pasara y por qué?'],['res','📊 Mis resultados','¿Qué observaste? Escribe los datos más importantes.'],['con','✅ Mi conclusión','¿Se cumplió tu hipótesis? ¿Qué datos lo muestran?'],['mej','🔁 Lo haría distinto','¿Qué cambiarías o qué nueva pregunta te queda?']];
    var g={};try{g=JSON.parse(localStorage.getItem(clave)||'{}');}catch(e){}
    var es=function(t){return String(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');};
    C.innerHTML='<div class="card concl"><h3>✍️ Escribe tu conclusión</h3><p class="concl-ayuda">Comunicar lo que encontraste es parte del trabajo científico. Se guarda en este equipo mientras escribes.</p>'+
      '<div class="concl-fila"><label>Nombre <input type="text" data-c="nom" value="'+es(g.nom)+'"></label><label>Curso <input type="text" data-c="cur" value="'+es(g.cur)+'" style="max-width:7em"></label></div>'+
      CAMPOS.map(function(c){return '<label class="concl-c"><b>'+c[1]+'</b><span>'+c[2]+'</span><textarea rows="3" data-c="'+c[0]+'">'+es(g[c[0]])+'</textarea></label>';}).join('')+
      '<div class="concl-bt"><button type="button" class="cn-btn cn-btn--primary" data-acc="imp">🖨️ Imprimir o guardar en PDF</button><button type="button" class="cn-btn" data-acc="bor">🗑️ Borrar</button><span class="concl-ok" aria-live="polite"></span></div></div>';
    var ok=C.querySelector('.concl-ok'),tm=null;
    C.addEventListener('input',function(e){var c=e.target.getAttribute('data-c');if(!c)return;g[c]=e.target.value;try{localStorage.setItem(clave,JSON.stringify(g));}catch(x){}
      clearTimeout(tm);ok.textContent='Guardado ✓';tm=setTimeout(function(){ok.textContent='';},1500);});
    C.querySelector('[data-acc="bor"]').onclick=function(){if(!confirm('¿Borrar lo que escribiste en este informe?'))return;g={};try{localStorage.removeItem(clave);}catch(x){}C.querySelectorAll('[data-c]').forEach(function(x){x.value='';});};
    C.querySelector('[data-acc="imp"]').onclick=function(){
      var tb=C.getAttribute('data-tabla')&&document.getElementById(C.getAttribute('data-tabla'));
      var w=window.open('','_blank');if(!w){alert('Permite las ventanas emergentes para imprimir el informe.');return;}
      var f=new Date().toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'});
      w.document.write('<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>'+es(tit)+'</title><style>body{font-family:Outfit,Arial,sans-serif;max-width:720px;margin:24px auto;padding:0 16px;color:#1f2937}h1{font-size:1.4rem;color:#14532d;margin:0}p.m{color:#475569;margin:4px 0 16px}h2{font-size:1.05rem;color:#14532d;margin:18px 0 4px}.r{white-space:pre-wrap;border:1px solid #cbd5e1;border-radius:8px;padding:8px 10px;min-height:2.5em}table{border-collapse:collapse;width:100%;margin-top:6px}td,th{border:1px solid #94a3b8;padding:4px 8px;font-size:.9rem;text-align:left}th{background:#e2e8f0}</style></head><body>'+
        '<h1>🧪 '+es(tit)+'</h1><p class="m">BioNom · '+es(g.nom||'Nombre: ____________')+' · Curso '+es(g.cur||'____')+' · '+f+'</p>'+
        (tb?'<h2>📋 Datos del laboratorio</h2>'+tb.outerHTML:'')+
        CAMPOS.map(function(c){return '<h2>'+c[1]+'</h2><div class="r">'+es(g[c[0]]||'')+'</div>';}).join('')+'</body></html>');
      w.document.close();w.focus();setTimeout(function(){w.print();},300);};
  });
}
/* ── pestañas ── */
function montarTabs(raiz){
  (raiz||document).querySelectorAll('.tabs:not([data-listo])').forEach(function(T){
    T.setAttribute('data-listo','');
    var bs=[].slice.call(T.querySelectorAll('[data-tab]'));
    function ir(b){
      bs.forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b);var p=document.getElementById(x.getAttribute('data-tab'));if(p)p.classList.toggle('on',x===b);});
      var fn=T.getAttribute('data-alcambiar');if(fn&&window[fn])window[fn](b.getAttribute('data-tab'));
      narrarParte(T,document.getElementById(b.getAttribute('data-tab')));
    }
    bs.forEach(function(b){b.type='button';b.addEventListener('click',function(){ir(b);});});
    ir(bs.filter(function(b){return b.classList.contains('on');})[0]||bs[0]);
  });
}

/* ── términos con definición ── */
var pop=null;
function cerrarPop(){if(pop){pop.remove();pop=null;}}
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('.term');
  cerrarPop();
  if(!t)return;
  pop=document.createElement('div');pop.className='tip-pop';pop.setAttribute('role','tooltip');
  pop.innerHTML='<b>'+t.textContent+':</b> '+t.getAttribute('data-def');
  document.body.appendChild(pop);
  var r=t.getBoundingClientRect(),w=pop.offsetWidth;
  pop.style.left=Math.max(8,Math.min(window.innerWidth-w-8,r.left+window.scrollX))+'px';
  pop.style.top=(r.bottom+window.scrollY+6)+'px';
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')cerrarPop();});
function montarTerms(raiz){
  (raiz||document).querySelectorAll('.term:not([tabindex])').forEach(function(t){t.tabIndex=0;t.setAttribute('role','button');
    t.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();t.click();}});});
}

/* ── índice de la página: resalta la sección visible y marca las vistas ── */
function montarToc(){
  var links=[].slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  links.forEach(function(a){if(actual&&secciones[actual.id+'#'+a.getAttribute('href').slice(1)])a.classList.add('hecho');});
  if(!('IntersectionObserver' in window))return;
  var obs=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id);});
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  document.querySelectorAll('.sec[id]').forEach(function(s){obs.observe(s);});
  // una sección se da por vista cuando se llega a su final
  var fin=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){marcarSeccion(e.target.getAttribute('data-sec'));fin.unobserve(e.target);}});});
  document.querySelectorAll('.sec[id]').forEach(function(s){var m=document.createElement('i');m.setAttribute('data-sec',s.id);m.setAttribute('aria-hidden','true');s.appendChild(m);fin.observe(m);});
}

/* ── utilidades ── */
function barajar(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

/* ── clasificar: fichas → cajas (tocar ficha y luego caja, o arrastrar) ──
   op = {cajas:[{id, titulo}], fichas:[{t, caja, exp}], alTerminar(fn)} */
function clasificar(cont,op){
  var fichas=barajar(op.fichas),hechas=0,errores=0,sel=null;
  cont.innerHTML='<div class="marcador" aria-live="polite"></div><div class="pool"></div><div class="cajas">'+
    op.cajas.map(function(c){return '<div class="caja" data-caja="'+c.id+'" tabindex="0" role="button"><h4>'+c.titulo+'</h4></div>';}).join('')+
    '</div><div class="fb-clas" style="margin-top:10px;font-size:.92rem" aria-live="polite"></div><button type="button" class="cn-btn" style="margin-top:10px">🔄 Empezar de nuevo</button>';
  var pool=cont.querySelector('.pool'),marc=cont.querySelector('.marcador'),fb=cont.querySelector('.fb-clas');
  function pintarMarc(){marc.textContent='Ubicadas: '+hechas+' de '+fichas.length+' · Errores: '+errores;}
  fichas.forEach(function(f,i){
    var el=document.createElement('span');el.className='ficha';el.textContent=f.t;el.tabIndex=0;el.setAttribute('role','button');el.draggable=true;el._f=f;
    el.addEventListener('click',function(){if(el.classList.contains('ok'))return;if(sel)sel.classList.remove('sel');sel=el===sel?null:el;if(sel)sel.classList.add('sel');});
    el.addEventListener('keydown',function(e){if(e.key==='Enter')el.click();});
    el.addEventListener('dragstart',function(e){sel=el;e.dataTransfer.setData('text','x');});
    pool.appendChild(el);
  });
  function soltar(caja){
    if(!sel)return;
    var f=sel._f,el=sel;sel.classList.remove('sel');sel=null;
    if(f.caja===caja.getAttribute('data-caja')){
      el.classList.add('ok');el.draggable=false;caja.appendChild(el);hechas++;
      fb.innerHTML='✅ <b>'+esc(f.t)+'</b>: '+(f.exp||'¡bien ubicada!');
      if(hechas===fichas.length){fb.innerHTML='🎉 <b>¡Completaste la clasificación!</b> '+(errores?'Tuviste '+errores+' error(es); revisa por qué.':'¡Sin errores!');if(op.alTerminar)op.alTerminar(errores);var sec=cont.closest('.sec');if(sec)marcarSeccion(sec.id);}
    }else{
      errores++;el.classList.remove('mal');void el.offsetWidth;el.classList.add('mal');
      fb.innerHTML='❌ <b>'+esc(f.t)+'</b> no va en «'+caja.querySelector('h4').textContent+'». '+(f.pista||'Piensa en sus características principales.');
    }
    pintarMarc();
  }
  cont.querySelectorAll('.caja').forEach(function(c){
    c.addEventListener('click',function(e){if(e.target.closest('.ficha.ok'))return;soltar(c);});
    c.addEventListener('keydown',function(e){if(e.key==='Enter')soltar(c);});
    c.addEventListener('dragover',function(e){e.preventDefault();c.classList.add('over');});
    c.addEventListener('dragleave',function(){c.classList.remove('over');});
    c.addEventListener('drop',function(e){e.preventDefault();c.classList.remove('over');soltar(c);});
  });
  cont.querySelector('.cn-btn').addEventListener('click',function(){clasificar(cont,op);});
  pintarMarc();
}

function deslizables(){
  document.querySelectorAll('main canvas, main svg.ancha').forEach(function(c){
    if(c.parentNode.classList.contains('desliza'))return;
    var w=document.createElement('div');w.className='desliza';c.parentNode.insertBefore(w,c);w.appendChild(c);
    var av=document.createElement('div');av.className='desliza-aviso';av.textContent='← desliza para ver toda la figura →';w.parentNode.insertBefore(av,w.nextSibling);
  });
}
function montarTodo(raiz){montarChequeos(raiz);montarPasos(raiz);montarFlips(raiz);montarTabs(raiz);montarTerms(raiz);montarConclusiones(raiz);}

window.BIO={MODULOS:MODULOS,actual:actual,visitas:visitas,secciones:secciones,leer:leer,guardar:guardar,marcarSeccion:marcarSeccion,
  montar:montarTodo,clasificar:clasificar,barajar:barajar,esc:esc};

if(!document.getElementById('bio-bg')){var bg=document.createElement('div');bg.id='bio-bg';bg.setAttribute('aria-hidden','true');document.body.insertBefore(bg,document.body.firstChild);}
armarMenu();
montarTodo();
deslizables();
montarToc();

if('serviceWorker' in navigator&&location.protocol!=='file:'){
  window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});
}
})();

/* (Versión 2.18) Se quitó el desplazamiento automático hacia las explicaciones:
   en el celular hacía bajar la página sola al resolver ejercicios. */
/* ── Contigüidad espacial en el celular SIN mover la página (versión 2.21) ──
   Si al tocar algo la explicación nueva queda fuera de la pantalla, se muestra
   una copia en un recuadro flotante abajo. Sus botones funcionan (llaman a
   los botones originales) y el recuadro se cierra solo cuando la explicación
   original queda a la vista, al tocar ✕ o al cambiar de tamaño la pantalla. */
(function(){
  if(!window.MutationObserver||!document.body)return;
  if(/(^|\/)(index|juego|docente)\.html$|\/$/.test(location.pathname))return;
  var ult=0,panel=null,fuente=null,io=null,cuerpo=null;
  document.addEventListener('pointerdown',function(e){if(!(panel&&panel.contains(e.target)))ult=Date.now();},true);
  document.addEventListener('input',function(){ult=Date.now();},true);
  document.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')ult=Date.now();},true);
  function cerrar(){if(panel)panel.hidden=true;if(io&&fuente)io.unobserve(fuente);fuente=null;}
  function armar(){
    panel=document.createElement('aside');panel.className='flota-exp';panel.setAttribute('aria-label','Explicación');panel.hidden=true;
    panel.innerHTML='<div class="fe-bar"><b>💡 Mira la explicación</b><button type="button" class="fe-ir">Ir allá ↓</button><button type="button" class="fe-x" aria-label="Cerrar">✕</button></div><div class="fe-c"></div>';
    document.body.appendChild(panel);cuerpo=panel.querySelector('.fe-c');
    panel.querySelector('.fe-x').onclick=cerrar;
    panel.querySelector('.fe-ir').onclick=function(){var f=fuente;cerrar();if(f)f.scrollIntoView({block:'center'});};
    if(window.IntersectionObserver)io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.target===fuente&&x.intersectionRatio>0.35)cerrar();});},{threshold:[0,0.35,0.6]});
    window.addEventListener('resize',function(){if(window.innerWidth>760)cerrar();});
  }
  function copiar(){
    if(!fuente||!cuerpo)return;
    var c=fuente.cloneNode(true);
    c.removeAttribute('id');c.querySelectorAll('[id]').forEach(function(x){x.removeAttribute('id');});
    c.querySelectorAll('[aria-live]').forEach(function(x){x.removeAttribute('aria-live');});
    var orig=fuente.querySelectorAll('button,a,input,select'),dup=c.querySelectorAll('button,a,input,select');
    dup.forEach(function(d,i){var o=orig[i];if(!o)return;
      if(d.tagName==='BUTTON'||d.tagName==='A')d.addEventListener('click',function(ev){ev.preventDefault();o.click();});
      else{d.disabled=true;}});
    cuerpo.innerHTML='';cuerpo.appendChild(c);cuerpo.scrollTop=cuerpo.scrollHeight;
  }
  function visible(el){var r=el.getBoundingClientRect(),H=window.innerHeight;if(r.height<4)return true;
    var v=Math.min(r.bottom,H-72)-Math.max(r.top,60);return v>=Math.min(80,r.height*0.5);}
  var pend=null;
  new MutationObserver(function(ms){
    if(window.innerWidth>760)return;
    for(var i=0;i<ms.length;i++){
      var t=ms[i].target;if(t.nodeType!==1)t=t.parentElement;if(!t||(panel&&panel.contains(t)))continue;
      var d=t.closest('.det,[aria-live]');
      if(!d||d.closest('.chequeo,.pasos,.an-txt,.flota-exp,.marcador')||/(^| )(fb|fb-clas|marcador)( |$)/.test(d.className))continue;
      if(fuente&&d===fuente){pend=d;break;}
      if(Date.now()-ult>1500)continue;
      pend=d;break;
    }
    if(!pend)return;var d2=pend;pend=null;
    requestAnimationFrame(function(){
      if(!d2.isConnected)return;
      if(visible(d2)){if(d2===fuente)cerrar();return;}
      if(!panel)armar();
      if(io&&fuente&&fuente!==d2)io.unobserve(fuente);
      fuente=d2;copiar();panel.hidden=false;if(io)io.observe(d2);
    });
  }).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
