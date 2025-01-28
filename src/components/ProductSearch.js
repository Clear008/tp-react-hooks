import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { useDebounce } from '../hooks/useDebounce';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  
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
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
      {isSearching && <div className="text-muted mt-2">Recherche en cours...</div>}
    </div>
  );
};

export default ProductSearch;