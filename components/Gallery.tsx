import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  {
    url: "https://picsum.photos/800/800?random=1",
    type: "超聲波照片",
    desc: "12週 - 初次見面"
  },
  {
    url: "https://picsum.photos/600/800?random=2",
    type: "生活照",
    desc: "準備好的小床"
  },
  {
    url: "https://picsum.photos/800/600?random=3",
    type: "超聲波照片",
    desc: "20週 - 看到小手了"
  },
  {
    url: "https://picsum.photos/600/900?random=4",
    type: "生活照",
    desc: "爸爸媽媽的期待"
  }
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            layoutId={`image-${idx}`}
            onClick={() => setSelectedImage(img)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative group overflow-hidden rounded-xl shadow-lg cursor-pointer ${
              idx % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
            }`}
          >
            <img 
              src={img.url} 
              alt={img.desc} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-gold-300 text-[10px] font-bold uppercase tracking-wider mb-1">{img.type}</span>
              <p className="text-white font-serif text-lg leading-tight">{img.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button 
              className="absolute top-4 right-4 text-white/50 hover:text-white p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              layoutId={`image-${images.indexOf(selectedImage)}`}
              src={selectedImage.url}
              alt={selectedImage.desc}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="absolute bottom-8 left-0 right-0 text-center text-white"
             >
                <p className="font-serif text-2xl mb-1">{selectedImage.desc}</p>
                <span className="text-sm text-gold-400 uppercase tracking-widest">{selectedImage.type}</span>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;