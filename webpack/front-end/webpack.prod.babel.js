import merge from 'webpack-merge';
import common from './webpack.common.babel';

const prod = {
    mode: 'production',
    // entry: ['whatwg-fetch', './src/client'],
    entry: {
        index: ['whatwg-fetch', './src/client/pages/index/'],
        results: ['whatwg-fetch', './src/client/pages/results/']
    }
};

export default merge(common, prod);
