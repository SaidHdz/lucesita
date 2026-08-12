import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music, ChevronDown, ChevronUp, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { initialSongs, getSpotifyUrl, getAppleMusicUrl } from '../assets/songs';

const FloatingPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPlatformMenu, setShowPlatformMenu] = useState(false);

  const audioRef = useRef(null);
  const currentSong = initialSongs[currentIndex];

  useEffect(() => {
    const checkModal = () => {
      const modalBackdrop = document.querySelector('[data-modal="true"]') || document.querySelector('.bg-black\\/90');
      setIsModalOpen(Boolean(modalBackdrop));
    };

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { childList: true, subtree: true });
    checkModal();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % initialSongs.length);
    setIsPlaying(true);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + initialSongs.length) % initialSongs.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 1);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentSong || isModalOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 selection:bg-none">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      <AnimatePresence mode="wait">
        {isCollapsed ? (
          /* Collapsed Mini Pill */
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-3 bg-[#121118]/90 backdrop-blur-2xl border border-white/20 px-4 py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.6)] cursor-pointer group hover:border-[#b088f9]/50 transition-all"
          >
            <div className={`w-8 h-8 rounded-full overflow-hidden border border-white/20 relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
              <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col max-w-[120px]">
              <span className="text-white font-sans text-xs font-bold truncate group-hover:text-[#b088f9] transition-colors">
                {currentSong.title}
              </span>
              <span className="text-white/50 font-sans text-[10px] truncate">
                {currentSong.artist}
              </span>
            </div>

            <button
              type="button"
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-[#b088f9] text-black flex items-center justify-center shadow-md hover:scale-105 transition-transform ml-1"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
            </button>

            <ChevronUp className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </motion.div>
        ) : (
          /* Expanded Floating Player Card */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-72 sm:w-80 bg-[#121118]/95 backdrop-blur-2xl border border-white/20 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white flex flex-col gap-3 relative"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#b088f9]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#c8a2c8] font-semibold">
                  Playlist Flotante
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowPlatformMenu(prev => !prev)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="Abrir en Spotify o Apple Music"
                >
                  <ExternalLink className="w-4 h-4 text-[#b088f9]" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCollapsed(true)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="Minimizar reproductor"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Platform Popover Dropdown */}
            {showPlatformMenu && (
              <div className="bg-[#181724] border border-white/20 p-3 rounded-2xl space-y-2 shadow-2xl">
                <p className="text-[10px] font-mono text-[#c8a2c8] uppercase tracking-wider font-bold text-center">
                  Abrir canción en:
                </p>
                <a
                  href={getSpotifyUrl(currentSong)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#1DB954]/20 hover:bg-[#1DB954]/30 border border-[#1DB954]/40 text-[#1DB954] font-bold text-xs transition-all"
                >
                  <span className="flex items-center gap-2">Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={getAppleMusicUrl(currentSong)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FA243C]/20 hover:bg-[#FA243C]/30 border border-[#FA243C]/40 text-[#FA243C] font-bold text-xs transition-all"
                >
                  <span className="flex items-center gap-2">Apple Music</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Song Info & Cover */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/20 shrink-0 shadow-md">
                <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#b088f9] animate-ping" />
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="font-sans font-bold text-sm text-white truncate hover:text-[#b088f9] transition-colors">
                  {currentSong.title}
                </h4>
                <p className="font-sans text-xs text-white/60 truncate mb-1">
                  {currentSong.artist}
                </p>
                <span className="text-[10px] font-mono text-white/40">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={duration || 1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#b088f9]"
              />
            </div>

            {/* Playback Buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title={isMuted ? 'Dessilenciar' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Anterior"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-[#b088f9] hover:bg-[#c8a2c8] text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                  title={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Siguiente"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingPlayer;
