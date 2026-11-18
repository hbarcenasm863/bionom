/* dba-bio.js — Curso mínimo de cada pregunta según los Derechos Básicos de
   Aprendizaje (DBA) de Ciencias Naturales del MEN (V.1, 2016, grados 6.° a 11.°).
   Lo usa el filtro «Curso» del panel docente (docente-app.js), versión 2.56.

   Cómo se decide el curso de una pregunta:
   1. Si trae `curso` escrito a mano (6 a 11), se respeta.
   2. Si no, se busca en su enunciado y en la opción correcta (NO en la explicación ni
      en los distractores, para que no suban una pregunta general) las
      palabras clave de CURSOS[tema]; gana la regla de mayor curso que coincida.
   3. Si ninguna regla coincide, tiene el curso base del tema (BASE).
   Los DBA dicen qué se enseña en cada curso, pero no a qué curso pertenece cada
   pregunta: el mapeo a preguntas es criterio de BioNom y se puede ajustar aquí
   (BASE, CURSOS) o pregunta por pregunta con `curso`.
   Lo que no está en ningún DBA (por ejemplo, las etapas de la respiración celular:
   glucólisis, Krebs, cadena respiratoria) va como profundización de 10.°. */
(function(){
'use strict';
var FUENTE='Ministerio de Educación Nacional. (2016). Derechos Básicos de Aprendizaje. Ciencias Naturales (V.1). MEN.';

/* DBA de biología, textos tal como están en el documento oficial. `ev` son
   evidencias de aprendizaje citadas (solo las que tocan temas de BioNom). */
var DBA={
 6:[
  {n:4,tx:'Comprende algunas de las funciones básicas de la célula (transporte de membrana, obtención de energía y división celular) a partir del análisis de su estructura.',
   ev:['Explica el rol de la membrana plasmática en el mantenimiento del equilibrio interno de la célula, y describe la interacción del agua y las partículas (ósmosis y difusión) que entran y salen de la célula mediante el uso de modelos.','Explica el proceso de respiración celular e identifica el rol de la mitocondria en dicho proceso.','Interpreta modelos sobre los procesos de división celular (mitosis), como mecanismos que permiten explicar la regeneración de tejidos y el crecimiento de los organismos.'],temas:['celula','division']},
  {n:5,tx:'Comprende la clasificación de los organismos en grupos taxonómicos, de acuerdo con el tipo de células que poseen y reconoce la diversidad de especies que constituyen nuestro planeta y las relaciones de parentesco entre ellas.',
   ev:['Clasifica los organismos en diferentes dominios, de acuerdo con sus tipos de células (procariota, eucariota, animal, vegetal).'],temas:['reinos']}
 ],
 7:[
  {n:3,tx:'Comprende que en las cadenas y redes tróficas existen flujos de materia y energía, y los relaciona con procesos de nutrición, fotosíntesis y respiración celular.',
   ev:['Explica tipos de nutrición (autótrofa y heterótrofa) en las cadenas y redes tróficas dentro de los ecosistemas.','Compara el proceso de fotosíntesis con el de respiración celular, considerando sus reactivos y productos y su función en los organismos.'],temas:['celula','ecosistemas','colombia','funciones','nutricion']},
  {n:4,tx:'Comprende la relación entre los ciclos del carbono, el nitrógeno y del agua, explicando su importancia en el mantenimiento de los ecosistemas.',
   ev:['Explica a partir de casos los efectos de la intervención humana (erosión, contaminación, deforestación) en los ciclos biogeoquímicos del suelo (Carbono, Nitrógeno) y del agua y sus consecuencias ambientales y propone posibles acciones para mitigarlas o remediarlas.'],temas:['ecosistemas','ambiente']}
 ],
 8:[
  {n:4,tx:'Analiza relaciones entre sistemas de órganos (excretor, inmune, nervioso, endocrino, óseo y muscular) con los procesos de regulación de las funciones en los seres vivos.',
   ev:['Relaciona los fenómenos homeostáticos de los organismos con el funcionamiento de órganos y sistemas.','Explica, a través de ejemplos, los efectos de hábitos no saludables en el funcionamiento adecuado de los sistemas excretor, nervioso, inmune, endocrino, óseo y muscular.'],temas:['sistemas','funciones','nutricion']},
  {n:5,tx:'Analiza la reproducción (asexual, sexual) de distintos grupos de seres vivos y su importancia para la preservación de la vida en el planeta.',
   ev:['Identifica riesgos y consecuencias físicas y psicológicas de un embarazo en la adolescencia.','Explica la importancia de la aplicación de medidas preventivas de patologías relacionadas con el sistema reproductor.'],temas:['reproduccion','nutricion']}
 ],
 9:[
  {n:4,tx:'Comprende la forma en que los principios genéticos mendelianos y post-mendelianos explican la herencia y el mejoramiento de las especies existentes.',
   ev:['Demuestra la relación que existe entre el proceso de la meiosis y las segunda y tercera Leyes de la Herencia de Mendel.'],temas:['genetica','division']},
  {n:5,tx:'Explica la forma como se expresa la información genética contenida en el ADN, relacionando su expresión con los fenotipos de los organismos y reconoce su capacidad de modificación a lo largo del tiempo (por mutaciones y otros cambios), como un factor determinante en la generación de diversidad del planeta y en la evolución de las especies.',
   ev:[],temas:['genetica']},
  {n:6,tx:'Analiza teorías científicas sobre el origen de las especies (selección natural y ancestro común) como modelos científicos que sustentan sus explicaciones desde diferentes evidencias y argumentaciones.',
   ev:['Identifica los procesos de transformación de los seres vivos ocurridos en cada una de las eras geológicas.'],temas:['evolucion']}
 ],
 10:[
  {n:4,tx:'Comprende que la biotecnología conlleva el uso y manipulación de la información genética a través de distintas técnicas (fertilización asistida, clonación reproductiva y terapéutica, modificación genética, terapias génicas), y que tiene implicaciones sociales, bioéticas y ambientales.',
   ev:[],temas:['genetica','reproduccion']}
 ],
 11:[
  {n:5,tx:'Analiza cuestiones ambientales actuales, como el calentamiento global, contaminación, tala de bosques y minería, desde una visión sistémica (económico, social, ambiental y cultural).',
   ev:['Identifica las implicaciones que tiene para Colombia, en los ámbitos social, ambiental y cultural el hecho de ser «un país mega diverso».'],temas:['ambiente','colombia']}
 ]
};

/* Curso base de cada tema: el primero en que un DBA lo trabaja. */
var BASE={celula:6,division:6,reinos:6,ecosistemas:7,colombia:7,ambiente:7,sistemas:8,funciones:7,nutricion:6,reproduccion:8,genetica:9,evolucion:9};

/* Reglas por tema: [curso, palabras clave]. Si coinciden varias, gana el curso mayor. */
var PROF_RESP='glucólisis|glucolisis|krebs|cadena respiratoria|atp sintasa|piruvato|nadh|fadh|crestas|tilacoide|estroma|ciclo de calvin|quimiosm|gradiente de protones|fosforilaci|aceptor final|acetil';
var CURSOS={
 celula:[[7,/fotos[ií]ntesis|autótrof|heterótrof|fermentaci|levadura|cloroplasto|clorofila|quimiosíntesis/i],
         [9,/endosimbi|margulis|código genético|ribosoma.*protein/i],
         [10,new RegExp(PROF_RESP+'|lactato','i')]],
 division:[[9,/meiosis|gameto|haploide|diploide|entrecruzamiento|homólog|cariotipo|disyunci|síndrome de down|punto de control|ciclina|cáncer|tumor/i]],
 reinos:[[7,/descompon|biogeoqu|ciclo del nitr|fijaci[oó]n|simbiosis|micorriz|patógen/i],
         [9,/filogen|cladograma|ancestro común|secuencias? de (adn|arn)/i]],
 ecosistemas:[[11,/calentamiento global|cambio climático|efecto invernadero|megadiver|mega diver/i]],
 colombia:[[11,/megadiver|mega diver|minería|tráfico ilegal|calentamiento global|deshielo|derretimiento/i]],
 ambiente:[[11,/calentamiento global|cambio climático|efecto invernadero|megadiver|mega diver|minería|tráfico|ganadería|huella de carbono|acuerdo de parís|visión sistémica/i]],
 sistemas:[[10,/potencial de (acción|reposo)|umbral de|mielina|bomba de sodio|poiseuille|nefrona.*gradiente|contracorriente/i]],
 funciones:[[8,/excreci|inmun|defensa|hormon|nervio|neurona|regulaci|homeosta|termorregul|osmorregul/i],
            [10,/poiseuille|mecánica de fluidos|bernoulli|reynolds|presión de turgencia|tensión superficial|capilaridad/i]],
 nutricion:[[7,/dieta|alimentaci|nutriente|caloría|balanceada|vitamina|mineral|pirámide alimentaria|autótrof|heterótrof|glucosa|energía de los alimentos/i],
            [8,/hábito|adicci|alcohol|tabaco|cigarr|droga|psicoactiv|enfermedad|infecci|vacuna|antibi[oó]tic|\bITS\b|transmisi|contamina|obesidad|diabetes|sedentar|estrés|salud mental/i],
            [11,/benedict|fehling|biuret|lugol|reactivo|prueba de|identificar.*(almid|glucosa|proteín)/i]],
 reproduccion:[[9,/meiosis|haploide|diploide|cariotipo|disyunci/i],
               [10,/fertilizaci[oó]n asistida|in vitro|clonaci|transgén|inseminaci[oó]n artificial|terapia génica/i]],
 genetica:[[10,/biotecnolog|transgénic|clonaci|crispr|terapia génica|genoma humano|ingenier[ií]a genética|\bPCR\b|adn recombinante|fertilizaci[oó]n asistida|organismo modificado|modificaci[oó]n genética|cebador|primasa|okazaki|helicasa|polimerasa|intr[oó]n|ex[oó]n|splicing|capuchón|poli-?a\b/i]],
 evolucion:[[7,/big bang|universo|oparin|miller|generaci[oó]n espont|panspermia|mundo de arn|origen de la vida|meteorito|coacervado|extinci[oó]n|extinci[oó]nes/i],
            [10,/deriva (génica|genética)|equilibrio puntuado|cuello de botella|efecto fundador|especiaci[oó]n|hardy|weinberg|frecuencias? al[eé]lic|selección (estabilizadora|disruptiva)/i]]
};

function texto(q){
  if(typeof q==='string')return q;
  /* enunciado + opción correcta (los distractores traen palabras clave de otros temas) */
  var ok='';
  if(q.ops&&typeof q.a==='number')ok=q.ops[q.a]||'';
  else if(q.o)ok=(q.fijo&&typeof q.r==='number'?q.o[q.r]:q.o[0])||'';
  return [q.ctx,q.q,ok].join(' ');
}
/* Curso mínimo de una pregunta (objeto con t, ctx, q, o|ops, curso) o de un texto con su tema. */
function curso(q,tema){
  if(q&&typeof q==='object'&&q.curso!=null)return q.curso;
  var t=tema||(q&&q.t),tx=texto(q),R=CURSOS[t]||[],mx=0;
  for(var i=0;i<R.length;i++)if(R[i][1].test(tx)&&R[i][0]>mx)mx=R[i][0];
  var c=mx||BASE[t]||6;
  if(q&&typeof q==='object')q.curso=c;
  return c;
}
/* ── DBA de cada pregunta (versión 2.58) ──
   Una pregunta con `dba` escrito a mano (las de la versión 2.57) lo conserva. Las demás
   se etiquetan por tema y palabras clave del enunciado y la respuesta correcta:
   la primera regla que coincide gana y, si ninguna coincide, se usa el DBA por defecto
   del tema. Funciones vitales comparadas y Nutrición y salud no tienen DBA propio: su
   etiqueta es la más cercana (7.3 nutrición; 8.4 sistemas y hábitos). */
var BIOTEC=/biotecnolog|transg[eé]nic|clonaci|crispr|terapia g[eé]nica|genoma humano|ingenier[ií]a gen[eé]tica|\bPCR\b|adn recombinante|fertilizaci[oó]n asistida|in vitro|modificaci[oó]n gen[eé]tica|organismo modificado|bio[eé]tic|prueba de adn|editar el adn|edici[oó]n gen[eé]tica|embriones humanos/i;
var DBA_TEMA={
 celula:{def:'6.4',r:[['7.3',/fotos[ií]ntesis|cloroplasto|clorofila|autótrof|heterótrof|priestley|ciclo de calvin|tilacoide/i]]},
 division:{def:'6.4',r:[['9.4',/meiosis|gameto|haploide|diploide|entrecruzamiento|homólog|cariotipo|disyunci|síndrome de down/i]]},
 reinos:{def:'6.5',r:[['7.4',/descompon|biogeoqu|ciclo del nitr|fijaci[oó]n de nitr|micorriz/i]]},
 ecosistemas:{def:'7.3',r:[['7.4',/ciclo|carbono|nitr[oó]geno|biogeoqu|erosi|suelo|deforest|contaminaci|microorganism|agua/i],['11.5',/calentamiento global|cambio climático|efecto invernadero|megadiver/i]]},
 colombia:{def:'7.3',r:[['11.5',/megadiver|biodiversidad|amenaz|en peligro|conservaci|tráfico|miner[ií]a|deforest|calentamiento|deshielo|nevado|endémic|protegid|parque|especies? (invasora|exótica)/i]]},
 ambiente:{def:'11.5',r:[['7.4',/ciclo del|ciclo de|biogeoqu|erosi|eutrof|uso responsable|ahorro de agua|fijaci[oó]n/i]]},
 sistemas:{def:'8.4',r:[]},
 funciones:{def:'8.4',r:[['7.3',/digesti|nutrici|alimentaci|fotos[ií]ntesis/i]]},
 nutricion:{def:'8.4',r:[['7.3',/nutrici[oó]n|nutriente|autótrof|heterótrof|molécula|carbohidrat|lípid|prote[ií]na|agua|glucosa|ATP|vitamina|mineral|dieta|alimentaci|caloría|balanceada/i],['8.5',/\bITS\b|infecciones de transmisión|embarazo|anticonce|\bVPH\b|sexual/i]]},
 reproduccion:{def:'8.5',r:[['10.4',BIOTEC]]},
 genetica:{def:'9.4',r:[['10.4',BIOTEC],['9.5',/\bADN\b|\bARN|traducci|transcrip|prote[ií]na|codón|mutaci|código genético|ribosoma|expresi|replicaci|nucle[oó]tido/i]]},
 evolucion:{def:'9.6',r:[]}
};
function dbaDe1(q,tema){
  if(q&&typeof q==='object'&&q.dba)return q.dba;
  var t=tema||(q&&q.t),T=DBA_TEMA[t];if(!T)return null;
  var tx=texto(q);
  for(var i=0;i<T.r.length;i++)if(T.r[i][1].test(tx))return T.r[i][0];
  return T.def;
}
/* Temas de cada DBA, para el selector del panel. */
function dbasDeTemas(temas){var o=[],vis={};
  [6,7,8,9,10,11].forEach(function(c){(DBA[c]||[]).forEach(function(d){var k=c+'.'+d.n;if(!vis[k]&&d.temas.some(function(t){return temas.indexOf(t)>=0;})){vis[k]=1;o.push({id:k,curso:c,n:d.n,tx:d.tx});}});});
  return o;}

/* Abiertas con curso fijo (por el comienzo del texto). */
var FIJO={
  'Compara la respiración con oxígeno y la fermentación':7,
  'Explica con tus palabras dónde ocurre cada etapa de la respiración celular':10
};
function cursoAb(s,tema){for(var k in FIJO)if(s.indexOf(k)===0)return FIJO[k];return curso(s,tema);}

/* DBA de un curso para los temas dados: [{n, tx, ev, temas}] */
function dbaDe(c,temas){return (DBA[c]||[]).filter(function(d){return d.temas.some(function(t){return temas.indexOf(t)>=0;});});}
/* Primer curso (desde `c`) en que un tema tiene al menos `min` preguntas de la lista. */
window.BIO_DBA={DBA:DBA,BASE:BASE,CURSOS:CURSOS,FUENTE:FUENTE,curso:curso,cursoAb:cursoAb,dbaDe:dbaDe,dba:dbaDe1,dbasDeTemas:dbasDeTemas,
  NOM:{6:'6.°',7:'7.°',8:'8.°',9:'9.°',10:'10.°',11:'11.°'}};
})();
