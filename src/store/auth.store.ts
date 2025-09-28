/**
 * Хранилище Zustand для управления состоянием авторизации
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginFormErrors } from '@/types/auth.types';
import { AuthResponse, ApiError, AuthRequest } from '@/types/api.types';
import { authService } from '@/services/auth.service';

/** Начальное состояние авторизации */
const initialState: Omit<
  AuthState,
  'login' | 'logout' | 'checkAuth' | 'initializeAuth'
> = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

/** Интерфейс для действий хранилища */
interface AuthActions {
  /** Вход в систему */
  login: (credentials: AuthRequest) => Promise<void>;
  /** Выход из системы */
  logout: () => void;
  /** Проверка авторизации */
  checkAuth: () => Promise<boolean>;
  /** Инициализация авторизации */
  initializeAuth: () => Promise<void>;
  /** Очистка ошибок */
  clearError: () => void;
  /** Валидация формы входа */
  validateLoginForm: (formData: AuthRequest) => LoginFormErrors;
}

/** Тип полного хранилища авторизации */
type AuthStore = AuthState & AuthActions;

/**
 * Хранилище авторизации с использованием Zustand и persistence
 * Сохраняет состояние в localStorage для сохранения сессии
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Инициализация авторизации при загрузке приложения
       */
      initializeAuth: async () => {
        // Инициализируем токены из localStorage
        authService.initializeTokens();

        const accessToken = authService.getAccessToken();

        if (!accessToken) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ isLoading: true });

        try {
          // Проверяем валидность токена
          const isValid = await authService.checkAuth();

          if (isValid) {
            // Получаем данные текущего пользователя
            const userData = await authService.getCurrentUser();

            const user: User = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              gender: userData.gender,
              image: userData.image,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: 'Ошибка инициализации авторизации',
          });
        }
      },

      /**
       * Вход в систему
       * @param credentials - учетные данные пользователя
       */
      login: async (credentials: AuthRequest) => {
        // Валидация формы
        const errors = get().validateLoginForm(credentials);
        if (Object.keys(errors).length > 0) {
          set({ error: 'Пожалуйста, исправьте ошибки в форме' });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response: AuthResponse = await authService.login(credentials);

          const user: User = {
            id: response.id,
            username: response.username,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            gender: response.gender,
            image: response.image,
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || 'Ошибка авторизации',
            isAuthenticated: false,
          });
        }
      },

      /**
       * Выход из системы
       */
      logout: () => {
        // Очищаем токены через сервис
        authService.logout();

        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      /**
       * Проверка авторизации
       * @returns Promise с результатом проверки
       */
      checkAuth: async (): Promise<boolean> => {
        try {
          const isValid = await authService.checkAuth();

          if (!isValid) {
            set({
              isAuthenticated: false,
              user: null,
            });
            return false;
          }

          // Если токен валиден, но пользователь не загружен, загружаем данные
          const { user } = get();
          if (!user) {
            const userData = await authService.getCurrentUser();
            const user: User = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              gender: userData.gender,
              image: userData.image,
            };

            set({
              user,
              isAuthenticated: true,
            });
          }

          return true;
        } catch (error) {
          console.error('Auth check failed:', error);
          set({
            isAuthenticated: false,
            user: null,
          });
          return false;
        }
      },

      /**
       * Очистка ошибок
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Валидация формы входа
       * @param formData - данные формы
       * @returns объект с ошибками валидации
       */
      validateLoginForm: (formData: AuthRequest): LoginFormErrors => {
        const errors: LoginFormErrors = {};

        // Валидация имени пользователя
        if (!formData.username) {
          errors.username = 'Имя пользователя обязательно';
        } else if (formData.username.trim().length < 3) {
          errors.username =
            'Имя пользователя должно содержать минимум 3 символа';
        }

        // Валидация пароля
        if (!formData.password) {
          errors.password = 'Пароль обязателен';
        } else if (formData.password.trim().length < 3) {
          errors.password = 'Пароль должен содержать минимум 3 символа';
        }

        return errors;
      },
    }),
    {
      name: 'auth-storage', // уникальное имя для localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Хук для получения состояния авторизации
 * @returns объект с состоянием и действиями авторизации
 */
export const useAuth = () => {
  const authState = useAuthStore();

  return {
    // Состояние
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    isAuthenticated: authState.isAuthenticated,

    // Действия
    login: authState.login,
    logout: authState.logout,
    checkAuth: authState.checkAuth,
    initializeAuth: authState.initializeAuth,
    clearError: authState.clearError,
    validateLoginForm: authState.validateLoginForm,
  };
};
