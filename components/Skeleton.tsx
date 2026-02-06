import React from 'react';
import { motion } from 'framer-motion';

const Skeleton: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[200px] bg-slate-200 rounded-xl overflow-hidden relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default Skeleton;
