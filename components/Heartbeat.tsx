import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tracks = [
  { title: "Heartbeat Recording 1", file: "Inlet Birth.m4a" },
  { title: "Heartbeat Recording 2", file: "Inlet Birth 2.m4a" },
  { title: "Heartbeat Recording 3", file: "Inlet Birth 3.m4a" },
  { title: "Heartbeat Recording 4", file: "Inlet Birth 4.m4a" },
  { title: "Heartbeat Recording 5", file: "Inlet Birth 5.m4a" },
  { title: "Heartbeat Recording 6", file: "Inlet Birth 6.m4a" },
  { title: "Heartbeat Recording 7", file: "Inlet Birth 7.m4a" },
  { title: "Heartbeat Recording 8", file: "Inlet Birth 8.m4a" },
];

const Heartbeat: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (index: number) => {
    if (currentTrackIndex === index) {
      togglePlay();
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto my-12 flex flex-col md:flex-row">
      {/* Left Interface - Visualizer & Main Control */}
      <div className="md:w-5/12 bg-slate-50 p-8 flex flex-col items-center justify-center border-r border-slate-100">
        <div className="relative mb-8">
           <motion.div
            animate={{ scale: isPlaying ? [1, 1.15, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
           >
             <Heart className={`w-14 h-14 ${isPlaying ? 'text-rose-500 fill-rose-500' : 'text-rose-300'}`} />
           </motion.div>
           {isPlaying && (
             <div className="absolute inset-0 rounded-full border border-rose-200 animate-ping opacity-75"></div>
           )}
        </div>

        <h3 className="text-xl font-serif font-bold text-slate-800 mb-1 text-center">{currentTrack.title}</h3>
        <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mb-6">Now Playing</p>

        <div className="flex items-center gap-2 mb-6 h-8">
           {[...Array(12)].map((_, i) => (
             <motion.div
                key={i}
                className="w-1.5 bg-rose-400 rounded-full"
                animate={{ height: isPlaying ? [10 + Math.random() * 20, 15 + Math.random() * 10, 10] : 6 }}
                transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                style={{ height: '6px' }}
             />
           ))}
        </div>

        <button 
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
      </div>

      {/* Right Interface - Playlist */}
      <div className="flex-1 p-6 md:p-8 bg-white overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <Volume2 className="w-4 h-4 text-gold-500" />
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Select Recording</h4>
        </div>
        
        <div className="space-y-3">
          {tracks.map((track, idx) => (
            <div 
              key={idx}
              onClick={() => selectTrack(idx)}
              className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                currentTrackIndex === idx 
                  ? 'bg-gold-50 border-gold-200 shadow-sm' 
                  : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentTrackIndex === idx ? 'bg-gold-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  {currentTrackIndex === idx && isPlaying ? (
                    <motion.div
                      animate={{ height: [4, 12, 4] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-1 bg-white mx-[1px]"
                    />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div>
                   <p className={`font-serif text-base ${currentTrackIndex === idx ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                     {track.title}
                   </p>
                   {currentTrackIndex === idx && (
                     <p className="text-[10px] text-gold-600 font-bold uppercase tracking-wider mt-0.5">Playing</p>
                   )}
                </div>
              </div>
              
              {currentTrackIndex === idx && (
                <div className="text-gold-500">
                  <Volume2 className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={`/declan/audio/${currentTrack.file}`}
        onEnded={() => setIsPlaying(false)}
        className="hidden" 
      />
    </div>
  );
};

export default Heartbeat;