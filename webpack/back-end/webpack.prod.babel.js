import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';

const prod = {
    mode: 'production',
    // we need this polyfill for Math extensions
    entry: ['@babel/polyfill', './src/server/index'],

    plugins: [
        // need to specify NODE_ENV otherwise it will show undefined in code
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        })
    ]
};

export default merge(common, prod);
