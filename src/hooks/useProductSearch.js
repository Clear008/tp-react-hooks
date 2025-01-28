import { useState, useEffect } from 'react';

const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Utilisation de DummyJSON à la place
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