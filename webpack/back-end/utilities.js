import path from 'path';
const dist = path.join(__dirname, '../../dist');

export function setHBSLoader() {
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

export function setOutput() {
    const filename = 'server.js';
    const libraryTarget = 'commonjs2';
    if (process.env.NODE_ENV === 'development') {
        return {
            path: dist,
            filename: filename,
            libraryTarget: libraryTarget,
            /* fixes server side debugging issues for source maps */
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    '/'
                )}`;
            }
        };
    } else {
        return {
            path: dist,
            filename: filename,
            libraryTarget: libraryTarget
        };
    }
}

export function setDevTool() {
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
