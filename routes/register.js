let express = require('express');
let axios = require('axios');
let buildUtils = require('../common/buildUtils');
let sysConfig = require('../config/sysconfig.json');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/', function (req, res, next) {
	res.render('register', { title: '用户注册', layout: null });
});

router.post('/', function (req, res, next) {
	let apiKey = 'register';
	let requestUri = buildUtils.buildRequestApiUri(apiKey);

	axios.post(requestUri, {
		companyName: req.body.companyName,
		fullName: req.body.fullName,
		cellphone: req.body.cellphone,
		password: req.body.password,
		loginUser: req.body.loginUser
	})
		.then(response => {
			res.json({
				err: !response.data.result,
				code: response.data.responseCode,
				msg: response.data.responseMessage
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