import { create } from 'zustand';

// Тип данных продукта
export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
  price: number;
}

// Тип состояния хранилища
export interface ProductStore {
  products: Product[]; // — массив продуктов, где каждый продукт соответствует типу Product.
  fetchProducts: () => Promise<void>; // — асинхронная функция для загрузки данных о продуктах.
  toggleLike: (id: number) => void; // — функция для изменения состояния лайка конкретного продукта.
  deleteProduct: (id: number) => void; // — функция для удаления продукта из списка.
}

// Создание Zustand Store
export const useProductStore = create<ProductStore>((set) => ({
  products: [], // Здесь используется функция create из библиотеки Zustand для создания хранилища. Хранилище содержит:
  // Состояние: начальный список продуктов (products: []). Методы: функции, которые изменяют состояние.

  fetchProducts: async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      // Это асинхронная функция, которая делает запрос на внешний API (https://fakestoreapi.com/products), чтобы получить данные о продуктах.
      const data: Product[] = await response.json();
      set({ products: data.map((item) => ({ ...item, liked: false })) });
      // После получения данных, он преобразует их в формат Product[], добавляя каждому продукту поле liked, которое изначально установлено в false.
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    // Если запрос не удался, то ловится ошибка и выводится сообщение в консоль.
  },

  toggleLike: (id) => // Эта функция принимает id продукта и изменяет его состояние лайка.
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      ),
    })),

  deleteProduct: (id) => // Эта функция принимает id продукта и удаляет продукт с этим id из массива продуктов.
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));

export default useProductStore;
