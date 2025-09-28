/**
 * Базовые типы для API DummyJSON
 */

/** Базовый интерфейс для ответа API */
export interface ApiResponse<T> {
  /** Массив данных */
  products: T[];
  /** Общее количество записей */
  total: number;
  /** Пропустить записей */
  skip: number;
  /** Лимит записей */
  limit: number;
}

/** Интерфейс для ответа авторизации */
export interface AuthResponse {
  /** Идентификатор пользователя */
  id: number;
  /** Имя пользователя */
  username: string;
  /** Электронная почта */
  email: string;
  /** Имя */
  firstName: string;
  /** Фамилия */
  lastName: string;
  /** Пол */
  gender: string;
  /** Изображение профиля */
  image: string;
  /** JWT токен */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
}

/** Интерфейс для ответа обновления токена */
export interface RefreshTokenResponse {
  /** Новый access token */
  accessToken: string;
  /** Новый refresh token */
  refreshToken: string;
}

/** Интерфейс для запроса обновления токена */
export interface RefreshTokenRequest {
  /** Refresh token (опционально, если не указан, используется из cookies) */
  refreshToken?: string;
  /** Время жизни токена в минутах (опционально, по умолчанию 60) */
  expiresInMins?: number;
}

/** Интерфейс для запроса авторизации */
export interface AuthRequest {
  /** Имя пользователя */
  username: string;
  /** Пароль */
  password: string;
}

/** Интерфейс для ошибки API */
export interface ApiError {
  /** Сообщение об ошибке */
  message: string;
  /** Код ошибки */
  status?: number;
}

/** Интерфейс для состояния загрузки */
export interface LoadingState {
  /** Флаг загрузки */
  isLoading: boolean;
  /** Сообщение об ошибке */
  error: string | null;
}
