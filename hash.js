// 导入bcrypt
const bcrypt = require('bcrypt')
async function run() {
    // 生成随机字符串
    // genSalt方法接收一个数值作为参数
    // 数值越大 生成的随机字符串复杂度越高
    // 默认值是10
    const salt = await bcrypt.genSalt(10)
        // 对密码进行加密
        // 1、要进行加密的明文
        // 2、随机字符串
        // 返回的是加密后的密码
    const result = await bcrypt.hash('123456', salt)
    console.log(result)
}