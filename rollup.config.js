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
    plugins: [
        json(),
        nodeResolve(),
        babel({
            exclude: 'node_modules/**'
        })
    ],
    sourcemap: true
};

if (env === 'development') {
    config.watch = {
        include: 'src/**',
        exclude: 'node_modules/**'
    }
}

if (env === 'production') {
    config.plugins = Object.assign(config.plugins, [
        uglify()
    ]);
}


export default config;