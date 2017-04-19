/**
 * Created by fengyang on 2017/4/7.
 * webpack开发环境配置文件
 */
var json = require('./package.json');
var path = require("path");//path是nodejs内置的对象
var webpack = require('webpack');//是我们安装的，使用的时候需要我们引入
var ExtractTextPlugin = require("extract-text-webpack-plugin");//引入单独打包成css文件的插件 需要安装
var HtmlWebpackPlugin = require('html-webpack-plugin');//需要安装的

module.exports = function(env) {
    return {
        entry: {
            index: './src/js/index.js',
            //vendor: 'moment'
            vendor:['moment','jquery']
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build')
        },
        module:{
            rules:[
                {
                    test:/\.css$/,//针对css文件的处理
                    use: ExtractTextPlugin.extract({
                        use:['css-loader']
                    })
                },
                {
                 test:/\.scss$/,
                 use:'sass-loader'
                },
                {
                    test: /\.png$/,
                    use: { loader: 'url-loader', options: { limit: 100000 } },
                },
                {
                    test: /\.jpg$/,
                    use: [ 'file-loader' ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
            }),
            new ExtractTextPlugin('css/[name].css'),//生成文件
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new HtmlWebpackPlugin({
                filename: 'assets/template.html'
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development', // 使用 'development' ，除非 process.env.NODE_ENV 被定义
                DEBUG: false
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
            })

        ],
        resolve: {

        },
        externals: {//不将第三方文件打包到生成的文件中
            "lodash": {
                commonjs: "lodash",
                commonjs2: "lodash",
                amd: "lodash",
                root: "_"
            }
        }
    }
};