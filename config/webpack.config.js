import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isDebug = process.env.NODE_ENV === 'development';

export default {
  devtool: 'source-map',
  entry: [
    ...isDebug
      ? [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
      ] : [],
    'babel-polyfill',
    path.resolve('./example/index'),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'sass?sourceMap',
        ],
      },
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    ...isDebug
      ? [
        new webpack.HotModuleReplacementPlugin(),
      ] : [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false,
          },
        }),
      ],
    new HtmlWebpackPlugin({
      template: path.resolve('./example/index.html'),
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    timings: true,
  },
};
