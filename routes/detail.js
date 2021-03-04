let express = require('express');
let axios = require('axios');
let buildUtils = require('../common/buildUtils');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/', function (req, res, next) {
	res.render('detail', { title: '能力明细' });
});

router.get('/student', (req, res, next) => {
	const apiKey = 'studenInfo';
	const universityCode = 0;
	const schoolID = 0;
	const studentID = req.query.studentID;
	const parameters = [universityCode, schoolID, studentID];
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

router.get('/technology/list', (req, res, next) => {
	const apiKey = 'studenTechnologyList';
	const studentID = req.query.studentID;
	const parameters = [studentID];
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

router.get('/knowledge/list', (req, res, next) => {
	const apiKey = 'studenKnowledgeAnalysisList';
	const studentID = req.query.studentID;
	const technologyID = req.query.technologyID;
	const parameters = [studentID, technologyID];
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

router.get('/comprehensive/list', (req, res, next) => {
	const apiKey = 'studenComprehensiveExercisesList';
	const studentID = req.query.studentID;
	const technologyID = req.query.technologyID;
	const parameters = [studentID, technologyID];
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

router.get('/talent/any', (req, res, next) => {
	const apiKey = 'searchCompanyTalent';
	const companyID = req.query.companyID;
	const studentID = req.query.studentID;
	const parameters = [companyID, studentID];
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

router.post('/save/talent', function (req, res, next) {
	let apiKey = 'addCompanyTalent';
	let requestApi = buildUtils.buildRequestApiUri(apiKey);

	axios.post(requestApi, {
		companyID: req.body.companyID,
		studentID: req.body.studentID,
		dataStatus: req.body.dataStatus,
		interviewTime: req.body.interviewTime,
		interviewAddress: req.body.interviewAddress,
		memo: req.body.memo,
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

router.post('/browsing', function (req, res, next) {
	let apiKey = 'addResumeBrowsingHistory';
	let requestApi = buildUtils.buildRequestApiUri(apiKey);

	axios.post(requestApi, {
		companyID: req.body.companyID,
		studentID: req.body.studentID,
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