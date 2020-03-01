const rp = require('request-promise')
const fs = require('fs')
const path = require('path')

// 如果没有传入 path 片段，则 path.resolve() 将返回当前工作目录的绝对路径。
const filename = path.resolve(__dirname, './access_token.json')
    // console.log(filename)
const APPID = 'wx9467fc189a6d92b4'
const APPSECRET = '8bee54302e087a1d2fe436a436597bdd'
const Url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const updataAccessToken = async() => {
    const resStr = await rp(Url)
    let res = JSON.parse(resStr)
        // console.log(res)
    if (res.access_token) {
        fs.writeFileSync(filename, JSON.stringify({
            access_token: res.access_token,
            createTime: new Date(),
        }))
    } else {
        await updataAccessToken()
    }
}

const getAccessToken = async() => {
    try {
        const jing = fs.readFileSync(filename, 'utf8')
        const hao = JSON.parse(jing)
        const createTime = new Date(hao.createTime).getTime()
        const nowTime = new Date().getTime()
        if ((nowTime - createTime) / 1000 / 3600 >= 2) {
            await updataAccessToken()
            await getAccessToken()
        }
        return hao.access_token
    } catch (error) {
        await updataAccessToken()
        await getAccessToken()
    }
}

setInterval(async() => {
    await updataAccessToken()
}, (7200 - 300) * 1000);

// console.log(getAccessToken())
module.exports = getAccessToken