import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import VisitorCounter from './VisitorCounter';
import FoldText from './FoldText';
import BlurText from './BlurText';
import Plasma from './Plasma';
import Counter from './Counter';
import snoopyCover from '../assets/snoopy.jpg';
import woodstockCover from '../assets/woodstock.jpg';
import cartasCover from '../assets/WhatsApp Image 2026-08-07 at 2.02.22 AM.jpeg';
const homeCover = snoopyCover;

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

const PremiumCard = ({ 
  image, 
  title, 
  price,
  description, 
  badges,
  buttonText,
  onClick,
  index = 0,
  accentColor = 'rgba(176, 136, 249, 0.15)',
  showIGNote = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function handleMouseMove(e) {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotateAmplitude = 20;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    if (!isMobile) {
      setIsHovered(true);
      scale.set(1.05);
    }
  }

  function handleMouseLeave() {
    setIsHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

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
      className="w-full max-w-sm mx-auto relative group [perspective:1000px]"
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
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d'
        }}
        whileTap={{ scale: 0.96 }}
        className="relative w-full h-auto min-h-[480px] rounded-[2.5rem] bg-white/[0.07] backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.4)] flex flex-col text-left border border-white/[0.12] hover:border-white/40 hover:shadow-[0_25px_70px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-500"
      >
        {/* Top Half: Image with Gradient Fade */}
        <div className="relative w-full h-60 shrink-0 overflow-hidden rounded-t-[2.5rem]" style={{ transform: 'translateZ(30px)' }}>
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            animate={!isMobile && isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Gradient fading into the glass background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Instagram Note speech bubble overlay */}
          {showIGNote && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none" style={{ transform: 'translateZ(60px)' }}>
              <div className="bg-white/95 text-black px-3.5 py-1.5 rounded-2xl shadow-xl border border-white/60 text-xs font-sans font-bold text-center relative mb-1.5">
                <span>ahora si, feliz cumpleaños</span>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white/95" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Half: Content with 3D Z-Layering */}
        <div className="px-6 pb-6 pt-3 flex flex-col flex-1 z-10" style={{ transform: 'translateZ(45px)' }}>
          {/* Title & Price Row */}
          <div className="flex items-center justify-between mb-2" style={{ transform: 'translateZ(60px)' }}>
            <h3 className="text-white text-2xl font-bold font-sans tracking-wide">
              {title}
            </h3>
            <div className="bg-white/[0.08] backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-md" style={{ transform: 'translateZ(70px)' }}>
              <span className="text-white/90 text-sm font-semibold">{price}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/70 font-sans text-sm leading-relaxed mb-5" style={{ transform: 'translateZ(40px)' }}>
            {description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6" style={{ transform: 'translateZ(65px)' }}>
            {badges.map((badge, idx) => (
              <span key={idx} className="bg-white/[0.08] backdrop-blur-sm border border-white/15 text-white/90 text-xs px-3 py-1.5 rounded-full font-semibold shadow-md">
                {badge}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="w-full mt-auto py-3.5 rounded-full bg-white flex items-center justify-center shadow-[0_6px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.35)] transition-all duration-300" style={{ transform: 'translateZ(80px)' }}>
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
  const [tapCount, setTapCount] = useState(0);
  const [showUnlockToast, setShowUnlockToast] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const colors = ['#b088f9', '#c8a2c8', '#88c8f9', '#f988b0', '#ffd700', '#ffffff'];

    // Initial festive burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors
    });

    // Continuous side cannons burst for 2 seconds
    const duration = 2000;
    const end = Date.now() + duration;

    let animationFrameId;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors
      });

      if (Date.now() < end) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };
    animationFrameId = requestAnimationFrame(frame);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSnoopyTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.35 },
      colors: ['#b088f9', '#c8a2c8', '#88c8f9', '#f988b0', '#ffd700']
    });

    if (nextCount >= 7) {
      localStorage.setItem('visitor_counter_unlocked', 'true');
      window.dispatchEvent(new Event('unlock_visitor_counter'));
      setShowUnlockToast(true);
      setTimeout(() => setShowUnlockToast(false), 4000);
      setTapCount(0);
    }
  };

  return (
    <section ref={containerRef} className="h-[100dvh] overflow-y-auto overscroll-none relative flex flex-col items-center justify-start pt-28 pb-32 px-6 md:px-12 overflow-x-hidden">
      
      {/* 7-Tap Easter Egg Unlock Toast Notification */}
      <AnimatePresence>
        {showUnlockToast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#b088f9] text-black px-6 py-3 rounded-full shadow-[0_10px_35px_rgba(176,136,249,0.5)] font-bold font-sans text-xs sm:text-sm flex items-center gap-2 border border-white/40"
          >
            <Sparkles className="w-4 h-4 text-black fill-black" />
            <span>¡Visualizador de visitantes en línea desbloqueado!</span>
          </motion.div>
        )}
      </AnimatePresence>

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

      <div className="z-10 w-full max-w-5xl text-center mb-24 mt-8 flex flex-col items-center">
        {/* Instagram Note Profile Avatar on Home Page */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center relative group cursor-pointer"
          onClick={handleSnoopyTap}
        >
          {/* Floating Instagram Note Speech Bubble */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative bg-white/95 text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/60 text-xs sm:text-sm font-sans font-bold text-center mb-3 group-hover:scale-105 transition-transform z-20"
          >
            <span className="leading-snug text-black font-sans font-bold">ahora si, feliz cumpleaños</span>
            {/* Speech Bubble Tail pointing down */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white/95" />
          </motion.div>

          {/* Circular Avatar with Instagram Gradient Ring */}
          <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-[#b088f9] via-[#c8a2c8] to-[#88c8f9] shadow-[0_0_50px_rgba(176,136,249,0.4)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#050505] relative bg-black shrink-0">
              <img src={snoopyCover} alt="Snoopy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Sparkle badge */}
            <div className="absolute bottom-1 right-1 w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#b088f9] text-black flex items-center justify-center font-bold shadow-lg border-2 border-[#050505] group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-black fill-black" />
            </div>
          </div>
        </motion.div>

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
          className="text-white/60 font-serif italic text-lg md:text-xl mb-6"
        >
          te quiero mucho, no es mucho pero es un regalo con amor
        </motion.p>

        {/* Live Visitor Counter */}
        <VisitorCounter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 z-10 w-full max-w-7xl pb-8">
        
        {/* Card 1: Rokola */}
        <PremiumCard 
          image={homeCover}
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
          image={homeCover}
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
          image={homeCover}
          title="Nuestro Wrapped"
          price="Top"
          description="quien dijo mas te quiero? quien hababa primero o cual emoji usamos mas? solo entra para descubrirlo"
          badges={["Estadísticas", "Especial"]}
          buttonText="Descubrir"
          index={2}
          accentColor="rgba(136, 200, 249, 0.2)"
          onClick={() => onViewChange('wrapped')}
        />

        {/* Card 4: Cartas */}
        <PremiumCard 
          image={cartasCover}
          title="Cartas para mi calabaza"
          price="Notas"
          description="algunas de las cartas que te escribí, espero que te gusten, disculpa la tardanza."
          badges={["✨ 2 cartas nuevas", "Mensajes", "Cartas"]}
          buttonText="Abrir Cartas"
          index={3}
          accentColor="rgba(176, 136, 249, 0.2)"
          onClick={() => onViewChange('cartas')}
        />

      </div>

    </section>
  );
};

export default Home;

