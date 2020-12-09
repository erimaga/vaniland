const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pagesPlugin = require('./utils/generate-pages');
const entries = require('./utils/entries');

const devMode = process.env.NODE_ENV === 'development';

const styleLoader = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { importLoaders: 1 },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                autoprefixer: { grid: true },
              },
            ],
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        // Prefer `dart-sass`
        // eslint-disable-next-line global-require
        implementation: require('sass'),
        additionalData: '@import "./src/styles/_config.scss";',
      },
    },
  ],
};

const urlLoader = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[path][name].[ext]',
        limit: 8000,
      },
    },
  ],
};

const babelLoader = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

const pugLoader = {
  test: /\.pug$/,
  use: 'pug-loader',
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/js/main.js'),
    ...entries,
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    filename: devMode ? '[name].js' : '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    ...pagesPlugin,
    new HtmlWebpackPlugin({
      template: 'src/pages/views/index.pug',
      filename: 'index.html',
      title: 'Vaniland',
      inject: 'head',
      chunks: ['main', 'home'],
      minify: !devMode,
      favicon: 'src/static/favicon.png',
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
      inlineAll: true,
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/static',
          to: 'static',
        },
      ],
    }),
  ],
  module: {
    rules: [styleLoader, urlLoader, pugLoader, babelLoader],
  },
};
