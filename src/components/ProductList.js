import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';


const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { translations } = useContext(LanguageContext);
  
  
  const { 
    products, 
    loading, 
    error,
    reload,
    currentPage,
    totalPages,
    setCurrentPage
  } = useProductSearch(searchTerm);
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      Erreur: {error}
    </div>
  );


  return (
    
    <div className="container">
      {/* Bouton de rechargement */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button 
          className={`btn ${isDarkTheme ? 'btn-light' : 'btn-primary'}`}
          onClick={reload}
        >
          ↻ {translations.reload}
        </button>
        
        {searchTerm && (
          <span>
            {translations.results} "{searchTerm}": {products.length} {translations.productsFound}
          </span>
        )}
      </div>
      {/* TODO: Exercice 4.1 - Ajouter le bouton de rechargement */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                <strong>{translations.price}</strong> {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* TODO: Exercice 4.2 - Ajouter les contrôles de pagination */}
      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className={`page-link ${isDarkTheme ? 'bg-dark text-light' : ''}`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
            </li>

            <li className="page-item">
              <span className={`page-link ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
                Page {currentPage} sur {totalPages}
              </span>
            </li>

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className={`page-link ${isDarkTheme ? 'bg-dark text-light' : ''}`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductList;