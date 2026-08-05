import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MessageCircle, Flame, Moon, Book, Mic, Heart, Zap, Sparkles } from 'lucide-react';

const statsData = [
  // 1. Resumen General
  { 
    id: 'total', type: 'simple', 
    title: 'El Contador Total', value: '142,045', subtitle: 'Mensajes enviados en la historia de nuestro chat', 
    icon: <MessageCircle className="w-8 h-8 text-blue-400" />, gradient: 'from-blue-500/20 to-cyan-500/20', span: 1 
  },
  { 
    id: 'bars', type: 'bar-chart', 
    title: '¿Quién tecleó más?', name1: 'Deth', val1: 75000, name2: 'Hania', val2: 67045,
    gradient: 'from-indigo-500/20 to-purple-500/20', span: 1 
  },
  { 
    id: 'intense', type: 'simple', 
    title: 'El Día Más Intenso', value: '14 de Febrero', subtitle: 'No nos callamos en todo el día con 3,420 mensajes', 
    icon: <Flame className="w-8 h-8 text-orange-400" />, gradient: 'from-orange-500/20 to-red-500/20', span: 2 
  },
  
  // 2. Hábitos
  { 
    id: 'flash', type: 'vs', 
    title: 'El Flash vs El Fantasma', 
    leftName: 'El Flash', leftVal: 'Deth', leftSub: 'Responde en 5s',
    rightName: 'El Fantasma', rightVal: 'Hania', rightSub: 'Deja en visto 3h',
    icon: <Zap className="w-8 h-8 text-yellow-400" />, gradient: 'from-yellow-500/20 to-amber-500/20', span: 2 
  },
  { 
    id: 'sleep', type: 'simple', 
    title: '¿Quién caía primero?', value: 'Hania', subtitle: 'Siempre mandaba el último mensaje antes de dejarnos en visto por quedarse dormida 😴', 
    icon: <Moon className="w-8 h-8 text-slate-400" />, gradient: 'from-slate-500/20 to-gray-500/20', span: 1 
  },
  { 
    id: 'bible', type: 'simple', 
    title: 'Las Biblias', value: 'Deth', subtitle: 'Promedio de 450 caracteres por mensaje (Literales testamentos)', 
    icon: <Book className="w-8 h-8 text-emerald-400" />, gradient: 'from-emerald-500/20 to-teal-500/20', span: 1 
  },
  { 
    id: 'night', type: 'simple', 
    title: 'Los Noctámbulos', value: 'Deth', subtitle: 'Rey indiscutible de mandar mensajes de madrugada a las 3:00 AM', 
    icon: <Moon className="w-8 h-8 text-indigo-400" />, gradient: 'from-indigo-500/20 to-blue-500/20', span: 1 
  },
  { 
    id: 'audio', type: 'bar-chart', 
    title: 'El Podio de los Audios', name1: 'Hania', val1: 420, name2: 'Deth', val2: 15, subtitle: '🎙️ Alguien prefiere mil veces hablar que escribir',
    gradient: 'from-teal-500/20 to-emerald-500/20', span: 1 
  },
  
  // 3. Lenguaje
  { 
    id: 'emojis', type: 'list', 
    title: 'Top 5 Emojis', items: ['✨', '🥺', '😂', '💀', '🤍'], 
    gradient: 'from-pink-500/20 to-rose-500/20', span: 1 
  },
  { 
    id: 'phrases', type: 'list-text', 
    title: 'Frases Icónicas', items: ['"jajaja literal"', '"tengo sueño"', '"obviooo"', '"te pasas"', '"ay no"'], 
    gradient: 'from-purple-500/20 to-fuchsia-500/20', span: 1 
  },
  { 
    id: 'words', type: 'cloud', 
    title: 'Nube de Palabras', words: [
      { text: 'Deth', size: 'text-5xl md:text-6xl text-white' },
      { text: 'Hania', size: 'text-5xl md:text-6xl text-pink-300' },
      { text: 'Amor', size: 'text-3xl md:text-4xl text-red-400' },
      { text: 'Siempre', size: 'text-2xl md:text-3xl text-blue-300' },
      { text: 'Gatito', size: 'text-xl md:text-2xl text-amber-300' },
      { text: 'Comida', size: 'text-xl md:text-2xl text-emerald-300' },
      { text: 'Literal', size: 'text-lg md:text-xl text-purple-300' }
    ], 
    gradient: 'from-rose-500/20 to-orange-500/20', span: 2 
  },
  
  // 4. Emocional
  { 
    id: 'love', type: 'bar-chart', 
    title: 'Contador de "Te quiero"', name1: 'Deth', val1: 4500, name2: 'Hania', val2: 4499, subtitle: 'Casi un empate técnico en cursilería 🥰',
    gradient: 'from-red-500/20 to-pink-500/20', span: 2 
  },
  { 
    id: 'first', type: 'message', 
    title: 'El Origen (Cómo empezó)', date: '01 de Abril de 2026, 15:15 PM', 
    sender: 'Deth', text: 'Holaa, por fin me animé a hablarte 😅', 
    replySender: 'Hania', replyText: 'Jajaja hola! ya te habías tardado ✨',
    icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
    gradient: 'from-amber-500/20 to-yellow-500/20', span: 2 
  }
];

