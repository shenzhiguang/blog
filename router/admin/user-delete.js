const { User } = require('../../models/user')

module.exports = async(req, res) => {
    await User.findOneAndDelete({ _id: req.query.id })
        // 重定向到用户列表页
    res.redirect('/admin/user')
}