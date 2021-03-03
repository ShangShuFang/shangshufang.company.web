let express = require('express');
let axios = require('axios');
let dateUtils = require('../common/dateUtils');
let buildUtils = require('../common/buildUtils');
let smsUtils = require('../common/smsUtils');
let sysConfig = require('../config/sysconfig.json');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/technology/category/list', (req, res, next) => {
	const apiKey = 'technologyCategoryList';
	const pageNumber = 1;
	const pageSize = sysConfig.pageSize.all;
	const directionID = req.query.directionID;
	const dataStatus = 'A';
	const parameters = [pageNumber, pageSize, directionID, dataStatus];
	const requestUri = buildUtils.buildRequestApiUri(apiKey, parameters);

	axios.get(requestUri)
		.then(result => {
			res.json({
				err: !result.data.result,
				code: result.data.responseCode,
				msg: result.data.responseMessage,
				dataList: result.data.responseData
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

router.get('/cellphone/count', (req, res, next) => {
	const apiKey = 'searchCellphoneCount';
	const cellphone = req.query.cellphone;
	const parameters = [cellphone];
	const requestUri = buildUtils.buildRequestApiUri(apiKey, parameters);

	axios.get(requestUri)
		.then(result => {
			res.json({
				err: !result.data.result,
				code: result.data.responseCode,
				msg: result.data.responseMessage,
				count: result.data.responseData
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

router.get('/verificationCode/generate', (req, res, next) => {
	let chars = ['0','1','2','3','4','5','6','7','8','9'];
	let maxIndex = chars.length - 1;
	let code = '';
	for(let i = 0; i < 6 ; i ++) {
		let index = Math.ceil(Math.random() * maxIndex);
		code += chars[index];
	}
	res.json({code: code});
});

router.post('/verificationCode/send', function (req, res, next) {
	let cellphone = req.body.cellphone;
	let code = req.body.verificationCode;

	//发送短信验证码
	smsUtils.sendVerificationCode(cellphone, code, (apiResponse) => {
		//保存调用日志
		let apiKey = 'addThirdPartyService';
		let requestUri = buildUtils.buildRequestApiUri(apiKey);
		axios.post(requestUri, {
			serviceType: sysConfig.thirdPartyService.aliSms,
			requestContent: JSON.stringify(apiResponse.reqContent),
			responseContent: JSON.stringify(apiResponse.resContent),
			result: apiResponse.result? 'Y' : 'N'
		})
		.then(response => {
			if (apiResponse.result) {
				//保存发送的验证码
				let apiKey = 'saveVerificationCode';
				let requestUri = buildUtils.buildRequestApiUri(apiKey);

				axios.post(requestUri, {
					systemFunction: req.body.systemFunction,
					cellphone: req.body.cellphone,
					code: req.body.verificationCode
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
								code: '3E99',
								msg: error.message
							});
						});
			} else {
				res.json({
					err: true,
					code: '2C99',
					msg: `验证码发送失败，原因：${apiResponse.resContent.message}`
				});
			}
		})
		.catch(error => {
			res.json({
				err: true,
				code: '3E99',
				msg: error.message
			});
		});
	});
});

router.get('/verificationCode/check', (req, res, next) => {
	let apiKey = 'checkVerificationCode';
	let cellphone = req.query.cellphone;
	let code = req.query.code;
	let parameters = [cellphone, code];
	let requestUri = buildUtils.buildRequestApiUri(apiKey, parameters);

	axios.get(requestUri)
			.then(result => {
				let checkResult = false;
				let checkResultMessage = '您输入的验证码不正确';
				if (result.data.responseData !== null) {
					let createTime = result.data.responseData.createTime;
					let now = dateUtils.currentTime();
					let expiredTime = dateUtils.addMinutes(createTime, 5);
					let compareResult = dateUtils.compare(Date.parse(expiredTime), Date.parse(now));
					if (compareResult < 0) {
						checkResult = false;
						checkResultMessage = '您输入的验证码已过期';
					} else {
						checkResult = true;
						checkResultMessage = '验证码输入正确';
					}
				}
				res.json({
					err: false,
					code: result.data.responseCode,
					msg: checkResultMessage,
					result: checkResult
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