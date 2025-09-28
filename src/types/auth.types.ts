/**
 * Типы для работы с авторизацией и пользователями
 */

import { AuthRequest } from './api.types';

/** Интерфейс пользователя */
export interface User {
  /** Уникальный идентификатор пользователя */
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
}

/** Интерфейс для состояния авторизации в хранилище */
export interface AuthState {
  /** Текущий авторизованный пользователь */
  user: User | null;
  /** Состояние загрузки */
  isLoading: boolean;
  /** Сообщение об ошибке */
  error: string | null;
  /** Флаг, авторизован ли пользователь */
  isAuthenticated: boolean;
}

/** Интерфейс для формы авторизации */
export interface LoginFormData {
  /** Имя пользователя */
  username: string;
  /** Пароль */
  password: string;
}

/** Интерфейс для валидации формы авторизации */
export interface LoginFormErrors {
  /** Ошибка имени пользователя */
  username?: string;
  /** Ошибка пароля */
  password?: string;
  /** Общая ошибка формы */
  form?: string;
}

/** Интерфейс для контекста авторизации */
export interface AuthContextType {
  /** Состояние авторизации */
  authState: AuthState;
  /** Функция входа в систему */
  login: (credentials: AuthRequest) => Promise<void>;
  /** Функция выхода из системы */
  logout: () => void;
  /** Функция проверки авторизации */
  checkAuth: () => boolean;
}

/** Интерфейс для защищенных роутов */
export interface ProtectedRouteProps {
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Флаг, требуется ли авторизация (по умолчанию true) */
  requireAuth?: boolean;
  /** URL для редиректа при отсутствии авторизации */
  redirectTo?: string;
}
