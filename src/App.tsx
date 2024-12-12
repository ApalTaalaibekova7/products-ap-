import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import ProductPage from './components/ProductPage/ProductPage';
import CreateProductPage from './components/ProductPage/CreateProductPage';
// import SearchBar from './components/SearchBar/SearchBar';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            {/* <SearchBar onSearch={() => {}} /> */}
            <Main />
       
          </>
        } />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
