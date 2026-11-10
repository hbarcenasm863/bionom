/* ════════════════════════════════════════════════════════════════════════
   docente-datos.js — SOLO CONTENIDO del panel docente de BioNom.
   La lógica de guías, talleres y evaluaciones vive en docente-app.js; los
   mapas conceptuales y el detective los arma extras.js (el mismo archivo de
   ChromaNom e IonNom, que solo trae reglas).

   window.DOCENTE_DATOS = {
     TEMAS: [{id, titulo, corto,
       previos: {curiosos, contexto:[{amb:'Local|Nacional|Global', t}], cotidianos, activacion},  ← Sesión 1
       info: {lectura:[párrafos], esquema:{raiz, ramas:[{t, items}]}},                          ← Sesión 2
       puedo: [«Puedo…» de la autoevaluación]}],
     SABER: [{t: tema, ctx: contexto, q: pregunta, o: [CORRECTA, d1, d2, d3]}],  (la 1.ª opción es la
            correcta en el archivo; al imprimir se barajan)
     ABIERTAS: {tema: [preguntas de análisis e indagación]}
   }
   Los id de los temas son los mismos de TEMAS_JUEGO (banco.js) y de los
   grupos de palabras (ahorcado-datos.js).
   ════════════════════════════════════════════════════════════════════════ */
