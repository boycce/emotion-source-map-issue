let HtmlWebpack = require('html-webpack-plugin')
let MiniCssExtract = require('mini-css-extract-plugin')
let path = require('path')
let webpack = require('webpack')
let publicPath = '/dist/'
let distDir = path.join(__dirname, 'dist/')

module.exports = (env, argv) => [{
  devtool: 'source-map',
  entry: './src/index.js',
  mode: 'development',
  target: 'web',
  devServer: {
    contentBase: distDir,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    host: '0.0.0.0',
    hot: false,
    port: 3000,
    writeToDisk: false,
    watchOptions: {
      aggregateTimeout: 50,
      ignored: [ __dirname + '/node_modules' ]
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtract.loader },
          { loader: 'css-loader', options: { sourceMap: true }},
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vendor/,
        use: [
          { loader: 'babel-loader',
            options: {
              plugins: ["emotion"],
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: distDir,
    publicPath: publicPath,
  },
  plugins: [
    new MiniCssExtract({ filename: '[name].css' }),
    new HtmlWebpack({ template: 'public/index.html', filename: distDir + 'index.html' })
  ]
}]
