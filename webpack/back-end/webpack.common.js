import path from 'path';
import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';
import common from '../webpack.common';
const dist = path.join(__dirname, '../../dist');

/* for our back end devtool, we want to switch our choice of source mapping
to inline-module-source map when developing. This allows for proper debugging
https://github.com/webpack/webpack/issues/6400#issuecomment-365412386
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
        devtool = 'inline-module-source-map';
        break;
}

const backEndCommon = {
    name: 'server',
    target: 'node',
    devtool: devtool,
    output: {
        path: dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate(info) {
            return `file:///${info.absoluteResourcePath.replace(/\\/g, '/')}`;
        }
    },
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
            {
                exclude: /node_modules|packages/,
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    partialDirs: [
                        path.join(
                            __dirname,
                            '../../src/server/router/views/partials'
                        )
                    ]
                }
            },
            {
                sideEffects: false // tells webpack our code is pure for dead code elimination
            }
        ]
    }
};

export default merge(common, backEndCommon);
