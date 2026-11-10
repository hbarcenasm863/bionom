/* BioNom · fotos reales de bancos de imágenes libres (Wikimedia Commons,
   iNaturalist y Flickr, buscadas con Openverse) con su cita en formato APA.
   Cada imagen se guarda dentro del sitio (carpeta img/fotos) para que la app
   funcione sin internet; la cita indica el autor, el año, el título, la
   fuente y la licencia libre con que se puede usar.
   Uso: FOTO('clave','Pie de foto')  o  <div data-foto="clave" data-pie="..."></div> */
(function(){
var F=window.FOTOS_DATOS||{};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function apa(d){
  return esc(d.autor).replace(/\.$/,'')+'. ('+esc(d.anio||'s. f.')+'). <i>'+esc(d.titulo)+'</i> ['+esc(d.tipo||'Fotografía')+']. '+esc(d.fuente||'Wikimedia Commons')+'. '+
    '<a href="'+esc(d.url)+'" target="_blank" rel="noopener">'+esc(d.url)+'</a>. '+
    (d.licUrl?'Licencia <a href="'+esc(d.licUrl)+'" target="_blank" rel="noopener">'+esc(d.lic)+'</a>.':esc(d.lic)+'.');
}
window.FOTO_APA=function(k){return F[k]?apa(F[k]):'';};
window.FOTO=function(k,pie,cls){
  var d=F[k]; if(!d)return '';
  return '<figure class="foto'+(cls?' '+cls:'')+'"><img src="img/fotos/'+k+'.jpg" alt="'+esc(pie||d.titulo)+'" loading="lazy" width="'+(d.w||640)+'" height="'+(d.h||480)+'">'+
    '<figcaption>'+(pie?'<span class="pie">'+pie+'</span>':'')+'<cite class="apa">'+apa(d)+'</cite></figcaption></figure>';
};
function montar(){document.querySelectorAll('[data-foto]').forEach(function(el){
  el.outerHTML=FOTO(el.getAttribute('data-foto'),el.getAttribute('data-pie')||'',el.getAttribute('data-cls')||'');});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',montar);else montar();
})();
