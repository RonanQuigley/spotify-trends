import merge from 'webpack-merge';
import common from './webpack.common.babel';
import webpack from 'webpack';

const prod = {
    mode: 'production',
    entry: {
        index: ['whatwg-fetch', './src/client/pages/index/'],
        results: ['whatwg-fetch', './src/client/pages/results/']
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ]
};

export default merge(common, prod);
