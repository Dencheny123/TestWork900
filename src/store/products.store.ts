/**
 * Хранилище Zustand для управления состоянием продуктов
 * Обеспечивает загрузку, кэширование и управление состоянием продуктов
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductsResponse } from '@/types/products.types';
import { productsService } from '@/services/products.service';

/**
 * Состояние хранилища продуктов
 */
interface ProductsState {
  /** Список продуктов */
  products: Product[];
  /** Флаг загрузки */
  isLoading: boolean;
  /** Сообщение об ошибке */
  error: string | null;
  /** Время последнего обновления */
  lastUpdated: number | null;
}

/**
 * Действия хранилища продуктов
 */
interface ProductsActions {
  /** Загрузка списка продуктов */
  fetchProducts: (params?: {
    limit?: number;
    skip?: number;
    search?: string;
  }) => Promise<void>;
  /** Сброс состояния ошибки */
  clearError: () => void;
  /** Сброс всего состояния */
  reset: () => void;
}

/**
 * Полное состояние хранилища продуктов
 */
type ProductsStore = ProductsState & ProductsActions;

/**
 * Начальное состояние хранилища
 */
const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

/**
 * Хранилище Zustand для управления продуктами
 * Использует persistence для кэширования данных
 */
export const useProducts = create<ProductsStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Загрузка списка продуктов с API
       * @param params - Параметры запроса (лимит, пропуск, поиск)
       */
      fetchProducts: async (params = {}) => {
        const { limit = 12, skip = 0, search } = params;

        // Проверяем, есть ли актуальные данные в кэше (5 минут)
        const currentTime = Date.now();
        const { lastUpdated, products } = get();

        if (
          lastUpdated &&
          currentTime - lastUpdated < 5 * 60 * 1000 &&
          products.length > 0
        ) {
          return; // Используем кэшированные данные
        }

        set({ isLoading: true, error: null });

        try {
          const response: ProductsResponse = await productsService.getProducts({
            limit,
            skip,
            ...(search && { q: search }),
          });

          // Валидация ответа API
          if (!response.products || !Array.isArray(response.products)) {
            throw new Error('Некорректный формат ответа от сервера');
          }

          set({
            products: response.products,
            isLoading: false,
            error: null,
            lastUpdated: currentTime,
          });
        } catch (error) {
          console.error('Ошибка загрузки продуктов:', error);

          let errorMessage = 'Неизвестная ошибка при загрузке продуктов';

          if (error instanceof Error) {
            if (error.message.includes('Network Error')) {
              errorMessage = 'Ошибка сети. Проверьте подключение к интернету';
            } else if (error.message.includes('404')) {
              errorMessage = 'Сервер продуктов недоступен';
            } else if (error.message.includes('500')) {
              errorMessage = 'Внутренняя ошибка сервера';
            } else {
              errorMessage = error.message;
            }
          }

          set({
            isLoading: false,
            error: errorMessage,
            products: [], // Очищаем продукты при ошибке
          });
        }
      },

      /**
       * Сброс состояния ошибки
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Полный сброс состояния хранилища
       */
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'products-store', // Ключ для localStorage
      partialize: (state) => ({
        products: state.products,
        lastUpdated: state.lastUpdated,
      }), // Сохраняем только продукты и время обновления
    }
  )
);

/**
 * Хуки для удобного доступа к состоянию продуктов
 */

/**
 * Хук для получения списка продуктов
 * @returns Список продуктов
 */
export const useProductsList = () => useProducts((state) => state.products);

/**
 * Хук для получения состояния загрузки
 * @returns Флаг загрузки
 */
export const useProductsLoading = () => useProducts((state) => state.isLoading);

/**
 * Хук для получения ошибки
 * @returns Сообщение об ошибке или null
 */
export const useProductsError = () => useProducts((state) => state.error);

/**
 * Хук для получения действий с продуктами
 * @returns Действия хранилища продуктов
 */
export const useProductsActions = () => {
  const { fetchProducts, clearError, reset } = useProducts();
  return { fetchProducts, clearError, reset };
};

/**
 * Хук для получения продукта по ID
 * @param productId - ID продукта
 * @returns Продукт или undefined
 */
export const useProductById = (productId: number) =>
  useProducts((state) =>
    state.products.find((product) => product.id === productId)
  );

/**
 * Хук для получения продуктов по категории
 * @param category - Категория продуктов
 * @returns Отфильтрованный список продуктов
 */
export const useProductsByCategory = (category: string) =>
  useProducts((state) =>
    state.products.filter((product) => product.category === category)
  );
