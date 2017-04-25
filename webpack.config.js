/**
 * Created by fengyang on 2017/4/19.
 *webpack配置文件
 */
var path = require("path");
var extractTextPlugin = require("extract-text-webpack-plugin");//压缩css文件

var webpack = require("webpack");
module.exports ={
    devtool: "source-map",
    entry:{
        //入口文件（数组或者字符串或者对象）
       // index:'./src/js/index.js'
        login:'./src/js/login.js'
    },
    output:{
        filename:'[name].bundle.js',//生成的文件名
        path:path.resolve(__dirname,"dist/assets"),  //生成一个绝对路径   join（）拼接路径
        sourceMapFilename:'[file].map'
    },
    module:{
       rules:[
           {
               test:/\.css$/,
               use:extractTextPlugin.extract({
                   fallback: "style-loader",
                   use: "css-loader",
               }),
               option:{}//指的是请求的参数，或者说是条件
           },
           {
               test: /\.scss|sass$/,
               use:extractTextPlugin.extract({
                   use: [{
                       loader: "css-loader"
                   }, {
                       loader: "sass-loader"
                   }],
                   fallback: "style-loader"
               })
           },
           {
               //less类型处理
               test: /\.less$/,
               use:[
                   {
                       loader:'less-loader'
                   }
               ]
           },
           {
               test: /\.jsx$/,
               use:[
                   {
                       loader: "jsx-loader"
                   }
               ]
           },
           {
               test: /\.js$/,
               exclude: [path.resolve(__dirname, 'node_modules')],
               use:[
                   {
                       loader: 'babel-loader',
                       options:{
                           presets: [['es2015', { modules: false }], 'react'],
                           plugins: ['syntax-dynamic-import']
                       }
                   }
               ]

           },
           {
               test: /\.(gif|jpg|png|ico)$/, //内联 base64 URLs, 限定 <=8k 的图片, 其他的用URL
               use:[{
                   loader: 'url-loader',
                   options:{
                       limit:8192,
                       name:'images/[name].[ext]'
                   }
               }]

           },
           {
               test: /\.(woff|svg|eot|ttf|woff2)$/,  /*针对字体图标库的处理*/
               use:[{
                   loader: 'file-loader',
                   options:[{
                       limit:'1',
                       name:'css/fonts/[name].[ext]'
                   }]
               }]
           },
           { test: /\.html$/,loader: 'raw-loader'}


       ],
        // 如何合理的处理模块的问题
        resolve: {
           alias:{

           },
            // 自动解决某些扩展程序, 默认就这两个
            extensions: ['.js', '.json'],
        },
        plugins: [
           new webpack.BannerPlugin('This file is created by fy'),//写在了生成的文件中
           new extractTextPlugin({filename: "/css/[name].css", disable: false, allChunks: true}),
           new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
            }),
            new webpack.ProvidePlugin({ //别名
                $: 'jquery',
                jQuery: 'jquery',
            })
        ],
        devServer:{
            contentBase:'./dist',//本地服务器所加载的页面所在的目录
            port:'8080',
            inline:true,//源文件改变时页面实时刷新 建议测试环境使用
            hot:true,//热部署 建议测试环境使用
            colors:true,//终端中输出结果为彩色
            historyApiFallback: true//不跳转
        }
        /*watch:true  //监控*/

    }

};