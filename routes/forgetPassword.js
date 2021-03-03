let express = require('express');
let axios = require('axios');
let buildUtils = require('../common/buildUtils');
let sysConfig = require('../config/sysconfig.json');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('forgetPassword', { title: '忘记密码', layout: null  });
});

router.put('/', function (req, res, next) {
	let apiKey = 'changePassword';
	let requestUri = buildUtils.buildRequestApiUri(apiKey);

	axios.put(requestUri, {
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