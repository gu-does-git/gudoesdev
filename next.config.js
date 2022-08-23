/** @type {import('next').NextConfig} */
const withNextra = require("nextra")({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.js",
});

const nextConfig = {};

module.exports = withNextra(nextConfig);
