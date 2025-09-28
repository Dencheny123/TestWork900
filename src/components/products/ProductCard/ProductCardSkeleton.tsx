/**
 * Скелетон для карточки продукта
 * Отображается во время загрузки изображений или данных
 */

import React from 'react';
import styles from './ProductCardSkeleton.module.scss';

/**
 * Компонент скелетона карточки продукта
 * Имитирует структуру реальной карточки для плавного UX
 * @returns JSX элемент скелетона карточки продукта
 */
const ProductCardSkeleton: React.FC = () => {
  return (
    <article
      className={styles.skeletonCard}
      role="article"
      aria-label="Загрузка карточки товара"
      aria-busy="true"
    >
      {/* Скелетон изображения */}
      <div className={styles.skeletonImageContainer}>
        <div className={styles.skeletonImage}></div>
      </div>

      {/* Скелетон контента */}
      <div className={styles.skeletonContent}>
        {/* Скелетон категории */}
        <div className={styles.skeletonCategory}></div>

        {/* Скелетон заголовка */}
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonTitleShort}></div>

        {/* Скелетон бренда */}
        <div className={styles.skeletonBrand}></div>

        {/* Скелетон описания */}
        <div className={styles.skeletonDescription}></div>
        <div className={styles.skeletonDescription}></div>
        <div className={styles.skeletonDescriptionShort}></div>

        {/* Скелетон рейтинга */}
        <div className={styles.skeletonRating}></div>

        {/* Скелетон футера с ценой и кнопкой */}
        <div className={styles.skeletonFooter}>
          <div className={styles.skeletonPriceContainer}>
            <div className={styles.skeletonPrice}></div>
          </div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
