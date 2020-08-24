const express = require('express')

// 导入用户集合的构造函数
const { User } = require('../models/user')

const bcrypt = require('bcrypt')

const admin = express.Router()

admin.get('/login', (req, res) => {
    res.render('admin/login')
})
admin.get('/user', (req, res) => {
    res.render('admin/user')
})

// 实现登录功能
admin.post('/login', async(req, res) => {
    const { email, password } = req.body
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
    }
    // 根据邮箱地址查询用户信息
    // 如果查询到了用户，user变量是一个对象，里面存储着该用户的信息
    // 如果没有查询到用户，user变量为空
    // 因此，可以根据user的类型来判断是否查询到用户
    let user = await User.findOne({ email })
        // 查询到了用户
    if (user) {
        // 将客户端传递过来的密码和用户信息中的密码进行比对
        // 返回值 true 比对成功
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            // 登录成功
            // 将用户名存储在请求对象中
            req.session.username = user.username
                // res.send('登录成功')
                // app不需要引入，req下面的app就是那个app
                // 开放公共数据 
            req.app.locals.userInfo = user
                // 重定向到用户列表页面
            res.redirect('/admin/user')
        } else {
            // 没有查询到用户
            res.status(400).render('admin/error', { msg: '邮箱或密码错误' })
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' })
    }
})

module.exports = admin