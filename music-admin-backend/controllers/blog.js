const Router = require('koa-router');
const router = new Router();
const callCloudDB = require('../utils/callCloudDB.js');
const cloudStorage = require('../utils/callCloudStorage.js');

router.get('/list', async (ctx, next) => {
	// 获取参数
	const params = ctx.request.query;
	const query = `
    db.collection('blog').skip(${params.start})
    .limit(${params.count}).orderBy('createTime', 'desc').get()
    `;
	const blogRes = await callCloudDB(ctx, 'databasequery', query);
	ctx.body = {
		code: 20000,
		data: blogRes.data,
	};
});

router.post('/del', async (ctx, next) => {
	const params = ctx.request.body;
	// 删除 blog    单条记录用 doc
	const queryBlog = `db.collection('blog').doc('${params._id}').remove()`;
	const delBlogRes = await callCloudDB(ctx, 'databasedelete', queryBlog);

	// 删除 blog-comment 中对应的评论信息   多条记录用 where
	const queryComment = `db.collection('blog-comment').where({
        blogId: '${params._id}'
    }).remove()`;
	const delCommentRes = await callCloudDB(ctx, 'databasedelete', queryComment);

	// 删除博客对应的图片
	const delStorageRes = await cloudStorage.delete(ctx, params.img);
	ctx.body = {
		code: 20000,
		data: {
			delBlogRes,
			delCommentRes,
			delStorageRes,
		},
	};
});

module.exports = router;
