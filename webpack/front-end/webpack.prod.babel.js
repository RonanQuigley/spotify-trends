import merge from 'webpack-merge';
import common from './webpack.common.babel';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
const prod = {
    mode: 'production',
    entry: {
        index: ['@babel/polyfill', 'whatwg-fetch', './src/client/pages/index/'],
        results: [
            '@babel/polyfill',
            'whatwg-fetch',
            './src/client/pages/results/'
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        })
    ]
};

export default merge(common, prod);
