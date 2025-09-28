/**
 * Компонент индикатора загрузки
 * Универсальный спиннер для отображения состояния загрузки
 */

import React from 'react';
import styles from './LoadingSpinner.module.scss';

/**
 * Пропсы компонента LoadingSpinner
 */
interface LoadingSpinnerProps {
  /** Размер спиннера (small, medium, large) */
  size?: 'small' | 'medium' | 'large';
  /** Цвет спиннера */
  color?: 'primary' | 'secondary' | 'white';
  /** Текст под спиннером */
  text?: string;
  /** Дополнительный класс для контейнера */
  className?: string;
}

/**
 * Компонент индикатора загрузки
 * Отображает анимированный спиннер с опциональным текстом
 * @param props - Пропсы компонента
 * @returns JSX элемент индикатора загрузки
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  text,
  className = '',
}) => {
  /**
   * Получение класса размера спиннера
   */
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return styles.spinnerSmall;
      case 'medium':
        return styles.spinnerMedium;
      case 'large':
        return styles.spinnerLarge;
      default:
        return styles.spinnerMedium;
    }
  };

  /**
   * Получение класса цвета спиннера
   */
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return styles.spinnerPrimary;
      case 'secondary':
        return styles.spinnerSecondary;
      case 'white':
        return styles.spinnerWhite;
      default:
        return styles.spinnerPrimary;
    }
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`${styles.spinner} ${getSizeClass()} ${getColorClass()}`}
        aria-label="Загрузка"
      />
      {text && (
        <p className={styles.text} aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
