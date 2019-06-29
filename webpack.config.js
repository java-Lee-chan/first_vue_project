// 由于 webpack 是基于Node 进行构建的，所有，webpack 的配置文件中，任何合法的 Node 代码都是支持的
const path = require('path')

// 在内存中，根据制定的模板页面，生成一份内存中的页面，同时自动把导报好的bundle导入到页面底部
// 如果要配置插件，需要导出的对象中，挂载一个 plugins 节点
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现
// 我们并没有提供要打包 的文件的入口 和 出口，此时， 他会检查项目根目录中的配置文件，
// 并读取这个文件， 就拿到了导出的这个配置对象，然后根据这个对象，进行打包构建
module.exports = {
    entry: path.join(__dirname,'./src/main.js'), // 入口文件
    output:{                                    // 出口文件
        path: path.join(__dirname,'./dist'),    // 输出路径
        filename: 'bundle.js'                   // 指定输出文件名称
    },
    plugins:[   // 所有 webpack 插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),  // 指定模板文件路径
            filename: 'index.html'  // 设置生成的内存页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: {   // 这个节点， 用于配置所有 第三方模块 加载器
        rules: [    // 所有 第三方模块 的匹配规则
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理 .css 文件的第三方 loader 规则
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
        { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=20000&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
        // limit 给定的值， 是图片的大小，单位是 byte, 如果我们引用的图片， 大于或等于 给定的 limit 的值，
        // 则不会被转为 base64 格式的字符串，如果图片小于给定的 limit 值，
        // 则会被转为 base64 的字符串
        { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理字体文件,
        { 
            test: /\.js$/, 
            exclude: /(node_modules)|bower_components/, 
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime",
                  ["@babel/plugin-transform-modules-commonjs", { "strictMode": false }], 
                  ["component", 
                    {
                      "libraryName": "mint-ui",
                      "style": true
                    }// min-ui 官网中 component 后面写的是一个数组是错误的，应该直接用一个对象
                  ]],
                //   ignore: ["./src/lib/mui/js/*.js"]
                }
            }, 
        }, // 配置 Babel 来转换高级的ES语法
        { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]
    },
    resolve: {
        alias: {    // 修改 Vue 被导入时候的包的路径
            // 'vue$': 'vue/dist/vue.js'
        }
    }
}