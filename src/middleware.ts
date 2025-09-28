/**
 * Middleware для работы с JWT авторизацией
 * Защищает только страницу /login от авторизованных пользователей
 * Все остальные роуты доступны без ограничений
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Конфигурация middleware - только страница логина
 */
export const config = {
  matcher: ['/login'],
};

/**
 * Middleware для редиректа авторизованных пользователей с /login на главную
 * @param request - Входящий запрос
 * @returns NextResponse с редиректом или продолжением запроса
 */
export function middleware(request: NextRequest) {
  // Получаем JWT токен из cookies
  const token = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!token;

  // Получаем путь запроса
  const { pathname } = request.nextUrl;

  // Если пользователь аутентифицирован и пытается получить доступ к странице логина
  if (isAuthenticated && pathname === '/login') {
    // Редиректим на главную страницу
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Для всех остальных случаев пропускаем запрос
  return NextResponse.next();
}
