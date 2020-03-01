const Router = require('koa-router')
const router = new Router()
const callCloudDB = require('../utils/callCloudDB.js')
const cloudStorage = require('../utils/callCloudStorage.js')

router.get('/list', async(ctx, next) => {
    // 默认10条数据
    const query = `db.collection('swiper').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    console.log(res)
        // 文件下载链接
    let fileList = []
    const data = res.data
    for (let i = 0, len = data.length; i < len; i++) {
        fileList.push({
            fileid: JSON.parse(data[i]).fileid,
            max_age: 7200
        })
    }
    const dlRes = await cloudStorage.download(ctx, fileList)
    console.log(dlRes)
    let returnData = []
    for (let i = 0, len = dlRes.file_list.length; i < len; i++) {
        returnData.push({
            download_url: dlRes.file_list[i].download_url,
            fileid: dlRes.file_list[i].fileid,
            _id: JSON.parse(data[i])._id
        })
    }
    ctx.body = {
        code: 20000,
        data: returnData
    }
})

router.post('/upload', async(ctx, next) => {
    const fileid = await cloudStorage.upload(ctx)
    console.log(fileid)
        // 写数据库
    const query = `
        db.collection('swiper').add({
            data: {
                fileid: '${fileid}'
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseadd', query)
    ctx.body = {
        code: 20000,
        id_list: res.id_list
    }
})

module.exports = router