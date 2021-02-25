let express = require('express');
let axios = require('axios');
let buildUtils = require('../common/buildUtils');
let sysConfig = require('../config/sysconfig.json');
let customerMessage = require('../config/msgconfig.json');
let router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', { title: '人才中心' });
});

router.get('/list', (req, res, next) => {
	const apiKey = 'studentAbilityList';
	const pageNumber = req.query.pageNumber;
	const pageSize = sysConfig.pageSize.sixteen;
	const directionID = 0;
	const categoryID = req.query.categoryID;
	const technologyID = 0;
	const universityCode = 0;
	const schoolID = 0;
	const studentName = 'NULL';
	const studentID = 0;
	const parameters = [pageNumber, pageSize, directionID, categoryID, technologyID, universityCode, schoolID, studentName, studentID];
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

module.exports = router;