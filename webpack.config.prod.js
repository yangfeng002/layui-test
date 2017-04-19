/**
 * Created by fengyang on 2017/4/7.
 * webpack生成环境配置文件
 */
var path = require("path");//path是nodejs内置的对象
var webpack = require('webpack');//是我们安装的，使用的时候需要我们引入
var ExtractTextPlugin = require("extract-text-webpack-plugin");//引入单独打包成css文件的插件
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require("webpack-chunk-hash");
module.exports = function(env) {
    return {
        entry: {
            index: './src/js/index.js',
            vendor: 'moment'
        },
        output: {
            path: path.join(__dirname, "dist", "js"),
            filename: "[name].[chunkhash:6].js",
            chunkFilename: "[name].[chunkhash:6].js"
        },
        module:{
            rules:[
                {
                    test:/\.css$/,
                    use: ExtractTextPlugin.extract({
                        use:'css-loader'
                    })
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor", "manifest"], // vendor libs + extracted manifest
                minChunks: Infinity,
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new webpack.HashedModuleIdsPlugin(),
            new WebpackChunkHash(),
            new ChunkManifestPlugin({
                filename: "chunk-manifest.json",
                manifestVariable: "webpackManifest"
            }),
            new ExtractTextPlugin('css/style.css'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ],
        resolve:{
            modules:[]
        }
    }
};