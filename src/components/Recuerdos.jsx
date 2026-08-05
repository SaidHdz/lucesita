import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PlayCircle, X } from 'lucide-react';
import dbtmCover from '../assets/dbtm.jpg';

const memories = [
  { id: 1, type: 'image', src: dbtmCover, title: 'El principio', date: 'Julio 2026', description: 'El día en que todo comenzó y nuestras historias se cruzaron por primera vez.' },
  { id: 2, type: 'video', src: dbtmCover, title: 'Aquel atardecer', date: 'Agosto 2026', description: 'Un atardecer perfecto que se quedó grabado para siempre en la memoria.' },
  { id: 3, type: 'image', src: dbtmCover, title: 'Las risas', date: 'Septiembre 2026', description: 'Momentos espontáneos donde simplemente no podíamos dejar de sonreír.' },
  { id: 4, type: 'video', src: dbtmCover, title: 'Nuestro viaje', date: 'Octubre 2026', description: 'Una aventura inolvidable lejos del ruido de la ciudad.' },
  { id: 5, type: 'image', src: dbtmCover, title: 'Inolvidable', date: 'Noviembre 2026', description: 'Para siempre guardado en el tiempo como uno de los mejores días.' },
];

const MemoryCard = ({ memory, scrollContainer, onClick }) => {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: scrollContainer,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [-45, 0, 45]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <div ref={targetRef} className="w-full flex justify-center py-2 -mt-4 md:-mt-12 first:mt-0" style={{ perspective: 1200 }}>
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        style={{ opacity, scale, rotateX, y, filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.5))` }}
        className="relative w-[85%] md:w-[50%] lg:w-[35%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 bg-[#1a1a1a] cursor-pointer"
      >
        {memory.type === 'video' ? (
          <>
            <video 
              src={memory.src} 
              poster={memory.src}
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
              <PlayCircle className="w-16 h-16 text-white/50 backdrop-blur-md rounded-full" />
            </div>
          </>
        ) : (
          <img 
            src={memory.src} 
            alt={memory.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105" 
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none"></div>
        
        <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
          <p className="text-white/60 font-sans text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
            {memory.date}
          </p>
          <h3 className="text-white font-sans font-bold tracking-tight text-3xl md:text-4xl drop-shadow-lg">
            {memory.title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

const Recuerdos = ({ onBack }) => {
  const containerRef = useRef(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  
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

      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="fixed top-32 left-0 w-full text-center z-10 pointer-events-none px-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-black tracking-tighter text-white mb-4 drop-shadow-2xl">
          Nuestros Recuerdos
        </h1>
        <p className="text-[#a1a5a3] font-sans tracking-[0.3em] uppercase text-xs md:text-sm">
          Guardados en el tiempo
        </p>
      </motion.div>

      <div className="h-[45vh]"></div>

      <div className="relative z-20 pb-32">
        {memories.map((mem) => (
          <MemoryCard 
            key={mem.id} 
            memory={mem} 
            scrollContainer={containerRef} 
            onClick={() => setSelectedMemory(mem)}
          />
        ))}
      </div>
      
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/60"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg lg:max-w-xl max-h-[90dvh] bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative w-full h-[50vh] md:h-[60vh] flex-shrink-0 bg-black/50">
                {selectedMemory.type === 'video' ? (
                  <video 
                    src={selectedMemory.src} 
                    poster={selectedMemory.src}
                    autoPlay 
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    src={selectedMemory.src} 
                    alt={selectedMemory.title} 
                    className="w-full h-full object-cover" 
                  />
                )}
                {/* Subtle gradient overlay to blend image bottom with the text section */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-gradient-to-b from-black/80 to-black/95">
                <p className="text-white/50 font-sans text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
                  {selectedMemory.date}
                </p>
                <h2 className="text-white font-sans font-bold text-2xl md:text-4xl mb-4 leading-tight">
                  {selectedMemory.title}
                </h2>
                <p className="text-white/80 font-serif leading-relaxed text-sm md:text-base">
                  {selectedMemory.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
};

export default Recuerdos;
