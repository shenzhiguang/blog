const { User } = require('../../models/user')

module.exports = async(req, res) => {

    const { message, id } = req.query

    // 判断 如果有id是修改操作，否则是添加操作
    if (id) {
        // 修改操作
        let user = await User.findOne({ _id: id })
        console.log(user)
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        // 添加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }
}