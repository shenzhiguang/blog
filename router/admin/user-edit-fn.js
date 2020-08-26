const { User, validateUser } = require('../../models/user')

const bcrypt = require('bcrypt')

module.exports = async(req, res, next) => {



    // 验证
    // Joi.validate()
    // 该方法返回的是Promise对象，可以使用.then()和.catch()方法来获取结果或错误信息，但一般都使用异步函数来处理，异步函数中需要使用try和catch来处理

    try {
        await validateUser(req.body)
    } catch (err) {
        // 验证没有通过
        // err.message
        // 重定向回用户添加页面
        return res.redirect(`/admin/user-edit?message=${err.message}`)
            // next()只能接收字符串形式的参数
            // return next()
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
    console.log(req.body)
    await User.create(req.body)
        // 重定向页面到用户列表
    res.redirect('/admin/user')
}