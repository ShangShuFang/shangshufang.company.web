let express = require('express');
let axios = require('axios');
let buildUtils = require('../common/buildUtils');
let sysConfig = require('../config/sysconfig.json');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/', function (req, res, next) {
	res.render('companyTalents', { title: '企业人才库' });
});

router.get('/list', (req, res, next) => {
	const apiKey = 'searchCompanyTalentList';
	const pageNumber = req.query.pageNumber;
	const pageSize = sysConfig.pageSize.ten;
	const companyID = req.query.companyID;
	const technologyID = req.query.technologyID;
	const dataStatus = req.query.dataStatus;
	const parameters = [pageNumber, pageSize, companyID, technologyID, dataStatus];
	const requestUri = encodeURI(buildUtils.buildRequestApiUri(apiKey, parameters));

	axios.get(requestUri)
		.then(result => {
			let dataContent = buildUtils.buildRenderData(pageNumber, pageSize, result);
			res.json({
				err: !result.data.result,
				code: result.data.responseCode,
				msg: result.data.responseMessage,
				apiResponse: dataContent
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

router.put('/change', (req, res, next) => {
	let apiKey = 'changeCompanyTalent';
	let requestUri = buildUtils.buildRequestApiUri(apiKey);

	axios.put(requestUri, {
		talentID: req.body.talentID,
		interviewTime: req.body.interviewTime,
		interviewAddress: req.body.interviewAddress,
		memo: req.body.memo,
		dataStatus: req.body.dataStatus,
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

router.put('/change/status', (req, res, next) => {
	let apiKey = 'changeCompanyTalentStatus';
	let requestUri = buildUtils.buildRequestApiUri(apiKey);

	axios.put(requestUri, {
		talentID: req.body.talentID,
		dataStatus: req.body.dataStatus,
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