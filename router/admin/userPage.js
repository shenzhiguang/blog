const { User } = require('../../models/user')

module.exports = async(req, res) => {
    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1
        // 定义每一页显示的数据条数
    const pagesize = 10
        // 查询用户数据的总数
    let count = await User.countDocuments({})
        // 总页数
    let total = Math.ceil(count / pagesize)
        // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize
        // 查询数据库
    let users = await User.find({}).limit(pagesize).skip(start)
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    })
}