/* Revisa que todos los .js del sitio y todos los <script> escritos dentro de las páginas .html se puedan leer
   (sin errores de sintaxis). Un error aquí rompe la página entera en el navegador, aunque el resto parezca bien.
   Uso (desde la raíz del repositorio):  node herramientas/revisar-sintaxis.js
   Correrlo SIEMPRE antes de hacer commit. */
const fs=require('fs'),vm=require('vm'),path=require('path');
let malos=0,n=0;
function revisar(nombre,codigo){n++;try{new vm.Script(codigo,{filename:nombre});}catch(e){malos++;console.log('✗',nombre,'→',e.message);}}
fs.readdirSync('.').forEach(f=>{
  if(f.endsWith('.js'))revisar(f,fs.readFileSync(f,'utf8'));
  if(f.endsWith('.html')){
    const s=fs.readFileSync(f,'utf8');let i=0;
    for(const m of s.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="(?!text\/javascript)[^"]*")[^>]*>([\s\S]*?)<\/script>/g)){i++;if(m[1].trim())revisar(f+' (script '+i+')',m[1]);}
  }
});
console.log(malos?('✗ '+malos+' con errores de '+n+' revisados'):('✓ '+n+' scripts revisados, sin errores de sintaxis'));
process.exit(malos?1:0);
