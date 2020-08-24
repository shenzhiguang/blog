// 引入mongoose第三方模块
const mongoose = require('mongoose')
    // 连接数据库
    // 连接数据库先要启动数据库 net start mongodb（以管理员身份运行）
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))