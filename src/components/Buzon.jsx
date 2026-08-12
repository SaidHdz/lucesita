import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, ArrowLeft, ChevronLeft, ChevronRight, Heart, Sparkles, Check, MailOpen, Download, Loader2, ListMusic } from 'lucide-react';
import html2canvas from 'html2canvas';

const letters = [
  { 
    id: 1, 
    number: "01",
    title: 'Cansado', 
    date: 'Carta 01',
    tag: 'Pensamientos',
    snippet: 'a estas alturas estoy más cansado qué triste, o estoy cansado de estar triste, quiza sea cansado pensarte siempre...',
    content: `a estas alturas estoy más cansado qué triste, o estoy cansado de estar triste, quiza sea cansado pensarte siempre, aun que por mas cansado qué este, nunca me cansaré de escribirte una y mil cartas, por qué amar no cansa, y yo no tengo duda que te amo.`,
    stampColor: 'from-purple-500 to-indigo-600',
    accentGlow: 'rgba(176, 136, 249, 0.2)'
  },
  { 
    id: 2, 
    number: "02",
    title: 'Insomnio', 
    date: 'Carta 02',
    tag: 'Desvelos',
    snippet: 'aqui estoy una noche mas sin ti, sin dormir hasta las tantas. creo que ya estoy avanzando, ya no te pienso tanto...',
    content: `aqui estoy una noche mas sin ti, sin dormir hasta las tantas.
creo que ya estoy avanzando, ya no te pienso tanto, solo desde que despierto hasta que voy a dormir, si es que logro dormir.
tu amor me hace tanta falta, que yo siempre supe estar solo, lo he estado siempre, pero contigo me siento solo estando acompañado.
te dedico este y todos mis desvelos, ya que tu recuerdo es el causante de todo esto.`,
    stampColor: 'from-blue-500 to-indigo-700',
    accentGlow: 'rgba(136, 200, 249, 0.2)'
  },
  { 
    id: 3, 
    number: "03",
    title: 'Premios vacíos', 
    date: 'Carta 03',
    tag: 'Logros',
    snippet: 'he logrado tanto desde que tu no estas, he hecho muchas cosas de las que nunca me crei capaz, he ganado reconocimientos...',
    content: `he logrado tanto desde que tu no estas, he hecho muchas cosas de las que nunca me crei capaz, he ganado reconocimientos y muchas cosas, qué cualquier persona daria por tener, he expandido mis capacidades y he aprendido muchisimo, a un nivel al cual nunca logre pensar llegar, gane premios, recibir tantos halagos, tantas felicitaciones, tantos trofeos, pero.
son vacíos, de que me sirve "tenerlo todo" si no estas aquí para compartir esos logros, y a quien engaño, tu eres la razón por la cual ahora logre todo lo que logre, eres mi musa, para bien o para mal te tendré siempre, y por mas que trate de borrarte de mi cabeza, nunca podré hacerlo de mi corazón, menos como ese hueco tan vacio que dejaste, vivo pidiendo a dios que me de la oportunidad de reivindicar mis errores, que volvamos a ser nosotros, y se que en el fondo aun piensas en mi y en lo que pudimos ser, y asi como digo con la selección, ¿y si, si? qué nos cuesta volver a intentarlo si tu sabes que somos mucho, van varias noches de insomnio desde que te fuiste, no importa que tan bien este siempre me llega al corazón el saber que hice las cosas mal, dime porfavor como haces para no sentir na' si tu falta me hace sentir que ningún logro vale la pena, que todas esas copas son vacías, ya que no estas ahi para verme, para celebrarlo, juntos.`,
    stampColor: 'from-violet-500 to-purple-600',
    accentGlow: 'rgba(176, 136, 249, 0.22)'
  },
  { 
    id: 4, 
    number: "04",
    title: 'Te extraño', 
    date: 'Carta 04',
    tag: 'Nostalgia',
    snippet: 'te extraño, extraño los buenos días en las mañanas, los "ya comiste" por la tarde, cuando me contabas como te fue en tu día...',
    content: `te extraño, extraño los buenos días en las mañanas, los "ya comiste" por la tarde, cuando me contabas como te fue en tu día, extraño saber que haces, si te dormiste, saber si te hiciste tu cafesito de la mañana, tarde o noche o saliste con tus amigas, extraño el tiempo que no contestabas y yo solo pensaba en que hablaríamos hasta que vuelvas, te extraño, aun te pienso, extraño salir, extraño verte llegar con una sonrisa tan grande que aun esta guardada en mi cabeza y sobretodo en mi corazón, extraño la forma de tus ojos cuando reias, cuando me esforzaba por decir algo gracioso y verte reír, era mi medicina mas grande, tu paz curaba cualquier problema qué tenia, tenia 99 problemas y contigo el ruido y todo lo malo desaparecería, como no voy a extrañar la paz qué me daba estar contigo? y es que, tengo tantas, tantas cosas que decirte, pero como lo hago? quisiera volver a despertar como tus buenos días, pero ya es muy tarde y es extraño como sabes que me gusta, mi color favorito, mi musica favorita, que me gustan los hotweels o minecraft, y sabes que te quiero con todo mi alma, y es extraño por que yo conozco mucho de ti, quiza no todo, pero lo justo, y es que te extraño qué se me hace extraño qué tu no lo hagas.`,
    stampColor: 'from-sky-400 to-blue-600',
    accentGlow: 'rgba(136, 200, 249, 0.25)'
  },
  { 
    id: 5, 
    number: "05",
    title: 'Tonto', 
    date: 'Carta 05',
    tag: 'Reflejo',
    snippet: 'y es que busque como un tonto tu amor en otra persona, por desesperación y nadie es tu, se que no debo buscarte en otros ojos...',
    content: `y es que busque como un tonto tu amor en otra persona, por desesperación y nadie es tu, se que no debo buscarte en otros ojos, pero intente avanzar y conocer gente como me dijeron, pero siempre veia tu reflejo atraves de sus ojos, tu, por que no quiero a nadie mas, no me importa esperar más meses, mas años, si me di cuenta que nadie es tu, y no quiero buscarte en nadie mas, nadie es mas que tu, y yo no quiero a mas nadie en mi vida, hasta los sticker, frases, y todo me recuerda a ti, por que como dice nsqk "todo vuelve a ti, como aves al sur en invierno" y yo se que no seremos mas, pero nadie me quitara este amor hacia ti, y por más que lo quiera no sales de mi corazón, te extraño y te quiero más que nunca y no sabes cuanta falta me haces dia a dia.`,
    stampColor: 'from-[#c8a2c8] to-purple-600',
    accentGlow: 'rgba(200, 162, 200, 0.2)'
  },
  { 
    id: 6, 
    number: "06",
    title: 'Tiempo', 
    date: 'Carta 06',
    tag: 'Oportunidad',
    snippet: 'ha pasado tiempo desde que hablamos, desde que hubo una historia entre nosotros, y te extraño y es algo que no puedo negar...',
    content: `ha pasado tiempo desde que hablamos, desde que hubo una historia entre nosotros, y te extraño y es algo que no puedo negar, extraño mi yo de antes de conocerte, mi yo en el tiempo en que te conoci y el tiempo que estuvimos juntos, poco pero suficiente.
dicen que el tiempo de dios es perfecto y quiza volvamos a encontrarnos o me vuelva a enamorar y te olvide, prefiero la primera.
te extraño, busco un perdon y no con palabras o arrastrándome, rogando o suplicando, solo una oportunidad de mostrar con mis acciones que puedo cambiar, darme el tiempo de volver a ganar la confianza con tiempo, y amor, tiempo hay, aun que sin ti es un infierno.`,
    stampColor: 'from-blue-400 to-indigo-600',
    accentGlow: 'rgba(136, 200, 249, 0.2)'
  },
  { 
    id: 7, 
    number: "07",
    title: 'Qué feo se siente ser así', 
    date: 'Carta 07',
    tag: 'Desahogo',
    snippet: 'Ya no vienes a dromir y me cuesta descansar, no me hables de ser feliz yo que rio por no llorar. Es tran profunda la raíz...',
    content: `Ya no vienes a dromir y me cuesta descansar, no me hables de ser feliz yo que rio por no llorar.
Es tran profunda la raíz, que solo pude cortar el fruto de nuestro amor, que solo me hace incapaz, que crece de sol a sol ocupando tu huequito del sofá. 

Desde que terminó nuestra historia, el insomnio se mudó a mi cama. Hay noches en las que mis ojos se humedecen más de lo normal y los días se vuelven largos, pesados, eternos. Lo único que me queda de compañía es el fruto de lo nuestro: ese amor tan grande que nos tuvimos y que hoy se transformó en un vacío enorme en el sofá. Me cuesta tanto descansar desde que dejaste de ser un momento real para convertirte solo en un pensamiento.
Qué feo se siente ser así, y aceptar que mis propias decisiones me tienen hoy atrapado aquí, y sé que nadie tiene la culpa más que yo. Aun así, en medio de este desastre, no he parado de escribir sobre ti. Ojalá algún día, cuando todo esto pase, puedas devolverme el corazón... no porque no lo sepas usar, sino simplemente porque se quedó a vivir contigo.`,
    stampColor: 'from-purple-400 to-blue-600',
    accentGlow: 'rgba(176, 136, 249, 0.25)'
  },
  { 
    id: 8, 
    number: "08",
    title: 'Compartir mi vida contigo', 
    date: 'Carta 08',
    tag: 'Promesa',
    snippet: 'Te quiero, y estoy seguro de que quiero compartir mi vida contigo, se que es difícil volver a confiar en mi...',
    content: `Te quiero, y estoy seguro de que quiero compartir mi vida contigo, se que es difícil volver a confiar en mi de la forma que lo hiciste antes pero, estoy seguro de que quiero intentar de nuevo las cosas contigo, y si tu así lo quieres, entregarte todo de mi.`,
    stampColor: 'from-pink-500 to-purple-600',
    accentGlow: 'rgba(200, 162, 200, 0.25)'
  },
  { 
    id: 9, 
    number: "09",
    title: 'Do you think about me?', 
    date: 'Carta 09',
    tag: 'Recuerdos',
    snippet: 'A veces entre tanto recuerdo, pauso para preguntarme si aun me piensas, me gusta imaginar que si...',
    content: `A veces entre tanto recuerdo, pauso para preguntarme si aun me piensas, me gusta imaginar que si, así como yo te pienso.

Do you think about me?

Aun que ahora caminemos por caminos diferentes, yo sigo guardando un lugar para ti en mi vida, por si nos volvemos a encontrar, aun sigo avanzando, mejorando por mi, y por ti, lo que fuimos fue tan real como para borrarlo así sin mas.`,
    stampColor: 'from-indigo-400 to-purple-600',
    accentGlow: 'rgba(176, 136, 249, 0.2)'
  },
  { 
    id: 10, 
    number: "10",
    title: 'Pesadilla', 
    date: 'Carta 10',
    tag: 'Desvelos',
    snippet: 'anoche volví a soñar contigo. No fue un sueño de esos que te dejan una sonrisa, mas bien fue una pesadilla...',
    content: `anoche volví a soñar contigo. No fue un sueño de esos que te dejan una sonrisa, mas bien fue una pesadilla donde me decías que ya no había un futuro para nosotros. Me dolió recordar la seguridad que sentía cuando estábamos bien y pensábamos que estaríamos juntos siempre. Ya van 12 días sin hablar, y no ha pasado uno solo en el que no te cruces por mi mente`,
    stampColor: 'from-blue-600 to-slate-800',
    accentGlow: 'rgba(136, 200, 249, 0.2)'
  },
  { 
    id: 11, 
    number: "11",
    title: 'Hoy es domingo', 
    date: 'Carta 11',
    tag: 'Wrapped',
    snippet: 'hoy es domingo, termine de trabajar y segui con nuestro Wrapped, me esta gustando como va quedando todo...',
    content: `hoy es domingo, termine de trabajar y segui con nuestro Wrapped, me esta gustando como va quedando todo.

Me siento algo mal no te voy a mentir, sigo con esto por que, al menos es una forma en la que siento que hablo un poco contigo, me gusta la idea de que algun dia mires esto y te guste todo, te quiero.`,
    stampColor: 'from-violet-400 to-indigo-600',
    accentGlow: 'rgba(176, 136, 249, 0.22)'
  },
  { 
    id: 12, 
    number: "12",
    title: 'Empezar de nuevo', 
    date: 'Carta 12',
    tag: 'Anhelo',
    snippet: 'Que mas daría por que te olvides de mi por completo, para así poder volver a hablarte y empezar de nuevo...',
    content: `Que mas daría por que te olvides de mi por completo, para así poder volver a hablarte y empezar de nuevo, sin rencores o miedos, solo nosotros dos, amándonos nuevamente como antes.`,
    stampColor: 'from-purple-500 to-[#c8a2c8]',
    accentGlow: 'rgba(200, 162, 200, 0.25)'
  },
  { 
    id: 13, 
    number: "13",
    title: 'Día de hueva extrema', 
    date: 'Carta 13',
    tag: 'Tu voz',
    snippet: 'hoy fue un día de hueva extrema, de esos lentos donde me falta tu voz. Estoy aprendiendo a estar solo...',
    content: `hoy fue un día de hueva extrema, de esos lentos donde me falta tu voz. Estoy aprendiendo a estar solo y a ser mejor por mí mismo, para que si algún día escuchas que algo cambió en mí, sea de verdad. Te extraño, y aunque hoy el bajón dolió menos, nunca dejarás de quererte. No quiero empezar de nuevo con nadie más, me di cuenta de que, sin importar a dónde vaya, mi hogar solo está donde tú estás.`,
    stampColor: 'from-sky-500 to-indigo-600',
    accentGlow: 'rgba(136, 200, 249, 0.25)'
  },
  { 
    id: 14, 
    number: "14",
    title: 'Sin encontrar la respuesta', 
    date: 'Carta 14',
    tag: 'Perdón',
    snippet: 'me sé de memoria el camino a tu casa y tus canciones favoritas. Conozco el color de tus ojos, tus sueños más grandes...',
    content: `me sé de memoria el camino a tu casa y tus canciones favoritas. Conozco el color de tus ojos, tus sueños más grandes y hasta lo que te quita el sueño. Sé cómo brilla tu sonrisa cuando estás cansada y la melodía de tu risa, pero sigo sin encontrar la respuesta para que me perdones.`,
    stampColor: 'from-blue-500 to-purple-700',
    accentGlow: 'rgba(176, 136, 249, 0.2)'
  },
  { 
    id: 15, 
    number: "15",
    title: 'Mi 309', 
    date: 'Carta 15',
    tag: 'Soundtrack',
    snippet: 'dicen que el tiempo lo es todo, pero contigo aprendí que no hace falta una eternidad para enamorarse de verdad...',
    content: `dicen que el tiempo lo es todo, pero contigo aprendí que no hace falta una eternidad para enamorarse de verdad. aunque estuvimos juntos poco tiempo, fue suficiente para que te convirtieras en lo más importante para mí. te volviste mi 309, esa persona que cambió mi mundo y a la que siempre voy a pertenecer, pase lo que pase.

hoy me doy cuenta de que no soy quien soy sin tu amor. me encantaría ser ese libro favorito que nunca te cansas de leer o la luz que te guíe cuando sientas que estás en el abismo. sin lo que tuvimos, mi vida simplemente no se siente igual, es como si le faltara el soundtrack a mis días, te quiero con una intensidad que ni yo mismo conocía, y aunque hoy no estemos juntos, te sigo llevando conmigo en cada canción.`,
    stampColor: 'from-indigo-500 to-purple-600',
    accentGlow: 'rgba(176, 136, 249, 0.25)'
  },
  { 
    id: 16, 
    number: "16",
    title: 'La luz en la espiral', 
    date: 'Carta 16',
    tag: 'Agradecimiento',
    snippet: 'antes de ti, me sentía en una espiral que no terminaba, como si estuviera estancado en un vacío donde nada me salía bien...',
    content: `antes de ti, me sentía en una espiral que no terminaba, como si estuviera estancado en un vacío donde nada me salía bien. pero tu felicidad y tu energía fueron la fórmula secreta que me hizo despertar. me devolviste las ganas de luchar por mis metas y por el futuro que quiero construir.

le quitaste el habla a mi tristeza y, por primera vez, busco cómo seguir con vida. ya no me importa el resto; solo te busco a ti, no quiero encontrar la salida, solo busco tu mano cálida en mi cara fría. gracias por ser la luz cuando yo no encontraba el interruptor.`,
    stampColor: 'from-cyan-500 to-blue-700',
    accentGlow: 'rgba(136, 200, 249, 0.25)'
  },
  { 
    id: 17, 
    number: "17",
    title: 'Un futuro que vale la pena', 
    date: 'Carta 17',
    tag: 'Sueños',
    snippet: 'a veces me cierro los ojos y me voy a ese futuro que nos pertenece. nos veo en un picnic eterno debajo de un árbol de manzanas...',
    content: `a veces me cierro los ojos y me voy a ese futuro que nos pertenece. nos veo en un picnic eterno debajo de un **árbol de manzanas** , compartiendo verdades a las tres de la mañana. Me imagino pasando más de **309** días a tu lado, tal vez peleando **de vez en cuando** , pero **Tarde o temprano** encontrando la forma de arreglar el mundo entre nosotros.

sueño con el día de llegar a la **Misa** y verte entrar de blanco hacia el altar, para después escaparnos y en nuestra luna de miel a **los Alpes** viajar. Sé que para muchos esto suena a **ciencia ficción** , a un cuento de hadas que no existe, pero para mí es el único futuro que vale la pena soñar. te quiero de aquí a la luna, hoy más que nunca.`,
    stampColor: 'from-purple-500 to-pink-600',
    accentGlow: 'rgba(200, 162, 200, 0.3)'
  },
  { 
    id: 18, 
    number: "18",
    title: 'Soltar', 
    date: '10/ago/2026',
    tag: 'Despedida',
    isNew: true,
    snippet: 'que difícil es soltar cuando ambos nos queremos tanto, cuando el amor no es lo que nos separa ni su ausencia, si no algo mas importante, la confianza...',
    content: `que difícil es soltar cuando ambos nos queremos tanto, cuando el amor no es lo que nos separa ni su ausencia, si no algo mas importante, la confianza.

si esto fuera diferente, si me dijeras que no me quieres o que me odias seria más fácil para mi, para ambos, pero no es así, no quiero soltarte ni quiero que me sueltes, y tampoco quiero quedar con el "en otra vida" por que NO ES LO QUE QUEREMOS y lo sabes, yo lo se, y se que no quieres irte por que, nunca pudiste decirlo mirándome a los ojos, perdon por amarte tanto y hacer mas complicadas las cosas, ojala fuera fácil soltar a la mujer con la que quería tener mi familia y mi futuro, a mi chinita linda, a mi 309, mi yoko, mi gongoli, mi calabacita y mi todo, te amo tanto que ni si quiera se si pueda seguir sin ti, o quiza si, pero será complicado, no tendré a quien darle los buenos dias, a quien querer o con quien celebrar mis logros, tengo a mis amigos pero, ellos no son la razon por la cual logre eso, que bien son pilares y los quiero, tu eres la razón por la cual siempre le eh echado ganas, el motivante para ser mejor, eres mi todo, y ahora viviré por ti, sere feliz con tu recuerdo y lo que fuimos, y espero, espero en otra vida poder estar juntos, ser dos perritos salchicha y vivir libres por el mundo, o quizá dos caballitos de mar, por que así como ellos, yo quiero quedarme sin ti, pq te elegi como mi pareja, y quiza no muera por tu ausencia, no por fuera, por que por dentro estoy muerto por tu ida.`,
    stampColor: 'from-purple-600 via-indigo-600 to-slate-800',
    accentGlow: 'rgba(176, 136, 249, 0.3)'
  },
  { 
    id: 19, 
    number: "19",
    title: 'Calabacita linda', 
    date: '11/ago/2026',
    tag: 'Canciones & Recuerdos',
    isNew: true,
    snippet: 'calabacita linda, tengo fe en que, algún día volveremos a estar juntos y pasara todo este *tiroteo*, volvere a ver tus *ojitos lindos*...',
    content: `calabacita linda, tengo fe en que, algún día volveremos a estar juntos y pasara todo este *tiroteo*, volvere a ver tus *ojitos lindos* y poder decirte esas *COSAS QUE NO TE DIJE*, que el próximo verano no sea sin ti; me arrepiento un poco por que se que *Debí tirar más fotos* y trato de afrontar todo esto pero si me ponen *La cancion* que te dedique mi fortaleza se derrumba, como siento que esto es *el fin del mundo* y que no acepto que sea este *el final de nuestra historia* cuando yo aun quería ver *otro atardecer* junto a ti, juntos con nuestras metas realizadas, *Me rehuso* a dejarte ir, por que es muy complicado sabiendo que nos morimos por amor y no es su falta o ausencia lo que hace difícil nuestra despedida, aun sabiendo que amo *todo de ti* que con tu risa y tu forma ser tan linda *te mudaste* a mi corazón, dejando un hueco qué no podre tapar tan fácil, siendo qué tu eres mi *BAILE INoLVIDABLE* y al final el error viene de mi mismo, y me pregunto *QUE PASARIA...* si lo intentaramos, una vez mas y esta fuera la buena, y la definitiva para hacer todo bien, me dolería mucho llegar a *Tu boda* sabiendo que deberia ser yo el que este ahí

me duele tener que saber que ahora tienes tus *OJITOS ROJOS* de tanto llorar por mi culpa
escuchando mas de *1000CANCIONES* y en todas te pienso, siendo qué eres mi *309* y que te quiero tanto que me gustaria estar como un *Gongoli* acurrucadito al lado tuyo, soy un *BOBOMENSOTONTO* al haber hecho todo lo que hice, no me arrepiento de amarte si no de lo malo

miro a la *LUNA* con el consuelo de que la estés viendo tu tambien, quiza pensando en mi y en todo esto, nunca pensé que *Agosto* me jugaria tan mal, nunca olvidsre el 10 de agosto a las 2:20 de la mañana, nuestro último día juntos

ojala volver unos *DIAZ ANTES* y arreglar todos los errores cometidos, me gusto enamorarme de ti, asi *LENTITO* y lindo, dandome cuenta poco a poco que tu me dejas *SIN PODERES* al verme con esos lindos ojos, sabes que yo *POR ESOS OJOS* doy todo, y aun que *MAMI 100PRE SABE* y sabra todo lo que te ame, tu sabes más que nadie qué *NADIE TE QUIERE COMO EL NENE* y aun sabiendo que estamos *EN LA MISMA CIUDAD* y no podemos vernos, no me quiero imaginar cusndo estemos a *KILO*metros de distancia, extrañándote a la distancia, y no es secreto qué me tienes loco, que me siento en LSD cuando te toco, sabes que soy un tonto y mil veces me equivoco pero, yo te quiero a mi ladito como *YOKO*

siempre te pediré un ratito más, quedate, un ratito más mi amor.
me da miedo salir a *la calle* y encontrarte en ella, sin saber si quiera como reaccionar.

nunca podre olvidar qué te gusta el lila o el *Azúl*, que te gusta snoopy o tomar mucho cafe, tantas cosas que vivimos en poco tiempo y darme cuenta que no quiero a *NADIE MAS* me duele demasiado, y te dije *Cosas Que Jamas Diria a Nadie*, no quise irme *Sin Despedirme* aun que eso mismo hizo qué tuviera menos ganas de irme, haciendo tanto calor y sintiéndome en un *invierno* por lo frio de tu "no", te diría una y mil veces *Vuelve* aun sabiendo que nada cambiaría, te rogaría y te diría *Quedate* como si fuera a cambiar algo, ahora más siento que solo hay *Noches Infinitas* en las que no logro y no puedo conciliar el sueño, aun sabiendo que no podre decirte que *TE VI EN MIS PESADILLAS* 

intento soltarte sabiendo que quiza asi ambos podamos resprirar y estar en paz, dolerá y tardará, me sentiré como si estuviera en la *TARMAC* esperando a que deje de doler, aun que si ese es el precio por haberte amado con todo mi ser, lo tomaría una y mil veces, ahora seguire tratando de see *Normal* aun que sepa que pondre *La Sonrisa Obligatoria* y sabiendo que yo fui el *Amor de su vida*, ni aquí puedo terminar de escribir jaja, espero algún día recibir una mensaje tuyo diciendo *OYE* y mi primer respuesta sea "si", por que mi hogar esta *Dónde Tu Estas*, este final se siente *PARANORMAL*, esperando y rogándole a dios a que me digas si regresaras, por ahora me despido de ti y lo nuestro con un *Adiós Amor*`,
    stampColor: 'from-[#88c8f9] via-[#b088f9] to-pink-700',
    accentGlow: 'rgba(136, 200, 249, 0.35)'
  }
];

