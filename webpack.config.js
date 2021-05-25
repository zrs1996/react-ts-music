const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        host: '127.0.0.1',
        hot: true,
        port: 9000,
        inline: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', MiniCssExtractPlugin.loader]
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
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule:false,
                    limit: 10000,
                    name:'[hash:10].[ext]'
                }
            },
            // {
            //     //处理html中的img
            //     test: /\.html$/,
            //     loader:'html-loader'
            // }
        ]
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'src/app/'),
        },
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin()
    ]
}