module.exports = (req, res) => {
    // 删除session
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
            // 重定向到用户登录页面
        res.redirect('/admin/login')
    })
}