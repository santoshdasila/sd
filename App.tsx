import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import { WaveBackground } from './components/Visuals';
import { Home } from './pages/Home';
import { SoundLab } from './pages/SoundLab';
import { About, Research, Articles, Travel, Simulation, Resources, Contact, LightboxItem } from './pages/GeneralPages';
import { Page, Language } from './types';
import { AnimatePresence, motion as m } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const motion = m as any;

const App: React.FC = () => {
  // Initialize state based on URL hash to persist page on refresh
  const getInitialPage = (): Page => {
    const hash = window.location.hash.replace('#', '').toUpperCase();
    // Check if the hash matches a valid Page enum key
    if (Object.values(Page).includes(hash as Page)) {
      return hash as Page;
    }
    return Page.HOME;
  };

  const [activePage, setActivePage] = useState<Page>(getInitialPage);
  const [resetKey, setResetKey] = useState(0);
  
  // Initialize Theme from LocalStorage
  const [isDark, setIsDark] = useState(() => {
    // Check browser storage for a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    // If the user has explicitly saved 'light' mode in the past, respect it.
    if (savedTheme === 'light') {
      return false;
    }
    
    // Otherwise (if saved is 'dark', or if no preference exists yet), Default to Dark Mode.
    return true;
  });

  const [currentLang, setCurrentLang] = useState<Language>('EN');

  // --- Global Lightbox State ---
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  // Update body class for Tailwind dark mode and save to LocalStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Sync URL hash with activePage and SCROLL TO TOP
  useEffect(() => {
    window.location.hash = activePage;
    window.scrollTo(0, 0);
  }, [activePage]);

  // Listen for browser back/forward button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toUpperCase();
      if (Object.values(Page).includes(hash as Page)) {
        setActivePage(hash as Page);
      } else if (hash === '') {
        setActivePage(Page.HOME);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- Global Lightbox Logic ---
  // Close lightbox on navigation
  useEffect(() => {
    setLightboxItem(null);
  }, [activePage]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lightboxItem]);


  const toggleTheme = () => setIsDark(!isDark);

  // Handle page navigation: if clicking the current page, increment key to force reset
  const handlePageChange = (page: Page) => {
    if (page === activePage) {
      setResetKey(prev => prev + 1);
    }
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case Page.HOME: return <Home setPage={handlePageChange} lang={currentLang} />;
      case Page.ABOUT: return <About lang={currentLang} />;
      case Page.RESEARCH: return <Research lang={currentLang} />;
      case Page.ARTICLES: return <Articles lang={currentLang} />;
      case Page.SOUND: return <SoundLab lang={currentLang} />;
      case Page.TRAVEL: return <Travel key={`travel-${resetKey}`} lang={currentLang} setLightboxItem={setLightboxItem} />;
      case Page.SIMULATION: return <Simulation lang={currentLang} />;
      case Page.RESOURCES: return <Resources lang={currentLang} setLightboxItem={setLightboxItem} />;
      case Page.CONTACT: return <Contact lang={currentLang} />;
      default: return <Home setPage={handlePageChange} lang={currentLang} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
      
      {/* Dynamic Background */}
      <WaveBackground intensity={activePage === Page.SOUND ? 2 : 0.5} />
      
      <Navbar 
        activePage={activePage} 
        setPage={handlePageChange} 
        isDark={isDark} 
        toggleTheme={toggleTheme}
        currentLang={currentLang}
        setLang={setCurrentLang}
      />

      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }} // Removed expensive blur filter
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Lightbox Portal */}
      {createPortal(
        <AnimatePresence>
          {lightboxItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setLightboxItem(null)}
                 className="absolute inset-0 z-0"
              />
              <motion.button 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setLightboxItem(null)}
                 className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer z-50 p-2"
              >
                 <X className="w-9 h-9" strokeWidth={1} />
              </motion.button>

              <div className="relative w-[90vw] h-[90vh] flex flex-col items-center justify-center pointer-events-none">
                 <motion.img 
                   layoutId={lightboxItem.id}
                   src={lightboxItem.src} 
                   alt={lightboxItem.caption} 
                   className="w-full h-full object-contain pointer-events-auto cursor-pointer"
                   onClick={() => setLightboxItem(null)}
                   onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                       // Fallback logic could go here
                   }}
                 />
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                   exit={{ opacity: 0 }}
                   className="mt-4 text-center pointer-events-none"
                 >
                    <span className="inline-block bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white font-sans font-light tracking-wide text-xs uppercase">
                      {lightboxItem.caption}
                    </span>
                 </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
};

export default App;