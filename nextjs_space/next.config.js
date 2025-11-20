const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Para Capacitor/APK: usar 'export' para gerar build estática
  // Para produção normal: remover ou usar undefined
  output: process.env.NEXT_OUTPUT_MODE || (process.env.CAPACITOR === 'true' ? 'export' : undefined),
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  // Para export estático, desabilitar API routes (ou usar URL externa)
  // Se usar export, as API routes não funcionarão - use URL externa no Capacitor
};

module.exports = nextConfig;
