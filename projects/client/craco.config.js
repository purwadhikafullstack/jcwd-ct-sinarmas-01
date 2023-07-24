const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8
      })
    ]
  }
};
