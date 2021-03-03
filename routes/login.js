let express = require('express');
let axios = require('axios');
let buildUtils = require('../common/buildUtils');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: '用户登录', layout: null });
});

router.post('/', (req, res, next) => {
	const apiKey = 'login';
	const cellphone = req.body.cellphone;
	const password = req.body.password;
	const parameters = [cellphone, password];
	const requestUri = encodeURI(buildUtils.buildRequestApiUri(apiKey, parameters));

	axios.get(requestUri)
		.then(result => {
			res.json({
				err: !result.data.result,
				code: result.data.responseCode,
				msg: result.data.responseMessage,
				apiResponse: result.data.responseData
			});
		})
		.catch(error => {
			res.json({
				err: true,
				code: error.code,
				msg: customerMessage[error.code]
			});
		});
});

module.exports = router;