/**
 * Клиент для работы с API DummyJSON
 * Настроенный экземпляр Axios с интерсепторами для обработки ошибок и JWT
 */

import axios, { AxiosResponse } from 'axios';
import { ApiError, RefreshTokenResponse } from '@/types/api.types';

/** Базовый URL API DummyJSON */
const BASE_URL = 'https://dummyjson.com';

/**
 * Создает и настраивает экземпляр Axios для работы с API
 * @returns настроенный экземпляр Axios
 */

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let accessToken = '';
let refreshToken = '';

/**
 * Задаёт токен доступа для использования в будущих запросах.
 * @param {string} newToken — новый токен доступа для использования.
 */
export function setAccessToken(newToken: string): void {
  accessToken = newToken;
  // Сохраняем в localStorage для сохранения между сессиями
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', newToken);
  }
}

/**
 * Задаёт refresh токен для использования в будущих запросах.
 * @param {string} newToken — новый refresh токен для использования.
 */
export function setRefreshToken(newToken: string): void {
  refreshToken = newToken;
  // Сохраняем в localStorage для сохранения между сессиями
  if (typeof window !== 'undefined') {
    localStorage.setItem('refresh_token', newToken);
  }
}

/**
 * Инициализирует токены из localStorage (для клиентской стороны)
 */
export function initializeTokens(): void {
  if (typeof window !== 'undefined') {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');

    if (storedAccessToken) {
      accessToken = storedAccessToken;
    }
    if (storedRefreshToken) {
      refreshToken = storedRefreshToken;
    }
  }
}

/**
 * Очищает все токены
 */
export function clearTokens(): void {
  accessToken = '';
  refreshToken = '';
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

/**
 * Получает текущий access токен
 */
export function getAccessToken(): string {
  return accessToken;
}

/**
 * Получает текущий refresh токен
 */
export function getRefreshToken(): string {
  return refreshToken;
}

// Инициализируем токены при загрузке модуля
if (typeof window !== 'undefined') {
  initializeTokens();
}

// Интерцептор для добавления токена в заголовки
apiClient.interceptors.request.use(
  (config) => {
    // Не добавляем токен для запросов авторизации и обновления токена
    if (config.url?.includes('/auth/') && !config.url?.includes('/auth/me')) {
      return config;
    }

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор для обработки ошибок и обновления токена
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 (Unauthorized) и это не запрос обновления токена
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Пытаемся обновить токен
        const refreshResponse = await apiClient.post<RefreshTokenResponse>(
          '/auth/refresh',
          {
            refreshToken: refreshToken || undefined,
            expiresInMins: 30,
          }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        // Обновляем токены
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось, очищаем токены и редиректим на логин
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Утилита для построения URL с query параметрами
 * @param baseUrl - базовый URL
 * @param params - объект с параметрами
 * @returns строка URL с query параметрами
 */
export function buildUrl(
  baseUrl: string,
  params?: Record<string, unknown>
): string {
  if (!params) return baseUrl;

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Обработчик успешного ответа API
 * @param response - ответ Axios
 * @returns данные из ответа
 */
export function handleSuccess<T>(response: AxiosResponse<T>): T {
  return response.data;
}

/**
 * Обработчик ошибок API
 * @param error - ошибка
 * @throws ApiError
 */
export function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Ошибка сети',
      status: error.response?.status,
    };
    throw apiError;
  }

  const unknownError: ApiError = {
    message: 'Неизвестная ошибка',
    status: 500,
  };
  throw unknownError;
}
