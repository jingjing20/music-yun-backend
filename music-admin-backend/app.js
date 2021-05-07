const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
// 跨域解决方法之一cors
const cors = require('koa2-cors');
// 接受post请求参数解析
const koaBody = require('koa-body');
// 一些配置信息可以放在 config.js 中，利用 dotenv 加载进来
const config = require('./config');
// 云开发环境ID
const ENV = 'jingjing-haohao';

// 解决跨域问题
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

// 通过中间件设置云开发环境
app.use(async (ctx, next) => {
	console.log('jingjing 全局中间件');
	ctx.state.env = ENV;
	await next();
});

// 引入路由控制器
const playlist = require('./controllers/playlist');
const swiper = require('./controllers/swiper');
const blog = require('./controllers/blog');

// 路由映射
router.use('/playlist', playlist.routes());
router.use('/swiper', swiper.routes());
router.use('/blog', blog.routes());
// 设置路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务
app.listen(config.APP_PORT, () => {
	console.log(`服务已启动在${config.APP_PORT}端口`);
});
