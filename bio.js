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
(function(){
'use strict';
var MODULOS=[
  {id:'inicio',href:'index.html',ico:'🗺️',txt:'Mapa',full:'Mapa de niveles'},
  {id:'celula',href:'celula.html',ico:'🔬',txt:'Célula',full:'La célula',niveles:['molecula','organelo','celula']},
  {id:'reinos',href:'reinos.html',ico:'🍄',txt:'Reinos',full:'Reinos y clasificación',niveles:['organismo']},
  {id:'sistemas',href:'sistemas.html',ico:'🫀',txt:'Sistemas',full:'Sistemas del cuerpo',niveles:['tejido','organo','sistema','organismo']},
  {id:'reproduccion',href:'reproduccion.html',ico:'👶',txt:'Reproducción',full:'Reproducción',niveles:['celula','organo','sistema','organismo','poblacion']},
  {id:'genetica',href:'genetica.html',ico:'🧬',txt:'Genética',full:'Genética mendeliana y molecular',niveles:['molecula','celula','organismo']},
  {id:'evolucion',href:'evolucion.html',ico:'🦎',txt:'Evolución',full:'Evolución',niveles:['poblacion','organismo']},
  {id:'ecosistemas',href:'ecosistemas.html',ico:'🌳',txt:'Ecosistemas',full:'Ecosistemas',niveles:['poblacion','comunidad','ecosistema','bioma','biosfera']},
  {id:'regiones',href:'regiones.html',ico:'🇨🇴',txt:'Colombia',full:'Ecosistemas de Colombia',niveles:['ecosistema','bioma']},
  {id:'ambiente',href:'ambiente.html',ico:'🌍',txt:'Ambiente',full:'Ambiente y cambio climático',niveles:['ecosistema','biosfera']},
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
function armarMenu(){
  var nav=document.querySelector('.site-nav');
  if(nav&&!nav.children.length){
    nav.innerHTML='<a class="nav-brand" href="index.html"><img src="icons/icon-192.png" alt="" width="32" height="32"><span><span class="bio">Bio</span><b>Nom</b></span></a><div class="nav-links">'+
      MODULOS.map(function(m){return '<a href="'+m.href+'"'+(actual&&m.id===actual.id?' class="active" aria-current="page"':'')+' title="'+m.full+'"><span aria-hidden="true">'+m.ico+'</span><span class="full">'+m.txt+'</span></a>';}).join('')+'</div>';
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
        return '<a href="'+m.href+'"><span style="font-size:1.3rem">'+m.ico+'</span>'+m.full+(visitas[m.id]?' <span style="color:var(--cn-ok)">✓</span>':'')+'</a>';}).join('')+'</div>';
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
    var dots=pasos.map(function(p,i){var d=document.createElement('button');d.type='button';d.className='p-dot';d.textContent=i+1;d.title=p.getAttribute('data-t')||('Paso '+(i+1));d.addEventListener('click',function(){ir(i);});top.appendChild(d);return d;});
    P.innerHTML='';P.appendChild(top);P.appendChild(body);P.appendChild(nav);
    var k=0;
    function ir(i){
      k=Math.max(0,Math.min(pasos.length-1,i));
      pasos.forEach(function(p,j){p.classList.toggle('on',j===k);});
      dots.forEach(function(d,j){d.classList.toggle('on',j===k);if(j<=k)d.classList.add('visto');});
      nav.children[0].disabled=k===0;
      nav.children[1].textContent=k===pasos.length-1?'✓ Terminado':'Siguiente →';
      nav.children[1].disabled=k===pasos.length-1;
      var fn=P.getAttribute('data-alcambiar');if(fn&&window[fn])window[fn](k,P);
      if(k===pasos.length-1){var sec=P.closest('.sec');if(sec)marcarSeccion(sec.id);}
    }
    nav.children[0].addEventListener('click',function(){ir(k-1);});
    nav.children[1].addEventListener('click',function(){ir(k+1);});
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

/* ── pestañas ── */
function montarTabs(raiz){
  (raiz||document).querySelectorAll('.tabs:not([data-listo])').forEach(function(T){
    T.setAttribute('data-listo','');
    var bs=[].slice.call(T.querySelectorAll('[data-tab]'));
    function ir(b){
      bs.forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b);var p=document.getElementById(x.getAttribute('data-tab'));if(p)p.classList.toggle('on',x===b);});
      var fn=T.getAttribute('data-alcambiar');if(fn&&window[fn])window[fn](b.getAttribute('data-tab'));
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

function montarTodo(raiz){montarChequeos(raiz);montarPasos(raiz);montarFlips(raiz);montarTabs(raiz);montarTerms(raiz);}

window.BIO={MODULOS:MODULOS,actual:actual,visitas:visitas,secciones:secciones,leer:leer,guardar:guardar,marcarSeccion:marcarSeccion,
  montar:montarTodo,clasificar:clasificar,barajar:barajar,esc:esc};

if(!document.getElementById('bio-bg')){var bg=document.createElement('div');bg.id='bio-bg';bg.setAttribute('aria-hidden','true');document.body.insertBefore(bg,document.body.firstChild);}
armarMenu();
montarTodo();
montarToc();

if('serviceWorker' in navigator&&location.protocol!=='file:'){
  window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});
}
})();
