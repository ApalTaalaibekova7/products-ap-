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
  products: Product[]; // Список продуктов
  fetchProducts: () => Promise<void>; // Загрузка продуктов
  toggleLike: (id: number) => void; // Переключение лайка
  deleteProduct: (id: number) => void; // Удаление продукта
  addProduct: (newProduct: Product) => void; // Добавление нового продукта
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
      set({
        products: data.map((item) => ({
          ...item,
          liked: false, // Добавляем поле liked
        })),
      });
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

    addProduct: (newProduct) =>
      set((state) => {
        const updatedProducts = [...state.products, newProduct];
        console.log('Продукты после добавления:', [...state.products, newProduct]);
        return { products: updatedProducts };
      }),
  }));

export default useProductStore;



// </div>
// <h1>Список продуктов</h1>
// <div>
//   {products.map((product) => (
//     <div key={product.id} className="product-card">
//       <Link to={`/products/${product.id}`}>
//         <img src={product.image} alt={product.title} />
//         <h3>{product.title}</h3>
//         <p>{product.price.toFixed(2)}$</p>
//       </Link>
//     </div>
//   ))}
// </div>
// <Link to="/create-product">
//   <button>Добавить продукт</button>
// </Link>

{/* <div className="controls">
<Link to="/create-product">
  <button className="add-product">Добавить продукт</button>
</Link>
<button */}


// </div>