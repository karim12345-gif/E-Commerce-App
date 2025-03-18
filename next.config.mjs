// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['placehold.co'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//     dangerouslyAllowSVG: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  webpack: config => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 3,
      minSize: 10000,
      maxSize: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          maxSize: 50000,
          //  split large libraries
          chunks: 'initial',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    };
    // Bundle Analyzer only runs when ANALYZE=true
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze/bundle-report.html',
          openAnalyzer: false,
        }),
      );
    }

    // Explicitly handle large dependencies
    config.optimization.minimize = true;

    return config;
  },
  compiler: {
    optimizeFonts: true, // Optimize fonts
    optimizeCss: true, // Optimize CSS
    removeConsole: true, //  Remove console logs in production
    modularizeImports: {
      'lodash': {
        transform: 'lodash/{{member}}',
      },
    },
  },
};

export default nextConfig;
