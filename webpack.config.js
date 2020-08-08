let autoprefixer = require('autoprefixer')
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
    hot: true,
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
          { loader: MiniCssExtract.loader, options: { hmr: true }},
          { loader: 'css-loader', options: { sourceMap: true }},
          { loader: "postcss-loader", options: { ident: 'postcss', plugins: [ autoprefixer ], sourceMap: true }}
        ]
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules|vendor/,
        use: [
          { loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                ["@emotion/babel-preset-css-prop", { "labelFormat": "[filename]", sourceMap: true }],
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
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtract({ filename: '[name].css' }),
    new HtmlWebpack({ template: 'public/index.html', filename: distDir + 'index.html' })
  ]
}]
