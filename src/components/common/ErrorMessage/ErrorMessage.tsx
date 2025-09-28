/**
 * Компонент отображения ошибок
 * Универсальный компонент для показа сообщений об ошибках с различными типами
 */

import React from 'react';
import styles from './ErrorMessage.module.scss';

/**
 * Типы ошибок для различного визуального отображения
 */
export type ErrorType = 'error' | 'warning' | 'info' | 'success';

/**
 * Пропсы компонента ErrorMessage
 */
interface ErrorMessageProps {
  /** Сообщение об ошибке */
  message: string;
  /** Тип ошибки (влияет на цвет и иконку) */
  type?: ErrorType;
  /** Заголовок ошибки */
  title?: string;
  /** Функция для повторной попытки */
  onRetry?: () => void;
  /** Текст кнопки повторной попытки */
  retryText?: string;
  /** Дополнительный класс для контейнера */
  className?: string;
  /** Флаг показа иконки */
  showIcon?: boolean;
}

/**
 * Компонент отображения ошибок
 * Отображает сообщение об ошибке с иконкой, заголовком и кнопкой повторной попытки
 * @param props - Пропсы компонента
 * @returns JSX элемент сообщения об ошибке
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  title,
  onRetry,
  retryText = 'Попробовать снова',
  className = '',
  showIcon = true,
}) => {
  /**
   * Получение иконки в зависимости от типа ошибки
   */
  const getIcon = () => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default:
        return '❌';
    }
  };

  /**
   * Получение класса типа ошибки
   */
  const getTypeClass = () => {
    switch (type) {
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      case 'success':
        return styles.success;
      default:
        return styles.error;
    }
  };

  /**
   * Обработчик клика по кнопке повторной попытки
   */
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <div
      className={`${styles.container} ${getTypeClass()} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        {/* Иконка */}
        {showIcon && (
          <div className={styles.icon} aria-hidden="true">
            {getIcon()}
          </div>
        )}

        {/* Текст ошибки */}
        <div className={styles.text}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <p className={styles.message}>{message}</p>
        </div>
      </div>

      {/* Кнопка повторной попытки */}
      {onRetry && (
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleRetry}
            className={styles.retryButton}
            aria-label={retryText}
          >
            {retryText}
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
