import { create } from 'zustand';

type Lang = 'vi' | 'en';

interface LanguageStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLanguage = create<LanguageStore>((set) => ({
  lang: typeof window !== 'undefined'
    ? (localStorage.getItem('lang') as Lang) || 'vi'
    : 'vi',

  setLang: (lang: Lang) => {
    localStorage.setItem('lang', lang);
    set({ lang });
  },
}));
