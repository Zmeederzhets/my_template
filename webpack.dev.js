const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: [
        './js/index.js',
        './scss/index.scss'
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 9000,
        //host: '192.168.100.26',
        host: 'localhost',
        static: {
            directory: path.join(__dirname, './app/'),
        },
        open: true,
        proxy: {
            '/api/**': {
                //target: '192.168.100.26:9000',
                target: 'localhost:9000',
                secure: false,
                changeOrigin: true,
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            url: false
                        }
                    },
                    "postcss-loader", "sass-loader"],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: ['file-loader']
            },
            {
                test: /\.font\.js/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'webfonts-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: "form.html",
            template: './form.html',
            inject: true

        }),
        new HtmlWebpackPlugin({
            filename: "catalog.html",
            template: './catalog.html',
            inject: true

        }),
    ]
};

