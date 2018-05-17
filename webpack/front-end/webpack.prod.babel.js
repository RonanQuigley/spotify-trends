import merge from 'webpack-merge';
import common from './webpack.common.babel';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const prod = {
    mode: 'production',
    entry: {
        index: ['whatwg-fetch', './src/client/pages/index/'],
        results: ['whatwg-fetch', './src/client/pages/results/']
    }
};

export default merge(common, prod);
