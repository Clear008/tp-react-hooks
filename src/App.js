import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { translations } from './utils/translations';
import { useLocalStorage } from './hooks/useLocalStorage';


export const LanguageContext = createContext();
export const ThemeContext = createContext();

const App = () => {
  // Utilisation de useLocalStorage au lieu de useState
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('theme', false);
  const [language, setLanguage] = useLocalStorage('language', 'fr');
  const [searchTerm, setSearchTerm] = useState('');

  const languageValue = {
    language,
    setLanguage,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={languageValue}>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
          <h1 className="text-center">{translations[language].title}</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </header>
          <main>
            <ProductSearch onSearch={setSearchTerm} />
            <ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;