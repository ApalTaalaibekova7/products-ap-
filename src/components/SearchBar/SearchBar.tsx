import React, { useState } from 'react';
import './Search.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query); // Вызовем onSearch при нажатии Enter
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Обработчик события нажатия клавиши
        placeholder="Поиск..."
      />
    </div>
  );
};

export default SearchBar;


// import React, { useEffect, useState } from 'react';
// import { useProductStore } from '../Store/Store';
// import { Link } from 'react-router-dom';
// import './style.css';
// import Pagination from '../PaginationProps/PaginationProps';
// import SearchBar from '../SearchBar/SearchBar';

// const Main: React.FC = () => {
//   const { products, fetchProducts, toggleLike, deleteProduct } = useProductStore();
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const itemsPerPage = 30;

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   return ( <div>
//     <SearchBar onSearch={handleSearch} />

//     <div className="container">
//       <h1>Список продуктов</h1>
     
      
//       <div className="products-grid">
//         {paginatedProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <Link to={`/products/${product.id}`} className="product-link">
//               <img src={product.image} alt={product.title} className="product-image" />
//               <h3 className="product-title">{product.title}</h3>
//               <p className="product-price">{product.price.toFixed(2)}$</p>
//               <p className="product-description">
//                 {`${product.description.slice(0, 100)}${
//                   product.description.length > 100 ? '...' : ''
//                 }`}
//               </p>
//             </Link>
//             <div className="product-buttons">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleLike(product.id);
//                 }}
//               >
//                 {product.liked ? 'Не нравится' : 'Нравится'}
//               </button>
//               <button
//                 className="delete"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   deleteProduct(product.id);
//                 }}
//               >
//                 Удалить
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Pagination
//         totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
//         currentPage={currentPage}
//         onPageChange={(page) => setCurrentPage(page)}
//       />
//     </div>
//     </div>
//   );
// };

// export default Main;
