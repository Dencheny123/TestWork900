/**
 * Утилиты для работы с cookies
 */

/**
 * Устанавливает cookie
 * @param name - имя cookie
 * @param value - значение cookie
 * @param days - срок действия в днях
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Получает значение cookie по имени
 * @param name - имя cookie
 * @returns значение cookie или null
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const nameEQ = name + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

/**
 * Удаляет cookie
 * @param name - имя cookie
 */
export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/**
 * Сохраняет JWT токены в cookies
 * @param accessToken - access токен
 * @param refreshToken - refresh токен
 */
export function setAuthCookies(
  accessToken: string,
  refreshToken: string
): void {
  setCookie('access_token', accessToken, 1); // 1 день для access токена
  setCookie('refresh_token', refreshToken, 7); // 7 дней для refresh токена
}

/**
 * Очищает auth cookies
 */
export function clearAuthCookies(): void {
  deleteCookie('access_token');
  deleteCookie('refresh_token');
}

/**
 * Получает auth токены из cookies
 * @returns объект с access и refresh токенами
 */
export function getAuthCookies(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  return {
    accessToken: getCookie('access_token'),
    refreshToken: getCookie('refresh_token'),
  };
}
