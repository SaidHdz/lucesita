import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, PenTool, Send, ArrowLeft } from 'lucide-react';

const letters = [
  { 
    id: 1, 
    title: 'Para ti', 
    date: 'Hoy',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' 
  }
];

const Buzon = ({ onBack }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#1a1811] flex flex-col items-center justify-center overflow-hidden py-20">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Background aesthetics - Yellow tinted */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-yellow opacity-[0.05] rounded-full blur-[150px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
          El Buzón de <span className="text-accent-yellow italic">Woodstock</span>
        </h2>
        <p className="text-white/50 font-light tracking-wider uppercase text-sm">Pequeños mensajes amarillos</p>
      </motion.div>

      {/* Woodstock Mailbox Visualization */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setSelectedLetter(letters[0])}
      >
        <div className="relative w-80 h-80 rounded-[3rem] bg-gradient-to-b from-[#2a2512] to-[#14120a] shadow-2xl flex flex-col items-center justify-center border border-accent-yellow/20 overflow-hidden group">
          
          {/* Subtle yellow glow effect */}
          <div className={`absolute inset-0 bg-accent-yellow transition-opacity duration-700 blur-[80px] ${isHovered ? 'opacity-20' : 'opacity-0'}`}></div>

          <motion.div 
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10"
          >
            <Mail className="w-24 h-24 text-accent-yellow mb-6" strokeWidth={1.5} />
            
            {/* Woodstock Emoji Placeholder */}
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: isHovered ? [0, -10, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-12 -right-6 text-4xl"
            >
              🐥
            </motion.div>

            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-accent-yellow text-[#14120a] font-bold text-xs py-1 px-4 rounded-full tracking-widest uppercase shadow-[0_0_20px_rgba(255,215,0,0.4)] whitespace-nowrap"
            >
              ¡Pío Pío! Tienes carta
            </motion.div>
          </motion.div>

          <div className="text-center relative z-10">
            <h3 className="text-white font-serif text-2xl mb-1 group-hover:text-accent-yellow transition-colors">Abrir buzón</h3>
          </div>
        </div>
      </motion.div>

      {/* Elegant Letter Modal with Yellow Theme */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setSelectedLetter(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fffae6] w-full max-w-3xl rounded-[2rem] shadow-[0_30px_60px_rgba(255,215,0,0.1)] z-10 relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Left Decoration Panel */}
              <div className="hidden md:flex w-1/3 bg-[#ffdd00] flex-col justify-between p-10 relative">
                <div className="absolute top-0 right-0 w-full h-full bg-black/5 mix-blend-overlay"></div>
                <PenTool className="w-8 h-8 text-[#5c5000] relative z-10" />
                <div className="relative z-10">
                  <p className="text-[#5c5000]/70 text-sm uppercase tracking-widest mb-2 font-bold">Fecha</p>
                  <p className="text-[#3d3500] font-serif text-xl">{selectedLetter.date}</p>
                </div>
              </div>

              {/* Right Content Panel */}
              <div className="w-full md:w-2/3 p-8 md:p-14 relative overflow-y-auto">
                <button 
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-accent-yellow hover:bg-accent-yellow/10 rounded-full transition-all"
                  onClick={() => setSelectedLetter(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                
                <h3 className="font-serif text-4xl text-gray-900 mb-10 pb-6 border-b border-gray-200">
                  {selectedLetter.title}
                </h3>
                
                <div className="font-mono text-gray-800 leading-loose text-lg whitespace-pre-wrap font-medium">
                  {selectedLetter.content}
                </div>
                
                <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Send className="w-4 h-4 text-accent-yellow" />
                  </div>
                  <p className="font-serif text-2xl italic text-gray-600">Con cariño.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Buzon;
