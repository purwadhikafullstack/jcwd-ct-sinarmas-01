const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    // plugins: [
    //   new CompressionPlugin({
    //     algorithm: 'gzip',
    //     test: /\.(js|css|html|svg|jpg)$/,
    //     threshold: 8192,
    //     minRatio: 0.8
    //   })
    // ]
  }
};
