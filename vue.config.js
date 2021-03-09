const publicPath = '/views'
module.exports = {
  publicPath,
  devServer: {
    port: 13605,
    publicPath,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },
}