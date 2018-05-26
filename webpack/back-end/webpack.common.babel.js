import path from 'path';
import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';
import common from '../webpack.common.babel';
import { setDevTool, setHBSLoader, setOutput } from './utilities';

const backEndCommon = {
    name: 'server',
    target: 'node',
    devtool: setDevTool(),
    output: setOutput(),
    node: {
        __dirname: false
    },
    externals: nodeExternals(),
    plugins: [new DotEnv()],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true']
            },
            setHBSLoader(),
            {
                sideEffects: false // tells webpack our code is pure for dead code elimination
            }
        ]
    }
};

export default merge(common, backEndCommon);