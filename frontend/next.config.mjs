/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // Get the current file's absolute path
const __dirname = path.dirname(__filename);

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config, { isServer }) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    if(!isServer) {
      config.resolve.alias['dns'] = path.join(__dirname, 'mocks', 'dns');
      config.resolve.alias['fs'] = false; // This will prevent Next.js from trying to resolve 'fs' on the client-side
      config.resolve.alias['net'] = false;
      config.resolve.alias['tls'] = false;

    }
    return config
  }
}

export default nextConfig