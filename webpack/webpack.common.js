import path from 'path';

let obj;

const common = path.join(__dirname, './../src/common');
const src = path.join(__dirname, './../src/');

if (process.env.NODE_ENV === 'test') {
    obj = {
        resolve: {
            alias: {
                common: common,
                fixtures: path.join(__dirname, './../test/fixtures'),
                src: src
            }
        }
    };
} else {
    obj = {
        resolve: {
            alias: {
                common: common,
                src: src
            }
        }
    };
}

export default obj;
