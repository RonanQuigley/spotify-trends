import merge from 'webpack-merge';
import common from './webpack.common.babel';
import webpack from 'webpack';

const prod = {
    mode: 'production',
    entry: {
        index: ['./src/client/pages/index/'],
        results: ['./src/client/pages/results/']
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        })
    ]
};

export default merge(common, prod);
