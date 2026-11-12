/* Genera saber-juego.js: las preguntas tipo Saber 11 de docente-datos.js que
   todavía no están en el banco del juego, en formato compacto para juego.html.
   Uso (desde la raíz del repositorio):  node herramientas/generar-saber-juego.js
   Hay que volver a correrlo cada vez que se agregan o cambian preguntas SABER. */
const fs=require('fs'),vm=require('vm');
const c={console};c.window=c;vm.createContext(c);
['saber-icfes.js','banco.js','docente-datos.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),c));
const SI=c.SABER_ICFES,B=c.BANCO_BIO;
const yaEstan=new Set(B.filter(q=>q.k==='mc').map(q=>q.q));
const lim=s=>String(s==null?'':s).replace(/<[^>]+>/g,'');
const out=[],vistos=new Set();
c.DOCENTE_DATOS.SABER.forEach(q=>{
  if(yaEstan.has(q.q)||vistos.has(q.t+'|'+q.q))return;vistos.add(q.t+'|'+q.q);
  out.push({t:q.t,c:SI.competencia(q),af:SI.afirmacion(q).cod,ctx:lim(q.ctx),q:lim(q.q),o:q.o.map(lim)});
});
const txt='/* GENERADO por herramientas/generar-saber-juego.js: no editar a mano.\n   Preguntas tipo Saber 11 de BioNom para el Juego ('+out.length+'). */\nwindow.SABER_JUEGO='+JSON.stringify(out)+';\n';
fs.writeFileSync('saber-juego.js',txt);
console.log(out.length,'preguntas;',Math.round(txt.length/1024),'KB');
const m={};out.forEach(x=>m[x.c]=(m[x.c]||0)+1);console.log(m);
