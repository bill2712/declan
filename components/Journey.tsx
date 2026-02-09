import React from "react";
import { motion } from "framer-motion";
import { Calendar, Baby, Heart, Camera, Gift, Star } from "lucide-react";

const milestones = [
  {
    date: "2025-06-15",
    title: "The Big Surprise",
    description:
      "The moment our world changed forever. Two lines that meant everything.",
    icon: Heart,
  },
  {
    date: "2025-08-10",
    title: "First Heartbeat",
    description: "Listening to the rhythm of life. Strong and steady.",
    icon: React.forwardRef((props, ref) => (
      <Heart className="text-rose-500 fill-rose-500" {...props} />
    )),
  },
  {
    date: "2025-09-05",
    title: "12-Week Scan",
    description: "First glimpse of our little one wiggling around.",
    icon: Camera,
  },
  {
    date: "2025-10-20",
    title: "It's a Boy!",
    description: "We can't wait to meet you, Declan.",
    icon: Baby,
  },
  {
    date: "2026-02-20",
    title: "Due Date",
    description: "The day our greatest adventure begins.",
    icon: Star,
  },
];

const Journey: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="relative border-l-2 border-gold-200 ml-4 md:ml-1/2 space-y-12 md:space-y-0">
        {milestones.map((milestone, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.2, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-white shadow-sm z-10"></div>

              {/* Content Side */}
              <div
                className={`w-full md:w-1/2 pl-8 md:pl-0 ${
                  isEven ? "md:pl-12 text-left" : "md:pr-12 md:text-right"
                } mb-8 md:mb-0`}
              >
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div
                    className={`flex items-center gap-3 mb-2 ${
                      isEven ? "" : "md:flex-row-reverse md:justify-start"
                    }`}
                  >
                    <milestone.icon className="w-5 h-5 text-gold-500" />
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {milestone.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Empty Side for Desktop Layout */}
              <div className="hidden md:block w-1/2"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Journey;
