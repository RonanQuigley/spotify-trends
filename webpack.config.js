const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        // 'bundle.min.js' : [__dirname + '/index.js', __dirname + '/anotherFile.js']
        react : path.resolve(__dirname, 'app/react/react-client.js')
    },
    output: {
      path : path.resolve(__dirname, 'build/views/scripts'),
      filename: 'react-bundle.min.js'
    },
    watch : true,
    module: {
        rules: [
          {
            test: /.js$/,
            exclude: [
              path.resolve(__dirname, "node_modules"),
            ],
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
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
      }),
    ]
}