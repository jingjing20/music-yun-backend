const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
    //跨域解决方法之一cors
const cors = require('koa2-cors')
    // 接受post请求参数解析
const koaBody = require('koa-body')

const ENV = 'jingjing-haohao'

// 跨域
app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))

// 接受post请求参数解析
app.use(koaBody({
    multipart: true
}))

app.use(async(ctx, next) => {
    console.log('jingjing 全局中间件')
    ctx.state.env = ENV
    await next()
})

const playlist = require('./controllers/playlist')
const swiper = require('./controllers/swiper')
const blog = require('./controllers/blog')

router.use('/playlist', playlist.routes())
router.use('/swiper', swiper.routes())
router.use('/blog', blog.routes())

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(8888, () => {
    console.log('项目已启动在8888端口、、、')
})