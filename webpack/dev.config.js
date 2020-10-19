const webpack = require('webpack');
const baseConfig = require('./base.config');
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
    }),
    new webpack.DefinePlugin({
      'process.env': 'development'
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
      filename: '[name].css' ,
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  bail: false,
  devtool: 'eval-source-map',
  devServer: {
    port: 9000,
    hot: true,
    contentBase: './dist',
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}