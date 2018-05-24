import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import common from '../webpack.common';
const dist = path.join(__dirname, '../../dist');

/* if we're testing, we run jsdom via node for our unit tests
we also need to use nodeExternals to prevent warnings for fetch-mock
*/

const target = process.env.NODE_ENV === 'test' ? 'node' : 'web';
const externals = process.env.NODE_ENV === 'test' ? nodeExternals() : [];

/* for vscode-chrome-debugger to work correctly we need to 
change the devtool for testing and development. This is because 
vscode-chrome debugger requires non-inline source maps whilst 
mocha-webpack works best with cheap and inlined source maps
*/

let devtool;
let output;

// workaround for a bug with webpack :
// https://github.com/webpack/webpack/issues/6642
const globalObject = 'this';

switch (process.env.NODE_ENV) {
    case 'development':
        /* devtool choices : 
            module-source-map, -- slower rebuild, better debugging 
            cheap-module-eval-source-map -- faster rebuild, worse debugging
        */
        devtool = 'cheap-module-eval-source-map';
        output = {
            path: dist,
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    '/'
                )}`;
            },
            globalObject: globalObject
        };
        break;
    default:
        /*
            our unit call stack traces will become unclickable in vscode
            with devtoolModuleFilenameTemplate. we need to remove it in test.
            we can also use this for production 
        */
        devtool = 'source-map';
        output = {
            path: dist,
            globalObject: globalObject
        };
        break;
}

const frontEndCommon = {
    name: 'client',
    target: target,
    devtool: devtool,
    output: output,
    plugins: [new webpack.NamedModulesPlugin()],
    externals: externals,
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
