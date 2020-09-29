const path = require('path');
const web = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: './bin/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve('server'),
    },
    target: 'node',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    externals:[web()],
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }],
    },
};