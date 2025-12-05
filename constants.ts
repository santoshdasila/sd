
import { Project, Article, TravelMemory, EducationItem, BlogPost, TranslationDictionary, Page } from './types';

export const HERO_TAGLINE = "Exploring the science of sound, waves, and human perception.";

// --- CONFIGURATION ---
// Go to https://web3forms.com/ to get your free access key.
export const WEB3FORMS_ACCESS_KEY = "69d01d74-e014-448a-bc04-6b05b33c3cdd"; 

// --- CLOUDINARY CONFIGURATION ---
// Replace 'YOUR_CLOUD_NAME' with your actual cloud name.
// Replace 'YOUR_FOLDER_NAME' with the folder where you uploaded art1.jpg, art2.jpg, etc.
// If images are in the root folder, remove 'YOUR_FOLDER_NAME/'.
// Ensure it ends with a slash '/'.
export const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dedlxporc/image/upload/f_auto,q_auto,w_1200,c_fit/";

export const BIO_SHORT = "Dr. Santosh Dasila is a physicist specializing in Acoustical Physics, Acoustic Metamaterials, and wave propagation control.";

export const BIO_LONG = `
  My research lies at the intersection of fundamental physics and engineering applications, with a specialized focus on Acoustical Physics, Acoustic Metamaterials, and Phononic Crystals. I am deeply interested in designing sub-wavelength structures that manipulate sound waves in unconventional ways to achieve efficient broadband absorption and precise beam shaping.

  My work integrates theoretical modeling with rigorous Finite Element Method (FEM) simulations and experimental validation to solve complex challenges in noise control and wave propagation. From developing miniaturized absorbers for low-frequency noise to exploring non-diffracting beams for advanced sensing, I aim to engineer material properties that push the boundaries of what is possible in acoustics.
`;

