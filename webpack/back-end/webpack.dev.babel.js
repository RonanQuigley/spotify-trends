import webpack from 'webpack';
import common from './webpack.common.babel';
import merge from 'webpack-merge';

const dev = {
    mode: 'development',
    target: 'node',
    entry: './src/server/routes',
    plugins: [
        // need to specify NODE_ENV otherwise it will show undefined in code
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        })
    ]
};
export default merge(common, dev);
