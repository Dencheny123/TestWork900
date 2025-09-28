/**
 * Сервис для работы с авторизацией через DummyJSON API
 */

import {
  AuthRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/api.types';
import {
  apiClient,
  handleError,
  handleSuccess,
  setAccessToken,
  setRefreshToken,
  clearTokens,
  initializeTokens,
  getAccessToken,
  getRefreshToken,
} from './api.client';
import {
  setAuthCookies,
  clearAuthCookies,
  getAuthCookies,
} from '@/utils/cookies';

/**
 * Сервис авторизации
 */
export const authService = {
  /**
   * Вход в систему
   * @param credentials - учетные данные пользователя
   * @returns Promise с данными авторизации
   */
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        '/auth/login',
        credentials
      );

      const authData = handleSuccess(response);

      // Сохраняем токены в localStorage и cookies
      setAccessToken(authData.accessToken);
      setRefreshToken(authData.refreshToken);
      setAuthCookies(authData.accessToken, authData.refreshToken);

      return authData;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Выход из системы
   */
  logout(): void {
    // Очищаем токены из localStorage и cookies
    clearTokens();
    clearAuthCookies();
  },

  /**
   * Обновление токена
   * @param refreshTokenData - данные для обновления токена
   * @returns Promise с новыми токенами
   */
  async refreshToken(
    refreshTokenData?: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    try {
      const currentRefreshToken = getRefreshToken();

      const requestData: RefreshTokenRequest = {
        refreshToken:
          refreshTokenData?.refreshToken || currentRefreshToken || undefined,
        expiresInMins: refreshTokenData?.expiresInMins || 30,
      };

      const response = await apiClient.post<RefreshTokenResponse>(
        '/auth/refresh',
        requestData
      );

      const refreshData = handleSuccess(response);

      // Обновляем токены в localStorage и cookies
      setAccessToken(refreshData.accessToken);
      setRefreshToken(refreshData.refreshToken);
      setAuthCookies(refreshData.accessToken, refreshData.refreshToken);

      return refreshData;
    } catch (error) {
      // Если обновление токена не удалось, очищаем токены
      clearTokens();
      return handleError(error);
    }
  },

  /**
   * Получение информации о текущем пользователе
   * @returns Promise с данными пользователя
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await apiClient.get<AuthResponse>('/auth/me');
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Проверка валидности токена
   * @returns Promise с boolean результатом
   */
  async validateToken(): Promise<boolean> {
    try {
      // Используем запрос к защищенному ресурсу для проверки токена
      await this.getCurrentUser();
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  },

  /**
   * Инициализация токенов из localStorage
   */
  initializeTokens(): void {
    initializeTokens();

    // Также инициализируем токены из cookies
    const { accessToken, refreshToken } = getAuthCookies();
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  },

  /**
   * Получение текущего access токена
   * @returns текущий access токен
   */
  getAccessToken(): string {
    return getAccessToken();
  },

  /**
   * Получение текущего refresh токена
   * @returns текущий refresh токен
   */
  getRefreshToken(): string {
    return getRefreshToken();
  },

  /**
   * Проверка авторизации пользователя
   * @returns Promise с boolean результатом
   */
  async checkAuth(): Promise<boolean> {
    try {
      const accessToken = getAccessToken();

      if (!accessToken) {
        return false;
      }

      // Проверяем валидность токена
      return await this.validateToken();
    } catch (error) {
      console.error('Auth check failed:', error);
      return false;
    }
  },
};

export default authService;