// Helper function to render text with **bold** Markdown support
const renderFormattedText = (rawText) => {
  if (!rawText) return null;
  const parts = rawText.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      const isBlue = inner.toLowerCase().includes('azul') || inner.toLowerCase().includes('azúl');
      return (
        <strong 
          key={index} 
          className={`font-bold ${
            isBlue 
              ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]' 
              : 'text-[#b088f9] drop-shadow-[0_0_8px_rgba(176,136,249,0.35)]'
          }`}
        >
          {inner}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      const isBlue = inner.toLowerCase().includes('azul') || inner.toLowerCase().includes('azúl');
      return (
        <strong 
          key={index} 
          className={`font-bold ${
            isBlue 
              ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]' 
              : 'text-[#b088f9] drop-shadow-[0_0_8px_rgba(176,136,249,0.35)]'
          }`}
        >
          {inner}
        </strong>
      );
    }
    return part;
  });
};

// Typewriter component with Markdown formatting (runs typewriter ONCE per letter)
const TypewriterText = ({ text, alreadyTyped, onFinish }) => {
  const [displayedLength, setDisplayedLength] = useState(alreadyTyped ? text.length : 0);
  const [isSkipped, setIsSkipped] = useState(alreadyTyped);

  useEffect(() => {
    if (alreadyTyped) {
      setDisplayedLength(text.length);
      setIsSkipped(true);
      return;
    }

    setDisplayedLength(0);
    setIsSkipped(false);

    const speed = 12;
    const step = 2;

    const timer = setInterval(() => {
      setDisplayedLength((prev) => {
        if (prev + step >= text.length) {
          clearInterval(timer);
          if (onFinish) onFinish();
          return text.length;
        }
        return prev + step;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [text, alreadyTyped, onFinish]);

  const handleSkip = () => {
    if (!isSkipped) {
      setIsSkipped(true);
      setDisplayedLength(text.length);
      if (onFinish) onFinish();
    }
  };

  const currentText = isSkipped ? text : text.slice(0, displayedLength);
  const isTyping = !isSkipped && displayedLength < text.length;

  return (
    <div onClick={handleSkip} className="cursor-pointer group relative select-text">
      <div className="whitespace-pre-line text-white/90 font-sans leading-relaxed sm:leading-loose tracking-wide font-light text-base sm:text-lg">
        {renderFormattedText(currentText)}
        {isTyping && (
          <span className="inline-block w-2 h-5 ml-1 bg-[#b088f9] animate-pulse rounded-sm align-middle" />
        )}
      </div>
      {isTyping && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#c8a2c8] bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full group-hover:bg-white/10 transition-colors">
            Haz clic para mostrar todo el texto
          </span>
        </div>
      )}
    </div>
  );
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (direction) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  })
};

const Buzon = ({ onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [likes, setLikes] = useState(() => {
    try {
      const saved = localStorage.getItem('lucesita_letter_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('lucesita_letter_likes', JSON.stringify(likes));
    } catch {
      // ignore storage errors
    }
  }, [likes]);
  const [readStatus, setReadStatus] = useState({});
  const [hasTypedMap, setHasTypedMap] = useState({});
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const exportCardRef = useRef(null);
  const selectedLetter = selectedIndex !== null ? letters[selectedIndex] : null;

  const markAsTyped = useCallback((letterId) => {
    setHasTypedMap(prev => ({ ...prev, [letterId]: true }));
  }, []);

  const handleOpenLetter = (index) => {
    setDirection(1);
    setSelectedIndex(index);
    setShowPlaylist(false);
    setReadStatus(prev => ({ ...prev, [index]: true }));
  };

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(1);
      const nextIndex = (selectedIndex + 1) % letters.length;
      setSelectedIndex(nextIndex);
      setReadStatus(prev => ({ ...prev, [nextIndex]: true }));
    }
  }, [selectedIndex]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(-1);
      const prevIndex = (selectedIndex - 1 + letters.length) % letters.length;
      setSelectedIndex(prevIndex);
      setReadStatus(prev => ({ ...prev, [prevIndex]: true }));
    }
  }, [selectedIndex]);

  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLikes(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('lucesita_letter_likes', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const handleDownloadImage = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!exportCardRef.current || !selectedLetter) return;

    setIsDownloading(true);
    try {
      await new Promise(r => setTimeout(r, 100));

      const canvas = await html2canvas(exportCardRef.current, {
        scale: 3,
        backgroundColor: '#0c0b10',
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: 440,
        onclone: (clonedDoc) => {
          const styleElements = clonedDoc.querySelectorAll('style');
          styleElements.forEach((el) => {
            if (el.innerHTML) {
              el.innerHTML = el.innerHTML
                .replace(/oklab\([^)]+\)/g, 'rgba(12, 11, 16, 0.95)')
                .replace(/oklch\([^)]+\)/g, 'rgba(12, 11, 16, 0.95)');
            }
          });
        }
      });

      const imageData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const cleanTitle = selectedLetter.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      link.download = `carta_${selectedLetter.number}_${cleanTitle}.png`;
      link.href = imageData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error al descargar carta:", err);
      alert("No se pudo generar la imagen.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#050505] text-white flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden pt-20 pb-36 px-4 md:px-12 selection:bg-purple-500/30 selection:text-white">
      
      {/* Off-screen Export Element - Mobile Phone 9:16 Story Format */}
      <div style={{ position: 'fixed', top: '0', left: '-9999px', pointerEvents: 'none', zIndex: -100 }}>
        {selectedLetter && (
          <div 
            ref={exportCardRef} 
            style={{
              width: '420px',
              minHeight: '750px',
              backgroundColor: '#0c0b10',
              color: '#ffffff',
              padding: '36px 30px 40px 30px',
              borderRadius: '44px',
              border: '2px solid rgba(255, 255, 255, 0.18)',
              fontFamily: 'Outfit, sans-serif',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Phone Bar Indicator */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
              <div style={{ width: '80px', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '10px', margin: '0 auto 20px auto' }} />

              {/* Letter Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '2px', color: '#c8a2c8', fontWeight: 600 }}>
                    {selectedLetter.date} &bull; {selectedLetter.tag}
                  </span>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: '4px 0 0 0', lineHeight: 1.2 }}>
                    {selectedLetter.title}
                  </h2>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: 'rgba(176, 136, 249, 0.2)', border: '1px solid rgba(176, 136, 249, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b088f9', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '13px', flexShrink: 0 }}>
                  {selectedLetter.number}
                </div>
              </div>
            </div>

            {/* Main Letter Content */}
            <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justify: 'center', margin: '16px 0' }}>
              <div style={{ whiteSpace: 'pre-line', color: 'rgba(255, 255, 255, 0.92)', fontSize: '16px', lineHeight: '1.8', fontWeight: 300 }}>
                {renderFormattedText(selectedLetter.content)}
              </div>
            </div>

            {/* Bottom Phone Signature & Footer */}
            <div style={{ position: 'relative', zIndex: 10, paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.4)' }}>Cartas para mi calabaza</span>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '15px', color: '#c8a2c8', margin: 0 }}>con cariño,</p>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.85)', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>para mi calabacita</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-40 p-3.5 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/15 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl group flex items-center gap-2"
        aria-label="Volver al inicio"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="text-xs font-semibold uppercase tracking-wider pr-1 hidden sm:inline">Inicio</span>
      </motion.button>

      {/* Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#b088f9]/12 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#88c8f9]/12 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
      </div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10 max-w-3xl mb-6 flex flex-col items-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[#c8a2c8] text-xs font-semibold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-[#b088f9]" />
            <span>Buzón de Cartas</span>
          </div>

          {/* Badge: 2 cartas nuevas */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 border border-purple-400/40 text-[#e6cfe6] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(176,136,249,0.3)] animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#b088f9]" />
            <span>2 cartas nuevas</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tighter text-white mb-2 leading-tight">
          Cartas para mi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b088f9] via-[#e6cfe6] to-[#88c8f9]">calabaza</span>
        </h1>
        <p className="text-white/60 font-sans text-base md:text-lg max-w-xl font-light leading-relaxed">
          Algunas de las cartas que te escribí, espero que te gusten, disculpa la tardanza
        </p>
      </motion.div>

      {/* Clickable Hero Banner -> Opens Latest / First Letter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.015, y: -4 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => handleOpenLetter(17)}
        className="relative z-10 w-full max-w-4xl mb-12 rounded-[2.5rem] bg-white/[0.07] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/[0.12] hover:border-white/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow,transform] duration-500 overflow-hidden group cursor-pointer"
      >
        <div 
          className="absolute -inset-4 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(176, 136, 249, 0.18), transparent 70%)' }}
        />

        <div className="flex items-center gap-5 sm:gap-6 z-10 w-full sm:w-auto">
          <div className="text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-[#c8a2c8] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#b088f9]" />
              2 cartas nuevas agregadas
            </div>
            <h2 className="text-white font-sans text-xl sm:text-2xl font-bold tracking-wide mb-1 flex items-center gap-2 group-hover:text-[#b088f9] transition-colors">
              Buzón de Mensajes
              <Sparkles className="w-4 h-4 text-[#b088f9]" />
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed max-w-md">
              {Object.keys(readStatus).length === letters.length 
                ? 'Has leído todas tus cartas. Toca para volver a leerlas.'
                : `Tienes ${letters.length - Object.keys(readStatus).length} cartas sin abrir esperándote. Haz clic para abrir.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 z-10 w-full sm:w-auto justify-end">
          <div className="w-full sm:w-auto text-center bg-white/[0.08] group-hover:bg-[#b088f9] group-hover:text-black backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-white/90 font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
            <MailOpen className="w-4 h-4 text-[#88c8f9] group-hover:text-black" />
            <span>Abrir Cartas ({letters.length})</span>
          </div>
        </div>
      </motion.div>

      {/* Letters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 z-10 w-full max-w-6xl mb-16">
        {letters.map((letter, idx) => {
          const isRead = !!readStatus[idx];
          const isLiked = !!likes[letter.id];

          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenLetter(idx)}
              className="group relative cursor-pointer rounded-[2.5rem] bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12] hover:border-white/30 p-6 md:p-7 flex flex-col justify-between min-h-[320px] transition-[border-color,box-shadow,transform] duration-500 shadow-[0_8px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div 
                className="absolute -inset-4 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none z-0"
                style={{ background: `radial-gradient(ellipse at center, ${letter.accentGlow}, transparent 70%)` }}
              />

              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${letter.stampColor} flex items-center justify-center text-white font-bold text-xs shadow-md border border-white/20`}>
                    {letter.number}
                  </div>
                  <div>
                    <span className="text-white/50 font-mono text-xs uppercase tracking-wider block">
                      {letter.date}
                    </span>
                    <span className="text-[#c8a2c8] font-sans text-xs font-semibold">
                      {letter.tag}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {letter.isNew && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-white/20 shadow-md animate-pulse flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Nueva
                    </span>
                  )}
                  {isRead && (
                    <span className="bg-white/[0.08] backdrop-blur-md text-[#88c8f9] text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Leída
                    </span>
                  )}
                  <button 
                    type="button"
                    onClick={(e) => toggleLike(letter.id, e)}
                    className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-purple-300 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#b088f9] text-[#b088f9]' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="relative z-10 my-auto py-2">
                <h3 className="text-white font-sans text-2xl font-bold mb-3 group-hover:text-[#b088f9] transition-colors leading-snug tracking-wide">
                  {letter.title}
                </h3>
                <p className="text-white/70 font-sans text-sm line-clamp-3 leading-relaxed font-light">
                  {letter.snippet}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between mt-4">
                <span className="text-xs text-white/50 font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#b088f9]" />
                  Abrir Carta
                </span>

                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all duration-300">
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Streamlined Letter Reading Modal with Playlist Mode */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            data-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/92 backdrop-blur-2xl"
              onClick={() => setSelectedIndex(null)}
            />

            {/* Ambient Modal Glow */}
            <div 
              className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-0"
              style={{ background: selectedLetter.accentGlow }}
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative w-full max-w-2xl bg-[#0e0d14] text-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 overflow-hidden border border-white/15 flex flex-col max-h-[85vh] sm:max-h-[82vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Control Bar (Clean & Clutter-free) */}
              <div className="px-5 py-4 sm:px-7 sm:py-5 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#0e0d14]/90 backdrop-blur-md z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#b088f9] font-bold text-xs font-mono">
                    {selectedLetter.number}
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#c8a2c8] font-semibold font-mono block">
                      {selectedLetter.date}
                    </span>
                    <span className="text-[11px] sm:text-xs font-sans text-white/50">
                      {selectedLetter.tag}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Playlist Selector Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPlaylist(prev => !prev)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-xs font-semibold font-sans flex items-center gap-1.5 transition-all ${
                      showPlaylist 
                        ? 'bg-[#b088f9] text-black border-[#b088f9] shadow-[0_0_15px_rgba(176,136,249,0.4)]' 
                        : 'bg-white/[0.08] hover:bg-white/20 border-white/15 text-white'
                    }`}
                    title="Ver playlist de cartas"
                  >
                    <ListMusic className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Lista</span>
                  </button>

                  {/* Download Image Button */}
                  <button 
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isDownloading}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-white/90 font-sans text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                    title="Descargar carta como imagen PNG"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#b088f9]" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-[#88c8f9]" />
                    )}
                    <span className="hidden sm:inline">
                      {isDownloading ? 'Guardando...' : 'Descargar'}
                    </span>
                  </button>

                  {/* Favorite Button */}
                  <button 
                    type="button"
                    onClick={(e) => toggleLike(selectedLetter.id, e)}
                    className={`p-2 rounded-full border transition-all ${
                      likes[selectedLetter.id] 
                        ? 'bg-purple-500/20 border-purple-400/40 text-[#b088f9]' 
                        : 'bg-white/[0.06] border-white/15 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                    title="Guardar en favoritos"
                  >
                    <Heart className={`w-4 h-4 ${likes[selectedLetter.id] ? 'fill-[#b088f9]' : ''}`} />
                  </button>

                  {/* Close Button */}
                  <button 
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    className="p-2 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white transition-colors"
                    aria-label="Cerrar carta"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Playlist Drawer (Select any letter directly like a music playlist) */}
              <AnimatePresence>
                {showPlaylist && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="bg-[#14131e] border-b border-white/10 p-4 sm:p-5 max-h-[300px] overflow-y-auto shrink-0 z-30 shadow-2xl custom-scrollbar"
                  >
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#c8a2c8] flex items-center gap-2">
                        <ListMusic className="w-4 h-4 text-[#b088f9]" />
                        Seleccionar Carta ({letters.length})
                      </span>
                      <button
                        onClick={() => setShowPlaylist(false)}
                        className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Cerrar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {letters.map((letter, idx) => {
                        const isActive = selectedIndex === idx;
                        const isNew = letter.isNew;
                        return (
                          <button
                            key={letter.id}
                            type="button"
                            onClick={() => {
                              setDirection(idx > selectedIndex ? 1 : -1);
                              setSelectedIndex(idx);
                              setReadStatus(prev => ({ ...prev, [idx]: true }));
                              setShowPlaylist(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between border ${
                              isActive 
                                ? 'bg-[#b088f9]/20 border-[#b088f9]/50 text-white shadow-[0_0_15px_rgba(176,136,249,0.2)]' 
                                : 'bg-white/[0.04] border-white/5 text-white/70 hover:bg-white/[0.09] hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-6 h-6 rounded-md text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${
                                isActive ? 'bg-[#b088f9] text-black' : 'bg-white/10 text-white/60'
                              }`}>
                                {letter.number}
                              </span>
                              <div className="truncate">
                                <div className="flex items-center gap-1.5">
                                  <p className={`font-sans text-xs font-semibold truncate ${isActive ? 'text-[#b088f9]' : 'text-white'}`}>
                                    {letter.title}
                                  </p>
                                  {isNew && (
                                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shrink-0">
                                      NUEVA
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] font-mono text-white/40 truncate">
                                  {letter.date}
                                </p>
                              </div>
                            </div>
                            {isActive && (
                              <Sparkles className="w-3.5 h-3.5 text-[#b088f9] shrink-0 ml-1 animate-pulse" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Modal Body - Pure Letter Reading Area */}
              <div className="p-6 sm:p-9 overflow-y-auto flex-1 font-sans text-white/90 bg-[#0e0d14] min-h-0">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={selectedLetter.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* Title */}
                    <div>
                      <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight">
                        {selectedLetter.title}
                      </h2>
                    </div>

                    {/* Letter Content with Typewriter Effect (Runs ONCE per letter) */}
                    <TypewriterText 
                      text={selectedLetter.content} 
                      alreadyTyped={!!hasTypedMap[selectedLetter.id]}
                      onFinish={() => markAsTyped(selectedLetter.id)}
                    />

                    {/* Clean Signature Footer (Removed "Carta guardada") */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-end">
                      <div className="text-right">
                        <p className="font-serif italic text-sm sm:text-base text-[#c8a2c8] mb-0.5">con cariño,</p>
                        <p className="font-sans text-xs font-bold text-white/80 uppercase tracking-widest">para mi calabacita</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Modal Footer Controls with Responsive Mobile Layout */}
              <div className="px-3.5 py-3 sm:px-7 sm:py-4 bg-[#14131d] border-t border-white/10 flex items-center justify-between gap-2 shrink-0 z-20 shadow-lg">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-2 transition-all shrink-0 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  <span>Ant<span className="hidden sm:inline">erior</span></span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPlaylist(prev => !prev)}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 text-white/90 font-mono text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 active:scale-95"
                >
                  <ListMusic className="w-3.5 h-3.5 text-[#b088f9] shrink-0" />
                  <span>{selectedIndex + 1} / {letters.length}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#b088f9] hover:bg-[#c8a2c8] text-black font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-2 transition-all shadow-[0_0_20px_rgba(176,136,249,0.3)] shrink-0 active:scale-95"
                >
                  <span>Sig<span className="hidden sm:inline">uiente</span></span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Buzon;
