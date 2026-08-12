import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, X, Play, Pause, SkipBack, SkipForward, 
  Search, Volume2, VolumeX, Volume1, Clock, Mic2, ListMusic, ExternalLink
} from 'lucide-react';
import { initialSongs as songs, getSpotifyUrl, getAppleMusicUrl } from '../assets/songs';
import ElasticSlider from './ElasticSlider';

const Rokola = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [platformModalSong, setPlatformModalSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Audio state
  const audioRef = React.useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(25);
  const [isMuted, setIsMuted] = useState(false);

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

  React.useEffect(() => {
    if (showPlaylistModal) {
      setTimeout(() => {
        const el = document.getElementById('current-playlist-song');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  }, [showPlaylistModal]);

  // Fallback if no songs
  if (!songs || songs.length === 0) {
    return <div className="text-white flex items-center justify-center min-h-[100dvh]">Cargando canciones...</div>;
  }

  const currentSong = songs[currentIndex];

  const filteredSongs = songs
    .map((song, idx) => ({ song, originalIndex: idx }))
    .filter(({ song }) => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (song.note && song.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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

      {/* Floating Side Icons */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 hidden md:flex">
        <button 
          onClick={() => setShowPlaylistModal(true)}
          title="Ver Lista de Canciones"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md transition-all"
        >
          <ListMusic className="w-5 h-5" />
        </button>
      </div>

      {/* Global Header Panel */}
      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/15 px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg z-50">
        <button onClick={onBack} className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div 
          onClick={() => setShowPlaylistModal(true)}
          className="flex flex-col items-center justify-center text-center px-4 overflow-hidden relative min-w-[200px] h-10 cursor-pointer group"
          title="Abrir Lista de Canciones"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <span className="text-white/90 text-xs md:text-sm font-bold tracking-[0.2em] truncate w-full max-w-[200px] md:max-w-[300px] group-hover:text-purple-300 transition-colors">
                {currentSong.title}
              </span>
              <span className="text-[10px] md:text-xs text-white/60 mt-0.5 tracking-widest font-mono flex items-center gap-1">
                <ListMusic className="w-3 h-3 inline" /> {currentIndex + 1} / {songs.length}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <button 
          onClick={() => setPlatformModalSong(currentSong)} 
          className="text-white/80 hover:text-white transition-colors flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/15"
          title="Abrir en Spotify o Apple Music"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden md:inline font-mono">Abrir en...</span>
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
                {/* Background Pattern */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${song.cover})` }}
                />
                
                {/* Glassmorphism Overlay */}
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
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-white font-bold text-xl md:text-4xl tracking-wide drop-shadow-md truncate">
                      {song.title}
                    </h3>

                    {/* Single Platform Link Trigger */}
                    {isActive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlatformModalSong(song);
                        }}
                        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0"
                        title="Abrir en Spotify o Apple Music"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#b088f9]" />
                        <span className="hidden sm:inline">Abrir en...</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3 md:mb-6">
                    <p className="text-white/70 font-sans text-xs md:text-base uppercase tracking-widest truncate">
                      by {song.artist}
                    </p>
                    {song.lyrics && song.lyrics.length > 0 && isActive && (
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

      {/* Floating Control Bar */}
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

      {/* Clean Playlist Search Modal */}
      <AnimatePresence>
        {showPlaylistModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex flex-col items-center justify-start pt-16 md:pt-20 pb-8 px-4"
          >
            <div className="w-full max-w-3xl flex items-center justify-between bg-white/10 border border-white/20 px-6 py-4 rounded-2xl mb-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ListMusic className="w-6 h-6 text-purple-400" />
                <div>
                  <h2 className="text-white text-xl md:text-2xl font-bold font-sans">
                    Tu Playlist ({songs.length} canciones)
                  </h2>
                  <p className="text-xs text-white/50 font-mono">
                    Selecciona una canción para reproducirla
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowPlaylistModal(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="w-full max-w-3xl mb-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Buscar canción o artista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 backdrop-blur-md transition-colors"
              />
            </div>

            {/* Clean Song List */}
            <div className="w-full max-w-3xl flex-1 overflow-y-auto pr-1 no-scrollbar space-y-3">
              {filteredSongs.map(({ song, originalIndex }) => {
                const isCurrent = originalIndex === currentIndex;
                return (
                  <div
                    key={song.id || originalIndex}
                    id={isCurrent ? "current-playlist-song" : undefined}
                    onClick={() => {
                      setCurrentIndex(originalIndex);
                      setIsPlaying(true);
                      setShowPlaylistModal(false);
                    }}
                    className={`flex items-center gap-4 p-3 md:p-4 rounded-xl border transition-all cursor-pointer group ${
                      isCurrent
                        ? 'bg-purple-600/30 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'bg-white/5 hover:bg-white/15 border-white/10'
                    }`}
                  >
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover shadow-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-bold text-sm md:text-base truncate group-hover:text-purple-300 transition-colors">
                          {song.title}
                        </h4>
                        {song.date === '2026-08-11T00:00:00Z' && !isCurrent && (
                          <span className="bg-red-500 text-white text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full shrink-0 shadow-sm border border-red-400">
                            Nueva
                          </span>
                        )}
                        {isCurrent && (
                          <span className="bg-purple-500 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full shrink-0">
                            En reproducción
                          </span>
                        )}
                      </div>
                      <p className="text-white/60 text-xs md:text-sm truncate">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Chooser Modal (Single clean location) */}
      <AnimatePresence>
        {platformModalSong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setPlatformModalSong(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#121118] border border-white/20 p-6 md:p-8 rounded-3xl max-w-md w-full shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPlatformModalSong(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 border border-white/20 shadow-xl">
                <img src={platformModalSong.cover} alt={platformModalSong.title} className="w-full h-full object-cover" />
              </div>

              <h3 className="text-white font-bold text-xl md:text-2xl mb-1">
                {platformModalSong.title}
              </h3>
              <p className="text-white/60 font-sans text-sm mb-6">
                {platformModalSong.artist}
              </p>

              <p className="text-xs font-mono text-[#c8a2c8] uppercase tracking-widest mb-4 font-bold">
                Abrir en tu plataforma:
              </p>

              <div className="space-y-3">
                <a
                  href={getSpotifyUrl(platformModalSong)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold font-sans flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(29,185,84,0.3)] transition-all hover:scale-[1.02]"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>

                <a
                  href={getAppleMusicUrl(platformModalSong)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FA243C] to-[#fc3c52] hover:from-[#fc3c52] hover:to-[#ff5267] text-white font-bold font-sans flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(250,36,60,0.3)] transition-all hover:scale-[1.02]"
                >
                  <span>Apple Music</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Rokola;
