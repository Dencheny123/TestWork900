/**
 * Компонент карточки продукта
 * Отображает информацию о товаре с изображением, названием, категорией и ценой
 * Оптимизирован для работы при медленном интернете с скелетонами
 * Использует useCallback и useMemo для оптимизации производительности
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Product } from '@/types/products.types';
import styles from './ProductCard.module.scss';
import Image from 'next/image';

/**
 * Пропсы компонента ProductCard
 */
interface ProductCardProps {
  /** Объект продукта для отображения */
  product: Product;
  /** Флаг показа кнопки "Add to cart" */
  showAddToCart: boolean;
  /** Обработчик добавления в корзину */
  onAddToCart?: (product: Product) => void;
  /** Флаг приоритетной загрузки изображения (для LCP) */
  priority?: boolean;
}

/**
 * Компонент карточки продукта
 * Отображает информацию о товаре в карточке с адаптивным дизайном
 * Использует скелетоны для плавного UX при загрузке изображений
 * @param props - Пропсы компонента
 * @returns JSX элемент карточки продукта
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart,
  onAddToCart,
  priority = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  /**
   * Обработчик клика по кнопке добавления в корзину
   * Используем useCallback для мемоизации функции
   */
  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  }, [onAddToCart, product]);

  /**
   * Форматирование цены в читаемый формат
   * Используем useMemo для мемоизации форматированной цены
   */
  const formatPrice = useCallback((price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }, []);

  /**
   * Мемоизированная основная цена продукта
   */
  const formattedPrice = useMemo(
    () => formatPrice(product.price),
    [formatPrice, product.price]
  );

  /**
   * Мемоизированная цена со скидкой
   */
  const formattedOriginalPrice = useMemo(() => {
    if (product.discountPercentage > 0) {
      return formatPrice(
        product.price * (1 + product.discountPercentage / 100)
      );
    }
    return null;
  }, [formatPrice, product.price, product.discountPercentage]);

  /**
   * Мемоизированное описание продукта (обрезанное)
   */
  const truncatedDescription = useMemo(() => {
    return product.description.length > 100
      ? `${product.description.substring(0, 100)}...`
      : product.description;
  }, [product.description]);

  /**
   * Мемоизированный рейтинг в виде звезд
   */
  const ratingStars = useMemo(() => {
    if (product.rating > 0) {
      return {
        stars:
          '★'.repeat(Math.floor(product.rating)) +
          '☆'.repeat(5 - Math.floor(product.rating)),
        value: `(${product.rating})`,
      };
    }
    return null;
  }, [product.rating]);

  /**
   * Обработчик успешной загрузки изображения
   * Используем useCallback для мемоизации функции
   */
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  /**
   * Обработчик ошибки загрузки изображения
   * Используем useCallback для мемоизации функции
   */
  const handleImageError = useCallback(() => {
    setImageError(true);
    console.error('Ошибка загрузки изображения:', product.thumbnail);
  }, [product.thumbnail]);

  return (
    <article
      className={styles.card}
      role="article"
      aria-label={`Карточка товара: ${product.title}`}
    >
      {/* Изображение продукта с фиксированными размерами для предотвращения CLS */}
      <div className={styles.imageContainer}>
        {/* Скелетон изображения пока не загружено */}
        {(!imageLoaded || imageError) && (
          <div className={styles.imageSkeleton}>
            <div className={styles.skeletonShimmer}></div>
          </div>
        )}

        {/* Основное изображение */}
        <div
          className={`${styles.imageWrapper} ${imageLoaded && !imageError ? styles.imageVisible : styles.imageHidden}`}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
            onLoad={handleImageLoad}
            onError={handleImageError}
            width={280}
            height={280}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fetchPriority="high"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABFigMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTtSlT54b6bk+h0R//2Q=="
          />
          {/* Бейдж скидки если есть */}
          {product.discountPercentage > 0 && (
            <span className={styles.discountBadge}>
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
      </div>

      {/* Контент карточки */}
      <div className={styles.content}>
        {/* Категория */}
        <span
          className={styles.category}
          aria-label={`Категория: ${product.category}`}
        >
          {product.category}
        </span>

        {/* Название продукта */}
        <h2 className={styles.title} title={product.title}>
          {product.title}
        </h2>

        {/* Бренд если есть */}
        {product.brand && (
          <p className={styles.brand} aria-label={`Бренд: ${product.brand}`}>
            {product.brand}
          </p>
        )}

        {/* Описание продукта */}
        <p
          className={styles.description}
          aria-label={`Описание: ${product.description}`}
        >
          {truncatedDescription}
        </p>

        {/* Рейтинг если есть */}
        {ratingStars && (
          <div
            className={styles.rating}
            aria-label={`Рейтинг: ${product.rating} из 5`}
          >
            <span className={styles.ratingStars}>{ratingStars.stars}</span>
            <span className={styles.ratingValue}>{ratingStars.value}</span>
          </div>
        )}

        {/* Цена и кнопка добавления */}
        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            {/* Основная цена */}
            <span className={styles.price}>{formattedPrice}</span>

            {/* Цена со скидкой если есть */}
            {formattedOriginalPrice && (
              <span className={styles.originalPrice}>
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          {/* Кнопка добавления в корзину */}
          {showAddToCart && (
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddToCart}
              aria-label={`Добавить ${product.title} в корзину`}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
