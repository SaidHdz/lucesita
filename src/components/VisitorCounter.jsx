import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye } from 'lucide-react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(1);
  const [activeViewers, setActiveViewers] = useState(1);

  useEffect(() => {
    // Local storage persistence for visitor count
    try {
      const storedCount = localStorage.getItem('lucesita_visitors_count');
      const currentCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
      localStorage.setItem('lucesita_visitors_count', currentCount.toString());
      setVisitorCount(currentCount);
    } catch {
      setVisitorCount(1);
    }

    // Active viewers simulator (1-3 active viewers)
    const interval = setInterval(() => {
      const simulatedViewers = Math.floor(Math.random() * 2) + 1;
      setActiveViewers(simulatedViewers);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-3 bg-white/[0.08] backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-xs font-sans text-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-white/30 transition-all cursor-default"
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-emerald-300 font-bold tracking-wide">
          {activeViewers} en línea ahora
        </span>
      </div>

      <span className="text-white/20 font-light">|</span>

      <div className="flex items-center gap-1.5 text-white/80 font-mono">
        <Users className="w-3.5 h-3.5 text-[#b088f9]" />
        <span>Visitas:</span>
        <strong className="text-white font-bold">{visitorCount}</strong>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
