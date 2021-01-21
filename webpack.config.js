// npm i -D webpack webpack-cli webpack-dev-server nodemon concurrently babel-loader @babel/core @babel/preset-env @babel/preset-react mini-css-extract-plugin sass sass-loader style-loader css-loader

const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
      '/chat': 'http://localhost:3000',
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    },
    hot: true,
    watchOptions: {
      poll: 1000,
    }
  },
  
};