import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Music, Heart, Clock, Star, Headphones } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: "Top Artista",
    value: "Álvaro Díaz",
    subtitle: "El que nunca falta en el carro",
    icon: <Star className="w-8 h-8 text-[#b088f9]" />,
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    id: 2,
    title: "Canción Repetida",
    value: "TU VAS SIN (fav)",
    subtitle: "Rels B sonando en loop",
    icon: <Music className="w-8 h-8 text-pink-400" />,
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: 3,
    title: "Nuestro Mood",
    value: "Romántico Chill",
    subtitle: "Entre reggaetón y canciones sad",
    icon: <Headphones className="w-8 h-8 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 4,
    title: "Tiempo Juntos",
    value: "Incontable",
    subtitle: "Y los que faltan por venir",
    icon: <Clock className="w-8 h-8 text-amber-400" />,
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 5,
    title: "Mejor Recuerdo",
    value: "Tú y Yo",
    subtitle: "Cualquier momento si es contigo",
    icon: <Heart className="w-8 h-8 text-red-400" />,
    gradient: "from-red-500/20 to-pink-500/20"
  }
];

const StatCard = ({ stat }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
      className={`relative w-full aspect-square md:aspect-video rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center p-8 text-center`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`}></div>
      
      {/* Decorative glass reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
      
      <div className="relative z-10 bg-black/20 p-4 rounded-full backdrop-blur-md border border-white/10 mb-6 shadow-xl">
        {stat.icon}
      </div>
      
      <h3 className="relative z-10 text-white/60 font-sans tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
        {stat.title}
      </h3>
      
      <h2 className="relative z-10 text-white font-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-tight mb-4 drop-shadow-lg">
        {stat.value}
      </h2>
      
      <p className="relative z-10 text-white/80 font-serif italic text-sm md:text-lg">
        {stat.subtitle}
      </p>
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
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[120px]"></div>
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

      <div className="h-[50vh]"></div>

      <div className="relative z-20 pb-40 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-16 md:gap-32">
        {stats.map((stat, index) => (
          <div key={stat.id} className={`flex justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
            <div className="w-full md:w-3/4">
              <StatCard stat={stat} />
            </div>
          </div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full mt-20 text-center p-12 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
          <h2 className="relative z-10 text-3xl md:text-5xl font-sans font-bold text-white mb-6">
            Y el siguiente año...
          </h2>
          <p className="relative z-10 text-white/70 font-serif italic text-lg md:text-2xl">
            Seguiremos llenando este wrapped de más recuerdos.
          </p>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Wrapped;
