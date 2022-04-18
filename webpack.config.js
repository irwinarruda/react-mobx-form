const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: path.join(__dirname, 'src', 'index.ts'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    externals: {
        mobx: 'mobx',
        react: 'react',
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
};
