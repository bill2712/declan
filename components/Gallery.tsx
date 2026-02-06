import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { galleryImages } from '../src/data/galleryImages';

const images = galleryImages.map((filename, index) => ({
  url: `/declan/images/gallery/${filename}`,
  type: "Baby Photos",
  desc: `Memory #${index + 1}`
}));

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            layoutId={`image-${idx}`}
            onClick={() => setSelectedImage(img)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.5 }}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer break-inside-avoid"
          >
            <img 
              src={img.url} 
              alt={img.desc} 
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-gold-300 text-[10px] font-bold uppercase tracking-wider mb-1">{img.type}</span>
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