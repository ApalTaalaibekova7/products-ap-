import React, { useEffect, useState } from 'react';
import { useProductStore } from '../Store/Store';
import { Link } from 'react-router-dom';
import './style.css';
import Pagination from '../PaginationProps/PaginationProps';
import SearchBar from '../SearchBar/SearchBar';

const Main: React.FC = () => {
  const { products, fetchProducts, toggleLike, deleteProduct } = useProductStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products
  .filter((product) => 
    showFavorites ? product.liked : true // Фильтруем по избранным, если включено
  )
  .filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтруем по запросу
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
    const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return ( <div>
    <div> 
      <SearchBar onSearch={handleSearch} />
         <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? 'Показать все' : 'Показать избранные'}
      </button>
      <div className="controls">
        <Link to="/create-product">
          <button className="add-product">Добавить продукт</button>
        </Link>  </div>
    </div>

    <div className="container">
      
     
      {paginatedProducts.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/products/${product.id}`} className="product-link">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">Price: {product.price.toFixed(2)}$</p>
            <p className="product-description">
              {`${product.description.slice(0, 100)}${product.description.length > 100 ? '...' : ''}`}
            </p>
          </Link>
          <div className="product-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(product.id);
              }}
            >
              {product.liked ? 'Не нравиться' : 'Нравиться'}
            </button>
            <button
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(product.id);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      <Pagination
        totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
    </div>
  );
};

export default Main;
