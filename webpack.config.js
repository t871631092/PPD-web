const path = require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const WriteFilePlugin= require('write-file-webpack-plugin') ;

var lib=['./src/javascripts/jquery.js','./src/javascripts/bootstrap.js','./src/javascripts/vue.js'];

var entryConfig={
    index:lib.concat('./src/app/main.js'),
    home:lib.concat('./src/app/home.js')
};

module.exports = {
    mode:'development',
    entry: entryConfig,
    watch:true,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'javascripts/[name]-[hash].js'
    },
    // devServer:{
    //     contentBase:path.resolve(__dirname, 'public'),
    //     port: "3001",
    //     hot:true
    // },
    watchOptions:{
        poll:1000,
        ignored:/node_modules/
    },
    devtool: 'source-map',
    plugins:[//配置插件节点
        new webpack.HotModuleReplacementPlugin(), //new 一个热更新的模块对象 这是启用热更新的第 3 步
        new webpack.NoEmitOnErrorsPlugin(),//热更相关插件
        new HtmlWebpackPlugin({
            chunks:['home'],
            filename:'home.html',
            template:'src/home.html',
            inject:"body"
        }),
        new HtmlWebpackPlugin({
            chunks:['index'],
            filename:'index.html',
            template:'src/index.html',
            inject:"body"
        }),
        new CleanWebpackPlugin({
        }),
    ],
    module:{
        rule:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
};
