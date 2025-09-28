/**
 * Middleware для защиты роутов и работы с JWT авторизацией
 * Обеспечивает проверку аутентификации для защищенных страниц
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Конфигурация middleware - защищенные роуты
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - login page
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};

/**
 * Middleware для проверки JWT токена и защиты роутов
 * @param request - Входящий запрос
 * @returns NextResponse с редиректом или продолжением запроса
 */
export function middleware(request: NextRequest) {
  // Получаем JWT токен из cookies
  const token = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!token;

  // Получаем путь запроса
  const { pathname } = request.nextUrl;

  // Разрешенные публичные пути
  const publicPaths = [
    '/login',
    '/',
    '/robots.txt',
    '/sitemap.xml',
    '/site.webmanifest',
  ];
  const isPublicPath = publicPaths.includes(pathname);

  // Если пользователь не аутентифицирован и пытается получить доступ к защищенному роуту
  if (!isAuthenticated && !isPublicPath) {
    // Создаем URL для редиректа на страницу логина
    const loginUrl = new URL('/login', request.url);
    // Добавляем параметр для редиректа обратно после авторизации
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Если пользователь аутентифицирован и пытается получить доступ к странице логина
  if (isAuthenticated && pathname === '/login') {
    // Редиректим на главную страницу
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Для всех остальных случаев пропускаем запрос
  return NextResponse.next();
}
