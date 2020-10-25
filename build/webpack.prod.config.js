"use strict";
const path = require('path');
const merge = require('webpack-merge');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //优化或压缩css
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production', //可以省去配置js压缩、全局变量production的配置
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "../server/public"),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        miniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.vue$/,
      loader: "vue-loader",
      options: {
        loaders: {
          css: [miniCssExtractPlugin.loader, 'css-loader']
        }
      }
    }]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "static/css/[name].css",
      allChunks: true //所有的CSS文件合并成1个文件, allChunks设置成true
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, '../static'),
        to: 'static',
        globOptions: {
          ignore: [
            '**/.*'
          ]
        }
      }]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
      inject: true
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 10,
          name: 'vendor',
          test: /node_modules/, // 正则规则验证，如果符合就提取 chunk (指定是node_modules下的第三方包)
          chunks: 'all', //把非动态模块打包进 vendor，动态模块优化打包
          reuseExistingChunk: true
        },
        common: {
          name: 'common',
          test: /src/,
          chunks: 'all',
          minSize: 1024,
          reuseExistingChunk: true,
          priority: 5
        }
      }
    },
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
});