/**
 * Типы для работы с продуктами DummyJSON API
 */

import { ApiResponse } from './api.types';

/** Интерфейс продукта */
export interface Product {
  /** Уникальный идентификатор продукта */
  id: number;
  /** Название продукта */
  title: string;
  /** Описание продукта */
  description: string;
  /** Цена продукта */
  price: number;
  /** Процент скидки */
  discountPercentage: number;
  /** Рейтинг продукта */
  rating: number;
  /** Количество на складе */
  stock: number;
  /** Бренд продукта */
  brand: string;
  /** Категория продукта */
  category: string;
  /** Миниатюрное изображение */
  thumbnail: string;
  /** Массив изображений продукта */
  images: string[];
}

/** Интерфейс для параметров запроса продуктов */
export interface ProductsRequestParams {
  /** Лимит продуктов (по умолчанию 12) */
  limit?: number;
  /** Пропустить продуктов */
  skip?: number;
  /** Категория для фильтрации */
  category?: string;
  /** Поисковый запрос */
  q?: string;
  /** Индексная сигнатура для совместимости с Record<string, string | number | boolean> */
  [key: string]: string | number | boolean | undefined | null;
}

/** Ответ API для продуктов */
export type ProductsResponse = ApiResponse<Product>;

/** Интерфейс для состояния продуктов в хранилище */
export interface ProductsState {
  /** Массив продуктов */
  products: Product[];
  /** Текущий продукт (для детальной страницы) */
  currentProduct: Product | null;
  /** Состояние загрузки */
  isLoading: boolean;
  /** Сообщение об ошибке */
  error: string | null;
  /** Общее количество продуктов */
  total: number;
  /** Параметры текущего запроса */
  params: ProductsRequestParams;
}

/** Интерфейс для карточки продукта в UI */
export interface ProductCardProps {
  /** Данные продукта */
  product: Product;
  /** Флаг, показывать ли кнопку добавления в корзину */
  showAddToCart?: boolean;
  /** Обработчик клика по кнопке добавления в корзину */
  onAddToCart?: (product: Product) => void;
  /** Дополнительные CSS классы */
  className?: string;
}
