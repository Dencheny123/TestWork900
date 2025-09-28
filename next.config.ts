/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  // Включить Turbopack для разработки
  experimental: {
    optimizeCss: true,
  },
  
  // Оптимизации производительности
  compiler: {
    // Включить оптимизацию React для продакшена
    reactRemoveProperties: true,
    removeConsole: true,
  },
  
  // Оптимизация изображений
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 1 день
  },
  
  // Headers для оптимизации загрузки
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  
  // Отключить source maps в продакшене
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
