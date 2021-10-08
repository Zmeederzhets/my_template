const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: ['./js/index.js', './scss/index.scss'],
    mode: 'production',
    output: {
        filename: '[name].[hash:20].js',
        path: buildPath,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['autoprefixer']],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.font\.js/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'webfonts-loader',
                ],
            },
        ],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ parallel: true })],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './form.html',
            inject: 'body',
            filename: 'form.html',
        }),
        new HtmlWebpackPlugin({
            template: './catalog.html',
            inject: 'body',
            filename: 'catalog.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'img',
                    to: 'img',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ['**/font-icons/**'],
                    },
                },
                {
                    from: './*.ico',
                    to: './',
                },
                {
                    from: './*.svg',
                    to: './',
                },
            ],
        }),
    ],
};