export const TRANSLATIONS: TranslationDictionary = {
  EN: {
    nav: {
      HOME: 'Home', ABOUT: 'About', RESEARCH: 'Publications', ARTICLES: 'Articles', 
      SOUND: 'Sound', TRAVEL: 'Travel', SIMULATION: 'Simulation', RESOURCES: 'Resources', CONTACT: 'Contact'
    },
    headings: {
      about: 'About Me', research: 'Publications & Projects', articles: 'Blogs & News', 
      sound: 'Signal Generator', travel: 'My Travel', simulation: 'Physics Simulations', 
      resources: 'Resources', contact: 'Contact Details', education: 'Education History', 
      publications: 'Selected Publications', focusAreas: 'Focus Areas', getInTouch: 'Contact Details', 
      sendMessage: 'Send a Message', usefulLinks: 'Useful Links', library: 'Library', artGallery: 'Art Gallery',
      movies: 'Cinema', documentaries: 'Documentaries'
    },
    ui: {
      downloadCV: 'Download CV', readMore: 'Read More', showLess: 'Show Less', 
      viewPublication: 'View Publication', readArticle: 'Read Article', sendBtn: 'Send Message',
      startOsc: 'Start oscillator to visualize'
    }
  },
  HI: {
    nav: {
      HOME: 'होम', ABOUT: 'मेरे बारे में', RESEARCH: 'प्रकाशन', ARTICLES: 'लेख', 
      SOUND: 'ध्वनि', TRAVEL: 'यात्रा', SIMULATION: 'सिमुलेशन', RESOURCES: 'संसाधन', CONTACT: 'संपर्क'
    },
    headings: {
      about: 'मेरे बारे में', research: 'प्रकाशन और परियोजनाएं', articles: 'ब्लॉग और समाचार', 
      sound: 'सिग्नल जनरेटर', travel: 'मेरी यात्रा', simulation: 'भौतिकी सिमुलेशन', 
      resources: 'संसाधन', contact: 'संपर्क विवरण', education: 'शिक्षा इतिहास', 
      publications: 'चयनित प्रकाशन', focusAreas: 'फोकस क्षेत्र', getInTouch: 'संपर्क विवरण', 
      sendMessage: 'संदेश भेजें', usefulLinks: 'महत्वपूर्ण लिंक', library: 'पुस्तकालय', artGallery: 'कला दीर्घा',
      movies: 'सिनेमा', documentaries: 'वृत्तचित्र'
    },
    ui: {
      downloadCV: 'सीवी डाउनलोड करें', readMore: 'अधिक पढ़ें', showLess: 'कम दिखाएं', 
      viewPublication: 'प्रकाशन देखें', readArticle: 'लेख पढ़ें', sendBtn: 'संदेश भेजें',
      startOsc: 'विज़ुअलाइज़ करने के लिए ऑसिलेटर शुरू करें'
    }
  },
  ES: {
    nav: {
      HOME: 'Inicio', ABOUT: 'Sobre Mí', RESEARCH: 'Publicaciones', ARTICLES: 'Artículos', 
      SOUND: 'Son', TRAVEL: 'Viajes', SIMULATION: 'Simulación', RESOURCES: 'Recursos', CONTACT: 'Contacto'
    },
    headings: {
      about: 'Sobre Mí', research: 'Publicaciones y Proyectos', articles: 'Blogs y Noticias', 
      sound: 'Generador de Señales', travel: 'Mis Viajes', simulation: 'Simulaciones Físicas', 
      resources: 'Recursos', contact: 'Detalles de Contacto', education: 'Historial Educativo', 
      publications: 'Publicaciones Seleccionadas', focusAreas: 'Áreas de Enfoque', getInTouch: 'Detalles de Contacto', 
      sendMessage: 'Enviar Mensaje', usefulLinks: 'Enlaces Útiles', library: 'Biblioteca', artGallery: 'Galería de Arte',
      movies: 'Cine', documentaries: 'Documentales'
    },
    ui: {
      downloadCV: 'Descargar CV', readMore: 'Leer Más', showLess: 'Mostrar Menos', 
      viewPublication: 'Ver Publicación', readArticle: 'Leer Artículo', sendBtn: 'Enviar Mensaje',
      startOsc: 'Iniciar oscilador para visualizar'
    }
  },
  FR: {
    nav: {
      HOME: 'Accueil', ABOUT: 'À Propos', RESEARCH: 'Publications', ARTICLES: 'Articles', 
      SOUND: 'Son', TRAVEL: 'Voyages', SIMULATION: 'Simulation', RESOURCES: 'Ressources', CONTACT: 'Contact'
    },
    headings: {
      about: 'À Propos de Moi', research: 'Publications & Projets', articles: 'Blogs & Actualités', 
      sound: 'Générateur de Signaux', travel: 'Mes Voyages', simulation: 'Simulations Physiques', 
      resources: 'Ressources', contact: 'Détails du Contact', education: 'Formation', 
      publications: 'Publications Choisies', focusAreas: 'Domaines d\'intérêt', getInTouch: 'Détails du Contact', 
      sendMessage: 'Envoyer un Message', usefulLinks: 'Liens Utiles', library: 'Bibliothèque', artGallery: 'Galerie d\'Art',
      movies: 'Cinéma', documentaries: 'Documentaires'
    },
    ui: {
      downloadCV: 'Télécharger CV', readMore: 'Lire la suite', showLess: 'Voir moins', 
      viewPublication: 'Voir la Publication', readArticle: 'Lire l\'article', sendBtn: 'Envoyer',
      startOsc: 'Démarrer l\'oscillateur'
    }
  },
  DE: {
    nav: {
      HOME: 'Start', ABOUT: 'Über Mich', RESEARCH: 'Publikationen', ARTICLES: 'Artikel', 
      SOUND: 'Klang', TRAVEL: 'Reisen', SIMULATION: 'Simulation', RESOURCES: 'Ressourcen', CONTACT: 'Kontakt'
    },
    headings: {
      about: 'Über Mich', research: 'Publikationen & Projekte', articles: 'Blogs & Nachrichten', 
      sound: 'Signalgenerator', travel: 'Meine Reisen', simulation: 'Physik-Simulationen', 
      resources: 'Ressourcen', contact: 'Kontaktdaten', education: 'Ausbildung', 
      publications: 'Ausgewählte Publikationen', focusAreas: 'Schwerpunkte', getInTouch: 'Kontaktdaten', 
      sendMessage: 'Nachricht Senden', usefulLinks: 'Nützliche Links', library: 'Bibliothek', artGallery: 'Kunstgalerie',
      movies: 'Kino', documentaries: 'Dokumentarfilme'
    },
    ui: {
      downloadCV: 'CV Herunterladen', readMore: 'Mehr lesen', showLess: 'Weniger anzeigen', 
      viewPublication: 'Publikation ansehen', readArticle: 'Artikel lesen', sendBtn: 'Senden',
      startOsc: 'Oszillator starten'
    }
  },
  JP: {
    nav: {
      HOME: 'ホーム', ABOUT: '私について', RESEARCH: '出版物', ARTICLES: '記事', 
      SOUND: '音響', TRAVEL: '旅行', SIMULATION: 'シミュレーション', RESOURCES: 'リソース', CONTACT: 'お問い合わせ'
    },
    headings: {
      about: '私について', research: '出版物とプロジェクト', articles: 'ブログとニュース', 
      sound: '信号発生器', travel: '私の旅行', simulation: '物理シミュレーション', 
      resources: 'リソース', contact: '連絡先詳細', education: '学歴', 
      publications: '主な出版物', focusAreas: '重点分野', getInTouch: '連絡先詳細', 
      sendMessage: 'メッセージを送信', usefulLinks: '便利なリンク', library: 'ライブラリ', artGallery: 'アートギャラリー',
      movies: '映画', documentaries: 'ドキュメンタリー'
    },
    ui: {
      downloadCV: 'CVをダウンロード', readMore: '続きを読む', showLess: '表示を減らす', 
      viewPublication: '出版物を見る', readArticle: '記事を読む', sendBtn: '送信',
      startOsc: '発振器を開始'
    }
  }
};

