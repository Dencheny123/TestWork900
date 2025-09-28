/**
 * Главная страница с отображением списка товаров
 * Оптимизирована для работы при медленном интернете с использованием скелетонов
 * Использует SWR для кэширования и useCallback/useMemo для оптимизации
 */
'use client';
import React, { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { useAuth } from '@/store/auth.store';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/products/ProductCard/ProductCardSkeleton';
import styles from './page.module.scss';
import { Product } from '@/types/products.types';
import { productsService } from '@/services/products.service';

/**
 * Фетчер для SWR - загрузка продуктов
 */
const fetchProducts = async () => {
  const response = await productsService.getProducts({ limit: 12 });
  return response.products;
};

/**
 * Главная страница приложения
 * Отображает сетку из 12 продуктов с адаптивным дизайном
 * Использует скелетоны для плавного UX при загрузке
 * @returns JSX элемент главной страницы
 */
export default function HomePage() {
  const { isAuthenticated } = useAuth();

  // Используем SWR для кэширования данных с настройками
  const {
    data: products = [],
    error,
    isLoading,
    mutate,
  } = useSWR('/products', fetchProducts, {
    revalidateOnFocus: false, // Не перезагружать при фокусе
    revalidateOnReconnect: true, // Перезагружать при восстановлении соединения
    dedupingInterval: 60000, // Дедупликация запросов в течение 60 секунд
    errorRetryCount: 3, // Количество попыток при ошибке
    refreshInterval: 300000, // Автообновление каждые 5 минут
  });

  /**
   * Обработчик добавления товара в корзину
   * Используем useCallback для мемоизации функции
   */
  const handleAddToCart = useCallback((product: Product) => {
    // В реальном приложении здесь была бы логика добавления в корзину
    console.log('Добавлено в корзину:', product.title);
    // Можно добавить уведомление или другую обратную связь
  }, []);

  /**
   * Повторная загрузка продуктов при ошибке
   * Используем useCallback для мемоизации функции
   */
  const handleRetry = useCallback(() => {
    mutate(); // SWR автоматически перезагрузит данные
  }, [mutate]);

  /**
   * Мемоизированное вычисление количества продуктов
   */
  const productsCount = useMemo(() => products.length, [products]);

  /**
   * Мемоизированное вычисление подзаголовка
   */
  const subtitleText = useMemo(
    () =>
      isLoading
        ? 'Загрузка...'
        : `${productsCount} товаров доступно для покупки`,
    [isLoading, productsCount]
  );

  /**
   * Рендер сетки продуктов или скелетонов
   * Используем useMemo для мемоизации результата
   */
  const productsGrid = useMemo(() => {
    // Если загружаемся, показываем скелетоны
    if (isLoading) {
      return Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={`skeleton-${index}`} />
      ));
    }

    // Если есть продукты, показываем их
    if (products.length > 0) {
      return products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          showAddToCart={isAuthenticated}
          onAddToCart={handleAddToCart}
          priority={index < 6} // Приоритетная загрузка для первых 6 изображений (LCP оптимизация)
        />
      ));
    }

    // Если продуктов нет и не загружаемся
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📦</div>
        <h2 className={styles.emptyTitle}>Продукты не найдены</h2>
        <p className={styles.emptyMessage}>
          Попробуйте обновить страницу или проверьте подключение к интернету
        </p>
      </div>
    );
  }, [isLoading, products, isAuthenticated, handleAddToCart]);

  // Состояние ошибки (имеет приоритет над загрузкой)
  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.errorTitle}>Ошибка загрузки</h2>
            <p className={styles.errorMessage}>
              {error.message ||
                'Не удалось загрузить продукты. Проверьте подключение к интернету.'}
            </p>
            <button onClick={handleRetry} className={styles.retryButton}>
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Заголовок страницы с фиксированной высотой для предотвращения CLS */}
        <div className={styles.header}>
          <h1 className={styles.title}>Наши продукты</h1>
          <p className={styles.subtitle}>{subtitleText}</p>
        </div>

        {/* Сетка продуктов или скелетонов */}
        <div className={styles.productsGrid}>{productsGrid}</div>
      </div>
    </div>
  );
}
