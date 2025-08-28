import withPWA from 'next-pwa';

// Cache strategy: hero images (jpeg/avif) served from /public/images should be cached
// aggressively with a CacheFirst strategy to avoid reload flicker.
// We scope runtimeCaching to only those image URLs to prevent over-caching.
// Additional static assets (Next build output) are already handled by Next.js.

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  // Allow current formatting discrepancies to not block builds.
  eslint: { ignoreDuringBuilds: true },
  // PWA settings injected below.
};

export default withPWA({
  dest: 'public',
  disable: !isProd, // Disable PWA in development for faster HMR.
  register: false, // We'll register manually to control timing.
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      // Match hero images we explicitly want to cache (JPEG & AVIF)
      urlPattern: /\/images\/(hold-coffee\.jpeg|palestras\.avif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
        matchOptions: {
          ignoreVary: true,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
})(baseConfig);
