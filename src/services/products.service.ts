/**
 * Сервис для работы с продуктами через DummyJSON API
 */

import {
  Product,
  ProductsResponse,
  ProductsRequestParams,
} from '@/types/products.types';
import { apiClient, buildUrl, handleError, handleSuccess } from './api.client';

/**
 * Сервис продуктов
 */
export const productsService = {
  /**
   * Получение списка продуктов
   * @param params - параметры запроса (лимит, пропуск, категория, поиск)
   * @returns Promise с ответом API
   */
  async getProducts(params?: ProductsRequestParams): Promise<ProductsResponse> {
    try {
      const defaultParams: ProductsRequestParams = {
        limit: 12,
        skip: 0,
        ...params,
      };

      const url = buildUrl('/products', defaultParams);
      const response = await apiClient.get<ProductsResponse>(url);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Получение продукта по ID
   * @param id - идентификатор продукта
   * @returns Promise с данными продукта
   */
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Получение продуктов по категории
   * @param category - категория продукта
   * @param params - дополнительные параметры запроса
   * @returns Promise с ответом API
   */
  async getProductsByCategory(
    category: string,
    params?: Omit<ProductsRequestParams, 'category'>
  ): Promise<ProductsResponse> {
    try {
      const defaultParams: ProductsRequestParams = {
        limit: 12,
        skip: 0,
        ...params,
      };

      const url = buildUrl(`/products/category/${category}`, defaultParams);
      const response = await apiClient.get<ProductsResponse>(url);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Поиск продуктов
   * @param query - поисковый запрос
   * @param params - дополнительные параметры запроса
   * @returns Promise с ответом API
   */
  async searchProducts(
    query: string,
    params?: Omit<ProductsRequestParams, 'q'>
  ): Promise<ProductsResponse> {
    try {
      const defaultParams: ProductsRequestParams = {
        limit: 12,
        skip: 0,
        q: query,
        ...params,
      };

      const url = buildUrl('/products/search', defaultParams);
      const response = await apiClient.get<ProductsResponse>(url);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Получение списка категорий
   * @returns Promise с массивом категорий
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>('/products/categories');
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Получение продуктов с пагинацией
   * @param page - номер страницы (начинается с 1)
   * @param limit - количество продуктов на странице
   * @returns Promise с ответом API
   */
  async getProductsPaginated(
    page: number = 1,
    limit: number = 12
  ): Promise<ProductsResponse> {
    try {
      const skip = (page - 1) * limit;
      const url = buildUrl('/products', { limit, skip });
      const response = await apiClient.get<ProductsResponse>(url);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

export default productsService;
