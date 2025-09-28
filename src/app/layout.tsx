import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Head from 'next/head';

// Оптимизация загрузки шрифтов с предварительной загрузкой
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap', // Используем swap для предотвращения FOIT
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://testwork900.vercel.app'),
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
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'DummyStore - Тестовое приложение',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DummyStore - Тестовое приложение',
    description: 'Тестовое приложение для работы с DummyJSON API',
    images: ['/icon-512.png'],
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
      <Head>
        <link rel="preconnect" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
      </Head>
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