export const EDUCATION: EducationItem[] = [
  {
    id: 'e1',
    degree: 'PhD in Acoustical Physics',
    institution: 'Indian Institute of Technology Madras, India',
    year: 'Jan 2018 - July 2025',
    description: 'Thesis Title: Acoustic Metamaterial Based Devices for Absorption and Beam Shaping'
  },
  {
    id: 'e2',
    degree: 'M.Tech. in Solid State Technology',
    institution: 'Indian Institute of Technology Madras, India',
    year: 'Aug 2015 - May 2017',
    description: 'Thesis Title: In Situ Ellipsometry Analysis of the Polyvinyl Alcohol (PVA)'
  }
];

export const CONTACT_INFO = {
  email: "santosh039@physics.iitm.ac.in",
  phone: "044-22575870",
  address: "Microwave laboratory, Department of Physics, IIT Madras India",
  socials: {
    twitter: "@DrSoundWave",
    linkedin: "santosh-dasila",
    researchgate: "Santosh_Dasila"
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Acoustic Metamaterials',
    category: 'Material Science',
    year: '2023',
    description: 'Developing sub-wavelength structures for efficient broadband sound absorption.',
    details: 'This project explores the design of metamaterial absorbers that can effectively dampen low-frequency noise, which is traditionally difficult to control with porous materials.',
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: 'p2',
    title: 'Phononic Crystals',
    category: 'Wave Propagation',
    year: '2024',
    description: 'Engineering periodic structures to control acoustic dispersion and beamforming.',
    details: 'Focusing on the generation of acoustic Bessel-like beams using phononic crystals, allowing for non-diffracting wave propagation useful in medical imaging and sensing.',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    id: 'p3',
    title: 'Finite Element Method',
    category: 'Computational Physics',
    year: '2024',
    description: 'Simulation of complex acoustic phenomena and combustion instabilities.',
    details: 'Utilizing FEM to model resonator-based noise absorbers and analyze the acoustic modes within combustion chambers to mitigate instability in propulsion systems.',
    image: 'https://picsum.photos/600/400?random=3'
  }
];

export const PUBLICATIONS: Article[] = [
  {
    id: 'a1',
    title: 'Metamaterial-Based Miniaturized Broadband Acoustic Absorber',
    journal: 'Journal of Applied Physics',
    year: 2023,
    type: 'Journal',
    abstract: 'Investigating metamaterial structures for efficient broadband acoustic absorption in miniaturized settings. Co-authored with Chitti Venkata Krishnamurthy and V Subramanian.',
    link: 'https://doi.org/10.1063/5.0142650'
  },
  {
    id: 'a2',
    title: 'Acoustic Bessel-like beam generation using phononic crystals',
    journal: 'Journal of Applied Physics',
    year: 2024,
    type: 'Journal',
    abstract: 'Exploration of phononic crystals to generate non-diffracting acoustic Bessel-like beams for advanced wave manipulation. Co-authored with Chitti Venkata Krishnamurthy and V Subramanian.',
    link: 'https://doi.org/10.1063/5.0182429'
  },
  {
    id: 'a3',
    title: 'Resonator Based Broadband Noise Absorber to Control Combustion Instability',
    journal: 'Physical Review Applied',
    year: 2024,
    type: 'Journal',
    abstract: 'Development of resonator-based absorbers designed to mitigate noise and control combustion instability in propulsion systems. Co-authored with Aswathy Surendran, Chitti Venkata Krishnamurthy, and V Subramanian.',
    link: 'https://doi.org/10.1103/PhysRevApplied.22.064053'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Notes from the Anechoic Chamber',
    date: 'Oct 12, 2024',
    category: 'Field Notes',
    excerpt: 'Spending 45 minutes in the quietest place on Earth changes how you hear your own heartbeat. Here is what I experienced.',
    image: 'https://picsum.photos/600/400?random=20'
  },
  {
    id: 'b2',
    title: 'The Future of Sonic Warfare',
    date: 'Sep 05, 2024',
    category: 'Opinion',
    excerpt: 'Analyzing the ethical implications of using Long Range Acoustic Devices (LRAD) in crowd control.',
    image: 'https://picsum.photos/600/400?random=21'
  },
  {
    id: 'b3',
    title: 'Conference Recap: ICA 2024',
    date: 'Aug 20, 2024',
    category: 'News',
    excerpt: 'Key takeaways from this year’s International Congress on Acoustics in Rome. The focus was heavily on machine learning in signal processing.',
    image: 'https://picsum.photos/600/400?random=22'
  }
];