const StatCard = ({ stat }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`relative w-full rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-6 md:p-8 ${stat.span === 2 ? 'md:col-span-2' : 'md:col-span-1'} ${stat.type === 'simple' ? 'items-center text-center justify-center min-h-[300px]' : 'min-h-[300px]'}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-40`}></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
      
      {stat.type === 'simple' && (
        <>
          <div className="relative z-10 bg-black/20 p-4 rounded-full backdrop-blur-md border border-white/10 mb-6 shadow-xl">
            {stat.icon}
          </div>
          <h3 className="relative z-10 text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
            {stat.title}
          </h3>
          <h2 className="relative z-10 text-white font-sans font-black text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-lg">
            {stat.value}
          </h2>
          <p className="relative z-10 text-white/80 font-serif italic text-sm md:text-lg">
            {stat.subtitle}
          </p>
        </>
      )}

      {stat.type === 'bar-chart' && (
        <div className="relative z-10 flex flex-col h-full w-full justify-center">
          <h3 className="text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-6 text-center">
            {stat.title}
          </h3>
          
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            <div className="w-full">
              <div className="flex justify-between text-white font-sans font-bold mb-2">
                <span>{stat.name1}</span>
                <span>{stat.val1.toLocaleString()}</span>
              </div>
              <div className="w-full h-6 bg-black/40 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stat.val1 / (stat.val1 + stat.val2)) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                ></motion.div>
              </div>
            </div>
            
            <div className="w-full">
              <div className="flex justify-between text-white font-sans font-bold mb-2">
                <span>{stat.name2}</span>
                <span>{stat.val2.toLocaleString()}</span>
              </div>
              <div className="w-full h-6 bg-black/40 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stat.val2 / (stat.val1 + stat.val2)) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
          {stat.subtitle && (
            <p className="text-white/80 font-serif italic text-sm md:text-base mt-8 text-center">
              {stat.subtitle}
            </p>
          )}
        </div>
      )}

      {stat.type === 'vs' && (
        <div className="relative z-10 flex flex-col h-full w-full justify-center items-center text-center">
          <div className="bg-black/20 p-4 rounded-full backdrop-blur-md border border-white/10 mb-6 shadow-xl">
            {stat.icon}
          </div>
          <h3 className="text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-6">
            {stat.title}
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 w-full">
            <div className="flex flex-col items-center">
              <span className="text-white/50 text-xs uppercase tracking-widest mb-1">{stat.leftName}</span>
              <span className="text-white font-black text-3xl md:text-4xl">{stat.leftVal}</span>
              <span className="text-white/80 text-sm mt-2">{stat.leftSub}</span>
            </div>
            <div className="text-white/30 font-black text-4xl italic px-4 py-2 bg-black/20 rounded-full">VS</div>
            <div className="flex flex-col items-center">
              <span className="text-white/50 text-xs uppercase tracking-widest mb-1">{stat.rightName}</span>
              <span className="text-white font-black text-3xl md:text-4xl">{stat.rightVal}</span>
              <span className="text-white/80 text-sm mt-2">{stat.rightSub}</span>
            </div>
          </div>
        </div>
      )}

      {stat.type === 'list' && (
        <div className="relative z-10 flex flex-col h-full w-full justify-center items-center text-center">
          <h3 className="text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-8">
            {stat.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {stat.items.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-black/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl md:text-5xl border border-white/10 shadow-lg"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {stat.type === 'list-text' && (
        <div className="relative z-10 flex flex-col h-full w-full justify-center items-center text-center">
          <h3 className="text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-6">
            {stat.title}
          </h3>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {stat.items.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="w-full bg-black/20 backdrop-blur-md rounded-xl py-3 px-6 text-white font-serif italic text-lg md:text-xl border border-white/5 shadow-md text-left"
              >
                <span className="text-white/30 font-sans font-bold mr-4 not-italic">#{idx + 1}</span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {stat.type === 'cloud' && (
        <div className="relative z-10 flex flex-col h-full w-full justify-center items-center text-center">
          <h3 className="text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-8">
            {stat.title}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-2xl px-4 py-8">
            {stat.words.map((word, idx) => (
              <motion.span 
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                className={`font-black font-sans drop-shadow-xl ${word.size}`}
              >
                {word.text}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {stat.type === 'message' && (
        <div className="relative z-10 flex flex-col h-full w-full justify-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-black/20 p-3 rounded-full backdrop-blur-md border border-white/10 shadow-xl">
              {stat.icon}
            </div>
            <h3 className="text-white/80 font-sans tracking-[0.2em] uppercase text-sm md:text-base font-bold">
              {stat.title}
            </h3>
          </div>
          
          <div className="flex flex-col gap-4 w-full max-w-xl mx-auto font-sans">
            <p className="text-center text-white/40 text-xs mb-2 tracking-widest">{stat.date}</p>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="self-end max-w-[80%] bg-blue-500/80 backdrop-blur-md text-white rounded-2xl rounded-tr-sm px-6 py-4 shadow-lg border border-white/10"
            >
              <p className="text-xs text-blue-200 mb-1 font-bold">{stat.sender}</p>
              <p className="text-base md:text-lg">{stat.text}</p>
            </motion.div>
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="self-start max-w-[80%] bg-zinc-800/80 backdrop-blur-md text-white rounded-2xl rounded-tl-sm px-6 py-4 shadow-lg border border-white/10"
            >
              <p className="text-xs text-pink-300 mb-1 font-bold">{stat.replySender}</p>
              <p className="text-base md:text-lg">{stat.replyText}</p>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Wrapped = ({ onBack }) => {
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll({
    container: containerRef
  });
  
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section 
      ref={containerRef} 
      className="h-[100dvh] overflow-y-auto overscroll-none bg-[#050505] text-white overflow-x-hidden relative"
    >
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-xl transition-all shadow-lg"
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-pink-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[120px]"></div>
      </div>

      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="fixed top-32 left-0 w-full text-center z-10 pointer-events-none px-4"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 mb-4 drop-shadow-2xl py-2">
          Wrapped 2026
        </h1>
        <p className="text-[#a1a5a3] font-sans tracking-[0.3em] uppercase text-xs md:text-sm">
          Un resumen de nuestra historia
        </p>
      </motion.div>

      <div className="h-[40vh] md:h-[50vh]"></div>

      <div className="relative z-20 pb-40 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full mt-24 text-center p-12 md:p-20 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-50"></div>
          <h2 className="relative z-10 text-4xl md:text-6xl font-sans font-black text-white mb-6 drop-shadow-lg">
            Fin del Resumen
          </h2>
          <p className="relative z-10 text-white/80 font-serif italic text-xl md:text-3xl max-w-2xl mx-auto">
            Seguiremos llenando este wrapped de más mensajes, más llamadas y más recuerdos para la próxima.
          </p>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Wrapped;
