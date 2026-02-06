import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, LineChart, Moon, Sparkles } from 'lucide-react';

interface DockProps {
  onSleepClick: () => void;
}

const Dock: React.FC<DockProps> = ({ onSleepClick }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = [
    { id: 'hero', icon: Home, label: 'Home', action: () => scrollToSection('hero') },
    { id: 'growth', icon: LineChart, label: 'Growth', action: () => scrollToSection('growth') },
    { id: 'memories', icon: Heart, label: 'Memories', action: () => scrollToSection('memories') },
    { id: 'wishes', icon: Sparkles, label: 'Wishes', action: () => scrollToSection('wishes') },
    { id: 'sleep', icon: Moon, label: 'Sleep', action: onSleepClick },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
        className="flex items-end gap-2 px-4 py-3 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl shadow-slate-200/50"
      >
        {items.map((item) => (
          <DockItem key={item.id} icon={item.icon} label={item.label} onClick={item.action} />
        ))}
      </motion.div>
    </div>
  );
};

const DockItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2, y: -5 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="relative group p-3 rounded-xl hover:bg-white/50 transition-colors"
    >
      <Icon size={24} className="text-slate-600 group-hover:text-gold-500 transition-colors" strokeWidth={2} />
      
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.button>
  );
};

export default Dock;
