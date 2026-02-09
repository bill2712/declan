import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid } from 'lucide-react';

import { albums } from '../src/data/galleryImages';
import Skeleton from './Skeleton';

const ImageWithSkeleton = ({ src, alt, type }: { src: string, alt: string, type: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
           <Skeleton />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="text-gold-300 text-[10px] font-bold uppercase tracking-wider mb-1">{type}</span>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; type: string; desc: string } | null>(null);
  const [activeAlbumId, setActiveAlbumId] = useState('all');

  const activeAlbum = albums.find(a => a.id === activeAlbumId) || albums[0];
  const images = activeAlbum.images.map((filename, index) => ({
    url: `/images/gallery/${filename}`,
    type: activeAlbum.title,
    desc: `Photo ${index + 1}`
  }));

  return (
    <>
      {/* Album Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => setActiveAlbumId(album.id)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              activeAlbumId === album.id
                ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg scale-105'
                : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-slate-200'
            }`}
          >
            {album.title}
          </button>
        ))}
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            layoutId={`image-${idx}`}
            onClick={() => setSelectedImage(img)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer break-inside-avoid"
          >
            <ImageWithSkeleton src={img.url} alt={img.desc} type={img.type} />
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