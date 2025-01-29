import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';

export const translations = {
  fr: {
    title: "Catalogue de Produits",
    search: "Rechercher un produit...",
    loading: "Chargement...",
    price: "Prix:",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    results: "Résultats pour",
    productsFound: "produits trouvés"
  },
  en: {
    title: "Product Catalog",
    search: "Search for a product...",
    loading: "Loading...",
    price: "Price:",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    results: "Results for",
    productsFound: "products found"
  }
};

export const LanguageContext = createContext();
export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('fr');

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