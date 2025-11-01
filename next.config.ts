import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Optimisations de performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Préchargement automatique des routes
  reactStrictMode: true,
  // Compression
  compress: true,
};

export default withNextIntl(nextConfig);
