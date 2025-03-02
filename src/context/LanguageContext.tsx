import { Language } from '@app/enum/language';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (Language: Language) => void;
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(Language.ENGLISH);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
