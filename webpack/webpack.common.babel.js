import path from 'path';

const common = path.join(__dirname, './../src/common');
const src = path.join(__dirname, './../src/');
const apps = path.join(__dirname, './../src/common/react/apps');
const charts = path.join(__dirname, './../src/common/react/charts');
const fixtures = path.join(__dirname, './../test/fixtures');
const pie = path.join(__dirname, './../src/common/react/pie');

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
                use: 'babel-loader?cacheDirectory=true'
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
                ]
            }
        ]
    }
};
