export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  RESEARCH = 'RESEARCH',
  ARTICLES = 'ARTICLES',
  SOUND = 'SOUND',
  TRAVEL = 'TRAVEL',
  SIMULATION = 'SIMULATION',
  RESOURCES = 'RESOURCES',
  CONTACT = 'CONTACT'
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  image?: string;
  details: string;
}

export interface Article {
  id: string;
  title: string;
  journal: string;
  year: number;
  type: 'Journal' | 'Conference' | 'Popular Science';
  abstract: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
}

export interface TravelMemory {
  id: string;
  location: string;
  date: string;
  title: string;
  description: string;
  coordinates?: { lat: number, lng: number };
  image: string;
  gallery?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export type WaveType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export type Language = 'EN' | 'ES' | 'FR' | 'DE' | 'JP' | 'HI';

export interface TranslationDictionary {
  [key: string]: {
    nav: { [key in Page]: string };
    headings: {
      about: string;
      research: string;
      articles: string;
      sound: string;
      travel: string;
      simulation: string;
      resources: string;
      contact: string;
      education: string;
      publications: string;
      focusAreas: string;
      getInTouch: string;
      sendMessage: string;
      usefulLinks: string;
      library: string;
      artGallery: string;
      movies: string;
      documentaries: string;
    };
    ui: {
      downloadCV: string;
      readMore: string;
      showLess: string;
      viewPublication: string;
      readArticle: string;
      sendBtn: string;
      startOsc: string;
    }
  }
}