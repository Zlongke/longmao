/* export const devServer = {
    proxy: {
        '/api': {
            target: 'http://39.97.33.178',
            changeOrigin: true
        }
    }
}; */
module.exports = {
    baseUrl:'./',
    devServer : {
        proxy : {//代理本地接口要写到远程接口前面
            '/api2' : {
                target : 'http://localhost:3000',
                changeOrigin : true
            },
            '/api' : {
                target : 'http://39.97.33.178',
                changeOrigin : true
            }
        }
    }
}