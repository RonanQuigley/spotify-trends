import path from 'path';

const common = path.join(__dirname, './../src/common');
const src = path.join(__dirname, './../src/');
const apps = path.join(__dirname, './../src/common/react/apps');
const charts = path.join(__dirname, './../src/common/react/charts');
const fixtures = path.join(__dirname, './../test/fixtures');
const pie = path.join(__dirname, './../src/common/react/pie');

const env = process.env.NODE_ENV;

export default {
    resolve: {
        alias: {
            common: common,
            charts: charts,
            apps: apps,
            pie: pie,
            fixtures: fixtures,
            src: src
        }
    },
    module: {
        rules: [
            {
                exclude: /node_modules|packages/,
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true',
                query: {
                    babelrc: true,
                    presets: [
                        [
                            // overwriting the babelrc env preset
                            // ideally this would all be done inside the env file
                            // but currently this is the best workaround for modules
                            // as webpack doesn't seem to support using babelrc configs
                            // that are not written with JSON.
                            '@babel/preset-env',
                            {
                                /* disable transforming of modules from es6. Let webpack 
                                handle import/exports for a reduction in bundle size.
                                If we are testing, we want to target commonjs.
                                We also want to continue targetting the current node version
                                */
                                modules: env !== 'test' ? false : 'commonjs',
                                // the current behaviour of babel results in only the last option being used
                                // therefore do not specify more than one option!
                                targets: {
                                    forceAllTransforms: true
                                }
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader', // 'react-svg'
                        query: {
                            svgo: {
                                pretty: false,
                                plugins: [{ removeStyleElement: false }]
                            }
                        }
                    }
                ],
                sideEffects: false
            }
        ]
    }
};
