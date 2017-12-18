const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const production = process.env.NODE_ENV === 'production'

const plugins = [
  // remove dist dir before compile time
  new CleanWebpackPlugin('dist'),
]

if (production) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    })
  )
}

module.exports = {

  // inline-source-map makes devtools point to source files
  devtool: production ? 'hidden-source-map' : 'inline-source-map',

  entry: {
    app: './index.js',

    // third party modules here
    vendor: [
      'react',
      'react-dom',
    ],
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ 'env', 'react', 'stage-2' ],
        },
        test: [ /\.js$/ ],
      },
    ],
  },

  // where to output, also naming conventions
  output: {
    libraryTarget: 'umd',
    library: 'powervtt-character-sheets',
    filename: '[name].js',
    sourceMapFilename: "[name].js.map",
    path: path.resolve('dist'),
  },

  resolve: {
    mainFields: ['browser', 'module', 'main', 'web', 'global'],
  },

  node: {
    global: true,
  },

  // load plugins
  plugins: plugins,

  target: 'web',
}
