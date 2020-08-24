const express = require('express')

// 处理路径
const path = require('path')

// 引入第三方模块处理post请求
const bodyParser = require('body-parser')

// 引入express-session模块
const session = require('express-session')

const home = require('./router/home')
const admin = require('./router/admin')
    // 创建网站服务器
const app = express()
    // 数据库连接
require('./models/connect')

// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))

// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')

// 当渲染后缀你为art的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'))

// 配置bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

// 配置session
app.use(session({ secret: 'secret key' }))

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

// 拦截请求 判断用户的登录状态
app.use('/admin', (req, res, next) => {
        // 判断用户访问的是否是登录页面
        // 判断用户的登录状态
        // 如果用户是登录的 将请求放行
        // 如果用户不是登录的 将请求重定向到登录页面
        if (req.url != '/login' && !req.session.username) {
            res.redirect('/admin/login')
        } else {
            // 用户是登录状态 将请求放行
            next()
        }
    })
    // 引入路由
app.use('/home', home)
app.use('/admin', admin)

app.listen('80', () => {
    console.log('Server is running...')
})