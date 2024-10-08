'use strict'
const path = require('path')
let defaultSettings = require('./public/config/settings.js')

/*if (defaultSettings.active) {
    defaultSettings = Object.assign(defaultSettings, require('./public/config/settings-' + defaultSettings.active))
}*/
function resolve(dir) {
    return path.join(__dirname, dir)
}

const CopyWebpackPlugin = require('copy-webpack-plugin')
const name = defaultSettings.title // 网址标题
const port = 8000 // 端口配置

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    publicPath: '/',
    outputDir: 'pncs',
    assetsDir: 'static',
    lintOnSave: false,//process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: false
        },
        proxy: {
            '/api': {
                //target: process.env.VUE_APP_BASE_API,
                //target:'http://10.114.10.197:8001/',
                target: 'http://30.42.102.117:8002',
                // target: 'http://127.0.0.1:8003/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/DataAssetServer'
                }
            },
            // '/smartbi': {
            //     target: process.env.VUE_APP_SMARTBI_API,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/smartbi': 'smartbi'
            //     }
            // }
        }
    },
    configureWebpack: {

        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),
                '@public': resolve('public'),
                '@system': resolve('node_modules/eladmin-system/src'),
                '@eladmin': resolve('node_modules/eladmin-common/src'),
                '@crud': resolve('node_modules/eladmin-common/src/components/Crud'),
                '@datasource': resolve('node_modules/pncui-datasource/src'),
                '@workflow': resolve('node_modules/pncui-workflow/src'),
                '@portal': resolve('node_modules/pncui-portal-fashional/src'),
                '@portalParent': resolve('node_modules/pncui-portal-fashional'),
            }
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: 'public/config', // 不打包直接输出的文件
                    to: 'static/config', // 打包后静态文件放置位置
                    ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
                }
            ])
        ]
    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        /*config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            //.include.add(resolve('src/assets/icons'))
            .include.add(resolve('eladmin-ui/src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()*/
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            // 配置icons的目录  我这里默认放在了 /src/assets/icons 目录下  如要修改 记得更换你的目录
            .include.add(path.resolve(__dirname, './node_modules/eladmin-common/src/assets/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            // 配置icons的目录  我这里默认放在了 /src/assets/icons 目录下  如要修改 记得更换你的目录
            .exclude.add(path.resolve(__dirname, './node_modules/eladmin-common/src/assets/icons/svg'))
            .end()
            .use('file-loader')
            .loader('file-loader')

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}
