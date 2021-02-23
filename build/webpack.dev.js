const merge = require('webpack-merge')
const common = require('./webpack.common')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const apiMocker = require('mocker-api')

module.exports = merge(common, {
    mode: 'development',
    // 'cheap-module-eval-source-map'
    // source-map -> run project will add .map file
    // inline-source-map -> run project will not add .map file, but contains in .js file
    // cheap-inline-source-map -> run project will not add .map file, but contains in .js file, when error will not console column only show row. 报错信息不会包含列信息，只包含行信息
    // cheap-module-source-map 包含第三方模块的映射
    // eval 打包速度最快，提示全
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist/'),
        publicPath: 'http://localhost:8001/'
    },
    // 监测到变化会强制刷新页面
    devServer: {
        // publicPath: '/public',
        publicPath: 'http://localhost:8001/',
        // contentBase: path.join(__dirname, '../public'),
        port: 8001,
        hot: true,
        // 可在局域网内使用
        host: '0.0.0.0',
        historyApiFallback: true,
        // hotOnly: true
        compress: true,
        proxy: {
            '/itcsaas': {
                target: 'http://localhost:3000'
            },
            '/api': {
                target: 'http://192.168.3.47:32688',
                pathRewrite: {'^/api': ''},
                changeOrigin: true
            }
        },
        before(app) {
            apiMocker(app, path.resolve(__dirname, '../mock/index.js'))
        }
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                options: {}
            },
            {
                test: /\.(tsx|ts)$/,
                exclude: [/(node_modules)/, path.resolve(__dirname, '../mock')],
                // include: path.resolve(__dirname, '../src'),
                use: {
                    loader: 'babel-loader?cacheDirectory'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ErrorOverlayPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            MANAGE_HOST: 'http://idsmgr.unitsyscloud.com'
        })
    ],
    /* optimization: {
        usedExports: true
    } */
})
