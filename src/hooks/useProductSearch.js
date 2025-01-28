import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage
const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
        const url = searchTerm 
          ? `https://dummyjson.com/products/search?q=${searchTerm}`
          : 'https://dummyjson.com/products';
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return { products, loading, error };
};

export default useProductSearch;