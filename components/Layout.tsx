import React, { useState, useRef, useEffect } from 'react';
import { Page, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Menu, X, Waves, Moon, Sun, Github, Linkedin, Mail, Globe } from 'lucide-react';
import { motion as m, AnimatePresence } from 'framer-motion';

const motion = m as any;

interface NavbarProps {
  activePage: Page;
  setPage: (page: Page) => void;
  isDark: boolean;
  toggleTheme: () => void;
  currentLang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setPage, isDark, toggleTheme, currentLang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: TRANSLATIONS[currentLang].nav.HOME, value: Page.HOME },
    { label: TRANSLATIONS[currentLang].nav.ABOUT, value: Page.ABOUT },
    { label: TRANSLATIONS[currentLang].nav.RESEARCH, value: Page.RESEARCH },
    { label: TRANSLATIONS[currentLang].nav.ARTICLES, value: Page.ARTICLES },
    { label: TRANSLATIONS[currentLang].nav.SOUND, value: Page.SOUND },
    { label: TRANSLATIONS[currentLang].nav.TRAVEL, value: Page.TRAVEL },
    { label: TRANSLATIONS[currentLang].nav.SIMULATION, value: Page.SIMULATION },
    { label: TRANSLATIONS[currentLang].nav.RESOURCES, value: Page.RESOURCES },
    { label: TRANSLATIONS[currentLang].nav.CONTACT, value: Page.CONTACT },
  ];

  const handleNav = (page: Page) => {
    setPage(page);
    setIsOpen(false);
    setLangOpen(false); // Close language menu if open
  };

  const languages: Language[] = ['EN', 'ES', 'FR', 'DE', 'JP', 'HI'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-primary/90 backdrop-blur-sm border-b border-slate-100 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo / Brand - Minimalist Typography */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNav(Page.HOME)}
          >
            <div className="p-1 mr-3 transition-transform group-hover:rotate-180 duration-700">
              <Waves className="w-6 h-6 text-accent" strokeWidth={1.5} />
            </div>
            <span className="font-serif font-bold text-2xl tracking-wide dark:text-white group-hover:text-accent transition-colors">
              DASILA<span className="text-accent">.</span>
            </span>
          </div>

          {/* Desktop Nav - Clean, Uppercase, Spaced */}
          <div className="hidden xl:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 relative py-1 ${
                  activePage === item.value
                    ? 'text-accent'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
                {activePage === item.value && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent" />
                )}
              </button>
            ))}
            
            <div className="h-4 w-px bg-slate-200 dark:bg-white/20 mx-4" />

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-accent transition-colors"
              >
                <Globe className="w-3 h-3" /> {currentLang}
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-32 bg-white dark:bg-dark-paper shadow-xl border border-slate-100 dark:border-white/10 py-2 z-50"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setLang(lang); setLangOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 ${currentLang === lang ? 'text-accent' : 'text-slate-600 dark:text-slate-300'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button
              onClick={toggleTheme}
              className="ml-4 text-slate-400 hover:text-accent transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-accent transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 dark:text-white hover:text-accent transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" strokeWidth={1} /> : <Menu className="w-6 h-6" strokeWidth={1} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden fixed inset-0 top-24 bg-white dark:bg-primary z-40 overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 p-8">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNav(item.value)}
                  className={`text-2xl font-serif font-light ${
                    activePage === item.value
                      ? 'text-accent italic'
                      : 'text-slate-800 dark:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="w-12 h-px bg-slate-200 dark:bg-white/20 my-8" />
              
              {/* Mobile Language Selector */}
              <div className="flex gap-4 flex-wrap justify-center">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLang(lang); setIsOpen(false); }}
                    className={`text-sm uppercase tracking-widest ${currentLang === lang ? 'text-accent border-b border-accent' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-primary border-t border-slate-100 dark:border-white/10 py-16 transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h4 className="font-serif text-xl font-bold dark:text-white mb-2">Dr. Santosh Dasila</h4>
          <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Acoustic Physics Research
          </p>
        </div>
        <div className="flex space-x-8">
          <a href="https://github.com/santoshdasila" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-all duration-300 hover:-translate-y-1">
            <Github className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a href="https://www.linkedin.com/in/santosh-dasila" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-all duration-300 hover:-translate-y-1">
            <Linkedin className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a href="mailto:santosh039@physics.iitm.ac.in" className="text-slate-400 hover:text-accent transition-all duration-300 hover:-translate-y-1">
            <Mail className="w-6 h-6" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};