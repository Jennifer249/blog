'use strict'

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/proxy': {
        target: 'http://chenzhuolin.com:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '',
        }
      }
    },

    // Various Dev Server settings
    // host: 'localhost',
    port: 8081,
    autoOpenBrowser: true, // 配置npm run dev时，直接打开浏览器
    errorOverlay: true, // 浏览器错误提示 devServer.overlay
    notifyOnErrors: true, // 配合 friendly-errors-webpack-plugin

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false, //待定
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false, // 待定

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map', // 显示loader之前的源码，并指定到行

    cacheBusring: true,  // 待定
    cssSourceMap: true   // 待定
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname,'../server/public/index.html'),
    
    // Paths
    assetsRoot: path.resolve(__dirname, '../server/public'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'nosource-source-map', // 指定为代码错误位置，无法点进去看代码
    
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};