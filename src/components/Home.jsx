import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import FoldText from './FoldText';
import BlurText from './BlurText';
import Plasma from './Plasma';
import Counter from './Counter';
import dbtmCover from '../assets/dbtm.jpg';

const PremiumCard = ({ 
  image, 
  title, 
  price,
  description, 
  badges,
  buttonText,
  onClick,
  index = 0,
  accentColor = 'rgba(176, 136, 249, 0.15)'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="w-full max-w-sm mx-auto relative group"
    >
      {/* Subtle glow behind the card */}
      <div 
        className="absolute -inset-4 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}, transparent 70%)` }}
      />
      {/* Always-visible softer glow */}
      <div 
        className="absolute -inset-2 rounded-[3rem] opacity-40 blur-xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}, transparent 70%)` }}
      />

      <motion.button
        onClick={onClick}
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        whileHover={!isMobile ? { y: -8, scale: 1.02 } : {}}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full h-auto min-h-[480px] rounded-[2.5rem] bg-white/[0.07] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] flex flex-col text-left overflow-hidden border border-white/[0.12] hover:border-white/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-500"
      >
        {/* Top Half: Image with Gradient Fade */}
        <div className="relative w-full h-60 shrink-0 overflow-hidden">
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            animate={!isMobile && isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Gradient fading into the glass background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Bottom Half: Content */}
        <div className="px-6 pb-6 pt-3 flex flex-col flex-1 z-10">
          {/* Title & Price Row */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide">
              {title}
            </h3>
            <div className="bg-white/[0.08] backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="text-white/90 text-sm font-semibold">{price}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 font-sans text-sm leading-relaxed mb-5">
            {description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {badges.map((badge, idx) => (
              <span key={idx} className="bg-white/[0.06] backdrop-blur-sm border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full font-medium">
                {badge}
              </span>
            ))}
          </div>

          {/* Reserve Button */}
          <div className="w-full mt-auto py-3.5 rounded-full bg-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)] transition-shadow duration-300">
            <span className="text-black font-sans font-bold text-base tracking-wide">
              {buttonText}
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

const Home = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={containerRef} className="h-[100dvh] overflow-y-auto overscroll-none relative flex flex-col items-center justify-start pt-28 pb-32 px-6 md:px-12 overflow-x-hidden">
      
      <Counter />
      
      {/* Plasma Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Plasma 
          color="#b088f9"
          speed={0.8}
          direction="forward"
          scale={1.2}
          opacity={0.15}
          mouseInteractive={!isMobile}
          iterations={isMobile ? 30 : 60}
          targetFps={isMobile ? 30 : 60}
        />
        {/* Subtle dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]"></div>
      </div>

      <div className="z-10 w-full max-w-5xl text-center mb-24 mt-8">
        <BlurText
          text="Feliz Cumpleaños"
          delay={150}
          animateBy="words"
          direction="bottom"
          className="text-6xl md:text-[7.5rem] font-sans font-black tracking-tighter text-white mb-6 leading-tight drop-shadow-2xl"
        />
        
        <div className="flex justify-center mb-4">
           <FoldText
             text="Un espacio diseñado solo para ti."
             splitBy="word"
             hinge="top"
             trigger="mount"
             duration={0.8}
             stagger={0.1}
             fontSize="clamp(1.1rem, 2.5vw, 1.5rem)"
             fontWeight={300}
             color="#a1a5a3"
             className="font-sans"
           />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-white/60 font-serif italic text-lg md:text-xl"
        >
          te quiero mucho, no es mucho pero es un regalo con amor
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 z-10 w-full max-w-6xl pb-8">
        
        {/* Card 1: Rokola */}
        <PremiumCard 
          image={dbtmCover}
          title="tu playlist"
          price="Play"
          description="una playlist que hice para ti, de canciones que me gustan y me hacen recordarnos, aun que usar spotify es muy facil asi que mejor una web, no? te quiero"
          badges={["Música", "Nostalgia"]}
          buttonText="Escuchar"
          index={0}
          accentColor="rgba(176, 136, 249, 0.2)"
          onClick={() => onViewChange('rokola')}
        />

        {/* Card 2: Recuerdos */}
        <PremiumCard 
          image={dbtmCover}
          title="Recuerdos"
          price="Galería"
          description="alguna de nuestras fotos y nuestros momentos juntos, serian mas, pero estubimos tal felices que el tomar fotos pasaba a segundo plano"
          badges={["Exclusivo", "Memorias"]}
          buttonText="Ver Galería"
          index={1}
          accentColor="rgba(249, 136, 176, 0.2)"
          onClick={() => onViewChange('recuerdos')}
        />

        {/* Card 3: Wrapped */}
        <PremiumCard 
          image={dbtmCover}
          title="Nuestro Wrapped"
          price="Top"
          description="quien dijo mas te quiero? quien hababa primero o cual emoji usamos mas? solo entra para descubrirlo"
          badges={["Estadísticas", "Especial"]}
          buttonText="Descubrir"
          index={2}
          accentColor="rgba(136, 200, 249, 0.2)"
          onClick={() => onViewChange('wrapped')}
        />

      </div>

    </section>
  );
};

export default Home;

