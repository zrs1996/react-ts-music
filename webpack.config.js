const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
    entry: './src/app/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        host: '127.0.0.1', //地址
        hot: true, //自动更新
        port: 8088, // 端口号
        inline: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
        ]
    },
    resolve: {
        alias: {
            "src": path.resolve("src"),
            "app": path.resolve("src/app"),
        },
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new webpack.HotModuleReplacementPlugin()
    ]
}