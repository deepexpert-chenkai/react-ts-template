const webpack = require('webpack');
const baseConfig = require('./base.config');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { tsConfig, htmlConfig, cssConfig, fontsConfig, svgConfig, svgCSSConfig, imagesConfig } = baseConfig;
module.exports = {
  entry: baseConfig.entry,
  output: baseConfig.output,
  module: {
    rules: [tsConfig, htmlConfig, cssConfig, fontsConfig, svgConfig, svgCSSConfig, imagesConfig]
  },
  resolve: baseConfig.resolveConfig,
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
    new CopyWebpackPlugin({
      // @ts-ignore
      patterns: [
        {
          from: 'src/assets/',
          to: 'assets/'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css' ,
      chunkFilename: '[name].[hash].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  bail: false,
  devtool: false,
  devServer: {
    port: 9000,
    hot: true,
    contentBase: './dist',
    historyApiFallback: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false
          },
          mangle: true,
          output: {
            comments: false,
            ascii_only: true
          }
        },
        parallel: true
      })
    ],
    nodeEnv: 'production',
    concatenateModules: false,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        main: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}