window.DOCENTE_DATOS = {
TEMAS: [
{id:'celula', titulo:'La célula: historia, tipos y partes', corto:'La célula',
 previos:{
  curiosos:['Tu cuerpo tiene unos 37 billones de células, y en tu intestino viven todavía más bacterias que células propias.','La célula más grande que existe es la yema de un huevo de avestruz: es una sola célula.'],
  contexto:[{amb:'Local',t:'Cuando se hace queso campesino o kumis en la casa, trabajan células vivas: bacterias que transforman la leche.'},{amb:'Nacional',t:'El Instituto Nacional de Salud de Colombia estudia en el microscopio las células de la sangre para diagnosticar la malaria en zonas como el Chocó.'},{amb:'Global',t:'Las vacunas de ARN contra la COVID-19 funcionan porque nuestras propias células leen el ARN y fabrican una proteína del virus.'}],
  cotidianos:['Cuando se pone sal sobre una rodaja de pepino, al rato suelta agua: es la ósmosis, el mismo proceso que ocurre en tus células.'],
  activacion:['¿Qué tienen en común una bacteria, una hoja de árbol y tu piel?','Si todas las células tienen membrana, ¿para qué crees que le sirve a la célula?']},
 info:{lectura:[
  'La <strong>célula</strong> es la unidad más pequeña con vida: se nutre, se relaciona y se reproduce. La <strong>teoría celular</strong> se construyó con el microscopio: Hooke vio celdillas en el corcho (1665), Leeuwenhoek vio microorganismos vivos, Schleiden y Schwann propusieron que todos los seres vivos están hechos de células y Virchow agregó que toda célula viene de otra célula.',
  'Hay dos tipos de células. Las <strong>procariotas</strong> (bacterias) no tienen núcleo: su ADN está suelto en el citoplasma. Las <strong>eucariotas</strong> (animales, plantas, hongos y protistas) guardan el ADN dentro de un núcleo con membrana y tienen organelos.',
  'Todas las células tienen <strong>membrana</strong> (controla lo que entra y sale), <strong>citoplasma</strong>, <strong>ribosomas</strong> (fabrican proteínas) y <strong>ADN</strong>. Entre los organelos se destacan la <strong>mitocondria</strong> (respiración celular), el <strong>retículo endoplasmático</strong> y el <strong>aparato de Golgi</strong> (fabrican y empacan), y los <strong>lisosomas</strong> (reciclaje). La célula vegetal tiene además <strong>pared de celulosa</strong>, <strong>cloroplastos</strong> y una gran <strong>vacuola</strong>.',
  'Las sustancias atraviesan la membrana por <strong>transporte pasivo</strong> (difusión y ósmosis, sin gastar energía) o por <strong>transporte activo</strong> (en contra de la concentración, gastando ATP). Las células se dividen por <strong>mitosis</strong> para crecer y reparar tejidos.'],
  esquema:{raiz:'La célula',ramas:[
   {t:'Teoría celular',items:['Hooke','Schleiden y Schwann','Virchow']},
   {t:'Procariota',items:['Sin núcleo','Bacterias']},
   {t:'Eucariota',items:['Núcleo con membrana','Organelos']},
   {t:'Organelos',items:['Mitocondria','Cloroplasto','Ribosoma']},
   {t:'Transporte',items:['Difusión','Ósmosis','Transporte activo']}]}},
 puedo:['Explicar los postulados de la teoría celular.','Diferenciar una célula procariota de una eucariota.','Relacionar cada organelo con su función.','Explicar la ósmosis con un ejemplo cotidiano.']},

{id:'reinos', titulo:'Reinos y clasificación de los seres vivos', corto:'Reinos',
 previos:{
  curiosos:['Un hongo de Oregón (Estados Unidos) ocupa casi 10 km² bajo tierra: es uno de los seres vivos más grandes del planeta.','Los líquenes no son una sola especie: son un hongo y un alga viviendo juntos.'],
  contexto:[{amb:'Local',t:'En una huerta escolar conviven organismos de los cinco reinos: bacterias del suelo, hongos, protistas del agua, plantas e insectos.'},{amb:'Nacional',t:'Colombia es el país con más especies de aves y orquídeas del mundo, y cada año se describen especies nuevas en sus selvas y páramos.'},{amb:'Global',t:'Carl Woese descubrió en 1977 que las arqueas son tan distintas de las bacterias como de nosotros, y por eso propuso los tres dominios.'}],
  cotidianos:['El pan se esponja por una levadura (un hongo) y el yogur se hace con bacterias.'],
  activacion:['¿Un champiñón es una planta? ¿Por qué sí o por qué no?','¿Qué características usarías para separar en grupos a un perro, una rosa, un moho y una bacteria?']},
 info:{lectura:[
  'La <strong>taxonomía</strong> nombra y clasifica a los seres vivos. Linneo creó el <strong>sistema binomial</strong>: cada especie tiene un nombre científico de dos palabras en latín, el género con mayúscula y la especie en minúscula, en cursiva (<em>Tremarctos ornatus</em>, el oso de anteojos).',
  'Las categorías van de la más amplia a la más específica: <strong>dominio, reino, filo, clase, orden, familia, género y especie</strong>. Los organismos de una misma especie pueden reproducirse entre sí y tener hijos fértiles.',
  'Whittaker propuso <strong>cinco reinos</strong> según el tipo de célula, el número de células y la nutrición: <strong>Monera</strong> (procariotas), <strong>Protista</strong> (eucariotas sencillos), <strong>Fungi</strong> (hongos, por absorción y con pared de quitina), <strong>Plantae</strong> (fotosíntesis y pared de celulosa) y <strong>Animalia</strong> (pluricelulares, por ingestión, sin pared).',
  'Hoy se usan además tres <strong>dominios</strong>: Bacteria, Archaea y Eukarya. Para identificar organismos se usan <strong>claves dicotómicas</strong>: preguntas de dos opciones que llevan, paso a paso, al grupo correcto.'],
  esquema:{raiz:'Seres vivos',ramas:[
   {t:'Monera',items:['Bacterias','Sin núcleo']},
   {t:'Protista',items:['Ameba','Algas']},
   {t:'Fungi',items:['Absorción','Quitina']},
   {t:'Plantae',items:['Fotosíntesis','Celulosa']},
   {t:'Animalia',items:['Ingestión','Sin pared']}]}},
 puedo:['Escribir correctamente un nombre científico.','Ordenar las categorías taxonómicas.','Clasificar un organismo en su reino con argumentos.','Usar una clave dicotómica sencilla.']},

{id:'sistemas', titulo:'Sistemas del cuerpo humano', corto:'Sistemas',
 previos:{
  curiosos:['Si se pusieran en fila todos los vasos sanguíneos de una persona, darían más de dos vueltas a la Tierra.','El corazón late unas 100 000 veces al día sin que tengas que pensarlo.'],
  contexto:[{amb:'Local',t:'En el puesto de salud del barrio toman la presión arterial, que mide la fuerza con que el corazón empuja la sangre por las arterias.'},{amb:'Nacional',t:'En Colombia la sal se yoda por ley desde hace décadas para prevenir el bocio, un problema de la glándula tiroides.'},{amb:'Global',t:'La diabetes, relacionada con la hormona insulina, afecta a más de 500 millones de personas en el mundo.'}],
  cotidianos:['Cuando subes escaleras corriendo, respiras más rápido y el corazón se acelera: varios sistemas trabajan juntos.'],
  activacion:['¿Qué sistemas trabajan cuando te comes un banano y luego sales a jugar?','¿Por qué crees que sudamos cuando hace calor?']},
 info:{lectura:[
  'El cuerpo se organiza en niveles: <strong>células → tejidos → órganos → sistemas → organismo</strong>. Los cuatro tejidos animales son epitelial, conectivo, muscular y nervioso.',
  'La <strong>nutrición</strong> la cumplen varios sistemas juntos: el <strong>digestivo</strong> transforma el alimento y absorbe los nutrientes en el intestino delgado; el <strong>respiratorio</strong> lleva el oxígeno a los alvéolos; el <strong>circulatorio</strong> reparte todo con el corazón, las arterias, las venas y los capilares; y el <strong>excretor</strong> (riñones y piel) elimina los desechos.',
  'La <strong>relación</strong> y el control dependen del <strong>sistema nervioso</strong> (impulsos eléctricos rápidos; la médula espinal controla los reflejos) y del <strong>sistema endocrino</strong> (hormonas que viajan por la sangre, como la insulina y la adrenalina). El sistema <strong>locomotor</strong> (huesos y músculos) permite moverse.',
  'El cuerpo mantiene estable su medio interno (<strong>homeostasis</strong>): temperatura, agua y azúcar. El <strong>sistema inmune</strong> lo defiende con glóbulos blancos y anticuerpos; las vacunas lo entrenan sin causar la enfermedad.'],
  esquema:{raiz:'El cuerpo humano',ramas:[
   {t:'Nutrición',items:['Digestivo','Respiratorio','Circulatorio']},
   {t:'Excreción',items:['Riñones','Piel']},
   {t:'Control',items:['Nervioso','Endocrino']},
   {t:'Movimiento',items:['Huesos','Músculos']},
   {t:'Defensa',items:['Glóbulos blancos','Anticuerpos']}]}},
 puedo:['Ordenar los niveles de organización del cuerpo.','Explicar cómo trabajan juntos los sistemas de nutrición.','Comparar el sistema nervioso con el endocrino.','Explicar qué es la homeostasis con un ejemplo.']},

{id:'reproduccion', titulo:'Reproducción de los seres vivos y salud sexual', corto:'Reproducción',
 previos:{
  curiosos:['Una sola bacteria, si se divide cada 20 minutos, podría formar millones de bacterias en un día.','El caballito de mar es uno de los pocos animales en los que el macho queda «embarazado».'],
  contexto:[{amb:'Local',t:'En la finca se siembran tallos de yuca y de caña para obtener plantas nuevas: es reproducción asexual.'},{amb:'Nacional',t:'Colombia vacuna gratis contra el virus del papiloma humano (VPH) a niñas y niños desde los 9 años para prevenir el cáncer.'},{amb:'Global',t:'Las abejas polinizan gran parte de los cultivos que alimentan al mundo; sin ellas muchas plantas no darían frutos.'}],
  cotidianos:['Al dejar una papa en un rincón oscuro le salen brotes: puede formar una planta nueva sin semillas.'],
  activacion:['¿Qué ventaja tendrá tener hijos con dos padres en lugar de uno solo?','¿Para qué crees que una flor tiene colores y olor?']},
 info:{lectura:[
  'La <strong>reproducción asexual</strong> necesita un solo progenitor y produce clones: bipartición en bacterias, gemación en levaduras, fragmentación en estrellas de mar y reproducción vegetativa en plantas (esquejes, tubérculos). Es rápida, pero no da variabilidad.',
  'La <strong>reproducción sexual</strong> une dos <strong>gametos</strong> (formados por meiosis) en la <strong>fecundación</strong> y origina un cigoto. Produce hijos diferentes entre sí, lo que ayuda a las especies a adaptarse.',
  'En las plantas con flor, la <strong>polinización</strong> lleva el polen de la antera al estigma; después de la fecundación el ovario se convierte en <strong>fruto</strong> y los óvulos en <strong>semillas</strong>. En los animales la fecundación puede ser externa (ranas, peces) o interna (aves, mamíferos).',
  'En los seres humanos, los ovarios producen óvulos y los testículos espermatozoides. El <strong>ciclo menstrual</strong> dura unos 28 días; el embarazo ocurre en el útero y la <strong>placenta</strong> alimenta al bebé. El <strong>condón</strong> es el único método que también protege de las <strong>infecciones de transmisión sexual</strong>.'],
  esquema:{raiz:'Reproducción',ramas:[
   {t:'Asexual',items:['Bipartición','Gemación','Esquejes']},
   {t:'Sexual',items:['Gametos','Fecundación']},
   {t:'En plantas',items:['Polinización','Fruto y semilla']},
   {t:'En humanos',items:['Ciclo menstrual','Placenta']},
   {t:'Salud sexual',items:['Condón','Vacuna VPH']}]}},
 puedo:['Comparar la reproducción asexual y la sexual.','Explicar cómo se forman el fruto y la semilla.','Describir el ciclo menstrual y el papel de la placenta.','Explicar cómo prevenir embarazos no planeados e ITS.']},

{id:'genetica', titulo:'Genética mendeliana y molecular', corto:'Genética',
 previos:{
  curiosos:['Compartes cerca del 99,9 % de tu ADN con cualquier otra persona del planeta.','Si se estirara el ADN de una sola de tus células, mediría unos 2 metros.'],
  contexto:[{amb:'Local',t:'En las familias se ven rasgos que se repiten: el color de ojos, los hoyuelos o el grupo sanguíneo.'},{amb:'Nacional',t:'En Colombia las pruebas de ADN se usan para identificar a víctimas del conflicto armado y reunirlas con sus familias.'},{amb:'Global',t:'El Proyecto Genoma Humano leyó por primera vez, en 2003, las 3000 millones de letras de nuestro ADN.'}],
  cotidianos:['Dos padres de ojos cafés pueden tener un hijo de ojos azules: la genética explica por qué.'],
  activacion:['¿Por qué te pareces a tus padres pero no eres igual a ninguno?','¿Dónde crees que se guarda la información que hace que tengas tu color de piel?']},
 info:{lectura:[
  'Mendel cruzó plantas de arveja y descubrió que cada característica depende de un par de <strong>alelos</strong>, uno de cada padre. El alelo <strong>dominante</strong> (A) se expresa aunque esté solo; el <strong>recesivo</strong> (a) solo cuando está doble (aa).',
  'El <strong>genotipo</strong> es la combinación de alelos (AA, Aa, aa) y el <strong>fenotipo</strong> lo que se observa. El <strong>cuadro de Punnett</strong> predice las proporciones: el cruce Aa × Aa da 3 dominantes por 1 recesivo. También hay dominancia incompleta, codominancia (grupo AB) y herencia ligada al cromosoma X (daltonismo).',
  'Los genes están en el <strong>ADN</strong>, una doble hélice cuyas bases se emparejan A–T y C–G. Según el <strong>dogma central</strong>, el ADN se transcribe a ARN mensajero y este se traduce a proteína en los ribosomas, leyendo codones de tres bases.',
  'Una <strong>mutación</strong> es un cambio en el ADN; puede ser dañina (anemia falciforme), neutra o útil. La <strong>meiosis</strong> forma gametos con la mitad de los cromosomas (23 en humanos), y la biotecnología permite crear transgénicos y clones.'],
  esquema:{raiz:'Genética',ramas:[
   {t:'Mendel',items:['Dominante','Recesivo','Punnett']},
   {t:'Genotipo',items:['Homocigoto','Heterocigoto']},
   {t:'ADN',items:['Doble hélice','A–T y C–G']},
   {t:'Dogma central',items:['Transcripción','Traducción']},
   {t:'Cambios',items:['Mutación','Transgénico']}]}},
 puedo:['Resolver un cruce con el cuadro de Punnett.','Diferenciar genotipo y fenotipo.','Escribir la cadena complementaria del ADN.','Explicar el dogma central y qué es una mutación.']}
,
{id:'evolucion', titulo:'Evolución de los seres vivos', corto:'Evolución',
 previos:{
  curiosos:['Las aves actuales descienden de los dinosaurios: un colibrí es pariente de un tiranosaurio.','En La Guajira se encontró la Titanoboa, una serpiente de 13 metros que vivió hace 60 millones de años.'],
  contexto:[{amb:'Local',t:'Si alguien deja de tomar el antibiótico antes de tiempo, las bacterias más resistentes sobreviven: es evolución en un solo cuerpo.'},{amb:'Nacional',t:'En el desierto de la Tatacoa (Huila) hay fósiles de monos, cocodrilos y tortugas de hace 13 millones de años, cuando allí había una selva.'},{amb:'Global',t:'Darwin estudió los pinzones de las islas Galápagos y en 1859 publicó «El origen de las especies».'}],
  cotidianos:['Las razas de perros y las variedades de maíz se obtuvieron escogiendo durante generaciones los individuos con los rasgos deseados.'],
  activacion:['¿Por qué crees que los insectos se vuelven resistentes a los insecticidas?','¿Cómo se habrá formado el cuello largo de las jirafas?']},
 info:{lectura:[
  'La <strong>evolución</strong> es el cambio de las poblaciones a lo largo de muchas generaciones. Lamarck pensaba que los rasgos ganados en vida se heredan (uso y desuso), idea que hoy sabemos que es incorrecta.',
  'Darwin y Wallace propusieron la <strong>selección natural</strong>: en una población hay <strong>variación</strong>, nacen más individuos de los que pueden sobrevivir y los mejor adaptados dejan más descendencia; así sus rasgos se vuelven más comunes. La <strong>teoría sintética</strong> agregó la genética: las mutaciones aportan la variación.',
  'Las <strong>pruebas</strong> de la evolución son los fósiles, los órganos homólogos (misma estructura, distinta función) y vestigiales, la embriología, las comparaciones de ADN y la evolución observada, como la resistencia a los antibióticos.',
  'Cuando una población queda separada por una barrera, puede formar una especie nueva (<strong>especiación</strong>). El ser humano también evolucionó: Homo sapiens apareció en África hace unos 300 000 años.'],
  esquema:{raiz:'Evolución',ramas:[
   {t:'Lamarck',items:['Uso y desuso','Caracteres adquiridos']},
   {t:'Darwin',items:['Variación','Selección natural']},
   {t:'Pruebas',items:['Fósiles','Homólogos','ADN']},
   {t:'Mecanismos',items:['Mutación','Deriva genética']},
   {t:'Resultado',items:['Adaptación','Especiación']}]}},
 puedo:['Comparar las ideas de Lamarck y de Darwin.','Explicar con un ejemplo cómo actúa la selección natural.','Reconocer pruebas de la evolución.','Explicar cómo se forma una especie nueva.']},

{id:'ecosistemas', titulo:'Ecosistemas: relaciones, energía y ciclos', corto:'Ecosistemas',
 previos:{
  curiosos:['Una sola hectárea de selva amazónica puede tener más especies de árboles que toda Europa.','Sin los hongos y las bacterias descomponedoras, el planeta estaría cubierto de hojas y cadáveres.'],
  contexto:[{amb:'Local',t:'En el humedal o la quebrada del barrio hay productores (plantas), consumidores (peces, aves) y descomponedores.'},{amb:'Nacional',t:'Los hipopótamos traídos al Magdalena medio se volvieron una especie invasora porque aquí no tienen depredadores.'},{amb:'Global',t:'Las abejas, al polinizar, sostienen cerca de un tercio de los alimentos que come la humanidad.'}],
  cotidianos:['El compost de la casa convierte las cáscaras en abono gracias a los descomponedores.'],
  activacion:['¿Qué pasaría en un potrero si desaparecieran todas las lombrices?','¿De dónde sale la energía que tiene la carne que comemos?']},
 info:{lectura:[
  'Un <strong>ecosistema</strong> es la comunidad de seres vivos (factores <strong>bióticos</strong>) más el ambiente físico (factores <strong>abióticos</strong>: luz, agua, suelo, temperatura) y sus relaciones. Los niveles son individuo, población, comunidad, ecosistema y biosfera.',
  'En una <strong>cadena trófica</strong> la energía pasa de los <strong>productores</strong> a los <strong>consumidores</strong> primarios, secundarios y terciarios; los <strong>descomponedores</strong> devuelven los minerales al suelo. En cada nivel solo pasa cerca del <strong>10 %</strong> de la energía: el resto se pierde como calor.',
  'Las especies se relacionan por <strong>mutualismo</strong> (+ +), <strong>comensalismo</strong> (+ 0), <strong>parasitismo</strong> (+ −), <strong>depredación</strong> (+ −) y <strong>competencia</strong> (− −). Cada especie tiene un hábitat (dónde vive) y un nicho (su papel).',
  'La materia se recicla en los <strong>ciclos</strong> del agua, del carbono y del nitrógeno, mientras la energía fluye en una sola dirección. La actividad humana altera esos ciclos: quemar combustibles fósiles aumenta el CO₂ y los fertilizantes en exceso causan eutrofización.'],
  esquema:{raiz:'Ecosistema',ramas:[
   {t:'Factores',items:['Bióticos','Abióticos']},
   {t:'Niveles tróficos',items:['Productores','Consumidores','Descomponedores']},
   {t:'Relaciones',items:['Mutualismo','Parasitismo','Competencia']},
   {t:'Ciclos',items:['Agua','Carbono','Nitrógeno']},
   {t:'Energía',items:['Regla del 10 %','Calor']}]}},
 puedo:['Diferenciar factores bióticos y abióticos.','Construir una cadena y una red trófica.','Clasificar relaciones entre especies.','Explicar por qué la energía fluye y la materia se recicla.']},

{id:'colombia', titulo:'Ecosistemas y regiones naturales de Colombia', corto:'Colombia',
 previos:{
  curiosos:['Colombia tiene casi el 10 % de las especies del planeta en menos del 1 % de la tierra firme.','El páramo de Sumapaz, cerca de Bogotá, es el más grande del mundo.'],
  contexto:[{amb:'Local',t:'El agua que sale de la llave en muchas ciudades andinas viene de un páramo cercano.'},{amb:'Nacional',t:'Colombia tiene seis regiones naturales: Caribe, Pacífica, Andina, Orinoquía, Amazonía e Insular.'},{amb:'Global',t:'Las ballenas jorobadas viajan cada año desde la Antártida hasta el Pacífico colombiano para tener a sus crías.'}],
  cotidianos:['El café se cultiva en las laderas templadas de las cordilleras, entre 1000 y 2000 metros de altura.'],
  activacion:['¿Por qué en Colombia puede haber nieve y playa en el mismo departamento?','¿Qué ecosistema hay cerca de tu colegio y qué especies viven allí?']},
 info:{lectura:[
  'Colombia es <strong>megadiversa</strong> porque está en el trópico, tiene costas en dos océanos y las tres cordilleras de los Andes crean los <strong>pisos térmicos</strong>: cálido, templado, frío, páramo y nival. La temperatura baja unos 6 °C por cada 1000 m de altura.',
  'Las <strong>regiones naturales</strong> tienen ecosistemas propios: el Caribe con bosque seco, manglares y el desierto de La Guajira; el Pacífico con selvas muy lluviosas; la región Andina con bosques de niebla y páramos; la Orinoquía con sabanas inundables; la Amazonía con selva húmeda; y la región Insular con arrecifes de coral.',
  'Los <strong>páramos</strong> regulan el agua como esponjas; los <strong>manglares</strong> protegen la costa y son guardería de peces; el <strong>bosque seco tropical</strong> es de los más amenazados. Muchas especies son <strong>endémicas</strong>, es decir, solo viven aquí.',
  'Las principales amenazas son la <strong>deforestación</strong>, la minería ilegal, las especies invasoras y el tráfico de fauna. Para conservar existen los <strong>Parques Nacionales Naturales</strong>, los corredores biológicos y la categoría de riesgo de la UICN.'],
  esquema:{raiz:'Colombia megadiversa',ramas:[
   {t:'Causas',items:['Trópico','Dos océanos','Cordilleras']},
   {t:'Pisos térmicos',items:['Cálido','Frío','Páramo']},
   {t:'Ecosistemas',items:['Manglar','Bosque seco','Selva húmeda']},
   {t:'Amenazas',items:['Deforestación','Minería ilegal']},
   {t:'Conservación',items:['Parques Nacionales','Corredores']}]}},
 puedo:['Explicar por qué Colombia es megadiversa.','Relacionar cada región natural con sus ecosistemas.','Explicar la importancia de páramos y manglares.','Proponer acciones para conservar una especie amenazada.']},

{id:'ambiente', titulo:'Ambiente y cambio climático', corto:'Ambiente',
 previos:{
  curiosos:['Hoy hay más CO₂ en el aire que en cualquier momento de los últimos 800 000 años.','Colombia ha perdido cerca del 90 % de sus glaciares desde el siglo XIX.'],
  contexto:[{amb:'Local',t:'Separar la basura orgánica en el colegio evita que se pudra sin oxígeno en el relleno y produzca metano.'},{amb:'Nacional',t:'Con El Niño llueve menos, bajan los embalses y puede haber racionamiento de energía, porque la mayor parte de la electricidad del país viene de hidroeléctricas.'},{amb:'Global',t:'En el Acuerdo de París (2015) casi todos los países se comprometieron a limitar el calentamiento a 1,5 o 2 °C.'}],
  cotidianos:['Caminar o ir en bicicleta en vez de usar carro reduce tu huella de carbono.'],
  activacion:['¿Por qué el interior de un carro cerrado al sol se calienta tanto?','¿Qué cambios en el clima de tu región han notado tus abuelos?']},
 info:{lectura:[
  'El <strong>efecto invernadero</strong> es natural: gases como el CO₂, el metano y el vapor de agua retienen calor y mantienen la Tierra a unos 15 °C. Al quemar combustibles fósiles, talar bosques y criar ganado, los humanos aumentamos esos gases y el planeta se calienta: es el <strong>cambio climático</strong>.',
  'Sus efectos ya se ven: deshielo de los glaciares, subida del nivel del mar, blanqueamiento de los corales, acidificación del océano, lluvias e inundaciones más fuertes y sequías más largas. En Colombia, El Niño trae sequías y La Niña inundaciones.',
  'En Colombia la mayor fuente de emisiones es la <strong>deforestación</strong> y el cambio de uso del suelo, sobre todo en la Amazonía. En el mundo es quemar petróleo, carbón y gas.',
  'Hay dos tipos de acciones: la <strong>mitigación</strong> ataca la causa (energías renovables, proteger los bosques, reducir la huella de carbono) y la <strong>adaptación</strong> prepara a las comunidades para el clima que viene (recoger agua lluvia, cultivos resistentes a la sequía).'],
  esquema:{raiz:'Cambio climático',ramas:[
   {t:'Causas',items:['Combustibles fósiles','Deforestación','Ganadería']},
   {t:'Gases',items:['CO₂','Metano']},
   {t:'Efectos',items:['Deshielo','Blanqueamiento','Sequías']},
   {t:'Mitigación',items:['Energía renovable','Proteger bosques']},
   {t:'Adaptación',items:['Agua lluvia','Cultivos resistentes']}]}},
 puedo:['Explicar el efecto invernadero y por qué aumenta.','Reconocer efectos del cambio climático en Colombia.','Diferenciar mitigación y adaptación.','Proponer acciones para reducir mi huella de carbono.']}
],
SABER: [
/* La primera opción es la correcta; al imprimir se barajan. */
{t:'celula',ctx:'Un estudiante pone una rodaja de papa en agua con mucha sal y otra en agua de la llave. Después de una hora, la rodaja del agua salada está blanda y pesa menos.',q:'¿Qué explica mejor este resultado?',o:['El agua salió de las células de la papa por ósmosis, hacia donde había más sal','La sal entró a las células y las disolvió','Las células de la papa murieron por falta de oxígeno','El agua de la llave tenía más solutos que el agua salada']},
{t:'celula',ctx:'Al observar una muestra al microscopio, se encuentran células con pared celular, cloroplastos y una gran vacuola central.',q:'La muestra probablemente pertenece a',o:['una hoja de una planta','la piel de un animal','una bacteria','un hongo']},
{t:'celula',ctx:'Las células del músculo del corazón trabajan sin descanso toda la vida y necesitan muchísima energía.',q:'¿Qué organelo se espera encontrar en gran cantidad en esas células?',o:['Mitocondrias','Cloroplastos','Vacuolas','Pared celular']},
{t:'celula',ctx:'Virchow afirmó en 1855 que «toda célula proviene de otra célula». Antes muchos creían que la vida podía surgir de la materia sin vida.',q:'¿Qué observación apoya mejor la idea de Virchow?',o:['Una herida se cierra porque las células cercanas se dividen','Del barro húmedo salen gusanos','Las células vegetales tienen pared','Los virus no son células']},
{t:'celula',ctx:'Una sustancia entra a la célula desde un lugar donde hay poca hacia donde hay mucha, y la célula gasta ATP para lograrlo.',q:'Este proceso se llama',o:['transporte activo','difusión simple','ósmosis','transpiración']},
{t:'reinos',ctx:'En una salida de campo se encuentra un organismo pluricelular que crece sobre un tronco podrido, no tiene clorofila y su pared celular tiene quitina.',q:'¿A qué reino pertenece?',o:['Fungi','Plantae','Animalia','Monera']},
{t:'reinos',ctx:'Un estudiante escribe así el nombre del oso de anteojos: tremarctos Ornatus.',q:'¿Cuál es el error?',o:['El género va con mayúscula y la especie con minúscula: Tremarctos ornatus','Debe escribirse en español','Las dos palabras van con mayúscula','El nombre científico lleva tres palabras']},
{t:'reinos',ctx:'Una clave dicotómica dice: 1a. Tiene núcleo → ir a 2. 1b. No tiene núcleo → Monera. 2a. Hace fotosíntesis y es pluricelular → Plantae. 2b. No hace fotosíntesis → ir a 3.',q:'Una ameba, eucariota unicelular que no hace fotosíntesis, se clasifica siguiendo el camino',o:['1a → 2b → 3','1b','1a → 2a','2a → 1b']},
{t:'reinos',ctx:'Dos organismos pertenecen al mismo orden pero a familias diferentes.',q:'Según la clasificación de Linneo, es correcto afirmar que',o:['pertenecen también a la misma clase','pertenecen al mismo género','son de la misma especie','no pertenecen al mismo reino']},
{t:'reinos',ctx:'Woese comparó el ARN de los ribosomas de muchos organismos y encontró que las arqueas son muy distintas de las bacterias, aunque las dos son procariotas.',q:'Por eso propuso',o:['separar a los seres vivos en tres dominios','unir arqueas y bacterias en un solo grupo','clasificar a los organismos por su tamaño','eliminar el reino Protista']},
{t:'sistemas',ctx:'Después de almorzar, el nivel de glucosa en la sangre de una persona sube y, una hora después, vuelve a su valor normal.',q:'¿Qué hormona hizo que la glucosa bajara?',o:['La insulina','La adrenalina','La testosterona','El glucagón']},
{t:'sistemas',ctx:'Una persona toca una olla caliente y retira la mano antes de sentir dolor.',q:'¿Qué estructura controló esta respuesta?',o:['La médula espinal','El cerebelo','La glándula tiroides','El corazón']},
{t:'sistemas',ctx:'En los alvéolos pulmonares el oxígeno pasa del aire a la sangre y el CO₂ pasa de la sangre al aire.',q:'¿Por qué ocurre ese intercambio sin gastar energía?',o:['Cada gas pasa por difusión desde donde está más concentrado','Los músculos del pecho empujan los gases','El corazón bombea los gases a los alvéolos','Los glóbulos blancos transportan los gases']},
{t:'sistemas',ctx:'Un médico explica que las vacunas tienen el microbio muerto, debilitado o solo una parte de él.',q:'Las vacunas protegen porque',o:['el cuerpo forma anticuerpos y células de memoria sin enfermarse','matan todas las bacterias del cuerpo','reemplazan a los glóbulos blancos','curan las enfermedades causadas por virus']},
{t:'sistemas',ctx:'En una tabla se compara el sistema nervioso con el endocrino.',q:'¿Qué diferencia es correcta?',o:['El nervioso usa impulsos eléctricos rápidos y el endocrino hormonas por la sangre','El endocrino es más rápido que el nervioso','El nervioso solo funciona cuando dormimos','El endocrino no tiene efectos en el cuerpo']},
{t:'reproduccion',ctx:'Un agricultor quiere que todas sus plantas de yuca den raíces iguales a las de su mejor planta.',q:'¿Qué le conviene hacer?',o:['Sembrar esquejes (tallos) de esa planta','Sembrar semillas de plantas distintas','Polinizar las flores a mano','Cruzarla con otra variedad']},
{t:'reproduccion',ctx:'Después de la polinización y la fecundación de una flor de guayaba, se forma la fruta.',q:'¿De qué parte de la flor se formó la guayaba?',o:['Del ovario','De los pétalos','De la antera','Del estambre']},
{t:'reproduccion',ctx:'Las ranas ponen cientos de huevos en el agua y no cuidan a sus crías; una vaca tiene un solo ternero y lo cuida.',q:'¿Qué explica la diferencia en el número de crías?',o:['Cuando no hay cuidado sobreviven pocas crías, así que se producen muchas','Las vacas no pueden tener más crías','Las ranas viven más años','En el agua no hay depredadores']},
{t:'reproduccion',ctx:'En una campaña de salud se recomienda la «doble protección».',q:'Esta consiste en usar',o:['condón más otro método anticonceptivo','dos condones al tiempo','pastillas y pastilla de emergencia','solo el método del calendario']},
{t:'reproduccion',ctx:'Una bacteria se divide en dos cada 20 minutos y forma una colonia de células idénticas.',q:'¿Qué desventaja tiene este tipo de reproducción?',o:['No produce variabilidad: un cambio del ambiente puede afectarlas a todas','Es muy lenta','Necesita dos progenitores','Produce gametos']},
{t:'genetica',ctx:'En el maíz, el grano amarillo (A) domina sobre el blanco (a). Se cruzan dos plantas heterocigotas.',q:'¿Qué proporción de las plantas hijas tendrá grano blanco?',o:['25 %','50 %','75 %','0 %']},
{t:'genetica',ctx:'Dos padres de ojos cafés tienen una hija de ojos azules. El color café es dominante.',q:'¿Qué genotipos tienen los padres?',o:['Los dos son heterocigotos (Aa)','Los dos son homocigotos dominantes (AA)','Uno es AA y el otro aa','Los dos son aa']},
{t:'genetica',ctx:'Una cadena de ADN tiene la secuencia T A C G G A.',q:'¿Cuál es la cadena complementaria?',o:['A T G C C T','T A C G G A','U A G C C U','G C A T T C']},
{t:'genetica',ctx:'En la anemia falciforme, el cambio de una sola base en el gen de la hemoglobina cambia un aminoácido de la proteína.',q:'Esto es un ejemplo de',o:['una mutación que altera una proteína','una adaptación aprendida','un cambio en el número de cromosomas','una infección por un virus']},
{t:'genetica',ctx:'El daltonismo depende de un gen recesivo ubicado en el cromosoma X.',q:'¿Por qué es más frecuente en hombres que en mujeres?',o:['Porque los hombres tienen un solo cromosoma X','Porque el cromosoma Y tiene el gen dominante','Porque las mujeres no tienen cromosoma X','Porque los hombres tienen dos cromosomas X']},
{t:'evolucion',ctx:'En un hospital, una bacteria que antes moría con un antibiótico ahora resiste. Se sabe que algunas bacterias de la población original ya tenían una mutación que las protegía.',q:'¿Qué explica mejor el cambio?',o:['El antibiótico eliminó a las sensibles y las resistentes se multiplicaron','Las bacterias aprendieron a resistir porque lo necesitaban','El antibiótico produjo la mutación en todas','Las bacterias resistentes llegaron de otro planeta']},
{t:'evolucion',ctx:'El brazo humano, la aleta de una ballena y el ala de un murciélago tienen los mismos huesos, aunque cumplen funciones distintas.',q:'Estos órganos indican que',o:['esas especies tienen un antepasado común','esas especies no están emparentadas','los órganos se formaron por el uso','todas las especies vuelan']},
{t:'evolucion',ctx:'Según Lamarck, si una persona hace mucho ejercicio, sus hijos nacerán más musculosos.',q:'¿Por qué esta idea es incorrecta?',o:['Lo ganado en vida no cambia el ADN de los gametos','Los músculos no se pueden desarrollar','Los hijos heredan solo de la madre','El ejercicio cambia los genes de todas las células']},
{t:'evolucion',ctx:'Una población de ranas queda dividida por un río que se formó. Miles de años después, las ranas de las dos orillas ya no pueden reproducirse entre sí.',q:'¿Qué proceso ocurrió?',o:['Especiación','Extinción','Selección artificial','Metamorfosis']},
{t:'evolucion',ctx:'En una capa profunda de roca se encuentran fósiles de peces, y en capas más superficiales fósiles de mamíferos.',q:'¿Qué se puede concluir?',o:['Los peces de esos fósiles vivieron antes que esos mamíferos','Los mamíferos son más antiguos que los peces','Los fósiles se movieron de capa','Peces y mamíferos vivieron al mismo tiempo']},
{t:'ecosistemas',ctx:'En una cadena trófica del páramo, los frailejones captan 10 000 kcal de energía del Sol.',q:'¿Cuánta energía llega aproximadamente a los consumidores secundarios?',o:['100 kcal','1000 kcal','10 000 kcal','5000 kcal']},
{t:'ecosistemas',ctx:'El colibrí toma el néctar de una flor y, al hacerlo, lleva su polen a otra flor de la misma especie.',q:'¿Qué tipo de relación es?',o:['Mutualismo','Parasitismo','Depredación','Competencia']},
{t:'ecosistemas',ctx:'En un lago cercano a unos cultivos llega mucho fertilizante con las lluvias. Crecen algas en exceso y luego mueren los peces.',q:'¿Por qué mueren los peces?',o:['Las bacterias que descomponen las algas gastan el oxígeno del agua','Las algas se comen a los peces','El fertilizante enfría el agua','Los peces comen demasiadas algas']},
{t:'ecosistemas',ctx:'En un bosque se eliminan todos los depredadores de los venados.',q:'¿Qué se espera que pase primero?',o:['Aumentan los venados y disminuye la vegetación','Disminuyen los venados','Aumenta la vegetación','No cambia nada']},
{t:'ecosistemas',ctx:'Un estudiante afirma que la energía y la materia se reciclan igual en el ecosistema.',q:'¿Qué corrección es adecuada?',o:['La materia se recicla, pero la energía fluye y se pierde como calor','La energía se recicla, pero la materia se pierde','Ni la materia ni la energía se reciclan','Las dos fluyen en una sola dirección']},
{t:'colombia',ctx:'Bogotá recibe gran parte de su agua de los páramos de Chingaza y Sumapaz.',q:'¿Por qué es importante conservar los páramos?',o:['Sus suelos y plantas captan y regulan el agua que baja a los ríos','Producen la mayor parte del oxígeno del país','Allí se cultiva el café','Tienen las temperaturas más altas del país']},
{t:'colombia',ctx:'Un estudiante sube desde Honda (230 m) hasta el Nevado del Ruiz (5300 m).',q:'¿En qué orden encuentra los pisos térmicos?',o:['Cálido, templado, frío, páramo y nival','Nival, páramo, frío, templado y cálido','Templado, cálido, frío y páramo','Páramo, frío, cálido y nival']},
{t:'colombia',ctx:'Los manglares de la costa pacífica están siendo talados para construir piscinas de camarón.',q:'¿Qué consecuencia es más probable?',o:['Menos peces jóvenes y más erosión de la costa','Más lluvias en la región Andina','Aumento de los arrecifes de coral','Más agua en los páramos']},
{t:'colombia',ctx:'Una especie de rana solo vive en una pequeña zona del Chocó y en ningún otro lugar del mundo.',q:'Esta especie es',o:['endémica','invasora','migratoria','domesticada']},
{t:'colombia',ctx:'En la Amazonía colombiana se talan miles de hectáreas cada año, sobre todo para potreros.',q:'¿Qué efecto tiene esto sobre las lluvias de la región?',o:['Disminuyen, porque hay menos árboles que suelten vapor de agua','Aumentan, porque el suelo queda descubierto','No cambian, porque las lluvias vienen solo del mar','Aumentan, porque las vacas producen vapor']},
{t:'ambiente',ctx:'Una gráfica muestra que el CO₂ del aire pasó de 315 ppm en 1958 a más de 420 ppm hoy.',q:'¿Qué actividad humana explica principalmente ese aumento?',o:['Quemar combustibles fósiles y talar bosques','Sembrar árboles','Usar energía solar','Reciclar plástico']},
{t:'ambiente',ctx:'Durante un fenómeno de El Niño, en muchas regiones de Colombia bajan los embalses.',q:'¿Por qué esto puede causar racionamiento de energía?',o:['La mayor parte de la electricidad del país viene de hidroeléctricas','Las plantas solares dejan de funcionar','El viento deja de soplar','Aumenta el consumo de gas']},
{t:'ambiente',ctx:'Un municipio construye tanques para recoger agua lluvia y siembra semillas resistentes a la sequía.',q:'Estas acciones son de',o:['adaptación al cambio climático','mitigación del cambio climático','aumento de emisiones','deforestación']},
{t:'ambiente',ctx:'Los corales de San Andrés se están poniendo blancos cuando el agua del mar se calienta.',q:'¿Por qué el blanqueamiento es grave?',o:['El coral expulsa las algas que lo alimentan y puede morir','El coral se convierte en planta','El agua se vuelve dulce','Los peces se vuelven blancos']},
{t:'ambiente',ctx:'En un relleno sanitario la basura orgánica se pudre enterrada, sin oxígeno.',q:'¿Qué gas de efecto invernadero se produce?',o:['Metano','Oxígeno','Nitrógeno','Helio']}
],

ABIERTAS: {
 celula:['Diseña un experimento para saber si la sal afecta el tamaño de una rodaja de pepino. Escribe tu hipótesis, la variable independiente, la dependiente y dos variables controladas.','Una planta se deja 3 días en un cuarto oscuro. Explica qué pasa con su fotosíntesis y su respiración, y qué le pasará al oxígeno del cuarto.','Explica con un ejemplo de la medicina por qué fue tan importante la teoría celular.'],
 reinos:['Construye una clave dicotómica de 3 preguntas para separar: champiñón, rosa, ameba y bacteria.','¿Por qué los científicos separaron a las arqueas de las bacterias si al microscopio se ven iguales? Explica con dos diferencias.','Escoge un organismo de tu región y escribe su clasificación desde el dominio hasta la especie (consulta su nombre científico).'],
 sistemas:['Explica cómo trabajan juntos los sistemas nervioso, endocrino y circulatorio cuando te asustas.','Dibuja el recorrido de un bocado de comida desde la boca hasta el intestino grueso e indica qué le pasa en cada órgano.','Una persona con diabetes tipo 1 no produce insulina. Explica qué le pasa al azúcar de su sangre después de comer y por qué.'],
 genetica:['Dos padres de grupo sanguíneo A tienen un hijo de grupo O. Escribe los genotipos de los padres y haz el cuadro de Punnett.','Explica por qué el cuadro de Punnett no sirve para predecir la estatura exacta de un hijo.','Escribe un argumento a favor y otro en contra de sembrar maíz transgénico en Colombia.'],
 evolucion:['Explica con el ejemplo de las bacterias y los antibióticos cómo actúa la selección natural.','¿Por qué una población pequeña de una especie endémica corre más riesgo de extinguirse? Usa los conceptos de deriva genética y variabilidad.','Compara cómo explicarían Lamarck y Darwin el pico largo de un colibrí.'],
 ecosistemas:['Dibuja una red trófica de un ecosistema de tu región con al menos 6 especies y predice qué pasa si desaparece el superdepredador.','Explica por qué en una cadena trófica rara vez hay más de 4 o 5 eslabones.','Explica la diferencia entre hábitat y nicho con un ejemplo de un humedal.'],
 colombia:['Escoge una especie amenazada de Colombia, explica por qué está amenazada y propone dos estrategias para conservarla.','¿Por qué los páramos son tan importantes para el agua de las ciudades? Propón una acción para protegerlos.','Explica por qué Colombia tiene tantos ecosistemas a pesar de estar toda en la zona tropical.'],
 ambiente:['Analiza la gráfica de CO₂ de los últimos 60 años: describe la tendencia y predice el valor de 2050. ¿Qué podría cambiar esa predicción?','Explica cómo afectan El Niño y La Niña a tu región y propone una acción de adaptación para tu barrio o colegio.','Calcula tu huella de carbono en BioNom y escribe tres compromisos realistas para reducirla.'],
 reproduccion:['Compara la reproducción de una papa sembrada por tubérculo con la de una planta sembrada por semilla: ¿cuál da plantas más variadas y por qué?','Explica el recorrido desde la polinización de una flor de mango hasta que se forma la fruta con su semilla.','Diseña un mensaje para una campaña del colegio que explique cómo prevenir el embarazo adolescente y las infecciones de transmisión sexual.']
}
};

