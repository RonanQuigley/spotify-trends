import merge from 'webpack-merge';
import common from './webpack.common.babel';

const prod = {
    mode: 'development',
    // entry: ['whatwg-fetch', './src/client'],
    entry: {
        index: ['whatwg-fetch', './src/client/pages/index/'],
        results: ['whatwg-fetch', './src/client/pages/results/']
    },
    // if you need source maps, use eval-source-map
    // chrome doesn't seem to work with source-map
    devtool: 'source-map'
};

export default merge(common, prod);
