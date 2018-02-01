import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

let env = process.env.NODE_ENV;
let main = process.env.BUILD_MAIN;

let config = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd'
    },
    moduleName: main,
    sourceMap: env === 'production' || 'inline',
    plugins: [
        json(),
        nodeResolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        (env === 'production' && uglify())
    ]
};

export default config;