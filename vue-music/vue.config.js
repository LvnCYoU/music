const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  outputDir: 'music',
  //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  assetsDir: '',
  //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  indexPath: 'index.html',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== 'production', 
  productionSourceMap: false, // 加快打包速度
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        data: '@import "@/common/css/index.scss";'
      },
      sass: {
        data: '@import "@/common/css/index.scss"'
      }
    }
  },
  // 配置消除console.log
  configureWebpack: config => {
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jquery": 'jquery'
    })
    process.env.NODE_ENV === 'production' &&
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
    // 公共方法抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: '/node_moudules',
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          }
        }
      }
    }
  },
  chainWebpack: config => {
    // 资源路径别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))

    // 移除多余插件 (移动端有效)
    config.plugins.delete('prefetch').delete('preload');
    config.optimization.minimize(true);
    // 压缩图片
    const imagesRule = config.module.rule('images')
    imagesRule.uses.clear()
    imagesRule.use('file-loader')
      .loader('url-loader')
      .options({
        limit: 10240,
        fallback: {
        loader: 'file-loader',
        options: {
          outputPath: 'static/images'
        }
      }
    })
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    hotOnly: true,
    https: false,
    proxy: {
      '/api': { 
        target: process.env.VUE_APP_SERVICE_URL, // 后台接口域名
        ws: true,        //如果要代理 websockets，配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite:{
          ['^ ' + process.env.VUE_APP_BASE_API]:'',
        }
      }, 
    }
  }, 
}