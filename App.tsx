import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Countdown from './components/Countdown';
import ResourceCard from './components/ResourceCard';
import Heartbeat from './components/Heartbeat';
import Gallery from './components/Gallery';
import BlessingGenerator from './components/BlessingGenerator';
import Journey from './components/Journey';
import { ResourceLink } from './types';
import { Sparkles, Calendar, ArrowDown } from 'lucide-react';
import GrowthChart from './components/GrowthChart';
import SleepMode from './components/SleepMode';
import Dock from './components/Dock';
import { useState } from 'react';

const resources: ResourceLink[] = [
  {
    title: '產前課程',
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
    title: '月子計劃',
    description: '產後修復與護理的完整計劃，確保媽媽與寶寶得到最好的照顧。',
    url: 'https://bill2712.github.io/prenatal-lesson/afterbirth.html',
    icon: 'home'
  }
];

function App() {
  const { scrollY } = useScroll();
  const [isSleepMode, setIsSleepMode] = useState(false);
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen font-sans text-slate-800 overflow-x-hidden bg-[#FDFBF7]">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/declan/images/gallery/IMG_5316.JPG" 
            alt="Baby Declan" 
            className="w-full h-full object-cover opacity-70 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/40 via-[#FDFBF7]/20 to-[#FDFBF7]"></div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           <motion.div 
             animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-10 left-10 w-96 h-96 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
           ></motion.div>
           <motion.div 
             animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute md:top-20 right-10 w-[30rem] h-[30rem] bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
           ></motion.div>
           <motion.div 
             animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
             className="absolute -bottom-8 left-1/3 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
           ></motion.div>
        </div>

        <motion.div 
          style={{ y: y1 }}
          className="z-10 text-center px-4 max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6 text-gold-600 tracking-[0.2em] uppercase text-xs md:text-sm font-bold drop-shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon 2026</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-slate-900 mb-6 tracking-tighter leading-none drop-shadow-xl"
            style={{ textShadow: '0 4px 12px rgba(255,255,255,0.5)' }}
          >
            Declan<span className="text-gold-500 drop-shadow-md">.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-8 drop-shadow"
          ></motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-3xl font-serif text-slate-600 mb-3 drop-shadow-md font-medium"
            style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
          >
            A New Chapter Begins
          </motion.p>
          
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1 }}
             className="text-gold-600/80 italic font-serif text-lg md:text-xl drop-shadow-sm"
          >
             Bill Tsang & Cher Leung
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 drop-shadow-lg"
          >
            <Countdown />
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-400"
        >
           <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Intro Quote */}
      <section className="py-32 px-4 bg-white relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Calendar className="w-12 h-12 text-gold-300 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 leading-tight mb-8">
            "Every child begins the world again."
          </h2>
          <p className="text-gold-600 font-serif tracking-widest text-sm uppercase">— Henry David Thoreau</p>
          <div className="mt-12 space-y-6 text-lg text-slate-600 leading-loose font-light font-serif">
            <p>
              我們懷著無比興奮的心情，期待著 2026 年 2 月 20 日的到來。
            </p>
            <p>
              這裡是我們為 small Declan 準備的小小天地，記錄著我們從二人世界走向三口之家的珍貴旅程。
            </p>
          </div>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-32 px-4 bg-[#FDFBF7]">
        <div className="text-center mb-24">
          <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">Milestones</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-slate-900">我們的旅程</h2>
        </div>
        <Journey />
      </section>

      {/* Resources Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">Preparation</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-slate-900">育兒寶典與計劃</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {resources.map((res, index) => (
              <ResourceCard key={index} resource={res} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Growth Chart */}
      <section id="growth" className="py-32 px-4 bg-white">
        <GrowthChart />
      </section>

      {/* Heartbeat & Gallery */}
      <section id="memories" className="py-32 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">Memories</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-slate-900">珍貴時刻</h2>
          </div>
          
          <Heartbeat />
          
          <div className="mt-24">
            <Gallery />
          </div>
        </div>
      </section>

      {/* Blessing Generator */}
      <section id="wishes" className="py-32 px-4 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">Wishes</span>
             <h2 className="text-4xl md:text-5xl font-serif mt-4 text-slate-900">送上祝福</h2>
          </div>
          <BlessingGenerator />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 text-center pb-32">
        <h3 className="font-serif text-2xl text-gold-100 mb-6 tracking-wide">Declan Tsang</h3>
        <div className="flex justify-center gap-6 mb-8 text-gold-400/60">
           {/* Social Icons could go here */}
        </div>
        <p className="text-xs tracking-widest uppercase opacity-40">
          Made with love by Bill & Cher<br />
          Est. 2026
        </p>
      </footer>

      {/* Navigation Dock */}
      <Dock onSleepClick={() => setIsSleepMode(true)} />

      {/* Floating Elements */}
      <SleepMode isOpen={isSleepMode} onClose={() => setIsSleepMode(false)} />
    </div>
  );
}

export default App;