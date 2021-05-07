const getAccessToken = require('./getAccessToken.js');
const rp = require('request-promise');

const callCloudFn = async (ctx, fnName, params) => {
	// 获取接口调用凭证
	const ACCESS_TOKEN = await getAccessToken();
	// 请求参数
	const options = {
		method: 'POST',
		uri: `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${ctx.state.env}&name=${fnName}`,
		body: {
			...params,
		},
		json: true, // Automatically stringifies the body to JSON
	};
	// 发起请求
	return await rp(options)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = callCloudFn;
