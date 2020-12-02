"use strict";
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const config = require('./config');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //优化或压缩css
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 仅当上线到正式环境时使用
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 目录清理

/**
 * @type {import('weboack').Configuration}
 */
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production', //可以省去配置js压缩、全局变量production的配置
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
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
    new CleanWebpackPlugin(),
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
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     minChunks: 1,
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         minChunks: 2,
  //         test: /[\\/]node_modules[\\/]/, // 正则规则验证，如果符合就提取 chunk (指定是node_modules下的第三方包)，[\\/]预防unix环境下不匹配
  //         chunks: 'all', // 把非动态模块打包进 vendor，动态模块优化打包
  //       },
  //       common: {
  //         name: 'common',
  //         minChunks: 2,
  //         test: /[\\/]src[\\/]/,
  //         chunks: 'all',
  //       }
  //     }
  //   },
  //   minimizer: [
  //     new OptimizeCSSAssetsPlugin({ // 优化css输出
  //       cssProcessorOptions: {
  //         safe: true,
  //         autoprefixer: { disable: true },
  //         mergeLonghand: false,
  //         discardComments: {
  //           removeAll: true // 移除注释
  //         }
  //       },
  //       canPrint: true
  //     })
  //   ],
  //   sideEffects: true // tree-shaking只移除没有用到的代码成员，副作用可以完整移除没有用到的模块
  // }
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;