import path from 'path';

const common = path.join(__dirname, './../src/common');
const src = path.join(__dirname, './../src/');
const charts = path.join(__dirname, './../src/common/react/charts');
const fixtures = path.join(__dirname, './../test/fixtures');

export default {
    resolve: {
        alias: {
            common: common,
            charts: charts,
            fixtures: fixtures,
            src: src
        }
    }
};
