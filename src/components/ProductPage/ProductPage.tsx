import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, useProductStore } from '../Store/Store'; // Импортируем тип Product
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Проверяем, существует ли id
    const foundProduct = products.find((product) => product.id === parseInt(id, 10));
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id, products]);

  if (loading) return <div>Загрузка...</div>;
  if (!product) return <div className="error-message">Продукт не найден :( </div>;

  return (
    <div className="product-page">
      <h1 className="product-title">{product.title}</h1>
      <img src={product.image} alt={product.title} className="product-image" />
      <p className="product-description">{product.description}</p>
      <p className="product-price">Цена: {product.price.toFixed(2)}$</p>
      <p className="product-status">
        {product.liked ? 'Добавлен в избранное' : 'Не в избранном'}
      </p>
      <Link to="/" className="back-button">Назад на главную</Link>
    </div>
  );
};

export default ProductPage;
