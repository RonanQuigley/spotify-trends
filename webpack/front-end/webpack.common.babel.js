import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import common from '../webpack.common.babel';
import { setDevTool, setOutput } from './utilities';

/* if we're testing, we run jsdom via node for our unit tests
we also need to use nodeExternals to prevent warnings for fetch-mock
*/

const target = process.env.NODE_ENV === 'test' ? 'node' : 'web';
const externals = process.env.NODE_ENV === 'test' ? nodeExternals() : [];

const frontEndCommon = {
    name: 'client',
    target: target,
    devtool: setDevTool(),
    output: setOutput(),
    plugins: [new webpack.NamedModulesPlugin()],
    externals: externals
};

export default merge(common, frontEndCommon);
