const express = require('express')
const path = require('path')
const home = require('./router/home')
const admin = require('./router/admin')
    // 创建网站服务器
const app = express()

// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))
    // 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')
    // 当渲染后缀你为art的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'))

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))
    // 引入路由
app.use('/home', home)
app.use('/admin', admin)

app.listen('80', () => {
    console.log('Server is running...')
})