import React from 'react';
import { Page, Language } from '../types';
import { HERO_TAGLINE, TRANSLATIONS } from '../constants';
import { ArrowRight, Activity, BookOpen, Globe } from 'lucide-react';
import { motion as m } from 'framer-motion';

const motion = m as any;

interface HomeProps {
  setPage: (page: Page) => void;
  lang: Language;
}

export const Home: React.FC<HomeProps> = ({ setPage, lang }) => {
  const t = TRANSLATIONS[lang];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pt-20 lg:pb-48 relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1200px] mx-auto text-center z-10"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
           <span className="h-px w-12 bg-accent"></span>
           <span className="text-accent font-sans text-xs uppercase tracking-[0.3em] font-semibold">
             Ph.D. Acoustic Physics
           </span>
           <span className="h-px w-12 bg-accent"></span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-8 text-slate-900 dark:text-white leading-[0.9]">
          Santosh<br/>
          <span className="text-slate-400 dark:text-slate-600 italic">Dasila</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed font-sans">
          {HERO_TAGLINE}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => setPage(Page.ABOUT)}
            className="px-10 py-4 bg-primary dark:bg-white text-white dark:text-primary text-xs uppercase tracking-[0.2em] hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all duration-300"
          >
            {t.nav.ABOUT}
          </button>
          
          <button 
            onClick={() => setPage(Page.RESEARCH)}
            className="px-10 py-4 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-all duration-300"
          >
            {t.nav.RESEARCH}
          </button>
        </motion.div>
      </motion.div>

      {/* Quick Access Cards - Minimalist Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 hidden lg:grid grid-cols-3 border-t border-slate-100 dark:border-white/5"
      >
        {[
          { icon: <Activity className="w-5 h-5"/>, title: t.headings.sound, desc: "Interactive Generator", page: Page.SOUND },
          { icon: <BookOpen className="w-5 h-5"/>, title: t.headings.publications, desc: "Recent Research", page: Page.RESEARCH },
          { icon: <Globe className="w-5 h-5"/>, title: t.headings.travel, desc: "Global Journey", page: Page.TRAVEL },
        ].map((card, idx) => (
          <div 
            key={idx}
            onClick={() => setPage(card.page)}
            className={`
              p-12 cursor-pointer group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-500
              ${idx !== 2 ? 'border-r border-slate-100 dark:border-white/5' : ''}
            `}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="text-slate-400 group-hover:text-accent transition-colors duration-500">
                {card.icon}
              </div>
              <div>
                <h3 className="text-sm font-serif font-bold text-slate-900 dark:text-white mb-1 group-hover:text-accent transition-colors">{card.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};