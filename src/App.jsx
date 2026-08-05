import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import Rokola from './components/Rokola';
import Recuerdos from './components/Recuerdos';
import Buzon from './components/Buzon';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="bg-bg h-[100dvh] w-full font-sans text-text relative overflow-hidden overscroll-none">
      <AnimatedBackground />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Home onViewChange={setCurrentView} />
          </motion.div>
        )}
        
        {currentView === 'rokola' && (
          <motion.div
            key="rokola"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 bg-bg"
          >
            <Rokola onBack={() => setCurrentView('home')} />
          </motion.div>
        )}

        {currentView === 'cartas' && (
          <motion.div
            key="cartas"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 bg-[#1a1811]" // Slightly yellowish dark bg
          >
            <Buzon onBack={() => setCurrentView('home')} />
          </motion.div>
        )}

        {currentView === 'recuerdos' && (
          <motion.div
            key="recuerdos"
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 bg-bg"
          >
            <Recuerdos onBack={() => setCurrentView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
