import React, { createContext, useState, useMemo, PropsWithChildren } from 'react';
import { I18nManager, Alert } from 'react-native';

type Language = 'en' | 'ar';

export const LanguageContext = createContext({
  language: 'en' as Language,
  toggle: () => {}
});

export const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggle = () => {
    const next: Language = language === 'en' ? 'ar' : 'en';
    setLanguage(next);
    
    I18nManager.forceRTL(next === 'ar');////for doing Right to Left
    Alert.alert(
      'Reload required',
      'App layout direction changed. Please reload the app to apply RTL/LTR change.'
    );
  };

  const value = useMemo(() => ({ language, toggle }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
