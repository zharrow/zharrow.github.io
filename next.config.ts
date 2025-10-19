import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type-check during build
    ignoreBuildErrors: false,
  },
};

export default withNextIntl(nextConfig);
