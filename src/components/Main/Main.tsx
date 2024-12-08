import React, { useEffect } from 'react';
import { useProductStore } from '../Store/Store'; //хук из Zustand, который позволяет получить доступ к хранилищу продуктов.
import './style.css'

const Main: React.FC = () => {
    const { products, fetchProducts, toggleLike, deleteProduct } = useProductStore();

    useEffect(() => { // Хук useEffect выполняет асинхронную функцию fetchProducts, когда компонент монтируется (при первом рендере).
        fetchProducts();
    }, [fetchProducts]); // Зависимость [fetchProducts] гарантирует, что функция будет вызвана только один раз при монтировании компонента.

    return (
        <div className='container'>
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">Price: {product.price.toFixed(2)}$</p>
                    <p className="product-description">{product.description.slice(0, 50)}...</p>
                    <div className="product-buttons">
                        <button onClick={() => toggleLike(product.id)}>
                            {product.liked ? 'Не нравиться' : 'Нравиться'}
                        </button>
                        <button className='delete' onClick={() => deleteProduct(product.id)}>Удалить</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Main; //Компонент экспортируется, чтобы его можно было использовать в других частях приложения.
