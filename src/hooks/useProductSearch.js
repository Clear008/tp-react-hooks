import { useState, useEffect, useCallback } from 'react';

const ITEMS_PER_PAGE = 9;

const useProductSearch = (searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fonction de récupération des produits
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Calculer le skip pour la pagination
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      
      // Construire l'URL avec la pagination
      const baseUrl = searchTerm 
        ? `https://dummyjson.com/products/search?q=${searchTerm}`
        : 'https://dummyjson.com/products';
      const url = `${baseUrl}?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      
      setProducts(data.products);
      // Calculer le nombre total de pages
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  // Effet pour charger les produits
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, searchTerm, currentPage]);

  // Fonction de rechargement exposée
  const reload = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Si on change le terme de recherche, revenir à la première page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return { 
    products, 
    loading, 
    error,
    reload,
    currentPage,
    totalPages,
    setCurrentPage
  };
};

export default useProductSearch;