export const TRAVEL_LOGS: TravelMemory[] = [
  {
    id: 't1',
    location: 'India',
    date: 'December 2023',
    title: 'Heritage & Chaos',
    description: 'A journey through the vibrant streets of Delhi, the ancient ghats of Varanasi, and the serene valleys of the Himalayas. Exploring the rich cultural tapestry and the acoustic marvels of ancient temples.',
    image: `${CLOUDINARY_BASE_URL}cover1.jpg`,
    gallery: []
  },
  {
    id: 't2',
    location: 'France',
    date: 'June 2022',
    title: 'Art & Vineyards',
    description: 'Exploring the world-class museums of Paris, the historic châteaux of the Loire Valley, and the coastal beauty of the Riviera. A study in the acoustics of gothic cathedrals.',
    image: `${CLOUDINARY_BASE_URL}cover2.jpg`,
    gallery: []
  },
  {
    id: 't3',
    location: 'Netherlands',
    date: 'April 2021',
    title: 'Canals & Design',
    description: 'Cycling through the charming streets of Amsterdam, witnessing the tulip fields in bloom, and admiring the modern architecture of Rotterdam. Experiencing the soundscapes of urban waterways.',
    image: `${CLOUDINARY_BASE_URL}cover3.jpg`,
    gallery: []
  }
];

export const SCIENCE_BOOKS = [
  { title: "The Physics of Sound", author: "Berg & Stork", cover: "https://covers.openlibrary.org/b/isbn/9780131830473-M.jpg" },
  { title: "Fundamentals of Acoustics", author: "Kinsler & Frey", cover: "https://covers.openlibrary.org/b/isbn/9780471847892-M.jpg" },
  { title: "Sensory Exotica", author: "Howard C. Hughes", cover: "https://covers.openlibrary.org/b/isbn/9780262082793-M.jpg" },
  { title: "Music, Physics and Engineering", author: "Harry F. Olson", cover: "https://covers.openlibrary.org/b/isbn/9780486217697-M.jpg" }
];

