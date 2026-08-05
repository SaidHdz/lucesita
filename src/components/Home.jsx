import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import FoldText from './FoldText';
import BlurText from './BlurText';
import Plasma from './Plasma';
import Counter from './Counter';
import dbtmCover from '../assets/dbtm.jpg';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

const PremiumCard = ({ 
  image, 
  title, 
  price,
  description, 
  badges,
  buttonText,
  onClick,
  scrollContainer
}) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Hover 3D logic (Desktop)
  const hoverRotateX = useSpring(useMotionValue(0), springValues);
  const hoverRotateY = useSpring(useMotionValue(0), springValues);
  const hoverScale = useSpring(1, springValues);

  function handleMouse(e) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -10;
    const rotationY = (offsetX / (rect.width / 2)) * 10;
    
    hoverRotateX.set(rotationX);
    hoverRotateY.set(rotationY);
  }

  function handleMouseEnter() {
    if (!isMobile) hoverScale.set(1.03);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    hoverScale.set(1);
    hoverRotateX.set(0);
    hoverRotateY.set(0);
  }

  // Scroll 3D logic (Mobile)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  const scrollRotateX = useTransform(smoothProgress, [0, 0.5, 1], [-30, 0, 30]);
  const scrollScale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95]);

  return (
    <div 
      ref={ref}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-sm mx-auto"
    >
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        style={{ 
          rotateX: isMobile ? scrollRotateX : hoverRotateX, 
          rotateY: isMobile ? 0 : hoverRotateY, 
          scale: isMobile ? scrollScale : hoverScale
        }}
        className="w-full h-auto min-h-[500px] rounded-[2.5rem] bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all flex flex-col text-left overflow-hidden border border-white/20 hover:border-white/40"
      >
        {/* Top Half: Image with Gradient Fade */}
        <div className="relative w-full h-64 shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {/* Gradient fading into the glass background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
          </div>
        </div>

        {/* Bottom Half: Content */}
        <div className="px-6 pb-6 pt-2 flex flex-col flex-1 z-10">
          {/* Title & Price Row */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide">
              {title}
            </h3>
            <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
              <span className="text-white text-sm font-semibold">{price}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 font-sans text-sm leading-relaxed mb-5 drop-shadow-md">
            {description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {badges.map((badge, idx) => (
              <span key={idx} className="bg-black/20 backdrop-blur-sm border border-white/5 text-white/90 text-xs px-3 py-1.5 rounded-full font-medium">
                {badge}
              </span>
            ))}
          </div>

          {/* Reserve Button */}
          <div className="w-full mt-auto py-4 rounded-full bg-white flex items-center justify-center shadow-[0_5px_15px_rgba(255,255,255,0.15)] hover:bg-gray-100 transition-colors">
            <span className="text-black font-sans font-bold text-base tracking-wide">
              {buttonText}
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

const Home = ({ onViewChange }) => {
  const containerRef = useRef(null);

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
          mouseInteractive={true}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 z-10 w-full max-w-6xl">
        
        {/* Card 1: Rokola */}
        <PremiumCard 
          image={dbtmCover}
          title="La Rokola"
          price="Play"
          description="Revive cada recuerdo musical. Una colección de nuestras canciones favoritas y lo que significan para mí."
          badges={["Música", "Nostalgia"]}
          buttonText="Escuchar"
          scrollContainer={containerRef}
          onClick={() => onViewChange('rokola')}
        />

        {/* Card 2: Recuerdos */}
        <PremiumCard 
          image={dbtmCover}
          title="Recuerdos"
          price="Galería"
          description="Una galería de nuestros mejores momentos. Fotografías y aventuras guardadas en el tiempo."
          badges={["Exclusivo", "Memorias"]}
          buttonText="Ver Galería"
          scrollContainer={containerRef}
          onClick={() => onViewChange('recuerdos')}
        />

        {/* Card 3: Wrapped */}
        <PremiumCard 
          image={dbtmCover}
          title="Nuestro Wrapped"
          price="Top"
          description="Un resumen estadístico de nuestro tiempo juntos, canciones más escuchadas y momentos top."
          badges={["Estadísticas", "Especial"]}
          buttonText="Descubrir"
          scrollContainer={containerRef}
          onClick={() => onViewChange('wrapped')}
        />

      </div>

    </section>
  );
};

export default Home;
