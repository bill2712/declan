import React, { useState, useRef } from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Heartbeat: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // In a real scenario, you would import a local mp3 file.
  // Since we don't have one, we use a placeholder logic.
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // audioRef.current.play(); // Commented out to prevent errors with missing file
        // Simulating play for UI demonstration
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-2xl mx-auto my-12">
      <div className="p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative shrink-0">
           <motion.div
            animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center border-2 border-rose-100"
           >
             <Heart className={`w-10 h-10 ${isPlaying ? 'text-rose-500 fill-rose-500' : 'text-rose-300'}`} />
           </motion.div>
        </div>

        <div className="flex-1 w-full text-center md:text-left">
          <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">寶寶的心跳聲</h3>
          <p className="text-slate-500 mb-6">第一次聽到這強而有力的節奏，是我們生命中最感動的時刻。</p>
          
          <div className="bg-slate-50 rounded-lg p-4 flex items-center gap-4 border border-slate-200">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gold-500 text-white flex items-center justify-center hover:bg-gold-600 transition-colors shadow-md"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            
            <div className="flex-1 h-8 flex items-center gap-1 overflow-hidden">
               {/* Visualizer bars */}
               {[...Array(20)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="w-1.5 bg-gold-300 rounded-full"
                    animate={{ height: isPlaying ? [10 + Math.random() * 20, 20 + Math.random() * 10, 10] : 8 }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                    style={{ height: '8px' }}
                 />
               ))}
            </div>
            <span className="text-xs text-slate-400 font-mono">152 BPM</span>
          </div>
          <audio ref={audioRef} loop className="hidden">
             {/* Replace src with actual audio file */}
             <source src="" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default Heartbeat;