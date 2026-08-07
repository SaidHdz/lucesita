import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, X, Play, Pause, SkipBack, SkipForward, 
  Link, Heart, Maximize2, Search, Volume2, VolumeX, Volume1, Clock, Mic2, ListMusic
} from 'lucide-react';
import { initialSongs as songs } from '../assets/songs';
import ElasticSlider from './ElasticSlider';

const Rokola = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const filteredSongs = songs
    .map((song, idx) => ({ song, originalIndex: idx }))
    .filter(({ song }) => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (song.note && song.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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
        <button 
          onClick={() => setShowPlaylistModal(true)}
          title="Ver Lista"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md transition-all"
        >
          <ListMusic className="w-5 h-5" />
        </button>
      </div>
      
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 hidden md:flex">
        <button 
          onClick={() => setShowPlaylistModal(true)}
          title="Buscar Canción"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md transition-all"
        >
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
        <button onClick={() => setShowPlaylistModal(true)} className="text-white/80 hover:text-white transition-colors flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/15">
          <ListMusic className="w-4 h-4" />
          <span className="hidden md:inline font-mono">Lista</span>
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

      {/* Playlist / Search Modal Overlay */}
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
                  <a 
                    href="https://open.spotify.com/playlist/6mbZyMOGASvK2iEVTnV9sI?si=jhl-I9WpSV-Zw4axCCJ80Q"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-green-400 hover:text-green-300 font-mono flex items-center gap-1 mt-1 transition-colors"
                  >
                    <Link className="w-3.5 h-3.5" /> Abrir Playlist Completa en Spotify ↗
                  </a>
                </div>
              </div>
              <button 
                onClick={() => setShowPlaylistModal(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input & Spotify Direct Banner */}
            <div className="w-full max-w-3xl flex flex-col md:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Buscar canción o artista..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 backdrop-blur-md transition-colors"
                />
              </div>
              <a
                href="https://open.spotify.com/playlist/6mbZyMOGASvK2iEVTnV9sI?si=jhl-I9WpSV-Zw4axCCJ80Q"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600/30 hover:bg-green-600/50 border border-green-500/40 text-green-300 font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm backdrop-blur-md transition-all shrink-0"
              >
                <ListMusic className="w-4 h-4" />
                <span>Spotify Playlist ↗</span>
              </a>
            </div>

            {/* Song List */}
            <div className="w-full max-w-3xl flex-1 overflow-y-auto pr-1 no-scrollbar space-y-3">
              {filteredSongs.map(({ song, originalIndex }) => {
                const isCurrent = originalIndex === currentIndex;
                return (
                  <div
                    key={song.id || originalIndex}
                    onClick={() => {
                      setCurrentIndex(originalIndex);
                      setIsPlaying(true);
                      setShowPlaylistModal(false);
                    }}
                    className={`flex items-center gap-4 p-3 md:p-4 rounded-xl border transition-all cursor-pointer ${
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
                        <h4 className="text-white font-bold text-sm md:text-base truncate">
                          {song.title}
                        </h4>
                        {isCurrent && (
                          <span className="bg-purple-500 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full shrink-0">
                            En reproducción
                          </span>
                        )}
                      </div>
                      <p className="text-white/60 text-xs md:text-sm truncate">
                        {song.artist}
                      </p>
                      {song.note && (
                        <p className="text-white/40 font-serif italic text-xs truncate mt-0.5">
                          "{song.note}"
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Special Item #50: Link to Spotify Playlist */}
              <a
                href="https://open.spotify.com/playlist/6mbZyMOGASvK2iEVTnV9sI?si=jhl-I9WpSV-Zw4axCCJ80Q"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-green-500/50 bg-green-950/40 hover:bg-green-900/50 transition-all cursor-pointer shadow-[0_0_25px_rgba(34,197,94,0.2)] mt-4"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0">
                  <ListMusic className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-green-300 font-bold text-base md:text-lg flex items-center gap-2">
                    50. Abrir Playlist Completa en Spotify ↗
                  </h4>
                  <p className="text-white/70 text-xs md:text-sm">
                    Haz clic aquí para abrir y guardar la playlist directamente en Spotify
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Rokola;
