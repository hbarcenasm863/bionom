// Une contenido/*.js a los bancos del sitio (se ejecuta una sola vez).
const fs=require('fs');const R={};global.X=(t,o)=>R[t]=o;
const T=['celula','division','reinos','sistemas','reproduccion','genetica','evolucion','ecosistemas','colombia','ambiente'];
T.forEach(t=>require('./'+t+'.js'));
const J=x=>JSON.stringify(x);
const lit=o=>'{'+Object.entries(o).map(([k,v])=>k+':'+J(v)).join(',')+'}';
const fecha='ampliación a 40 o más por tema y sección (versión 2.4)';
// banco.js
let b=fs.readFileSync('banco.js','utf8');
b=b.replace(" ['celula','La célula','🔬'],"," ['celula','La célula','🔬'],['division','División celular','✂️'],");
let nb='\n/* ── '+fecha+': preguntas nuevas de cada tema (cortas, aptas también para los laberintos) ── */\n';
T.forEach(t=>{nb+='BIO_NUEVAS([\n'+R[t].juego.map(q=>lit(Object.assign({t},q))).join(',\n')+'\n]);\n';});
b=b.replace('delete window.BIO_AJ;delete window.BIO_NUEVAS;',nb+'delete window.BIO_AJ;delete window.BIO_NUEVAS;');
fs.writeFileSync('banco.js',b);
// ahorcado-datos.js
let a=fs.readFileSync('ahorcado-datos.js','utf8');
a=a.replace('["celula","🔬 La célula",["celula"]],','["celula","🔬 La célula",["celula"]],["division","✂️ División celular",["division"]],');
a+='\n/* ── '+fecha+': palabras nuevas (40 o más por tema) ── */\nwindow.BANCO_AHORCADO.push(\n'+T.map(t=>R[t].palabras.map(w=>J([w[0],t,w[1],w[2],w[3]])).join(',\n')).join(',\n')+'\n);\n';
fs.writeFileSync('ahorcado-datos.js',a);
// docente-datos.js
let d=fs.readFileSync('docente-datos.js','utf8');
let nd='\n/* ── '+fecha+': División celular como tema, preguntas tipo Saber 11, abiertas e historias del detective ── */\n(function(){\nvar D=window.DOCENTE_DATOS;\n';
nd+='var i=D.TEMAS.map(function(t){return t.id;}).indexOf("celula");\nD.TEMAS.splice(i+1,0,'+J(R.division.tema)+');\n';
T.forEach(t=>{
  nd+='/* '+t+' */\nD.SABER.push(\n'+R[t].saber.map(q=>J(Object.assign({t},q))).join(',\n')+'\n);\n';
  nd+='D.ABIERTAS['+J(t)+']=(D.ABIERTAS['+J(t)+']||[]).concat('+J(R[t].abiertas)+');\n';
  nd+='window.DETECTIVE.push(\n'+R[t].detective.map(h=>J([t,h[0],h[1]])).join(',\n')+'\n);\n';
});
nd+='})();\n';
fs.writeFileSync('docente-datos.js',d+nd);
console.log('unido');
