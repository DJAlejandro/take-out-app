const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'mock'
                }
            }
        },
    },
    chainWebpack: (config) => {
        config.resolve.extensions
            .merge(['scss', 'sass', '.js', '.vue', '.json', ".css", "styl"])
        config.resolve.alias
            .set('@', resolve('src'))
            .set('css', resolve('src/assets/css'))
            .set('js', resolve('src/assets/js'))
            .set('components', resolve('src/components'))
            .set('vue$', 'vue/dist/vue.esm.js')

    }
}
