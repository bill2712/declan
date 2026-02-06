import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    url: "https://picsum.photos/600/600?random=1",
    type: "超聲波照片",
    desc: "12週 - 初次見面"
  },
  {
    url: "https://picsum.photos/600/800?random=2",
    type: "生活照",
    desc: "準備好的小床"
  },
  {
    url: "https://picsum.photos/600/500?random=3",
    type: "超聲波照片",
    desc: "20週 - 看到小手了"
  },
  {
    url: "https://picsum.photos/600/700?random=4",
    type: "生活照",
    desc: "爸爸媽媽的期待"
  }
];

const Gallery: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
        >
          <img 
            src={img.url} 
            alt={img.desc} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-gold-300 text-xs font-bold uppercase tracking-wider mb-1">{img.type}</span>
            <p className="text-white font-serif text-xl">{img.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;