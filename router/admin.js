const express = require('express')

const admin = express.Router()

// 渲染登录页面
admin.get('/login', (req, res) => res.render('admin/login'))

// 渲染用户列表页面
admin.get('/user', require('./admin/userPage'))

// 实现登录功能
admin.post('/login', require('./admin/login'))

// 实现退出功能
admin.get('/logout', require('./admin/logout'))

// 渲染新增用户页面
admin.get('/user-edit', require('./admin/user-edit'))

// 创建实现用户添加用户的功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'))

admin.post('/user-modify', require('./admin/user-modify'))

module.exports = admin