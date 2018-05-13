import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import DotEnv from 'dotenv-webpack';
import common from '../webpack.common';
const dist = path.join(__dirname, '../../dist');

// if we're testing, we run jsdom via node for for our unit tests
const target = process.env.NODE_ENV === 'test' ? 'node' : 'web';

const frontEndCommon = {
    name: 'client',
    target: target,
    output: {
        path: dist,

        // this is a multi-page app; let webpack
        // set the filename through our entry config
        // filename: 'client.js',

        // workaround for a bug with webpack :
        // https://github.com/webpack/webpack/issues/6642
        globalObject: 'this'
    },
    plugins: [new webpack.NamedModulesPlugin()],
    module: {
        rules: [
            {
                exclude: /node_modules|packages/,
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                sideEffects: false // tells webpack our code is pure for dead code elimination
            }
        ]
    }
};

export default merge(common, frontEndCommon);
