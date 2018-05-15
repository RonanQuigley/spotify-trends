import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';

/* for vscode-chrome-debugger to work correctly we need to 
change the devtool for testing and development this is because 
vscode-chrome require non-inline source maps whilst mocha-webpack 
works best with cheap and inlined source maps
*/

const devtool =
    process.env.NODE_ENV === 'test'
        ? 'inline-cheap-module-source-map'
        : 'source-map';

const dev = {
    mode: 'development',
    entry: {
        dev: ['webpack-hot-middleware/client', './src/client/dev'],
        index: ['whatwg-fetch', './src/client/pages/index/'],
        results: ['whatwg-fetch', './src/client/pages/results/']
    },
    devtool: devtool,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ]
};

export default merge(common, dev);
