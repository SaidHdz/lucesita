import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Disable heavy mouse tracking on mobile
    if (window.innerWidth < 768) return;
    
    let animationFrameId;
    
    const updateMousePosition = (e) => {
      // Use requestAnimationFrame to throttle state updates for better performance
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent mix-blend-multiply filter blur-[120px] opacity-20"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 50,
          mass: 2
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-light mix-blend-multiply filter blur-[100px] opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
