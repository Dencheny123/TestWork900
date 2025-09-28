/**
 * Страница авторизации пользователя
 * Реализует форму входа с валидацией и обработкой JWT токена
 */

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth.store';
import Link from 'next/link';
import styles from './page.module.scss';

/**
 * Форма авторизации
 */
interface LoginForm {
  username: string;
  password: string;
}

/**
 * Страница авторизации
 * @returns JSX элемент страницы авторизации
 */
export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  // Настройка react-hook-form с валидацией
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  /**
   * Обработчик отправки формы авторизации
   * @param data - Данные формы (username и password)
   */
  const onSubmit = async (data: LoginForm) => {
    clearError(); // Очищаем предыдущие ошибки

    try {
      await login({ username: data.username, password: data.password });
      // После успешной авторизации редиректим на главную страницу
      router.push('/');
    } catch (error) {
      // Ошибка уже обработана в хранилище, просто логируем
      console.error('Ошибка авторизации:', error);
    }
  };

  /**
   * Обработчик изменения полей формы (для очистки ошибок)
   */
  const handleInputChange = () => {
    if (error) {
      clearError();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Заголовок страницы */}
        <div className={styles.header}>
          <h1 className={styles.title}>Вход в систему</h1>
          <p className={styles.subtitle}>
            Введите ваши учетные данные для доступа к приложению
          </p>
        </div>

        {/* Форма авторизации */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          {/* Поле username */}
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Имя пользователя *
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="Введите имя пользователя"
              {...register('username', {
                required: 'Имя пользователя обязательно',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Только буквы, цифры и подчеркивания',
                },
              })}
              onInput={handleInputChange}
              aria-invalid={errors.username ? 'true' : 'false'}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && (
              <span id="username-error" className={styles.errorMessage}>
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Поле password */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Пароль *
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="Введите пароль"
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа',
                },
              })}
              onInput={handleInputChange}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span id="password-error" className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Сообщение об ошибке авторизации */}
          {error && (
            <div className={styles.authError} role="alert" aria-live="polite">
              <div className={styles.authErrorIcon}>⚠️</div>
              <span className={styles.authErrorMessage}>{error}</span>
            </div>
          )}

          {/* Кнопка отправки */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Вход...
              </>
            ) : (
              'Войти'
            )}
          </button>

          {/* Демо данные для тестирования */}
          <div className={styles.demoInfo}>
            <h3 className={styles.demoTitle}>Демо доступ:</h3>
            <p className={styles.demoText}>
              <strong>Username:</strong> emilys
              <br />
              <strong>Password:</strong> emilyspass
            </p>
            <p className={styles.demoNote}>
              * Используются тестовые данные из DummyJSON API
            </p>
          </div>
        </form>

        {/* Ссылка на главную страницу */}
        <div className={styles.footer}>
          <Link href="/" className={styles.homeLink}>
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
