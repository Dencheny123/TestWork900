/**
 * Утилиты для валидации данных
 * Обеспечивают проверку различных типов данных и форм
 */

/**
 * Интерфейс результата валидации
 */
export interface ValidationResult {
  /** Флаг валидности */
  isValid: boolean;
  /** Сообщение об ошибке */
  message?: string;
}

/**
 * Валидация email адреса
 * @param email - Email для проверки
 * @returns Результат валидации
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email обязателен' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Некорректный формат email' };
  }

  return { isValid: true };
};

/**
 * Валидация пароля
 * @param password - Пароль для проверки
 * @param options - Опции валидации
 * @returns Результат валидации
 */
export const validatePassword = (
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): ValidationResult => {
  const {
    minLength = 6,
    requireUppercase = false,
    requireLowercase = false,
    requireNumbers = false,
    requireSpecialChars = false,
  } = options;

  if (!password) {
    return { isValid: false, message: 'Пароль обязателен' };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Минимальная длина пароля: ${minLength} символов`,
    };
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Пароль должен содержать заглавные буквы',
    };
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Пароль должен содержать строчные буквы',
    };
  }

  if (requireNumbers && !/\d/.test(password)) {
    return { isValid: false, message: 'Пароль должен содержать цифры' };
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Пароль должен содержать специальные символы',
    };
  }

  return { isValid: true };
};

/**
 * Валидация имени пользователя
 * @param username - Имя пользователя для проверки
 * @param options - Опции валидации
 * @returns Результат валидации
 */
export const validateUsername = (
  username: string,
  options: {
    minLength?: number;
    maxLength?: number;
    allowedChars?: RegExp;
  } = {}
): ValidationResult => {
  const {
    minLength = 3,
    maxLength = 50,
    allowedChars = /^[a-zA-Z0-9_]+$/,
  } = options;

  if (!username) {
    return { isValid: false, message: 'Имя пользователя обязательно' };
  }

  if (username.length < minLength) {
    return {
      isValid: false,
      message: `Минимальная длина: ${minLength} символа`,
    };
  }

  if (username.length > maxLength) {
    return {
      isValid: false,
      message: `Максимальная длина: ${maxLength} символов`,
    };
  }

  if (!allowedChars.test(username)) {
    return {
      isValid: false,
      message: 'Разрешены только буквы, цифры и подчеркивания',
    };
  }

  return { isValid: true };
};

/**
 * Валидация номера телефона
 * @param phone - Номер телефона для проверки
 * @returns Результат валидации
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, message: 'Номер телефона обязателен' };
  }

  // Убираем все нецифровые символы, кроме +
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  // Проверяем российский формат (+7...) или международный
  const phoneRegex = /^(\+7|8)?[\d\- ()]{10,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, message: 'Некорректный формат номера телефона' };
  }

  return { isValid: true };
};

/**
 * Валидация URL
 * @param url - URL для проверки
 * @returns Результат валидации
 */
export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, message: 'URL обязателен' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, message: 'Некорректный формат URL' };
  }
};

/**
 * Валидация числа в диапазоне
 * @param value - Число для проверки
 * @param min - Минимальное значение
 * @param max - Максимальное значение
 * @returns Результат валидации
 */
export const validateNumberRange = (
  value: number,
  min?: number,
  max?: number
): ValidationResult => {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Значение должно быть числом' };
  }

  if (min !== undefined && value < min) {
    return { isValid: false, message: `Значение не может быть меньше ${min}` };
  }

  if (max !== undefined && value > max) {
    return { isValid: false, message: `Значение не может быть больше ${max}` };
  }

  return { isValid: true };
};

/**
 * Валидация обязательного поля
 * @param value - Значение для проверки
 * @param fieldName - Название поля (для сообщения об ошибке)
 * @returns Результат валидации
 */
export const validateRequired = (
  value: string | number | boolean | null | undefined | unknown[],
  fieldName: string = 'Поле'
): ValidationResult => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: `${fieldName} обязательно` };
  }

  if (Array.isArray(value) && value.length === 0) {
    return { isValid: false, message: `${fieldName} не может быть пустым` };
  }

  return { isValid: true };
};

/**
 * Валидация длины строки
 * @param value - Строка для проверки
 * @param min - Минимальная длина
 * @param max - Максимальная длина
 * @returns Результат валидации
 */
export const validateLength = (
  value: string,
  min?: number,
  max?: number
): ValidationResult => {
  if (min !== undefined && value.length < min) {
    return { isValid: false, message: `Минимальная длина: ${min} символов` };
  }

  if (max !== undefined && value.length > max) {
    return { isValid: false, message: `Максимальная длина: ${max} символов` };
  }

  return { isValid: true };
};

/**
 * Комплексная валидация формы
 * @param data - Данные формы
 * @param rules - Правила валидации
 * @returns Объект с ошибками или null
 */
export const validateForm = <T extends Record<string, unknown>>(
  data: T,
  rules: Record<
    string,
    (
      value: string | number | boolean | null | undefined | unknown[]
    ) => ValidationResult
  >
): Record<string, string> | null => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const validator = rules[field];
    const fieldValue = (data as Record<string, unknown>)[field] as string;
    const result = validator(fieldValue);

    if (!result.isValid && result.message) {
      errors[field] = result.message;
    }
  });

  return Object.keys(errors).length > 0 ? errors : null;
};
