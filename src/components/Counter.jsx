import React, { useState, useEffect } from 'react';
import SplitFlapText from './SplitFlapText';

const Counter = () => {
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    // April 1, 2026 15:15:00
    const startDate = new Date(2026, 3, 1, 15, 15, 0);

    const updateCounter = () => {
      const now = new Date();
      let diff = now - startDate;
      
      if (diff < 0) diff = 0; // Prevent negative if we are somehow before start date

      // Calculate years, months, days roughly or exactly?
      // Exact calculation:
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();

      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      // Format with padding
      const yStr = String(years).padStart(2, '0');
      const moStr = String(months).padStart(2, '0');
      const dStr = String(days).padStart(2, '0');
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(minutes).padStart(2, '0');

      // The text to display in SplitFlapText
      // Example: "00A 04M 05D 10H 30M"
      setTimeText(`${yStr}A ${moStr}M ${dStr}D ${hStr}H ${mStr}m`);
    };

    updateCounter();
    const interval = setInterval(updateCounter, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  if (!timeText) return null;

  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-4 rounded-3xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl flex flex-col items-end pointer-events-none transition-all">
      <p className="text-white/60 font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase mb-3">
        Desde que nos conocimos
      </p>
      <SplitFlapText
        text={timeText}
        fontSize={isMobile() ? 24 : 32}
        padTo={19}
        tileColor="#050505"
        textColor="#ffffff"
        tileRadius={6}
        gap={4}
        flipDuration={0.2}
      />
    </div>
  );
};

// Helper for responsive font size init
function isMobile() {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
}

export default Counter;