/* Historias del «Detective biológico» (extras.js): [grupo, título, partes].
   Cada parte es texto fijo o [versión correcta, versión con error]; cada hoja
   elige al azar cuáles puntos dudosos salen con error. Las frases fijas abren
   párrafo nuevo, y ningún párrafo tiene más de 3 puntos dudosos. */
window.DETECTIVE=[
['celula','Una tarde en el laboratorio del colegio',[
 'Sofía y Andrés prepararon una lámina con cáscara de cebolla para verla al microscopio.',
 ['Para calcular el aumento multiplicaron el ocular de 10× por el objetivo de 40×: 400 aumentos.','Para calcular el aumento sumaron el ocular de 10× y el objetivo de 40×: 50 aumentos.'],
 ['Vieron células con pared celular, porque la cebolla es una planta.','Vieron células sin pared celular, porque la cebolla es una planta.'],
 'Luego compararon con células de la mejilla.',
 ['Las células de la mejilla tenían núcleo, porque son eucariotas.','Las células de la mejilla no tenían núcleo, porque son procariotas.'],
 ['La profesora explicó que la mitocondria produce la mayor parte del ATP de la célula.','La profesora explicó que el aparato de Golgi produce la mayor parte del ATP de la célula.'],
 ['También recordó que los ribosomas fabrican las proteínas.','También recordó que los lisosomas fabrican las proteínas.'],
 'Para terminar, pusieron una rodaja de papa en agua con mucha sal.',
 ['Al rato la papa estaba blanda, porque el agua salió de sus células por ósmosis.','Al rato la papa estaba dura, porque la sal entró a sus células por ósmosis.'],
 ['Concluyeron que en la ósmosis el agua pasa hacia donde hay más solutos.','Concluyeron que en la ósmosis el agua pasa hacia donde hay menos solutos.'],
 ['Andrés recordó que Virchow dijo que toda célula proviene de otra célula.','Andrés recordó que Hooke dijo que toda célula proviene de otra célula.']]],
['reinos','La salida de campo a la reserva',[
 'El curso visitó una reserva natural con una guía para clasificar los seres vivos que encontraran.',
 ['Sobre un tronco podrido vieron hongos, que se alimentan por absorción.','Sobre un tronco podrido vieron hongos, que se alimentan por fotosíntesis.'],
 ['La guía explicó que la pared de los hongos es de quitina.','La guía explicó que la pared de los hongos es de celulosa.'],
 'Después tomaron agua de un charco para mirarla con una lupa de bolsillo.',
 ['En el agua había protistas, que son eucariotas sencillos.','En el agua había protistas, que son procariotas sin núcleo.'],
 ['Sebastián dijo que las bacterias pertenecen al reino Monera porque no tienen núcleo.','Sebastián dijo que las bacterias pertenecen al reino Plantae porque no tienen núcleo.'],
 'Al final vieron un oso de anteojos en un afiche y escribieron su nombre científico.',
 ['Lo escribieron Tremarctos ornatus: el género con mayúscula y la especie con minúscula.','Lo escribieron tremarctos Ornatus: el género con minúscula y la especie con mayúscula.'],
 'De regreso, la guía repasó lo que habían aprendido.',
 ['Recordaron que la categoría más específica es la especie.','Recordaron que la categoría más específica es el reino.'],
 ['La guía contó que Woese propuso los tres dominios: Bacteria, Archaea y Eukarya.','La guía contó que Linneo propuso los tres dominios: Bacteria, Archaea y Eukarya.'],
 ['También dijo que Colombia es el primer país en especies de aves.','También dijo que Colombia es el último país en especies de aves.']]],
['sistemas','El partido de microfútbol',[
 'En el recreo, Camilo jugó un partido de microfútbol muy reñido.',
 ['Mientras corría, su corazón latía más rápido para llevar más oxígeno a los músculos.','Mientras corría, su corazón latía más despacio para llevar más oxígeno a los músculos.'],
 ['Respiraba más rápido: el diafragma bajaba al contraerse y entraba el aire.','Respiraba más rápido: el diafragma subía al contraerse y entraba el aire.'],
 ['En los alvéolos el oxígeno pasaba a la sangre por difusión.','En los alvéolos el oxígeno pasaba a la sangre por transporte activo.'],
 'Al rato empezó a sudar mucho.',
 ['El sudor le ayudaba a bajar la temperatura: eso es homeostasis.','El sudor le ayudaba a subir la temperatura: eso es homeostasis.'],
 ['En una jugada retiró el pie de un golpe sin pensarlo: fue un reflejo de la médula espinal.','En una jugada retiró el pie de un golpe sin pensarlo: fue un reflejo del cerebelo.'],
 'Después del partido almorzó arroz con fríjoles.',
 ['El almidón empezó a digerirse en la boca gracias a la amilasa de la saliva.','El almidón empezó a digerirse en el intestino grueso gracias a la amilasa de la saliva.'],
 ['Los nutrientes pasaron a la sangre en el intestino delgado.','Los nutrientes pasaron a la sangre en el esófago.'],
 ['Una hora después, el páncreas soltó insulina para bajar el azúcar de su sangre.','Una hora después, el páncreas soltó adrenalina para bajar el azúcar de su sangre.']]],
['reproduccion','La huerta de la abuela',[
 'Durante las vacaciones, Laura ayudó a su abuela en la huerta.',
 ['Sembraron tallos de yuca, que forman plantas iguales a la madre: es reproducción asexual.','Sembraron tallos de yuca, que forman plantas diferentes a la madre: es reproducción sexual.'],
 ['La abuela le mostró una papa con brotes, otro ejemplo de reproducción vegetativa.','La abuela le mostró una papa con brotes, un ejemplo de fecundación.'],
 'Luego observaron las flores del mango.',
 ['Las abejas llevaban el polen de la antera al estigma: eso es la polinización.','Las abejas llevaban el polen del estigma a la antera: eso es la fecundación.'],
 ['Laura aprendió que el fruto se forma a partir del ovario de la flor.','Laura aprendió que el fruto se forma a partir de los pétalos de la flor.'],
 ['Y que las semillas vienen de los óvulos fecundados.','Y que las semillas vienen de los granos de polen sin fecundar.'],
 'En la quebrada vieron huevos de rana pegados a las piedras.',
 ['La abuela explicó que las ranas tienen fecundación externa, en el agua.','La abuela explicó que las ranas tienen fecundación interna, como los mamíferos.'],
 ['De esos huevos salen renacuajos que se transforman por metamorfosis.','De esos huevos salen ranas adultas, sin ningún cambio de forma.'],
 ['Laura recordó que la reproducción sexual da hijos con variabilidad genética.','Laura recordó que la reproducción sexual da hijos idénticos a los padres.']]],
['genetica','El árbol familiar de Mariana',[
 'Mariana hizo un trabajo sobre las características de su familia.',
 ['Sus padres tienen ojos cafés y ella los tiene azules, así que los dos padres son heterocigotos (Aa).','Sus padres tienen ojos cafés y ella los tiene azules, así que los dos padres son homocigotos (AA).'],
 ['Hizo el cuadro de Punnett: la probabilidad de un hermano de ojos azules es 25 %.','Hizo el cuadro de Punnett: la probabilidad de un hermano de ojos azules es 75 %.'],
 ['Explicó que el genotipo son las letras y el fenotipo lo que se ve.','Explicó que el fenotipo son las letras y el genotipo lo que se ve.'],
 'Después investigó dónde se guarda esa información.',
 ['Los genes están en el ADN, que tiene forma de doble hélice.','Los genes están en las proteínas, que tienen forma de doble hélice.'],
 ['En el ADN la adenina se une con la timina y la citosina con la guanina.','En el ADN la adenina se une con la guanina y la citosina con la timina.'],
 ['El ARN mensajero se traduce a proteína en los ribosomas.','El ARN mensajero se traduce a proteína en las mitocondrias.'],
 'Para terminar, habló de su tío, que es daltónico.',
 ['El daltonismo es más común en hombres porque el gen está en el cromosoma X.','El daltonismo es más común en hombres porque el gen está en el cromosoma Y.'],
 ['Concluyó que cada gameto humano lleva 23 cromosomas.','Concluyó que cada gameto humano lleva 46 cromosomas.']]],
['evolucion','La exposición sobre Darwin',[
 'Para la feria de ciencias, Julián preparó una exposición sobre la evolución.',
 ['Contó que Darwin estudió los pinzones de las islas Galápagos.','Contó que Darwin estudió los pinzones de las islas de San Andrés.'],
 ['Explicó que los pinzones de pico grueso comen semillas duras.','Explicó que los pinzones de pico grueso comen néctar de las flores.'],
 'Luego comparó a Darwin con Lamarck.',
 ['Para Lamarck, lo que un ser vivo gana en vida se hereda, idea que hoy se sabe que es falsa.','Para Lamarck, lo que un ser vivo gana en vida no se hereda, idea que hoy se sabe que es falsa.'],
 ['Para Darwin, los individuos mejor adaptados dejan más descendencia.','Para Darwin, los individuos cambian porque desean adaptarse.'],
 ['Mostró que el brazo humano y el ala del murciélago son órganos homólogos.','Mostró que el brazo humano y el ala del murciélago son órganos análogos.'],
 'Al final habló de evolución en Colombia y en los hospitales.',
 ['En el Cerrejón se encontró la Titanoboa, una serpiente gigante fósil.','En el Cerrejón se encontró un dinosaurio vivo.'],
 ['Explicó que las bacterias se vuelven resistentes porque el antibiótico elimina a las sensibles.','Explicó que las bacterias se vuelven resistentes porque el antibiótico les enseña a resistir.'],
 ['Cerró diciendo que el Homo sapiens apareció en África.','Cerró diciendo que el Homo sapiens apareció en Europa.']]],
['ecosistemas','El humedal del barrio',[
 'El grupo ecológico del colegio estudió el humedal que queda cerca del barrio.',
 ['Anotaron como factores abióticos el agua, la luz y la temperatura.','Anotaron como factores abióticos los peces, las garzas y los juncos.'],
 ['Los juncos y las algas son los productores, porque hacen fotosíntesis.','Las garzas son los productores, porque hacen fotosíntesis.'],
 'Después armaron una cadena trófica.',
 ['La energía pasa de las algas a los peces pequeños y de ellos a la garza.','La energía pasa de la garza a los peces pequeños y de ellos a las algas.'],
 ['En cada eslabón solo pasa cerca del 10 % de la energía.','En cada eslabón pasa cerca del 90 % de la energía.'],
 ['Los hongos y las bacterias descomponen la materia muerta y devuelven minerales al suelo.','Los hongos y las bacterias producen energía nueva a partir de la luz de la Luna.'],
 'Por último, observaron las relaciones entre especies.',
 ['El colibrí y las flores tienen una relación de mutualismo.','El colibrí y las flores tienen una relación de parasitismo.'],
 ['Las garrapatas de las vacas del potrero vecino son parásitos.','Las garrapatas de las vacas del potrero vecino son comensales.'],
 ['Concluyeron que la materia se recicla, pero la energía se pierde como calor.','Concluyeron que la energía se recicla, pero la materia se pierde como calor.']]],
['colombia','El viaje por Colombia',[
 'La familia de Valentina viajó en vacaciones por varias regiones del país.',
 ['En Bogotá, a 2600 metros, estaban en el piso térmico frío.','En Bogotá, a 2600 metros, estaban en el piso térmico cálido.'],
 ['Visitaron el páramo de Sumapaz, que regula el agua como una esponja.','Visitaron el páramo de Sumapaz, que es un desierto sin agua.'],
 ['Allí vieron frailejones, cuyas hojas peludas los protegen del frío.','Allí vieron palmas de coco, cuyas hojas peludas las protegen del frío.'],
 'Luego bajaron hacia los Llanos Orientales.',
 ['En la Orinoquía vieron chigüiros en las sabanas inundables.','En la Orinoquía vieron pingüinos en las sabanas inundables.'],
 ['El guía contó que el delfín rosado vive en los ríos de la Amazonía y la Orinoquía.','El guía contó que el delfín rosado vive en los arrecifes de San Andrés.'],
 'Terminaron el viaje en la costa del Pacífico.',
 ['Vieron manglares, que protegen la costa y son guardería de peces.','Vieron manglares, que no sirven para nada y se pueden talar.'],
 ['Entre julio y octubre llegan allí las ballenas jorobadas a tener sus crías.','Entre julio y octubre llegan allí los osos polares a tener sus crías.'],
 ['Valentina aprendió que Colombia es megadiversa por estar en el trópico, tener dos océanos y tres cordilleras.','Valentina aprendió que Colombia es megadiversa por estar en el polo norte.']]],
['ambiente','La feria del clima',[
 'En la feria del clima del colegio, Tomás explicó el efecto invernadero.',
 ['Dijo que gases como el CO₂ y el metano retienen el calor de la Tierra.','Dijo que gases como el oxígeno y el nitrógeno retienen el calor de la Tierra.'],
 ['Sin efecto invernadero natural, la Tierra sería mucho más fría.','Sin efecto invernadero natural, la Tierra sería mucho más caliente.'],
 'Luego habló de las causas en Colombia.',
 ['En Colombia la mayor fuente de emisiones es la deforestación.','En Colombia la mayor fuente de emisiones son los paneles solares.'],
 ['Las vacas producen metano al digerir el pasto.','Las vacas producen oxígeno al digerir el pasto.'],
 ['Con El Niño llueve menos y pueden bajar los embalses.','Con El Niño llueve más y se llenan los embalses.'],
 'Al final propuso acciones para el colegio.',
 ['Sembrar árboles y usar energía solar son acciones de mitigación.','Sembrar árboles y usar energía solar son acciones que aumentan las emisiones.'],
 ['Recoger agua lluvia para la época seca es una acción de adaptación.','Recoger agua lluvia para la época seca es una acción de deforestación.'],
 ['Separar los residuos orgánicos evita que produzcan metano en el relleno.','Separar los residuos orgánicos hace que produzcan más metano en el relleno.']]]
];
