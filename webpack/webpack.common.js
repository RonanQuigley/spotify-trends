import path from 'path';

/* for vscode-chrome-debugger to work correctly we need to 
change the devtool for testing and development this is because 
vscode-chrome require non-inline source maps whilst mocha-webpack 
works best with cheap and inlined source maps
*/

const devtool =
    process.env.NODE_ENV === 'test'
        ? 'inline-cheap-module-source-map'
        : 'source-map';

export default {
    devtool: devtool,
    resolve: {
        alias: {
            common: path.join(__dirname, './../src/common')
        }
    }
};
