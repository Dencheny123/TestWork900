/**
 * Компонент Footer с динамическим контентом в зависимости от авторизации
 */

'use client';

import React from 'react';
import { useAuth } from '@/store/auth.store';
import styles from './Footer.module.scss';

/**
 * Компонент Footer с информацией о текущем годе и статусе пользователя
 * @returns JSX элемент подвала
 */
const Footer: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            <span className={styles.year}>© {currentYear}</span>
            {isAuthenticated && user && (
              <span className={styles.userStatus}>Logged as {user.email}</span>
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.description}>
              Тестовое приложение для работы с DummyJSON API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
