const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
//跨域解决方法之一cors
const cors = require('koa2-cors');
// 接受post请求参数解析
const koaBody = require('koa-body');

const config = require('./config'); // 一些配置信息可以放在 config.js 中，利用 dotenv 加载进来

const ENV = 'jingjing-haohao';

// 跨域
app.use(
	cors({
		origin: ['http://localhost:9528'],
		credentials: true,
	})
);

// 接受post请求参数解析
app.use(
	koaBody({
		multipart: true,
	})
);

app.use(async (ctx, next) => {
	console.log('jingjing 全局中间件');
	ctx.state.env = ENV;
	await next();
});

const playlist = require('./controllers/playlist');
const swiper = require('./controllers/swiper');
const blog = require('./controllers/blog');

router.use('/playlist', playlist.routes());
router.use('/swiper', swiper.routes());
router.use('/blog', blog.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.APP_PORT, () => {
	console.log(`服务已启动在${config.APP_PORT}端口`);
});
