const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')

// console.log(paths.publicUrlOrPath.slice(0, -1))
module.exports = {
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    module: {
        rules: [
            {
                test: /\.(png|jpeg|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'imgs',
                        limit: 8192
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg|woff)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'fonts'
                    }
                }
            },
            {
                test: /\.css$/i,
               // include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/react-image-crop'), path.resolve(__dirname, '../node_modules/antd')],
                // exclude: /(node_modules)/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/i,
                // exclude: [/(node_modules)/, path.resolve(__dirname, '../public')],
                // exclude: path.resolve(__dirname, '../public'),
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/antd')],
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    /* {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                           /!* localsConvention: 'camelCase',
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            } *!/
                        }
                    }, */
                    'css-loader',
                    // 'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                                modifyVars: {
                                    'primary-color': '#3860F4',
                                    'link-color': '#3860F4',
                                    'border-radius-base': '2px'
                                },
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.bpmn$/,
                use: 'raw-loader'
            },
            {
                test: /\.(sass|scss)$/i,
                exclude: /(node_modules)/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            localsConvention: 'camelCase',
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.less', '.scss', '.css'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json'
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // auto insert entry url to index.html
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html'
        }),
        // new ManifestPlugin()
    ],
    optimization: {
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
}
console.log(process.env.NODE_ENV)
