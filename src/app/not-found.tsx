'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  useEffect(() => {
    const content = document.querySelector(`.${styles.content}`);
    content?.classList.add(styles.fadeIn);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.message}>
          Кажется, мы не можем найти нужную страницу. Возможно, она устарела или
          удалена
        </p>
        <div className={styles.ventIcon}></div>
        <Link href="/" className={styles.homeButton}>
          Вернуться домой
        </Link>
      </div>
    </div>
  );
}
