const path = require('path');
const webpack = require('webpack');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    entry: {
        react : path.resolve(__dirname, 'app/react/react-client.js')
    },
    output: {
      path : path.resolve(__dirname, 'app/views/scripts'),
      filename: 'react-bundle.min.js'
    },
    watch : true,
    // DON'T USE THE 'SOURCE-MAP' OPTION; SEEMS TO BE BROKEN
    devtool: 'eval-source-map',
    module: {
        rules: [
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
    plugins : [
      new HardSourceWebpackPlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
      // new webpack.DefinePlugin({
      //   '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
      // }),
    ]
}