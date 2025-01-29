import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { useDebounce } from '../hooks/useDebounce';
import { LanguageContext } from '../App';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const { translations } = useContext(LanguageContext);
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setIsSearching(true);
    onSearch(debouncedSearchTerm);
    setIsSearching(false);
  }, [debouncedSearchTerm, onSearch]);
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translations.search}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
      {isSearching && <div className="text-muted mt-2">{translations.loading}</div>}
    </div>
  );
};

export default ProductSearch;