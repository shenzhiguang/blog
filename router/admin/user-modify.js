const { User, validateUser } = require('../../models/user')

const bcrypy = require('bcrypt')

module.exports = async(req, res) => {
    const id = req.query.id
    const { username, email, role, state, password } = req.body

    // 验证数据 防止脏数据
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

    // 根据id查找数据库中的该用户
    let user = await User.findOne({ _id: id })
        // 比对密码
    const isValid = await bcrypy.compare(password, user.password)
    if (isValid) {
        // 更新数据库
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        })

        // 重定向到用户列表页面
        res.redirect('/admin/user')
    } else {
        return res.redirect(`/admin/user-edit?message=密码错误，不能进行用户信息修改&id=${id}`)
    }
}