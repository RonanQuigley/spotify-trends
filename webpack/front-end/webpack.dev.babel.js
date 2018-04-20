import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';

const dev = {
    mode: 'development',
    // entry: ['whatwg-fetch', 'webpack-hot-middleware/client', './src/client'],
    entry: {
        dev: ['webpack-hot-middleware/client', './src/client/dev'],
        index: ['whatwg-fetch', './src/client/pages/index/'],
        results: ['whatwg-fetch', './src/client/pages/results/']
    },
    devtool: 'inline-cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ]
};

export default merge(common, dev);
