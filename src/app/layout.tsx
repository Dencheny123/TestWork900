import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Оптимизация загрузки шрифтов с предварительной загрузкой
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap', // Используем swap для предотвращения FOIT
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'DummyStore - Тестовое приложение',
    template: '%s | DummyStore',
  },
  description:
    'Тестовое приложение для работы с DummyJSON API. Просмотр товаров, авторизация пользователей, управление корзиной.',
  keywords:
    'продукты, интернет-магазин, DummyJSON, тестовое задание, авторизация, товары',
  authors: [{ name: 'TestWork900' }],
  creator: 'TestWork900',
  publisher: 'TestWork900',
  robots: 'index, follow',
  openGraph: {
    title: 'DummyStore - Тестовое приложение',
    description:
      'Тестовое приложение для работы с DummyJSON API. Просмотр товаров, авторизация пользователей, управление корзиной.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'DummyStore',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DummyStore - Тестовое приложение',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DummyStore - Тестовое приложение',
    description:
      'Тестовое приложение для работы с DummyJSON API. Просмотр товаров, авторизация пользователей, управление корзиной.',
  },
  manifest: '/site.webmanifest',
  // Оптимизация для поисковых систем
  verification: {
    google: 'ваш-google-verification-code',
    yandex: 'ваш-yandex-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1, // Исправлено с 2 на 1 для нормального масштабирования
  maximumScale: 5,
  userScalable: true,
  themeColor: '#007bff',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        {/* Предварительная загрузка критических ресурсов */}
        <link rel="preconnect" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
      </head>
      <body className="antialiased">
        <div className="app-layout">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
