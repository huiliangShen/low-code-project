const merge = require('webpack-merge')
const common = require('./webpack.common')
// const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const appDirectory = fs.realpathSync(process.cwd());
// const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// copyPublicFolder()

const prod = merge(common, {
    mode: 'production',
    // source-map -> run project will add .map file
    // inline-source-map -> run project will not add .map file, but contains in .js file
    // cheap-inline-source-map -> run project will not add .map file, but contains in .js file, when error will not console column only show row. 报错信息不会包含列信息，只包含行信息
    // cheap-module-source-map 包含第三方模块的映射
    // eval 打包速度最快，提示全
    devtool: 'none',
    output: {
        filename: 'js/[name].[contentHash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
       /* library: 'xxx',
        libraryTarget: 'umd',
        publicPath: 'http://localhost:3001/' // 注意，这个是你子应用的启动地址*/
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
            MANAGE_HOST: 'http://idsmgr.unitsyscloud.com'
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public/'),
                    to: path.resolve(__dirname, '../dist')
                }
            ]
        }),
      /*  new BundleAnalyzerPlugin({
            analyzerPort: 'auto'
        }), */
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contentHash].css',
            chunkFilename: 'css/[id].[contentHash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: [/(node_modules)/, path.resolve(__dirname, '../mock')],
                include: path.resolve(__dirname, '../src'),
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // 打包第三方库的文件
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: 1,
                    minChunks: 1
                },
                // 打包公用代码
                common: {
                    name: 'common',
                    minSize: 3 * 1024,
                    priority: 0,
                    minChunks: 2
                }
            }
        },
        runtimeChunk: {name: 'manifest'}
    }
})

module.exports = prod

/* function copyPublicFolder() {
    fs.copySync(resolveApp('public'), resolveApp('dist'), {
        dereference: true,
        filter: file => file !== '../public/index.html',
    });
} */
