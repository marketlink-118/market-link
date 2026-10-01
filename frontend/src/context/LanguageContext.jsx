import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SUPPORTED_COUNTRIES, TRANSLATIONS } from './translations';

export { SUPPORTED_COUNTRIES, TRANSLATIONS };

const LanguageContext = createContext(null);

const STORAGE_LOCALE_KEY = 'marketlink_locale';
const STORAGE_COUNTRY_KEY = 'marketlink_country';

export function LanguageProvider({ children }) {
  const [currentCountry, setCurrentCountry] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_COUNTRY_KEY) || 'PK';
    } catch {
      return 'PK';
    }
  });

  const [currentLocale, setCurrentLocale] = useState(() => {
    try {
      const userSelected = localStorage.getItem('marketlink_user_selected_locale');
      const savedLocale = localStorage.getItem(STORAGE_LOCALE_KEY);
      if (userSelected === 'true' && savedLocale && TRANSLATIONS[savedLocale]) {
        return savedLocale;
      }
      return 'en';
    } catch {
      return 'en';
    }
  });

  const direction = TRANSLATIONS[currentLocale]?.direction || 'ltr';

  // Apply HTML direction and lang attribute dynamically
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLocale;
    try {
      localStorage.setItem(STORAGE_LOCALE_KEY, currentLocale);
      localStorage.setItem(STORAGE_COUNTRY_KEY, currentCountry);
    } catch {
      // storage unavailable
    }
  }, [currentLocale, currentCountry, direction]);

  const changeLanguage = useCallback((locale) => {
    if (TRANSLATIONS[locale]) {
      setCurrentLocale(locale);
      try {
        localStorage.setItem(STORAGE_LOCALE_KEY, locale);
        localStorage.setItem('marketlink_user_selected_locale', 'true');
      } catch {
        // storage unavailable
      }
    }
  }, []);

  // When country switches, update country AND language immediately
  const changeCountry = useCallback((countryCode) => {
    const matched = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
    if (matched) {
      setCurrentCountry(matched.code);
      if (matched.defaultLocale && TRANSLATIONS[matched.defaultLocale]) {
        setCurrentLocale(matched.defaultLocale);
        try {
          localStorage.setItem(STORAGE_LOCALE_KEY, matched.defaultLocale);
          localStorage.setItem('marketlink_user_selected_locale', 'true');
        } catch {
          // storage unavailable
        }
      }
    }
  }, []);

  // Translation lookup helper
  const t = useCallback((key) => {
    const dict = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  }, [currentLocale]);

  // Dynamic currency price formatter
  const formatPrice = useCallback((amount) => {
    const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    const country = SUPPORTED_COUNTRIES.find((c) => c.code === currentCountry) || SUPPORTED_COUNTRIES[0];
    const isAr = currentLocale === 'ar';
    const isUr = currentLocale === 'ur';

    switch (country.code) {
      case 'PK': {
        const val = Math.round(num);
        return isUr ? `${val.toLocaleString()} روپے` : `Rs ${val.toLocaleString()}`;
      }
      case 'SA': {
        const val = (Math.round(num * 100) / 100).toFixed(2);
        return isAr ? `${val} ر.س` : `${val} SAR`;
      }
      case 'AE': {
        const val = (Math.round(num * 100) / 100).toFixed(2);
        return isAr ? `${val} د.إ` : `${val} AED`;
      }
      case 'GB': {
        const val = (Math.round(num * 100) / 100).toFixed(2);
        return `£${val}`;
      }
      case 'US':
      default: {
        const val = (Math.round(num * 100) / 100).toFixed(2);
        return `$${val}`;
      }
    }
  }, [currentCountry, currentLocale]);

  // Translate product produce names country/language-wise and clean any legacy slang
  const translateProduct = useCallback((name) => {
    if (!name) return '';
    const clean = String(name)
      .replace(/\s*\(Palak\)/gi, '')
      .replace(/\s*\(Makhan\)/gi, '')
      .replace(/Homemade Cultured Makhan \(Butter\)/gi, 'Homemade Cultured Butter');

    const keyMap = {
      'fresh green spinach': 'prod_spinach',
      'fresh organic green spinach': 'prod_spinach',
      'organic green spinach': 'prod_spinach',
      'spinach': 'prod_spinach',
      'farm fresh vine tomatoes': 'prod_tomatoes',
      'vine tomatoes': 'prod_tomatoes',
      'tomatoes': 'prod_tomatoes',
      'organic farm red potatoes': 'prod_potatoes',
      'organic red potatoes': 'prod_potatoes',
      'red potatoes': 'prod_potatoes',
      'potatoes': 'prod_potatoes',
      'homemade cultured butter': 'prod_butter',
      'pure fresh cow milk': 'prod_milk',
      'cow milk': 'prod_milk',
      'sweet kinnow mandarins': 'prod_mandarins',
      'sweet mandarins': 'prod_mandarins',
      'mandarins': 'prod_mandarins',
      'pure raw wild berry (sidr) honey': 'prod_honey',
      'pure raw wild berry honey': 'prod_honey',
      'raw wild honey': 'prod_honey'
    };

    const lower = clean.trim().toLowerCase();
    const key = keyMap[lower];
    if (key) {
      const dict = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;
      return dict[key] || clean;
    }
    return clean;
  }, [currentLocale]);

  const value = {
    currentLocale,
    currentCountry,
    direction,
    isRTL: direction === 'rtl',
    supportedCountries: SUPPORTED_COUNTRIES,
    changeLanguage,
    changeCountry,
    formatPrice,
    translateProduct,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
