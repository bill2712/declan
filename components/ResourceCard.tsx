import React from 'react';
import { ResourceLink } from '../types';
import { BookOpen, Baby, Home, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ResourceCard: React.FC<{ resource: ResourceLink; index: number }> = ({ resource, index }) => {
  const IconMap = {
    book: BookOpen,
    baby: Baby,
    home: Home
  };
  const Icon = IconMap[resource.icon];

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl shadow-md border border-slate-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:border-gold-200"
    >
      <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
        <Icon className="w-8 h-8 text-gold-500" />
      </div>
      <h3 className="text-xl font-serif font-semibold text-slate-800 mb-2">{resource.title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">
        {resource.description}
      </p>
      <div className="mt-auto flex items-center text-gold-600 font-medium text-sm group-hover:text-gold-500">
        <span>瀏覽詳情</span>
        <ExternalLink className="w-4 h-4 ml-1" />
      </div>
    </motion.a>
  );
};

export default ResourceCard;