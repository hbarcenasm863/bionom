// Vuelca las preguntas de BioNom por tema a JSON (solo lectura). Uso: node volcar.js <carpeta de salida>
const fs=require('fs'),vm=require('vm');
const R='/home/user/bionom/',out=process.argv[2];
const c={console};c.window=c;vm.createContext(c);
['dba-bio.js','nivel-bio.js','saber-icfes.js','banco.js','icfes-datos.js','docente-datos.js','ahorcado-datos.js'].forEach(f=>{try{vm.runInContext(fs.readFileSync(R+f,'utf8'),c)}catch(e){console.error('aviso',f,e.message)}});
const B=c.BIO_DBA,temas=Object.keys(B.BASE);
temas.forEach(t=>{
  const juego=c.BANCO_BIO.filter(q=>q.t===t).map((q,i)=>({id:'J'+i,tipo:q.k,pregunta:q.q,opciones:q.ops,correcta:q.k==='mc'?q.ops[q.a]:q.a,pistas:q.p,explicacion:q.exp,dba:B.dba(q),curso:B.curso(q),nivelJuego:q.niv}));
  const saber=c.DOCENTE_DATOS.SABER.filter(q=>q.t===t).map((q,i)=>({id:'S'+i,competencia:c.SABER_ICFES.competencia(q),contexto:q.ctx,pregunta:q.q,opciones:q.o,correcta:q.o[0],explicacion:q.exp||null,tabla:q.tabla||null,graf:q.graf||null,dba:B.dba(q),curso:B.curso(q)}));
  const abiertas=(c.DOCENTE_DATOS.ABIERTAS[t]||[]).map((x,i)=>({id:'A'+i,texto:x,dba:B.dba(x,t),curso:B.cursoAb(x,t)}));
  const palabras=(c.BANCO_AHORCADO||[]).filter(w=>w[1]===t).map(w=>({palabra:w[0],pistas:w.slice(2)}));
  fs.writeFileSync(out+'/'+t+'.json',JSON.stringify({tema:t,cursoBase:B.BASE[t],juego,saber,abiertas,palabras},null,1));
  console.log(t.padEnd(13),'juego',juego.length,'saber',saber.length,'abiertas',abiertas.length,'palabras',palabras.length);
});
