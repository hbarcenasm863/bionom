// node contenido/revisar.js tema  → revisa el archivo contenido/<tema>.js contra los bancos actuales
const fs=require('fs');global.window=global;global.console=console;
console.warn=()=>{};
require('../banco.js');require('../ahorcado-datos.js');require('../docente-datos.js');
const letras=s=>String(s).toUpperCase().replace(/Ñ/g,'\u0001').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\u0001/g,'Ñ').replace(/[^A-ZÑ]/g,'');
const sh=s=>String(s).replace(/<[^>]+>/g,'');
const usadas=new Set(BANCO_AHORCADO.map(w=>letras(w[0])));
let X={};global.X=(t,o)=>{X[t]=o;};
const temas=process.argv.slice(2);
temas.forEach(t=>require('./'+t+'.js'));
for(const t of temas){
  const o=X[t],e=[];
  const juegoT=BANCO_BIO.filter(q=>q.t===t);
  const lab=q=>(q.k==='mc'&&sh(q.q).length<=120&&q.ops.every(x=>x.length<=36))||(q.k==='vf'&&sh(q.q).length<=120);
  (o.juego||[]).forEach(q=>{if(q.k==='mc'&&(!q.ops||q.ops[q.a]==null||new Set(q.ops).size!==q.ops.length))e.push('mc mal: '+q.q);if(q.k!=='vf'&&(!q.p||q.p.length<2))e.push('sin pistas: '+q.q);if(!q.exp)e.push('sin exp: '+q.q);
    if(juegoT.some(x=>x.q===q.q))e.push('pregunta repetida: '+q.q);
    const r=q.k==='mc'?q.ops[q.a]:q.k==='esc'?q.a[0]:null;if(r&&q.p)q.p.forEach(p=>{if(letras(r).length>3&&letras(p).includes(letras(r)))e.push('pista revela: '+q.q);});});
  (o.saber||[]).forEach(q=>{if(q.o.length!==4||new Set(q.o).size!==4)e.push('saber mal: '+q.q);});
  const vistas=new Set();
  (o.palabras||[]).forEach(w=>{const L=letras(w[0]);if(usadas.has(L)||vistas.has(L))e.push('palabra repetida: '+w[0]);vistas.add(L);if(w.length!==4)e.push('palabra sin 3 pistas: '+w[0]);
    if(L.length<3)e.push('palabra corta: '+w[0]);if((w[0]+': '+w[1]).length>95)e.push('pista 1 larga (criptograma): '+w[0]);
    w.slice(1).forEach(p=>{if(L.length>3&&letras(p).includes(L))e.push('pista con la palabra: '+w[0]);});});
  (o.detective||[]).forEach(h=>{let c=[],n=0,d=0;h[1].forEach(p=>{if(!Array.isArray(p)){if(n)c.push(n);n=0}else{n++;d++;if(p[0]===p[1])e.push('dudoso igual: '+p[0]);}});c.push(n);if(d!==8)e.push('historia «'+h[0]+'» con '+d+' dudosos');if(Math.max(...c)>3)e.push('párrafo con '+Math.max(...c)+' dudosos en «'+h[0]+'»');});
  const nLab=juegoT.filter(lab).length+(o.juego||[]).filter(lab).length;
  console.log(t,'| juego',juegoT.length+(o.juego||[]).length,'| laberinto',nLab,'| saber',DOCENTE_DATOS.SABER.filter(q=>q.t===t).length+(o.saber||[]).length,
    '| abiertas',(DOCENTE_DATOS.ABIERTAS[t]||[]).length+(o.abiertas||[]).length,'| palabras',BANCO_AHORCADO.filter(w=>w[1]===t).length+(o.palabras||[]).length,
    '| detective',DETECTIVE.filter(h=>h[0]===t).length+(o.detective||[]).length);
  e.forEach(x=>console.log('   ⚠️ '+x));
}