export const NON_SCIENCE_BOOKS = [
  { title: "Siddhartha", author: "Hermann Hesse", cover: "https://covers.openlibrary.org/b/isbn/9780553208849-M.jpg" },
  { title: "War and Peace", author: "Leo Tolstoy", cover: "https://covers.openlibrary.org/b/isbn/9780199232765-M.jpg" },
  { title: "Anna Karenina", author: "Leo Tolstoy", cover: "https://covers.openlibrary.org/b/isbn/9780143035008-M.jpg" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://covers.openlibrary.org/b/isbn/9780060935467-M.jpg" },
  { title: "Snow", author: "Orhan Pamuk", cover: "https://covers.openlibrary.org/b/isbn/9780375706868-M.jpg" },
  { title: "Godan", author: "Premchand", cover: "https://covers.openlibrary.org/b/isbn/9780195642452-M.jpg" }
];

export const MOVIES = [
  { title: "Tokyo Story", director: "Yasujirō Ozu", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Tokyo_Story_poster.jpg/440px-Tokyo_Story_poster.jpg" },
  { title: "Late Spring", director: "Yasujirō Ozu", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Late_Spring_1949_poster.jpg/440px-Late_Spring_1949_poster.jpg" },
  { title: "Early Summer", director: "Yasujirō Ozu", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Early_Summer_poster.jpg/440px-Early_Summer_poster.jpg" },
  { title: "Seven Samurai", director: "Akira Kurosawa", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Seven_Samurai_poster.jpg/440px-Seven_Samurai_poster.jpg" },
  { title: "Rashomon", director: "Akira Kurosawa", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Rashomon_poster_en.jpg/440px-Rashomon_poster_en.jpg" },
  { title: "Anatomy of a Murder", director: "Otto Preminger", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Anatomy_of_a_Murder_poster.jpg/440px-Anatomy_of_a_Murder_poster.jpg" },
  { title: "Castle in the Sky", director: "Hayao Miyazaki", cover: "https://upload.wikimedia.org/wikipedia/en/f/f5/Castle_in_the_Sky_%281986%29.png" },
  { title: "My Neighbor Totoro", director: "Hayao Miyazaki", cover: "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg" },
  { title: "Kiki's Delivery Service", director: "Hayao Miyazaki", cover: "https://upload.wikimedia.org/wikipedia/en/0/07/Kiki%27s_Delivery_Service_%28Movie_Poster%29.jpg" },
  { title: "Spirited Away", director: "Hayao Miyazaki", cover: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png" },
  { title: "Howl's Moving Castle", director: "Hayao Miyazaki", cover: "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg" },
  { title: "Ponyo", director: "Hayao Miyazaki", cover: "https://upload.wikimedia.org/wikipedia/en/9/9d/Ponyo_%282008%29.png" },
  { title: "The Wind Rises", director: "Hayao Miyazaki", cover: "https://upload.wikimedia.org/wikipedia/en/a/a3/Kaze_Tachinu_poster.jpg" },
  { title: "Baton Baton Mein", director: "Basu Chatterjee", cover: "https://upload.wikimedia.org/wikipedia/en/e/e0/Baton_Baton_Mein.jpg" },
  { title: "Chhoti Si Baat", director: "Basu Chatterjee", cover: "https://upload.wikimedia.org/wikipedia/en/8/82/Chhoti_Si_Baat.jpg" }
];

export const DOCUMENTARIES = [
  { title: "Particle Fever", director: "Mark Levinson", cover: "https://upload.wikimedia.org/wikipedia/en/c/c3/Particle_Fever_poster.jpg" },
  { title: "Cosmos: A Spacetime Odyssey", director: "Brannon Braga", cover: "https://upload.wikimedia.org/wikipedia/en/0/07/Cosmos_A_Spacetime_Odyssey_Title_Card.png" },
  { title: "Planet Earth II", director: "BBC Natural History Unit", cover: "https://upload.wikimedia.org/wikipedia/en/2/29/Planet_Earth_II_Title_Card.jpg" },
  { title: "Apollo 11", director: "Todd Douglas Miller", cover: "https://upload.wikimedia.org/wikipedia/en/4/41/Apollo_11_%282019_film%29_poster.jpg" },
  { title: "My Octopus Teacher", director: "Pippa Ehrlich & James Reed", cover: "https://upload.wikimedia.org/wikipedia/en/2/23/My_Octopus_Teacher_poster.jpg" },
  { title: "Fantastic Fungi", director: "Louie Schwartzberg", cover: "https://upload.wikimedia.org/wikipedia/en/3/30/Fantastic_Fungi.jpg" }
];

export const ACOUSTIC_FORMULAS = [
  {
    name: "Wave Velocity",
    formula: "v = f \\lambda",
    desc: "Relationship between velocity (v), frequency (f), and wavelength (λ)."
  },
  {
    name: "Period",
    formula: "T = \\frac{1}{f}",
    desc: "Time (T) taken for one complete cycle of vibration."
  },
  {
    name: "Sound Intensity Level",
    formula: "L_I = 10 \\log_{10}\\left(\\frac{I}{I_0}\\right)",
    desc: "Measured in decibels (dB), where I₀ is the threshold of hearing."
  },
  {
    name: "Acoustic Impedance",
    formula: "Z = \\rho v",
    desc: "Resistance of a medium to sound flow, product of density (ρ) and velocity (v)."
  },
  {
    name: "Doppler Effect",
    formula: "f = f_0 \\left(\\frac{v + v_r}{v + v_s}\\right)",
    desc: "Change in frequency observed when source or observer is moving."
  },
  {
    name: "Acoustic Wave Equation",
    formula: "\\nabla^2 p - \\frac{1}{c^2} \\frac{\\partial^2 p}{\\partial t^2} = 0",
    desc: "The fundamental partial differential equation describing the propagation of sound waves in a medium."
  }
];
