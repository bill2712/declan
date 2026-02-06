import React, { useState } from 'react';
import { generateFancyBlessing } from '../services/geminiService';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BlessingGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [generatedBlessing, setGeneratedBlessing] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsLoading(true);
    setGeneratedBlessing('');
    
    const result = await generateFancyBlessing({ senderName: name, relationship, message });
    setGeneratedBlessing(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gold-100">
      <div className="bg-gold-50 p-6 border-b border-gold-100 text-center">
        <Sparkles className="w-8 h-8 text-gold-500 mx-auto mb-2" />
        <h3 className="text-2xl font-serif font-bold text-slate-800">為 Declan 送上祝福</h3>
        <p className="text-slate-600 text-sm mt-2">寫下簡單的祝願，讓 AI 為您譜寫一段優美的祝福語。</p>
      </div>

      <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10">
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">您的名字</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
              placeholder="例如：Uncle Tom"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">與寶寶的關係 (可選)</label>
            <input 
              type="text" 
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
              placeholder="例如：表姨"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">簡單祝願</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all h-24 resize-none"
              placeholder="例如：希望他快高長大，聰明伶俐..."
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-gold-50 py-3 rounded-lg font-medium hover:bg-gold-600 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {isLoading ? '撰寫中...' : '生成華麗祝福'}
          </button>
        </form>

        <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col justify-center items-center text-center min-h-[200px]">
          {generatedBlessing ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="w-10 h-1 bg-gold-400 mx-auto rounded-full mb-4"></div>
              <p className="font-serif text-lg leading-loose text-slate-800 whitespace-pre-line">
                {generatedBlessing}
              </p>
              <div className="text-right mt-6">
                <span className="text-sm text-gold-600 font-serif">— {name}</span>
              </div>
            </motion.div>
          ) : (
            <div className="text-slate-400 text-sm">
              <p>祝福語將會顯示在這裡...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlessingGenerator;