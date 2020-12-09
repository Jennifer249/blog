"use strict";
/**
 * @type {import('weboack').Configuration}
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
});

const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: "./src/main.js"
  },
  output: {
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',//动态import文件名
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV  === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
      test: /\.(png|svg|jpg|gif)$/,
      loader: "url-loader",
      exclude: [resolve('src/icons')],
      options: {
        name: "static/images/[name]-[hash:6].[ext]",
        limit: 10000
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: "url-loader",
      options: {
        name: "static/images/[name]-[hash:6].[ext]",
        limit: 10000
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        resolve('src'),
        resolve('node_modules/webpack-dev-server/src'),
      ]
    }, {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: [resolve('src/icons')],
      options: {
        symbolId: 'icon-[name]'
      }
    }]
  },
  externals: {
    'vue-echarts': 'VueECharts',
    'echarts': 'echarts',
    'vue': 'Vue',
    'vuex': 'Vuex',
    'showdown': 'showdown',
  },
  // 更精确的控制bundle信息显示
  stats: { 
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = webpackConfig;