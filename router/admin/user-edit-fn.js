// 引入joi模块
const Joi = require('joi')

const { User } = require('../../models/user')

const bcrypt = require('bcrypt')

module.exports = async(req, res) => {

    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    }

    // 验证
    // Joi.validate()
    // 该方法返回的是Promise对象，可以使用.then()和.catch()方法来获取结果或错误信息，但一般都使用异步函数来处理，异步函数中需要使用try和catch来处理

    try {
        // 验证
        await Joi.validate(req.body, schema)
    } catch (err) {
        // 验证没有通过
        // err.message
        // 重定向回用户添加页面
        res.redirect(`/admin/user-edit?message=${err.message}`)
    }
    // res.send('OK')

    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email })
        // 如果用户已经存在，邮箱地址已经被占用
    if (user) {
        // 重定向回用户添加页面
        return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
    }
    // 不存在，则对密码进行加密，并写入到数据库
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    req.body.password = password
        // 将用户信息添加到数据库中
    await User.create(req.body)
        // 重定向页面到用户列表
    res.redirect('/admin/user')
}