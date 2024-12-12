import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../Store/Store';
import './CreateProductPage.css';

const CreateProductPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const addProduct = useProductStore((state) => state.addProduct);
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors: string[] = [];
    if (title.trim().length < 3) validationErrors.push('Название должно содержать не менее 3 символов.');
    if (description.trim().length < 10) validationErrors.push('Описание должно содержать не менее 10 символов.');
    if (!price || parseFloat(price) <= 0) validationErrors.push('Цена должна быть положительным числом.');
    if (!/^https?:\/\/.+/.test(image))
      validationErrors.push('Ссылка на изображение должна быть валидным URL с расширением jpg, jpeg, png или gif.');
    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title,
      description,
      price: parseFloat(price),
      image,
      liked: false,
    };

    addProduct(newProduct);
    navigate('/'); // Возвращаемся на главную
  };

  return (
    <div className="create-product-page">
      <h1>Создать продукт</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            placeholder="Введите название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea
            placeholder="Введите описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Цена</label>
          <input
            type="number"
            placeholder="Введите цену"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ссылка на изображение</label>
          <input
            type="text"
            placeholder="Введите URL изображения"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error">
                {error}
              </p>
            ))}
          </div>
        )}
        <button type="submit">Создать продукт</button>
      </form>
 
    </div>
  );
};

export default CreateProductPage;
