import React, { useState, useRef, useEffect } from 'react';
import { Moon, Volume2, VolumeX, X, Play, Pause, Wind, CloudRain, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sounds = [
  { id: 'white_noise', name: 'White Noise', icon: Wind, file: '/declan/audio/sleep/white_noise.mp3' },
  { id: 'rain', name: 'Rain', icon: CloudRain, file: '/declan/audio/sleep/rain.mp3' },
  { id: 'lullaby', name: 'Lullaby', icon: Music, file: '/declan/audio/sleep/lullaby.mp3' },
];

interface SleepModeProps {
  isOpen: boolean;
  onClose: () => void;
}

const SleepMode: React.FC<SleepModeProps> = ({ isOpen, onClose }) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle audio playback
  useEffect(() => {
    if (activeSound) {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
      }
      
      const sound = sounds.find(s => s.id === activeSound);
      if (sound && audioRef.current.src !== window.location.origin + sound.file) {
        audioRef.current.src = sound.file;
        audioRef.current.load();
      }

      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio playback failed (interaction needed):", e));
      } else {
        audioRef.current.pause();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [activeSound, isPlaying]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Close handler: Stop audio and call parent close
  const handleClose = () => {
    setIsPlaying(false);
    if (audioRef.current) {
        audioRef.current.pause();
    }
    onClose();
  };

  const toggleSound = (id: string) => {
    if (activeSound === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSound(id);
      setIsPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black text-slate-400 flex flex-col items-center justify-center p-6"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-4 rounded-full bg-gray-900 text-gray-500 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="text-center max-w-md w-full">
            <Moon size={64} className="text-indigo-500 mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl font-serif text-gray-200 mb-2 tracking-wide">Sleep Mode</h2>
            <p className="text-gray-600 mb-12">Low light. Soothing sounds.</p>

              {/* Sound Controls */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {sounds.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 ${
                      activeSound === sound.id 
                        ? 'bg-indigo-900/40 text-indigo-300 ring-2 ring-indigo-500/50' 
                        : 'bg-gray-900/50 text-gray-500 hover:bg-gray-800'
                    }`}
                  >
                    <sound.icon size={32} className="mb-3" />
                    <span className="text-sm font-medium">{sound.name}</span>
                    {activeSound === sound.id && (
                      <div className="mt-2 text-xs font-bold animate-pulse">
                        {isPlaying ? 'PLAYING' : 'PAUSED'}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Player Controls (visible if sound selected) */}
              {activeSound && (
                <div className="bg-gray-900/80 rounded-2xl p-6 w-full backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-4 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors"
                    >
                      {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>
                    
                    <div className="flex-1 mx-6">
                      <div className="flex items-center gap-3 text-gray-500">
                        <VolumeX size={16} />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-full accent-indigo-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SleepMode;
