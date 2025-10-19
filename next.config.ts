import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Pour GitHub Pages, utiliser le nom du repo comme basePath
// Par exemple: const basePath = '/portfolio-florent';
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/zharrow' : '';

const nextConfig: NextConfig = {
  output: 'export', // Export statique pour GitHub Pages
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true, // GitHub Pages ne supporte pas l'optimisation d'images Next.js
  },
  eslint: {
    // Warning: This allows production builds with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type-check during build
    ignoreBuildErrors: false,
  },
  trailingSlash: true, // Important pour GitHub Pages

  // Désactiver le middleware en mode export
  // Le middleware next-intl n'est pas compatible avec output: 'export'
  experimental: {
    // @ts-ignore
    after: false,
  },
};

export default withNextIntl(nextConfig);
