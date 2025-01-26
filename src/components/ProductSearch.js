import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { useDebounce } from '../hooks/useDebounce';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  // Utilisez le hook useDebounce
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    // Ici, vous pouvez déclencher la recherche avec le terme débounced
    // Par exemple, mettre à jour la liste des produits
    console.log('Recherche avec:', debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;