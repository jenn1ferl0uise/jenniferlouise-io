import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The CV page was removed in the redesign; keep old links working.
      { source: '/cv', destination: '/', permanent: true },
      // Case studies live at /work/[slug]; the list itself is on the homepage.
      { source: '/work', destination: '/#work', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
