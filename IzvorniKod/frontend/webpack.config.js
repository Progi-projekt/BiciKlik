const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', 
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,  // Support for both TS and JS 
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,  // Loading images and SVGs
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',  
              outputPath: 'assets',          
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ], // TODO add devServer config for react-router
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  mode: 'development'
};
