// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 导入bcrypt
const bcrypt = require('bcrypt')

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 唯一
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
})

// 创建集合
const User = mongoose.model('User', userSchema)

async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('123456', salt)
    const user = await User.create({
        username: 'zs',
        email: '123456@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    })
}
// createUser()


module.exports = {
    // User: User
    User
}