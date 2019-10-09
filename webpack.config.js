const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const combineLoaders = require('webpack-combine-loaders')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ])
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './img/',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  devServer: {
    historyApiFallback: true
  }
}
