/**
 * Компонент Header с условным отображением в зависимости от авторизации
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/auth.store';
import styles from './Header.module.scss';
import Image from 'next/image';

/**
 * Компонент Header с навигацией
 * @returns JSX элемент заголовка
 */
const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  /**
   * Обработчик выхода из системы
   */
  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип или название приложения */}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <h1 className={styles.logoText}>DummyStore</h1>
          </Link>
        </div>

        {/* Навигация */}
        <nav className={styles.nav}>
          {isAuthenticated && user ? (
            // Для авторизованного пользователя
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>
                  {user.firstName} {user.lastName}
                </span>
                {user.image && (
                  <div className={styles.avatarContainer}>
                    <Image
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className={styles.userAvatar}
                      width={40}
                      height={40}
                      sizes="40px"
                      onError={() => {
                        console.error(
                          'Ошибка загрузки аватара пользователя:',
                          user.image
                        );
                      }}
                      fetchPriority="high"
                      priority={true}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            // Для неавторизованного пользователя
            <div className={styles.authSection}>
              <Link href="/login" className={styles.loginLink}>
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
