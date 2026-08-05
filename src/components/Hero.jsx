import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import SplitText from './SplitText';

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
      {/* Decorative Premium Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent opacity-[0.03] blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent opacity-[0.04] blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 glass-panel p-10 md:p-20 rounded-[2rem] text-center max-w-3xl mx-4 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "backOut" }}
          className="mx-auto mb-8 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100"
        >
          {/* High-end Snoopy Placeholder */}
          <Heart className="text-accent w-10 h-10 animate-pulse" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-serif text-text mb-6 tracking-tight flex flex-col items-center justify-center">
          <SplitText text="Feliz Cumpleaños," delay={0.2} duration={0.8} />
          <span className="text-accent italic mt-2">
            <SplitText text="Lucesita" delay={0.8} duration={1} />
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-text/60 mb-12 font-light tracking-wide max-w-xl mx-auto">
          Un espacio digital diseñado exclusivamente para celebrar tu vida, tus momentos y nuestra historia.
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('rokola').scrollIntoView({ behavior: 'smooth' })}
          className="bg-text text-bg px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-accent transition-colors duration-500 shadow-xl flex items-center gap-3 mx-auto"
        >
          Descubrir
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 text-text/30"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;
