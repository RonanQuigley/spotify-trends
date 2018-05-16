import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import DotEnv from 'dotenv-webpack';
import common from '../webpack.common';
const dist = path.join(__dirname, '../../dist');

// if we're testing, we run jsdom via node for our unit tests
const target = process.env.NODE_ENV === 'test' ? 'node' : 'web';

/* for vscode-chrome-debugger to work correctly we need to 
change the devtool for testing and development. This is because 
vscode-chrome debugger requires non-inline source maps whilst 
mocha-webpack works best with cheap and inlined source maps
*/

let devtool;

switch (process.env.NODE_ENV) {
    case 'test':
        devtool = 'inline-cheap-module-source-map';
        break;
    case 'production':
        devtool = 'source-map';
        break;
    default:
        // development mode
        devtool = 'module-source-map';
        break;
}

const frontEndCommon = {
    name: 'client',
    target: target,
    devtool: devtool,
    output: {
        path: dist,
        // this is a multi-page app; let webpack
        // set the filename through our entry config
        // filename: 'client.js',
        // workaround for a bug with webpack :
        // https://github.com/webpack/webpack/issues/6642
        devtoolModuleFilenameTemplate(info) {
            return `file:///${info.absoluteResourcePath.replace(/\\/g, '/')}`;
        },
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
