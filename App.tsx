import React from 'react';
import { motion } from 'framer-motion';
import Countdown from './components/Countdown';
import ResourceCard from './components/ResourceCard';
import Heartbeat from './components/Heartbeat';
import Gallery from './components/Gallery';
import BlessingGenerator from './components/BlessingGenerator';
import { ResourceLink } from './types';
import { Sparkles, Calendar } from 'lucide-react';

const resources: ResourceLink[] = [
  {
    title: '產前課程終極詳盡實錄',
    description: '記錄了我們學習的點點滴滴，為迎接新生命做好最充足的準備。',
    url: 'https://bill2712.github.io/prenatal-lesson/index.html',
    icon: 'book'
  },
  {
    title: 'Nursing Tracker',
    description: '詳細的護理記錄，追蹤寶寶成長的每一個細節與數據。',
    url: 'https://bill2712.github.io/nursing-tracker/',
    icon: 'baby'
  },
  {
    title: 'Burnaby 月子計劃',
    description: '產後修復與護理的完整計劃，確保媽媽與寶寶得到最好的照顧。',
    url: 'https://bill2712.github.io/prenatal-lesson/afterbirth.html',
    icon: 'home'
  }
];

function App() {
  return (
    <div className="min-h-screen font-sans text-slate-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute top-10 right-10 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center px-4"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-gold-600 tracking-widest uppercase text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 mb-6 tracking-tight">
            Declan Tsang
          </h1>
          <div className="h-px w-24 bg-gold-400 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-serif text-slate-600 mb-2">
            Bill Tsang & Cher Leung
          </p>
          <p className="text-slate-400 italic">
            Eagerly awaiting our first miracle
          </p>
          
          <div className="mt-12">
            <Countdown />
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="py-24 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <Calendar className="w-10 h-10 text-gold-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 leading-snug">
            "Every child begins the world again."
          </h2>
          <p className="mt-4 text-slate-500 font-serif">— Henry David Thoreau</p>
          <p className="mt-8 text-lg text-slate-600 leading-relaxed">
            我們懷著無比興奮的心情，期待著 2026 年 2 月 20 日的到來。
            這裡是我們為 Declan 準備的小小天地，記錄著我們成為父母的旅程。
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 font-bold tracking-wider text-sm uppercase">Preparation</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 text-slate-900">育兒寶典與計劃</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((res, index) => (
              <ResourceCard key={index} resource={res} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Heartbeat & Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-bold tracking-wider text-sm uppercase">Memories</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 text-slate-900">珍貴時刻</h2>
          </div>
          
          <Heartbeat />
          
          <div className="mt-16">
            <Gallery />
          </div>
        </div>
      </section>

      {/* Blessing Generator */}
      <section className="py-24 px-4 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
             <span className="text-gold-500 font-bold tracking-wider text-sm uppercase">Wishes</span>
             <h2 className="text-3xl md:text-4xl font-serif mt-2 text-slate-900">送上祝福</h2>
          </div>
          <BlessingGenerator />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 text-center">
        <p className="font-serif text-lg text-gold-100 mb-2">Declan Tsang</p>
        <p className="text-sm opacity-60">
          Made with love by Bill & Cher<br />
          Est. 2026
        </p>
      </footer>
    </div>
  );
}

export default App;