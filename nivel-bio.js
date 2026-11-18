/* nivel-bio.js — Nivel mínimo de cada pregunta o palabra de BioNom.
   Lo usan juego.html (niveles del juego) y docente-app.js (filtro de nivel del
   panel docente), para que los dos clasifiquen igual (versión 2.55).
   Una pregunta puede traer su nivel explícito en `niv` (1, 2 o 3): si lo trae,
   se respeta. Si no, nivelDe(tema, texto) lo estima por tema y palabras clave. */
/* ── Niveles del juego (versión 2.31): Básico 6.°–7.°, Medio 8.°–9.°, Completo 10.°–11.°.
   Cada pregunta o palabra recibe el nivel mínimo en que se trabaja según los
   Estándares del MEN: lo de profundización es Completo; genética, evolución,
   reproducción y funciones comparadas son Medio (menos lo de 6.°–7.° que tienen:
   origen del universo, extinciones, eras, pubertad, flor, reproducción asexual);
   en los demás temas, alelos, meiosis, arqueas, dominios y hormonas son Medio. */
var NIV_PROF=/\b(éter|éster)\b|potencial de (acción|reposo)|umbral de|mielina|cebador|primasa|okazaki|krebs|glucólisis|piruvato|atp sintasa|crestas|nadh|nadph|tilacoide|estroma|ciclo de calvin|cadena respiratoria|fadh|gradiente de protones|quimiosm|fosforilaci|aceptor final|estabilizadora|disruptiva|deriva (génica|genética)|poiseuille|termodinámica|\bPCR\b|histonas/i;
var NIV_MEDIO_T={genetica:1,evolucion:1,reproduccion:1,funciones:1};
var NIV_BASICO_EN_MEDIO=/big bang|universo|extinci|era geológica|eras geológicas|paleozoico|mesozoico|cenozoico|precámbrico|fósil|miller|oparin|origen de la vida|meteorito|pubertad|menstrua|ovario|testícul|aparato reproductor|sistema reproductor|asexual|biparti|gemaci|esqueje|tubérculo|flor\b|poliniz|semilla|fruto|estambre|pistilo/i;
var NIV_MEDIO_EN_BASICO=/alelo|genotip|fenotip|heterocig|homocig|meiosis|entrecruzamiento|haploide|diploide|cariotipo|síndrome de down|no disyunci|arquea|archaea|archaebacteria|dominio|woese|hormona|insulina|tiroides|homeostasis|adrenalina/i;
function nivelDe(t,texto){if(NIV_PROF.test(texto))return 3;
  if(NIV_MEDIO_T[t])return NIV_BASICO_EN_MEDIO.test(texto)?1:2;
  return NIV_MEDIO_EN_BASICO.test(texto)?2:1;}

/* Niveles con su nombre (los mismos del juego). */
window.BIO_NIVEL={
  NOM:{1:'Básico (6.° y 7.°)',2:'Medio (8.° y 9.°)',3:'Completo (10.° y 11.°)'},
  CORTO:{1:'Básico',2:'Medio',3:'Completo'},
  /* Nivel de una pregunta: el explícito (`niv`) o el estimado. `q` puede ser una
     pregunta Saber ({t,ctx,q,o,exp}), del juego ({t,q,ops,exp}) o una abierta
     (texto) con su tema. Se guarda en q.niv para no recalcularlo. */
  de:function(q,tema){
    if(typeof q==='string'){var f=BIO_NIVEL.fijo(q);return f!=null?f:nivelDe(tema,q);}
    if(q.niv!=null)return q.niv;
    var tx=[q.ctx,q.q,q.exp,(q.o||q.ops||[]).join(' ')].join(' ');
    q.niv=nivelDe(q.t||tema,tx);return q.niv;},
  /* Preguntas abiertas con nivel fijo (por el comienzo del texto). */
  FIJO:{
    'Compara la respiración con oxígeno y la fermentación':2,
    'Explica con tus palabras dónde ocurre cada etapa de la respiración celular':3
  },
  fijo:function(s){for(var k in BIO_NIVEL.FIJO)if(s.indexOf(k)===0)return BIO_NIVEL.FIJO[k];return null;}
};
