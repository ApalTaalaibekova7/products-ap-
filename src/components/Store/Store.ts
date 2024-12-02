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
  products: Product[];
  fetchProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
}

// Создание Zustand Store
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      set({ products: data.map((item) => ({ ...item, liked: false })) });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  toggleLike: (id) =>
    set((state) => ({
      products: state.products.map((product) =>

        product.id === id ? { ...product, liked: !product.liked } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));

export default useProductStore;