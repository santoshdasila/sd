
import React, { useState, useEffect, useMemo } from 'react';
import { PROJECTS, PUBLICATIONS, BLOGS, BIO_LONG, BIO_SHORT, TRAVEL_LOGS, SCIENCE_BOOKS, NON_SCIENCE_BOOKS, MOVIES, DOCUMENTARIES, EDUCATION, CONTACT_INFO, TRANSLATIONS, WEB3FORMS_ACCESS_KEY, CLOUDINARY_BASE_URL } from '../constants';
import { Language } from '../types';
import { motion as m, AnimatePresence, usePresence } from 'framer-motion';
import { Download, ExternalLink, ChevronDown, ChevronUp, MapPin, Calendar, Book, Palette, GraduationCap, Send, Mail, Phone, User, MessageSquare, ArrowRight, ArrowLeft, X, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Loader2, Film, Video } from 'lucide-react';

const motion = m as any;

export interface LightboxItem {
  id: string;
  src: string;
  caption: string;
}

interface PageProps {
  lang: Language;
  setLightboxItem?: (item: LightboxItem | null) => void;
}

// --- Shared Animations ---
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.5 } }
};

// --- About Page ---
export const About: React.FC<PageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  
  const focusAreas = [
    { name: 'Acoustics', def: 'The interdisciplinary science that deals with the study of mechanical waves in gases, liquids, and solids.' },
    { name: 'Sound and vibration', def: 'The study of mechanical oscillations and their propagation, critical for noise control and structural integrity.' },
    { name: 'Metamaterials', def: 'Artificially structured materials designed to control and manipulate waves in ways not found in nature.' },
    { name: 'Thermoacoustics', def: 'The interaction between acoustic waves and heat flow, used in engines and refrigerators.' },
    { name: 'Computational physics', def: 'The study and implementation of numerical analysis to solve problems in physics.' },
    { name: 'CFD', def: 'Computational Fluid Dynamics; using numerical analysis to analyze and solve problems that involve fluid flows.' },
    { name: 'FEM', def: 'Finite Element Method; a numerical technique for finding approximate solutions to boundary value problems.' },
    { name: 'COMSOL', def: 'A cross-platform finite element analysis, solver, and multiphysics simulation software.' },
    { name: 'Ansys', def: 'Engineering simulation software used to predict how product designs will behave in real-world environments.' },
    { name: 'Python', def: 'A versatile programming language used extensively for scientific computing, data analysis, and automation.' },
    { name: 'Machine learning', def: 'A subset of AI that focuses on building systems that learn from data to identify patterns and make decisions.' }
  ];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
        <div className="w-full md:w-5/12">
          {/* Simple Frame for Image */}
          <div className="bg-white dark:bg-dark-paper p-4 shadow-sm border border-slate-100 dark:border-white/10">
             <img 
               src="https://res.cloudinary.com/dedlxporc/image/upload/f_auto,q_auto,w_1200,c_fit/santosh_profile.jpg" 
               alt="Dr. Santosh Dasila" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" 
               onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                 // Fallback if image fails
               }}
             />
          </div>
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 border border-slate-900 dark:border-white text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-primary transition-all duration-300">
              {t.ui.downloadCV}
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-7/12">
          <h2 className="text-5xl md:text-6xl font-serif text-slate-900 dark:text-white mb-8">{t.headings.about}</h2>
          <div className="w-16 h-px bg-accent mb-8"></div>
          
          <p className="text-xl font-serif italic text-slate-700 dark:text-slate-300 mb-10 leading-relaxed">
            {BIO_SHORT}
          </p>
          
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-light whitespace-pre-line leading-loose text-justify text-sm md:text-base">
            {BIO_LONG}
          </div>
          
          <div className="mt-16">
            <h3 className="text-xl font-serif font-bold mb-6">{t.headings.focusAreas}</h3>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((item) => (
                <div key={item.name} className="relative group">
                  <span className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:border-accent hover:text-accent transition-all duration-300 transform hover:scale-105 cursor-default inline-block bg-white dark:bg-transparent">
                    {item.name}
                  </span>
                  
                  {/* Minimalist Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-64 p-4 bg-primary text-white text-xs font-serif leading-relaxed opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none z-50 text-center shadow-2xl border border-white/10 origin-bottom">
                    {item.def}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-primary rotate-45 border-r border-b border-white/10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="border-t border-slate-200 dark:border-white/10 pt-16">
        <h3 className="text-3xl font-serif mb-12 text-center md:text-left">
          {t.headings.education}
        </h3>
        <div className="space-y-12">
          {EDUCATION.map((edu, index) => (
            <div key={edu.id} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
              <div className="md:w-1/4 text-accent font-serif text-lg italic">{edu.year}</div>
              <div className="md:w-3/4 border-l border-slate-200 dark:border-white/10 pl-8 pb-4 group-hover:border-accent transition-colors duration-500">
                <h4 className="text-xl font-bold font-serif mb-2">{edu.institution}</h4>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">{edu.degree}</div>
                <p className="text-slate-600 dark:text-slate-400 font-light">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Research Page ---
export const Research: React.FC<PageProps> = ({ lang }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = TRANSLATIONS[lang];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="mb-20 text-center max-w-2xl mx-auto">
        <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold block mb-4">Research & Development</span>
        <h2 className="text-5xl md:text-6xl font-serif text-slate-900 dark:text-white mb-6">{t.headings.research}</h2>
        <div className="w-20 h-px bg-slate-300 dark:bg-slate-700 mx-auto"></div>
      </div>
      
      {/* Projects Grid - Minimalist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-white/10 mb-32 border border-slate-200 dark:border-white/10">
        {PROJECTS.map((project) => (
          <motion.div 
            layout
            key={project.id}
            onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            className="bg-white dark:bg-primary p-8 md:p-12 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="aspect-[4/3] overflow-hidden mb-8 bg-slate-100 dark:bg-black/50">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" />
            </div>
            
            <div className="text-accent text-[10px] uppercase tracking-widest font-bold mb-3">{project.category}</div>
            <h3 className="text-2xl font-serif font-medium mb-4">{project.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>
            
            <AnimatePresence>
              {expandedId === project.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed border-l-2 border-accent pl-4">{project.details}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest group-hover:text-accent transition-colors">
              {expandedId === project.id ? t.ui.showLess : t.ui.readMore}
              {expandedId === project.id ? <ChevronUp className="ml-2 w-4 h-4"/> : <ChevronDown className="ml-2 w-4 h-4"/>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Publications Section - Editorial List */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-serif mb-12 border-b border-slate-200 dark:border-white/10 pb-6">
          {t.headings.publications}
        </h3>
        <div className="space-y-0 divide-y divide-slate-100 dark:divide-white/5">
          {PUBLICATIONS.map((pub) => (
            <div key={pub.id} className="py-8 group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors -mx-4 px-4">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                 <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors max-w-2xl">{pub.title}</h4>
                 <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2 md:mt-0">{pub.year}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                 <span className={`text-[10px] uppercase tracking-widest font-bold ${
                   pub.type === 'Journal' ? 'text-blue-600 dark:text-blue-400' :
                   'text-green-600 dark:text-green-400'
                 }`}>
                   {pub.type}
                 </span>
                 <span className="text-slate-300 dark:text-slate-600">|</span>
                 <p className="text-sm text-slate-500 italic">{pub.journal}</p>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed max-w-3xl">{pub.abstract}</p>
              
              {pub.link && (
                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white hover:text-accent border-b border-transparent hover:border-accent pb-0.5 transition-all">
                  {t.ui.viewPublication} <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Articles Page ---
export const Articles: React.FC<PageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
      <div className="text-center mb-24">
         <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold block mb-4">The Blog</span>
        <h2 className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white mb-6">{t.headings.articles}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {BLOGS.map((blog, idx) => (
          <motion.div 
              key={blog.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col group cursor-pointer"
          >
            <div className="aspect-[3/2] overflow-hidden mb-6 bg-slate-100 dark:bg-white/5">
               <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            </div>
            
            <div className="flex items-center gap-4 mb-3 text-xs uppercase tracking-widest">
               <span className="text-accent font-bold">{blog.category}</span>
               <span className="text-slate-300">/</span>
               <span className="text-slate-500">{blog.date}</span>
            </div>

            <h3 className="text-2xl font-serif mb-4 leading-tight group-hover:text-accent transition-colors">{blog.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{blog.excerpt}</p>
            
            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
               <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                {t.ui.readArticle} <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Contact Page ---
export const Contact: React.FC<PageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     const form = e.currentTarget as HTMLFormElement;
     const data = new FormData(form);
     
     // Basic validation placeholder
     if (!data.get('name') || !data.get('email')) {
         alert("Please fill in required fields");
         return;
     }

     if ((WEB3FORMS_ACCESS_KEY as string) === "YOUR_ACCESS_KEY_HERE") {
        alert("Please configure Web3Forms Access Key");
        return;
     }

     setIsSubmitting(true);
     // Simulate submission or real submission
     try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: data.get('name'),
            email: data.get('email'),
            subject: data.get('subject'),
            message: data.get('message'),
          })
        });
        const result = await response.json();
        if(result.success) {
            setShowSuccess(true);
            form.reset();
            setTimeout(() => setShowSuccess(false), 5000);
        }
     } catch(e) { console.error(e); } 
     finally { setIsSubmitting(false); }
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
         
         {/* Info */}
         <div className="space-y-12">
            <div>
               <h2 className="text-5xl font-serif mb-6">{t.headings.contact}</h2>
               <div className="w-16 h-px bg-accent"></div>
            </div>
            
            <p className="text-xl font-serif italic text-slate-600 dark:text-slate-300 leading-relaxed">
              Open for research collaborations, academic inquiries, and speaking engagements.
            </p>

            <div className="space-y-8 mt-12">
              {[
                { label: 'Email', val: CONTACT_INFO.email, icon: Mail, href: `mailto:${CONTACT_INFO.email}` },
                { label: 'Lab Location', val: CONTACT_INFO.address, icon: MapPin },
                { label: 'Phone', val: CONTACT_INFO.phone, icon: Phone }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                   <item.icon className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                   <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-lg text-slate-800 dark:text-slate-200 hover:text-accent transition-colors font-serif border-b border-transparent hover:border-accent">{item.val}</a>
                      ) : (
                        <p className="text-lg text-slate-800 dark:text-slate-200 font-serif">{item.val}</p>
                      )}
                   </div>
                </div>
              ))}
            </div>
         </div>

         {/* Form - Minimalist */}
         <div className="bg-slate-50 dark:bg-dark-paper p-10 md:p-16 border border-slate-100 dark:border-white/5 relative">
            {showSuccess && (
              <div className="absolute inset-0 bg-white/95 dark:bg-primary/95 z-20 flex flex-col items-center justify-center text-center p-8">
                <CheckCircle className="w-12 h-12 text-accent mb-4" strokeWidth={1} />
                <h4 className="text-2xl font-serif mb-2">Message Sent</h4>
                <button onClick={() => setShowSuccess(false)} className="mt-4 text-xs uppercase tracking-widest border-b border-slate-900 dark:border-white">Close</button>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-accent transition-colors">Name</label>
                  <input type="text" name="name" className="w-full bg-transparent border-b border-slate-300 dark:border-white/20 py-2 focus:outline-none focus:border-accent transition-colors text-slate-900 dark:text-white" placeholder="John Doe" />
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-accent transition-colors">Email</label>
                  <input type="email" name="email" className="w-full bg-transparent border-b border-slate-300 dark:border-white/20 py-2 focus:outline-none focus:border-accent transition-colors text-slate-900 dark:text-white" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="group">
                 <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-accent transition-colors">Subject</label>
                 <input type="text" name="subject" className="w-full bg-transparent border-b border-slate-300 dark:border-white/20 py-2 focus:outline-none focus:border-accent transition-colors text-slate-900 dark:text-white" placeholder="Inquiry" />
              </div>

              <div className="group">
                 <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-accent transition-colors">Message</label>
                 <textarea rows={4} name="message" className="w-full bg-transparent border-b border-slate-300 dark:border-white/20 py-2 focus:outline-none focus:border-accent transition-colors resize-none text-slate-900 dark:text-white" placeholder="Write your message here..." />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-primary dark:bg-white text-white dark:text-primary text-xs uppercase tracking-[0.2em] hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                 {isSubmitting ? "Sending..." : t.ui.sendBtn}
              </button>
            </form>
         </div>
       </div>
    </motion.div>
  );
};

// --- Travel Page ---
export const Travel: React.FC<PageProps> = ({ lang, setLightboxItem }) => {
  const t = TRANSLATIONS[lang];
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(48);

  const selectedTrip = TRAVEL_LOGS.find(t => t.id === selectedTripId);

  // Reset visible count when opening a new trip
  useEffect(() => {
    setVisibleCount(48);
    window.scrollTo(0,0)
  }, [selectedTripId]);

  // Generate image list with useMemo to maintain stable reference during re-renders/exits.
  const tripImages = useMemo(() => {
    let images: LightboxItem[] = [];
  
    if (selectedTrip) {
      let prefix = '';
      let count = 0;

      if (selectedTrip.location === 'India') { prefix = 'india'; count = 293; }
      else if (selectedTrip.location === 'France') { prefix = 'france'; count = 80; }
      else if (selectedTrip.location === 'Netherlands') { prefix = 'holland'; count = 100; }

      if (count > 0) {
        images = Array.from({ length: count }, (_, i) => ({
          id: `${prefix}-${i + 1}`,
          src: `${CLOUDINARY_BASE_URL}${prefix}${i + 1}.jpg`,
          caption: `${selectedTrip.location} - Image ${i + 1}`
        }));
      }
    }
    return images;
  }, [selectedTrip]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      
      {!selectedTrip ? (
        <>
          <div className="text-center mb-20">
             <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold block mb-4">The Journal</span>
             <h2 className="text-5xl md:text-7xl font-serif font-medium dark:text-white">{t.headings.travel}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAVEL_LOGS.map((trip) => (
              <motion.div 
                layoutId={`card-${trip.id}`}
                key={trip.id}
                onClick={() => setSelectedTripId(trip.id)}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img 
                    src={trip.image} 
                    alt={trip.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        (e.target as HTMLElement).style.opacity = "0.5";
                        (e.target as HTMLElement).style.filter = "grayscale(100%)";
                    }}
                   />
                  <div className="absolute bottom-6 left-6 z-20 text-white">
                      <div className="text-[10px] uppercase tracking-widest mb-2 border-l border-accent pl-3">{trip.location}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-center group-hover:text-accent transition-colors dark:text-white">{trip.title}</h3>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit= {{opacity: 0}}>
          <button 
            onClick={() => setSelectedTripId(null)}
            className="mb-12 text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Overview
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
             <div>
                <motion.h2 layoutId={`title-${selectedTrip.id}`} className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-none dark:text-white">
                  {selectedTrip.title}
                </motion.h2>
                <div className="flex gap-8 text-xs uppercase tracking-widest text-slate-500 border-t border-slate-200 dark:border-white/10 pt-6">
                  <span>{selectedTrip.location}</span>
                  <span>{selectedTrip.date}</span>
                </div>
             </div>
             <p className="text-lg md:text-xl font-serif leading-relaxed text-slate-600 dark:text-slate-300">
               {selectedTrip.description}
             </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {tripImages.slice(0, visibleCount).map((item) => (
               <div 
                 key={item.id}
                 onClick={() => setLightboxItem?.(item)}
                 className="aspect-square bg-slate-100 dark:bg-white/5 cursor-pointer overflow-hidden group relative shadow-md hover:shadow-xl transition-shadow duration-300"
               >
                 <motion.img 
                   layoutId={item.id}
                   src={item.src} 
                   alt={item.caption}
                   loading="lazy"
                   className="w-full h-full object-cover"
                   onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                       (e.target as HTMLElement).style.opacity = "0.5";
                       (e.target as HTMLElement).style.filter = "grayscale(100%)";
                   }}
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-light">View</span>
                  </div>
               </div>
            ))}
          </div>

          {visibleCount < tripImages.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 48)}
                className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
              >
                Load More
              </button>
            </div>
          )}

        </motion.div>
      )}
    </motion.div>
  );
};

// --- Simulation Page (Placeholder) ---
export const Simulation: React.FC<PageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="animate" className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-serif mb-6">{t.headings.simulation}</h2>
      <div className="w-16 h-px bg-accent mx-auto mb-12"></div>
      
      <div className="p-16 border border-slate-200 dark:border-white/10 flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" strokeWidth={1} />
        <h3 className="text-xl font-serif mb-2">Development in Progress</h3>
        <p className="text-slate-500 font-light max-w-md">
          Porting MATLAB FDTD solvers to WebAssembly for real-time browser visualization.
        </p>
      </div>
    </motion.div>
  );
};

// --- Resources Page ---
export const Resources: React.FC<PageProps> = ({ lang, setLightboxItem }) => {
  const [activeTab, setActiveTab] = useState<'links' | 'books' | 'art' | 'movies' | 'docs'>('links');
  const t = TRANSLATIONS[lang];
  
  // Cloudinary Integrated Art Collection
  const artCollection = useMemo(() => Array.from({ length: 72 }, (_, i) => {
    const id = i + 1;
    const getCaption = (imgId: number) => `Art Gallery - Image ${imgId}`;

    return { 
        id: `art-${id}`,
        // Appending the filename to the Cloudinary Base URL
        src: `${CLOUDINARY_BASE_URL}art${id}.jpg`, 
        caption: getCaption(id) 
    };
  }), []);

  const tabs = [
    { id: 'links', label: t.headings.usefulLinks },
    { id: 'books', label: t.headings.library },
    { id: 'movies', label: t.headings.movies },
    { id: 'docs', label: t.headings.documentaries },
    { id: 'art', label: t.headings.artGallery },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen relative">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif mb-8">{t.headings.resources}</h2>
        <div className="flex justify-center gap-8 border-b border-slate-200 dark:border-white/10 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs uppercase tracking-[0.2em] pb-4 border-b-2 transition-all whitespace-nowrap px-2 ${
                activeTab === tab.id
                  ? 'border-accent text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'links' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10">
              {[
                { name: 'IITM Physics department', url: 'https://physics.iitm.ac.in' },
                { name: 'Acoustical Society of America', url: 'https://acousticalsociety.org' },
                { name: 'Institute of Acoustics (UK)', url: 'https://www.ioa.org.uk' },
                { name: 'COMSOL Multiphysics', url: 'https://www.comsol.com/acoustics' },
                { name: 'MSC Nastran – NVH', url: 'https://www.mscsoftware.com/product/msc-nastran' },
                { name: 'NPTEL', url: 'https://nptel.ac.in/' }
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="p-8 bg-white dark:bg-primary flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <span className="font-serif text-lg group-hover:text-accent transition-colors">{link.name}</span>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-accent" />
                </a>
              ))}
            </div>
          )}

          {activeTab === 'books' && (
            <div className="space-y-16">
              {/* Science Section */}
              <div>
                <h3 className="text-2xl font-serif mb-8 text-slate-900 dark:text-white border-l-2 border-accent pl-4">Science & Acoustics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {SCIENCE_BOOKS.map((book: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-24 h-36 bg-slate-100 dark:bg-white/5 flex-shrink-0 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                        {book.cover ? (
                           <img 
                             src={book.cover} 
                             alt={book.title} 
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                             onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                               (e.target as HTMLElement).style.display = 'none';
                               (e.target as HTMLElement).parentElement!.innerHTML = '<svg class="w-8 h-8 text-slate-300" stroke-width="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>';
                             }}
                           />
                        ) : (
                           <Book className="w-8 h-8 text-slate-300" strokeWidth={1} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-serif text-xl mb-1 group-hover:text-accent transition-colors">{book.title}</h4>
                        <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">by {book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Science Section */}
              <div>
                <h3 className="text-2xl font-serif mb-8 text-slate-900 dark:text-white border-l-2 border-accent pl-4">Literature & Classics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {NON_SCIENCE_BOOKS.map((book: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-24 h-36 bg-slate-100 dark:bg-white/5 flex-shrink-0 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                        {book.cover ? (
                           <img 
                             src={book.cover} 
                             alt={book.title} 
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                             onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                               (e.target as HTMLElement).style.display = 'none';
                               (e.target as HTMLElement).parentElement!.innerHTML = '<svg class="w-8 h-8 text-slate-300" stroke-width="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>';
                             }}
                           />
                        ) : (
                           <Book className="w-8 h-8 text-slate-300" strokeWidth={1} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-serif text-xl mb-1 group-hover:text-accent transition-colors">{book.title}</h4>
                        <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">by {book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'movies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {MOVIES.map((movie: any, i: number) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-32 h-48 bg-slate-100 dark:bg-white/5 flex-shrink-0 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-500">
                    {movie.cover ? (
                        <img 
                          src={movie.cover} 
                          alt={movie.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLElement).style.display = 'none';
                            (e.target as HTMLElement).parentElement!.innerHTML = '<svg class="w-8 h-8 text-slate-300" stroke-width="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>';
                          }}
                        />
                    ) : (
                        <Film className="w-8 h-8 text-slate-300" strokeWidth={1} />
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors leading-tight">{movie.title}</h4>
                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Dir. {movie.director}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {DOCUMENTARIES.map((doc: any, i: number) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-32 h-48 bg-slate-100 dark:bg-white/5 flex-shrink-0 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-500">
                    {doc.cover ? (
                        <img 
                          src={doc.cover} 
                          alt={doc.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLElement).style.display = 'none';
                            (e.target as HTMLElement).parentElement!.innerHTML = '<svg class="w-8 h-8 text-slate-300" stroke-width="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>';
                          }}
                        />
                    ) : (
                        <Video className="w-8 h-8 text-slate-300" strokeWidth={1} />
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors leading-tight">{doc.title}</h4>
                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Dir. {doc.director}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'art' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {artCollection.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setLightboxItem?.(item)}
                  className="aspect-square bg-slate-100 dark:bg-white/5 cursor-pointer overflow-hidden group relative shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <motion.img 
                    layoutId={item.id}
                    src={item.src} 
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                         (e.target as HTMLElement).style.opacity = "0.5";
                         (e.target as HTMLElement).style.filter = "grayscale(100%)";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-light">View</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
