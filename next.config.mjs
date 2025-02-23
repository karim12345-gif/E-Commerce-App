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

    // Bundle Analyzer Plugin
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'bundle-report.html',
          openAnalyzer: false,
        }),
      );
    }

    // Explicitly handle large dependencies
    config.optimization.minimize = true;

    return config;
  },
};

export default nextConfig;
