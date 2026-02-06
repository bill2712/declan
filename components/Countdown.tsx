import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const DUE_DATE = new Date('2026-02-20T00:00:00').getTime();

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = DUE_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-3 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center border border-gold-200">
        <span className="text-xl md:text-3xl font-serif text-gold-600 font-bold">{value}</span>
      </div>
      <span className="text-xs md:text-sm mt-2 text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="flex items-center space-x-2 text-gold-500 mb-6">
        <Clock className="w-5 h-5" />
        <span className="text-lg font-serif tracking-widest">距離預產期 2026.02.20</span>
      </div>
      <div className="flex flex-wrap justify-center">
        <TimeBox value={timeLeft.days} label="天" />
        <TimeBox value={timeLeft.hours} label="小時" />
        <TimeBox value={timeLeft.minutes} label="分鐘" />
        <TimeBox value={timeLeft.seconds} label="秒" />
      </div>
    </div>
  );
};

export default Countdown;