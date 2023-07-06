module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:7000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' },
            },
        },
    },
}