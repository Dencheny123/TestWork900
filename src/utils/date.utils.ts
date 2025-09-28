/**
 * Утилиты для работы с датами и временем
 * Обеспечивают форматирование и манипуляции с датами
 */

/**
 * Форматирование даты в читаемый формат
 * @param date - Дата для форматирования (строка, число или объект Date)
 * @param options - Опции форматирования Intl.DateTimeFormat
 * @returns Отформатированная строка даты
 */
export const formatDate = (
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat('ru-RU', options).format(dateObj);
};

/**
 * Получение текущего года
 * @returns Текущий год в виде числа
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Проверка, является ли дата сегодняшним днем
 * @param date - Дата для проверки
 * @returns true если дата сегодняшняя
 */
export const isToday = (date: string | number | Date): boolean => {
  const today = new Date();
  const checkDate = new Date(date);

  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Форматирование времени в относительный формат (например, "2 часа назад")
 * @param date - Дата для форматирования
 * @returns Относительная строка времени
 */
export const formatRelativeTime = (date: string | number | Date): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return 'только что';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${getPluralForm(diffInMinutes, ['минуту', 'минуты', 'минут'])} назад`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${getPluralForm(diffInHours, ['час', 'часа', 'часов'])} назад`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${getPluralForm(diffInDays, ['день', 'дня', 'дней'])} назад`;
  }

  return formatDate(targetDate);
};

/**
 * Получение правильной формы слова для русского языка
 * @param number - Число
 * @param forms - Массив форм [одна, две, много]
 * @returns Правильная форма слова
 */
const getPluralForm = (
  number: number,
  forms: [string, string, string]
): string => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
};

/**
 * Проверка срока действия JWT токена
 * @param expiryDate - Дата истечения срока действия
 * @returns true если токен действителен
 */
export const isTokenValid = (expiryDate: string | number | Date): boolean => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  return expiry > now;
};

/**
 * Форматирование длительности в читаемый формат
 * @param milliseconds - Длительность в миллисекундах
 * @returns Отформатированная строка длительности
 */
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} ${getPluralForm(hours, ['час', 'часа', 'часов'])}`;
  }

  if (minutes > 0) {
    return `${minutes} ${getPluralForm(minutes, ['минуту', 'минуты', 'минут'])}`;
  }

  return `${seconds} ${getPluralForm(seconds, ['секунду', 'секунды', 'секунд'])}`;
};
