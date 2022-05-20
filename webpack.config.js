const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const sass = require('sass')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.tsx',
  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app/[name].bundle.js',
    chunkFilename: 'app/[id].chunk.js',
    publicPath: '/'
  },
  optimization: {
    moduleIds: 'named',
  },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3000,
    static: true,
    historyApiFallback: true,
  },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /nodeModules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
              // The value may need to be adjusted (e.g. to 1) in some CI environments,
              // as cpus() may report more cores than what are available to the build.
              workers: require('os').cpus().length - 1,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          }
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: { implementation: sass },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/favicon.ico' }),
    new webpack.DefinePlugin({
      DEVELOPMENT: true,
    }),
  ],
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    }
  }
}