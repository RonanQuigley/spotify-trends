import path from 'path';
import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';
import common from '../webpack.common';
const dist = path.join(__dirname, '../../dist');

function setHBSLoader() {
    /* handlebars-loader is not stubbable with sinon.
    workaround is to change the loader for hbs files 
    so that in testing we use a null loader; it just exports 
    a function that returns a string */
    if (process.env.NODE_ENV !== 'test') {
        return {
            exclude: /node_modules|packages/,
            test: /\.hbs$/,
            loader: 'handlebars-loader',
            query: {
                partialDirs: [
                    path.join(
                        __dirname,
                        '../../src/server/router/views/partials'
                    )
                ],
                helperDirs: [
                    path.join(
                        __dirname,
                        '../../src/server/router/views/helpers'
                    )
                ]
            }
        };
    } else {
        return {
            test: /\.hbs$/,
            loader: path.join(__dirname, '../null-loader.js')
        };
    }
}

function setDevtool() {
    /* for our back end devtool, we want to switch our choice of source mapping
    to inline-module-source map when developing. This allows for proper debugging
    https://github.com/webpack/webpack/issues/6400#issuecomment-365412386
    */
    switch (process.env.NODE_ENV) {
        case 'test':
            return 'inline-cheap-module-source-map';
        case 'production':
            return 'source-map';
        default:
            // development mode
            return 'inline-module-source-map';
    }
}

const backEndCommon = {
    name: 'server',
    target: 'node',
    devtool: setDevtool(),
    output: {
        path: dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        /* fixes server side debugging issues for source maps */
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
            setHBSLoader(),
            {
                sideEffects: false // tells webpack our code is pure for dead code elimination
            }
        ]
    }
};

export default merge(common, backEndCommon);
