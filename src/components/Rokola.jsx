import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, X, Play, Pause, SkipBack, SkipForward, 
  Link, Heart, Maximize2, Search, Volume2, VolumeX, Volume1, Clock, Mic2
} from 'lucide-react';
import { initialSongs as songs } from '../assets/songs';
import ElasticSlider from './ElasticSlider';

const Rokola = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  
  // Audio state
  const audioRef = React.useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(25);
  const [isMuted, setIsMuted] = useState(false);

  // Fallback if no songs
  if (!songs || songs.length === 0) {
    return <div className="text-white">Cargando canciones...</div>;
  }

  const currentSong = songs[currentIndex];

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 100);
    }
  };

  const handleSeek = (newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const nextSong = () => {
    setShowLyrics(false);
    setCurrentIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const prevSong = () => {
    setShowLyrics(false);
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  return (
    <section className="relative h-[100dvh] bg-[#050505] overflow-hidden flex flex-col items-center justify-start pt-16 md:pt-20 pb-4">
      
      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src={currentSong.audio || ""} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />

      {/* Ambient background glow based on current cover */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <motion.div 
          key={currentSong.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full bg-center bg-cover blur-[100px]"
          style={{ backgroundImage: `url(${currentSong.cover})` }}
        />
      </div>

      {/* Floating Side Icons (MR style) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 hidden md:flex">
        {currentSong?.spotifyUrl && (
          <a href={currentSong.spotifyUrl} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md transition-all">
            <Link className="w-5 h-5" />
          </a>
        )}
        <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md transition-all">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 hidden md:flex">
        <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md transition-all">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md transition-all">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Global Header Panel */}
      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/15 px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg z-50">
        <button onClick={onBack} className="text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <span className="text-white/90 text-xs md:text-sm font-bold tracking-[0.2em] truncate px-4">
          {currentIndex + 1} DE {songs.length}
        </span>
        <button onClick={onBack} className="text-white/80 hover:text-white transition-colors">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* MR Carousel */}
      <div className="relative w-full max-w-6xl h-[50vh] md:h-[55vh] flex items-center justify-center perspective-[1200px] z-10 mt-4 md:mt-6 shrink-0">
        <AnimatePresence>
          {songs.map((song, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex === 0 ? songs.length - 1 : currentIndex - 1);
            const isNext = index === (currentIndex === songs.length - 1 ? 0 : currentIndex + 1);
            
            if (!isActive && !isPrev && !isNext) return null;

            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, scale: 0.75, x: isPrev ? -300 : isNext ? 300 : 0, rotateY: isPrev ? 35 : isNext ? -35 : 0 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.3, 
                  scale: isActive ? 1 : 0.85,
                  x: isActive ? 0 : isPrev ? '-45%' : '45%',
                  rotateY: isActive ? 0 : isPrev ? 35 : -35,
                  zIndex: isActive ? 30 : 10,
                  filter: isActive ? 'blur(0px)' : 'blur(10px)'
                }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="absolute w-[80%] md:w-full max-w-2xl aspect-[4/5] md:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10"
              >
                {/* Background Pattern seamlessly integrated as primary texture */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${song.cover})` }}
                />
                
                {/* Glassmorphism Overlay for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"></div>

                {/* Lyrics Overlay */}
                <AnimatePresence>
                  {showLyrics && isActive && song.lyrics && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-black/80 backdrop-blur-xl flex flex-col pt-16 pb-8"
                    >
                      <button 
                        onClick={() => setShowLyrics(false)}
                        className="absolute top-5 right-5 md:top-8 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white z-50 backdrop-blur-md transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div 
                        ref={(el) => {
                          if (el && showLyrics) {
                            const activeIdx = song.lyrics.findIndex((line, i) => {
                              const nextLine = song.lyrics[i + 1];
                              return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
                            });
                            if (activeIdx >= 0) {
                              const activeElement = el.children[activeIdx];
                              if (activeElement) {
                                const scrollTarget = activeElement.offsetTop - (el.clientHeight / 2) + (activeElement.clientHeight / 2);
                                el.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                              }
                            }
                          }
                        }}
                        className="w-full h-full overflow-y-auto overscroll-none no-scrollbar px-6 md:px-12 pb-[50vh]"
                      >
                        {song.lyrics.map((line, i) => {
                          const nextLine = song.lyrics[i + 1];
                          const isLineActive = currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
                          return (
                            <motion.p 
                              key={i}
                              initial={false}
                              animate={{ 
                                scale: isLineActive ? 1.35 : 0.85, 
                                opacity: isLineActive ? 1 : 0.35,
                                y: isLineActive ? -8 : 0,
                                filter: isLineActive ? 'blur(0px)' : 'blur(1px)'
                              }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 350, 
                                damping: 18, 
                                mass: 0.8
                              }}
                              className={`text-center font-serif leading-relaxed md:leading-[2.2] mb-8 md:mb-10 origin-center text-white w-[85%] md:w-[75%] mx-auto text-balance ${
                                isLineActive 
                                  ? 'font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                                  : 'font-normal drop-shadow-sm'
                              } text-xl md:text-4xl`}
                            >
                              {line.text}
                            </motion.p>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Content Details */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col justify-end transition-opacity duration-300" style={{ opacity: showLyrics && isActive ? 0 : 1 }}>
                  <h3 className="text-white font-bold text-xl md:text-4xl tracking-wide drop-shadow-md mb-0.5 truncate">
                    {song.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-3 md:mb-6">
                    <p className="text-white/70 font-sans text-xs md:text-base uppercase tracking-widest truncate">
                      by {song.artist}
                    </p>
                    {song.lyrics && isActive && (
                      <button 
                        onClick={() => setShowLyrics(true)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[10px] tracking-widest uppercase transition-colors"
                      >
                        <Mic2 className="w-3 h-3" />
                        Letra
                      </button>
                    )}
                  </div>
                  
                  {/* Premium Frosted Glass Container */}
                  <div className="bg-white/10 backdrop-blur-[24px] border border-white/20 p-3 md:p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-h-[15vh] overflow-y-auto">
                    <p className="text-white font-serif text-sm md:text-xl italic leading-tight md:leading-relaxed">
                      {song.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Separate Floating Control Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="z-40 mt-4 md:mt-8 w-[95%] md:w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-4 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-4 shrink-0"
      >
        <div className="flex items-center justify-center gap-6 md:gap-12">
          <button 
            onClick={prevSong}
            className="flex flex-col items-center gap-1 md:gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <SkipBack className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest">REGRESAR</span>
          </button>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 md:w-20 md:h-20 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5 md:w-8 md:h-8 fill-current" /> : <Play className="w-5 h-5 md:w-8 md:h-8 fill-current ml-1" />}
          </button>

          <button 
            onClick={nextSong}
            className="flex flex-col items-center gap-1 md:gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <SkipForward className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-widest">SIGUIENTE</span>
          </button>
        </div>

        {/* Controls and Sliders */}
        <div className="w-full flex flex-col gap-4 mt-2 px-1 md:px-8">
          
          {/* Time Slider */}
          <div className="w-full flex items-center justify-center gap-4">
            <span className="text-white/50 text-xs font-mono w-10 text-right">{formatTime(currentTime)}</span>
            <div className="flex-1 w-full max-w-[200px] md:max-w-full overflow-visible">
              <ElasticSlider 
                leftIcon={<Clock className="w-4 h-4 text-white/50" />}
                rightIcon={null}
                startingValue={0}
                defaultValue={currentTime}
                maxValue={duration}
                onChange={handleSeek}
              />
            </div>
            <span className="text-white/50 text-xs font-mono w-10 text-left">{formatTime(duration)}</span>
          </div>

          {/* Volume Control */}
          <div className="w-full flex items-center justify-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className="text-white/50 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="w-[12rem]">
              <ElasticSlider 
                leftIcon={<Volume1 className="w-4 h-4 text-white/50" />}
                rightIcon={<Volume2 className="w-4 h-4 text-white/50" />}
                startingValue={0}
                defaultValue={isMuted ? 0 : volume}
                maxValue={100}
                onChange={(val) => {
                  setVolume(val);
                  if (val > 0) setIsMuted(false);
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Rokola;
