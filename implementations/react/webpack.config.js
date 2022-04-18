const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// htmlwebpackplugin
// contenthash
// webpack dev server
// clean true
// source map
// babel
// files/svgs
// bundle analyzer

module.exports = {
    mode: 'production',
    entry: {
        main: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[contenthash].js',
        // clean dist file
        clean: true,
    },
    resolve: {
        alias: {
            ['mobx-forms']: path.join(__dirname, '..', '..', 'dist'),
            ['react']: path.join(
                __dirname,
                '..',
                '..',
                'node_modules',
                'react',
            ),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /.[jt]sx?$/,
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
                exclude: /node_modules/,
            },
            {
                test: /.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            minify: false,
            // Inject sript tag
            inject: 'body',
            // Prevent defer
            scriptLoading: false,
            template: path.join(__dirname, 'public', 'index.html'),
        }),
    ],
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true,
        port: 3000,
    },
    // performance: {
    //     hints: false,
    // }
};
