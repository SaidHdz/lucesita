import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate, useInView } from 'framer-motion';
import { ArrowLeft, MessageCircle, Flame, Moon, Book, Heart, Zap, Sparkles, Send, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import wrappedData from '../assets/mensajes/wrapped_data.json';

const AnimatedCounter = ({ value, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest).toLocaleString());
  
  useEffect(() => {
    if (isInView) {
      const parsedValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
      if (!isNaN(parsedValue)) {
        animate(count, parsedValue, { duration: 2, ease: "easeOut" });
      }
    }
  }, [isInView, value, count]);

  const isNumeric = !isNaN(parseFloat(String(value).replace(/,/g, '')));

  return (
    <motion.span ref={ref} className={className}>
      {isNumeric ? rounded : value}
    </motion.span>
  );
};

const StatCard = ({ stat, scrollContainer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 60 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ root: scrollContainer, once: false, margin: "-50px" }}
      transition={{ duration: 0.7, delay: stat.index % 2 === 0 ? 0.1 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full rounded-[2.5rem] bg-white/[0.07] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] flex flex-col p-6 md:p-8 border border-white/[0.12] hover:border-white/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-500 overflow-hidden group ${stat.span === 2 ? 'md:col-span-2' : 'md:col-span-1'} min-h-[360px]`}
    >
      {/* Subtle glow behind the card content */}
      <div 
        className="absolute -inset-4 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse at center, ${stat.accentColor || 'rgba(176, 136, 249, 0.15)'}, transparent 70%)` }}
      />
      <div 
        className="absolute -inset-2 rounded-[3rem] opacity-40 blur-xl pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse at center, ${stat.accentColor || 'rgba(176, 136, 249, 0.15)'}, transparent 70%)` }}
      />
      
      {stat.type === 'simple' && (
        <div className="flex flex-col h-full z-10 w-full text-left justify-between">
          <div className="flex items-start justify-between">
             <div className="bg-white/[0.08] backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/10 shadow-xl mb-4">
                {stat.icon}
             </div>
          </div>
          <div className="mt-auto">
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide mb-2">
              {stat.title}
            </h3>
            <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed mb-6 max-w-sm">
              {stat.subtitle}
            </p>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-sans font-black text-5xl md:text-7xl tracking-tighter">
              <AnimatedCounter value={stat.value} />
            </h2>
          </div>
        </div>
      )}

      {stat.type === 'bar-chart' && (
        <div className="flex flex-col h-full z-10 w-full text-left justify-between">
          <div className="flex items-start justify-between mb-8">
             <div className="bg-white/[0.08] backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/10 shadow-xl">
                {stat.icon || <Heart className="w-8 h-8 text-pink-400" />}
             </div>
          </div>
          <div className="mb-8">
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide mb-2">
              {stat.title}
            </h3>
            {stat.subtitle && (
              <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed">
                {stat.subtitle}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-6 w-full mt-auto">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  {stat.name1}
                </span>
                <span className="text-white font-bold font-sans">
                  <AnimatedCounter value={stat.val1} />
                </span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stat.val1 / Math.max(1, (stat.val1 + stat.val2))) * 100}%` }}
                  viewport={{ root: scrollContainer }}
                  transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-white/80 rounded-full"
                ></motion.div>
              </div>
            </div>
            
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  {stat.name2}
                </span>
                <span className="text-white font-bold font-sans">
                  <AnimatedCounter value={stat.val2} />
                </span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stat.val2 / Math.max(1, (stat.val1 + stat.val2))) * 100}%` }}
                  viewport={{ root: scrollContainer }}
                  transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-white/40 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      )}

      {stat.type === 'vs' && (
        <div className="flex flex-col h-full z-10 w-full text-left justify-between">
          <div className="flex items-start justify-between mb-4">
             <div className="bg-white/[0.08] backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/10 shadow-xl">
                {stat.icon}
             </div>
             <div className="bg-white/[0.08] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
               <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Versus</span>
             </div>
          </div>
          <div>
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide mb-8">
              {stat.title}
            </h3>
          </div>
          
          <div className="flex items-end justify-between w-full mt-auto">
            <div className="flex flex-col">
              <span className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full font-medium w-fit mb-3">
                {stat.leftName}
              </span>
              <span className="text-white font-black text-4xl md:text-5xl tracking-tighter mb-1">{stat.leftVal}</span>
              <span className="text-white/50 font-sans text-xs">{stat.leftSub}</span>
            </div>
            
            <div className="flex flex-col items-end text-right">
              <span className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full font-medium w-fit mb-3">
                {stat.rightName}
              </span>
              <span className="text-white font-black text-4xl md:text-5xl tracking-tighter mb-1">{stat.rightVal}</span>
              <span className="text-white/50 font-sans text-xs">{stat.rightSub}</span>
            </div>
          </div>
        </div>
      )}

      {stat.type === 'split-lists' && (
        <div className="flex flex-col h-full z-10 w-full text-left justify-between">
          <div className="mb-8">
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide mb-2">
              {stat.title}
            </h3>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 w-full mt-auto">
            <div className="flex flex-col flex-1">
              <span className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full font-medium w-fit mb-4">
                {stat.leftName}
              </span>
              <div className="flex flex-col gap-3">
                {stat.leftItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ root: scrollContainer }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-2xl font-bold bg-white/[0.03] border border-white/5 px-4 py-2 rounded-xl"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <span className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full font-medium w-fit mb-4">
                {stat.rightName}
              </span>
              <div className="flex flex-col gap-3">
                {stat.rightItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ root: scrollContainer }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-2xl font-bold bg-white/[0.03] border border-white/5 px-4 py-2 rounded-xl text-right md:text-left"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {stat.type === 'message' && (
        <div className="flex flex-col h-full z-10 w-full text-left justify-between">
          <div className="flex items-start justify-between mb-8">
             <div className="bg-white/[0.08] backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/10 shadow-xl">
                {stat.icon}
             </div>
          </div>
          <div>
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide mb-2">
              {stat.title}
            </h3>
            <p className="text-white/50 text-xs tracking-widest uppercase mb-8">{stat.date}</p>
          </div>
          
          <div className="w-full mt-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ root: scrollContainer }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.05] backdrop-blur-md text-white rounded-2xl rounded-tl-sm px-6 py-5 border border-white/10"
            >
              <span className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white/80 text-xs px-3 py-1 rounded-full font-medium mb-3 inline-block">
                {stat.sender}
              </span>
              <p className="text-base md:text-lg leading-relaxed font-serif italic text-white/90">
                "{stat.text}"
              </p>
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

  const users = Object.keys(wrappedData.metrics.byUser);
  const user1 = users[0];
  const user2 = users[1];

  const statsData = useMemo(() => {
    const val1 = wrappedData.metrics.byUser[user1];
    const val2 = wrappedData.metrics.byUser[user2];

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Sept", "Oct", "Nov", "Dic"];
    const maxMonthVal = Math.max(...wrappedData.habits.months);
    const topMonthIndex = wrappedData.habits.months.indexOf(maxMonthVal);
    
    const maxLaughVal = Math.max(...Object.values(wrappedData.language.laughTypes));
    const topLaugh = Object.keys(wrappedData.language.laughTypes).find(k => wrappedData.language.laughTypes[k] === maxLaughVal);

    const getNocturnalCount = (arr) => {
       let sum = 0;
       for (let i = 0; i <= 5; i++) sum += arr[i];
       for (let i = 22; i <= 23; i++) sum += arr[i];
       return sum;
    };
    const noc1 = getNocturnalCount(wrappedData.habits.hourlyDistribution[user1]);
    const noc2 = getNocturnalCount(wrappedData.habits.hourlyDistribution[user2]);
    const mostNocturnal = noc1 > noc2 ? user1 : user2;

    const fastUser = wrappedData.habits.avgResponseTimeMin[user1] < wrappedData.habits.avgResponseTimeMin[user2] ? user1 : user2;
    const fastVal = Math.round(wrappedData.habits.avgResponseTimeMin[fastUser]);
    const slowUser = fastUser === user1 ? user2 : user1;
    const slowVal = Math.round(wrappedData.habits.avgResponseTimeMin[slowUser]);

    return [
      { 
        id: 'total', index: 0, type: 'simple', 
        title: 'Nuestro Contador Total', value: wrappedData.metrics.total, subtitle: 'Todos los mensajes que nos enviamos', 
        icon: <MessageCircle className="w-8 h-8 text-blue-400" />, accentColor: 'rgba(59, 130, 246, 0.15)', span: 1 
      },
      { 
        id: 'bars', index: 1, type: 'bar-chart', 
        title: '¿Quién de los dos tecleó más?', name1: user1, val1: val1, name2: user2, val2: val2,
        icon: <Send className="w-8 h-8 text-purple-400" />,
        accentColor: 'rgba(168, 85, 247, 0.15)', span: 1 
      },
      { 
        id: 'days', index: 2, type: 'simple', 
        title: 'Días que no paramos de hablar', value: wrappedData.metrics.activeDays, subtitle: 'Días diferentes en los que nos mensajeamos', 
        icon: <Flame className="w-8 h-8 text-orange-400" />, accentColor: 'rgba(249, 115, 22, 0.15)', span: 2 
      },
      { 
        id: 'flash', index: 3, type: 'vs', 
        title: '¿Quién contesta más rápido?', 
        leftName: 'El Flash', leftVal: fastUser, leftSub: `${fastVal} mins prom.`,
        rightName: 'El Fantasma', rightVal: slowUser, rightSub: `${slowVal} mins prom.`,
        icon: <Zap className="w-8 h-8 text-yellow-400" />, accentColor: 'rgba(234, 179, 8, 0.15)', span: 2 
      },
      { 
        id: 'month', index: 4, type: 'simple', 
        title: 'Nuestro Mes Más Intenso', value: monthNames[topMonthIndex], subtitle: 'El mes donde nuestro chat no descansó ni un segundo', 
        icon: <Flame className="w-8 h-8 text-red-400" />, accentColor: 'rgba(239, 68, 68, 0.15)', span: 1 
      },
      { 
        id: 'night', index: 5, type: 'simple', 
        title: '¿Quién es el vampiro del chat?', value: mostNocturnal, subtitle: 'Quien mandó más mensajes de madrugada', 
        icon: <Moon className="w-8 h-8 text-indigo-400" />, accentColor: 'rgba(99, 102, 241, 0.15)', span: 1 
      },
      { 
        id: 'emojis', index: 6, type: 'split-lists', 
        title: 'Nuestros Emojis Favoritos', 
        leftName: "Los míos", leftItems: wrappedData.language.topEmojis.byUser[user1].slice(0, 3),
        rightName: "Los tuyos", rightItems: wrappedData.language.topEmojis.byUser[user2].slice(0, 3),
        accentColor: 'rgba(236, 72, 153, 0.15)', span: 1 
      },
      { 
        id: 'words', index: 7, type: 'split-lists', 
        title: 'Las palabras que más usamos', 
        leftName: "Mis favoritas", leftItems: wrappedData.language.topWords.byUser[user1],
        rightName: "Tus favoritas", rightItems: wrappedData.language.topWords.byUser[user2],
        accentColor: 'rgba(244, 63, 94, 0.15)', span: 1 
      },
      { 
        id: 'laugh', index: 8, type: 'simple', 
        title: 'Nuestra risa oficial', value: topLaugh, subtitle: 'La forma de reírse que dominó nuestra conversación', 
        icon: <MessageCircle className="w-8 h-8 text-emerald-400" />, accentColor: 'rgba(16, 185, 129, 0.15)', span: 1 
      },
      { 
        id: 'longest', index: 9, type: 'simple', 
        title: 'La palabra más larga', value: wrappedData.language.longestWord, subtitle: 'A alguien se le pegó el teclado', 
        icon: <Sparkles className="w-8 h-8 text-yellow-300" />, accentColor: 'rgba(253, 224, 71, 0.15)', span: 1 
      },
      { 
        id: 'length', index: 10, type: 'vs', 
        title: '¿Quién escribe biblias?', 
        leftName: user1, leftVal: wrappedData.metrics.avgMsgLength[user1], leftSub: `caracteres prom.`,
        rightName: user2, rightVal: wrappedData.metrics.avgMsgLength[user2], rightSub: `caracteres prom.`,
        icon: <Book className="w-8 h-8 text-cyan-400" />, accentColor: 'rgba(34, 211, 238, 0.15)', span: 2 
      },
      { 
        id: 'love', index: 11, type: 'bar-chart', 
        title: 'Nuestro Contador de Afecto', 
        name1: user1, val1: wrappedData.emotion.affectionCount[user1] || 0, 
        name2: user2, val2: wrappedData.emotion.affectionCount[user2] || 0, 
        subtitle: 'Las veces que nos escribimos "te quiero", "te amo" o similar',
        icon: <Heart className="w-8 h-8 text-pink-400" />,
        accentColor: 'rgba(244, 114, 182, 0.15)', span: 2 
      },
      { 
        id: 'starters', index: 12, type: 'bar-chart', 
        title: '¿Quién rompe el hielo?', 
        name1: user1, val1: wrappedData.habits.conversationStarters[user1] || 0, 
        name2: user2, val2: wrappedData.habits.conversationStarters[user2] || 0, 
        subtitle: 'Veces que iniciamos la conversación del día',
        icon: <MessageCircle className="w-8 h-8 text-teal-400" />,
        accentColor: 'rgba(20, 184, 166, 0.15)', span: 2 
      },
      {
        id: 'nicknames', index: 13, type: 'vs',
        title: 'Nuestros Apodos',
        leftName: 'Yo te digo', leftVal: 'Calabacita', leftSub: '95 veces',
        rightName: 'Tú me dices', rightVal: 'Lindo / Amor', rightSub: '54 veces',
        icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
        accentColor: 'rgba(99, 102, 241, 0.15)', span: 2
      },
      { 
        id: 'first', index: 14, type: 'message', 
        title: 'Nuestro Mensaje Cero (Cómo empezó)', date: wrappedData.emotion.firstMessage.date, 
        sender: wrappedData.emotion.firstMessage.sender, text: wrappedData.emotion.firstMessage.content,
        icon: <Sparkles className="w-8 h-8 text-amber-400" />,
        accentColor: 'rgba(251, 191, 36, 0.15)', span: 2 
      }
    ];
  }, [user1, user2]);

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
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 mb-4 drop-shadow-2xl py-2">
          Wrapped 2026
        </h1>
        <p className="text-[#a1a5a3] font-sans tracking-widest uppercase text-xs md:text-sm">
          Un resumen de nuestra historia
        </p>
      </motion.div>

      <div className="h-[40vh] md:h-[50vh]"></div>

      <div className="relative z-20 pb-40 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} scrollContainer={containerRef} />
          ))}
        </div>
        
        {/* GRAND FINALE - SHAREABLE CARD */}
        <div className="flex flex-col items-center mt-24">
          <motion.div
            id="share-card"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ root: containerRef, once: false, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="w-full max-w-2xl text-center p-12 md:p-16 rounded-[3rem] bg-[#111] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group"
          >
            {/* Subtle glow for the finale */}
            <div 
              className="absolute -inset-4 rounded-[3rem] opacity-60 blur-3xl pointer-events-none z-0"
              style={{ background: `radial-gradient(circle at center, rgba(236, 72, 153, 0.2), transparent 60%)` }}
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h4 className="text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-2">
                Resumen de Nuestro
              </h4>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 font-sans font-black text-3xl md:text-4xl tracking-wide mb-10">
                Wrapped 2026
              </h3>
              
              <div className="inline-flex items-center justify-center bg-white/[0.05] p-5 rounded-full border border-white/10 shadow-xl mb-8">
                <Heart className="w-12 h-12 text-pink-400 animate-pulse" fill="currentColor" />
              </div>
              
              <h4 className="text-white/60 font-sans tracking-wide uppercase text-xs mb-3">La ganadora absoluta:</h4>
              <h2 className="text-4xl md:text-6xl font-sans font-black text-white mb-8 drop-shadow-lg">
                Tú, Luz
              </h2>
              
              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center">
                   <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Mensajes</span>
                   <span className="text-white font-bold text-2xl">{wrappedData.metrics.total.toLocaleString()}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center">
                   <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Días Activos</span>
                   <span className="text-white font-bold text-2xl">{wrappedData.metrics.activeDays}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center">
                   <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Tu Emoji Top</span>
                   <span className="text-white font-bold text-3xl">{wrappedData.language.topEmojis.byUser[user2][0]}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center">
                   <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Mi Emoji Top</span>
                   <span className="text-white font-bold text-3xl">{wrappedData.language.topEmojis.byUser[user1][0]}</span>
                </div>
              </div>

              <p className="text-white/70 font-sans text-sm md:text-base max-w-sm mx-auto font-medium">
                ...simplemente por ser la más linda de este chat.
              </p>
              <p className="text-white/40 font-serif italic text-xs mt-6">
                Nuestra historia sigue escribiéndose.
              </p>
            </div>
          </motion.div>

          <button
            onClick={async () => {
              try {
                const element = document.getElementById('share-card');
                if (!element) return;
                
                // Add a temporary solid background for capture in case of transparency issues
                const originalBg = element.style.backgroundColor;
                element.style.backgroundColor = '#0f0f0f';
                
                const canvas = await html2canvas(element, {
                  scale: 2,
                  backgroundColor: '#050505',
                  useCORS: true,
                  logging: false,
                  allowTaint: true
                });
                
                element.style.backgroundColor = originalBg;
                
                const data = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = data;
                link.download = 'nuestro_wrapped.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } catch (error) {
                console.error("Error al descargar la imagen:", error);
                alert("Hubo un error al descargar la imagen. Intenta desde una computadora.");
              }
            }}
            className="mt-8 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-sans font-bold flex items-center gap-3 transition-colors shadow-lg backdrop-blur-md"
          >
            <Download className="w-5 h-5" />
            Descargar como PNG
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default Wrapped;
