module.exports = {
  apps: [
    {
      name: "JCWD-CT-SINARMAS", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8912,
      },
      time: true,
    },
  ],
};
