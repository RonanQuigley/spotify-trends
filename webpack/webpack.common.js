import path from 'path';

let aliases;

const common = path.join(__dirname, './../src/common');
const src = path.join(__dirname, './../src/');

if (process.env.NODE_ENV === 'test') {
    aliases = {
        resolve: {
            alias: {
                common: common,
                fixtures: path.join(__dirname, './../test/fixtures'),
                src: src
            }
        }
    };
} else {
    aliases = {
        resolve: {
            alias: {
                common: common,
                fixtures: path.join(__dirname, './../test/fixtures'),
                src: src
            }
        }
    };
}

export default aliases;
